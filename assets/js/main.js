// /* ====== SHARED VARS ====== */

var phone, touch, ltie9, lteie9, wh, ww, dh, ar, fonts, ieMobile;

var ua = navigator.userAgent;
var winLoc = window.location.toString();

var is_webkit = ua.match(/webkit/i);
var is_firefox = ua.match(/gecko/i);
var is_newer_ie = ua.match(/msie (9|([1-9][0-9]))/i);
var is_older_ie = ua.match(/msie/i) && !is_newer_ie;
var is_ancient_ie = ua.match(/msie 6/i);
var is_mobile = ua.match(/mobile/i);
var is_OSX = (ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false);
var is_WindowsMobile = ua.match(new RegExp("IEMobile", "i"));


var nua = navigator.userAgent;
var is_android = ((nua.indexOf('Mozilla/5.0') !== -1 && nua.indexOf('Android ') !== -1 && nua.indexOf('AppleWebKit') !== -1) && nua.indexOf('Chrome') === -1);

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

/* --- To enable verbose debug add to Theme Options > Custom Code footer -> globalDebug=true; --- */
var globalDebug = false,
	timestamp;

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

		phone = (isiPhone > -1 || isiPod > -1 || isAndroidPhone > -1) ? true : false;
		touch = $.support.touch ? true : false;
		ltie9 = $.support.leadingWhitespace ? false : true;
		lteie9 = typeof window.atob === 'undefined' ? true : false;

		var $bod = $('body');


		if (touch) $('html').addClass('touch');

		if (is_WindowsMobile) $('html').addClass('is--winmob');
		if (is_android) $('html').addClass('is--ancient-android');

		if (lteie9) $('html').addClass('lteie9');

		if (safari) $bod.addClass('safari');
		if (phone) $bod.addClass('phone');


	}
/* --- Magnific Popup Initialization --- */

