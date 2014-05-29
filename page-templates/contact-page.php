<?php
/**
 * Template Name: Contact Page
 * This is the template that is used for the contact page/section
 * It is a page with additional controls for the Google Maps section

 */

get_header();

?>
<section class="content  content--single-page">
	<?php while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class( "article--page  article--main" ); ?>>
			<header class="article__header">
				<?php
				//get the Google Maps URL
				$gmap_url = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_url', true );
				if ( ! empty( $gmap_url ) ) :
					$gmap_custom_style   = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_custom_style', true );
					$gmap_marker_content = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_maker_content', true );

					?>
					<div id="gmap"
					     data-url="<?php esc_attr_e( $gmap_url ); ?>" <?php echo ( $gmap_custom_style == 'on' ) ? 'data-customstyle' : ''; ?>
					     data-markercontent="<?php echo esc_attr( $gmap_marker_content ); ?>"></div>
				<?php endif; ?>
			</header>
			<section class="article__content">
				<div class="container">
					<section class="page__content  js-post-gallery  cf">
						<h1 class="entry__title"><?php the_title(); ?></h1>
						<?php the_content(); ?>
					</section>
				</div>
			</section>
		</article>
		<?php get_template_part( 'templates/subpages' ); ?>
		<?php
		//comments
		if ( comments_open() || '0' != get_comments_number() ): ?>
			<div class="container">
				<?php comments_template(); ?>
			</div>
		<?php endif; ?>
	<?php endwhile; ?>
</section>

<?php get_footer();
