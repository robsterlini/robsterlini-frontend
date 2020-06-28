const sass = require('node-sass');
const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor');
const htmlmin = require('html-minifier');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require('fs');
const path = require('path');

const input = `src`;
const output = `dist`;

const slugify = string => {
  if (!string) return string;

  const a = `àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;άαβγδεέζήηθιίϊΐκλμνξοόπρσςτυϋύΰφχψωώ`;
  const b = `aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------aavgdeeziitiiiiklmnxooprsstyyyyfhpoo`;
  const p = new RegExp(a.split(``).join(`|`), `g`);

  return string.toString().trim().toLowerCase()
    .replace(/ου/g, `ou`)
    .replace(/ευ/g, `eu`)
    .replace(/θ/g, `th`)
    .replace(/ψ/g, `ps`)
    .replace(/\//g, `-`)
    .replace(/\s+/g, `-`)          // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, `and`)          // Replace & with `and`
    .replace(/[^\w-]+/g, ``)       // Remove all non-word chars
    .replace(/--+/g, `-`)          // Replace multiple - with single -
    .replace(/^-+/, ``)            // Trim - from start of text
    .replace(/-+$/, ``);           // Trim - from end of text
};

module.exports = function(eleventyConfig) {
  // Libraries
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    slugify,
    // slugify: (s) => {
    //   const string = String(s)
    //     .trim()
    //     .toLowerCase()
    //     .replace(/\s+/g, '-')
    //     .replace(/\./g, '');

    //   return encodeURIComponent(string);
    // },
    permalink: true,
    permalinkClass: 'post-article__anchor',
    permalinkHref: slug => `#${slug}`,
    permalinkSymbol: "\u00B6",
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Plugins
  eleventyConfig.addPlugin(pluginRss);

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
      const linkMarkup = link ? ` <a class="figure__link" href="${link}" target="_blank" rel="noopener">${label}</a>` : '';
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
  eleventyConfig.addNunjucksAsyncFilter('scss', (data, callback) => {
    const scssOptions = {
      data,
      includePaths: [
        `${input}/_includes`,
      ],
      outputStyle: 'compressed',
    };

    const scssCallback = (error, result) => {
      callback(null, !error ? result.css : '');

      if (error) {
        console.error('Error', error.line, error.message);
      }
    };

    sass.render(scssOptions, scssCallback);
  });

  const generateCss = (_scssPath, _cssPath, callback) => {
    const scssOptions = {
      file: _scssPath,
      includePaths: [
        `${input}/_includes`,
      ],
      outputStyle: 'compressed',
    };

    const scssCallback = (error, result) => {
      callback(null, !error ? result : '');

      if (error) {
        console.error('Error', error.line, error.message);
      }
    };

    // Encapsulate rendered css from _scssPath into renderedCss variable
    const renderedCss = sass.renderSync(scssOptions);

    // Then write result css string to _cssPath file
    fs.writeFile(_cssPath, renderedCss.css.toString(), (writeErr) => {
      if (writeErr) throw writeErr;

      scssCallback(null, _cssPath.replace('dist/', ''));

      console.log(`CSS file saved: ${_cssPath}`);
    });
  };

  eleventyConfig.addNunjucksAsyncFilter('scss_separate', (scssPath, callback) => {
    const cssPath = `${output}/test/test.css`;

    // If cssPath directory doesn't already exist, add it...
    if (!fs.existsSync(path.dirname(cssPath))) {
      console.log(`Creating new CSS directory: ${path.dirname(cssPath)}/`);

      // Create cssPath directory recursively
      fs.mkdir(path.dirname(cssPath), { recursive: true }, (mkdirErr) => {
        if (mkdirErr) throw mkdirErr;

        console.log('CSS directory created.');

        generateCss(scssPath, cssPath, callback);
      });
    }

    // Generate CSS on startup
    generateCss(scssPath, cssPath, callback);
  });

  // Layout Aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  const filesToCopy = [
    `${input}/images`,
    `${input}/fonts`,
    `${input}/favicon.svg`,
    `${input}/favicon.png`,
    `${input}/print.css`,
    `${input}/_redirects`,
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
