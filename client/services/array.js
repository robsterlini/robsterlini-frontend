'use strict';

import includes from 'array-includes';

function arrayLoop(array, callback) {
  const isNum = typeof(array) === `number`;
  if (Array.isArray(array) || isNum) {
    const length = isNum ? array : array.length;
    for (let i = 0; i < length; i++) {
      callback(i, isNum ? i : array[i]);
    }
  } else if (typeof(array) === `object`) {
    Object.keys(array).forEach(i => {
      callback(i, array[i]);
    });
  } else {
    console.warn(`Not an object`, array);
  }
}

function arrayRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function arrayIncludes(array, check) {
  return includes(array, check);
}

export {
  arrayIncludes,
  arrayLoop,
  arrayRandom,
};
