<?php

define( 'THEME_COLOR_PRIMARY', '#C59D5F' );
define( 'THEME_COLOR_SECONDARY', '#C59D5F' );
define( 'THEME_COLOR_TERTIARY', '#C59D5F' );

define( 'THEME_DARK_PRIMARY', '#252525' );
define( 'THEME_DARK_SECONDARY', '#515151' );
define( 'THEME_DARK_TERTIARY', '#121212' );

define( 'THEME_LIGHT_PRIMARY', '#FFFFFF' );
define( 'THEME_LIGHT_SECONDARY', '#CCCCCC' );
define( 'THEME_LIGHT_TERTIARY', '#EEEEEE' );

if ( ! function_exists( 'add_customify_rosa_options' ) ) {

	function add_customify_rosa_options( $config ) {

		$config['opt-name'] = 'rosa_options';

		$config['panels']['theme_options'] = array(
			'title'    => '&#x1f506; ' . esc_html__( 'Theme Options', 'rosa' ),
			'priority' => 1,
			'sections' => array(
				'general' => array(
					'title'   => esc_html__( 'General', 'rosa' ),
					'options' => array(
						'main_logo_light'          => array(
							'type'  => 'media',
							'label' => esc_html__( 'Logo', 'rosa' ),
						),
						'main_logo_dark'           => array(
							'type'  => 'media',
							'label' => esc_html__( 'Inverted Logo', 'rosa' ),
						),
						'divider_title_5347678321' => array(
							'type' => 'html',
							'html' => '<span class="separator label">' . esc_html__( 'Smooth Scrolling', 'rosa' ) . '</span>'
						),
						'use_smooth_scroll'        => array(
							'type'    => 'checkbox',
							'label'   => esc_html__( 'Enable Smooth Scrolling.', 'rosa' ),
							'default' => 1,
						),
						'divider_title_534793921'  => array(
							'type' => 'html',
							'html' => '<span class="separator label large">' . esc_html__( 'Footer', 'rosa' ) . '</span>'
						),

						'footer_number_of_columns' => array(
							'label'   => esc_html__( 'Widget Area Number of Columns', 'rosa' ),
							'desc'    => esc_html__( 'Select how many number of columns should the Footer widget area have.', 'rosa' ),
							'type'    => 'select',
							'choices' => array(
								'1' => '1',
								'2' => '2',
								'3' => '3',
								'4' => '4',
								'6' => '6',
							),
							'default' => '2'
						),

						'footer_column_width' => array(
							'label'   => esc_html__( 'Widget Column width', 'rosa' ),
							'type'    => 'select',
							'choices' => array(
								'one-third'  => esc_html__( 'One third', 'rosa' ),
								'two-thirds' => esc_html__( 'Two thirds', 'rosa' ),
								'one-whole'  => esc_html__( 'Whole', 'rosa' ),
							),
							'default' => 'one_third',
						),

						'copyright_text' => array(
							'type'              => 'textarea',
							'label'             => esc_html__( 'Copyright Text', 'rosa' ),
							'default'           => __( '%year% &copy; Handcrafted with love by <a href="https://pixelgrade.com" target="_blank">Pixelgrade</a> Team', 'rosa' ),
							'sanitize_callback' => 'wp_kses_post',
							'live'              => array( '.footer-container .copyright-text' )
						),

						'google_maps_api_key' => array(
							'type'    => 'text',
							'label'   => esc_html__( 'Google Maps API key', 'rosa' ),
							'default' => '',
							'desc'    => sprintf(
								'<p>%s.   <a href="https://developers.google.com/maps/documentation/javascript/get-api-key#get-an-api-key" target="_blank">%s</a> <br><br>%s</p>',
								esc_html__( 'To use Google Maps you must authenticate your application with an API key', 'rosa' ),
								esc_html__( 'Optain a key', 'rosa' ),
								esc_html__( 'After you get the key, enable the "Google Maps JavaScript API" from the Overview tab', 'rosa' )
							)
						)
					)
				),

				'share_settings' => array(
					'title'   => __( 'Sharing', 'rosa' ),
					'options' => array(
						'share_buttons_settings'        => array(
							'type'    => 'textarea',
							'label'   => esc_html__( 'Share Services', 'rosa' ),
							'default' => 'more,preferred,preferred,preferred,preferred',
							'desc'    => sprintf( '
								<p>%s <a href="http://www.addthis.com/services/list">%s</a>%s</p>
								%s
								<ul>
								<li>%s <span style="text-decoration:underline;"><strong>%s</strong></span> %s</li>
								<li>%s <span style="text-decoration:underline;"><strong>%s</strong></span> %s</li>
								<li>%s <span style="text-decoration:underline;"><strong>%s</strong></span> %s <a href="http://www.addthis.com/academy/preferred-services-personalization/">%s</a>%s</li>
								</ul>',
								esc_html__( 'Add the share services, delimited by a single comma (no spaces). You can find the full list of services', 'rosa' ),
								esc_html__( 'here', 'rosa' ),
								esc_html__( '.', 'rosa' ),
								esc_html__( 'Notes:', 'rosa' ),
								esc_html__( '— use the', 'rosa' ),
								esc_html__( 'more', 'rosa' ),
								esc_html__( 'tag to show the plus sign', 'rosa' ),
								esc_html__( '— use the', 'rosa' ),
								esc_html__( 'counter', 'rosa' ),
								esc_html__( 'for a global share counter', 'rosa' ),
								esc_html__( '— use the', 'rosa' ),
								esc_html__( 'preferred', 'rosa' ),
								esc_html__( 'tag&nbsp;to show your visitors a personalized lists of buttons (read', 'rosa' ),
								esc_html__( 'more', 'rosa' ),
								esc_html__( ')', 'rosa' )
							)
						),
						'share_buttons_enable_tracking' => array(
							'type'    => 'checkbox',
							'label'   => esc_html__( 'Enable AddThis Sharing Analytics', 'rosa' ),
							'default' => 0,
						),


						'share_buttons_enable_addthis_tracking' => array(
							'type'    => 'checkbox',
							'label'   => esc_html__( 'Enable AddThis Tracking', 'rosa' ),
							'default' => 0,
							//'required' => array( 'share_buttons_enable_tracking', '=', 1 ),
						),

						'share_buttons_addthis_username' => array(
							'type'    => 'text',
							'label'   => esc_html__( 'AddThis Username', 'rosa' ),
							'default' => 'more,preferred,preferred,preferred,preferred',
							'desc'    => esc_html__( 'Enter here your AddThis username so you will receive analytics data.', 'rosa' ),
							//'required' => array( 'share_buttons_enable_addthis_tracking', '=', 1 ),
						),

						'share_buttons_enable_ga_tracking' => array(
							'type'    => 'checkbox',
							'label'   => esc_html__( 'AddThis Google Analytics Tracking', 'rosa' ),
							'desc'    => sprintf(
								'%s <a href="http://bit.ly/1kxPg7K">%s</a> %s',
								esc_html__( 'Read more on', 'rosa' ),
								esc_html__( 'Integrating with Google Analytics', 'rosa' ),
								esc_html__( 'article.', 'rosa' )
							),
							'default' => 0,
							//'required' => array( 'share_buttons_enable_tracking', '=', 1 ),
						),

						'share_buttons_ga_id' => array(
							'type'    => 'text',
							'label'   => esc_html__( 'GA Property ID', 'rosa' ),
							'desc'    => esc_html__( 'Enter here your GA property ID (generally a serial number of the form UA-xxxxxx-x).', 'rosa' ),
							'default' => '',
							//'required' => array( 'share_buttons_enable_ga_tracking', '=', 1 ),
						),

						'share_buttons_enable_ga_social_tracking' => array(
							'type'    => 'checkbox',
							'label'   => esc_html__( 'GA Social Tracking', 'rosa' ),
							'desc'    => sprintf(
								'%s <a href="http://bit.ly/1iVvkbk"></a>%s',
								esc_html__( 'If you are using the latest version of GA code, you can take advantage of Google\'s new', 'rosa' ),
								esc_html__( 'social interaction analytics', 'rosa' ),
								esc_html__( '.', 'rosa' )
							),
							'default' => 0,
							//'required' => array( 'share_buttons_enable_ga_tracking', '=', 1 ),
						),
					)
				),

				'custom_js' => array(
					'title'    => esc_html__( 'Custom JavaScript', 'rosa' ),
					'priority' => 999,
					'options'  => array(
						'custom_js'        => array(
							'type'        => 'ace_editor',
							'label'       => esc_html__( 'Header', 'rosa' ),
							'desc'        => esc_html__( 'Easily add Custom Javascript code. This code will be loaded in the <head> section.', 'rosa' ),
							'editor_type' => 'javascript',
						),
						'custom_js_footer' => array(
							'type'        => 'ace_editor',
							'label'       => esc_html__( 'Footer', 'rosa' ),
							'desc'        => esc_html__( 'You can paste here your Google Analytics tracking code (or for what matters any tracking code) and we will put it on every page.', 'rosa' ),
							'editor_type' => 'javascript',
						),
					)
				),
			)
		);

		/**
		 * BACKGROUNDS - This section will handle different elements backgrounds
		 */
		$config['panels']['layouts_panel'] = array(
			'title'    => __( '&#x1f4bb; Layout', 'rosa' ),
			'priority' => 2,
			'sections' => array(

				'header_layouts_section' => array(
					'title'   => __( 'Header', 'rosa' ),
					'options' => array(

						'header_logo_height' => array(
							'type'        => 'range',
							'label'       => __( 'Logo Height', 'rosa' ),
							'default'     => 32,
							'live'        => true,
							'input_attrs' => array(
								'min'          => 20,
								'max'          => 100,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'max-height',
									'selector' => '.site-title--image img',
									'unit'     => 'px'
								),
								array(
									'property' => 'font-size',
									'selector' => '.site-logo',
								)
							)
						),

						'header_vertical_margins' => array(
							'type'        => 'range',
							'label'       => __( 'Header Vertical Margins', 'rosa' ),
							'default'     => 0,
							'live'        => true,
							'input_attrs' => array(
								'min'          => 0,
								'max'          => 100,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'padding-top',
									'selector' => '.site-header',
									'unit'     => 'px',
									'media'    => ' screen and (min-width: 900px)'
								),
								array(
									'property' => 'padding-bottom',
									'selector' => '.site-header',
									'unit'     => 'px',
									'media'    => 'screen and (min-width: 900px) '
								),

								array(
									'property' => 'margin-top',
									'selector' => '#page',
									'unit'     => 'px',
									'media'    => ' screen and (min-width: 900px) '
								),

								array(
									'property' => 'top',
									'selector' => '#page',
									'unit'     => 'px',
									'media'    => ' screen and (min-width : 900px)'
								),
							)
						),

						'navigation_menu_items_spacing' => array(
							'type'        => 'range',
							'label'       => __( 'Menu Items Spacing', 'rosa' ),
							'default'     => 24,
							'live'        => true,
							'input_attrs' => array(
								'min'          => 12,
								'max'          => 75,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'padding-left',
									'selector' => '.nav--main > .menu-item > a',
									'unit'     => 'px',
									'media'    => ' screen and (min-width: 900px)'
								),
								array(
									'property' => 'padding-right',
									'selector' => '.nav--main > .menu-item > a',
									'unit'     => 'px',
									'media'    => 'screen and (min-width: 900px) '
								)
							)
						)
					)
				),

				'content_layouts_section'    => array(
					'title'   => __( 'Content', 'rosa' ),
					'options' => array(

						'border_width'              => array(
							'type'        => 'range',
							'label'       => __( 'Site Border Width', 'rosa' ),
							// 'desc'        => __( 'Set the border width of the overall site', 'rosa' ),
							'live'        => true,
							'default'     => '0',
							'input_attrs' => array(
								'min'          => 0,
								'max'          => 72,
								'step'         => 6,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'border-width',
									'selector' => 'body > .page, .site-header',
									'unit'     => 'px',
									'media'    => 'screen and (min-width: 900px)'
								),
								array(
									'property'        => 'margin-top',
									'selector'        => '.article__header:first-of-type + .article--page',
									'unit'            => 'px',
									'callback_filter' => 'rosa_range_negative_value',
									'media'           => ' screen and (min-width: 900px) '
								),
								array(
									'property' => 'padding-right',
									'selector' => 'body .navigator, div.page',
									'unit'     => 'px',
									'media'    => '  screen and (min-width: 900px)'
								),
								array(
									'property' => 'border-bottom-width',
									'selector' => '.site-footer',
									'unit'     => 'px',
									'media'    => '    screen and (min-width: 900px)'
								),
								array(
									'property' => 'padding-left',
									'selector' => 'div.page',
									'unit'     => 'px',
									'media'    => ' screen and (min-width: 900px)'
								),
							)
						),
						'content_width'             => array(
							'type'        => 'range',
							'label'       => __( 'Container Width', 'rosa' ),
							// 'desc'        => __( 'Set the width of the container.', 'rosa' ),
							'live'        => true,
							'default'     => 1250,
							'input_attrs' => array(
								'min'          => 600,
								'max'          => 2700,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'max-width',
									'selector' => '.container, .search__container, .site-header__container, .header--sticky .site-header__container',
									'unit'     => 'px',
								)
							)
						),
						'sections_vertical_margins' => array(
							'type'        => 'range',
							'label'       => __( 'Sections Vertical Margins', 'rosa' ),
							'live'        => true,
							'default'     => 78,
							'input_attrs' => array(
								'min'          => 0,
								'max'          => 120,
								'step'         => 6,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'padding-top',
									'selector' => '.page .type-page .article__content',
									'unit'     => 'px',
									'media'    => ' only screen and (min-width: 900px)',
								),
								array(
									'property' => 'padding-bottom',
									'selector' => '.page .type-page .article__content',
									'unit'     => 'px',
									'media'    => 'only screen and (min-width: 900px) ',
								)
							)
						),

						'sidebar_width' => array(
							'type'        => 'range',
							'label'       => __( 'Sidebar Width', 'rosa' ),
							// 'desc'        => __( 'Set the width of the sidebar.', 'rosa' ),
							'live'        => true,
							'default'     => 300,
							'input_attrs' => array(
								'min'          => 140,
								'max'          => 500,
								'step'         => 10,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'width',
									'selector' => '.sidebar--main',
									'unit'     => 'px',
									'media'    => ' only screen and (min-width: 900px)',
								),
								array(
									'property' => 'right',
									'selector' => '.page-content.has-sidebar:after',
									'unit'     => 'px',
									'media'    => 'only screen and (min-width: 900px) ',
								),
								array(
									'property' => 'margin-right',
									'selector' => '.page-content.has-sidebar .page-content__wrapper',
									'unit'     => 'px',
									'media'    => 'only screen and (min-width : 900px)',
								),
								array( // @TODO make this work with live preview
									'property'        => 'margin-right',
									'selector'        => '.page-content.has-sidebar',
									'callback_filter' => 'rosa_range_negative_value',
									'unit'            => 'px',
									'media'           => ' only screen and (min-width : 900px)',
								),
							)
						),


						'down_arrow_style' => array(
							'type'    => 'select',
							'label'   => __( 'Scroll Down Arrow Style', 'rosa' ),
							'choices' => array(
								'transparent' => esc_html__( 'Transparent', 'rosa' ),
								'bubble'      => esc_html__( 'Bubble', 'rosa' ),
							),
							'default' => 'transparent',
						),

						'slideshow_arrows_style' => array(
							'type'    => 'select',
							'label'   => __( 'Slideshow Arrows', 'rosa' ),
							// 'desc'    => __( 'Select which type of arrows you want on page headers.', 'rosa' ),
							'choices' => array(
								'static' => esc_html__( 'Always Show', 'rosa' ),
								'hover'  => esc_html__( 'Show On Hover', 'rosa' )
							),
							'default' => 'static',
						),
					),
				),
				'footer_backgrounds_section' => array(
					'title'   => __( 'Footer', 'rosa' ),
					'options' => array(
						'footer_sidebar_style'   => array(
							'type'    => 'select',
							'label'   => __( 'Footer Widget Area Style', 'rosa' ),
							'choices' => array(
								'light'  => esc_html__( 'Light', 'rosa' ),
								'dark'   => esc_html__( 'Dark', 'rosa' ),
								'accent' => esc_html__( 'Accent Color', 'rosa' ),
							),
							'default' => 'dark',
							'css'     => array(
								array(
									'selector'        => '.site-footer.border-waves:before, .border-waves-top.border-waves-top--dark:before',
									'property'        => 'background-image',
									'callback_filter' => 'rosa_footer_style_select'
								)
							)
						),
						'footer_bottombar_style' => array(
							'type'    => 'select',
							'label'   => __( 'Footer Bottom Bar Style', 'rosa' ),
							'choices' => array(
								'light'  => esc_html__( 'Light', 'rosa' ),
								'dark'   => esc_html__( 'Dark', 'rosa' ),
								'accent' => esc_html__( 'Accent Color', 'rosa' ),
							),
							'default' => 'dark',
						),
					)
				),
			)
		);


		$config['sections'] = array(
			'colors_section' => array(
				'title'       => '&#x1f3a8; ' . esc_html__( 'Colors', 'rosa' ),
				'priority'    => 3,
				'description' => esc_html__( 'Use the color picker to change the main color of the site to match your brand color. If you want to override the color of some elements you can always use CSS editor panel.', 'rosa' ),
				'options'     => array(
					'main_color'     => array(
						'type'    => 'color',
						'label'   => __( 'Accent Color', 'rosa' ),
						'live'    => true,
						'default' => THEME_COLOR_PRIMARY,
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => 'a,
                                                a:hover,
                                                .article__content a:not([class]),
                                                .article__content a:not([class]):hover,
                                                
                                                .nav--main a:hover,
                                                .headroom--not-top .nav--main a:hover,
                                                a:hover > .pixcode--icon,
                                                
                                                .headline__secondary,
                                                .separator--line-flower,
                                                header.c-hero.article__header .article__headline .headline__description div.star,
                                                header.c-hero .article__headline .headline__description div.separator.separator--flower,
                                                
                                                .tabs__nav a:hover,
                                                .tabs__nav a.active,
                                                .tabs__nav a.current,
                                                
                                                .btn.btn--text,
                                                .read-more-button,
                                                
                                                .meta-list .form-submit a#comment-submit:hover,
                                                .form-submit .meta-list a#comment-submit:hover,
                                                .form-submit .btn--text#comment-submit,
                                                .form-submit #comment-submit.read-more-button,
                                                
                                                .headroom--not-top .nav.nav--items-social a:hover:before,
                                                .sidebar--main .widget [class*="social"] > ul a:hover:before, 
                                                .widget [class*="social"] > ul a:hover:before,
                                                
                                                .btn--text.wpcf7-form-control.wpcf7-submit,
                                                .wpcf7-form-control.wpcf7-submit.read-more-button,
                                                 
                                                .btn--text.otreservations-submit,
                                                .otreservations-submit,
                                                 
                                                .widget_tag_cloud a.btn--text,
                                                .widget_tag_cloud a.read-more-button,
                                                .sidebar--main .widget a:hover,
                                                .sidebar--main .widget .tagcloud a:hover,
                                                 
                                                blockquote,
                                                 
                                                .meta-list a.btn:hover,
                                                .meta-list a.wpcf7-form-control.wpcf7-submit:hover,
                                                .meta-list a.otreservations-submit:hover,
                                                .meta-list .widget_tag_cloud a:hover,
                                                .widget_tag_cloud .meta-list a:hover,
                                                
                                                .single-post .article__content a:not([class]),
                                                .single-post .article__content a:not([class]):hover,
                                                                                    
                                                .shop-categories a.active,
                                                body.woocommerce ul.products li.product .product__button, 
                                                body.woocommerce ul.products li.product .added_to_cart,
                                                body.woocommerce ul.products li.product a.added_to_cart, 
                                                body.woocommerce ul.products li.product .price ins,
                                                .woocommerce ul.products li.product .price del,
                                                .woocommerce .product .price,
                                                .woocommerce ul.products li.product:hover .product__button,
                                                
                                                .single-product .entry-summary .price ins span,
                                                .single-product .entry-summary .price del span,
                                                .single-product .entry-summary .price del,
                                                
                                                .single-product .entry-summary .price span, 
                                                
                                                body.woocommerce .star-rating span:before, 
                                                
                                                .comment-reply-link,
                                                
                                                .woocommerce-account .woocommerce-MyAccount-navigation li a:hover,
                                                .woocommerce-account .woocommerce-MyAccount-navigation li.is-active a,
                                                .comment__author-name a:hover,
                                                
                                                .site-header.headroom--top a.site-logo--text:hover,
                                                .site-header.headroom--not-top a.site-logo--text:hover,
                                                
                                                .is-today .pika-button,

                                                .pixcode.pixcode--icon:hover',
							),
							array(
								'property' => 'background-color',
								'selector' => '.btn--primary,
								                .btn:not(.btn--primary):not(.btn--tertiary):hover,
								                
                                                .shop-menu-item .shop-items-number,
                                                 
                                                .comments_add-comment, 
                                                .form-submit #comment-submit, 
                                                 
                                                .wpcf7-form-control.wpcf7-submit:hover,
                                                form.shipping_calculator button.button:hover,
                                                 
                                                .pagination li a:hover,
                                                .pagination .nav-links .page-numbers:not(.current):hover,
                                                .pagination .nav-links .page-numbers.prev:not(.disabled):hover,
                                                .pagination .nav-links .page-numbers.next:not(.disabled):hover,
                                                 
                                                .otreservations-submit:hover,
                                                 
                                                .pixcode--icon.square:hover, 
                                                .pixcode--icon.circle:hover,
                                                 
                                                .menu-list__item-highlight-title,
                                                .promo-box__container,
                                                
                                                :not(.pika-today) > .pika-button:hover,
                                                .pika-table .is-selected .pika-button.pika-day,
                                                
                                                .woocommerce div.product form.cart .button:hover,
                                                .woocommerce table.shop_table div.coupon .button:hover,
                                                .woocommerce-page table.shop_table div.coupon .button:hover,
                                                .woocommerce-cart-form .actions input[name="update_cart"][disabled]:hover,
                                                .woocommerce div.cart-collaterals .wc-proceed-to-checkout .checkout-button:hover,
                                                .product__badge.on-sale,
                                                form.checkout_coupon.woocommerce-form-coupon button[name="apply_coupon"]:hover,
                                                div.woocommerce-checkout-payment button.button.alt[name="woocommerce_checkout_place_order"]:hover'
							),
                            array(
                                'property' => 'background-color',
                                'unit' => '88',
                                'selector' => '.select2-container--default .select2-results__option[data-selected=true]',
                                'callback_filter' => 'rosa_transparent_color'
                            ),
							array(
								'property' => 'background',
								'selector' => 'body.woocommerce button.button.alt:hover, 
								                body.woocommerce-page #respond input#submit:hover,
                                                body.woocommerce div.woocommerce-message .button:hover, 
                                                td.actions input.button:hover,
                                                body.woocommerce-page input.button:hover,
                                                body.woocommerce-page input.button.alt:hover,
                                                a:hover > .pixcode--icon.circle,
                                                a:hover > .pixcode--icon.square'
							),
							array(
								'property' => 'border-color',
								'selector' => '.btn.btn--text,
								
								                .btn--text.comments_add-comment, 
								                .comments_add-comment.read-more-button,
								                .form-submit .btn--text#comment-submit, 
                                                .form-submit #comment-submit.read-more-button,
                                                .btn--text.wpcf7-form-control.wpcf7-submit, 
                                                .wpcf7-form-control.wpcf7-submit.read-more-button,
                                                
								                .tabs__nav a.current,                
								                .tabs__nav a:hover,
                                                
                                                .btn--text.otreservations-submit, 
                                                .otreservations-submit, 
                                                
                                                .read-more-button,
                                                .btn.read-more-button, 
                                                
                                                .widget_tag_cloud a.btn--text, 
                                                .widget_tag_cloud a.read-more-button, 
                                                
                                                blockquote, 
                                                
                                                .article__content a:not([class]), 
                                                
                                                .menu-list__item-highlight-wrapper:before,
                                                
                                                .shop-categories a.active,
                                                body.woocommerce ul.products li.product .product__button, 
                                                body.woocommerce ul.products li.product .added_to_cart, 
                                                
                                                .woocommerce-account .woocommerce-MyAccount-navigation li a:hover,
                                                .woocommerce-account .woocommerce-MyAccount-navigation li.is-active a,
                                                .woocommerce ul.products li.product:hover .product__button,
                                                
                                                .pagination .nav-links .page-numbers.current'
							),
							array(
								'property' => 'outline-color',
								'selector' => 'select:focus, textarea:focus, 
								                input[type="text"]:focus,
                                                input[type="password"]:focus, 
                                                input[type="datetime"]:focus,
                                                input[type="datetime-local"]:focus, 
                                                input[type="date"]:focus,
                                                input[type="month"]:focus, 
                                                input[type="time"]:focus, 
                                                input[type="week"]:focus,
                                                input[type="number"]:focus, 
                                                input[type="email"]:focus, 
                                                input[type="url"]:focus,
                                                input[type="search"]:focus, 
                                                input[type="tel"]:focus, 
                                                input[type="color"]:focus, 
                                                .form-control:focus'
							),
							array(
								'property' => 'fill',
								'selector' => '.copyright-area.copyright-area__accent svg path'
							),
						)
					),
					'text_color'     => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Text Color', 'rosa' ),
						'live'    => true,
						'default' => THEME_DARK_SECONDARY,
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => 'body, 
								                .up-link, 
								                .down-arrow--bubble .arrow,
								                .article__date,
								                
								                .pixlikes-box .likes-text,
								                .pixlikes-box .likes-count,
								                .comment-form-comment textarea,
								                
								                .woocommerce .woocommerce-message,
								                .woocommerce .woocommerce-info,
								                .woocommerce .woocommerce-error,
								                .woocommerce .woocommerce-billing-fields__field-wrapper input.input-text,
								                form.checkout_coupon.woocommerce-form-coupon input[name="coupon_code"],
								                .woocommerce-cart-form .cart .input-text[name="coupon_code"],
								                form.checkout textarea[name="order_comments"],
								                
								                .woocommerce .woocommerce-billing-fields__field-wrapper span.select2-selection.select2-selection--single,
								                .select2-container--default .select2-selection--single .select2-selection__rendered,
								                .select2-container--default .select2-results__option[data-selected=true],
								                form.checkout .woocommerce-billing-fields__field-wrapper span.select2-dropdown.select2-dropdown--below,
								                .select2-container--default .select2-results__option--highlighted[aria-selected],
                                                .select2-container--default .select2-results__option--highlighted[data-selected],
								                
								                .menu-list span.dots,
								                
								                .sidebar--footer.sidebar--footer__light, 
												.copyright-area.copyright-area__light,
												.sidebar--footer.sidebar--footer__light .widget [class*="social"] > ul a:before'
							),
                            array(
                                'property' => 'border-color',
                                'selector' => '.copyright-area__light .btn--top_text .btn__arrow',
                            ),
                            array(
                                'property' => 'color',
                                'unit' => '20',
                                'selector' => '.comment-form-comment:before',
                                'callback_filter' => 'rosa_transparent_color'
                            ),
                            array(
                                'property' => 'color',
                                'unit' => '8C',
                                'selector' => '.comment__content,
                                                .woocommerce ul.products li.product .product__cat',
                                'callback_filter' => 'rosa_transparent_color'
                            ),
							array(
                                'property' => 'background-color',
                                'unit' => '30',
                                'selector' => '.select2-container--default .select2-results__option--highlighted[aria-selected],
                                                .select2-container--default .select2-results__option--highlighted[data-selected],
                                                table tbody tr:nth-of-type(odd),
                                                .wp-caption-text,
                                                div.woocommerce-checkout-payment#payment',
                                'callback_filter' => 'rosa_transparent_color'
                            ),
                            array(
                                'property' => 'background-color',
                                'unit' => '20',
                                'selector' => 'div.woocommerce-checkout-payment#payment',
                                'callback_filter' => 'rosa_transparent_color'
                            ),
							array(
								'property' => 'border-color',
								'unit' => '37',
								'selector' => '.up-link:before,
								
                                                .pix-dropdown .dropdown__trigger,
                                                .pix-dropdown.active .dropdown__menu,
                                                .pix-dropdown.active .dropdown__menu:before,
                                                
                                                .otw-widget-form .otw-reservation-date,
                                                .otw-widget-form .otw-reservation-time,
                                                .otw-widget-form .otw-party-size-select,
                                                
                                                .form-search .search-query,
                                                
                                                hr, hr.separator, .separator,
                                                
                                                .meta-list a.btn,
                                                .meta-list a.btn:last-child,
                                                
                                                div.addthis_toolbox,
                                                div.addthis_toolbox a,
                                                
                                                .comment-form textarea,
                                                .comment-form input,
                                                .latest-comments__body,
                                                .pixlikes-box,
                                                
                                                .woocommerce .woocommerce-ordering select,
                                                .woocommerce div.woocommerce-message,
                                                .woocommerce div.woocommerce-info,
                                                .woocommerce div.woocommerce-error,
                                                .woocommerce table.shop_attributes,
                                                .woocommerce table.shop_attributes th,
                                                .woocommerce table.shop_attributes td,
                                                .woocommerce table.shop_table,
                                                .woocommerce-page table.shop_table,
                                                .woocommerce table.shop_table td,
                                                .woocommerce table.shop_table div.coupon .input-text[name="coupon_code"],
                                                .woocommerce-page table.shop_table div.coupon .input-text[name="coupon_code"],
                                                .woocommerce div.cart-collaterals div.cart-totals .shop_table,
                                                .woocommerce-cart .cart-collaterals .cart_totals tr th,
                                                .woocommerce-cart .cart-collaterals .cart_totals tr td,
                                                form.checkout_coupon.woocommerce-form-coupon,
                                                form.checkout_coupon.woocommerce-form-coupon input[name="coupon_code"],
                                                .woocommerce .woocommerce-billing-fields__field-wrapper input.input-text,
                                                form.checkout textarea[name="order_comments"],
                                                .woocommerce .woocommerce-info,
                                                .woocommerce-checkout #payment ul.payment_methods,
                                                .woocommerce table.shop_table tbody th,
                                                .woocommerce table.shop_table tfoot th,
                                                .woocommerce table.shop_table tfoot td,
                                                
                                                .woocommerce .woocommerce-billing-fields__field-wrapper span.select2-selection.select2-selection--single,
                                                span.select2-dropdown.select2-dropdown--below,
                                                span.select2-dropdown.select2-dropdown--above,
                                                .select2-container--default .select2-search--dropdown .select2-search__field,
                                                
                                                .sidebar--main .widget',
                                'callback_filter' => 'rosa_transparent_color'
                            ),
						),
					),
					'headings_color' => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Headings Color', 'rosa' ),
						'live'    => true,
						'default' => THEME_DARK_PRIMARY,
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => 'h1, h2, h3, h4, h5, h6, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,
								
								                .article-archive .article__title a,
								                .article-archive .article__title a:hover,
								                
								                .btn.btn--text:hover,
								                .pix-dropdown .dropdown__trigger,
								                
								                .sidebar--main .widget a,
								                .icon-search:before,
								                .icon-envelope:before,
								                
								                .input-group input.form-control,
								                .woocommerce .woocommerce-ordering select,
								                .woocommerce .woocommerce-breadcrumb a:hover,
								                
								                .tabs__nav a,
								                
                                                .pixcode.pixcode--icon'
							),
                            array(
								'property' => 'color',
								'unit'     => '88',
								'selector' => '.woocommerce .woocommerce-breadcrumb,
								                .woocommerce .woocommerce-breadcrumb a',
                                'callback_filter' => 'rosa_transparent_color'
			                ),
							array(
								'property' => 'background-color',
								'selector' => '.comment-number--dark, 
                                                .comments-area-title .comment-number.total,
                                                .comments-area-title .total.comment-number--dark, 
                                                .comment-reply-title .comment-number.total, 
                                                .comment-reply-title .total.comment-number--dark, 
                                                .add-comment .add-comment__button,
                                                
                                                .btn:not(.btn--primary),
                                                .btn--secondary, 
												.btn--tertiary,
												
                                                .pagination .nav-links .page-numbers,
                                                
                                                .otreservations-submit,
                                                
                                                .woocommerce div.woocommerce-message .button.wc-forward,
                                                .woocommerce .quantity input.qty,
                                                .woocommerce div.product form.cart .button,
                                                .woocommerce #review_form #respond .form-submit input,
                                                .woocommerce table.shop_table div.coupon .button,
                                                .woocommerce-page table.shop_table div.coupon .button,
                                                .woocommerce-cart-form .actions input[name="update_cart"],
                                                .woocommerce div.cart-collaterals .wc-proceed-to-checkout .checkout-button,
                                                .woocommerce table.shop_table .input-text.qty,
                                                .woocommerce-page table.shop_table .input-text.qty,
                                                
                                                .wpcf7-form-control.wpcf7-submit
                                                
                                                .pixcode.pixcode--icon.circle,  
                                                .pixcode.pixcode--icon.square,
                                                
                                                form.checkout_coupon.woocommerce-form-coupon button[name="apply_coupon"],
                                                div.woocommerce-checkout-payment button.button.alt[name="woocommerce_checkout_place_order"]'
							),
                            array(
                                'property' => 'background-color',
                                'unit' => '88',
                                'selector' => '.pagination .nav-links .page-numbers.prev.disabled,
                                                .pagination .nav-links .page-numbers.next.disabled,',
                                'callback_filter' => 'rosa_transparent_color'
                            ),
                            array(
                                'property' => 'border-color',
                                'selector' => 'div:not(.c-hero-layer) .pixcode-slider[data-arrows] .rsArrowIcn,
                                                .btn.btn--text:hover'
                            ),
                            //comment
                            //input
                            array(
                                'property' => 'color',
                                'selector' => '.comment-form input::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.comment-form input:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.comment-form input::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.comment-form input:-ms-input-placeholder'
                            ),
                            //comment
                            //textarea
                            array(
                                'property' => 'color',
                                'selector' => '.comment-form textarea::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.comment-form textarea:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.comment-form textarea::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.comment-form textarea:-ms-input-placeholder'
                            ),
                            //blog search
                            array(
                                'property' => 'color',
                                'selector' => '.form-search .search-query::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.form-search .search-query:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.form-search .search-query::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.form-search .search-query:-ms-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.input-group input.form-control::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.input-group input.form-control:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.input-group input.form-control::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.input-group input.form-control:-ms-input-placeholder'
                            ),
                            //woocommerce
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce table.shop_table .input-text::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce table.shop_table .input-text:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce table.shop_table .input-text::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce table.shop_table .input-text:-ms-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce-page table.shop_table .input-text::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce-page table.shop_table .input-text:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce-page table.shop_table .input-text::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce-page table.shop_table .input-text:-ms-input-placeholder'
                            ),
                            //woocommerce
                            //coupon
                            array(
                                'property' => 'color',
                                'selector' => 'form.checkout_coupon.woocommerce-form-coupon input[name="coupon_code"]::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => 'form.checkout_coupon.woocommerce-form-coupon input[name="coupon_code"]:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => 'form.checkout_coupon.woocommerce-form-coupon input[name="coupon_code"]::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => 'form.checkout_coupon.woocommerce-form-coupon input[name="coupon_code"]:-ms-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce .woocommerce-billing-fields__field-wrapper input.input-text::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce .woocommerce-billing-fields__field-wrapper input.input-text:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce .woocommerce-billing-fields__field-wrapper input.input-text::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => '.woocommerce .woocommerce-billing-fields__field-wrapper input.input-text:-ms-input-placeholder'
                            ),
                            //woocommerce
                            //checkout comment textarea
                            array(
                                'property' => 'color',
                                'selector' => 'form.checkout textarea[name="order_comments"]::-webkit-input-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => 'form.checkout textarea[name="order_comments"]:-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => 'form.checkout textarea[name="order_comments"]::-moz-placeholder'
                            ),
                            array(
                                'property' => 'color',
                                'selector' => 'form.checkout textarea[name="order_comments"]:-ms-input-placeholder'
                            )
						)
					),
					'navlink_color'  => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Nav Links Color', 'rosa' ),
						'live'    => true,
						'default' => THEME_DARK_PRIMARY,
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => '.nav--main .shop-menu-item__price,
                                                .headroom--not-top .nav--main a,
                                                .headroom--not-top .nav--main .shop-menu-item__price,
                                                
                                                a.site-logo--text,
                                                .site-header.headroom--not-top a.site-logo--text,
                                                
                                                .read-more-button:hover,
                                                
                                                .woocommerce ul.products li.product:hover .product__button:hover'
							),
                            array(
                                'property' => 'border-color',
                                'selector' => '.headroom--not-top .menu-item-has-children:after, 
								                .headroom--not-top .menu-item-language:after,
								                
								                .read-more-button:hover,
								                
                                                .woocommerce ul.products li.product:hover .product__button:hover'
                            ),
                            array(
                                'property' => 'background-color',
                                'selector' => '.btn--secondary,
                                                .btn--primary:hover,
                                                
                                                .comments_add-comment:hover,
                                                .form-submit #comment-submit:hover,
                                                .widget .tagcloud a'
                            )
						)
					),
					'header_background_color' => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Header Color', 'rosa' ),
						'live'    => true,
						'default' => THEME_LIGHT_PRIMARY,
						'css'     => array(
							array(
								'property' => 'background-color',
								'selector' => '.site-header, 
								                .site-header.headroom--not-top,
								                .sub-menu,
								                .headroom--not-top .sub-menu',
							)
						)
					),
					'header_image_pattern'    => array(
						'type'   => 'custom_background',
						'label'  => esc_html__( 'Header Background', 'rosa' ),
						'desc'   => esc_html__( 'Container background with image.', 'rosa' ),
						'output' => array( ".site-header, .site-header.headroom--not-top" ),
					),
					'content_background_color' => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Content Color', 'rosa' ),
						'live'    => true,
						'default' => THEME_LIGHT_PRIMARY,
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => '.blurp--top, 
                                                .border-waves-before,
                                                .border-waves-after,
                                                .menu-list__item-highlight-title,
                                                
                                                .btn,
                                                .btn:hover,
                                                .btn--secondary, 
                                                .btn--tertiary, 
                                                
                                                .comments_add-comment,
                                                .comments_add-comment:hover,
                                                .form-submit #comment-submit,
                                                .form-submit #comment-submit:hover,
                                                .comment-number--dark, 
                                                .comments-area-title .comment-number.total,
                                                .comments-area-title .total.comment-number--dark, 
                                                .comment-reply-title .comment-number.total, 
                                                .comment-reply-title .total.comment-number--dark, 
                                                .add-comment .add-comment__button,
                                                
                                                .promo-box__container,
                                                
                                                .otreservations-submit,
                                                .otreservations-submit:hover,
                                                
                                                .wpcf7-form-control.wpcf7-submit, 
                                                
                                                .pika-button:hover,
                                                .pika-table .is-selected .pika-button.pika-day,
                                                
                                                .pagination .nav-links .page-numbers:hover,
                                                .pagination .nav-links .page-numbers.prev:not(.disabled),
                                                .pagination .nav-links .page-numbers.prev:not(.disabled):before,
                                                .pagination .nav-links .page-numbers.current,
                                                .pagination .nav-links .page-numbers.next,
                                                .pagination .nav-links .page-numbers.next:hover,
                                                .pagination .nav-links .page-numbers.next:after,
            
            
                                                .woocommerce div.woocommerce-message .button.wc-forward,
                                                .woocommerce div.woocommerce-message .button.wc-forward:hover,
                                                .woocommerce div.product form.cart .button,
                                                .woocommerce .quantity input.qty,
                                                .woocommerce #review_form #respond .form-submit input,
                                                .woocommerce table.shop_table div.coupon .button,
                                                .woocommerce table.shop_table div.coupon .button:hover,
                                                .woocommerce-page table.shop_table .input-text,
                                                .woocommerce-cart-form .actions input[name="update_cart"],
                                                .woocommerce div.cart-collaterals .wc-proceed-to-checkout .checkout-button,
                                                .woocommerce div.cart-collaterals .wc-proceed-to-checkout .checkout-button:hover,
                                                .product__badge.on-sale,
                                                form.checkout_coupon.woocommerce-form-coupon button[name="apply_coupon"],
                                                form.checkout_coupon.woocommerce-form-coupon button[name="apply_coupon"]:hover,
                                                div.woocommerce-checkout-payment button.button.alt[name="woocommerce_checkout_place_order"],
                                                div.woocommerce-checkout-payment button.button.alt[name="woocommerce_checkout_place_order"]:hover,
                                                
                                                .pixcode.pixcode--icon.circle,
                                                .pixcode.pixcode--icon.circle:hover,
                                                .pixcode.pixcode--icon.square,
                                                .pixcode.pixcode--icon.square:hover,
                                                
                                                .sidebar--main .widget .tagcloud a,
                                                .sidebar--footer__accent a:hover,
                                                .sidebar--footer.sidebar--footer__accent .widget [class*="social"] > ul a:hover:before,
                                                .copyright-area.copyright-area__accent,
                                                .copyright-area.copyright-area__accent a:hover'
							),
                            array(
                                'property' => 'color',
                                'unit' => '88',
                                'selector' => '.pagination .nav-links .page-numbers,
                                                .pagination .nav-links .page-numbers.prev.disabled,
                                                .pagination .nav-links .page-numbers.prev.disabled:before,
                                                .pagination .nav-links .page-numbers.next.disabled,
                                                .pagination .nav-links .page-numbers.next.disabled:after',
                                'callback_filter' => 'rosa_transparent_color'
                            ),
							array(
								'property' => 'border-color',
								'selector' => '.site-header, .site-footer'
							),
							array(
								'property' => 'background-color',
								'selector' => 'html, 
                                                body.mce-content-body, 
                                                .page .article__content,
                                                .desc__content,
                                                 
                                                .up-link,
                                                 
                                                .menu-list__item-title .item_title, 
                                                .menu-list__item-price, 
                                                .pix-dropdown.active .dropdown__menu,
                                                
                                                .otw-input-wrap select option,
                                                
                                                .comment-number,
                                                .comment-form input,
                                                .form-search .search-query,
                                                .input-group input.form-control,
                                                
                                                .woocommerce ul.products li.product .added_to_cart:before,
                                                .woocommerce .woocommerce-ordering select,
                                                .woocommerce table.shop_table .input-text[name="coupon_code"],
                                                .woocommerce-page table.shop_table .input-text[name="coupon_code"],
                                                .woocommerce .woocommerce-billing-fields__field-wrapper input.input-text,
                                                form.checkout textarea[name="order_comments"],
                                                form.checkout_coupon.woocommerce-form-coupon input[name="coupon_code"],
                                                .woocommerce .woocommerce-billing-fields__field-wrapper span.select2-selection.select2-selection--single,
                                                span.select2-dropdown.select2-dropdown--below,
                                                span.select2-dropdown.select2-dropdown--above,
                                                .select2-container--default .select2-search--dropdown .select2-search__field,
                                                
                                                .is-today .pika-button,
                                                
                                                .sidebar--footer__light,
                                                .copyright-area.copyright-area__light'
							),
							array(
								'property' => 'fill',
								'selector' => '.copyright-area.copyright-area__light svg path'
							)
						)
					),
					'container_image_pattern'  => array(
						'type'   => 'custom_background',
						'label'  => esc_html__( 'Header Background', 'rosa' ),
						'desc'   => esc_html__( 'Container background with image.', 'rosa' ),
						'output' => array( '.page .article__content' ),
					),
                    'this_divider_6983365' => array(
                        'type' => 'html',
                        'html' => '<span class="separator label large">' . esc_html__( 'Footer Widget Area', 'rosa' ) . '</span>'
                    ),
                    'footer_widget_area_accent_color'     => array(
                        'type'    => 'color',
                        'label'   => __( 'Accent Color', 'rosa' ),
                        'live'    => true,
                        'default' => THEME_COLOR_PRIMARY,
                        'css'     => array(
                            array(
                                'property' => 'color',
                                'selector' => '.sidebar--footer a:hover, 
                                                .sidebar--footer .widget [class*="social"] > ul a:hover:before',
                            ),
                        ),
                    ),
                    'footer_widget_area_background_color'     => array(
                        'type'    => 'color',
                        'label'   => __( 'Background Color', 'rosa' ),
                        'live'    => true,
                        'default' => THEME_DARK_TERTIARY,
                        'css'     => array(
                            array(
                                'property' => 'background-color',
                                'selector' => '.sidebar--footer__dark',
                            ),
	                        array(
		                        'property' => 'background-color',
		                        'unit' => '80',
		                        'selector' => '.navigation--main .nav--main li.menu-item-has-children a:before',
		                        'media' => 'only screen and (max-width: 899px)',
		                        'callback_filter' => 'rosa_transparent_color'
	                        ),
                        ),
                    ),
                    'footer_widget_area_text_color'     => array(
                        'type'    => 'color',
                        'label'   => __( 'Text Color', 'rosa' ),
                        'live'    => true,
                        'default' => THEME_LIGHT_PRIMARY,
                        'css'     => array(
                            array(
                                'property' => 'color',
                                'selector' => '.sidebar--footer,
                                                .sidebar--footer .widget [class*="social"] > ul a:before'
                            ),
                            array(
                                'property' => 'border-color',
                                'selector' => '.btn--top_text .btn__arrow'
                            ),
                        ),
                    ),
                    'this_divider_6360676' => array(
                        'type' => 'html',
                        'html' => '<span class="separator label large">' . esc_html__( 'Footer', 'rosa' ) . '</span>'
                    ),
                    'footer_accent_color'     => array(
                        'type'    => 'color',
                        'label'   => __( 'Accent Color', 'rosa' ),
                        'live'    => true,
                        'default' => THEME_COLOR_PRIMARY,
                        'css'     => array(
                            array(
                                'property' => 'color',
                                'selector' => '.copyright-text a,
                                                .nav--footer a:hover,
                                                .site-footer .separator--flower',
                            ),
                            array(
                                'property' => 'background-color',
                                'selector' => '.sidebar--footer__accent, 
                                                .copyright-area.copyright-area__accent',
                            ),
                        ),
                    ),
                    'footer_background_color'     => array(
                        'type'    => 'color',
                        'label'   => __( 'Background Color', 'rosa' ),
                        'live'    => true,
                        'default' => THEME_DARK_PRIMARY,
                        'css'     => array(
                            array(
                                'property' => 'background-color',
                                'selector' => '.copyright-area.copyright-area__dark'
                            ),
                            array(
                                'property' => 'fill',
                                'selector' => '.copyright-area svg path'
                            ),
                        ),
                    ),
                    'footer_text_color'     => array(
                        'type'    => 'color',
                        'label'   => __( 'Text Color', 'rosa' ),
                        'live'    => true,
                        'default' => THEME_LIGHT_PRIMARY,
                        'css'     => array(
                            array(
                                'property' => 'color',
                                'unit' => '91',
                                'selector' => '.copyright-area',
                                'callback_filter' => 'rosa_transparent_color',
                            ),
                        ),
                    ),
					'this_divider_20042018' => array(
						'type' => 'html',
						'html' => '<span class="separator label large">' . esc_html__( 'Mobile Navigation', 'rosa' ) . '</span>'
					),
                    'mobile_navigation_color'     => array(
                        'type'    => 'color',
                        'label'   => __( 'Navigation Links Color', 'rosa' ),
                        'live'    => true,
                        'default' => THEME_LIGHT_SECONDARY,
                        'css'     => array(
	                        array(
		                        'property' => 'color',
		                        'selector' => '.navigation--main .nav--main li a',
		                        'media' => 'only screen and (max-width: 899px)'
	                        ),
	                        array(
		                        'property' => 'border-color',
		                        'unit' => '30',
		                        'selector' => '.navigation--main .nav--main',
		                        'media' => 'only screen and (max-width: 899px)',
		                        'callback_filter' => 'rosa_transparent_color'
	                        ),
	                        array(
		                        'property' => 'color',
		                        'selector' => '.shop-menu-item .shop-menu-item__price',
		                        'media' => 'only screen and (max-width: 899px)'
	                        ),
	                        array(
		                        'property' => 'background-color',
		                        'unit' => '19',
		                        'selector' => '.widget_shopping_cart_content',
		                        'media' => 'only screen and (max-width: 899px)',
		                        'callback_filter' => 'rosa_transparent_color'
	                        ),
                        ),
                    ),
                    'mobile_navigation_background_color'     => array(
                        'type'    => 'color',
                        'label'   => __( 'Navigation Background Color', 'rosa' ),
                        'live'    => true,
                        'default' => THEME_DARK_PRIMARY,
                        'css'     => array(
	                        array(
		                        'property' => 'background-color',
		                        'selector' => 'body .navigation--main',
		                        'media' => 'only screen and (max-width: 899px)'
	                        ),
                        ),
                    ),
				),
			),
			'blog'           => array(
				'title'    => '&#x1f4d4; ' . esc_html__( 'Blog', 'rosa' ),
				'priority' => 6,
				'options'  => array(
					'this_divider_8874320137'      => array(
						'type' => 'html',
						'html' => '<span class="separator label large">' . esc_html__( 'Single Post', 'rosa' ) . '</span>'
					),
					'blog_single_show_author_box'  => array(
						'type'    => 'checkbox',
						'label'   => esc_html__( 'Show Author Info Box', 'rosa' ),
						//'subtitle' => __( 'Do you want to show author info box with avatar and description bellow the post?', 'rosa' ),
						'default' => 1,
					),
					'this_divider_37986312'        => array(
						'type' => 'html',
						'html' => '<span class="separator label">' . esc_html__( 'Sharing Buttons', 'rosa' ) . '</span>'
					),
					'blog_single_show_share_links' => array(
						'type'    => 'checkbox',
						'label'   => esc_html__( 'Show Share Buttons in Posts', 'rosa' ),
						'default' => 1,
					),

					'this_divider_8886312' => array(
						'type' => 'html',
						'html' => '<span class="separator label">' . esc_html__( 'Comments', 'rosa' ) . '</span>'
					),
					'comments_show_avatar' => array(
						'type'    => 'checkbox',
						'label'   => esc_html__( 'Show Comments Avatars', 'rosa' ),
						'default' => 0,
					),

					'comments_show_numbering' => array(
						'type'    => 'checkbox',
						'label'   => esc_html__( 'Show Comments Numbers', 'rosa' ),
						'default' => 1,
					),

					'this_divider_1286312' => array(
						'type' => 'html',
						'html' => '<span class="separator label">' . esc_html__( 'Sidebar', 'rosa' ) . '</span>'
					),

					'blog_single_show_sidebar' => array(
						'type'    => 'checkbox',
						'label'   => esc_html__( 'Show the main sidebar in the single post pages.', 'rosa' ),
						'default' => 1,
					),

					'this_divider_5343879' => array(
						'type' => 'html',
						'html' => '<span class="separator label large">' . esc_html__( 'Blog Archive', 'rosa' ) . '</span>'
					),

					'blog_read_more_text' => array(
						'type'    => 'text',
						'label'   => esc_html__( 'Read More Text', 'rosa' ),
						'default' => esc_html__( 'Read more', 'rosa' )
					),

					'blog_excerpt_more_text' => array(
						'type'    => 'text',
						'label'   => esc_html__( 'Excerpt "More" Text', 'rosa' ),
						'default' => esc_html__( '..', 'rosa' )
					),

					'blog_excerpt_length' => array(
						'type'    => 'text',
						'label'   => esc_html__( 'Excerpt Length', 'rosa' ),
						'desc'    => esc_html__( 'Set the number of characters for posts excerpt.', 'rosa' ),
						'default' => 140
					),

					'this_divider_5363879' => array(
						'type' => 'html',
						'html' => '<span class="separator label large">' . esc_html__( 'Posts Meta Informations', 'rosa' ) . '</span>'
					),

					'blog_show_date' => array(
						'type'    => 'checkbox',
						'label'   => esc_html__( 'Display the post publish date.', 'rosa' ),
						'default' => 1
					),

					'blog_custom_date_separator' => array(
						'type'    => 'checkbox',
						'label'   => esc_html__( 'Change spaces, commas or slashes with a custom dot.', 'rosa' ),
						'default' => 1,
						//'required' => array( 'blog_show_date', '=', true )
					),
				)
			),
		);


		$config['panels']['typography_panel'] = array(
			'title'    => '&#x1f4dd; ' . esc_html__( 'Fonts', 'rosa' ),
			'priority' => 4,
			'sections' => array(

				'headers_typography_section' => array(
					'title'   => esc_html__( 'Headings', 'rosa' ),
					'options' => array(
						'google_titles_font' => array(
							'type'             => 'typography',
							'label'            => esc_html__( 'Headings', 'rosa' ),
							// 'desc'             => __( 'Font for titles and headings.', 'rosa' ),
							'default'          => array( 'Source Sans Pro' ),
							'recommended'      => array(
								'Source Sans Pro',
								'Herr Von Muellerhoff',
								'Cabin',
							),
							'load_all_weights' => true,
							'selector'         => 'h1, h2, h3, h4, h5, h6, hgroup, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,
									blockquote, .tabs__nav, .popular-posts__time, .pagination li a, .pagination li span'
						),

						'google_subtitles_font'      => array(
							'type'        => 'typography',
							'label'       => esc_html__( 'Sub Headings', 'rosa' ),
							// 'desc'        => __( 'Font for titles and headings.', 'rosa' ),
							'default'     => array( 'Herr Von Muellerhoff' ),
							'recommended' => array(
								'Herr Von Muellerhoff',
								'Source Sans Pro',
								'Cabin',
							),
							'selector'    => '.headline__secondary',
						),
						'subheadings_bottom-spacing' => array(
							'type'        => 'range',
							'label'       => esc_html__( 'Bottom Spacing', 'rosa' ),
							'live'        => true,
							'default'     => '-38',
							'input_attrs' => array(
								'min'          => - 90,
								'max'          => 48,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'margin-bottom',
									'selector' => '.headline__secondary',
									'unit'     => 'px',
								)
							)
						),
						'subheadings_first-letter'   => array(
							'type'        => 'range',
							'label'       => esc_html__( 'First Letter Offset', 'rosa' ),
							'live'        => true,
							'default'     => 9,
							'input_attrs' => array(
								'min'          => - 48,
								'max'          => 90,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'top',
									'selector' => '.headline__secondary .first-letter',
									'unit'     => 'px',
								)
							)
						),
					)
				),

				'nav_typography_section' => array(
					'title'   => esc_html__( 'Navigation', 'rosa' ),
					'options' => array(
						'google_nav_font'     => array(
							'type'        => 'typography',
							'label'       => esc_html__( 'Navigation', 'rosa' ),
							'desc'        => esc_html__( 'Font for the navigation menu.', 'rosa' ),
							'default'     => array( 'Cabin' ),
							'recommended' => array(
								'Cabin',
								'Source Sans Pro',
								'Herr Von Muellerhoff',
							),
							'selector'    => '.navigation a'
						),
						'nav_font-size'       => array(
							'type'        => 'range',
							'label'       => esc_html__( 'Font Size', 'rosa' ),
							'live'        => true,
							'default'     => 13,
							'input_attrs' => array(
								'min'          => 8,
								'max'          => 30,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'font-size',
									'selector' => '.navigation a',
									'unit'     => 'px',
								)
							)
						),
						'nav_letter-spacing'  => array(
							'type'        => 'range',
							'label'       => esc_html__( 'Letter Spacing', 'rosa' ),
							'live'        => true,
							'default'     => 1,
							'input_attrs' => array(
								'min'          => - 5,
								'max'          => 20,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'letter-spacing',
									'selector' => '.navigation a',
									'unit'     => 'px',
								)
							)
						),
						'nav_text-transform'  => array(
							'type'    => 'select',
							'label'   => esc_html__( 'Text Transform', 'rosa' ),
							'choices' => array(
								'none'       => esc_html__( 'None', 'rosa' ),
								'capitalize' => esc_html__( 'Capitalize', 'rosa' ),
								'uppercase'  => esc_html__( 'Uppercase', 'rosa' ),
								'lowercase'  => esc_html__( 'Lowercase', 'rosa' ),
							),
							'default' => 'uppercase',
							'css'     => array(
								array(
									'property' => 'text-transform',
									'selector' => '.nav--main > .menu-item > a',
								)
							)
						),
						'nav_text-decoration' => array(
							'type'    => 'select',
							'label'   => esc_html__( 'Text Decoration', 'rosa' ),
							'choices' => array(
								'none'      => esc_html__( 'None', 'rosa' ),
								'underline' => esc_html__( 'Underline', 'rosa' ),
								'overline'  => esc_html__( 'Overline', 'rosa' ),
							),
							'default' => 'none',
							'css'     => array(
								array(
									'property' => 'text-decoration',
									'selector' => '.nav--main > .menu-item > a',
								)
							)
						),
					)
				),

				'content_typography_section' => array(
					'title'   => esc_html__( 'Body', 'rosa' ),
					'options' => array(
						'google_body_font' => array(
							'type'             => 'typography',
							'label'            => esc_html__( 'Body', 'rosa' ),
							'desc'             => esc_html__( 'Font for content and widget text.', 'rosa' ),
							'default'          => array( 'Cabin' ),
							'recommended'      => array(
								'Cabin',
								'Source Sans Pro',
								'Herr Von Muellerhoff',
							),
							'selector'         => 'html, .wp-caption-text, .small-link,	.post-nav-link__label, .author__social-link,
									.comment__links, .score__desc',
							'load_all_weights' => true,
						),
						'body-font-size'   => array(
							'type'        => 'range',
							'label'       => esc_html__( 'Font Size', 'rosa' ),
							'live'        => true,
							'default'     => 16,
							'input_attrs' => array(
								'min'          => 8,
								'max'          => 72,
								'step'         => 1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'font-size',
									'selector' => 'body',
									'unit'     => 'px',
								)
							)
						),
						'body-line-height' => array(
							'type'        => 'range',
							'label'       => esc_html__( 'Line Height', 'rosa' ),
							'live'        => true,
							'default'     => '1.7',
							'input_attrs' => array(
								'min'          => 0,
								'max'          => 3,
								'step'         => 0.1,
								'data-preview' => true
							),
							'css'         => array(
								array(
									'property' => 'line-height',
									'selector' => 'body',
								)
							)
						),
					)
				),
			)
		);

		/**
		 * FONTS - This section will handle different elements fonts (eg. headings, body)
		 */


		/**
		 * Check if WooCommerce is active
		 **/
		if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {

			$config['panels']['theme_options']['sections']['woocommerce'] = array(
				'title'   => esc_html__( 'WooCommerce', 'rosa' ),
				'options' => array(
					'divider_title_962836192'    => array(
						'type' => 'html',
						'html' => '<span class="separator label">' . esc_html__( 'WooCommerce Support', 'rosa' ) . '</span>'
					),
					'enable_woocommerce_support' => array(
						'type'    => 'checkbox',
						'label'   => __( 'Enable WooCommerce Support', 'rosa' ),
						'desc'    => esc_html__( 'Turn this off to avoid loading the WooCommerce assets (CSS and JS).', 'rosa' ),
						'default' => 1,
					),
					'show_cart_menu'             => array(
						'type'    => 'checkbox',
						'label'   => esc_html__( 'Show cart menu in main navigation', 'rosa' ),
						'default' => 1,
					),
				)
			);
		}

		return $config;
	}
}
add_filter( 'customify_filter_fields', 'add_customify_rosa_options', 11 );

