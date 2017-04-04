<?php
/**
 * The Template for displaying all single posts.
 *
 */

get_header();

global $wpgrade_private_post;

if ( post_password_required() && ! $wpgrade_private_post['allowed'] ) :
	// password protection
	get_template_part( 'template-parts/password-request-form' );

else :
	$has_sidebar = false;
	if ( pixelgrade_option( 'blog_single_show_sidebar' ) ) {
		$has_sidebar = true;
	}

	//post thumb specific
	$has_thumb = has_post_thumbnail();

	$post_class_thumb = 'has-thumbnail';
	if ( ! $has_thumb ) {
		$post_class_thumb = 'no-thumbnail';
	}
	?>
	<section class="container  container--single">
		<div class="page-content  has-sidebar">
			<?php if ( $has_sidebar ) {
				echo '<div class="page-content__wrapper">';
			}

			while ( have_posts() ) : the_post(); ?>
				<article <?php post_class( 'article-single  single-post ' . $post_class_thumb ) ?>>
					<header class="article__header">
						<h1 class="article__title" itemprop="name"><?php the_title(); ?></h1>
						<hr class="separator"/>

						<?php
						if ( has_post_thumbnail() ):
							if ( pixelgrade_option( 'blog_single_show_sidebar' ) ) { //use a smaller image size
								$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium-size' );
							} else { //use a larger image size
								$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large-size' );
							}
							if ( ! empty( $image[0] ) ) : ?>
								<div class="article__featured-image" itemprop="image">
									<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
								</div>
							<?php endif;
						endif; ?>

					</header><!-- .article__header -->

					<section class="article__content  js-post-gallery" itemprop="articleBody">
						<?php the_content(); ?>
					</section><!-- .article__content -->

					<footer class="article__footer  push--bottom">
						<?php
						global $multipage;
						if ( $multipage ): ?>

							<div class="entry__meta-box  meta-box--pagination" role="navigation">
								<h2 class="screen-reader-text"><?php esc_html_e( 'Pages: ', 'rosa' ); ?></h2>
								<?php
								$args = array(
									'before'           => '<nav class="nav pagination--single">',
									'after'            => '</nav>',
									'link_before'      => '<span>',
									'link_after'       => '</span>',
									'next_or_number'   => 'next_and_number',
									'previouspagelink' => __( '&laquo;', 'rosa' ),
									'nextpagelink'     => __( '&raquo;', 'rosa' )
								);
								wp_link_pages( $args );
								?>
							</div>

						<?php endif;

						$categories = get_the_category();
						if ( ! is_wp_error( $categories ) && ! empty( $categories ) ): ?>

							<div class="meta--categories btn-list  meta-list">
								<span class="btn  btn--small  btn--secondary  list-head"><?php _e( 'Categories', 'rosa' ) ?></span>
								<?php
								foreach ( $categories as $category ) {
									echo '<a class="btn  btn--small  btn--tertiary" href="' . get_category_link( $category->term_id ) . '" title="' . esc_attr( sprintf( __( "View all posts in %s", 'rosa' ), $category->name ) ) . '" rel="tag">' . $category->name . '</a>';
								}; ?>
							</div><!-- .meta--categories -->

						<?php endif;

						$tags = get_the_tags();
						if ( ! empty( $tags ) ): ?>

							<div class="meta--tags  btn-list  meta-list">
								<span class="btn  btn--small  btn--secondary  list-head"><?php _e( 'Tags', 'rosa' ) ?></span>
								<?php
								foreach ( $tags as $tag ) {
									echo '<a class="btn  btn--small  btn--tertiary" href="' . get_tag_link( $tag->term_id ) . '" title="' . esc_attr( sprintf( __( "View all posts tagged %s", 'rosa' ), $tag->name ) ) . '" rel="tag">' . $tag->name . '</a>';
								}; ?>
							</div><!-- .meta--tags -->

						<?php endif; ?>

						<hr class="separator"/>
						<div class="grid">
							<div class="grid__item  lap-and-up-one-half">
								<?php
								if ( function_exists( 'display_pixlikes' ) ) {
									display_pixlikes();
								} ?>
							</div><!--
                         --><div class="grid__item  lap-and-up-one-half">

								<?php if ( pixelgrade_option( 'blog_single_show_share_links' ) ): ?>

									<div class="addthis_toolbox addthis_default_style addthis_32x32_style  add_this_list"
									     addthis:url="<?php echo rosa_get_current_canonical_url(); ?>"
									     addthis:title="<?php wp_title( '|', true, 'right' ); ?>"
									     addthis:description="<?php echo trim( strip_tags( get_the_excerpt() ) ); ?>">

										<?php get_template_part( 'template-parts/addthis-social-buttons' ); ?>

									</div>

								<?php endif; ?>

							</div>
						</div><!-- .grid -->

						<?php if ( pixelgrade_option( 'blog_single_show_author_box' ) ) {
							get_template_part( 'author-bio' );
						} ?>

					</footer><!-- .article__footer -->

					<?php if ( function_exists( 'yarpp_related' ) ) {
						yarpp_related();
					}

					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || '0' != get_comments_number() ) {
						comments_template();
					} ?>

				</article><!-- .article-single.single-post -->
			<?php
			endwhile;

			if ( $has_sidebar ) {
				echo '</div><!-- .page-content__wrapper -->';
			} ?>

		</div><!-- .page-content.has-sidebar -->

		<?php if ( $has_sidebar ) {
			get_template_part( 'sidebar' );
		} ?>

	</section><!-- .container.container--single -->
<?php
endif;

get_footer();
