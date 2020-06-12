const sass = require('node-sass');
const markdownIt = require("markdown-it");
const htmlmin = require('html-minifier');

const input = `src`;
const output = `dist`;

module.exports = function(eleventyConfig) {

  // Shortcodes
  eleventyConfig.addPairedShortcode('markdown', (content) => {
    const md = new markdownIt({ html: true });

    return md.render(content);
  });
  eleventyConfig.addPairedShortcode('smallCaps', (content) => `<span class="sc">${content}</span>`);
  const figure = ([ image, alt, caption, link, label ], args = {}) => {
    const { layout } = args;
    let captionMarkup = '';

    if (caption) {
      const linkMarkup = link ? ` <a class="figure__link" href="${link}" target="_blank" rel="rel="noopener"">${label}</a>` : '';
      captionMarkup = `<figcaption class="figure__caption">${caption}${linkMarkup}</figcaption>`;
    }

    return `<figure class="figure figure--${layout}"><img src="/images/${image}" loading="lazy" alt="${alt}" />${captionMarkup}</figure>`;
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
  const getJournalEntries = ({ all = [] } = {}) => all.filter(entry => entry.url.startsWith('/journal/')).reverse();
  eleventyConfig.addNunjucksFilter('getFirstJournalEntry', collections => {
    const [entry] = getJournalEntries(collections);
    return entry;
  });
  eleventyConfig.addNunjucksFilter('getJournalEntries', getJournalEntries);
  eleventyConfig.addNunjucksFilter("formatDate", function(value) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(value);
  });
  eleventyConfig.addNunjucksFilter("isOldDate", function(value) {
    return new Date() - new Date(value) > 1.577e+10;
    return true;
  });
  eleventyConfig.addNunjucksAsyncFilter('scss', function(data, callback) {
    const scssOptions = {
      data,
      includePaths: [
        `${input}/_includes`,
      ],
      outputStyle: 'compressed',
    };
    sass.render(scssOptions, (error, result) => {
      callback(null, !error ? result.css : '');

      if (error) {
        console.error('Error', error.line, error.message);
      }
    });
  });

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
