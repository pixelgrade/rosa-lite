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
            <svg class="blurp--bottom" width="192" height="61" x="0px" y="0px" viewBox="0 0 142.7 56.2">
                <path fill="#FFFFFF" d="M138.6,46.4c21.8,0-50.3,9.8-67.3,9.8s-89-10.8-67.2-10.8C42.6,45.4,42.3,0,70.8,0  C100.1,0,100.6,46.4,138.6,46.4z"/>
            </svg>
            <div class="btn--top">
                <a href="#" class="btn--top_text">
                    <span class="btn__arrow btn__arrow--top"></span>
                    <span class="btn__arrow btn__arrow--bottom"></span>
                </a>
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