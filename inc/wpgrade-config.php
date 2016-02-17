<?php



return array(
	# Commented values are optional properties. Many properties are
	# automatically deduced from others (eg. textdomain is deduced from
	# name, unless a custom value is provided)
	# ---------------------------------------------------------------------

	'name'                         => 'Rosa',
	'shortname'                    => 'rosa',
	'prefix'                       => '_rosa_',
	'textdomain'                   => 'rosa',
	'language-path'                => 'languages',

	// additional file includes (classes, functions, etc), files are loaded
	// via wpgrade::require_all and entries should be directories; if the
	// path does not exist it is automatically ignored
	'include-paths'                => array(
		'inc/classes',
		'inc/functions',
	),

	// the path where overwrites on the core partials are stored, any files
	// placed in the partial overwrites will be loaded instead of the core
	// equivalent view files
	'core-partials-overwrite-path' => 'templates/core',

	'shortcodes'                   => array(
		'Columns',
		'Button',
		'Icon',
		'Tabs',
		'Heading',
		'Separator',
		'Slider',
		'OpenTableReservations',
		'RestaurantMenu',
	),
	// importer
	'import_homepage_name' => 'Home Page',
	'import_blogpage_name' => 'News',

	// decide which menus should be imported
	'import_nav_menu'              => array(
		'main_menu'   => 'Main Menu',
		'footer_menu' => 'Footer Menu',
	),
	'resources'                    => array(
		// script declarations; scripts must be enqueue'ed to appear
		'register'                => array(
			'head-scripts'   => array(
				'modernizr' => array(
					'path'    => get_template_directory_uri() . '/assets/js/vendor/modernizr.min.js',
					'require' => array(
						'jquery'
					),
				),
				'webfont-script'       => array(
					'path'    => REQUEST_PROTOCOL . '//ajax.googleapis.com/ajax/libs/webfont/1.5.3/webfont.js',
					'require' => array(
						'jquery'
					),
				),
			),
			'footer-scripts' => array(
				'wpgrade-plugins'      => array(
					'path'    => get_template_directory_uri() . '/assets/js/plugins.js',
					'require' => array(
						'jquery',
						'modernizr'
					),
				),
				'wpgrade-main-scripts' => array(
					'path'       => get_template_directory_uri() . '/assets/js/main.js',
					'cache_bust' => wpgrade::cachebust_string( wpgrade::themefilepath( 'assets/js/main.js' ) ),
					'require'    => array(
						'wpgrade-plugins',
					),
				),
				'addthis-api'          => array(
					'path'    => REQUEST_PROTOCOL . '//s7.addthis.com/js/300/addthis_widget.js#async=1',
					'require' => array(
						'jquery'
					),
				),
				'google-maps-api'      => array(
					'path'    => REQUEST_PROTOCOL . '//maps.google.com/maps/api/js?sensor=false&amp;language=en',
					'require' => array(
						'jquery'
					),
				),
			),
			'styles'         => array(
				'google-webfonts'    => array(
					'path' => REQUEST_PROTOCOL . '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,900|Cabin:400,700,400italic,700italic|Herr+Von+Muellerhoff',
				),
				'wpgrade-main-style' => array(
					'path'       => get_template_directory_uri() . '/style.css',
					'cache_bust' => wpgrade::cachebust_string( wpgrade::themefilepath( 'style.css' ) ),
				),
			)

		), # end register

		// auto invoke scripts previously registered on theme setup
		'auto-enqueue-scripts'    => array(
			'wpgrade-main-scripts',
		),
		// enqueue's script and localizes
		'auto-localize-scripts'   => array(
			'wpgrade-main-scripts' => array(
				'ajaxurl'    => admin_url( 'admin-ajax.php' ),
				'objectl10n' => array(
					'tPrev'             => __( 'Previous (Left arrow key)', 'rosa' ),
					'tNext'             => __( 'Next (Right arrow key)', 'rosa' ),
					'tCounter'          => __( 'of', 'rosa' ),
					'infscrLoadingText' => "",
					'infscrReachedEnd'  => "",
				),
			),
		),
		// calls function to perform extra enqueue's on theme setup
		// handlers should be placed in theme's functions.php
		'script-enqueue-handlers' => array(
			'addthis'         => 'rosa_callback_addthis',
		),
		// auto invoke styles previously registered on theme setup
		'auto-enqueue-styles'     => array(
			'google-webfonts',
			'wpgrade-main-style',
		),

	), # end resource

	// defaults for pagination; you may customize the values at any time
	// when invoking a pagination formatter, the following defaults will be
	// in effect if not overwritten
	'pagination'                   => array(
		// formatter to process the links; null if none needed
		// the formatter should return a string and accept links and
		// the resulting configuration
		'formatter'     => 'rosa_callback_pagination_formatter',
		// show prev/next links?
		'prev_next'     => true,
		// pagination text
		'prev_text'     => __( 'Prev', 'rosa' ),
		'next_text'     => __( 'Next', 'rosa' ),
		// are the terms used for paging relative to the sort order?
		// ie. older/newer instead of sorting agnostic previous/next
		'sorted_paging' => false,
		// the order of the posts (asc or desc); if asc is passed and
		// sorted_paging is true the values of prev_text and next_text
		// will be flipped
		'order'         => 'desc',
		// show all pages? (ie. no cutoffs)
		'show_all'      => false,
		// how many numbers on either the start and the end list edges
		'end_size'      => 1,
		// how many numbers to either side of current page
		// not including current page
		'mid_size'      => 2,
		// an array of query args to add
		'add_args'      => false,
		// a string to append to each link
		'add_fragment'  => null,
	),
	// allows you to create special pagination instances by providing a key
	// to wpgrade::pagination; the settings defined in the key will be used
	// to overwrite the defaults defined in pagination above; if the key
	// is not avilable the pagination system will ignore the request so you
	// can use the template names while developing and customize at any
	// time later
	'pagination-targets'           => array(
		// the following is an example
		//				'gallery' => array
		//					(
		//						'formatter' => null,
		//						'prev_text' => __('Prev Images', 'rosa'),
		//						'next_text' => __('Next Images', 'rosa'),
		//					)
	),

	// setup here your thumbnails sizes
	'thumbnails_sizes'             => array(

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

	),

); # end theme configuration