const figure = ([ image, size, alt, caption, link, label ], args = {}) => {
  const { layout } = args;
  let captionMarkup = '';

  const [width, height] = (size || '').split('x');

  const overlayMarkup = `
    <div class="figure__overlay">
      <svg preserveAspectRatio="none" width="1000" height="25" viewBox="0 0 1000 25" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h1000v25z" fill-rule="evenodd"/></svg>
    </div>
  `;

  if (caption) {
    const linkMarkup = link ? ` <a class="figure__link" href="${link}" target="_blank" rel="noopener">${label}</a>` : '';
    captionMarkup = `
      <figcaption class="figure__caption">
        <svg preserveAspectRatio="none" width="1000" height="25" viewBox="0 0 1000 25" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v25h1000z" fill-rule="evenodd"/></svg>
        <span>${caption}${linkMarkup}</span>
      </figcaption>
    `;
  }

  const imageMarkup = `<div class="figure__image">${overlayMarkup}<img src="/images/${image}" loading="lazy" alt="${alt}" ${width ? `width="${width}"` : ''} ${height ? `height="${height}"`: ''} /></div>`;

  return `<figure class="figure figure--${layout}">${imageMarkup}${captionMarkup}</figure>`;
};

module.exports = figure;
