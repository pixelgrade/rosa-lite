<?php
/**
 * Template to display the article in archives in a classic way
 */

//post format specific
$post_format = get_post_format();
if (empty($post_format) || $post_format == 'standard') {
	$post_format = '';
}
$post_format_class = '';
if (!empty($post_format)) {
	$post_format_class = 'article-archive--' . $post_format;
};

//post thumb specific
$has_thumb = has_post_thumbnail();

$post_class_thumb = 'has-thumbnail';
if(!$has_thumb && $post_format != 'image' /*&& $post_format != 'gallery'*/) $post_class_thumb = 'no-thumbnail';
?>

<article <?php post_class('article  article--archive '.$post_format_class.' '.$post_class_thumb); ?>>
	<?php 
		if( $post_format != 'quote' )
			get_template_part('templates/post/loop-content/featured-classic/image',$post_format);
	?>
	<div class="article__body">
		<?php get_template_part('templates/post/loop-content/header-classic'); ?>
        <section class="article__content">
            <?php echo wpgrade_better_excerpt(); ?>
        </section>
        <a href="<?php the_permalink(); ?>" class="read-more-button">Read more</a>
	</div><!-- .article__body -->
	<?php //else: /* we have a special post format */ ?>
		<?php //get_template_part('templates/post/loop-content/post-formats-classic/'.$post_format); ?>
	<?php //endif; ?>
</article>