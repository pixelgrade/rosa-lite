<?php

#
# This file performs initial environment setup.
#

// ensure EXT is defined
if ( ! defined( 'EXT' ) ) {
	define( 'EXT', '.php' );
}

$basepath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR;
require $basepath . 'wpgrade' . EXT;

// Setup translations
// ------------------

load_theme_textdomain( wpgrade::textdomain(), wpgrade::themefilepath( wpgrade::confoption( 'language-path', 'languages' ) ) );

// Dynamically load in all classes
// -------------------------------

# Loading convention: if it's a PHP file it's loaded, the shorter the path
# the higher the priority

$classpath = $basepath . 'classes' . DIRECTORY_SEPARATOR;
wpgrade::require_all( $classpath );

// Setup Option Drivers
// --------------------

if ( wpgrade::confoption('wpml_separate_options', false ) ) {
	$wpgrade_redux = new wpGrade_Redux();
}

// the handler is the main object responsible for managing the drivers
wpgrade::options_handler( new WPGradeOptions() );

# [!!] driver priority works like a LIFO stack, last in = highest priority

// register basic configuration driver
$config = wpgrade::config();
wpgrade::options()->add_optiondriver( new WPGradeOptionDriver_Config( $config['theme-options'] ) );

// we register redux as option driver via a resolver

function wpgrade_callback_bootstrap_redux_instance( $redux ) {
	$reduxdriver = new WPGradeOptionDriver_Redux( $redux );
	wpgrade::options()->add_optiondriver( $reduxdriver );
}

wpgrade::register_resolver( 'redux-instance', 'wpgrade_callback_bootstrap_redux_instance' );


// Plugins & Resolvable Dependencies
// ---------------------------------
require wpgrade::themefilepath( wpgrade::confoption( 'theme-adminpanel-path', 'theme-content/admin-panel' ) . '/bootstrap' . EXT );


// Hooks
// -----

require 'hooks' . EXT;


// Upgrade Notifier
// ----------------

add_action( 'wp_ajax_wpgrade_upgradestep_check_marketplace_data', 'wpgrade_ajax_upgradestep_check_marketplace_data' );
add_action( 'wp_ajax_wpgrade_upgradestep_search_for_update', 'wpgrade_ajax_upgradestep_search_for_update' );
add_action( 'wp_ajax_wpgrade_upgradestep_backup_theme', 'wpgrade_ajax_upgradestep_backup_theme' );
add_action( 'wp_ajax_wpgrade_upgradestep_analyze_download_options', 'wpgrade_ajax_upgradestep_analyze_download_options' );
add_action( 'wp_ajax_wpgrade_upgradestep_download_package', 'wpgrade_ajax_upgradestep_download_package' );
add_action( 'wp_ajax_wpgrade_upgradestep_install_package', 'wpgrade_ajax_upgradestep_install_package' );

if ( is_admin() && basename( $_SERVER["PHP_SELF"] ) != 'update-core.php' ) {
	add_action( 'admin_enqueue_scripts', 'wpgrade_callback_update_notifier_admin_initialization' );
	add_action( 'admin_menu', 'wpgrade_callback_update_notifier_menu' );
	add_action( 'admin_bar_menu', 'wpgrade_callback_update_notifier_bar_menu', 1000 );
	add_action( 'admin_notices', 'wpgrade_callback_update_notifier_update_notice' );
}


// Media Handlers
// --------------

// make sure that WordPress allows the upload of our used mime types
add_filter( 'upload_mimes', 'wpgrade_callback_custom_upload_mimes' );
// remove the first gallery shortcode from the content
add_filter( 'the_content', 'wpgrade_callback_gallery_slideshow_filter' );
