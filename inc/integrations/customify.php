<?php
/**
 * Rosa Lite Customizer Options Config
 *
 * @package Rosa Lite
 */
/**
 * Hook into the Customify's fields and settings.
 *
 * The config can turn to be complex so is best to visit:
 * https://github.com/pixelgrade/customify
 *
 * @param array $options Contains the plugin's options array right before they are used, so edit with care
 *
 * @return array The returned options are required, if you don't need options return an empty array
 */

add_filter( 'customify_filter_fields', 'rosa_lite_add_customify_options', 11, 1 );
add_filter( 'customify_filter_fields', 'rosa_lite_add_customify_style_manager_section', 12, 1 );

add_filter( 'customify_filter_fields', 'rosa_lite_fill_customify_options', 20 );

add_filter( 'customify_get_color_palettes', 'rosa_lite_add_default_color_palette' );

define( 'ROSA_LITE_SM_COLOR_PRIMARY', '#C59D5F' );
define( 'ROSA_LITE_SM_COLOR_SECONDARY', '#BBB36C' );
define( 'ROSA_LITE_SM_COLOR_TERTIARY', '#7C8365' );

define( 'ROSA_LITE_SM_DARK_PRIMARY', '#252525' );
define( 'ROSA_LITE_SM_DARK_SECONDARY', '#515151' );
define( 'ROSA_LITE_SM_DARK_TERTIARY', '#121212' );

define( 'ROSA_LITE_SM_LIGHT_PRIMARY', '#FFFFFF' );
define( 'ROSA_LITE_SM_LIGHT_SECONDARY', '#CCCCCC' );
define( 'ROSA_LITE_SM_LIGHT_TERTIARY', '#EEEEEE' );

function rosa_lite_add_customify_options( $options ) {
	$options['opt-name'] = 'rosa_options';

	$options['sections'] = array();

	return $options;
}

