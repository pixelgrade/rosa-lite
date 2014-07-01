var DownArrow = {
    selector:   '.down-arrow',
    $arrow:     null,
    timeline:   null,
    start:      0,
    end:        0,

    initialize: function () {

        var that = this;

        this.$arrow = $(this.selector);

        if (empty(this.$arrow)) {
            return;
        }

        this.start      = 0;
        this.end        = this.start + 300;
        this.timeline   = new TimelineMax({ paused: true });
        this.$next      = this.$arrow.closest('.article__header').nextAll('.article__header, .article--page').first();

        if (!empty(this.$next)) {
            this.nextTop    = this.$next.offset().top;
            this.nextHeight = this.$next.outerHeight();
        }

        this.timeline.to(this.$arrow, .2, {y: 10, opacity: 0, ease: Linear.easeNone, overwrite: "none"});
        this.timeline.to('.blurp--top', .3, {scaleY: 0, ease: Linear.easeNone, overwrite: "none"});

        this.$arrow.on('click', function (e) {
            e.preventDefault();

            if (empty(that.$next)) {
                return;
            }

            if (that.$next.is('.article__header')) {
                smoothScrollTo(that.nextTop - windowHeight/2 + that.nextHeight/2);
            } else {
                smoothScrollTo(that.nextTop - $('.site-header').outerHeight());
            }

        });
    },

    update: function () {
//
//        if (empty(this.$arrow)) {
//            return;
//        }
//
//        if (Modernizr.touch && is_OSX) {
//            this.timeline.progress(0);
//            return;
//        }
//
//        setProgress(this.timeline, this.start, this.end);
    }
}