<?php

/*
 * Custom Thumbnails
 */

function wpgrade_custom_thumbnails() {

	// Add theme support for Featured Images
	add_theme_support( 'post-thumbnails' );

	$sizes = wpgrade::confoption( 'thumbnails_sizes' );

	if ( ! empty( $sizes ) ) {
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
	}
}

add_action( 'after_setup_theme', 'wpgrade_custom_thumbnails' );

/**
 * Add title and caption back to images
 */
function wpgrade_add_title_caption_to_attachment( $markup, $id ) {
	$att     = get_post( $id );
	$title   = '';
	$caption = '';
	if ( ! empty( $att->post_title ) ) {
		$title = $att->post_title;
	}
	if ( ! empty( $att->post_excerpt ) ) {
		$caption = $att->post_excerpt;
	}

	return str_replace( '<a ', '<a data-title="' . $title . '" data-alt="' . $caption . '" ', $markup );
}

add_filter( 'wp_get_attachment_link', 'wpgrade_add_title_caption_to_attachment', 10, 5 );
