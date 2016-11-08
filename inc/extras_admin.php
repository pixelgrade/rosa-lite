<?php

function rosa_callback_help_pointers_setup() {

	require get_template_directory() . '/inc/classes/WP_Help_Pointer.php';

	// Define our pointers
	// -------------------

	$pointers = array(
		array(
			// unique id for this pointer
			'id'       => 'add-archive-menu-item-warning',
			// this is the page hook we want our pointer to show on
			'screen'   => 'nav-menus',
			// the css selector for the pointer to be tied to, best to use ID's
			'target'   => '#submit-post-type-archives',
			'title'    => 'Warning',
			'content'  => 'This menu item does NOT work if you changed the slug for the custom post type. If you haven\'t change it, dissmis this!',
			'position' => array(
				'edge'  => 'top', # values: top, bottom, left, right
				'align' => 'middle' # values: top, bottom, left, right, middle
			)
		)

		// more as needed
	);

	// Info about custom post types drag and drop
	// ------------------------------------------

	// require plugin.php to use is_plugin_active()
	include_once ABSPATH . 'wp-admin/includes/plugin.php';

	if ( is_plugin_active( 'simple-page-ordering/simple-page-ordering.php' ) ) {
		$pointers[] = array(
			// unique id for this pointer
			'id'       => 'info-about-draganddrop-on-postypes',
			// this is the page hook we want our pointer to show on
			'screen'   => 'edit-page',
			// the css selector for the pointer to be tied to, best to use ID's
			'target'   => '#the-list.ui-sortable .type-page:nth(1)',
			'title'    => 'Did you know ?',
			'content'  => 'You can order pages with drag and drop.',
			'position' => array(
				'edge'  => 'top', # values: top, bottom, left, right
				'align' => 'middle' # values: top, bottom, left, right, middle
			)
		);
	}

	// Initialize
	// ----------

	$myPointers = new WP_Help_Pointer();
	$myPointers->setup( $pointers );
}
add_action( 'admin_enqueue_scripts', 'rosa_callback_help_pointers_setup' );

function rosa_remove_wptextpattern_tinymce_plugin( $plugins ) {
	if ( $key = array_search( 'wptextpattern', $plugins ) ) {
		unset( $plugins[ $key ] );
	}

	return $plugins;
}
add_filter( 'tiny_mce_plugins', 'rosa_remove_wptextpattern_tinymce_plugin', 10, 1 );

/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Rosa
 */

function rosa_admin_get_pointer_help_template ( $pointers ) { ?>
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
<?php }