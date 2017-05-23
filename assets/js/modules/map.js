var GMap = function() {
	this.maps = [];
	this.pinIconMarkup = $( '.js-map-pin' ).html();
};

GMap.prototype.init = function( $container ) {
	var that = this;

	$container = typeof $container !== "undefined" ? $container : $( 'body' );

	$container.find( '.c-hero__map' ).each( function( i, obj ) {
		var $map = $( obj );
		that.maps.push( $map );
		that.initializeMap( $map );
	} );
};

GMap.prototype.initializeMap = function( $map ) {
	var that = this;

	if ( typeof google !== 'undefined' ) {

		var url = $map.data( 'url' ),
			style = typeof $map.data( 'customstyle' ) !== "undefined" ? "rosa" : google.maps.MapTypeId.ROADMAP,
			markerContent = $map.data( 'markercontent' ),
			coordinates,
			pins = [];

		if ( typeof url === "string" ) {

			coordinates = that.getCenterFrom( url );
			pins = that.getPinsFrom( url, markerContent );

			// if there are no markers encoded in the url
			// place a pin the center of the map
			if ( pins.length === 0 && typeof coordinates !== "undefined" ) {
				pins.push( {
					position: [coordinates.latitude, coordinates.longitude],
					content: that.getPinMarkup( markerContent ),
					x: 0,
					y: 4
				} );
			}
		} else {
			var pinsData = $map.data( 'pins' );

			$.each( pinsData, function( label, url ) {
				coordinates = that.getCenterFrom( url );

				pins.push( {
					position: [coordinates['latitude'], coordinates['longitude']],
					content: that.getPinMarkup( label, 'pin' ),
					x: 0,
					y: 4
				} );

			} );
		}

		$map
		.gmap3( {
			center: [coordinates.latitude, coordinates.longitude],
			zoom: parseInt( coordinates.zoom ),
			mapTypeId: style,
			scrollwheel: false,
			mapTypeControl: false,
			zoomControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			scaleControl: true,
			streetViewControl: true,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			fullscreenControl: true
		} )
		.styledmaptype( "rosa", that.customStyle, {name: "Rosa"} )
		.overlay( pins );

		if ( pins.length > 1 ) {
			$map.gmap3().fit();
		}

	}

};

GMap.prototype.getCenterFrom = function( url ) {
	var split = url.split( '@' )[1].split( '/' )[0].split( 'z' )[0].split( ',' ),
		coordinates = {};

	if ( 2 === split.length || 3 === split.length ) {
		coordinates.latitude = parseFloat( split[0] );
		coordinates.longitude = parseFloat( split[1] );

		if ( 3 === split.length ) {
			coordinates.zoom = parseFloat( split[2] );
		}
		return coordinates;
	}

	return false;
};

GMap.prototype.getPinsFrom = function( url, markerContent ) {
	var that = this,
		coordinates = [],
		pins = [];

	function parseChildren( obj ) {
		var coord = [];
		$.each( obj.getChildren(), function( i, child ) {
			if ( child.type() == "d" ) {
				coord.push( child.value() );
			}
			parseChildren( child );
		} );

		if ( coord.length === 2 ) {
			coordinates.push( coord );
		}
	}

	if ( url.indexOf( 'data=' ) > - 1 ) {
		parseChildren( new Gmdp( url ).prBufRoot );
	}

	$.each( coordinates, function( i, coord ) {
		pins.push( {
			position: [coord[0], coord[1]],
			content: that.getPinMarkup( markerContent, 'tooltip' ),
			x: 0,
			y: 4
		} );
	} );

	return pins;
};

GMap.prototype.getPinMarkup = function( content, type ) {
	type = type || 'tooltip';

	if ( type === 'tooltip' ) {
		return '<div class="map-tooltip"><div class="map-tooltip__content">' + content + '</div></div>';
	} else {
		return '<div class="map-pin"><div class="map-pin__text">' + content + '</div>' + this.pinIconMarkup + '</div>'
	}
};

GMap.prototype.customStyle = [
	{
		"stylers": [
			{"saturation": - 100},
			{"gamma": 3.00},
			{"visibility": "simplified"}
		]
	}, {
		"featureType": "road",
		"stylers": [
			{"hue": $( "body" ).data( "color" ) ? $( "body" ).data( "color" ) : "#ffaa00"},
			{"saturation": 48},
			{"gamma": 0.40},
			{"visibility": "on"}
		]
	}, {
		"featureType": "administrative",
		"stylers": [
			{"saturation": - 30},
			{"gamma": 0.6},
			{"visibility": "on"}
		]
	}, {
		"featureType": "administrative.neighborhood",
		"stylers": [
			{"visibility": "off"}
		]
	}
];
