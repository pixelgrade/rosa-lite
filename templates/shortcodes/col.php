<?php
if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

$output = '';
$ratios = array(
	1  => 'one-twelfth',
	2  => 'two-twelfths',
	3  => 'three-twelfths',
	4  => 'four-twelfths',
	5  => 'five-twelfths',
	6  => 'six-twelfths',
	7  => 'seven-twelfths',
	8  => 'eight-twelfths',
	9  => 'nine-twelfths',
	10 => 'ten-twelfths',
	11 => 'eleven-twelfths',
	12 => 'one-whole',
);

$output .= '<div class="grid__item ' . $ratios[ $size ] . ' palm-one-whole ' . $class . '">' . "\n";
if( $class =='promo-box' ) $output .= '<div class="promo-box__container">' . $this->get_clean_content( $content ) . '</div>' . "\n";
else $output .= $this->get_clean_content( $content ) . "\n";
$output .= '</div>' . "\n";
echo $output;
