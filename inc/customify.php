<?php


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
							'default'           => esc_html__( '2014 &copy; Handcrafted with love by', 'rosa' ) . ' <a href="#">PixelGrade</a> Team',
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

				'import_demo_data' => array(
					'title'       => esc_html__( 'Demo Data', 'rosa' ),
					'priority'    => 999999,
					'description' => esc_html__( 'If you would like to have a "ready to go" website as the Rosa\'s demo site, this is the button', 'rosa' ),
					'options'     => array(
						'import_demodata_button' => array(
							'title' => 'Import',
							'type'  => 'html',
							'html'  => '<input type="hidden" name="wpGrade-nonce-import-posts-pages" value="' . wp_create_nonce( 'wpGrade_nonce_import_demo_posts_pages' ) . '" />
								<input type="hidden" name="wpGrade-nonce-import-theme-options" value="' . wp_create_nonce( 'wpGrade_nonce_import_demo_theme_options' ) . '" />
								<input type="hidden" name="wpGrade-nonce-import-widgets" value="' . wp_create_nonce( 'wpGrade_nonce_import_demo_widgets' ) . '" />
								<input type="hidden" name="wpGrade_import_ajax_url" value="' . admin_url( "admin-ajax.php" ) . '" />' . '<span class="description customize-control-description"><p>' . esc_html__( '*Note: We cannot serve you the original images due to their license and copyright.', 'rosa' ) . '</p> <a href="#" class="button button-primary" id="wpGrade_import_demodata_button" style="width: 70%; text-align: center; padding: 10px; display: inline-block; height: auto;  margin: 0 15% 10% 15%;">' . __( 'Import demo data', 'rosa' ) . '
									</a>' .

							           '<div class="wpGrade-loading-wrap hidden">
									<span class="wpGrade-loading wpGrade-import-loading"></span>
									<div class="wpGrade-import-wait">' . esc_html__( 'Please wait a few minutes (between 1 and 3 minutes usually, but depending on your hosting it can take longer) and ', 'rosa' ) . '<strong>' . esc_html__( 'don\'t reload the page', 'rosa' ) . '</strong>.' . esc_html__( 'You will be notified as soon as the import has finished!', 'rosa' ) . '
									</div>
								</div>

								<div class="wpGrade-import-results hidden"></div>
								<div class="hr"><div class="inner"><span>&nbsp;</span></div></div>'
						)
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
						'default' => '#c59d5f',
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => 'a, a:hover, .nav--main a:hover, .headroom--not-top .nav--main a:hover, .headline__secondary, .separator--line-flower,
									.tabs__nav a.current, .tabs__nav a:hover, .btn.btn--text, .btn--text.comments_add-comment, .headroom--not-top .nav.nav--items-social a:hover:before,
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
									.single-product .entry-summary .price span, body.woocommerce .star-rating span:before, .comment-reply-link,
									.nav.nav--items-social a:hover:before, .sidebar--main .widget [class*="social"] > ul a:hover:before, .widget [class*=\'social\'] > ul a:hover:before,
									.site-footer .separator--flower,
									.woocommerce-account .woocommerce-MyAccount-navigation li a:hover,
									.woocommerce-account .woocommerce-MyAccount-navigation li.is-active a',
							),
							array(
								'property' => 'background-color',
								'selector' => '.btn--primary, .shop-menu-item .shop-items-number, .comments_add-comment, .form-submit #comment-submit, .btn:hover, .wpcf7-form-control.wpcf7-submit:hover,
								.pagination li a:hover, form.shipping_calculator button.button:hover, .otreservations-submit:hover, .pixcode--icon.square:hover, .pixcode--icon.circle:hover,
								.sidebar--footer__accent, .copyright-area.copyright-area__accent, .menu-list__item-highlight-title,
								.promo-box__container'
							),
							array(
								'property' => 'background',
								'selector' => 'body.woocommerce button.button.alt:hover, body.woocommerce-page #respond input#submit:hover,
								body.woocommerce div.woocommerce-message .button:hover, td.actions input.button:hover, body.woocommerce-page input.button:hover,
								body.woocommerce-page input.button.alt:hover, a:hover > .pixcode--icon.circle, a:hover > .pixcode--icon.square'
							),
							array(
								'property' => 'border-color',
								'selector' => '.tabs__nav a.current, .tabs__nav a:hover, .btn.btn--text, .btn--text.comments_add-comment, .comments_add-comment.read-more-button,
								.form-submit .btn--text#comment-submit, .form-submit #comment-submit.read-more-button,
								.btn--text.wpcf7-form-control.wpcf7-submit, .wpcf7-form-control.wpcf7-submit.read-more-button,
								.btn--text.otreservations-submit, .otreservations-submit, .read-more-button,
								.widget_tag_cloud a.btn--text, .widget_tag_cloud a.read-more-button, .btn.read-more-button, blockquote, .article__content a:not([class]), .shop-categories a.active,
								body.woocommerce ul.products li.product .product__button, body.woocommerce ul.products li.product .added_to_cart, .menu-list__item-highlight-wrapper:before,
								.woocommerce-account .woocommerce-MyAccount-navigation li a:hover,
								.woocommerce-account .woocommerce-MyAccount-navigation li.is-active a'
							),
							array(
								'property' => 'outline-color',
								'selector' => 'select:focus, textarea:focus, input[type="text"]:focus,
								input[type="password"]:focus, input[type="datetime"]:focus,
								input[type="datetime-local"]:focus, input[type="date"]:focus,
								input[type="month"]:focus, input[type="time"]:focus, input[type="week"]:focus,
								input[type="number"]:focus, input[type="email"]:focus, input[type="url"]:focus,
								input[type="search"]:focus, input[type="tel"]:focus, input[type="color"]:focus, .form-control:focus'
							),
							array(
								'property' => 'fill',
								'selector' => '.copyright-area.copyright-area__accent svg path'
							)
						)
					),
					'text_color'     => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Text Color', 'rosa' ),
						'live'    => true,
						'default' => '#515150',
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => 'body, .up-link'
							),
							array(
								'property' => 'border-color',
								'selector' => '.up-link:before'
							)
						)
					),
					'headings_color' => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Headings Color', 'rosa' ),
						'live'    => true,
						'default' => '#262526',
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => 'h1, h2, h3, h4, h5, h6, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, .article-archive .article__title a, .article-archive .article__title a:hover',
							)
						)
					),
					'navlink_color'  => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Nav Links Color', 'rosa' ),
						'live'    => true,
						'default' => '#262526',
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => '.nav--main a,
												.headroom--not-top .nav--main a,
												.nav.nav--items-social a:before,
												.headroom--not-top .nav.nav--items-social a:before',
							)
						)
					),
					'cover_text'     => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Cover Color', 'rosa' ),
						'live'    => true,
						'default' => '#ffffff',
						'css'     => array(
							array(
								'property' => 'color',
								'selector' => '.article__header .article__headline .headline__primary,
								.article__header .article__headline .headline__description *',
							)
						)
					),

					'header_background_color' => array(
						'type'    => 'color',
						'label'   => esc_html__( 'Header Color', 'rosa' ),
						'live'    => true,
						'default' => '#ffffff',
						'css'     => array(
							array(
								'property' => 'background-color',
								'selector' => '.site-header, .site-header.headroom--not-top, .sub-menu, .headroom--not-top .sub-menu',
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
						'default' => '#ffffff',
						'css'     => array(
							array(
								'property' => 'border-color',
								'selector' => '.site-header, .site-footer'
							),
							array(
								'property' => 'background-color',
								'selector' => 'html, .page .article__content, .up-link, .menu-list__item-title .item_title, 
								.menu-list__item-price, .desc__content',
							)
						)
					),
					'container_image_pattern'  => array(
						'type'   => 'custom_background',
						'label'  => esc_html__( 'Header Background', 'rosa' ),
						'desc'   => esc_html__( 'Container background with image.', 'rosa' ),
						'output' => array( '.page .article__content' ),
					),

				)
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

function rosa_footer_style_select( $value, $selector, $property, $unit ) {
	$waves_fill_color = '#121212';

	switch ( $value ) {
		case 'light' :
			$waves_fill_color = '#ffffff';
			break;
		case 'dark' :
			$waves_fill_color = '#121212';
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