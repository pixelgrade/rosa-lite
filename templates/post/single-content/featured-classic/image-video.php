<?php

$video_embed = get_post_meta(wpgrade::lang_post_id(get_the_ID()), wpgrade::prefix().'video_embed', true);
if ( ! empty($video_embed)){ ?>
	<div class="article__featured-image">
		<div class="featured-image">
			<div class="page-header-video">
				<div class="video-wrap">
					<?php echo stripslashes(htmlspecialchars_decode($video_embed)) ?>
				</div>
			</div>
		</div>
	</div>
<?php
} elseif (has_post_thumbnail()) {
	$image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'medium-size');
	if (!empty($image[0])) : ?>
		<div class="article__featured-image">
			<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
			<div class="article__featured-image-meta">
				<div class="flexbox">
					<div class="flexbox__item">
						<i class="icon-facetime-video"></i>
					</div>
				</div>
			</div>
		</div>
	<?php endif;
}
