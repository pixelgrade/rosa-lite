<?php

// ensure EXT is defined
if ( ! defined( 'EXT' ) ) {
	define( 'EXT', '.php' );
}

#
# See: wpgrade-config.php -> include-paths for additional theme specific
# function and class includes
#

// ensure REQUEST_PROTOCOL is defined
if ( ! defined('REQUEST_PROTOCOL')) {
	if (is_ssl()) {
		define( 'REQUEST_PROTOCOL', 'https:' );
	} else {
		define( 'REQUEST_PROTOCOL', 'http:' );
	}
}

// Loads the theme's translated strings
load_theme_textdomain( 'rosa_txtd', get_template_directory() . '/languages' );

// Theme specific settings
// -----------------------

// add theme support for post formats
// child themes note: use the after_setup_theme hook with a callback
// right now no post formats
//$formats = array( 'video', 'audio', 'gallery', 'image', 'quote', 'link', 'chat', 'aside', );
//add_theme_support( 'post-formats', $formats );

// Initialize system core
// ----------------------

require_once 'wpgrade-core/bootstrap' . EXT;

#
# Please perform any initialization via options in wpgrade-config and
# calls in wpgrade-core/bootstrap. Required for testing.
#

if ( ! function_exists('add_customify_rosa_options') ) {

	function add_customify_rosa_options( $config ) {

		$config['opt-name'] = 'rosa_options';

		$config['sections'] = array(
			/**
			 * COLORS - This section will handle different elements colors (eg. links, headings)
			 */
			'colors_section' => array(
				'title'    => __( 'Colors', 'customify_txtd' ),
				'description'            => __( 'Using the color pickers you can change the colors of the most important elements. If you want to override the color of some elements you can always use Custom CSS code in Theme Options - Custom Code.', 'rosa_txtd' ),
				'options' => array(
					'main_color'   => array(
						'type'      => 'color',
						'label'     => __( 'Accent Color', 'rosa_txtd' ),
						//'desc'   => __( 'Use the color picker to change the main color of the site to match your brand color.', 'rosa_txtd' ),
						'live' => true,
						'default'   => '#c59d5f',
						'css'  => array(
							array(
								'property'     => 'color',
								'selector' => 'a, a:hover, .nav--main a:hover, .headline__secondary, .separator--line-flower,
										.tabs__nav a.current, .tabs__nav a:hover, .btn.btn--text, .btn--text.comments_add-comment,
										.comments_add-comment.read-more-button, .form-submit .btn--text#comment-submit,
										.form-submit #comment-submit.read-more-button, .btn--text.wpcf7-form-control.wpcf7-submit,
										.wpcf7-form-control.wpcf7-submit.read-more-button, .btn--text.otreservations-submit,
										.otreservations-submit.read-more-button, .widget_tag_cloud a.btn--text, .widget_tag_cloud a.read-more-button, .btn.read-more-button,
										a:hover > .pixcode--icon, .widget a:hover, blockquote, .meta-list a.btn:hover,
										.meta-list a.comments_add-comment:hover, .meta-list .form-submit a#comment-submit:hover,
										.form-submit .meta-list a#comment-submit:hover, .meta-list a.wpcf7-form-control.wpcf7-submit:hover,
										.meta-list a.otreservations-submit:hover, .meta-list .widget_tag_cloud a:hover, .widget_tag_cloud .meta-list a:hover, .btn.btn--text:hover,
										.article__content a:not([class]), .article__content a:hover:not([class]):hover,
										.article__header .article__headline .headline__description .star, .read-more-button, .read-more-button:hover, .shop-categories a.active,
										body.woocommerce ul.products li.product .product__button, body.woocommerce ul.products li.product .added_to_cart,
										body.woocommerce ul.products li.product a.added_to_cart, body.woocommerce ul.products li.product .price ins,
										.single-product .entry-summary .price span, body.woocommerce .star-rating span:before, .comment-reply-link',
							),
							array(
								'property'     => 'background-color',
								'selector' => '.btn--primary, .shop-menu-item .shop-items-number, .comments_add-comment, .form-submit #comment-submit, .btn:hover, .wpcf7-form-control.wpcf7-submit:hover,
									.pagination li a:hover, form.shipping_calculator button.button:hover, .otreservations-submit:hover, .pixcode--icon.square:hover, .pixcode--icon.circle:hover,
									.sidebar--footer__accent, .copyright-area.copyright-area__accent, .menu-list__item-highlight-title'
							),
							array(
								'property'     => 'background',
								'selector' => 'body.woocommerce button.button.alt:hover, body.woocommerce-page #respond input#submit:hover,
									body.woocommerce div.woocommerce-message .button:hover, td.actions input.button:hover, body.woocommerce-page input.button:hover,
									body.woocommerce-page input.button.alt:hover, a:hover > .pixcode--icon.circle, a:hover > .pixcode--icon.square'
							),
							array(
								'property'     => 'border-color',
								'selector' => '.tabs__nav a.current, .tabs__nav a:hover, .btn.btn--text, .btn--text.comments_add-comment, .comments_add-comment.read-more-button,
									.form-submit .btn--text#comment-submit, .form-submit #comment-submit.read-more-button,
									.btn--text.wpcf7-form-control.wpcf7-submit, .wpcf7-form-control.wpcf7-submit.read-more-button,
									.btn--text.otreservations-submit, .otreservations-submit, .read-more-button,
									.widget_tag_cloud a.btn--text, .widget_tag_cloud a.read-more-button, .btn.read-more-button, blockquote, .article__content a:not([class]), .shop-categories a.active,
									body.woocommerce ul.products li.product .product__button, body.woocommerce ul.products li.product .added_to_cart, .menu-list__item-highlight-wrapper:before'
							),
							array(
								'property'     => 'outline-color',
								'selector' => 'select:focus, textarea:focus, input[type="text"]:focus,
									input[type="password"]:focus, input[type="datetime"]:focus,
									input[type="datetime-local"]:focus, input[type="date"]:focus,
									input[type="month"]:focus, input[type="time"]:focus, input[type="week"]:focus,
									input[type="number"]:focus, input[type="email"]:focus, input[type="url"]:focus,
									input[type="search"]:focus, input[type="tel"]:focus, input[type="color"]:focus, .form-control:focus'
							),
							array(
								'property'     => 'fill',
								'selector' => '.copyright-area.copyright-area__accent svg path'
							)
						)
					),
					'text_color' => array(
						'type'      => 'color',
						'label'     => __( 'Text Color', 'customify_txtd' ),
						'live' => true,
						'default'   => '#515150',
						'css'  => array(
							array(
								'property'     => 'color',
								'selector' => 'body, .up-link'
							),
							array(
								'property'     => 'border-color',
								'selector' => '.up-link:before'
							)
						)
					),
					'headings_color'     => array(
						'type'      => 'color',
						'label'     => __( 'Headings Color', 'customify_txtd' ),
						'live' => true,
						'default'   => '#262526',
						'css'  => array(
							array(
								'property'     => 'color',
								'selector' => 'h1, h2, h3, h4, h5, h6, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, .article-archive .article__title a, .article-archive .article__title a:hover',
							)
						)
					),
					'cover_text'     => array(
						'type'      => 'color',
						'label'     => __( 'Cover Color', 'customify_txtd' ),
						'live' => true,
						'default'   => '#ffffff',
						'css'  => array(
							array(
								'property'     => 'color',
								'selector' => '.article__header .article__headline .headline__primary,
									.article__header .article__headline .headline__description *',
							)
						)
					)
				)
			),

			/**
			 * BACKGROUNDS - This section will handle different elements colors (eg. links, headings)
			 */
			'backgrounds_section' => array(
				'title'    => __( 'Backgrounds', 'customify_txtd' ),
				'options' => array(
					'header_background_color'   => array(
						'type'      => 'color',
						'label'     => __( 'Header Color', 'customify_txtd' ),
						'live' => true,
						'default'   => '#ffffff',
						'css'  => array(
							array(
								'property'     => 'background-color',
								'selector' => '.site-header, .site-header.headroom--not-top, .sub-menu, .headroom--not-top .sub-menu',
							)
						)
					),
					'header_image_pattern'   => array(
						'type'      => 'custom_background',
						'label'     => __( 'Header Background', 'customify_txtd' ),
						'desc'         => __( 'Container background with image.', 'rosa_txtd' ),
					),
					'content_background_color'   => array(
						'type'      => 'color',
						'label'     => __( 'Content Color', 'customify_txtd' ),
						'live' => true,
						'default'   => '#ffffff',
						'css'  => array(
							array(
								'property'     => 'background-color',
								'selector' => '.page .article__content, .up-link, html, .menu-list__item-title .item_title, .menu-list__item-price, .desc__content',
							)
						)
					),

					'container_image_pattern'   => array(
						'type'      => 'custom_background',
						'label'     => __( 'Header Background', 'customify_txtd' ),
						'desc'         => __( 'Container background with image.', 'rosa_txtd' ),
					),

					'footer_sidebar_style' => array(
						'type'          => 'select',
						'label'         => __( 'Footer Widget Area Style', 'rosa_txtd' ),
						'display_value' => 'text',
						'class'         => 'small-text',
						'choices'       => array(
							'light'  => 'Light',
							'dark'   => 'Dark',
							'accent' => 'Accent Color',
						),
						'default'       => 'dark',
					),
					'footer_bottombar_style' => array(
						'type'          => 'select',
						'label'         => __( 'Footer Bottom Bar Style', 'rosa_txtd' ),
						'choices'       => array(
							'light'  => 'Light',
							'dark'   => 'Dark',
							'accent' => 'Accent Color',
						),
						'default'       => 'dark',
					),

				)
			),

			/**
			 * FONTS - This section will handle different elements fonts (eg. headings, body)
			 */
			'typography_section' => array(
				'title'    => __( 'Typography', 'customify_txtd' ),
				'options' => array(
					'use_google_fonts' => array(
						'type' => 'checkbox',
						'label'    => __( 'Do you need custom web fonts?', 'customify_txtd' ),
						'default'  => '1',
					),
					'google_titles_font' => array(
						'type'     => 'typography',
						'label'    => __( 'Headings', 'customify_txtd' ),
						'desc'       => __( 'Font for titles and headings.', 'rosa_txtd' ),
						'default'  => 'Source Sans Pro',
//						'selector' => '.site-title a, h1, h2, h3, h4, h5, h6,
//										h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,
//										.widget-title',
//						'font_weight' => true,
						'subsets' => true,
					),
					'google_subtitles_font'     => array(
						'type'    => 'typography',
						'label'   => __( 'Sub Headings', 'customify_txtd' ),
						'desc'       => __( 'Font for titles and headings.', 'rosa_txtd' ),
						'default' => 'Herr Von Muellerhoff',
//						'selector' => 'html body',
//						'load_all_weights' => true,
					),
					'subheadings_bottom-spacing' => array(
						'type' => 'range',
						'label' => __( 'Bottom Spacing', 'rosa_txtd' ),
						'live' => true,
						'default'       => '-38',
						'input_attrs' => array(
							'min'   => -90,
							'max'   => 48,
							'step'  => 1,
							'data-preview' => true
						),
						'css' => array(
							array(
								'property' => 'margin-bottom',
								'selector' => '.headline__secondary',
								'unit' => 'px',
							)
						)
					)
				)
			),


			/**
			 * LAYOUTS - This section will handle different elements colors (eg. links, headings)
			 */
			'layout_options' => array(
				'title'    => __( 'Layout', 'customify_txtd' ),
				'options' => array(
					'site_title_size' => array(
						'type'  => 'range',
						'label' => 'Site Title Size',
						'live' => true,
						'input_attrs' => array(
							'min'   => 24,
							'max'   => 100,
							'step'  => 1,
							'data-preview' => true
						),
						'default' => 24,
						'css' => array(
							array(
								'property' => 'font-size',
								'selector' => '.site-title',
								'media' => 'screen and (min-width: 1000px)',
								'unit' => 'px',
							)
						)
					),
					'page_content_spacing' => array(
						'type'  => 'range',
						'label' => 'Page Content Spacing',
						'live' => true,
						'input_attrs' => array(
							'min'   => 0,
							'max'   => 100,
							'step'  => 1,
						),
						'default' => 18,
						'css' => array(
							array(
								'property' => 'padding',
								'selector' => '.site-content',
								'media' => 'screen and (min-width: 1000px)',
								'unit' => 'px',
							)
						)
					)
				)
			)
		);

		/**
		 * A self explanatory example of panels **
		 **/
		//		$config['panels'] = array(
		//			'panel_id' => array(
		//				'title'    => __( 'Panel Title', 'customify_txtd' ),
		//				'sections' => array(
		//					'panel_section' => array(
		//						'title'    => __( 'Section Title', 'customify_txtd' ),
		//						'options' => array(
		//							'setting_id'   => array(
		//								'type'      => 'color',
		//								'label'     => __( 'Label', 'customify_txtd' ),
		//								'live' => true, // or false
		//								'default'   => '#6c6e70',
		//								'css'  => array(
		//									array(
		//										'property'     => 'color',
		//										'selector' => 'a, .entry-meta a',
		//									),
		//								)
		//							),
		//						)
		//					)
		//				)
		//			)
		//		);

		return $config;
	}
}


add_filter( 'customify_filter_fields', 'add_customify_rosa_options', 11 );