/* --- Parallax Init --- */

var Parallax = {
    selector:   '.article__parallax',
    amount:     0.5,

    initialize: function () {
        this.prepare();
        this.update();
    },

    prepare: function() {

        var that = this;

        $(this.selector).each(function (i, element) {

            var $parallax           = $(element),
                $container          = $parallax.parent(),
                containerTop        = $container.offset().top,
                containerWidth      = $container.outerWidth(),
                containerHeight     = $container.outerHeight(),
                parallaxDistance    = windowHeight * that.amount,
                parallaxInfo        = {
                    start:          containerTop - windowHeight,
                    end:            containerTop + containerHeight
                },
                initialTop          = -1 * (parallaxDistance) / 2 - (containerHeight * that.amount),
                finalTop            = -1 * initialTop;

            if ($parallax.hasClass('article__parallax--img')) {

                $parallax.find('img').each(function (i, element) {
                    var $image          = $(element),
                        imageHeight     = $image.height(),
                        imageWidth      = $image.width(),
                        // find scale needed for the image to fit container and move desired amount
                        scaleY          = (parallaxDistance + containerHeight) / imageHeight,
                        scaleX          = containerWidth / imageWidth,
                        scale           = Math.max(scaleX, scaleY);

                    // scale image up to desired size
                    $image.css({
                        width: parseInt(imageWidth * scale + 1, 10),
                        height: parseInt(imageHeight * scale + 1, 10)
                    });

                    // fade image in
                    TweenMax.to($image, 0.5, {
                        opacity: 1,
                        onComplete: function () {
                            CoverAnimation.initialize();
                        }
                    });
                });
            }

            var timeline = new TimelineMax({ paused: true });

            // create timeline for current image
            timeline.append(TweenMax.fromTo($parallax, 1, {
                y: initialTop
            }, {
                y: finalTop,
                ease: Linear.easeNone
            }));

            parallaxInfo.timeline = timeline;

            // bind sensible variables for tweening to the image using a data attribute
            $parallax.data('parallax', parallaxInfo);

        });

        this.update(window.scrollY, false);

    },

    update: function(scrollTop, tween) {

        tween = typeof tween !== "undefined" ? tween : !is_OSX;

        $(this.selector).each(function (i, element) {

            var $parallax   = $(element),
                options     = $parallax.data('parallax'),
                progress    = 0;

            // some sanity check
            // we wouldn't want to divide by 0 - the Universe might come to an end
            if (! empty(options) && (options.end - options.start) !== 0) {
                progress = (1 / (options.end - options.start)) * (scrollTop - options.start);


                if (0 > progress) {
                    options.timeline.progress(0);
                    return;
                }

                if (progress > 1) {
                    options.timeline.progress(1);
                    return;
                }

//                if (tween) {
//                    options.timeline.tweenTo(progress);
//                } else {
                    options.timeline.progress(progress);
//                }
            }
        });
    }
};
