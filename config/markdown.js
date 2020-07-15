const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor');
const markdownItClass = require('@toycode/markdown-it-class');
const markdownItAbbr = require('markdown-it-abbr');
const hljs = require('highlight.js');

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

const LANG_NAMES = {
  js: 'JavaScript',
  css: 'CSS',
  html: 'HTML',
  scss: 'Sass',
};

const markdownLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight(str, lang) {
    const codeStr = (lang && hljs.getLanguage(lang) && hljs.highlight(lang, str, true).value) || markdownLibrary.utils.escapeHtml(str);

    return `<pre class="code-block"${lang ? ` data-lang=${LANG_NAMES[lang] || lang}` : ''}><code>${codeStr}</code></pre>`;
  },
})
  .use(markdownItAnchor, {
    slugify,
    permalink: true,
    permalinkClass: 'anchor',
    permalinkHref: slug => `#${slug}`,
    permalinkSymbol: '\u00B6', // Pilcrow (¶)
  })
  .use(markdownItAbbr)
  .use(markdownItClass, {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    ul: 'list',
    ol: 'list list--ordered',
    blockquote: 'blockquote',
    cite: 'blockquote__cite',
    pre: 'pre',
  });

module.exports = markdownLibrary;
