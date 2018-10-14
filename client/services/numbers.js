'use strict';

export const toFixedNumber = (number, x, base = 10) => {
  const pow = Math.pow(base, x);
  return +(Math.round(number * pow) / pow);
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return `0 Bytes`;
  }

  const k = 1024;
  const sizes = [`Bytes`, `KB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB`, `YB`];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export const toNumberWord = (number = ``) => {
  if (number === `` || isNaN(number)) return number;

  const numbers = [
    `zero`,
    `one`,
    `two`,
    `three`,
    `four`,
    `five`,
    `six`,
    `seven`,
    `eight`,
    `nine`,
    `ten`,
    `eleven`,
    `twelve`,
 ];

 return numbers[parseInt(number, 10)] || number;
}
