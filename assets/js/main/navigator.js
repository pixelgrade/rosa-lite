/* --- Navigator Init --- */

var Navigator = {
    // variables
    $el:                $('<div class="navigator"></div>'),
    sectionSelector:    '.article__header',
    scrollDuration:     300,

    // private
    currentSelected:    0,
    lastSelected:       0,
    isWhite:            true,
    wasWhite:           true,
    initialized:        false,
    timeline:           new TimelineMax({ paused: true }),

    initialize: function () {

        var that        = this,
            $navigator  = this.$el;

        this.initialized    = true;
        this.$sections      = $(that.sectionSelector);

        if (this.$sections.length < 2) {
            return;
        }


        this.$sections.each(function (index, element) {
            var $section        = $(element),
                sectionTop      = $section.offset().top,
                sectionHeight   = $section.outerHeight(),
                $button         = $('<a href="#" class="navigator__item"><div class="bullet"></div></a>');

            $button.appendTo($navigator);
            $section.data('offsetTop', sectionTop);

            $button.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                smoothScrollTo(sectionTop - windowHeight/2 + sectionHeight/2);

                return false;
            });

        });

        this.$selected          = $('<div class="navigator__item  navigator__item--selected"><div class="bullet"></div></div>').appendTo($navigator);
        this.$selectedBullet    = this.$selected.find('.bullet');

        this.timeline.add(TweenMax.to(that.$selectedBullet, 0, {}));

        this.timeline.add(TweenMax.to(that.$selectedBullet, 0.1, {
            'border-top-left-radius': 20,
            'border-top-right-radius': 20,
            'scaleY': 2,
            'scaleX': 0.6
        }));

        this.timeline.add(TweenMax.to(that.$selectedBullet, 0.1, {
            'border-top-left-radius': 50,
            'border-top-right-radius': 50,
            'scaleY': 1,
            'scaleX': 1
        }));

        this.timeline.add(TweenMax.to(that.$selectedBullet, 0, {
            'scale': 1.2
        }));


        $navigator.css({'margin-top': -1 * $navigator.height() / 2}).prependTo("body");

        this.update();

        TweenMax.to($navigator, 0.3, {
            opacity: 1
        });
    },

    update: function () {

        var that        = this,
            $navigator  = this.$el;

        if (!this.initialized) {
//            this.initialize();
            return;
        }

        // loop through each header and find current state
        this.$sections.each(function(i, element) {

            var $section        = $(element),
                sectionTop      = $section.data('offsetTop'),
                sectionBottom   = sectionTop + $section.outerHeight(),
                navigatorMiddle = latestKnownScrollY + (windowHeight / 2);

            if (navigatorMiddle > sectionTop) {
                that.currentSelected = i;
                that.isWhite = true;

                if (navigatorMiddle > sectionBottom) {
                    that.isWhite = false;
                }
            }

        });

        // if the navigator's indicator has to be moved
        // then move it accordingly and update state
        if (this.lastSelected != this.currentSelected) {
            this.lastSelected = this.currentSelected;
            TweenMax.to(this.$selected, 0.3, {top: 24 * that.currentSelected});
            that.timeline.tweenFromTo(0, 0.3);
//            that.timeline.play();
        }

        // if the navigator's color has to be changed
        // then change it accordingly and update state
        if (this.wasWhite != this.isWhite) {
            this.wasWhite = this.isWhite;
            $navigator.toggleClass('navigator--black', !that.isWhite);
        }
    }

}