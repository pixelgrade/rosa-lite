var ScrollToTop = {
    selector:   '.btn--top',
    $button:    null,
    offsetTop:  0,
    start:      0,
    end:        0,
    timeline:   null,

    initialize: function () {

        this.$button = $(this.selector);

        if (empty(this.$button)) {
            return;
        }

        this.offsetTop  = this.$button.offset().top;
        this.start      = this.offsetTop - windowHeight + 200;
        this.end        = this.start + 250;
        this.timeline   = new TimelineMax({ paused: true });

        this.timeline.to($('.btn--top_contour'), 2, {
            width:  260,
            height: 260,
            top:    -130,
            left:   -100,
            ease:   Power2.easeOut
        });

        this.timeline.fromTo($('.btn--top_text'), 2, {y: 15, scale: 0.5}, {y: 0, scale: 1, opacity: 1, ease: Expo.easeOut}, '-=1.3');

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

        setProgress(this.timeline, this.start, this.end);
    }
}
