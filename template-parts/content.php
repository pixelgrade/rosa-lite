<?php
/**
 * Template to display the post in archives.
 *
 * @package Rosa Lite
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

//post thumb specific
$has_thumb = has_post_thumbnail();

$post_class_thumb = 'has-thumbnail';
if ( ! $has_thumb ) {
	$post_class_thumb = 'no-thumbnail';
} ?>

<article <?php post_class( 'article  article--archive ' . $post_class_thumb ); ?>>

    <?php if ( has_post_thumbnail() ) {
	    $image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium-size' );
	    if ( ! empty( $image[0] ) ) { ?>

		    <div class="article__featured-image">
			    <a href="<?php the_permalink(); ?>"><img src="<?php echo esc_url( $image[0] ); ?>"
			                                             alt="<?php the_title(); ?>"/></a>
		    </div>

	    <?php }
    } ?>

	<div class="article__body">

		<?php
		$date = get_the_time( get_option( 'date_format' ) );


			//we need to replace separators with our custom markup
			$date = str_replace( ', ', ' ', $date );
			$date = str_replace( '/ ', ' ', $date );
			$date = str_replace( '  ', ' ', $date );

			$date = str_replace( ' ', '<span class="date__dot"></span>', $date );

        ?>


		<header>
				<div class="article__date">
					<time class="published" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo $date ?></time>
				</div>

			<h2 class="article__title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
			<div class="separator separator--flower">&#10043;</div>
		</header>

		<section class="article__content">
			<?php echo rosa_lite_better_excerpt(); ?>
		</section>

		<a href="<?php the_permalink(); ?>" class="read-more-button"><?php esc_html_e( 'Read more', 'rosa-lite' ) ?></a>

	</div><!-- .article__body -->
</article>
