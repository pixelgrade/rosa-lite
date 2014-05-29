<?php

/**
 * Get the image for the google+ and facebook
 */
function wpgrade_get_socialimage() {
	global $post;
	if ( ! empty( $post ) ) {
		$src = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), '', '' );

		//we use the featured-classic image id defined
		if ( has_post_thumbnail( $post->ID ) ) {
			$socialimg = $src[0];
		} elseif ( is_front_page() && wpgrade::option_image_src( 'main_logo' ) ) {
			//if this is the front page we get the logo if no featured-classic image is assigned
			$socialimg = wpgrade::option_image_src( 'main_logo' );

		} else {
			// ! has_post_thumbnail and no front page
			$socialimg = '';
			preg_match_all( '/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches );
			if ( array_key_exists( 1, $matches ) && array_key_exists( 0, $matches[1] ) ) {
				$socialimg = $matches [1] [0];
			}
		}

		if ( empty( $socialimg ) ) {
			if ( is_attachment() ) {
				$temp      = wp_get_attachment_image_src( $post->ID, "full" );
				$socialimg = $temp[0];
			} else { // ! is_attachement
				// try to get the first attached image
				$files = get_children( 'post_parent=' . $post->ID . '&post_type=attachment&post_mime_type=image&order=desc' );

				if ( $files ) {
					$keys        = array_reverse( array_keys( $files ) );
					$j           = 0;
					$num         = $keys[ $j ];
					$image       = wp_get_attachment_image( $num, 'full', true );
					$imagepieces = explode( '"', $image );
					$imagepath   = $imagepieces[1];
					$socialimg   = wp_get_attachment_url( $num );
				} else { // ! $files (use a default image)
					// check if we have one uploaded in the theme options
					if ( wpgrade::option_image_src( 'social_share_default_image' ) ) {
						$socialimg = wpgrade::option_image_src( 'social_share_default_image' );
					} else { // ! social_share_default_image (use the default thumb gif)
						$socialimg = wpgrade::uri( '/assets/images/nothumb.png' );
					}
				}
			}
		}

		return $socialimg;
	} else { // empty $post
		return '';
	}
}

/**
 * General SEO
 */
function wpgrade_callback_general_seo() {
	include wpgrade::themefilepath( 'inc/assets/social-and-seo/general-seo' . EXT );
}

/**
 * Facebook share correct image fix (thanks to yoast).
 */
function wpgrade_callback_facebook_opengraph() {
	include wpgrade::themefilepath( 'inc/assets/social-and-seo/facebook-opengraph' . EXT );
}

/**
 * Google +1 meta info.
 */
function wpgrade_callback_google_metas() {
	include wpgrade::themefilepath( 'inc/assets/social-and-seo/google-plus-one' . EXT );
}

/**
 * Twitter card meta info
 */
function wpgrade_callback_twitter_card() {
	include wpgrade::themefilepath( 'inc/assets/social-and-seo/twitter-card-tags' . EXT );
}

function load_social_share() {
	if ( wpgrade::option( 'prepare_for_social_share' ) ) {
		add_action( 'wp_head', 'wpgrade_callback_general_seo' );
		add_action( 'wp_head', 'wpgrade_callback_facebook_opengraph' );
		add_action( 'wp_head', 'wpgrade_callback_google_metas' );
		add_action( 'wp_head', 'wpgrade_callback_twitter_card' );
	}
}

add_action( 'init', 'load_social_share', 5 );

/**
 * Adding the rel=me thanks to yoast.
 */
function wpgrade_callback_yoast_allow_rel() {
	global $allowedtags;
	$allowedtags['a']['rel'] = array();
}

add_action( 'wp_loaded', 'wpgrade_callback_yoast_allow_rel' );

/**
 * Adding facebook, twitter, & google+ links to the user profile
 */
function wpgrade_callback_add_user_fields( $contactmethods ) {
	$contactmethods['user_fb']        = 'Facebook';
	$contactmethods['user_tw']        = 'Twitter';
	$contactmethods['google_profile'] = 'Google Profile URL';

	return $contactmethods;
}

add_filter( 'user_contactmethods', 'wpgrade_callback_add_user_fields', 10, 1 );
