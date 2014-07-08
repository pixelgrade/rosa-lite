/*
 * Variables
 */
var theme = 'rosa',
	themeTextDomain = '\'rosa_txtd\'',
	cssPath = './assets/css/',
	scssPath = './assets/scss/',
	jsPath = './assets/js/',
	jsMainPath = jsPath + 'main/';
jsFiles = [
	'shared_vars',
	'wrapper_start',
	'magnific-popup',
	'royalslider',
	'gmap',
	'parallax',
	'downArrow',
    'scrollToTop',
	'coverAnimations',
	'navigator',
    'stickyHeader',
	'main',
	'404',
	'unsorted',
	'wrapper_end',
	'functions'
];

// Prepare js paths
jsFiles.forEach(function (e, k) {
	jsFiles[k] = jsMainPath + e + ".js";
});


/*
 * Load Plugins
 */
var gulp = require('gulp'),
	compass = require('gulp-compass'),
	exec = require('gulp-exec'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	zip = require('gulp-zip'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	browserSync = require('browser-sync'),
	replace = require('gulp-replace'),
	gutil = require('gulp-util'), //Error Handler
	lr = require('tiny-lr'),
	server = lr();


/*
 * watch
 * ------------------------------------------------
 * Main Task for compiling both SASS and JavaScript
 */
gulp.task('watch', function () {
	// Watch .scss files
	gulp.watch('./assets/scss/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('./assets/js/**/*.js', ['scripts']);
});


/*
 * styles
 * ----------------------------------
 * Compile SASS files with SourceMaps
 */
gulp.task('styles', function () {
	gulp.src('./')
		.pipe(exec('sass --force --update --compass --sourcemap assets/scss:assets/css --style expanded -E utf-8  2> /dev/null'))
		.on('error', gutil.log);
});


/*
 * scripts
 * ------------------------
 * Compile JavaScript files
 */
gulp.task('scripts', function () {
	gulp.src('./assets/js/plugins/*.js')
		.pipe(concat('plugins.js'))
		.pipe(gulp.dest('./assets/js/'));

	return gulp.src(jsFiles)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./assets/js/'))
		.pipe(notify({message: 'Scripts task complete'}));
});


/*
 * browser-sync
 * ------------------------
 * Synchronised browser testing
 * http://browsersync.io/
 */
gulp.task('browser-sync', ['watch'], function () {
	browserSync.init([cssPath + "*.css", jsPath + "main.js"], {
		proxy: 'localhost/' + theme
	});
});


gulp.task('scripts-compressed', function () {
	gulp.src('./assets/js/plugins/*.js')
		.pipe(concat('plugins.js'))
		.pipe(uglify({outSourceMap: true}))
		.pipe(gulp.dest('./assets/js/'));

	return gulp.src(jsFiles)
		.pipe(concat('main.js'))
		.pipe(uglify({outSourceMap: true}))
		.pipe(gulp.dest('./assets/js/'))
		.pipe(notify({message: 'Scripts task complete'}));
});


gulp.task('dev', function () {
	gulp.src('./')
		.pipe(
		exec('sass --force --update --compass --sourcemap content/scss:content/css --style expanded -E utf-8')
	)
});

gulp.task('watch-win', function () {

	// Watch .scss files
	gulp.watch('./assets/scss/**/*.scss', ['dev']);

	// Watch .js files
	gulp.watch('./assets/js/**/*.js', ['scripts']);

});

gulp.task('watch-scripts', function () {

	// Watch .js files
	gulp.watch('./assets/js/**/*.js', ['scripts']);

});

gulp.task('watch-styles', function () {

	// Watch .js files
	gulp.watch('./assets/scss/**/*.scss', ['styles']);
	gulp.watch('./wpgrade-core/resources/assets/admin-panel/scss/**/*.scss', ['styles']);

});

gulp.task('default', ['help'], function () {

	// silence
});

/**
 * Cleanup the css folder and recreate the css files
 */
gulp.task('styles-nested', function () {
	return gulp.src('./')
		.pipe(exec('rm -Rf ./assets/css/* ; ruby assets/+production-nested.rb'));
});

/**
 * Cleanup the css folder and recreate the css files compressed
 */
gulp.task('styles-compressed', function () {
	return gulp.src('./')
		.pipe(exec('rm -Rf ./assets/css/* ; ruby assets/+production-compressed.rb'));
});

gulp.task('start', ['styles-nested', 'scripts'], function () {
	console.log('theme should be ready');
});

gulp.task('server', ['styles-compressed', 'scripts-compressed'], function () {
	console.log('The styles and scripts have been compiled for production! Go and clear the caches!');
});

/**
 * Copy theme folder outside in a build folder, recreate styles before that
 */
gulp.task('copy-folder', ['styles-nested', 'scripts'], function () {

	return gulp.src('./')
		.pipe(exec('rm -Rf ./../build; mkdir -p ./../build/rosa; cp -Rf ./* ./../build/rosa/'));
});

/**
 * Replace the bad dynamic text domain with a static one
 */
gulp.task('txtdomain-replace', ['copy-folder'], function(){
	gulp.src('../build/rosa/**/*.php')
		.pipe(replace(/wpgrade\:\:textdomain\(\)/g, themeTextDomain))
		.pipe(gulp.dest('../build/rosa'));
});

/**
 * Clean the folder of unneeded files and folders
 */
gulp.task('build', ['txtdomain-replace'], function () {

	// files that should not be present in build zip
	files_to_remove = [
		'**/codekit-config.json',
		'node_modules',
		'config.rb',
		'gulpfile.js',
		'package.json',
		'wpgrade-core/vendor/redux2',
		'wpgrade-core/features',
		'wpgrade-core/tests',
		'wpgrade-core/**/*.less',
		'wpgrade-core/**/*.scss',
		'wpgrade-core/**/*.rb',
		'wpgrade-core/**/sass',
		'wpgrade-core/**/scss',
		'pxg.json',
		'build',
		'css',
		'.idea',
		'**/*.css.map',
		'**/.sass*',
		'.sass*',
		'**/.git*',
		'*.sublime-project',
		'.DS_Store',
		'**/.DS_Store',
		'__MACOSX',
		'**/__MACOSX'
	];

	files_to_remove.forEach(function (e, k) {
		files_to_remove[k] = '../build/rosa/' + e;
	});

	return gulp.src(files_to_remove, {read: false})
		.pipe(clean({force: true}));
});

/**
 * Create a zip archive out of the cleaned folder and delete the folder
 */
gulp.task('zip', ['build'], function () {

	return gulp.src('./')
		.pipe(exec('cd ./../; rm -rf rosa.zip; cd ./build/; zip -r -X ./../rosa.zip ./rosa; cd ./../; rm -rf build'));

});


/**
 * Short commands help
 */


gulp.task('help', function () {

	var $help = '\nCommands available : \n \n' +
		'=== General Commands === \n' +
		'start              Compiles all styles and scripts and makes the theme ready to start \n' +
		'build              Create a cleaned up build folder for the current theme \n' +
		'server             Recompile the styles and scripts compressed for server \n' +
		'zip                Create a zip archive from the current build folder and deletes it \n' +
		'=== Style === \n' +
		'styles             Compiles styles in development mode \n' +
		'styles-compressed  Compiles styles in development mode \n' +
		'styles-nested      Prepare the style for production (deletes all existing files in the css folder) \n' +
		'=== Scripts === \n' +
		'scripts            Concatenate all js scripts \n' +
		'scripts-compressed Concatenate all js scripts and compress the file with uglify \n' +
		'=== Watchers === \n' +
		'watch              Watches all js and scss files \n' +
		'watch-styles       Watch only styles\n' +
		'watch-scripts      Watch scripts only \n' +
		'watch-win          Watch on damn windows';


	console.log($help);

});
