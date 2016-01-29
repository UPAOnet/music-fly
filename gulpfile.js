var gulp = require('gulp');
var sass = require ('gulp-sass');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

gulp.task('start', () => {
  nodemon({
    script: 'app.js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('sass', () => {
  gulp.src('client/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/app/css'))
});

gulp.task('watch', () => {
  gulp.watch('client/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['start', 'sass', 'watch']);