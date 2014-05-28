/**
 * This file adds some LIVE to the Theme Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 */



( function( exports, $ ) {

	$(document).ready(function(){

		var api = exports.customize,
			controls = api.settings.controls,
			settings = api.settings.settings;


		backgroundInit();
		typographyInit();
		spacingInit();
						
		$(this).on('click', function(){
			// $('.customize-control-background .redux-field').removeClass('active');
		})




		function backgroundInit() {
			$('.customize-control-background').each(function(){
				var _self = $(this),
					label = $(this).find('label'),
					upload = $(this).find('input.redux-background-input');
				
				$(this).prepend(label);

				if(upload.val()) {
					label.find('button').addClass('active')
				}
			});

			// Toggle the Background Container
			$('.customize-control-background').on('click', '.customize-control-title button', function(e){
				e.stopPropagation();
				e.preventDefault();
				$(this).closest($('.customize-control-background')).find('.redux-field-container').toggleClass('active');
			});

			// Remove Icon Class '.active'
			$('.customize-control-background').on('click', '.button.remove-image', function(){
				$(this).closest($('.customize-control-background')).find('button.active').removeClass('active');
			})
		}



		function typographyInit() {
			$('.customize-control-typography').each(function(){
				var _self = $(this),
					label = $(this).find('label'),
					upload = $(this).find('input.redux-background-input');
				
				// $(this).prepend(label);
				$(this).nextUntil('.customize-control-typography').each(function(){
					$(this).addClass('123').appendTo(_self.find('.redux-field-container .redux-typography-container'));
				});
			});

			// Toggle the Background Container
			$('.customize-control-typography').on('click', '.customize-control-title button', function(e){
				e.stopPropagation();
				e.preventDefault();
				$(this).closest($('.customize-control-typography')).find('.redux-typography-container').toggleClass('active');
			});

			// Remove Icon Class '.active'
			$('.customize-control-typography').on('click', '.button.remove-image', function(){
				// $(this).closest($('.customize-control-typography')).find('button.active').removeClass('active');
			})
		}


		function spacingInit() {
			$('.sizes_section').each(function(){
				var _self = $(this),
					_parent = $(this).closest('li').addClass('dropdown-section-trigger'),
					_container = _parent.parent().addClass('customize-dropdown-section'),
					label = $(this).parent(),
					upload = $(this).find('input.redux-background-input');

				// Add a container to handle the options
				$('<div class="dropdown-section-content"></div>').appendTo(_container);

				// Insert options into container
				_parent.nextUntil('div').each(function(){
					$(this).appendTo(_container.find('.dropdown-section-content'));
				});

			});

			// Clean up the title of the sections (eg. Sizes and Spacings)
			$('.customize-dropdown-section').first().prev().addClass('customize-dropdown-title');


			// Toggle the DropDown Container
			$('.customize-dropdown-section').on('click', '.dropdown-section-trigger', function(e){
				e.stopPropagation();
				e.preventDefault();
				$(this).next().toggleClass('active');
			});

			// Remove Icon Class '.active'
			$('.customize-control-typography').on('click', '.button.remove-image', function(){
				// $(this).closest($('.customize-control-typography')).find('button.active').removeClass('active');
			})
		}

		// iterate thtough all settings and pick up ours
		$.each(controls ,function(settingId, val){

			if ( settingId.indexOf( theme_name ) === -1 ) {
				return;
			}

			


			var setting = settings[settingId],
				type = val.type,
				transport = setting.transport;

//			if ( type === 'color' && transport === 'postMessage'  ) {
//
//				api( settingId, function( setting ) {
//
//					setting.bind( function( to ){
//
//						var selector = $( '.article__title' );
//
//
//					});
//
////					value.on('change', '#customize-control-heap_options-main_color .wp-color-picker', function( newval ) {
////						console.log(newval);
////						$( 'body .article--blog .article__categories a' ).css({color: '#111'} );
////					} );
//				});
//			}
		});
	});



})( wp, jQuery );


