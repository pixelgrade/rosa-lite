<?php
/**
 * This is a PixCodes template that overwrites the one in the plugin.
 *
 * The plugin is responsible for putting all the needed variables in the scope of this file.
 *
 * @link https://wordpress.org/plugins/pixcodes/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( empty( $type ) ) {
	$type = ''; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
}

// Get the needed classes
$classes = 'pixcode  pixcode--separator  separator';
$classes .= ! empty( $type ) ? ' separator--' . $type : '';
$classes .= ! empty( $color ) ? ' separator_color--' . $color : '';

// Create the class attribute
$classes = 'class="' . esc_attr( trim( $classes ) ) . '"';

if ( $type == 'line-flower' ) {
	// phpcs:ignore
	echo '<div ' . $classes . '>' . "\n" .
	     '<div class="line  line--left"></div>' . "\n" .
	     '<div class="line  line--right"></div>' . "\n" .
	     '<div class="star">&#10043;</div>' . "\n" .
	     '<div class="arrows">' . "\n" .
	     '<div class="arrow arrow--left"></div>' . "\n" .
	     '<div class="arrow arrow--right"></div>' . "\n" .
	     '</div>' . "\n" .
	     '</div>' . "\n";
} elseif ( $type == 'flower' ) {
	echo '<div ' . $classes . '>&#10043;</div>' . "\n"; // phpcs:ignore
} else {
	echo '<hr ' . $classes . '/>' . "\n"; // phpcs:ignore
}
