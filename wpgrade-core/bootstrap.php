<?php

#
# This file performs initial environment setup.
#

do_action('before_wpgrade_core');

$basepath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR;

//require $basepath . 'wpgrade.php';
get_template_part( 'wpgrade-core/wpgrade' );

// Dynamically load in all classes
// -------------------------------

# Loading convention: if it's a PHP file it's loaded, the shorter the path
# the higher the priority

$classpath = $basepath . 'classes' . DIRECTORY_SEPARATOR;
wpgrade::require_all( $classpath );

// Setup Option Drivers
// --------------------

// the handler is the main object responsible for managing the drivers
wpgrade::options_handler( new WPGradeOptions() );

# [!!] driver priority works like a LIFO stack, last in = highest priority

// register basic configuration driver
$config = wpgrade::get_config();
wpgrade::options()->add_optiondriver( new WPGradeOptionDriver_Config() );

// Hooks
// -----
get_template_part( 'wpgrade-core/hooks' );

do_action('after_wpgrade_core');
