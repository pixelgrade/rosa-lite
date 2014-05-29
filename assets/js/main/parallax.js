/* --- Parallax Init --- */

//delay js download and images load
//create custom event each image in parallax header
//then show it

function parallaxInit() {
	if (globalDebug) {console.log("Parallax Init");}

	var imgSelector         = '.article--page .article__header img',
		headerSelector      = '.site-header__wrapper',
		parallaxAmount      = 1;

	var $header             = $(headerSelector),
		headerHeight        = $header.height();

	$header.headroom({
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
}
