const figure = ([ image, dimensions, alt, caption, link, label ], args = {}) => {
  const { layout } = args;
  let captionMarkup = '';

  if (typeof image === 'string') {
    image = [image];
    alt = [alt];
    dimensions = [dimensions];
  }

  const overlayMarkup = `
    <div class="figure__overlay">
      <svg preserveAspectRatio="none" width="1000" height="25" viewBox="0 0 1000 25" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h1000v25z" fill-rule="evenodd"/></svg>
    </div>
  `;

  if (caption) {
    const linkMarkup = link ? `&ensp;<a class="figure__link" href="${link}" target="_blank" rel="noopener">${label}</a>` : '';
    captionMarkup = `
      <figcaption class="figure__caption">
        <svg preserveAspectRatio="none" width="1000" height="25" viewBox="0 0 1000 25" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v25h1000z" fill-rule="evenodd"/></svg>
        <span>${caption}${linkMarkup}</span>
      </figcaption>
    `;
  }

  let imageMarkup = `<div class="figure__image">${overlayMarkup}`;
  let imageWidth = 0;

  image.forEach((src, index) => {
    const [width, height] = (dimensions[index] || '').split('x');

    imageMarkup += `<img src="/images/${src}" loading="lazy" alt="${alt[index] || ''}" ${width ? `width="${width}"` : ''} ${height ? `height="${height}"`: ''} />`;
    imageWidth += +width;
  });

  imageMarkup += '</div>';

  return `<figure class="figure figure--${layout}" style="--figure-count: ${image.length}; max-width: ${imageWidth}px">${imageMarkup}${captionMarkup}</figure>`;
};

module.exports = figure;
