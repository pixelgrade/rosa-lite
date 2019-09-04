<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Rosa Lite
 */

if( ! function_exists( 'rosa_lite_the_archive_title' ) ) {

	function rosa_lite_the_archive_title() {

		$object = get_queried_object();

		if ( is_home() ) { ?>
			<h1 class="hN  archive__title">
				<?php if ( isset( $object->post_title ) ) {
					echo $object->post_title; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				} else {
					esc_html_e( 'News', 'rosa-lite' );
				} ?></h1>
			<hr class="separator"/>
			<?php
		} elseif ( is_search() ) {
			?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Search Results for: ', 'rosa-lite' ) ?></span>

				<h1 class="hN  archive__title"><?php echo get_search_query(); ?></h1>
			</div>
			<hr class="separator"/>
			<?php
		} elseif ( is_tag() ) {
			?>
			<div class="heading headin--main">
				<h1 class="archive__title"><?php echo single_tag_title( '', false ); ?></h1>
				<span class="archive__side-title beta"><?php esc_html_e( 'Tag', 'rosa-lite' ) ?></span>
			</div>
			<hr class="separator"/>
		<?php } elseif ( ! empty( $object ) && isset( $object->term_id ) ) { ?>
			<div class="heading headin--main">
				<h1 class="archive__title"><?php echo esc_html( $object->name ); ?></h1>
				<span class="archive__side-title beta"><?php esc_html_e( 'Category', 'rosa-lite' ) ?></span>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_day() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Daily Archives: ', 'rosa-lite' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date(); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_month() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Monthly Archives: ', 'rosa-lite' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date( _x( 'F Y', 'monthly archives date format', 'rosa-lite' ) ); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_year() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Yearly Archives: ', 'rosa-lite' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date( _x( 'Y', 'yearly archives date format', 'rosa-lite' ) ); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } else { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Archives', 'rosa-lite' ) ?></span>
			</div>
			<hr class="separator"/>
			<?php
		}
	}
}

if ( ! function_exists( 'rosa_lite_please_select_a_menu_fallback' ) ) {
	function rosa_lite_please_select_a_menu_fallback() {
		echo '
		<ul class="nav  nav--main sub-menu" >
			<li><a href="' . esc_url( admin_url( 'nav-menus.php?action=locations' ) ) . '">' . esc_html__( 'Please select a menu in this location', 'rosa-lite' ) . '</a></li>
		</ul>';
	}
}

if ( ! function_exists( 'rosa_display_header_down_arrow' ) ) {
	function rosa_display_header_down_arrow( $page_section_idx, $header_height ) {

		if ( $page_section_idx !== 1 || $header_height !== 'full-height' ) {
			return;
		}

		$down_arrow_style = pixelgrade_option('down_arrow_style', 'transparent' );

		echo '<div class="down-arrow down-arrow--' . esc_attr( $down_arrow_style ) . '"><div class="arrow"></div></div>' . "\n";
	}
}

if ( ! function_exists( 'rosa_lite_the_posts_navigation' ) ) {

	/**
	 * Prints the HTML of the posts navigation
	 * It will display both prev/next and page numbers (i.e « Prev 1 … 3 4 5 6 7 … 9 Next » )
	 */
	function rosa_lite_the_posts_navigation() {
		global $wp_query;

		$big = 999999999; // need an unlikely integer

		$links = paginate_links( array(
			'base'               => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format'             => '?paged=%#%',
			'current'            => max( 1, get_query_var( 'paged' ) ),
			'total'              => $wp_query->max_num_pages,
			'prev_next'          => false,
			'before_page_number' => '<span class="screen-reader-text">' . esc_html__( 'Page', 'rosa-lite' ) . ' </span>',
		) );

		$links = rosa_lite_get_prev_posts_link() . $links . rosa_lite_get_next_posts_link(); ?>

		<nav class="nav nav--banner pagination" role="navigation">
			<h2 class="screen-reader-text"><?php esc_html_e( 'Posts navigation', 'rosa-lite' ); ?></h2>
			<div class="nav-links"><?php echo $links; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
		</nav>

		<?php
	}
}

