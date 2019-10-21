<?php
/**
 * Template to display the site branding.
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
} ?>

<div class="site-header__branding">
	<?php
	$custom_logo_id = get_theme_mod( 'custom_logo' );

	if ( $custom_logo_id ) {
		/*
		 * If the logo alt attribute is empty, get the site title and explicitly
		 * pass it to the attributes used by wp_get_attachment_image().
		 */
		$image_alt = get_post_meta( $custom_logo_id, '_wp_attachment_image_alt', true );
		if ( empty( $image_alt ) ) {
			$image_alt = get_bloginfo( 'name', 'display' );
		} ?>
		<div class="site-title site-title--image">
			<a class="site-logo  site-logo--image custom-logo-link" href="<?php echo esc_url( home_url() ); ?>" title="<?php bloginfo( 'name' ) ?>" rel="home">
				<img class="site-logo-img--light custom-logo" src="<?php echo esc_url( wp_get_attachment_image_url( $custom_logo_id, 'full' ) ); ?>" rel="logo" alt="<?php echo esc_attr( $image_alt ); ?>"/>
				<?php
				$inverted_logo_id = pixelgrade_option( 'main_logo_dark', false );
				if ( $inverted_logo_id ) {
					$inverted_image_alt = get_post_meta( $custom_logo_id, '_wp_attachment_image_alt', true );
					if ( empty( $inverted_image_alt ) ) {
						$inverted_image_alt = get_bloginfo( 'name', 'display' );
					} ?>
					<img class="site-logo-img--dark" src="<?php echo esc_url( wp_get_attachment_image_url( $inverted_logo_id, 'full' ) ); ?>" rel="logo-alt" alt="<?php echo esc_attr( $inverted_image_alt ); ?>"/>
				<?php } ?>
			</a>
		</div>
	<?php } else {

		if ( is_front_page() && is_home() ) { ?>
			<h1 class="site-title site-title--text">
				<a class="site-logo  site-logo--text" href="<?php echo esc_url( home_url() ); ?>" rel="home">
					<?php bloginfo( 'name' ) ?>
				</a>
			</h1> <?php
		} else { ?>
            <p class="site-title site-title--text">
                <a class="site-logo  site-logo--text" href="<?php echo esc_url( home_url() ); ?>" rel="home">
			        <?php bloginfo( 'name' ) ?>
                </a>
            </p>
	    <?php }
	} ?>
</div>
