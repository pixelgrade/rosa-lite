<?php
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


function rosa_callback_addthis() {
	//lets determine if we need the addthis script at all
	if ( is_single() && wpgrade::option( 'blog_single_show_share_links' ) ):
		wp_enqueue_script( 'addthis-api' );

		//here we will configure the AddThis sharing globally
		global $post;
		if ( empty( $post ) ) {
			return;
		} ?>
		<script type="text/javascript">
			addthis_config = {
				<?php if (wpgrade::option('share_buttons_enable_tracking') && wpgrade::option('share_buttons_enable_addthis_tracking')):
				echo 'username : "'.wpgrade::option('share_buttons_addthis_username').'",';
			endif; ?>
				ui_click: false,
				ui_delay: 100,
				ui_offset_top: 42,
				ui_use_css: true,
				data_track_addressbar: false,
				data_track_clickback: false
				<?php if (wpgrade::option('share_buttons_enable_tracking') && wpgrade::option('share_buttons_enable_ga_tracking')):
				echo ', data_ga_property: "'.wpgrade::option('share_buttons_ga_id').'"';
				if (wpgrade::option('share_buttons_enable_ga_social_tracking')):
					echo ', data_ga_social : true';
				endif;
			endif; ?>
			};

			addthis_share = {
				url: "<?php echo rosa_get_current_canonical_url(); ?>",
				title: "<?php wp_title('|', true, 'right'); ?>",
				description: "<?php echo trim(strip_tags(get_the_excerpt())) ?>"
			};
		</script>
		<?php
	endif;
}

function rosa_please_select_a_menu_fallback() {
	echo '
		<ul class="nav  nav--main sub-menu" >
			<li><a href="' . admin_url( 'nav-menus.php?action=locations' ) . '">' . __( 'Please select a menu in this location', 'rosa' ) . '</a></li>
		</ul>';
}