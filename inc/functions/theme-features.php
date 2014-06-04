<?php
/**
 * Invoked by wpgrade_callback_themesetup
 */
function wpgrade_callback_custom_theme_features() {

	// @todo CLEANUP consider options for spliting editor style out of main style
//	add_editor_style( get_template_directory_uri() . '/assets/css/style.css' );
}

//use different image sizes depending on the number of columns
add_filter( 'shortcode_atts_gallery', 'wpgrade_overwrite_gallery_atts', 10, 3 );

function wpgrade_overwrite_gallery_atts( $out, $pairs, $atts ) {

	//if we need to make a slideshow then output full size images
	if ( isset( $atts['mkslideshow'] ) && $atts['mkslideshow'] == true ) {
		$out['size'] = 'full-size';
	} elseif ( isset( $atts['columns'] ) ) { //else smaller images depending on no. of columns
		switch ( $atts['columns'] ) {
			case '1':
				$out['size'] = 'large';
				break;
			case '2':
				$out['size'] = 'medium';
				break;
		}

	}

	return $out;
}

/*
 * Add custom filter for gallery shortcode output
 */
add_filter( 'post_gallery', 'wpgrade_custom_post_gallery', 10, 2 );

function wpgrade_custom_post_gallery( $output, $attr ) {
	global $post, $wp_locale;
	static $instance = 0;

	// We're trusting author input, so let's at least make sure it looks like a valid orderby statement
	if ( isset( $attr['orderby'] ) ) {
		$attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
		if ( ! $attr['orderby'] ) {
			unset( $attr['orderby'] );
		}
	}

	$html5 = current_theme_supports( 'html5', 'gallery' );
	extract( shortcode_atts( array(
		'order'       => 'ASC',
		'orderby'     => 'menu_order ID',
		'id'          => $post ? $post->ID : 0,
		'itemtag'     => $html5 ? 'figure' : 'dl',
		'icontag'     => $html5 ? 'div' : 'dt',
		'captiontag'  => $html5 ? 'figcaption' : 'dd',
		'columns'     => 3,
		'size'        => 'thumbnail',
		'include'     => '',
		'exclude'     => '',
		'link'        => '',
		'mkslideshow' => false,
	), $attr, 'gallery' ) );

	$id = intval( $id );
	if ( 'RAND' == $order ) {
		$orderby = 'none';
	}

	if ( ! empty( $include ) ) {
		$_attachments = get_posts( array(
			'include'        => $include,
			'post_status'    => 'inherit',
			'post_type'      => 'attachment',
			'post_mime_type' => 'image',
			'order'          => $order,
			'orderby'        => $orderby
		) );

		$attachments = array();
		foreach ( $_attachments as $key => $val ) {
			$attachments[ $val->ID ] = $_attachments[ $key ];
		}
	} elseif ( ! empty( $exclude ) ) {
		$attachments = get_children( array(
			'post_parent'    => $id,
			'exclude'        => $exclude,
			'post_status'    => 'inherit',
			'post_type'      => 'attachment',
			'post_mime_type' => 'image',
			'order'          => $order,
			'orderby'        => $orderby
		) );
	} else {
		$attachments = get_children( array(
			'post_parent'    => $id,
			'post_status'    => 'inherit',
			'post_type'      => 'attachment',
			'post_mime_type' => 'image',
			'order'          => $order,
			'orderby'        => $orderby
		) );
	}

	if ( empty( $attachments ) ) {
		return '';
	}

	if ( is_feed() ) {
		$output = "\n";
		foreach ( $attachments as $att_id => $attachment ) {
			$output .= wp_get_attachment_link( $att_id, $size, true ) . "\n";
		}

		return $output;
	}

	//If we need to make a slideshow out of this gallery

	if ( "true" === $mkslideshow ) {

		$output .= '
			<div class="content--gallery-slideshow">
				<div class="pixslider  pixslider--gallery-slideshow  js-pixslider"
				     data-arrows
				     data-imagealigncenter
				     data-imagescale="fill"
				     data-slidertransition="fade"
				     >';
		foreach ( $attachments as $id => $attachment ) :

			$full_img          = wp_get_attachment_image_src( $attachment->ID, 'full-size' );
			$attachment_fields = get_post_custom( $attachment->ID );

			// prepare the video url if there is one
			$video_url = ( isset( $attachment_fields['_video_url'][0] ) && ! empty( $attachment_fields['_video_url'][0] ) ) ? esc_url( $attachment_fields['_video_url'][0] ) : '';

			// should the video auto play?
			$video_autoplay = ( isset( $attachment_fields['_video_autoplay'][0] ) && ! empty( $attachment_fields['_video_autoplay'][0] ) && $attachment_fields['_video_autoplay'][0] === 'on' ) ? $attachment_fields['_video_autoplay'][0] : '';

			$output .= '<div class="gallery-item' . ( ! empty( $video_url ) ? ' video' : '' ) . ( ( $video_autoplay == 'on' ) ? ' video_autoplay' : '' ) . '" itemscope
						     itemtype="http://schema.org/ImageObject"
						     data-caption="' . htmlspecialchars( $attachment->post_excerpt ) . '"
						     data-description="' . htmlspecialchars( $attachment->post_content ) . '"' . ( ( ! empty( $video_autoplay ) ) ? 'data-video_autoplay="' . $video_autoplay . '"' : '' ) . '>
							<img src="' . $full_img[0] . '" class="attachment-blog-big rsImg"
							     alt="' . $attachment->post_excerpt . '"
							     itemprop="contentURL" ' . ( ( ! empty( $video_url ) ) ? ' data-rsVideo="' . $video_url . '"' : '' ) . ' />
						</div>';
		endforeach;
		$output .= '</div>
		</div><!-- .content .content--gallery-slideshow -->';

	} else { //just a normal grid gallery

		$itemtag    = tag_escape( $itemtag );
		$captiontag = tag_escape( $captiontag );
		$icontag    = tag_escape( $icontag );
		$valid_tags = wp_kses_allowed_html( 'post' );
		if ( ! isset( $valid_tags[ $itemtag ] ) ) {
			$itemtag = 'dl';
		}
		if ( ! isset( $valid_tags[ $captiontag ] ) ) {
			$captiontag = 'dd';
		}
		if ( ! isset( $valid_tags[ $icontag ] ) ) {
			$icontag = 'dt';
		}

		$columns   = intval( $columns );
		$itemwidth = $columns > 0 ? floor( 100 / $columns ) : 100;
		$float     = is_rtl() ? 'right' : 'left';

		$selector = "gallery-{$instance}";

		$gallery_style = $gallery_div = '';

		/**
		 * Filter whether to print default gallery styles.
		 *
		 * @since 3.1.0
		 *
		 * @param bool $print Whether to print default gallery styles.
		 *                    Defaults to false if the theme supports HTML5 galleries.
		 *                    Otherwise, defaults to true.
		 */
		if ( apply_filters( 'use_default_gallery_style', true ) ) {
			$gallery_style = "
		<style type='text/css'>
			#{$selector} {
				margin: auto;
			}
			#{$selector} .gallery-item {
				float: {$float};
				text-align: center;
				width: {$itemwidth}%;
			}
			/* see gallery_shortcode() in wp-includes/media.php */
		</style>\n\t\t";
		}

		$size_class  = sanitize_html_class( $size );
		$gallery_div = "<div id='$selector' class='gallery galleryid-{$id} gallery-columns-{$columns} gallery-size-{$size_class}'>";

		/**
		 * Filter the default gallery shortcode CSS styles.
		 *
		 * @since 2.5.0
		 *
		 * @param string $gallery_style Default gallery shortcode CSS styles.
		 * @param string $gallery_div Opening HTML div container for the gallery shortcode output.
		 */
		$output = apply_filters( 'gallery_style', $gallery_style . $gallery_div );

		$i = 0;
		foreach ( $attachments as $id => $attachment ) {
			if ( ! empty( $link ) && 'file' === $link ) {
				$image_output = wp_get_attachment_link( $id, $size, false, false );
			} elseif ( ! empty( $link ) && 'none' === $link ) {
				$image_output = wp_get_attachment_image( $id, $size, false );
			} else {
				$image_output = wp_get_attachment_link( $id, $size, true, false );
			}

			$image_meta = wp_get_attachment_metadata( $id );

			$orientation = '';
			if ( isset( $image_meta['height'], $image_meta['width'] ) ) {
				$orientation = ( $image_meta['height'] > $image_meta['width'] ) ? 'portrait' : 'landscape';
			}

			$output .= "<{$itemtag} class='gallery-item'>";
			$output .= "
			<{$icontag} class='gallery-icon {$orientation}'>
				$image_output
			</{$icontag}>";
			if ( $captiontag && trim( $attachment->post_excerpt ) ) {
				$output .= "
				<{$captiontag} class='wp-caption-text gallery-caption'>
				" . wptexturize( $attachment->post_excerpt ) . "
				</{$captiontag}>";
			}
			$output .= "</{$itemtag}>";
			if ( ! $html5 && $columns > 0 && ++$i % $columns == 0 ) {
				$output .= '<br style="clear: both" />';
			}
		}

		if ( ! $html5 && $columns > 0 && $i % $columns !== 0 ) {
			$output .= "
			<br style='clear: both' />";
		}

		$output .= "
		</div>\n";
	}

	return $output;
}

