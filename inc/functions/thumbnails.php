<?php

/*
 * Custom Thumbnails
 */

function wpgrade_custom_thumbnails (){
    
    // Add theme support for Featured Images
    add_theme_support( 'post-thumbnails' );

    /*
     * MAXIMUM SIZE
     * Maximum Full Image Size
     * - Sliders
     * - Lightbox
     */
    add_image_size('full-size', 2048);

    /* 
     * MEDIUM SIZE
     * - Split Article
     * - Tablet Sliders
     */
    add_image_size('medium-size', 1024);

    /* 
     * SMALL SIZE (cropped)
     * - Masonry Grid
     * - Mobile Sliders
     */
    add_image_size('small-size', 400);

    // Classic blog
    add_image_size('post-square-small', 177, 177, true);

    /* 
     * MEDIUM SIZE (cropped)
     * - Related Posts
     */
    add_image_size('post-square-medium', 380, 380, true);

    // Heap blog
    add_image_size('post-medium', 265, 328, true);

}

add_action( 'after_setup_theme', 'wpgrade_custom_thumbnails');

/**
 * Add title and caption back to images
 */
function wpgrade_add_title_caption_to_attachment( $markup, $id ){
	$att = get_post( $id );
	$title = '';
	$caption = '';
	if (!empty($att->post_title)) {
		$title = $att->post_title;
	}
	if (!empty($att->post_excerpt)) {
		$caption = $att->post_excerpt;
	}
	return str_replace('<a ', '<a data-title="'.$title.'" data-alt="'.$caption.'" ', $markup);
}
add_filter('wp_get_attachment_link', 'wpgrade_add_title_caption_to_attachment', 10, 5);
