/* --- Parallax Init --- */

var Parallax = {
    selector:   '.article__parallax',
    amount:     0.5,

    $el:        $(this.selector),

    initialize: function () {

        if (Modernizr.touch && iOS && iOS < 8 || is_mobile_ie) {
            $('html').addClass('no-scroll-effect');
        }

        this.prepare();
        this.update(latestKnownScrollY, false);
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


            $parallax.css({
                height: containerHeight + windowHeight * that.amount,
                'top': -1 * windowHeight * that.amount / 2
            });

            if ($parallax.hasClass('article__parallax--img') && $parallax.find('img').length) {

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
                    pixGS.TweenMax.to($image, 0.5, {opacity: 1});
                });
            }

            var timeline = new pixGS.TimelineMax({ paused: true });

            // create timeline for current image
            timeline.append(pixGS.TweenMax.fromTo($parallax, 1, {
                y: initialTop
            }, {
                y: finalTop,
                ease: pixGS.Linear.easeNone
            }));

            parallaxInfo.timeline = timeline;

            // bind sensible variables for tweening to the image using a data attribute
            $parallax.data('parallax', parallaxInfo);

        });
    },

    update: function() {

        if (this.amount == 0 || !$(this.selector).length) {
            return;
        }

        $(this.selector).each(function (i, element) {

            var $parallax   = $(element),
                options     = $parallax.data('parallax'),
                progress    = 0;

            // some sanity check
            // we wouldn't want to divide by 0 - the Universe might come to an end
            if (! empty(options) && (options.end - options.start) !== 0) {
                progress = (1 / (options.end - options.start)) * (latestKnownScrollY - options.start);


                if (0 > progress) {
                    options.timeline.progress(0);
                    return;
                }

                if (1 < progress) {
                    options.timeline.progress(1);
                    return;
                }

                options.timeline.progress(progress);
            }
        });
    }
};
