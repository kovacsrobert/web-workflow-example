var gulp = require('gulp'),
    gutil = require('gulp-util')
    coffee = require('gulp-coffee')
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss'];

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
        gutil.log('JS files concatenated and added to DEV scripts folder');
      })
    );
});

gulp.task('sass', function() {
  gulp.src(sassSources)
    .pipe(debug())
    .pipe(compass({
      sass: 'components/sass',
      images: 'builds/development/images',
      style: 'expanded'
    })
      .on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css')
      .on('end', function() {
        gutil.log('Sass files built and added to DEV css folder');
      })
    );
});
