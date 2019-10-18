<?php
/**
 * The main template file.
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 * @package Rosa Lite
 * @since   Rosa Lite 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

get_header(); ?>

	<section class="container  container--archive">
		<div id="content" class="page-content  archive">

			<?php rosa_lite_the_archive_title();

			// Display the categories dropdown
			if ( ! is_category() && ! is_tag() && ! is_search() ) {
				$categories = get_categories();
				if ( ! is_wp_error( $categories ) ) { ?>

					<div class="pix-dropdown  down  archive-filter">
						<div class="categories__menu">
							<a class="dropdown__trigger" href="#"><?php esc_html_e( 'Categories', 'rosa-lite' ) ?></a>
							<ul class="dropdown__menu  nav  nav--banner">
								<?php foreach ( $categories as $category ) { ?>

									<li>
										<a href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>" title="<?php
										/* translators: %s: category name */
										echo esc_attr( sprintf( __( 'View all posts in %s', 'rosa-lite' ), $category->name ) ) ?>"><?php echo esc_html( $category->cat_name ); ?></a>
									</li>

								<?php } ?>
							</ul>
						</div>

						<?php get_search_form(); ?>

					</div>

				<?php }
			}

			if ( have_posts() ) {

				while ( have_posts() ) : the_post();
					get_template_part( 'template-parts/content', get_post_format() );
				endwhile;

				the_posts_pagination();
			} else {

				get_template_part( 'template-parts/content', 'none' );
			} ?>

		</div><!-- .page-content.archive -->
	</section><!-- .container.container--archive -->

<?php get_footer();
