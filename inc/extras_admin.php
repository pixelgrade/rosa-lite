<?php

function rosa_callback_help_pointers_setup() {

	// Define our pointers
	// -------------------

	$pointers = array(
		array(
			// unique id for this pointer
			'id'       => 'add-archive-menu-item-warning',
			// this is the page hook we want our pointer to show on
			'screen'   => 'nav-menus',
			// the css selector for the pointer to be tied to, best to use ID's
			'target'   => '#submit-post-type-archives',
			'title'    => 'Warning',
			'content'  => 'This menu item does NOT work if you changed the slug for the custom post type. If you haven\'t change it, dissmis this!',
			'position' => array(
				'edge'  => 'top', # values: top, bottom, left, right
				'align' => 'middle' # values: top, bottom, left, right, middle
			)
		)

		// more as needed
	);

	// Info about custom post types drag and drop
	// ------------------------------------------

	// require plugin.php to use is_plugin_active()
	include_once ABSPATH . 'wp-admin/includes/plugin.php';

	if ( is_plugin_active( 'simple-page-ordering/simple-page-ordering.php' ) ) {
		$pointers[] = array(
			// unique id for this pointer
			'id'       => 'info-about-draganddrop-on-postypes',
			// this is the page hook we want our pointer to show on
			'screen'   => 'edit-page',
			// the css selector for the pointer to be tied to, best to use ID's
			'target'   => '#the-list.ui-sortable .type-page:nth(1)',
			'title'    => 'Did you know ?',
			'content'  => 'You can order pages with drag and drop.',
			'position' => array(
				'edge'  => 'top', # values: top, bottom, left, right
				'align' => 'middle' # values: top, bottom, left, right, middle
			)
		);
	}

	// Initialize
	// ----------

	$myPointers = new WP_Help_Pointer();
	$myPointers->setup( $pointers );
}

add_action( 'admin_enqueue_scripts', 'rosa_callback_help_pointers_setup' );


/**
 * Start Hook PixCodes params
 */

function rosa_callback_change_separator_params( $params ) {
	//we only need alignment, color and style

	//change the style options
	if ( isset( $params['color'] ) ) {
		$params['color']['options'] = array(
			''      => "Gray",
			'white' => "White",
		);
	}

	//add new params in the right order
	$params = util::array_insert_after( 'color', $params, 'type', array(
		'type'        => 'select',
		'name'        => 'Type',
		'options'     => array(
			'line'        => "Line",
			'flower'      => "Flower",
			'line-flower' => "Line with Flower",
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
add_filter( 'pixcodes_filter_params_for_separator', 'rosa_callback_change_separator_params', 10, 1 );


function rosa_callback_change_button_params( $params ) {

	//change the size options
	if ( isset( $params['size'] ) ) {
		$params['size']['options']     = array(
			''      => "Regular",
			'small' => "Small",
			'large' => "Large",
		);
		$params['size']['name']        = 'Size';
		$params['size']['admin_class'] = 'span5 push1';
	}

	//add new params in the right order
	$params = util::array_insert_before( 'size', $params, 'type', array(
		'type'        => 'select',
		'name'        => 'Type',
		'options'     => array(
			''        => "Regular",
			'primary' => "Primary",
			'text'    => "Text",
		),
		'admin_class' => 'span6'
	) );

	// unset unneeded params
	if ( isset( $params['text_size'] ) ) {
		unset( $params['text_size'] );
	}

	return $params;
}
add_filter( 'pixcodes_filter_params_for_button', 'rosa_callback_change_button_params', 10, 1 );

function rosa_callback_remove_columns_params( $params ) {

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
add_filter( 'pixcodes_filter_params_for_columns', 'rosa_callback_remove_columns_params', 10, 1 );

function rosa_callback_change_icon_params( $params ) {

	//add new params in the right order
	$params = util::array_insert_after( 'size', $params, 'link', array(
		'type'        => 'text',
		'name'        => 'Link',
		'options'     => array(),
		'admin_class' => 'span6'
	) );

	$params = util::array_insert_after( 'link', $params, 'link_target_blank', array(
		'type'        => 'switch',
		'name'        => 'Open in new window',
		'options'     => array(),
		'admin_class' => 'span5 push1'
	) );

	return $params;
}
add_filter( 'pixcodes_filter_params_for_icon', 'rosa_callback_change_icon_params', 10, 1 );

/**
 * End Hook PixCodes params
 */