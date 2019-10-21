(function($) {

	function observe( $container ) {
		var MutationObserver = window.MutationObserver,
			observer, config;

		if ( typeof MutationObserver === "undefined" ) {
			return;
		}

		observer = new MutationObserver( function() {
			$( window ).trigger( 'rellax' );
		} );

		config = {
			childList: true,
			characterData: false,
			attributes: false,
			subtree: true
		};

		$container.each( function() {
			observer.observe( this, config );
		} );
	}

	observe( $('.article__content') );

})(jQuery);