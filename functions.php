<?php
/**
 * Rosa Lite functions and definitions
 *
 * @package Rosa Lite
 * @since Rosa Lite 1.0
 */

if ( ! function_exists(' rosa_lite_theme_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function rosa_lite_theme_setup() {

		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Patch, use a find and replace
		 * to change 'patch' to the name of your theme in all the template files
		 */
		load_theme_textdomain( 'rosa-lite', get_template_directory() . '/languages' );

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

		register_nav_menus( array(
			'main_menu'   => esc_html__( 'Main Menu', 'rosa-lite' ),
			'footer_menu' => esc_html__( 'Footer Menu', 'rosa-lite' ),
		) );

		add_theme_support( 'title-tag' );

		/*
		 * Enable support for custom logo.
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 60,
			'width'       => 180,
			'flex-height' => true,
			'flex-width'  => true,
			'header-text' => array(
				'site-title',
				'site-description-text',
			)
		) );

		/**
		 * Enable support for the Style Manager Customizer section (via Customify).
		 */
		add_theme_support( 'customizer_style_manager' );

		add_editor_style( array( 'editor-style.css', rosa_lite_google_fonts_url() ) );
	}
}
add_action( 'after_setup_theme', 'rosa_lite_theme_setup' );

if ( ! function_exists( 'rosa_lite_load_assets' ) ) {

	function rosa_lite_load_assets(){
		$theme = wp_get_theme( get_template() );
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

		// Styles
		wp_enqueue_style( 'rosa-main-style', get_template_directory_uri() . '/style.css', array(), $theme->get( 'Version' ) );
		wp_style_add_data( 'rosa-main-style', 'rtl', 'replace' );

		wp_enqueue_style( 'rosa-google-fonts', rosa_lite_google_fonts_url() );

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		if ( is_404() ) {
			wp_enqueue_style( 'rosa-404-style', get_template_directory_uri() . '/404.css', array(), time(), 'all' );
		}

		// Scripts
		$script_dependencies = array( 'jquery', );

		wp_register_script( 'modernizr', get_theme_file_uri( '/assets/js/vendor/modernizr.min.js' ), array(), '3.6.0' );
		$script_dependencies[] = 'modernizr';
		wp_register_script( 'tween-max', get_theme_file_uri( '/assets/js/vendor/TweenMax.min.js' ), array( 'jquery'), '1.19.1' );
		$script_dependencies[] = 'tween-max';
		wp_register_script( 'ease-pack', get_theme_file_uri( '/assets/js/vendor/EasePack.min.js' ), array( 'jquery' ), '1.15.5' );
		$script_dependencies[] = 'ease-pack';
		wp_register_script( 'scroll-to-plugin', get_theme_file_uri( '/assets/js/vendor/ScrollToPlugin.min.js' ), array(), '1.8.1' );
		$script_dependencies[] = 'scroll-to-plugin';

		wp_enqueue_script( 'rosa-plugins-scripts', get_theme_file_uri( '/assets/js/plugins' . $suffix . '.js' ), $script_dependencies, $theme->get( 'Version' ), true );
		wp_enqueue_script( 'rosa-main-scripts', get_theme_file_uri( '/assets/js/main' . $suffix . '.js' ), array( 'rosa-plugins-scripts' ), $theme->get( 'Version' ), true );

		$localization_array = array(
			'ajaxurl'      => admin_url( 'admin-ajax.php' ),
			'tPrev'             => esc_html__( 'Previous (Left arrow key)', 'rosa-lite' ),
			'tNext'             => esc_html__( 'Next (Right arrow key)', 'rosa-lite' ),
			'tCounter'          => esc_html__( 'of', 'rosa-lite' ),
		);

		wp_localize_script( 'rosa-main-scripts', 'rosaStrings', $localization_array );
	}
}
add_action( 'wp_enqueue_scripts', 'rosa_lite_load_assets' );

if ( ! function_exists( 'rosa_lite_load_admin_assets' ) ) {

	function rosa_lite_load_admin_assets() {
		$theme = wp_get_theme( get_template() );

		wp_enqueue_script( 'rosa_admin_general_script', get_template_directory_uri() . '/assets/js/admin/admin-general.js', array('jquery'), $theme->get( 'Version' ) );
	}
}
add_action( 'admin_enqueue_scripts', 'rosa_lite_load_admin_assets' );

if ( ! function_exists( 'rosa_lite_register_sidebars' ) ) {
	/*
	 * Register Widgets areas.
	 */
	function rosa_lite_register_sidebars() {

		register_sidebar( array(
			'id'            => 'sidebar-main',
			'name'          => esc_html__( 'Main Sidebar', 'rosa-lite' ),
			'description'   => esc_html__( 'Main Sidebar', 'rosa-lite' ),
			'before_title'  => '<h4 class="widget__title widget--sidebar-blog__title">',
			'after_title'   => '</h4>',
			'before_widget' => '<div id="%1$s" class="widget widget--sidebar-blog %2$s">',
			'after_widget'  => '</div>',
		) );

		// Allow the Text Widgets to handle shortcodes
		add_filter( 'widget_text', 'shortcode_unautop' );
		add_filter( 'widget_text', 'do_shortcode' );
	}
}
add_action( 'widgets_init', 'rosa_lite_register_sidebars' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function rosa_lite_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'rosa_lite_content_width', 960, 0 );
}
add_action( 'after_setup_theme', 'rosa_lite_content_width', 0 );

/**
 * MB string functions for when the MB library is not available
 */
require get_template_directory() . '/inc/mb_compat.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load various plugin integrations
 */
require get_template_directory() . '/inc/integrations.php';

/**
 * Load Recommended/Required plugins notification
 */
require get_template_directory() . '/inc/required-plugins.php';