// Hook into the 'after_setup_theme' action
//add_action( 'after_setup_theme', 'wpgrade_custom_backgrounds_support' );

function wpgrade_custom_backgrounds_support() {

	$background_args = array(
		'default-color'          => '1a1717',
		'default-image'          => '',
		'wp-head-callback'       => '_custom_background_cb',
		'admin-head-callback'    => '',
		'admin-preview-callback' => '',
	);

	add_theme_support( 'custom-background', $background_args );
}

add_action( 'wp_head', 'wpgrade_add_desktop_icons' );

function wpgrade_add_desktop_icons() {

	if ( wpgrade::image_src( 'favicon' ) ) {
		echo "<link rel='icon' href=\"" . wpgrade::image_src( 'favicon' ) . "\" >\n";
	}

	if ( wpgrade::image_src( 'apple_touch_icon' ) ) {
		echo "<link rel=\"apple-touch-icon\" href=\"" . wpgrade::image_src( 'apple_touch_icon' ) . "\" >\n";
	}

	if ( wpgrade::image_src( 'metro_icon' ) ) {
		echo "<meta name=\"msapplication-TileColor\" content=\"#f01d4f\">\n";
		echo "<meta name=\"msapplication-TileImage\" content=\"" . wpgrade::image_src( 'metro_icon' ) . "\" >\n";
	}

}

