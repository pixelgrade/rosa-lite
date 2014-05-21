<?php

class wpgrade_popular_posts extends WP_Widget {

	protected $defaults;
	protected $popular_days = 0;
	private static $_days = 0;
	private static $_stats_enabled = false;
	private static $current_instance = null;
	const _tablename = 'popularpostsdata';

	function __construct(){

		/**
		 * Check if Jetpack is connected to WordPress.com and Stats module is enabled
		 */
		// Currently, this widget depends on the Stats Module
		if (
			( !defined( 'IS_WPCOM' ) || !IS_WPCOM )
			&&
			!function_exists( 'stats_get_csv' )
		) {
			self::$_stats_enabled = false;
		} else {
			self::$_stats_enabled = true;
		}

		/* Set up some default widget settings. */
		$this->defaults = array(
			'number' => 5,
			'thumb_size' => 45,
			'order' =>'pop',
			'days' => '60',
			'show_views' => '',
			'show_date' => '',
			'pop' => 'on',
			'popular_range' => 'all',
		);

		/* Widget settings. */
		$widget_ops = array(
			'classname' => 'wpgrade_popular_posts',
			'description' => __( 'This widget is the Tabs that classically goes into the sidebar. It contains the Popular posts, Latest Posts and Recent comments.', wpgrade::textdomain() )
		);

		/* Widget control settings. */
		$control_ops = array(
			'width' => 240,
			'height' => 300,
			'id_base' => 'wpgrade_popular_posts'
		);

		/* Create the widget. */
		parent::__construct( 'wpgrade_popular_posts', wpgrade::themename().' '.__('Popular Posts', wpgrade::textdomain() ), $widget_ops, $control_ops );

	}

	function update ( $new_instance, $old_instance ) {

		$defaults = $this->defaults;
		$instance = $old_instance;
		$instance['title'] = esc_attr( $new_instance['title'] );
		$instance['number'] = intval( $new_instance['number'] );

		return $instance;

	} // End update()

	function form( $instance ) {

		$instance = wp_parse_args( (array) $instance, $this->defaults );
		$title = isset( $instance['title'] ) ?esc_attr($instance['title']) : ''; ?>
		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', wpgradE::textdomain()); ?></label>
			<input type="text" name="<?php echo $this->get_field_name('title'); ?>"  value="<?php echo $title; ?>" class="widefat" id="<?php echo $this->get_field_id('title'); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'number' ); ?>"><?php _e( 'Number of posts:', wpgrade::textdomain() ); ?>
				<input class="widefat" id="<?php echo $this->get_field_id( 'number' ); ?>" name="<?php echo $this->get_field_name( 'number' ); ?>" type="text" value="<?php echo isset( $instance['number'] ) ? $instance['number'] : ''; ?>" />
			</label>
		</p>

		<?php if( !self::$_stats_enabled ) : ?>
			<div class="pptwj-require-error" style="background: #FFEBE8; border: 1px solid #c00; color: #333; margin: 1em 0; padding: 3px 5px; "><?php _e('Popular Posts tab requires the <a href="http://wordpress.org/extend/plugins/jetpack/" target="_blank">Jetpack plugin</a> to be activated and connected. It also requires the Jetpack Stats module to be enabled.', wpgrade::textdomain() ); ?></div>
		<?php endif; ?>

	<?php
	} // End form()

	function widget($args, $instance) {

		$instance = wp_parse_args( (array) $instance, $this->defaults );
		self::$current_instance = $instance;

		extract( $args );

		$number = isset( $instance['number'] ) ? $instance['number'] : 5;

		$filter_links = array(
			'daily' => __('Today', wpgrade::textdomain()),
			'weekly' => __('Week', wpgrade::textdomain()),
			'monthly' => __('Month', wpgrade::textdomain()),
			'all' => __('All', wpgrade::textdomain())
		);
		$thumb_size = 72;
		$data = array(
			'time' => '',
			'tab' => '',
			'numberposts' => $number,
			'thumb' => $thumb_size
		);

		$title = $instance['title'];
		echo $before_widget;

		/* If a title was input by the user, display it. */
		if ( !empty( $title ) ){
			echo $before_title . apply_filters( 'widget_title', $title, $instance, $this->id_base ) . $after_title;
		}

		echo self::showMostViewed( $number, $thumb_size );

		echo $after_widget;

	}

