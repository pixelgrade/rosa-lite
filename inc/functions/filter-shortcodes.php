<?php
/**
 * hook shortcodes params
 */

add_filter('pixcodes_filter_direct_for_separator', 'wpgrade_callback_make_separator_direct', 10, 1);

function wpgrade_callback_make_separator_direct( $direct ) {
	return true;
}

add_filter('pixcodes_filter_params_for_columns', 'wpgrade_callback_remove_columns_params', 10, 1);

function wpgrade_callback_remove_columns_params( $params ) {

	// unset unneeded params
	if ( isset( $params['full_width'] )) {
		unset($params['full_width']);
	}

	if ( isset( $params['bg_color'] )) {
		unset($params['bg_color']);
	}

	if ( isset( $params['inner'] )) {
		unset($params['inner']);
	}

	if ( isset( $params[0] ) ) {
		unset($params[0]);
	}

	if ( isset( $params['inner_info'] ) ) {
		unset($params['inner_info']);
	}

	return $params;
}