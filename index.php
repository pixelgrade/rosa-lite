<?php
/**
 * The main template file.
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 * @package Rosa
 * @since   Rosa 1.0
 */

get_header(); ?>

	<section class="container  container--archive">
		<div class="page-content  archive">

			<?php rosa_the_archive_title(); ?>

			<?php
			//the categories dropdown
			if ( ! is_category() && ! is_tag() && ! is_search() ) :
				$categories = get_categories();
				if ( ! is_wp_error( $categories ) ) : ?>

					<div class="pix-dropdown  down  archive-filter">
						<a class="dropdown__trigger" href="#"><?php esc_html_e( 'Categories', 'rosa' ) ?></a>
						<ul class="dropdown__menu  nav  nav--banner">
							<?php foreach ( $categories as $category ) : ?>

								<li>
									<a href="<?php echo get_category_link( $category->term_id ); ?>" title="<?php echo esc_attr( sprintf( esc_html__( "View all posts in %s", 'rosa' ), $category->name ) ) ?>">
										<?php echo $category->cat_name; ?>
									</a>
								</li>

							<?php endforeach; ?>
						</ul>
					</div>

				<?php endif;
			endif;

			//first the sticky posts
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
						get_template_part( 'template-parts/post/loop-content/classic' );
					endwhile;

					wp_reset_postdata();
					wp_reset_query();
				}
			}

			if ( have_posts() ):

				while ( have_posts() ) : the_post();
					get_template_part( 'template-parts/content', get_post_format() );
				endwhile;

				rosa_the_posts_navigation();

			else :

				get_template_part( 'template-parts/content', 'none' );

			endif; // end if have_posts() ?>

		</div><!-- .page-content.archive -->
	</section><!-- .container.container--archive -->

<?php get_footer();
