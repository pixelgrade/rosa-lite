<?php

/*
 * The social icons widget
 */

class wpgrade_social_links_widget extends WP_Widget {

	public function __construct() {
		parent::__construct( 'wpgrade_social_links', wpgrade::themename() . ' ' . __( 'Social Links', 'rosa' ), array( 'description' => __( "Display the social links defined in the theme's options", 'rosa' ) ) );
	}

	function widget( $args, $instance ) {
		extract( $args );
		$title = apply_filters( 'widget_title', $instance['title'] );

		$social_links = wpgrade::option( 'social_icons' );
		$target       = '';
		if ( wpgrade::option( 'social_icons_target_blank' ) ) {
			$target = 'target="_blank"';
		}
		// Reset Post Data
		wp_reset_postdata();

		echo $before_widget;
		if ( ! empty( $social_links ) ): ?>
			<?php if ( $title ): echo $before_title . $title . $after_title; endif; ?>
			<div class="btn-list">
				<?php foreach ( $social_links as $domain => $icon ):
					if ( isset( $icon['value'] ) && isset( $icon['checkboxes']['widget'] ) ): $value = $icon['value']; ?>
						<a href="<?php echo $value ?>" <?php echo $target ?>>
							<i class="pixcode  pixcode--icon  icon-e-<?php echo $domain; ?>"></i>
						</a>
					<?php endif; endforeach ?>
			</div>
		<?php endif;
		echo $after_widget;
	}

	function update( $new_instance, $old_instance ) {
		$instance          = $old_instance;
		$instance['title'] = strip_tags( $new_instance['title'] );

		return $instance;
	}

	function form( $instance ) {
		! empty( $instance['title'] ) ? $title = esc_attr( $instance['title'] ) : $title = __( 'We Are Social', 'rosa' ); ?>

		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title', 'rosa' ); ?>
				:</label>
			<input id="<?php echo $this->get_field_id( 'title' ); ?>" class="widefat" type="text" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $title; ?>"/>
		</p>
	<?php
	}
}

add_action( 'widgets_init', create_function( '', 'return register_widget("wpgrade_social_links_widget");' ) );
