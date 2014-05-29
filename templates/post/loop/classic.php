<?php
/**
 * Loop Template Classic Full Width
 */

global $wp_query;

$has_sidebar = false;
if ( wpgrade::option( 'blog_show_sidebar' ) ) {
	$has_sidebar = true;
}

//lets figure out the classes needed for the content wrapper
$classes = 'blog-archive--classic';

//infinite scrolling
$mosaic_classes = '';
if ( wpgrade::option( 'blog_infinitescroll' ) ) {
	$mosaic_classes .= ' infinite_scroll';
	$classes .= ' inf_scroll';

	if ( wpgrade::option( 'blog_infinitescroll_show_button' ) ) {
		$mosaic_classes .= ' infinite_scroll_with_button';
	}
}
?>

<section class="container  container--archive">
	<div class="page-content  archive">
		<?php rosa::the_archive_title(); ?>

		<?php //first the sticky posts
		// get current page we are on. If not set we can assume we are on page 1.
		$current_page = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
		if ( is_front_page() && $current_page == 1 ) {
			$sticky = get_option( 'sticky_posts' );
			// check if there are any
			if ( ! empty( $sticky ) ) {
				// optional: sort the newest IDs first
				rsort( $sticky );
				// override the query
				$args = array(
					'post__in' => $sticky
				);
				query_posts( $args );
				// the loop
				while ( have_posts() ) : the_post();
					get_template_part( 'templates/post/loop-content/classic' );
				endwhile;

				wp_reset_postdata();
				wp_reset_query();
			}
		}
		?>
		<?php
		if ( have_posts() ):
			while ( have_posts() ) : the_post();
				get_template_part( 'templates/post/loop-content/classic' );
			endwhile;
			?>
			<!-- Pagination -->
			<?php echo wpgrade::pagination(); ?>
		<?php
		else:
			get_template_part( 'no-results' );
		endif; // end if have_posts()
		?>
	</div>
</section>