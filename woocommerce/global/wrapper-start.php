<?php
/**
 * Content wrappers
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/wrapper-start.php.
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
 * @version     3.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

if ( is_shop() || is_cart() || is_checkout() || is_checkout_pay_page() || is_account_page() || is_order_received_page() ) {
	get_template_part( 'template-parts/header', 'page' );
}

$classes = "article--page  article--main";

$border_style = get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_border_style', true );
if ( ! empty( $border_style ) ) {
	$classes .= ' border-' . $border_style;
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>
	<section class="article__content">
		<div class="container">
		<?php if ( is_product() ) {
			echo '<hr class="product-header-separator" />';
		} ?>
		<section class="page__content  js-post-gallery  cf">

		<?php
		if ( is_shop() || is_cart() || is_checkout() || is_checkout_pay_page() || is_account_page() || is_order_received_page() ) {
			wp_reset_postdata();
		}
