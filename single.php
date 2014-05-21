<?php 
/**
 * The Template for displaying all single posts.
 *
 */

get_header();


global $wpgrade_private_post;

if ( post_password_required() && !$wpgrade_private_post['allowed'] ) {
	// password protection
    get_template_part('templates/password-request-form');

} else {
    $has_sidebar = false;
	if (wpgrade::option('blog_single_show_sidebar')) {
		$has_sidebar = true;
	}

    // get_template_part('templates/post/single-content/'. $single_layout . $with_sidebar);

	//post thumb specific
	$has_thumb = has_post_thumbnail();

	$post_class_thumb = 'has-thumbnail';
	if(!$has_thumb) $post_class_thumb = 'no-thumbnail';

	//post format specific
	$post_format = get_post_format();
	if (empty($post_format) || $post_format == 'standard') {
		$post_format = '';
	}
	$post_format_class = '';
	if (!empty($post_format)) {
		$post_format_class = 'article--' . $post_format;
	};

	?>

	<div class="page-content  single-content<?php  if ($has_sidebar) echo '  has-sidebar'; ?>">
		<?php if ($has_sidebar) echo '<div class="page-content__wrapper">'; ?>
		<article <?php post_class('article-single  single-post '.$post_format_class.' '.$post_class_thumb)?>>

			<?php get_template_part('templates/post/single-content/header'); ?>

			<section class="article__content entry-content js-post-gallery">
				<?php the_content(); ?>
			</section><!-- .article__content -->

			<?php get_template_part('templates/post/single-content/footer'); ?>

			<?php
			// If comments are open or we have at least one comment, load up the comment template
			if ( comments_open() || '0' != get_comments_number() )
				comments_template(); ?>
							
		</article>
		<?php if ($has_sidebar) echo '</div><!-- .page-content__wrapper -->'; ?>
	</div>
<?php
	if ($has_sidebar) get_template_part('sidebar');
}
get_footer();
