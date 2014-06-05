/* global confirm, redux, redux_change */

(function( $ ) {
    "use strict";

    $.reduxImageSelect = $.reduxImageSelect || {};

    $( document ).ready(
        function() {
            $.reduxImageSelect.init();
        }
    );

    $.reduxImageSelect.init = function() {
        // On label click, change the input and class
        $( '.redux-image-select label img, .redux-image-select label .tiles' ).click(
            function( e ) {
                var id = $( this ).closest( 'label' ).attr( 'for' );

                $( this ).parents( "fieldset:first" ).find( '.redux-image-select-selected' ).removeClass( 'redux-image-select-selected' ).find( "input[type='radio']" ).attr(
                    "checked", false
                );
                $( this ).closest( 'label' ).find( 'input[type="radio"]' ).prop( 'checked' );

                if ( $( this ).closest( 'label' ).hasClass( 'redux-image-select-preset-' + id ) ) { // If they clicked on a preset, import!
                    e.preventDefault();

                    var presets = $( this ).closest( 'label' ).find( 'input' );
                    var data = presets.data( 'presets' );

                    if ( presets !== undefined && presets !== null ) {
                        var answer = confirm( redux.args.preset_confirm );

                        if ( answer ) {
                            $( 'label[for="' + id + '"]' ).addClass( 'redux-image-select-selected' ).find( "input[type='radio']" ).attr(
                                "checked", true
                            );
                            window.onbeforeunload = null;
                            if ( jQuery('#import-code-value' ).length === 0 ) {
                                $( this ).append( '<textarea id="import-code-value" style="display:none;" name="' + redux.args.opt_name + '[import_code]">' + JSON.stringify( data ) + '</textarea>' );
                            } else {
                                $( '#import-code-value' ).val( JSON.stringify( data ) );
                            }
                            if ( jQuery( '#publishing-action #publish' ).length !== 0 ) {
                                jQuery( '#publish' ).click();
                            } else {
                                $( '#redux-import' ).click();
                            }
                        }
                    } else {
                    }

                    return false;
                } else {
                    $( 'label[for="' + id + '"]' ).addClass( 'redux-image-select-selected' ).find( "input[type='radio']" ).attr(
                        "checked", true
                    );

                    redux_change( $( this ).closest( 'label' ).find( 'input[type="radio"]' ) );
                }
            }
        );

        // Used to display a full image preview of a tile/pattern
        $( '.tiles' ).qtip(
            {
                content: {
                    text: function( event, api ) {
                        return "<img src='" + $( this ).attr( 'rel' ) + "' style='max-width:150px;' alt='' />";
                    },
                },
                style: 'qtip-tipsy',
                position: {
                    my: 'top center', // Position my top left...
                    at: 'bottom center', // at the bottom right of...
                }
            }
        );
    };
})( jQuery );