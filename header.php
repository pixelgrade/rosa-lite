<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till the main content
 *
 * @package Rosa
 * @since   Rosa 1.0
 */


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
	<title><?php wp_title( '|', true, 'right' ); ?></title>
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

if ( pixelgrade_option( 'nav_always_show' ) ) {
	$class_name .= '  nav-scroll-show';
} else {
	$class_name .= '  nav-scroll-hide';
}

$data_smoothscrolling = ( pixelgrade_option( 'use_smooth_scroll' ) == 1 ) ? 'data-smoothscrolling' : '';
$data_main_color      = ( pixelgrade_option( 'main_color' ) ) ? 'data-color="' . pixelgrade_option( 'main_color' ) . '"' : '';

//first let's test if we are in woocommerce
if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
	//we need to setup post data
	if ( is_shop() || is_cart() || is_checkout() || is_checkout_pay_page() || is_account_page() || is_order_received_page() ) {

		$shop_page_id = wc_get_page_id( 'shop' );

		if ( ! empty( $shop_page_id ) && $shop_page_id != 0 ) {
			global $post;
			$post = get_post( $shop_page_id );

			setup_postdata( $post );

			$make_transparent_menu_bar = get_post_meta( get_the_ID(), wpgrade::prefix() . 'header_transparent_menu_bar', true );

			if ( $make_transparent_menu_bar == 'on' ) {
				$class_name .= '  header--transparent';
			}

		}
	}
}

//make the header menu bar transparent
//only for static pages
if ( is_page() ) {
	$make_transparent_menu_bar = get_post_meta( get_the_ID(), wpgrade::prefix() . 'header_transparent_menu_bar', true );

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

<body <?php body_class( $class_name );
echo ' ' . $data_smoothscrolling . ' ' . $data_main_color ?> >
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
						<h2 class="accessibility"><?php _e( 'Primary Navigation', 'rosa' ) ?></h2>

						<?php
						wp_nav_menu( array(
							'theme_location' => 'main_menu',
							'menu'           => '',
							'container'      => '',
							'container_id'   => '',
							'menu_class'     => 'nav  nav--main  nav--items-menu',
							'menu_id'        => '',
							'fallback_cb'    => 'rosa_please_select_a_menu_fallback',
							'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
						) );

						$theme_locations = get_nav_menu_locations();
						if ( isset( $theme_locations["social_menu"] ) && ( $theme_locations["social_menu"] != 0 ) ) {
							wp_nav_menu( array(
								'theme_location' => 'social_menu',
								'menu'           => '',
								'container'      => '',
								'container_id'   => '',
								//                    'menu_class'      => 'site-navigation site-navigation--footer site-navigation--secondary flush--bottom',
								'menu_class'     => 'nav--main  nav--items-social',
								'fallback_cb'    => false,
								'menu_id'        => '',
								'depth'          => 1,
								'items_wrap'     => '<ul id="%1$s" class="%2$s  nav">%3$s</ul>',
								'link_before'    => '<span class="screen-reader-text">',
								'link_after'     => '</span>',
							) );
						}

						if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) && pixelgrade_option( 'show_cart_menu' ) ) :
							global $woocommerce; ?>
							<ul class="nav  nav--main  nav--woocommerce">
								<li class="shop-menu-item  menu-item-has-children">
									<div class="widget_shopping_cart_content">
										<a class="cart-icon-link" href="<?php echo $woocommerce->cart->get_cart_url(); ?>">
											<i class="icon-shopping-cart"></i>
											<span class="shop-items-number"><?php echo sprintf( _n( '%d', $woocommerce->cart->cart_contents_count, 'woocommerce' ), $woocommerce->cart->cart_contents_count ); ?></span>
										</a>
										<ul class="sub-menu">
											<li>
												<span class="shop-menu-item__price"><?php echo $woocommerce->cart->get_cart_total(); ?></span>
											</li>
											<li>
												<a href="<?php echo $woocommerce->cart->get_cart_url(); ?>"><?php _e( 'View Cart', 'woocommerce' ) ?></a>
											</li>
											<li>
												<a href="<?php echo $woocommerce->cart->get_checkout_url() ?>"><?php _e( 'Checkout', 'woocommerce' ) ?></a>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						<?php endif; ?>
					</nav>
					<div class="nav-overlay"></div>
				</div>
			</div><!-- .flexbox -->
		</div><!-- .container -->
	</div><!-- .site-header -->