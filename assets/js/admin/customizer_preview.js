/**
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */
( function( $, window ) {

	// Site title and description.
    if ( ! $( '.site-logo--image' ).length ) {
        wp.customize('blogname', function (value) {
            value.bind(function (to) {
                $('.site-title a').text(to);
            });
        });
    }
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

} )( jQuery, window );
