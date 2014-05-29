<?php

/**
 * This callback is invoked by wpgrade_callback_themesetup.
 * The function is executed on wp_head
 */
function wpgrade_callback_inlined_custom_style() {

	ob_start();
	include wpgrade::corepartial( 'inline-custom-css' . EXT );
	$custom_css = ob_get_clean();
	$style      = 'wpgrade-main-style';

	wp_add_inline_style( $style, $custom_css );
}
