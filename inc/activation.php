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
		'show_on_homepage'      => false,
		'show_on_archive'      => false,
		'like_action'          => 'click',
		'hover_time'           => 1000,
		'free_votes'           => false,
		'load_likes_with_ajax' => false,
	),
	'pixtypes-settings' => array(
		'metaboxes' => array(
			//General page settings
			'rosa_page_general'       => array(
				'id'         => 'rosa_page_general',
				'title'      => esc_html__( 'General', 'rosa-lite' ),
				'pages'      => array( 'page' ), // Post type
				'context'    => 'normal',
				'priority'   => 'high',
				'show_on'    => array(
					'key' => 'page-template',
					'value' => array( '', 'default' ),
				),
				'show_names' => true, // Show field names on the left
				'fields'     => array(
					array(
						'name' => esc_html__( 'Make Menu Bar Transparent', 'rosa-lite' ),
						'desc' => esc_html__( 'This will remove the background from the menu and logo top bar.', 'rosa-lite' ),
						'id'   => wpgrade::prefix() . 'header_transparent_menu_bar_lite',
						'type' => 'checkbox',
					),
				),
			),
			//options for the Page Header Covers
			'rosa_page_header_area_cover'       => array(
				'id'         => 'rosa_page_header_area_cover',
				'title'      => esc_html__( 'Featured Header Area', 'rosa-lite' ),
				'pages'      => array( 'page' ), // Post type
				'context'    => 'normal',
				'priority'   => 'high',
				'show_on'    => array(
					'key' => 'page-template',
					'value' => array( '', 'default' ),
				),
				'show_names' => true, // Show field names on the left
				'fields'     => array(
					array(
						'name' => esc_html__( 'Subtitle', 'rosa-lite' ),
						'id'   => wpgrade::prefix() . 'page_cover_subtitle',
						'type' => 'text',
					),
					array(
						'name' => esc_html__( 'Title', 'rosa-lite' ),
						'desc' => esc_html__( 'If left empty we will use the page title. Tip: put a space if you don\'t want any cover text.', 'rosa-lite' ),
						'id'   => wpgrade::prefix() . 'page_cover_title',
						'type' => 'text',
					),
				),
			),
		),
	),
);
