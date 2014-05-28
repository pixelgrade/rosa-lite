<?php
/**
 * Template Name: Contact Page
 *
 * This is the template that is used for the contact page/section
 *
 * It is a page with additional controls for the Google Maps section
 *
 */

get_header();

?>

	<div id="main" class="content content--contact djax-updatable">
		<?php
		//get the Google Maps URL
		$gmap_url = get_post_meta(wpgrade::lang_page_id(get_the_ID()), wpgrade::prefix() . 'gmap_url', true);
		if ( !empty($gmap_url) ) {
			$gmap_custom_style = get_post_meta(wpgrade::lang_page_id(get_the_ID()), wpgrade::prefix() . 'gmap_custom_style', true);
			$gmap_marker_content = get_post_meta(wpgrade::lang_page_id(get_the_ID()), wpgrade::prefix() . 'gmap_maker_content', true);

			?>
			<div id="gmap" data-url="<?php esc_attr_e($gmap_url); ?>" <?php echo ($gmap_custom_style == 'on') ? 'data-customstyle' : ''; ?> data-markercontent="<?php echo esc_attr($gmap_marker_content); ?>"></div>
		<?php } ?>
		<div class="page-content entry__body">
			<div class="page-main">
				<?php while ( have_posts() ) : the_post(); ?>
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
						<header class="entry-header">
							<h1 class="entry__title"><?php the_title(); ?></h1>

							<div class="bleed--left">
								<hr class="separator separator--dotted grow">
							</div>
						</header>
						<div class="entry__content"><?php the_content(); ?></div>
					</article>
				<?php endwhile; ?>
			</div>
		</div>
		<!-- .page-content -->
	</div>

<?php get_footer();
