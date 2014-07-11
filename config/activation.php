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
			//for the Page Header Covers
			wpgrade::shortname() . '_page_header_area_cover'       => array(
				'id'         => wpgrade::shortname() . '_page_header_area_cover',
				'title'      => __( 'Featured Header Area', 'rosa_txtd' ),
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
						'name' => __( 'Header Height', 'rosa_txtd' ),
						'desc' => '<p class="cmb_metabox_description">' . __( 'Select the height of the header area in relation to the browser window.', 'rosa_txtd' ).'</p>',
						'id'   => wpgrade::prefix() . 'page_header_height',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( '&nbsp; &#9673;&#9711; &nbsp;Half', 'rosa_txtd' ),
								'value' => 'half-height',
							),
							array(
								'name'  => __( '&#9673;&#9673;&#9711; Two Thirds', 'rosa_txtd' ),
								'value' => 'two-thirds-height',
							),
							array(
								'name'  => __( '&#9673;&#9673;&#9673; Full Height', 'rosa_txtd' ),
								'value' => 'full-height',
							)
						),
						'std'     => 'half-height',
					),
					array(
						'name' => __( 'Subtitle', 'rosa_txtd' ),
						// 'desc' => __( "This is optional. Leave empty to remove the subtitle.", 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'page_cover_subtitle',
						'type' => 'text',
					),
					array(
						'name' => __( 'Title', 'rosa_txtd' ),
						'desc' => __( "If left empty we will use the page title. Tip: put a space if you don't want any cover text.", 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'page_cover_title',
						'type' => 'text',
					),
					array(
						'name'    => __( 'Description', 'rosa_txtd' ),
						'desc'    => __( "You can use shortcodes (like the Separator) or even images to further embellish this.", 'rosa_txtd' ),
						'id'      => wpgrade::prefix() . 'page_cover_description',
						'type'    => 'wysiwyg',
						'options' => array(
							'media_buttons' => true,
							'textarea_rows' => 3,
							'teeny'         => false,
							'tinymce'       => true,
							'quicktags'     => true,
						),
					),
					array(
						'name' => __( 'Make Menu Bar Transparent', 'rosa_txtd' ),
						'desc' => __( "This will remove the background from the menu and logo top bar.", 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'header_transparent_menu_bar',
						'type' => 'checkbox',
					),
					array(
						'name' => __( 'Content Border Style', 'rosa_txtd' ),
						'desc' => '<p class="cmb_metabox_description">'.__( 'Select the style of the top and bottom borders of the content.', 'rosa_txtd' ).'</p>',
						'id'   => wpgrade::prefix() . 'page_border_style',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( 'Simple', 'rosa_txtd' ),
								'value' => 'simple',
							),
							array(
								'name'  => __( 'Waves', 'rosa_txtd' ),
								'value' => 'waves',
							),
						),
						'std'     => 'simple',
					),
