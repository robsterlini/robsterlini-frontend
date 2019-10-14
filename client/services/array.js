'use strict';

import includes from 'array-includes';

// @function arrayLoop(array, callback)
// Easily loop through arrays, objects and numbers
//
// @param {array|object|number} array – The iterable item
// @param {arrayLoop~callback} callback – Each item is iterated through
//
// @callback arrayLoop~callback
// @param {number|string} index – For objects this is the key, for arrays/number this is the index
// @param {string|object} value – For objects this is the object, for arrays this is the array item, for numbers this is the index
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
