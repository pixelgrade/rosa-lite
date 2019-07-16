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
	$wp_customize->get_control( 'display_header_text' )->label = __( 'Display Site Title &amp; Tagline', 'rosa-lite' );

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
                            	<h4>Advanced Customizations</h4>
                            	<div class="description">Having different tastes and preferences might be tricky for users, but not with Timber onboard. It has an intuitive and catchy interface which allows you to <strong>change fonts, colors, or layout sizes</strong> in a blink of an eye.</div>
                            </li>

                            <li>
                            	<h4>More ways to display your portfolio</h4>
                            	<div class="description">Showcasing your work in different ways will give you more opportunities to express your creativity. That\'s why Timber PRO lets you use <strong>multiple layout styles, add text</strong> anywhere in your portfolio to add more context, <strong>insert videos</strong> to show behind the scenes, or highlight your film-making skills.</div>
                            </li>

                            <li>
                            	<h4>Thrilling Page Transitions & Extra Filtering Options</h4>
                            	<div class="description">We packed the whole experience into a <strong>fascinating loader</strong> that goes beyond what\'s ordinary and familiar. Besides, the social media <strong>sharing</strong>, portfolio, and blog <strong>category</strong> filtering options will equip you with the right tool to wow your audience.</div>
                            </li>
                              <li>
                            	<h4>Premium Customer Support</h4>
                            	<div class="description">You will benefit by priority support from a caring and devoted team, eager to help and to spread happiness. We work hard to provide a flawless experience for those who vote us with trust and choose to be our special client.</div>
                            </li>

                    </ul> %s </div>', 'rosa-lite' ),
			/* translators: %1$s: The view pro URL, %2$s: The view pro link text. */
			sprintf( '<a href="%1$s" target="_blank" class="button button-primary">%2$s</a>', esc_url( rosa_lite_get_pro_link() ), esc_html__( 'View Rosa PRO', 'rosa-lite' ) )
		),
	) );

	$wp_customize->add_setting( 'timber_lite_style_view_pro_desc', array(
		'default'           => '',
		'sanitize_callback' => '__return_true',
	) );

	$wp_customize->add_control( 'timber_lite_style_view_pro_desc', array(
		'section' => 'pro__section',
		'type'    => 'hidden',
	) );
}
add_action( 'customize_register', 'rosa_customize_register' );

/**
 * Generate a link to the Timber Lite info page.
 */
function rosa_lite_get_pro_link() {
	return 'https://pixelgrade.com/themes/portfolio/timber-pro?utm_source=timber-lite-clients&utm_medium=customizer&utm_campaign=timber-lite';
}

/**
 * Assets that will be loaded for the customizer sidebar
 */
//function rosa_lite_customizer_assets() {
//	wp_enqueue_style( 'timber_lite_customizer_style', get_template_directory_uri() . '/admin/admin.css', null, '1.0.0', false );
//}
//add_action( 'admin_enqueue_scripts', 'rosa_lite_customizer_assets' );

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
