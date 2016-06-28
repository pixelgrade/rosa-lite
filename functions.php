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
load_theme_textdomain( 'rosa', get_template_directory() . '/languages' );

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

		/*
		 * Register custom menus.
		 * This works on 3.1+
		 */
		add_theme_support( 'menus' );

		$menus = array(
			'main_menu'   => 'Main Menu',
			'footer_menu' => 'Footer Menu',
			'social_menu' => 'Social Links'
		);
		foreach ( $menus as $key => $value ) {
			register_nav_menu( $key, $value );
		}

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
		$google_maps_key = rosa_option( 'google_maps_api_key' );

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
			wp_enqueue_style( 'rosa-404-style', get_template_directory_uri() . '/assets/css/404.css', array(), time(), 'all' );
		}

		if ( ! class_exists( 'PixCustomifyPlugin' ) ) {
			wp_enqueue_style( 'rosa-default-fonts', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,900|Cabin:400,700,400italic,700italic|Herr+Von+Muellerhoff' );
		}

		if ( ! is_rtl() ) {
			wp_enqueue_style( 'rosa-main-style', get_stylesheet_uri(), array(), $theme->get( 'Version' ) );
		}

		// Scripts
		wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/js/vendor/modernizr.min.js', array( 'jquery' ), '3.3.1' );
		wp_enqueue_script( 'webfont-script', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js', array( 'jquery' ) );
		wp_enqueue_script( 'tween-max', '//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TweenMax.min.js', array( 'jquery' ) );
		wp_enqueue_script( 'ease-pack', '//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/easing/EasePack.min.js', array( 'jquery' ) );
		wp_enqueue_script( 'scroll-to-plugin', '//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/plugins/ScrollToPlugin.min.js', array( 'jquery' ) );
		wp_enqueue_script( 'rosa-rs', '//pxgcdn.com/js/rs/9.5.7/index.js', array( 'jquery' ) );

		wp_enqueue_script( 'rosa-plugins-scripts', get_template_directory_uri() . '/assets/js/plugins.js', array( 'jquery', 'modernizr', 'rosa-rs', 'scroll-to-plugin', 'tween-max', 'ease-pack' ), $theme->get( 'Version' ), true );
		wp_enqueue_script( 'rosa-main-scripts', get_template_directory_uri() . '/assets/js/main.js', array( 'rosa-plugins-scripts' ), $theme->get( 'Version' ), true );

		if ( is_single() ) {
			wp_enqueue_script( 'addthis-api', '//s7.addthis.com/js/300/addthis_widget.js#async=1', array( 'jquery' ), null, true );
		}
		wp_enqueue_script( 'google-maps', '//maps.google.com/maps/api/js?language=en' . $google_maps_key, array( 'jquery' ), null, true );

		wp_localize_script( 'rosa-main-scripts', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
		// localize the theme_name, we are gonna need it
		wp_localize_script( 'rosa-main-scripts', 'theme_name', 'rosa' );
		wp_localize_script( 'rosa-main-scripts', 'objectl10n', array(
			'tPrev'             => __( 'Previous (Left arrow key)', 'rosa' ),
			'tNext'             => __( 'Next (Right arrow key)', 'rosa' ),
			'tCounter'          => __( 'of', 'rosa' ),
			'infscrLoadingText' => "",
			'infscrReachedEnd'  => "",
		) );
	}
}
add_action( 'wp_enqueue_scripts', 'rosa_load_assets' );

if ( ! function_exists( 'rosa_load_admin_assets' ) ) {

	function rosa_load_admin_assets() {
		$theme = wp_get_theme();
		wp_enqueue_script( 'rosa_admin_general_script', get_template_directory_uri() . '/assets/js/admin/admin-general.js', array('jquery'), $theme->get( 'Version' ) );

		$translation_array = array
		(
			'import_failed' => esc_html__( 'The import didn\'t work completely!', 'rosa' ) . '<br/><a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( 'Check out what could be wrong here.', 'rosa') . '</a>',
			'import_confirm' => esc_html__( 'Importing the demo data will overwrite your current Theme Options settings. Proceed anyway?', 'rosa'),
			'import_phew' => esc_html__( 'Phew...that was a hard one!', 'rosa'),
			'import_success_note' => '<strong>' . esc_html__( 'The demo data was imported without a glitch! Awesome!', 'rosa') . '</strong><br/><br/>',
			'import_all_done' => esc_html__( "All done!", 'rosa'),
			'import_working' => esc_html__( "Working...", 'rosa'),
			'import_widgets_failed' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( "The setting up of the demo widgets failed...", 'rosa' ) . '</a>',
			'import_widgets_error' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . __( 'The setting up of the demo widgets failed</i><br />(The script returned the following message', 'rosa' ) . '</a>',
			'import_widgets_done' => esc_html__( 'Finished setting up the demo widgets...', 'rosa'),
			'import_theme_options_failed' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( "The importing of the theme options has failed...", 'rosa' ) . '</a>',
			'import_theme_options_error' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . __( 'The importing of the theme options has failed</i><br />(The script returned the following message', 'rosa' ) . '</a>',
			'import_theme_options_done' => esc_html__( 'Finished importing the demo theme options...', 'rosa'),
			'import_posts_failed' => '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( "The importing of the theme options has failed...", 'rosa' ) . '</a>',
			'import_posts_step' => esc_html__( 'Importing posts | Step', 'rosa'),
			'import_error' =>  '<a href="http://help.pixelgrade.com/solution/articles/4000074170-can-t-finish-demo-data-import">' . esc_html__( "Error:", 'rosa') . '</a>',
			'import_try_reload' =>  esc_html__( "You can reload the page and try again.", 'rosa'),
		);
		wp_localize_script( 'rosa_admin_general_script', 'rosa_admin_js_texts', $translation_array );
	}
}
add_action( 'admin_enqueue_scripts', 'rosa_load_admin_assets' );

// Media Handlers
// --------------

/**
 * Make sure wordpress allows our mime types.
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
 * Custom functions for the WordPress admin area
 */
if ( is_admin() ) {
	require get_template_directory() . '/inc/extras_admin.php';
}

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
 * Load theme's configuration file (via Customify plugin)
 */
require get_template_directory() . '/inc/customify.php';

/**
 * Load Recommended/Required plugins notification
 */
require get_template_directory() . '/inc/required-plugins/required-plugins.php';

/* Automagical updates */
function wupdates_check_vexXr( $transient ) {
	// Nothing to do here if the checked transient entry is empty
	if ( empty( $transient->checked ) ) {
		return $transient;
	}

	// Let's start gathering data about the theme
	// First get the theme directory name (the theme slug - unique)
	$slug = basename( get_template_directory() );
	// Then WordPress version
	include( ABSPATH . WPINC . '/version.php' );
	$http_args = array (
		'body' => array(
			'slug' => $slug,
			'url' => home_url(), //the site's home URL
			'version' => 0,
			'locale' => get_locale(),
			'phpv' => phpversion(),
			'child_theme' => is_child_theme(),
			'data' => null, //no optional data is sent by default
		),
		'user-agent' => 'WordPress/' . $wp_version . '; ' . home_url()
	);

	// If the theme has been checked for updates before, get the checked version
	if ( isset( $transient->checked[ $slug ] ) && $transient->checked[ $slug ] ) {
		$http_args['body']['version'] = $transient->checked[ $slug ];
	}

	// Use this filter to add optional data to send
	// Make sure you return an associative array - do not encode it in any way
	$optional_data = apply_filters( 'wupdates_call_data_request', $http_args['body']['data'], $slug, $http_args['body']['version'] );

	// Encrypting optional data with private key, just to keep your data a little safer
	// You should not edit the code bellow
	$optional_data = json_encode( $optional_data );
	$w=array();$re="";$s=array();$sa=md5('0aad90f61af7dca48f99ac9f6fc7ac4219649a20');
	$l=strlen($sa);$d=$optional_data;$ii=-1;
	while(++$ii<256){$w[$ii]=ord(substr($sa,(($ii%$l)+1),1));$s[$ii]=$ii;} $ii=-1;$j=0;
	while(++$ii<256){$j=($j+$w[$ii]+$s[$ii])%255;$t=$s[$j];$s[$ii]=$s[$j];$s[$j]=$t;}
	$l=strlen($d);$ii=-1;$j=0;$k=0;
	while(++$ii<$l){$j=($j+1)%256;$k=($k+$s[$j])%255;$t=$w[$j];$s[$j]=$s[$k];$s[$k]=$t;
		$x=$s[(($s[$j]+$s[$k])%255)];$re.=chr(ord($d[$ii])^$x);}
	$optional_data=bin2hex($re);

	// Save the encrypted optional data so it can be sent to the updates server
	$http_args['body']['data'] = $optional_data;

	// Check for an available update
	$url = $http_url = set_url_scheme( 'https://wupdates.com/wp-json/wup/v1/themes/check_version/vexXr', 'http' );
	if ( $ssl = wp_http_supports( array( 'ssl' ) ) ) {
		$url = set_url_scheme( $url, 'https' );
	}

	$raw_response = wp_remote_post( $url, $http_args );
	if ( $ssl && is_wp_error( $raw_response ) ) {
		$raw_response = wp_remote_post( $http_url, $http_args );
	}
	// We stop in case we haven't received a proper response
	if ( is_wp_error( $raw_response ) || 200 != wp_remote_retrieve_response_code( $raw_response ) ) {
		return $transient;
	}

	$response = (array) json_decode($raw_response['body']);
	if ( ! empty( $response ) ) {
		// You can use this action to show notifications or take other action
		do_action( 'wupdates_before_response', $response, $transient );
		if ( isset( $response['allow_update'] ) && $response['allow_update'] && isset( $response['transient'] ) ) {
			$transient->response[ $slug ] = (array) $response['transient'];
		}
		do_action( 'wupdates_after_response', $response, $transient );
	}

	return $transient;
}
add_filter( 'pre_set_site_transient_update_themes', 'wupdates_check_vexXr' );

/* Only allow theme updates with a valid Envato purchase code */
function wupdates_add_purchase_code_field_vexXr( $themes ) {
	$output = '';
	// First get the theme directory name (the theme slug - unique)
	$slug = basename( get_template_directory() );
	if ( ! is_multisite() && isset( $themes[ $slug ] ) ) {
		$output .= "<br/><br/>"; //put a little space above

		//get errors so we can show them
		$errors = get_option( strtolower( $slug ) . '_wup_errors', array() );
		delete_option( strtolower( $slug ) . '_wup_errors' ); //delete existing errors as we will handle them next

		//check if we have a purchase code saved already
		$purchase_code = sanitize_text_field( get_option( strtolower( $slug ) . '_wup_purchase_code', '' ) );
		//in case there is an update available, tell the user that it needs a valid purchase code
		if ( empty( $purchase_code ) && ! empty( $themes[ $slug ]['hasUpdate'] ) ) {
			$output .= '<div class="notice notice-error notice-alt notice-large">' . __( 'A <strong>valid purchase code</strong> is required for automatic updates.', 'wupdates' ) . '</div>';
		}
		//output errors and notifications
		if ( ! empty( $errors ) ) {
			foreach ( $errors as $key => $error ) {
				$output .= '<div class="error"><p>' . wp_kses_post( $error ) . '</p></div>';
			}
		}
		if ( ! empty( $purchase_code ) ) {
			if ( ! empty( $errors ) ) {
				//since there is already a purchase code present - notify the user
				$output .= '<div class="notice notice-warning notice-alt"><p>' . esc_html__( 'Purchase code not updated. We will keep the existing one.', 'wupdates' ) . '</p></div>';
			} else {
				//this means a valid purchase code is present and no errors were found
				$output .= '<div class="notice notice-success notice-alt notice-large">' . __( 'Your <strong>purchase code is valid</strong>. Thank you! Enjoy one-click automatic updates.', 'wupdates' ) . '</div>';
			}
		}
		$purchase_code_key = esc_attr( strtolower( str_replace( array(' ', '.'), '_', $slug ) ) ) . '_wup_purchase_code';
		$output .= '<form class="wupdates_purchase_code" action="" method="post">' .
		           '<input type="hidden" name="wupdates_pc_theme" value="' . esc_attr( $slug ) . '" />' .
		           '<input type="text" id="' . $purchase_code_key . '" name="' . $purchase_code_key . '"
			        value="' . esc_attr( $purchase_code ) . '" placeholder="' . esc_html__( 'Purchase code ( e.g. 9g2b13fa-10aa-2267-883a-9201a94cf9b5 )', 'wupdates' ) . '" style="width:100%"/>' .
		           '<p>' . __( 'Enter your purchase code and <strong>hit return/enter</strong>.', 'wupdates' ) . '</p>' .
		           '<p class="theme-description">' .
		           __( 'Find out how to <a href="https://help.market.envato.com/hc/en-us/articles/202822600-Where-Is-My-Purchase-Code-" target="_blank">get your purchase code</a>.', 'wupdates' ) .
		           '</p>
			</form>';
	}
	//finally put the markup after the theme tags
	if ( ! isset( $themes[ $slug ]['tags'] ) ) {
		$themes[ $slug ]['tags'] = '';
	}
	$themes[ $slug ]['tags'] .= $output;

	return $themes;
}
add_filter( 'wp_prepare_themes_for_js' ,'wupdates_add_purchase_code_field_vexXr' );

/* Handle the purchase code input for multisite installations */
function wupdates_ms_theme_list_purchase_code_field_vexXr( $theme, $r ) {
	$output = '<br/>';
	$slug = $theme->get_template();
	//get errors so we can show them
	$errors = get_option( strtolower( $slug ) . '_wup_errors', array() );
	delete_option( strtolower( $slug ) . '_wup_errors' ); //delete existing errors as we will handle them next

	//check if we have a purchase code saved already
	$purchase_code = sanitize_text_field( get_option( strtolower( $slug ) . '_wup_purchase_code', '' ) );
	//in case there is an update available, tell the user that it needs a valid purchase code
	if ( empty( $purchase_code ) ) {
		$output .=  '<p>' . __( 'A <strong>valid purchase code</strong> is required for automatic updates.', 'wupdates' ) . '</p>';
	}
	//output errors and notifications
	if ( ! empty( $errors ) ) {
		foreach ( $errors as $key => $error ) {
			$output .= '<div class="error"><p>' . wp_kses_post( $error ) . '</p></div>';
		}
	}
	if ( ! empty( $purchase_code ) ) {
		if ( ! empty( $errors ) ) {
			//since there is already a purchase code present - notify the user
			$output .= '<p>' . esc_html__( 'Purchase code not updated. We will keep the existing one.', 'wupdates' ) . '</p>';
		} else {
			//this means a valid purchase code is present and no errors were found
			$output .= '<p><span class="notice notice-success notice-alt">' . __( 'Your <strong>purchase code is valid</strong>. Thank you! Enjoy one-click automatic updates.', 'wupdates' ) . '</span></p>';
		}
	}
	$purchase_code_key = esc_attr( strtolower( str_replace( array(' ', '.'), '_', $slug ) ) ) . '_wup_purchase_code';
	$output .= '<form class="wupdates_purchase_code" action="" method="post">' .
	           '<input type="hidden" name="wupdates_pc_theme" value="' . esc_attr( $slug ) . '" />' .
	           '<input type="text" id="' . $purchase_code_key . '" name="' . $purchase_code_key . '"
		        value="' . esc_attr( $purchase_code ) . '" placeholder="' . esc_html__( 'Purchase code ( e.g. 9g2b13fa-10aa-2267-883a-9201a94cf9b5 )', 'wupdates' ) . '"/>' . ' ' .
	           __( 'Enter your purchase code and <strong>hit return/enter</strong>.', 'wupdates' ) . ' ' .
	           __( 'Find out how to <a href="https://help.market.envato.com/hc/en-us/articles/202822600-Where-Is-My-Purchase-Code-" target="_blank">get your purchase code</a>.', 'wupdates' ) .
	           '</form>';

	echo $output;
}
add_action( 'in_theme_update_message-' . basename( get_template_directory() ), 'wupdates_ms_theme_list_purchase_code_field_vexXr', 10, 2 );

function wupdates_purchase_code_needed_notice_vexXr() {
	global $current_screen;

	$output = '';
	$slug = basename( get_template_directory() );
	//check if we have a purchase code saved already
	$purchase_code = sanitize_text_field( get_option( strtolower( $slug ) . '_wup_purchase_code', '' ) );
	//if the purchase code doesn't pass the prevalidation, show notice
	if ( in_array( $current_screen->id, array( 'update-core', 'update-core-network') ) && true !== wupdates_prevalidate_purchase_code_vexXr( $purchase_code ) ) {
		$output .= '<div class="updated"><p>' . sprintf( __( '<a href="%s">Please enter your purchase code</a> to get automatic updates for <b>%s</b>.', 'wupdates' ), network_admin_url( 'themes.php?theme=' . $slug ), wp_get_theme( $slug ) ) . '</p></div>';
	}

	echo $output;
}
add_action( 'admin_notices', 'wupdates_purchase_code_needed_notice_vexXr' );
add_action( 'network_admin_notices', 'wupdates_purchase_code_needed_notice_vexXr' );

function wupdates_process_purchase_code_vexXr() {
	//in case the user has submitted the purchase code form
	if ( ! empty( $_POST['wupdates_pc_theme'] ) ) {
		$errors = array();
		$slug = sanitize_text_field( $_POST['wupdates_pc_theme'] ); // get the theme's slug
		//PHP doesn't allow dots or spaces in $_POST keys - it converts them into underscore; so we do also
		$purchase_code_key = esc_attr( strtolower( str_replace( array(' ', '.'), '_', $slug ) ) ) . '_wup_purchase_code';
		$purchase_code = false;
		if ( ! empty( $_POST[ $purchase_code_key ] ) ) {
			//get the submitted purchase code and sanitize it
			$purchase_code = sanitize_text_field( $_POST[ $purchase_code_key ] );
			//do a prevalidation; no need to make the API call if the format is not right
			if ( true !== wupdates_prevalidate_purchase_code_vexXr( $purchase_code ) ) {
				$purchase_code = false;
			}
		}
		if ( ! empty( $purchase_code ) ) {
			//check if this purchase code represents a sale of the theme
			$http_args = array (
				'body' => array(
					'slug' => $slug, //the theme's slug
					'url' => home_url(), //the site's home URL
					'purchase_code' => $purchase_code,
				)
			);

			//make sure that we use a protocol that this hosting is capable of
			$url = $http_url = set_url_scheme( 'https://wupdates.com/wp-json/wup/v1/front/check_envato_purchase_code/vexXr', 'http' );
			if ( $ssl = wp_http_supports( array( 'ssl' ) ) ) {
				$url = set_url_scheme( $url, 'https' );
			}
			//make the call to the purchase code check API
			$raw_response = wp_remote_post( $url, $http_args );
			if ( $ssl && is_wp_error( $raw_response ) ) {
				$raw_response = wp_remote_post( $http_url, $http_args );
			}
			// In case the server hasn't responded properly, show error
			if ( is_wp_error( $raw_response ) || 200 != wp_remote_retrieve_response_code( $raw_response ) ) {
				$errors[] = __( 'We are sorry but we couldn\'t connect to the verification server. Please try again later.', 'wupdates' ) . '<span class="hidden">' . print_r( $raw_response, true ) . '</span>';
			} else {
				$response = json_decode( $raw_response['body'], true );
				if ( ! empty( $response ) ) {
					//we will only update the purchase code if it's valid
					//this way we keep existing valid purchase codes
					if ( isset( $response['purchase_code'] ) && 'valid' == $response['purchase_code'] ) {
						//all is good, update the purchase code option
						update_option( strtolower( $slug ) . '_wup_purchase_code', $purchase_code );
						//delete the update_themes transient so we force a recheck
						set_site_transient('update_themes', null);
					} else {
						if ( isset( $response['reason'] ) && ! empty( $response['reason'] ) && 'out_of_support' == $response['reason'] ) {
							$errors[] = esc_html__( 'Your purchase\'s support period has ended. Please extend it to receive automatic updates.', 'wupdates' );
						} else {
							$errors[] = esc_html__( 'Could not find a sale with this purchase code. Please double check.', 'wupdates' );
						}
					}
				}
			}
		} else {
			//in case the user hasn't entered a valid purchase code
			$errors[] = esc_html__( 'Please enter a valid purchase code. Make sure to get all the characters.', 'wupdates' );
		}

		if ( count( $errors ) > 0 ) {
			//if we do have errors, save them in the database so we can display them to the user
			update_option( strtolower( $slug ) . '_wup_errors', $errors );
		} else {
			//since there are no errors, delete the option
			delete_option( strtolower( $slug ) . '_wup_errors' );
		}

		//redirect back to the themes page and open popup
		wp_redirect( esc_url_raw( add_query_arg( 'theme', $slug ) ) );
		exit;
	}
}
add_action( 'admin_init', 'wupdates_process_purchase_code_vexXr' );

function wupdates_send_purchase_code_vexXr( $optional_data, $slug ) {
	//get the saved purchase code
	$purchase_code = sanitize_text_field( get_option( strtolower( $slug ) . '_wup_purchase_code', '' ) );

	if ( null === $optional_data ) { //if there is no optional data, initialize it
		$optional_data = array();
	}
	//add the purchase code to the optional_data so we can check it upon update check
	//if a theme has an Envato item selected, this is mandatory
	$optional_data['envato_purchase_code'] = $purchase_code;

	return $optional_data;
}
add_filter( 'wupdates_call_data_request', 'wupdates_send_purchase_code_vexXr', 10, 2 );

function wupdates_prevalidate_purchase_code_vexXr( $purchase_code ) {
	$purchase_code = preg_replace( '#([a-z0-9]{8})-?([a-z0-9]{4})-?([a-z0-9]{4})-?([a-z0-9]{4})-?([a-z0-9]{12})#', '$1-$2-$3-$4-$5', strtolower( $purchase_code ) );
	if ( 36 == strlen( $purchase_code ) ) {
		return true;
	}
	return false;
}

/* End of Envato checkup code */
