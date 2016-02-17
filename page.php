<?php
/**
 * The template for displaying all pages.
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that other
 * 'pages' on your WordPress site will use a different template.
 */

get_header();

global $post, $wpgrade_private_post, $page_section_idx, $header_height;

//some global variables that we use in our page sections
$is_gmap                = false;
$footer_needs_big_waves = false;
$page_section_idx       = 0;

if ( post_password_required() && ! $wpgrade_private_post['allowed'] ) {
	// password protection
	get_template_part( 'template-parts/password-request-form' );

} else {

	while ( have_posts() ) : the_post();

		get_template_part( 'template-parts/header', 'page' );

		$classes = "article--page  article--main" ;

		$down_arrow_style = rosa::option('down_arrow_style');
		if ( $page_section_idx == 1 && $header_height == 'full-height' && $down_arrow_style == 'bubble' ) {
			$classes .= " article--arrow";
		}


//		$style = '';
//		$inverse_colors = get_post_meta( rosa::lang_page_id( get_the_ID() ), rosa::prefix() . 'inverse_section_colors', true );
//		if ($inverse_colors == 'on') {
//			$classes .= ' inverse-colors';
//
//			$text_color = rosa::option('text_color');
//			$background_color = rosa::option('content_background_color');
//
//			$style .= ' style="background-color: '.$text_color.'; color: '.$background_color.'" ';
//		}

		$border_style = get_post_meta( rosa::lang_page_id( get_the_ID() ), rosa::prefix() . 'page_border_style', true );
		if ( ! empty( $border_style ) ) {
			$classes .= ' border-' . $border_style;
		}

		if ( ! empty( $post->post_content ) ) : ?>
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
								<span class="meta-box__title"><?php _e( 'Pages', 'rosa' ) ?></span>
								<?php
								$args = array(
									'before'           => '<ol class="nav  pagination--single">',
									'after'            => '</ol>',
									'next_or_number'   => 'next_and_number',
									'previouspagelink' => __( '&laquo;', 'rosa' ),
									'nextpagelink'     => __( '&raquo;', 'rosa' )
								);
								wp_link_pages( $args ); ?>
							</div>
						<?php endif; ?>
					</div>
				</section>
			</article>
		<?php endif;

		get_template_part( 'template-parts/subpages' );

		//comments
		if ( comments_open() || '0' != get_comments_number() ): ?>
			<div class="container">
				<?php comments_template(); ?>
			</div>
		<?php endif;
	endwhile;

} // close if password protection

get_footer();
