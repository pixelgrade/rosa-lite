<?php
/**
 * Custom functions that deal with various plugin integrations of PixCodes.
 *
 * @link https://wordpress.org/plugins/pixcodes/
 *
 * @package Rosa Lite
 */

function rosa_lite_callback_change_separator_params( $params ) {
	//we only need alignment, color and style

	//change the style options
	if ( isset( $params['color'] ) ) {
		$params['color']['options'] = array(
			''      => esc_html__( 'Gray', '__theme_txtd' ),
			'white' => esc_html__( 'White', '__theme_txtd' ),
		);
	}

	//add new params in the right order
	$params = rosa_lite_array_insert_after( 'color', $params, 'type', array(
		'type'        => 'select',
		'name'        => esc_html__( 'Type', '__theme_txtd' ),
		'options'     => array(
			'line'        => esc_html__( 'Line', '__theme_txtd' ),
			'flower'      => esc_html__( 'Flower', '__theme_txtd' ),
			'line-flower' => esc_html__( 'Line with Flower', '__theme_txtd' ),
		),
		'admin_class' => 'span5 push1',
	) );

	// unset unneeded params
	if ( isset( $params['style'] ) ) {
		unset( $params['style'] );
	}
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
add_filter( 'pixcodes_filter_params_for_separator', 'rosa_lite_callback_change_separator_params', 10, 1 );


function rosa_lite_callback_change_button_params( $params ) {

	//change the size options
	if ( isset( $params['size'] ) ) {
		$params['size']['options']     = array(
			''      => esc_html__( 'Regular', '__theme_txtd' ),
			'small' => esc_html__( 'Small', '__theme_txtd' ),
			'large' => esc_html__( 'Large', '__theme_txtd' ) ,
		);
		$params['size']['name']        = esc_html__( 'Size', '__theme_txtd' );
		$params['size']['admin_class'] = 'span5 push1';
	}

	//add new params in the right order
	$params = rosa_lite_array_insert_before( 'size', $params, 'type', array(
		'type'        => 'select',
		'name'        => esc_html__( 'Type', '__theme_txtd' ),
		'options'     => array(
			''        => esc_html__( 'Regular', '__theme_txtd' ),
			'primary' => esc_html__( 'Primary', '__theme_txtd' ),
			'text'    => esc_html__( 'Text', '__theme_txtd' ),
		),
		'admin_class' => 'span6'
	) );

	// unset unneeded params
	if ( isset( $params['text_size'] ) ) {
		unset( $params['text_size'] );
	}

	return $params;
}
add_filter( 'pixcodes_filter_params_for_button', 'rosa_lite_callback_change_button_params', 10, 1 );

function rosa_lite_callback_remove_columns_params( $params ) {

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
add_filter( 'pixcodes_filter_params_for_columns', 'rosa_lite_callback_remove_columns_params', 10, 1 );

function rosa_lite_callback_change_icon_params( $params ) {

	//add new params in the right order
	$params = rosa_lite_array_insert_after( 'size', $params, 'link', array(
		'type'        => 'text',
		'name'        => esc_html__( 'Link', '__theme_txtd' ),
		'options'     => array(),
		'admin_class' => 'span6'
	) );

	$params = rosa_lite_array_insert_after( 'link', $params, 'link_target_blank', array(
		'type'        => 'switch',
		'name'        => esc_html__( 'Open in new window', '__theme_txtd' ),
		'options'     => array(),
		'admin_class' => 'span5 push1'
	) );

	return $params;
}
add_filter( 'pixcodes_filter_params_for_icon', 'rosa_lite_callback_change_icon_params', 10, 1 );

function rosa_lite_callbacks_setup_shortcodes_plugin() {
	$current_options = get_option( 'wpgrade_shortcodes_list' );

	$shortcodes = array(
		'Button',
		'Heading',
		'Separator',
		'RestaurantMenu',
	);

	if ( ! class_exists('Gridable' ) ) {
		$shortcodes[] = 'Columns';
	}

	// create an array with shortcodes which are needed by the
	// current theme
	if ( $current_options ) {
		$diff_added   = array_diff( $shortcodes, $current_options );
		$diff_removed = array_diff( $current_options, $shortcodes );
		if ( ( ! empty( $diff_added ) || ! empty( $diff_removed ) ) && is_admin() ) {
			update_option( 'wpgrade_shortcodes_list', $shortcodes );
		}
	} else { // there is no current shortcodes list
		update_option( 'wpgrade_shortcodes_list', $shortcodes );
	}

	// we need to remember the prefix of the metaboxes so it can be used
	// by the shortcodes plugin
	$current_prefix = get_option( 'rosa_metaboxes_prefix' );
	if ( empty( $current_prefix ) ) {
		update_option( 'rosa_metaboxes_prefix', rosa_lite_prefix() );
	}
}
add_action( 'admin_head', 'rosa_lite_callbacks_setup_shortcodes_plugin' );
