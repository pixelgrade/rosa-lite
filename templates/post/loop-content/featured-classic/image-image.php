<?php

if (has_post_thumbnail()):
	$image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'post-square-small');
	if (!empty($image[0])) : ?>
		<div class="article__featured-image">
			<a href="<?php the_permalink(); ?>"><img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/></a>
		</div>
	<?php endif;
else:
	// we need to search for an image in the content
	// like it should be
	$image = array();
	$image[0] = heap::get_post_format_first_image_src();
	if (!empty($image[0])) : ?>
		<div class="article__featured-image">
			<a href="<?php the_permalink(); ?>"><img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/></a>
		</div>
	<?php endif;
endif;