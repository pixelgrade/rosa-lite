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

$output = '';
$output .= '<div class="pixcode  pixcode--grid  grid  ';
if ( $thick_gutter ) {
	$output .= 'thick-gutter  ';
}
$output .= esc_attr( $class ) . '">' . "\n";
$output .= $this->get_clean_content( $content ) . "\n";
$output .= '</div>' . "\n";
echo $output; // phpcs:ignore
