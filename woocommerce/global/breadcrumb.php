<?php
/**
 * Shop breadcrumb
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $post, $wp_query;

$prepend      = '';
$permalinks   = get_option( 'woocommerce_permalinks' );
$shop_page_id = wc_get_page_id( 'shop' );
$shop_page    = get_post( $shop_page_id );

// If permalinks contain the shop page in the URI prepend the breadcrumb with shop
if ( $shop_page_id && $shop_page && strstr( $permalinks['product_base'], '/' . $shop_page->post_name ) && get_option( 'page_on_front' ) !== $shop_page_id ) {
    $prepend = $before . '<a href="' . get_permalink( $shop_page ) . '">' . $shop_page->post_title . '</a> ' . $after . $delimiter;
}

if ( ( ! is_home() && ! is_front_page() && ! ( is_post_type_archive() && get_option( 'page_on_front' ) == wc_get_page_id( 'shop' ) ) ) || is_paged() ) {

    echo $wrap_before;

    if ( is_single() && ! is_attachment() ) {

        if ( get_post_type() == 'product' ) {

            echo $prepend;

            if ( $terms = wc_get_product_terms( $post->ID, 'product_cat', array( 'orderby' => 'parent', 'order' => 'DESC' ) ) ) {

                $main_term = $terms[0];

                $ancestors = get_ancestors( $main_term->term_id, 'product_cat' );

                $ancestors = array_reverse( $ancestors );

                foreach ( $ancestors as $ancestor ) {
                    $ancestor = get_term( $ancestor, 'product_cat' );

                    if ( ! is_wp_error( $ancestor ) && $ancestor )
                        echo $before . '<a href="' . get_term_link( $ancestor->slug, 'product_cat' ) . '">' . $ancestor->name . '</a>' . $after . $delimiter;
                }

                echo $before . '<a href="' . get_term_link( $main_term->slug, 'product_cat' ) . '">' . $main_term->name . '</a>' . $after . $delimiter;

            }

            echo $before . get_the_title() . $after;

        } elseif ( get_post_type() != 'post' ) {

            $post_type = get_post_type_object( get_post_type() );
            $slug = $post_type->rewrite;
            echo $before . '<a href="' . get_post_type_archive_link( get_post_type() ) . '">' . $post_type->labels->singular_name . '</a>' . $after . $delimiter;
            echo $before . get_the_title() . $after;

        } else {

            $cat = current( get_the_category() );
            echo get_category_parents( $cat, true, $delimiter );
            echo $before . get_the_title() . $after;

        }

    } elseif ( is_404() ) {

        echo $before . __( 'Error 404', 'woocommerce' ) . $after;

    } elseif ( ! is_single() && ! is_page() && get_post_type() != 'post' ) {

        $post_type = get_post_type_object( get_post_type() );

        if ( $post_type )
            echo $before . $post_type->labels->singular_name . $after;

    } elseif ( is_attachment() ) {

        $parent = get_post( $post->post_parent );
        $cat = get_the_category( $parent->ID );
        $cat = $cat[0];
        echo get_category_parents( $cat, true, '' . $delimiter );
        echo $before . '<a href="' . get_permalink( $parent ) . '">' . $parent->post_title . '</a>' . $after . $delimiter;
        echo $before . get_the_title() . $after;

    } elseif ( is_page() && !$post->post_parent ) {

        echo $before . get_the_title() . $after;

    } elseif ( is_page() && $post->post_parent ) {

        $parent_id  = $post->post_parent;
        $breadcrumbs = array();

        while ( $parent_id ) {
            $page = get_page( $parent_id );
            $breadcrumbs[] = '<a href="' . get_permalink($page->ID) . '">' . get_the_title( $page->ID ) . '</a>';
            $parent_id  = $page->post_parent;
        }

        $breadcrumbs = array_reverse( $breadcrumbs );

        foreach ( $breadcrumbs as $crumb )
            echo $crumb . '' . $delimiter;

        echo $before . get_the_title() . $after;

    } elseif ( is_search() ) {

        echo $before . __( 'Search results for &ldquo;', 'woocommerce' ) . get_search_query() . '&rdquo;' . $after;

    } elseif ( is_tag() ) {

        echo $before . __( 'Posts tagged &ldquo;', 'woocommerce' ) . single_tag_title('', false) . '&rdquo;' . $after;

    } elseif ( is_author() ) {

        $userdata = get_userdata($author);
        echo $before . __( 'Author:', 'woocommerce' ) . ' ' . $userdata->display_name . $after;

    }

    if ( get_query_var( 'paged' ) )
        echo ' (' . __( 'Page', 'woocommerce' ) . ' ' . get_query_var( 'paged' ) . ')';

    echo $wrap_after;

}