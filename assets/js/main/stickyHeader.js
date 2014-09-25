/* --- Sticky Header Init --- */

function stickyHeaderInit() {

    var headerSelector      = '.site-header',
        $header             = $(headerSelector),
        headerHeight        = $header.outerHeight(),
        $headers            = $('.article__header'),
        offset              = $headers.length ? $headers.first().outerHeight() : 0;

    $header.headroom({
        tolerance: 15,
        offset: offset - headerHeight - 1,
        // animate with GSAP
        onPin: function () {
        },
        onUnpin: function () {
            if ($('html').hasClass('navigation--is-visible')) {return}
        }
    });
}