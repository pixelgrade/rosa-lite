<?php
$audio_embed = get_post_meta($post->ID, wpgrade::prefix().'audio_embed', true)
?>

<?php if( ! empty($audio_embed)): ?>
	<div class="article__featured-image">
		<?php echo stripslashes(htmlspecialchars_decode($audio_embed)) ?>
	</div>
<?php endif; ?>