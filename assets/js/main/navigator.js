/* --- Navigator Init --- */

var Navigator = {
    // variables
    $el:                $('.navigator'),
    sectionSelector:    '.article__header',
    scrollDuration:     300,

    // private
    currentSelected:    0,
    lastSelected:       0,
    isWhite:            true,
    wasWhite:           true,

    $sections:         $(this.sectionSelector),

    initialize: function () {

        var that        = this,
            $navigator  = this.$el;

        if (!this.$sections.length) {
            return;
        }

        this.$sections.each(function (index, element) {

            var $section    = $(element),
                sectionTop  = $section.offset().top,
                $button     = $('<a href="#" class="navigator__item"><div class="bullet"></div></a>');

            $button.appendTo($navigator);
            $section.data('offsetTop', sectionTop);

            $button.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var scrollDistance = Math.abs(latestKnownScrollY - headerTop),
                    scrollDuration = that.scrollDuration * scrollDistance / 1000;

                $('html, body').animate({
                    scrollTop: sectionTop
                }, {
                    duration: scrollDuration,
                    easing: "easeOutCubic"
                });

                return false;
            });

        });

        $('<div class="navigator__item  navigator__item--selected"><div class="bullet"></div></div>').appendTo($navigator);

        $navigator.css({
            'margin-top': -1 * $navigator.height() / 2
        });

        TweenMax.to($navigator, 0.3, {
            opacity: 1
        });
    },

    update: function (scrollTop) {

        var that        = this,
            $navigator  = this.$el;

        // loop through each header and find current state
        this.$sections.each(function(i, element) {

            var $section        = $(element),
                sectionTop      = $section.data('offsetTop'),
                sectionBottom   = sectionTop + $section.outerHeight(),
                navigatorMiddle = scrollTop + (windowHeight / 2);

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
            TweenMax.to($selected, 0.3, {top: 24 * that.currentSelected});
        }

        // if the navigator's color has to be changed
        // then change it accordingly and update state
        if (this.wasWhite != this.isWhite) {
            this.wasWhite = this.isWhite;
            $navigator.toggleClass('navigator--black', !that.isWhite);
        }
    }

}