add_action('admin_head', 'wpgrade_add_admin_favicon');
function wpgrade_add_admin_favicon() {
	if ( wpgrade::image_src( 'favicon' ) ) {
		echo "<link rel='icon' href=\"" . wpgrade::image_src( 'favicon' ) . "\" >\n";
	}
}

add_action( 'wp', 'wpgrade_prepare_password_for_custom_post_types' );

function wpgrade_prepare_password_for_custom_post_types() {

	global $wpgrade_private_post;
	$wpgrade_private_post = rosa::is_password_protected();

}

add_filter( 'mce_buttons', 'add_next_page_button' );
// Add "Next page" button to TinyMCE
function add_next_page_button( $mce_buttons ) {
	$pos = array_search( 'wp_more', $mce_buttons, true );
	if ( $pos !== false ) {
		$tmp_buttons   = array_slice( $mce_buttons, 0, $pos + 1 );
		$tmp_buttons[] = 'wp_page';
		$mce_buttons   = array_merge( $tmp_buttons, array_slice( $mce_buttons, $pos + 1 ) );
	}

	return $mce_buttons;
}

add_filter( 'wp_link_pages_args', 'add_next_and_number' );
// Customize the "wp_link_pages()" to be able to display both numbers and prev/next links
function add_next_and_number( $args ) {
	if ( $args['next_or_number'] == 'next_and_number' ) {
		global $page, $numpages, $multipage, $more, $pagenow;
		$args['next_or_number'] = 'number';
		$prev                   = '';
		$next                   = '';
		if ( $multipage and $more ) {
			$i = $page - 1;
			if ( $i and $more ) {
				$prev .= _wp_link_page( $i );
				$prev .= $args['link_before'] . $args['previouspagelink'] . $args['link_after'] . '</a>';
				$prev = apply_filters( 'wp_link_pages_link', $prev, 'prev' );
			}
			$i = $page + 1;
			if ( $i <= $numpages and $more ) {
				$next .= _wp_link_page( $i );
				$next .= $args['link_before'] . $args['nextpagelink'] . $args['link_after'] . '</a>';
				$next = apply_filters( 'wp_link_pages_link', $next, 'next' );
			}
		}
		$args['before'] = $args['before'] . $prev;
		$args['after']  = $next . $args['after'];
	}

	return $args;
}

