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

            var $container          = $(element),
                containerHeight     = $container.outerHeight(),
                parallaxDistance    = (wh - containerHeight) * that.amount,
                // calculate needed values to properly move the image on scroll
                initialTop          = -1 * (parallaxDistance) / 2 - (containerHeight * that.amount),
                finalTop            = -1 * initialTop,
                start               = $container.offset().top - wh,
                end                 = start + wh + containerHeight,
                timeline            = new TimelineMax({paused: true});

            if ($container.hasClass('article__parallax--img')) {

                $container.find('img').each(function (i, img) {
                    var $img        = $(img),
                        imgHeight   = $img.height(),
                        imgWidth    = $img.width(),
                        // find scale needed for the image to fit container and move desired amount
                        scaleY      = (parallaxDistance + (containerHeight * that.amount)) / imgHeight,
                        scaleX      = ww / imgWidth,
                        scale       = Math.max(1, scaleX, scaleY);

                    // scale image up to desired size
                    $img.css({
                        width: parseInt(imgWidth * scale, 10),
                        height: parseInt(imgHeight * scale, 10)
                    });

                    // fade image in
                    TweenMax.to($img, 0.6, {opacity: 1});
                });
            }

            // create timeline for current image
            timeline.append(TweenMax.fromTo($container, 0.3, {
                y: initialTop,
                ease: Linear.easeNone
            }, {
                y: finalTop,
                ease: Linear.easeNone
            }));

            // bind sensible variables for tweening to the image using a data attribute
            $container.data('tween', {
                timeline: timeline,
                start: start,
                end: end
            });

        });

    },

    update: function() {

        var scrollTop = getScroll().y;

        $(this.selector).each(function (i, element) {

            var $container  = $(element),
                options     = $container.data('tween'),
                progress    = 0;

            // some sanity check
            // we wouldn't want to divide by 0 - the Universe might come to an end
            if (! empty(options) && (options.end - options.start) !== 0) {
                progress = (1 / (options.end - options.start)) * (scrollTop - options.start);

                if (0 > progress) {
                    return;
                }

                if (1 > progress) {
                    options.timeline.progress(progress);
                }
            }
        });
    }
};
