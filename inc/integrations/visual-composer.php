<?php
/**
 * Custom functions that deal with various plugin integrations of Visual Composer.
 *
 * @package Rosa
 * @since 2.0.0
 */

function rosa_allow_empty_page_markup_when_frontend_vc( $allow ) {
	//for VC frontend editor to function properly it needs the wrapper markup
	if ( vc_is_page_editable() ) {
		return true;
	}

	return $allow;
}
add_filter( 'rosa_avoid_empty_markup_if_no_page_content', 'rosa_allow_empty_page_markup_when_frontend_vc', 10, 1 );