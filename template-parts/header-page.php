<?php
/**
 * This template handles the page headers with image and cover text
 *
 * @package Rosa Lite
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $page_section_idx, $header_height;

// Increment the page section number
$page_section_idx ++;

// Header general classes
$classes = 'c-hero  article__header  article__header--page';

// First lets get to know this page a little better
$header_height = 'full-height';
$classes .= ' ' . $header_height;

$subtitle = trim( get_post_meta( get_the_ID(), rosa_lite_prefix() . 'page_cover_subtitle', true ) );
//we need to mess with the subtitle a little bit - because it deserves it
//we need to wrap the first subtitle letter in a span so we can control it - height wise
if ( ! empty( $subtitle ) ) {
	$subtitle   = esc_html( $subtitle );
	$first_char = mb_substr( $subtitle, 0, 1 );
	$subtitle   = '<span class="first-letter">' . $first_char . '</span>' . mb_substr( $subtitle, 1 );
}

$page_title = get_post_meta( get_the_ID(), rosa_lite_prefix() . 'page_cover_title', true );
if ( empty( $page_title ) ) {
	//use the page title if empty
	$page_title = get_the_title();
}

if ( has_post_thumbnail() || ! empty( $subtitle ) || ( ! empty( $page_title ) && $page_title !== ' ' ) ) {
	if ( ! has_post_thumbnail() ) {
		$classes .= ' has-no-image';
	} ?>
	<header id="post-<?php the_ID() ?>-title" class="<?php echo esc_attr( $classes ); ?>" data-type="image">
		<?php if ( has_post_thumbnail() ) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full-size' );
			if ( ! empty( $image[0] ) ) { ?>
				<div class="c-hero__background c-hero__layer" data-rellax data-rellax-container>
					<img class="c-hero__image" data-rellax src="<?php echo esc_url( $image[0] ); ?>" alt="<?php esc_attr( get_the_title() ); ?>"/>
				</div>
				<?php
			}
		}

		if ( ! empty( $subtitle ) || ( ! empty( $page_title ) && $page_title !== ' ' ) ) { ?>
			<div class="c-hero__wrapper">
				<hgroup class="article__headline">
					<?php if ( ! empty( $subtitle ) ) {
						echo '<h2 class="headline__secondary">' . $subtitle . '</h2>' . "\n"; // phpcs:ignore
					} ?>
					<h1 class="headline__primary"><?php echo $page_title; // phpcs:ignore ?></h1>
				</hgroup>
			</div>
		<?php } ?>
	</header>
<?php } else { ?>
	<header id="post-<?php the_ID() ?>-title" class="<?php echo esc_attr( $classes ); ?>" style="display: none"></header>
<?php }
