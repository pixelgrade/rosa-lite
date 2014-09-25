/* --- Cover Animations Init --- */

var CoverAnimation = {
    selector:       '.article__header',
    initialized:    false,
    animated:       false,

    initialize: function () {

        var that = this;

        if (this.initialized) {
            return;
        }

        this.initialized = true;

        $(this.selector).each(function(i, header) {

            var $header         = $(header),
                $headline       = $header.find('.article__headline'),
                timeline        = new pixGS.TimelineMax(),
                $title          = $headline.find('.headline__primary'),
                $subtitle       = $headline.find('.headline__secondary'),
                $description    = $headline.find('.headline__description'),
                $star           = $headline.find('.star'),
                $lines          = $headline.find('.line'),
                $arrows         = $description.find('.arrow'),
                $hr             = $description.find('hr'),
                headerTop       = $header.offset().top,
                headerHeight    = $header.outerHeight();

            $header.find('.pixcode--separator').width($title.width());

            $description.css({opacity: 1});
            $description = $description.children().not('.pixcode--separator');
            $description.css({opacity: 0});

            // ------ A

            timeline.fromTo($title, 0.72, {'letter-spacing': '1em', 'margin-right': '-0.9em'}, {'letter-spacing': '0.2em', 'margin-right': '-0.1em', ease: pixGS.Expo.easeOut});
            timeline.fromTo($title, 0.89, {opacity: 0}, {opacity: 1, ease: pixGS.Expo.easeOut}, '-=0.72');
            timeline.fromTo($title, 1, {'y': 30}, {'y': 0, ease: pixGS.Expo.easeOut}, '-=0.89');
            timeline.fromTo($subtitle, 0.65, {opacity: 0}, {opacity: 1, ease: pixGS.Quint.easeOut}, '-=0.65');
            timeline.fromTo($subtitle, 0.9, {y: 30}, {y: 0, ease: pixGS.Quint.easeOut}, '-=0.65');
            timeline.fromTo($star, 0.15, {opacity: 0}, {opacity: 1, ease: pixGS.Quint.easeOut}, '-=0.6');
            timeline.fromTo($star, 0.55, {rotation: -270}, {rotation: 0, ease: pixGS.Back.easeOut}, '-=0.5');
            timeline.fromTo($lines, 0.6, {width: 0}, {width: '42%', opacity: 1, ease: pixGS.Quint.easeOut}, '-=0.55');
            timeline.fromTo($hr, 0.6, {width: 0}, {width: '100%', opacity: 1, ease: pixGS.Quint.easeOut}, '-=0.6');
            timeline.fromTo($arrows, 0.2, {opacity: 0}, {opacity: 1, ease: pixGS.Quint.easeOut}, '-=0.27');
            timeline.fromTo($description, 0.5, {opacity: 0}, {opacity: 1, ease: pixGS.Quint.easeOut}, '-=0.28');
            timeline.fromTo($description, 0.75, {y: -20}, {y: 0}, '-=0.5');

            // ------ B
            timeline.addLabel("animatedIn");

            if (i == 0) {
                timeline.to($headline, 1.08, {y: 150, ease: pixGS.Linear.easeNone});
                timeline.to($title, 1.08, {opacity: 0, y: -60, ease: pixGS.Quad.easeIn}, '-=1.08');
            } else {
                timeline.to($title, 1.08, {opacity: 0, y: -60, ease: pixGS.Quad.easeIn});
            }

            timeline.to($description, 1.08, {y: 60, opacity: 0, ease: pixGS.Quad.easeIn}, '-=1.08');
            timeline.to($subtitle, 1.08, {opacity: 0, y: -90, ease: pixGS.Quad.easeIn}, '-=1.08');
            timeline.to($lines, 0.86, {width: 0, opacity: 0, ease: pixGS.Quad.easeIn}, '-=0.94');
            timeline.to($hr, 0.86, {width: 0, opacity: 0, ease: pixGS.Quad.easeIn}, '-=0.86');
            timeline.to($star, 1, {rotation: 180}, '-=1.08');
            timeline.to($star, 0.11, {opacity: 0}, '-=0.03');
            timeline.to($arrows, 0.14, {opacity: 0}, '-=1.08');

            timeline.addLabel("animatedOut");

            // ------ C

            var animatedInTime      = timeline.getLabelTime("animatedIn"),
                animatedOutTime     = timeline.getLabelTime("animatedOut"),
                start               = headerTop + headerHeight / 2 - wh / 2,
                end                 = start + headerHeight / 2,
                ab, bc;

            if (i == 0) {
                start = headerTop;
                end = start + windowHeight / 2;
            }

            ab = animatedInTime / animatedOutTime;
            bc = 1 - ab;

            if (Modernizr.touch && is_OSX) {
                timeline.tweenTo("animatedIn");
                return;
            }

            timeline.tweenTo("animatedOut", {
                onComplete: function () {
                    $headline.data("animated", true);
                },
                onUpdate: function () {
                    var progress        = (1 / (end - start)) * (latestKnownScrollY - start),
                        partialProgress = progress < 0 ? ab : ab + bc * progress,
                        currentProgress = timeline.progress();

                    if (Math.abs(partialProgress - currentProgress) < 0.01) {
                        $headline.data("animated", true);
                        this.kill();
                    }
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

        this.update();

    },

    update: function () {

        var that = this;

        $(this.selector).each(function (i, element) {

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

                $headline.data('progress', partialProgress);

                if (!$headline.data("animated") || (Modernizr.touch && is_OSX)) {
                    return;
                }

                if (0 > progress) {
                    partialProgress = options.ab;
                }

                if (1 > partialProgress) {
                    options.timeline.progress(partialProgress);
                    return;
                }

                options.timeline.progress(1);
            }
        });
    }
}