function magnificPopupInit() {
	if (globalDebug) {
		console.log("Magnific Popup - Init");
	}

	$('.js-post-gallery').each(function () { // the containers for all your galleries should have the class gallery
		$(this).magnificPopup({
			delegate: 'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]', // the container for each your gallery items
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
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
				titleSrc: function (item) {
					var output = '';
					if (typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>' + item.el.attr('data-alt') + '</small>';
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
				elementParse: function (item) {

					if (this.currItem != undefined) {
						item = this.currItem;
					}

					var output = '';
					if (typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>' + item.el.attr('data-alt') + '</small>';
					}

					$('.mfp-title').html(output);
				},
				change: function (item) {
					var output = '';
					if (typeof item.el.attr('data-alt') !== "undefined" && item.el.attr('data-alt') !== "") {
						output += '<small>' + item.el.attr('data-alt') + '</small>';
					}

					$('.mfp-title').html(output);
				}
			}
		});
	});

}

/* --- Royal Slider Init --- */

function royalSliderInit($container) {
	if (globalDebug) {
		console.log("Royal Slider - Init");
	}

	$container = typeof $container !== 'undefined' ? $container : $('body');

	// Transform Wordpress Galleries to Sliders
	$container.find('.wp-gallery').each(function () {
		sliderMarkupGallery($(this));
	});

	// Find and initialize each slider
	$container.find('.js-pixslider').each(function () {

		sliderInit($(this));
	});

}

/*
 * Slider Initialization
 */
function sliderInit($slider) {

	$slider.find('img').removeClass('invisible');

	var $children = $(this).children(),
		rs_arrows = typeof $slider.data('arrows') !== "undefined",
		rs_bullets = typeof $slider.data('bullets') !== "undefined" ? "bullets" : "none",
		rs_autoheight = typeof $slider.data('autoheight') !== "undefined",
		rs_autoScaleSlider = false,
		rs_autoScaleSliderWidth = $slider.data('autoscalesliderwidth'),
		rs_autoScaleSliderHeight = $slider.data('autoscalesliderheight'),
		rs_customArrows = typeof $slider.data('customarrows') !== "undefined",
		rs_slidesSpacing = typeof $slider.data('slidesspacing') !== "undefined" ? parseInt($slider.data('slidesspacing')) : 0,
		rs_keyboardNav = typeof $slider.data('fullscreen') !== "undefined",
		rs_imageScale = $slider.data('imagescale'),
		rs_visibleNearby = typeof $slider.data('visiblenearby') !== "undefined" ? true : false,
		rs_imageAlignCenter = typeof $slider.data('imagealigncenter') !== "undefined",
		rs_transition = typeof $slider.data('slidertransition') !== "undefined" && $slider.data('slidertransition') != '' ? $slider.data('slidertransition') : 'move',
		rs_autoPlay = typeof $slider.data('sliderautoplay') !== "undefined" ? true : false,
		rs_delay = typeof $slider.data('sliderdelay') !== "undefined" && $slider.data('sliderdelay') != '' ? $slider.data('sliderdelay') : '1000',
		rs_drag = true,
		rs_globalCaption = typeof $slider.data('showcaptions') !== "undefined" ? true : false;

	if (rs_autoheight) {
		rs_autoScaleSlider = false
	} else {
		rs_autoScaleSlider = true
	}

	// Single slide case
	if ($children.length == 1) {
		rs_arrows = false;
		rs_bullets = 'none';
		rs_customArrows = false;
		rs_keyboardNav = false;
		rs_drag = false;
		rs_transition = 'fade';
	}

	// make sure default arrows won't appear if customArrows is set
	if (rs_customArrows) arrows = false;

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
		numImagesToPreload: 2
	};

	if (rs_visibleNearby) {
		royalSliderParams['visibleNearby'] = {
			enabled: true,
			//centerArea: 0.8,
			center: true,
			breakpoint: 0,
			//breakpointCenterArea: 0.64,
			navigateByCenterClick: false
		}
	}

	//lets fire it up
	$slider.royalSlider(royalSliderParams);
	$slider.addClass('slider--loaded');

	var royalSlider = $slider.data('royalSlider');
	var slidesNumber = royalSlider.numSlides;

	// create the markup for the customArrows
	if (slidesNumber > 1)
		if (royalSlider && rs_customArrows) {
			var $gallery_control = $(
				'<div class="slider-arrows  arrows-archive">' +
				'<button class="slider-arrow  slider-arrow--left  js-arrow-left"><i class="icon-chevron-left"></i></button>' +
				'<button class="slider-arrow  slider-arrow--right  js-arrow-right"><i class="icon-chevron-right"></i></button>' +
				'</div>'
			);

			if ($slider.data('customarrows') == "left") {
				$gallery_control.addClass('gallery-control--left');
			}

			$gallery_control.insertBefore($slider);

			$gallery_control.on('click', '.js-arrow-left', function (event) {
				event.preventDefault();
				royalSlider.prev();
			});

			$gallery_control.on('click', '.js-arrow-right', function (event) {
				event.preventDefault();
				royalSlider.next();
			});
		}

	royalSlider.ev.on('rsVideoPlay', function () {
		if (rs_imageScale == 'fill') {
			var $frameHolder = $('.rsVideoFrameHolder');
			var top = Math.abs(royalSlider.height - $frameHolder.closest('.rsVideoContainer').height()) / 2;

			$frameHolder.height(royalSlider.height);
			$frameHolder.css('margin-top', top + 'px');

		} else {
			var $frameHolder = $('.rsVideoFrameHolder');
			var $videoContainer = $('.rsVideoFrameHolder').closest('.rsVideoContainer');
			var top = parseInt($frameHolder.closest('.rsVideoContainer').css('margin-top'), 10);

			if (top < 0) {
				top = Math.abs(top);
				$frameHolder
					.height(royalSlider.height)
					.css('top', top + 'px');
			}
		}
	});

	if (slidesNumber == 1) $slider.addClass('single-slide');

	$slider.addClass('slider--loaded');
}

/*
 * Wordpress Galleries to Sliders
 * Create the markup for the slider from the gallery shortcode
 * take all the images and insert them in the .gallery <div>
 */
function sliderMarkupGallery($gallery) {
	var $old_gallery = $gallery,
		gallery_data = $gallery.data(),
		$images = $old_gallery.find('img'),
		$new_gallery = $('<div class="pixslider js-pixslider">');

	$images.prependTo($new_gallery).addClass('rsImg');

	//add the data attributes
	$.each(gallery_data, function (key, value) {
		$new_gallery.attr('data-' + key, value);
	})

	$old_gallery.replaceWith($new_gallery);
}
/* --- GMAP Init --- */

