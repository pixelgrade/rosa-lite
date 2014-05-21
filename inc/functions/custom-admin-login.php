<?php

	#
	# Customize login page
	#

	// using our own css
	function wpgrade_callback_login_css() {
		wp_enqueue_style('wpgrade_callback_login_css', wpgrade::resourceuri('css/login.css'), false);
	}

	// changing the alt text on the logo to show your site name
	function wpgrade_callback_login_title() {
		return get_option('blogname');
	}

	// change the logo link to the current home url
	function wpgrade_callback_login_link() {
		return home_url();
	}

	// calling it only on the login page
	add_action('login_enqueue_scripts', 'wpgrade_callback_login_css', 10);
	add_filter('login_headertitle', 'wpgrade_callback_login_title');
	add_filter('login_headerurl', 'wpgrade_callback_login_link');
