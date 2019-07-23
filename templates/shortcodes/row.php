<?php
if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

$output = '';
$output .= '<div class="pixcode  pixcode--grid  grid  ';
if($thick_gutter) $output .= 'thick-gutter  ';
$output .= $class . '">' . "\n";
$output .= $this->get_clean_content( $content ) . "\n";
$output .= '</div>' . "\n";
echo $output;
