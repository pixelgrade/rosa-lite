function navigatorInit() {

    var $navigator      = $('.navigator'),
        $headers        = $('.article__header'),
        currentSelected = 0,
        lastSelected    = 0,
        isWhite         = true,
        wasWhite        = true,
        latestKnownScrollY = window.scrollY,
        ticking = false;

    // if we're not on a page or there's only one header ABORT MISSION!
    if (!$navigator.length || $headers.length < 2) {
        return;
    }

    // add bullets to the indicator for each header found
    for (var i = 0; i < $headers.length; i = i + 1) {
        $('<div class="navigator__item"></div>').appendTo($navigator);
    }

    // add an indicator for the section that's currently in the viewport
    var $selected = $('<div class="navigator__item  navigator__item--selected"></div>').appendTo($navigator);

    // after all the bullets have been added vertically center the navigator
    $navigator.css({
        'margin-top': -1 * $navigator.height() / 2
    });

    // update
    requestTick();
    TweenMax.to($navigator, 0.3, {opacity: 1});

    // function used to update navigator's color and indicator's position
    function update() {

        ticking = false;

        // loop through each header and find current state
        $headers.each(function(i, header) {

            var $header         = $(header),
                headerTop       = $header.offset().top,
                headerBottom    = headerTop + $header.outerHeight(),
                navigatorMiddle = latestKnownScrollY + (wh / 2);

            if (navigatorMiddle > headerTop) {
                currentSelected = i;
                isWhite = true;

                if (navigatorMiddle > headerBottom) {
                    isWhite = false;
                }
            }

        });

        // if the navigator's indicator has to be moved
        // then move it accordingly and update state
        if (lastSelected != currentSelected) {
            lastSelected = currentSelected;
            TweenMax.to($selected, 0.3, {top: 24 * currentSelected});
        }

        // if the navigator's color has to be changed
        // then change it accordingly and update state
        if (wasWhite != isWhite) {
            wasWhite = isWhite;
            $navigator.toggleClass('navigator--black', !isWhite);
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