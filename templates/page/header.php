<?php
/**
 * This template handles the page headers with image and cover text
 */

global $is_gmap, $page_section_idx, $header_height;

//increment the page section number
$page_section_idx++;

//header general classes
$classes = "article__header  article__header--page";

//first lets get to know this page a little better
$header_height = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_header_height', true );
if ( empty($header_height) ) {
	$header_height = 'half-height'; //the default
}
$classes .= ' ' . $header_height;

$subtitle = trim( get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_subtitle', true ) );
//we need to mess with the subtitle a little bit - because it deserves it
//we need to wrap the first subtitle letter in a span so we can control it - height wise
if ( ! empty( $subtitle ) ) {
	$subtitle   = esc_html( $subtitle );
	$first_char = mb_substr( $subtitle, 0, 1 );
	$subtitle   = '<span class="first-letter">' . $first_char . '</span>' . mb_substr( $subtitle, 1 );
}

$title = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_title', true );
if ( empty( $title ) ) {
	//use the page title if empty
	$title = get_the_title();
}
$description = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_cover_description', true );
//filter the content with some limitations to avoid having plugins doing nasty things to it
$description = wpgrade::filter_content( $description, 'default' );

/* FIRST TEST FOR CONTACT PAGE TEMPLATE */

//get the Google Maps URL to test if empty
$gmap_url = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_url', true );

if ( get_page_template_slug( get_the_ID() ) == 'page-templates/contact.php' ) :
	if ( ! empty( $gmap_url ) ) :
		//set the global so everybody knows that we are in dire need of the Google Maps API
		$is_gmap = true;

		$gmap_custom_style   = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_custom_style', true );
		$gmap_marker_content = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_marker_content', true );
		$gmap_height         = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_gmap_height', true );
		if ( empty($gmap_height) ) {
			$gmap_height = 'half-height'; //the default
		}
		$classes .= ' ' . $gmap_height;
		?>
		<header class="<?php echo $classes ?>">
			<div id="gmap"
			     data-url="<?php esc_attr_e( $gmap_url ); ?>" <?php echo ( $gmap_custom_style == 'on' ) ? 'data-customstyle' : ''; ?>
			     data-markercontent="<?php echo esc_attr( $gmap_marker_content ); ?>"></div>
		</header>
	<?php
	endif;
else :
	/* THEN TEST FOR SLIDESHOW PAGE TEMPLATE */

	$gallery_ids = get_post_meta( get_the_ID(), wpgrade::prefix() . 'main_gallery', true );

	if ( get_page_template_slug( get_the_ID() ) == 'page-templates/slideshow.php' && ! empty( $gallery_ids ) ): ?>
		<?php
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
			$image_scale_mode     = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_image_scale_mode', true );
			$slider_visiblenearby = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_visiblenearby', true );
			$slider_transition    = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_transition', true );
			$slider_autoplay      = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_autoplay', true );


			if ( $slider_autoplay ) {
				$slider_delay = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_delay', true );
			}
			?>
			<header class="<?php echo $classes ?>">
				<?php if (! empty( $subtitle ) || ( ! empty( $title ) && $title !== ' ' ) || ! empty( $description )) : ?>
				<div class="flexbox">
					<div class="flexbox__item">
						<hgroup class="article__headline">
							<?php if ( ! empty( $subtitle ) ) {
								echo '<h2 class="headline__secondary">' . $subtitle . '</h2>' . PHP_EOL;
							} ?>
							<h1 class="headline__primary"><?php esc_html_e( $title ) ?></h1>
							<?php if ( ! empty( $description ) ) {
								echo '<span class="headline__description">' . $description . '</span>' . PHP_EOL;
							} ?>
						</hgroup>
					</div>
				</div>
				<?php endif; ?>
				<div class="article__parallax  header--slideshow  js-pixslider"
				     data-autoHeight
				     data-imagealigncenter
				     data-imagescale="<?php echo $image_scale_mode; ?>"
				     data-slidertransition="<?php echo $slider_transition; ?>"
				     data-customArrows
					<?php
					if ( $slider_transition == 'move' ) echo 'data-slidertransitiondirection="horizontal"' . PHP_EOL;
					if ( $slider_autoplay ) {
						echo 'data-sliderautoplay="" ' . PHP_EOL;
						echo 'data-sliderdelay="' . $slider_delay . '" ' . PHP_EOL;
					}
					if ( $slider_visiblenearby ) {
						echo 'data-visiblenearby ' . PHP_EOL;
					}
					?> >
					<?php
					$set_cover = false;

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
			</header>
		<?php else : ?>
			<div class="empty-slideshow">
				<?php _e( 'Currently there are no images assigned to this slideshow', wpgrade::textdomain() ); ?>
			</div>
		<?php endif; ?>
	<?php
	else :
		/* OR REGULAR PAGE */
		if ( has_post_thumbnail() || ! empty( $subtitle ) || ( ! empty( $title ) && $title !== ' ' ) || ! empty( $description ) ) : ?>
			<header class="<?php echo $classes ?>" data-type="image">
				<?php if ( has_post_thumbnail() ):
					$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full-size' );
					if ( ! empty( $image[0] ) ): ?>
						<div class="article__parallax  article__parallax--img">
							<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
						</div>
					<?php endif;
				endif;
				if (! empty( $subtitle ) || ( ! empty( $title ) && $title !== ' ' ) || ! empty( $description )) : ?>
				<div class="flexbox">
					<div class="flexbox__item">
						<hgroup class="article__headline">
							<?php if ( ! empty( $subtitle ) ) {
								echo '<h2 class="headline__secondary">' . $subtitle . '</h2>' . PHP_EOL;
							} ?>
							<h1 class="headline__primary"><?php esc_html_e( $title ) ?></h1>
							<?php if ( ! empty( $description ) ) {
								echo '<div class="headline__description">' . $description . '</div>' . PHP_EOL;
							} ?>
						</hgroup>
					</div>
				</div>
				<?php endif; ?>
                <?php if ( $page_section_idx == 1 && $header_height == 'full-height' ) {
	                //get the global option regarding down arrow style
	                $down_arrow_style = wpgrade::option('down_arrow_style');
	                if ( empty($down_arrow_style) ) {
		                $down_arrow_style = 'transparent'; //the default
	                }

	                if ( $down_arrow_style == 'bubble') {
	                    echo '<svg class="blurp--top" width="192" height="61" viewBox="0 0 160.7 61.5" enable-background="new 0 0 160.7 61.5" xml:space="preserve"><path fill="#FFFFFF" d="M0.6,50.8C44,50.8,50.3,0,80.3,0v61.5C80.3,61.5-8,50.8,0.6,50.8z M160.1,50.8C116.7,50.8,110.3,0,80.3,0v61.5C80.3,61.5,168.7,50.8,160.1,50.8z"/></svg>';
	                }
                    echo '<div class="down-arrow down-arrow--' . $down_arrow_style . '"><div class="arrow"></div></div>' . PHP_EOL;
                } ?>
			</header>
		<?php endif;
	endif;
endif;?>
</header>