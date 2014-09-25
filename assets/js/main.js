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

var windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;

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
		lteie9 = typeof window.atob === 'undefined' ? true : false;

		var $bod = $('body');


		if (touch) $('html').addClass('touch');

		if (ieMobile) $('html').addClass('is--winmob');
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
		rs_globalCaption = typeof $slider.data('showcaptions') !== "undefined" ? true : false,
        is_headerSlider = $slider.hasClass('header--slideshow') ? true : false,
        hoverArrows = typeof $slider.data('hoverarrows') !== "undefined";

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
        rs_customArrows = false;
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
    if (royalSlider && rs_customArrows) {

        var classes = '';

        if(is_headerSlider) classes = 'slider-arrows-header';
        if(hoverArrows && !Modernizr.touch) classes += ' arrows--hover ';

        var $gallery_control = $(
            '<div class="' + classes + '">' +
            '<div class="rsArrow rsArrowLeft js-arrow-left" style="display: block;"><div class="rsArrowIcn"></div></div>' +
            '<div class="rsArrow rsArrowRight js-arrow-right" style="display: block;"><div class="rsArrowIcn"></div></div>' +
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

    if(hoverArrows && !Modernizr.touch){
        hoverArrow($('.slider-arrows-header .rsArrow'));

    }

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

/*
    Get slider arrows to hover, following the cursor
 */

function hoverArrow($arrow){
    var $mouseX = 0, $mouseY = 0;
    var $arrowH = 35, $arrowW = 35;

    $arrow.mouseenter(function(e){
        $(this).addClass('visible');

        moveArrow($(this));
    });

    var $loop;

    function moveArrow($arrow){
        var $mouseX;
        var $mouseY;

        $arrow.mousemove(function(e){
            $mouseX = e.pageX - $arrow.offset().left;
            $mouseY = e.pageY - $arrow.offset().top;
        });

        var $arrowIcn = $arrow.find('.rsArrowIcn');

        $loop = setInterval(function(){
            TweenMax.to($arrowIcn, 0, {x: $mouseX, y: $mouseY, z: 0.01});
        }, 10);


        $arrow.mouseleave(function(e){
            $(this).removeClass('visible');
            clearInterval($loop);
        });
    }
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
                            { "gamma": 2.45 },
                            { "visibility": "simplified" }
                        ]
                    },{
                        "featureType": "road",
                        "stylers": [
                            { "hue": $("body").data("color") ? $("body").data("color") : "#ffaa00" },
                            { "saturation": 48 },
                            { "gamma": 0.40 },
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

var Parallax = {
    selector:   '.article__parallax',
    amount:     0.5,

    $el:        $(this.selector),

    initialize: function () {

        if (Modernizr.touch) {
            this.amount = 0;
        }

        this.prepare();
        this.update(latestKnownScrollY, false);
    },

    prepare: function() {

        var that = this;

        $(this.selector).each(function (i, element) {

            var $parallax           = $(element),
                $container          = $parallax.parent(),
                containerTop        = $container.offset().top,
                containerWidth      = $container.outerWidth(),
                containerHeight     = $container.outerHeight(),
                parallaxInfo        = {
                    start:          containerTop - windowHeight,
                    end:            containerTop + containerHeight
                },
                initialTop          = -1 * (windowHeight + containerHeight) * that.amount / 2;
                finalTop            = -1 * initialTop;


            $parallax.css({
                height: containerHeight + windowHeight * that.amount,
                'top': -1 * windowHeight * that.amount / 2
            });

            if ($parallax.hasClass('article__parallax--img') && $parallax.find('img').length) {

                $parallax.find('img').each(function (i, element) {

                    var $image          = $(element),
                        imageHeight     = $image.height(),
                        imageWidth      = $image.width(),
                        // find scale needed for the image to fit container and move desired amount
                        scaleY          = ((windowHeight - containerHeight) * that.amount + containerHeight) / imageHeight,
                        scaleX          = containerWidth / imageWidth,
                        scale           = Math.max(scaleX, scaleY);

                    // header resizing on mobile makes image too small
                    // 80 pixels should be enough
                    if (Modernizr.touch) {
                        scaleY = (scaleY * imageHeight + 80) / imageHeight;
                        scale = Math.max(scaleX, scaleY);
                    }

                    // scale image up to desired size
                    $image.css({
                        width: parseInt(imageWidth * scale + 1, 10),
                        height: parseInt(imageHeight * scale + 1, 10)
                    });

                    // fade image in
                    TweenMax.to($image, 0.5, {opacity: 1});
                });
            }

            var timeline = new TimelineMax({ paused: true });

            // create timeline for current image
            timeline.append(TweenMax.fromTo($parallax, 1, {
                y: initialTop
            }, {
                y: finalTop,
                ease: Linear.easeNone
            }));

            parallaxInfo.timeline = timeline;

            // bind sensible variables for tweening to the image using a data attribute
            $parallax.data('parallax', parallaxInfo);

        });
    },

    update: function() {

        if (this.amount == 0 || !$(this.selector).length) {
            return;
        }

        $(this.selector).each(function (i, element) {

            var $parallax   = $(element),
                options     = $parallax.data('parallax'),
                progress    = 0;

            // some sanity check
            // we wouldn't want to divide by 0 - the Universe might come to an end
            if (! empty(options) && (options.end - options.start) !== 0) {
                progress = (1 / (options.end - options.start)) * (latestKnownScrollY - options.start);


                if (0 > progress) {
                    options.timeline.progress(0);
                    return;
                }

                if (1 < progress) {
                    options.timeline.progress(1);
                    return;
                }

                options.timeline.progress(progress);
            }
        });
    }
};

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
        this.$next      = this.$arrow.closest('.article__header').nextAll('.article__header, .article--page').first();

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
                smoothScrollTo(that.nextTop - $('.site-header').outerHeight());
            }

        });
    },

    update: function () {

        if (empty(this.$arrow) || this.bubble) {
            return;
        }

        if (Modernizr.touch && is_OSX) {
            this.timeline.progress(0);
            return;
        }

        setProgress(this.timeline, this.start, this.end);
    }
}
var ScrollToTop = {
    selector:   '.btn--top',
    $button:    null,
    offsetTop:  0,
    start:      0,
    end:        0,
    timeline:   null,
    played:     false,

    initialize: function () {

        this.$button = $(this.selector);

        if (empty(this.$button)) {
            return;
        }

        var footerHeight = $('.copyright-area').outerHeight();

        this.offsetTop  = this.$button.offset().top;
        this.start      = this.offsetTop - windowHeight + footerHeight * 3/4;
        this.end        = this.start + windowHeight;
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

        this.$button.on('click', function (e) {
            e.preventDefault();
            smoothScrollTo(0);
        });

        this.update();
    },

    update: function () {

        if (empty(this.$button)) {
            return;
        }

        if (Modernizr.touch && is_OSX) {
            this.timeline.progress(1);
            return;
        }

        if (this.start < latestKnownScrollY && latestKnownScrollY <= this.end) {
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
}

/* --- Cover Animations Init --- */

var CoverAnimation = {
    selector:       '.article__header',
    initialized:    false,
    animated:       false,

    initialize: function () {

        var that = this;

        if (this.initialized) {
            return;
        }

        this.initialized = true;

        $(this.selector).each(function(i, header) {

            var $header         = $(header),
                $headline       = $header.find('.article__headline'),
                timeline        = new TimelineMax(),
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

            if (i == 0) {
                timeline.to($headline, 1.08, {y: 150, ease: Linear.easeNone});
                timeline.to($title, 1.08, {opacity: 0, y: -60, ease: Quad.easeIn}, '-=1.08');
            } else {
                timeline.to($title, 1.08, {opacity: 0, y: -60, ease: Quad.easeIn});
            }

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

            if (Modernizr.touch && is_OSX) {
                timeline.tweenTo("animatedIn");
                return;
            }

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

            $headline.data('tween', {
                timeline:       timeline,
                ab:             ab,
                bc:             bc,
                start:          start,
                end:            end
            });

        });

        this.update();

    },

    update: function () {

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

                if (!$headline.data("animated") || (Modernizr.touch && is_OSX)) {
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
/* --- Navigator Init --- */

var Navigator = {
    // variables
    $el:                $('<div class="navigator"></div>'),
    sectionSelector:    '.article__header',
    scrollDuration:     300,

    // private
    currentSelected:    0,
    lastSelected:       0,
    isWhite:            true,
    wasWhite:           true,
    initialized:        false,
    timeline:           new TimelineMax({ paused: true }),

    initialize: function () {

        var that        = this,
            $navigator  = this.$el;

        this.initialized    = true;
        this.$sections      = $(that.sectionSelector);

        if (this.$sections.length < 2) {
            return;
        }

        this.$sections.each(function (index, element) {
            var $section        = $(element),
                sectionTop      = $section.offset().top,
                sectionHeight   = $section.outerHeight(),
                $button         = $('<a href="#" class="navigator__item"><div class="bullet"></div></a>');

            $button.appendTo($navigator);
            $section.data('offsetTop', sectionTop);

            $button.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                smoothScrollTo(sectionTop - windowHeight/2 + sectionHeight/2);

                return false;
            });

        });

        this.$selected          = $('<div class="navigator__item  navigator__item--selected"><div class="bullet"></div></div>').appendTo($navigator);
        this.$selectedBullet    = this.$selected.find('.bullet');

        this.timeline.add(TweenMax.to(that.$selectedBullet, 0, {}));

        this.timeline.add(TweenMax.to(that.$selectedBullet, 0.1, {
            'border-top-left-radius': 20,
            'border-top-right-radius': 20,
            'scaleY': 2,
            'scaleX': 0.6
        }));

        this.timeline.add(TweenMax.to(that.$selectedBullet, 0.1, {
            'border-top-left-radius': 50,
            'border-top-right-radius': 50,
            'scaleY': 1,
            'scaleX': 1
        }));

        this.timeline.add(TweenMax.to(that.$selectedBullet, 0, {
            'scale': 1.2
        }));


        $navigator.css({'margin-top': -1 * $navigator.height() / 2}).prependTo("body");

        this.update();

        $('.navigator__item').each(function (i, obj) {

            var items   = $('.navigator__item').length,
                stagger = 3000 + i * 400,
                $obj    = $(obj);

            if ($obj.is('.navigator__item--selected')) {
                stagger = stagger + items * 100;
            }

            setTimeout(function () {
                TweenMax.fromTo($obj, 1, {opacity: 0, scale: 0.7}, {opacity: 1.25, scale: 1, ease: Elastic.easeOut});
            }, stagger);
        });

        if($navigator.hasClass('navigator--transparent'))
            TweenMax.to($navigator, 2, {opacity: .2 });
        else
            TweenMax.to($navigator, .3, {opacity: 1 });
    },

    update: function () {

        var that        = this,
            $navigator  = this.$el;

        if (!this.initialized) {
//            this.initialize();
            return;
        }

        // loop through each header and find current state
        this.$sections.each(function(i, element) {

            var $section        = $(element),
                sectionTop      = $section.data('offsetTop'),
                sectionBottom   = sectionTop + $section.outerHeight(),
                navigatorMiddle = latestKnownScrollY + (windowHeight / 2);

            if (navigatorMiddle > sectionTop) {
                that.currentSelected = i;
                that.isWhite = true;

                if (navigatorMiddle > sectionBottom) {
                    that.isWhite = false;
                }
            }

        });

        // if the navigator's indicator has to be moved
        // then move it accordingly and update state
        if (this.lastSelected != this.currentSelected) {
            this.lastSelected = this.currentSelected;
            TweenMax.to(this.$selected, 0.3, {top: 24 * that.currentSelected});
            that.timeline.tweenFromTo(0, 0.3);
//            that.timeline.play();
        }

        // if the navigator's color has to be changed
        // then change it accordingly and update state
        if (this.wasWhite != this.isWhite) {
            this.wasWhite = this.isWhite;
            $navigator.toggleClass('navigator--black', !that.isWhite);
        }
    }

}
/* --- Sticky Header Init --- */

function stickyHeaderInit() {

    var headerSelector      = '.site-header',
        $header             = $(headerSelector),
        headerHeight        = $header.outerHeight(),
        $headers            = $('.article__header'),
        offset              = $headers.length ? $headers.first().outerHeight() : 0;

    $header.headroom({
        tolerance: 15,
        offset: offset - headerHeight - 1,
        // animate with GSAP
        onPin: function () {
//            TweenMax.to($header, 0.1, {top: ''});
        },
        onUnpin: function () {
            if ($('html').hasClass('navigation--is-visible')) {return}
//            TweenMax.to($header, 0.1, {top: -1 * headerHeight});
        }
    });
}
/* ====== INTERNAL FUNCTIONS ====== */

/* --- NICESCROLL --- */

function niceScrollInit() {
    if (globalDebug) {console.log("NiceScroll Init");}

    var smoothScroll    = $('body').data('smoothscrolling') !== undefined,
        root            = document.documentElement;

    if (smoothScroll && !Modernizr.touch && !is_mobile_ie && !is_OSX) {

        var $window = $(window);		// Window object

        $window.on("mousewheel DOMMouseScroll", function(event) {

            var scrollTo,
                scrollDistance  = 400,
                delta;

            if (event.type == 'mousewheel') {
                delta    = event.originalEvent.wheelDelta / 120;
            }
            else if (event.type == 'DOMMouseScroll') {
                delta    = - event.originalEvent.detail / 3;
            }

            scrollTo = latestKnownScrollY - delta * scrollDistance;

            if (scrollTo) {

                event.preventDefault();

                TweenMax.to($window, .6, {
                    scrollTo: {
                        y:          scrollTo,
                        autoKill:   true
                    },
                    ease:           Power1.easeOut,	// For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
                    autoKill:       true,
                    overwrite:      5
                });

            }

        });

    }

}


function smoothScrollTo(y, speed) {

    speed = typeof speed == "undefined" ? 1 : speed;

    var distance = Math.abs(latestKnownScrollY - y),
        time     = speed * distance / 2000;

    TweenMax.to($(window), time, {scrollTo: {y: y, autoKill: true, ease: Quint.easeInOut}});
}


function menuTrigger(){

    $('.js-nav-trigger').on('click touchstart', function(e) {

        e.preventDefault();
        e.stopPropagation();

        var $html = $('html');

        if($html.hasClass('navigation--is-visible')){
            $('body').css('overflow', '');
            $html.removeClass('navigation--is-visible');
        } else {
            $('body').css({'overflow': 'hidden'});
            $html.addClass('navigation--is-visible');

            if ($html.hasClass('is--ancient-android') || $html.hasClass('is--winmob')) {
                $('.navigation--main').height(windowHeight);
            }
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
			$(this).attr("src", setQueryParameter(url, "wmode", "transparenartt"));
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


/* ====== INTERNAL FUNCTIONS END ====== */

function init() {
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

	    $('.site-logo--image-2x').children('img').each(function(){

            if (typeof $(this).data('logo2x') !== "undefined") {
                $(this).attr('src', $(this).data('logo2x'));
                $('.site-logo--image-2x').addClass('using-retina-logo');
            }
        });
	}

//	stickyHeader();

	/* ONE TIME EVENT HANDLERS */
	eventHandlersOnce();

	/* INSTANTIATE EVENT HANDLERS */
	eventHandlers();

	if (globalDebug) {console.groupEnd();}
}


/* ====== EVENT HANDLERS ====== */

function eventHandlersOnce() {
	if (globalDebug) {console.group("Event Handlers Once");}

    menuTrigger();

	if (globalDebug) {console.groupEnd();}
}

function eventHandlers() {
	if (globalDebug) {console.group("Event Handlers");}


	//Magnific Popup arrows
	$('body').off('click', '.js-arrow-popup-prev', magnificPrev).on('click', '.js-arrow-popup-prev', magnificPrev);
	$('body').off('click', '.js-arrow-popup-next', magnificNext).on('click', '.js-arrow-popup-next', magnificNext);

    var filterHandler;

    if(touch) {
        filterHandler = 'click';
    } else {
        filterHandler = 'hover';
    }

    if(ieMobile) filterHandler = 'click';

    $('.pix-dropdown').on(filterHandler, function(e){
        e.preventDefault();
        e.stopPropagation();

        $(this).toggleClass('active');
    });

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

	if (globalDebug) {console.groupEnd();}
});


/* ====== ON WINDOW LOAD ====== */

$(window).load(function(){

	if (globalDebug) {console.group("OnWindowLoad");}

    stickyHeaderInit();

    if (is_mobile_ie) {
        $("html").addClass("mobile-ie");
    }

    //Set textarea from contact page to autoresize
    if($("textarea").length) { $("textarea").autosize(); }

    $(".pixcode--tabs").organicTabs();

    if (!$('html').is('.ie9, .lt-ie9')) {
        Parallax.initialize();
        setTimeout(function() {
            CoverAnimation.initialize();
        }, 600);
    } else {
        setTimeout(function() {
            CoverAnimation.initialize();
        }, 400);
    }
    Navigator.initialize();
    ScrollToTop.initialize();
    DownArrow.initialize();
    niceScrollInit();
    //if(!$('html').is('.ie9, .lt-ie9') ){
        requestTick();
    //}
    // always
    royalSliderInit();
    magnificPopupInit();
    initVideos();
    resizeVideos();
    gmapInit();


    if(!empty($('#date-otreservations'))){

        // Pikaday
        var picker = new Pikaday({
            field: document.getElementById('date-otreservations'),
            format: 'MM/DD/YYYY',
            minDate: moment().toDate()
        });
        picker.setDate(moment().format('MM/DD/YYYY'));
    }

	$('.pixcode--tabs').organicTabs();

});


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


/* ====== ON RESIZE ====== */

$(window).on("debouncedresize", function(e) {

	if (globalDebug) {console.group("OnResize");}

    windowWidth     = $(window).width();
    windowHeight    = $(window).height();

    resizeVideos();
    royalSliderInit();

    if (!$('html').is('.ie9, .lt-ie9') && !Modernizr.touch) {
        Parallax.initialize();
        CoverAnimation.initialize();
    }
});

$(window).on("orientationchange", function(e) {
    setTimeout(function () {
        Parallax.initialize();
        CoverAnimation.initialize();
    }, 300)
});

var latestKnownScrollY = $('html').scrollTop() || $('body').scrollTop(),
    ticking = false;

function updateStuff() {
    ticking = false;

    if (!$('html').is('.ie9, .lt-ie9')) {
        Parallax.update();
        CoverAnimation.update();
    }

    Navigator.update();
    ScrollToTop.update();
    DownArrow.update();
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateStuff);
    }
    ticking = true;
}

$(window).on("scroll", function () {
    latestKnownScrollY = $('html').scrollTop() || $('body').scrollTop();
    //if(!$('html').is('.ie9, .lt-ie9') ){
        requestTick();
    //}
});

if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && window.innerHeight != document.documentElement.clientHeight) {

    var fixViewportHeight = function() {
        $('html, body').outerHeight(window.innerHeight);
    };

    window.addEventListener("scroll", fixViewportHeight, false);
    window.addEventListener("orientationchange", fixViewportHeight, false);
    fixViewportHeight();
}

// smooth scrolling to anchors
$(function() {

    var $header = $('.site-header'),
        headerHeight = parseInt($header.outerHeight(), 10);

    $('.site-header a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 1000);
                return false;
            }
        }
    });
});
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
})
/* === Functions that require jQuery but have no place on this Earth, yet === */
// Adapted from https://gist.github.com/paulirish/1579671 which derived from
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

// MIT license

if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    'use strict';

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
        || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
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