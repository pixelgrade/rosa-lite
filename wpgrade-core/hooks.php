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

	$handler = wpgrade::confoption( 'custom-css-handler', null );

	if ( empty( $handler ) ) {
		$handler = 'rosa_callback_inlined_custom_style';
	}

	add_action( 'wp_enqueue_scripts', $handler, 999999 );
}

add_action( 'after_setup_theme', 'rosa_callback_themesetup', 16 );