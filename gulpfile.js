var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	del = require('del'),
	fs = require('fs'),
	cp = require('child_process'),
	commandExistsSync = require('command-exists').sync;

// Gulp / Node utilities
var u = require( 'gulp-util' );
var log = u.log;
var c = u.colors;

function logError( err, res ) {
	log( c.red( 'Sass failed to compile' ) );
	log( c.red( '> ' ) + err.file.split( '/' )[err.file.split( '/' ).length - 1] + ' ' + c.underline( 'line ' + err.line ) + ': ' + err.message );
}

var jsFiles = [
	'./assets/src/main/wrapper-start.js',
	'./assets/src/main/shared-vars.js',
	'./assets/src/modules/*.js',
	'./assets/src/main/main.js',
	'./assets/src/main/wrapper-end.js'
];

var theme_name = 'rosa-lite',
	theme = theme_name,
	main_branch = 'master',
	options = {
		silent: true,
		continueOnError: true // default: false
	};

var config = {
	"baseurl": "demos.dev/rosa-lite"
};

if ( fs.existsSync( './gulpconfig.json' ) ) {
	config = require( './gulpconfig.json' )
} else {
	console.log( "Don't forget to create your own gulpconfig.json from gulpconfig.json.example" );
}

// -----------------------------------------------------------------------------
// Sass Task
//
// Compiles Sass and runs the CSS through autoprefixer. A separate task will
// combine the compiled CSS with vendor files and minify the aggregate.
// -----------------------------------------------------------------------------

