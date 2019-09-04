<?php
/**
 * The template for displaying 404 pages (Not Found).
 */

if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

get_header(); ?>
	<div class="content-404">
		<h1 class="hN"><?php esc_html_e( 'Whoops!', 'rosa-lite' ); ?></h1>

		<p class="description"><?php esc_html_e( "The page you're looking for could have been deleted or never existed*", 'rosa-lite' ); ?></p>
		<a class="btn btn--primary btn--beta btn--large" href="<?php echo esc_url( home_url() ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" rel="home">
			<?php esc_html_e( '&#8592; Return to the Home Page', 'rosa-lite' ); ?>
		</a>

	</div>
	<div class="overlay overlay--color"></div>
	<div class="overlay overlay--shadow"></div>

<?php get_footer();
