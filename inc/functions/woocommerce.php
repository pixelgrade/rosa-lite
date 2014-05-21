<?php
/**
 * Woocommerce support
 * If woocommerce is active and is required woo support then load tehm all
 */

add_theme_support( 'woocommerce' );

if ( !in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) return;

/**
 * Assets
 */
function wpgrade_callback_load_woocommerce_assets(){
	global $woocommerce;
	if ( !wpgrade::option('enable_woocommerce_support', '0') ) return;
	wp_enqueue_style('wpgrade-woocommerce', get_template_directory_uri() . '/assets/css/woocommerce.css', array('woocommerce-general'), wpgrade::cachebust_string(wpgrade::themefilepath('content/css/woocommerce.css')) );
//	wp_enqueue_script('wpgrade-woocommerce', get_template_directory_uri() . '/assets/js/woocommerce.js', array('jquery'), wpgrade::cachebust_string(wpgrade::themefilepath('content/js/woocommerce.js')), true );
}
add_action('wp_enqueue_scripts','wpgrade_callback_load_woocommerce_assets',1);

add_filter('term_links-product_cat', 'wpgrade_filter_product_categories', 10, 1);

function wpgrade_filter_product_categories($term_links){

	if ( !empty($term_links) ) {
		foreach($term_links as &$link){
			$link = str_replace('<a ', '<a class="btn  btn--small  btn--tertiary" ', $link);
		}
	}

	return $term_links;
}

add_filter('term_links-product_tag', 'wpgrade_filter_product_tags', 10, 1);

function wpgrade_filter_product_tags($term_links){

	if ( !empty($term_links) ) {
		foreach($term_links as &$link){
			$link = str_replace('<a ', '<a class="btn  btn--small  btn--tertiary" ', $link);
		}
	}

	return $term_links;

}

// customize breadcrumb howevah
add_filter( 'woocommerce_breadcrumb_defaults', 'wpgrade_woocommerce_breadcrumbs' );
function wpgrade_woocommerce_breadcrumbs() {
	return array(
		'delimiter'   => '',
		'wrap_before' => '<nav class="woocommerce-breadcrumb" itemprop="breadcrumb">',
		'wrap_after'  => '</nav>',
		'before'      => '',
		'after'       => '',
		'home'        => _x( 'Shop', 'breadcrumb', 'woocommerce' )
	);
}

// change the "Home" url into the shop's one
add_filter( 'woocommerce_breadcrumb_home_url', 'wpgrade_custom_breadrumb_home_url' );
function wpgrade_custom_breadrumb_home_url() {
	$shop_page_url = get_permalink( woocommerce_get_page_id( 'shop' ) );
	if ( !empty($shop_page_url) ) {
		return $shop_page_url;
	}
	return get_home_url();
}

// move the breadcrumb before title
remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);
add_action('woocommerce_single_product_summary', 'woocommerce_breadcrumb', 3, 0 );
