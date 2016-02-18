<?php
/**
 * Template part for displaying a message that posts cannot be found.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Gema
 */

if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>

	<p><?php printf( __( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'rosa' ), admin_url( 'post-new.php' ) ); ?></p>

<?php elseif ( is_search() ) : ?>

	<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with different keywords.', 'rosa' ); ?></p>
	<div class="search-form">
		<?php get_search_form(); ?>
	</div>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
<?php else : ?>

	<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'rosa' ); ?></p>
	<div class="search-form  search-form--404">
		<?php get_search_form(); ?>
	</div>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
<?php endif;
