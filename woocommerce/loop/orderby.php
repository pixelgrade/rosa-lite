<?php
/**
 * Show options for ordering
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
global $wp_query;

// get all product categories
$terms = get_terms('product_cat');

// if there is a category queried cache it
$current_term =	get_queried_object();

if ( !empty($terms ) /*&& wpgrade::option('display_product_filters', '0')*/ ) {
    // create a link which should link to the shop
    $all_link = get_post_type_archive_link('product');

    echo '<ul class="shop-categories  pixcode--tabs__nav  tabs__nav  nav  nav-tabs">';
    // display the shop link first if there is one
    if ( !empty($all_link) ) {
        // also if the current_term doesn't have a term_id it means we are quering the shop and the "all categories" should be active
        echo '<li><a href="', $all_link ,'"', ( !isset( $current_term->term_id ) ) ? ' class="active"' : ' class="inactive"' ,'>', __('All Products', wpgrade::textdomain() ) , '</a></li>';
    }

    // display a link for each product category
    foreach ($terms as $key => $term ) {
        $link  = get_term_link( $term, 'product_cat' );
        if ( !is_wp_error($link) ) {

            // if the current category is queried add the "active class" to the link
            $class_string = "";
            if ( !empty($current_term->name) && $current_term->name === $term->name ) {
                $class_string = ' class="active"';
            } else $class_string = ' class="inactive"';

            echo '<li><a href="', $link, '"', $class_string,'>', $term->name ,'</a></li>';
        }
    }
    echo '</ul>';
} // close if !empty($terms)

// for the moment we do not need an order selector
return;

global $woocommerce, $wp_query;

if ( 1 == $wp_query->found_posts || ! woocommerce_products_will_display() )
    return;
?>
<form class="woocommerce-ordering" method="get">
    <select name="orderby" class="orderby">
        <?php
        $catalog_orderby = apply_filters( 'woocommerce_catalog_orderby', array(
            'menu_order' => __( 'Default sorting', 'woocommerce' ),
            'popularity' => __( 'Sort by popularity', 'woocommerce' ),
            'rating'     => __( 'Sort by average rating', 'woocommerce' ),
            'date'       => __( 'Sort by newness', 'woocommerce' ),
            'price'      => __( 'Sort by price: low to high', 'woocommerce' ),
            'price-desc' => __( 'Sort by price: high to low', 'woocommerce' )
        ) );

        if ( get_option( 'woocommerce_enable_review_rating' ) === 'no' )
            unset( $catalog_orderby['rating'] );

        foreach ( $catalog_orderby as $id => $name )
            echo '<option value="' . esc_attr( $id ) . '" ' . selected( $orderby, $id, false ) . '>' . esc_attr( $name ) . '</option>';
        ?>
    </select>
    <?php
    // Keep query string vars intact
    foreach ( $_GET as $key => $val ) {
        if ( 'orderby' === $key || 'submit' === $key )
            continue;

        if ( is_array( $val ) ) {
            foreach( $val as $innerVal ) {
                echo '<input type="hidden" name="' . esc_attr( $key ) . '[]" value="' . esc_attr( $innerVal ) . '" />';
            }

        } else {
            echo '<input type="hidden" name="' . esc_attr( $key ) . '" value="' . esc_attr( $val ) . '" />';
        }
    }
    ?>
</form>
<br/>
