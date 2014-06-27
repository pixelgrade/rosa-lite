<?php
/**
 * The template for displaying all pages.
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.

 */

get_header();

global $post, $wpgrade_private_post;

//some global variables that we use in our page sections
$is_gmap = false;
$page_section_idx = 0;

if ( post_password_required() && ! $wpgrade_private_post['allowed'] ) {
	// password protection
	get_template_part( 'templates/password-request-form' );

} else { ?>

	<?php while ( have_posts() ) : the_post();

		get_template_part( 'templates/page/header' );

		$classes = "article--page  article--main";
		$style = '';
		$inverse_colors = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'inverse_section_colors', true );
		if ($inverse_colors) {
			$classes .= ' inverse-colors';

			$text_color = wpgrade::option('text_color');
			$background_color = wpgrade::option('content_background_color');

			$style .= ' style="background-color: '.$text_color.'; color: '.$background_color.'" ';
		}
		?>

		<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>
			<?php if (!empty( $post->post_content ) ) : ?>
			<section class="article__content" <?php echo $style ?>>
				<div class="container">
					<section class="page__content  js-post-gallery  cf">
						<?php the_content(); ?>
					</section>
					<?php
					global $numpages;
					if ( $numpages > 1 ): ?>
						<div class="entry__meta-box  meta-box--pagination">
							<span class="meta-box__title"><?php _e( 'Pages', wpgrade::textdomain() ) ?></span>
							<?php
							$args = array(
								'before'           => '<ol class="nav  pagination--single">',
								'after'            => '</ol>',
								'next_or_number'   => 'next_and_number',
								'previouspagelink' => __( '&laquo;', wpgrade::textdomain() ),
								'nextpagelink'     => __( '&raquo;', wpgrade::textdomain() )
							);
							wp_link_pages( $args ); ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
			<?php endif; ?>
		</article>
		<?php get_template_part( 'templates/subpages' );

		//comments
		if ( comments_open() || '0' != get_comments_number() ): ?>
			<div class="container">
				<?php comments_template(); ?>
			</div>
		<?php endif;
	endwhile;

} // close if password protection

get_footer();
