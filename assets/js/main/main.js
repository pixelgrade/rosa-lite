/* ====== INTERNAL FUNCTIONS ====== */

/* --- NICESCROLL --- */

var $body               = $('body'),
    $html               = $('html'),
    $window             = $(window),
    $document           = $(document),
    documentHeight      = $document.height(),
    aspectRatio         = windowWidth / windowHeight,
    orientation         = windowWidth > windowHeight ? 'landscape' : 'portrait',
    orientationchange   = false;

function niceScrollInit() {
    if (globalDebug) {console.log("NiceScroll Init");}

    var smoothScroll    = $('body').data('smoothscrolling') !== undefined,
        root            = document.documentElement;

    if (smoothScroll && !is_EDGE && !Modernizr.touchevents && !is_mobile_ie && !is_OSX) {

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

    $('.js-nav-trigger').on('click', function(e) {

        e.preventDefault();
        e.stopPropagation();

        var $html = $('html');

        if($html.hasClass('navigation--is-visible')){
            $html.removeClass('navigation--is-visible');
        } else {
            $html.addClass('navigation--is-visible');

            if ($html.is('.is--ancient-android, .is--winmob, .is--ie')) {
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

    if (typeof (isIe) != 'undefined' || (!(window.ActiveXObject) && "ActiveXObject" in window)) {
        $('html').addClass('is--ie');
    }

    if ( is_EDGE ) {
        $('html').addClass('is--ie-edge');
    }

	//  GET BROWSER DIMENSIONS
	browserSize();

	// /* DETECT PLATFORM */
	platformDetect();

	loadAddThisScript();

	if (is_android || window.opera) {
		$('html').addClass('android-browser').removeClass('no-android-browser');
	}

	/* ONE TIME EVENT HANDLERS */
	eventHandlersOnce();

	/* INSTANTIATE EVENT HANDLERS */
	eventHandlers();

    // move waves in siblings so they keep up with the parallax
    // var $waves = jQuery('.border-waves').not('.site-footer');
    // $waves.removeClass('border-waves');

    // $waves.each(function(i, obj) {
    //     var $wave = $(obj);
    //     $wave.prevAll('.article__header').first().find('.article__parallax').addClass('border-waves-top');
    //     $wave.nextAll('.article__header').first().find('.article__parallax').addClass('border-waves-bottom');
    //     $wave.next('.site-footer').addClass('border-waves-bottom');
    // });

    // $('.site-footer.border-waves').prevAll('article__header').first().find('.article__parallax').addClass('border-waves-top border-waves-top--dark');

    $('.js-pixslider').not('.article__parallax .js-pixslider').each(function(i, slider) {
        var $slider = $(slider);
        $slider.imagesLoaded(function() {
            sliderInit($(slider));
        });
    });

    $('.navigation--main').on('DOMMouseScroll mousewheel', function(ev) {
        var $this = $(this),
            scrollTop = this.scrollTop,
            scrollHeight = this.scrollHeight,
            height = $this.height(),
            delta = (ev.type == 'DOMMouseScroll' ?
                ev.originalEvent.detail * -40 :
                ev.originalEvent.wheelDelta),
            up = delta > 0;

        var prevent = function() {
            ev.stopPropagation();
            ev.preventDefault();
            ev.returnValue = false;
            return false;
        }

        if (!up && -delta > scrollHeight - height - scrollTop) {
            // Scrolling down, but this will take us past the bottom.
            $this.scrollTop(scrollHeight);
            return prevent();
        } else if (up && delta > scrollTop) {
            // Scrolling up, but this will take us past the top.
            $this.scrollTop(0);
            return prevent();
        }
    });

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

    $(document).on('spam.wpcf7 invalid.wpcf7 mailsent.wpcf7 mailfailed.wpcf7', function () {
        setTimeout(function() {
            Parallax.initialize();
            CoverAnimation.initialize();
        }, 300);
    });

    var filterHandler;

    if( touch ) {
        filterHandler = 'click';
    } else {
        filterHandler = 'hover';
    }

    if( touch && windowWidth < 900 )
        HandleSubmenusOnTouch.init();

    if(ieMobile) filterHandler = 'click';

    $('.pix-dropdown').on(filterHandler, function(e){
        e.stopPropagation();

        $(this).toggleClass('active');
    });


    $('.tabs__nav').find("li > a").click(function () {
        setTimeout(function(){
            Parallax.update();
        }, 300);
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

$(window).load(function() {

	if (globalDebug) {console.group("OnWindowLoad");}

    StickyHeader.init();

    if (is_mobile_ie) {
        $("html").addClass("mobile-ie");
    }

    //Set textarea from contact page to autoresize
    if($("textarea").length) { $("textarea").autosize(); }

    $(".pixcode--tabs").organicTabs();

    if (!$('html').is('.ie9, .lt-ie9')) {
        setTimeout(function() {
            Parallax.initialize();
            CoverAnimation.initialize();
        }, 600);
    } else {
        setTimeout(function() {
            Parallax.initialize();
            CoverAnimation.initialize();
        }, 400);
    }
    niceScrollInit();

    royalSliderInit($('.article__content'), true);

    // if ($('.js-pixslider').length) {
    //     var slider = $('.js-pixslider').data('royalSlider');

    //     slider.ev.on('rsAfterInit rsAfterContentSet rsAfterSlideChange', function () {
    //         ScrollToTop.initialize();
    //     });
    // }

    magnificPopupInit();
    initVideos();
    resizeVideos();
    // gmapInit();
    // gmapMultiplePinsInit();


    if(!empty($('#date-otreservations'))){
				var dateFormat = $('#date-otreservations' ).closest('.otw-wrapper' ).children('.txtDateFormat' ).attr('value' ).toUpperCase();

        // Pikaday
        var picker = new Pikaday({
            field: document.getElementById('date-otreservations'),
            format: dateFormat,
            minDate: moment().toDate(),
						defaultDate: moment().toDate(),
						setDefaultDate: true
        });
    }

    $('.pixcode--tabs').organicTabs();
    DownArrow.initialize();

    setTimeout(function () {
        Navigator.initialize();
        ScrollToTop.initialize();
    }, 60);

    loop();

    if( is_android ) {
        setTimeout(function() {
            $html.addClass('is--loaded');
        }, 500);
    } else {
        $html.addClass('is--loaded');
    }

});


/* ====== ON RESIZE ====== */

$(window).on("debouncedresize", onResize);

function onResize(e) {
    if (globalDebug) {console.group("OnResize");}

    windowWidth     = $(window).width();
    windowHeight    = $(window).height();

    newOrientation  = windowWidth > windowHeight ? 'landscape' : 'portrait';
    if (newOrientation !== orientation) {
        orientationchange = true;
        orientation = newOrientation;
    }

    resizeVideos();

    royalSliderInit($('.js-pixslider').not('.article__parallax .js-pixslider'));

    if ( ! Modernizr.touchevents ) {
        requestAnimationFrame(refreshStuff);
    } else {
        if (orientationchange) {
            setTimeout(function() {
                requestAnimationFrame(refreshStuff);
            }, 300);
        }
    }

    if ( touch && windowWidth < 900 ) {
        HandleSubmenusOnTouch.init();
    } else {
        HandleSubmenusOnTouch.release();
    }

    orientationchange = false;
}

function refreshStuff() {
    Parallax.initialize();
    CoverAnimation.initialize();
    ScrollToTop.initialize();
}


function updateStuff() {
    Parallax.update();
    ScrollToTop.update();
    DownArrow.update();
    CoverAnimation.update();

    if (!Modernizr.touchevents && windowWidth >= 900) {
        Navigator.update();
    }

    if ( windowWidth >= 900 ) {
        StickyHeader.update();
    }
}

$(window).on("organicTabsChange", refreshStuff);

window.latestKnownScrollY = window.pageYOffset;

var newScrollY = latestKnownScrollY,
    ticking = false;

$window.scroll(function() {
    newScrollY = window.pageYOffset;
});

function loop() {
    // Avoid calculations if not needed
    if (latestKnownScrollY !== newScrollY) {
        latestKnownScrollY = newScrollY
        updateStuff();
    }
    requestAnimationFrame(loop);
}

if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && window.innerHeight != document.documentElement.clientHeight) {

    var fixViewportHeight = function() {
        $('html, body').outerHeight(window.innerHeight);
    };

    window.addEventListener("scroll", fixViewportHeight, false);
    window.addEventListener("orientationchange", fixViewportHeight, false);
    fixViewportHeight();
}

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // IE 12 => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}


// smooth scrolling to anchors
$(function() {

    var $header = $('.site-header'),
        headerHeight = parseInt($header.outerHeight(), 10),
        $html = $('html');

    $('.site-header a[href*="#"]:not([href="#"])').click(function() {

        var timeout = 0;

        if ($html.hasClass('navigation--is-visible')) {
            $('body').css('overflow', '');
            $html.removeClass('navigation--is-visible');
            timeout = 600;
        }


        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                setTimeout(function () {
                    $('html,body').animate({
                        scrollTop: target.offset().top - headerHeight
                    }, 1000);
                }, timeout);
                return false;
            }
        }

    });
});