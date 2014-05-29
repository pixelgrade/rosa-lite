///* ====== INTERNAL FUNCTIONS ====== */
//
///* --- Load Web Fonts --- */
//
//function loadWebFonts() {
//	if (globalDebug) {console.log("Load Web Fonts");}
//
//	if (typeof WebFontConfig != 'undefined') {
//		WebFont.load(WebFontConfig);
//	}
//}
//
///* --- NICESCROLL --- */
//function niceScrollInit() {
//	if (globalDebug) {console.log("NiceScroll Init");}
//
//	var smoothScroll = $('body').data('smoothscrolling') !== undefined;
//
//	if (smoothScroll && ww > 899 && !touch && !is_OSX) {
//		$('html').addClass('nicescroll');
//		$('[data-smoothscrolling]').niceScroll({
//			zindex: 9999,
//			cursorcolor: '#000000',
//			cursoropacitymin: 0.1,
//			cursoropacitymax: 0.5,
//			cursorwidth: 4,
//			cursorborder: 0,
//			railpadding: { right : 2 },
//			mousescrollstep: 40,
//			scrollspeed: 100,
//			hidecursordelay: 100
//		});
//	}
//
//}
//
//function scrollToTopInit() {
//	if (!empty($('.up-link'))) {
//		if (globalDebug) {console.log("ScrollToTop Init");}
//
//		var offset = 220,
//			duration = 500;
//
//		$(window).scroll(function() {
//			if ($(this).scrollTop() > offset) {
//				$('.up-link').fadeIn(duration);
//			} else {
//				$('.up-link').fadeOut(duration);
//			}
//		});
//
//		$('.up-link').click(function(e) {
//			e.preventDefault();
//			$('html, body').animate({scrollTop: 0}, duration);
//			return false;
//		});
//	}
//}
//
//function menuTrigger(){
//	$(document).on('click', '.js-nav-trigger', function(e) {
//		var windowHeigth = $(window).height();
//
//		e.preventDefault();
//		e.stopPropagation();
//
//		if($('html').hasClass('navigation--is-visible')){
//			$('#page').css('height', '');
//			$('html').removeClass('navigation--is-visible');
//		} else {
//			$('#page').height(windowHeigth);
//			$('html').addClass('navigation--is-visible');
//		}
//	});
//}
//
//// Menu Hover with delay
//function menusHover() {
//  $('.menu-item-has-children').hoverIntent({
//	interval: 0,
//	timeout: 300,
//	over: showMenu,
//	out: hideMenu
//  })
//
//  function showMenu() {
//	var self = $(this);
//	self.removeClass('hidden');
//	setTimeout(function(){
//	  self.addClass('open');
//	}, 150);
//  }
//  function hideMenu() {
//	var self = $(this);
//	self.removeClass('open');
//	setTimeout(function(){
//	  self.addClass('hidden');
//	}, 150);
//  }
//}
//
//
///* --- $VIDEOS --- */
//
//function initVideos() {
//
//    var videos = $('iframe, video');
//
//    // Figure out and save aspect ratio for each video
//    videos.each(function() {
//        $(this).data('aspectRatio', this.width / this.height)
//            // and remove the hard coded width/height
//            .removeAttr('height')
//            .removeAttr('width');
//    });
//
//    // Firefox Opacity Video Hack
//    $('iframe').each(function(){
//		var url = $(this).attr("src");
//	    if ( !empty(url) )
//			$(this).attr("src", setQueryParameter(url, "wmode", "transparent"));
//	});
//}
//
//
//function resizeVideos() {
//
//    var videos = $('iframe, video');
//
//    videos.each(function() {
//        var video = $(this),
//            ratio = video.data('aspectRatio'),
//            w = video.css('width', '100%').width(),
//            h = w/ratio;
//        video.height(h);
//    });
//}
//
//function containerPlacement(){
//	$('.js-container').css('padding-top', $('.js-sticky').height() + 'px');
//}
//
////function stickyHeader(){
////
////	var sticky = $('.js-sticky'),
////		header = $('.site-header__wrapper'),
////		offset = sticky.offset(),
////		stickyHeight = sticky.height();
////
////	$(window).scroll(function() {
////	    if ( $(window).scrollTop() > offset.top + 150){
////	    	if(!$('body').hasClass('header--small')){
////	    		$('body').addClass('header--small');
////	    	}
////	    } else {
////	        $('body').removeClass('header--small');
////	    }
////	});
////
////	if($('body').hasClass('nav-scroll-hide')){
////		header.hoverIntent({
////			interval: 100,
////			timeout: 300,
////			over: function(){
////				header.addClass('header--active');
////				setTimeout(function(){
////					header.addClass('visible');
////				}, 200);
////			},
////			out: function(){
////				header.removeClass('visible');
////				header.removeClass('header--active');
////				setTimeout(function(){
////				}, 200);
////			}
////		});
////	}
////}
//
//function sidebarHeight(){
//	if(ww > 899){
//		var $sidebar = $('aside.sidebar--main');
//		var $pageContent = $('.page-content');
//
//		if($sidebar.height() <= $pageContent.height()){
//			$sidebar.css('min-height', $sidebar.parent().height() + 'px');
//		}
//		else{
//			$sidebar.css('min-height', '');
//		}
//	}
//}
//
//
///* ====== INTERNAL FUNCTIONS END ====== */
//
//function init(){
//	if (globalDebug) {console.group("Init");}
//
//	// /* GLOBAL VARS */
//	touch = false;
//
//	//  GET BROWSER DIMENSIONS
//	browserSize();
//
//	// /* DETECT PLATFORM */
//	platformDetect();
//
//	loadAddThisScript();
//
//	if (is_android || window.opera) {
//		$('html').addClass('android-browser').removeClass('no-android-browser');
//	}
//
//	var is_retina = (window.retina || window.devicePixelRatio > 1);
//	if (is_retina && $('.site-logo--image-2x').length) {
//	    var image = $('.site-logo--image-2x').find('img');
//
//	    if (image.data('logo2x') !== undefined) {
//	        image.attr('src', image.data('logo2x'));
//	        $('.site-logo--image-2x').addClass('using-retina-logo');
//	    }
//	}
//
//	$('html').addClass('loaded');
////	stickyHeader();
//
//	/* ONE TIME EVENT HANDLERS */
//	eventHandlersOnce();
//
//	/* INSTANTIATE EVENT HANDLERS */
//	eventHandlers();
//
//	if (globalDebug) {console.groupEnd();}
//}
//
//
///* ====== CONDITIONAL LOADING ====== */
//
//function loadUp(){
//	if (globalDebug) {console.group("LoadUp");}
//
//	//load web fonts
//	//loadWebFonts();
//
//	// always
//	niceScrollInit();
//
//	royalSliderInit();
//
//	menusHover();
//
//	magnificPopupInit();
//
//	initVideos();
//	resizeVideos();
//
//	containerPlacement();
//
//	gmapInit();
//
//	//Set textarea from contact page to autoresize
//	if($("textarea").length) { $("textarea").autosize(); }
//
//	$(".pixcode--tabs").organicTabs();
//
//	if (globalDebug) {console.groupEnd();}
//}
//
//
///* ====== EVENT HANDLERS ====== */
//
//function eventHandlersOnce() {
//	if (globalDebug) {console.group("Event Handlers Once");}
//
//	menuTrigger();
//
//	scrollToTopInit();
//
//	if (globalDebug) {console.groupEnd();}
//}
//
//function eventHandlers() {
//	if (globalDebug) {console.group("Event Handlers");}
//
//
//	//Magnific Popup arrows
//	$('body').off('click', '.js-arrow-popup-prev', magnificPrev).on('click', '.js-arrow-popup-prev', magnificPrev);
//	$('body').off('click', '.js-arrow-popup-next', magnificNext).on('click', '.js-arrow-popup-next', magnificNext);
//
//	if (globalDebug) {console.groupEnd();}
//}
//
//
///* --- GLOBAL EVENT HANDLERS --- */
//
//function magnificPrev(e) {
//	if (globalDebug) {console.log("Magnific Popup Prev");}
//
//	e.preventDefault();
//	var magnificPopup = $.magnificPopup.instance;
//	magnificPopup.prev();
//	return false;
//}
//
//function magnificNext(e) {
//	if (globalDebug) {console.log("Magnific Popup Next");}
//
//	e.preventDefault();
//	var magnificPopup = $.magnificPopup.instance;
//	magnificPopup.next();
//	return false;
//}
//
//
//// $(window).bind('beforeunload', function(event) {
//// 	if (globalDebug) {console.log("ON BEFORE UNLOAD");}
//
//// 	event.stopPropagation();
//
//// 	animateBlog('out');
//// });
//
//
///* ====== ON DOCUMENT READY ====== */
//
//$(document).ready(function(){
//
//	if (globalDebug) {console.group("OnDocumentReady");}
//
//	/* --- INITIALIZE --- */
//	init();
//	loadUp();
//
//	if (globalDebug) {console.groupEnd();}
//});
//
//
///* ====== ON WINDOW LOAD ====== */
//
//$(window).load(function(){
//	if (globalDebug) {console.group("OnWindowLoad");}
//
//
//	$('.pixcode--tabs').organicTabs();
//
//});
//
//
///* ====== ON RESIZE ====== */
//
//$(window).on("debouncedresize", function(e){
//	if (globalDebug) {console.group("OnResize");}
//
//	niceScrollInit();
//	resizeVideos();
//
//	if (globalDebug) {console.groupEnd();}
//});


