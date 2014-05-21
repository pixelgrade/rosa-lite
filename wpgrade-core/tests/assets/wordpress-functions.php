<?php

	#
	# Mock wordpress functions used in tests.
	# We ignore them from the code coverage report.
	#

	// @codeCoverageIgnoreStart

	global $registered_styles;
	global $registered_scripts;

	$registered_scripts = array();
	$registered_styles = array();

	function get_template_directory() {
		return dirname(__FILE__).'/mock-theme';
	}

	function load_theme_textdomain($domain, $path) {
		// do nothing
	}

	function trailingslashit($path) {
		return rtrim($path, '/\\').DIRECTORY_SEPARATOR;
	}

	function site_url() {
		return 'tests.nosuchsite.tld';
	}

	function add_action($tag, $function_to_add, $priority = null, $accepted_args = null) {
		// do nothing
	}

	function add_filter($tag, $function_to_add, $priority = null, $accepted_args = null) {
		// do nothing
	}

	function is_admin() {
		return false;
	}

	function __($str, $textdomain) {
		// do nothing
	}

	function _n_noop() {
		// do nothing
	}

	function do_action_ref_array($tag, $arg) {
		// do nothing
	}

	function sanitize_key($key) {
		return strtolower(preg_replace('#[^a-z0-9_-]#', '_', $key));
	}

	function is_ssl() {
		return false;
	}

	function get_template_directory_uri() {
		return 'template/dir/uri';
	}

	function admin_url()
	{
		return 'admin/url';
	}

	function get_stylesheet_directory() {
		return 'stylesheet.dir';
	}

	function is_child_theme() {
		return false;
	}

	function wp_get_theme() {
		return new WP_Theme;
	}

	function wp_register_script($handle, $src, $deps, $ver, $in_footer) {
		global $registered_scripts;
		$registered_scripts[$handle] = array($src, $deps, $ver, $in_footer);
	}

	function wp_register_style($handle, $src, $deps, $ver, $media) {
		global $registered_styles;
		$registered_styles[$handle] = array($src, $deps, $ver, $media);
	}

	class WP_Widget {
		// empty
	}

	class Walker_Nav_Menu {
		// empty
	}

	class WP_Theme {
		function __construct() {
			$this->Version = '0.0';
		}
	}

	// @codeCoverageIgnoreEnd
