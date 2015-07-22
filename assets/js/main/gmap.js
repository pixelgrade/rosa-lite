/* --- GMAP Init --- */

// Overwrite Math.log to accept a second optional parameter as base for logarithm
Math.log = (function () {
	var log = Math.log;
	return function (n, base) {
		return log(n) / (base ? log(base) : 1);
	};
})();

function get_url_parameter(needed_param, gmap_url) {
	var sURLVariables = (gmap_url.split('?'))[1];
	if (typeof sURLVariables === "undefined") {
		return sURLVariables;
	}
	sURLVariables = sURLVariables.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == needed_param) {
			return sParameterName[1];
		}
	}
}

function get_newMap_oldUrl_coordinates(url) {
	var coordinates = {},
		split,
		distance;

	split = url.split('!3d');
	coordinates.latitude = split[1];
	split = split[0].split('!2d');
	coordinates.longitude = split[1];
	split = split[0].split('!1d');
	distance = split[1];
	coordinates.zoom = 21 - Math.round(Math.log(Math.round(distance / 218), 2));

	return coordinates;
}

function get_newMap_newUrl_coordinates(url) {
	var coordinates = {};

	url = url.split('@')[1];
	url = url.split('z/')[0];
	url = url.split(',');

	coordinates.latitude 	= url[0];
	coordinates.longitude 	= url[1];
	coordinates.zoom 		= url[2];

	if (coordinates.zoom.indexOf('z') >= 0) {
		coordinates.zoom = coordinates.zoom.substring(0, coordinates.zoom.length - 1);
	}

	return coordinates;
}

function get_oldMap_coordinates(url) {
	var coordinates = {},
		variables;

	variables = get_url_parameter('ll', url);
	if (typeof variables == "undefined") {
		variables = get_url_parameter('sll', url);
	}

	if (typeof variables == "undefined") {
		return variables;
	}

	variables = variables.split(',');
	coordinates.latitude = variables[0];
	coordinates.longitude = variables[1];

	coordinates.zoom = get_url_parameter('z', url);
	if (typeof coordinates.zoom === "undefined") {
		coordinates.zoom = 10;
	}

	return coordinates;
}

function gmapInit($container) {
	var $gmaps;

	if (typeof $container !== "undefined") {
		$gmaps = $container.find('.gmap');
	} else {
		$gmaps = $('.gmap');
	}

	if ( $gmaps.length && typeof google !== 'undefined' ) {
		if (globalDebug) {console.log("GMap Init");}

		$gmaps.each(function () {

			var $gmap = $( this ),
				url = $gmap.data( 'url' ),
				style = typeof $gmap.data( 'customstyle' ) !== "undefined" ? "style1" : google.maps.MapTypeId.ROADMAP,
				coordinates,
				pins 		= [],
				gmap_markercontent = $gmap.data( 'markercontent' );

			if ( url ) {
				//Parse the URL and load variables (ll = latitude/longitude; z = zoom)
				coordinates = get_oldMap_coordinates( url );
				if ( typeof variables == "undefined" ) {
					coordinates = url.split( '!3d' )[0] !== url ? get_newMap_oldUrl_coordinates( url ) : get_newMap_newUrl_coordinates( url );
				}

				if ( typeof coordinates !== "undefined" && coordinates.latitude && coordinates.longitude ) {
					pins.push({
						latLng: [coordinates.latitude, coordinates.longitude],
						options: {
							content: '<div class="map__marker-wrap"><div class="map__marker">' + gmap_markercontent + '</div></div>'
						}
					});
				}
			}

			// if there were no pins we could handle get out
			if (!pins.length) {
				return;
			}

			$gmap.gmap3( {
				map: {
					options: {
						center: new google.maps.LatLng( coordinates.latitude, coordinates.longitude ),
						zoom: parseInt( coordinates.zoom ),
						mapTypeId: style,
						mapTypeControlOptions: {mapTypeIds: []},
						scrollwheel: false,
						panControl: true,
						panControlOptions: {
							position: google.maps.ControlPosition.LEFT_CENTER
						},
						zoomControl: true,
						zoomControlOptions: {
							style: google.maps.ZoomControlStyle.LARGE,
							position: google.maps.ControlPosition.LEFT_CENTER
						},
						scaleControl: true,
						streetViewControl: true,
						streetViewControlOptions: {
							position: google.maps.ControlPosition.LEFT_CENTER
						}
					}
				},
				overlay: {
					values: pins
				},
				styledmaptype: {
					id: "style1",
					options: {
						name: "Style 1"
					},
					styles: [
						{
							"stylers": [
								{"saturation": -100},
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
								{"visibility": "on"}
							]
						}
					]
				}
			});

		});
	}

}

