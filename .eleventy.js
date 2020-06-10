const sass = require('node-sass');
const markdownIt = require("markdown-it");

const input = `src`;
const output = `dist`;

module.exports = function(eleventyConfig) {

  const md = new markdownIt({
    html: true
  });

  eleventyConfig.addPairedShortcode(`markdown`, (content) => md.render(content));
  eleventyConfig.addPairedShortcode(`smallCaps`, (content) => `<span class="sc">${content}</span>`);

  eleventyConfig.addNunjucksFilter("avoryUnderline", (value, ...args) => {
    return args.reduce((acc, k) => acc.replace(k, `<span class="test">${k}</span>`), value);
  });
  eleventyConfig.addNunjucksFilter(`pictureSet`, (widths, filetypes, path) => {
    filetypes = filetypes.filter((v, i, a) => a.indexOf(v) === i);

    const pictureSet = [];

    filetypes.forEach(fileType => {
      const srcSet = [];

      Object.keys(widths).forEach(widthKey => {
        const widthSize = widths[widthKey];
        srcSet.push(`${path}-${widthKey}.${fileType} ${widthSize}`);
      });

      pictureSet.push({
        fileType,
        srcSet,
      });
    });
    return pictureSet;
  });
  eleventyConfig.addNunjucksAsyncFilter(`scss`, function(data, callback) {
    const scssOptions = {
      data,
      includePaths: [
        `${input}/_includes`,
      ],
    };
    sass.render(scssOptions, (error, result) => {
      callback(null, !error ? result.css : ``);

      if (error) {
        console.error(`Error`, error.line, error.message);
      }
    });
  });

  eleventyConfig.addLayoutAlias(`default`, `base.njk`);

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
    templateFormats : [`njk`, `md`],
    htmlTemplateEngine : `njk`,
    markdownTemplateEngine : `njk`,
    passthroughFileCopy: true,
  };
};
