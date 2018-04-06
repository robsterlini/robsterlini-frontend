
import { required, minLength, maxLength, email, url, minValue, maxValue } from 'vuelidate/lib/validators';

// Services
/* eslint-disable import/no-extraneous-dependencies */
import { stringifyObject } from 'services/string';
import { arrayLoop, arrayIncludes } from 'services/array';

function setValidation(key, field) {
  const validations = {};

  const fieldType = field.type || `text`;
  const isTextField = arrayIncludes([`text`, `textarea`, `url`, `email`, `password`], fieldType);

  const fieldValidations = field.validations;

  if (!fieldValidations) {
    return validations;
  }

  const vMax = fieldValidations.max || 0;
  const vMin = fieldValidations.min || 0;

  const map = {
    required,
    email,
    url,
    min: minValue(vMin),
    max: maxValue(vMax),
  };

  arrayLoop(map, (i) => {
    if (fieldValidations[i]) {
      if (i === `min` && isTextField) {
        validations.minLength = minLength(vMin);
      } else if (i === `max` && isTextField) {
        validations.maxLength = maxLength(vMax);
      } else {
        validations[i] = map[i];
      }
    }
  });

  return validations;
}

function createFieldObject({ args, type, stringify }) {
  const setType = args.textType || type || `text`;

  const obj = {
    label: args.label || ``,
  };

  if (setType !== `text`) {
    obj.type = setType;
  }

  let hasValidations = false;
  const validations = {};

  if (args.noLabel) {
    obj.noLabel = true;
  }

  const contentType = args.contentType;
  if (contentType && contentType !== `String`) {
    obj.contentType = args.contentType;
  }

  if (setType === `textarea`) {
    if (args.resize) {
      obj.resize = true;
    }
    if (args.rows) {
      obj.rows = args.rows;
    }
  }

  if (arrayIncludes([`radio`, `checkbox`, `select`], type)) {
    const items = args.items || [];

    /* eslint-disable unicorn/explicit-length-check */
    if (!items.length && args.options) {
      const options = [`A`, `B`, `C`, `D`];

      arrayLoop(args.options, i => {
        items.push({
          option: `Option ${options[i]}`,
          value: contentType === `Number` ? (i + 1) : `${options[i].toLowerCase()}`,
        });
      });
    }
    obj.items = items;
  }

  arrayLoop([`email`, `url`], (index, key) => {
    if (setType === key) {
      validations[key] = true;
      hasValidations = true;
    }
  });

  if (args.required) {
    validations.required = true;
    hasValidations = true;
  }

  arrayLoop([`min`, `max`], (index, key) => {
    if (args[key]) {
      validations[key] = args[key];
      hasValidations = true;
    }
  });

  if (hasValidations) {
    obj.validations = validations;
  }

  return stringify ? stringifyObject(obj) : obj;
}

export {
  setValidation,
  createFieldObject,
};
