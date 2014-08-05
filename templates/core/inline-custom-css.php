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
	/* Titles classes here */
	h1, h2, h3, h4, h5, h6, hgroup,
	h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,
	blockquote,
	.tabs__nav, .popular-posts__time,
	.pagination li a, .pagination li span{
	<?php wpgrade::display_font_params( $fonts['google_titles_font'] ); ?>
	}

<?php
}

if ( isset( $fonts['google_subtitles_font'] ) ) { ?>
	/* Subtitles classes here */
	.headline__secondary {
	<?php wpgrade::display_font_params( $fonts['google_subtitles_font'] ); ?>
	}

<?php
}

if ( isset( $fonts['google_nav_font'] ) ) { ?>
	/* Nav classes here */
	.navigation a {
	<?php wpgrade::display_font_params( $fonts['google_nav_font'] ); ?>
	}

<?php
}

if ( isset( $fonts['google_body_font'] ) ) {
	// this needs a default
	$font_size = '14px'; ?>
	/* Body classes here */
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

//handle the complicated logic of the footer waves that keeps changing color
$footer_sidebar_style    = wpgrade::option( 'footer_sidebar_style' );
$waves_fill_color = '#121212';
switch ($footer_sidebar_style) {
	case 'light' :
		$waves_fill_color = '#ffffff';
		break;
	case 'dark' :
		$waves_fill_color = '#121212';
		break;
	case 'accent' :
		$waves_fill_color = '#'.wpgrade::option('main-color');
		break;

}
?>
.site-footer.border-waves:before {
	background-image: url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 19 14' width='19' height='14' enable-background='new 0 0 19 14' xml:space='preserve' preserveAspectRatio='none slice'><g><path fill='<?php echo $waves_fill_color ?>' d='M0,0c4,0,6.5,5.9,9.5,5.9S15,0,19,0v7H0V0z'/><path fill='<?php echo $waves_fill_color ?>' d='M19,14c-4,0-6.5-5.9-9.5-5.9S4,14,0,14l0-7h19V14z'/></g></svg>");
}
<?php


if (wpgrade::option('custom_css')) {
	echo wpgrade::option( 'custom_css' );
}
