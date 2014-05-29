<?php
/**
 * Template Name: Page with Slideshow
 * This is the template that is used for pages that have a header section with a slideshow instead of a featured image
 * It is a page with additional controls for the slideshow

 */

get_header();

?>
<section class="content  content--single-page">
	<?php while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class( "article--page  article--main" ); ?>>
			<?php get_template_part( 'templates/page/header' ) ?>
			<section class="article__content">
				<div class="container">
					<section class="page__content  js-post-gallery  cf">
						<h1 class="entry__title"><?php the_title(); ?></h1>
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
		<?php endif; ?>
	<?php endwhile; ?>
</section>

<?php get_footer();
