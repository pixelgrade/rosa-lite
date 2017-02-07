// /* ====== SHARED VARS ====== */

var phone, touch, ltie9, dh, ar, fonts, ieMobile;

var ua = navigator.userAgent;
var winLoc = window.location.toString();

var is_webkit       = ua.match(/webkit/i);
var is_firefox      = ua.match(/gecko/i);
var is_newer_ie     = ua.match(/msie (9|([1-9][0-9]))/i);
var is_older_ie     = ua.match(/msie/i) && !is_newer_ie;
var is_ancient_ie   = ua.match(/msie 6/i);
var is_ie           = is_ancient_ie || is_older_ie || is_newer_ie;
var is_mobile_ie    = navigator.userAgent.indexOf('IEMobile') !== -1;
var is_mobile       = ua.match(/mobile/i);
var is_OSX          = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false;
var iOS 			= getIOSVersion(ua);
var is_EDGE 		= /Edge\/12./i.test(navigator.userAgent);

var latestKnownScrollY = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0),
	newScrollY = - 1,
	ticking = false;

if (is_EDGE) {
	jQuery('body').addClass('is-edge');
}


var nua = navigator.userAgent;
var is_android = ((nua.indexOf('Mozilla/5.0') !== -1 && nua.indexOf('Android ') !== -1 && nua.indexOf('AppleWebKit') !== -1) && nua.indexOf('Chrome') === -1);
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

var useTransform = true;
var use2DTransform = (ua.match(/msie 9/i) || winLoc.match(/transform\=2d/i));
var transform;

// setting up transform prefixes
var prefixes = {
	webkit: 'webkitTransform',
	firefox: 'MozTransform',
	ie: 'msTransform',
	w3c: 'transform'
};

if (useTransform) {
	if (is_webkit) {
		transform = prefixes.webkit;
	} else if (is_firefox) {
		transform = prefixes.firefox;
	} else if (is_newer_ie) {
		transform = prefixes.ie;
	}
}

var windowWidth 		= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    windowHeight 		= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

/* --- To enable verbose debug add to Theme Options > Custom Code footer -> globalDebug=true; --- */
var globalDebug = false,
	timestamp,
    gifImages;