// delay js download and images load
// create custom event each image in parallax header
// then show it

var wh = $(window).height();
var ww = $(window).width();

$(window).load(function () {

	var imgSelector = '.article--page .article__header img',
		parallaxAmount = 1;

	$(imgSelector).each(function (i, img) {

		var $img = $(img),
			imgHeight = $img.height(),
			imgWidth = $img.width(),
			scaleY = parallaxAmount * wh / imgHeight,
			scaleX = ww / imgWidth,
			scale = Math.max(1, scaleX, scaleY),
			initialTop = -(wh * parallaxAmount / 2),
			finalTop = initialTop + (wh * parallaxAmount),
			$container = $img.closest('.article__header'),
			containerHeight = $container.outerHeight(),
			start = $container.offset().top - wh,
			end = start + wh + containerHeight,
			timeline = new TimelineMax({paused: true});

		$img.css({
			width: parseInt(imgWidth * scale, 10),
			height: parseInt(imgHeight * scale, 10)
//            '-webkit-transform-origin': '50%, 0, 0'
		});

		timeline.append(TweenMax.fromTo($img.closest('.article__parallax'), 0.1, {
			y: initialTop,
//            scale: scale,
			ease: Linear.easeNone
		}, {
			y: finalTop,
//            scale: scale,
			ease: Linear.easeNone
		}));

		$img.data('tween', {
			timeline: timeline,
			start: start,
			end: end
		});

	});

	var latestKnownScrollY = 0,
		ticking = false;

	function update() {
		ticking = false;

		var scrollTop = latestKnownScrollY;

		$(imgSelector).each(function (i, img) {

			var $img = $(img),
				options = $img.data('tween'),
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

	update();

});