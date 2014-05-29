<?php

// get needed classes
$classes = 'pixcode  pixcode--separator  separator';
$classes .= ! empty( $style ) ? ' separator--' . $style : '';
$classes .= ! empty( $color ) ? ' separator_color--' . $color : '';

// create class attribute
$classes = 'class="' . trim( $classes ) . '"';

if ( $style == 'line-flower' ) {
	echo '<span ' . $classes . '>&#10043;<span class="arrows"></span></span>';
} elseif ($style == 'flower') {
	echo '<span ' . $classes . '>&#10043;</span>';
} else {
	echo '<hr ' . $classes . '/>';
}
