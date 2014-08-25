<?php

// using jsend format: http://labs.omniti.com/labs/jsend
function wpgrade_ajax_upgradestep_check_marketplace_data() {

	if (function_exists('set_time_limit')) set_time_limit(300); // 5min time limit

	// Default Data Structure
	// ----------------------

	$response = array(
		// no status checks, request has no input dependencies
		'status' => 'success',
		// default data to standard error state
		'data'   => array(
			'state' => 'error',
			'html'  => wpgrade::coreview( 'upgrader/unknown-ajax-error' . EXT ),
		),
	);

	// Determine Correctness of Marketplace Data
	// -----------------------------------------

	$theme_data = wp_get_theme();

	// Ensure the name of the template.
	// Only the template needs to be updated.
	if ( is_child_theme() ) {
		$template   = wp_get_theme( $theme_data->template );
		$theme_name = $template->Name;
	} else { // ! is_child_theme
		$theme_name = $theme_data->Name;
	}

	$allow_cache = false;

	$marketplace_username = wpgrade::option( 'marketplace_username' );
	$marketplace_api_key  = wpgrade::option( 'marketplace_api_key' );

	if ( ! empty( $marketplace_username ) && ! empty( $marketplace_api_key ) ) {

		$upgrader = new WPGradeAjaxUpgrader( $marketplace_username, $marketplace_api_key );

		try {
			if ( $upgrader->valid_marketplace_data( $allow_cache ) ) {
				$response['data'] = array( 'state' => 'available', 'html' => null );
			} else { // invalid marktplace data
				$response['data'] = array(
					'state' => 'error',
					'html'  => wpgrade::coreview( 'upgrader/invalid-marketplace-data' . EXT ),
				);
			}
		} catch ( Exception $e ) {
			$response['data'] = array(
				'state' => 'error',
				'html'  => wpgrade::coreview( 'upgrader/api-error' . EXT ),
			);
		}
	} else { // missing marketplace credentials
		$response['data'] = array(
			'state' => 'error',
			'html'  => wpgrade::coreview( 'upgrader/missing-marketplace-data' . EXT ),
		);
	}

	echo json_encode( $response );
	die;
}

// using jsend format: http://labs.omniti.com/labs/jsend
function wpgrade_ajax_upgradestep_search_for_update() {

	if (function_exists('set_time_limit')) set_time_limit(300); // 5min time limit

	// Default Data Structure
	// ----------------------

	$response = array(
		// no status checks, request has no input dependencies
		'status' => 'success',
		// default data to standard error state
		'data'   => array(
			'state' => 'error',
			'html'  => wpgrade::coreview( 'upgrader/unknown-ajax-error' . EXT ),
		),
	);

	// Check for Update
	// ----------------

	$theme_data = wp_get_theme();

	// Ensure the name of the template.
	// Only the template needs to be updated.
	if ( is_child_theme() ) {
		$template   = wp_get_theme( $theme_data->template );
		$theme_name = $template->Name;
	} else { // ! is_child_theme
		$theme_name = $theme_data->Name;
	}

	$allow_cache = false;

	$marketplace_username = wpgrade::option( 'marketplace_username' );
	$marketplace_api_key  = wpgrade::option( 'marketplace_api_key' );

	if ( ! empty( $marketplace_username ) && ! empty( $marketplace_api_key ) ) {

		$upgrader = new WPGradeAjaxUpgrader( $marketplace_username, $marketplace_api_key );

		if ( $upgrader->is_update_available( $theme_name, $allow_cache ) ) {
			$response['data'] = array( 'state' => 'available', 'html' => null );
		} else { // theme not available
			$response['data'] = array(
				'state' => 'error',
				'html'  => wpgrade::coreview( 'upgrader/error-while-searching-for-update' . EXT, array( 'error_messages' => $upgrader->errors() ) ),
			);
		}
	} else { // missing marketplace credentials
		$response['data'] = array(
			'state' => 'error',
			'html'  => wpgrade::coreview( 'upgrader/missing-marketplace-data' . EXT ),
		);
	}

	echo json_encode( $response );
	die;
}

