/* --- Parallax Init --- */

var Parallax = {
    selector:   '.article__parallax',
    amount:     0.5,

    $el:        $(this.selector),

    initialize: function () {

        if (Modernizr.touch) {
            this.amount = 0;
        }

        this.prepare();
        this.update(window.scrollY, false);
    },

    prepare: function() {

        var that = this;

        $(this.selector).each(function (i, element) {

            var $parallax           = $(element),
                $container          = $parallax.parent(),
                containerTop        = $container.offset().top,
                containerWidth      = $container.outerWidth(),
                containerHeight     = $container.outerHeight(),
                parallaxInfo        = {
                    start:          containerTop - windowHeight,
                    end:            containerTop + containerHeight
                },
                initialTop          = -1 * (windowHeight + containerHeight) * that.amount / 2;
                finalTop            = -1 * initialTop;


            $parallax.height($parallax.height() + windowHeight * that.amount);

            if ($parallax.hasClass('article__parallax--img')) {

                $parallax.find('img').each(function (i, element) {

                    var $image          = $(element),
                        imageHeight     = $image.height(),
                        imageWidth      = $image.width(),
                        // find scale needed for the image to fit container and move desired amount
                        scaleY          = ((windowHeight - containerHeight) * that.amount + containerHeight) / imageHeight,
                        scaleX          = containerWidth / imageWidth,
                        scale           = Math.max(scaleX, scaleY);

                    // header resizing on mobile makes image too small
                    // 80 pixels should be enough
                    if (Modernizr.touch) {
                        scaleY = (scaleY * imageHeight + 80) / imageHeight;
                        scale = Math.max(scaleX, scaleY);
                    }

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

        $(this.selector).first().append('<span class="down-arrow"></span>');

    },

    update: function(scrollTop, tween) {

        if (this.amount == 0) {
            return;
        }

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

                options.timeline.progress(progress);
            }
        });
    }
};
