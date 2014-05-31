function navigatorInit() {

    var $navigator = $('.navigator'),
        $headers = $('.article__header');

    if (!$navigator.length || $headers.length < 2) {
        return;
    }

    for (var i = 0; i < $headers.length; i = i + 1) {
        $('<div class="navigator__item"></div>').appendTo($navigator);
    }

//    $navigator.clone().appendTo($headers);
//    $navigator.clone().appendTo($headers.next());

    $navigator.css({
        'margin-top': -1 * $navigator.height() / 2
    });

//    requestTick();

    TweenMax.to($navigator, 0.3, {opacity: 1});

    var latestKnownScrollY = window.scrollY,
        ticking = false;

    function update() {
        ticking = false;

        $headers.each(function(i, header) {

            var $header         = $(header),
                headerTop       = $header.offset().top,
                headerBottom    = headerTop + $header.outerHeight(),
                navigatorMiddle = latestKnownScrollY + (wh / 2);

            if (navigatorMiddle > headerTop) {
                $navigator.children().removeClass('navigator__item--selected').eq(i).addClass('navigator__item--selected');
                $navigator.removeClass('navigator--black');

                if (navigatorMiddle > headerBottom) {
                    $navigator.addClass('navigator--black');
                }
            }

        });

    }

//    $(window).scroll(function () {
//        latestKnownScrollY = window.scrollY;
//        requestTick();
//    });
//
//    function requestTick() {
//        if (!ticking) {
//            requestAnimationFrame(update);
//        }
//        ticking = true;
//    }
}