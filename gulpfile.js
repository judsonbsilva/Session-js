var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

// compress
gulp.task('compress', function() {
  gulp.src('src/*.js')
  	.pipe(concat('session.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default',['compress']);