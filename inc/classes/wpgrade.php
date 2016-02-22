<?php
/**
 * Theme utility functions.
 * @package        wpgrade
 * @category       core
 * @author         Pixel Grade Team
 */
class wpgrade {

	static protected $prefix = '_rosa_';
	static protected $shortname = 'rosa';

	/**
	 * @return string file path
	 */
	static function themefilepath( $file ) {
		return get_template_directory() . '/' . $file;
	}

	/**
	 * @return string the lowercase version of the name
	 */
	static function shortname() {
		return self::get_shortname();
	}

	static function get_shortname() {
		return self::$shortname;
	}

	/**
	 * @return string theme prefix
	 */
	static function prefix() {
		return self::$prefix;
	}

	/** @var WP_Theme */
	protected static $theme_data = null;

	/**
	 * @return WP_Theme
	 */
	static function themedata() {
		if ( self::$theme_data === null ) {
			if ( is_child_theme() ) {
				$theme_name       = get_template();
				self::$theme_data = wp_get_theme( $theme_name );
			} else {
				self::$theme_data = wp_get_theme();
			}
		}

		return self::$theme_data;
	}

	/**
	 * @return string
	 */
	static function themeversion() {
		return wpgrade::themedata()->Version;
	}
}