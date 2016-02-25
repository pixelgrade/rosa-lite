/* --- Sticky Header Init --- */

var StickyHeader = (function() {

    var headerSelector      = '.site-header',
        $header             = $(headerSelector),
        headerHeight,
        $headers,
        offset;

    function init() {
        headerHeight = $header.outerHeight(),
        $headers = $('.article__header'),
        offset = $headers.length ? $headers.first().outerHeight() : 0;
    }

    function update() {
        if ( latestKnownScrollY > offset - headerHeight - 1) {
            $header.removeClass('headroom--top').addClass('headroom--not-top');
        } else {
            $header.removeClass('headroom--not-top').addClass('headroom--top');
        }
    }

    return {
        init: init,
        update: update
    }
})();