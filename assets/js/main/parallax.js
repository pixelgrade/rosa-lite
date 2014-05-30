/* --- Parallax Init --- */

function parallaxInit() {

	if (globalDebug) {console.log("Parallax Init");}

	var imgSelector         = '.article__parallax img',
		parallaxAmount      = 0.5;

    // prepare images for parallax effect
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

        if (globalDebug) { console.log('x: ', ww, imgWidth, scaleX) };
        if (globalDebug) { console.log('y: ', parallaxDistance, imgHeight, scaleY) };
        if (globalDebug) { console.log('pd = (' + wh + ' (wh) + ' + containerHeight + ' (ch)) * ' + imgHeight + ' (ih) = ' + parallaxDistance) };

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

	var latestKnownScrollY = window.scrollY,
		ticking = false;

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
                    if (globalDebug) { console.log(i); }
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

	update();
}
