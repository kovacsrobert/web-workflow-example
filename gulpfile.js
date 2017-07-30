var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(debug())
    .pipe(connect.reload());
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(debug())
    .pipe(coffee({bare:true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(debug())
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src(sassSources)
    .pipe(debug())
    .pipe(compass({
      sass: 'components/sass',
      images: 'builds/development/images',
      style: 'expanded'
    }).on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/development',
    livereload: true,
    debug: true
  });
});

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(['components/sass/*.scss'], ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('build', ['connect', 'coffee', 'js', 'sass', 'watch']);

gulp.task('default', ['build']);
