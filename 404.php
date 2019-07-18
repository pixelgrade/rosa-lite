<?php
/**
 * The template for displaying 404 pages (Not Found).

 */

get_header(); ?>
	<div class="content-404">
		<h1 class="hN"><?php esc_html_e( 'Whoops!', 'rosa-lite' ); ?></h1>

		<p class="description"><?php printf( esc_html__( "The page you're looking for could have been deleted or never have existed*", 'rosa-lite' ), home_url() ); ?></p>
		<a class="btn btn--primary btn--beta btn--large" href="<?php echo esc_url( home_url() ); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home">
			<?php printf( esc_html__( '&#8592; Return to the Home Page', 'rosa-lite' ), home_url() ); ?>
		</a>

	</div>
	<p class="description second"><?php printf( esc_html__( '*but you can hit space bar for another GIF', 'rosa-lite' ), home_url() ); ?></p>
	<div class="overlay overlay--color"></div>
	<div class="overlay overlay--shadow"></div>

<?php get_footer();