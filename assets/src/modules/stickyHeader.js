/* --- Sticky Header Init --- */

var StickyHeader = (function() {

	var headerSelector = '.site-header',
		$header = $( headerSelector ),
		headerHeight,
		$headers;

	function init() {
		headerHeight = $header.outerHeight();
		$headers = $( '.article__header' ).first();
	}

	function update() {
		var inversed = false,
			adminBarHeight = $( '#wpadminbar' ).outerHeight() || 0,
			headerHeight = $header.outerHeight() || 0;

		$headers.each( function( i, obj ) {
			var $obj = $( obj ),
				start = $obj.offset().top,
				end = start + $obj.outerHeight();

			if ( latestKnownScrollY >= start - adminBarHeight && latestKnownScrollY <= end - headerHeight - adminBarHeight ) {
				inversed = true;
			}
		} );

		if ( ! inversed ) {
			$header.removeClass( 'headroom--top' ).addClass( 'headroom--not-top' );
		} else {
			$header.removeClass( 'headroom--not-top' ).addClass( 'headroom--top' );
		}
	}

	return {
		init: init,
		update: update
	}

})();
