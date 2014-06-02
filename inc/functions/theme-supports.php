<?php

// add theme support for post formats
$post_formats = wpgrade::confoption( 'post-formats', array() );
if ( ! empty( $post_formats ) ) {
	add_theme_support( 'post-formats', $post_formats );
}

//add theme support for RSS feed links automatically generated in the head section
add_theme_support( 'automatic-feed-links' );

//tell galleries and captions to behave nicely and use HTML5 markup
add_theme_support( 'html5', array( 'gallery', 'caption' ) );

/**
 * http://codex.wordpress.org/Content_Width
 */
if ( ! isset( $content_width ) ) {
	$content_width = 960;
}