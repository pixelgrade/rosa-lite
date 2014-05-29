<?php defined( 'ABSPATH' ) or die;
/* @var array $families */
?>

<script type="text/javascript">

	WebFontConfig = {
		google: {families: <?php echo json_encode($families); ?>}
	};
	(function () {
		var wf = document.createElement('script');
		wf.src = (document.location.protocol == 'https:' ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
	})();

</script>
