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
//
// var gulp = require('gulp');
// var browserify = require('browserify');
// var babelify = require('babelify');
// var source = require('vinyl-source-stream');
// var nodemon = require('gulp-nodemon');
//
// gulp.task('start', function () {
//   nodemon({
//     script:'server/app.js',
//     ext: 'js html',
//     env: {'NODE_ENV': 'development'}
//   })
// })
//
// gulp.task('html', () => {
//   gulp.src('client/index.html')
//     .pipe(gulp.dest('server/dist'))
// })
//
// gulp.task('css', () => {
//   gulp.src('client/app/css/**/*.css')
//     .pipe(gulp.dest('server/dist/public/css'))
// })
//
// gulp.task('assets', () => {
//   gulp.src('client/app/images/**')
//     .pipe(gulp.dest('server/dist/public/images'))
// })
//
// gulp.task('bundle', () => {
//   browserify({entries: 'client/app/js/default.js', extensions: ['.js'], debug: true})
//     .transform('babelify', {presets:['es2015']})
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest('server/dist/public/js'));
//     console.log('bundle complete')
// });
//
// gulp.task('watch', function () {
//   gulp.watch('client/index.html', ['html']);
//   gulp.watch('client/app/css/**/*.css', ['css']);
//   gulp.watch('client/app/images/**', ['assets']);
//   gulp.watch('client/app/js/**/*.js', ['bundle'])
// })
//
// gulp.task('default', ['bundle', 'html', 'css', 'assets', 'start', 'watch']);
