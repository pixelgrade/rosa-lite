<?php
/**
 * Rosa Lite Theme Customizer
 *
 * @package Rosa Lite
 * @since Rosa Lite 1.0.0
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
	$wp_customize->get_control( 'display_header_text' )->label = esc_html__( 'Display Site Title &amp; Tagline', 'rosa-lite' );

	// View Pro
	$wp_customize->add_section( 'pro__section', array(
		'title'       => '' . esc_html__( 'View PRO Version', 'rosa-lite' ),
		'priority'    => 2,
		'description' => sprintf(
		/* translators: %s: The view pro link. */
			__( '<div class="upsell-container">
					<h2>Need More? Go PRO</h2>
					<p>Take it to the next level and stand out. See the hotspots of Rosa PRO:</p>
					<ul class="upsell-features">
                            <li>
                            	<h4>Personalize to Match Your Branding</h4>
                            	<div class="description">Showcase your restaurant\'s brand in an easy and smart way by using Style Manager. This intuitive interface allows you to change color palettes and fonts with a few clicks until they fully represent your business.</div>
                            </li>

                            <li>
                            	<h4>More Parallax Areas with Slideshow and Video</h4>
                            	<div class="description">With Rosa PRO, you\'ll be able to add multiple parallax areas on the same page. You\'ll also be able to add a slideshow of images to each parallax section or a background video showcasing your location, behind the scenes action or promote special events. The sky\'s the limit.</div>
                            </li>

                            <li>
                            	<h4>Support for Online Ordering & Other Advanced Features</h4>
                            	<div class="description">Rosa PRO is fully integrated with the famous WooCommerce plugin and the UpMenu online ordering plugin so you can enable food delivery in an instant. People will be able to order food right from your website with a few clicks. You\'ll also get additional options for your Food Menu (prices, categories), a Location Map for easy discovery, more Widget Areas for extra flexibility, and many others.</div>
                            </li>
                              <li>
                            	<h4>Premium Customer Support</h4>
                            	<div class="description">You will benefit by priority support from a caring and devoted team, eager to help and to spread happiness. We work hard to provide a flawless experience for those who vote us with trust and choose to be our awesome client.</div>
                            </li>

                    </ul> %s </div>', 'rosa-lite' ),
			/* translators: %1$s: The view pro URL, %2$s: The view pro link text. */
			sprintf( '<a href="%1$s" target="_blank" class="button button-primary">%2$s</a>', esc_url( rosa_lite_get_pro_link() ), esc_html__( 'Get Rosa PRO', 'rosa-lite' ) )
		),
	) );

	$wp_customize->add_setting( 'rosa_lite_style_view_pro_desc', array(
		'default'           => '',
		'sanitize_callback' => '__return_true',
	) );

	$wp_customize->add_control( 'rosa_lite_style_view_pro_desc', array(
		'section' => 'pro__section',
		'type'    => 'hidden',
	) );
}
add_action( 'customize_register', 'rosa_customize_register' );

/**
 * Generate a link to the Timber Lite info page.
 */
function rosa_lite_get_pro_link() {
	return 'https://pixelgrade.com/themes/portfolio/rosa-pro/?utm_source=rosa-lite-clients&utm_medium=customizer&utm_campaign=rosa-lite';
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function rosa_lite_customize_preview_js() {
	wp_enqueue_script( 'rosa_customizer_preview', get_template_directory_uri() . '/assets/js/admin/customizer_preview.js', array( 'customize-preview' ), '20160215', true );
}
add_action( 'customize_preview_init', 'rosa_lite_customize_preview_js' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function rosa_lite_load_customize_js() {
	wp_enqueue_script( 'rosa_customizer', get_template_directory_uri() . '/assets/js/admin/customizer.js', array( 'wp-ajax-response' ), '20160215', true );
}
add_action( 'customize_controls_enqueue_scripts', 'rosa_lite_load_customize_js' );

/**
 * Assets that will be loaded for the customizer sidebar
 */
function rosa_lite_customizer_assets() {
	wp_enqueue_style( 'rosa_lite_customizer_style', get_template_directory_uri() . '/css/customizer.css', null, '1.0.0', false );
}
add_action( 'customize_controls_enqueue_scripts', 'rosa_lite_customizer_assets' );
