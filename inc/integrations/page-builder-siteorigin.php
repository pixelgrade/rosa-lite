<?php
/**
 * Custom functions that deal with various plugin integrations of Page Builder by SiteOrigin.
 *
 * @package Rosa
 * @since 2.0.0
 */

/**
 * @param bool $allow
 *
 * @return bool
 */
function rosa_allow_empty_page_markup_when_frontend_pb_siteorigin( $allow, $post ) {
	//bail if no post
	if ( empty( $post ) ) return $allow;
	//since Page Builder does some magic with the_content we need to determine if there is actually content even if $post->post_content is empty
	if ( function_exists('siteorigin_panels_render') ) {
		//if the plugin is not allowed to filter the content (from it's settings), do nothing
		if ( ! apply_filters( 'siteorigin_panels_filter_content_enabled', true ) ) {
			return $allow;
		}

		// Check if this post has panels_data
		$panels_data = get_post_meta( $post->ID, 'panels_data', true );
		if ( ! empty( $panels_data ) ) {
			$panel_content = siteorigin_panels_render( $post->ID );

			//it seems we have special content from the plugin
			//we definitely want the content
			if ( ! empty( $panel_content ) ) {
				return true;
			}
		}
	}

	return $allow;
}
add_filter( 'rosa_avoid_empty_markup_if_no_page_content', 'rosa_allow_empty_page_markup_when_frontend_pb_siteorigin', 10, 2 );
add_filter( 'rosa_avoid_empty_subpage_markup_if_no_page_content', 'rosa_allow_empty_page_markup_when_frontend_pb_siteorigin', 10, 2 );