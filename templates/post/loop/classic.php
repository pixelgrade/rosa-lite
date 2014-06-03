<?php
/**
 * Loop Template Classic Full Width
 */

global $wp_query;

?>

<section class="container  container--archive">
	<div class="page-content  archive">
		<?php rosa::the_archive_title(); ?>

		<?php if ( ! is_category() && ! is_tag() && ! is_search() ) {
			get_template_part( 'templates/post/loop/categories-dropdown' );
		} ?>

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