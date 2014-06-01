<?php
/**
 * Template to display the article in archives in a classic way
 */

//post thumb specific
$has_thumb = has_post_thumbnail();

$post_class_thumb = 'has-thumbnail';
if ( ! $has_thumb ) {
	$post_class_thumb = 'no-thumbnail';
}
?>

<article <?php post_class( 'article  article--archive ' . $post_class_thumb ); ?>>
	<div class="article__body">
		<?php get_template_part( 'templates/post/loop-content/header-classic' ); ?>
		<section class="article__content">
			<?php echo wpgrade_better_excerpt(); ?>
		</section>
		<?php if (! empty(wpgrade::option('blog_read_more_text')) ) : ?>
		<a href="<?php the_permalink(); ?>" class="read-more-button"><?php echo wpgrade::option('blog_read_more_text') ?></a>
		<?php endif; ?>
	</div>
	<!-- .article__body -->
</article>