<?php
/**
 * hook shortcodes params
 */

add_filter( 'pixcodes_filter_params_for_separator', 'wpgrade_callback_change_separator_params', 10, 1 );

function wpgrade_callback_change_separator_params( $params ) {
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

add_filter( 'pixcodes_filter_params_for_button', 'wpgrade_callback_change_button_params', 10, 1 );

function wpgrade_callback_change_button_params( $params ) {

	//change the size options
	if ( isset( $params['size'] ) ) {
		$params['size']['options'] = array(
			''        => "Regular",
			'small'      => "Small",
			'large' => "Large",
		);
		$params['size']['name'] = 'Size';
		$params['size']['admin_class'] = 'span5 push1';
	}

	//add new params in the right order
	$params = util::array_insert_before('size', $params, 'style', array(
		'type' => 'select',
		'name' => 'Style',
		'options' => array(
			''        => "Regular",
			'primary'      => "Primary",
			'text' => "Text",
		),
		'admin_class' => 'span6'
	));

	// unset unneeded params
	if ( isset( $params['text_size'] ) ) {
		unset( $params['text_size'] );
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