(function ($, window, undefined) {

	/* --- DETECT VIEWPORT SIZE --- */

	function browserSize() {
		wh = $(window).height();
		ww = $(window).width();
		dh = $(document).height();
		ar = ww / wh;
	}


	/* --- DETECT PLATFORM --- */

	function platformDetect() {
		$.support.touch = 'ontouchend' in document;
		var navUA = navigator.userAgent.toLowerCase(),
			navPlat = navigator.platform.toLowerCase();

		var isiPhone = navPlat.indexOf("iphone"),
			isiPod = navPlat.indexOf("ipod"),
			isAndroidPhone = navPlat.indexOf("android"),
			safari = (navUA.indexOf('safari') != -1 && navUA.indexOf('chrome') == -1) ? true : false,
			svgSupport = (window.SVGAngle) ? true : false,
			svgSupportAlt = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) ? true : false,
			ff3x = (/gecko/i.test(navUA) && /rv:1.9/i.test(navUA)) ? true : false;

        ieMobile = navigator.userAgent.match(/Windows Phone/i) ? true : false;
		phone = (isiPhone > -1 || isiPod > -1 || isAndroidPhone > -1) ? true : false;
		touch = $.support.touch ? true : false;
		ltie9 = $.support.leadingWhitespace ? false : true;

		var $bod = $('body');

		if (touch) $('html').addClass('touch');
		if (ieMobile) $('html').addClass('is--winmob');
		if (is_android) $('html').addClass('is--ancient-android');
		if (safari) $bod.addClass('safari');
		if (phone) $bod.addClass('phone');


	}
/* --- Magnific Popup Initialization --- */

function magnificPopupInit() {
	if ( globalDebug ) {
		console.log( "Magnific Popup - Init" );
	}

	$( '.js-post-gallery' ).each( function () { // the containers for all your galleries should have the class gallery
		$( this ).magnificPopup( {
			tPrev: objectl10n.tPrev,
			tNext: objectl10n.tNext,
			tCounter: objectl10n.tCounter,
			delegate: 'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]', // the container for each your gallery items
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			closeOnBgClick: false,
			fixedContentPos: true,
			removalDelay: 500,
			mainClass: 'mfp-fade',
			image: {
				markup: '<div class="mfp-figure">' +
				        '<div class="mfp-close"></div>' +
				        '<div class="mfp-img"></div>' +
				        '<div class="mfp-bottom-bar">' +
				        '<div class="mfp-title"></div>' +
				        '<div class="mfp-counter"></div>' +
				        '</div>' +
				        '</div>',
				titleSrc: function ( item ) {
					var output = '';
					if ( typeof item.el.attr( 'data-alt' ) !== "undefined" && item.el.attr( 'data-alt' ) !== "" ) {
						output += '<small>' + item.el.attr( 'data-alt' ) + '</small>';
					}
					return output;
				}
			},
			gallery: {
				enabled: true,
				navigateByImgClick: true
				//arrowMarkup: '<a href="#" class="gallery-arrow gallery-arrow--%dir% control-item arrow-button arrow-button--%dir%">%dir%</a>'
			},
			callbacks: {
				elementParse: function ( item ) {

					if ( this.currItem != undefined ) {
						item = this.currItem;
					}

					var output = '';
					if ( typeof item.el.attr( 'data-alt' ) !== "undefined" && item.el.attr( 'data-alt' ) !== "" ) {
						output += '<small>' + item.el.attr( 'data-alt' ) + '</small>';
					}

					$( '.mfp-title' ).html( output );
				},
				change: function ( item ) {
					var output = '';
					if ( typeof item.el.attr( 'data-alt' ) !== "undefined" && item.el.attr( 'data-alt' ) !== "" ) {
						output += '<small>' + item.el.attr( 'data-alt' ) + '</small>';
					}

					$( '.mfp-title' ).html( output );
				},
				beforeClose: function () {
					$( '.mfp-arrow, .mfp-close' ).hide();
				}
			}
		} );
	} );
}

/* --- Royal Slider Init --- */

function royalSliderInit( $container ) {
	if ( globalDebug ) {
		console.log( "Royal Slider - Init" );
	}

	$container = typeof $container !== 'undefined' ? $container : $( 'body' );

	// Transform Wordpress Galleries to Sliders
	$container.find( '.wp-gallery' ).each( function () {
		sliderMarkupGallery( $( this ) );
	} );

	// Find and initialize each slider
	$container.find( '.js-pixslider' ).each( function () {
		var $slider = $( this );
		$slider.imagesLoaded( function () {
			sliderInit( $slider );
		} );
	} );

}

/*
 * Slider Initialization
 */
function sliderInit( $slider ) {

	$slider.find( 'img' ).removeClass( 'invisible' );

	var $children = $( this ).children(),
		rs_arrows = typeof $slider.data( 'arrows' ) !== "undefined",
		rs_bullets = typeof $slider.data( 'bullets' ) !== "undefined" ? "bullets" : "none",
		rs_autoheight = typeof $slider.data( 'autoheight' ) !== "undefined",
		rs_autoScaleSlider = false,
		rs_autoScaleSliderWidth = $slider.data( 'autoscalesliderwidth' ),
		rs_autoScaleSliderHeight = $slider.data( 'autoscalesliderheight' ),
		rs_customArrows = typeof $slider.data( 'customarrows' ) !== "undefined",
		rs_slidesSpacing = typeof $slider.data( 'slidesspacing' ) !== "undefined" ? parseInt( $slider.data( 'slidesspacing' ) ) : 0,
		rs_keyboardNav = typeof $slider.data( 'fullscreen' ) !== "undefined",
		rs_imageScale = $slider.data( 'imagescale' ),
		rs_visibleNearby = typeof $slider.data( 'visiblenearby' ) !== "undefined" ? true : false,
		rs_imageAlignCenter = typeof $slider.data( 'imagealigncenter' ) !== "undefined",
		rs_transition = typeof $slider.data( 'slidertransition' ) !== "undefined" && $slider.data( 'slidertransition' ) != '' ? $slider.data( 'slidertransition' ) : 'move',
		rs_autoPlay = typeof $slider.data( 'sliderautoplay' ) !== "undefined" ? true : false,
		rs_delay = typeof $slider.data( 'sliderdelay' ) !== "undefined" && $slider.data( 'sliderdelay' ) != '' ? $slider.data( 'sliderdelay' ) : '1000',
		rs_drag = true,
		rs_globalCaption = typeof $slider.data( 'showcaptions' ) !== "undefined" ? true : false,
		is_headerSlider = $slider.hasClass( 'header--slideshow' ) ? true : false,
		hoverArrows = typeof $slider.data( 'hoverarrows' ) !== "undefined";

	// Single slide case
	if ( $children.length == 1 ) {
		rs_arrows = false;
		rs_bullets = 'none';
		rs_customArrows = false;
		rs_keyboardNav = false;
		rs_drag = false;
		rs_transition = 'fade';
	}
	// make sure default arrows won't appear if customArrows is set
	if ( rs_customArrows ) {
		rs_arrows = false;
	}

	//the main params for Royal Slider
	var royalSliderParams = {
		autoHeight: rs_autoheight,
		autoScaleSlider: rs_autoScaleSlider,
		loop: true,
		autoScaleSliderWidth: rs_autoScaleSliderWidth,
		autoScaleSliderHeight: rs_autoScaleSliderHeight,
		imageScaleMode: rs_imageScale,
		imageAlignCenter: rs_imageAlignCenter,
		slidesSpacing: rs_slidesSpacing,
		arrowsNav: rs_arrows,
		controlNavigation: rs_bullets,
		keyboardNavEnabled: rs_keyboardNav,
		arrowsNavAutoHide: false,
		sliderDrag: rs_drag,
		transitionType: rs_transition,
		autoPlay: {
			enabled: rs_autoPlay,
			stopAtAction: true,
			pauseOnHover: true,
			delay: rs_delay
		},
		globalCaption: rs_globalCaption,
		numImagesToPreload: 4
	};

	if ( rs_visibleNearby ) {
		royalSliderParams['visibleNearby'] = {
			enabled: true,
			//centerArea: 0.8,
			center: true,
			breakpoint: 0,
			//breakpointCenterArea: 0.64,
			navigateByCenterClick: false
		}
	}


	// lets fire it up

	$slider.royalSlider( royalSliderParams );
	$slider.addClass( 'slider--loaded' );

	var royalSlider = $slider.data( 'royalSlider' );
	var slidesNumber = royalSlider.numSlides;

	royalSlider.ev.on( 'rsBeforeAnimStart rsAfterSlideChange rsAfterContentSet', function ( event ) {
		$( window ).trigger( 'rellax' );
	});

	// create the markup for the customArrows
	if ( royalSlider && rs_customArrows ) {

		var classes = 'slider__custom-arrows';

		if ( is_headerSlider ) {
			classes = 'slider-arrows-header';
		}

		if ( hoverArrows && ! Modernizr.touchevents ) {
			classes += ' arrows--hover ';
		}

		$slider.find( '.slider__custom-arrows' ).off( 'click' ).remove();

		var $gallery_control = $(
			'<div class="' + classes + '">' +
			'<div class="rsArrow rsArrowLeft js-arrow-left" style="display: block;"><div class="rsArrowIcn"></div></div>' +
			'<div class="rsArrow rsArrowRight js-arrow-right" style="display: block;"><div class="rsArrowIcn"></div></div>' +
			'</div>'
		);

		if ( $slider.data( 'customarrows' ) == "left" ) {
			$gallery_control.addClass( 'gallery-control--left' );
		}

		$gallery_control.insertBefore( $slider );

		$gallery_control.on( 'click', '.js-arrow-left', function ( event ) {
			event.preventDefault();
			royalSlider.prev();
		} );

		$gallery_control.on( 'click', '.js-arrow-right', function ( event ) {
			event.preventDefault();
			royalSlider.next();
		} );
	}

	if ( hoverArrows && ! Modernizr.touchevents ) {
		hoverArrow( $gallery_control.find( '.rsArrow' ) );

	}

	if ( slidesNumber == 1 ) {
		$slider.addClass( 'single-slide' );
	}

	$slider.addClass( 'slider--loaded' );
}

/*
 * Wordpress Galleries to Sliders
 * Create the markup for the slider from the gallery shortcode
 * take all the images and insert them in the .gallery <div>
 */
function sliderMarkupGallery( $gallery ) {
	var $old_gallery = $gallery,
		gallery_data = $gallery.data(),
		$images = $old_gallery.find( 'img' ),
		$new_gallery = $( '<div class="pixslider js-pixslider">' );

	$images.prependTo( $new_gallery ).addClass( 'rsImg' );

	//add the data attributes
	$.each( gallery_data, function ( key, value ) {
		$new_gallery.attr( 'data-' + key, value );
	} )

	$old_gallery.replaceWith( $new_gallery );
}

/*
 Get slider arrows to hover, following the cursor
 */

function hoverArrow( $arrow ) {

	$arrow.each(function(i, obj) {

		var $arrow = $(obj),
			update = false,
			offset = $arrow.offset(),
			$icon = $arrow.find( '.rsArrowIcn' ),
			mouseX,
			mouseY;

		$arrow.mouseenter( function ( e ) {
			offset = $arrow.offset();
			$( this ).addClass( 'visible' );
			update = true;
		});

		$arrow.mousemove( function ( e ) {
			mouseX = e.pageX - offset.left;
			mouseY = e.pageY - offset.top;
		});

		$arrow.mouseleave( function ( e ) {
			$( this ).removeClass( 'visible' );
			update = false;
		});

		function loop() {
			if ( update ) {
				TweenMax.to( $icon, 0, {x: mouseX, y: mouseY, z: 0.01, force3D: true} );
			}
			requestAnimationFrame(loop);
		}

		loop();
	});
}
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
		temp_coords,
		temp_zoom;

	temp_coords = url.split('!3d');
	temp_coords = temp_coords[1];
	temp_coords = temp_coords.split('!4d');

	// Get the first part of the temp_coords array which is the latitude
	coordinates.latitude = temp_coords[0];

	// Get the second part of the temp_coords, before the zoom level, which is the longitude
	temp_coords[1] = temp_coords[1].split('?')[0];
	coordinates.longitude = temp_coords[1];

	// Get the zoom level
	// Get the whole coordinates including the zoom
	temp_zoom = url.split('@');
	temp_zoom = temp_zoom[1];
	// Remove the part after the coordinates
	temp_zoom = temp_zoom.split('/');
	temp_zoom = temp_zoom[0];
	// Split the coordinates and get only the zoom level
	temp_zoom = temp_zoom.split(',');
	temp_zoom = temp_zoom[2];
	// Take off the z part
	if ( temp_zoom.indexOf('z') >= 0 ) {
		temp_zoom = temp_zoom.substring( 0, temp_zoom.length - 1 );
	}
	coordinates.zoom = temp_zoom;

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
			});

		});
	}

}
var DownArrow = {
    selector:   '.down-arrow',
    $arrow:     null,
    timeline:   null,
    start:      0,
    end:        0,
    bubble:     false,

    initialize: function () {

        var that = this;

        this.$arrow = $(this.selector);

        if (empty(this.$arrow)) {
            return;
        }

        this.start      = 0;
        this.end        = this.start + 300;
        this.timeline   = new TimelineMax({ paused: true });
        this.$next      = this.$arrow.closest('.article--page');

        if (!empty(this.$next)) {
            this.nextTop    = this.$next.offset().top;
            this.nextHeight = this.$next.outerHeight();
        }


        if (this.$arrow.hasClass('down-arrow--bubble')) {
            this.timeline.to(this.$arrow, .2, {y: 10, opacity: 0, ease: Linear.easeNone, overwrite: "none"});
            this.timeline.to('.blurp--top', .3, {scaleY: 0, ease: Linear.easeNone, overwrite: "none"});
            this.bubble = true;
        } else {
            this.timeline.to(this.$arrow, 1, {y: 100, opacity: 0, ease: Linear.easeNone, overwrite: "none"});
        }

        this.$arrow.on('click', function (e) {
            e.preventDefault();

            if (empty(that.$next)) {
                return;
            }

            if (that.$next.is('.article__header')) {
                smoothScrollTo(that.nextTop - windowHeight/2 + that.nextHeight/2);
            } else {
                smoothScrollTo(that.nextTop - $('.site-header').height());
            }

        });
    },

    update: function () {

        if (empty(this.$arrow) || this.bubble) {
            return;
        }

        if (Modernizr.touchevents && is_OSX) {
            this.timeline.progress(0);
            return;
        }

        setProgress(this.timeline, this.start, this.end);
    }
}
var ScrollToTop = (function() {

    var start = 0,
        end = 0,
        timeline = null,
        played = false,
        footerHeight;

    function initialize() {

        var $button         = $('.btn--top'),
            offsetTop       = 0,
            start           = offsetTop - windowHeight + footerHeight * 3 / 4;

        footerHeight = $('.copyright-area').outerHeight();

        if (empty($button)) {
            return;
        }

        offsetTop = $button.offset().top;
        $button.data('offsetTop', offsetTop);

        this.timeline   = new TimelineMax({ paused: true });

        this.timeline.fromTo('.blurp--bottom', .6, {
            y:          40,
            scale:      0.5
        }, {
            y:          0,
            scale:      1,
            ease:       Power3.easeOut,
            force3D:    true

        });

        this.timeline.fromTo($('.btn__arrow--top'), .4, {
            y: 15,
            opacity: 0
        }, {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: Back.easeOut
        }, '-=0.1');

        this.timeline.fromTo($('.btn__arrow--bottom'),.4, {
            y: 15,
            opacity: 0
        }, {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: Back.easeOut
        }, '-=0.25');

        $button.on('click', function (e) {
            e.preventDefault();
            smoothScrollTo(0);
        });

        this.update();
    }

    function update() {

        var $button         = $('.btn--top'),
            offsetTop       = $button.data('offsetTop'),
            start           = offsetTop - windowHeight + footerHeight * 3 / 4,
            end             = start + windowHeight;

        if (empty($button) || this.timeline == null) {
            return;
        }

        if (Modernizr.touchevents && is_OSX) {
            this.timeline.progress(1);
            return;
        }

        if (start < latestKnownScrollY) {
            if (!this.played) {
                this.timeline.play();
                this.played = true;
            }
        } else {
            if (this.played) {
                this.timeline.reverse();
                this.played = false;
            }
        }
    }

    return {
        initialize: initialize,
        update: update
    }

})();

