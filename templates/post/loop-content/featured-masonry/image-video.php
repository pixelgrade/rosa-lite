<?php
$video_embed = get_post_meta($post->ID, wpgrade::prefix().'video_embed', true);
?>

<?php if ( ! empty($video_embed)): ?>
	<div class="article__featured-image">
		<?php echo stripslashes(htmlspecialchars_decode($video_embed)) ?>
	</div>
<?php endif; ?>