	/**
	 * Display most viewed
	 */
	static function showMostViewed( $posts = 5, $size = 45, $days = 'all' ) {
		global $post;

		$args = array(
			'limit' => $posts,
			'range' => $days
		);

		$popular = self::get_posts_by_wp_com( $args );

		ob_start();

		if( !$popular ):
			$message = !self::$_stats_enabled ? __('<a href="http://wordpress.org/extend/plugins/jetpack/" target="_blank">Jetpack plugin</a> with Stats module needs to be enabled.', wpgrade::textdomain()) : __('Sorry. No data yet.', wpgrade::textdomain());
			?>
			<span><?php echo $message; ?></span>
			<?php
			$contents = ob_get_contents();
			ob_end_clean();
			return $contents;
		endif;

		foreach($popular as $key => $p) :

			if ($size <> 0){
				$imageArgs = array(
					'size' => 'thumbnail',
					'image_class' => 'thumbnail',
					'format' => 'array',
					'default_image' => ''
				);

				$postImage = wpgrade_get_the_image($imageArgs, $p['id']);
			} ?>
			<article class="article  article--list">
				<a href="<?php echo $p['permalink']; ?>" title="<?php echo $p['title']; ?>" class="article--list__link">
					<?php if ( !empty( $postImage['src'] ) ){ ?>
						<div class="media__img  article__img  push-half--right">
							<img src="<?php echo $postImage['src']; ?>" alt="<?php echo $postImage['alt']; ?>" class="popular-posts-widget__img" />
						</div>
					<?php } ?>
					<div class="media__body">
						<span class="article__category"><?php 

						$category = get_the_category($p['id']);
						$currentcat = $category[0]->cat_name;

						echo $currentcat;
						?></span>
						<div class="article__title  article--list__title">
							<h4 class="hN"><?php echo $p['title']; ?></h4>
						</div>
					</div><!-- .media__body -->
				</a>
			</article><!-- .article- -list -->
			<?php endforeach;

		$contents = ob_get_contents();
		ob_end_clean();
		return $contents;
	}


	/**
	 * Uses data gathered by Jetpack stats and stored in WordPress.com servers
	 */
	static function get_posts_by_wp_com( $args ){

		if( !self::$_stats_enabled || !function_exists('stats_get_csv'))
			return array();

		$defaults = array(
			'limit' => 5,
			'range' => 'all', //daily|weekly|monthly|all
			'post_type' => 'post',
			'date_format' => get_option('date_format')
		);
		$args = wp_parse_args( (array) $args, $defaults );

		$limit = intval( $args['limit'] );

		/** TODO: limit $limit to 100? **/

		$days = 2;
		switch( $args['range'] ){
			case 'weekly':  $days = 7; break;
			case 'monthly': $days = 30; break;
			case 'daily' :  $days = 2; break; //make this 2 days to account for timezone differences
			case 'all':
			default:        $days = -1; break; //get all
		}

		/** we only limit to 50 posts. but change this if you want **/
		$top_posts = stats_get_csv( 'postviews', array( 'days' => $days, 'limit' => 50 ) );

		if( !$top_posts ){
			return array();
		}

		/** Store post_id into array **/
		$post_view_ids = array_filter( wp_list_pluck( $top_posts, 'post_id' ) );
		if ( !$post_view_ids ) {
			return array();
		}

		// cache
		get_posts( array( 'include' => join( ',', array_unique( $post_view_ids ) ) ) );

		// return posts list
		$posts = array();
		$counter = 0;
		foreach( $top_posts as $top_post ){

			//should only trigger for homepage
			if(empty($top_post['post_id']))
				continue;

			$post = get_post( $top_post['post_id'] );

			if ( !$post )
				continue;

			if( $args['post_type'] != $post->post_type )
				continue;

			$permalink = get_permalink( $post->ID );
			$postdate = date_i18n( $args['date_format'], strtotime( $post->post_date ) );
			$views = number_format_i18n( $top_post['views'] );

			if ( empty( $post->post_title ) ) {
				$title_source = $post->post_content;
				$title = wp_html_excerpt( $title_source, 50 );
				$title .= '&hellip;';
			} else {
				$title = $post->post_title;
			}

			$data = array(
				'title' => $title,
				'permalink' => $permalink,
				'views' => $views,
				'id' => $post->ID,
				'postdate' => $postdate
			);

			$posts[] = $data;
			$counter++;

			if( $counter == $limit )
				break;

		}

		return $posts;

	}

} // End Class

add_action('widgets_init', create_function('', 'return register_widget("wpgrade_popular_posts");'));
