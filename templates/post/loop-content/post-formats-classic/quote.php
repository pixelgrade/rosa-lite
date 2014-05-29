<?php
$quote              = get_post_meta( $post->ID, wpgrade::prefix() . 'quote', true );
$quote_author       = get_post_meta( $post->ID, wpgrade::prefix() . 'quote_author', true );
$quote_author_title = get_post_meta( $post->ID, wpgrade::prefix() . 'quote_author_title', true );

$featured_image = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );
?>

<a href="<?php the_permalink() ?>">
	<?php if ( ! empty( $quote ) ): ?>
		<blockquote>
			<p class="quote__content"><?php echo $quote ?></p>
			<?php if ( ! empty( $quote_author ) ): ?>
				<cite>
				<span class="author-block">
					<span class="author_name"><?php echo $quote_author; ?></span>
					<?php if ( ! empty( $quote_author_title ) ) {
						echo '<br/><span class="quote__author-title">' . $quote_author_title . '</span>';
					} ?>
				</span>
				</cite>
			<?php endif; ?>
		</blockquote>
		<div class="quote-bg-img" style="background-image: url('<?php echo $featured_image; ?>');"></div>
	<?php else: ?>
		<?php the_content(); ?>
	<?php endif; ?>
</a>