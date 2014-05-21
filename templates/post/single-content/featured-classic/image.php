<?php
if (has_post_thumbnail()):
	$image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'medium-size');
	if (!empty($image[0])) : ?>
		<div class="article__featured-image">
			<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
		</div>
	<?php endif;
endif;