/* --- Cover Animations Init --- */

var CoverAnimation = {
    selector:       '.article__header',
    initialized:    false,
    animated:       false,

    initialize: function () {

        if (is_EDGE) {
            return;
        }

        var that = this;

        $(this.selector).each(function(i, header) {

            var $header         = $(header),
                $headline       = $header.find('.article__headline'),
                timeline        = new TimelineMax({ paused: true }),
                $title          = $headline.find('.headline__primary'),
                $subtitle       = $headline.find('.headline__secondary'),
                $description    = $headline.find('.headline__description'),
                $star           = $headline.find('.star'),
                $lines          = $headline.find('.line'),
                $arrows         = $description.find('.arrow'),
                $hr             = $description.find('hr'),
                headerTop       = $header.offset().top,
                headerHeight    = $header.outerHeight();

            $header.find('.pixcode--separator').width($title.width());

            $description.css({opacity: 1});
            $description = $description.children().not('.pixcode--separator');
            $description.css({opacity: 0});

            // ------ A

            timeline.fromTo($title, 0.72, {'letter-spacing': '1em', 'margin-right': '-0.9em'}, {'letter-spacing': '0.2em', 'margin-right': '-0.1em', ease: Expo.easeOut});
            timeline.fromTo($title, 0.89, {opacity: 0}, {opacity: 1, ease: Expo.easeOut}, '-=0.72');
            timeline.fromTo($title, 1, {'y': 30}, {'y': 0, ease: Expo.easeOut}, '-=0.89');
            timeline.fromTo($subtitle, 0.65, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.65');
            timeline.fromTo($subtitle, 0.9, {y: 30}, {y: 0, ease: Quint.easeOut}, '-=0.65');
            timeline.fromTo($star, 0.15, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.6');
            timeline.fromTo($star, 0.55, {rotation: -270}, {rotation: 0, ease: Back.easeOut}, '-=0.5');
            timeline.fromTo($lines, 0.6, {width: 0}, {width: '42%', opacity: 1, ease: Quint.easeOut}, '-=0.55');
            timeline.fromTo($hr, 0.6, {width: 0}, {width: '100%', opacity: 1, ease: Quint.easeOut}, '-=0.6');
            timeline.fromTo($arrows, 0.2, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.27');
            timeline.fromTo($description, 0.5, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.28');
            timeline.fromTo($description, 0.75, {y: -20}, {y: 0}, '-=0.5');

            // ------ B
            timeline.addLabel("animatedIn");

            // if (i == 0) {
            //     timeline.fromTo($headline, 1.08, {y: 0}, {y: 150, ease: Linear.easeNone});
            //     timeline.fromTo($title, 1.08, {y: 0}, {opacity: 0, y: -60, ease: Quad.easeIn}, '-=1.08');
            // } else {
                timeline.fromTo($title, 1.08, {y: 0}, {opacity: 0, y: -60, ease: Quad.easeIn});
            // }

            timeline.to($description, 1.08, {y: 60, opacity: 0, ease: Quad.easeIn}, '-=1.08');
            timeline.to($subtitle, 1.08, {opacity: 0, y: -90, ease: Quad.easeIn}, '-=1.08');
            timeline.to($lines, 0.86, {width: 0, opacity: 0, ease: Quad.easeIn}, '-=0.94');
            timeline.to($hr, 0.86, {width: 0, opacity: 0, ease: Quad.easeIn}, '-=0.86');
            timeline.to($star, 1, {rotation: 180}, '-=1.08');
            timeline.to($star, 0.11, {opacity: 0}, '-=0.03');
            timeline.to($arrows, 0.14, {opacity: 0}, '-=1.08');

            timeline.addLabel("animatedOut");

            // ------ C

            var animatedInTime      = timeline.getLabelTime("animatedIn"),
                animatedOutTime     = timeline.getLabelTime("animatedOut"),
                start               = headerTop + headerHeight / 2 - wh / 2,
                end                 = start + headerHeight / 2,
                ab, bc;

            if (i == 0) {
                start = headerTop;
                end = start + windowHeight / 2;
            }

            ab = animatedInTime / animatedOutTime;
            bc = 1 - ab;

            if (!that.initialized) {

                timeline.tweenTo("animatedIn", {
                    onComplete: function () {
                        if (Modernizr.touchevents) {
                            $headline.data("animated", true);
                        }
                    }
                });

                if (!Modernizr.touchevents) {
                    timeline.tweenTo("animatedOut", {
                        onComplete: function () {
                            $headline.data("animated", true);
                        },
                        onUpdate: function () {
                            var progress        = (1 / (end - start)) * (latestKnownScrollY - start),
                                partialProgress = progress < 0 ? ab : ab + bc * progress,
                                currentProgress = timeline.progress();

                            if (Math.abs(partialProgress - currentProgress) < 0.01) {
                                $headline.data("animated", true);
                                this.kill();
                            }
                        }
                    });
                }
            }

            $headline.data('tween', {
                timeline:       timeline,
                ab:             ab,
                bc:             bc,
                start:          start,
                end:            end
            });

        });

        that.initialized = true;
        that.update();
    },

    update: function () {

        if (is_EDGE) {
            return;
        }

        var that = this;

        $(this.selector).each(function (i, element) {

            var $headline   = $(element).find('.article__headline'),
                options     = $headline.data('tween'),
                progress    = 0;

            // some sanity check
            // we wouldn't want to divide by 0 - the Universe might come to an end
            if (! empty(options) && (options.end - options.start) !== 0) {

                // progress on the total timeline (ac)
                progress = (1 / (options.end - options.start)) * (latestKnownScrollY - options.start);

                // progress on partial timeline (bc)
                // point B being labeled as "animated"
                var partialProgress = options.ab + options.bc * progress;

                $headline.data('progress', partialProgress);

                if (!$headline.data("animated")) {
                    return;
                }

                if (0 > progress) {
                    partialProgress = options.ab;
                }

                if (1 > partialProgress) {
                    options.timeline.progress(partialProgress);
                    return;
                }

                options.timeline.progress(1);
            }
        });
    }
}
/* --- Sticky Header Init --- */

var StickyHeader = (function() {

    var headerSelector      = '.site-header',
        $header             = $(headerSelector),
        headerHeight,
        $headers,
        offset;

    function init() {
        headerHeight = $header.outerHeight(),
        $headers = $('.article__header'),
        offset = $headers.length ? $headers.first().outerHeight() : 0;
    }

    function update() {
        if ( latestKnownScrollY > offset - headerHeight - 1) {
            $header.removeClass('headroom--top').addClass('headroom--not-top');
        } else {
            $header.removeClass('headroom--not-top').addClass('headroom--top');
        }
    }

    return {
        init: init,
        update: update
    }
})();
/* ====== INTERNAL FUNCTIONS ====== */

/* --- NICESCROLL --- */

var $body = $( 'body' ),
	$html = $( 'html' ),
	$window = $( window ),
	$document = $( document ),
	documentHeight = $document.height(),
	aspectRatio = windowWidth / windowHeight,
	orientation = getOrientation(),
	isTouch = ! ! ( ( "ontouchstart" in window ) || window.DocumentTouch && document instanceof DocumentTouch );

function niceScrollInit() {
	if ( globalDebug ) {
		console.log( "NiceScroll Init" );
	}

	var smoothScroll = $( 'body' ).data( 'smoothscrolling' ) !== undefined,
		root = document.documentElement;

	if ( smoothScroll && ! is_EDGE && ! Modernizr.touchevents && ! is_mobile_ie && ! is_OSX ) {

		var $window = $( window );		// Window object

		$window.on( "mousewheel DOMMouseScroll", function( event ) {

			var scrollTo,
				scrollDistance = 400,
				delta;

			if ( event.type == 'mousewheel' ) {
				delta = event.originalEvent.wheelDelta / 120;
			}
			else if ( event.type == 'DOMMouseScroll' ) {
				delta = - event.originalEvent.detail / 3;
			}

			scrollTo = latestKnownScrollY - delta * scrollDistance;

			if ( scrollTo ) {

				event.preventDefault();

				TweenMax.to( $window, .6, {
					scrollTo: {
						y: scrollTo,
						autoKill: true
					},
					ease: Power1.easeOut,	// For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
					autoKill: true,
					overwrite: 5
				} );

			}

		} );

	}

}


function smoothScrollTo( y, speed ) {

	speed = typeof speed == "undefined" ? 1 : speed;

	var distance = Math.abs( latestKnownScrollY - y ),
		time = speed * distance / 2000;

	TweenMax.to( $( window ), time, {scrollTo: {y: y, autoKill: false, ease: Quint.easeInOut}} );
}


function menuTrigger() {

	$( '.js-nav-trigger' ).on( 'click', function( e ) {

		e.preventDefault();
		e.stopPropagation();

		var $html = $( 'html' );

		if ( $html.hasClass( 'navigation--is-visible' ) ) {
			$html.removeClass( 'navigation--is-visible' );
		} else {
			$html.addClass( 'navigation--is-visible' );

			if ( $html.is( '.is--ancient-android, .is--winmob, .is--ie' ) ) {
				$( '.navigation--main' ).height( windowHeight );
			}
		}
	} );
}


/* --- $VIDEOS --- */

function initVideos() {

	var videos = $( 'iframe, video' );

	// Figure out and save aspect ratio for each video
	videos.each( function() {
		$( this ).data( 'aspectRatio', this.width / this.height )
		         // and remove the hard coded width/height
		         .removeAttr( 'height' )
		         .removeAttr( 'width' );
	} );

	// Firefox Opacity Video Hack
	$( 'iframe' ).each( function() {
		var url = $( this ).attr( "src" );
		if ( ! empty( url ) ) {
			$( this ).attr( "src", setQueryParameter( url, "wmode", "transparenartt" ) );
		}
	} );
}


function resizeVideos() {

	var videos = $( 'iframe, video' );

	videos.each( function() {
		var video = $( this ),
			ratio = video.data( 'aspectRatio' ),
			w = video.css( 'width', '100%' ).width(),
			h = w / ratio;
		video.height( h );
	} );
}


/* ====== INTERNAL FUNCTIONS END ====== */

function init() {
	if ( globalDebug ) {
		console.group( "Init" );
	}

	// /* GLOBAL VARS */
	touch = false;

	if ( typeof (
			isIe
		) != 'undefined' || (
		     ! (
			     window.ActiveXObject
		     ) && "ActiveXObject" in window
	     ) ) {
		$( 'html' ).addClass( 'is--ie' );
	}

	if ( is_EDGE ) {
		$( 'html' ).addClass( 'is--ie-edge' );
	}

	//  GET BROWSER DIMENSIONS
	browserSize();

	// /* DETECT PLATFORM */
	platformDetect();

	loadAddThisScript();

	if ( is_android || window.opera ) {
		$( 'html' ).addClass( 'android-browser' ).removeClass( 'no-android-browser' );
	}

	/* ONE TIME EVENT HANDLERS */
	eventHandlersOnce();

	/* INSTANTIATE EVENT HANDLERS */
	eventHandlers();
	updateHeaderPadding();

//	move waves in siblings so they keep up with the parallax
//	var $waves = jQuery( '.border-waves' ).not( '.site-footer' );
//	$waves.removeClass( 'border-waves' );
//
//	$waves.each( function( i, obj ) {
//		var $wave = $( obj );
//		$wave.prevAll( '.article__header' ).first().find( '.article__parallax' ).addClass( 'border-waves-top' );
//		$wave.nextAll( '.article__header' ).first().find( '.article__parallax' ).addClass( 'border-waves-bottom' );
//		$wave.next( '.site-footer' ).addClass( 'border-waves-bottom' );
//	} );
//
//	$( '.site-footer.border-waves' ).prevAll( 'article__header' ).first().find( '.article__parallax' ).addClass( 'border-waves-top border-waves-top--dark' );


	$( '.navigation--main' ).on( 'DOMMouseScroll mousewheel', function( ev ) {
		var $this = $( this ),
			scrollTop = this.scrollTop,
			scrollHeight = this.scrollHeight,
			height = $this.height(),
			delta = (
				ev.type == 'DOMMouseScroll' ?
				ev.originalEvent.detail * - 40 :
					ev.originalEvent.wheelDelta
			),
			up = delta > 0;

		var prevent = function() {
			ev.stopPropagation();
			ev.preventDefault();
			ev.returnValue = false;
			return false;
		};

		if ( ! up && - delta > scrollHeight - height - scrollTop ) {
			// Scrolling down, but this will take us past the bottom.
			$this.scrollTop( scrollHeight );
			return prevent();
		} else if ( up && delta > scrollTop ) {
			// Scrolling up, but this will take us past the top.
			$this.scrollTop( 0 );
			return prevent();
		}
	} );

	if ( globalDebug ) {
		console.groupEnd();
	}
}

/* ====== EVENT HANDLERS ====== */

function eventHandlersOnce() {
	if ( globalDebug ) {
		console.group( "Event Handlers Once" );
	}

	menuTrigger();

	if ( globalDebug ) {
		console.groupEnd();
	}
}

function eventHandlers() {
	if ( globalDebug ) {
		console.group( "Event Handlers" );
	}


	//Magnific Popup arrows
	$( 'body' ).off( 'click', '.js-arrow-popup-prev', magnificPrev ).on( 'click', '.js-arrow-popup-prev', magnificPrev );
	$( 'body' ).off( 'click', '.js-arrow-popup-next', magnificNext ).on( 'click', '.js-arrow-popup-next', magnificNext );

	$( document ).on( 'spam.wpcf7 invalid.wpcf7 mailsent.wpcf7 mailfailed.wpcf7', function() {
		setTimeout( function() {
			CoverAnimation.initialize();
		}, 300 );
	} );

	var filterHandler;

	if ( touch ) {
		filterHandler = 'click';
	} else {
		filterHandler = 'hover';
	}

	if ( touch && windowWidth < 900 ) {
		HandleSubmenusOnTouch.init();
	}

	if ( ieMobile ) {
		filterHandler = 'click';
	}

	$( '.pix-dropdown' ).on( filterHandler, function( e ) {
		e.stopPropagation();

		$( this ).toggleClass( 'active' );
	} );

	if ( globalDebug ) {
		console.groupEnd();
	}
}


/* --- GLOBAL EVENT HANDLERS --- */

function magnificPrev( e ) {
	if ( globalDebug ) {
		console.log( "Magnific Popup Prev" );
	}

	e.preventDefault();
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.prev();
	return false;
}

function magnificNext( e ) {
	if ( globalDebug ) {
		console.log( "Magnific Popup Next" );
	}

	e.preventDefault();
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.next();
	return false;
}


// $(window).bind('beforeunload', function(event) {
// 	if (globalDebug) {console.log("ON BEFORE UNLOAD");}

// 	event.stopPropagation();

// 	animateBlog('out');
// });


/* ====== ON DOCUMENT READY ====== */

$( document ).ready( function() {

	if ( globalDebug ) {
		console.group( "OnDocumentReady" );
	}

	/* --- INITIALIZE --- */
	init();

	if ( globalDebug ) {
		console.groupEnd();
	}
} );


/* ====== ON WINDOW LOAD ====== */

$( window ).load( function() {

	if ( globalDebug ) {
		console.group( "OnWindowLoad" );
	}

	StickyHeader.init();

	if ( is_mobile_ie ) {
		$( "html" ).addClass( "mobile-ie" );
	}

	//Set textarea from contact page to autoresize
	if ( $( "textarea" ).length ) {
		$( "textarea" ).autosize();
	}

	if ( ! $( 'html' ).is( '.ie9, .lt-ie9' ) ) {
		setTimeout( function() {
			CoverAnimation.initialize();
		}, 600 );
	} else {
		setTimeout( function() {
			CoverAnimation.initialize();
		}, 400 );
	}

	niceScrollInit();

	magnificPopupInit();
	initVideos();
	resizeVideos();
	gmapInit();
	gmapMultiplePinsInit();


	if ( ! empty( $( '#date-otreservations' ) ) ) {
		var dateFormat = $( '#date-otreservations' ).closest( '.otw-wrapper' ).children( '.txtDateFormat' ).attr( 'value' ).toUpperCase();

		// Pikaday
		var picker = new Pikaday( {
			field: document.getElementById( 'date-otreservations' ),
			format: dateFormat,
			minDate: moment().toDate(),
			defaultDate: moment().toDate(),
			setDefaultDate: true
		} );
	}

	$( '.pixcode--tabs' ).organicTabs();
	DownArrow.initialize();

	setTimeout( function() {
		ScrollToTop.initialize();
	}, 60 );

	royalSliderInit();
	updateHeaderPadding();

	loop();

	var $bulletedSections = $('[data-bully]');

	if ( $bulletedSections.length > 1 ) {

		$bulletedSections.bully();

		$('.c-bully__bullet').each(function (i, obj) {

			var stagger = i * 400,
				$obj    = $(obj);

			setTimeout(function () {
				$obj.addClass('c-bully__bullet--pop');
			}, stagger);
		});
	}


	$html.addClass( 'is--loaded' );
} );

function getOrientation() {
	return windowWidth > windowHeight ? "landscape" : "portrait";
}

function updateHeaderPadding() {
	var $header = $( '.site-header' ),
		headerHeight = $header.outerHeight();

	if ( ! $header.next().is( '.c-hero' ) ) {
		$('#page').css('paddingTop', headerHeight);
	}
}

$window.on( 'resize', function() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

} );

$( window ).on( "debouncedresize", onResize );

$( window ).on( "rellax:restart", function() {
	$( '.js-pixslider' ).each(function(i, obj) {
		var rs = $(obj).data('royalSlider');

		if (typeof rs !== "undefined") {
			rs.updateSliderSize(true);
		}
	});
});

function onResize() {
	var neworientation = getOrientation();

	if ( neworientation !== orientation ) {
		orientation = neworientation;
		$( window ).trigger( "debouncedorientationchange" );
	}

	resizeVideos();

	if ( touch && windowWidth < 900 ) {
		HandleSubmenusOnTouch.init();
	} else {
		HandleSubmenusOnTouch.release();
	}

	requestAnimationFrame( refreshStuff );
}

function refreshStuff() {
	CoverAnimation.initialize();
	ScrollToTop.initialize();
}


function updateStuff() {
	ScrollToTop.update();
	DownArrow.update();
	CoverAnimation.update();

	if ( windowWidth >= 900 ) {
		StickyHeader.update();
	}
}

$( window ).on( "organicTabsChange", function() {
	onResize();
	refreshStuff();
} );

$window.scroll( function() {
	newScrollY = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
} );

function loop() {
	// Avoid calculations if not needed
	if ( latestKnownScrollY !== newScrollY ) {
		latestKnownScrollY = newScrollY;
		updateStuff();
	}
	requestAnimationFrame( loop );
}

if ( navigator.userAgent.match( /iPad;.*CPU.*OS 7_\d/i ) && window.innerHeight != document.documentElement.clientHeight ) {

	var fixViewportHeight = function() {
		$( 'html, body' ).outerHeight( window.innerHeight );
	};

	window.addEventListener( "scroll", fixViewportHeight, false );
	window.addEventListener( "orientationchange", fixViewportHeight, false );
	fixViewportHeight();
}

function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf( 'MSIE ' );
	if ( msie > 0 ) {
		// IE 10 or older => return version number
		return parseInt( ua.substring( msie + 5, ua.indexOf( '.', msie ) ), 10 );
	}

	var trident = ua.indexOf( 'Trident/' );
	if ( trident > 0 ) {
		// IE 11 => return version number
		var rv = ua.indexOf( 'rv:' );
		return parseInt( ua.substring( rv + 3, ua.indexOf( '.', rv ) ), 10 );
	}

	var edge = ua.indexOf( 'Edge/' );
	if ( edge > 0 ) {
		// IE 12 => return version number
		return parseInt( ua.substring( edge + 5, ua.indexOf( '.', edge ) ), 10 );
	}

	// other browser
	return false;
}


// smooth scrolling to anchors
$( function() {

	var $header = $( '.site-header' ),
		headerHeight = parseInt( $header.outerHeight(), 10 ),
		$html = $( 'html' );

	$( '.site-header a[href*="#"]:not([href="#"])' ).click( function() {

		var timeout = 0;

		if ( $html.hasClass( 'navigation--is-visible' ) ) {
			$( 'body' ).css( 'overflow', '' );
			$html.removeClass( 'navigation--is-visible' );
			timeout = 600;
		}


		if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
			var target = $( this.hash );
			target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
			if ( target.length ) {
				setTimeout( function() {
					$( 'html,body' ).animate( {
						scrollTop: target.offset().top - headerHeight
					}, 1000 );
				}, timeout );
				return false;
			}
		}

	} );
} );

$( "[data-rellax]" ).rellax();

$.fn.rellax.defaults.bleed = 60;
$.fn.rellax.defaults.reloadEvent = "ontouchstart" in window && "onorientationchange" in window ? "debouncedorientationchange" : "debouncedresize";

/* --- 404 Page --- */
gifImages = [
	"http://i.imgur.com/ShiZM6m.gif",
    "http://i.imgur.com/8ZYNp.gif",
    "http://i.imgur.com/Xb4fq.gif",
    "http://i.imgur.com/UYPLKwN.gif",
    "http://media.tumblr.com/d9e792a91d5391b8a7aa22689d4e2555/tumblr_inline_mwq1hmelce1qmoozl.gif",
    "http://www.teen.com/wp-content/uploads/2013/10/world-without-jennifer-lawrence-gifs-food-uproxx-2.gif"
]

function getGif() {
	return gifImages[Math.floor(Math.random() * gifImages.length)];
}

function changeBackground() {
	$('.error404').css('background-image', 'url(' + getGif() + ')');
}

$(window).on('load', function() {
    if ($('.error404').length) {
        changeBackground();
    }
});

$(window).keydown(function (e) {
	if (e.keyCode == 32) {
		changeBackground();
	}
});


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

//here we change the link of the Edit button in the Admin Bar
//to make sure it reflects the current page
function adminBarEditFix(id) {
	//get the admin ajax url and clean it
	var baseURL = ajaxurl.replace('admin-ajax.php', 'post.php');

	$('#wp-admin-bar-edit a').attr('href', baseURL + '?post=' + id + '&action=edit');
}

/* --- Load AddThis Async --- */
function loadAddThisScript() {
	if (window.addthis) {
		if (globalDebug) {
			console.log("AddThis Load Script");
		}
		// Listen for the ready event
		addthis.addEventListener('addthis.ready', addthisReady);
		addthis.init();
	}
}

/* --- AddThis On Ready - The API is fully loaded --- */
//only fire this the first time we load the AddThis API - even when using ajax
function addthisReady() {
	if (globalDebug) {
		console.log("AddThis Ready");
	}
	addThisInit();
}

/* --- AddThis Init --- */
function addThisInit() {
	if (window.addthis) {
		if (globalDebug) {
			console.log("AddThis Toolbox INIT");
		}

		addthis.toolbox('.addthis_toolbox');
	}
}

var HandleSubmenusOnTouch = (function() {

	var isInitiated = false;

	function init() {
		if( isInitiated ) return;

		// Make sure there are no open menu items
		$('.menu-item-has-children').removeClass('hover');

		// Add a class so we know the items to handle
		$('.menu-item-has-children > a').each(function () {
			$(this).addClass('prevent-one');
		});

		$('a.prevent-one').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();

			if( $(this).hasClass('active') ) {
				window.location.href = $(this).attr('href');
			}

			$('a.prevent-one').removeClass('active');
			$(this).addClass('active');

			// When a parent menu item is activated,
			// close other menu items on the same level
			$(this).parent().siblings().removeClass('hover');

			// Open the sub menu of this parent item
			$(this).parent().addClass('hover');
		});

		isInitiated = true;
	}

	function release() {
		$('a.prevent-one').unbind();
		isInitiated = false;
	}

	return {
		init: init,
		release: release
	}
}());

