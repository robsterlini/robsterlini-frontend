const sass = require('node-sass');
const fs = require('fs');
const path = require('path');

const { input, output } = require('./constants.js');

const SCSS_OPTIONS = {
  includePaths: [
    `${input}/_includes`,
  ],
  outputStyle: 'compressed',
};

const inlineScss = (data, callback) => {
  const scssOptions = {
    ...SCSS_OPTIONS,
    data,
  };

  const scssCallback = (error, result) => {
    callback(null, !error ? result.css : '');

    if (error) {
      console.error('Error', error.line, error.message);
    }
  };

  sass.render(scssOptions, scssCallback);
};

module.exports = {
  inlineScss,
  SCSS_OPTIONS,
};
