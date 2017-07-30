var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify');

var devConfig = {
  env: 'development',
  outputDir: 'builds/development/',
  coffeeSources: ['components/coffee/*.coffee'],
  jsSources: [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
  ],
  sassSources: ['components/sass/style.scss'],
  allSassSources: ['components/sass/*.scss'],
  htmlSources: ['builds/development/*.html'],
  jsonSources: ['builds/development/js/*.json'],
  sassStyle: 'expanded'
};
var prodConfig = {
  env: 'production',
  outputDir: 'builds/production/',
  coffeeSources: ['components/coffee/*.coffee'],
  jsSources: [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
  ],
  sassSources: ['components/sass/style.scss'],
  allSassSources: ['components/sass/*.scss'],
  htmlSources: ['builds/production/*.html'],
  jsonSources: ['builds/production/js/*.json'],
  sassStyle: 'compressed'
};
var env = process.env.NODE_ENV || 'development';
var config = (env === 'production' || env === 'prod' || env === 'p' || env === 'P')
  ? prodConfig
  : devConfig ;

gutil.log('env-input: \"' + env + '\", env-config: ' + config.env);

gulp.task('html', function() {
  gulp.src(config.htmlSources)
    .pipe(debug())
    .pipe(connect.reload());
});

gulp.task('json', function() {
  gulp.src(config.jsonSources)
    .pipe(debug())
    .pipe(connect.reload());
});

gulp.task('coffee', function() {
  gulp.src(config.coffeeSources)
    .pipe(debug())
    .pipe(coffee({bare:true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
});

gulp.task('js', function() {
  gulp.src(config.jsSources)
    .pipe(debug())
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(config.env === prodConfig.env, uglify()))
    .pipe(gulp.dest(config.outputDir + 'js'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src(config.sassSources)
    .pipe(debug())
    .pipe(compass({
      sass: 'components/sass',
      images: config.outputDir + 'images',
      style: config.sassStyle
    }).on('error', gutil.log))
    .pipe(gulp.dest(config.outputDir + 'css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: config.outputDir,
    livereload: true,
    debug: true
  });
});

gulp.task('watch', function() {
  gulp.watch(config.coffeeSources, ['coffee']);
  gulp.watch(config.jsSources, ['js']);
  gulp.watch(config.allSassSources, ['sass']);
  gulp.watch(config.htmlSources, ['html']);
  gulp.watch(config.jsonSources, ['json']);
});

gulp.task('build', ['connect', 'coffee', 'js', 'sass','json', 'html', 'watch']);

gulp.task('default', ['build']);
