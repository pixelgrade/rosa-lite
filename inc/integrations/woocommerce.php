<?php
/**
 * Custom functions that deal with various plugin integrations of WooCommerce.
 *
 * @package Rosa
 * @since 2.0.0
 */

/**
 * Woocommerce support
 * If woocommerce is active and is required woo support then load them all
 */
add_theme_support( 'woocommerce' );

/**
 * Assets
 */
function rosa_callback_load_woocommerce_assets() {
	global $woocommerce;

	if ( ! pixelgrade_option( 'enable_woocommerce_support', 1, true ) ) {
		return;
	}

	$theme = wp_get_theme();
	wp_enqueue_style( 'rosa-woocommerce', get_template_directory_uri() . '/woocommerce.css', array( 'woocommerce-general' ), $theme->get( 'Version' ) );
}

add_action( 'wp_enqueue_scripts', 'rosa_callback_load_woocommerce_assets', 1 );

/**
 * Woocommerce support
 * If woocommerce is active and is required woo support then load tehm all
 */
if ( ! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
	return;
}

/**
 * WooCommerce Loop Product Thumbs
 **/

if ( ! function_exists( 'woocommerce_template_loop_product_thumbnail' ) ) {
	remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );
	add_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail', 10 );

	function woocommerce_template_loop_product_thumbnail() {

		global $post;

		$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'small-size' );

		echo woocommerce_get_product_thumbnail( 'small-size' );
	}
}

add_filter( 'term_links-product_cat', 'rosa_filter_product_categories', 10, 1 );

function rosa_filter_product_categories( $term_links ) {

	if ( ! empty( $term_links ) ) {
		foreach ( $term_links as &$link ) {
			$link = str_replace( '<a ', '<a class="btn  btn--small  btn--tertiary" ', $link );
		}
	}

	return $term_links;
}

add_filter( 'term_links-product_tag', 'rosa_filter_product_tags', 10, 1 );

function rosa_filter_product_tags( $term_links ) {

	if ( ! empty( $term_links ) ) {
		foreach ( $term_links as &$link ) {
			$link = str_replace( '<a ', '<a class="btn  btn--small  btn--tertiary" ', $link );
		}
	}

	return $term_links;

}

// customize breadcrumb howevah
add_filter( 'woocommerce_breadcrumb_defaults', 'rosa_woocommerce_breadcrumbs' );
function rosa_woocommerce_breadcrumbs() {
	return array(
		'delimiter'   => '',
		'wrap_before' => '<nav class="woocommerce-breadcrumb" itemprop="breadcrumb">',
		'wrap_after'  => '</nav>',
		'before'      => '',
		'after'       => '',
		'home'        => _x( 'Shop', 'breadcrumb', 'rosa' )
	);
}

// change the "Home" url into the shop's one
add_filter( 'woocommerce_breadcrumb_home_url', 'rosa_custom_breadrumb_home_url' );
function rosa_custom_breadrumb_home_url() {
	$shop_page_url = get_permalink( wc_get_page_id( 'shop' ) );
	if ( ! empty( $shop_page_url ) ) {
		return $shop_page_url;
	}

	return get_home_url();
}

// move the breadcrumb before title
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_breadcrumb', 3, 0 );


/**
 * Custom Add To Cart Messages
 * Add this to your theme functions.php file
 **/
add_filter( 'wc_add_to_cart_params', 'custom_add_to_cart_message' );
function custom_add_to_cart_message( $params ) {
	$params['i18n_view_cart'] = __( 'Product Added', 'rosa' );

	return $params;
}

remove_filter( 'woocommerce_cart_collaterals', 'woocommerce_cross_sell_display' );
add_filter( 'woocommerce_cart_collaterals', 'woocommerce_cross_sell_display', 15 );