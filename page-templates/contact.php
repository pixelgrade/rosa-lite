<?php
/**
 * Template Name: Map Header
 * This is the template that is used for the contact page/section
 * It is a page with additional controls for the Google Maps section

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
	<?php get_template_part( 'templates/subpages' );

	//comments
	if ( comments_open() || '0' != get_comments_number() ): ?>
		<div class="container">
			<?php comments_template(); ?>
		</div>
	<?php endif;
endwhile;

get_footer();
