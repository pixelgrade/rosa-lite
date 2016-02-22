<?php
/**
 * The template for displaying Author bios.
 */
?>
<hr class="separator"/>
<aside class="author" itemscope itemtype="http://schema.org/Person">
	<div class="author__avatar">
		<?php echo '<img src="' . rosa_get_avatar_url( get_the_author_meta( 'email' ), '80' ) . '" itemprop="image" alt="avatar" />'; ?>
	</div>
	<div class="author__text">
		<div class="author__title">
			<h3 class="accessibility"><?php _e( 'Author', 'rosa' ); ?></h3>
			<h4><span itemprop="name"><?php rosa_the_author_posts_link(); ?></span></h4>
		</div>
		<p class="author__bio" itemprop="description"><?php the_author_meta( 'description' ); ?></p>
		<ul class="author__social-links">
			<?php if ( get_the_author_meta( 'url' ) ): ?>
				<li class="author__social-links__list-item">
					<a class="author__social-link" href="<?php echo get_the_author_meta( 'url' ) ?>" target="_blank"><i class="icon-home"></i><?php _e( 'Website', 'rosa' ); ?>
					</a>
				</li>
			<?php endif;
			if ( get_the_author_meta( 'user_tw' ) ): ?>
				<li class="author__social-links__list-item">
					<a class="author__social-link" href="https://twitter.com/<?php echo get_the_author_meta( 'user_tw' ) ?>" target="_blank"><i class="icon-twitter"></i>Twitter</a>
				</li>
			<?php endif;
			if ( get_the_author_meta( 'user_fb' ) ): ?>
				<li class="author__social-links__list-item">
					<a class="author__social-link" href="https://www.facebook.com/<?php echo get_the_author_meta( 'user_fb' ) ?>" target="_blank"><i class="icon-facebook"></i>Facebook</a>
				</li>
			<?php endif;
			if ( get_the_author_meta( 'google_profile' ) ): ?>
				<li class="author__social-links__list-item">
					<a class="author__social-link" href="<?php echo get_the_author_meta( 'google_profile' ) ?>" target="_blank"><i class="icon-google-plus"></i>Google+</a>
				</li>
			<?php endif; ?>
		</ul>
	</div>
</aside>
<hr class="separator"/>