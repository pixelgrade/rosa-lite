<?php
/**
 * Custom functions that deal with various plugin integrations of Visual Composer.
 *
 * @package Rosa
 * @since 2.0.0
 */

/**
 * @param bool $allow
 *
 * @return bool
 */
function rosa_allow_empty_page_markup_when_frontend_vc( $allow ) {
	//for VC frontend editor to function properly it needs the wrapper markup
	if ( vc_is_page_editable() ) {
		return true;
	}

	return $allow;
}
add_filter( 'rosa_avoid_empty_markup_if_no_page_content', 'rosa_allow_empty_page_markup_when_frontend_vc', 10, 1 );

/**
 * @param bool $display
 *
 * @return bool
 */
function rosa_do_not_display_subpages_when_frontend_vc( $display ) {
	//for VC frontend editor to function properly it needs the wrapper markup
	if ( vc_is_page_editable() ) {
		return false;
	}

	return $display;
}
add_filter( 'rosa_display_subpages', 'rosa_do_not_display_subpages_when_frontend_vc', 10, 1 );