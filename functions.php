<?php

// ensure REQUEST_PROTOCOL is defined
if ( ! defined('REQUEST_PROTOCOL')) {
	if (is_ssl()) {
		define( 'REQUEST_PROTOCOL', 'https:' );
	} else {
		define( 'REQUEST_PROTOCOL', 'http:' );
	}
}

// Loads the theme's translated strings
load_theme_textdomain( 'rosa-lite', get_template_directory() . '/languages' );

if ( ! function_exists(' rosa_theme_setup' ) ) {
	function rosa_theme_setup () {
		//add theme support for RSS feed links automatically generated in the head section
		add_theme_support( 'automatic-feed-links' );

		//tell galleries and captions to behave nicely and use HTML5 markup
		add_theme_support( 'html5', array( 'gallery', 'caption' ) );

		// Add theme support for Featured Images
		add_theme_support( 'post-thumbnails' );

		$sizes = array(

			/**
			 * MAXIMUM SIZE
			 * Maximum Full Image Size
			 * - Sliders
			 * - Lightbox
			 */
			'full-size'         => array(
				'width' => 2048
			),

			/**
			 * LARGE SIZE
			 * - Single post without sidebar
			 */
			'large-size'         => array(
				'width' => 1200
			),

			/**
			 * MEDIUM SIZE
			 * - Tablet Sliders
			 * - Archive Featured Image
			 * - Single Featured Image
			 */
			'medium-size'       => array(
				'width' => 900,
			),

			/**
			 * SMALL SIZE
			 * - Masonry Grid
			 * - Mobile Sliders
			 */
			'small-size'        => array(
				'width' => 400,
			),

		);

		foreach ( $sizes as $size_key => $values ) {

			$width = 0;
			if ( isset( $values['width'] ) ) {
				$width = $values['width'];
			}

			$height = 0;
			if ( isset( $values['height'] ) ) {
				$height = $values['height'];
			}

			$hard_crop = false;
			if ( isset( $values['hard_crop'] ) ) {
				$hard_crop = $values['hard_crop'];
			}

			add_image_size( $size_key, $width, $height, $hard_crop );
		}

		register_nav_menu( 'main_menu', 'Main Menu' );

		add_theme_support( 'title-tag' );

		add_editor_style( 'editor-style.css' );

		add_filter( 'upload_mimes', 'rosa_callback_custom_upload_mimes' );
	}
}
add_action( 'after_setup_theme', 'rosa_theme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function rosa_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'rosa_content_width', 960, 0 );
}

add_action( 'after_setup_theme', 'rosa_content_width', 0 );

/// load assets
if ( ! function_exists( 'rosa_load_assets' ) ) {
	function rosa_load_assets(){
		$theme = wp_get_theme();
		$google_maps_key = pixelgrade_option( 'google_maps_api_key' );

		if ( ! empty( $google_maps_key ) ) {
			$google_maps_key = '&key=' . $google_maps_key;
		} else {
			$google_maps_key = '';
		}

		// Styles
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		if ( is_404() ) {
			wp_enqueue_style( 'rosa-404-style', get_template_directory_uri() . '/404.css', array(), time(), 'all' );
		}

		if ( ! is_rtl() ) {
			wp_enqueue_style( 'rosa-main-style', get_stylesheet_uri(), array(), $theme->get( 'Version' ) );
		}

		wp_enqueue_style( 'rosa-lite-google-fonts', rosa_lite_google_fonts_url() );

		// Scripts
		wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/js/vendor/modernizr.min.js', array( 'jquery' ), '3.3.1' );
		wp_enqueue_script( 'webfont-script', get_theme_file_uri( '/assets/js/webfont.js' ), array( 'jquery' ), '1.6.16' );
		wp_register_script( 'tween-max', get_theme_file_uri( '/assets/js/TweenMax.min.js' ), array( 'jquery'), '1.19.1' );
		wp_enqueue_script( 'ease-pack', get_theme_file_uri( '/assets/js/EasePack.min.js' ), array( 'jquery' ), '1.15.5' );
		wp_enqueue_script( 'scroll-to-plugin', get_theme_file_uri( '/assets/js/ScrollToPlugin.min.js' ), array( 'jquery' ), '1.8.1' );
		wp_enqueue_script( 'rosa-rs', get_theme_file_uri( '/assets/js/index.js' ), array( 'jquery' ), '9.5.7' );

		$script_dependencies = array( 'jquery', 'modernizr', 'rosa-rs', 'scroll-to-plugin', 'tween-max', 'ease-pack' );

		if ( rosa_page_has_contact_descendants() ) {
			wp_enqueue_script( 'google-maps', '//maps.google.com/maps/api/js?language=en' . $google_maps_key, array( 'jquery' ), null, true );
			wp_enqueue_script( 'gmap3', get_template_directory_uri() . '/assets/js/vendor/gmap3.jquery.js', array( 'jquery', 'google-maps' ), null, true );
			$script_dependencies[] = 'gmap3';
		}

		wp_enqueue_script( 'rosa-plugins-scripts', get_template_directory_uri() . '/assets/js/plugins.js', $script_dependencies, $theme->get( 'Version' ), true );
		wp_enqueue_script( 'rosa-main-scripts', get_template_directory_uri() . '/assets/js/main.js', array( 'rosa-plugins-scripts' ), $theme->get( 'Version' ), true );

		if ( is_single() ) {
			wp_register_script( 'addthis-api', '//s7.addthis.com/js/300/addthis_widget.js#async=1', array( 'jquery' ), null, true );
		}

		$localization_array = array(
			'ajaxurl'      => admin_url( 'admin-ajax.php' ),
			'theme_name' => 'rosa-lite',
			'tPrev'             => esc_html__( 'Previous (Left arrow key)', 'rosa-lite' ),
			'tNext'             => esc_html__( 'Next (Right arrow key)', 'rosa-lite' ),
			'tCounter'          => esc_html__( 'of', 'rosa-lite' ),
			'infscrLoadingText' => "",
			'infscrReachedEnd'  => "",
		);

		wp_localize_script( 'rosa-main-scripts', 'rosaStrings', $localization_array );
	}
}
add_action( 'wp_enqueue_scripts', 'rosa_load_assets' );

