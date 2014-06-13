<?php
/**
 * Content wrappers
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

    if( is_shop() || is_cart() || is_checkout() || is_checkout_pay_page() || is_account_page() || is_order_received_page() ) {
	    get_template_part('templates/page/header');
    }

    ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class( "article--page  article--main" ); ?>>
            <section class="article__content">
                <div class="container">
                    <?php if(is_product()) echo '<hr />'; ?>
                    <section class="page__content  js-post-gallery  cf">


<?php
	if( is_shop() || is_cart() || is_checkout() || is_checkout_pay_page() || is_account_page() || is_order_received_page() ) {
		wp_reset_postdata();
	}
