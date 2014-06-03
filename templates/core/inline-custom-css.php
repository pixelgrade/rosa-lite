<?php
/**
 * Generate all the css declared in customizer's config
 */


/* @var string $main_color */
/* @var array  $fonts */
/* @var string $rgb */

$main_color = wpgrade::option('main_color');


$rgb = implode(',', wpgrade::hex2rgb_array($main_color));
$fonts = array();

if (wpgrade::option('use_google_fonts')) {
	$fonts_array = array
	(
		'google_titles_font',
		'google_subtitles_font',
		'google_nav_font',
		'google_body_font'
	);

	foreach ($fonts_array as $font) {
		$the_font = wpgrade::get_the_typo($font);
		if ( isset($the_font['font-family'] ) && ! empty($the_font['font-family'])) {
			$fonts[$font] = $the_font;
		}
	}
}


$redux_sections =  wpgrade::get_redux_sections();

foreach ( $redux_sections as $key => $section ){

	if ( isset( $section['fields'] ) ) {

		foreach ($section['fields'] as $i => $field) {

			if ( isset($field['customizer']) && isset($field['customizer']['css_rules']) ) {

				foreach ( $field['customizer']['css_rules'] as $key => $rule) {

					//rebuild the option value for each rule
					$option_value = wpgrade::option( $field['id']);

					// @TODO  make from this a method used also in customizer
					wpgrade::display_dynamic_css_rule( $rule, $key, $option_value );
				}
			}
		}
	}
}
