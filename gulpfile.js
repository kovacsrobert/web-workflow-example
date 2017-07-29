var gulp = require('gulp'),
    gutil = require('gulp-util')
    coffee = require('gulp-coffee')
    debug = require('gulp-debug');

var coffeeSources = ['components/coffee/*.coffee'];

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(debug())
    .pipe(coffee({bare:true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
  gutil.log('Coffee files added to scripts folder');
});
