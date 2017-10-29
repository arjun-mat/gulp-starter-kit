var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

//define paths here
var paths = {
  src: {
    root: 'app/',
    index: 'app/index.html',
    views: 'app/views/',
    scripts: 'app/scripts/',
    styles: 'app/styles/',
    images: 'app/images/'
  },
  dest: {
    build: 'build',
    index: 'build/index.html',
    scripts: 'build/js',
    views: 'build/views',
    styles: 'build/css',
    images: 'build/images'
  },
  bower: 'bower_components'
};

//define custom assets to copy
var assets = [
  {
    src: paths.bower + '/chosen/' + '*.png',
    dest: paths.dest.styles + '/vendor',
    prefix: 2
  },
  {
    src: paths.bower + '/font-awesome/' + 'fonts/*',
    dest: paths.dest.build + '/fonts',
    prefix: 3
  }
];

// Clean the distribution directory
gulp.task('clean:build', function() {
  return del.sync('build');
});

// Move the app files to distribution directory
gulp.task('move', function() {
  //move index.html
  gulp.src([paths.src.index])
    .pipe(gulp.dest(paths.dest.build));

  //move all views
  gulp.src([paths.src.views + '**/*'])
    .pipe(gulp.dest(paths.dest.views));

  //move all images
  gulp.src([paths.src.images + '**/*'])
    .pipe(gulp.dest(paths.dest.images));

  return;
});

gulp.task('sassify', function() {

  return gulp.src(paths.src.styles + 'scss/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: [
        paths.src.styles + 'scss/**/{*.scss, *.sass}',
        paths.bower + '/bootstrap-sass/assets/stylesheets'
      ]
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(
      [
        'last 15 versions',
        '> 1%',
        'ie 8',
        'ie 7'
      ], { cascade: true }
    ))
    .pipe($.minifyCss())
    .pipe(gulp.dest(paths.src.styles))
    .pipe($.size({ title: 'Compiling SASS...' }))
    .pipe($.sourcemaps.write('./maps'));

});

gulp.task('useref', function () {

  var jsFilter = $.filter('**/*.js', {restore: true});
  var cssFilter = $.filter('**/*.css', {restore: true});

  return gulp.src(paths.src.index)
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss()))
    //revision for js files
    .pipe(jsFilter)
    .pipe($.rev())
    .pipe(jsFilter.restore)
    //revision for css files
    .pipe(cssFilter)
    .pipe($.rev())
    .pipe(cssFilter.restore)
    //replace the revisions in index.html
    .pipe($.revReplace())
    .pipe(gulp.dest(paths.dest.build))
    .pipe($.size({ title: 'Referencing app files...' }));
});

gulp.task('wiredep', function () {

  gulp.src(paths.src.index)
    .pipe(wiredep({}))
    .pipe($.if('*.js', $.concat('vendor.js')))
    .pipe($.if('*.css', $.concat('vendor.css')))
    .pipe(gulp.dest(paths.src.root));
});

gulp.task('copy:assets', function() {

  assets.forEach(function (value, key) {

    gulp.src([value.src])
      .pipe($.copy(value.dest, {prefix: value.prefix }))
      .pipe($.size({ title: 'Copying ' + value.src + '...' }));
  });

});

gulp.task('build', function () {

  runSequence(
    'clean:build',
    'move',
    'sassify',
    'useref',
    'copy:assets'
  );
  
});

gulp.task('browserSync', function () {
  return browserSync.init({
    port: 5000,
    server: {
      baseDir: 'app',
      routes: {
        "/bower_components": "bower_components"
      },
    },
  });
});

gulp.task('serve', ['browserSync', 'sassify'], function () {
  gulp.watch('app/styles/**/*.scss', ['sass']); 
  gulp.watch('app/**/*.html', browserSync.reload); 
  gulp.watch('app/scripts/**/*.js', browserSync.reload);
  gulp.watch('bower_components/**', ['wiredep']);
});


// Default Task
gulp.task('default', ['serve']);
