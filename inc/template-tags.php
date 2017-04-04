<?php

if( ! function_exists('rosa_the_archive_title' ) ) {

	function rosa_the_archive_title() {

		$object = get_queried_object();

		if ( is_home() ) { ?>
			<h1 class="hN  archive__title">
				<?php if ( isset( $object->post_title ) ) {
					echo $object->post_title;
				} else {
					_e( 'News', 'rosa' );
				} ?></h1>
			<hr class="separator"/>
			<?php
		} elseif ( is_search() ) {
			?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php _e( 'Search Results for: ', 'rosa' ) ?></span>

				<h1 class="hN  archive__title"><?php echo get_search_query(); ?></h1>
			</div>
			<hr class="separator"/>
			<?php
		} elseif ( is_tag() ) {
			?>
			<div class="heading headin--main">
				<h1 class="archive__title"><?php echo single_tag_title( '', false ); ?></h1>
				<span class="archive__side-title beta"><?php _e( 'Tag', 'rosa' ) ?></span>
			</div>
			<hr class="separator"/>
		<?php } elseif ( ! empty( $object ) && isset( $object->term_id ) ) { ?>
			<div class="heading headin--main">
				<h1 class="archive__title"><?php echo $object->name; ?></h1>
				<span class="archive__side-title beta"><?php _e( 'Category', 'rosa' ) ?></span>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_day() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php _e( 'Daily Archives: ', 'rosa' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date(); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_month() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php _e( 'Monthly Archives: ', 'rosa' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date( _x( 'F Y', 'monthly archives date format', 'rosa' ) ); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } elseif ( is_year() ) { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php _e( 'Yearly Archives: ', 'rosa' ) ?></span>

				<h1 class="archive__title"><?php echo get_the_date( _x( 'Y', 'yearly archives date format', 'rosa' ) ); ?></h1>
			</div>
			<hr class="separator"/>
		<?php } else { ?>
			<div class="heading headin--main">
				<span class="archive__side-title beta"><?php _e( 'Archives', 'rosa' ) ?></span>
			</div>
			<hr class="separator"/>
			<?php
		}
	}
}

if( ! function_exists('rosa_callback_inlined_custom_style' ) ) {

	function rosa_callback_inlined_custom_style() {
		ob_start();
		//handle the complicated logic of the footer waves that keeps changing color
		$footer_sidebar_style    = pixelgrade_option( 'footer_sidebar_style' );
		$waves_fill_color = '#121212';
		switch ($footer_sidebar_style) {
			case 'light' :
				$waves_fill_color = '#ffffff';
				break;
			case 'dark' :
				$waves_fill_color = '#121212';
				break;
			case 'accent' :
				$waves_fill_color = '#'.pixelgrade_option('main-color');
				break;

		} ?>
		.site-footer.border-waves:before,
		.border-waves-top.border-waves-top--dark:before {
		background-image: url("data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 19 14' width='19' height='14' enable-background='new 0 0 19 14' xml:space='preserve' preserveAspectRatio='none slice'><g><path fill='<?php echo $waves_fill_color ?>' d='M0,0c4,0,6.5,5.9,9.5,5.9S15,0,19,0v7H0V0z'/><path fill='<?php echo $waves_fill_color ?>' d='M19,14c-4,0-6.5-5.9-9.5-5.9S4,14,0,14l0-7h19V14z'/></g></svg>");
		}
		<?php

		$custom_css = ob_get_clean();
		$style      = 'wpgrade-main-style';

		wp_add_inline_style( $style, $custom_css );
	}
}

function rosa_please_select_a_menu_fallback() {
	echo '
		<ul class="nav  nav--main sub-menu" >
			<li><a href="' . admin_url( 'nav-menus.php?action=locations' ) . '">' . __( 'Please select a menu in this location', 'rosa' ) . '</a></li>
		</ul>';
}

if ( ! function_exists( 'rosa_display_header_down_arrow' ) ) {
	function rosa_display_header_down_arrow( $page_section_idx, $header_height ) {

		if ( $page_section_idx !== 1 || $header_height !== 'full-height' ) {
			return;
		}

		//get the global option regarding down arrow style
		$down_arrow_style = pixelgrade_option('down_arrow_style');
		if ( empty($down_arrow_style) ) {
			$down_arrow_style = 'transparent'; //the default
		}

		if ( $down_arrow_style == 'bubble') {
			echo '<svg class="blurp--top" width="192" height="61" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 160.7 61.5" enable-background="new 0 0 160.7 61.5" xml:space="preserve"><path fill="#FFFFFF" d="M80.3,61.5c0,0,22.1-2.7,43.1-5.4s41-5.4,36.6-5.4c-21.7,0-34.1-12.7-44.9-25.4S95.3,0,80.3,0c-15,0-24.1,12.7-34.9,25.4S22.3,50.8,0.6,50.8c-4.3,0-6.5,0,3.5,1.3S36.2,56.1,80.3,61.5z"/></svg>';
		}
		echo '<div class="down-arrow down-arrow--' . $down_arrow_style . '"><div class="arrow"></div></div>' . PHP_EOL;
	}
}

/*
 * Add custom styling for the media popup
 */
if ( ! function_exists( 'rosa_custom_style_for_mediabox' ) ) {
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
}
add_action( 'print_media_templates', 'rosa_custom_style_for_mediabox' );

/*
 * Add custom settings to the gallery popup interface
 */
if ( ! function_exists( 'rosa_custom_gallery_settings' ) ) {
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
}
add_action( 'print_media_templates', 'rosa_custom_gallery_settings' );

if ( ! function_exists( 'rosa_the_posts_navigation' ) ) :

	/**
	 * Prints the HTML of the posts navigation
	 * It will display both prev/next and page numbers (i.e « Prev 1 … 3 4 5 6 7 … 9 Next » )
	 *
	 * @since Rosa 2.0.0
	 */
	function rosa_the_posts_navigation() {
		global $wp_query;

		$big = 999999999; // need an unlikely integer
		$a11y_text = __( 'Page', 'rosa' ); // Accessibility improvement

		$links = paginate_links( array(
			'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format' => '?paged=%#%',
			'current' => max( 1, get_query_var('paged') ),
			'total' => $wp_query->max_num_pages,
			'prev_next' => false,
			'before_page_number' => '<span class="screen-reader-text">' . $a11y_text . ' </span>',
		) );

		$links = rosa_get_prev_posts_link() . $links . rosa_get_next_posts_link();

		//wrap the links in a standard navigational markup
		$screen_reader_text = esc_html__( 'Posts navigation', 'rosa' );
		$template = '
		<nav class="nav nav--banner pagination" role="navigation">
			<h2 class="screen-reader-text">%1$s</h2>
			<div class="nav-links">%2$s</div>
		</nav>';

		echo sprintf( $template, esc_html( $screen_reader_text ), $links );
	}
endif;

/**
 * Return the next posts page link.
 *
 * --Customized version of the function in core get_next_posts_link()
 *
 * @since 2.7.0
 *
 * @global int      $paged
 * @global WP_Query $wp_query
 *
 * @param string $label    Content for link text.
 * @return string|void HTML-formatted next posts page link.
 */
function rosa_get_next_posts_link( $label = null ) {
	global $paged, $wp_query;

	$max_page = $wp_query->max_num_pages;

	if ( ! $paged )
		$paged = 1;

	$nextpage = intval($paged) + 1;

	if ( null === $label )
		$label = esc_html__( 'Next', 'rosa' );

	if ( ! is_single() ) {
		if ( $nextpage <= $max_page ) {
			/**
			 * Filter the anchor tag attributes for the next posts page link.
			 *
			 * @since 2.7.0
			 *
			 * @param string $attributes Attributes for the anchor tag.
			 */
			$attr = apply_filters( 'next_posts_link_attributes', 'class="next page-numbers"' );

			return '<a href="' . next_posts( $max_page, false ) . '" ' . $attr . '>' . $label . '</a>';
		} else {
			//put in a disabled next link
			/**
			 * Filter the anchor tag attributes for the next posts page link.
			 *
			 * @since 2.7.0
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
 * --Customized version of the function in core get_prev_posts_link()
 *
 * @since 2.7.0
 *
 * @global int      $paged
 *
 * @param string $label    Content for link text.
 * @return string|void HTML-formatted next posts page link.
 */
function rosa_get_prev_posts_link( $label = null ) {
	global $paged;

	if ( ! $paged )
		$paged = 1;

	if ( null === $label )
		$label = esc_html__( 'Prev', 'rosa' );

	if ( ! is_single() ) {
		if ( $paged > 1 ) {
			/**
			 * Filter the anchor tag attributes for the prev posts page link.
			 *
			 * @since 2.7.0
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
			 * @since 2.7.0
			 *
			 * @param string $attributes Attributes for the anchor tag.
			 */
			$attr = apply_filters( 'previous_posts_link_attributes', 'class="prev page-numbers  disabled"' );
			return '<span ' . $attr . '>' . $label . '</span>';
		}
	}

	return '';
}

if ( ! function_exists('rosa_comments') ) {
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
			<?php if ( pixelgrade_option( 'comments_show_numbering' ) ): ?>
				<span class="comment-number"><?php echo $comment_number ?></span>
			<?php endif; ?>
			<?php if ( pixelgrade_option( 'comments_show_avatar' ) && get_comment_type( $comment->comment_ID ) == 'comment' ): ?>
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
}