var gulp = require('gulp'),
    gutil = require('gulp-util')
    coffee = require('gulp-coffee')
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(debug())
    .pipe(coffee({bare:true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts')
      .on('end', function() {
        gutil.log('Coffee files added to scripts folder');
      }));
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(debug())
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js')
      .on('end', function() {
        gutil.log('JS files concatenated and added to scripts folder');
      })
    );
});
