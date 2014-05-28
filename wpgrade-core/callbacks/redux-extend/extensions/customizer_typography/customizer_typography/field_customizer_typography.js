/* global redux_change */
/**
 * Typography
 * Dependencies		: google.com, jquery
 * Feature added by : Dovy Paukstys - http://simplerain.com/
 * Date				: 06.14.2013
 */
jQuery.noConflict();
/** Fire up jQuery - let's dance!
 */
jQuery(document).ready(function($) {
	var api = wp.customize;

	Object.size = function(obj) {
		var size = 0,
			key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				size++;
			}
		}
		return size;
	};

	function set_customizer_value(customizer_id, key, value) {

		if ( typeof window._wpCustomizeSettings === 'undefined' ) {
			return;
		}

		if ( window._wpCustomizeSettings.settings[customizer_id] === 'undefined' || window._wpCustomizeSettings.settings[customizer_id].value === 'undefined') {
			return;
		}

		window._wpCustomizeSettings.settings[customizer_id].value[key] = value;
	}

	function typographySelect(selector) {
		var mainID = jQuery(selector).parents('.redux-typography-container').attr('data-id');

		// customizer things
		var customizer_id = $('#' + mainID + ' .redux-typography-font-family').attr('name');
		customizer_id = customizer_id.replace('[font-family]', '');


		if ($(selector).hasClass('redux-typography-family')) {
			//$('#' + mainID + ' .typography-style span').text('');
			//$('#' + mainID + ' .typography-script span').text('');
		}
		// Set all the variables to be checked against
		var family = $('#' + mainID + ' select.redux-typography-family').val();
		if (!family) {
			family = null; //"inherit";
		}
		var familyBackup = $('#' + mainID + ' select.redux-typography-family-backup').val();
		var size = $('#' + mainID + ' .redux-typography-size').val();
		var height = $('#' + mainID + ' .redux-typography-height').val();
		var word = $('#' + mainID + ' .redux-typography-word').val(); // New Word-Spacing
		var letter = $('#' + mainID + ' .redux-typography-letter').val(); // New Letter-Spacing
		var align = $('#' + mainID + ' select.redux-typography-align').val(); // text-align
		var transform = $('#' + mainID + ' select.redux-typography-transform').val();
		var style = $('#' + mainID + ' select.redux-typography-style').val();
		var script = $('#' + mainID + ' select.redux-typography-subsets').val();
		var color = $('#' + mainID + ' .redux-typography-color').val();
		var units = $('#' + mainID).data('units');
		var option = $('#' + mainID + ' .redux-typography-family option:selected');
		var output = family;
		//$('#' + mainID + ' select.redux-typography-style').val('');
		//$('#' + mainID + ' select.redux-typography-subsets').val('');
		var google = option.data('google'); // Check if font is a google font
		// Page load. Speeds things up memory wise to offload to client
		if (!$('#' + mainID).hasClass('typography-initialized')) {
			style = $('#' + mainID + ' select.redux-typography-style').data('value');
			script = $('#' + mainID + ' select.redux-typography-subsets').data('value');
			if (style !== "") {
				style = String(style);
			}
			if (typeof (script) !== undefined) {
				script = String(script);
			}
			$('#' + mainID).addClass('typography-initialized');
		}

		// Get the styles and such from the font
		var details = "";

		if (option.data('details')) {
			details = jQuery.parseJSON(decodeURIComponent(option.data('details')));
			$('#' + mainID + ' .redux-typography-font-options').val(decodeURIComponent(option.data('details')));
		}

		// If we changed the font
		if ($(selector).hasClass('redux-typography-family')) {
			var html = '<option value=""></option>';
			if (google) { // Google specific stuff
				var selected = "";

				$.each(details.variants, function(index, variant) {
					if (variant.id === style || Object.size(details.variants) === 1) {
						selected = ' selected="selected"';
						style = variant.id;
					} else {
						selected = "";
					}
					html += '<option value="' + variant.id + '"' + selected + '>' + variant.name.replace(/\+/g, " ") + '</option>';
				});
				$('#' + mainID + ' .redux-typography-style').html(html);
				selected = "";
				html = '<option value=""></option>';
				$.each(details.subsets, function(index, subset) {
					if (subset.id === script || Object.size(details.subsets) === 1) {
						selected = ' selected="selected"';
						script = subset.id;
					} else {
						selected = "";
					}
					html += '<option value="' + subset.id + '"' + selected + '>' + subset.name.replace(/\+/g, " ") + '</option>';
				});
				if (typeof (familyBackup) !== "undefined" && familyBackup !== "") {
					output += ', ' + familyBackup;
				}

				$('#' + mainID + ' .redux-typography-subsets').html(html);
				$('#' + mainID + ' .redux-typography-subsets').fadeIn('fast');
				$('#' + mainID + ' .typography-family-backup').fadeIn('fast');
			} else {
				if (details) {
					$.each(details, function(index, value) {
						if (index === style || index === "normal") {
							selected = ' selected="selected"';
							$('#' + mainID + ' .typography-style .select2-chosen').text(value);
						} else {
							selected = "";
						}
						html += '<option value="' + index + '"' + selected + '>' + value.replace('+', ' ') + '</option>';
					});
					$('#' + mainID + ' .redux-typography-style').html(html);
					$('#' + mainID + ' .redux-typography-subsets').fadeOut('fast');
					$('#' + mainID + ' .typography-family-backup').fadeOut('fast');
				}
			}
		} else if ($(selector).hasClass('redux-typography-family-backup') && familyBackup !== "") {
			$('#' + mainID + ' .redux-typography-font-family').val(output);

		}
		set_customizer_value( customizer_id, 'font-family', output );
		// Check if the selected value exists. If not, empty it. Else, apply it.
		if ($('#' + mainID + " select.redux-typography-style option[value='" + style + "']").length === 0) {
			style = "";
			$('#' + mainID + ' select.redux-typography-style').val('');
		} else if (style === "400") {
			$('#' + mainID + ' select.redux-typography-style').val(style);
		}
		if ($('#' + mainID + " select.redux-typography-subsets option[value='" + script + "']").length === 0) {
			script = "";
			$('#' + mainID + ' select.redux-typography-subsets').val('');
		}

		var _linkclass = 'style_link_' + mainID;

		//remove other elements crested in <head>
		$('.' + _linkclass).remove();
		if (family !== null && family !== "inherit") {
			//replace spaces with "+" sign
			var the_font = family.replace(/\s+/g, '+');
			if (google) {
				//add reference to google font family
				var link = the_font;
				if (style) {
					link += ':' + style.replace(/\-/g, " ");
				}
				if (script) {
					link += '&subset=' + script;
				}

				if (WebFont) {
					WebFont.load({google: {families: [link]}});
				}
				//link = 'http://fonts.googleapis.com/css?family=' + link;
				//$('head').append('<link href="' + link + '" rel="stylesheet" type="text/css" class="' + _linkclass + '">');
				$('#' + mainID + ' .redux-typography-google').val(true);
			} else {
				$('#' + mainID + ' .redux-typography-google').val(false);
			}
		}

		$('#' + mainID + ' .typography-preview').css('font-size', size + units);
		$('#' + mainID + ' .typography-preview').css('font-style', "normal");

		// Weight and italic
		if (style.indexOf("italic") !== -1) {
			$('#' + mainID + ' .typography-preview').css('font-style', 'italic');
			$('#' + mainID + ' .typography-font-style').val('italic');
			style = style.replace('italic', '');
			set_customizer_value( customizer_id, 'font-style', 'italic' );
		} else {
			$('#' + mainID + ' .typography-font-style').val('');
			set_customizer_value( customizer_id, 'font-style', '' );
		}
		$('#' + mainID + ' .typography-font-weight').val(style);
		$('#' + mainID + ' .typography-preview').css('font-weight', style);

		//show in the preview box the font
		$('#' + mainID + ' .typography-preview').css('font-family', family + ', sans-serif');

		if (family === 'none' && family === '') {
			//if selected is not a font remove style "font-family" at preview box
			$('#' + mainID + ' .typography-preview').css('font-family', 'inherit');
		}
		if (!height) {
			height = size;
		}

		$('#' + mainID + ' .typography-preview').css('line-height', height + units);
		$('#' + mainID + ' .typography-preview').css('word-spacing', word + units);
		$('#' + mainID + ' .typography-preview').css('letter-spacing', letter + units);
		if (size === '') {
			$('#' + mainID + ' .typography-font-size').val('');
		} else {
			//console.log('here-font-size');
			$('#' + mainID + ' .typography-font-size').val(size + units);
		}
		if (height === '') {
			$('#' + mainID + ' .typography-line-height').val('');
		} else {
			$('#' + mainID + ' .typography-line-height').val(height + units);
		}
		$('#' + mainID + ' .typography-word-spacing').val(word + units);
		$('#' + mainID + ' .typography-letter-spacing').val(letter + units);

		if (color) {
			$('#' + mainID + ' .typography-preview').css('color', color);
			$('#' + mainID + ' .typography-preview').css('background-color', getContrastColour(color));
		}

		$('#' + mainID + ' .redux-typography-font-family').val(output);
		$('#' + mainID + ' .typography-style .select2-chosen').text($('#' + mainID + ' .redux-typography-style option:selected').text());
		$('#' + mainID + ' .typography-script .select2-chosen').text($('#' + mainID + ' .redux-typography-subsets option:selected').text());

		if (align) {
			$('#' + mainID + ' .typography-preview').css('text-align', align);
		}

		if (transform) {
			$('#' + mainID + ' .typography-preview').css('text-transform', transform);
		}

		set_customizer_value( customizer_id, 'font-options', decodeURIComponent(option.data('details')) );
		set_customizer_value( customizer_id, 'font-weight', style );
		set_customizer_value( customizer_id, 'google', google );
		set_customizer_value( customizer_id, 'subsets', script );
		set_customizer_value( customizer_id, 'text-align', align );

		if ( typeof api !== "undefined") {
			api.instance(customizer_id).previewer.refresh();
		}

	}

	//init for each element
	jQuery('.redux-typography-container').each(function() {
		var family = jQuery(this).find('select.redux-typography-family');
		if (family.data('value') !== "") {
			jQuery(family).val(family.data('value'));
		}
		typographySelect(family);
	});


	/**
	 * First create the selectors
	 */
	jQuery(".redux-typography-family, .redux-typography-family-backup, .redux-typography-align, .redux-typography-transform").select2({
		width: 'resolve',
		triggerChange: true,
		allowClear: true
	});

	//init when value is changed
	jQuery('.redux-typography').on('change', function() {
		typographySelect(this);
		if ( typeof api !== "undefined")
			api.trigger('change');
	});
	//init when value is changed
	jQuery('.redux-typography-size, .redux-typography-height, .redux-typography-word, .redux-typography-letter, .redux-typography-align, .redux-typography-transform').keyup(function() {
		typographySelect(this);
	});
	// Have to redeclare the wpColorPicker to get a callback function
	$('.redux-typography-color').wpColorPicker({
		change: function(event, ui) {
			redux_change(jQuery(this));
			jQuery(this).val(ui.color.toString());
			typographySelect(jQuery(this));
		}
	});

	jQuery(".redux-typography-size").numeric({
		allowMinus: false
	});

	jQuery(".redux-typography-height, .redux-typography-word, .redux-typography-letter").numeric({
		allowMinus: true
	});

	jQuery('.redux-typography-qtip').each(function() {
		$(this).qtip({
//            text: function(event, api) {
//                return $(this).attr('qtip-content');
//            },
			//text: 'Me',
			style: 'qtip-tipsy black',
			position: {
				my: 'bottom center', // Position my top left...
				at: 'top center' // at the bottom right of...
			}

		});
	});
});
