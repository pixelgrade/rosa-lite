<?php
/**
 * Template to display the articles in archives in a masonry fancy style
 */

//post format specific
$post_format = get_post_format();
if (empty($post_format)) {
	$post_format = '';
}
$post_format_class = '';
if (!empty($post_format) && $post_format != 'standard') {
	$post_format_class = 'article-archive--' . $post_format;
};

//post thumb specific
$has_thumb = has_post_thumbnail();

$post_class_thumb = 'has-thumbnail';
if(!$has_thumb && $post_format != 'image' && $post_format != 'gallery') $post_class_thumb = 'no-thumbnail';
?>

<article <?php post_class('mosaic__item article-archive  article-archive--masonry '.$post_format_class.' '.$post_class_thumb); ?>>
	<?php if ( !in_array($post_format, array('quote', 'chat', 'aside', 'link')) ): ?>
		<?php get_template_part('templates/post/loop-content/header-masonry'); ?>
		<section  class="article__content entry-summary">
			<a href="<?php the_permalink() ?>">
				<?php  echo wpgrade_better_excerpt(); ?>
			</a>
		</section>
		<?php get_template_part('templates/post/loop-content/footer'); ?>
	<?php else: /* we have a special post format */ ?>
		<?php get_template_part('templates/post/loop-content/post-formats-masonry/'.$post_format); ?>
	<?php endif; ?>
</article>