/* global redux_change */
/**
 * Typography
 * Dependencies:        google.com, jquery
 * Feature added by:    Dovy Paukstys - http://simplerain.com/
 * Date:                06.14.2013
 */
jQuery.noConflict();
/** Fire up jQuery - let's dance!
 */
jQuery(document).ready(function($) {

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

    function typographySelect(selector) {
        var mainID = jQuery(selector).parents('.redux-container-typography:first').attr('data-id');
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
	var fontVariant = $('#' + mainID + ' select.redux-typography-font-variant').val(); // New Font Variant
	var decoration = $('#' + mainID + ' select.redux-typography-decoration').val(); // New Text Decoration
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
        }
        // Get the styles and such from the font
        var details = "";

        // Something went wrong trying to read google fonts, so turn google off
        if (redux.fonts.google === undefined) {
            google = false;
        }

        if (google && ( family in redux.fonts.google)) {
            details = redux.fonts.google[family];
        } else if (option.data('details')) {
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
                $('#' + mainID + ' .redux-typography-subsets').parent().fadeIn('fast');
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
                    $('#' + mainID + ' .redux-typography-subsets').parent().fadeOut('fast');
                    $('#' + mainID + ' .typography-family-backup').fadeOut('fast');
                }
            }
        } else if ($(selector).hasClass('redux-typography-family-backup') && familyBackup !== "") {
            $('#' + mainID + ' .redux-typography-font-family').val(output);
        }

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
        if (family !== null && family !== "inherit" && $('#' + mainID).hasClass('typography-initialized')) {
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

                if (typeof (WebFont) !== "undefined" && WebFont) {
                    WebFont.load({google: {families: [link]}});
                }
                //link = 'http://fonts.googleapis.com/css?family=' + link;
                //$('head').append('<link href="' + link + '" rel="stylesheet" type="text/css" class="' + _linkclass + '">');
                $('#' + mainID + ' .redux-typography-google').val(true);
            } else {
                $('#' + mainID + ' .redux-typography-google').val(false);
            }
        }

        // Weight and italic
        if (style.indexOf("italic") !== -1) {
            $('#' + mainID + ' .typography-preview').css('font-style', 'italic');
            $('#' + mainID + ' .typography-font-style').val('italic');
            style = style.replace('italic', '');
        } else {
            $('#' + mainID + ' .typography-font-style').val('');
        }
        $('#' + mainID + ' .typography-font-weight').val(style);

        if (!height) {
            height = size;
        }

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

        if ($('#' + mainID).hasClass('typography-initialized')) {
            var isPreviewSize = $('#' + mainID + ' .typography-preview').data('preview-size');
            
            if (isPreviewSize == '0') {
                $('#' + mainID + ' .typography-preview').css('font-size', size + units);
            }
            
            $('#' + mainID + ' .typography-preview').css('font-style', "normal");
            $('#' + mainID + ' .typography-preview').css('font-weight', style);
            //show in the preview box the font
            $('#' + mainID + ' .typography-preview').css('font-family', family + ', sans-serif');
            if (family === 'none' && family === '') {
                //if selected is not a font remove style "font-family" at preview box
                $('#' + mainID + ' .typography-preview').css('font-family', 'inherit');
            }
            $('#' + mainID + ' .typography-preview').css('line-height', height + units);
            $('#' + mainID + ' .typography-preview').css('word-spacing', word + units);
            $('#' + mainID + ' .typography-preview').css('letter-spacing', letter + units);

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

            if (fontVariant) {
                $('#' + mainID + ' .typography-preview').css('font-variant', fontVariant);
            }

            if (decoration) {
                $('#' + mainID + ' .typography-preview').css('text-decoration', decoration);
            }
            $('#' + mainID + ' .typography-preview').slideDown();
        }
        if (!$('#' + mainID).hasClass('typography-initialized')) {
            $('#' + mainID).addClass('typography-initialized');
        }
    }


    //init for each element
    jQuery('.redux-typography-container').each(function() {
        var family = jQuery(this).find('.redux-typography-family');
        if (family.data('value') !== "") {
            jQuery(family).val(family.data('value'));
        }

        typographySelect(family);

        window.onbeforeunload = null;
    });

    //init when value is changed
    jQuery('.redux-typography').on('change', function() {
        typographySelect(this);
    });
    
    //init when value is changed
    jQuery('.redux-typography-size, .redux-typography-height, .redux-typography-word, .redux-typography-letter, .redux-typography-align, .redux-typography-transform, .redux-typography-font-variant, .redux-typography-decoration').keyup(function() {
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
        allowMinus: false,
    });

    jQuery(".redux-typography-height, .redux-typography-word, .redux-typography-letter").numeric({
        allowMinus: true,
    });

//    jQuery(".redux-typography-family").select2({
//        
//    }).on("select2-opening", function(e) {
//        console.log('opening');
//        
//        var data = {
//             action:     'redux_font_load',
//         };
//         
//         $.post(redux_ajax_script.ajaxurl, data, function(response) {
//             
//             
//        });
//    });    
    
//    var aj_data = {
//        action:         'redux_font_load',
//    };
//    
//    $.post(redux_ajax_script.ajaxurl, aj_data, function(response) {
//        console.log(response);
//    });
    
//    var data = [{id:'none', text: 'none'}];
//    $("#s2test").select2({
//        query: function(query) {
//          query.callback({results: data});
//        },
//          
//         //data: [{id:'enh',text:'enhancement'},{id:'buggy',text:'bug'},{id:'dupe',text:'duplicate'},{id:'no',text:'invalid'},{id:'nono',text:'wontfix'}]
//         
//        }).on("select2-opening", function(e) {
//            
//             data = [{id:'enh',text:'enhancement','data-google': true},{id:'buggy',text:'bug'},{id:'dupe',text:'duplicate'},{id:'no',text:'invalid'},{id:'nono',text:'wontfix'}, {id:'biggus',text:'diccus'}];
//            //.data('data',[{id:'enh',text:'enhancement'},{id:'buggy',text:'bug'},{id:'dupe',text:'duplicate'},{id:'no',text:'invalid'},{id:'nono',text:'wontfix'}]
//            //);             
////            
////         });
//         //}, 30); 
//
////             
//        }).on('select2-selecting', function(val, object) {
//            console.log(val.object['data-google'])
////            //console.log(object)
////            
//        });
//    //});    

    
    jQuery(".redux-typography-family, .redux-typography-family-backup, .redux-typography-align, .redux-typography-transform, .redux-typography-font-variant, .redux-typography-decoration").select2({
        width: 'resolve',
        triggerChange: true,
        allowClear: true
    });

});
