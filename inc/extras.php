<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Rosa
 */

/**
 * The following code is inspired by Yoast SEO.
 */
function rosa_get_current_canonical_url() {
	global $wp_query;

	if ( $wp_query->is_404 || $wp_query->is_search ) {
		return false;
	}

	$haspost = count( $wp_query->posts ) > 0;

	if ( get_query_var( 'm' ) ) {
		$m = preg_replace( '/[^0-9]/', '', get_query_var( 'm' ) );
		switch ( strlen( $m ) ) {
			case 4:
				$link = get_year_link( $m );
				break;
			case 6:
				$link = get_month_link( substr( $m, 0, 4 ), substr( $m, 4, 2 ) );
				break;
			case 8:
				$link = get_day_link( substr( $m, 0, 4 ), substr( $m, 4, 2 ), substr( $m, 6, 2 ) );
				break;
			default:
				return false;
		}
	} elseif ( ( $wp_query->is_single || $wp_query->is_page ) && $haspost ) {
		$post = $wp_query->posts[0];
		$link = get_permalink( wpgrade::lang_post_id( $post->ID ) );
	} elseif ( $wp_query->is_author && $haspost ) {
		$author = get_userdata( get_query_var( 'author' ) );
		if ( $author === false ) {
			return false;
		}
		$link = get_author_posts_url( $author->ID, $author->user_nicename );
	} elseif ( $wp_query->is_category && $haspost ) {
		$link = get_category_link( get_query_var( 'cat' ) );
	} elseif ( $wp_query->is_tag && $haspost ) {
		$tag = get_term_by( 'slug', get_query_var( 'tag' ), 'post_tag' );
		if ( ! empty( $tag->term_id ) ) {
			$link = get_tag_link( $tag->term_id );
		}
	} elseif ( $wp_query->is_day && $haspost ) {
		$link = get_day_link( get_query_var( 'year' ), get_query_var( 'monthnum' ), get_query_var( 'day' ) );
	} elseif ( $wp_query->is_month && $haspost ) {
		$link = get_month_link( get_query_var( 'year' ), get_query_var( 'monthnum' ) );
	} elseif ( $wp_query->is_year && $haspost ) {
		$link = get_year_link( get_query_var( 'year' ) );
	} elseif ( $wp_query->is_home ) {
		if ( ( get_option( 'show_on_front' ) == 'page' ) && ( $pageid = get_option( 'page_for_posts' ) ) ) {
			$link = get_permalink( $pageid );
		} else {
			if ( function_exists( 'icl_get_home_url' ) ) {
				$link = icl_get_home_url();
			} else { // icl_get_home_url does not exist
				$link = home_url();
			}
		}
	} elseif ( $wp_query->is_tax && $haspost ) {
		$taxonomy = get_query_var( 'taxonomy' );
		$term     = get_query_var( 'term' );
		$link     = get_term_link( $term, $taxonomy );
	} elseif ( $wp_query->is_archive && function_exists( 'get_post_type_archive_link' ) && ( $post_type = get_query_var( 'post_type' ) ) ) {
		$link = get_post_type_archive_link( $post_type );
	} else {
		return false;
	}

	//let's see about the page number
	$page = get_query_var( 'page' );
	if ( empty( $page ) ) {
		$page = get_query_var( 'paged' );
	}

	if ( ! empty( $page ) && $page > 1 ) {
		$link = trailingslashit( $link ) . "page/$page";
		$link = user_trailingslashit( $link, 'paged' );
	}

	return $link;
}

/**
 * Theme activation hook
 */
function wpgrade_callback_geting_active() {

	/**
	 * Get the config from /config/activation.php
	 */
	$activation_settings = array();
	if ( file_exists( wpgrade::themepath() . 'inc/activation.php' ) ) {
		$activation_settings = include wpgrade::themepath() . 'inc/activation.php';
	}

	/**
	 * Make sure pixlikes has the right settings
	 */
	if ( isset( $activation_settings['pixlikes-settings'] ) ) {
		$pixlikes_settings = $activation_settings['pixlikes-settings'];
		update_option( 'pixlikes_settings', $pixlikes_settings );
	}


	/**
	 * Create custom post types, taxonomies and metaboxes
	 * These will be taken by pixtypes plugin and converted in their own options
	 */

	if ( isset( $activation_settings['pixtypes-settings'] ) ) {

		$pixtypes_conf_settings = $activation_settings['pixtypes-settings'];

		$types_options = get_option( 'pixtypes_themes_settings' );
		if ( empty( $types_options ) ) {
			$types_options = array();
		}

		$theme_key                   = wpgrade::shortname() . '_pixtypes_theme';
		$types_options[ $theme_key ] = $pixtypes_conf_settings;

		update_option( 'pixtypes_themes_settings', $types_options );
	}

	/**
	 * http://wordpress.stackexchange.com/questions/36152/flush-rewrite-rules-not-working-on-plugin-deactivation-invalid-urls-not-showing
	 */
	delete_option( 'rewrite_rules' );
}

