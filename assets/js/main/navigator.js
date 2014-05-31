function navigatorInit() {

    var $navigator      = $('.navigator'),
        $headers        = $('.article__header'),
        lastSelected    = 0;

    if (!$navigator.length || $headers.length < 2) {
        return;
    }

    for (var i = 0; i < $headers.length; i = i + 1) {
        $('<div class="navigator__item"></div>').appendTo($navigator);
    }

    var $selected = $('<div class="navigator__item  navigator__item--selected"></div>').appendTo($navigator);

    $navigator.css({
        'margin-top': -1 * $navigator.height() / 2
    });

    requestTick();

    TweenMax.to($navigator, 0.3, {opacity: 1});

    var latestKnownScrollY = window.scrollY,
        ticking = false;

    function update() {

        var currentSelected;

        ticking = false;

        $headers.each(function(i, header) {

            var $header         = $(header),
                headerTop       = $header.offset().top,
                headerBottom    = headerTop + $header.outerHeight(),
                navigatorMiddle = latestKnownScrollY + (wh / 2);

            if (navigatorMiddle > headerTop) {
                currentSelected = i;
                $navigator.removeClass('navigator--black');

                if (navigatorMiddle > headerBottom) {
                    $navigator.addClass('navigator--black');
                }
            }

        });

        if (lastSelected != currentSelected) {
            lastSelected = currentSelected;
            TweenMax.to($selected, 0.3, {top: 24 * currentSelected, ease: 'Bounce'});
        }

    }

    $(window).scroll(function () {
        latestKnownScrollY = window.scrollY;
        requestTick();
    });

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }
}