function gmapMultiplePinsInit($container) {

	var $gmaps;

	if (typeof $container !== "undefined") {
		$gmaps = $container.find('.gmap--multiple-pins');
	} else {
		$gmaps = $('.gmap--multiple-pins');
	}

	$gmaps.empty();

	$imageMarkup 	= $('.js-map-pin');

	if ( $imageMarkup.length > 0 ) {
		$imageMarkup = $($imageMarkup[0]).html();
	}

	if ( $gmaps.length && typeof google !== 'undefined' ) {
		if (globalDebug) {console.log("GMap Multiple Pins Init");}

		$gmaps.each(function () {

			var $gmap = $( this ),
				links,
				style = typeof $gmap.data( 'customstyle' ) !== "undefined" ? "style1" : google.maps.MapTypeId.ROADMAP,
				pins 		= [],
				zoom		= 10;

			links = $gmap.data('pins');

			$.each(links, function(label, url) {
				var coordinates;
				if (url) {
					coordinates = get_oldMap_coordinates(url);
					if (typeof variables == "undefined") {
						coordinates = url.split('!3d')[0] !== url ? get_newMap_oldUrl_coordinates(url) : get_newMap_newUrl_coordinates(url);
					}
					if (typeof coordinates !== "undefined" && coordinates.latitude && coordinates.longitude) {
						pins.push({
							latLng: [coordinates.latitude, coordinates.longitude],
							options: {
								content: '<div class="gmap__marker"><div class="gmap__marker__btn">' + label + '</div>' + $imageMarkup + '</div>'
							}
						});
					}
				}
			});

			// if there were no pins we could handle get out
			if (!pins.length) {
				return;
			}

			if ($gmap.data('initialized') == true) {
				$gmap.gmap3('destroy').empty();
			}

			$gmap.data('initialized', true);

			$gmap.gmap3( {
				map: {
					options: {
						zoom: zoom,
						mapTypeId: style,
						mapTypeControl: false,
						panControl: true,
						panControlOptions: {
							position: google.maps.ControlPosition.LEFT_CENTER
						},
						zoomControl: true,
						zoomControlOptions: {
							style: google.maps.ZoomControlStyle.LARGE,
							position: google.maps.ControlPosition.LEFT_CENTER
						},
						scaleControl: true,
						streetViewControl: true,
						streetViewControlOptions: {
							position: google.maps.ControlPosition.LEFT_CENTER
						},
						scrollwheel: false
					}
				},
				overlay: {
					values: pins
				},
				styledmaptype: {
					id: "style1",
					options: {
						name: "Style 1"
					},
					styles: [
						{
							"stylers": [
								{"saturation": -100},
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
								{"saturation": -30},
								{"gamma": 0.6},
								{"visibility": "on"}
							]
						}, {
							"featureType": "administrative.neighborhood",
							"stylers": [
								{"visibility": "off"}
							]
						}
					]
				}
			}, "autofit");

			var map = $gmap.gmap3("get");

			google.maps.event.addListenerOnce(map, 'idle', function() {
				if (typeof map == "undefined") return;

				if (1 < pins.length) {
					map.setZoom(map.getZoom() - 1);
				} else {
					map.setZoom(zoom);
				}
			});

		});
	}

}