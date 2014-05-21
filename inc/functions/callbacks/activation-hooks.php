<?php
// theme activation
function wpgrade_callback_geting_active() {

	/**
	 * make sure pixlikes has the right settings
	 */
	$pixlikes_settings = array(
		'show_on_post' => false,
		'show_on_page' => false,
		'show_on_hompage' => false,
		'show_on_archive' => false,
		'like_action' => 'click',
		'hover_time' => 1000,
		'free_votes' => false,
		'load_likes_with_ajax' => false,
	);
	update_option('pixlikes_settings', $pixlikes_settings);

	/**
	 * Create custom post types, taxonomies and metaboxes
	 * These will be taken by pixtypes plugin and converted in their own options
	 */
	$types_options = get_option('pixtypes_themes_settings');
	if ( empty($types_options) ) {
		$types_options = array();
	}
	$theme_key = wpgrade::shortname() . '_pixtypes_theme';
	$types_options[$theme_key] = array();

    $types_options[$theme_key]['metaboxes'] = array(
        'post_video_format' => array(
            'id' => 'post_format_metabox_video',
            'title' => __('Video Settings', wpgrade::textdomain()),
            'pages'      => array('post'), // Post type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true, // Show field names on the left
            'fields' => array(
                array(
                    'name' => __('Embed Code', wpgrade::textdomain()),
                    'desc' => __('Enter here a Youtube, Vimeo (or other online video services) embed code here. The width should be a minimum of 640px. We will use this if filled, not the selfhosted options bellow!', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'video_embed',
                    'type' => 'textarea_small',
                    'std' => '',
                ),
            )
        ),
        'post_gallery_format' => array(
            'id'         => 'post_format_metabox_gallery',
            'title'      => __('Gallery Settings', wpgrade::textdomain()),
            'pages'      => array( 'post' ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true, // Show field names on the left
            'fields' => array(
                array(
                    'name' =>  __('Images', wpgrade::textdomain()),
                    'id'   =>  wpgrade::prefix() . 'main_gallery',
                    'type' => 'gallery',
                ),
                array(
                    'name' => __('Image Scaling', wpgrade::textdomain()),
                    'desc' => __('<p class="cmb_metabox_description"><strong>Fill</strong> scales image to completely fill slider container (recommended for landscape images)</p>
<p class="cmb_metabox_description"><strong>Fit</strong> scales image to fit the container (recommended for portrait images)</p>
<p class="cmb_metabox_description"><strong>Fit if Smaller</strong> scales image to fit only if size of slider container is less than size of image.</p>
<p class="cmb_metabox_description"><a target="_blank" href="http://bit.ly/slider-image-scaling">Visual explanation</a></p>', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'post_image_scale_mode',
                    'type' => 'select',
                    'options' => array(
                        array(
                            'name' => __('Fit', wpgrade::textdomain()),
                            'value' => 'fit'
                        ),
                        array(
                            'name' => __('Fill', wpgrade::textdomain()),
                            'value' => 'fill'
                        ),
                        array(
                            'name' => __('Fit if Smaller', wpgrade::textdomain()),
                            'value' => 'fit-if-smaller'
                        )
                    ),
                    'std' => 'fill'
                ),
				array(
					'name' => __('Slider height', wpgrade::textdomain()),
					'desc' => __('<p class="cmb_metabox_description">Enter a slider height here (only digits, without \'px\').</p>
<p class="cmb_metabox_description">If left blank, it will default to 525px.</p>
<p class="cmb_metabox_description">If 0 it will stretch to each image height.</p>', wpgrade::textdomain()),
					'id' => wpgrade::prefix() . 'post_slider_height',
					'type' => 'text_small',
					'std' => '',
				),
				array(
                    'name' => __('Show Nearby Images', wpgrade::textdomain()),
                    'desc' => __('Enable this if you want to avoid having empty space on the sides of the image when using mostly portrait images.', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'post_slider_visiblenearby',
                    'type' => 'select',
                    'options' => array(
                        array(
                            'name' => __('Enabled', wpgrade::textdomain()),
                            'value' => true
                        ),
                        array(
                            'name' => __('Disabled', wpgrade::textdomain()),
                            'value' => false
                        )
                    ),
                    'std' => false
                ),
                array(
                    'name' => __('Slider transition', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'post_slider_transition',
                    'type' => 'select',
                    'options' => array(
                        array(
                            'name' => __('Slide/Move', wpgrade::textdomain()),
                            'value' => 'move'
                        ),
                        array(
                            'name' => __('Fade', wpgrade::textdomain()),
                            'value' => 'fade'
                        )
                    ),
                    'std' => 'move'
                ),
                array(
                    'name' => __('Slider autoplay', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'post_slider_autoplay',
                    'type' => 'select',
                    'options' => array(
                        array(
                            'name' => __('Enabled', wpgrade::textdomain()),
                            'value' => true
                        ),
                        array(
                            'name' => __('Disabled', wpgrade::textdomain()),
                            'value' => false
                        )
                    ),
                    'std' => false
                ),
                array(
                    'name' => __('Autoplay delay between slides (in milliseconds)', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'post_slider_delay',
                    'type' => 'text_small',
                    'std' => '1000'
                )
            )
        ),
        'post_quote_format' => array(
            'id' => 'post_format_metabox_quote',
            'title' =>  __('Quote Settings', wpgrade::textdomain()),
            'pages'      => array( 'post' ), // Post type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true, // Show field names on the left
            'fields' => array(
                array(
                    'name' =>  __('Quote Content', wpgrade::textdomain()),
                    'desc' => __('Please type the text of your quote here.', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'quote',
                    'type' => 'wysiwyg',
                    'std' => '',
                    'options' => array (
                        'textarea_rows' => 4,
                    ),
                ),
                array(
                    'name' => __('Author Name', wpgrade::textdomain()),
                    'desc' => '',
                    'id' => wpgrade::prefix() . 'quote_author',
                    'type' => 'text',
                    'std' => '',
                ),
                array(
                    'name' => __('Author Title', wpgrade::textdomain()),
                    'desc' => '',
                    'id' => wpgrade::prefix() . 'quote_author_title',
                    'type' => 'text',
                    'std' => '',
                ),
                array(
                    'name' => __('Author Link', wpgrade::textdomain()),
                    'desc' => __('Insert here an url if you want the author name to be linked to that address.', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'quote_author_link',
                    'type' => 'text',
                    'std' => '',
                ),
            )
        ),
        'post_audio_format' => array(
            'id' => 'post_format_metabox_audio',
            'title' =>  __('Audio Settings', wpgrade::textdomain()),
            'pages'      => array( 'post'), // Post type
            'context' => 'normal',
            'priority' => 'high',
            'show_names' => true, // Show field names on the left
            'fields' => array(
                array(
                    'name' => __('Embed Code', wpgrade::textdomain()),
                    'desc' => __('Enter here a embed code here. The width should be a minimum of 640px.', wpgrade::textdomain()),
                    'id' => wpgrade::prefix() . 'audio_embed',
                    'type' => 'textarea_small',
                    'std' => '',
                ),
            )
        ),
    );

	update_option('pixtypes_themes_settings', $types_options);

	/**
	 * http://wordpress.stackexchange.com/questions/36152/flush-rewrite-rules-not-working-on-plugin-deactivation-invalid-urls-not-showing
	 * nothing from above works in plugin so ...
	 */
	delete_option('rewrite_rules');

	// Ensure theme defaults
}

add_action('after_switch_theme', 'wpgrade_callback_geting_active');

// temporary for testing purpose
//add_action('wp', 'wpgrade_callback_geting_active');