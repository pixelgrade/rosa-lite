<?php
/**
 * Rosa Theme Customizer
 *
 * @package Rosa
 * @since Rosa 2.0.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function rosa_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';

	// Rename the label to "Display Site Title & Tagline" in order to make this option clearer.
	$wp_customize->get_control( 'display_header_text' )->label = __( 'Display Site Title &amp; Tagline', 'rosa' );
}
add_action( 'customize_register', 'rosa_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function rosa_customize_preview_js() {
	wp_enqueue_script( 'rosa_customizer_preview', get_template_directory_uri() . '/assets/js/admin/customizer_preview.js', array( 'customize-preview' ), '20160215', true );
}
add_action( 'customize_preview_init', 'rosa_customize_preview_js' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function rosa_load_customize_js() {
	wp_enqueue_script( 'rosa_customizer', get_template_directory_uri() . '/assets/js/admin/customizer.js', array( 'wp-ajax-response' ), '20160215', true );
}
add_action( 'customize_controls_enqueue_scripts', 'rosa_load_customize_js' );
