<?php

function wpgrade_callback_enqueue_rtl_support() {

	if ( is_rtl() ) {
		wp_enqueue_style( 'rtl-support', wpgrade::resourceuri( 'css/localization/rtl.css' ) );
	}

}