<?php

class ThemeUnitTests extends WP_UnitTestCase {

	function test_dummy_check() {
		$this->assertEquals( true, '1' );
	}

	/**
	 * Ensure the active Theme is Rosa
	 */
	function test_theme_name(){
		$theme = wp_get_theme();

		$theme_template = get_option( 'current_theme' );

		$this->assertEquals( $theme_template, 'Rosa' );

		$this->assertEquals( $theme->stylesheet, 'rosa' );

		$this->assertEquals( $theme->template, 'rosa' );
	}
}

