<?php 
/*
YARPP Template: Custom Related Posts Template
Description: The Related Posts Template for HEAP theme
*/
?>
<h3><?php _e('More good reading:', wpgrade::textdomain()) ?></h3>
<?php if ($related_query->have_posts()):?>
	<div class="mosaic-wrapper col-4">
		<div class="mosaic">	
			<?php while ($related_query->have_posts()) : $related_query->the_post();

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
				<header class="article__header">
					<?php if (has_post_thumbnail()):
						$image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'post-square-medium');
						$image_ratio = 70; //some default aspect ratio in case something has gone wrong and the image has no dimensions - it happens
						if (isset($image[1]) && isset($image[2]) && $image[1] > 0) {
							$image_ratio = $image[2] * 100/$image[1];
						}
						if (!empty($image[0])) : ?>
							<div class="article__featured-image" style="padding-top: <?php echo $image_ratio; ?>%">
								<a href="<?php the_permalink(); ?>">
									<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
									<div class="article__featured-image-meta">
										<div class="flexbox">
											<div class="flexbox__item">
												<hr class="separator" />
												<span class="read-more"><?php _e('Read more', wpgrade::textdomain()) ?></span>
												<hr class="separator" />
											</div>
										</div>
									</div>				
								</a>
							</div>
						<?php endif;
					endif;?>
					<?php

					if (!in_array($post_format, array('aside', 'chat'))): ?>
					<h4 class="article__title entry-title"><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h4>
					<?php endif; ?>
				</header>			
				<?php get_template_part('templates/post/loop-content/footer'); ?>
			</article>
			<?php endwhile; ?>
		</div><!-- .mosaic -->
	</div><!-- .mosaic__wrapper -->	
<?php else: ?>
<p>No related posts.</p>
<?php endif; ?>
