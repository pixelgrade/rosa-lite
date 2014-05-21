<?php
/**
 * The template for displaying the footer widget areas.
 * @package Rosa
 * @since   Rosa 1.0
**/ ?>
				</section><!-- .content -->
				<footer class="site-footer">
					<h2 class="accessibility"><?php __('Footer', wpgrade::textdomain()) ?></h2>
					<div class="footer-menu">
						<nav class="navigation  navigation--footer">
							<?php wpgrade_footer_nav(); ?>
						</nav>
					</div>
					<div class="copyright-text">
						<span><?php echo wpgrade::option('copyright_text') ?></span>
					</div>

					<?php get_template_part('sidebar-footer'); ?>

				</footer><!-- .site-footer -->
			</div><!-- .container -->
		</div><!-- .wrapper -->
		<?php wp_footer(); ?>

	</body>
</html>