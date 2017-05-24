<?php
/**
 * Gridable Compatibility File.
 *
 * @link https://wordpress.org/plugins/gridable/
 *
 * @package Rosa
 * @since Rosa 1.0
 */

// we don't need the gridable style since rosa has a similar grid system
add_filter( 'gridable_load_public_style', '__return_false' );

/**
 * Setup Gridable Row Classes
 *
 * @param array $classes
 * @param int $cols_nr
 * @param array $atts
 * @param string $content
 *
 * @return array
 */
function rosa_gridable_row_class( $classes, $cols_nr, $atts, $content ) {
	if ( ! empty( $atts['class'] ) ) {
		$classes[] =  $atts['class'];
	}

	// remove the default gridable classes
	unset( $classes[0] );
	unset( $classes[1] );

	$classes[] = 'pixcode  pixcode--grid  grid';

	return $classes;
}
add_filter( 'gridable_row_class',  'rosa_gridable_row_class', 10, 4 );

/**
 * Gridable Column Attributes
 *
 * @param array $options
 *
 * @return array
 */
function rosa_gridable_column_options( $options ) {
	$options['column_style'] = array(
		'label'   => esc_html__( 'Column Style', 'rosa' ),
		'type'    => 'select',
		'options' => array(
			'simple' => esc_html__( 'Simple', 'rosa' ),
			'island' => esc_html__( 'Island', 'rosa' ),
			'promo-box' => esc_html__( 'Feature Box', 'rosa' ),
		),
		'default' => 'classic'
	);

	$options['class'] = array(
		'label'   => esc_html__( 'CSS Class', 'rosa' ),
		'type'    => 'text',
		'default' => ''
	);

	return $options;
}
add_filter( 'gridable_column_options', 'rosa_gridable_column_options', 10, 1 );

/**
 * Gridable Column Classes
 *
 * @param array $classes
 * @param int $size
 * @param array $atts
 * @param string $content
 *
 * @return array
 */
function rosa_gridable_column_class( $classes, $size, $atts, $content ) {
	if ( ! empty( $atts['class'] ) ) {
		$classes[] =  $atts['class'];
	}

	if ( ! empty( $atts['column_style'] ) && $atts['column_style'] !== 'promo-box' ) {
		$classes[] = $atts['column_style'];
	}

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

	$classes[] = 'grid__item ' . $ratios[ $size ] . ' palm-one-whole';

	// remove the default gridable classes
	unset( $classes[0] );
	unset( $classes[1] );

	return $classes;
}
add_filter( 'gridable_column_class',  'rosa_gridable_column_class', 10, 4 );

/**
 * Gridable Column Content Filter
 * We need to wrap up the content inside a promo-box container if the class exists or the option is enabled
 *
 * @param array $atts
 */
function rosa_gridable_column_wrapper_start( $content, $atts ) {
	if ( ( ! empty( $atts['column_style'] ) && $atts['column_style'] === 'promo-box' )
	     || ( ! empty( $atts['class'] ) && strpos( $atts['class'], 'promo-box' ) !== false ) ) {
		$content = '<div class="promo-box__container">' . $content . '</div>';
	}
	
	return $content;
}
add_filter( 'gridable_the_column_content', 'rosa_gridable_column_wrapper_start', 10, 2 );