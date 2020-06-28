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

const generateCss = ({ scssPath, cssPath, callback }) => {
  const scssOptions = {
    ...SCSS_OPTIONS,
    file: `src/_includes/${scssPath}`,
  };

  const scssCallback = (error, result) => {
    callback(null, !error ? result : '');

    if (error) {
      console.error('Error', error.line, error.message);
    }
  };

  const renderedCss = sass.renderSync(scssOptions);

  fs.writeFile(`${cssPath}`, renderedCss.css.toString(), (writeErr) => {
    if (writeErr) throw writeErr;

    scssCallback(null, cssPath);

    console.log(`CSS file saved: ${cssPath}`);
  });
};

const separateScss = (scssPath, callback) => {
  const cssPath = scssPath.replace('.scss', '.css');

  if (!fs.existsSync(path.dirname(cssPath))) {
    console.log(`Creating new CSS directory: ${path.dirname(cssPath)}/`);

    fs.mkdir(path.dirname(cssPath), { recursive: true }, (mkdirErr) => {
      if (mkdirErr) throw mkdirErr;

      console.log('CSS directory created.');

      generateCss({ scssPath, cssPath, callback });
    });
  }

  // Generate CSS on startup
  generateCss({ scssPath, cssPath, callback });
};

module.exports = {
  inlineScss,
  separateScss,
};
