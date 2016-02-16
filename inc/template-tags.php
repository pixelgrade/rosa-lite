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

function rosa_display_header_down_arrow( $page_section_idx, $header_height ) {

	if ( $page_section_idx !== 1 || $header_height !== 'full-height' ) {
		return ;
	}

	//get the global option regarding down arrow style
	$down_arrow_style = wpgrade::option('down_arrow_style');
	if ( empty($down_arrow_style) ) {
		$down_arrow_style = 'transparent'; //the default
	}

	if ( $down_arrow_style == 'bubble') {
		echo '<svg class="blurp--top" width="192" height="61" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 160.7 61.5" enable-background="new 0 0 160.7 61.5" xml:space="preserve"><path fill="#FFFFFF" d="M80.3,61.5c0,0,22.1-2.7,43.1-5.4s41-5.4,36.6-5.4c-21.7,0-34.1-12.7-44.9-25.4S95.3,0,80.3,0c-15,0-24.1,12.7-34.9,25.4S22.3,50.8,0.6,50.8c-4.3,0-6.5,0,3.5,1.3S36.2,56.1,80.3,61.5z"/></svg>';
	}
	echo '<div class="down-arrow down-arrow--' . $down_arrow_style . '"><div class="arrow"></div></div>' . PHP_EOL;
}


/*
 * Add custom styling for the media popup
 */
add_action( 'print_media_templates', 'rosa_custom_style_for_mediabox' );

function rosa_custom_style_for_mediabox() {
	?>
	<style>
		.media-sidebar {
			width: 400px;
		}

		.media-sidebar .field p.desc {
			color: #666;
			font-size: 11px;
			margin-top: 3px;
		}

		.media-sidebar .field p.help {
			display: none;
		}

		/*
		 * Options Specific Rules
		 */
		.media-sidebar .setting[data-setting="description"] textarea {
			min-height: 100px;
		}

		.media-sidebar table.compat-attachment-fields input[type=checkbox], .media-sidebar table.compat-attachment-fields input[type=checkbox] {
			margin: 0 6px 0 0;
		}

		table.compat-attachment-fields {
			margin-top: 12px;
		}

		.media-sidebar tr.compat-field-video_autoplay {
			margin: -12px 0 0 0;
		}

		.media-sidebar tr.compat-field-video_autoplay th.label {
			opacity: 0;
		}

		.media-sidebar tr.compat-field-external_url {

		}

		.attachments-browser .attachments, .attachments-browser .uploader-inline,
		.attachments-browser .media-toolbar {
			right: 433px;
		}

		.compat-item .field {
			width: 65%;
		}
	</style>
	<?php
}

/*
 * Add custom settings to the gallery popup interface
 */
function rosa_custom_gallery_settings() {

	// define your backbone template;
	// the "tmpl-" prefix is required,
	// and your input field should have a data-setting attribute
	// matching the shortcode name
	?>
	<script type="text/html" id="tmpl-mkslideshow">
		<label class="setting">
			<span><?php _e( 'Make this gallery a slideshow', 'rosa' ) ?></span>
			<input type="checkbox" data-setting="mkslideshow">
		</label>
	</script>

	<script>

		jQuery(document).ready(function () {

			// add your shortcode attribute and its default value to the
			// gallery settings list; $.extend should work as well...
			_.extend(wp.media.gallery.defaults, {
				mkslideshow: false
			});

			// merge default gallery settings template with yours
			wp.media.view.Settings.Gallery = wp.media.view.Settings.Gallery.extend({
				template: function (view) {
					return wp.media.template('gallery-settings')(view)
						+ wp.media.template('mkslideshow')(view);
				}
			});

		});

	</script>
	<?php
}
add_action( 'print_media_templates', 'rosa_custom_gallery_settings' );