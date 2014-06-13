<?php
/**
 * Product loop sale flash
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

return;

global $post, $product;
?>
<?php if ( $product->is_on_sale() ) :?>

	<?php echo apply_filters( 'woocommerce_sale_flash', '<span class="product__badge on-sale  in">' . __( 'Sale!', 'woocommerce' ) . '</span>', $post, $product ); ?>

<?php elseif( ! $product->is_in_stock() ) :?>

    <?php echo apply_filters( 'woocommerce_sale_flash', '<span class="product__badge">' . __( 'Out of stock', 'woocommerce' ) . '</span>', $post, $product ); ?>

<?php endif; ?>