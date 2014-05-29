<?php
/**
 * Template Name: With Sidebar
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.

 */

get_header();

global $wpgrade_private_post;

if ( post_password_required() && ! $wpgrade_private_post['allowed'] ) {
	// password protection
	get_template_part( 'templates/password-request-form' );

} else {
	?>
	<div class="page-content single-page-content has-sidebar">
		<div class="page-content__wrapper">
			<?php if ( have_posts() ): the_post(); ?>

				<article class="article page page-single page-regular">
					<header>
						<?php if ( has_post_thumbnail() ):
							$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full-size' );
							if ( ! empty( $image[0] ) ): ?>
								<div class="page__featured-image">
									<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
								</div>
							<?php endif;
						endif;?>
					</header>
					<div class="page__wrapper">
						<section class="page__content  js-post-gallery  cf">
							<?php //if (wpgrade::option('blog_single_show_breadcrumb')) rosa::the_breadcrumb(); ?>
							<h1 class="page__title"><?php the_title(); ?></h1>
							<hr class="separator separator--dark"/>
							<?php the_content(); ?>

						</section>
						<?php
						global $numpages;
						if ( $numpages > 1 ):
							?>
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
								wp_link_pages( $args );
								?>
							</div>
						<?php
						endif;

						//comments
						if ( comments_open() || '0' != get_comments_number() ):
							comments_template();
						endif; ?>
					</div>
				</article>

			<?php
			else :
				get_template_part( 'no-results' );
			endif; ?>
		</div>
		<!-- .page-content__wrapper -->
	</div><!-- .page-content -->
	<?php get_template_part( 'sidebar' ); ?>

<?php
} // close if password protection

get_footer();
