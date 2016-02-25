<?php
/**
 * Custom functions that deal with various plugin integrations of Beaver Builder.
 *
 * @package Rosa
 * @since 2.0.0
 */

/**
 * @param bool $allow
 *
 * @return bool
 */
function rosa_allow_empty_page_markup_when_frontend_bb( $allow ) {
	//for BB frontend editor to function properly it needs the wrapper markup
	if ( FLBuilderModel::is_builder_active() ) {
		return true;
	}

	return $allow;
}
add_filter( 'rosa_avoid_empty_markup_if_no_page_content', 'rosa_allow_empty_page_markup_when_frontend_bb', 10, 1 );

/**
 * @param bool $display
 *
 * @return bool
 */
function rosa_do_not_display_subpages_when_frontend_bb( $display ) {
	//for BB frontend editor to function properly it needs the wrapper markup
	if ( FLBuilderModel::is_builder_active() ) {
		return false;
	}

	return $display;
}
add_filter( 'rosa_display_subpages', 'rosa_do_not_display_subpages_when_frontend_bb', 10, 1 );

function rosa_custom_css_for_bb() {
	//since someone is adding an inline height: auto on the body we need to take things one step further
	if( FLBuilderModel::is_builder_active() ) : ?>

		<style id="rosa_bb_custom_style">
			body.fl-builder {
				height: 100% !important;
			}
		</style>

	<?php endif;
}
add_action( 'wp_head', 'rosa_custom_css_for_bb', 999 );