// using jsend format: http://labs.omniti.com/labs/jsend
function wpgrade_ajax_upgradestep_backup_theme() {

	if (function_exists('set_time_limit')) set_time_limit(300); // 5min time limit

	// Default Data Structure
	// ----------------------

	$response = array(
		// no status checks, request has no input dependencies
		'status' => 'success',
		// default data to standard error state
		'data'   => array(
			'state' => 'error',
			'html'  => wpgrade::coreview( 'upgrader/unknown-ajax-error' . EXT ),
		),
	);

	// Create Backup
	// -------------

	if ( wpgrade::option( 'themeforest_upgrade_backup' ) ) {
		$theme_data = wp_get_theme();

		// Ensure the name of the template.
		// Only the template needs to be updated.
		if ( is_child_theme() ) {
			$template      = wp_get_theme( $theme_data->template );
			$theme_dirname = $template->Template;
		} else { // ! is_child_theme
			$theme_dirname = $theme_data->Template;
		}

		$upgrader = new WPGradeAjaxUpgrader();

		try {
			if ( $upgrader->backup_theme( $theme_dirname ) ) {
				$response['data'] = array( 'state' => 'available', 'html' => null );
			} else { // failed to backup file
				$response['data'] = array(
					'state' => 'error',
					'html'  => wpgrade::coreview( 'upgrader/error-while-creating-backup' . EXT, array( 'error_messages' => $upgrader->errors() ) ),
				);
			}
		} catch ( Exception $e ) {
			$response['data'] = array(
				'state' => 'error',
				'html'  => wpgrade::coreview( 'upgrader/internal-backup-error' . EXT ),
			);
		}
	} else { // skip backup
		$response['data']['state'] = 'available';
		$response['data']['html']  = 'Backup disabled in options.';
	}

	echo json_encode( $response );
	die;
}

// using jsend format: http://labs.omniti.com/labs/jsend
function wpgrade_ajax_upgradestep_analyze_download_options() {

	if (function_exists('set_time_limit')) set_time_limit(300); // 5min time limit

	// @todo replace hardcoded path with tempfile
	$uploads       = wp_upload_dir();
	$download_file = $uploads['path'] . '/wpgrade-' . wpgrade::shortname() . '-theme.tmp';

	// Default Data Structure
	// ----------------------

	$response = array(
		// no status checks, request has no input dependencies
		'status' => 'success',
		// default data to standard error state
		'data'   => array(
			'state' => 'error',
			'info'  => null,
			'html'  => wpgrade::coreview( 'upgrader/unknown-ajax-error' . EXT ),
		),
	);

	// Create Backup
	// -------------

	$theme_data = wp_get_theme();

	// Ensure the name of the template.
	// Only the template needs to be updated.
	if ( is_child_theme() ) {
		$template   = wp_get_theme( $theme_data->template );
		$theme_name = $template->Name;
	} else { // ! is_child_theme
		$theme_name = $theme_data->Name;
	}

	$marketplace_username = wpgrade::option( 'marketplace_username' );
	$marketplace_api_key  = wpgrade::option( 'marketplace_api_key' );

	if ( ! empty( $marketplace_username ) && ! empty( $marketplace_api_key ) ) {

		$upgrader = new WPGradeAjaxUpgrader( $marketplace_username, $marketplace_api_key );

		try {
			$download_info = $upgrader->download_info( $theme_name );
			if ( $download_info !== null ) {
				$response['data'] = array(
					'state' => 'success',
					'info'  => $download_info,
					'html'  => null,
				);
			} else { // failed to retrieve download info
				$response['data'] = array(
					'state' => 'error',
					'html'  => wpgrade::coreview( 'upgrader/error-while-analyzing-download-options' . EXT, array( 'error_messages' => $upgrader->errors() ) ),
				);
			}
		} catch ( Exception $e ) {
			$response['data'] = array(
				'state' => 'error',
				'html'  => wpgrade::coreview( 'upgrader/internal-download-analysis-error' . EXT ),
			);
		}
	} else { // missing marketplace credentials
		$response['data'] = array(
			'state' => 'error',
			'html'  => wpgrade::coreview( 'upgrader/missing-marketplace-data' . EXT ),
		);
	}

	// reset default download file too,
	// @todo refactor out download_file to temp file
	file_put_contents( $download_file, '' );

	echo json_encode( $response );
	die;
}

