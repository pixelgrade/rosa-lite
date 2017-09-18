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
		rs_visibleNearby = typeof $slider.data( 'visiblenearby' ) !== "undefined",
		rs_imageAlignCenter = typeof $slider.data( 'imagealigncenter' ) !== "undefined",
		rs_transition = typeof $slider.data( 'slidertransition' ) !== "undefined" && $slider.data( 'slidertransition' ) !== '' ? $slider.data( 'slidertransition' ) : 'move',
		rs_autoPlay = typeof $slider.data( 'sliderautoplay' ) !== "undefined",
		rs_delay = typeof $slider.data( 'sliderdelay' ) !== "undefined" && $slider.data( 'sliderdelay' ) !== '' ? $slider.data( 'sliderdelay' ) : '1000',
		rs_drag = true,
		rs_globalCaption = typeof $slider.data( 'showcaptions' ) !== "undefined",
		is_headerSlider = $slider.hasClass( 'header--slideshow' ),
		hoverArrows = typeof $slider.data( 'hoverarrows' ) !== "undefined";

	// Single slide case
	if ( $children.length === 1 ) {
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

	royalSlider.ev.on( 'rsAfterSlideChange rsAfterContentSet', function ( event ) {
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

		if ( $slider.data( 'customarrows' ) === "left" ) {
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

	if ( slidesNumber === 1 ) {
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