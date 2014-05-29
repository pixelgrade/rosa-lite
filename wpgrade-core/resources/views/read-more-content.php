<?php defined( 'ABSPATH' ) or die;
/* @var stdClass $post */
/* @var mixed $more_link */
/* @var mixed $more_link_text */
?>


<div>
	<a class="btn btn-primary excerpt-read-more"
		href="<?php echo get_permalink( wpgrade::lang_post_id( $post->ID ) ) ?>"
		title="<?php echo __( 'Read more about', wpgrade::textdomain() ) . ' ' . get_the_title( wpgrade::lang_post_id( $post->ID ) ) ?>">

		<?php echo __( 'Read more', wpgrade::textdomain() ) ?>

	</a>
</div>
