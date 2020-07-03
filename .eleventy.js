const sass = require('node-sass');
const htmlmin = require('html-minifier');
const pluginRss = require("@11ty/eleventy-plugin-rss");

const { input, output } = require('./config/constants.js');
const scssConfig = require('./config/scss.js');
const markdownConfig = require('./config/markdown.js');
const { getJournalLink } = require('./config/journal.js');

const figureShortcode = require('./config/shortcodes/figure.js');
const {
  journalEntry: journalEntryShortcode,
  journalEntryShort: journalEntryShortShortcode,
} = require('./config/shortcodes/journal.js');

const generateSocialImageFilter = require('./config/filters/generateSocialImage.js');
const formatDateFilter = require('./config/filters/formatDate.js');

module.exports = function(eleventyConfig) {
  // Libraries
  eleventyConfig.setLibrary('md', markdownConfig);

  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Collections
  const getAllEntries = (collectionApi, excludeExternal = false) => {
    return collectionApi.getAllSorted()
      .filter(entry => entry.url.startsWith('/journal/') && entry.url !== '/journal/')
      .map(entry => Object.assign(entry, {
        link: getJournalLink(entry, eleventyConfig),
      }))
      .filter(entry => !excludeExternal || !entry.link.domain)
      .reverse();
  };

  eleventyConfig.addCollection('entries', getAllEntries);
  eleventyConfig.addCollection('internalEntries', collectionApi => getAllEntries(collectionApi, true));

  // Shortcodes
  eleventyConfig.addShortcode('figureInset', (...args) => figureShortcode(args, { layout: 'inset' }));
  eleventyConfig.addShortcode('figureFull', (...args) => figureShortcode(args, { layout: 'full' }));
  eleventyConfig.addShortcode('journalEntry', journalEntryShortcode);
  eleventyConfig.addShortcode('journalEntryShort', journalEntryShortShortcode);

  // Transforms
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
      });
    }

    return content;
  });

  // Filters
  eleventyConfig.addNunjucksFilter('generateMetaValue', (meta, defaultValue, page, post) => {
    const parsedValue = typeof(meta) === 'function' ? meta(page) : meta;

    return parsedValue || defaultValue;
  });

  eleventyConfig.addNunjucksFilter('generateSocialImage', generateSocialImageFilter);

  eleventyConfig.addNunjucksFilter('getPageDataFromCollections', (collections, url) => {
    const [page] = collections.all.filter(collection => collection.url === url) || [];

    return page ? page.data : {};
  });

  eleventyConfig.addNunjucksFilter('getJournalLink', (entry) => getJournalLink(entry, eleventyConfig));

  eleventyConfig.addNunjucksFilter("formatDate", formatDateFilter);
  eleventyConfig.addNunjucksFilter('isOldDate', value => {
    return new Date() - new Date(value) > 1.577e+10;
    return true;
  });

  // Scss
  eleventyConfig.addNunjucksAsyncFilter('inlineScss', scssConfig.inlineScss);

  // Layout Aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  // Pass through files
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
