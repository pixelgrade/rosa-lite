<?php
if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

if (empty( $type )) $type = '';

// get needed classes
$classes = 'pixcode  pixcode--separator  separator';
$classes .= ! empty( $type ) ? ' separator--' . $type : '';
$classes .= ! empty( $color ) ? ' separator_color--' . $color : '';

// create class attribute
$classes = 'class="' . trim( $classes ) . '"';


if ( $type == 'line-flower' ) {
	echo '<div ' . $classes . '>' . "\n" .
            '<div class="line  line--left"></div>' . "\n" .
            '<div class="line  line--right"></div>' . "\n" .
            '<div class="star">&#10043;</div>' . "\n" .
            '<div class="arrows">' . "\n" .
                '<div class="arrow arrow--left"></div>' . "\n" .
                '<div class="arrow arrow--right"></div>' . "\n" .
            '</div>' . "\n" .
        '</div>' . "\n" ;
} elseif ( $type == 'flower' ) {
	echo '<div ' . $classes . '>&#10043;</div>' . "\n" ;
} else {
	echo '<hr ' . $classes . '/>' . "\n" ;
}
