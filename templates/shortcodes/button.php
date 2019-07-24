<?php
/**
 * This is a PixCodes template that overwrites the one in the plugin.
 *
 * The plugin is responsible for putting all the needed variables in the scope of this file.
 *
 * @link https://wordpress.org/plugins/pixcodes/
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

// create id attribute
$id = ! empty( $id ) ? 'id="' . esc_attr( $id ) . '"' : ''; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited

// get needed classes
$classes = 'pixcode  pixcode--btn  btn';
$classes .= ! empty( $size ) ? '  btn--' . $size : '';
$classes .= ! empty( $type ) ? '  btn--' . $type : '';
$classes .= ! empty( $class ) ? '  ' . $class : '';
// create class attribute
$classes = $classes !== '' ? 'class="' . esc_attr( $classes ) . '"' : '';

// create href attribute
$href = ! empty( $link ) ? 'href="' . esc_url( $link ) . '"' : '';

// get content
$content = ! empty( $content ) ? $this->get_clean_content( $content ) : '';

// get target
$target = ! empty( $newtab ) ? 'target="_blank"' : '';

echo '<a ' . $id . ' ' . $classes . ' ' . $href . ' ' . $target . '>' . $content . '</a>'; // phpcs:ignore
