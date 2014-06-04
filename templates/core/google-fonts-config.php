<?php defined( 'ABSPATH' ) or die;
/* @var array $families */
?>
<script type="text/javascript">
	var customFontsConfig = {
		google: {families: <?php echo json_encode($families); ?>}
	};
</script>