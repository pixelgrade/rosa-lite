<?php defined( 'ABSPATH' ) or die;
/* @var array $families */
?>
<script type="text/javascript">
	WebFontConfig = {
		google: {families: <?php echo json_encode($families); ?>}
	};
</script>
