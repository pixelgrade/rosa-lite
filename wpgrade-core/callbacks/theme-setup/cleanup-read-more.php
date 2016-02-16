<?php

/**
 * Invoked by rosa_callback_themesetup
 * The function is executed on the_content
 *
 * @param string content
 *
 * @return string
 */
function rosa_callback_cleanup_excerpt( $more ) {
	global $post;

	return include wpgrade::corepartial( 'read-more.php' );
}

/**
 * Invoked by rosa_callback_themesetup
 * The function is executed on the_content_more_link
 *
 * @param string content
 *
 * @return string
 */
function rosa_callback_cleanup_readmore_content( $more_link, $more_link_text ) {
	global $post;

	return include wpgrade::corepartial( 'read-more-content.php' );
}