//					array(
//						'name' => __( 'Inverse The Colors', 'rosa_txtd' ),
//						'desc' => __( "This will make the content background black and the text white.", 'rosa_txtd' ),
//						'id'   => wpgrade::prefix() . 'inverse_section_colors',
//						'type' => 'checkbox',
//					),
				),
			),
			wpgrade::shortname() . '_page_header_area_slideshow'  => array(
				'id'         => wpgrade::shortname() . '_page_header_area_slideshow',
				'title'      => __( 'Slideshow Settings', 'rosa_txtd' ),
				'pages'      => array( 'page' ), // Post type
				'context'    => 'normal',
				'priority'   => 'high',
				'hidden'     => true,
				'show_on'    => array(
					'key' => 'page-template',
					'value' => array( 'page-templates/slideshow.php' ),
				),
				'show_names' => true, // Show field names on the left
				'fields'     => array(
					array(
						'name' => __( 'Images', 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'main_gallery',
						'type' => 'gallery',
					),
					array(
						'name'    => __( 'Image Scaling', 'rosa_txtd' ),
						'desc'    => __( '<p class="cmb_metabox_description"><strong>Fill</strong> scales image to completely fill slider container (recommended for landscape images)</p>
<p class="cmb_metabox_description"><strong>Fit</strong> scales image to fit the container (recommended for portrait images)</p>
<p class="cmb_metabox_description"><strong>Fit if Smaller</strong> scales image to fit only if size of slider container is less than size of image.</p>
<p class="cmb_metabox_description"><a target="_blank" href="http://bit.ly/slider-image-scaling">Visual explanation</a></p>', 'rosa_txtd' ),
						'id'      => wpgrade::prefix() . 'post_slider_image_scale_mode',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( 'Fit', 'rosa_txtd' ),
								'value' => 'fit'
							),
							array(
								'name'  => __( 'Fill', 'rosa_txtd' ),
								'value' => 'fill'
							),
							array(
								'name'  => __( 'Fit if Smaller', 'rosa_txtd' ),
								'value' => 'fit-if-smaller'
							)
						),
						'std'     => 'fill'
					),
					array(
						'name'    => __( 'Show Nearby Images', 'rosa_txtd' ),
						'desc'    => __( 'Enable this if you want to avoid having empty space on the sides of the image when using mostly portrait images.', 'rosa_txtd' ),
						'id'      => wpgrade::prefix() . 'post_slider_visiblenearby',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( 'Enabled', 'rosa_txtd' ),
								'value' => true
							),
							array(
								'name'  => __( 'Disabled', 'rosa_txtd' ),
								'value' => false
							)
						),
						'std'     => false
					),
					array(
						'name'    => __( 'Slider transition', 'rosa_txtd' ),
						'id'      => wpgrade::prefix() . 'post_slider_transition',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( 'Slide/Move', 'rosa_txtd' ),
								'value' => 'move'
							),
							array(
								'name'  => __( 'Fade', 'rosa_txtd' ),
								'value' => 'fade'
							)
						),
						'std'     => 'move'
					),
					array(
						'name'    => __( 'Slider autoplay', 'rosa_txtd' ),
						'id'      => wpgrade::prefix() . 'post_slider_autoplay',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( 'Enabled', 'rosa_txtd' ),
								'value' => true
							),
							array(
								'name'  => __( 'Disabled', 'rosa_txtd' ),
								'value' => false
							)
						),
						'std'     => false
					),
					array(
						'name' => __( 'Autoplay delay between slides (in milliseconds)', 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'post_slider_delay',
						'type' => 'text_small',
						'std'  => '1000'
					)
				)
			),
			//for the Contact Page template
			wpgrade::shortname() . '_gmap_settings' => array(
				'id'         => wpgrade::shortname() . '_gmap_settings',
				'title'      => __( 'Map Coordinates & Display Options', 'rosa_txtd' ),
				'pages'      => array( 'page' ), // Post type
				'context'    => 'normal',
				'priority'   => 'high',
				'hidden'     => true,
				'show_on'    => array(
					'key' => 'page-template',
					'value' => array( 'page-templates/contact.php' ),
//					'hide' => true, // make this true if you want to hide it
				),
				'show_names' => true, // Show field names on the left
				'fields'     => array(
					array(
						'name' => __( 'Map Height', 'rosa_txtd' ),
						'desc' => __( '<p class="cmb_metabox_description">Select the height of the Google Map area in relation to the browser window.</p>', 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'page_gmap_height',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( '&nbsp; &#9673;&#9711; &nbsp;Half', 'rosa_txtd' ),
								'value' => 'half-height',
							),
							array(
								'name'  => __( '&#9673;&#9673;&#9711; Two Thirds', 'rosa_txtd' ),
								'value' => 'two-thirds-height',
							),
							array(
								'name'  => __( '&#9673;&#9673;&#9673; Full Height', 'rosa_txtd' ),
								'value' => 'full-height',
							)
						),
						'std'     => 'half-height',
					),
					array(
						'name' => __( 'Google Maps URL', 'rosa_txtd' ),
						'desc' => __( 'Paste here the Share URL you have taken from <a href="http://www.google.com/maps" target="_blank">Google Maps</a>.', 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'gmap_url',
						'type' => 'textarea_small',
						'std'  => '',
					),
					array(
						'name' => __( 'Custom Colors', 'rosa_txtd' ),
						'desc' => __( 'Allow us to change the map colors to better match your website.', 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'gmap_custom_style',
						'type' => 'checkbox',
						'std'  => 'on',
					),
					array(
						'name'    => __( 'Pin Content', 'rosa_txtd' ),
						'desc'    => __( 'Insert here the content of the location marker - leave empty for no custom marker.', 'rosa_txtd' ),
						'id'      => wpgrade::prefix() . 'gmap_marker_content',
						'type'    => 'wysiwyg',
						'std'     => '',
						'options' => array(
							'media_buttons' => true,
							'textarea_rows' => 3,
							'teeny'         => false,
							'tinymce'       => true,
							'quicktags'     => true,
						),
					),
					array(
						'name' => __( 'Make Menu Bar Transparent', 'rosa_txtd' ),
						'desc' => __( "This will remove the background from the menu and logo top bar.", 'rosa_txtd' ),
						'id'   => wpgrade::prefix() . 'header_transparent_menu_bar_contact',
						'type' => 'checkbox',
					),
					array(
						'name' => __( 'Content Border Style', 'rosa_txtd' ),
						'desc' => '<p class="cmb_metabox_description">'.__( 'Select the style of the top and bottom borders of the content.', 'rosa_txtd' ).'</p>',
						'id'   => wpgrade::prefix() . 'gmap_border_style',
						'type'    => 'select',
						'options' => array(
							array(
								'name'  => __( 'Simple', 'rosa_txtd' ),
								'value' => 'simple',
							),
							array(
								'name'  => __( 'Waves', 'rosa_txtd' ),
								'value' => 'waves',
							),
						),
						'std'     => 'simple',
					),
				),
			),
		),
	),
);