'use strict';

/* eslint-disable prefer-template */
const rgbToHex = (r, g, b) => `#` + [r, g, b].map(x => {
  const hex = x.toString(16);
  return `${hex.length === 1 ? `0` : ``}${hex}`;
}).join(``);

const hexToRgb = hex =>
  hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#` + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

export {
  rgbToHex,
  hexToRgb,
};
/* eslint-enable prefer-template */
