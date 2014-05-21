<?php defined( 'ABSPATH' ) or die;
/* @var array $families */
?>
<script type="text/javascript">
	WebFont.load({
		google: {families: <?php echo json_encode($families); ?>}
	});
</script>