function gmapInit() {
	if ($('#gmap').length) {
		if (globalDebug) {console.log("GMap Init");}

		var gmap_link, gmap_variables, gmap_zoom, gmap_style;
		gmap_link = $('#gmap').data('url');
		gmap_style = typeof $('#gmap').data('customstyle') !== "undefined" ? "style1" : google.maps.MapTypeId.ROADMAP;
		var gmap_markercontent = $('#gmap').data('markercontent');

		// Overwrite Math.log to accept a second optional parameter as base for logarhitm
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

		var gmap_coordinates = [],
			gmap_zoom;

		if (gmap_link) {
			//Parse the URL and load variables (ll = latitude/longitude; z = zoom)
			var gmap_variables = get_url_parameter('ll', gmap_link);
			if (typeof gmap_variables === "undefined") {
				gmap_variables = get_url_parameter('sll', gmap_link);
			}
			// if gmap_variables is still undefined that means the url was pasted from the new version of google maps
			if (typeof gmap_variables === "undefined") {

				if (gmap_link.split('!3d') != gmap_link) {
					//new google maps old link type

					var split, lt, ln, dist, z;
					split = gmap_link.split('!3d');
					lt = split[1];
					split = split[0].split('!2d');
					ln = split[1];
					split = split[0].split('!1d');
					dist = split[1];
					gmap_zoom = 21 - Math.round(Math.log(Math.round(dist / 218), 2));
					gmap_coordinates = [lt, ln];

				} else {
					//new google maps new link type

					var gmap_link_l;

					gmap_link_l = gmap_link.split('@')[1];
					gmap_link_l = gmap_link_l.split('z/')[0];

					gmap_link_l = gmap_link_l.split(',');

					var latitude = gmap_link_l[0];
					var longitude = gmap_link_l[1];
					var zoom = gmap_link_l[2];

					if (zoom.indexOf('z') >= 0)
						zoom = zoom.substring(0, zoom.length - 1);

					gmap_coordinates[0] = latitude;
					gmap_coordinates[1] = longitude;
					gmap_zoom = zoom;
				}


			} else {
				gmap_zoom = get_url_parameter('z', gmap_link);
				if (typeof gmap_zoom === "undefined") {
					gmap_zoom = 10;
				}
				gmap_coordinates = gmap_variables.split(',');
			}
		}

		$("#gmap").gmap3({
			map: {
				options: {
					center: new google.maps.LatLng(gmap_coordinates[0], gmap_coordinates[1]),
					zoom: parseInt(gmap_zoom),
					mapTypeId: gmap_style,
					mapTypeControlOptions: {mapTypeIds: []},
					scrollwheel: false
				}
			},
			overlay: {
				latLng: new google.maps.LatLng(gmap_coordinates[0], gmap_coordinates[1]),
				options: {
					content:
                        '<div class="map__marker-wrap">' +
                            '<div class="map__marker">' +
                                    gmap_markercontent +
                            '</div>' +
                        '</div>'
				}
			},
			styledmaptype: {
				id: "style1",
				options: {
					name: "Style 1"
				},
				styles: [
                    {
                        "stylers": [
                            { "saturation": -100 },
                            { "gamma": 1.45 },
                            { "visibility": "simplified" }
                        ]
                    },{
                        "featureType": "road",
                        "stylers": [
                            { "hue": "#ffaa00" },
                            { "saturation": 48 },
                            { "gamma": 0.53 },
                            { "visibility": "on" }
                        ]
                    },{
                        "featureType": "administrative",
                        "stylers": [
                            { "visibility": "on" }
                        ]
                    }
                ]
			}
		});
    }
}

/* --- Parallax Init --- */

