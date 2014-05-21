<?php 
/**
 * The template for displaying 404 pages (Not Found).
 *
 */

get_header(); ?>
<div class="content-404">
	<h1 class="hN"><?php _e( 'Whoops!', wpgrade::textdomain() ); ?></h1>
	<p class="description"><?php printf( __( 'The page you’re looking for could have been deleted or never have existed*', wpgrade::textdomain() ), home_url()); ?></p>
	<a class="btn btn--primary btn--beta btn--large" href="<?php echo home_url(); ?>" title="<?php bloginfo('name') ?>" rel="home">
		<?php printf( __( '&#8592; Return to the Home Page', wpgrade::textdomain() ), home_url()); ?>
	</a>

</div>
<p class="description second"><?php printf( __( '*but you can hit space bar for another GIF', wpgrade::textdomain() ), home_url()); ?></p>
<div class="overlay overlay--color"></div>
<div class="overlay overlay--shadow"></div>
  
<?php get_footer();