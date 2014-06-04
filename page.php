<?php
/**
 * The template for displaying all pages.
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.

 */

get_header();

global $post, $wpgrade_private_post;

if ( post_password_required() && ! $wpgrade_private_post['allowed'] ) {
	// password protection
	get_template_part( 'templates/password-request-form' );

} else { ?>

	<div class="navigator"></div>

	<?php while ( have_posts() ) : the_post();

		get_template_part( 'templates/page/header' ); ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class( "article--page  article--main" ); ?>>
			<?php if (!empty( $post->post_content ) ) : ?>
			<section class="article__content">
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
