<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>
<html class="lt-ie9 lt-ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>
<html class="lt-ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 9]>
<html class="ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 9]><!-->
<html <?php language_attributes(); ?>> <!--<![endif]-->
<head>
	<meta http-equiv="content-type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="HandheldFriendly" content="True">
	<meta name="apple-touch-fullscreen" content="yes"/>
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<script type="text/javascript">
		var isIE10 = false;
		/*@cc_on
		if (/^10/.test(@_jscript_version)) {
			isIE10 = true;
		}
		@*/
	</script>
	<?php
	/**
	 * One does not simply remove this and walk away alive!
	 */
	wp_head(); ?>
</head>
<?php
$class_name = 'header--sticky';

if ( wpgrade::option( 'nav_always_show' ) ) {
	$class_name .= '  nav-scroll-show';
} else {
	$class_name .= '  nav-scroll-hide';
}

$data_smoothscrolling = ( wpgrade::option( 'use_smooth_scroll' ) == 1 ) ? 'data-smoothscrolling' : '';
$data_main_color      = ( wpgrade::option( 'main_color' ) ) ? 'data-color="' . wpgrade::option( 'main_color' ) . '"' : '';

//first let's test if we are in woocommerce
if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
	//we need to setup post data
	if ( is_shop() || is_cart() || is_checkout() || is_checkout_pay_page() || is_account_page() || is_order_received_page() ) {

		$shop_page_id = wc_get_page_id( 'shop' );

		if ( ! empty( $shop_page_id ) && $shop_page_id != 0 ) {
			global $post;
			$post = get_post( $shop_page_id );

			setup_postdata( $post );

			$make_transparent_menu_bar = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'header_transparent_menu_bar', true );

			if ( $make_transparent_menu_bar == 'on' ) {
				$class_name .= '  header--transparent';
			}

		}
	}
}

//make the header menu bar transparent
//only for static pages
if ( is_page() ) {

	if ( get_page_template_slug( get_the_ID() ) == 'page-templates/contact.php' ) {
		$make_transparent_menu_bar = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'header_transparent_menu_bar_contact', true );
	} else {
		$make_transparent_menu_bar = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'header_transparent_menu_bar', true );
	}

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
echo ' ' . $schema_org . ' ' . $data_smoothscrolling . ' ' . $data_main_color ?> >
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
					<a href="#" class="js-nav-trigger  nav-trigger"><i class="icon-reorder"></i></a>
				</div>
				<div class="flexbox__item  branding-container">
					<?php get_template_part( 'templates/header/branding' ); ?>
				</div>
				<div class="flexbox__item">
					<?php
					$theme_locations = get_nav_menu_locations();
					$has_main_menu   = false;

					if ( isset( $theme_locations["main_menu"] ) && ( $theme_locations["main_menu"] != 0 ) ) {
						$has_main_menu = true;
					} ?>
					<nav class="navigation  navigation--main<?php echo ( ! $has_main_menu ) ? "  no-menu" : ""; ?>" id="js-navigation--main">
						<h2 class="accessibility"><?php _e( 'Primary Navigation', wpgrade::textdomain() ) ?></h2>
						<ul class="nav  nav--main  nav--items-social">
							<?php

							$social_links = wpgrade::option( 'social_icons' );

							$target = '';
							if ( wpgrade::option( 'social_icons_target_blank' ) ) {
								$target = 'target="_blank"';
							}

							if ( ! empty( $social_links ) ) {
								foreach ( $social_links as $domain => $icon ) {
									if ( isset( $icon['value'] ) && isset( $icon['checkboxes']['header'] ) ) {
										$value = $icon['value']; ?>
										<li>
											<a class="social-icon" href="<?php echo $value ?>" <?php echo $target ?>>
												<i class="icon-e-<?php echo $domain; ?>"></i>
											</a>
										</li>
									<?php
									}
								}
							}

							if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) && wpgrade::option( 'show_cart_menu' ) ) {
								global $woocommerce; ?>

								<li class="shop-menu-item  menu-item-has-children">
									<div class="widget_shopping_cart_content">
										<a class="cart-icon-link" href="<?php echo $woocommerce->cart->get_cart_url(); ?>">
											<i class="icon-shopping-cart"></i>
											<span class="shop-items-number"><?php echo sprintf( _n( '%d', $woocommerce->cart->cart_contents_count, 'woothemes' ), $woocommerce->cart->cart_contents_count ); ?></span>
										</a>
										<ul class="sub-menu">
											<li>
												<span class="shop-menu-item__price"><?php echo $woocommerce->cart->get_cart_total(); ?></span>
											</li>
											<li>
												<a href="<?php echo $woocommerce->cart->get_cart_url(); ?>"><?php _e( 'View cart', 'woocommerce' ) ?></a>
											</li>
											<li>
												<a href="<?php echo $woocommerce->cart->get_checkout_url() ?>"><?php _e( 'Checkout', 'woocommerce' ) ?></a>
											</li>
										</ul>
									</div>
								</li>

							<?php } ?>
						</ul>
						<?php wpgrade_main_nav(); ?>
					</nav>
				</div>
			</div>
			<!-- .flexbox -->
		</div>
		<!-- .container -->
	</div>
	<!-- .site-header -->

<?php
