<?php

$ds = DIRECTORY_SEPARATOR;

#
# This file assigns environment hooks.
#

// Include all theme specific classes and functions
// ------------------------------------------------------------------------

$themeincludepaths = wpgrade::confoption( 'include-paths', array() );

foreach ( $themeincludepaths as $path ) {
	$fullpath = wpgrade::themepath() . $ds . $path;
	if ( file_exists( $fullpath ) ) {
		wpgrade::require_all( $fullpath );
	}
}

$themeincludefiles = wpgrade::confoption( 'include-files', array() );
foreach ( $themeincludefiles as $file ) {

	if ( file_exists( wpgrade::childpath() . $file ) ) {
		require wpgrade::childpath() . $file;
	} else {
		require wpgrade::themepath() . $file;
	}
}


// Include core specific callbacks
// ------------------------------------------------------------------------

$callbackspath = dirname( __FILE__ ) . $ds . 'callbacks';
wpgrade::require_all( $callbackspath );


// Theme Setup
// ------------------------------------------------------------------------

/**
 * ...
 */
function rosa_callback_themesetup() {

	// General Purpose Resource Handling
	// ---------------------------------

	// register resources
	add_action( 'wp_enqueue_scripts', 'rosa_callback_register_theme_resources', 1 );

	// auto-enque based on configuration entries and callbacks
	add_action( 'wp_enqueue_scripts', 'rosa_callback_enqueue_theme_resources', 1 );

	$themeconfiguration = wpgrade::config();

	// Specialized Resource Handling
	// -----------------------------

	// extra script equeue handlers
	foreach ( $themeconfiguration['resources']['script-enqueue-handlers'] as $callback ) {
		if ( $callback !== null ) {
			if ( ! is_array( $callback ) ) {
				add_action( 'wp_enqueue_scripts', $callback, 10 );
			} else { // $callback is array
				if ( ! empty( $callback['handler'] ) ) {
					isset( $callback['priority'] ) or $callback['priority'] = 10;
					add_action( 'wp_enqueue_scripts', $callback['handler'], $callback['priority'] );
				}
			}
		}
	}

	// some info
	add_action( 'after_switch_theme', 'rosa_callback_gtkywb' );

	// custom javascript handlers - make sure it is the last one added
	add_action( 'wp_head', 'rosa_callback_load_custom_js', 999 );
	add_action( 'wp_footer', 'rosa_callback_load_custom_js_footer', 999 );

	$handler = wpgrade::confoption( 'custom-css-handler', null );

	if ( empty( $handler ) ) {
		$handler = 'rosa_callback_inlined_custom_style';
	}

	add_action( 'wp_enqueue_scripts', $handler, 999999 );
}

add_action( 'after_setup_theme', 'rosa_callback_themesetup', 16 );


/**
 * ...
 */
function rosa_callbacks_setup_shortcodes_plugin() {
	$current_options = get_option( 'rosa_shortcodes_list' );

	$config     = wpgrade::config();
	$shortcodes = $config['shortcodes'];

	// create an array with shortcodes which are needed by the
	// current theme
	if ( $current_options ) {
		$diff_added   = array_diff( $shortcodes, $current_options );
		$diff_removed = array_diff( $current_options, $shortcodes );
		if ( ( ! empty( $diff_added ) || ! empty( $diff_removed ) ) && is_admin() ) {
			update_option( 'rosa_shortcodes_list', $shortcodes );
		}
	} else { // there is no current shortcodes list
		update_option( 'rosa_shortcodes_list', $shortcodes );
	}

	// we need to remember the prefix of the metaboxes so it can be used
	// by the shortcodes plugin
	$current_prefix = get_option( 'rosa_metaboxes_prefix' );
	if ( empty( $current_prefix ) ) {
		update_option( 'rosa_metaboxes_prefix', wpgrade::prefix() );
	}
}

add_action( 'admin_head', 'rosa_callbacks_setup_shortcodes_plugin' );