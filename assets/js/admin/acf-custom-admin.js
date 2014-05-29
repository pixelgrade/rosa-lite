;
(function ($) {
	$(document).ready(function () {

		var processHiddenFiles = function () {

			// custom show/hide for fields which depends on posts_source value
			$('tr[data-field_name=posts_source_category]').hide();
			$('tr[data-field_name=posts_source_post_formats]').hide();


			$('tr[data-field_name="posts_source"]').each(function (i, e) {


				var $parent = $(this).parent();
				var $select = $(this).find('select');

				if ($select.val() == 'latest_by_cat') {
					$(this).siblings('tr[data-field_name=posts_source_category]').show();
				}

				if ($select.val() == 'latest_by_format') {
					$(this).siblings('tr[data-field_name=posts_source_post_formats]').show();
				}
			});

		}

		processHiddenFiles();

		// all this above should be also moved in the "on change" action below
		$(document).on('change', 'tr[data-field_name=posts_source] select', function () {
			processHiddenFiles();
		});

		$(document).on('acf/setup_fields', function () {
			processHiddenFiles();
		});

	});
})(jQuery);