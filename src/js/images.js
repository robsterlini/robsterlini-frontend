const heroImage = require(`../images/motherclucker-leon.jpg`);

const loadImage = src => new Promise((resolve, reject) => {
  const img = new Image();

  img.addEventListener('load', e => resolve(img));
  img.addEventListener('error', () => {
    reject(new Error(`Failed to load image's src: ${src}`));
  });

  img.src = src;
});

export const setupImages = () => {
  loadImage(heroImage)
    .then(() => {
      const backgroundEl = document.getElementById(`background`);
      const spotlightEl = document.getElementById(`spotlight`);

      backgroundEl.setAttribute(`src`, heroImage);
      spotlightEl.setAttribute(`src`, heroImage);

      setTimeout(() => {
        backgroundEl.classList.add(`background__image--loaded`);
        spotlightEl.classList.add(`background__image--loaded`);
      }, 250);
    });
};
