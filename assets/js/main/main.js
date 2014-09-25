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

    $(document).on('click', '.js-nav-trigger', function(e) {

        e.preventDefault();
        e.stopPropagation();

        if($('html').hasClass('navigation--is-visible')){
            $('body').css('overflow', '');
            $('html').removeClass('navigation--is-visible');
        } else {
            $('body').css({'overflow': 'hidden'});
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