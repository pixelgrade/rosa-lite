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
	if ( file_exists( wpgrade::themepath() . 'config/activation.php' ) ) {
		$activation_settings = include wpgrade::themepath() . 'config/activation.php';
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
