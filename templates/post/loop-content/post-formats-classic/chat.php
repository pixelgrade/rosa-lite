<?php
$post_format_class = '';
if (!empty($post_format)) {
	$post_format_class = 'article-archive--' . $post_format;
};
?>
<div class="article__body <?php echo $post_format_class ?>">
	<?php get_template_part('templates/post/loop-content/header-classic'); ?>
	<section  class="article__content">
			<?php the_content(); ?>
	</section>
	<?php get_template_part('templates/post/loop-content/footer'); ?>
</div><!-- .article__body -->

