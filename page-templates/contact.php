<?php
/**
 * Template Name: Map Header
 * This is the template that is used for the contact page/section
 * It is a page with additional controls for the Google Maps section
 */

global $post, $wpgrade_private_post, $page_section_idx, $header_height;

//some global variables that we use in our page sections
$is_gmap                = false;
$footer_needs_big_waves = false;
$page_section_idx       = 0;

get_header();

while ( have_posts() ) : the_post();

	get_template_part( 'template-parts/header', 'page' );

	$classes      = "article--page  article--main";
	$border_style = get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_border_style', true );
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
				</div>
			</section>
			<?php rosa_display_header_down_arrow( $page_section_idx, $header_height ); ?>
		</article>

	<?php endif;

	$show_subpages = apply_filters( 'rosa_display_subpages', true );
	if ( $show_subpages ) {
		get_template_part( 'template-parts/subpages' );
	}

	//comments
	if ( comments_open() || '0' != get_comments_number() ) : ?>
		<div class="container">
			<?php comments_template(); ?>
		</div><!-- .container -->
	<?php endif;
endwhile;

get_footer();
