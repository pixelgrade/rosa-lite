function coverAnimationsInit() {

    var selector            = '.article__header',
        latestKnownScrollY  = window.scrollY,
        ticking             = false,
        wh                  = $(window).height();

    $('.article__header').each(function(i, header) {
        var $header         = $(header),
            $headline       = $header.find('.article__headline'),
            timeline        = new TimelineMax(),
            $title          = $headline.find('.headline__primary'),
            $subtitle       = $headline.find('.headline__secondary'),
            $description    = $headline.find('.headline__description'),
            $star           = $headline.find('.star'),
            $lines          = $headline.find('.line'),
            $arrows         = $description.find('.arrow'),
            headerTop       = $header.offset().top,
            headerHeight    = $header.outerHeight();

        $header.find('.pixcode--separator').width($title.width());

        $description.css({opacity: 1});
        $description = $description.children().not('.pixcode--separator');
        $description.css({opacity: 0});

        // ------ A

        timeline.fromTo($title, 0.72, {'letter-spacing': 50}, {'letter-spacing': 13, ease: Expo.easeOut});
        timeline.fromTo($title, 0.89, {opacity: 0}, {opacity: 1, ease: Expo.easeOut}, '-=0.72');
        timeline.fromTo($title, 1, {'y': 30}, {'y': 0, ease: Expo.easeOut}, '-=0.89');
        timeline.fromTo($subtitle, 0.65, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.65');
        timeline.fromTo($subtitle, 0.9, {y: 30}, {y: 0, ease: Quint.easeOut}, '-=0.65');
        timeline.fromTo($star, 0.15, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.6');
        timeline.fromTo($star, 0.55, {rotation: -270}, {rotation: 0, ease: Back.easeOut}, '-=0.5');
        timeline.fromTo($lines, 0.6, {width: 0}, {width: '45%', opacity: 1, ease: Quint.easeOut}, '-=0.55');
        timeline.fromTo($arrows, 0.2, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.27');
        timeline.fromTo($description, 0.5, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.28');
        timeline.fromTo($description, 0.75, {y: -20}, {y: 0}, '-=0.5');

        // ------ B
        timeline.addLabel("animatedIn");

        timeline.to($title, 1.08, {opacity: 0, y: -60, ease: Quad.easeIn});
        timeline.to($description, 1.08, {y: 60, opacity: 0, ease: Quad.easeIn}, '-=1.08');
        timeline.to($subtitle, 1.08, {opacity: 0, y: -90, ease: Quad.easeIn}, '-=1.08');
        timeline.to($lines, 0.86, {width: 0, opacity: 0, ease: Quad.easeIn}, '-=0.94');
        timeline.to($star, 1, {rotation: 180}, '-=1.08');
        timeline.to($star, 0.11, {opacity: 0}, '-=0.03');
        timeline.to($arrows, 0.14, {opacity: 0}, '-=1.08');

        timeline.addLabel("animatedOut");

        // ------ C

        var animatedInTime      = timeline.getLabelTime("animatedIn"),
            animatedOutTime     = timeline.getLabelTime("animatedOut"),
            ab                  = animatedInTime / animatedOutTime,
            bc                  = 1 - ab,
            start               = headerTop + headerHeight / 2 - wh / 2,
            end                 = start + wh / 3;

        timeline.tweenTo("animatedIn", {

            onComplete: function () {

                latestKnownScrollY = window.scrollY;

                var progress        = (1 / (end - start)) * (latestKnownScrollY - start),
                    partialProgress = ab + bc * progress,
                    timePassed      = partialProgress * timeline.getLabelTime("animatedOut");

                if (ab > partialProgress) {
                    return;
                }

                timeline.addLabel("finishedAt", timePassed);
                timeline.tweenTo("finishedAt", {
                   onComplete: function () {

                       $(window).scroll(function () {
                           latestKnownScrollY = window.scrollY;
                           requestTick();
                       });

                   }
                });
            }
        });

        $headline.data('tween', {
            timeline:       timeline,
            ab:             ab,
            bc:             bc,
            start:          start,
            end:            end
        });

    });


    function update () {
        ticking = false;

        $(selector).each(function (i, element) {

            var $headline   = $(element).find('.article__headline'),
                options     = $headline.data('tween'),
                progress    = 0;

            // some sanity check
            // we wouldn't want to divide by 0 - the Universe might come to an end
            if (! empty(options) && (options.end - options.start) !== 0) {

                // progress on the total timeline (ac)
                progress = (1 / (options.end - options.start)) * (latestKnownScrollY - options.start);

                // progress on partial timeline (bc)
                // point B being labeled as "animated"
                var partialProgress = options.ab + options.bc * progress;

                if (0 > progress) {
                    return;
                }

                if (1 > progress) {
                    options.timeline.progress(partialProgress);
                }
            }
        });
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

//    function initialize() {
//        update();
//    }
//
//    $(window).on('resize orientationchange', initialize);
//    initialize();
}