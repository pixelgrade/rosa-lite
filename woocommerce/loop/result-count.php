<?php
/**
 * Result Count
 *
 * Shows text: Showing x - x of x results
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// get all product categories
$terms = get_terms('product_cat');

// if there is a category queried cache it
$current_term =	get_queried_object();

if ( !empty($terms ) /*&& rosa_option('display_product_filters', '0')*/ ) {
	// create a link which should link to the shop
	$all_link = get_post_type_archive_link('product');

	echo '<ul class="shop-categories  pixcode--tabs__nav  tabs__nav  nav  nav-tabs">';
	// display the shop link first if there is one
	if ( !empty($all_link) ) {
		// also if the current_term doesn't have a term_id it means we are quering the shop and the "all categories" should be active
		echo '<li><a href="', $all_link ,'"', ( !isset( $current_term->term_id ) ) ? ' class="active"' : ' class="inactive"' ,'>', __('All Products', 'rosa' ) , '</a></li>';
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

return;