var ScrollToTop = {
    start:      0,
    end:        0,
    timeline:   null,
    played:     false,

    initialize: function () {

        var $button         = $('.btn--top'),
            offsetTop       = $button.offset().top,
            footerHeight    = $('.copyright-area').outerHeight(),
            start           = offsetTop - windowHeight + footerHeight * 3 / 4;

        if (empty($button)) {
            return;
        }

        $button.data('offsetTop', offsetTop);

        this.timeline   = new pixGS.TimelineMax({ paused: true });

        this.timeline.fromTo('.blurp--bottom', .6, {
            y:          40,
            scale:      0.5
        }, {
            y:          0,
            scale:      1,
            ease:       pixGS.Power3.easeOut,
            force3D:    true

        });

        this.timeline.fromTo($('.btn__arrow--top'), .4, {
            y: 15,
            opacity: 0
        }, {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: pixGS.Back.easeOut
        }, '-=0.1');

        this.timeline.fromTo($('.btn__arrow--bottom'),.4, {
            y: 15,
            opacity: 0
        }, {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: pixGS.Back.easeOut
        }, '-=0.25');

        $button.on('click', function (e) {
            e.preventDefault();
            smoothScrollTo(0);
        });

        this.update();
    },

    update: function () {

        var $button         = $('.btn--top'),
            offsetTop       = $button.data('offsetTop'),
            footerHeight    = $('.copyright-area').outerHeight(),
            start           = offsetTop - windowHeight + footerHeight * 3 / 4,
            end             = start + windowHeight;

        if (empty($button) || this.timeline == null) {
            return;
        }

        if (Modernizr.touch && is_OSX) {
            this.timeline.progress(1);
            return;
        }

        if (start < latestKnownScrollY) {
            if (!this.played) {
                this.timeline.play();
                this.played = true;
            }
        } else {
            if (this.played) {
                this.timeline.reverse();
                this.played = false;
            }
        }
    }
}
