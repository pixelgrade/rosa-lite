<?php

// get needed classes
$classes = 'pixcode  pixcode--separator  separator';
$classes .= ! empty( $style ) ? ' separator--' . $style : '';
$classes .= ! empty( $color ) ? ' separator_color--' . $color : '';

// create class attribute
$classes = 'class="' . trim( $classes ) . '"';

if ( $style == 'line-flower' ) {
	echo '<div ' . $classes . '>' .
            '<div class="line  line--left"></div>' .
            '<div class="line  line--right"></div>' .
            '<div class="star">&#10043;</div>' .
            '<div class="arrows">' .
                '<div class="arrow arrow--left"></div>' .
                '<div class="arrow arrow--right"></div>' .
            '</div>' .
        '</div>';
} elseif ( $style == 'flower' ) {
	echo '<div ' . $classes . '>&#10043;</div>';
} else {
	echo '<hr ' . $classes . '/>';
}