add_action( 'after_switch_theme', 'wpgrade_callback_geting_active' );

// Start password protected stuff

add_action( 'wp', 'rosa_prepare_password_for_custom_post_types' );

function rosa_prepare_password_for_custom_post_types() {

	global $wpgrade_private_post;
	$wpgrade_private_post = rosa::is_password_protected();

}

if ( ! function_exists( 'rosa_callback_the_password_form' ) ) {
	function rosa_callback_the_password_form( $form ) {
		global $post;
		$post   = get_post( $post );
		$postID = wpgrade::lang_post_id( $post->ID );
		$label  = 'pwbox-' . ( empty( $postID ) ? rand() : $postID );
		$form   = '<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post">
		<p>' . __( "This post is password protected. To view it please enter your password below:", 'rosa' ) . '</p>
		<div class="row">
			<div class="column  span-12  hand-span-10">
				<input name="post_password" id="' . $label . '" type="password" size="20" placeholder="' . __( "Password", 'rosa' ) . '"/>
			</div>
			<div class="column  span-12  hand-span-2">
				<input type="submit" name="Access" value="' . esc_attr__( "Access", 'rosa' ) . '" class="btn post-password-submit"/>
			</div>
		</div>
	</form>';

		// on form submit put a wrong passwordp msg.
		if ( get_permalink() != wp_get_referer() ) {
			return $form;
		}

		// No cookie, the user has not sent anything until now.
		if ( ! isset ( $_COOKIE[ 'wp-postpass_' . COOKIEHASH ] ) ) {
			return $form;
		}

		require_once ABSPATH . 'wp-includes/class-phpass.php';
		$hasher = new PasswordHash( 8, true );

		$hash = wp_unslash( $_COOKIE[ 'wp-postpass_' . COOKIEHASH ] );
		if ( 0 !== strpos( $hash, '$P$B' ) ) {
			return $form;
		}

		if ( ! $hasher->CheckPassword( $post->post_password, $hash ) ) {

			// We have a cookie, but it does not match the password.
			$msg  = '<span class="wrong-password-message">' . __( 'Sorry, your password did not match', 'rosa' ) . '</span>';
			$form = $msg . $form;
		}

		return $form;

	}
	add_action( 'the_password_form', 'rosa_callback_the_password_form' );
}
// Start password protected form

if ( ! function_exists( 'rosa_add_title_caption_to_attachment' ) ) {
	/**
	 * Add title and caption back to images
	 */
	function rosa_add_title_caption_to_attachment( $markup, $id ) {
		$att     = get_post( $id );
		$title   = '';
		$caption = '';
		if ( ! empty( $att->post_title ) ) {
			$title = $att->post_title;
		}
		if ( ! empty( $att->post_excerpt ) ) {
			$caption = $att->post_excerpt;
		}

		return str_replace( '<a ', '<a data-title="' . $title . '" data-alt="' . $caption . '" ', $markup );
	}

	add_filter( 'wp_get_attachment_link', 'rosa_add_title_caption_to_attachment', 10, 5 );
}

