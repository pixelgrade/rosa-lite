<?php
/**
 * hook shortcodes params
 */

add_filter( 'pixcodes_filter_params_for_separator', 'wpgrade_callback_remove_separator_params', 10, 1 );

function wpgrade_callback_remove_separator_params( $params ) {
	//we only need aligment, color and style

	//change the style options
	if ( isset( $params['style'] ) ) {
		$params['style']['options'] = array(
			'line'        => "Line",
			'flower'      => "Flower",
			'line-flower' => "Line with Flower",
		);
	}

	if ( isset( $params['color'] ) ) {
		$params['color']['options'] = array(
			'dark'  => "Dark",
			'light' => "Light",
			'color' => "Accent Color",
		);
	}

	// unset unneeded params
	if ( isset( $params['align'] ) ) {
		unset( $params['align'] );
	}
	if ( isset( $params['size'] ) ) {
		unset( $params['size'] );
	}
	if ( isset( $params['weight'] ) ) {
		unset( $params['weight'] );
	}

	return $params;
}

add_filter( 'pixcodes_filter_params_for_columns', 'wpgrade_callback_remove_columns_params', 10, 1 );

function wpgrade_callback_remove_columns_params( $params ) {

	// unset unneeded params
	if ( isset( $params['full_width'] ) ) {
		unset( $params['full_width'] );
	}

	if ( isset( $params['bg_color'] ) ) {
		unset( $params['bg_color'] );
	}

	if ( isset( $params['inner'] ) ) {
		unset( $params['inner'] );
	}

	if ( isset( $params[0] ) ) {
		unset( $params[0] );
	}

	if ( isset( $params['inner_info'] ) ) {
		unset( $params['inner_info'] );
	}

	return $params;
}