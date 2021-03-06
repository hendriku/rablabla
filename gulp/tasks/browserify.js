/* browserify task
   ---------------
   Bundle javascripty things with browserify!
   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.
   See browserify.bundleConfigs in gulp/config.js
*/
const browserify = require('browserify');
const watchify = require('watchify');
const bundleLogger = require('../util/bundleLogger');
const gulp = require('gulp');
const handleErrors = require('../util/handleErrors');
const source = require('vinyl-source-stream');
const config = require('../config').browserify;
const babelify = require('babelify');

gulp.task('browserify', (callback) => {
  let bundleQueue = config.bundleConfigs.length;

  const browserifyThis = (bundleConfig) => {
    let bundler = browserify({
      // Required watchify args
      cache: {},
      packageCache: {},
      fullPaths: false,
      // Specify the entry point of your app
      entries: bundleConfig.entries,
      // Add file extensions to make optional in your requires
      extensions: config.extensions,
      // Enable source maps!
      debug: config.debug,
    });

    const reportFinished = () => {
      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName);

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback();
        }
      }
    };

    const bundle = () => {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);
      return bundler
        .bundle()
        // Report compile errors
        .on('error', handleErrors)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .pipe(source(bundleConfig.outputName))
        // Specify the output destination
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished);
    };

    bundler.transform(babelify.configure());

    if (global.isWatching) {
      // Wrap with watchify and rebundle on changes
      bundler = watchify(bundler);
      // Rebundle on update
      bundler.on('update', bundle);
    }


    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach(browserifyThis);
});
