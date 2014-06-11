<?php

/**
 * Invoked in wpgrade-config.php
 */
function wpgrade_callback_addthis() {
	//lets determine if we need the addthis script at all
	if ( is_single() && wpgrade::option( 'blog_single_show_share_links' ) ):
		wp_enqueue_script( 'addthis-api' );

		//here we will configure the AddThis sharing globally
		get_template_part( 'templates/core/addthis-js-config' );
	endif;
}

/**
 * Invoked in wpgrade-config.php
 */
function wpgrade_callback_thread_comments_scripts() {
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}


/**
 * Invoked in wpgrade-config.php
 */
function wpgrade_callback_enqueue_google_fonts_rosa() {
	//load the web fonts loader api - if that is the case
	wpgrade_callback_load_google_fonts_api_rosa();

	//put the webfonts config inline script in the head to avoid the FOUT
	add_action( 'wp_head', 'wpgrade_callback_load_google_fonts_config_rosa' );
}

/**
 * Load google fonts config script block.
 * This callback is invoked by wpgrade_callback_enqueue_google_fonts_rosa
 */
function wpgrade_callback_load_google_fonts_config_rosa() {

	$fonts_array = array(
		'google_titles_font',
		'google_subtitles_font',
		'google_nav_font',
		'google_body_font'
	);

	$families = array();
	foreach ( $fonts_array as $font ) {
		$clean_font = wpgrade::get_google_font_name( $font );

		if ( ! empty( $clean_font ) ) {
			$families[] = $clean_font;
		}
	}

	$families = apply_filters( 'wpgrade_google_fonts', $families );

	if ( ! empty( $families ) || is_preview() ) {
		// any variables in scope will be available in the partial
		include wpgrade::themefilepath( 'templates/core/google-fonts-config' . EXT );
	}
}

/**
 * Load google fonts webfonts loader api script.
 * This callback is invoked by wpgrade_callback_enqueue_google_fonts
 */
function wpgrade_callback_load_google_fonts_api_rosa() {

	$fonts_array = array(
		'google_titles_font',
		'google_subtitles_font',
		'google_nav_font',
		'google_body_font'
	);

	$families = array();
	foreach ( $fonts_array as $font ) {
		$clean_font = wpgrade::get_google_font_name( $font );

		if ( ! empty( $clean_font ) ) {
			$families[] = $clean_font;
		}
	}

	$families = apply_filters( 'wpgrade_google_fonts', $families );

	if ( ! empty( $families ) || is_preview() ) {
		//only enqueue the api is we actually have webfonts
		wp_enqueue_script('webfont-script');
	}
}

/**
 * This callback is invoked by wpgrade_callback_themesetup.
 */
function wpgrade_callback_enqueue_dynamic_css_rosa() {

	if ( wpgrade::option( 'inject_custom_css' ) == 'file' ) {
		wp_enqueue_style( 'wpgrade-custom-style', get_template_directory_uri() . '/assets/css/custom.css' );
	}
}

/**
 * Enqueue the 404 page css
 */
function wpgrade_callback_enqueue_404_css() {
	if (is_404()) {
		wp_enqueue_style( wpgrade::shortname() . '-404-style', get_template_directory_uri() . '/assets/css/pages/404.css', array(), time(), 'all' );
	}
}


/**
 * Enqueue our custom css on admin panel
 */
add_action( 'redux/page/' . wpgrade::shortname() . '_options/enqueue', 'wpgrade_add_admin_custom_style', 0 );
function wpgrade_add_admin_custom_style() {

	wp_enqueue_style( wpgrade::shortname() . '-redux-theme-custom', wpgrade::resourceuri( 'css/admin/admin-panel.css' ), array(), time(), 'all' );

	wp_enqueue_script( 'wp-ajax-response' );

	wp_enqueue_script( wpgrade::shortname() . '-redux-theme-custom', wpgrade::resourceuri( 'js/admin/admin-panel.js' ), array(), time(), true );
}

/*
 * Enqueue some custom JS in the admin area for various small tasks
 */
add_action('admin_enqueue_scripts','wpgrade_add_admin_general_script');
function wpgrade_add_admin_general_script( $hook ){
	wp_enqueue_script(
		'wpgrade_admin_general_script', //unique handle
		get_template_directory_uri().'/assets/js/admin/admin-general.js', //location
		array('jquery')  //dependencies
	);
}