<?php

	#
	# This file bootstraps tests.
	#

	$testspath = dirname(__FILE__).DIRECTORY_SEPARATOR;

	// ensure EXT is defined
	if ( ! defined('EXT')) {
		define('EXT', '.php');
	}

	// Compatibility
	// ------------------------------------------------------------------------

	// Tests run on the CLI. The command line php may be far more adavanced
	// for consistency and also because the tools require PHP to be advanced
	// and not PHP 5.2 which is required by wordpress
	//
	// The following are extra options required by the latest version of php

	// setting the timezone is mandatory
	date_default_timezone_set('UTC');


	// Wordpress constants
	// ------------------------------------------------------------------------

	if ( ! defined('ABSPATH')) {
		define('ABSPATH', realpath($testspath.'../../../../../').DIRECTORY_SEPARATOR);
	}

	// Mock wordpress functions
	// ------------------------------------------------------------------------

	// We do not care for the effect of wordpress functions, we care for the
	// effect of our code; so it's actually ideal that we don't use the
	// wordpress functions and instead fake ones; note that the tests don't go
	// though wordpress so no wordpress functions are loaded.

	require $testspath.'assets/wordpress-functions'.EXT;
	require $testspath.'assets/mockup-callbacks'.EXT;


	// Load in system
	// ------------------------------------------------------------------------

	require $testspath.'../bootstrap'.EXT;

	$config = wpgrade::config();
	wpgrade::options()->add_optiondriver(new WPGradeOptionDriver_Config($config['theme-options']));

