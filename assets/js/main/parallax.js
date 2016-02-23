
var Parallax = (function() {

    var selector = '.article__parallax',
        $covers = $(),
        amount = 0,
        initialized = false,
        start = 0,
        stop = 0,
        bleed = 100;

    function initialize() {

        if (detectIE() && !initialized) {
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

            $clone          = cloneHero($hero);
            $target         = $clone.children('.article__parallax__img, .article__parallax__slider, .gmap--multiple-pins, .gmap');

            $image          = $target.filter('.article__parallax__img');
            $slider         = $target.filter('.article__parallax__slider');
            heroHeight      = $hero.outerHeight();
            heroOffset      = $hero.offset();
            amount          = computeAmountValue($hero);
            distance        = (windowHeight - heroHeight) * amount;

            scaleImage($image, amount);

            // if there's a slider we are working with we may have to set the height
            $slider.css('height', heroHeight + distance);

            // prepare image / slider timeline
            var parallax = {
                    start:      heroOffset.top - windowHeight - distance / 2,
                    end:        heroOffset.top + heroHeight + distance / 2,
                    target:     $target
                };



            $hero.parent().height(heroHeight);

            $hero = $clone;

            $hero.data('parallax', parallax).data('height', heroHeight + distance);
            $covers = $covers.add($hero);

            // or the slider
            royalSliderInit($hero);
            gmapInit($hero);
            gmapMultiplePinsInit($hero);
        });

        // update progress on the timelines to match current scroll position

        initialized = true;
        update();
        pixGS.TweenMax.to($covers, .3, {'opacity': 1});
    }

    function update() {

        if ( is_ie || latestKnownScrollY > stop || latestKnownScrollY < start) {
            return;
        }

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
                    moveY = (progress - 0.5) * windowHeight;

                pixGS.TweenMax.to($hero, 0, {
                    y: -latestKnownScrollY,
                    opacity: 1
                });
                pixGS.TweenMax.to(parallax.target, 0, {y: moveY});
            } else {
                $hero.css({
                    opacity: 0
                });
            }
        });
    }

    function computeAmountValue($hero) {
        var speeds = {
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
                        return value;
                    }
                }
            });
        }

        return 0.5;
    }

    function scaleImage($image, amount) {
        amount = typeof amount !== "unedfined" ? amount: 0.5;
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
            scale: scale,
            x: '-50%',
            y: '-50%',
            force3D: true
        });
    }

    function cloneHero($hero) {
        var $clone      = $hero.clone(true).wrap("div.article__header"),
            heroOffset  = $hero.offset(),
            heroHeight  = $hero.outerHeight();

        $clone.removeAttr('style');
        $clone.data('source', $hero).appendTo('.covers');

        $clone.css({
            top: heroOffset.top,
            height: heroHeight + 2 * bleed,
            marginTop: -bleed
        });

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

            royalSliderInit($cover);
            gmapInit($cover);
            gmapMultiplePinsInit($cover);
        });

        return;
    }

    return {
        initialize: initialize,
        update: update
    }

})();