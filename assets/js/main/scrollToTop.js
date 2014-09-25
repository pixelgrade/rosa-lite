var ScrollToTop = {
    selector:   '.btn--top',
    $button:    null,
    offsetTop:  0,
    start:      0,
    end:        0,
    timeline:   null,
    played:     false,

    initialize: function () {

        this.$button = $(this.selector);

        if (empty(this.$button)) {
            return;
        }

        var footerHeight = $('.copyright-area').outerHeight();

        this.offsetTop  = this.$button.offset().top;
        this.start      = this.offsetTop - windowHeight + footerHeight * 3/4;
        this.end        = this.start + windowHeight;
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

        this.$button.on('click', function (e) {
            e.preventDefault();
            smoothScrollTo(0);
        });

        this.update();
    },

    update: function () {

        if (empty(this.$button)) {
            return;
        }

        if (Modernizr.touch && is_OSX) {
            this.timeline.progress(1);
            return;
        }

        if (this.start < latestKnownScrollY && latestKnownScrollY <= this.end) {
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
