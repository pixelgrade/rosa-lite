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
 * Subpages edit links in the admin bar in the backend (edit/new page)
 *
 * @TODO move this inside a plugin
 *
 * @param WP_Admin_Bar $wp_admin_bar
 */
function rosa_subpages_admin_bar_edit_links_backend( $wp_admin_bar ) {
	global $post, $pagenow;

	$is_edit_page = in_array( $pagenow, array( 'post.php',  ) );

	if ( ! $is_edit_page ) //check for new post page
		$is_edit_page = in_array( $pagenow, array( 'post-new.php' ) );
	elseif ( ! $is_edit_page )  //check for either new or edit
		$is_edit_page = in_array( $pagenow, array( 'post.php', 'post-new.php' ) );


	if ( $is_edit_page && isset( $post->post_parent ) && ! empty( $post->post_parent ) ) {

		$wp_admin_bar->add_node( array(
			'id'    => 'edit_parent',
			'title' => __( 'Edit Parent', 'rosa' ),
			'href'  => get_edit_post_link( $post->post_parent ),
			'meta'  => array( 'class' => 'edit_parent_button' )
		) );

		$siblings = get_children(
			array(
				'post_parent' => $post->post_parent,
				'orderby' => 'menu_order title', //this is the exact ordering used on the All Pages page - order included
				'order' => 'ASC',
				'post_type' => 'page',
			)
		);

		$siblings = array_values($siblings);
		$current_pos = 0;
		foreach ( $siblings as $key => $sibling ) {

			if ( $sibling->ID == $post->ID ) {
				$current_pos = $key;
			}
		}

		if ( isset($siblings[ $current_pos - 1 ] ) ){

			$prev_post = $siblings[ $current_pos - 1 ];

			$wp_admin_bar->add_node( array(
				'id'    => 'edit_prev_child',
				'title' => __( 'Edit Prev Child', 'rosa' ),
				'href'  => get_edit_post_link( $prev_post->ID ),
				'meta'  => array( 'class' => 'edit_prev_child_button' )
			) );
		}

		if ( isset($siblings[ $current_pos + 1 ] ) ) {

			$next_post =  $siblings[ $current_pos + 1 ];

			$wp_admin_bar->add_node( array(
				'id'    => 'edit_next_child',
				'title' => __( 'Edit Next Child', 'rosa' ),
				'href'  => get_edit_post_link( $next_post->ID ),
				'meta'  => array( 'class' => 'edit_next_child_button' )
			) );
		}

	}

	//this way we allow for pages that have both a parent and children
	if ( $is_edit_page ) {

		$kids = get_children(
			array(
				'post_parent' => $post->ID,
				'orderby' => 'menu_order title', //this is the exact ordering used on the All Pages page - order included
				'order' => 'ASC',
				'post_type' => 'page',
			)
		);

		if ( !empty($kids) ) {

			$args = array(
				'id'    => 'edit_children',
				'title' => __( 'Edit Children', 'rosa' ),
				'href'  => '#',
				'meta'  => array( 'class' => 'edit_children_button' )
			);

			$wp_admin_bar->add_node( $args );

			foreach ( $kids as $kid ) {
				$kid_args = array(
					'parent' => 'edit_children',
					'id'    => 'edit_child_' . $kid->post_name,
					'title' => __( 'Edit', 'rosa' ) . ': ' . $kid->post_title,
					'href'  => get_edit_post_link( $kid->ID ),
					'meta'  => array( 'class' => 'edit_child_button' )
				);
				$wp_admin_bar->add_node( $kid_args );
			}
		}
	}
}

add_action( 'admin_bar_menu', 'rosa_subpages_admin_bar_edit_links_backend', 999 );

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