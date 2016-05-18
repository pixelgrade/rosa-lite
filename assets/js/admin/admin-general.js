;(function ($) {
	$(document).ready(function () {
		//hide the featured image side section when selecting certain page templates
		hide_featured_image_for_full_widths();
		$('#page_template').on('change', function () {
			hide_featured_image_for_full_widths();
		});

		// hide some features when this page is a child
		hide_options_on_child_pages();
		$('#parent_id').on('change', function () {
			hide_options_on_child_pages();
		});
	});

	var hide_featured_image_for_full_widths = function () {
		var template = $('#page_template').val();
		if (template == 'page-templates/contact.php' || template == 'page-templates/slideshow.php') {
			$('#postimagediv').hide();
		} else {
			$('#postimagediv').show();
		}
	};

	var hide_options_on_child_pages = function () {
		var $option_container = $('#_rosa_header_transparent_menu_bar').parent();
		if ($('#parent_id').val() == '') {
			$option_container.show();
		} else {
			$option_container.hide();
		}
	};

})(jQuery, window);