if ( ! function_exists( 'rosa_load_admin_assets' ) ) {

	function rosa_load_admin_assets() {
		$theme = wp_get_theme();
		wp_enqueue_script( 'rosa_admin_general_script', get_template_directory_uri() . '/assets/js/admin/admin-general.js', array('jquery'), $theme->get( 'Version' ) );

		$translation_array = array
		(
			'import_failed' => esc_html__( 'The import didn\'t work completely!', 'rosa-lite' ) . '<br/><a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( 'Check out what could be wrong here.', 'rosa-lite') . '</a>',
			'import_confirm' => esc_html__( 'Importing the demo data will overwrite your current Theme Options settings. Proceed anyway?', 'rosa-lite'),
			'import_phew' => esc_html__( 'Phew...that was a hard one!', 'rosa-lite'),
			'import_success_note' => '<strong>' . esc_html__( 'The demo data was imported without a glitch! Awesome!', 'rosa-lite') . '</strong><br/><br/>',
			'import_all_done' => esc_html__( "All done!", 'rosa-lite'),
			'import_working' => esc_html__( "Working...", 'rosa-lite'),
			'import_widgets_failed' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( "The setting up of the demo widgets failed...", 'rosa-lite' ) . '</a>',
			'import_widgets_error' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . wp_kses_post( __( 'The setting up of the demo widgets failed</i><br />(The script returned the following message', 'rosa-lite' ) ) . '</a>',
			'import_widgets_done' => esc_html__( 'Finished setting up the demo widgets...', 'rosa-lite'),
			'import_theme_options_failed' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( "The importing of the theme options has failed...", 'rosa-lite' ) . '</a>',
			'import_theme_options_error' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . wp_kses_post( __( 'The importing of the theme options has failed</i><br />(The script returned the following message', 'rosa-lite' ) ) . '</a>',
			'import_theme_options_done' => esc_html__( 'Finished importing the demo theme options...', 'rosa-lite'),
			'import_posts_failed' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( "The importing of the theme options has failed...", 'rosa-lite' ) . '</a>',
			'import_posts_step' => esc_html__( 'Importing posts | Step', 'rosa-lite'),
			'import_error' =>  '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( "Error:", 'rosa-lite') . '</a>',
			'import_try_reload' =>  esc_html__( "You can reload the page and try again.", 'rosa-lite'),
		);
		wp_localize_script( 'rosa_admin_general_script', 'rosa_admin_js_texts', $translation_array );
	}
}
add_action( 'admin_enqueue_scripts', 'rosa_load_admin_assets' );

// Media Handlers
// --------------

/**
 * Make sure WordPress allows our mime types.
 * @return array
 */
function rosa_callback_custom_upload_mimes( $existing_mimes = null ) {
	if ( $existing_mimes === null ) {
		$existing_mimes = array();
	}

	$existing_mimes['mp3']  = 'audio/mpeg3';
	$existing_mimes['oga']  = 'audio/ogg';
	$existing_mimes['ogv']  = 'video/ogg';
	$existing_mimes['mp4a'] = 'audio/mp4';
	$existing_mimes['mp4']  = 'video/mp4';
	$existing_mimes['weba'] = 'audio/webm';
	$existing_mimes['webm'] = 'video/webm';

	// allow svg files only for admins
	if ( is_admin() ) {
		//and some more
		$existing_mimes['svg'] = 'image/svg+xml';
	}

	return $existing_mimes;
}

require get_template_directory() . '/inc/classes/wpgrade.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';
require get_template_directory() . '/inc/widgets.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * MB string functions for when the MB library is not available
 */
require get_template_directory() . '/inc/mb_compat.php';

/**
 * Load various plugin integrations
 */
require get_template_directory() . '/inc/integrations.php';

/**
 * Load Recommended/Required plugins notification
 */
require get_template_directory() . '/inc/required-plugins.php';
