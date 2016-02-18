<?php
/**
 * Theme utility functions.
 * @package        wpgrade
 * @category       core
 * @author         Pixel Grade Team
 */
class rosa {

	static protected $prefix = '_rosa_';
	static protected $shortname = 'rosa';

	/**
	 * Display the comments number
	 */
	static function comments_number() {

		$num_comments = self::get_comments_number();

		echo (int) $num_comments;

	}

	/**
	 * Get the number of comments for the current posts
	 * This needs to be inside a loop
	 * @return int
	 */
	static function get_comments_number() {
		return get_comments_number(); // get_comments_number returns only a numeric value
	}

	/**
	 * Checks if a post type object needs password aproval
	 * @return if the form was submited it returns an array with the success status and a message
	 */

	static function is_password_protected() {
		global $post;
		$private_post = array( 'allowed' => false, 'error' => '' );

		if ( isset( $_POST['submit_password'] ) ) { // when we have a submision check the password and its submision
			if ( isset( $_POST['submit_password_nonce'] ) && wp_verify_nonce( $_POST['submit_password_nonce'], 'password_protection' ) ) {
				if ( isset ( $_POST['post_password'] ) && ! empty( $_POST['post_password'] ) ) { // some simple checks on password
					// finally test if the password submitted is correct
					if ( $post->post_password === $_POST['post_password'] ) {
						$private_post['allowed'] = true;

						// ok if we have a correct password we should inform wordpress too
						// otherwise the mad dog will put the password form again in the_content() and other filters
						global $wp_hasher;
						if ( empty( $wp_hasher ) ) {
							require_once( ABSPATH . 'wp-includes/class-phpass.php' );
							$wp_hasher = new PasswordHash( 8, true );
						}
						setcookie( 'wp-postpass_' . COOKIEHASH, $wp_hasher->HashPassword( stripslashes( $_POST['post_password'] ) ), 0, COOKIEPATH );

					} else {
						$private_post['error'] = '<h4 class="text--error">Wrong Password</h4>';
					}
				}
			}
		}

		if ( isset( $_COOKIE[ 'wp-postpass_' . COOKIEHASH ] ) && get_permalink() == wp_get_referer() ) {
			$private_post['error'] = '<h4 class="text--error">Wrong Password</h4>';
		}


		return $private_post;
	}

	/** Limit words for a string */

	static function limit_words( $string, $word_limit, $more_text = ' [&hellip;]' ) {
		$words  = explode( " ", $string );
		$output = implode( " ", array_splice( $words, 0, $word_limit ) );

		//check fi we actually cut something
		if ( count( $words ) > $word_limit ) {
			$output .= $more_text;
		}

		return $output;
	}

