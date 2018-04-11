'use strict';

import { arrayLoop } from 'services/array';

const toCapitalizedCase = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : ``;

const toKebabCase = (string) => string ? string.replace(/([a-z])([A-Z])/g, `$1-$2`).toLowerCase() : ``;

const toPlural = (count = 0, string = ``, plural = false) => !string || count === 1 ? string : (plural || `${string}s`);

const stringifyObject = (jsonObj, level = 0) => {
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

export {
  toCapitalizedCase,
  toKebabCase,
  toPlural,
  stringifyObject,
};
