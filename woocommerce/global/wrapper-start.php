<?php
/**
 * Content wrappers
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

    $shop_page_id = wc_get_page_id( 'shop' );

    if(!empty($shop_page_id) && $shop_page_id != 0){
        global $post;
        $post = get_post($shop_page_id);

        setup_postdata($post);?>

        <?php

        get_template_part( 'templates/page/header' ); ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class( "article--page  article--main" ); ?>>
            <section class="article__content">
                <div class="container">
                    <section class="page__content  js-post-gallery  cf">

        <?php

        wp_reset_postdata();
    }

?>