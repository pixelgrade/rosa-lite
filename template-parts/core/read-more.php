<?php defined( 'ABSPATH' ) or die;
/* @var stdClass $post */
/* @var mixed $more */
?>

<div>
	<a class="btn btn-primary excerpt-read-more"
		href="<?php echo get_permalink( rosa::lang_post_id( $post->ID ) ) ?>"
		title="<?php echo __( 'Read more about', 'rosa' ) . ' ' . get_the_title( rosa::lang_post_id( $post->ID ) ) ?>">

		<?php echo __( 'Read more', 'rosa' ) ?>

	</a>
</div>