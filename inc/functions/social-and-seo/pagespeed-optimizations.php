<?php

/*
 * Remove ?ver from static files
 */
function wpgrade_clean_static_files() {
	if ( wpgrade::option( 'remove_parameters_from_static_res' ) ) {
		add_filter( 'the_generator', 'wpgrade_remove_version_info' );
		add_filter( 'script_loader_src', 'wpgrade_remove_script_version', 15, 1 );
		add_filter( 'style_loader_src', 'wpgrade_remove_script_version', 15, 1 );
	}
}

add_action( 'init', 'wpgrade_clean_static_files', 5 );

function wpgrade_remove_version_info() {
	return '';
}

function wpgrade_remove_script_version( $src ) {
	//first parse the url
	$parts = parse_url( $src );

	//rebuild the url
	$url = '';
	if (!empty($parts['scheme'])) {
		$url .= $parts['scheme'] . '://';
	}
	if (!empty($parts['host'])) {
		$url .= $parts['host'];
	}
	if (!empty($parts['path'])) {
		$url .= $parts['path'];
	}

	if (!empty($parts['query'])) {
		$queryParams = array();
		parse_str( $parts['query'], $queryParams );

		//delete the param
		if ( isset( $queryParams['ver'] ) ) {
			unset( $queryParams['ver'] );
		}

		$queryString = http_build_query( $queryParams );

		if ( ! empty( $queryString ) ) {
			$url .= '?' . $queryString;
		}
	}

	return $url;
}
