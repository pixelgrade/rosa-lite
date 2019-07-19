;(function ($) {
	$(document).ready(function () {
		//hide the featured image side section when selecting certain page templates
		hide_featured_image_for_full_widths();
		$('#page_template').on('change', function () {
			hide_featured_image_for_full_widths();
		});

	});

	var hide_featured_image_for_full_widths = function () {
			$('#postimagediv').show();
	};

})(jQuery, window);



