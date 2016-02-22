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

	/**
	 * @return string theme name, in presentable format
	 * @deprecated
	 */
	static function themename() {
		return 'rosa';
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

	//// WPML Related Functions ////////////////////////////////////////////////////

	static function lang_post_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			global $post;
			// make this work for any post type
			if ( isset( $post->post_type ) ) {
				$post_type = $post->post_type;
			} else {
				$post_type = 'post';
			}

			return icl_object_id( $id, $post_type, true );
		} else {
			return $id;
		}
	}

	static function lang_page_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			return icl_object_id( $id, 'page', true );
		} else {
			return $id;
		}
	}

	static function lang_category_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			return icl_object_id( $id, 'category', true );
		} else {
			return $id;
		}
	}

	// a dream
	static function lang_portfolio_tax_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			return icl_object_id( $id, 'portfolio_cat', true );
		} else {
			return $id;
		}
	}

	static function lang_post_tag_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			return icl_object_id( $id, 'post_tag', true );
		} else {
			return $id;
		}
	}

	static function lang_original_post_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			global $post;

			// make this work with custom post types
			if ( isset( $post->post_type ) ) {
				$post_type = $post->post_type;
			} else {
				$post_type = 'post';
			}

			return icl_object_id( $id, $post_type, true, self::get_short_defaultwp_language() );
		} else {
			return $id;
		}
	}

	static function get_short_defaultwp_language() {
		global $sitepress;
		if ( isset( $sitepress ) ) {
			return $sitepress->get_default_language();
		} else {
			return substr( get_bloginfo( 'language' ), 0, 2 );
		}
	}
}