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
					esc_html_e( 'News', '__theme_txtd' );
				} ?></h1>
			<hr class="separator"/>
			<?php
		} elseif ( is_search() ) {
			?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Search Results for: ', '__theme_txtd' ) ?></span>

				<h1 class="hN  archive__title"><?php echo get_search_query(); ?></h1>
			</div>
			<hr class="separator"/>
			<?php
		} elseif ( is_tag() ) {
			?>
			<div class="heading headin--main">
				<h1 class="archive__title"><?php echo single_tag_title( '', false ); ?></h1>
				<span class="archive__side-title beta"><?php esc_html_e( 'Tag', '__theme_txtd' ) ?></span>
			</div>
			<hr class="separator"/>
		<?php } elseif ( ! empty( $object ) && isset( $object->term_id ) ) { ?>
			<div class="heading headin--main">
				<h1 class="archive__title"><?php echo esc_html( $object->name ); ?></h1>
				<span class="archive__side-title beta"><?php esc_html_e( 'Category', '__theme_txtd' ) ?></span>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_day() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Daily Archives: ', '__theme_txtd' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date(); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_month() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Monthly Archives: ', '__theme_txtd' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date( _x( 'F Y', 'monthly archives date format', '__theme_txtd' ) ); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_year() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Yearly Archives: ', '__theme_txtd' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date( _x( 'Y', 'yearly archives date format', '__theme_txtd' ) ); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } else { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php esc_html_e( 'Archives', '__theme_txtd' ) ?></span>
			</div>
			<hr class="separator"/>
			<?php
		}
	}
}

if ( ! function_exists( 'rosa_lite_please_select_a_menu_fallback' ) ) {
	function rosa_lite_please_select_a_menu_fallback() {
		if ( ! current_user_can( 'edit_theme_options' ) ) {
			return;
		}

		echo '
		<ul class="nav  nav--main" >
			<li><a href="' . esc_url( admin_url( 'nav-menus.php?action=locations' ) ) . '">' . esc_html__( 'Please select a menu in this location', '__theme_txtd' ) . '</a></li>
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

if ( ! function_exists( 'rosa_lite_comments' ) ) {
	/*
	 * COMMENT LAYOUT
	 */
	function rosa_lite_comments( $comment, $args, $depth ) {
		static $comment_number;

		if ( ! isset( $comment_number ) ) {
			$comment_number = $args['per_page'] * ( $args['page'] - 1 ) + 1;
		} else {
			$comment_number ++;
		} ?>
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
							esc_html__( 'on %1$s at %2$s', '__theme_txtd' ), esc_html( get_comment_date() ), esc_html( get_comment_time() ) ); ?> </a>
					</time>
					<div class="comment__links">
						<?php
						edit_comment_link( esc_html__( 'Edit', '__theme_txtd' ), '  ', '' );
						comment_reply_link( array_merge( $args, array( 'depth'     => $depth,
						                                               'max_depth' => $args['max_depth']
						) ) );
						?>
					</div>
				</header>
				<!-- .comment-meta -->
				<?php if ( '0' === $comment->comment_approved ) { ?>
					<div class="alert info">
						<p><?php esc_html_e( 'Your comment is awaiting moderation.', '__theme_txtd' ) ?></p>
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
		$output .= '<a href="' . esc_url( __( 'https://wordpress.org/', '__theme_txtd' ) ) . '">' . sprintf( esc_html__( 'Proudly powered by %s', '__theme_txtd' ), 'WordPress' ) . '</a>' . "\n";
		$output .= '<span class="sep"> | </span>';
		/* translators: %1$s: The theme name, %2$s: The theme author name. */
		$output .= '<span class="c-footer__credits">' . sprintf( esc_html__( 'Theme: %1$s by %2$s.', '__theme_txtd' ), 'Rosa Lite', '<a href="https://pixelgrade.com/?utm_source=rosa-lite-clients&utm_medium=footer&utm_campaign=rosa-lite" title="' . esc_html__( 'The Pixelgrade Website', '__theme_txtd' ) . '" rel="nofollow">Pixelgrade</a>' ) . '</span>' . "\n";
		$output .= '</div>';

		echo apply_filters( 'pixelgrade_footer_the_copyright', $output ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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