/**
 * Return the next posts page link.
 *
 * Customized version of the function in core get_next_posts_link()
 *
 * @global int      $paged
 * @global WP_Query $wp_query
 *
 * @param string $label    Content for link text.
 * @return string|void HTML-formatted next posts page link.
 */
function rosa_lite_get_next_posts_link( $label = null ) {
	global $paged, $wp_query;

	$max_page = $wp_query->max_num_pages;

	if ( ! $paged )
		$paged = 1; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited

	$nextpage = intval( $paged ) + 1;

	if ( null === $label ) {
		$label = esc_html__( 'Next', 'rosa-lite' );
	}

	if ( ! is_single() ) {
		if ( $nextpage <= $max_page ) {
			/**
			 * Filter the anchor tag attributes for the next posts page link.
			 *
			 * @since 1.0.0
			 *
			 * @param string $attributes Attributes for the anchor tag.
			 */
			$attr = apply_filters( 'next_posts_link_attributes', 'class="next page-numbers"' );

			return '<a href="' . next_posts( $max_page, false ) . '" ' . $attr . '>' . $label . '</a>';
		} else {
			// put in a disabled next link
			/**
			 * Filter the anchor tag attributes for the next posts page link.
			 *
			 * @since 1.0.0
			 *
			 * @param string $attributes Attributes for the anchor tag.
			 */
			$attr = apply_filters( 'next_posts_link_attributes', 'class="next page-numbers  disabled"' );
			return '<span ' . $attr . '>' . $label . '</span>';
		}
	}

	return '';
}

/**
 * Return the previous posts page link.
 *
 * Customized version of the function in core get_previous_posts_link()
 *
 * @since 1.0.0
 *
 * @global int      $paged
 *
 * @param string $label    Content for link text.
 * @return string|void HTML-formatted next posts page link.
 */
function rosa_lite_get_prev_posts_link( $label = null ) {
	global $paged;

	if ( null === $label ) {
		$label = esc_html__( 'Prev', 'rosa-lite' );
	}

	if ( ! is_single() ) {
		if ( $paged > 1 ) {
			/**
			 * Filter the anchor tag attributes for the prev posts page link.
			 *
			 * @since 1.0.0
			 *
			 * @param string $attributes Attributes for the anchor tag.
			 */
			$attr = apply_filters( 'previous_posts_link_attributes', 'class="prev page-numbers"' );

			return '<a href="' . previous_posts( false ) . '" ' . $attr . '>' . $label . '</a>';
		} else {
			//put in a disabled prev link
			/**
			 * Filter the anchor tag attributes for the prev posts page link.
			 *
			 * @since 1.0.0
			 *
			 * @param string $attributes Attributes for the anchor tag.
			 */
			$attr = apply_filters( 'previous_posts_link_attributes', 'class="prev page-numbers  disabled"' );
			return '<span ' . $attr . '>' . $label . '</span>';
		}
	}

	return '';
}

