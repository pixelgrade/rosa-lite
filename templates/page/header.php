<?php
/**
 * This template handles the page headers with image and cover text
 */

//first lets get to know this page a little better
$subtitle = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_subtitle', true );
$title    = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_title', true );
if ( empty( $title ) ) {
	//use the page title if empty
	$title = get_the_title();
}
$description = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_description', true );
//filter the content with some limitations to avoid having plugins doing nasty things to it
$description = wpgrade::filter_content( $description, 'default' );
?>
<header class="article__header">
	<?php
	/* FIRST TEST FOR CONTACT PAGE TEMPLATE */

	//get the Google Maps URL to test if empty
	$gmap_url = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_url', true );

	if ( get_page_template_slug( get_the_ID() ) == 'page-templates/contact.php' && ! empty( $gmap_url ) ) :
		$gmap_custom_style   = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_custom_style', true );
		$gmap_marker_content = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_maker_content', true );

		?>
		<div id="gmap"
		     data-url="<?php esc_attr_e( $gmap_url ); ?>" <?php echo ( $gmap_custom_style == 'on' ) ? 'data-customstyle' : ''; ?>
		     data-markercontent="<?php echo esc_attr( $gmap_marker_content ); ?>"></div>
	<?php
	else :
		/* THEN TEST FOR SLIDESHOW PAGE TEMPLATE */

		$gallery_ids = get_post_meta( $post->ID, wpgrade::prefix() . 'main_gallery', true );

		if ( get_page_template_slug( get_the_ID() ) == 'page-templates/slideshow.php' && ! empty( $gallery_ids ) ):
			$gallery_ids = explode( ',', $gallery_ids );

			if ( ! empty( $gallery_ids ) ) {
				$attachments = get_posts( array(
					'post_type'      => 'attachment',
					'posts_per_page' => - 1,
					'orderby'        => "post__in",
					'post__in'       => $gallery_ids
				) );
			} else {
				$attachments = array();
			}

			if ( ! empty( $attachments ) ) :
				//let's grab the info regarding the slider
				$image_scale_mode            = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_image_scale_mode', true );
				$slider_visiblenearby        = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_visiblenearby', true );
				$slider_transition           = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_transition', true );
				$slider_transition_direction = '';
				$slider_transition_direction = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_transition_direction', true );
				$slider_autoplay             = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_autoplay', true );

				if ( $slider_autoplay ) {
					$slider_delay = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_delay', true );
				}
				?>
				<div class="content--page-slider">
					<div class="content-helper">
						<div class="slider-controls">
							<div class="slider-controls__arrows">
								<span class="slider-arrow  js-slider-arrow-prev"><i class="icon-angle-up"></i></span>
								<span class="slider-arrow  js-slider-arrow-next"><i class="icon-angle-down"></i></span>
							</div>
						</div>
						<div class="pixslider  pixslider--page  js-pixslider"
						     data-customarrows="right"
						     data-imagealigncenter
						     data-imagescale="<?php echo $image_scale_mode; ?>"
						     data-slidertransition="<?php echo $slider_transition; ?>"
							<?php if ( $slider_transition == 'move' ) : ?>
								data-slidertransitiondirection="<?php echo $slider_transition_direction; ?>"
							<?php endif; ?>
						     data-bullets
							<?php
							if ( $slider_autoplay ) {
								echo 'data-sliderautoplay="" ';
								echo 'data-sliderdelay="' . $slider_delay . '" ';
							}
							if ( $slider_visiblenearby ) {
								echo 'data-visiblenearby ';
							}
							?> >
							<?php
							$set_cover = true;;

							foreach ( $attachments as $attachment ) :

								$full_img          = wp_get_attachment_image_src( $attachment->ID, 'full-size' );
								$attachment_fields = get_post_custom( $attachment->ID );

								// prepare the video url if there is one
								$video_url = ( isset( $attachment_fields['_video_url'][0] ) && ! empty( $attachment_fields['_video_url'][0] ) ) ? esc_url( $attachment_fields['_video_url'][0] ) : '';

								// should the video auto play?
								$video_autoplay = ( isset( $attachment_fields['_video_autoplay'][0] ) && ! empty( $attachment_fields['_video_autoplay'][0] ) && $attachment_fields['_video_autoplay'][0] === 'on' ) ? $attachment_fields['_video_autoplay'][0] : '';

								if ( true === $set_cover ) {
									?>
									<div class="gallery-item cover" itemscope itemtype="http://schema.org/ImageObject"
									     data-caption="<?php echo htmlspecialchars( $attachment->post_excerpt ) ?>"
									     data-description="<?php echo htmlspecialchars( $attachment->post_content ) ?>">
										<div class="flexbox">
											<div class="flexbox__item">
												<hgroup class="article__headline">
													<?php if ( ! empty( $subtitle ) ) {
														echo '<h2 class="headline__secondary">' . esc_html( $subtitle ) . '</h2>';
													} ?>
													<h1 class="headline__primary"><?php esc_html_e( $title ) ?></h1>
													<?php if ( ! empty( $description ) ) {
														echo '<span class="headline__description">' . $description . '</span>';
													} ?>
												</hgroup>
											</div>
										</div>
										<img src="<?php echo $full_img[0]; ?>" class="attachment-blog-big rsImg"
										     alt="<?php echo $attachment->post_excerpt; ?>" itemprop="contentURL"/>
									</div>
									<?php
									$set_cover = false;
								} else {
									?>
									<div class="gallery-item<?php echo( ! empty( $video_url ) ? ' video' : '' );
									echo ( $video_autoplay == 'on' ) ? ' video_autoplay' : ''; ?>" itemscope
									     itemtype="http://schema.org/ImageObject"
									     data-caption="<?php echo htmlspecialchars( $attachment->post_excerpt ) ?>"
									     data-description="<?php echo htmlspecialchars( $attachment->post_content ) ?>" <?php echo ( ! empty( $video_autoplay ) ) ? 'data-video_autoplay="' . $video_autoplay . '"' : ''; ?>>
										<img src="<?php echo $full_img[0]; ?>" class="attachment-blog-big rsImg"
										     alt="<?php echo $attachment->post_excerpt; ?>"
										     itemprop="contentURL" <?php echo ( ! empty( $video_url ) ) ? ' data-rsVideo="' . $video_url . '"' : ''; ?>  />
									</div>
								<?php
								}
							endforeach; ?>
						</div>
					</div>
				</div><!-- .content .content--page-slider -->
			<?php else : ?>
				<div class="empty-slideshow">
					<?php _e( 'Currently there are no images assigned to this slideshow', wpgrade::textdomain() ); ?>
				</div>
			<?php endif;
		else :
			/* OR REGULAR PAGE */

			if ( has_post_thumbnail() ):
				$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full-size' );
				if ( ! empty( $image[0] ) ): ?>
					<div class="article__parallax">
						<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
					</div>
				<?php endif;
			endif;?>
			<div class="flexbox">
				<div class="flexbox__item">
					<hgroup class="article__headline">
						<?php if ( ! empty( $subtitle ) ) {
							echo '<h2 class="headline__secondary">' . esc_html( $subtitle ) . '</h2>';
						} ?>
						<h1 class="headline__primary"><?php esc_html_e( $title ) ?></h1>
						<?php if ( ! empty( $description ) ) {
							echo '<span class="headline__description">' . $description . '</span>';
						} ?>
					</hgroup>
				</div>
			</div>
		<?php endif;
	endif;?>
</header>