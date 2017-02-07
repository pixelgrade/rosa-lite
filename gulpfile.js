var theme 		= 'rosa',
	gulp 		= require('gulp'),
	prefix 		= require('gulp-autoprefixer'),
	sass 		= require('gulp-sass'),
	sourcemaps	= require('gulp-sourcemaps'),
	jshint 		= require('gulp-jshint'),
	clean 		= require('gulp-clean'),
	zip 		= require('gulp-zip'),
	cache 		= require('gulp-cache'),
	lr 			= require('tiny-lr'),
	server 		= lr(),
	exec 		= require('gulp-exec'),
	replace 	= require('gulp-replace'),
	minify 		= require('gulp-minify-css'),
	concat 		= require('gulp-concat'),
	notify 		= require('gulp-notify'),
	beautify 	= require('gulp-beautify'),
	uglify 		= require('gulp-uglify'),
	csscomb 	= require('gulp-csscomb'),
	fs          = require('fs'),
	rtlcss 		= require('gulp-rtlcss'),
	postcss 	= require('gulp-postcss'),
	del         = require('del'),
	rename 		= require('gulp-rename'),
	bs          = require('browser-sync'),
	u           = require('gulp-util'),
	reload      = bs.reload,
	prompt = require('gulp-prompt');

var
	themeTextDomain = '\'rosa\'',
	jsPath = './assets/js/',
	jsMainPath = jsPath + 'main/',
	jsFiles = [
		'shared_vars',
		'wrapper_start',
		'magnific-popup',
		'royalslider',
		'gmap',
		'downArrow',
	    'scrollToTop',
		'coverAnimations',
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

var config = require('./gulpconfig.json');


var theme_name = 'rosa',
	main_branch = 'rosa',
	options = {
		silent: true,
		continueOnError: true // default: false
	};




/**
 *   #STYLES
 */
gulp.task('styles', ['style.css'], function () {
    return gulp.src('style.css')
        .pipe(rtlcss())
        .pipe(rename('rtl.css'))
        .pipe(gulp.dest('.'));
});

gulp.task('style.css', ['assets/css'], function () {
    return gulp.src(['assets/scss/style.scss', 'assets/scss/editor-style.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.', {"mode": "0644"}));
});

gulp.task('assets/css', function () {
    return gulp.src(['assets/scss/**/*.scss', '!assets/scss/style.scss', '!assets/scss/editor-style.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css', {"mode": "0644"}));
});

gulp.task('browser-sync', function () {
	bs({
		// Point this to your pre-existing server.
		proxy: config.baseurl + (u.env.port ? ':' + u.env.port : ''),
		files: ['*.php', 'style.css', 'assets/js/main.js'],
		// This tells BrowserSync to auto-open a tab once it boots.
		open: true
	}, function(err, bs) {
		if (err) {
			console.log(bs.options);
		}
	});
});

gulp.task('bs', ['styles', 'scripts', 'browser-sync', 'watch']);





/**
 *   #SCRIPTS
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

gulp.task('scripts-watch', function () {
	return gulp.watch('assets/js/**/*.js', ['scripts']);
});

gulp.task('watch', ['styles', 'scripts'], function () {
	gulp.watch('assets/scss/**/*.scss', ['styles']);
	gulp.watch('assets/js/**/*.js', ['scripts']);
});

gulp.task('watch-admin', function () {
	gulp.watch('assets/scss/admin/*.scss', ['styles-admin']);
});

// usually there is a default task for lazy people who just wanna type gulp
gulp.task('start', ['styles', 'scripts'], function () {
	// silence
});




/**
 * Copy theme folder outside in a build folder, recreate styles before that
 */
gulp.task('copy-folder', function () {

	return gulp.src('./')
		.pipe(exec("rm -Rf ./../build; mkdir -p ./../build/rosa; rsync -aq --exclude='node_modules' ./* ./../build/rosa/"));
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
		'.travis.yml',
		'**/*.css.map',
		'**/.sass*',
		'.sass*',
		'**/.git*',
		'*.sublime-project',
		'*.sublime-workspace',
		'.DS_Store',
		'**/.DS_Store',
		'__MACOSX',
		'**/__MACOSX',
		'README.md',

		'assets/scss',
		'assets/js/main',
		'assets/js/plugins'
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
//gulp.task('zip', ['build'], function () {
//
//	return gulp.src('./')
//		.pipe(exec('cd ./../; rm -rf rosa.zip; cd ./build/; zip -r -X ./../rosa.zip ./rosa; cd ./../; rm -rf build'));
//
//});


/**
 * Create a zip archive out of the cleaned folder and delete the folder
 */
gulp.task('zip', ['build'], function(){

	var versionString = '';
	//get theme version from styles.css
	var contents = fs.readFileSync("./style.css", "utf8");

	// split it by lines
	var lines = contents.split(/[\r\n]/);

	function checkIfVersionLine(value, index, ar) {
		var myRegEx = /^[Vv]ersion:/;
		if ( myRegEx.test(value) ) {
			return true;
		}
		return false;
	}

	// apply the filter
	var versionLine = lines.filter(checkIfVersionLine);

	versionString = versionLine[0].replace(/^[Vv]ersion:/, '' ).trim();
	versionString = '-' + versionString.replace(/\./g,'-');

	return gulp.src('./')
		.pipe(exec('cd ./../; rm -rf' + theme[0].toUpperCase() + theme.slice(1) + '*.zip; cd ./build/; zip -r -X ./../' + theme[0].toUpperCase() + theme.slice(1) + '-Installer' + versionString +'.zip ./; cd ./../; rm -rf build'));

});


gulp.task('update-demo', function () {

	var run_exec = require('child_process').exec;

	gulp.src('./')
		.pipe(prompt.confirm( "This task will stash all your local changes without commiting them,\n Make sure you did all your commits and pushes to the main " + main_branch + " branch! \n Are you sure you want to continue?!? "))
		.pipe(prompt.prompt({
			type: 'list',
			name: 'demo_update',
			message: 'Which demo would you like to update?',
			choices: ['cancel', 'test.demos.pixelgrade.com/' + theme_name, 'demos.pixelgrade.com/' + theme_name]
		}, function(res){

			if ( res.demo_update === 'none' ) {
				console.log( 'No hard feelings!' );
				return false;
			}

			console.log('This task may ask for a github user / password or a ssh passphrase');

			if ( res.demo_update === 'test' ) {
				run_exec('git fetch; git checkout test; git pull origin ' + main_branch + '; git push origin test; git checkout ' + main_branch + ';', function (err, stdout, stderr) {
					// console.log(stdout);
					// console.log(stderr);
				});
				console.log( " ==== The master branch is up-to-date now. But is the CircleCi job to update the remote test.demo.pixelgrade.com" );
				return true;
			}


			if ( res.demo_update === 'production' ) {
				run_exec('git fetch; git checkout master; git pull origin test; git push origin master; git checkout ' + main_branch + ';', function (err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
				});

				console.log( " ==== The master branch is up-to-date now. But is the CircleCi job to update the remote demo.pixelgrade.com" );
				return true;
			}
		}));
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
		'watch-win          Watch on damn windows' +
		'=== CircleCI Scripts === \n' +
		'update-demo       Creates a prompt command which allows you to update the demos \n';


	console.log($help);

});
