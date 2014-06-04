/**
 * This file adds some LIVE to the Theme Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 */
(function (exports, $) {

	var api = parent.wp.customize;
//	api.settings = window._wpCustomizeSettings;
	// Update the custom text in real time...
	$(document).ready(function () {

		var controls = api.settings.controls,
			settings = api.settings.settings;

		$.each(settings, function (settingId, val) {

			if (settingId.indexOf(theme_name) === -1) {
				return;
			}

			selector = '';
			var css_rules = ['color'];

			if (isset(settings_config[settingId]) && isset(settings_config[settingId].css_rules)) {
				css_rules = settings_config[settingId].css_rules;
			} else {
				return;
			}

			if (isset(settings_config[settingId])) {

				var id = settingId;
				id = id.slice(0, -1);
				id = id.replace(theme_name + '_options[', '');

				api(settingId, function (setting) {

					setting.bind(function (to) {
						var properties = [],
							counter = 0;

						$.each(settings_config[settingId].css_rules, function (key, element) {

							properties[key] = element;
							counter++;

						});
						$('#' + id).cssUpdate({
							properties: properties,
							propertyValue: to
						});

					});
				});
			}
		});
	});


	function isset() {
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: FremyCompany
		// +   improved by: Onno Marsman
		// +   improved by: Rafał Kukawski
		// *     example 1: isset( undefined, true);
		// *     returns 1: false
		// *     example 2: isset( 'Kevin van Zonneveld' );
		// *     returns 2: true

		var a = arguments,
			l = a.length,
			i = 0,
			undef;

		if (l === 0) {
			throw new Error('Empty isset');
		}

		while (i !== l) {
			if (a[i] === undef || a[i] === null) {
				return false;
			}
			i++;
		}
		return true;
	}

})(wp, jQuery);