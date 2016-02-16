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

if ( get_the_terms( $post->ID, 'product_cat' ) !== false ) {
	$cat_count = sizeof( get_the_terms( $post->ID, 'product_cat' ) );
} else {
	$cat_count = 0;
}
if ( get_the_terms( $post->ID, 'product_tag' ) !== false ) {
	$tag_count = sizeof( get_the_terms( $post->ID, 'product_tag' ) );
} else {
	$tag_count = 0;
}
?>
<div class="product_meta">

	<?php do_action( 'woocommerce_product_meta_start' ); ?>

	<?php if ( wc_product_sku_enabled() && ( $product->get_sku() || $product->is_type( 'variable' ) ) ) : ?>

		<span class="sku_wrapper"><?php _e( 'SKU:', 'rosa' ); ?> <span class="sku" itemprop="sku"><?php echo ( $sku = $product->get_sku() ) ? $sku : __( 'N/A', 'rosa' ); ?></span>.</span>

	<?php endif; ?>
	<?php if ( $cat_count > 0 ) : ?>
	<div class="meta--categories btn-list meta-list">
		<span class="btn  btn--small  btn--secondary  list-head">
			<?php
			printf(
				_n( '%s Category', '%s Categories', $cat_count, 'rosa' ),
				$cat_count
			); ?>
		</span>

		<?php echo $product->get_categories( '' ); ?>
	</div>
	<?php endif; ?>
	<?php if ( $tag_count > 0 ) : ?>
	<div class="meta--tags btn-list meta-list">
		<span class="btn  btn--small  btn--secondary  list-head">
			<?php
			printf(
				_n( '%s Tag', '%s Tags', $tag_count, 'rosa' ),
				$tag_count
			); ?>
		</span>
		<?php echo $product->get_tags( '' ); ?>
	</div>
	<?php endif; ?>
	<?php do_action( 'woocommerce_product_meta_end' ); ?>
</div>
