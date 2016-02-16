<?php

/*
 * Register custom menus.
 * This works on 3.1+
 */
function rosa_register_custom_menus() {

	add_theme_support( 'menus' );
	$menus = wpgrade::confoption( 'import_nav_menu' );
	foreach ( $menus as $key => $value ) {
		register_nav_menu( $key, $value );
	}
}

add_action( "after_setup_theme", 'rosa_register_custom_menus' );


/*
 * Function for displaying The Main Header Menu
 */
function rosa_main_nav() {
	// test if there are menu locations to prevent errors
	$theme_locations = get_nav_menu_locations();

	$args = array(
		'theme_location' => 'main_menu',
		'menu'           => '',
		'container'      => '',
		'container_id'   => '',
		'menu_class'     => 'nav  nav--main  nav--items-menu',
		'menu_id'        => '',
		'fallback_cb'    => 'rosa_please_select_a_menu_fallback',
		'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
	);

	wp_nav_menu( $args );
	//        }
}

