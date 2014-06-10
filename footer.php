<?php
/**
 * The template for displaying the footer widget areas.
 * @package Rosa
 * @since   Rosa 1.0
 **/
?>

			<footer class="site-footer">
				<a href="#" id="up-link" class="up-link"><?php _e( 'Top', wpgrade::textdomain() ) ?></a>
				<aside class="sidebar  sidebar--footer">
					<div class="container">
						<?php get_template_part( 'sidebar-footer' ); ?>
					</div>
				</aside>
				<!-- .sidebar.sidebar- -footer -->
				<div class="copyright-area">
					<div class="container">
						<span class="copyright-text">
							<?php echo wpgrade::option( 'copyright_text' ) ?>
						</span>
						<nav class="navigation  navigation--footer">
							<?php wpgrade_footer_nav(); ?>
						</nav>
					</div>
				</div>
				<!-- .copyright-area -->
			</footer><!-- .site- -footer -->
		</div><!-- #page -->
		<?php wp_footer(); ?>
	</body>
</html>