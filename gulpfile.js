var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({
     extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy', 'compress']);
