<?php

/**
 * Note: next_text and prev_text are already flipped as per sorted_paging
 * in the configuration passed to this function.
 * The formatter is designed to generate the following structure:
 *    <div class="wpgrade_pagination">
 *        <a class="prev disabled page-numbers">Previous Page</a>
 *        <div class="pages">
 *            <span class="page">Page</span>
 *            <span class="page-numbers current">1</span>
 *            <span class="dots-of">of</span>
 *            <a class="page-numbers" href="/page/8/">8</a>
 *        </div>
 *        <a class="next page-numbers" href="/page/2/">Newer posts</a>
 *    </div>
 *
 * @param array pagination links
 * @param array pagination configuration
 *
 * @return string
 */
function wpgrade_callback_pagination_formatter( $links, $conf ) {
	$linkcount = count( $links );

	//don't show anything when no pagination is needed
	if ( $linkcount == 0 ) {
		return '';
	}
	$prefix = '';
	$suffix = '<!--';

	$current = $conf['current'];
	foreach ( $links as $key => &$link ) {

		//some SEO shit
		//prevent pagination parameters for the links to the first page
		if ( $key == 0 && $current == 2 && strpos( $link, 'prev' ) ) {
			//the first link - should be prev and since we are on page 2 it will hold the link to the first page
			$link = preg_replace( '/href=(["\'])(http:\/\/)?([^"\']+)(["\'])/', 'href="' . get_pagenum_link( 1 ) . '"', $link );
		}

		//change the link of the first page to be more SEO friendly
		$link_text = strip_tags( $link );
		if ( $current != 1 && $link_text == "1" ) {
			$link = preg_replace( '/href=(["\'])(http:\/\/)?([^"\']+)(["\'])/', 'href="' . get_pagenum_link( 1 ) . '"', $link );
		}

		if ( $key == $linkcount - 1 ) {
			$suffix = '';
		}

		$link   = $prefix . '<li>' . $link . '</li>' . $suffix;
		$prefix = "\n-->";
	}

	//if we are on the first page we should have a disabled prev text
	if ( $current == 1 ) {
		array_unshift( $links, '<li><span class="prev  page-numbers  disabled">' . $conf['prev_text'] . '</span></li>' );
	}
	//if we are on the last page we should have a disabled next text
	if ( $current == $conf['total'] ) {
		array_push( $links, '<li><span class="next page-numbers  disabled">' . $conf['next_text'] . '</span></li>' );
	}

	return '<ol class="nav nav--banner pagination">' . implode( '', $links ) . '</ol>';
}


/** Do the same thing on single post pagination */

function wpgrade_pagination_custom_markup( $link, $key ) {
	global $wp_query;
	$current = ( get_query_var( 'page' ) ) ? get_query_var( 'page' ) : '1';
	$class   = '';
	$prefix  = '-->';
	$suffix  = '<!--';
	switch ( $key ) {
		case $current:
			$class .= 'class="pagination-item pagination-item--current"';
			$link = '<span>' . $link . '</span>';
			break;
		case 'prev':
			$class .= 'class="pagination-item pagination-item--prev"';
			break;
		case 'next':
			$class .= 'class="pagination-item pagination-item--next"';
			break;
		default:
			break;
	}

	$link = '<li ' . $class . '>' . $link . '</li>';

	return $link;

}

add_filter( 'wp_link_pages_link', 'wpgrade_pagination_custom_markup', 10, 2 );