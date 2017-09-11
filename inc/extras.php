<?php
/**
 * Custom functions that act independently of the theme templates.
 * Eventually, some of the functionality here could be replaced by core features.
 * @package Rosa
 */

/**
 * The following code is inspired by Yoast SEO.
 */
function rosa_get_current_canonical_url() {
	global $wp_query;

	$link = false;

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
		$link = get_permalink( $post->ID );
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
	if ( file_exists( get_template_directory() . '/inc/activation.php' ) ) {
		$activation_settings = include get_template_directory() . '/inc/activation.php';
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

		$theme_key                   = 'rosa_pixtypes_theme';
		$types_options[ $theme_key ] = $pixtypes_conf_settings;

		update_option( 'pixtypes_themes_settings', $types_options );
	}

	/**
	 * http://wordpress.stackexchange.com/questions/36152/flush-rewrite-rules-not-working-on-plugin-deactivation-invalid-urls-not-showing
	 */
	delete_option( 'rewrite_rules' );
}
add_action( 'after_switch_theme', 'wpgrade_callback_geting_active', 99999 );

// Start password protected stuff
function rosa_prepare_password_for_custom_post_types() {

	global $wpgrade_private_post;
	$wpgrade_private_post = rosa_is_password_protected();
}
add_action( 'wp', 'rosa_prepare_password_for_custom_post_types' );

/**
 * Checks if a post type object needs password aproval
 * @return array If the form was submited it returns an array with the success status and a message
 */
function rosa_is_password_protected() {
	global $post;
	$private_post = array( 'allowed' => false, 'error' => '' );

	if ( isset( $_POST['submit_password'] ) ) { // when we have a submision check the password and its submision
		if ( isset( $_POST['submit_password_nonce'] ) && wp_verify_nonce( $_POST['submit_password_nonce'], 'password_protection' ) ) {
			if ( isset ( $_POST['post_password'] ) && ! empty( $_POST['post_password'] ) ) { // some simple checks on password
				// finally test if the password submitted is correct
				if ( $post->post_password === $_POST['post_password'] ) {
					$private_post['allowed'] = true;

					// ok if we have a correct password we should inform wordpress too
					// otherwise the mad dog will put the password form again in the_content() and other filters
					global $wp_hasher;
					if ( empty( $wp_hasher ) ) {
						require_once( ABSPATH . 'wp-includes/class-phpass.php' );
						$wp_hasher = new PasswordHash( 8, true );
					}
					setcookie( 'wp-postpass_' . COOKIEHASH, $wp_hasher->HashPassword( stripslashes( $_POST['post_password'] ) ), 0, COOKIEPATH );

				} else {
					$private_post['error'] = '<h4 class="text--error">' . esc_html__( 'Wrong Password', 'rosa' ) . '</h4>';
				}
			}
		}
	}

	if ( isset( $_COOKIE[ 'wp-postpass_' . COOKIEHASH ] ) && get_permalink() == wp_get_referer() ) {
		$private_post['error'] = '<h4 class="text--error">' . esc_html__( 'Wrong Password', 'rosa' ) . '</h4>';
	}

	return $private_post;
}