if ( ! function_exists( 'rosa_lite_comments' ) ) {
	/*
	 * COMMENT LAYOUT
	 */
	function rosa_lite_comments( $comment, $args, $depth ) {
		static $comment_number;

		if ( ! isset( $comment_number ) )
			$comment_number = $args['per_page'] * ( $args['page'] - 1 ) + 1; else {
			$comment_number ++;
		}
		?>
	<li <?php comment_class(); ?>>
		<article id="comment-<?php echo esc_attr( $comment->comment_ID ); ?>" class="comment-article  media">
			<?php if ( pixelgrade_option( 'comments_show_numbering', 1 ) ) { ?>
				<span class="comment-number"><?php echo esc_html( $comment_number ); ?></span>
			<?php }

			if ( pixelgrade_option( 'comments_show_avatar', 0 ) && 'comment' === get_comment_type( $comment->comment_ID ) ) { ?>
				<aside class="comment__avatar  media__img">
					<!-- custom gravatar call -->
					<?php $bgauthemail = get_comment_author_email(); ?>
					<img src="http://www.gravatar.com/avatar/<?php echo esc_attr( md5( $bgauthemail ) ); ?>?s=60" class="comment__avatar-image" height="60" width="60" style="background-image: <?php echo esc_url( get_template_directory_uri() . '/library/images/nothing.gif' ); ?>; background-size: 100% 100%"/>
				</aside>
			<?php } ?>
			<div class="media__body">
				<header class="comment__meta comment-author">
					<?php
					/* translators: %s: comment author link */
                    printf( '<span class="comment__author-name">%s</span>', get_comment_author_link() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<time class="comment__time" datetime="<?php comment_time( 'c' ); ?>">
						<a href="<?php echo esc_url( get_comment_link( $comment->comment_ID ) ); ?>" class="comment__timestamp"><?php printf(
							/* translators: 1: comment date, 2: comment time */
							esc_html__( 'on %1$s at %2$s', 'rosa-lite' ), esc_html( get_comment_date() ), esc_html( get_comment_time() ) ); ?> </a>
					</time>
					<div class="comment__links">
						<?php
						edit_comment_link( esc_html__( 'Edit', 'rosa-lite' ), '  ', '' );
						comment_reply_link( array_merge( $args, array( 'depth'     => $depth,
						                                               'max_depth' => $args['max_depth']
						) ) );
						?>
					</div>
				</header>
				<!-- .comment-meta -->
				<?php if ( '0' === $comment->comment_approved ) { ?>
					<div class="alert info">
						<p><?php esc_html_e( 'Your comment is awaiting moderation.', 'rosa-lite' ) ?></p>
					</div>
				<?php } ?>
				<section class="comment__content comment">
					<?php comment_text(); ?>
				</section>
			</div>
		</article>
		<!-- </li> is added by WordPress automatically -->
		<?php
	} // don't remove this bracket!
}

if ( ! function_exists( 'rosa_lite_footer_the_copyright' ) ) {
	/**
	 * Display the footer copyright.
	 */
	function rosa_lite_footer_the_copyright() {
		$output = '';
		$output .= '<div class="site-info copyright-text">' . "\n";
		/* translators: %s: WordPress. */
		$output .= '<a href="' . esc_url( __( 'https://wordpress.org/', 'rosa-lite' ) ) . '">' . sprintf( esc_html__( 'Proudly powered by %s', 'rosa-lite' ), 'WordPress' ) . '</a>' . "\n";
		$output .= '<span class="sep"> | </span>';
		/* translators: %1$s: The theme name, %2$s: The theme author name. */
		$output .= '<span class="c-footer__credits">' . sprintf( esc_html__( 'Theme: %1$s by %2$s.', 'rosa-lite' ), 'Rosa Lite', '<a href="https://pixelgrade.com/?utm_source=rosa-lite-clients&utm_medium=footer&utm_campaign=rosa-lite" title="' . esc_html__( 'The Pixelgrade Website', 'rosa-lite' ) . '" rel="nofollow">Pixelgrade</a>' ) . '</span>' . "\n";
		$output .= '</div>';

		echo apply_filters( 'pixelgrade_footer_the_copyright', $output ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if ( ! function_exists( 'rosa_lite_footer_get_copyright_content' ) ) {
	/**
	 * Get the footer copyright content (HTML or simple text).
	 * It already has do_shortcode applied.
	 *
	 * @return bool|string
	 */
	function rosa_lite_footer_get_copyright_content() {
		/* translators: %year%: The current year, %site-title%: The site title. */
		$copyright_text = pixelgrade_option( 'copyright_text', esc_html__( '&copy; %year% %site-title%.', 'rosa-lite' ) );
		if ( ! empty( $copyright_text ) ) {
			// We need to parse some tags
			$copyright_text = rosa_lite_parse_content_tags( $copyright_text );

			// Finally process any shortcodes that might be in there
			return do_shortcode( $copyright_text );
		}

		return '';
	}
}

if ( ! function_exists( 'rosa_lite_parse_content_tags' ) ) {
	/**
	 * Replace any content tags present in the content.
	 *
	 * @param string $content
	 *
	 * @return string
	 */
	function rosa_lite_parse_content_tags( $content ) {
		$original_content = $content;

		// Allow others to alter the content before we do our work
		$content = apply_filters( 'pixelgrade_before_parse_content_tags', $content );

		// Now we will replace all the supported tags with their value
		// %year%
		$content = str_replace( '%year%', date( 'Y' ), $content );

		// %site-title% or %site_title%
		$content = str_replace( '%site-title%', get_bloginfo( 'name' ), $content );
		$content = str_replace( '%site_title%', get_bloginfo( 'name' ), $content );

		// This is a little sketchy because who is the user?
		// It is not necessarily the logged in user, nor the Administrator user...
		// We will go with the author for cases where we are in a post/page context
		// Since we need to dd some heavy lifting, we will only do it when necessary
		if ( false !== strpos( $content, '%first_name%' ) ||
		     false !== strpos( $content, '%last_name%' ) ||
		     false !== strpos( $content, '%display_name%' ) ) {
			$user_id = false;
			// We need to get the current ID in more global manner
			$current_object_id = get_queried_object_id();
			$current_post      = get_post( $current_object_id );
			if ( ! empty( $current_post->post_author ) ) {
				$user_id = $current_post->post_author;
			} else {
				global $authordata;
				$user_id = isset( $authordata->ID ) ? $authordata->ID : false;
			}

			// If we still haven't got a user ID, we will just use the first user on the site
			if ( empty( $user_id ) ) {
				$blogusers = get_users(
					array(
						'role'   => 'administrator',
						'number' => 1,
					)
				);
				if ( ! empty( $blogusers ) ) {
					$blogusers = reset( $blogusers );
					$user_id   = $blogusers->ID;
				}
			}

			if ( ! empty( $user_id ) ) {
				// %first_name%
				$content = str_replace( '%first_name%', get_the_author_meta( 'first_name', $user_id ), $content );
				// %last_name%
				$content = str_replace( '%last_name%', get_the_author_meta( 'last_name', $user_id ), $content );
				// %display_name%
				$content = str_replace( '%display_name%', get_the_author_meta( 'display_name', $user_id ), $content );
			}
		}

		// Allow others to alter the content after we did our work
		return apply_filters( 'pixelgrade_after_parse_content_tags', $content, $original_content );
	}
}

/**
 * Display the markup for the author bio links.
 * These are the links/websites added by one to it's Gravatar profile
 *
 * @param int|WP_Post $post_id Optional. Post ID or post object.
 */
function rosa_lite_author_bio_links( $post_id = null ) {
	echo rosa_lite_get_author_bio_links( $post_id ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

if ( ! function_exists( 'rosa_lite_get_author_bio_links' ) ) :

	/**
	 * Return the markup for the author bio links.
	 * These are the links/websites added by one to it's Gravatar profile
	 *
	 * @param int|WP_Post $post_id Optional. Post ID or post object.
	 * @return string The HTML markup of the author bio links list.
	 */
	function rosa_lite_get_author_bio_links( $post_id = null ) {
		$post = get_post( $post_id );

		$markup = '';

		if ( empty( $post ) ) {
			return $markup;
		}

		$str = wp_remote_fopen( 'https://www.gravatar.com/' . md5( strtolower( trim( get_the_author_meta( 'user_email' ) ) ) ) . '.php' );

		$profile = unserialize( $str );

		if ( is_array( $profile ) && ! empty( $profile['entry'][0]['urls'] ) ) {
			$markup .= '<ul class="author__social-links">' . "\n";

			foreach ( $profile['entry'][0]['urls'] as $link ) {
				if ( ! empty( $link['value'] ) && ! empty( $link['title'] ) ) {
					$markup .= '<li class="author__social-links__list-item">' . "\n";
					$markup .= '<a class="author__social-link" href="' . esc_url( $link['value'] ) . '" target="_blank">' . $link['title'] . '</a>' . "\n";
					$markup .= '</li>' . "\n";
				}
			}

			$markup .= '</ul>' . "\n";
		}

		return $markup;
	} #function

endif;