// using jsend format: http://labs.omniti.com/labs/jsend
function wpgrade_ajax_upgradestep_download_package() {

	if (function_exists('set_time_limit')) set_time_limit(300); // 5min time limit

	// @todo replace hardcoded path with tempfile
	$uploads       = wp_upload_dir();
	$download_file = $uploads['path'] . '/wpgrade-' . wpgrade::shortname() . '-theme.tmp';

	// Default Data Structure
	// ----------------------

	$response = array(
		// no status checks, request has no input dependencies
		'status' => 'success',
		// default data to standard error state
		'data'   => array(
			'state' => 'error',
			'info'  => null,
			'html'  => wpgrade::coreview( 'upgrader/unknown-ajax-error' . EXT ),
		),
	);

	// Process Request
	// ---------------

	$theme_data = wp_get_theme();

	// Ensure the name of the template.
	// Only the template needs to be updated.
	if ( is_child_theme() ) {
		$template   = wp_get_theme( $theme_data->template );
		$theme_name = $template->Name;
	} else { // ! is_child_theme
		$theme_name = $theme_data->Name;
	}

	$marketplace_username = wpgrade::option( 'marketplace_username' );
	$marketplace_api_key  = wpgrade::option( 'marketplace_api_key' );

	if ( ! empty( $marketplace_username ) && ! empty( $marketplace_api_key ) ) {

		$upgrader = new WPGradeAjaxUpgrader( $marketplace_username, $marketplace_api_key );

		try {
			if ( $_POST['method'] == 'ajax-bytes-range' ) {
				$download_url = $upgrader->download_url( $theme_name );
				if ( $download_url !== null ) {
					$upgrader->download( array(
						'accept-ranges'  => 'bytes',
						'content-length' => $_POST['content-length'],
					), $download_url, $download_file, $_POST['startbytes'], $_POST['endbytes'] );

					$response['data']['state'] = 'success';
					$response['data']['html']  = null;
				} else { //
					$response['data'] = array(
						'state' => 'error',
						'html'  => wpgrade::coreview( 'upgrader/internal-download-error' . EXT ),
					);
				}
			} //		else if ($_POST['method'] == 'direct') { // @todo direct download method
			else { // unknown method
				$response['data']['state'] = 'error';
				$response['data']['html']  = wpgrade::coreview( 'upgrader/faulty-download-method' . EXT );
			}
		} catch ( Exception $e ) {
			$response['data'] = array(
				'state' => 'error',
				'html'  => wpgrade::coreview( 'upgrader/internal-download-error' . EXT ),
			);
		}
	} else { // missing marketplace credentials
		$response['data'] = array(
			'state' => 'error',
			'html'  => wpgrade::coreview( 'upgrader/missing-marketplace-data' . EXT ),
		);
	}

	echo json_encode( $response );
	die;
}

// using jsend format: http://labs.omniti.com/labs/jsend
function wpgrade_ajax_upgradestep_install_package() {

	if (function_exists('set_time_limit')) set_time_limit(300); // 5min time limit

	// @todo replace hardcoded path with tempfile
	$uploads       = wp_upload_dir();
	$download_file = $uploads['path'] . '/wpgrade-' . wpgrade::shortname() . '-theme.tmp';

	// Default Data Structure
	// ----------------------

	$response = array(
		// no status checks, request has no input dependencies
		'status' => 'success',
		// default data to standard error state
		'data'   => array(
			'state' => 'error',
			'info'  => null,
			'html'  => wpgrade::coreview( 'upgrader/unknown-ajax-error' . EXT ),
		),
	);

	// Process Install
	// ---------------

	$theme_data = wp_get_theme();

	$theme_name = $theme_data->template;

	$upgrader = new WPGradeAjaxUpgrader();

	// load error pages into memory; if something goes wrong the files
	// might not even exist anymore
	$internal_error_view    = wpgrade::coreview( 'upgrader/internal-install-error' . EXT );
	$error_while_installing = wpgrade::coreview( 'upgrader/error-while-installing-theme' . EXT );

	try {
		if ( $upgrader->install( $theme_name, $download_file ) ) {
			$response['data'] = array( 'state' => 'success', 'html' => null );
		} else { // failed to backup file
			$response['data'] = array(
				'state' => 'error',
				'html'  => strtr( $error_while_installing, array(
					':error_list' => '<li>' . implode( '</li><li>', $upgrader->errors() ) . '</li>'
				) ),
			);
		}
	} catch ( Exception $e ) {
		$response['data'] = array(
			'state' => 'error',
			'html'  => $internal_error_view,
		);
	}

	echo json_encode( $response );
	die;
}
