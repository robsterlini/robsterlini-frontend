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

module.exports = figure;
