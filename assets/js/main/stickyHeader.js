/* --- Sticky Header Init --- */

function stickyHeaderInit() {

    var headerSelector      = '.site-header',
        $header             = $(headerSelector),
        headerHeight        = $header.height();

    $header.headroom({
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