function rosa_lite_add_customify_style_manager_section( $options ) {
	// If the theme hasn't declared support for style manager, bail.
	if ( ! current_theme_supports( 'customizer_style_manager' ) ) {
		return $options;
	}

	if ( ! isset( $options['sections']['style_manager_section'] ) ) {
		$options['sections']['style_manager_section'] = array();
	}

	$new_config = array(
		'options'  => array(
			'sm_color_primary'   => array(
				'default'          => ROSA_LITE_SM_COLOR_PRIMARY,
				'connected_fields' => array(
					'main_color',
					'footer_accent_color',
					'links_color',
					'footer_widget_area_accent_color'
				),
				'css'              => array(
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
				'default' => ROSA_LITE_SM_COLOR_SECONDARY,
			),
			'sm_color_tertiary'  => array(
				'default' => ROSA_LITE_SM_COLOR_TERTIARY,
			),
			'sm_dark_primary'    => array(
				'default'          => ROSA_LITE_SM_DARK_PRIMARY,
				'connected_fields' => array(
					'mobile_navigation_background_color',
					'footer_background_color',
					'headings_color',
					'buttons_color',
					'navlink_color',
				),
				'css'              => array(
					array(
						'property' => 'color',
						'selector' => '.article__header .article__headline .headline__description .btn'
					),
					array(
						'property' => 'background-color',
						'selector' => '.c-hero__background'
					),
				),
			),
			'sm_dark_secondary'  => array(
				'default'          => ROSA_LITE_SM_DARK_SECONDARY,
				'connected_fields' => array(
					'text_color',
				),
			),
			'sm_dark_tertiary'   => array(
				'default'          => ROSA_LITE_SM_DARK_TERTIARY,
				'connected_fields' => array(
					'footer_widget_area_background_color',
				),
			),
			'sm_light_primary'   => array(
				'default'          => ROSA_LITE_SM_LIGHT_PRIMARY,
				'connected_fields' => array(
					'header_background_color',
					'content_background_color',
					'footer_widget_area_text_color',
					'footer_text_color',
				),
				'css'              => array(
					array(
						'property' => 'color',
						'selector' => '
		                    .article__header .article__headline .headline__primary, 
		                    .article__header .article__headline .headline__description > *:not(.star):not(.separator--flower):not(.btn),
		                    .header--transparent .nav--main a,
		                    .header--transparent .nav--main .shop-menu-item__price,
		                    .cart-link'
					),
					array(
						'property' => 'border-color',
						'selector' => '.header--transparent .menu-item-has-children:after,
                                       .header--transparent .menu-item-language:after'
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
				'default'          => ROSA_LITE_SM_LIGHT_SECONDARY,
				'connected_fields' => array(
					'mobile_navigation_color'
				),
			),
			'sm_light_tertiary'  => array(
				'default' => ROSA_LITE_SM_LIGHT_TERTIARY
			),
		),
	);

	// The section might be already defined, thus we merge, not replace the entire section config.
	if ( class_exists( 'Customify_Array' ) && method_exists( 'Customify_Array', 'array_merge_recursive_distinct' ) ) {
		$options['sections']['style_manager_section'] = Customify_Array::array_merge_recursive_distinct( $options['sections']['style_manager_section'], $new_config );
	} else {
		$options['sections']['style_manager_section'] = array_merge_recursive( $options['sections']['style_manager_section'], $new_config );
	}

	return $options;
}

function rosa_lite_fill_customify_options( $options ) {
	$new_config = array(
		'colors_section' => array(
			'title'       => '',
			'type'  => 'hidden',
			'options'     => array(
				'main_color'                          => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_COLOR_PRIMARY,
					'css'     => array(
						array(
							'property' => 'color',
							'selector' => '.separator--line-flower > .star,
                                                header.c-hero.article__header .article__headline .headline__description div.star,
                                                header.c-hero .article__headline .headline__description div.separator.separator--flower,
                                                .headline__secondary,
                                                
                                                .single-product .entry-summary .price ins span,
                                                .single-product .entry-summary .price del span,
                                                .single-product .entry-summary .price del,
                                                .single-product .entry-summary .price span,
                                                
                                                .btn--text.wpcf7-form-control.wpcf7-submit,
                                                .wpcf7-form-control.wpcf7-submit.read-more-button,
                                                 
                                                .btn--text.otreservations-submit,
                                                .otreservations-submit,
                                                 
                                                .widget_tag_cloud a.btn--text,
                                                .widget_tag_cloud a.read-more-button,
                                                .sidebar--main .widget a:hover,
                                                .sidebar--main .widget .tagcloud a:hover,
                                                .widget .tagcloud a:hover,
                                                 
                                                blockquote,
                                                
                                                .is-today .pika-button,
                                                
                                                body.woocommerce .star-rating span:before',
						),
						array(
							'property' => 'background-color',
							'selector' => '.btn--primary,
								                .btn:not(.btn--primary):not(.btn--tertiary):hover,
								                .btn.btn--secondary:hover,
								                .comments_add-comment,
                                                .form-submit #comment-submit,
								                
                                                .shop-menu-item .shop-items-number,
                                                
                                                .wpcf7-form-control.wpcf7-submit:hover,
                                                form.shipping_calculator button.button:hover,
                                                
                                                .pagination li a:hover,
                                                .pagination .nav-links .page-numbers:not(.current):hover,
                                                .pagination .nav-links .page-numbers.prev:not(.disabled):hover,
                                                .pagination .nav-links .page-numbers.next:not(.disabled):hover,
                                                
                                                .otreservations-submit:hover,
                                                
                                                .pixcode.pixcode--icon.square:hover,
                                                .pixcode.pixcode--icon.circle:hover,
                                                
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
                                                div.woocommerce-checkout-payment button.button.alt[name="woocommerce_checkout_place_order"]:hover,
                                                .cart-count'
						),
						array(
							'property'        => 'background-color',
							'unit'            => '88',
							'selector'        => '.select2-container--default .select2-results__option[data-selected=true]',
							'callback_filter' => 'rosa_lite_transparent_color'
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
							'selector' => 'blockquote,
                                                .menu-list__item-highlight-wrapper:before'

						),
						array(
							'property' => 'outline-color',
							'selector' => 'select:focus,
								                textarea:focus,
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
						array(
							'property' => 'color',
							'selector' => '.c-hero__map',
							'callback_filter' => 'rosa_lite_map_color',
						),
					),
				),
				'links_color'                         => array(
					'type'    => 'hidden_control',
					'default' => ROSA_LITE_SM_COLOR_PRIMARY,
					'live'    => true,
					'css'     => array(
						array(
							'property' => 'color',
							'selector' => 'a,
                                                a:hover,
                                                
                                                .article__content a:not([class]),
                                                .article__content a:not([class]):hover,
                                                
                                                .site-header.headroom--top a.site-logo--text:hover,
                                                .site-header.headroom--not-top a.site-logo--text:hover,
                                                
                                                .nav--main a:hover,
                                                .headroom--not-top .nav--main a:hover,
                                                
                                                a.pixcode-icon-link:hover > .pixcode--icon,
                                                
                                                .headroom--not-top .nav.nav--items-social a:hover:before,
                                                .sidebar--main .widget [class*="social"] > ul a:hover:before,
                                                .widget [class*="social"] > ul a:hover:before,
                                                
                                                .shop-categories a.active,
                                                body.woocommerce ul.products li.product .product__button,
                                                body.woocommerce ul.products li.product .added_to_cart,
                                                body.woocommerce ul.products li.product a.added_to_cart,
                                                body.woocommerce ul.products li.product .price ins,
                                                .woocommerce ul.products li.product .price del,
                                                .woocommerce .product .price,
                                                .woocommerce ul.products li.product:hover .product__button,
                                                
                                                .tabs__nav a:hover,
                                                .tabs__nav a.active,
                                                .tabs__nav a.current,
                                                
                                                .btn.btn--text,
                                                .read-more-button,
                                                
                                                .meta-list .form-submit a#comment-submit:hover,
                                                .form-submit .meta-list a#comment-submit:hover,
                                                .form-submit .btn--text#comment-submit,
                                                .form-submit #comment-submit.read-more-button,
                                                
                                                .comment-reply-link,
                                                
                                                .woocommerce-account .woocommerce-MyAccount-navigation li a:hover,
                                                .woocommerce-account .woocommerce-MyAccount-navigation li.is-active a,
                                                .comment__author-name a:hover,
                                                
                                                .meta-list a.btn:hover,
                                                .meta-list a.wpcf7-form-control.wpcf7-submit:hover,
                                                .meta-list a.otreservations-submit:hover,
                                                .meta-list .widget_tag_cloud a:hover,
                                                .widget_tag_cloud .meta-list a:hover,
                                                
                                                .single-post .article__content a:not([class]),
                                                .single-post .article__content a:not([class]):hover',
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
                                                
                                                .article__content a:not([class]),
                                                
                                                .shop-categories a.active,
                                                body.woocommerce ul.products li.product .product__button,
                                                body.woocommerce ul.products li.product .added_to_cart,
                                                
                                                .woocommerce-account .woocommerce-MyAccount-navigation li a:hover,
                                                .woocommerce-account .woocommerce-MyAccount-navigation li.is-active a,
                                                .woocommerce ul.products li.product:hover .product__button,
                                                
                                                .pagination .nav-links .page-numbers.current',
						),
						array(
							'property' => 'background-color',
							'selector' => 'a.pixcode-icon-link:hover > .pixcode.pixcode--icon.square,
                                                a.pixcode-icon-link:hover > .pixcode.pixcode--icon.circle',
						),
					),
				),
				'buttons_color'                       => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_DARK_PRIMARY,
					'css'     => array(
						array(
							'property' => 'background-color',
							'selector' => '.btn:not(.btn--primary),
                                                .btn--secondary,
                                                .btn--tertiary,
                                                .add-comment .add-comment__button',
						),
						array(
							'property' => 'color',
							'selector' => '.btn.btn--text:hover,
                                                .tabs__nav a',
						),
						array (
							'property' => 'border-color',
							'selector' => '.btn.btn--text:hover'
						),
					),
				),
				'text_color'                          => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_DARK_SECONDARY,
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
							'property'   => 'fill',
							'selector'  => '.search-submit svg path'
						),
						array(
							'property'        => 'color',
							'unit'            => '20',
							'selector'        => '.comment-form-comment:before',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property'        => 'color',
							'unit'            => '37',
							'selector'        => '.separator--line-flower',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property'        => 'color',
							'unit'            => '8C',
							'selector'        => '.comment__content,
                                                .woocommerce ul.products li.product .product__cat',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property'        => 'background-color',
							'unit'            => '30',
							'selector'        => '.select2-container--default .select2-results__option--highlighted[aria-selected],
                                                .select2-container--default .select2-results__option--highlighted[data-selected],
                                                table tbody tr:nth-of-type(odd),
                                                .wp-caption-text,
                                                div.woocommerce-checkout-payment#payment',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property'        => 'background-color',
							'unit'            => '20',
							'selector'        => 'div.woocommerce-checkout-payment#payment',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property'        => 'border-color',
							'unit'            => '37',
							'selector'        => '.up-link:before,
								
                                                .categories__menu .dropdown__trigger,
                                                .categories__menu.active .dropdown__menu,
                                                .categories__menu.active .dropdown__menu:before,
                                                
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
                                                .woocommerce .woocommerce-billing-fields__field-wrapper input.input-text,
                                                .woocommerce .woocommerce-info,
                                                .woocommerce-checkout #payment ul.payment_methods,
                                                .woocommerce table.shop_table tbody th,
                                                .woocommerce table.shop_table tfoot th,
                                                .woocommerce table.shop_table tfoot td,
                                                form.checkout_coupon.woocommerce-form-coupon,
                                                form.checkout_coupon.woocommerce-form-coupon input[name="coupon_code"],
                                                form.checkout textarea[name="order_comments"],
                                                
                                                input.wpcf7-form-control.wpcf7-text.wpcf7-validates-as-required,
                                                input.wpcf7-form-control.wpcf7-text,
                                                textarea.wpcf7-form-control.wpcf7-textarea,
                                                
                                                .woocommerce .woocommerce-billing-fields__field-wrapper span.select2-selection.select2-selection--single,
                                                span.select2-dropdown.select2-dropdown--below,
                                                span.select2-dropdown.select2-dropdown--above,
                                                .select2-container--default .select2-search--dropdown .select2-search__field,
                                                
                                                .sidebar--main .widget',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
					),
				),
				'headings_color'                      => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_DARK_PRIMARY,
					'css'     => array(
						array(
							'property' => 'color',
							'selector' => 'h1, h2, h3, h4, h5, h6, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a,
												.article__title a, 
												.latest-comments__title a
								
								                .article-archive .article__title a,
								                .article-archive .article__title a:hover,
								                
								                .categories__menu .dropdown__trigger,
								                
								                .sidebar--main .widget a,
								                .icon-search:before,
								                .icon-envelope:before,
								                
								                .pixcode--icon,
								                
								                .input-group input.form-control,
								                .woocommerce .woocommerce-ordering select,
								                .woocommerce .woocommerce-breadcrumb a:hover'
						),
						array(
							'property'        => 'color',
							'unit'            => '88',
							'selector'        => '.woocommerce .woocommerce-breadcrumb,
								                .woocommerce .woocommerce-breadcrumb a',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property' => 'background-color',
							'selector' => '.comment-number--dark, 
                                                .comments-area-title .comment-number.total,
                                                .comments-area-title .total.comment-number--dark, 
                                                .comment-reply-title .comment-number.total, 
                                                .comment-reply-title .total.comment-number--dark,
												
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
                                                
                                                .wpcf7-form-control.wpcf7-submit,
                                                
                                                .pixcode.pixcode--icon.circle,
                                                .pixcode.pixcode--icon.square,
                                                
                                                form.checkout_coupon.woocommerce-form-coupon button[name="apply_coupon"],
                                                div.woocommerce-checkout-payment button.button.alt[name="woocommerce_checkout_place_order"]'
						),
						array(
							'property'        => 'background-color',
							'unit'            => '88',
							'selector'        => '.pagination .nav-links .page-numbers.prev.disabled,
                                                .pagination .nav-links .page-numbers.next.disabled',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property' => 'border-color',
							'selector' => 'div:not(.c-hero-layer) .pixcode-slider[data-arrows] .rsArrowIcn,
								                .categories__menu .dropdown__trigger:after'
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
				'navlink_color'                       => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_DARK_PRIMARY,
					'css'     => array(
						array(
							'property' => 'color',
							'selector' => '.nav--main a,
                                                
                                                .headroom--not-top .nav--main a,
                                                .headroom--not-top .nav--main .shop-menu-item__price,
                                                
                                                a.site-logo--text,
                                                .site-header.headroom--not-top a.site-logo--text,
                                                
                                                .read-more-button:hover,
                                                
                                                .woocommerce ul.products li.product:hover .product__button:hover,
                                                .nav--main .shop-menu-item__price,
                                                body:not(.header--transparent) .cart-link'
						),
						array(
							'property' => 'border-color',
							'selector' => '.headroom--not-top .menu-item.menu-item-has-children:after, 
								                .headroom--not-top .menu-item.menu-item-language:after,
								                
								                .read-more-button:hover,
								                
                                                .woocommerce ul.products li.product:hover .product__button:hover'
						),
						array(
							'property' => 'background-color',
							'selector' => 'body:not(.header--transparent) .nav-trigger .nav-icon,
                                                body:not(.header--transparent) .nav-trigger .nav-icon:before,
                                                body:not(.header--transparent) .nav-trigger .nav-icon:after,
                                                
                                                .btn--primary:hover,
                                                
                                                .comments_add-comment:hover,
                                                .form-submit #comment-submit:hover,
                                                .widget .tagcloud a'
						),
					)
				),
				'header_background_color'             => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_LIGHT_PRIMARY,
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
				'content_background_color'            => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_LIGHT_PRIMARY,
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
                                                
                                                a.pixcode-icon-link:hover > .pixcode.pixcode--icon.square,
                                                a.pixcode-icon-link:hover > .pixcode.pixcode--icon.circle,
                                                .pixcode.pixcode--icon.circle,
                                                .pixcode.pixcode--icon.square,
            
            
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
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property' => 'border-color',
							'selector' => '.site-header, 
								                .site-footer'
						),
						array(
							'property' => 'background-color',
							'selector' => 'html,
							body,
                                                body.mce-content-body,
                                                .page .article__content,
                                                .desc__content,
                                                 
                                                .up-link,
                                                 
                                                .menu-list__item-title .item_title,
                                                .menu-list__item-price,
                                                .categories__menu.active .dropdown__menu,
                                                
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
                                                input.wpcf7-form-control.wpcf7-text.wpcf7-validates-as-required,
                                                input.wpcf7-form-control.wpcf7-text,
                                                textarea.wpcf7-form-control.wpcf7-textarea,
                                                
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
				'footer_widget_area_accent_color'     => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_COLOR_PRIMARY,
					'css'     => array(
						array(
							'property' => 'color',
							'selector' => '.sidebar--footer a:hover,
                                                .sidebar--footer .widget [class*="social"] > ul a:hover:before',
						),
					),
				),
				'footer_widget_area_background_color' => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_DARK_TERTIARY,
					'css'     => array(
						array(
							'property' => 'background-color',
							'selector' => '.sidebar--footer__dark',
						),
						array(
							'property'        => 'background-color',
							'unit'            => '80',
							'selector'        => '.navigation--main .nav--main li.menu-item-has-children a:before',
							'media'           => 'only screen and (max-width: 899px)',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
					),
				),
				'footer_widget_area_text_color'       => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_LIGHT_PRIMARY,
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
				'footer_accent_color'                 => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_COLOR_PRIMARY,
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
				'footer_background_color'             => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_DARK_PRIMARY,
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
				'footer_text_color'                   => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_LIGHT_PRIMARY,
					'css'     => array(
						array(
							'property'        => 'color',
							'unit'            => '91',
							'selector'        => '.copyright-area',
							'callback_filter' => 'rosa_lite_transparent_color',
						),
					),
				),
				'mobile_navigation_color'     => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_LIGHT_SECONDARY,
					'css'     => array(
						array(
							'property' => 'color',
							'selector' => '.navigation--main .nav--main li a,
		                                        .shop-menu-item .shop-menu-item__price',
							'media' => 'only screen and (max-width: 899px)'
						),
						array(
							'property' => 'border-color',
							'unit' => '30',
							'selector' => '.navigation--main .nav--main',
							'media' => 'only screen and (max-width: 899px) ',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
						array(
							'property' => 'background-color',
							'unit' => '19',
							'selector' => '.widget_shopping_cart_content',
							'media' => 'only screen and (max-width: 899px)  ',
							'callback_filter' => 'rosa_lite_transparent_color'
						),
					),
				),
				'mobile_navigation_background_color'     => array(
					'type'    => 'hidden_control',
					'live'    => true,
					'default' => ROSA_LITE_SM_DARK_PRIMARY,
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
	);

	if ( class_exists( 'Customify_Array' ) && method_exists( 'Customify_Array', 'array_merge_recursive_distinct' ) ) {
		$options['sections'] = Customify_Array::array_merge_recursive_distinct( $options['sections'], $new_config );
	} else {
		$options['sections'] = array_merge_recursive( $options['sections'], $new_config );
	}

	return $options;
}

function rosa_lite_add_default_color_palette( $color_palettes ) {

	$color_palettes = array_merge( array(
		'default' => array(
			'label'   => 'Default',
			'preview' => array(
				'background_image_url' => 'https://cloud.pixelgrade.com/wp-content/uploads/2018/07/rosa-palette.jpg',
			),
			'options' => array(
				'sm_color_primary'   => ROSA_LITE_SM_COLOR_PRIMARY,
				'sm_color_secondary' => ROSA_LITE_SM_COLOR_SECONDARY,
				'sm_color_tertiary'  => ROSA_LITE_SM_COLOR_TERTIARY,
				'sm_dark_primary'    => ROSA_LITE_SM_DARK_PRIMARY,
				'sm_dark_secondary'  => ROSA_LITE_SM_DARK_SECONDARY,
				'sm_dark_tertiary'   => ROSA_LITE_SM_DARK_TERTIARY,
				'sm_light_primary'   => ROSA_LITE_SM_LIGHT_PRIMARY,
				'sm_light_secondary' => ROSA_LITE_SM_LIGHT_SECONDARY,
				'sm_light_tertiary'  => ROSA_LITE_SM_LIGHT_TERTIARY,
			),
		),
	), $color_palettes );

	return $color_palettes;
}

function rosa_lite_transparent_color( $value, $selector, $property, $unit ) {
	if ( empty( $unit ) ) {
		$unit = '20';
	}

	$output = $selector . ' {' .
	          $property . ': ' . $value . $unit . ';' .
	          '}';

	return $output;
}

function rosa_lite_transparent_color_customizer_preview() {

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
    
function rosa_lite_transparent_color( value, selector, property, unit ) {

    var css = '',
        id = 'rosa_lite_transparent_color_style_tag_' + makeSafeForCSS( property + selector ).hashCode(),
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

add_action( 'customize_preview_init', 'rosa_lite_transparent_color_customizer_preview', 20 );

function rosa_lite_map_color( $value, $selector, $property, $unit ) {
	$output = $selector . ' {' .
	          $property . ': ' . $value . $unit . ';' .
	          '}';

	return $output;
}

function rosa_lite_map_color_customizer_preview() {

	$js = "
	
	function rosa_lite_map_color( value, selector, property, unit ) {
		jQuery( window.document.body ).trigger( 'rosa:update-map-color', value );
	}" . PHP_EOL;

	wp_add_inline_script( 'customify-previewer-scripts', $js );
}

add_action( 'customize_preview_init', 'rosa_lite_map_color_customizer_preview', 20 );
