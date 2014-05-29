<?php

// add theme support for post formats
$post_formats = wpgrade::confoption( 'post-formats', array() );
if ( ! empty( $post_formats ) ) {
	add_theme_support( 'post-formats', $post_formats );
}

/**
 * http://codex.wordpress.org/Content_Width
 */
if ( ! isset( $content_width ) ) {
	$content_width = 960;
}