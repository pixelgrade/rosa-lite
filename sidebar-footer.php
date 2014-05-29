<?php if ( is_active_sidebar( 'sidebar-footer' ) ):

	$widgets_number = wpgrade::count_sidebar_widgets( 'sidebar-footer', false );

	if ( $widgets_number >= 3 ) {
		$widgets_number = 3;
	} ?>
	<div class="footer-widget-area  col-<?php echo $widgets_number; ?>">
		<aside class="sidebar">
			<?php dynamic_sidebar( 'sidebar-footer' ); ?>
		</aside>
		<!-- .sidebar -->
	</div><!-- .grid__item -->
<?php endif;