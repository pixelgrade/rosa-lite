<?php
global $post;

$gallery_ids = get_post_meta( wpgrade::lang_post_id(get_the_ID()), wpgrade::prefix() . 'main_gallery', true );
if (!empty($gallery_ids)) {
	$gallery_ids = explode(',',$gallery_ids);
} else {
	// empty gallery_ids
	// search for the first gallery shortcode
	$gallery_matches = null;
	preg_match('!\[gallery.*ids="(.*?)".*\]!', $post->post_content, $gallery_matches);

	//get the id list comma separated
	if ( ! empty($gallery_matches) && ! empty($gallery_matches[1])) {
		//some cleanup first
		$gallery_matches[1] = str_replace(' ','',trim($gallery_matches[1]));

		//now the mighty array - kboom
		$gallery_ids= explode(',',$gallery_matches[1]);
	}
	else { // gallery_matches is empty or no ids found
		$gallery_ids = '';
	}
}

if ( !empty($gallery_ids) ) {
	$attachments = get_posts( array(
		'post_type' => 'attachment',
		'posts_per_page' => -1,
		'orderby' => "post__in",
		'post__in'     => $gallery_ids
	) );
} else {
	$attachments = array();
}

//lets get to work
if (!empty($attachments)):

	$slider_transition = get_post_meta(wpgrade::lang_post_id(get_the_ID()), wpgrade::prefix().'post_slider_transition', true);
	$slider_autoplay = get_post_meta(wpgrade::lang_post_id(get_the_ID()), wpgrade::prefix().'post_slider_autoplay', true);
	if ($slider_autoplay) {
		$slider_delay = get_post_meta(wpgrade::lang_post_id(get_the_ID()), wpgrade::prefix().'post_slider_delay', true);
	}

	$slider_visiblenearby = get_post_meta(wpgrade::lang_post_id(get_the_ID()), wpgrade::prefix() . 'post_slider_visiblenearby', true);

?>
<div class="article__featured-image">
	<div class="pixslider js-pixslider"
		 data-customarrows
		 data-imagealigncenter

		 data-imagescale="fill"
		 data-autoscalesliderwidth="300"
		 data-autoscalesliderheight="300"
		 data-slidertransition="<?php echo $slider_transition; ?>"
		<?php if ($slider_autoplay) {
			echo 'data-sliderautoplay="" ';
			echo 'data-sliderdelay="'. $slider_delay.'" ';
		}

		?> >
		<?php
		foreach ($attachments as $attachment):
			$class = "post-attachment mime-" . sanitize_title( $attachment->post_mime_type );
			$thumbimg = wp_get_attachment_image_src($attachment->ID, 'post-square-small');
			?>
			<div class="gallery__item" itemscope itemtype="http://schema.org/ImageObject" >
				<img src="<?php echo $thumbimg[0]; ?>" class="attachment-medium-size  rsImg  invisible" alt="" itemprop="contentURL" />
			</div>

		<?php
		endforeach; ?>
	</div>
</div>
<?php endif; ?>