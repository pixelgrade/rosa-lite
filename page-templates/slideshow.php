<?php
/**
 * Template Name: Slideshow Header
 * Description: This is the template that is used for pages that have a header section with a slideshow instead of a featured image
 * It is a page with additional controls for the slideshow

 */

get_header();


 while ( have_posts() ) : the_post(); ?>
	<?php get_template_part( 'templates/page/header' ) ?>
	<article id="post-<?php the_ID(); ?>" <?php post_class( "article--page  article--main" ); ?>>
		<section class="article__content">
			<div class="container">
				<section class="page__content  js-post-gallery  cf">
					<?php the_content(); ?>
				</section>
			</div>
		</section>
	</article>
	<?php get_template_part( 'templates/subpages' ); ?>
	<?php
	//comments
	if ( comments_open() || '0' != get_comments_number() ): ?>
		<div class="container">
			<?php comments_template(); ?>
		</div>
	<?php endif;
endwhile;

get_footer();
