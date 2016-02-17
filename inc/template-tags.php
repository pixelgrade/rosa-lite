<?php


function rosa_callback_inlined_custom_style() {

	ob_start();
	//handle the complicated logic of the footer waves that keeps changing color
	$footer_sidebar_style    = rosa::option( 'footer_sidebar_style' );
	$waves_fill_color = '#121212';
	switch ($footer_sidebar_style) {
		case 'light' :
			$waves_fill_color = '#ffffff';
			break;
		case 'dark' :
			$waves_fill_color = '#121212';
			break;
		case 'accent' :
			$waves_fill_color = '#'.rosa::option('main-color');
			break;

	}
	?>
	.site-footer.border-waves:before,
	.border-waves-top.border-waves-top--dark:before {
	background-image: url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 19 14' width='19' height='14' enable-background='new 0 0 19 14' xml:space='preserve' preserveAspectRatio='none slice'><g><path fill='<?php echo $waves_fill_color ?>' d='M0,0c4,0,6.5,5.9,9.5,5.9S15,0,19,0v7H0V0z'/><path fill='<?php echo $waves_fill_color ?>' d='M19,14c-4,0-6.5-5.9-9.5-5.9S4,14,0,14l0-7h19V14z'/></g></svg>");
	}
	<?php

	$custom_css = ob_get_clean();
	$style      = 'wpgrade-main-style';

	wp_add_inline_style( $style, $custom_css );
}

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
	if ( is_single() && rosa::option( 'blog_single_show_share_links' ) ):
		wp_enqueue_script( 'addthis-api' );

		//here we will configure the AddThis sharing globally
		global $post;
		if ( empty( $post ) ) {
			return;
		} ?>
		<script type="text/javascript">
			addthis_config = {
				<?php if (rosa::option('share_buttons_enable_tracking') && rosa::option('share_buttons_enable_addthis_tracking')):
				echo 'username : "'.rosa::option('share_buttons_addthis_username').'",';
			endif; ?>
				ui_click: false,
				ui_delay: 100,
				ui_offset_top: 42,
				ui_use_css: true,
				data_track_addressbar: false,
				data_track_clickback: false
				<?php if (rosa::option('share_buttons_enable_tracking') && rosa::option('share_buttons_enable_ga_tracking')):
				echo ', data_ga_property: "'.rosa::option('share_buttons_ga_id').'"';
				if (rosa::option('share_buttons_enable_ga_social_tracking')):
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
add_action( 'wp_enqueue_scripts', 'rosa_callback_addthis' );

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
	$down_arrow_style = rosa::option('down_arrow_style');
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


/**
 * Note: next_text and prev_text are already flipped as per sorted_paging
 * in the configuration passed to this function.
 * The formatter is designed to generate the following structure:
 *    <div class="wpgrade_pagination">
 *        <a class="prev disabled page-numbers">Previous Page</a>
 *        <div class="pages">
 *            <span class="page">Page</span>
 *            <span class="page-numbers current">1</span>
 *            <span class="dots-of">of</span>
 *            <a class="page-numbers" href="/page/8/">8</a>
 *        </div>
 *        <a class="next page-numbers" href="/page/2/">Newer posts</a>
 *    </div>
 *
 * @param array pagination links
 * @param array pagination configuration
 *
 * @return string
 */
function rosa_callback_pagination_formatter( $links, $conf ) {
	$linkcount = count( $links );

	//don't show anything when no pagination is needed
	if ( $linkcount == 0 ) {
		return '';
	}
	$prefix = '';
	$suffix = '<!--';

	$current = $conf['current'];
	foreach ( $links as $key => &$link ) {

		//some SEO shit
		//prevent pagination parameters for the links to the first page
		if ( $key == 0 && $current == 2 && strpos( $link, 'prev' ) ) {
			//the first link - should be prev and since we are on page 2 it will hold the link to the first page
			$link = preg_replace( '/href=(["\'])(http:\/\/)?([^"\']+)(["\'])/', 'href="' . get_pagenum_link( 1 ) . '"', $link );
		}

		//change the link of the first page to be more SEO friendly
		$link_text = strip_tags( $link );
		if ( $current != 1 && $link_text == "1" ) {
			$link = preg_replace( '/href=(["\'])(http:\/\/)?([^"\']+)(["\'])/', 'href="' . get_pagenum_link( 1 ) . '"', $link );
		}

		if ( $key == $linkcount - 1 ) {
			$suffix = '';
		}

		$link   = $prefix . '<li>' . $link . '</li>' . $suffix;
		$prefix = "\n-->";
	}

	//if we are on the first page we should have a disabled prev text
	if ( $current == 1 ) {
		array_unshift( $links, '<li><span class="prev  page-numbers  disabled">' . $conf['prev_text'] . '</span></li>' );
	}
	//if we are on the last page we should have a disabled next text
	if ( $current == $conf['total'] ) {
		array_push( $links, '<li><span class="next page-numbers  disabled">' . $conf['next_text'] . '</span></li>' );
	}

	return '<ol class="nav nav--banner pagination">' . implode( '', $links ) . '</ol>';
}


/** Do the same thing on single post pagination */
function rosa_pagination_custom_markup( $link, $key ) {
	global $wp_query;
	$current = ( get_query_var( 'page' ) ) ? get_query_var( 'page' ) : '1';
	$class   = '';
	$prefix  = '-->';
	$suffix  = '<!--';
	switch ( $key ) {
		case $current:
			$class .= 'class="pagination-item pagination-item--current"';
			$link = '<span>' . $link . '</span>';
			break;
		case 'prev':
			$class .= 'class="pagination-item pagination-item--prev"';
			break;
		case 'next':
			$class .= 'class="pagination-item pagination-item--next"';
			break;
		default:
			break;
	}

	$link = '<li ' . $class . '>' . $link . '</li>';

	return $link;
}

add_filter( 'wp_link_pages_link', 'rosa_pagination_custom_markup', 10, 2 );

