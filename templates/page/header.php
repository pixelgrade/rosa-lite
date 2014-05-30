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
//taken from the_content definition
$description = apply_filters( 'the_content', $description );
$description = str_replace( ']]>', ']]&gt;', $description );
?>
<header class="article__header">
	<?php
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
                <span class="separator  separator--line-flower">&#10043;<span class="arrows"></span></span>
				<?php if ( ! empty( $description ) ) {
					echo '<span class="headline__description">' . $description . '</span>';
				} ?>
			</hgroup>
		</div>
	</div>
	<?php endif; ?>
</header>