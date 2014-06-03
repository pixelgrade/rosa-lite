;
(function ($) {
	$(document).ready(function () {
		//hide the featured image side section when selecting certain page templates
		if ($('#page_template').val() == 'page-templates/contact.php' || $('#page_template').val() == 'page-templates/slideshow.php') {
			$('#postimagediv').hide();
		} else {
			$('#postimagediv').show();
		}

		$('#page_template').on('change', function () {
			if ($('#page_template').val() == 'page-templates/contact.php' || $('#page_template').val() == 'page-templates/slideshow.php') {
				$('#postimagediv').hide();
			} else {
				$('#postimagediv').show();
			}
		});
	});
})(jQuery, window);



