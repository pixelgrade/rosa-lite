<?php
/**
 * The template for displaying the footer widget areas.
 * @package Rosa
 * @since   Rosa 1.0
 **/

global $is_gmap;

if ( $is_gmap === true ) {
	//we definitely need the Google Maps API
	wp_enqueue_script( 'google-maps-api' );
}

if ( ! is_404() ):
	$footer_sidebar_style    = 'sidebar--footer__' . wpgrade::option( 'footer_sidebar_style' );
	$footer_bottom_bar_style = 'copyright-area__' . wpgrade::option( 'footer_bottombar_style' );
	?>

	<footer class="site-footer">
		<aside class="sidebar  sidebar--footer <?php echo $footer_sidebar_style ?>">
			<div class="container">
				<?php get_template_part( 'sidebar-footer' ); ?>
			</div>
		</aside>
		<!-- .sidebar.sidebar- -footer -->
		<div class="copyright-area <?php echo $footer_bottom_bar_style ?>">
			<div class="flexbox  flexbox--btn-top">
				<div class="flexbox__item  btn--top_left"><b></b></div>
				<div class="flexbox__item  btn--top_wrapper">
					<div class="btn--top">
						<div class="btn--top_overflow">
							<div class="btn--top_contour"></div>
						</div>
						<a href="#" class="btn--top_text"></a>
					</div>
				</div>
				<div class="flexbox__item  btn--top_right"><b></b></div>
			</div>
			<div class="container">
				<div class="footer-container">
					<?php $copyright_text = wpgrade::option( 'copyright_text' );
					if ( ! empty( $copyright_text ) ) : ?>
						<div class="copyright-text">
							<?php echo wpgrade::option( 'copyright_text' ) ?>
						</div>
					<?php endif;
					wpgrade_footer_nav( '<nav class="navigation  navigation--footer">', '</nav>' ); ?>

				</div>
			</div>
		</div>
		<!-- .copyright-area -->
	</footer><!-- .site- -footer -->

<?php endif; ?>

</div><!-- #page -->
<?php wp_footer(); ?>
</body>
</html>