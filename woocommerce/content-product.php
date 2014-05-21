<?php
/**
 * The template for displaying product content within loops.
 *
 * Override this template by copying it to yourtheme/woocommerce/content-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $product, $woocommerce_loop;

// Store loop count we're currently on
if ( empty( $woocommerce_loop['loop'] ) )
	$woocommerce_loop['loop'] = 0;

// Store column count for displaying the grid
if ( empty( $woocommerce_loop['columns'] ) )
	$woocommerce_loop['columns'] = apply_filters( 'loop_shop_columns', 4 );

// Ensure visibility
if ( ! $product || ! $product->is_visible() )
	return;

// Increase loop count
$woocommerce_loop['loop']++;

// Extra post classes
$classes = array();
if ( 0 == ( $woocommerce_loop['loop'] - 1 ) % $woocommerce_loop['columns'] || 1 == $woocommerce_loop['columns'] )
	$classes[] = 'first';
if ( 0 == $woocommerce_loop['loop'] % $woocommerce_loop['columns'] )
	$classes[] = 'last';
?>

<article <?php post_class('mosaic__item article-archive  article-archive--masonry '.$classes); ?>>

	<?php do_action( 'woocommerce_before_shop_loop_item' ); ?>

	<header class="article__header">
		<?php
		if (has_post_thumbnail()):
			$image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'small-size');
			$image_ratio = 70; //some default aspect ratio in case something has gone wrong and the image has no dimensions - it happens
			if (isset($image[1]) && isset($image[2]) && $image[1] > 0) {
				$image_ratio = $image[2] * 100/$image[1];
			}
			if (!empty($image[0])) : ?>
				<div class="article__featured-image" style="padding-top: <?php echo $image_ratio; ?>%">
					<a href="<?php the_permalink(); ?>">
						<?php 
						global $product; 
						if ( ! $product->is_in_stock() ):
						?>
							<div class="article__featured-image-meta  is--visible">
								<div class="flexbox">
									<div class="flexbox__item">
										<?php echo apply_filters( 'woocommerce_sale_flash', '<span class="btn  btn--small  btn--secondary">' . __( 'Out of stock', 'woocommerce' ) . '</span>', $post, $product ); ?>
									</div>
								</div>
							</div>								
						<?php endif; ?>
						<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
					</a>
				</div>
			<?php endif;
		endif;?>

		<?php
			/**
			 * woocommerce_before_shop_loop_item_title hook
			 *
			 * @hooked woocommerce_show_product_loop_sale_flash - 10
			 * @hooked woocommerce_template_loop_product_thumbnail - 10
			 */
			//do_action( 'woocommerce_before_shop_loop_item_title' );
			//
		
			if ( $product->is_on_sale() ) :

			echo apply_filters( 'woocommerce_sale_flash', '<span class="btn  btn--small  btn--primary  sale-flash">' . __( 'Sale!', 'woocommerce' ) . '</span>', $post, $product );

			endif;
		?>

		<h4 class="article__title entry-title  article__title--product"><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h4>

		<?php
			/**
			 * woocommerce_after_shop_loop_item_title hook
			 *
			 * @hooked woocommerce_template_loop_rating - 5
			 * @hooked woocommerce_template_loop_price - 10
			 */
			do_action( 'woocommerce_after_shop_loop_item_title' );
		?>

	</header>

	<?php do_action( 'woocommerce_after_shop_loop_item' ); ?>
</article>