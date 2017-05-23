<?php
/**
 * This template handles the page headers with image and cover text
 */

global $is_gmap, $page_section_idx, $header_height;

//increment the page section number
$page_section_idx++;

//header general classes
$classes = "c-hero  article__header  article__header--page";

//first lets get to know this page a little better
$header_height = get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_header_height', true );
if ( empty($header_height) ) {
	$header_height = 'half-height'; //the default
}
$classes .= ' ' . $header_height;

$subtitle = trim( __(get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_cover_subtitle', true ) ));
//we need to mess with the subtitle a little bit - because it deserves it
//we need to wrap the first subtitle letter in a span so we can control it - height wise
if ( ! empty( $subtitle ) ) {
	$subtitle   = esc_html( $subtitle );
	$first_char = mb_substr( $subtitle, 0, 1 );
	$subtitle   = '<span class="first-letter">' . $first_char . '</span>' . mb_substr( $subtitle, 1 );
}

$title = __(get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_cover_title', true ));
if ( empty( $title ) ) {
	//use the page title if empty
	$title = get_the_title();
}
$description = __(get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_cover_description', true ));
$pin_type = get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_gmap_pin_type', true );
//filter the content with some limitations to avoid having plugins doing nasty things to it
$description = rosa_display_content( $description, 'default' );

if ( get_page_template_slug( get_the_ID() ) == 'page-templates/contact.php' ) {
	if ( empty( $pin_type ) ) {
		$pin_type = 'single';
	}
}  else { 	$pin_type = ''; }

/* FIRST TEST FOR CONTACT PAGE TEMPLATE */
if ( $pin_type == 'single' ) {
	//get the Google Maps URL to test if empty
	$gmap_url = get_post_meta( get_the_ID(), wpgrade::prefix() . 'gmap_url', true );

	if ( ! empty( $gmap_url ) ) {
		//set the global so everybody knows that we are in dire need of the Google Maps API
		$is_gmap = true;

		$gmap_custom_style   = get_post_meta( get_the_ID(), wpgrade::prefix() . 'gmap_custom_style', true );
		$gmap_marker_content = get_post_meta( get_the_ID(), wpgrade::prefix() . 'gmap_marker_content', true );
		$gmap_height         = get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_gmap_height', true );

		if ( empty( $gmap_height ) ) {
			$gmap_height = 'half-height'; //the default
		}

		// remove classes coming from default template's header height option
		$classes = str_replace(array('half-height', 'two-thirds-height', 'full-height'), '', $classes);
		$classes .= ' ' . $gmap_height;

		?>
		<header data-bully id="post-<?php the_ID() ?>-title" class="<?php echo esc_attr( $classes ); ?>">
			<div class="c-hero__background c-hero__layer" data-rellax data-rellax-container>
				<div data-rellax data-rellax-fill id="gmap-<?php the_ID() ?>" class="c-hero__map gmap"
					data-url="<?php esc_attr_e( $gmap_url ); ?>" <?php echo ( $gmap_custom_style == 'on' ) ? 'data-customstyle' : ''; ?>
					data-markercontent="<?php echo esc_attr( $gmap_marker_content ); ?>" data-pin_type="single"></div>
			</div>
		</header>
	<?php
	}
} elseif ( $pin_type == 'multiple' ) {
	//get the Google Maps URL to test if empty
	$gmap_urls = get_post_meta( get_the_ID(), 'gmap_urls', true );

	// we really need $$gmap_urls to have a location_url
	if ( ! empty( $gmap_urls ) && isset( $gmap_urls[1]['location_url'] ) && ! empty( $gmap_urls[1]['location_url'] ) ) {
		//set the global so everybody knows that we are in dire need of the Google Maps API
		$is_gmap = true;

		$gmap_custom_style   = get_post_meta( get_the_ID(), wpgrade::prefix() . 'gmap_custom_style', true );
		$gmap_marker_content = get_post_meta( get_the_ID(), wpgrade::prefix() . 'gmap_marker_content', true );
		$gmap_height         = get_post_meta( get_the_ID(), wpgrade::prefix() . 'page_gmap_height', true );

		if ( empty( $gmap_height ) ) {
			$gmap_height = 'half-height'; //the default
		}

		// remove classes coming from default template's header height option
		$classes = str_replace(array('half-height', 'two-thirds-height', 'full-height'), '', $classes);
		$classes .= ' ' . $gmap_height;

		//handle the pins
		$pins = '{';
		$count = count( $gmap_urls );
		$comma = ',';
		foreach ( $gmap_urls as $order => $pin ) {
			if ( $count == $order ) {
				$comma = '';
			}
			$pins .= '"' . $pin['name'] . '":"' . $pin['location_url'] . '"' . $comma;
		}
		$pins .= '}';
		?>
		<header data-bully id="post-<?php the_ID() ?>-title" class="<?php echo esc_attr( $classes ) ?>">
			<div class="c-hero__background c-hero__layer" data-rellax data-rellax-container>
				<div data-rellax data-rellax-fill id="gmap-<?php the_ID() ?>" class="c-hero__map gmap--multiple-pins"
					<?php echo ( $gmap_custom_style == 'on' ) ? 'data-customstyle' : ''; ?>
					 data-pins='<?php echo esc_attr( $pins ) ?>' data-pin_type="multiple"></div>
			</div>
		</header>
		<div class="js-map-pin  hidden">
			<img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/map-pin.png' ) ?>"/>
		</div>
	<?php
	}

} else {
	/* THEN TEST FOR SLIDESHOW PAGE TEMPLATE */

	$gallery_ids = get_post_meta( get_the_ID(), wpgrade::prefix() . 'main_gallery', true );

	if ( get_page_template_slug( get_the_ID() ) == 'page-templates/slideshow.php' && ! empty( $gallery_ids ) ) {
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

		if ( ! empty( $attachments ) ) { //let's grab the info regarding the slider

			$image_scale_mode     = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_image_scale_mode', true );
			$slider_visiblenearby = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_visiblenearby', true );
			$slider_transition    = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_transition', true );
			$slider_autoplay      = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_autoplay', true );


			if ( $slider_autoplay ) {
				$slider_delay = get_post_meta( get_the_ID(), wpgrade::prefix() . 'post_slider_delay', true );
			} ?>
			<header data-bully id="post-<?php the_ID() ?>-title" class="<?php echo $classes ?>">
				<div class="c-hero__background c-hero__layer" data-rellax data-rellax-container>
					<div class="c-hero__slider  js-pixslider"
					     data-rellax
						 data-rellax-fill
						 data-imagealigncenter
						 data-imagescale="<?php echo $image_scale_mode; ?>"
						 data-slidertransition="<?php echo $slider_transition; ?>"
						 data-customArrows="true"

						<?php
						if ( $slider_transition == 'move' ) {
							echo ' data-slidertransitiondirection="horizontal" ' . PHP_EOL;
						}
						if ( $slider_autoplay ) {
							echo ' data-sliderautoplay="" ' . PHP_EOL;
							echo ' data-sliderdelay="' . $slider_delay . '" ' . PHP_EOL;
						}
						if ( $slider_visiblenearby ) {
							echo ' data-visiblenearby ' . PHP_EOL;
						}

						if ( pixelgrade_option( 'slideshow_arrows_style' ) == 'hover' ) {
							echo ' data-hoverarrows ';
						} ?>
						>
						<?php
						$set_cover = false;

						foreach ( $attachments as $attachment ) {

							$full_img          = wp_get_attachment_image_src( $attachment->ID, 'full-size' );
							$attachment_fields = get_post_custom( $attachment->ID );

							// prepare the video url if there is one
							$video_url = ( isset( $attachment_fields['_video_url'][0] ) && ! empty( $attachment_fields['_video_url'][0] ) ) ? esc_url( $attachment_fields['_video_url'][0] ) : '';

							// should the video auto play?
							$video_autoplay = ( isset( $attachment_fields['_video_autoplay'][0] ) && ! empty( $attachment_fields['_video_autoplay'][0] ) && $attachment_fields['_video_autoplay'][0] === 'on' ) ? $attachment_fields['_video_autoplay'][0] : '';

							if ( true === $set_cover ) { ?>
								<div class="gallery-item cover" itemscope itemtype="http://schema.org/ImageObject"
									data-caption="<?php echo htmlspecialchars( $attachment->post_excerpt ) ?>"
									data-description="<?php echo htmlspecialchars( $attachment->post_content ) ?>">
									<img src="<?php echo $full_img[0]; ?>" class="attachment-blog-big rsImg"
										alt="<?php echo $attachment->post_excerpt; ?>" itemprop="contentURL"/>
								</div>
								<?php
								$set_cover = false;
							} else { ?>
								<div class="gallery-item<?php echo( ! empty( $video_url ) ? ' video' : '' );
								echo ( $video_autoplay == 'on' ) ? ' video_autoplay' : ''; ?>" itemscope
									itemtype="http://schema.org/ImageObject"
									data-caption="<?php echo htmlspecialchars( $attachment->post_excerpt ) ?>"
									data-description="<?php echo htmlspecialchars( $attachment->post_content ) ?>" <?php echo ( ! empty( $video_autoplay ) ) ? 'data-video_autoplay="' . $video_autoplay . '"' : ''; ?>>
									<img src="<?php echo $full_img[0]; ?>" class="attachment-blog-big rsImg"
										alt="<?php echo $attachment->post_excerpt; ?>"
										itemprop="contentURL" <?php echo ( ! empty( $video_url ) ) ? ' data-rsVideo="' . $video_url . '"' : ''; ?>  />
								</div>
							<?php }
						} ?>
					</div>
				</div>
				<?php if ( ! empty( $subtitle ) || ( ! empty( $title ) && $title !== ' ' ) || ! empty( $description ) ) { ?>
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
				<?php } ?>
			</header>
		<?php } else { ?>
			<div class="empty-slideshow">
				<?php esc_attr_e( 'Currently there are no images assigned to this slideshow', 'rosa' ); ?>
			</div>
		<?php }

	} else { /* OR REGULAR PAGE */
		if ( has_post_thumbnail() || ! empty( $subtitle ) || ( ! empty( $title ) && $title !== ' ' ) || ! empty( $description ) ) {
			if ( ! has_post_thumbnail() ) {
				$classes .= ' has-no-image';
			} ?>
			<header data-bully id="post-<?php the_ID() ?>-title" class="<?php echo $classes ?>" data-type="image">
				<?php if ( has_post_thumbnail() ) {
					$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full-size' );
					if ( ! empty( $image[0] ) ) { ?>
						<div class="c-hero__background c-hero__layer" data-rellax data-rellax-container>
							<img class="c-hero__image" data-rellax src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
						</div>
					<?php
					}
				}

				if ( ! empty( $subtitle ) || ( ! empty( $title ) && $title !== ' ' ) || ! empty( $description ) ) { ?>
					<div class="c-hero__wrapper">
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
				<?php } ?>
			</header>
		<?php } else { ?>
			<header data-bully id="post-<?php the_ID() ?>-title" class="<?php echo $classes ?>" style="display: none"></header>
		<?php }
	}
} ?>