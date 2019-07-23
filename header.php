<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till the main content
 *
 * @package Rosa
 * @since   Rosa Lite 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

//detect what type of content are we displaying
$schema_org = '';
if ( is_single() ) {
	$schema_org .= ' itemscope itemtype="http://schema.org/Article"';
} else {
	$schema_org .= ' itemscope itemtype="http://schema.org/WebPage"';
}
?><!DOCTYPE html>
<!--[if lt IE 7]>
<html class="lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); echo $schema_org; ?>> <![endif]-->
<!--[if IE 7]>
<html class="lt-ie9 lt-ie8" <?php language_attributes(); echo $schema_org; ?>> <![endif]-->
<!--[if IE 8]>
<html class="lt-ie9" <?php language_attributes(); echo $schema_org; ?>> <![endif]-->
<!--[if IE 9]>
<html class="ie9" <?php language_attributes(); echo $schema_org; ?>> <![endif]-->
<!--[if gt IE 9]><!-->
<html <?php language_attributes(); echo $schema_org; ?>> <!--<![endif]-->
<head>
	<meta http-equiv="content-type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="HandheldFriendly" content="True">
	<meta name="apple-touch-fullscreen" content="yes"/>
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="web-app-capable" content="yes">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<![if IE]>
	<script type='text/javascript'>
		if(/*@cc_on!@*/false)
			var isIe = 1;
	</script>
	<![endif]>
	<?php
	/**
	 * One does not simply remove this and walk away alive!
	 */
	wp_head(); ?>
</head>
<?php
$class_name = 'header--sticky';

$class_name .= '  nav-scroll-hide';


$data_smoothscrolling = ( 1 == pixelgrade_option( 'use_smooth_scroll', 1 ) ) ? 'data-smoothscrolling' : '';
$data_main_color      = ( pixelgrade_option( 'main_color', '#C59D5F' ) ) ? 'data-color="' . esc_attr( pixelgrade_option( 'main_color', '#C59D5F' ) ) . '"' : '';

//make the header menu bar transparent
//only for static pages
if ( is_page() ) {
	$make_transparent_menu_bar = get_post_meta( get_the_ID(), rosa_lite_prefix() . 'header_transparent_menu_bar', true );

	if ( $make_transparent_menu_bar == 'on' ) {
		$class_name .= '  header--transparent';
	}
}

$schema_org = '';
if ( is_single() ) {
	$schema_org .= 'itemscope itemtype="http://schema.org/Article"';
} else {
	$schema_org .= 'itemscope itemtype="http://schema.org/WebPage"';
} ?>

<body <?php body_class( $class_name ); echo ' ' . $data_smoothscrolling . ' ' . $data_main_color ?> >
<!--[if lt IE 7]>
<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
	your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to
	improve your experience.</p>
<![endif]-->
<div id="page" class="page">
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

					if ( isset( $theme_locations["main_menu"] ) && ( $theme_locations["main_menu"] != 0 ) ) {
						$has_main_menu = true;
					} ?>
					<nav class="navigation  navigation--main<?php echo ( ! $has_main_menu ) ? "  no-menu" : ""; ?>" id="js-navigation--main">
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
						) );
						?>

					</nav>
					<div class="nav-overlay"></div>
				</div>
			</div><!-- .flexbox -->
		</div><!-- .container -->
	</div><!-- .site-header -->
