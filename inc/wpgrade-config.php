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

	// the path where overwrites on the core partials are stored, any files
	// placed in the partial overwrites will be loaded instead of the core
	// equivalent view files
	'core-partials-overwrite-path' => 'template-parts/core',

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
	// to rosa::pagination; the settings defined in the key will be used
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
