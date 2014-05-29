<?php
$quote              = get_post_meta( $post->ID, wpgrade::prefix() . 'quote', true );
$quote_author       = get_post_meta( $post->ID, wpgrade::prefix() . 'quote_author', true );
$quote_author_title = get_post_meta( $post->ID, wpgrade::prefix() . 'quote_author_title', true );
$quote_author_link  = get_post_meta( $post->ID, wpgrade::prefix() . 'quote_author_link', true );

$featured_image = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );
?>

<div class="article__featured-image">
	<div class="entry-content header-quote-content">
		<?php if ( ! empty( $quote ) ): ?>
			<blockquote class="quote--single-featured">
				<p class="quote__content"><?php echo $quote ?></p>
				<?php if ( ! empty( $quote_author ) ): ?>
					<cite>
						<?php if ( ! empty( $quote_author_link ) ): ?>
							<a class="author-block" href="<?php echo $quote_author_link ?>" target="_blank"
								title="<?php echo strtr( __( 'See more about :author', wpgrade::textdomain() ), array( ':author' => $quote_author ) ) ?>">
								<span class="author_name"><?php echo $quote_author ?></span>
								<?php if ( ! empty( $quote_author_title ) ) {
									echo '<br/><span class="quote__author-title">' . $quote_author_title . '</span>';
								} ?>
							</a>
						<?php else: # no author link ?>
							<div class="author-block">
								<span class="author_name"><?php echo $quote_author ?></span>
								<?php if ( ! empty( $quote_author_title ) ) {
									echo '<br/><span class="quote__author-title">' . $quote_author_title . '</span>';
								} ?>
							</div>
						<?php endif; ?>
					</cite>
				<?php endif; ?>
			</blockquote>
			<div class="quote-bg-img" style="background-image: url('<?php echo $featured_image; ?>');"></div>
		<?php endif; ?>
	</div>
</div>