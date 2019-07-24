<?php
/**
 * The template for displaying the footer widget areas.
 * @package Rosa Lite
 * @since   Rosa Lite 1.0.0
 **/

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

if ( ! is_404() ) {
    $footer_sidebar_style = 'sidebar--footer__' . pixelgrade_option( 'footer_sidebar_style', 'dark' );
	$footer_bottom_bar_style = 'copyright-area__' . pixelgrade_option( 'footer_bottombar_style', 'dark' ); ?>

	<footer class="site-footer">
		<div class="copyright-area <?php echo esc_attr( $footer_bottom_bar_style ); ?>">
			<svg class="blurp--bottom" width="192" height="61" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 160.7 61.5" enable-background="new 0 0 160.7 61.5" xml:space="preserve"><path fill="#FFFFFF" d="M80.3,61.5c0,0,22.1-2.7,43.1-5.4s41-5.4,36.6-5.4c-21.7,0-34.1-12.7-44.9-25.4S95.3,0,80.3,0c-15,0-24.1,12.7-34.9,25.4S22.3,50.8,0.6,50.8c-4.3,0-6.5,0,3.5,1.3S36.2,56.1,80.3,61.5z"/></svg>
			<div class="btn--top">
				<a href="#" class="btn--top_text">
					<span class="btn__arrow btn__arrow--top"></span>
					<span class="btn__arrow btn__arrow--bottom"></span>
				</a>
			</div>
			<div class="container">
				<div class="footer-container">
					<?php
					rosa_lite_footer_the_copyright();

					$theme_locations = get_nav_menu_locations();
					if ( isset( $theme_locations['footer_menu'] ) && ( $theme_locations['footer_menu'] != 0 ) ) {
						wp_nav_menu( array(
							'theme_location' => 'footer_menu',
							'menu'           => '',
							'container'      => '',
							'container_id'   => '',
							'menu_class'     => 'nav--footer',
							'fallback_cb'    => false,
							'menu_id'        => '',
							'depth'          => 1,
							'items_wrap'     => '<nav class="navigation  navigation--footer"><ul id="%1$s" class="%2$s  nav">%3$s</ul></nav>',
						) );
					} ?>
				</div>
			</div>
		</div><!-- .copyright-area -->
	</footer><!-- .site--footer -->

<?php } ?>

<div class="covers"></div>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
