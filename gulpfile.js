var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    reactify = require('reactify'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    watchify = require('watchify'),
    streamify = require('gulp-streamify');

var path = {
  HTML: 'public/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'public/dist',
  DEST_BUILD: 'public/dist',
  DEST_SRC: 'public/dist',
  ENTRY_POINT: './public/scripts/03-gooey/index.js',
  WATCH_JS: "public/scripts/**",
  BASE_DIR: './public'
};

// gulp.task('copy', function(){
//   gulp.src(path.HTML)
//     .pipe(gulp.dest(path.DEST));
// });

gulp.task('build', function () {
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [babelify, reactify],
    extensions: ['.js', '.jsx'],
    debug: true
  })
  .bundle()
  .pipe(source(path.MINIFIED_OUT))
  .pipe(streamify(uglify(path.MINIFIED_OUT)))
  .pipe(gulp.dest(path.DEST_BUILD))
});

gulp.task("watch", function() {
  // gulp.watch(path.HTML, ['copy']);
  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [babelify, reactify],
    extensions: ['.js', '.jsx'],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('+++ UPDATED +++');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);

/** BROWSER SYNC **/

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['watch'], browserSync.reload);

gulp.task('sync', ['watch'], function () {
  browserSync.init([path.WATCH_JS], {
  		server: {
  			baseDir: path.BASE_DIR
  		},
  		notify: false,
  		browser: ["google chrome"]
  });
	// add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch(path.WATCH_JS, ['js-watch']);
});
 
gulp.task('default', ['sync']);