var gulp = require("gulp");
var rename = require("gulp-rename");
var path = require("path");
var sass = require("gulp-sass");

const { input, output } = require('./config/constants');
const { SCSS_OPTIONS } = require('./config/scss');

sass.compiler = require('node-sass');

gulp.task('scss', function() {
  return gulp.src(`./${input}/_includes/styles.scss`)
    .pipe(sass(SCSS_OPTIONS)
    .on('error', sass.logError))
    .pipe(gulp.dest(`./${output}`));
});

// gulp.task('separate-scss', function () {
//   return gulp.src(`src/_includes/**/*.scss`)
//     .pipe(sass({
//       includePaths: [
//         'src/_includes',
//       ],
//     }))
//     .pipe(rename(function (file) {
//       file.dirname = path.join('css', file.dirname);
//     }))
//     .pipe(gulp.dest(output));
// });
