<?php

/*
 * Remove ?ver from static files
 */
function wpgrade_clean_static_files() {
	if (wpgrade::option('remove_parameters_from_static_res')) {
		add_filter('the_generator', 'wpgrade_remove_version_info');
		add_filter( 'script_loader_src', 'wpgrade_remove_script_version', 15, 1 );
		add_filter( 'style_loader_src', 'wpgrade_remove_script_version', 15, 1 );
	}
}
add_action('init', 'wpgrade_clean_static_files', 5);

function wpgrade_remove_version_info() {
	return '';
}

function wpgrade_remove_script_version( $src ){
	$parts = explode( '?ver', $src );
	return $parts[0];
}
