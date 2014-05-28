<?php
//	/* @var string $main_color */
//	/* @var array  $fonts */
//	/* @var string $rgb */
//
//$main_color = wpgrade::option('main_color');
//
//
//$rgb = implode(',', wpgrade::hex2rgb_array($main_color));
//$fonts = array();
//
//if (wpgrade::option('use_google_fonts')) {
//	$fonts_array = array
//	(
//		'google_titles_font',
//		'google_second_font',
//		'google_nav_font',
//		'google_body_font'
//	);
//
//	foreach ($fonts_array as $font) {
//		$the_font = wpgrade::get_the_typo($font);
//		if ( isset($the_font['font-family'] ) && ! empty($the_font['font-family'])) {
//			$fonts[$font] = $the_font;
//		}
//	}
//}
//
//function hex2rgb($hex) {
//    $hex = str_replace("#", "", $hex);
//
//    if(strlen($hex) == 3) {
//        $r = hexdec(substr($hex,0,1).substr($hex,0,1));
//        $g = hexdec(substr($hex,1,1).substr($hex,1,1));
//        $b = hexdec(substr($hex,2,1).substr($hex,2,1));
//    } else {
//        $r = hexdec(substr($hex,0,2));
//        $g = hexdec(substr($hex,2,2));
//        $b = hexdec(substr($hex,4,2));
//    }
//    $rgb = array($r, $g, $b);
////     return implode(",", $rgb); // returns the rgb values separated by commas
//    return $rgb; // returns an array with the rgb values
//}
//
///**
// * Generate all the css declared in customizer's config
// */
//
//$redux_sections =  wpgrade::get_redux_sections();
//
//foreach ( $redux_sections as $key => $section ){
//
//	if ( isset( $section['fields'] ) ) {
//
//		foreach ($section['fields'] as $i => $field) {
//
//			if ( isset($field['customizer']) && isset($field['customizer']['css_rules']) ) {
//
//				foreach ( $field['customizer']['css_rules'] as $key => $rule) {
//
//					//rebuild the option value for each rule
//					$option_value = wpgrade::option( $field['id']);
//
//					// @TODO  make from this a method used also in customizer
//					wpgrade::display_dynamic_css_rule( $rule, $key, $option_value );
//				}
//			}
//		}
//	}
//}
//
//
//if ( !empty($main_color) ){
//$rgb = implode(",", hex2rgb($main_color)); ?>
<!--@media only screen and (min-width: 900px){-->
<!--    .nav--main li:hover, .nav--main li.current-menu-item {-->
<!--        border-bottom-color: --><?php //echo $main_color; ?><!--;     -->
<!--    }-->
<!--    .back-to-top a:hover:after, .back-to-top a:hover:before {-->
<!--        border-color: --><?php //echo $main_color; ?><!--; -->
<!--    }-->
<!--}-->
<!---->
<!--@media only screen and (min-width: 1201px){-->
<!--    .team-member__profile  {-->
<!--        background: rgba(--><?php //echo $rgb ?><!--, 0.5);-->
<!--    }-->
<!--}-->
<!---->
<!---->
<?php //}
//
///*
//*
//*
//*============ COLORS
//*
//*
// */
//
//// Text color
//
//$text_color = wpgrade::option('text_color'); ?>
<!---->
<!--body{ color: --><?php //echo $text_color; ?><!--; }-->
<!---->
<?php
//
//// Headings color
//
//$headings_color = wpgrade::option('headings_color'); ?>
<!---->
<!--h1,h2,h3,h4,h5,h6{ color: --><?php //echo $headings_color; ?><!--; }-->
<!---->
<!--h1 a, h2 a, h3 a, h4 a, h5 a, h6 a{ color: --><?php //echo $headings_color; ?><!--; }-->
<!---->
<?php
//
//
//
//
//
///*
//*
//*
//*============ BACKGROUNDS
//*
//*
// */
///*
//$site_background_color = wpgrade::option('site_background_color'); ?>
//
//body { background-color: <?php echo $site_background_color; ?>; }
//
//<?php
//
//$content_background_color = wpgrade::option('content_background_color'); ?>
//
//.container { background-color: <?php echo $content_background_color; ?>; }
//
//<?php
//
//$header_background_color = wpgrade::option('header_background_color'); ?>
//
//.site-header { background-color: <?php echo $header_background_color ?>; }
//
//<?php
//
//$navigation_background_color = wpgrade::option('navigation_background_color'); ?>
//
//.navigation--main { background-color: <?php echo $navigation_background_color ?>; }
//
//<?php
//*/
//
//
//
//
///*
//*
//*
//*============ TYPOGRAPHY
//*
//*
// */
//
//if ( isset($fonts['google_titles_font']) ) {?>
<!--    /* Select classes here */-->
<!--    h1, h2, h3, h4, h5, h6, hgroup,-->
<!--    h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,-->
<!--    blockquote,-->
<!--    .tabs__nav, .popular-posts__time,-->
<!--    .pagination li a, .pagination li span{-->
<!--        --><?php //wpgrade::display_font_params($fonts['google_titles_font']); ?>
<!--    }-->
<!---->
<?php //}
//
//if ( isset($fonts['google_nav_font']) ) {?>
<!--    /* Select classes here */-->
<!--    .navigation a{-->
<!--        --><?php //wpgrade::display_font_params($fonts['google_nav_font']); ?>
<!--    }-->
<!---->
<?php //}
//
//if ( isset($fonts['google_body_font']) ) {
//	// this needs a default
//	$font_size = '14px'; ?>
<!--    /* Select classes here */-->
<!--    html, .wp-caption-text, .small-link, -->
<!--    .post-nav-link__label, .author__social-link,-->
<!--    .comment__links, .score__desc  {-->
<!--        --><?php //wpgrade::display_font_params($fonts['google_body_font']); ?>
<!--    }-->
<!-- 	--><?php //if(isset($fonts['google_body_font']['font-size'])) {
//		$font_size = $fonts['google_body_font']['font-size'];
//		unset($fonts['google_body_font']['font-size']);
//	?>
<!--    /* Size Classes */-->
<!--    .article, .single .main, .page .main, -->
<!--    .comment__content,-->
<!--    .footer__widget-area  {-->
<!--        font-size: --><?php //echo $font_size ?><!--;-->
<!--    }-->
<!---->
<?php //}
//}
//
//
//
//
//
///*
//*
//*
//*============ SIZES AND SPACINGS
//*
//*
// */
//
//// Content width
//
//$content_width = intval(wpgrade::option('content_width', 1368)); ?>
<!---->
<!--    .container{-->
<!--        max-width: --><?php //echo $content_width; ?><!--px;-->
<!--    }-->
<!---->
<!--    .search__container{-->
<!--        max-width: --><?php //echo $content_width; ?><!--px;-->
<!--    }-->
<!---->
<?php
//
//// Content horizontal margins
//
//$content_horizontal_margins = intval(wpgrade::option('content_horizontal_margins', 96)); ?>
<!---->
<?php
//
//// Site vertical margins
//
//// Sidebar width
//
//$sidebar_width = intval(wpgrade::option('sidebar_width', 325));
//$sidebar_width += 25;
//
//?>
<!--  -->
<!-- @media only screen and (min-width: 900px) {-->
<!--   .sidebar--main {-->
<!--        width: --><?php //echo $sidebar_width; ?><!--px;-->
<!--   }-->
<!-- -->
<!--   .page-content.has-sidebar {-->
<!--        margin-right: ---><?php //echo $sidebar_width; ?><!--px;-->
<!--   }-->
<!---->
<!--   .page-content.has-sidebar .page-content__wrapper {-->
<!--        margin-right: --><?php //echo $sidebar_width; ?><!--px;-->
<!--   }-->
<!---->
<!--   .page-content.has-sidebar:after{-->
<!--        right: --><?php //echo $sidebar_width; ?><!--px;-->
<!--   }  -->
<!-- }-->
<!--  -->
<!-- --><?php
//
//
//// Masonry archive column widths
//$masonry_small_width = 100;
//$masonry_medium_width = 50;
//$masonry_big_width = 33.333333;
//
////round to 2 decimals
//$masonry_small_width = round( 100 / (float)wpgrade::option('blog_layout_masonry_small_columns'), 2);
//$masonry_medium_width = round( 100 / (float)wpgrade::option('blog_layout_masonry_medium_columns'), 2);
//$masonry_big_width = round( 100 / (float)wpgrade::option('blog_layout_masonry_big_columns'), 2);
//
//?>
<!---->
<!--@media screen and (min-width: 481px) and (max-width: 899px) {-->
<!--    .mosaic__item  {-->
<!--        width: --><?php //echo $masonry_small_width; ?><!--%;-->
<!--    }-->
<!--}-->
<!---->
<!--@media screen and (min-width: 900px) and (max-width: 1249px) {-->
<!--    .mosaic__item  {-->
<!--        width: --><?php //echo $masonry_medium_width; ?><!--%;-->
<!--    }-->
<!--}-->
<!---->
<!--@media screen and (min-width: 1250px){-->
<!--    .mosaic__item  {-->
<!--        width: --><?php //echo $masonry_big_width; ?><!--%;-->
<!--    }-->
<!--}-->
<!---->
<?php
//
//if (wpgrade::option('custom_css')):
//	echo "\n" . wpgrade::option('custom_css') . "\n";
//endif;
//