if ( ! function_exists( 'rosa_callback_the_password_form' ) ) {
	function rosa_callback_the_password_form( $form ) {
		global $post;
		$post   = get_post( $post );
		$postID = $post->ID;
		$label  = 'pwbox-' . ( empty( $postID ) ? rand() : $postID );
		$form   = '<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post">
		<p>' . __( "This post is password protected. To view it please enter your password below:", 'rosa' ) . '</p>
		<div class="row">
			<div class="column  span-12  hand-span-10">
				<input name="post_password" id="' . $label . '" type="password" size="20" placeholder="' . esc_html__( "Password", 'rosa' ) . '"/>
			</div>
			<div class="column  span-12  hand-span-2">
				<input type="submit" name="' . esc_attr__( "Access", 'rosa' ) . '" value="' . esc_attr__( "Access", 'rosa' ) . '" class="btn post-password-submit"/>
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
			$msg  = '<span class="wrong-password-message">' . esc_html__( 'Sorry, your password did not match', 'rosa' ) . '</span>';
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

if ( ! function_exists( 'rosa_callback_addthis' ) ) {

	function rosa_callback_addthis() {
		//lets determine if we need the addthis script at all
		if ( is_single() && pixelgrade_option( 'blog_single_show_share_links' ) ):
			wp_enqueue_script( 'addthis-api' );

			//here we will configure the AddThis sharing globally
			global $post;
			if ( empty( $post ) ) {
				return;
			} ?>
			<script type="text/javascript">
				addthis_config = {
					<?php if ( pixelgrade_option( 'share_buttons_enable_tracking' ) && pixelgrade_option( 'share_buttons_enable_addthis_tracking' ) ):
					echo 'username : "' . pixelgrade_option( 'share_buttons_addthis_username' ) . '",';
				endif; ?>
					ui_click: false,
					ui_delay: 100,
					ui_offset_top: 42,
					ui_use_css: true,
					data_track_addressbar: false,
					data_track_clickback: false
					<?php if ( pixelgrade_option( 'share_buttons_enable_tracking' ) && pixelgrade_option( 'share_buttons_enable_ga_tracking' ) ):
					echo ', data_ga_property: "' . pixelgrade_option( 'share_buttons_ga_id' ) . '"';
					if ( pixelgrade_option( 'share_buttons_enable_ga_social_tracking' ) ):
						echo ', data_ga_social : true';
					endif;
				endif; ?>
				};

				addthis_share = {
					url: "<?php echo rosa_get_current_canonical_url(); ?>",
					title: "<?php wp_title( '|', true, 'right' ); ?>",
					description: "<?php echo trim( strip_tags( get_the_excerpt() ) ) ?>"
				};
			</script>
			<?php
		endif;
	}
}
add_action( 'wp_enqueue_scripts', 'rosa_callback_addthis' );

//use different image sizes depending on the number of columns
function rosa_overwrite_gallery_atts( $out, $pairs, $atts ) {

	//if we need to make a slideshow then output full size images
	if ( isset( $atts['mkslideshow'] ) && $atts['mkslideshow'] == true ) {
		$out['size'] = 'full-size';
	} elseif ( isset( $atts['columns'] ) && ( ! isset( $atts['size'] ) || 'thumbnail' === $atts['size'] ) ) { //else try and use a decent size image if the user has left the default image size (i.e. thumbnail)
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
* We would like to GetToKnowYourWorkBetter
*
* Invoked by rosa_callback_themesetup
*/
function rosa_callback_gtkywb() {
	$themedata = wpgrade::themedata();

	$response = wp_remote_post( REQUEST_PROTOCOL . '//pixelgrade.com/stats', array(
		'method' => 'POST',
		'body'   => array(
			'send_stats'    => true,
			'theme_name'    => 'rosa',
			'theme_version' => $themedata->get( 'Version' ),
			'domain'        => $_SERVER['HTTP_HOST'],
			'permalink'     => get_permalink( 1 ),
			'is_child'      => is_child_theme(),
		)
	) );
}

// some info
add_action( 'after_switch_theme', 'rosa_callback_gtkywb' );

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
		 * @since 2.5.0
		 *
		 * @param string $gallery_style Default gallery shortcode CSS styles.
		 * @param string $gallery_div   Opening HTML div container for the gallery shortcode output.
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
			if ( ! $html5 && $columns > 0 && ++ $i % $columns == 0 ) {
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
	$custom_js = pixelgrade_option( 'custom_js' );
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
	$custom_js = pixelgrade_option( 'custom_js_footer' );
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
	$text       = ( $char_count > $limit ) ? mb_substr( $text, 0, $cut_length ) . pixelgrade_option( 'blog_excerpt_more_text' ) : $text;
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
		$text = preg_replace( '@<script[^>]*?>.*?</script>@si', '', $text );

		// Enable formatting in excerpts - Add HTML tags that you want to be parsed in excerpts
		$allowed_tags = '<p><a><em><strong><i><br><h1><h2><h3><h4><h5><h6><blockquote><ul><li><ol><iframe><embed><object><script>';
		$text         = strip_tags( $text, $allowed_tags );

		// Set custom excerpt length - number of characters to be shown in excerpts
		if ( pixelgrade_option( 'blog_excerpt_length' ) ) {
			$excerpt_length = absint( pixelgrade_option( 'blog_excerpt_length' ) );
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

/**
 * Replace the [...] wordpress puts in when using the the_excerpt() method.
 */
function new_excerpt_more( $excerpt ) {
	return pixelgrade_option( 'blog_excerpt_more_text' );
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

	if ( is_feed() ) {
		return $title;
	}

	// Add the site name.
	$title .= get_bloginfo( 'name' );

	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) ) {
		$title = "$title $sep $site_description";
	}

	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 ) {
		$title = "$title $sep " . sprintf( __( 'Page %s', 'rosa' ), max( $paged, $page ) );
	}

	return $title;
}

add_filter( 'wp_title', 'rosa_wp_title', 10, 2 );

function rosa_fix_yoast_page_number( $title ) {

	global $paged, $page, $sep;

	if ( is_home() || is_front_page() ) {
		// Add a page number if necessary.
		if ( $paged >= 2 || $page >= 2 ) {
			$title = "$title $sep " . sprintf( __( 'Page %s', 'rosa' ), max( $paged, $page ) );
		}
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
 * @since Rosa 1.5.6
 *
 * @param array $classes A list of existing post class values.
 *
 * @return array The filtered post class list.
 */
function rosa_post_classes( $classes ) {
	//only add this class for regular pages
	if ( get_page_template_slug( get_the_ID() ) == '' ) {
		$subtitle    = trim( get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_cover_subtitle', true ) );
		$title       = get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_cover_title', true );
		$description = get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_cover_description', true );

		if ( ! ( has_post_thumbnail() || ! empty( $subtitle ) || $title !== ' ' || ! empty( $description ) ) ) {
			$classes[] = 'no-page-header';
		}
	}

	return $classes;
}

add_filter( 'post_class', 'rosa_post_classes' );


/**
 * Subpages edit links in the admin bar in the frontend (top parent page view)
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

			$kids = get_children( array(
					'post_parent' => $top_level_page->ID,
					'orderby'     => 'menu_order title',
					//this is the exact ordering used on the All Pages page - order included
					'order'       => 'ASC',
					'post_type'   => 'page',
				) );

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
					$subkids = get_children( array(
							'post_parent' => $kid->ID,
							'orderby'     => 'menu_order title',
							//this is the exact ordering used on the All Pages page - order included
							'order'       => 'ASC',
							'post_type'   => 'page',
						) );

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

/**
 * Echo author page link
 * @return bool|string
 */
function rosa_the_author_posts_link() {
	global $authordata;
	if ( ! is_object( $authordata ) ) {
		return false;
	}
	$link = sprintf( '<a href="%1$s" title="%2$s">%3$s</a>', esc_url( get_author_posts_url( $authordata->ID, $authordata->user_nicename ) ), esc_attr( sprintf( __( 'Posts by %s', 'rosa' ), get_the_author() ) ), get_the_author() );

	/**
	 * Filter the link to the author page of the author of the current post.
	 * @since 2.9.0
	 *
	 * @param string $link HTML link.
	 */
	echo apply_filters( 'the_author_posts_link', $link );
}

function rosa_page_has_children() {
	global $post;

	$pages = get_pages( 'child_of=' . $post->ID );

	return count( $pages );
}
if ( ! function_exists( 'rosa_option') ) {
	function rosa_option( $option, $default = null ) {
		_deprecated_function( 'rosa_option', '2.2.5', 'pixelgrade_option' );
		return pixelgrade_option( $option, $default );
	}
}

// This function should come from Customify, but we need to do our best to make things happen
if ( ! function_exists( 'pixelgrade_option') ) {
	/**
	 * Get option from the database
	 *
	 * @param string $option The option name.
	 * @param mixed $default Optional. The default value to return when the option was not found or saved.
	 * @param bool $force_default Optional. When true, we will use the $default value provided for when the option was not saved at least once.
	 *                          When false, we will let the option's default set value (in the Customify settings) kick in first, than our $default.
	 *                          It basically, reverses the order of fallback, first the option's default, then our own.
	 *                          This is ignored when $default is null.
	 *
	 * @return mixed
	 */
	function pixelgrade_option( $option, $default = null, $force_default = true ) {
		/** @var PixCustomifyPlugin $pixcustomify_plugin */
		global $pixcustomify_plugin;

		if ( $pixcustomify_plugin !== null ) {
			// if there is a customify value get it here

			// First we see if we are not supposed to force over the option's default value
			if ( $default !== null && $force_default == false ) {
				// We will not pass the default here so Customify will fallback on the option's default value, if set
				$customify_value = $pixcustomify_plugin->get_option( $option );

				// We only fallback on the $default if none was given from Customify
				if ( $customify_value == null ) {
					return $default;
				}
			} else {
				$customify_value = $pixcustomify_plugin->get_option( $option, $default );
			}

			return $customify_value;
		}

		return $default;
	}
}


/**
 * Get the image src attribute.
 * Target should be a valid option accessible via WPGradeOptions interface.
 * @return string|false
 */
function rosa_image_src( $target, $size = null ) {
	if ( isset( $_GET[ $target ] ) && ! empty( $target ) ) {
		return rosa_get_attachment_image( $_GET[ $target ], $size );
	} else { // empty target, or no query
		$image = pixelgrade_option( $target );
		if ( is_numeric( $image ) ) {
			return rosa_get_attachment_image( $image, $size );
		}
	}

	return false;
}

/**
 * Filter content
 * Filters may be disabled by setting priority to false or null.
 * @return string $content after being filtered
 */
function rosa_display_content( $content, $filtergroup ) {
	// since we cannot apply "the_content" filter on some content blocks
	// we should apply at least these bellow
	$wptexturize     = apply_filters( 'wptexturize', $content );
	$convert_smilies = apply_filters( 'convert_smilies', $wptexturize );
	$convert_chars   = apply_filters( 'convert_chars', $convert_smilies );
	$content         = wpautop( $convert_chars );

	// including Wordpress plugin.php for is_plugin_active function
	include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

	if ( is_plugin_active( 'pixcodes/pixcodes.php' ) ) {
		$content = wpgrade_remove_spaces_around_shortcodes( $content );
	}

	$content = apply_filters( 'prepend_attachment', $content );

	return do_shortcode( $content );
}


function rosa_get_attachment_image( $id, $size = null ) {

	if ( empty( $id ) || ! is_numeric( $id ) ) {
		return false;
	}

	$array = wp_get_attachment_image_src( $id, $size );

	if ( isset( $array[0] ) ) {
		return $array[0];
	}

	return false;
}

/*=========== SANITIZE UPLOADED FILE NAMES ==========*/

add_filter( 'sanitize_file_name', 'rosa_sanitize_file_name', 10 );

/**
 * Clean up uploaded file names
 * @author toscho
 * @url    https://github.com/toscho/Germanix-WordPress-Plugin
 */
function rosa_sanitize_file_name( $filename ) {
	$filename = html_entity_decode( $filename, ENT_QUOTES, 'utf-8' );
	$filename = rosa_translit( $filename );
	$filename = rosa_lower_ascii( $filename );
	$filename = rosa_remove_doubles( $filename );

	return $filename;
}

function rosa_lower_ascii( $str ) {
	$str   = strtolower( $str );
	$regex = array(
		'pattern'     => '~([^a-z\d_.-])~',
		'replacement' => ''
	);
	// Leave underscores, otherwise the taxonomy tag cloud in the
	// backend won’t work anymore.
	return preg_replace( $regex['pattern'], $regex['replacement'], $str );
}

/**
 * Reduces repeated meta characters (-=+.) to one.
 */
function rosa_remove_doubles( $str ) {
	$regex = apply_filters( 'germanix_remove_doubles_regex', array(
		'pattern'     => '~([=+.-])\\1+~',
		'replacement' => "\\1"
	) );

	return preg_replace( $regex['pattern'], $regex['replacement'], $str );
}

/**
 * Replaces non ASCII chars.
 */
function rosa_translit( $str ) {
	$utf8 = array(
		'Ä'  => 'Ae',
		'ä'  => 'ae',
		'Æ'  => 'Ae',
		'æ'  => 'ae',
		'À'  => 'A',
		'à'  => 'a',
		'Á'  => 'A',
		'á'  => 'a',
		'Â'  => 'A',
		'â'  => 'a',
		'Ã'  => 'A',
		'ã'  => 'a',
		'Å'  => 'A',
		'å'  => 'a',
		'ª'  => 'a',
		'ₐ'  => 'a',
		'ā'  => 'a',
		'Ć'  => 'C',
		'ć'  => 'c',
		'Ç'  => 'C',
		'ç'  => 'c',
		'Ð'  => 'D',
		'đ'  => 'd',
		'È'  => 'E',
		'è'  => 'e',
		'É'  => 'E',
		'é'  => 'e',
		'Ê'  => 'E',
		'ê'  => 'e',
		'Ë'  => 'E',
		'ë'  => 'e',
		'ₑ'  => 'e',
		'ƒ'  => 'f',
		'ğ'  => 'g',
		'Ğ'  => 'G',
		'Ì'  => 'I',
		'ì'  => 'i',
		'Í'  => 'I',
		'í'  => 'i',
		'Î'  => 'I',
		'î'  => 'i',
		'Ï'  => 'Ii',
		'ï'  => 'ii',
		'ī'  => 'i',
		'ı'  => 'i',
		'I'  => 'I' // turkish, correct?
	,
		'Ñ'  => 'N',
		'ñ'  => 'n',
		'ⁿ'  => 'n',
		'Ò'  => 'O',
		'ò'  => 'o',
		'Ó'  => 'O',
		'ó'  => 'o',
		'Ô'  => 'O',
		'ô'  => 'o',
		'Õ'  => 'O',
		'õ'  => 'o',
		'Ø'  => 'O',
		'ø'  => 'o',
		'ₒ'  => 'o',
		'Ö'  => 'Oe',
		'ö'  => 'oe',
		'Œ'  => 'Oe',
		'œ'  => 'oe',
		'ß'  => 'ss',
		'Š'  => 'S',
		'š'  => 's',
		'ş'  => 's',
		'Ş'  => 'S',
		'™'  => 'TM',
		'Ù'  => 'U',
		'ù'  => 'u',
		'Ú'  => 'U',
		'ú'  => 'u',
		'Û'  => 'U',
		'û'  => 'u',
		'Ü'  => 'Ue',
		'ü'  => 'ue',
		'Ý'  => 'Y',
		'ý'  => 'y',
		'ÿ'  => 'y',
		'Ž'  => 'Z',
		'ž'  => 'z' // misc
	,
		'¢'  => 'Cent',
		'€'  => 'Euro',
		'‰'  => 'promille',
		'№'  => 'Nr',
		'$'  => 'Dollar',
		'℃'  => 'Grad Celsius',
		'°C' => 'Grad Celsius',
		'℉'  => 'Grad Fahrenheit',
		'°F' => 'Grad Fahrenheit' // Superscripts
	,
		'⁰'  => '0',
		'¹'  => '1',
		'²'  => '2',
		'³'  => '3',
		'⁴'  => '4',
		'⁵'  => '5',
		'⁶'  => '6',
		'⁷'  => '7',
		'⁸'  => '8',
		'⁹'  => '9' // Subscripts
	,
		'₀'  => '0',
		'₁'  => '1',
		'₂'  => '2',
		'₃'  => '3',
		'₄'  => '4',
		'₅'  => '5',
		'₆'  => '6',
		'₇'  => '7',
		'₈'  => '8',
		'₉'  => '9' // Operators, punctuation
	,
		'±'  => 'plusminus',
		'×'  => 'x',
		'₊'  => 'plus',
		'₌'  => '=',
		'⁼'  => '=',
		'⁻'  => '-' // sup minus
	,
		'₋'  => '-' // sub minus
	,
		'–'  => '-' // ndash
	,
		'—'  => '-' // mdash
	,
		'‑'  => '-' // non breaking hyphen
	,
		'․'  => '.' // one dot leader
	,
		'‥'  => '..' // two dot leader
	,
		'…'  => '...' // ellipsis
	,
		'‧'  => '.' // hyphenation point
	,
		' '  => '-' // nobreak space
	,
		' '  => '-' // normal space
		// Russian
	,
		'А'  => 'A',
		'Б'  => 'B',
		'В'  => 'V',
		'Г'  => 'G',
		'Д'  => 'D',
		'Е'  => 'E',
		'Ё'  => 'YO',
		'Ж'  => 'ZH',
		'З'  => 'Z',
		'И'  => 'I',
		'Й'  => 'Y',
		'К'  => 'K',
		'Л'  => 'L',
		'М'  => 'M',
		'Н'  => 'N',
		'О'  => 'O',
		'П'  => 'P',
		'Р'  => 'R',
		'С'  => 'S',
		'Т'  => 'T',
		'У'  => 'U',
		'Ф'  => 'F',
		'Х'  => 'H',
		'Ц'  => 'TS',
		'Ч'  => 'CH',
		'Ш'  => 'SH',
		'Щ'  => 'SCH',
		'Ъ'  => '',
		'Ы'  => 'YI',
		'Ь'  => '',
		'Э'  => 'E',
		'Ю'  => 'YU',
		'Я'  => 'YA',
		'а'  => 'a',
		'б'  => 'b',
		'в'  => 'v',
		'г'  => 'g',
		'д'  => 'd',
		'е'  => 'e',
		'ё'  => 'yo',
		'ж'  => 'zh',
		'з'  => 'z',
		'и'  => 'i',
		'й'  => 'y',
		'к'  => 'k',
		'л'  => 'l',
		'м'  => 'm',
		'н'  => 'n',
		'о'  => 'o',
		'п'  => 'p',
		'р'  => 'r',
		'с'  => 's',
		'т'  => 't',
		'у'  => 'u',
		'ф'  => 'f',
		'х'  => 'h',
		'ц'  => 'ts',
		'ч'  => 'ch',
		'ш'  => 'sh',
		'щ'  => 'sch',
		'ъ'  => '',
		'ы'  => 'yi',
		'ь'  => '',
		'э'  => 'e',
		'ю'  => 'yu',
		'я'  => 'ya'
	);

	$str = strtr( $str, $utf8 );

	return trim( $str, '-' );
}

/*
 * Inserts a new key/value after the key in the array.
 *
 * @param $key
 *   The key to insert after.
 * @param $array
 *   An array to insert in to.
 * @param $new_key
 *   The key to insert.
 * @param $new_value
 *   An value to insert.
 *
 * @return
 *   The new array if the key exists, FALSE otherwise.
 *
 * @see array_insert_before()
 */
function rosa_array_insert_after( $key, array &$array, $new_key, $new_value ) {
	if ( array_key_exists( $key, $array ) ) {
		$new = array();
		foreach ( $array as $k => $value ) {
			$new[ $k ] = $value;
			if ( $k === $key ) {
				$new[ $new_key ] = $new_value;
			}
		}

		return $new;
	}

	return false;
}

/*
 * Inserts a new key/value before the key in the array.
 *
 * @param $key
 *   The key to insert before.
 * @param $array
 *   An array to insert in to.
 * @param $new_key
 *   The key to insert.
 * @param $new_value
 *   An value to insert.
 *
 * @return
 *   The new array if the key exists, FALSE otherwise.
 *
 * @see array_insert_after()
 */
function rosa_array_insert_before( $key, array &$array, $new_key, $new_value ) {
	if ( array_key_exists( $key, $array ) ) {
		$new = array();
		foreach ( $array as $k => $value ) {
			if ( $k === $key ) {
				$new[ $new_key ] = $new_value;
			}
			$new[ $k ] = $value;
		}

		return $new;
	}

	return false;
}

function rosa_get_avatar_url( $email, $size = 32 ) {
	$get_avatar = get_avatar( $email, $size );

	preg_match( '/< *img[^>]*src *= *["\']?([^"\']*)/i', $get_avatar, $matches );
	if ( isset( $matches[1] ) ) {
		return $matches[1];
	} else {
		return '';
	}
}