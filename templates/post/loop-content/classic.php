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
    <?php get_template_part( 'templates/post/loop-content/featured-classic/image' ); ?>
	<div class="article__body">
		<?php get_template_part( 'templates/post/loop-content/header-classic' ); ?>
		<section class="article__content">
			<?php echo wpgrade_better_excerpt(); ?>
		</section>
		<?php
		$read_more = wpgrade::option( 'blog_read_more_text' );
		if ( ! empty( $read_more ) ) : ?>
			<a href="<?php the_permalink(); ?>" class="read-more-button"><?php echo $read_more ?></a>
		<?php endif; ?>
	</div>
	<!-- .article__body -->
</article>