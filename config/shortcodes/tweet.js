require('dotenv').config();

// TODO: Replace with Node fetch wrapper
const request = require('request-promise');
const { promises: fs } = require("fs");

const { minify } = require('html-minifier');
const nunjucks = require("nunjucks");
const path = require("path");

async function getTweet(tweetId, options) {
  // if we have env variables, go get tweet
  if (hasAuth()) {
    const liveTweet = await fetchTweet(tweetId);
    const tweetViewModel = processTweet(liveTweet);

    return renderTweet(tweetViewModel);
  }

  console.warn("Remember to add your twitter credentials as environement variables")
  console.warn("Read More at https://github.com/KyleMit/eleventy-plugin-embed-tweet#setting-env-variables")

  // finally fallback to client-side injection
  var htmlTweet =
    `<blockquote class="twitter-tweet"><a href="https://twitter.com/user/status/${tweetId}"></a></blockquote>` +
    `<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;

  return htmlTweet;
}

/* Twitter API Call */
function hasAuth() {
  return process.env.TOKEN &&
         process.env.TOKEN_SECRET &&
         process.env.CONSUMER_KEY &&
         process.env.CONSUMER_SECRET;
}

function getAuth() {
  return {
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET,
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
  };
}

async function fetchTweet(tweetId) {
  const apiURI = `https://api.twitter.com/1.1/statuses/show/${tweetId}.json?tweet_mode=extended`;
  const oauth = getAuth()

  try {
    const response = await request.get(apiURI, { oauth });
    return JSON.parse(response);
  } catch (error) {
    // unhappy path - continue to other fallbacks
    console.log(error);
    return {};
  }
}

/* transform tweets */
function processTweet(tweet) {
  const {
    id_str,
    favorite_count,
    retweet_count,
    user: {
      name,
      screen_name,
      profile_image_url_https,
    },
  } = tweet;

  return {
    id_str,
    favorite_count,
    retweet_count,
    user: {
      name,
      screen_name,
      profile_image_url_https,
    },
    htmlText: getTweetTextHtml(tweet),
    images: getTweetImages(tweet),
    created_at: getTweetDates(tweet),
  };
}

function getTweetImages(tweet) {
  if (!tweet.extended_entities) return [];

  return tweet.extended_entities.media.map(image => ({
    src: image.media_url_https,
    url: image.expanded_url,
  }));
}

function getTweetDates(tweet) {
  const date = new Date(tweet.created_at);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'UTC',
  };

  return {
    display: new Intl.DateTimeFormat('en-GB', options).format(date) + '\xa0GMT',
    iso: date.toISOString(),
  };
}

function createUrl(url, text) {
  return `<a href="${url}" rel="noopener" target="_blank">${text}</a>`;
}

function getOldText(text, indices) {
  const [start, end] = indices;
  const len = end - start;
  const oldText = text.substr(start, len);

  return oldText;
}

function getTweetTextHtml(tweet) {
  const replacements = [];

  // Hashtags
  for (hashtag of tweet.entities.hashtags || []) {
    const oldText = getOldText(tweet.full_text, hashtag.indices);
    const newText = createUrl(`https://twitter.com/hashtag/${oldText.substr(1)}`, oldText);
    replacements.push({ oldText, newText });
  }

  // users
  for (user of tweet.entities.user_mentions || []) {
    const oldText = getOldText(tweet.full_text, user.indices);
    const newText = createUrl(`https://twitter.com/${oldText.substr(1)}`, oldText);
    replacements.push({ oldText, newText });
  }

  // urls
  for (url of tweet.entities.urls || []) {
    replacements.push({
      oldText: getOldText(tweet.full_text, url.indices),
      newText: createUrl(url.expanded_url, url.expanded_url.replace(/https?:\/\//,"")),
    });
  }

  // media
  for (media of tweet.entities.media || []) {
    replacements.push({
      oldText: getOldText(tweet.full_text, media.indices),
      newText: '',  // get rid of img url in tweet text
    });
  }

  let htmlText = tweet.full_text;

  for ({ oldText, newText } of replacements) {
    htmlText = htmlText.replace(oldText, newText);
  }

  // preserve line breaks to survive minification
  htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  htmlText = htmlText.replace(/((?:<br\/>)+)/g, '<span class="tweet__spacer"><br/></span>');

  return htmlText;
}

/* render tweets */
function renderTweet(tweet) {
  const moduleDir = path.parse(__filename).dir;

  nunjucks.configure(moduleDir, { autoescape: true });

  const htmlTweet = nunjucks.render("tweet.njk", tweet);

  // minify before returning
  // important when injected into markdown to prevent injection of `<p>` tags due to whitespace
  const htmlMin = minify(htmlTweet, {
    minifyCSS: true,
    collapseWhitespace: true,
  });

  return htmlMin;
}

module.exports = {
  getTweet,
};
