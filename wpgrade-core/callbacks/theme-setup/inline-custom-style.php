<?php

/**
 * This callback is invoked by rosa_callback_themesetup.
 * The function is executed on wp_head
 */
function rosa_callback_inlined_custom_style() {

	ob_start();
	include wpgrade::corepartial( 'inline-custom-css.php' );
	$custom_css = ob_get_clean();
	$style      = 'wpgrade-main-style';

	wp_add_inline_style( $style, $custom_css );
}
