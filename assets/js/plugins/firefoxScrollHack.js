/*
 Firefox super responsive scroll (c) Keith Clark - MIT Licensed
 */
(function(doc) {

    var root = doc.documentElement;

    // Not ideal, but better than UA sniffing.
    if ("MozAppearance" in root.style) {

        // determine the vertical scrollbar width
        var scrollbarWidth = root.clientWidth;
        root.style.overflow = "scroll";
        scrollbarWidth -= root.clientWidth;
        root.style.overflow = "";

        // create a synthetic scroll event
        var scrollEvent = doc.createEvent("UIEvent")
        scrollEvent.initEvent("scroll", true, true);

        // event dispatcher
        function scrollHandler() {
            doc.dispatchEvent(scrollEvent)
        }

        // detect mouse events in the document scrollbar track
        doc.addEventListener("mousedown", function(e) {
            if (e.clientX > root.clientWidth - scrollbarWidth) {
                doc.addEventListener("mousemove", scrollHandler, false);
                doc.addEventListener("mouseup", function() {
                    doc.removeEventListener("mouseup", arguments.callee, false);
                    doc.removeEventListener("mousemove", scrollHandler, false);
                }, false)
            }
        }, false)

        // override mouse wheel behaviour.
        doc.addEventListener("DOMMouseScroll", function(e) {
            // Don't disable hot key behaviours
            if (!e.ctrlKey && !e.shiftKey) {
                root.scrollTop += e.detail * 16;
                scrollHandler.call(this, e);
                e.preventDefault()
            }
        }, false)

    }
})(document);