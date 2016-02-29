var Parallax = (function() {

    var detectIE = false;

    var selector = '.article__parallax',
        $covers = $(),
        amount = 0,
        initialized = false,
        start = 0,
        stop = 0,
        bleed = 50;

    function initialize() {

        if (detectIE && !initialized) {
            fallback();
            return;
        }

        documentHeight = $(document).height();
        stop           = documentHeight - windowHeight;

        // clean up
        $('.covers').empty();
        $covers = $();

        $('.article__parallax').each(function (i, hero) {

            var $hero = $(hero),
                $clone, $target, $image, $slider, amount, distance, heroHeight, heroOffset;

            $hero.parent().css('height','');

            $clone          = cloneHero($hero);
            $target         = $clone.children('.article__parallax__img, .article__parallax__slider, .gmap--multiple-pins, .gmap');

            $image          = $target.filter('.article__parallax__img');
            $slider         = $target.filter('.article__parallax__slider');
            heroHeight      = $hero.outerHeight();
            heroOffset      = $hero.offset();
            amount          = computeAmountValue($hero);
            distance        = (windowHeight + heroHeight) * amount;

            var newHeight   = heroHeight + (windowHeight - heroHeight) * amount;

            // if there's a slider we are working with we may have to set the height
            $target.filter('.article__parallax__slider, .gmap--multiple-pins, .gmap').css({
                'top': (heroHeight - newHeight) * 0.5,
                'height': newHeight
            });

            // prepare image / slider timeline
            var parallax = {
                    start:      heroOffset.top - windowHeight,
                    end:        heroOffset.top + heroHeight,
                    distance:   distance,
                    target:     $target
                };

            $hero.parent().height(heroHeight);

            $hero = $clone;

            $hero.data('parallax', parallax).data('height', heroHeight + distance);
            $covers = $covers.add($hero);

            $hero.imagesLoaded(function() {
                scaleImage($image, amount);
            });

            royalSliderInit($hero);
            gmapInit($hero);
            gmapMultiplePinsInit($hero);
        });

        // update progress on the timelines to match current scroll position

        $covers.imagesLoaded(function() {
            initialized = true;
            update();
            pixGS.TweenMax.to($covers, .3, {'opacity': 1});
        });
    }

    function update() {

        if ( !initialized ) {
            return;
        }

        pixGS.TweenMax.to($covers, 0, {
            y: -latestKnownScrollY
        });

        $covers.each(function (i, hero) {
            var $hero       = $(hero),
                parallax    = $hero.data('parallax');
                heroHeight  = $hero.data('height'),
                parallax    = $hero.data('parallax');

            if ( typeof parallax == "undefined" ) {
                return;
            }

            if (parallax.start < latestKnownScrollY && parallax.end > latestKnownScrollY) {
                var progress = (latestKnownScrollY - parallax.start) / (parallax.end - parallax.start),
                    moveY = (progress - 0.5) * parallax.distance;

                pixGS.TweenMax.to(parallax.target, 0, {
                    y: moveY
                });
            }
        });
    }

    function computeAmountValue($hero) {
        var myAmount = 0.5,
            speeds = {
                static: 0,
                slow:   0.25,
                medium: 0.5,
                fast:   0.75,
                fixed:  1
            };

        // let's see if the user wants different speed for different whateva'
        if (typeof parallax_speeds !== "undefined") {
            $.each(speeds, function(speed, value) {
                if (typeof parallax_speeds[speed] !== "undefined") {
                    if ($hero.is(parallax_speeds[speed])) {
                        myAmount = value;
                        return;
                    }
                }
            });
        }

        return myAmount;
    }

    function scaleImage($image, amount) {
        amount = (typeof amount == "undefined") ? 1 : amount;
        $image.removeAttr('style');

        var imageWidth  = $image.outerWidth(),
            imageHeight = $image.outerHeight(),
            $hero       = $image.closest('.article__parallax'),
            heroHeight  = $hero.outerHeight(),
            scaleX      = windowWidth / imageWidth;
            scaleY      = (heroHeight + (windowHeight - heroHeight) * amount) / imageHeight;
            scale       = Math.max(scaleX, scaleY);
            newWidth    = parseInt(imageWidth * scale),
            newHeight   = scale * imageHeight;

        pixGS.TweenMax.to($image, 0, {
            width: newWidth,
            left: (windowWidth - newWidth) / 2,
            top: (heroHeight - newHeight) / 2
        });
    }

    function cloneHero($hero) {
        var $clone      = $hero.clone(true).wrap("div.article__header"),
            $slider     = $clone.find('.article__parallax__slider'),
            heroOffset  = $hero.offset(),
            heroHeight  = $hero.outerHeight();

        $clone.removeAttr('style');
        $clone.data('source', $hero).appendTo('.covers');

        if ( $slider.length ) {
            $slider.css({
                top: heroOffset.top - bleed,
                height: heroHeight + 2 * bleed
            });

            $clone.css({
                top: heroOffset.top,
                height: heroHeight
            });
        } else {
            $clone.css({
                top: heroOffset.top - bleed,
                height: heroHeight + 2 * bleed
            });
        }

        return $clone;
    }

    function fallback() {
        $('.article__parallax').each(function (i, hero) {

            var $hero   = $(hero).closest('.article__header'),
                $cover  = $hero.children('.article__parallax'),
                $image  = $cover.find('.article__parallax__img');

            if ($hero.hasClass('half-height')) {
                $hero.css('min-height', windowHeight/2);
            } else if ($hero.hasClass('two-thirds-height')) {
                $hero.css('min-height', windowHeight*2/3);
            } else {
                $hero.css('min-height', windowHeight);
            }

            scaleImage($image);

            royalSliderInit($cover);
            gmapInit($cover);
            gmapMultiplePinsInit($cover);
        });

        pixGS.TweenMax.to($('.article__parallax'), .3, {'opacity': 1});

        return;
    }

    return {
        initialize: initialize,
        update: update
    }

})();