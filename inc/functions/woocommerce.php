<?php
/* This snippet removes the action that inserts thumbnails to products in teh loop
* and re-adds the function customized with our wrapper in it.
* It applies to all archives with products.
*
* @original plugin: WooCommerce
* @author of snippet: Brian Krogsard
*/

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