/* --- Sticky Header Init --- */

function stickyHeaderInit() {

    var headerSelector      = '.site-header',
        $header             = $(headerSelector),
        headerHeight        = $header.height(),
        $headers            = $('.article__header'),
        offset              = $headers.length ? $headers.first().height() : 0;

    $header.headroom({
        tolerance: 15,
        offset: offset,
        // animate with GSAP
        onPin: function () {
            TweenMax.to($header, 0.1, {top: 0});
        },
        onUnpin: function () {
            if ($('html').hasClass('navigation--is-visible')) {return}
            TweenMax.to($header, 0.1, {top: -1 * headerHeight});
        }
    });
}