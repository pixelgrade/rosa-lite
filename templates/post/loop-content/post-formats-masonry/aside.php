<?php
$post_format_class = '';
if (!empty($post_format)) {
	$post_format_class = 'article-archive--' . $post_format;
};
?>
<?php get_template_part('templates/post/loop-content/header-masonry'); ?>
<section  class="article__content <?php echo $post_format_class ?>">
		<?php the_content(); ?>
</section>
<?php get_template_part('templates/post/loop-content/footer');
