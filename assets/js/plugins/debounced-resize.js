/* --- $DEBOUNCES RESIZE --- */

/* debouncedresize: special jQuery event that happens once after a window resize
 * https://github.com/louisremi/jquery-smartresize
 * Copyright 2012 @louis_remi
 */
(function ($) {
	var $event = $.event, $special, resizeTimeout;
	$special = $event.special.debouncedresize = {
		setup: function () {
			$(this).on("resize", $special.handler);
		}, teardown: function () {
			$(this).off("resize", $special.handler);
		}, handler: function (event, execAsap) {
			var context = this, args = arguments, dispatch = function () {
				event.type = "debouncedresize";
				$event.dispatch.apply(context, args);
			};
			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}
			execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
		}, threshold: 150
	};
})(jQuery);
