<?php
/**
 * The template for displaying the subpages.

 */

global $post, $wpgrade_private_post;

//test if the current page has child pages
if ( rosa::page_has_children() ) {
	//get only the next level pages
	$args = array(
		'hierarchical' => 0,
		'child_of'     => $post->ID,
		'parent'       => $post->ID,
		'sort_column' => 'menu_order, ID',
	);

	$pages = get_pages( $args );

	foreach ( $pages as $post ) : setup_postdata( $post );
		if ( post_password_required() && ! $wpgrade_private_post['allowed'] ) {
			// password protection
			get_template_part( 'templates/password-request-form' );

		} else {
			get_template_part( 'templates/page/header' );

			$classes = "article--page article--main article--subpage";
			$style = '';
//			$inverse_colors = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'inverse_section_colors', true );
//			if ($inverse_colors == 'on') {
//				$classes .= ' inverse-colors';
//
//				$text_color = wpgrade::option('text_color');
//				$background_color = wpgrade::option('content_background_color');
//
//				$style .= ' style="background-color: '.$text_color.'; color: '.$background_color.'" ';
//			}

			$border_style = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_border_style', true );
			if ( !empty($border_style) ) {
				$classes .= ' border-' . $border_style;
			}
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>
				<?php if ( $post->post_content != "" ): ?>
					<section class="article__content" <?php echo $style ?>>
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

	endforeach;

	//reset to the main page
	wp_reset_postdata();
}