<script>
	jQuery(document).ready(function ($) {
		var WPHelpPointer = <?php echo $pointers; ?>;

		$.each(WPHelpPointer.pointers, function (i) {
			wp_help_pointer_open(i);
		});

		function wp_help_pointer_open(i) {
			pointer = WPHelpPointer.pointers[i];
			options = $.extend(pointer.options, {
				close: function () {
					$.post(ajaxurl, {
						pointer: pointer.pointer_id,
						action: 'dismiss-wp-pointer'
					});
				}
			});

			$(pointer.target)
				.pointer(options)
				.pointer('open');

			console.log(pointer.target);
		}
	});
</script>
