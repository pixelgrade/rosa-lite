<?php /*
Related Thumbnails
Author: John Godley
*/
?>

<?php if ($related_query->have_posts()):?>
	<h4 class="meta">You may be interested in:</h4>

	<ol class="related-posts">
		<?php while ($related_query->have_posts()) : $related_query->the_post(); ?>

			<li>
				<?php
					$img = '';
					if ( has_post_thumbnail() ) {
						$img = get_the_post_thumbnail( $post->ID, 'related-thumbnail', array( 'title' => $title, 'alt' => $title ) );
					}
					else {
						$attachments = get_children( array('post_parent' => $post->ID, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image',  'numberposts' => 1 ) );

						if ( count( $attachments ) > 0 ) {
							$img = array_shift( $attachments );
							$img = wp_get_attachment_image( $img->ID, 'related-thumbnail', true );
						}
					}

					$extra_class = '';
					if ( $img == '' ) {
						$img         = wp_html_excerpt( get_the_excerpt(), 40 );
						$extra_class = ' related-thumb-text';
					}
				?>
				<div class="related-post">
					<div class="related-thumb<?php echo $extra_class; ?>">
						<a href="<?php the_permalink() ?>" rel="bookmark">
							<?php echo $img; ?>
						</a>
					</div>
					
					<div class="related-title">
						<a href="<?php the_permalink() ?>" rel="bookmark">
							<?php the_title(); ?>
						</a>
					</div>
				</div>
			</li>

		<?php endwhile; ?>
	</ol>
	<div style="clear: both"></div>
	
<?php endif; ?>
