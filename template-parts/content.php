<?php
/**
 * Template to display the post in archives
 */

//post thumb specific
$has_thumb = has_post_thumbnail();

$post_class_thumb = 'has-thumbnail';
if ( ! $has_thumb ) {
	$post_class_thumb = 'no-thumbnail';
} ?>

<article <?php post_class( 'article  article--archive ' . $post_class_thumb ); ?>>

    <?php if ( has_post_thumbnail() ):
	    $image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium-size' );
	    if ( ! empty( $image[0] ) ) : ?>

		    <div class="article__featured-image">
			    <a href="<?php the_permalink(); ?>"><img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/></a>
		    </div>

	    <?php endif;
    endif; ?>

	<div class="article__body">

		<?php
		$date = get_the_time( get_option( 'date_format' ) );

		if ( pixelgrade_option( 'blog_custom_date_separator' ) ) {
			//we need to replace separators with our custom markup
			$date = str_replace( ', ', ' ', $date );
			$date = str_replace( '/ ', ' ', $date );
			$date = str_replace( '  ', ' ', $date );

			$date = str_replace( ' ', '<span class="date__dot"></span>', $date );
		} ?>

		<header>

			<?php if ( pixelgrade_option( 'blog_show_date' ) ) : ?>

				<div class="article__date">
					<time class="published" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo $date ?></time>
				</div>

			<?php endif; ?>

			<h2 class="article__title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
			<div class="separator separator--flower">&#10043;</div>
		</header>

		<section class="article__content">
			<?php echo rosa_better_excerpt(); ?>
		</section>

		<?php
		$read_more = pixelgrade_option( 'blog_read_more_text' );
		if ( ! empty( $read_more ) ) : ?>
			<a href="<?php the_permalink(); ?>" class="read-more-button"><?php echo $read_more ?></a>
		<?php endif; ?>

	</div><!-- .article__body -->
</article>