/*
 * Add custom fields to attachments
 */
add_action( 'init', 'wpgrade_register_attachments_custom_fields' );

function wpgrade_register_attachments_custom_fields() {

	//add video support for attachments
	if ( ! function_exists( 'add_video_url_field_to_attachments' ) ) {

		function add_video_url_field_to_attachments( $form_fields, $post ) {
			if ( ! isset( $form_fields["video_url"] ) ) {
				$form_fields["video_url"] = array(
					"label" => __( "Video URL", wpgrade::textdomain() ),
					"input" => "text", // this is default if "input" is omitted
					"value" => esc_url( get_post_meta( $post->ID, "_video_url", true ) ),
					"helps" => __( "<p class='desc'>Attach a video to this image <span class='small'>(YouTube or Vimeo)</span>.</p>", wpgrade::textdomain() ),
				);
			}

			if ( ! isset( $form_fields["video_autoplay"] ) ) {

				$meta = get_post_meta( $post->ID, "_video_autoplay", true );
				// Set the checkbox checked or not
				if ( $meta == 'on' ) {
					$checked = ' checked="checked"';
				} else {
					$checked = '';
				}

				$form_fields["video_autoplay"] = array(
					"label" => __( "Video  Autoplay", wpgrade::textdomain() ),
					"input" => "html",
					"html"  => '<input' . $checked . ' type="checkbox" name="attachments[' . $post->ID . '][video_autoplay]" id="attachments[' . $post->ID . '][video_autoplay]" /><label for="attachments[' . $post->ID . '][video_autoplay]">' . __( 'Enable Video Autoplay?', wpgrade::textdomain() ) . '</label>'

				);
			}

//			if ( ! isset( $form_fields["external_url"] ) ) {
//				$form_fields["external_url"] = array(
//					"label" => __( "External URL", wpgrade::textdomain() ),
//					"input" => "text",
//					"value" => esc_url( get_post_meta( $post->ID, "_external_url", true ) ),
//					"helps" => __( "<p class='desc'>Set this image to link to an external website.</p>", wpgrade::textdomain() ),
//				);
//			}

			return $form_fields;
		}

//		add_filter( "attachment_fields_to_edit", "add_video_url_field_to_attachments", 99999, 2 );
	}

	/**
	 * Save custom media metadata fields
	 * Be sure to validate your data before saving it
	 * http://codex.wordpress.org/Data_Validation
	 *
	 * @param $post       The $post data for the attachment
	 * @param $attachment The $attachment part of the form $_POST ($_POST[attachments][postID])
	 *
	 * @return $post
	 */

	if ( ! function_exists( 'add_image_attachment_fields_to_save' ) ) {

//		add_filter( "attachment_fields_to_save", "add_image_attachment_fields_to_save", 9999, 2 );

		function add_image_attachment_fields_to_save( $post, $attachment ) {
			if ( isset( $attachment['video_url'] ) ) {
				update_post_meta( $post['ID'], '_video_url', esc_url( $attachment['video_url'] ) );
			}

			if ( isset( $attachment['video_autoplay'] ) ) {
				update_post_meta( $post['ID'], '_video_autoplay', 'on' );
			} else {
				update_post_meta( $post['ID'], '_video_autoplay', 'off' );
			}


//			if ( isset( $attachment['external_url'] ) ) {
//				update_post_meta( $post['ID'], '_external_url', esc_url( $attachment['external_url'] ) );
//			}

			return $post;
		}
	}
}

/*
 * Add custom styling for the media popup
 */
add_action( 'print_media_templates', 'wpgrade_custom_style_for_mediabox' );

function wpgrade_custom_style_for_mediabox() {
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
add_action( 'print_media_templates', 'wpgrade_custom_gallery_settings' );

function wpgrade_custom_gallery_settings() {

	// define your backbone template;
	// the "tmpl-" prefix is required,
	// and your input field should have a data-setting attribute
	// matching the shortcode name
	?>
	<script type="text/html" id="tmpl-mkslideshow">
		<label class="setting">
			<span><?php _e( 'Make this gallery a slideshow', wpgrade::textdomain() ) ?></span>
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