<?php
/**
 * Template Name: Slideshow Header
 * Description: This is the template that is used for pages that have a header section with a slideshow instead of a featured image
 * It is a page with additional controls for the slideshow
 */

global $post;

//some global variables that we use in our page sections
$is_gmap                = false;
$footer_needs_big_waves = false;
$page_section_idx       = 0;

get_header();

while ( have_posts() ) : the_post(); ?>
	<?php get_template_part( 'templates/page/header' );

	$classes      = "article--page  article--main";
	$border_style = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_border_style', true );
	if ( ! empty( $border_style ) ) {
		$classes .= ' border-' . $border_style;
	}

	if ( ! empty( $post->post_content ) ) :?>
		<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>

			<section class="article__content">
				<div class="container">
					<section class="page__content  js-post-gallery  cf">
						<?php the_content(); ?>
					</section>
				</div>
			</section>

		</article>
	<?php
	endif;

	get_template_part( 'templates/subpages' );

	//comments
	if ( comments_open() || '0' != get_comments_number() ): ?>
		<div class="container">
			<?php comments_template(); ?>
		</div>
	<?php endif;
endwhile;

get_footer();
