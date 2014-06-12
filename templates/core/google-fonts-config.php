<?php defined( 'ABSPATH' ) or die;
/* @var array $families */

/**
 * Overwrite families with those served by redux ... they can give us fonts with all-styles included
 */
if ( class_exists('ReduxFramework_customizer_typography')) {
	global $redux;
	$typography = new ReduxFramework_customizer_typography( null, null, $redux );
	$families = $typography->makeGoogleWebfontString( $redux->typography ); ?>
	<script type="text/javascript">
		WebFont.load({ google: {families: [<?php echo ($families); ?>]} });
	</script>
<?php } else { // legacy compatibility ?>
	<script type="text/javascript">
		WebFont.load({
			google: {families: <?php echo json_encode($families); ?>}
		});
	</script>
<?php }
