
var Parallax = {
    selector: '.article__parallax',
    covers: $([]),
    amount: 0,
    initialized: false,
    start: 0,
    stop: 0,
    bleed: 200,

    initialize: function () {
        var that = this;

        documentHeight = $(document).height();

        // if this is a touch device initialize the slider and skip the complicated part

        if ((Modernizr.touch || detectIE()) && !this.initialized) {

            $('.article__parallax').each(function (i, hero) {

                var $hero   = $(hero).closest('.article__header'),
                    $cover  = $hero.children('.article__parallax'),
                    $image  = $cover.find('.article__parallax__img');

                if ( $image.length ) {

                    var imageWidth  = $image.css('width', 'auto').outerWidth(),
                        imageHeight = $image.outerHeight(),
                        heroHeight  = $hero.outerHeight(),
                        scaleX      = windowWidth / imageWidth;
                        scaleY      = windowHeight / imageHeight;
                        scale       = Math.max(scaleX, scaleY);
                        newWidth    = parseInt(imageWidth * scale),
                        newHeight   = scale * imageHeight;

                    $image.css({
                        position: 'absolute',
                        'max-width': 'none',
                        width: newWidth,
                        opacity: 1
                    });
                }

                pixGS.TweenMax.to($cover, .3, {
                    opacity: 1
                });

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

        this.stop           = documentHeight - windowHeight;
        this.amount         = $body.data('parallax-speed') || 0.5;
        this.initialized    = true;

        // clean up
        $('.covers').empty();

        $('.article__parallax').each(function (i, cover) {

            // grab all the variables we need
            var $cover      = $(cover),
                $hero       = $cover.parent(),
                $clone      = $cover.clone(true).wrap("div.article__header"),
                $cloneImage = $clone.find('.article__parallax__img'),
                $cloneSlider = $clone.find('.article__parallax__slider'),
                heroHeight  = $hero.outerHeight(),
                heroOffset  = $hero.offset(),
                $target     = $cover.children(),
                $cloneTarget = $clone.children('.article__parallax__img, .article__parallax__slider, .gmap--multiple-pins, .gmap'),
                imageWidth  = $target.outerWidth(),
                imageHeight = $target.outerHeight(),
                adminBar    = parseInt($html.css('marginTop')),
                amount      = that.amount,

            // we may need to scale the image up or down
            // so we need to find the max scale of both X and Y axis
                scaleX,
                scaleY,
                scale,
                newWidth,
                distance,
                speeds      = {
                    static: 0,
                    slow:   0.25,
                    medium: 0.5,
                    fast:   0.75,
                    fixed:  1
                };

            $cover.removeAttr('style');
            $clone.data('source', $cover).appendTo('.covers');
            $clone.css({
                height: heroHeight + 2 * that.bleed,
                marginTop: -that.bleed
            });

            // let's see if the user wants different speed for different whateva'
            if (typeof parallax_speeds !== "undefined") {
                $.each(speeds, function(speed, value) {
                    if (typeof parallax_speeds[speed] !== "undefined") {
                        if ($hero.is(parallax_speeds[speed])) {
                            amount = value;
                        }
                    }
                });
            }

            scaleX      = windowWidth / imageWidth;
            scaleY      = (heroHeight + (windowHeight - heroHeight) * amount) / imageHeight;
            scale       = Math.max(scaleX, scaleY);
            newWidth    = parseInt(imageWidth * scale);
            distance    = (windowHeight - heroHeight) * amount;

            // if there's a slider we are working with we may have to set the height
            $cloneTarget.css('height', heroHeight + distance);

            // set the new width, the image should have height: auto to scale properly
            $cloneImage.css({
                'width': newWidth,
                'height': 'auto'
            });

            // align the clone to its surrogate
            // we use TweenMax cause it'll take care of the vendor prefixes
            // pixGS.TweenMax.to($clone, 0, { top: 0 });

            // prepare image / slider timeline
            var parallax = {
                    start:      heroOffset.top - windowHeight - distance / 2 - that.bleed,
                    end:        heroOffset.top + heroHeight + distance / 2 + that.bleed,
                    timeline:   new pixGS.TimelineMax({ paused: true })
                },
            // the container timeline
                parallax2 = {
                    start:      0,
                    end:        documentHeight,
                    timeline:   new pixGS.TimelineMax({ paused: true })
                };

            // move the image for a parallax effect
            parallax.timeline.fromTo($cloneTarget, 1, {
                y: '-=' + heroHeight * amount
            }, {
                y: '+=' + heroHeight * amount * 2,
                ease: pixGS.Linear.easeNone
            });

            parallax.timeline.fromTo($cloneSlider.find('.hero__content, .hero__caption'), 1, {
                y: '+=' + windowHeight * amount
            }, {
                y: '-=' + windowHeight * amount * 2,
                ease: pixGS.Linear.easeNone
            }, '-=1');

            // move the container to match scrolling
            parallax2.timeline.fromTo($clone, 1, {
                y: '+=' + heroOffset.top
            }, {
                y: '-=' + documentHeight,
                ease: pixGS.Linear.easeNone
            });

            // set the parallax info as data attributes on the clone to be used on update
            $clone
                .data('parallax', parallax)
                .data('parallax2', parallax2);

            // or the slider
            royalSliderInit($clone);
            gmapInit($clone);
            gmapMultiplePinsInit($clone);
        });

        // update progress on the timelines to match current scroll position
        that.update(true);

        if (that.initialized) {
            pixGS.TweenMax.to($('.covers .article__parallax'), .3, {'opacity': 1});
        }
    },

    update: function (force) {
        // return;
        if (Modernizr.touch || is_ie || latestKnownScrollY > this.stop || latestKnownScrollY < this.start) {
            return;
        }

        force = (typeof force == "undefined") ? false : !!force;

        $('.covers .article__parallax').each(function (i, cover) {
            var $cover      = $(cover),
                parallax    = $cover.data('parallax'),
                parallax2   = $cover.data('parallax2'),
                progress    = (latestKnownScrollY - parallax.start) / (parallax.end - parallax.start),
                progress2   = (latestKnownScrollY - parallax2.start) / (parallax2.end - parallax2.start);

            if (force) {
                parallax.timeline.progress(progress);
                parallax2.timeline.progress(progress2);
            }

            if (0 < progress && 1 > progress) {
                parallax.timeline.progress(progress);
                parallax2.timeline.progress(progress2);
            } else {
                if (0 > progress && 0 < parallax.timeline.progress()) {
                    parallax.timeline.progress(0);
                    parallax2.timeline.progress(progress2);
                }
                if (1 < progress && 1 > parallax.timeline.progress()) {
                    parallax.timeline.progress(1);
                    parallax2.timeline.progress(progress2);
                }
            }
        });

    }
};