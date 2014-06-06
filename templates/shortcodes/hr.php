<?php
if (empty( $type )) $type = '';

// get needed classes
$classes = 'pixcode  pixcode--separator  separator';
$classes .= ! empty( $type ) ? ' separator--' . $type : '';
$classes .= ! empty( $color ) ? ' separator_color--' . $color : '';

// create class attribute
$classes = 'class="' . trim( $classes ) . '"';


if ( $type == 'line-flower' ) {
	echo '<div ' . $classes . '>' . PHP_EOL .
            '<div class="line  line--left"></div>' . PHP_EOL .
            '<div class="line  line--right"></div>' . PHP_EOL .
            '<div class="star">&#10043;</div>' . PHP_EOL .
            '<div class="arrows">' . PHP_EOL .
                '<div class="arrow arrow--left"></div>' . PHP_EOL .
                '<div class="arrow arrow--right"></div>' . PHP_EOL .
            '</div>' . PHP_EOL .
        '</div>' . PHP_EOL ;
} elseif ( $type == 'flower' ) {
	echo '<div ' . $classes . '>&#10043;</div>' . PHP_EOL ;
} else {
	echo '<hr ' . $classes . '/>' . PHP_EOL ;
}