function rosa_range_negative_value( $value, $selector, $property, $unit ) {

	$output = $selector . '{
		' . $property . ': -' . $value . '' . $unit . ";\n" . "}\n";

	return $output;
}

function rosa_transparent_color($value, $selector, $property, $unit ) {
    if ( empty( $unit ) ) {
        $unit = '20';
    }

    $output = $selector . ' {' .
        $property . ': ' . $value . $unit . ';' .
        '}';
    return $output;
}

function rosa_transparent_color_customizer_preview() {

    $js = "
    
    function makeSafeForCSS(name) {
        return name.replace(/[^a-z0-9]/g, function(s) {
            var c = s.charCodeAt(0);
            if (c == 32) return '-';
            if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
            return '__' + ('000' + c.toString(16)).slice(-4);
        });
    }
    
    String.prototype.hashCode = function() {
        var hash = 0, i, chr;
        
        if ( this.length === 0 ) return hash;
        
        for (i = 0; i < this.length; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    
function rosa_transparent_color( value, selector, property, unit ) {

    var css = '',
        id = 'rosa_transparent_color_style_tag_' + makeSafeForCSS( property + selector ).hashCode(),
        style = document.getElementById( id ),
        head = document.head || document.getElementsByTagName('head')[0];
        
    if ( typeof unit !== 'string' ) {
        unit = '20';
    }

    css += selector + ' {' + property + ': ' + value.substring(0,7) + unit + ';}';
    
    if ( style !== null ) {
        style.innerHTML = css;
    } else {
        style = document.createElement('style');
        style.setAttribute('id', id);

        style.type = 'text/css';
        if ( style.styleSheet ) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }
}" . PHP_EOL;
    wp_add_inline_script( 'customify-previewer-scripts', $js );
}
add_action( 'customize_preview_init', 'rosa_transparent_color_customizer_preview', 20 );

function rosa_footer_style_select( $value, $selector, $property, $unit ) {
	$waves_fill_color = THEME_DARK_TERTIARY;

	switch ( $value ) {
		case 'light' :
			$waves_fill_color = THEME_LIGHT_PRIMARY;
			break;
		case 'dark' :
			$waves_fill_color = THEME_DARK_TERTIARY;
			break;
		case 'accent' :
			$waves_fill_color = '#' . pixelgrade_option( 'main-color' );
			break;

	}

	$output = $selector . '{
		' . $property . ': url("data:image/svg+xml;utf8,<svg version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 19 14\' width=\'19\' height=\'14\' enable-background=\'new 0 0 19 14\' xml:space=\'preserve\' preserveAspectRatio=\'none slice\'><g><path fill=\'' . $waves_fill_color . '\' d=\'M0,0c4,0,6.5,5.9,9.5,5.9S15,0,19,0v7H0V0z\'/><path fill=\'' . $waves_fill_color . '\' d=\'M19,14c-4,0-6.5-5.9-9.5-5.9S4,14,0,14l0-7h19V14z\'/></g></svg>");' . "}\n";

	return $output;
}

// some conversions to customify
function convert_redux_options_to_customify() {

	$current_options = get_option( 'rosa_options' );

	if ( is_array( $current_options['main_logo_light'] ) && isset( $current_options['main_logo_light']['id'] ) ) {
		$current_options['main_logo_light'] = $current_options['main_logo_light']['id'];
	}

	if ( is_array( $current_options['main_logo_dark'] ) && isset( $current_options['main_logo_dark']['id'] ) ) {
		$current_options['main_logo_dark'] = $current_options['main_logo_dark']['id'];
	}

	if ( isset( $current_options['custom_css'] ) && ! empty( $current_options['custom_css'] ) ) {
		update_option( 'live_css_edit', trim( $current_options['custom_css'] ) );
	}

	if ( isset( $current_options['custom_js'] ) && ! empty( $current_options['custom_js'] ) ) {
		$current_options['custom_js'] = trim( $current_options['custom_js'] );
	}

	if ( isset( $current_options['custom_js_footer'] ) && ! empty( $current_options['custom_js_footer'] ) ) {
		$current_options['custom_js_footer'] = trim( $current_options['custom_js_footer'] );
	}

	update_option( 'rosa_options', $current_options );

	rosa_convert_social_links();

	rosa_migrate_gmap_page_general_metas();

	update_option( 'convert_options_to_customify', 1 );

	//	header( 'Location: ' . admin_url() . 'customize.php?save_customizer_once=true' );
	//	die();
}

$once = get_option( 'convert_options_to_customify' );
if ( empty( $once ) ) {
	add_action( 'init', 'convert_redux_options_to_customify' );
}

function rosa_convert_social_links() {
	$current_options = get_option( 'rosa_options' );

	if ( ! isset( $current_options['social_icons'] ) ) {
		return;
	}

	$target       = '';
	$header_links = array();
	$widget_links = array();
	$social_links = $current_options['social_icons'];

	if ( isset( $current_options['social_icons_target_blank'] ) && $current_options['social_icons_target_blank'] ) {
		$target = '_blank';
	}

	if ( ! empty( $social_links ) ) {
		foreach ( $social_links as $key => $link ) {

			if ( empty( $link['value'] ) || empty( $link['checkboxes'] ) ) {
				continue;
			}

			$checkboxes = $link['checkboxes'];

			if ( isset( $checkboxes['header'] ) ) {
				$header_links[ $key ] = $link['value'];
			}

			if ( isset( $checkboxes['widget'] ) ) {
				$widget_links[ $key ] = $link['value'];
			}
		}
	}

	if ( ! empty( $header_links ) ) {
		// create a widget menu and import links

		$menu_id = wp_create_nav_menu( 'Social Links' );
		//then get the menu object by its name
		$menu = get_term_by( 'name', 'Social Links', 'nav_menu' );

		foreach ( $header_links as $key => $link ) {
			//then add the actuall link/ menu item and you do this for each item you want to add
			wp_update_nav_menu_item( $menu->term_id, 0, array(
					'menu-item-title'  => $key,
					'menu-item-url'    => $link,
					'menu-item-status' => 'publish',
					'menu-item-target' => $target
				)
			);
		}
		//then you set the wanted theme  location
		$locations                = get_theme_mod( 'nav_menu_locations' );
		$locations['social_menu'] = $menu->term_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}

	if ( ! empty( $widget_links ) ) {
		// create a widget menu and import links

		$menu_id = wp_create_nav_menu( 'Widget Social Links' );
		//then get the menu object by its name
		$menu = get_term_by( 'name', 'Widget Social Links', 'nav_menu' );

		foreach ( $widget_links as $key => $link ) {
			//then add the actuall link/ menu item and you do this for each item you want to add
			wp_update_nav_menu_item( $menu->term_id, 0, array(
					'menu-item-title'  => $key,
					'menu-item-url'    => $link,
					'menu-item-status' => 'publish',
					'menu-item-target' => $target
				)
			);
		}
		//then you set the wanted theme  location
//		$locations                = get_theme_mod( 'nav_menu_locations' );
//		$locations['widget_social_menu'] = $menu->term_id;
//		set_theme_mod( 'nav_menu_locations', $locations );
	}

	unset( $current_options['social_icons'] );
	// save the new options
	update_option( 'rosa_options', $current_options );
}

//Move the meta data from the gmap specific metas to the general ones (they have their own separate meta box shown on all pages)
function rosa_migrate_gmap_page_general_metas() {
	$pages = get_pages( array(
		'meta_key'   => '_wp_page_template',
		'meta_value' => 'page-templates/contact.php'
	) );
	foreach ( $pages as $page ) {
		//handle the header_transparent_menu_bar_contact meta
		$old_meta = get_post_meta( $page->ID, wpgrade::prefix() . 'header_transparent_menu_bar_contact', true );
		if ( ! empty( $old_meta ) ) {
			update_post_meta( $page->ID, wpgrade::prefix() . 'header_transparent_menu_bar', $old_meta );
			delete_post_meta( $page->ID, wpgrade::prefix() . 'header_transparent_menu_bar_contact' );
		}

		//handle the border_style meta
		$old_meta = get_post_meta( $page->ID, wpgrade::prefix() . 'gmap_border_style', true );
		if ( ! empty( $old_meta ) ) {
			update_post_meta( $page->ID, wpgrade::prefix() . 'page_border_style', $old_meta );
			delete_post_meta( $page->ID, wpgrade::prefix() . 'gmap_border_style' );
		}
	}
}

function rosa_add_customify_style_manager_section ( $options ) {
    if( ! current_theme_supports('customizer_style_manager') ) {
        return $options;
    }

    if( ! isset( $options['sections']['style_manager_section'] ) ) {
        $options['sections']['style_manager_section'] = array();
    }

    $options['sections']['style_manager_section'] = array_replace_recursive(  $options['sections']['style_manager_section'], array(
    	'priority' => -1,
        'options' => array(
            'sm_color_primary' => array(
                'default' => THEME_COLOR_PRIMARY,
                'connected_fields' => array(
                    'main_color',
                    'footer_accent_color',
                    'footer_widget_area_accent_color'
                ),
                'css' => array(
	                array(
		                'property' => 'background-color',
		                'selector' => '
		                    .article__header[class] .article__headline .headline__description .btn:hover,
		                    .article__header[class] .article__headline .headline__description .btn:active,
		                    .article__header[class] .article__headline .headline__description .btn:focus'
	                ),
                ),
            ),
            'sm_color_secondary' => array(
            	'default' => THEME_COLOR_SECONDARY,
            ),
            'sm_color_tertiary' => array(
            	'default' => THEME_COLOR_TERTIARY,
            ),
            'sm_dark_primary' => array(
	            'default' => THEME_DARK_PRIMARY,
                'connected_fields' => array(
	                'footer_background_color',
	                'mobile_navigation_background_color',
	                'headings_color',
	                'navlink_color',
                ),
	            'css' => array(
	            	array(
	                    'property' => 'color',
			            'selector' => '.article__header .article__headline .headline__description .btn'
		            ),
	            ),
            ),
            'sm_dark_secondary' => array(
	            'default' => THEME_DARK_SECONDARY,
                'connected_fields' => array(
	                'text_color',
                ),
            ),
            'sm_dark_tertiary' => array(
                'default' => THEME_DARK_TERTIARY,
                'connected_fields' => array(
	                'footer_widget_area_background_color',
	            ),
            ),
            'sm_light_primary' => array(
                'default' => THEME_LIGHT_PRIMARY,
                'connected_fields' => array(
                    'header_background_color',
                    'content_background_color',
                    'footer_widget_area_text_color',
                    'footer_text_color',
                ),
                'css' => array(
	                array(
		                'property' => 'color',
		                'selector' => '
		                    .article__header .article__headline .headline__primary, 
		                    .article__header .article__headline .headline__description > *:not(.star):not(.separator--flower):not(.btn),
		                    .header--transparent .nav--main a,
		                    .header--transparent .nav--main .shop-menu-item__price'
	                ),
	                array(
		                'property' => 'background-color',
		                'selector' => '
		                    .article__header .article__headline .headline__description .btn,
		                    .site-header .nav-trigger .nav-icon,
                            .site-header .nav-trigger .nav-icon:before,
                            .site-header .nav-trigger .nav-icon:after'
	                ),
                ),
            ),
            'sm_light_secondary' => array(
            	'default' => THEME_LIGHT_SECONDARY,
	            'connected_fields' => array(
		            'mobile_navigation_color'
	            ),
            ),
            'sm_light_tertiary' => array(
            	'default' => THEME_LIGHT_TERTIARY
            ),
        ),
    ) );

    return $options;
}

add_filter('customify_filter_fields', 'rosa_add_customify_style_manager_section', 12, 1);

function rosa_add_default_color_palette( $color_palettes ) {

	$color_palettes = array_merge(array(
		'default' => array(
			'label' => 'Default',
			'preview' => array(
				'background_image_url' => 'https://cloud.pixelgrade.com/wp-content/uploads/2018/07/rosa-palette.jpg',
			),
			'options' => array(
				'sm_color_primary' => THEME_COLOR_PRIMARY,
				'sm_color_secondary' => THEME_COLOR_PRIMARY,
				'sm_color_tertiary' => THEME_COLOR_PRIMARY,
				'sm_dark_primary' => THEME_DARK_PRIMARY,
				'sm_dark_secondary' => THEME_DARK_SECONDARY,
				'sm_dark_tertiary' => THEME_DARK_TERTIARY,
				'sm_light_primary' => THEME_LIGHT_PRIMARY,
				'sm_light_secondary' => THEME_LIGHT_SECONDARY,
				'sm_light_tertiary' => THEME_LIGHT_TERTIARY,
			),
		),
	), $color_palettes);

	return $color_palettes;
}
add_filter( 'customify_get_color_palettes', 'rosa_add_default_color_palette' );
