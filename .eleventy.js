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

  // Transforms
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  // Filters
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
  eleventyConfig.addLayoutAlias('default', 'base.njk');

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