//use different image sizes depending on the number of columns
function rosa_overwrite_gallery_atts( $out, $pairs, $atts ) {

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
add_filter( 'shortcode_atts_gallery', 'rosa_overwrite_gallery_atts', 10, 3 );

/*
 * Add custom filter for gallery shortcode output
 */
function rosa_custom_post_gallery( $output, $attr ) {
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
				     data-imagescale="none"
				     data-slidertransition="fade"
				     data-autoheight
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
		$instance = $instance + 1;

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
add_filter( 'post_gallery', 'rosa_custom_post_gallery', 10, 2 );

add_filter( 'mce_buttons', 'rosa_add_next_page_button' );
// Add "Next page" button to TinyMCE
function rosa_add_next_page_button( $mce_buttons ) {
	$pos = array_search( 'wp_more', $mce_buttons, true );
	if ( $pos !== false ) {
		$tmp_buttons   = array_slice( $mce_buttons, 0, $pos + 1 );
		$tmp_buttons[] = 'wp_page';
		$mce_buttons   = array_merge( $tmp_buttons, array_slice( $mce_buttons, $pos + 1 ) );
	}

	return $mce_buttons;
}

add_filter( 'wp_link_pages_args', 'rosa_add_next_and_number' );
// Customize the "wp_link_pages()" to be able to display both numbers and prev/next links
function rosa_add_next_and_number( $args ) {
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
function rosa_register_attachments_custom_fields() {

	//add video support for attachments
	if ( ! function_exists( 'add_video_url_field_to_attachments' ) ) {

		function add_video_url_field_to_attachments( $form_fields, $post ) {
			if ( ! isset( $form_fields["video_url"] ) ) {
				$form_fields["video_url"] = array(
					"label" => __( "Video URL", 'rosa' ),
					"input" => "text", // this is default if "input" is omitted
					"value" => esc_url( get_post_meta( $post->ID, "_video_url", true ) ),
					"helps" => __( "<p class='desc'>Attach a video to this image <span class='small'>(YouTube or Vimeo)</span>.</p>", 'rosa' ),
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
					"label" => __( "Video  Autoplay", 'rosa' ),
					"input" => "html",
					"html"  => '<input' . $checked . ' type="checkbox" name="attachments[' . $post->ID . '][video_autoplay]" id="attachments[' . $post->ID . '][video_autoplay]" /><label for="attachments[' . $post->ID . '][video_autoplay]">' . __( 'Enable Video Autoplay?', 'rosa' ) . '</label>'

				);
			}
			return $form_fields;
		}
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

		function add_image_attachment_fields_to_save( $post, $attachment ) {
			if ( isset( $attachment['video_url'] ) ) {
				update_post_meta( $post['ID'], '_video_url', esc_url( $attachment['video_url'] ) );
			}

			if ( isset( $attachment['video_autoplay'] ) ) {
				update_post_meta( $post['ID'], '_video_autoplay', 'on' );
			} else {
				update_post_meta( $post['ID'], '_video_autoplay', 'off' );
			}

			return $post;
		}
	}
}
add_action( 'init', 'rosa_register_attachments_custom_fields' );

/**
 * Load custom javascript set by theme options
 */
function rosa_callback_load_custom_js() {
	$custom_js = wpgrade::option( 'custom_js' );
	if ( ! empty( $custom_js ) ) {
		//first lets test is the js code is clean or has <script> tags and such
		//if we have <script> tags than we will not enclose it in anything - raw output
		if ( strpos( $custom_js, '</script>' ) !== false ) {
			echo $custom_js . "\n";
		} else {
			echo "<script type=\"text/javascript\">\n;(function($){\n" . $custom_js . "\n})(jQuery);\n</script>\n";
		}
	}
}
add_action( 'wp_head', 'rosa_callback_load_custom_js', 999 );

function rosa_callback_load_custom_js_footer() {
	$custom_js = wpgrade::option( 'custom_js_footer' );
	if ( ! empty( $custom_js ) ) {
		//first lets test is the js code is clean or has <script> tags and such
		//if we have <script> tags than we will not enclose it in anything - raw output
		if ( strpos( $custom_js, '</script>' ) !== false ) {
			echo $custom_js . "\n";
		} else {
			echo "<script type=\"text/javascript\">\n;(function($){\n" . $custom_js . "\n})(jQuery);\n</script>\n";
		}
	}
}
add_action( 'wp_footer', 'rosa_callback_load_custom_js_footer', 999 );


/**
 * Cutting the titles and adding '...' after
 *
 * @param  [string] $text       [description]
 * @param  [int] $cut_length [description]
 * @param  [int] $limit      [description]
 *
 * @return [type]             [description]
 */
function short_text( $text, $cut_length, $limit, $echo = true ) {
	$char_count = mb_strlen( $text );
	$text       = ( $char_count > $limit ) ? mb_substr( $text, 0, $cut_length ) . wpgrade::option( 'blog_excerpt_more_text' ) : $text;
	if ( $echo ) {
		echo $text;
	} else {
		return $text;
	}
}

/**
 * Borrowed from CakePHP
 * Truncates text.
 * Cuts a string to the length of $length and replaces the last characters
 * with the ending if the text is longer than length.
 * ### Options:
 * - `ending` Will be used as Ending and appended to the trimmed string
 * - `exact` If false, $text will not be cut mid-word
 * - `html` If true, HTML tags would be handled correctly
 *
 * @param string  $text    String to truncate.
 * @param integer $length  Length of returned string, including ellipsis.
 * @param array   $options An array of html attributes and options.
 *
 * @return string Trimmed string.
 * @access public
 * @link   http://book.cakephp.org/view/1469/Text#truncate-1625
 */

function truncate( $text, $length = 100, $options = array() ) {
	$default = array(
		'ending' => '...',
		'exact'  => true,
		'html'   => false
	);
	$options = array_merge( $default, $options );
	extract( $options );

	if ( $html ) {
		if ( mb_strlen( preg_replace( '/<.*?>/', '', $text ) ) <= $length ) {
			return $text;
		}
		$totalLength = mb_strlen( strip_tags( $ending ) );
		$openTags    = array();
		$truncate    = '';

		preg_match_all( '/(<\/?([\w+]+)[^>]*>)?([^<>]*)/', $text, $tags, PREG_SET_ORDER );
		foreach ( $tags as $tag ) {
			if ( ! preg_match( '/img|br|input|hr|area|base|basefont|col|frame|isindex|link|meta|param/s', $tag[2] ) ) {
				if ( preg_match( '/<[\w]+[^>]*>/s', $tag[0] ) ) {
					array_unshift( $openTags, $tag[2] );
				} else if ( preg_match( '/<\/([\w]+)[^>]*>/s', $tag[0], $closeTag ) ) {
					$pos = array_search( $closeTag[1], $openTags );
					if ( $pos !== false ) {
						array_splice( $openTags, $pos, 1 );
					}
				}
			}
			$truncate .= $tag[1];

			$contentLength = mb_strlen( preg_replace( '/&[0-9a-z]{2,8};|&#[0-9]{1,7};|&#x[0-9a-f]{1,6};/i', ' ', $tag[3] ) );
			if ( $contentLength + $totalLength > $length ) {
				$left           = $length - $totalLength;
				$entitiesLength = 0;
				if ( preg_match_all( '/&[0-9a-z]{2,8};|&#[0-9]{1,7};|&#x[0-9a-f]{1,6};/i', $tag[3], $entities, PREG_OFFSET_CAPTURE ) ) {
					foreach ( $entities[0] as $entity ) {
						if ( $entity[1] + 1 - $entitiesLength <= $left ) {
							$left --;
							$entitiesLength += mb_strlen( $entity[0] );
						} else {
							break;
						}
					}
				}

				$truncate .= mb_substr( $tag[3], 0, $left + $entitiesLength );
				break;
			} else {
				$truncate .= $tag[3];
				$totalLength += $contentLength;
			}
			if ( $totalLength >= $length ) {
				break;
			}
		}
	} else {
		if ( mb_strlen( $text ) <= $length ) {
			return $text;
		} else {
			$truncate = mb_substr( $text, 0, $length - mb_strlen( $ending ) );
		}
	}
	if ( ! $exact ) {
		$spacepos = mb_strrpos( $truncate, ' ' );
		if ( isset( $spacepos ) ) {
			if ( $html ) {
				$bits = mb_substr( $truncate, $spacepos );
				preg_match_all( '/<\/([a-z]+)>/', $bits, $droppedTags, PREG_SET_ORDER );
				if ( ! empty( $droppedTags ) ) {
					foreach ( $droppedTags as $closingTag ) {
						if ( ! in_array( $closingTag[1], $openTags ) ) {
							array_unshift( $openTags, $closingTag[1] );
						}
					}
				}
			}
			$truncate = mb_substr( $truncate, 0, $spacepos );
		}
	}
	$truncate .= $ending;

	if ( $html ) {
		foreach ( $openTags as $tag ) {
			$truncate .= '</' . $tag . '>';
		}
	}

	return $truncate;
}

//@todo CLEANUP refactor function
function rosa_better_excerpt( $text = '' ) {
	global $post;
	$raw_excerpt = '';

	//if the post has a manual excerpt ignore the content given
	if ( $text == '' && function_exists( 'has_excerpt' ) && has_excerpt() ) {
		$text        = get_the_excerpt();
		$raw_excerpt = $text;

		$text = strip_shortcodes( $text );
		$text = apply_filters( 'the_content', $text );
		$text = str_replace( ']]>', ']]&gt;', $text );

		// Removes any JavaScript in posts (between <script> and </script> tags)
		$text = preg_replace( '@<script[^>]*?>.*?</script>@si', '', $text );

		// Enable formatting in excerpts - Add HTML tags that you want to be parsed in excerpts
		$allowed_tags = '<p><a><strong><i><br><h1><h2><h3><h4><h5><h6><blockquote><ul><li><ol>';
		$text         = strip_tags( $text, $allowed_tags );
		//		$excerpt_more = apply_filters('excerpt_more', ' ' . '[...]');
		//		$text .= $excerpt_more;

	} else {

		if ( empty( $text ) ) {
			//need to grab the content
			$text = get_the_content();
		}

		$raw_excerpt = $text;
		$text        = strip_shortcodes( $text );
		$text        = apply_filters( 'the_content', $text );
		$text        = str_replace( ']]>', ']]&gt;', $text );

		// Removes any JavaScript in posts (between <script> and </script> tags)
		$text = preg_replace('@<script[^>]*?>.*?</script>@si', '', $text);

		// Enable formatting in excerpts - Add HTML tags that you want to be parsed in excerpts
		$allowed_tags = '<p><a><em><strong><i><br><h1><h2><h3><h4><h5><h6><blockquote><ul><li><ol><iframe><embed><object><script>';
		$text         = strip_tags( $text, $allowed_tags );

		// Set custom excerpt length - number of characters to be shown in excerpts
		if ( wpgrade::option( 'blog_excerpt_length' ) ) {
			$excerpt_length = absint( wpgrade::option( 'blog_excerpt_length' ) );
		} else {
			$excerpt_length = 180;
		}

		$excerpt_more = apply_filters( 'excerpt_more', ' ' . '[...]' );

		$options = array(
			'ending' => $excerpt_more,
			'exact'  => false,
			'html'   => true
		);
		$text    = truncate( $text, $excerpt_length, $options );

	}

	// IMPORTANT! Prevents tags cutoff by excerpt (i.e. unclosed tags) from breaking formatting
	$text = force_balance_tags( $text );

	return apply_filters( 'wp_trim_excerpt', $text, $raw_excerpt );
}

/*
 * COMMENT LAYOUT
 */
function rosa_comments( $comment, $args, $depth ) {
	static $comment_number;

	if ( ! isset( $comment_number ) )
		$comment_number = $args['per_page'] * ( $args['page'] - 1 ) + 1; else {
		$comment_number ++;
	}

	$GLOBALS['comment'] = $comment; ?>
<li <?php comment_class(); ?>>
	<article id="comment-<?php echo $comment->comment_ID; ?>" class="comment-article  media">
		<?php if ( wpgrade::option( 'comments_show_numbering' ) ): ?>
			<span class="comment-number"><?php echo $comment_number ?></span>
		<?php endif; ?>
		<?php if ( wpgrade::option( 'comments_show_avatar' ) && get_comment_type( $comment->comment_ID ) == 'comment' ): ?>
			<aside class="comment__avatar  media__img">
				<!-- custom gravatar call -->
				<?php $bgauthemail = get_comment_author_email(); ?>
				<img src="http://www.gravatar.com/avatar/<?php echo md5( $bgauthemail ); ?>?s=60" class="comment__avatar-image" height="60" width="60" style="background-image: <?php echo get_template_directory_uri() . '/library/images/nothing.gif'; ?>; background-size: 100% 100%"/>
			</aside>
		<?php endif; ?>
		<div class="media__body">
			<header class="comment__meta comment-author">
				<?php printf( '<span class="comment__author-name">%s</span>', get_comment_author_link() ) ?>
				<time class="comment__time" datetime="<?php comment_time( 'c' ); ?>">
					<a href="<?php echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ) ?>" class="comment__timestamp"><?php printf( __( 'on %s at %s', 'rosa' ), get_comment_date(), get_comment_time() ); ?> </a>
				</time>
				<div class="comment__links">
					<?php
					edit_comment_link( __( 'Edit', 'rosa' ), '  ', '' );
					comment_reply_link( array_merge( $args, array( 'depth'     => $depth,
					                                               'max_depth' => $args['max_depth']
					) ) );
					?>
				</div>
			</header>
			<!-- .comment-meta -->
			<?php if ( $comment->comment_approved == '0' ) : ?>
				<div class="alert info">
					<p><?php _e( 'Your comment is awaiting moderation.', 'rosa' ) ?></p>
				</div>
			<?php endif; ?>
			<section class="comment__content comment">
				<?php comment_text() ?>
			</section>
		</div>
	</article>
	<!-- </li> is added by WordPress automatically -->
	<?php
} // don't remove this bracket!

/**
 * Replace the [...] wordpress puts in when using the the_excerpt() method.
 */
function new_excerpt_more( $excerpt ) {
	return wpgrade::option( 'blog_excerpt_more_text' );
}

add_filter( 'excerpt_more', 'new_excerpt_more' );

function remove_more_link_scroll( $link ) {
	$link = preg_replace( '|#more-[0-9]+|', '', $link );

	return $link;
}

add_filter( 'the_content_more_link', 'remove_more_link_scroll' );

//fix the canonical url of YOAST because on the front page it ignores the pagination
add_filter( 'wpseo_canonical', 'rosa_get_current_canonical_url' );
//fix the canonical url of AIOSEOP because on the front page it breaks the pagination
add_filter( 'aioseop_canonical_url', 'rosa_get_current_canonical_url' );

/**
 * Filter the page title so that plugins can unhook this

 */
function rosa_wp_title( $title, $sep ) {

	global $paged, $page;

	if ( is_feed() )
		return $title;

	// Add the site name.
	$title .= get_bloginfo( 'name' );

	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		$title = "$title $sep $site_description";

	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 )
		$title = "$title $sep " . sprintf( __( 'Page %s', 'rosa' ), max( $paged, $page ) );

	return $title;
}

add_filter( 'wp_title', 'rosa_wp_title', 10, 2 );

function rosa_fix_yoast_page_number( $title ) {

	global $paged, $page, $sep;

	if ( is_home() || is_front_page() ) {
		// Add a page number if necessary.
		if ( $paged >= 2 || $page >= 2 )
			$title = "$title $sep " . sprintf( __( 'Page %s', 'rosa' ), max( $paged, $page ) );
	}

	return $title;
}

//filter the YOAST title so we can correct the page number missing on frontpage
add_filter( 'wpseo_title', 'rosa_fix_yoast_page_number' );

//get the first image in a gallery or portfolio
function rosa_get_first_gallery_image_src( $post_ID, $image_size ) {

	$gallery_ids = array();

	if ( ! empty( $gallery_ids[0] ) ) {
		return wp_get_attachment_image_src( $gallery_ids[0], $image_size );
	} else {
		return null;
	}
}

//fix the sticky posts logic by preventing them to appear again
function rosa_pre_get_posts_sticky_posts( $query ) {

	// Do nothing if not home or not main query.
	if ( ! $query->is_home() || ! $query->is_main_query() ) {
		return;
	}

	$page_on_front = get_option( 'page_on_front' );

	// Do nothing if the blog page is not the front page
	if ( ! empty( $page_on_front ) ) {
		return;
	}

	$sticky = get_option( 'sticky_posts' );

	// Do nothing if no sticky posts
	if ( empty( $sticky ) ) {
		return;
	}

	// We need to respect post ids already in the blacklist of hell
	$post__not_in = $query->get( 'post__not_in' );

	if ( ! empty( $post__not_in ) ) {
		$sticky = array_merge( (array) $post__not_in, $sticky );
		$sticky = array_unique( $sticky );
	}

	$query->set( 'post__not_in', $sticky );

}

add_action( 'pre_get_posts', 'rosa_pre_get_posts_sticky_posts' );

/**
 * Extend the default WordPress post classes.
 *
 * @since Rosa 1.5.6
 *
 * @param array $classes A list of existing post class values.
 * @return array The filtered post class list.
 */
function rosa_post_classes( $classes ) {
	//only add this class for regular pages
	if ( get_page_template_slug( get_the_ID() ) == '' ) {
		$subtitle = trim( get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_subtitle', true ) );
		$title = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_title', true );
		$description = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_description', true );

		if ( ! ( has_post_thumbnail() || ! empty( $subtitle ) || $title !== ' ' || ! empty( $description ) ) ) {
			$classes[] = 'no-page-header';
		}
	}

	return $classes;
}
add_filter( 'post_class', 'rosa_post_classes' );


/**
 * Subpages edit links in the admin bar in the frontend (top parent page view)
 *
 * @TODO move this inside a plugin
 *
 * @param WP_Admin_Bar $wp_admin_bar
 */
function rosa_subpages_admin_bar_edit_links_frontend( $wp_admin_bar ) {
	global $post;

	//we are only interested in pages, not posts or something else
	if ( is_page() ) {
		//we assume this is the king of all pages
		$top_level_page_ID = $post->ID;

		//what if this is a child page of some group?
		//well we will start from it's parent, just like we do in the actual content
		if ( ! empty( $post->post_parent ) ) {
			$top_level_page_ID = $post->post_parent;
		}

		$top_level_page = get_post( $top_level_page_ID );
		if ( ! empty( $top_level_page ) ) {

			$kids = get_children(
				array(
					'post_parent' => $top_level_page->ID,
					'orderby'     => 'menu_order title',
					//this is the exact ordering used on the All Pages page - order included
					'order'       => 'ASC',
					'post_type'   => 'page',
				)
			);

			//so we have children - this means this is a top parent page
			if ( ! empty( $kids ) ) {
				//so we are on a page that has children

				//first we replace the default "Edit Page" admin bar item with "Edit pages"
				$wp_admin_bar->add_node( array(
					'id'    => 'edit', //by passing the same ID, WordPress will do a merge
					'title' => esc_html__( 'Edit Pages', 'rosa' ),
					'href'  => get_edit_post_link( $top_level_page->ID ),
				) );

				//add the parent edit once more for clarity
				$wp_admin_bar->add_node( array(
					'parent' => 'edit',
					'id'     => 'edit_' . $top_level_page->post_name,
					'title'  => sprintf( esc_html__( 'Parent: %s', 'rosa' ), trim( strip_tags( $top_level_page->post_title ) ) ),
					'href'   => get_edit_post_link( $top_level_page->ID ),
					'meta'   => array( 'class' => 'edit_parent_link' )
				) );

				foreach ( $kids as $kid ) {
					$kid_args = array(
						'parent' => 'edit',
						'id'     => 'edit_child_' . $kid->post_name,
						'title'  => sprintf( esc_html__( 'Child: %s', 'rosa' ), trim( strip_tags( $kid->post_title ) ) ),
						'href'   => get_edit_post_link( $kid->ID ),
						'meta'   => array( 'class' => 'edit_child_link' )
					);

					if ( $post->ID == $kid->ID ) {
						//this is the current page
						$kid_args['meta']['class'] .= ' current_page';
					}

					$wp_admin_bar->add_node( $kid_args );

					//let's do one more effort and go one level deeper
					$subkids = get_children(
						array(
							'post_parent' => $kid->ID,
							'orderby'     => 'menu_order title',
							//this is the exact ordering used on the All Pages page - order included
							'order'       => 'ASC',
							'post_type'   => 'page',
						)
					);

					if ( ! empty( $subkids ) ) {
						foreach ( $subkids as $subkid ) {
							$subkid_args = array(
								'parent' => 'edit_child_' . $kid->post_name,
								'id'     => 'edit_subchild_' . $subkid->post_name,
								'title'  => trim( strip_tags( $subkid->post_title ) ),
								'href'   => get_edit_post_link( $subkid->ID ),
								'meta'   => array( 'class' => 'edit_child_link edit_subchild_link' )
							);

							if ( $post->ID == $subkid->ID ) {
								//this is the current page
								$kid_args['meta']['class'] .= ' current_page';
							}

							$wp_admin_bar->add_node( $subkid_args );
						}
					}
				}
			}
		}
	}
}

add_action( 'admin_bar_menu', 'rosa_subpages_admin_bar_edit_links_frontend', 999 );