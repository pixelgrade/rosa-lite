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
            TweenMax.to($header, 0.1, {
                y: 0
            });
        },
        onUnpin: function () {
            TweenMax.to($header, 0.1, {
                y: -1 * headerHeight
            });
        }
    });
}