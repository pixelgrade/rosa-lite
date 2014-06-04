
/* ====== INTERNAL FUNCTIONS ====== */

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

function containerPlacement(){
	$('#page').css('padding-top', $('.js-header').outerHeight() + 'px');
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

	// always
	niceScrollInit();

	royalSliderInit();

	containerPlacement();

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

    var filterHandler;

    if(touch) {
        filterHandler = 'click';
    } else {
        filterHandler = 'hover';
    }

    if(ieMobile) filterHandler = 'click';

    $('.pix-dropdown').on(filterHandler, function(){
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
	loadUp();

	if (globalDebug) {console.groupEnd();}
});


/* ====== ON WINDOW LOAD ====== */

$(window).load(function(){

	if (globalDebug) {console.group("OnWindowLoad");}

    if (ww > 900){
        stickyHeaderInit();
    }

    iScrollInit();
    Parallax.initialize();
    CoverAnimation.initialize();

    navigatorInit();


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


/* ====== ON RESIZE ====== */

$(window).on("debouncedresize", function(e){

	if (globalDebug) {console.group("OnResize");}

    ww = window.innerWidth;
    wh = window.innerHeight;

    niceScrollInit();
    resizeVideos();

    if (iScroll) {
        resizeCovers();
    }

});

var iScroll;

function iScrollInit() {

    var options = {
        mouseWheel: true,
        useTransition: false,
        deceleration: 0.0013,
        bounce: false,
        click: true
    }

    $('body').addClass('iScroll');

    iScroll = Modernizr.touch || !is_OSX ? new IScroll('#wrapper', options) : null;

    resizeCovers();
}

function getScroll() {

    var x, y;

    if (iScroll) {
        x = iScroll.x * -1;
        y = iScroll.y * -1;
    } else {
        x = window.scrollX;
        y = window.scrollY;
    }

    return {x: x, y: y};
}

function resizeCovers() {
    $('.full-height').height(wh);
    $('.half-height').height(wh / 2);
    $('.two-thirds-height').height(wh * 2 / 3);
}

(function animationLoop() {
    window.requestAnimationFrame(animationLoop);
    Parallax.update();
    CoverAnimation.update();
})();