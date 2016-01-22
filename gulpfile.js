var gulp = require('gulp');
    sass = require ('gulp-sass');
    concat = require('gulp-concat');

gulp.task('scripts', () => {
  gulp.src('/client/app/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('/client/app/js'))
});

gulp.task('sass', () => {
  gulp.src('/client/app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('/client/app/css'))
});

gulp.task('watch', function () {
  gulp.watch('/client/app/scss/**/*.scss', ['sass']);
  gulp.watch('/client/app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);