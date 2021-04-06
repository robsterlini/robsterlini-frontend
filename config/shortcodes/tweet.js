// Forked from https://github.com/KyleMit/eleventy-plugin-embed-tweet

require('dotenv').config();

// TODO: Replace with Node fetch wrapper
const request = require('request-promise');
const { promises: fs } = require('fs');
const syncFs = require('fs');

const { minify } = require('html-minifier');
const nunjucks = require('nunjucks');
const path = require('path');

const cacheDir = process.cwd();
const cachePath = path.join(cacheDir, 'tweets.json');

async function getCachedTweets() {
  let file;

  try {
    file = await fs.readFile(cachePath, "utf8");
  } catch (error) {
    console.log(error);
    return {};
  }

  return JSON.parse(file) || {};
}

async function addTweetToCache(tweet) {
  try {
    const cachedTweets = await getCachedTweets();

    cachedTweets[tweet] = tweet;

    let tweetsJSON = JSON.stringify(cachedTweets, 2, 2);

    await fs.mkdir(cacheDir, { recursive: true });

    syncFs.writeFileSync(cachePath, tweetsJSON);

    console.log(`Writing ${cachePath}`);
  } catch (error) {
    console.log(error);
  }
}

async function getTweet(tweetId) {
  if (!process.env.TWEET_CACHE_BUST) {
    const cachedTweets = await getCachedTweets();
    const cachedTweet = cachedTweets[tweetId];

    if (cachedTweet) {
      return renderTweet(cachedTweet);
    }
  }

  if (hasAuth()) {
    const liveTweet = await fetchTweet(tweetId);
    const tweetViewModel = processTweet(liveTweet);

    await addTweetToCache(tweetViewModel);

    return renderTweet(tweetViewModel);
  }

  console.warn('Ensure Twitter ENV vars are set');

  var htmlTweet =
    `<blockquote class="twitter-tweet"><a href="https://twitter.com/user/status/${tweetId}"></a></blockquote>` +
    `<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;

  return htmlTweet;
}

/* Twitter API Call */
function hasAuth() {
  return process.env.TWITTER_TOKEN &&
         process.env.TWITTER_TOKEN_SECRET &&
         process.env.TWITTER_CONSUMER_KEY &&
         process.env.TWITTER_CONSUMER_SECRET;
}

function getAuth() {
  return {
    token: process.env.TWITTER_TOKEN,
    token_secret: process.env.TWITTER_TOKEN_SECRET,
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  };
}

async function fetchTweet(tweetId) {
  const apiURI = `https://api.twitter.com/1.1/statuses/show/${tweetId}.json?tweet_mode=extended`;
  const oauth = getAuth();

  let response;

  try {
    response = await request.get(apiURI, { oauth });
  } catch (error) {
    console.log(error);
    return {};
  }

  return JSON.parse(response);
}

/* transform tweets */
function processTweet(tweet) {
  const {
    id_str: id,
    favorite_count,
    retweet_count,
    user: {
      name,
      screen_name: username,
      profile_image_url_https: avatar,
    },
  } = tweet;

  return {
    id,
    favorite_count,
    retweet_count,
    user: {
      name,
      username,
      avatar,
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
    const oldText = getOldText(tweet.full_text, url.indices);
    const newText = createUrl(url.expanded_url, url.expanded_url.replace(/https?:\/\//, ''));
    replacements.push({ oldText, newText });
  }

  // media
  for (media of tweet.entities.media || []) {
    const oldText = getOldText(tweet.full_text, media.indices);
    replacements.push({ oldText });
  }

  let htmlText = tweet.full_text;

  for ({ oldText, newText } of replacements) {
    htmlText = htmlText.replace(oldText, newText || '');
  }

  htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  htmlText = htmlText.replace(/((?:<br\/>)+)/g, '<span class="tweet__spacer"><br/></span>');

  return htmlText;
}

function renderTweet(tweet) {
  const moduleDir = path.parse(__filename).dir;

  nunjucks.configure(moduleDir, { autoescape: true });

  const htmlTweet = nunjucks.render('tweet.njk', tweet);

  const htmlMin = minify(htmlTweet, {
    minifyCSS: true,
    collapseWhitespace: true,
  });

  return htmlMin;
}

module.exports = getTweet;
