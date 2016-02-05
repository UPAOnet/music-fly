var gulp = require('gulp');
var sass = require ('gulp-sass');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var request = require('request');

gulp.task('start', () => {
  nodemon({
    script: 'app.js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('scripts', () => {
  gulp.src('client/app/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('client/app'))
})

gulp.task('test', () => {
  gulp.src('server/**/*.spec.js')
    .pipe(mocha())
})

gulp.task('sass', () => {
  gulp.src('client/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/app/css'))
});

gulp.task('watch', () => {
  gulp.watch('client/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'test', 'start', 'watch']);