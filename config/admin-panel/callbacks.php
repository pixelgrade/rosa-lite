<?php

function wpgrade_write_custom_css( $options ) {

	if ( wpgrade::option( 'inject_custom_css' ) !== 'file' ) {
		return;
	}

	$error = false;

	global $wp_filesystem;
	// Initialise the Wordpress filesystem, no more using file_put_contents function
	if ( empty( $wp_filesystem ) ) {
		require_once( ABSPATH . '/wp-admin/includes/file.php' );
		WP_Filesystem();
	}

	$css_dir = get_template_directory() . '/assets/css/';

	ob_start();
	include wpgrade::corepartial( 'inline-custom-css' . EXT );
	$css = ob_get_clean();

	$wp_filesystem->put_contents( $css_dir . 'custom.css', $css, FS_CHMOD_FILE // predefined mode settings for WP files
	);
	if ( $error == true ) {
		echo 'There is been an error around';
	}
}

add_action( 'redux/options/' . wpgrade::shortname() . '_options/compiler', 'wpgrade_write_custom_css' );

// "One-Click import for demo data" feature
// ----------------------------------------

// @todo CLEANUP refactor function names

/**
 * Imports the demo data from the demo_data.xml file
 */
if ( ! function_exists( 'wpGrade_ajax_import_posts_pages' ) ) {
	function wpGrade_ajax_import_posts_pages() {
		// initialize the step importing
		$stepNumber    = 1;
		$numberOfSteps = 1;

		// get the data sent by the ajax call regarding the current step
		// and total number of steps
		if ( ! empty( $_REQUEST['step_number'] ) ) {
			$stepNumber = $_REQUEST['step_number'];
		}

		if ( ! empty( $_REQUEST['number_of_steps'] ) ) {
			$numberOfSteps = $_REQUEST['number_of_steps'];
		}

		$response = array(
			'what'         => 'import_posts_pages',
			'action'       => 'import_submit',
			'id'           => 'true',
			'supplemental' => array(
				'stepNumber'    => $stepNumber,
				'numberOfSteps' => $numberOfSteps,
			)
		);

		require_once wpgrade::themefilepath( 'inc/import/import-demo-posts-pages' . EXT );

		$response = new WP_Ajax_Response( $response );
		$response->send();
	}

	// hook into wordpress admin.php
	add_action( 'wp_ajax_wpGrade_ajax_import_posts_pages', 'wpGrade_ajax_import_posts_pages' );
}

/**
 * Imports the theme options from the demo_data.php file
 */
if ( ! function_exists( 'wpGrade_ajax_import_theme_options' ) ) {
	function wpGrade_ajax_import_theme_options() {
		$response = array(
			'what'   => 'import_theme_options',
			'action' => 'import_submit',
			'id'     => 'true',
		);

		// check if user is allowed to save and if its his intention with
		// a nonce check
		if ( function_exists( 'check_ajax_referer' ) ) {
			check_ajax_referer( 'wpGrade_nonce_import_demo_theme_options' );
		}
		require_once wpgrade::themefilepath( 'inc/import/import-demo-theme-options' . EXT );

		$response = new WP_Ajax_Response( $response );
		$response->send();
	}

	// hook into wordpress admin.php
	add_action( 'wp_ajax_wpGrade_ajax_import_theme_options', 'wpGrade_ajax_import_theme_options' );
}

/**
 * This function imports the widgets from the demo_data.php file and the menus
 */
if ( ! function_exists( 'wpGrade_ajax_import_widgets' ) ) {
	function wpGrade_ajax_import_widgets() {
		$response = array(
			'what'   => 'import_widgets',
			'action' => 'import_submit',
			'id'     => 'true',
		);

		// check if user is allowed to save and if its his intention with
		// a nonce check
		if ( function_exists( 'check_ajax_referer' ) ) {
			check_ajax_referer( 'wpGrade_nonce_import_demo_widgets' );
		}

		require_once wpgrade::themefilepath( 'inc/import/import-demo-widgets' . EXT );

		$response = new WP_Ajax_Response( $response );
		$response->send();
	}

	//hook into wordpress admin.php
	add_action( 'wp_ajax_wpGrade_ajax_import_widgets', 'wpGrade_ajax_import_widgets' );
}


/**
 * Validation callbacks
 */


/**
 * Ensure users don't put @ before their username
 *
 * @param $field
 * @param $value
 * @param $existing_value
 */
function wpgrade_trim_twitter_username( $field, $value, $existing_value ){

	$value = ltrim( $value, '@' );

	return $value;

}