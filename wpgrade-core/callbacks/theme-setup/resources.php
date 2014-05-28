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

		wpgrade::register_head_scripts($themeconfiguration['resources']['register']['head-scripts']);
		wpgrade::register_footer_scripts($themeconfiguration['resources']['register']['footer-scripts']);

		// Style registers and enqueues
		// ----------------------------

		wpgrade::register_styles($themeconfiguration['resources']['register']['styles']);
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
		foreach ($themeconfiguration['resources']['auto-enqueue-scripts'] as $stylename) {
			wp_enqueue_script($stylename);
		}

		// auto-localize
		foreach ($themeconfiguration['resources']['auto-localize-scripts'] as $stylename => $script) {
			// allow child themes to remove the localization
			if ($script !== null) {

				// localize the theme_name, we are gonna need it
				if ( $stylename === 'wpgrade-main-scripts' ) {
					$script['theme_name'] = wpgrade::shortname();
				}

				foreach ( $script as $key => $data) {
					wp_localize_script($stylename, $key, $data);
				}
			}
		}

		// Style registers and enqueues
		// ----------------------------

		// auto-enqueue registered styles
		foreach ($themeconfiguration['resources']['auto-enqueue-styles'] as $stylename) {
			wp_enqueue_style($stylename);
		}
		
	}

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

add_action( 'redux-enqueue-' . wpgrade::shortname() . '_options', 'wpgrade_add_redux_custom_style', 0 );