// returns the depth of the element "e" relative to element with id=id
// for this calculation only parents with classname = waypoint are considered
function getLevelDepth(e, id, waypoint, cnt) {
	cnt = cnt || 0;
	if (e.id.indexOf(id) >= 0) return cnt;
	if ($(e).hasClass(waypoint)) {
		++cnt;
	}
	return e.parentNode && getLevelDepth(e.parentNode, id, waypoint, cnt);
}

// returns the closest element to 'e' that has class "classname"
function closest(e, classname) {
	if ($(e).hasClass(classname)) {
		return e;
	}
	return e.parentNode && closest(e.parentNode, classname);
}

})
(jQuery, window);
// /* ====== HELPER FUNCTIONS ====== */

//similar to PHP's empty function
function empty(data) {
	if (typeof(data) == 'number' || typeof(data) == 'boolean') {
		return false;
	}
	if (typeof(data) == 'undefined' || data === null) {
		return true;
	}
	if (typeof(data.length) != 'undefined') {
		return data.length === 0;
	}
	var count = 0;
	for (var i in data) {
		// if(data.hasOwnProperty(i))
		//
		// This doesn't work in ie8/ie9 due the fact that hasOwnProperty works only on native objects.
		// http://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
		//
		// for hosts objects we do this
		if (Object.prototype.hasOwnProperty.call(data, i)) {
			count++;
		}
	}
	return count === 0;
}

function extend(a, b) {
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}

// taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
function hasParent(e, id) {
	if (!e) return false;
	var el = e.target || e.srcElement || e || false;
	while (el && el.id != id) {
		el = el.parentNode || false;
	}
	return (el !== false);
}

function mobilecheck() {
	var check = false;
	(function (a) {
		if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

/* --- Set Query Parameter--- */
function setQueryParameter(uri, key, value) {
	var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
	separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}

// http://stackoverflow.com/a/7557433
function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function getIOSVersion(ua) {
	ua = ua || navigator.userAgent;
	return parseFloat(
			('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(ua) || [0,''])[1])
				.replace('undefined', '3_2').replace('_', '.').replace('_', '')
		) || false;
}

function setProgress(timeline, start, end) {

    var progress = (latestKnownScrollY - start) / (end - start);

    if (0 > progress) {
        timeline.progress(0);
        return;
    }

    if (1 < progress) {
        timeline.progress(1);
        return;
    }

    timeline.progress(progress);
}
