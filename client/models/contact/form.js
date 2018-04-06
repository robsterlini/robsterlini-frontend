'use strict';

export default {
  // email: {
  //     label: 'Email',
  //     validations: {
  //         required: true,
  //         email: true,
  //     },
  // },
  // password: {
  //     label: 'Password',
  //     validations: {
  //         required: true,
  //     },
  // },
  firstName: {
    label: `First name`,
    validations: {
      required: true,
      minLength: 2,
    },
  },
  lastName: {
    label: `Last name`,
    validations: {
      required: true,
      minLength: 2,
    },
  },
  email: {
    label: `Email`,
    type: `email`,
    validations: {
      required: true,
      email: true,
    },
  },
  company: {
    label: `Company`,
    validations: {
      required: true,
    },
  },
  website: {
    label: `Website`,
    type: `url`,
    validations: {
      url: true,
    },
  },
  message: {
    label: `Message`,
    type: `textarea`,
    validations: {
      required: true,
      minLength: 10,
      maxLength: 250,
    },
  },
  budget: {
    label: `Budget`,
    type: `select`,
    placeholder: `Choose your budget`,
    prefix: `$`,
    items: [
      {
        option: `250k+`,
        value: `gt250`,
      }, {
        option: `100k–250k`,
        value: `100to250`,
      }, {
        option: `25k–100k`,
        value: `25to100`,
      }, {
        option: `Other`,
        value: `other`,
      },
    ],
    validations: {
      required: true,
    },
  },
  budgetOther: {
    label: `Please specify`,
    type: `number`,
    step: 1000,
    prefix: `$`,
    conditional: {
      parent: `budget`,
      value: `other`,
    },
    validations: {
      required: true,
      between: [0, 75000],
    },
  },
  browser: {
    label: `Browser`,
    hidden: true,
  },
};