function parallaxInit() {

	if (globalDebug) {console.log("Parallax Init");}

	var imgSelector         = '.article__parallax img',
		parallaxAmount      = 0.5,
        latestKnownScrollY  = window.scrollY,
        ticking             = false;

    // prepare images for parallax effect
    function prepare() {

        $(imgSelector).each(function (i, img) {

            var $img                = $(img),
                imgHeight           = $img.height(),
                imgWidth            = $img.width(),
                $container          = $img.closest('.article__header'),
                containerHeight     = $container.outerHeight(),
                parallaxDistance    = (wh - containerHeight) * parallaxAmount,
                // find scale needed for the image to fit container and move desired amount
                scaleY              = (parallaxDistance + (containerHeight * parallaxAmount)) / imgHeight,
                scaleX              = ww / imgWidth,
                scale               = Math.max(1, scaleX, scaleY),
                // calculate needed values to properly move the image on scroll
                initialTop          = -1 * (parallaxDistance) / 2 - (containerHeight * parallaxAmount),
                finalTop            = -1 * initialTop,
                start               = $container.offset().top - wh,
                end                 = start + wh + containerHeight,
                timeline            = new TimelineMax({paused: true});

            // scale image up to desired size
            $img.css({
                width: parseInt(imgWidth * scale, 10),
                height: parseInt(imgHeight * scale, 10)
            });

            // fade image in
            TweenMax.to($img, 0.6, {opacity: 1});

            // create timeline for current image
            timeline.append(TweenMax.fromTo($img.closest('.article__parallax'), 0.1, {
                y: initialTop,
                ease: Linear.easeNone
            }, {
                y: finalTop,
                ease: Linear.easeNone
            }));

            // bind sensible variables for tweening to the image using a data attribute
            $img.data('tween', {
                timeline: timeline,
                start: start,
                end: end
            });

        });

    }

	function update() {
		ticking = false;

		var scrollTop = latestKnownScrollY;

		$(imgSelector).each(function (i, img) {

			var $img = $(img),
				options = $img.data('tween'),
				progress = 0;

			//some sanity check
			//we wouldn't want to divide by 0 - the Universe might come to an end
			if (! empty(options) && (options.end - options.start) !== 0) {
				progress = (1 / (options.end - options.start)) * (scrollTop - options.start);

				if (0 > progress) {
					$img.css({'visibility': 'hidden'});
					return;
				}

				if (1 > progress) {
					options.timeline.progress(progress);
					$img.css({'visibility': 'visible'});
					return;
				}
			}

			$img.css({'visibility': 'hidden'});
		});
	}

	$(window).scroll(function () {
		latestKnownScrollY = window.scrollY;
		requestTick();
	});

	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}

    function initialize() {
        prepare();
        update();
    }

    $(window).on('resize orientationchange', initialize);
    initialize();
}

function navigatorInit() {

    var $navigator      = $('.navigator'),
        $headers        = $('.article__header'),
        currentSelected = 0,
        lastSelected    = 0,
        isWhite         = true,
        wasWhite        = true,
        scrollDuration  = 300,
        latestKnownScrollY = window.scrollY,
        ticking = false;

    // if we're not on a page or there's only one header ABORT MISSION!
    if (!$navigator.length || $headers.length < 2) {
        return;
    }

    // add bullets to the indicator for each header found
    $headers.each(function (i, header) {
        var $header = $(header),
            $button = $('<a href="#" class="navigator__item"><div class="bullet"></div></a>');

        $button.appendTo($navigator);
        $header.data('offsetTop', $header.offset().top);

        $button.on('click', function (e) {

            e.preventDefault();

            var headerTop   = $header.data('offsetTop'),
                distance    = Math.abs(latestKnownScrollY - headerTop),
                duration    = scrollDuration * distance / 1000;

            $('html, body').animate({
                scrollTop: headerTop
            }, {
                duration: duration,
                easing: "easeOutCubic"
            });

            return false;
        });
    });

    // add an indicator for the section that's currently in the viewport
    var $selected = $('<div class="navigator__item  navigator__item--selected"><div class="bullet"></div></div>').appendTo($navigator);

    // after all the bullets have been added vertically center the navigator
    $navigator.css({
        'margin-top': -1 * $navigator.height() / 2
    });

    // update
    requestTick();
    TweenMax.to($navigator, 0.3, {opacity: 1});

    // function used to update navigator's color and indicator's position
    function update() {

        ticking = false;

        // loop through each header and find current state
        $headers.each(function(i, header) {

            var $header         = $(header),
                headerTop       = $header.data('offsetTop'),
                headerBottom    = headerTop + $header.outerHeight(),
                navigatorMiddle = latestKnownScrollY + (wh / 2);

            if (navigatorMiddle > headerTop) {
                currentSelected = i;
                isWhite = true;

                if (navigatorMiddle > headerBottom) {
                    isWhite = false;
                }
            }

        });

        // if the navigator's indicator has to be moved
        // then move it accordingly and update state
        if (lastSelected != currentSelected) {
            lastSelected = currentSelected;
            TweenMax.to($selected, 0.3, {top: 24 * currentSelected});
        }

        // if the navigator's color has to be changed
        // then change it accordingly and update state
        if (wasWhite != isWhite) {
            wasWhite = isWhite;
            $navigator.toggleClass('navigator--black', !isWhite);
        }

    }

    $(window).scroll(function () {
        latestKnownScrollY = window.scrollY;
        requestTick();
    });

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }
}
/* --- Sticky Header Init --- */

