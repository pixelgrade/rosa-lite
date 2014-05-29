<?php

/**
 * Class wpgrade_latest_comments
 */
class wpgrade_latest_comments extends WP_Widget {

	function __construct() {
		$widget_ops = array( 'classname'   => 'widget--latest-comments',
		                     'description' => __( 'The latest comments', wpgrade::textdomain() )
		);
		parent::__construct( 'recent-comments', wpgrade::themename() . ' ' . __( 'Latest Comments', wpgrade::textdomain() ), $widget_ops );
		$this->alt_option_name = 'widget_recent_comments';

		add_action( 'comment_post', array( $this, 'flush_widget_cache' ) );
		add_action( 'transition_comment_status', array( $this, 'flush_widget_cache' ) );
	}

	function flush_widget_cache() {
		wp_cache_delete( 'widget_recent_comments', 'widget' );
	}

	function widget( $args, $instance ) {
		global $comments, $comment;

		$cache = wp_cache_get( 'widget_recent_comments', 'widget' );

		if ( ! is_array( $cache ) ) {
			$cache = array();
		}

		if ( ! isset( $args['widget_id'] ) ) {
			$args['widget_id'] = $this->id;
		}

		if ( isset( $cache[ $args['widget_id'] ] ) ) {
			echo $cache[ $args['widget_id'] ];

			return;
		}

		extract( $args, EXTR_SKIP );
		$output = '';

		$title  = ( ! empty( $instance['title'] ) ) ? $instance['title'] : __( 'Recent Comments', wpgrade::textdomain() );
		$title  = apply_filters( 'widget_title', $title, $instance, $this->id_base );
		$number = ( ! empty( $instance['number'] ) ) ? absint( $instance['number'] ) : 5;
		if ( ! $number ) {
			$number = 5;
		}

		$comments = get_comments( apply_filters( 'widget_comments_args', array( 'number'      => $number,
		                                                                        'status'      => 'approve',
		                                                                        'post_status' => 'publish'
				) ) );
		$output .= $before_widget;
		if ( $title ) {
			$output .= $before_title . $title . $after_title;
		}

		if ( $comments ) {
			// Prime cache for associated posts. (Prime post term cache if we need it for permalinks.)
			$post_ids = array_unique( wp_list_pluck( $comments, 'comment_post_ID' ) );
			_prime_post_caches( $post_ids, strpos( get_option( 'permalink_structure' ), '%category%' ), false );

			foreach ( (array) $comments as $comment ) {
				if ( isset( $comment->post_password ) && ! empty( $comment->post_password ) ) {
					continue;
				}
				ob_start(); ?>
				<article class="latest-comments__list">
					<div class="media__body  latest-comments__body">
						<div class="comment__meta">
							<a class="latest-comments__author" href="<?php echo get_comment_author_url() ?>"><?php echo $comment->comment_author; ?></a>
							on
							<a class="latest-comments__title" href="<?php echo $comment->guid; ?>"><?php echo $comment->post_title; ?></a>
						</div>
						<div class="latest-comments__content">
							<a href="<?php echo $comment->guid; ?>">
								<p><?php echo rosa::limit_words( strip_tags( get_comment_text( $comment->comment_ID ) ), 25, ' [&hellip;]' ); ?></p>
							</a>
						</div>
					</div>
				</article>
				<?php
				$output .= ob_get_clean();
			}
		}
		$output .= $after_widget;

		echo $output;
		$cache[ $args['widget_id'] ] = $output;
		wp_cache_set( 'widget_recent_comments', $cache, 'widget' );
	}

	function update( $new_instance, $old_instance ) {
		$instance           = $old_instance;
		$instance['title']  = strip_tags( $new_instance['title'] );
		$instance['number'] = absint( $new_instance['number'] );
		$this->flush_widget_cache();

		$alloptions = wp_cache_get( 'alloptions', 'options' );
		if ( isset( $alloptions['widget_recent_comments'] ) ) {
			delete_option( 'widget_recent_comments' );
		}

		return $instance;
	}

	function form( $instance ) {
		$title  = isset( $instance['title'] ) ? esc_attr( $instance['title'] ) : '';
		$number = isset( $instance['number'] ) ? absint( $instance['number'] ) : 5; ?>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', wpgrade::textdomain() ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo $title; ?>"/>
		</p>

		<p>
			<label for="<?php echo $this->get_field_id( 'number' ); ?>"><?php _e( 'Number of comments to show:', wpgrade::textdomain() ); ?></label>
			<input id="<?php echo $this->get_field_id( 'number' ); ?>" name="<?php echo $this->get_field_name( 'number' ); ?>" type="text" value="<?php echo $number; ?>" size="3"/>
		</p>
	<?php
	}
}

add_action( 'widgets_init', create_function( '', 'return register_widget("wpgrade_latest_comments");' ) );