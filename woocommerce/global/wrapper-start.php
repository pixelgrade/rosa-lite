<?php
/**
 * Content wrappers
 *
 * @author        WooThemes
 * @package    WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

if ( is_shop() || is_cart() || is_checkout() || is_checkout_pay_page() || is_account_page() || is_order_received_page() ) {
	get_template_part( 'templates/page/header' );
}

$classes = "article--page  article--main";

$border_style = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_border_style', true );
if ( ! empty( $border_style ) ) {
	$classes .= ' border-' . $border_style;
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>
	<section class="article__content">
	<div class="container">
<?php if ( is_product() ) {
	echo '<hr />';
} ?>
	<section class="page__content  js-post-gallery  cf">

<?php
	if ( is_shop() || is_cart() || is_checkout() || is_checkout_pay_page() || is_account_page() || is_order_received_page() ) {
		wp_reset_postdata();
	}
