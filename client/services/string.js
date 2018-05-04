'use strict';

// Services
import { arrayLoop } from 'services/array';


// @function toCapitalizedCase(string)
// Capitalize the first character of a string
//
// @param {string} string – The string to capitalize
// @returns {string} Capitalized string
export const toCapitalizedCase = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : ``;


// @function toKebabCase(string)
// Turn a camelCase string into a kebab-case-string
//
// @param {string} string – The camelCase string to kebab-case
// @returns {string} camelCase string
export const toKebabCase = (string) => string ? string.replace(/([a-z])([A-Z])/g, `$1-$2`).toLowerCase() : ``;


// @function toPlural(count, string, plural)
// Pluralize strings by adding s or specifying a plural based on the count
//
// @param {number} count – The number by which to pluralized
// @param {string} string – The string
// @param {string} [plural] – A plural string
// @returns {string} Pluralized string
export const toPlural = (count = 0, string = ``, plural = false) => !string || count === 1 ? string : (plural || `${string}s`);


// @function stringifyObject(jsonObj, level)
// Convert any JSON/JS object into a string that conforms to our JS linting rules
//
// @param {array|object} jsonObj – The object to stringify
// @param {number=0} level – The depth of object (i.e. the number of tabs to add)
// @returns {string} – strigified object
export const stringifyObject = (jsonObj, level = 0) => {
  // Use native stringify for anything that isn’t an object
  if (typeof jsonObj === `string`) {
    return `\`${jsonObj}\``;
  } else if (typeof jsonObj !== `object`) {
    return JSON.stringify(jsonObj);
  }

  let indent = ``;
  arrayLoop(level, i => { // eslint-disable-line no-unused-vars
    indent += `\t`;
  });

  if (Array.isArray(jsonObj)) {
    let arr = ``;

    arrayLoop(jsonObj, (index, item) => {
      arr += `\n\t${indent}${stringifyObject(item, level + 1)},`;
    });

    return arr ? `[${arr}\n${indent}]` : `[]`;
  }

  let obj = ``;
  arrayLoop(jsonObj, (key, val) => {
    const valType = typeof(val);
    let value = null;

    if (valType === `string`) {
      value = `\`${val}\``;
    } else if (valType === `number`) {
      value = val;
    } else if (valType === `boolean`) {
      value = val ? `true` : `false`;
    } else if (valType === `object`) {
      value = stringifyObject(val, level + 1);
    }

    if (value !== null) {
      obj += `\n\t${indent}${key}: ${value},`;
    }
  });

  return obj ? `{ ${obj}\n${indent}}` : `{}`;
};
