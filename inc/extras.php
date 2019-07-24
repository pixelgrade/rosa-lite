<?php
/**
 * Custom functions that act independently of the theme templates.
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Rosa Lite
 */

/**
 * Extend the default WordPress post classes.
 *
 * @param array $classes A list of existing post class values.
 *
 * @return array The filtered post class list.
 */
function rosa_lite_post_classes( $classes ) {
	//only add this class for regular pages
	if ( get_page_template_slug( get_the_ID() ) == '' ) {
		$subtitle    = trim( get_post_meta( get_the_ID(), rosa_lite_prefix() . 'page_cover_subtitle', true ) );
		$title       = get_post_meta( get_the_ID(), rosa_lite_prefix() . 'page_cover_title', true );
		$description = get_post_meta( get_the_ID(), rosa_lite_prefix() . 'page_cover_description', true );

		if ( ! ( has_post_thumbnail() || ! empty( $subtitle ) || $title !== ' ' || ! empty( $description ) ) ) {
			$classes[] = 'no-page-header';
		}
	}

	return $classes;
}
add_filter( 'post_class', 'rosa_lite_post_classes' );

/**
 * The prefix used for post metas.
 *
 * @return string
 */
function rosa_lite_prefix() {
	return '_rosa_';
}

// Start password protected stuff
function rosa_lite_prepare_password_for_custom_post_types() {
	global $rosa_private_post;

	$rosa_private_post = rosa_lite_is_password_protected();
}
add_action( 'wp', 'rosa_lite_prepare_password_for_custom_post_types' );

/**
 * Checks if a post type object needs password aproval
 * @return array If the form was submited it returns an array with the success status and a message
 */
function rosa_lite_is_password_protected() {
	global $post;
	$private_post = array( 'allowed' => false, 'error' => '' );

	if ( isset( $_POST['submit_password'] ) ) { // when we have a submision check the password and its submision
		if ( isset( $_POST['submit_password_nonce'] ) && wp_verify_nonce( $_POST['submit_password_nonce'], 'password_protection' ) ) {
			if ( isset ( $_POST['post_password'] ) && ! empty( $_POST['post_password'] ) ) { // some simple checks on password
				// finally test if the password submitted is correct
				if ( $post->post_password === $_POST['post_password'] ) {
					$private_post['allowed'] = true;

					// ok if we have a correct password we should inform WordPress too
					// otherwise the mad dog will put the password form again in the_content() and other filters
					global $wp_hasher;
					if ( empty( $wp_hasher ) ) {
						require_once( ABSPATH . 'wp-includes/class-phpass.php' );
						$wp_hasher = new PasswordHash( 8, true );
					}
					setcookie( 'wp-postpass_' . COOKIEHASH, $wp_hasher->HashPassword( stripslashes( $_POST['post_password'] ) ), 0, COOKIEPATH );

				} else {
					$private_post['error'] = '<h4 class="text--error">' . esc_html__( 'Wrong Password', 'rosa-lite' ) . '</h4>';
				}
			}
		}
	}

	if ( isset( $_COOKIE[ 'wp-postpass_' . COOKIEHASH ] ) && get_permalink() == wp_get_referer() ) {
		$private_post['error'] = '<h4 class="text--error">' . esc_html__( 'Wrong Password', 'rosa-lite' ) . '</h4>';
	}

	return $private_post;
}

if ( ! function_exists( 'rosa_lite_callback_the_password_form' ) ) {

	function rosa_lite_callback_the_password_form( $form ) {
		global $post;
		$post   = get_post( $post );
		$postID = $post->ID;
		$label  = 'pwbox-' . ( empty( $postID ) ? rand() : $postID );
		$form   = '<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post">
		<p>' . esc_html__( 'This post is password protected. To view it please enter your password below:', 'rosa-lite' ) . '</p>
		<div class="row">
			<div class="column  span-12  hand-span-10">
				<input name="post_password" id="' . esc_attr( $label ) . '" type="password" size="20" placeholder="' . esc_attr__( 'Password', 'rosa-lite' ) . '"/>
			</div>
			<div class="column  span-12  hand-span-2">
				<input type="submit" name="' . esc_attr__( 'Access', 'rosa-lite' ) . '" value="' . esc_attr__( 'Access', 'rosa-lite' ) . '" class="btn post-password-submit"/>
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
			$msg  = '<span class="wrong-password-message">' . esc_html__( 'Sorry, your password did not match', 'rosa-lite' ) . '</span>';
			$form = $msg . $form;
		}

		return $form;

	}
	add_action( 'the_password_form', 'rosa_lite_callback_the_password_form' );
}