function stickyHeaderInit() {

    var headerSelector      = '.site-header',
        $header             = $(headerSelector),
        headerHeight        = $header.height();

    $header.headroom({
        tolerance: 15,
        // animate with GSAP
        onPin: function () {
            TweenMax.to($header, 0.1, {
                y: 0
            });
        },
        onUnpin: function () {
            TweenMax.to($header, 0.1, {
                y: -1 * headerHeight
            });
        }
    });
}

/* ====== INTERNAL FUNCTIONS ====== */

/* --- Load Web Fonts --- */

function loadWebFonts() {
	if (globalDebug) {console.log("Load Web Fonts");}

	if (typeof WebFontConfig != 'undefined') {
		WebFont.load(WebFontConfig);
	}
}

/* --- NICESCROLL --- */
function niceScrollInit() {
	if (globalDebug) {console.log("NiceScroll Init");}

	var smoothScroll = $('body').data('smoothscrolling') !== undefined;

	if (smoothScroll && ww > 899 && !touch && !is_OSX) {
		$('html').addClass('nicescroll');
		$('[data-smoothscrolling]').niceScroll({
			zindex: 9999,
			cursorcolor: '#000000',
			cursoropacitymin: 0.1,
			cursoropacitymax: 0.5,
			cursorwidth: 4,
			cursorborder: 0,
			railpadding: { right : 2 },
			mousescrollstep: 40,
			scrollspeed: 100,
			hidecursordelay: 100
		});
	}

}

function scrollToTopInit() {

    if (!empty($('.up-link'))) {

        if (globalDebug) {console.log("ScrollToTop Init");}

		var offset      = 220,
            duration    = 300;

		$(window).scroll(function() {
			if ($(this).scrollTop() > offset) {
				$('.up-link').fadeIn(duration);
			} else {
				$('.up-link').fadeOut(duration);
			}
		});

		$('.up-link').click(function(e) {
			e.preventDefault();

            var scrollDuration = window.scrollY * duration / 1000;

            $('html, body').animate({
                scrollTop: 0
            }, {
                duration: scrollDuration,
                easing: "easeOutCubic"
            });

            return false;
		});
	}
}

// Menu Hover with delay
//function menusHover() {
//    $('.menu-item-has-children').hoverIntent({
//        interval: 0,
//        timeout: 300,
//        over: showMenu,
//        out: hideMenu
//    })
//
//    function showMenu() {
//        var self = $(this);
//        self.removeClass('hidden');
//        setTimeout(function(){
//            self.addClass('open');
//        }, 150);
//    }
//    function hideMenu() {
//        var self = $(this);
//        self.removeClass('open');
//        setTimeout(function(){
//        self.addClass('hidden');
//        }, 150);
//    }
//}

function menuTrigger(){
    $(document).on('click', '.js-nav-trigger', function(e) {
        var windowHeigth = $(window).height();

        e.preventDefault();
        e.stopPropagation();

        if($('html').hasClass('navigation--is-visible')){
            $('#page').css('height', '');
            $('html').removeClass('navigation--is-visible');
        } else {
            $('#page').height(windowHeigth);
            $('html').addClass('navigation--is-visible');
        }
    });
}


/* --- $VIDEOS --- */

function initVideos() {

    var videos = $('iframe, video');

    // Figure out and save aspect ratio for each video
    videos.each(function() {
        $(this).data('aspectRatio', this.width / this.height)
            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');
    });

    // Firefox Opacity Video Hack
    $('iframe').each(function(){
		var url = $(this).attr("src");
	    if ( !empty(url) )
			$(this).attr("src", setQueryParameter(url, "wmode", "transparent"));
	});
}


function resizeVideos() {

    var videos = $('iframe, video');

    videos.each(function() {
        var video = $(this),
            ratio = video.data('aspectRatio'),
            w = video.css('width', '100%').width(),
            h = w/ratio;
        video.height(h);
    });
}

function containerPlacement(){
	$('.js-container').css('padding-top', $('.js-sticky').height() + 'px');
}


/* ====== INTERNAL FUNCTIONS END ====== */

