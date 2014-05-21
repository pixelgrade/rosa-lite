<?php
/**
 * Single Product Meta
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $post, $product;

$cat_count = sizeof( get_the_terms( $post->ID, 'product_cat' ) );
$tag_count = sizeof( get_the_terms( $post->ID, 'product_tag' ) );
?>
<div class="product_meta">

	<?php do_action( 'woocommerce_product_meta_start' ); ?>

	<?php if ( wc_product_sku_enabled() && ( $product->get_sku() || $product->is_type( 'variable' ) ) ) : ?>

		<span class="sku_wrapper"><?php _e( 'SKU:', 'woocommerce' ); ?> <span class="sku" itemprop="sku"><?php echo ( $sku = $product->get_sku() ) ? $sku : __( 'N/A', 'woocommerce' ); ?></span>.</span>

	<?php endif; ?>

	<div class="meta--categories btn-list  meta-list">
	<?php echo $product->get_categories( '', '<span class="btn  btn--small  btn--secondary  list-head">' . _n( 'Category', 'Categories', $cat_count, 'woocommerce' ) . '</span>', '' ); ?>
	</div>	

	<div class="meta--categories btn-list  meta-list">
	<?php echo $product->get_tags( '', '<span class="btn  btn--small  btn--secondary  list-head">' . _n( 'Tag', 'Tags', $tag_count, 'woocommerce' ) . '</span>', '' ); ?>
	</div>

	<?php do_action( 'woocommerce_product_meta_end' ); ?>

</div>