<?php
/**
 * The template for displaying all pages.
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

get_header();

global $post, $rosa_private_post, $page_section_idx, $header_height;

//some global variables that we use in our page sections
$footer_needs_big_waves = false;
$page_section_idx       = 0;

if ( post_password_required() && ! $rosa_private_post['allowed'] ) {
	// password protection
	get_template_part( 'template-parts/password-request-form' );
} else {

	while ( have_posts() ) : the_post();

		get_template_part( 'template-parts/header', 'page' );

		$classes = 'article--page  article--main';

		$down_arrow_style = pixelgrade_option('down_arrow_style', 'transparent' );
		if ( $page_section_idx == 1 && 'full-height' === $header_height && 'bubble' === $down_arrow_style ) {
			$classes .= ' article--arrow';
		}

		$border_style = 'simple';
		$classes .= ' border-' . $border_style;


		$show_main_content = apply_filters( 'rosa_avoid_empty_markup_if_no_page_content', ( ! empty( $post->post_content ) ), $post );

		if ( $show_main_content ) { ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>
				<section class="article__content">
					<div class="container">
						<section class="page__content  js-post-gallery  cf">
							<?php the_content(); ?>
						</section>
						<?php
						global $numpages;
						if ( $numpages > 1 ): ?>
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
						<?php endif; ?>
					</div>
				</section>
				<?php rosa_display_header_down_arrow( $page_section_idx, $header_height ); ?>
			</article>
		<?php }

		// If comments are open or we have at least one comment, load up the comment template
		if ( comments_open() || get_comments_number() ) { ?>
			<div class="container">
				<?php comments_template(); ?>
			</div>
		<?php }
	endwhile;

} // close if password protection

get_footer();
