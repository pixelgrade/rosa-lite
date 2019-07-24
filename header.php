<?php
/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up till the main content
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Rosa
 * @since   Rosa Lite 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

$class_name = 'header--sticky nav-scroll-hide';

// Make the header menu bar transparent, but only for static pages.
if ( is_page() ) {
	$make_transparent_menu_bar = get_post_meta( get_the_ID(), rosa_lite_prefix() . 'header_transparent_menu_bar', true );

	if ( $make_transparent_menu_bar == 'on' ) {
		$class_name .= '  header--transparent';
	}
}

$data_smoothscrolling = ( 1 == pixelgrade_option( 'use_smooth_scroll', 1 ) ) ? 'data-smoothscrolling' : '';
$data_main_color = ( pixelgrade_option( 'main_color', '#C59D5F' ) ) ? 'data-color="' . esc_attr( pixelgrade_option( 'main_color', '#C59D5F' ) ) . '"' : '';

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<![if IE]>
	<script type='text/javascript'>
		if(/*@cc_on!@*/false)
			var isIe = 1;
	</script>
	<![endif]>
	<?php wp_head(); ?>
</head>
<body <?php body_class( $class_name ); echo ' ' . $data_smoothscrolling . ' ' . $data_main_color; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
<?php wp_body_open() ?>
<div id="page" class="page">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'rosa-lite' ); ?></a>
	<div class="site-header  header--inversed  js-header">
		<div class="container">
			<div class="flexbox">
				<div class="flexbox__item">
					<button class="nav-trigger  js-nav-trigger">
						<span class="nav-icon"></span>
					</button>
				</div>
				<div class="flexbox__item  branding-container">
					<?php get_template_part( 'template-parts/branding' ); ?>
				</div>
				<div class="flexbox__item">
					<?php
					$theme_locations = get_nav_menu_locations();
					$has_main_menu   = false;

					if ( isset( $theme_locations['main_menu'] ) && ( $theme_locations['main_menu'] != 0 ) ) {
						$has_main_menu = true;
					} ?>
					<nav class="navigation  navigation--main<?php echo ( ! $has_main_menu ) ? '  no-menu' : ''; ?>" id="js-navigation--main">
						<h2 class="accessibility"><?php esc_html_e( 'Primary Navigation', 'rosa-lite' ) ?></h2>

						<?php
						wp_nav_menu( array(
							'theme_location' => 'main_menu',
							'menu'           => '',
							'container'      => '',
							'container_id'   => '',
							'menu_class'     => 'nav  nav--main  nav--items-menu',
							'menu_id'        => '',
							'fallback_cb'    => 'rosa_lite_please_select_a_menu_fallback',
							'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
						) ); ?>

					</nav>
					<div class="nav-overlay"></div>
				</div>
			</div><!-- .flexbox -->
		</div><!-- .container -->
	</div><!-- .site-header -->
