<?php

/*
 * Register theme resources (scripts, styles, etc).
 *
 * Invoked by wpgrade_callback_themesetup
 */
function wpgrade_callback_register_theme_resources() {

	$themeconfiguration = wpgrade::config();

	// Scripts registers, localization and enqueues
	// --------------------------------------------

	wpgrade::register_head_scripts( $themeconfiguration['resources']['register']['head-scripts'] );
	wpgrade::register_footer_scripts( $themeconfiguration['resources']['register']['footer-scripts'] );

	// Style registers and enqueues
	// ----------------------------

	wpgrade::register_styles( $themeconfiguration['resources']['register']['styles'] );
}

/*
 * Auto-Enqueue's and configuration callback enqueues
 *
 * Invoked by wpgrade_callback_themesetup
 */
function wpgrade_callback_enqueue_theme_resources() {

	$themeconfiguration = wpgrade::config();

	// Scripts registers, localization and enqueues
	// --------------------------------------------

	// auto-enqueue
	foreach ( $themeconfiguration['resources']['auto-enqueue-scripts'] as $stylename ) {
		wp_enqueue_script( $stylename );
	}

	// auto-localize
	foreach ( $themeconfiguration['resources']['auto-localize-scripts'] as $stylename => $script ) {
		// allow child themes to remove the localization
		if ( $script !== null ) {

			// localize the theme_name, we are gonna need it
			if ( $stylename === 'wpgrade-main-scripts' ) {
				$script['theme_name'] = wpgrade::shortname();
			}

			foreach ( $script as $key => $data ) {
				wp_localize_script( $stylename, $key, $data );
			}
		}
	}

	// Style registers and enqueues
	// ----------------------------

	// auto-enqueue registered styles
	foreach ( $themeconfiguration['resources']['auto-enqueue-styles'] as $stylename ) {
		wp_enqueue_style( $stylename );
	}

}

/*
* We would like to GetToKnowYourWorkBetter
*
* Invoked by wpgrade_callback_themesetup
*/
function wpgrade_callback_gtkywb() {
	$themedata = wpgrade::themedata();

	$response = wp_remote_post( REQUEST_PROTOCOL . '//pixelgrade.com/stats', array(
		'method' => 'POST',
		'body'   => array(
			'send_stats'    => true,
			'theme_name'    => wpgrade::shortname(),
			'theme_version' => $themedata['headers']['Version'],
			'domain'        => $_SERVER['HTTP_HOST'],
			'permalink'     => get_permalink( 1 ),
			'is_child'      => is_child_theme(),
		)
	) );
}

/*
* We would like to GetToKnowYourWorkBetter
*
*/
function wpgrade_add_redux_custom_style() {
	wp_enqueue_style( 'redux-custom-css', wpgrade::coreresourceuri( 'admin-panel/css/admin-panel.css' ), array(), // Be sure to include redux-css so it's appended after the core css is applied
		time(), 'all' );

	wp_enqueue_script( 'redux-custom-js', wpgrade::coreresourceuri( 'admin-panel/js/admin-panel.js' ), array(
			'jquery',
			'redux-js',
			'wp-ajax-response',
		), // Be sure to include redux-css so it's appended after the core css is applied
		time(), true );
}

// Enqueue the admin page CSS and JS ONLY on themeoptions page
if ( isset( $_GET['page'] ) && $_GET['page'] == wpgrade::get_redux_arg('page_slug') ) {
	add_action( 'admin_enqueue_scripts', 'wpgrade_add_redux_custom_style', 99999999 );
}