	static function get_post_format_first_image_src() {
		global $post;
		$first_img = '';
		ob_start();
		ob_end_clean();
		$output    = preg_match_all( '/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches );
		$first_img = $matches[1][0];

		if ( empty( $first_img ) ) { //Defines a default image
			$first_img = rosa::uri( "/assets/img/default.jpg" );
		}

		return $first_img;
	}

	/**
	 * Returns the URL from the post.
	 * Falls back to the post permalink if no URL is found in the post.
	 * @return string The Link format URL.
	 */
	static function get_content_link_url() {
		$content = get_the_content();
		$has_url = get_url_in_content( $content );

		return ( $has_url ) ? $has_url : apply_filters( 'the_permalink', get_permalink() );
	}

	static function featured_image_as_style_bg( $size = 'full', $additional_css = '' ) {

		global $post;

		if ( has_post_thumbnail( $post->ID ) ) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), $size );
			if ( ! empty( $image[0] ) ) {
				$style = ' style="background-image: url(' . $image[0] . '); ' . $additional_css . '"';

				return $style;
			}
		}

		return '';
	}

	static function get_gallery_type( $post_id ) {

		$template = get_post_meta( $post_id, rosa::prefix() . 'gallery_template', true );

		if ( $template == 'slideshow' ) {
			return $template;
		} else {
			return get_post_meta( $post_id, rosa::prefix() . 'grid_thumbnails', true );
		}

		return '';
	}

	/**
	 * Display a filter box for the given taxonomy
	 *
	 * @param $taxonomy_name string
	 */

	static function display_filter_box( $taxonomy_name, $style = 'horizontal' ) {

		// Custom post archive Filter Button
		$filter_categories = get_terms( $taxonomy_name );
		if ( ! empty( $filter_categories ) && ! is_wp_error( $filter_categories ) ) {
			?>
			<div class="flexbox  archive-categories-wrapper">
				<div class="flexbox__item">
					<?php if ( $style == 'dropdown' ) : ?>
						<div class="pix-dropdown  up  border-menu">
							<a class="dropdown__trigger" href="#"><?php echo __( 'Filter', 'rosa' ) ?>
								<span class="arrow"></span></a>
							<ul class="dropdown__menu  nav  nav--banner  archive-categories-list  border-menu">
								<?php foreach ( $filter_categories as $key => $category ) { ?>
									<li class="category-item archive__filter-item">
										<a href="#" title="<?php echo sprintf( __( "View all in %s", 'rosa' ), $category->name ); ?>" data-filter="<?php echo '.cat-' . $category->slug; ?>"><?php echo $category->name; ?></a>
									</li>
								<?php } ?>
								<li class="category-item archive__filter-item" data-filter="all">
									<a href="#" title="<?php echo __( 'View all', 'rosa' ) ?>" data-filter="*"><?php _e( 'View All', 'rosa' ); ?></a>
								</li>
							</ul>
						</div>
					<?php else: ?>
						<ul class="dropdown__menu  nav  nav--banner  archive-categories-list  border-menu">
							<?php foreach ( $filter_categories as $key => $category ) { ?>
								<li class="category-item archive__filter-item">
									<a href="#" title="<?php echo sprintf( __( "View all in %s", 'rosa' ), $category->name ); ?>" data-filter="<?php echo '.cat-' . $category->slug; ?>"><?php echo $category->name; ?></a>
								</li>
							<?php } ?>
							<li class="category-item archive__filter-item" data-filter="all">
								<a href="#" title="<?php echo __( 'View all', 'rosa' ) ?>" data-filter="*"><?php _e( 'View All', 'rosa' ); ?></a>
							</li>
						</ul>
					<?php endif; ?>
				</div>
			</div>
		<?php
		}
	}

	static function get_terms_as_string( $taxonomy_name, $field = 'name', $separator = ' ' ) {

		$return = '';
		$terms  = get_terms( $taxonomy_name );
		$last   = count( $terms );

		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $key => $term ) {

				if ( $field == 'name' ) {
					$return .= $term->name;
				} elseif ( $field == 'slug' ) {
					$return .= $term->slug;
				} else {
					continue;
				}

				if ( $last != $key ) {
					$return .= $separator;
				}
			}
		}

		return $return;
	}

	static function get_edit_url() {
		global $wp_the_query;
		$current_object = $wp_the_query->get_queried_object();

		$theID = false;
		if ( ! empty( $current_object->post_type ) && ( $post_type_object = get_post_type_object( $current_object->post_type ) ) && current_user_can( 'edit_post', $current_object->ID ) && $post_type_object->show_ui && $post_type_object->show_in_admin_bar ) {
			$theID = $current_object->ID;
		} elseif ( ! empty( $current_object->taxonomy ) && ( $tax = get_taxonomy( $current_object->taxonomy ) ) && current_user_can( $tax->cap->edit_terms ) && $tax->show_ui ) {
			$theID = $current_object->term_id;
		}

		if ( $theID ) {
			return get_edit_post_link( $theID );
		}

		return '';
	}

	/**
	 * We check if there is a gallery meta data, then a gallery shortcode in the content, extract it and
	 * display it in the form of a slideshow.
	 */
	static function gallery_slideshow( $current_post, $template = null, $size = 'medium-size' ) {
		if ( $template === null ) {

			$image_scale_mode     = get_post_meta( $current_post->ID, rosa::prefix() . 'post_image_scale_mode', true );
			$slider_visiblenearby = get_post_meta( $current_post->ID, rosa::prefix() . 'post_slider_visiblenearby', true );
			$slider_transition    = get_post_meta( $current_post->ID, rosa::prefix() . 'post_slider_transition', true );
			$slider_autoplay      = get_post_meta( $current_post->ID, rosa::prefix() . 'post_slider_autoplay', true );
			if ( $slider_autoplay ) {
				$slider_delay = get_post_meta( $current_post->ID, rosa::prefix() . 'post_slider_delay', true );
			}
			$template = '<div class="wp-gallery" data-royalslider data-autoHeight data-customarrows data-sliderpauseonhover data-slidertransition="' . $slider_transition . '" ';
			$template .= ' data-imagescale="' . $image_scale_mode . '" ';

			if ( $slider_visiblenearby ) {
				$template .= ' data-visiblenearby ';
			}
			if ( $slider_autoplay ) {
				$template .= ' data-sliderautoplay="" ';
				$template .= ' data-sliderdelay="' . $slider_delay . '" ';
			}
			if ( $image_scale_mode != 'fill' ) {
				$template .= ' data-imagealigncenter ';
			}
			if ( rosa::option( 'show_title_caption_popup' ) == 1 ) {
				$template .= ' data-enable_caption=""';
			}
			$template .= '>:gallery</div>';
		}

		// first check if we have a meta with a gallery
		$gallery_ids = get_post_meta( $current_post->ID, rosa::prefix() . 'main_gallery', true );

		if ( ! empty( $gallery_ids ) ) {
			//recreate the gallery shortcode
			$gallery = '[gallery ids="' . $gallery_ids . '"]';

			if ( strpos( $gallery, 'style' ) === false ) {
				$gallery = str_replace( "]", " style='big_thumb' size='" . $size . "' link='file']", $gallery );
			}

			$shrtcode = do_shortcode( $gallery );
			//var_dump( $template, $shrtcode );
			//			$shrtcode = preg_replace('/(<dd class="wp-caption-text gallery-caption">.+?)+(<\/dd>)/i', '', $shrtcode);
			if ( ! empty( $shrtcode ) ) {

				return strtr( $template, array( ':gallery' => $shrtcode ) );
			} else {
				return null;
			}
		} else { // empty gallery_ids
			// search for the first gallery shortcode
			$gallery_matches = null;
			preg_match( "!\[gallery.+?\]!", $current_post->post_content, $gallery_matches );

			if ( ! empty( $gallery_matches ) ) {
				$gallery = $gallery_matches[0];

				if ( strpos( $gallery, 'style' ) === false ) {
					$gallery = str_replace( "]", " style='big_thumb' size='" . $size . "' link='file']", $gallery );
				}
				$shrtcode = do_shortcode( $gallery );
				if ( ! empty( $shrtcode ) ) {
					return strtr( $template, array( ':gallery' => $shrtcode ) );
				} else {
					return null;
				}
			} else { // gallery_matches is empty
				return null;
			}
		}
	}

	//our version supports a second parameter
	static function get_sidebar( $name = null, $require_once = true ) {
		do_action( 'get_sidebar', $name );

		$templates = array();
		$name      = (string) $name;
		if ( '' !== $name ) {
			$templates[] = "sidebar-{$name}.php";
		}

		$templates[] = 'sidebar-menu.php';

		// Backward compat code will be removed in a future release
		if ( '' == locate_template( $templates, true, $require_once ) ) {
			load_template( ABSPATH . WPINC . '/theme-compat/sidebar-menu.php' );
		}
	}

	/**
	 * Echo author page link
	 * @return bool|string
	 */
	static function the_author_posts_link() {
		global $authordata;
		if ( ! is_object( $authordata ) ) {
			return false;
		}
		$link = sprintf( '<a href="%1$s" title="%2$s">%3$s</a>', esc_url( get_author_posts_url( $authordata->ID, $authordata->user_nicename ) ), esc_attr( sprintf( __( 'Posts by %s', 'rosa' ), get_the_author() ) ), get_the_author() );

		/**
		 * Filter the link to the author page of the author of the current post.
		 * @since 2.9.0
		 *
		 * @param string $link HTML link.
		 */
		echo apply_filters( 'the_author_posts_link', $link );
	}

	static function page_has_children() {
		global $post;

		$pages = get_pages( 'child_of=' . $post->ID );

		return count( $pages );
	}

	static function get_avatar_url( $email, $size = 32 ) {
		$get_avatar = get_avatar( $email, $size );

		preg_match( '/< *img[^>]*src *= *["\']?([^"\']*)/i', $get_avatar, $matches );
		if ( isset( $matches[1] ) ) {
			return $matches[1];
		} else {
			return '';
		}

	}

	// all methods below are merged from wpgrade

	/**
	 * @return string http or https based on is_ssl()
	 */
	static function protocol() {
		return is_ssl() ? 'https' : 'http';
	}

	//// Options ///////////////////////////////////////////////////////////////////

	/**
	 * @return mixed
	 */
	static function option( $option, $default = null ) {
		global $pagenow;
		global $pixcustomify_plugin;

		// if there is set an key in url force that value
		if ( isset( $_GET[ $option ] ) && ! empty( $option ) ) {
			return $_GET[ $option ];
		} elseif ( $pixcustomify_plugin !== null && $pixcustomify_plugin->has_option( $option ) ) {
			// if this is a customify value get it here
			return $pixcustomify_plugin->get_option( $option, $default );
		}

		return $default;
	}

	/**
	 * Get the image src attribute.
	 * Target should be a valid option accessible via WPGradeOptions interface.
	 * @return string|false
	 */
	static function image_src( $target ) {
		if ( isset( $_GET[ $target ] ) && ! empty( $target ) ) {
			return $_GET[ $target ];
		} else { // empty target, or no query
			$image = self::option( $target, array() );
			if ( isset( $image['url'] ) ) {
				return $image['url'];
			}
		}

		return false;
	}

	//// Wordpress Defferred Helpers ///////////////////////////////////////////////

	/**
	 * Filter content
	 * Filters may be disabled by setting priority to false or null.
	 * @return string $content after being filtered
	 */
	static function display_content( $content, $filtergroup ) {
		// since we cannot apply "the_content" filter on some content blocks
		// we should apply at least these bellow
		$wptexturize     = apply_filters( 'wptexturize', $content );
		$convert_smilies = apply_filters( 'convert_smilies', $wptexturize );
		$convert_chars   = apply_filters( 'convert_chars', $convert_smilies );
		$content         = wpautop( $convert_chars );

		// including Wordpress plugin.php for is_plugin_active function
		include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

		if ( is_plugin_active( 'pixcodes/pixcodes.php' ) ) {
			$content = wpgrade_remove_spaces_around_shortcodes( $content );
		}

		$content = apply_filters( 'prepend_attachment', $content );

		return do_shortcode( $content );
	}

	/**
	 * @return string template path WITH TRAILING SLASH
	 */
	static function themepath() {
		return get_template_directory() . DIRECTORY_SEPARATOR;
	}

	/**
	 * @return string theme path (it may be a child theme) WITH TRAILING SLASH
	 */
	static function childpath() {
		return get_stylesheet_directory() . DIRECTORY_SEPARATOR;
	}

	/**
	 * @return string core uri path
	 */
	static function coreuri() {
		return get_template_directory_uri() . '/' . basename( dirname( __FILE__ ) ) . '/';
	}

	/**
	 * @return string resource uri
	 */
	static function coreresourceuri( $file ) {
		return self::coreuri() . 'resources/assets/' . $file;
	}

	/**
	 * @return string file path
	 */
	static function themefilepath( $file ) {
		return self::themepath() . $file;
	}

	/**
	 * @return string path
	 */
	static function corepartial( $file ) {

		$templatepath = self::themepath() . rtrim( 'template-parts/core', '/' ) . '/' . $file;
		$childpath    = self::childpath() . rtrim( 'template-parts/core', '/' ) . '/' . $file;

		if ( file_exists( $childpath ) ) {
			return $childpath;
		} elseif ( file_exists( $templatepath ) ) {
			return $templatepath;
		}
	}

	/**
	 * @return string the lowercase version of the name
	 */
	static function shortname() {
		return self::get_shortname();
	}

	static function get_shortname() {
		return self::$shortname;
	}

	/**
	 * @return string theme prefix
	 */
	static function prefix() {
		return self::$prefix;
	}

	/**
	 * @return string theme name, in presentable format
	 */
	static function themename() {

		return 'rosa';
	}

	/** @var WP_Theme */
	protected static $theme_data = null;

	/**
	 * @return WP_Theme
	 */
	static function themedata() {
		if ( self::$theme_data === null ) {
			if ( is_child_theme() ) {
				$theme_name       = get_template();
				self::$theme_data = wp_get_theme( $theme_name );
			} else {
				self::$theme_data = wp_get_theme();
			}
		}

		return self::$theme_data;
	}

	/**
	 * @return string uri to file
	 */
	static function uri( $file ) {
		$file = '/' . ltrim( $file, '/' );

		return get_template_directory_uri() . $file;
	}

	/**
	 * @return string uri to resource file
	 */
	static function resourceuri( $file ) {
		return rosa::uri( '/assets/' . ltrim( $file, '/' ) );
	}

	//// Helpers ///////////////////////////////////////////////////////////////////

	/**
	 * Hirarchical array merge. Will always return an array.
	 *
	 * @param  ... arrays
	 *
	 * @return array
	 */
	static function merge() {
		$base = array();
		$args = func_get_args();

		foreach ( $args as $arg ) {
			self::array_merge( $base, $arg );
		}

		return $base;
	}

	/**
	 * Overwrites base array with overwrite array.
	 *
	 * @param array base
	 * @param array overwrite
	 */
	protected static function array_merge( array &$base, array $overwrite ) {
		foreach ( $overwrite as $key => &$value ) {
			if ( is_int( $key ) ) {
				// add only if it doesn't exist
				if ( ! in_array( $overwrite[ $key ], $base ) ) {
					$base[] = $overwrite[ $key ];
				}
			} else if ( is_array( $value ) ) {
				if ( isset( $base[ $key ] ) && is_array( $base[ $key ] ) ) {
					self::array_merge( $base[ $key ], $value );
				} else { // does not exist or it's a non-array
					$base[ $key ] = $value;
				}
			} else { // not an array and not numeric key
				$base[ $key ] = $value;
			}
		}
	}

	/**
	 * Helper function for safely calculating cachebust string. The filemtime is
	 * prone to failure.
	 *
	 * @param  string file path to test
	 *
	 * @return string cache bust based on filemtime or monthly
	 */
	static function cachebust_string( $filepath ) {
		$filemtime = @filemtime( $filepath );

		if ( $filemtime == null ) {
			$filemtime = @filemtime( utf8_decode( $filepath ) );
		}

		if ( $filemtime != null ) {
			return date( 'YmdHi', $filemtime );
		} else { // can't get filemtime, fallback to cachebust every month
			return date( 'Ym' );
		}
	}

	//// WPML Related Functions ////////////////////////////////////////////////////

	static function lang_post_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			global $post;
			// make this work for any post type
			if ( isset( $post->post_type ) ) {
				$post_type = $post->post_type;
			} else {
				$post_type = 'post';
			}

			return icl_object_id( $id, $post_type, true );
		} else {
			return $id;
		}
	}

	static function lang_page_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			return icl_object_id( $id, 'page', true );
		} else {
			return $id;
		}
	}

	static function lang_category_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			return icl_object_id( $id, 'category', true );
		} else {
			return $id;
		}
	}

	// a dream
	static function lang_portfolio_tax_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			return icl_object_id( $id, 'portfolio_cat', true );
		} else {
			return $id;
		}
	}

	static function lang_post_tag_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			return icl_object_id( $id, 'post_tag', true );
		} else {
			return $id;
		}
	}

	static function lang_original_post_id( $id ) {
		if ( function_exists( 'icl_object_id' ) ) {
			global $post;

			// make this work with custom post types
			if ( isset( $post->post_type ) ) {
				$post_type = $post->post_type;
			} else {
				$post_type = 'post';
			}

			return icl_object_id( $id, $post_type, true, self::get_short_defaultwp_language() );
		} else {
			return $id;
		}
	}

	static function get_short_defaultwp_language() {
		global $sitepress;
		if ( isset( $sitepress ) ) {
			return $sitepress->get_default_language();
		} else {
			return substr( get_bloginfo( 'language' ), 0, 2 );
		}
	}
}