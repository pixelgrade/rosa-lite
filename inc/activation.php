<?php
/**
 * ACTIVATION SETTINGS
 * These settings will be needed when the theme will get active
 * Careful with the first setup, most of them will go in the clients database and they will be stored there
 * This file will be included in inc/functions/callbacks/activation-hooks.php
 */

return array(
	'pixlikes-settings' => array(
		'show_on_post'         => false,
		'show_on_page'         => false,
		'show_on_hompage'      => false,
		'show_on_archive'      => false,
		'like_action'          => 'click',
		'hover_time'           => 1000,
		'free_votes'           => false,
		'load_likes_with_ajax' => false,
	),
	'pixtypes-settings' => array(
		//		'post_types' => array(),
		//		'taxonomies' => array(),
		'metaboxes' => array(
			//General page settings
			'rosa_page_general'       => array(
				'id'         => 'rosa_page_general',
				'title'      => __( 'General', 'rosa-lite' ),
				'pages'      => array( 'page' ), // Post type
				'context'    => 'normal',
				'priority'   => 'high',
				'show_names' => true, // Show field names on the left
				'fields'     => array(
					array(
						'name' => __( 'Make Menu Bar Transparent', 'rosa-lite' ),
						'desc' => __( "This will remove the background from the menu and logo top bar.", 'rosa-lite' ),
						'id'   => wpgrade::prefix() . 'header_transparent_menu_bar',
						'type' => 'checkbox',
					),
					array(
						'name' => __( 'Content Border Style', 'rosa-lite' ),
						'desc' => '<p class="cmb_metabox_description">'.__( 'Select the style of the top and bottom borders of the content.', 'rosa-lite' ).'</p>',
						'id'   => wpgrade::prefix() . 'page_border_style',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( 'Simple', 'rosa-lite' ),
								'value' => 'simple',
							),
						),
						'std'     => 'simple',
					),
				),
			),
			//options for the Page Header Covers
			'rosa_page_header_area_cover'       => array(
				'id'         => 'rosa_page_header_area_cover',
				'title'      => __( 'Featured Header Area', 'rosa-lite' ),
				'pages'      => array( 'page' ), // Post type
				'context'    => 'normal',
				'priority'   => 'high',
				'hidden'     => true,
				'show_on'    => array(
					'key' => 'page-template',
					'value' => array( 'default', 'page-templates/slideshow.php' ),
				),
				'show_names' => true, // Show field names on the left
				'fields'     => array(
					array(
						'name' => __( 'Header Height', 'rosa-lite' ),
						'desc' => '<p class="cmb_metabox_description">' . __( 'Select the height of the header area in relation to the browser window.', 'rosa-lite' ).'</p>',
						'id'   => wpgrade::prefix() . 'page_header_height',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( '&#9673;&#9673;&#9673; Full Height', 'rosa-lite' ),
								'value' => 'full-height',
							)
						),
						'std'     => 'full-height',
					),
					array(
						'name' => __( 'Subtitle', 'rosa-lite' ),
						'id'   => wpgrade::prefix() . 'page_cover_subtitle',
						'type' => 'text',
					),
					array(
						'name' => __( 'Title', 'rosa-lite' ),
						'desc' => __( "If left empty we will use the page title. Tip: put a space if you don't want any cover text.", 'rosa-lite' ),
						'id'   => wpgrade::prefix() . 'page_cover_title',
						'type' => 'text',
					),
				),
			),
		),
	),
);