function init(){
	if (globalDebug) {console.group("Init");}

	// /* GLOBAL VARS */
	touch = false;

	//  GET BROWSER DIMENSIONS
	browserSize();

	// /* DETECT PLATFORM */
	platformDetect();

	loadAddThisScript();

	if (is_android || window.opera) {
		$('html').addClass('android-browser').removeClass('no-android-browser');
	}

	var is_retina = (window.retina || window.devicePixelRatio > 1);
	if (is_retina && $('.site-logo--image-2x').length) {
	    var image = $('.site-logo--image-2x').find('img');

	    if (image.data('logo2x') !== undefined) {
	        image.attr('src', image.data('logo2x'));
	        $('.site-logo--image-2x').addClass('using-retina-logo');
	    }
	}

	$('html').addClass('loaded');
//	stickyHeader();

	/* ONE TIME EVENT HANDLERS */
	eventHandlersOnce();

	/* INSTANTIATE EVENT HANDLERS */
	eventHandlers();

	if (globalDebug) {console.groupEnd();}
}


/* ====== CONDITIONAL LOADING ====== */

function loadUp(){
	if (globalDebug) {console.group("LoadUp");}

	//load web fonts
	//loadWebFonts();

	// always
	niceScrollInit();

	royalSliderInit();

	//menusHover();

	magnificPopupInit();

	initVideos();
	resizeVideos();

	gmapInit();

	//Set textarea from contact page to autoresize
	if($("textarea").length) { $("textarea").autosize(); }

	$(".pixcode--tabs").organicTabs();

	if (globalDebug) {console.groupEnd();}
}


/* ====== EVENT HANDLERS ====== */

function eventHandlersOnce() {
	if (globalDebug) {console.group("Event Handlers Once");}

    menuTrigger();
	scrollToTopInit();

	if (globalDebug) {console.groupEnd();}
}

function eventHandlers() {
	if (globalDebug) {console.group("Event Handlers");}


	//Magnific Popup arrows
	$('body').off('click', '.js-arrow-popup-prev', magnificPrev).on('click', '.js-arrow-popup-prev', magnificPrev);
	$('body').off('click', '.js-arrow-popup-next', magnificNext).on('click', '.js-arrow-popup-next', magnificNext);

	if (globalDebug) {console.groupEnd();}
}


/* --- GLOBAL EVENT HANDLERS --- */

function magnificPrev(e) {
	if (globalDebug) {console.log("Magnific Popup Prev");}

	e.preventDefault();
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.prev();
	return false;
}

function magnificNext(e) {
	if (globalDebug) {console.log("Magnific Popup Next");}

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

$(document).ready(function(){

	if (globalDebug) {console.group("OnDocumentReady");}

	/* --- INITIALIZE --- */
	init();
	loadUp();

	if (globalDebug) {console.groupEnd();}
});


/* ====== ON WINDOW LOAD ====== */

$(window).load(function(){

	if (globalDebug) {console.group("OnWindowLoad");}

    if (ww > 900){
        stickyHeaderInit();
    }

    parallaxInit();
    navigatorInit();


    if(!empty($('#date-otreservations'))){
        // Pikaday
        var picker = new Pikaday({
            field: document.getElementById('date-otreservations'),
            format: 'MM/DD/YYYY'
        });
    }

	$('.pixcode--tabs').organicTabs();

});


/* ====== ON RESIZE ====== */

$(window).on("debouncedresize", function(e){

	if (globalDebug) {console.group("OnResize");}

	niceScrollInit();
	resizeVideos();

});
/* --- 404 Page --- */
var gifImages = [
	"http://i.imgur.com/c9X6n.gif",
	"http://i.imgur.com/eezCO.gif",
	"http://i.imgur.com/DYO6X.gif",
	"http://i.imgur.com/9DWBx.gif",
	"http://i.imgur.com/8ZYNp.gif",
	"http://media1.giphy.com/media/vonLA9G2VvENG/giphy.gif",
	"http://media2.giphy.com/media/UslGBU1GPKc0g/giphy.gif",
	"http://media.giphy.com/media/LD0OalPb8u8Le/giphy.gif",

]

function getGif() {
	return gifImages[Math.floor(Math.random() * gifImages.length)];
}

function changeBackground() {
	$('.error404').css('background-image', 'url(' + getGif() + ')');
}


if ($('.error404').length) {
	changeBackground();
}

$(window).keydown(function (e) {
	if (e.keyCode == 32) {
		changeBackground();
	}
})
/* === Functions that require jQuery but have no place on this Earth, yet === */


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

// http://coveroverflow.com/a/11381730/989439
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