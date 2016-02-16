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
 * Enqueue the 404 page css
 */
function wpgrade_callback_enqueue_404_css() {
	if (is_404()) {
		wp_enqueue_style( wpgrade::shortname() . '-404-style', get_template_directory_uri() . '/assets/css/pages/404.css', array(), time(), 'all' );
	}
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