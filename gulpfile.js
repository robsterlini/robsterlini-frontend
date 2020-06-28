var gulp = require("gulp");
var rename = require("gulp-rename");
var path = require("path");
var sass = require("gulp-sass");

const { input, output } = require('./config/constants');

gulp.task('scss', function() {
  return gulp.src(`./${input}/_includes/styles.scss`)
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(`./${output}`));
});

// gulp.task('separate-scss', function () {

//       // using .scss extensions for sass files

//   return gulp.src(`src/_includes/**/*.scss`)

//     .pipe(sass({
//       includePaths: [
//         'src/_includes',
//       ],
//     }))

//     .pipe(rename(function (file) {

//         // file.dirname before any changes
//         console.log("file.dirname  1 = " + file.dirname);

//         // // this removes the last directory
//         var temp = file.dirname;
//         // console.log("    temp = " + temp);

//         // now add 'Css' to the end of the directory path

//         file.dirname = path.join('css', temp);
//         console.log("    after = " + file.dirname);
//     }))

//     .pipe(gulp.dest(output));
// });
