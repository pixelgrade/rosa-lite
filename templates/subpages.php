<?php
/**
 * The template for displaying the subpages.

 */

global $post, $wpgrade_private_post;

$base_args = array(
	'hierarchical' => 0
);

//test if the current page has child pages
if ( rosa::page_has_children() ) {
	//get only the next level pages
	$args = array(
		'child_of' => $post->ID,
		'parent'   => $post->ID
	);

	$args = array_merge( $base_args, $args );

	$pages = get_pages( $args );

	foreach ( $pages as $page ) {
		setup_postdata( $page );

		if ( post_password_required() && ! $wpgrade_private_post['allowed'] ) {
			// password protection
			get_template_part( 'templates/password-request-form' );

		} else { ?>
			<article class="article--page  article--main">
				<header class="article__header">
					<?php if ( has_post_thumbnail() ):
						$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full-size' );
						if ( ! empty( $image[0] ) ): ?>
							<img src="<?php echo $image[0] ?>" alt="<?php the_title(); ?>"/>
						<?php endif;
					endif;?>
					<div class="flexbox">
						<div class="flexbox__item">
							<hgroup class="article__headline">
								<h1 class="headline__primary"><?php the_title(); ?></h1>
							</hgroup>
						</div>
					</div>
				</header>
				<?php if ( $page->post_cotent != "" ): ?>
					<section class="article__content">
						<div class="container">
							<section class="page__content  js-post-gallery  cf">
								<?php the_content(); ?>
							</section>
						</div>
					</section>
				<?php endif; ?>
			</article>
		<?php
		} // close if password protection

	}

	//reset to the main page
	wp_reset_postdata();

}