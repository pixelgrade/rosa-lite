<?php
/**
 * The template for displaying the subpages.

 */

global $post, $wpgrade_private_post, $footer_needs_big_waves;

//test if the current page has child pages
if ( rosa::page_has_children() ) {
	//get only the next level pages
	$args = array(
		'hierarchical' => 0,
		'child_of'     => $post->ID,
		'parent'       => $post->ID,
		'sort_column'  => 'menu_order, ID',
	);

	$pages = get_pages( $args );

	foreach ( $pages as $post ) : setup_postdata( $post );
		if ( post_password_required() && ! $wpgrade_private_post['allowed'] ) {
			// password protection
			get_template_part( 'templates/password-request-form' );

		} else {
			get_template_part( 'templates/page/header' );

			$classes = "article--page article--main article--subpage";
			$style   = '';
//			$inverse_colors = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'inverse_section_colors', true );
//			if ($inverse_colors == 'on') {
//				$classes .= ' inverse-colors';
//
//				$text_color = wpgrade::option('text_color');
//				$background_color = wpgrade::option('content_background_color');
//
//				$style .= ' style="background-color: '.$text_color.'; color: '.$background_color.'" ';
//			}

			if ( get_page_template_slug( get_the_ID() ) == 'page-templates/contact.php' ) {
				//this is a gmap
				$border_style = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'gmap_border_style', true );
			} else {
				$border_style = get_post_meta( wpgrade::lang_page_id( get_the_ID() ), wpgrade::prefix() . 'page_border_style', true );
			}

			if ( ! empty( $border_style ) ) {
				$classes .= ' border-' . $border_style;
			}
			//make sure that no waves go unaccounted for
			$footer_needs_big_waves = false;

			if ( ! empty( $post->post_content ) ):
				//if the section has content, the footer definitely doesn't need waves
				$footer_needs_big_waves = false;
				?>
				<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>
					<section class="article__content" <?php echo $style ?>>
						<div class="container">
							<section class="page__content  js-post-gallery  cf">
								<?php the_content(); ?>
							</section>
						</div>
					</section>
				</article>
			<?php
			else :
				//if we have a section with no content and it has waves then maybe this will be the last one and should splash the footer
				if ( $border_style == 'waves' ) {
					$footer_needs_big_waves = true;
				}
			endif;
		} // close if password protection

	endforeach;

	//reset to the main page
	wp_reset_postdata();
}