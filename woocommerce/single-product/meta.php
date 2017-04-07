<?php
/**
 * Single Product Meta
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/meta.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

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

		<span class="sku_wrapper"><?php _e( 'SKU:', 'rosa' ); ?> <span class="sku" itemprop="sku"><?php echo ( $sku = $product->get_sku() ) ? $sku : esc_html__( 'N/A', 'rosa' ); ?></span>.</span>

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

		<?php echo wc_get_product_category_list( $product->get_id(), '' ); ?>
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
		<?php echo wc_get_product_tag_list( get_the_ID(), '', '', '' ); ?>
	</div>
	<?php endif; ?>
	<?php do_action( 'woocommerce_product_meta_end' ); ?>
</div>
