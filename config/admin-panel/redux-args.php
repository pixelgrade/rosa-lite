<?php

$debug_mod = false;

if ( isset( $_GET['debug_mod'] ) && $_GET['debug_mod'] == "true" ) {
	$debug_mod = (boolean) true;
}

return array(
	// setting dev mode to true allows you to view the class settings/info in
	// the panel
	'dev_mode'              => $debug_mod,
	# default: true
	'system_info'           => $debug_mod,
	# default: true

	// if you want to use Google Webfonts, you MUST define the api key
	'google_api_key'        => 'AIzaSyB7Yj842mK5ogSiDa3eRrZUIPTzgiGopls',
	'async_typography'      => false,
	// Use a asynchronous font on the front end or font string

	// define the starting tab for the option panel
	//'last_tab' => '0', # default: '0'
	'global_variable'       => 'rosa_redux',
	// Define the option panel stylesheet. Options are 'standard', 'custom',
	// and 'none'. If only minor tweaks are needed, set to 'custom' and
	// override the necessary styles through the included custom.css
	// stylesheet. If replacing the stylesheet, set to 'none' and don't
	// forget to enqueue another stylesheet!
	'admin_stylesheet'      => 'custom',
	# default: 'standard'

	// add HTML before the form
	'intro_text'            => __( '<h4>Theme Options</h4><p>These allow you to adjust the overall settings for your website.</p>', wpgrade::textdomain() ),
	// add content after the form
	//'footer_text' => __('<p>This text is displayed below the options panel. It isn\'t required, but more info is always better! The footer_text field accepts all HTML.</p>', wpgrade::textdomain()),

	// set footer/credit line
	//'footer_credit' => __('<p>This text is displayed in the options panel footer across from the WordPress version (where it normally says \'Thank you for creating with WordPress\'). This field accepts all HTML.</p>', wpgrade::textdomain()),

	// setup custom links in the footer for share icons
	'share_icons'           => array(
		'twitter'   => array(
			'link'  => 'http://twitter.com/pixelgrade',
			'title' => __( 'Follow us on Twitter', wpgrade::textdomain() ),
			'img'   => wpgrade::coremoduleuri( $wpgrade_redux_coremodule ) . 'assets/img/social/Twitter.png'
		),
		'linked_in' => array(
			'link'  => 'http://www.linkedin.com/company/pixelgrade-media',
			'title' => __( 'Find us on LinkedIn', wpgrade::textdomain() ),
			'img'   => wpgrade::coremoduleuri( $wpgrade_redux_coremodule ) . 'assets/img/social/LinkedIn.png'
		),
		'facebook'  => array(
			'link'  => 'http://www.facebook.com/PixelGradeMedia',
			'title' => __( 'Find us on Facebook', wpgrade::textdomain() ),
			'img'   => wpgrade::coremoduleuri( $wpgrade_redux_coremodule ) . 'assets/img/social/Facebook.png'
		),
	),
	// enable the import/export feature
	'show_import_export'    => $debug_mod,
	# default: true

	//'customizer' => true,

	// Set the icon for the import/export tab.
	// If 'icon_type' => 'image', this should be the path to the icon.
	// If 'icon_type' => 'iconfont', this should be the icon name.
	//'import_icon' => 'refresh', # default: refresh

	// Set the class for the import/export tab icon.
	// This is ignored unless 'icon_type' => 'iconfont'
	'import_icon_class'     => '',
	# default: null

	// set a custom option name. Don't forget to replace spaces with underscores!
	'opt_name'              => wpgrade::shortname() . '_options',
	// set a custom menu icon
	'menu_icon'             => wpgrade::coremoduleuri( $wpgrade_redux_coremodule ) . 'assets/img/theme_options.png',
	// set a custom title for the options page
	'menu_title'            => __( 'Theme Options', wpgrade::textdomain() ),
	# default: Options

	// Set a custom page title for the options page.
	'page_title'            => __( 'Options', wpgrade::textdomain() ),
	# default: Options

	// Set a custom page slug for options page (wp-admin/themes.php?page=***).
	'page_slug'             => wpgrade::shortname() . '_options',
	# default: redux_options

	/**
	 * You can choose to have separate options for each language.
	 * for example for english you can chose a background color and for french another
	 * Note: Keep in mind that this option will create a total separate set of options for each language.
	 *       This means that if you change an option on english it will not be changed for other languages.
	 */
	'wpml_separate_options' => true,
	// default: false

	'colorpicker_palettes'  => array(
		'#34e345',
		'#a2ab1b',
		'#111a11',
		'#123e23',
		'#1a10e0',
		'#1d3123',
		'#1d1000',
		'#e45345'
	),
	// set a custom page capability
	//'page_cap' => 'manage_options', # default: manage_options

	// set the menu type. Set to "menu" for a top level menu, or "submenu" to add below an existing item
	//'page_type' => 'submenu', # default: menu

	// Set the parent menu.
	// A list of available parent menus is available at http://codex.wordpress.org/Function_Reference/add_submenu_page#Parameters
	//'page_parent' => 'options-general.php', # default: themes.php

	// Set a custom page location. This allows you to place your menu where
	// you want in the menu order.
	// Must be unique or it will override other items!
	'page_position'         => '60.66',
	# default: null

	// Set a custom page icon class (used to override the page icon next to heading)
	//'page_icon' => 'icon-themes',

	// Set the icon type. Set to "iconfont" for Font Awesome, or "image" for
	// traditional. Redux no longer ships with standard icons!
	//'icon_type' => 'image', # default: iconfont
	//'dev_mode_icon_type' => 'image',
	//'import_icon_type' => 'image',

	// disable the panel sections showing as submenu items
	'allow_sub_menu'        => false,
	# default: true

	// Set ANY custom page help tabs, displayed using the new help tab API.
	// Tabs are shown in order of definition.
	//'help_tabs' => array
	//			(
	//				array
	//				(
	//					'id' => 'redux-opts-1',
	//					'title' => __('Theme Information 1', wpgrade::textdomain()),
	//					'content' => __('<p>This is the tab content, HTML is allowed.</p>', wpgrade::textdomain())
	//				),
	//				array
	//				(
	//					'id' => 'redux-opts-2',
	//					'title' => __('Theme Information 2', wpgrade::textdomain()),
	//					'content' => __('<p>This is the tab content, HTML is allowed.</p>', wpgrade::textdomain())
	//				)
	//			),

	// Set the help sidebar for the options page.
	// 'help_sidebar' => __('<p>This is the sidebar content, HTML is allowed.</p>', wpgrade::textdomain()),
	'hints'                 => array(
		'icon'          => 'icon-question-sign',
		'icon_position' => 'right',
		'icon_color'    => 'lightgray',
		'icon_size'     => 'normal',
		'tip_style'     => array(
			'color'   => 'light',
			'shadow'  => false,
			'rounded' => false,
			'style'   => '',
		),
		'tip_position'  => array(
			'my' => 'bottom center',
			'at' => 'top center',
		),
		'tip_effect'    => array(
			'show' => array(
				'effect'   => 'fade',
				'duration' => '50',
				'event'    => 'mouseover',
			),
			'hide' => array(
				'effect'   => 'fade',
				'duration' => '50',
				'event'    => 'click mouseleave',
			),
		),
	),
	'customizer_style' => false,
	'customizer' => false,
	'remove_customizer_sections' => array(
		 // 'blogdescription',
		 // 'static_front_page',
		 // 'title_tagline',
		 // 'nav'
	),
//	'save_defaults' => false

); # config
