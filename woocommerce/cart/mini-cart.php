<?php
/**
 * Mini-cart
 *
 * Contains the markup for the mini-cart, used by the cart widget.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/mini-cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 3.1.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<?php do_action( 'woocommerce_before_mini_cart' ); ?>

<?php //if ( sizeof( WC()->cart->get_cart() ) > 0 ) : ?>

    <a class="cart-icon-link" href="<?php echo esc_url( wc_get_cart_url() ); ?>">
        <i class="icon-shopping-cart"></i>
        <span class="shop-items-number"><?php echo sprintf(_n('%d', WC()->cart->cart_contents_count, 'woocommerce'), WC()->cart->cart_contents_count);?></span>
    </a>
    <?php do_action( 'woocommerce_widget_shopping_cart_before_buttons' ); ?>
    <ul class="sub-menu">
        <li><span class="shop-menu-item__price"><?php echo WC()->cart->get_cart_total(); ?></span></li>
        <li><a href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php _e('View Cart', 'woocommerce' ) ?></a></li>
        <li><a href="<?php echo esc_url( wc_get_checkout_url() ); ?>"><?php _e('Checkout', 'woocommerce' ) ?></a></li>
    </ul>

<?php //endif; ?>

<?php do_action( 'woocommerce_after_mini_cart' ); ?>