<?php
$post_format_class = '';
if (!empty($post_format)) {
	$post_format_class = 'article-archive--' . $post_format;
};
?>
<header class="article__header">
	<?php
	if (wpgrade::option('blog_show_categories')):
		$categories = get_the_category();
		if ( !is_wp_error( $categories ) && !empty($categories)) { ?>
			<ol class="nav  breadcrumb  article__categories">
				<?php foreach ($categories as $category): ?>
					<li>
						<a href="<?php echo get_category_link($category->term_id); ?>" title="<?php echo esc_attr(sprintf(__("View all posts in %s", wpgrade::textdomain()), $category->name)) ?>">
							<?php echo $category->name; ?>
						</a>
					</li>
				<?php endforeach;?>
			</ol>
		<?php }
	endif;
	?>
	<h3 class="article__title"><a href="<?php echo rosa::get_content_link_url() ?>" rel="bookmark"><?php the_title(); ?></a></h3>
</header>
<section  class="article__content <?php echo $post_format_class ?>">
	<?php the_content(); ?>
</section>
