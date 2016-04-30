var gulp = require('gulp');
var sass = require ('gulp-sass');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var request = require('request');

// gulp.task('test', () => {
//   gulp.src('server/**/*.spec.js')
//     .pipe(mocha())
// })

// gulp.task('sass', () => {
//   gulp.src('client/src/scss/styles.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('client/dev/public/css'))
// });

// gulp.task('watch', () => {
//   gulp.watch('client/scss/**/*.scss', ['sass']);
// });
//
// gulp.task('default', ['sass', 'watch']);
