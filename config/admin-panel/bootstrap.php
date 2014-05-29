<?php

$currentpath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR;

#
# All relevant configuration information (args, sections, tabs) have been
# moved to redux-* files located in the same section as this file.
#
# The setup function, ie. setup_framework_options has been renamed to
# wpgrade_call_redux_options_setup since this is the only place it's used
# and god knows "framework" is what everyone and their monther calls
# anything they make these days.
#
# The use of the global has been removed in favor of using a proper Options
# object at the theme level, which accepts more then just redux as a
# source and may have multiple sources. This is both more flexible
# and a cleaner implementation.
#
# The file has also been purged of code that had no effect, with the
# exception of configuration file commented out entries, since those are
# generally helpful.
#

wpgrade::require_coremodule( 'redux3' );

$currentpath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR;

global $redux_sections;

$wpgrade_redux_coremodule = 'redux3'; # used inside configuration files
$redux_args               = include $currentpath . 'redux-args' . EXT;
$redux_sections           = include $currentpath . 'redux-sections' . EXT;
$redux_tabs               = include $currentpath . 'redux-tabs' . EXT;

$redux = new ReduxFramework( $redux_sections, $redux_args, $redux_tabs );
wpgrade::resolve( 'redux-instance', $redux );

/**
 * Enqueue our custom css on admin panel
 */
function wpgrade_add_admin_custom_style() {

	wp_enqueue_style( 'redux-theme-custom-css', wpgrade::resourceuri( 'css/admin/admin-panel.css' ), array(), time(), 'all' );

	wp_enqueue_script( 'wp-ajax-response' );

	wp_enqueue_script( 'redux-theme-custom-js', wpgrade::resourceuri( 'js/admin/admin-panel.js' ), array(), time(), true );
}

// This example assumes your opt_name is set to redux, replace with your opt_name value
add_action( 'redux/page/' . wpgrade::shortname() . '_options/enqueue', 'wpgrade_add_admin_custom_style', 0 );

// register callbacks
require $currentpath . 'callbacks' . EXT;
