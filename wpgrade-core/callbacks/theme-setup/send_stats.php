<?php

/*
 * When the theme gets active we would like to see what awesome work you are doing
 * So we will make a small request to one of our servers
 *
 * Invoked by wpgrade_callback_themesetup
 */

function wpgrade_callback_send_activation_stats(){

	$themedata = wpgrade::themedata();

	$the_post_to = wp_remote_post('http://pixelgrade.com/stats',  array(
		'method' => 'POST',
		'body' => array(
			'send_stats' => true,
			'theme_name' => wpgrade::shortname(),
			'theme_version' => $themedata['headers']['Version'],
			'domain' => $_SERVER['HTTP_HOST'],
			'permalink' => get_permalink(1),
			'is_child' => is_child_theme(),
		)
	));
}