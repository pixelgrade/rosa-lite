/**
 * This file adds some LIVE to the Theme Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 */

(function (exports, $) {

	$(document).ready(function () {
		var api =  exports.customize;
		render_custom_customizer( true );

		//api.previewer.channel.bind( 'change', function() {
		//	render_custom_customizer( false );
		//});
	});

	 render_custom_customizer = function ( first_load ) {

		var api = exports.customize,
			controls = api.settings.controls,
			settings = api.settings.settings,
			render_delay = 100;

		 if ( first_load ) {
			 render_delay = 2000;
		 }

		setTimeout( function(){
			backgroundInit(first_load);
			typographyInit(first_load);
			spacingInit(first_load);
			removeEmptyLists(first_load);
		}, render_delay );

		// ensure panels close on color when picker is opened
		$('.wp-color-result').on('click', function(){
			closeAllPanles();
		});

		// iterate thtough all settings and pick up ours
//		$.each(controls, function (settingId, val) {
//
//			if (settingId.indexOf(theme_name) === -1) {
//				return;
//			}
//
//			var setting = settings[settingId],
//				type = val.type,
//				transport = setting.transport;
//
////			if ( type === 'color' && transport === 'postMessage'  ) {
////
////				api( settingId, function( setting ) {
////
////					setting.bind( function( to ){
////
////						var selector = $( '.article__title' );
////
////					});
////
//////					value.on('change', '#customize-control-heap_options-main_color .wp-color-picker', function( newval ) {
//////						console.log(newval);
//////						$( 'body .article--blog .article__categories a' ).css({color: '#111'} );
//////					} );
////				});
////			}
//		});

		// If the customizer has saved things remove the save confirmation confirm
		api.bind('saved', function () {
			window.onbeforeunload = null;
		});

		/**
		 * On Reset Styles click do an ajax request which will reset the style section.
		 */
		$(document).on('click', 'a#reset-style-defaults', function (ev) {
			ev.preventDefault();

			// Very important ASK the user to confirm the reset!
			if (!confirm(redux.args.reset_confirm)) {
				return false;
			} else {

				//let's reset the section style
				var _ajax_nonce = $(this).data('ajax_nonce') || '';
				console.log(_ajax_nonce);
				jQuery.ajax({
					type: "post",
					url: exports.ajax.settings.url,
					data: {action: 'reset_style_section', type: 'get', _ajax_nonce: _ajax_nonce},
					success: function (response) {
						location.reload();
					},
					error: function () {
						alert('This is wrong!');
					}
				});
			}
		});

	};

	function closeAllPanles() {
		$('.redux-field-container, .redux-typography-container, .dropdown-section-content').removeClass('active');
	}

	function backgroundInit(first_load) {
		var $bg_control = $('.customize-control-customizer_bg');
		$bg_control.each(function () {
			var _self = $(this),
				label = $(this).find('label'),
				upload = $(this).find('input.redux-background-input');

			$(this).prepend(label);

			if (upload.val()) {
				label.find('button').addClass('active')
			}
		});

		if ( ! first_load ) {
			return;
		}

		// Toggle the Background Container
		$(document).on('click', '.customize-control-customizer_bg .customize-control-title button', function (e) {
			e.stopPropagation();
			e.preventDefault();

			var the_container = $(this).closest($('.customize-control-customizer_bg')).find('.redux-field-container');
			// check if this is already opened
			var is_opened = the_container.hasClass('active');

			// ensure all other panels are closed
			closeAllPanles();
			// in case there is a color picker opened just close it
			$('.wp-color-picker').each(function(){
				$(this).parent().siblings('.wp-picker-open').trigger('click');
			} );

			if ( is_opened ) {
				closeAllPanles();
			} else {
				the_container.addClass('active');
			}
		});

		// Remove Icon Class '.active'
		$bg_control.on('click', '.button.remove-image', function () {
			$(this).closest($('.customize-control-customizer_bg')).find('button.active').removeClass('active');
		})
	}

	function typographyInit( first_load ) {
		var $typo_control = $('.customize-control-typography');
		$typo_control.each(function () {
			var _self = $(this),
				label = $(this).find('label'),
				upload = $(this).find('input.redux-background-input');

			// $(this).prepend(label);
			$(this).nextUntil('.customize-control-typography').each(function () {
				$(this).addClass('123').appendTo(_self.find('.redux-field-container .redux-typography-container'));
			});
		});

		if ( ! first_load ) {
			return;
		}

		// Toggle the Background Container
		$(document).on('click', '.customize-control-typography .customize-control-title button', function (e) {
			e.stopPropagation();
			e.preventDefault();

			var the_container = $(this).closest($('.customize-control-typography')).find('.redux-typography-container');
			// check if this is already opened
			var is_opened = the_container.hasClass('active');

			closeAllPanles();
			// in case there is a color picker opened just close it
			$('.wp-color-picker').each(function(){
				$(this).parent().siblings('.wp-picker-open').trigger('click');
			} );

			if ( is_opened ) {
				closeAllPanles();
			} else {
				the_container.addClass('active');
			}
		});
	}

	function spacingInit( first_load ) {

		$('.sizes_section').each(function(){
			var _self = $(this),
				_parent = $(this).closest('li').addClass('dropdown-section-trigger'),
				_container = _parent.parent().addClass('customize-dropdown-section'),
				label = $(this).parent(),
				upload = $(this).find('input.redux-background-input');

			// Add a container to handle the options
			$('<div class="dropdown-section-content"></div>').appendTo(_container);

			// Insert options into container
			_container.nextUntil('ul').each(function(){
				$(this).appendTo(_container.find('.dropdown-section-content'));
			});

			// // Clean up the title of the sections (eg. Sizes and Spacings)
			_container.first().prev().addClass('customize-dropdown-title');

		});

		if ( ! first_load ) {
			return;
		}

		// Toggle the DropDown Container
		$(document).on('click', '.customize-dropdown-section .dropdown-section-trigger', function (e) {
			e.stopPropagation();
			e.preventDefault();

			var the_container = $(this).next();
			// check if this is already opened
			var is_opened = the_container.hasClass('active');

			closeAllPanles();
			// in case there is a color picker opened just close it
			$('.wp-color-picker').each(function(){
				$(this).parent().siblings('.wp-picker-open').trigger('click');
			} );

			if ( is_opened ) {
				closeAllPanles();
			} else {
				the_container.addClass('active');
			}

		});

		var $option_root = $('#accordion-panel-size-and-spacing');
		$option_root.data('wpgrade_rendered', 'true');
	}

	function removeEmptyLists() {
		$('.dropdown-section-content li').each(function(){
			if($(this).text().length == 9) {
				$(this).hide();
			}
		})
	}

})(wp, jQuery);


