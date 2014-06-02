
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
function menusHover() {
    $('.menu-item-has-children').hoverIntent({
        interval: 0,
        timeout: 300,
        over: showMenu,
        out: hideMenu
    })

    function showMenu() {
        var self = $(this);
        self.removeClass('hidden');
        setTimeout(function(){
            self.addClass('open');
        }, 150);
    }
    function hideMenu() {
        var self = $(this);
        self.removeClass('open');
        setTimeout(function(){
        self.addClass('hidden');
        }, 150);
    }
}

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

function animateCover() {

    $('.article__headline').each(function(i, header) {
        var $header         = $(header),
            timeline        = new TimelineLite({paused: true}),
            $title          = $header.find('.headline__primary'),
            $subtitle       = $header.find('.headline__secondary'),
            $description    = $header.find('.headline__description'),
//            $separator      = $header.find('.pixcode--separator'),
            $star           = $header.find('.star'),
            $lines          = $header.find('.line'),
            $arrows         = $description.find('.arrow');

        $description.css({opacity: 1});
        $description = $description.children().not('.pixcode--separator');
        $description.css({opacity: 0});

        timeline.fromTo($title, 1, {
            'letter-spacing': 50,
            'opacity': 0,
            'y': 30
        }, {
            'letter-spacing': 10,
            'opacity': 1,
            'y': 0
        });

        timeline.fromTo($subtitle, 0.9, {
            'opacity': 0,
            'y': 20
        }, {
            'opacity': 1,
            'y': 0
        }, '-=0.65');

        timeline.to($star, 0.2, {opacity: 1}, '-=0.6');
        timeline.fromTo($star, 0.55, {rotation: -270}, {rotation: 0}, '-=0.2');
        timeline.fromTo($lines, 0.6, {width: 0}, {width: '45%', opacity: 1, ease: Expo.easeOut}, '-=0.45');
        timeline.fromTo($arrows, 0.2, {opacity: 0}, {opacity: 1}, '-=0.27');

        timeline.fromTo($description, 0.75, {
            'opacity': 0,
            'y': '-20'
        }, {
            'opacity': 1,
            'y': 0
        }, '-=0.28');

        timeline.play();

    });
}

setTimeout(function () {
    animateCover();
}, 300);
