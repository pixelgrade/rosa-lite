<?php if (is_active_sidebar('sidebar-footer')):

	$col_number = '';

    ?>

	<div class="footer-widget-area  col-<?php echo $widgets_number; ?>">
		<aside class="sidebar">
		<?php dynamic_sidebar('sidebar-footer'); ?>
		</aside><!-- .sidebar -->
	</div><!-- .grid__item -->
<?php endif;