function stylesMain() {
	return gulp.src('assets/scss/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({'sourcemap=auto': true, style: 'expanded'}).on('error', logError))
		.pipe(plugins.autoprefixer())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(plugins.replace(/^@charset \"UTF-8\";\n/gm, ''))
		.pipe(gulp.dest('./', {mode: "0644"}))
}
stylesMain.description = 'Compiles main css files (ie. style.css editor-style.css)';
gulp.task('styles-main', stylesMain);

function stylesRTL() {
	return gulp.src('style.css')
		.pipe(plugins.rtlcss())
		.pipe(plugins.rename('style-rtl.css'))
		.pipe(gulp.dest('.', {mode: "0644"}))
}
stylesRTL.description = 'Generate style-rtl.css file based on style.css';
gulp.task('styles-rtl', stylesRTL);

function stylesAdmin() {

	return gulp.src('inc/admin/scss/**/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass().on('error', logError))
		.pipe(plugins.autoprefixer())
		.pipe(plugins.replace(/^@charset \"UTF-8\";\n/gm, ''))
		.pipe(gulp.dest('./inc/admin/css'))
}
stylesAdmin.description = 'Compiles WordPress admin Sass and uses autoprefixer';
gulp.task('styles-admin', stylesAdmin )

function stylesWatch() {
	plugins.livereload.listen();
	return gulp.watch('assets/scss/**/*.scss', gulp.series( stylesMain, stylesRTL ) );
}
gulp.task('styles-watch', stylesWatch);

function stylesSequence(cb) {
	return gulp.series( 'styles-main', 'styles-rtl', 'styles-admin' )(cb);
}
stylesSequence.description = 'Compile the styles and generate RTL version.';
gulp.task( 'styles', stylesSequence  );

// -----------------------------------------------------------------------------
// Combine JavaScript files
// -----------------------------------------------------------------------------
function scriptsMain() {
	return gulp.src(jsFiles)
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.prettier())
		.pipe(gulp.dest('./assets/js/'))
		.pipe(plugins.terser())
		.pipe(plugins.rename('main.min.js'))
		.pipe(gulp.dest('./assets/js/'));
}
gulp.task('scripts-main', scriptsMain);

function scriptsVendor() {
	return gulp.src('./assets/src/plugins/*.js')
		.pipe(plugins.concat('plugins.js'))
		.pipe(plugins.prettier())
		.pipe(gulp.dest('./assets/js/'))
		.pipe(plugins.terser())
		.pipe(plugins.rename('plugins.min.js'))
		.pipe(gulp.dest('./assets/js/'));
}
gulp.task('scripts-vendor', scriptsVendor);

function scriptsSequence(cb) {
	return gulp.parallel( 'scripts-main', 'scripts-vendor')(cb);
}
scriptsSequence.description = 'Compile the scripts.';
gulp.task( 'scripts', scriptsSequence );

function scriptsWatch() {
	plugins.livereload.listen();
	return gulp.watch('assets/src/**/*.js', scriptsSequence);
}
gulp.task('scripts-watch', scriptsWatch);

function watch() {
	plugins.livereload.listen();
	gulp.watch('assets/scss/**/*.scss', gulp.series( stylesMain, stylesRTL ));
	gulp.watch('assets/src/**/*.js', scriptsSequence);
}
gulp.task('watch', watch);

/**
 * Copy theme folder outside in a build folder, recreate styles before that
 */
function copyFolder() {
	var dir = process.cwd();
	return gulp.src( './*' )
		.pipe( plugins.exec( 'rm -Rf ./../build; mkdir -p ./../build/' + theme + ';', {
			silent: true,
			continueOnError: true // default: false
		} ) )
		.pipe( plugins.rsync({
			root: dir,
			destination: '../build/' + theme + '/',
			// archive: true,
			progress: false,
			silent: false,
			compress: false,
			recursive: true,
			emptyDirectories: true,
			clean: true,
			exclude: ['node_modules']
		}));
}
gulp.task( 'copy-folder', copyFolder );

/**
 * Clean the folder of unneeded files and folders
 */
function removeUnneededFiles(done) {

	// files that should not be present in build
	files_to_remove = [
		'**/codekit-config.json',
		'node_modules',
		'config.rb',
		'gulpfile.js',
		'package.json',
		'package-lock.json',
		'pxg.json',
		'build',
		'.idea',
		'**/.svn*',
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
		'tests',
		'circle.yml',
		'circle_scripts',
		'README.md',
		'.labels',
		'.circleci',
		'.csscomb',
		'.csscomb.json',
		'.codeclimate.yml',
		'tests',
		'.jscsrc',
		'.jshintignore',
		'browserslist',
		'babel.config.js',
		'gulpconfig.json',
		'assets/scss',
		'assets/src',
		'inc/admin/scss'
	];

	files_to_remove.forEach(function (e, k) {
		files_to_remove[k] = '../build/' + theme + '/' + e;
	});

	return del(files_to_remove, {force: true});
}
gulp.task( 'remove-files', removeUnneededFiles );

function maybeFixBuildDirPermissions(done) {

	cp.execSync('find ./../build -type d -exec chmod 755 {} \\;');

	return done();
}
maybeFixBuildDirPermissions.description = 'Make sure that all directories in the build directory have 755 permissions.';
gulp.task( 'fix-build-dir-permissions', maybeFixBuildDirPermissions );

function maybeFixBuildFilePermissions(done) {

	cp.execSync('find ./../build -type f -exec chmod 644 {} \\;');

	return done();
}
maybeFixBuildFilePermissions.description = 'Make sure that all files in the build directory have 644 permissions.';
gulp.task( 'fix-build-file-permissions', maybeFixBuildFilePermissions );

function maybeFixIncorrectLineEndings(done) {
	if (!commandExistsSync('dos2unix')) {
		log( c.red( 'Could not ensure that line endings are correct on the build files since you are missing the "dos2unix" utility! You should install it.' ) );
		log( c.red( 'However, this is not a very big deal. The build task will continue.' ) );
	} else {
		cp.execSync('find ./../build -type f -print0 | xargs -0 -n 1 -P 4 dos2unix');
	}

	return done();
}
maybeFixIncorrectLineEndings.description = 'Make sure that all line endings in the files in the build directory are UNIX line endings.';
gulp.task( 'fix-line-endings', maybeFixIncorrectLineEndings );

// -----------------------------------------------------------------------------
// Replace the themes' text domain with the actual text domain (think variations)
// -----------------------------------------------------------------------------
function replaceThemeTextdomainPlaceholder() {

	return gulp.src( '../build/' + theme + '/**/*.php' )
		.pipe( plugins.replace( /['|"]__theme_txtd['|"]/g, '\'' + theme + '\'' ) )
		.pipe( gulp.dest( '../build/' + theme ) );
}
gulp.task( 'txtdomain-replace', replaceThemeTextdomainPlaceholder);

/**
 * Create a zip archive out of the cleaned folder and delete the folder
 */
function createZipFile(){

	// Right now we create a zip without the version information in the name.
	return gulp.src('./')
		.pipe(plugins.exec('cd ./../; rm -rf ' + theme + '*.zip; cd ./build/; zip -r -X ./../' + theme + '.zip ./; cd ./../; rm -rf build'));
}
gulp.task( 'make-zip', createZipFile );

function buildSequence(cb) {
	return gulp.series( 'copy-folder', 'remove-files', 'fix-build-dir-permissions', 'fix-build-file-permissions', 'fix-line-endings', 'txtdomain-replace' )(cb);
}
buildSequence.description = 'Sets up the build folder';
gulp.task( 'build', buildSequence );

function zipSequence(cb) {
	return gulp.series( 'build', 'make-zip' )(cb);
}
zipSequence.description = 'Creates the zip file';
gulp.task( 'zip', zipSequence  );
