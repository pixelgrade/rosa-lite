<?php
/**
 * Handle the PixTypes integration.
 */

/**
 * Theme activation hook
 */
function rosa_lite_update_pixtypes_settings() {

	/**
	 * Get the config from /config/activation.php
	 */
	$activation_settings = array();
	if ( file_exists( get_template_directory() . '/inc/activation.php' ) ) {
		$activation_settings = include get_template_directory() . '/inc/activation.php'; // phpcs:ignore WPThemeReview.CoreFunctionality.FileInclude.FileIncludeFound
	}

	/**
	 * Create custom post types, taxonomies and metaboxes.
	 *
	 * These will be taken by the PixTypes plugin and converted in their own options
	 */
	if ( isset( $activation_settings['pixtypes-settings'] ) ) {

		$pixtypes_conf_settings = $activation_settings['pixtypes-settings'];

		$types_options = get_option( 'pixtypes_themes_settings' );
		if ( empty( $types_options ) ) {
			$types_options = array();
		}

		$theme_key                   = 'rosa_pixtypes_theme';
		$types_options[ $theme_key ] = $pixtypes_conf_settings;

		update_option( 'pixtypes_themes_settings', $types_options );
	}
}
add_action( 'after_switch_theme', 'rosa_lite_update_pixtypes_settings', 99999 );

if ( ! class_exists( 'wpgrade' ) ) {
	/**
	 * Class wpgrade
	 *
	 * This is needed for backwards compatibility with PixTypes that expects this class to exist in the theme.
	 */
	class wpgrade {
		public static function shortname() {
			return 'rosa'; // We will use the same shortname as the main theme to allow for data migration.
		}

		/**
		 * @return string
		 */
		static function themeversion() {
			$theme = wp_get_theme( get_template() );
			return $theme->get( 'Version' );
		}
	}
}
