const sass = require('node-sass');
const htmlmin = require('html-minifier');
const pluginRss = require("@11ty/eleventy-plugin-rss");

const { input, output } = require('./config/constants.js');
const scssConfig = require('./config/scss.js');
const markdownConfig = require('./config/markdown.js');

module.exports = function(eleventyConfig) {
  // Libraries
  eleventyConfig.setLibrary('md', markdownConfig);

  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Shortcodes
  eleventyConfig.addPairedShortcode('smallCaps', (content) => `<span class="sc">${content}</span>`);

  const figure = ([ image, size, alt, caption, link, label ], args = {}) => {
    const { layout } = args;
    let captionMarkup = '';

    const [width, height] = (size || '').split('x');

    if (caption) {
      const linkMarkup = link ? ` <a class="figure__link" href="${link}" target="_blank" rel="noopener">${label}</a>` : '';
      captionMarkup = `<figcaption class="figure__caption">${caption}${linkMarkup}</figcaption>`;
    }

    const imageMarkup = `<img src="/images/${image}" loading="lazy" alt="${alt}" ${width ? `width="${width}"` : ''} ${height ? `height="${height}"`: ''} />`;

    return `<figure class="figure figure--${layout}">${imageMarkup}${captionMarkup}</figure>`;
  };

  eleventyConfig.addShortcode('figureInset', (...args) => figure(args, { layout: 'inset' }));
  eleventyConfig.addShortcode('figureFull', (...args) => figure(args, { layout: 'full' }));

  // Transforms
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
      });
      return minified;
    }

    return content;
  });

  // Filters
  eleventyConfig.addNunjucksFilter('generateMetaValue', (meta, defaultValue, page, post) => {
    const parsedValue = typeof(meta) === 'function' ? meta(page) : meta;

    return parsedValue || defaultValue;
  });

  eleventyConfig.addNunjucksFilter('generateSocialImage', ({ header, title }) => {
    const cloudinaryEncode = (text = '') => {
      const unencodedText = `${text}`
        .replace(/&amp;/g, '%26')
        .replace(/\,/g, '%2C');

      return  encodeURIComponent(unencodedText);
    };

    const imageProps = [
      'w_1440',
      'h_720',
      'q_100',
    ];

    const headerProps = [
      'w_800',
      'h_86',
      'c_fit',
      'y_160',
      'x_195',
      'g_north_west',
      'co_rgb:EEE7E7',
      `l_text:rs-b-600.otf_56_bold_left_:${cloudinaryEncode(header)}`,
    ];

    const titleProps = [
      'w_1200',
      'h_420',
      'y_280',
      'x_110',
      'c_fit',
      'g_north_west',
      'co_rgb:F75C6A',
      `l_text:rs-h-700.otf_90_bold_left_line_spacing_20_:${cloudinaryEncode(title)}`,
    ];

    return [
      'https://res.cloudinary.com/dym2d96h6/image/upload',
      imageProps.join(','),
      headerProps.join(','),
      titleProps.join(','),
      'v1592751314/robsterlini/meta.png',
    ].join('/');
  });

  eleventyConfig.addNunjucksFilter('getPageDataFromCollections', (collections, url) => {
    const [test] = collections.all.filter(collection => collection.url === url) || [];
    return test ? test.data : {};
  });

  const getJournalEntries = ({ all = [] } = {}) => all
    .filter(entry => {
      return entry.url.startsWith('/journal/') && entry.url !== '/journal/';
    })
    .reverse();

  const getJournalLink = (entry) =>  {
    if (!entry) return {};

    let domain, htmlAttrs;

    let {
      url,
      data: { title },
    } = entry;

    const { external_url } = entry.data;

    title = `Read ‘${title || 'the entry'}’`;

    if (!external_url) {
      url = eleventyConfig.getFilter('url')(url);
    }

    else {
      url = external_url;
      domain = url.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/)[1];
      title += ` on ${domain}`;
    }

    htmlAttrs = `href="${url}" title="${title}"`;

    if (domain) {
      htmlAttrs += ' target="_blank" rel="noopener"';
    }

    return {
      domain,
      url,
      title,
      htmlAttrs,
    };
  };

  eleventyConfig.addNunjucksFilter('getJournalLink', getJournalLink);

  eleventyConfig.addNunjucksFilter('getFirstJournalEntry', collections => {
    const [entry] = getJournalEntries(collections);
    return entry;
  });
  eleventyConfig.addNunjucksFilter('getJournalEntries', getJournalEntries);
  eleventyConfig.addNunjucksFilter("formatDate", date => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Intl.DateTimeFormat('en-GB', options).format(date);
  });
  eleventyConfig.addNunjucksFilter('isOldDate', value => {
    return new Date() - new Date(value) > 1.577e+10;
    return true;
  });

  // Scss
  eleventyConfig.addNunjucksAsyncFilter('inlineScss', scssConfig.inlineScss);

  // Layout Aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  const filesToCopy = [
    `${input}/images`,
    `${input}/fonts`,
    `${input}/favicon.svg`,
    `${input}/favicon.png`,
  ];

  filesToCopy.forEach(file => {
    eleventyConfig.addPassthroughCopy(file);
  });

  return {
    dir: {
      input,
      output,
    },
    templateFormats : ['njk', 'md'],
    htmlTemplateEngine : 'njk',
    markdownTemplateEngine : 'njk',
    passthroughFileCopy: true,
  };
};
