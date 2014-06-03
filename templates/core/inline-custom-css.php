<?php

/**
 * Generate all the css declared in customizer's config
 * ====== DO NOT EDIT BELOW!!! =======
 * If you need to add custom css rules add them above so we can keep track of them
 */

$redux_sections = wpgrade::get_redux_sections();

if ( is_array( $redux_sections ) || is_object( $redux_sections ) ) {
	foreach ( $redux_sections as $key => $section ) {

		if ( isset( $section['fields'] ) ) {

			foreach ( $section['fields'] as $i => $field ) {

				if ( isset( $field['customizer'] ) && isset( $field['customizer']['css_rules'] ) ) {

					foreach ( $field['customizer']['css_rules'] as $key => $rule ) {

						//rebuild the option value for each rule
						$option_value = wpgrade::option( $field['id'] );

						// @TODO  make from this a method used also in customizer
						wpgrade::display_dynamic_css_rule( $rule, $key, $option_value );
					}
				}
			}
		}
	}
}

/**
 *======= TYPOGRAPHY
 */

$fonts = array();

if ( wpgrade::option( 'use_google_fonts' ) ) {
	$fonts_array = array(
		'google_titles_font',
		'google_subtitles_font',
		'google_nav_font',
		'google_body_font'
	);

	foreach ( $fonts_array as $font ) {
		$the_font = wpgrade::get_the_typo( $font );
		if ( isset( $the_font['font-family'] ) && ! empty( $the_font['font-family'] ) ) {
			$fonts[ $font ] = $the_font;
		}
	}
}

if ( isset( $fonts['google_titles_font'] ) ) { ?>
	/* Select classes here */
	h1, h2, h3, h4, h5, h6, hgroup,
	h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,
	blockquote,
	.tabs__nav, .popular-posts__time,
	.pagination li a, .pagination li span{
	<?php wpgrade::display_font_params( $fonts['google_titles_font'] ); ?>
	}

<?php
}

if ( isset( $fonts['google_nav_font'] ) ) { ?>
	/* Select classes here */
	.navigation a{
	<?php wpgrade::display_font_params( $fonts['google_nav_font'] ); ?>
	}

<?php
}

if ( isset( $fonts['google_body_font'] ) ) {
	// this needs a default
	$font_size = '14px'; ?>
	/* Select classes here */
	html, .wp-caption-text, .small-link,
	.post-nav-link__label, .author__social-link,
	.comment__links, .score__desc  {
	<?php wpgrade::display_font_params( $fonts['google_body_font'] ); ?>
	}
	<?php if ( isset( $fonts['google_body_font']['font-size'] ) ) {
		$font_size = $fonts['google_body_font']['font-size'];
		unset( $fonts['google_body_font']['font-size'] ); ?>
		/* Size Classes */
		.article, .single .main, .page .main,
		.comment__content,
		.footer__widget-area  {
		font-size: <?php echo $font_size ?>;
		}

	<?php
	}
}
