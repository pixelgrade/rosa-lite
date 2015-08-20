<?php


if ( ! function_exists('add_customify_rosa_options') ) {

	function add_customify_rosa_options( $config ) {

		$config['opt-name'] = 'rosa_options';

		$config['sections'] = array(
			/**
			 * COLORS - This section will handle different elements colors (eg. links, headings)
			 */
			'colors_section' => array(
				'title'    => __( 'Colors', 'customify_txtd' ),
				'priority' => 1,
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

			'others_section' => array(
				'title'    => __( 'General Options', 'customify_txtd' ),
				'options' => array(
					'border_width' => array(
						'type' => 'range',
						'label'         => __( 'Border Width', 'rosa_txtd' ),
						'live' => true,
						'default'       => '0',
						'input_attrs' => array(
							'min'   => 0,
							'max'   => 72,
							'step'  => 6,
							'data-preview' => true
						),
						'css' => array(
							array(
								'property' => 'border-width',
								'selector' => 'body',
								'unit'     => 'px',
								'media'    => 'screen and (min-width: 900px)'
							),
							array(
								'property' => 'border-top-width',
								'selector' => '.site-header',
								'unit'     => 'px',
								'media'    => 'screen and (min-width: 900px)'
							),
							array(
								'property' => 'border-left-width',
								'selector' => '.site-header',
								'unit'     => 'px',
								'media'    => 'screen and (min-width: 900px)'
							),
							array(
								'property' => 'border-right-width',
								'selector' => '.site-header',
								'unit'     => 'px',
								'media'    => 'screen and (min-width: 900px)'
							),
							array(
								'property' => 'border-bottom-width',
								'selector' => '.site-footer',
								'unit'     => 'px',
								'media'    => 'screen and (min-width: 900px)'
							),

							array(
								'property' => 'margin-right',
								'selector' => '.navigator, .covers',
								'unit'     => 'px',
								'media'    => 'screen and (min-width: 900px)'
							),
							array(
								'property' => 'margin-left',
								'selector' => '.covers',
								'unit'     => 'px',
								'media'    => 'screen and (min-width: 900px)'
							),
						)
					),
					'down_arrow_style' => array(
						'type'          => 'select',
						'label'         => __( 'Scroll Down Arrow Style', 'rosa_txtd' ),
						'choices'       => array(
							'transparent' => 'Transparent',
							'bubble'      => 'Bubble',
						),
						'default'       => 'transparent',
					),

					'slideshow_arrows_style' => array(
						'type'          => 'select',
						'label'         => __( 'Slideshow Arrows Style', 'rosa_txtd' ),
						'desc'    => __( 'Select which type of arrows you want on page headers.', 'rosa_txtd' ),
						'choices'       => array(
							'static' => 'Always Show',
							'hover'  => 'On Hover'
						),
						'default'       => 'static',
					),
				)
			)
		);

		$config['panels'] = array(
			/**
			 * BACKGROUNDS - This section will handle different elements backgrounds
			 */
			'background_panel' => array(
				'title'    => __( 'Backgrounds', 'customify_txtd' ),
				'sections' => array(
					'header_backgrounds_section' => array(
						'title'    => __( 'Header', 'customify_txtd' ),
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
						)
					),
					'content_backgrounds_section' => array(
						'title'    => __( 'Content', 'customify_txtd' ),
						'options' => array(
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
						),
					),
					'footer_backgrounds_section' => array(
						'title'    => __( 'Footer', 'customify_txtd' ),
						'options' => array(
							'footer_sidebar_style' => array(
								'type'          => 'select',
								'label'         => __( 'Footer Widget Area Style', 'rosa_txtd' ),
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
				)
			),

			/**
			 * FONTS - This section will handle different elements fonts (eg. headings, body)
			 */
			'typography_panel' => array(
				'title'    => __( 'Typography', 'customify_txtd' ),
				'sections' => array(

					'headers_typography_section' => array(
						'title'    => __( 'Headings', 'customify_txtd' ),
						'options' => array(
							'google_titles_font' => array(
								'type'     => 'typography',
								'label'    => '',//__( '', 'customify_txtd' ),
								'desc'       => __( 'Font for titles and headings.', 'rosa_txtd' ),
								'default'  => 'Source Sans Pro',
								'recommended' => array(
									'Source Sans Pro',
									'Herr Von Muellerhoff',
									'Cabin',
								),
								'load_all_weights' => true,
								'selector' => 'h1, h2, h3, h4, h5, h6, hgroup, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,
									blockquote, .tabs__nav, .popular-posts__time, .pagination li a, .pagination li span'
							),
							'google_subtitles_font'     => array(
								'type'    => 'typography',
								'label'   => __( 'Sub Headings', 'customify_txtd' ),
								'desc'       => __( 'Font for titles and headings.', 'rosa_txtd' ),
								'default' => 'Herr Von Muellerhoff',
								'recommended' => array(
									'Herr Von Muellerhoff',
									'Source Sans Pro',
									'Cabin',
								),
								'selector' => '.headline__secondary',
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
							),
							'subheadings_first-letter' => array(
								'type' => 'range',
								'label'         => __( 'First Letter Offset', 'rosa_txtd' ),
								'live' => true,
								'default'       => 9,
								'input_attrs' => array(
									'min'   => -48,
									'max'   => 90,
									'step'  => 1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'top',
										'selector' => '.headline__secondary .first-letter',
										'unit' => 'px',
									)
								)
							),
						)
					),

					'nav_typography_section' => array(
						'title'    => __( 'Navigation', 'customify_txtd' ),
						'options' => array(
							'google_nav_font'     => array(
								'type'    => 'typography',
								'label'   => __( 'Navigation', 'customify_txtd' ),
								'desc'       => __( 'Font for the navigation menu.', 'rosa_txtd' ),
								'default' => 'Cabin',
								'recommended' => array(
									'Cabin',
									'Source Sans Pro',
									'Herr Von Muellerhoff',
								),
								'selector' => '.navigation a'
							),
							'nav_font-size' => array(
								'type' => 'range',
								'label'         => __( 'Font Size', 'rosa_txtd' ),
								'live' => true,
								'default'       => 13,
								'input_attrs' => array(
									'min'   => 8,
									'max'   => 30,
									'step'  => 1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'font-size',
										'selector' => '.navigation a',
										'unit' => 'px',
									)
								)
							),
							'nav_letter-spacing' => array(
								'type' => 'range',
								'label'         => __( 'Letter Spacing', 'rosa_txtd' ),
								'live' => true,
								'default'       => 1,
								'input_attrs' => array(
									'min'   => -5,
									'max'   => 20,
									'step'  => 1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'letter-spacing',
										'selector' => '.navigation a',
										'unit' => 'px',
									)
								)
							),
							'nav_text-transform' => array(
								'type'          => 'select',
								'label'         => __( 'Text Transform', 'rosa_txtd' ),
								'choices'       => array(
									'none'       => 'None',
									'capitalize' => 'Capitalize',
									'uppercase'  => 'Uppercase',
									'lowercase'  => 'Lowercase',
								),
								'default'       => 'uppercase',
								'css' => array(
									array(
										'property' => 'text-transform',
										'selector' => '.nav--main > .menu-item > a',
									)
								)
							),
							'nav_text-decoration' => array(
								'type'          => 'select',
								'label'         => __( 'Text Decoration', 'rosa_txtd' ),
								'choices'       => array(
									'none'      => 'None',
									'underline' => 'Underline',
									'overline'  => 'Overline',
								),
								'default'       => 'none',
								'css' => array(
									array(
										'property' => 'text-transform',
										'selector' => '.nav--main > .menu-item > a',
									)
								)
							),
						)
					),

					'content_typography_section' => array(
						'title'    => __( 'Body', 'customify_txtd' ),
						'options' => array(
							'google_body_font'     => array(
								'type'    => 'typography',
								'label'   => __( 'Body', 'customify_txtd' ),
								'desc'       => __( 'Font for content and widget text.', 'rosa_txtd' ),
								'default' => 'Cabin',
								'recommended' => array(
									'Cabin',
									'Source Sans Pro',
									'Herr Von Muellerhoff',
								),
								'selector' => 'html, .wp-caption-text, .small-link,	.post-nav-link__label, .author__social-link,
									.comment__links, .score__desc',
								'load_all_weights' => true,
							),
							'body-font-size' => array(
								'type' => 'range',
								'label'         => __( 'Font Size', 'rosa_txtd' ),
								'live' => true,
								'default'       => 16,
								'input_attrs' => array(
									'min'   => 8,
									'max'   => 72,
									'step'  => 1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'font-size',
										'selector' => 'body',
										'unit' => 'px',
									)
								)
							),
							'body-line-height' => array(
								'type' => 'range',
								'label'         => __( 'Line Height', 'rosa_txtd' ),
								'live' => true,
								'default'       => '1.7',
								'input_attrs' => array(
									'min'   => 0,
									'max'   => 3,
									'step'  => 0.1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'line-height',
										'selector' => 'body',
									)
								)
							),
						)
					),
				)
			),

			'sizes_panel' => array(
				'title'    => __( 'Sizes and Spacing', 'customify_txtd' ),
				'sections' => array(

					'header_sizes_section' => array(
						'title'    => __( 'Header', 'customify_txtd' ),
						'options' => array(

							'header_logo_height' => array(
								'type' => 'range',
								'label'         => __( 'Logo Height', 'rosa_txtd' ),
								'default'       => 90,
								'input_attrs' => array(
									'min'   => 25,
									'max'   => 125,
									'step'  => 1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'max-height',
										'selector' => '.site-title--image img',
										'unit' => 'px'
									),
								)
							),

							'header_vertical_margins' => array(
								'type' => 'range',
								'label'         => __( 'Header Vertical Margins', 'rosa_txtd' ),
								'default'       => 0,
								'input_attrs' => array(
									'min'   => 0,
									'max'   => 100,
									'step'  => 1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'padding-top',
										'selector' => '.site-header',
										'unit' => 'px',
										'media'    => 'screen and (min-width: 900px)'
									),
									array(
										'property' => 'padding-bottom',
										'selector' => '.site-header',
										'unit' => 'px',
										'media'    => 'screen and (min-width: 900px)'
									),

									array(
										'property' => 'margin-top',
										'selector' => '#page',
										'unit' => 'px',
										'media'    => 'screen and (min-width: 900px)'
									),

									array(
										'property' => 'top',
										'selector' => '#page',
										'unit' => 'px',
										'media'    => 'screen and (min-width: 900px)'
									),
								)
							),

							'navigation_menu_items_spacing' => array(
								'type' => 'range',
								'label'         => __( 'Menu Items Spacing', 'rosa_txtd' ),
								'default'       => 24,
								'input_attrs' => array(
									'min'   => 12,
									'max'   => 75,
									'step'  => 1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'padding-left',
										'selector' => '.nav--main > .menu-item > a',
										'unit' => 'px',
										'media'    => 'screen and (min-width: 900px)'
									),
									array(
										'property' => 'padding-right',
										'selector' => '.nav--main > .menu-item > a',
										'unit' => 'px',
										'media'    => 'screen and (min-width: 900px)'
									)
								)
							)
						)
					),

					'content_sizes_section' => array(
						'title'    => __( 'Content', 'customify_txtd' ),
						'options' => array(

							'content_width' => array(
								'type' => 'range',
								'label' => __( 'Site Container Width', 'rosa_txtd' ),
								'desc'      => __( 'Set the width of the container.', 'rosa_txtd' ),
								'live' => true,
								'default'       => 1250,
								'input_attrs' => array(
									'min'   => 600,
									'max'   => 2700,
									'step'  => 1,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'max-width',
										'selector' => '.container, .search__container, .site-header__container, .header--sticky .site-header__container',
										'unit' => 'px',
									)
								)
							),

							'sections_vertical_margins' => array(
								'type' => 'range',
								'label' => __( 'Sections Vertical Margins', 'rosa_txtd' ),
								'live' => true,
								'default'       => 78,
								'input_attrs' => array(
									'min'   => 0,
									'max'   => 120,
									'step'  => 6,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'padding-top',
										'selector' => '.page .type-page .article__content',
										'unit' => 'px',
										'media'    => 'only screen and (min-width: 900px)',
									),
									array(
										'property' => 'padding-bottom',
										'selector' => '.page .type-page .article__content',
										'unit' => 'px',
										'media'    => 'only screen and (min-width: 900px)',
									)
								)
							),

							'sidebar_width' => array(
								'type' => 'range',
								'label' => __( 'Sidebar Width', 'rosa_txtd' ),
								'desc'      => __( 'Set the width of the sidebar.', 'rosa_txtd' ),
								'live' => true,
								'default'       => 300,
								'input_attrs' => array(
									'min'   => 140,
									'max'   => 500,
									'step'  => 10,
									'data-preview' => true
								),
								'css' => array(
									array(
										'property' => 'width',
										'selector' => '.sidebar--main',
										'unit' => 'px',
										'media'    => 'only screen and (min-width: 900px)',
									),
									array(
										'property' => 'right',
										'selector' => '.page-content.has-sidebar:after',
										'unit' => 'px',
										'media'    => 'only screen and (min-width: 900px)',
									),
									array(
										'property' => 'margin-right',
										'selector' => '.page-content.has-sidebar .page-content__wrapper',
										'unit' => 'px',
										'media'    => 'only screen and (min-width: 900px)',
									),
									array( // @TODO make this work with live preview
										'property' => 'margin-right',
										'selector' => '.page-content.has-sidebar',
										'callback_filter' => 'rosa_range_negative_value',
										'unit' => 'px',
										'media'    => 'only screen and (min-width: 900px)',
									),
								)
							),
						)
					),
				)
			)
		);

		return $config;
	}
}
add_filter( 'customify_filter_fields', 'add_customify_rosa_options', 11 );

function rosa_range_negative_value( $value, $selector, $property, $unit ) {

	$output = $selector .'{
		' . $property . ': -' . $value . '' . $unit . ";\n" .
	          "}\n";

	return $output;
}

/**
 * With the new wp 43 version we've made some big changes in customizer, so we really need a first time save
 * for the old options to work in the new customizer
 */
function convert_rosa_for_wp_43_once (){
	if ( ! is_admin() || ! function_exists( 'is_plugin_active' ) || ! is_plugin_active('customify/customify.php') || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
		return;
	}

	$is_not_old = wpgrade::option('converted_to_43');

	$this_wp_version = get_bloginfo('version');
	$this_wp_version = explode( '.', $this_wp_version );
	$is_wp43 = false;
	if ( ! $is_not_old && (int) $this_wp_version[0] >= 4 && (int) $this_wp_version[1] >= 3 ) {
		$is_wp43 = true;
		wpgrade::setoption('converted_to_43', true);
		header( 'Location: '.admin_url().'customize.php?save_customizer_once=true');
		die();
	}
}

add_action('admin_init', 'convert_rosa_for_wp_43_once');