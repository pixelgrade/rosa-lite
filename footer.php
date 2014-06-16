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

            if (!is_404()):
?>

            <div class="flexbox  flexbox--btn-top">
                <div class="flexbox__item  btn--top_left"><b></b></div>
                <div class="flexbox__item  btn--top_wrapper">
                    <div class="btn--top">
                        <div class="btn--top_overflow">
                            <div class="btn--top_contour"></div>
                        </div>
                        <a href="#" class="btn--top_text"><?php _e( 'Top', wpgrade::textdomain() ) ?></a>
                    </div>
                </div>
                <div class="flexbox__item  btn--top_right"><b></b></div>
            </div>
			<footer class="site-footer">
				<aside class="sidebar  sidebar--footer">
					<div class="container">
						<?php get_template_part( 'sidebar-footer' ); ?>
					</div>
				</aside>
				<!-- .sidebar.sidebar- -footer -->
				<div class="copyright-area">
					<div class="container">
                        <div class="flexbox">
                            <div class="flexbox__item">
                                <span class="copyright-text">
                                    <?php echo wpgrade::option( 'copyright_text' ) ?>
                                </span>
                            </div>
                            <div class="flexbox__item">
                                <nav class="navigation  navigation--footer">
                                    <?php wpgrade_footer_nav(); ?>
                                </nav>
                            </div>
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