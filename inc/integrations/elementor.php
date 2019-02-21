<?php
/**
 * Custom functions that deal with various plugin integrations of Elementor.
 *
 * @package Rosa
 * @since   2.4.4
 */

/**
 * Shortcircuit the multipages logic for when we are in the Elementor editor.
 *
 * @param bool $allow
 * @param WP_Post $post
 *
 * @return bool
 */
function rosa_prevent_multipage_logic_in_elementor( $allow, $post ) {
	if ( empty( $post ) || is_wp_error( $post ) || empty( $post->ID ) ) {
		return $allow;
	}

	// We will not allow the multipage logic when the request is for the Elementor main editor window or the preview window,
	// but only for permalinks related to the actual page being edited, not for others.
	if ( ( isset( Elementor\Plugin::instance()->preview ) && method_exists( Elementor\Plugin::instance()->preview, 'is_preview_mode' ) && Elementor\Plugin::instance()->preview->is_preview_mode( $post->ID ) ) ||
	     ( isset( Elementor\Plugin::instance()->editor ) && method_exists( Elementor\Plugin::instance()->editor, 'is_edit_mode' ) && Elementor\Plugin::instance()->editor->is_edit_mode( $post->ID ) ) ) {
		return false;
	}

	return $allow;
}
add_filter( 'pixelgrade_multipage_allow', 'rosa_prevent_multipage_logic_in_elementor', 10, 2 );

/**
 * Allow empty markup around the_content when we are in the Elementor editor.
 *
 * @param bool $allow
 * @param WP_Post $post
 *
 * @return bool
 */
function rosa_allow_empty_markup_in_elementor( $allow, $post ) {
	if ( empty( $post ) || is_wp_error( $post ) || empty( $post->ID ) ) {
		return $allow;
	}

	if ( ( isset( Elementor\Plugin::instance()->preview ) && method_exists( Elementor\Plugin::instance()->preview, 'is_preview_mode' ) && Elementor\Plugin::instance()->preview->is_preview_mode( $post->ID ) ) ||
	     ( isset( Elementor\Plugin::instance()->editor ) && method_exists( Elementor\Plugin::instance()->editor, 'is_edit_mode' ) && Elementor\Plugin::instance()->editor->is_edit_mode( $post->ID ) ) ) {
		return true;
	}

	return $allow;
}
add_filter( 'rosa_avoid_empty_markup_if_no_page_content', 'rosa_allow_empty_markup_in_elementor', 10, 2 );