if ( ! function_exists( 'rosa_lite_add_title_caption_to_attachment' ) ) {
	/**
	 * Add title and caption back to images
	 */
	function rosa_lite_add_title_caption_to_attachment( $markup, $id ) {
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

	add_filter( 'wp_get_attachment_link', 'rosa_lite_add_title_caption_to_attachment', 10, 5 );
}

/**
 * Theme activation hook
 */
function rosa_lite_callback_geting_active() {

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
add_action( 'after_switch_theme', 'rosa_lite_callback_geting_active', 99999 );

/**
 * Customize the "wp_link_pages()" to be able to display both numbers and prev/next links
 *
 * @param array $args
 *
 * @return array
 */
function rosa_lite_add_next_and_number( $args ) {
	if ( 'next_and_number' === $args['next_or_number'] ) {
		global $page, $numpages, $multipage, $more;

		$args['next_or_number'] = 'number';
		$prev                   = '';
		$next                   = '';
		if ( $multipage && $more ) {
			$i = $page - 1;
			if ( $i && $more ) {
				$prev .= _wp_link_page( $i );
				$prev .= $args['link_before'] . $args['previouspagelink'] . $args['link_after'] . '</a>';
				$prev = apply_filters( 'wp_link_pages_link', $prev, 'prev' );
			}
			$i = $page + 1;
			if ( $i <= $numpages && $more ) {
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
add_filter( 'wp_link_pages_args', 'rosa_lite_add_next_and_number' );

/*
 * Add custom fields to attachments
 */
function rosa_lite_register_attachments_custom_fields() {

	// Add video support for attachments
	if ( ! function_exists( 'add_video_url_field_to_attachments' ) ) {

		function add_video_url_field_to_attachments( $form_fields, $post ) {
			if ( ! isset( $form_fields["video_url"] ) ) {
				$form_fields["video_url"] = array(
					"label" => esc_html__( 'Video URL', 'rosa-lite' ),
					"input" => "text", // this is default if "input" is omitted
					"value" => esc_url( get_post_meta( $post->ID, "_video_url", true ) ),
					"helps" => wp_kses_post( __( "<p class='desc'>Attach a video to this image <span class='small'>(YouTube or Vimeo)</span>.</p>", 'rosa-lite' ) ),
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
					"label" => esc_html__( 'Video  Autoplay', 'rosa-lite' ),
					"input" => "html",
					"html"  => '<input' . $checked . ' type="checkbox" name="attachments[' . $post->ID . '][video_autoplay]" id="attachments[' . $post->ID . '][video_autoplay]" /><label for="attachments[' . $post->ID . '][video_autoplay]">' . esc_html__( 'Enable Video Autoplay?', 'rosa-lite' ) . '</label>'

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
add_action( 'init', 'rosa_lite_register_attachments_custom_fields' );

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

function rosa_lite_truncate( $text, $length = 100, $options = array() ) {
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

function rosa_lite_better_excerpt( $text = '' ) {

	// If the post has a manual excerpt ignore the content given.
	if ( $text == '' && has_excerpt() ) {
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
		if ( pixelgrade_option( 'blog_excerpt_length', 140 ) ) {
			$excerpt_length = absint( pixelgrade_option( 'blog_excerpt_length', 140 ) );
		} else {
			$excerpt_length = 180;
		}

		$excerpt_more = apply_filters( 'excerpt_more', ' ' . '[...]' );

		$options = array(
			'ending' => $excerpt_more,
			'exact'  => false,
			'html'   => true
		);
		$text    = rosa_lite_truncate( $text, $excerpt_length, $options );

	}

	// IMPORTANT! Prevents tags cutoff by excerpt (i.e. unclosed tags) from breaking formatting
	$text = force_balance_tags( $text );

	return apply_filters( 'wp_trim_excerpt', $text, $raw_excerpt );
}

// This function should come from Customify, but we need to do our best to make things happen
if ( ! function_exists( 'pixelgrade_option') ) {
	/**
	 * Get option from the database
	 *
	 * @param string $option_id           The option name.
	 * @param mixed  $default             Optional. The default value to return when the option was not found or saved.
	 * @param bool   $force_given_default Optional. When true, we will use the $default value provided for when the option was not saved at least once.
	 *                                    When false, we will let the option's default set value (in the Customify settings) kick in first, then our $default.
	 *                                    It basically, reverses the order of fallback, first the option's default, then our own.
	 *                                    This is ignored when $default is null.
	 *
	 * @return mixed
	 */
	function pixelgrade_option( $option_id, $default = null, $force_given_default = false ) {
		if ( function_exists( 'PixCustomifyPlugin' ) ) {
			// Customify is present so we should get the value via it
			// We need to account for the case where a option has an 'active_callback' defined in it's config
			$options_config = PixCustomifyPlugin()->get_options_configs();
			if ( ! empty( $options_config ) && ! empty( $options_config[ $option_id ] ) ) {
				if ( ! empty( $options_config[ $option_id ]['active_callback'] ) ) {
					// This option has an active callback
					// We need to "question" it
					//
					// IMPORTANT NOTICE:
					//
					// Be extra careful when setting up the options to not end up in a circular logic
					// due to callbacks that get an option and that option has a callback that gets the initial option - INFINITE LOOPS :(
					if ( is_callable( $options_config[ $option_id ]['active_callback'] ) ) {
						// Now we call the function and if it returns false, this means that the control is not active
						// Hence it's saved value doesn't matter
						$active = call_user_func( $options_config[ $option_id ]['active_callback'] );
						if ( empty( $active ) ) {
							// If we need to force the default received; we respect that
							if ( true === $force_given_default && null !== $default ) {
								return $default;
							} else {
								// Else we return false
								// because we treat the case when the active callback returns false as if the option would be non-existent
								// We do not return the default configured value in this case
								return false;
							}
						}
					}
				}

				// Now that the option is truly active, we need to see if we are not supposed to force over the option's default value
				if ( $default !== null && false === $force_given_default ) {
					// We will not pass the received $default here so Customify will fallback on the option's default value, if set
					$customify_value = PixCustomifyPlugin()->get_option( $option_id );

					// We only fallback on the $default if none was given from Customify
					if ( null === $customify_value ) {
						return $default;
					}
				} else {
					$customify_value = PixCustomifyPlugin()->get_option( $option_id, $default );
				}

				return $customify_value;
			}
		}

		// We don't have Customify present, or Customify doesn't "know" about this option ID, so we need to retrieve the option value the hard way.
		$option_value = null;

		// Fire the all-gathering-filter that Customify uses so we can get as much data about this option as possible.
		$config = apply_filters( 'customify_filter_fields', array() );

		if ( ! isset( $config['opt-name'] ) ) {
			return $default;
		}

		$option_config = pixelgrade_get_option_customizer_config( $option_id, $config );
		if ( ! empty( $option_config ) && isset( $option_config['setting_type'] ) && 'option' === $option_config['setting_type'] ) {
			// We need to retrieve it from the wp_options table
			// If we have been explicitly given a setting ID we will use that
			if ( ! empty( $option_config['setting_id'] ) ) {
				$setting_id = $option_config['setting_id'];
			} else {
				$setting_id = $config['opt-name'] . '[' . $option_id . ']';
			}

			$option_value = get_option( $setting_id, null );
		} else {
			$values = get_theme_mod( $config['opt-name'] );

			if ( isset( $values[ $option_id ] ) ) {
				$option_value = $values[ $option_id ];
			}
		}

		if ( null !== $option_value ) {
			return $option_value;
		}

		if ( false === $force_given_default && isset( $option_config['default'] ) ) {
			return $option_config['default'];
		}

		return $default;
	}
}

if ( ! function_exists( 'pixelgrade_get_option_customizer_config') ) {
	/**
	 * Get the Customify configuration of a certain option.
	 *
	 * @param string $option_id
	 * @param array  $config
	 *
	 * @return array|false The option config or false on failure.
	 */
	function pixelgrade_get_option_customizer_config( $option_id, $config = array() ) {
		if ( empty( $config ) ) {
			// Fire the all-gathering-filter that Customify uses so we can get as much data about this option as possible.
			$config = apply_filters( 'customify_filter_fields', array() );
		}

		if ( empty( $config ) ) {
			return false;
		}

		// We need to search for the option configured under the given id (the array key)
		if ( isset ( $config['panels'] ) ) {
			foreach ( $config['panels'] as $panel_id => $panel_settings ) {
				if ( isset( $panel_settings['sections'] ) ) {
					foreach ( $panel_settings['sections'] as $section_id => $section_settings ) {
						if ( isset( $section_settings['options'] ) ) {
							foreach ( $section_settings['options'] as $id => $option_config ) {
								if ( $id === $option_id ) {
									return $option_config;
								}
							}
						}
					}
				}
			}
		}

		if ( isset ( $config['sections'] ) ) {
			foreach ( $config['sections'] as $section_id => $section_settings ) {
				if ( isset( $section_settings['options'] ) ) {
					foreach ( $section_settings['options'] as $id => $option_config ) {
						if ( $id === $option_id ) {
							return $option_config;
						}
					}
				}
			}
		}

		return false;
	}
}

/*
 * Inserts a new key/value after the key in the array.
 *
 * @param mixed $key The key to insert after.
 * @param array $array An array to insert in to.
 * @param mixed $new_key The key to insert.
 * @param mixed $new_value An value to insert.
 *
 * @return array|bool The new array if the key exists, FALSE otherwise.
 *
 * @see array_insert_before()
 */
function rosa_lite_array_insert_after( $key, array &$array, $new_key, $new_value ) {
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
 * @param mixed $key The key to insert before.
 * @param array $array An array to insert in to.
 * @param mixed $new_key The key to insert.
 * @param mixed $new_value An value to insert.
 *
 * @return array|bool The new array if the key exists, FALSE otherwise.
 *
 * @see array_insert_after()
 */
function rosa_lite_array_insert_before( $key, array &$array, $new_key, $new_value ) {
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

if ( ! function_exists( 'rosa_lite_comment_form_custom_fields' ) ) :
	/**
	 * Custom comment form fields.
	 *
	 * @param array $fields
	 *
	 * @return array
	 */
	function rosa_lite_comment_form_custom_fields( $fields ) {

		$commenter = wp_get_current_commenter();
		$req = get_option( 'require_name_email' );
		$aria_req = ( $req ? ' aria-required="true"' : '' );

		if ( is_user_logged_in() ) {
			$fields = array_merge( $fields, array(
				'author' => '<p class="comment-form-author"><label for="author" class="show-on-ie8">' . esc_html__( 'Name', 'rosa-lite' ) . '</label><input id="author" name="author" value="' . esc_attr( $commenter['comment_author'] ) . '" type="text" placeholder="' . esc_attr__( 'Name', 'rosa-lite' ) . '..." size="30" ' . $aria_req . ' /></p>',
				'email'  => '<p class="comment-form-email"><label for="email" class="show-on-ie8">' . esc_html__( 'Email', 'rosa-lite' ) . '</label><input id="email" name="email" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30" type="text" placeholder="' . esc_attr__( 'your@email.com', 'rosa-lite' ) . '..." ' . $aria_req . ' /></p>',
			) );
		} else {
			$fields = array_merge( $fields, array(
				'author' => '<p class="comment-form-author"><label for="author" class="show-on-ie8">' . esc_html__( 'Name', 'rosa-lite' ) . '</label><input id="author" name="author" value="' . esc_attr( $commenter['comment_author'] ) . '" type="text" placeholder="' . esc_attr__( 'Name', 'rosa-lite' ) . '..." size="30" ' . $aria_req . ' /></p><!--',
				'email'  => '--><p class="comment-form-email"><label for="name" class="show-on-ie8">' . esc_html__( 'Email', 'rosa-lite' ) . '</label><input id="email" name="email" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30" type="text" placeholder="' . esc_attr__( 'your@email.com', 'rosa-lite' ) . '..." ' . $aria_req . ' /></p><!--',
				'url'    => '--><p class="comment-form-url"><label for="url" class="show-on-ie8">' . esc_html__( 'Url', 'rosa-lite' ) . '</label><input id="url" name="url" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" placeholder="' . esc_attr__( 'Website', 'rosa-lite' ) . '..." type="text"></p>',
			) );
		}

		return $fields;
	}
endif;
add_filter('comment_form_default_fields', 'rosa_lite_comment_form_custom_fields' );

if ( ! function_exists( 'rosa_lite_google_fonts_url' ) ) {
	/**
	 * Register Google fonts for Rosa Lite.
	 *
	 * @since rosa-lite 1.0.0
	 *
	 * @return string Google fonts URL for the theme.
	 */
	function rosa_lite_google_fonts_url() {
		$fonts_url = '';
		$fonts     = array();
		$subsets   = 'latin,latin-ext';


		/* Translators: If there are characters in your language that are not
		* supported by Cabin, translate this to 'off'. Do not translate
		* into your own language.
		*/
		if ( 'off' !== _x( 'on', 'Cabin font: on or off', 'rosa-lite' ) ) {
			$fonts[] = 'Cabin:400,400i,500,500i,600,600i,700,700i';
		}
		/* Translators: If there are characters in your language that are not
		* supported by Source Sans Pro, translate this to 'off'. Do not translate
		* into your own language.
		*/
		if ( 'off' !== _x( 'on', 'Source Sans Pro font: on or off', 'rosa-lite' ) ) {
			$fonts[] = 'Source Sans Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i';
		}
		/* Translators: If there are characters in your language that are not
		* supported by Herr Von Muellerhoff, translate this to 'off'. Do not translate
		* into your own language.
		*/
		if ( 'off' !== _x( 'on', 'Herr Von Muellerhoff font: on or off', 'rosa-lite' ) ) {
			$fonts[] = 'Herr Von Muellerhoff:400';
		}

		/* translators: To add an additional character subset specific to your language, translate this to 'greek', 'cyrillic', 'devanagari' or 'vietnamese'. Do not translate into your own language. */
		$subset = esc_html_x( 'no-subset', 'Add new subset (greek, cyrillic, devanagari, vietnamese)', 'rosa-lite' );

		if ( 'cyrillic' == $subset ) {
			$subsets .= ',cyrillic,cyrillic-ext';
		} elseif ( 'greek' == $subset ) {
			$subsets .= ',greek,greek-ext';
		} elseif ( 'devanagari' == $subset ) {
			$subsets .= ',devanagari';
		} elseif ( 'vietnamese' == $subset ) {
			$subsets .= ',vietnamese';
		}

		if ( $fonts ) {
			$fonts_url = add_query_arg( array(
				'family' => rawurlencode( implode( '|', $fonts ) ),
				'subset' => rawurlencode( $subsets ),
			), '//fonts.googleapis.com/css' );
		}

		return $fonts_url;
	} #function
}

/**
 * Fix skip link focus in IE11.
 *
 * This does not enqueue the script because it is tiny and because it is only for IE11,
 * thus it does not warrant having an entire dedicated blocking script being loaded.
 *
 * @link https://git.io/vWdr2
 */
function rosa_lite_skip_link_focus_fix() {
	// The following is minified via `terser --compress --mangle -- js/skip-link-focus-fix.js`.
	?>
	<script>
		/(trident|msie)/i.test(navigator.userAgent)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",function(){var t,e=location.hash.substring(1);/^[A-z0-9_-]+$/.test(e)&&(t=document.getElementById(e))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())},!1);
	</script>
	<?php
}
// We will put this script inline since it is so small.
add_action( 'wp_print_footer_scripts', 'rosa_lite_skip_link_focus_fix' );
