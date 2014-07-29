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
        is_headerSlider = $slider.hasClass('header--slideshow') ? true : false;

    //console.log(rs_imageAlignCenter);
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

//	//trigger this so all the video initializations and others take place for the first slide
//	setTimeout(function() {
//		royalSlider.ev.trigger('rsAfterSlideChange');
//	}, 1);

	// create the markup for the customArrows
	if (slidesNumber > 1) {
		if (royalSlider && rs_customArrows) {

            var classes = '';

            if(is_headerSlider) classes = 'slider--header-arrows';

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
	}

//    if(is_headerSlider){
//
//        $('#page').on('mousemove', function(e) {
//            $('.header-arrows').addClass('show');
//
//            if ((e.pageX - this.offsetLeft) < $(this).width() / 2) {
//                $('.header-arrows').addClass('show-left').removeClass('show-right');
//
//            } else {
//                $('.header-arrows').addClass('show-right').removeClass('show-left');
//            }
//
//        }).on('mouseout', function(){
//            $('.slider-arrows').removeClass('show');
//        });
//    }

//	royalSlider.ev.on('rsVideoPlay', function () {
//
//		if (rs_imageScale == 'fill') {
//			var $frameHolder = $('.rsVideoFrameHolder');
////			var top = Math.abs(royalSlider.height - $frameHolder.closest('.rsVideoContainer').height()) / 2;
//
//			$frameHolder.height(royalSlider.height);
////			$frameHolder.css('margin-top', top + 'px');
//
//		} else {
//			var $frameHolder = $('.rsVideoFrameHolder');
//			var $videoContainer = $('.rsVideoFrameHolder').closest('.rsVideoContainer');
//			var top = parseInt($frameHolder.closest('.rsVideoContainer').css('margin-top'), 10);
//
//			if (top < 0) {
//				top = Math.abs(top);
//				$frameHolder
//					.height(royalSlider.height)
//					.css('top', top + 'px');
//			}
//		}
//	});
//
//	royalSlider.ev.on('rsBeforeAnimStart', function(event) {
//		royalSlider.stopVideo();
//	});
//
//	// auto play video sliders if is set so
//	royalSlider.ev.on('rsAfterSlideChange', function(event) {
//
//		$slide_content = $( royalSlider.currSlide.content );
//
//		// triggers after slide change
//		rs_videoAutoPlay = typeof $slide_content.data('video_autoplay') !== "undefined";
//
//		if ( rs_videoAutoPlay ) {
//			royalSlider.stopVideo();
//			royalSlider.playVideo();
//		}
//
//	});
//
//	// after destroying a video remove the autoplay class (this way the image gets visible)
//	royalSlider.ev.on('rsOnDestroyVideoElement', function(i ,el){
//
//		$slide_content = $( this.currSlide.content );
//
//		$($slide_content).removeClass('video_autoplay');
//
//	});

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