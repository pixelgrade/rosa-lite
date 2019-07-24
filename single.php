<?php
/**
 * The Template for displaying all single posts.
 *
 * @package Rosa Lite
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

get_header();

global $rosa_private_post;

if ( post_password_required() && ! $rosa_private_post['allowed'] ) {
	// Password protection
	get_template_part( 'template-parts/password-request-form' );
} else {
	$has_sidebar = false;
	if ( is_active_sidebar( 'sidebar-main' ) && pixelgrade_option( 'blog_single_show_sidebar', true ) ) {
		$has_sidebar = true;
	}

	$post_class_thumb = 'has-thumbnail';
	if ( ! has_post_thumbnail() ) {
		$post_class_thumb = 'no-thumbnail';
	} ?>

	<section class="container  container--single">
		<div id="content" class="page-content  has-sidebar">
			<?php if ( $has_sidebar ) { ?>
			<div class="page-content__wrapper">
			<?php }

			while ( have_posts() ) : the_post(); ?>
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'article-single  single-post ' . $post_class_thumb ) ?>>
					<header class="article__header">
						<h1 class="article__title" itemprop="name"><?php the_title(); ?></h1>
						<hr class="separator"/>

						<?php
						if ( has_post_thumbnail() ) {
							// Use a larger image size
							$thumbnail_size = 'large-size';
							if ( $has_sidebar ) {
								// Use a smaller image size
								$thumbnail_size = 'medium-size';
							} ?>

							<div class="article__featured-image" itemprop="image">
								<?php the_post_thumbnail( $thumbnail_size ); ?>
							</div>

							<?php
						} ?>

					</header><!-- .article__header -->

					<section class="article__content  js-post-gallery" itemprop="articleBody">
						<?php the_content(); ?>
					</section><!-- .article__content -->

					<footer class="article__footer  push--bottom">
						<?php
						global $multipage;

						if ( $multipage ) { ?>

							<div class="entry__meta-box  meta-box--pagination" role="navigation">
								<h2 class="screen-reader-text"><?php esc_html_e( 'Pages: ', 'rosa-lite' ); ?></h2>
								<?php
								$args = array(
									'before'           => '<nav class="nav pagination--single">',
									'after'            => '</nav>',
									'link_before'      => '<span>',
									'link_after'       => '</span>',
									'next_or_number'   => 'next_and_number',
									/* translators: The previous page link arrow.  */
									'previouspagelink' => esc_html__( '&laquo;', 'rosa-lite' ),
									/* translators: The next page link arrow.  */
									'nextpagelink'     => esc_html__( '&raquo;', 'rosa-lite' ),
								);
								wp_link_pages( $args );
								?>
							</div>

						<?php }

						$categories = get_the_category();
						if ( ! is_wp_error( $categories ) && ! empty( $categories ) ) { ?>

							<div class="meta--categories btn-list  meta-list">
								<span
									class="btn  btn--small  btn--secondary  list-head"><?php esc_html_e( 'Categories', 'rosa-lite' ) ?></span>
								<?php
								foreach ( $categories as $category ) {
									/* translators: %s: category name */
									echo '<a class="btn  btn--small  btn--tertiary" href="' . esc_url( get_category_link( $category->term_id ) ) . '" title="' . esc_attr( sprintf( __( 'View all posts in %s', 'rosa-lite' ), $category->name ) ) . '" rel="tag">' . esc_html( $category->name ) . '</a>';
								}; ?>
							</div><!-- .meta--categories -->

						<?php }

						$tags = get_the_tags();
						if ( ! is_wp_error( $tags ) && ! empty( $tags ) ) { ?>

							<div class="meta--tags  btn-list  meta-list">
								<span class="btn  btn--small  btn--secondary  list-head"><?php esc_html_e( 'Tags', 'rosa-lite' ) ?></span>
								<?php
								foreach ( $tags as $one_tag ) {
									/* translators: %s: tag name */
									echo '<a class="btn  btn--small  btn--tertiary" href="' . esc_url( get_tag_link( $one_tag->term_id ) ) . '" title="' . esc_attr( sprintf( __( 'View all posts tagged %s', 'rosa-lite' ), $one_tag->name ) ) . '" rel="tag">' . esc_html( $one_tag->name ) . '</a>';
								}; ?>
							</div><!-- .meta--tags -->

						<?php } ?>

						<hr class="separator"/>

						<?php if ( pixelgrade_option( 'blog_single_show_author_box', true ) ) {
							get_template_part( 'template-parts/author_bio' );
						} ?>

					</footer><!-- .article__footer -->

					<?php
					if ( function_exists( 'yarpp_related' ) ) {
						yarpp_related();
					}

					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					} ?>

				</article><!-- .article-single.single-post -->
			<?php
			endwhile;

			if ( $has_sidebar ) { ?>
			</div><!-- .page-content__wrapper -->
			<?php } ?>

		</div><!-- .page-content.has-sidebar -->

		<?php if ( $has_sidebar ) {
			get_template_part( 'sidebar' );
		} ?>

	</section><!-- .container.container--single -->
	<?php
}

get_footer();
