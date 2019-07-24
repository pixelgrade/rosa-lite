<?php
/**
 * Template Name: Default Template (No title)
 *
 * The template for displaying pages without a title.
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

get_header();

global $post, $rosa_private_post, $page_section_idx, $header_height;

$page_section_idx       = 0;

if ( post_password_required() && ! $rosa_private_post['allowed'] ) {
	// password protection
	get_template_part( 'template-parts/password-request-form' );
} else {

	while ( have_posts() ) : the_post();
		$classes = 'article--page  article--main' ;

		$border_style = 'simple';
		if ( ! empty( $border_style ) ) {
			$classes .= ' border-' . $border_style;
		}

		$show_main_content = apply_filters( 'rosa_avoid_empty_markup_if_no_page_content', ( ! empty( $post->post_content ) ), $post );

		if ( $show_main_content ) : ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>
				<section class="article__content">
					<div class="container">
						<section class="page__content  js-post-gallery  cf">
							<?php the_content(); ?>
						</section>
						<?php
						global $numpages;
						if ( $numpages > 1 ) { ?>
							<div class="entry__meta-box  meta-box--pagination">
								<span class="meta-box__title"><?php esc_html_e( 'Pages', 'rosa-lite' ) ?></span>
								<?php
								$args = array(
									'before'           => '<ol class="nav  pagination--single">',
									'after'            => '</ol>',
									'next_or_number'   => 'next_and_number',
									'previouspagelink' => esc_html__( '&laquo;', 'rosa-lite' ),
									'nextpagelink'     => esc_html__( '&raquo;', 'rosa-lite' )
								);
								wp_link_pages( $args ); ?>
							</div>
						<?php } ?>
					</div>
				</section>
			</article>
		<?php endif;

		// If comments are open or we have at least one comment, load up the comment template
		if ( comments_open() || get_comments_number() ) { ?>
			<div class="container">
				<?php comments_template(); ?>
			</div>
		<?php }
	endwhile;

} // close if password protection

get_footer();
