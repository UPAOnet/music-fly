var gulp = require('gulp');
    sass = require ('gulp-sass');
    concat = require('gulp-concat');
    nodemon = require('gulp-nodemon')

gulp.task('start', function () {
  nodemon({
    script: 'app.js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('scripts', () => {
  gulp.src('client/app/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('client/app/js'))
});



gulp.task('sass', function () {
  return gulp.src('client/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/app/css'))

});

gulp.task('watch', function () {
  gulp.watch('client/app/scss/*.scss', ['sass']);
  gulp.watch('client/app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['start', 'scripts', 'sass', 'watch']);