<?php defined( 'ABSPATH' ) or die;
/** @var array $error_messages */
?>

<h3>Error while trying to analyse download options!</h3>

<p>The system has encountered some error while trying to analyse download for the theme:</p>

<ul style="list-style-type: square; padding: 0 25px">
	<?php foreach ( $error_messages as $error ): ?>
		<li><?php echo $error ?></li>
	<?php endforeach; ?>
</ul>

<hr/>

<p><i>If you continue to experience problems, please refer to the included documentation or contact support.</i></p>
