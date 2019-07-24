<?php
/**
 * The template for displaying Author bios.
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}
?>
<aside class="author" itemscope itemtype="https://schema.org/Person">
	<div class="author__avatar">
		<?php echo get_avatar( get_the_author_meta( 'user_email' ), 80 ); ?>
	</div>
	<div class="author__text">
		<div class="author__title">
			<h3 class="accessibility"><?php esc_html_e( 'Author', 'rosa-lite' ); ?></h3>
			<h4><span itemprop="name"><?php the_author_posts_link(); ?></span></h4>
		</div>
		<p class="author__bio" itemprop="description"><?php the_author_meta( 'description' ); ?></p>

		<?php rosa_lite_author_bio_links(); ?>

	</div>
</aside>
<hr class="separator"/>
