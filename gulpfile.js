var gulp          = require('gulp'),
    ghPages       = require('gulp-gh-pages'),
    notify        = require('gulp-notify'),
    gutil         = require('gulp-util'),
    beep          = require('beepbeep'),
    plumber       = require('gulp-plumber'),
    compass       = require('gulp-compass'),
    autoprefixer  = require('gulp-autoprefixer'),
    cmq           = require('gulp-combine-media-queries'),
    map           = require('map-stream'),
    hologram      = require('gulp-hologram'),
    spawn         = require('child_process').spawn;

var onError = function (err) {
  beep([0, 0, 0]);
  gutil.log(gutil.colors.green(err));
};

// Run compass on sass
gulp.task('styles', function() {
  gulp.src('components/styles.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(compass({
      config_file: 'config.rb',
      css: 'build/css',
      sass: 'components'
    }))
    .pipe(autoprefixer('last 2 versions', '> 1%', 'Explorer >= 9'))
    .pipe(cmq())
    .pipe(gulp.dest('build/css'));
});

// Generate docs
gulp.task('docs', function(cb) {
  gulp.src('components')
    .pipe(hologram(cb));
});

// Deploy to github pages
gulp.task('deploy', function() {
  return gulp.src('./docs/**/*')
    .pipe(ghPages());
});

gulp.task('watch', function() {
  gulp.watch('components/**/*.scss', ['styles', 'docs']);
});



