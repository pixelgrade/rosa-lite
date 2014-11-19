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
    timeline:           new pixGS.TimelineMax({ paused: true }),
    nextTop:            0,
    footer:             null,
    footerTop:          0,

    initialize: function () {

        var that        = this,
            $navigator  = this.$el;

        this.initialized    = true;
        this.$sections      = $(that.sectionSelector);

        this.footer = $('.sidebar--footer__dark');

        if (this.footer.length) {
            this.footerTop = this.footer.offset().top;
        }

        if (this.$sections.length < 2) {
            return;
        }


        for (var index = 0; index < this.$sections.length; index++) {

            var $section        = $(that.$sections[index]),
                sectionTop      = $section.offset().top,
                sectionHeight   = $section.outerHeight(),
                $button         = $('<a href="#" class="navigator__item"><div class="bullet"></div></a>');

            if ($section.css('display') == 'none') {

                if (!$section.next().is('.article--page')) {
                    that.$sections.splice(index, 1);
                    index--;
                    continue;
                } else {
                    sectionTop = that.nextTop;
                }
            } else {
                that.nextTop += sectionHeight;
            }

            if ($section.next().is('.article--page')) {
                that.nextTop += $section.next().outerHeight();
            }

            $button.appendTo($navigator);
            $button.data('scrollTo', sectionTop - windowHeight/2 + sectionHeight/2);
            $section.data('offsetTop', sectionTop);

            // closures
            (function ($newButton) {
                $newButton.on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    smoothScrollTo($newButton.data('scrollTo'));

                    return false;
                });
            })($button);

        }

        this.$selected          = $('<div class="navigator__item  navigator__item--selected"><div class="bullet"></div></div>').appendTo($navigator);
        this.$selectedBullet    = this.$selected.find('.bullet');

        this.timeline.add(pixGS.TweenMax.to(that.$selectedBullet, 0, {}));

        this.timeline.add(pixGS.TweenMax.to(that.$selectedBullet, 0.1, {
            'border-top-left-radius': 20,
            'border-top-right-radius': 20,
            'scaleY': 2,
            'scaleX': 0.6
        }));

        this.timeline.add(pixGS.TweenMax.to(that.$selectedBullet, 0.1, {
            'border-top-left-radius': 50,
            'border-top-right-radius': 50,
            'scaleY': 1,
            'scaleX': 1
        }));

        this.timeline.add(pixGS.TweenMax.to(that.$selectedBullet, 0, {
            'scale': 1.2
        }));


        $navigator.css({'margin-top': -1 * $navigator.height() / 2}).prependTo("body");

        this.update();

        $('.navigator__item').each(function (i, obj) {

            var items   = $('.navigator__item').length,
                stagger = 3000 + i * 400,
                $obj    = $(obj);

            if ($obj.is('.navigator__item--selected')) {
                stagger = stagger + items * 100;
            }

            setTimeout(function () {
                pixGS.TweenMax.fromTo($obj, 1, {opacity: 0, scale: 0.7}, {opacity: 1.25, scale: 1, ease: pixGS.Elastic.easeOut});
            }, stagger);
        });

        if($navigator.hasClass('navigator--transparent'))
            pixGS.TweenMax.to($navigator, 2, {opacity: .2 });
        else
            pixGS.TweenMax.to($navigator, .3, {opacity: 1 });
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

            var $section                = $(element),
                sectionTop              = $section.data('offsetTop'),
                sectionBottom           = sectionTop + $section.outerHeight(),
                navigatorMiddle         = latestKnownScrollY + (windowHeight / 2);

            // if there's no header

            if ($section.css('display') == 'none') {
                sectionBottom = sectionTop;
                if (!$section.next().is('.article--page')) {
                    return;
                }
            }

            if (navigatorMiddle > sectionTop) {
                that.currentSelected = i;
                that.isWhite = true;

                if (navigatorMiddle > sectionBottom) {
                    that.isWhite = false;
                }
            }

        });

        if (this.footerTop != 0 && this.footerTop < latestKnownScrollY + (windowHeight / 2)) {
            this.isWhite = true;
        }

        // if the navigator's indicator has to be moved
        // then move it accordingly and update state
        if (this.lastSelected != this.currentSelected) {
            this.lastSelected = this.currentSelected;
            pixGS.TweenMax.to(this.$selected, 0.3, {top: 24 * that.currentSelected});
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