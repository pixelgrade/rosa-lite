<?php if ( is_active_sidebar( 'sidebar-footer' ) ):
	$num         = wpgrade::option( 'footer_number_of_columns' );
	$cols_number = ( ! empty( $num ) ) ? $num : 3;

	$column_width = '';
	if ($cols_number == 1) {
		$column_width = wpgrade::option( 'footer_column_width' );
	}
	?>

	<div class="footer-widget-area  col-<?php echo $cols_number . '  ' . $column_width; ?>">
		<aside class="sidebar">
			<?php dynamic_sidebar( 'sidebar-footer' ); ?>
		</aside>
		<!-- .sidebar -->
	</div><!-- .grid__item -->
<?php endif;