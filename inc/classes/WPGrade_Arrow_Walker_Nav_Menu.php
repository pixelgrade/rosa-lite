<?php

/**
 * Create a walker which will add a class to items with submenus
 * More http://stackoverflow.com/questions/3558198/php-wordpress-add-arrows-to-parent-menus
 */
class WPGrade_Arrow_Walker_Nav_Menu extends Walker_Nav_Menu {
	function display_element( $element, &$children_elements, $max_depth, $depth = 0, $args, &$output ) {
		$id_field = $this->db_fields['id'];
		if ( ! empty( $children_elements[ $element->$id_field ] ) ) {
			$element->classes[] = 'menu-parent-item  hidden';
		}
		Walker_Nav_Menu::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
	}

}

class wpGrade_Walker_Category extends Walker_Category {
	var $level_ended = false;

	/**
	 * Starts the list before the elements are added.
	 * @see   Walker::start_lvl()
	 * @since 2.1.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param int    $depth  Depth of category. Used for tab indentation.
	 * @param array  $args   An array of arguments. Will only append content if style argument value is 'list'.
	 *
	 * @see   wp_list_categories()
	 */
	function start_lvl( &$output, $depth = 0, $args = array() ) {
		if ( 'list' != $args['style'] ) {
			return;
		}

		$indent = str_repeat( "\t", $depth );
		$output .= '<span class="separator"></span>';

		$this->level_ended = false;
	}

	/**
	 * Ends the list of after the elements are added.
	 * @see   Walker::end_lvl()
	 * @since 2.1.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param int    $depth  Depth of category. Used for tab indentation.
	 * @param array  $args   An array of arguments. Will only append content if style argument value is 'list'.
	 *
	 * @wsee  wp_list_categories()
	 */
	function end_lvl( &$output, $depth = 0, $args = array() ) {
		if ( 'list' != $args['style'] ) {
			return;
		}
	}

	/**
	 * Start the element output.
	 * @see   Walker::start_el()
	 * @since 2.1.0
	 *
	 * @param string $output   Passed by reference. Used to append additional content.
	 * @param object $category Category data object.
	 * @param int    $depth    Depth of category in reference to parents. Default 0.
	 * @param array  $args     An array of arguments. @see wp_list_categories()
	 * @param int    $id       ID of the current category.
	 */
	function start_el( &$output, $category, $depth = 0, $args = array(), $id = 0 ) {
		extract( $args );

		$cat_name = esc_attr( $category->name );
		$cat_name = apply_filters( 'list_cats', $cat_name, $category );
		$link     = '<a href="' . esc_url( get_term_link( $category ) ) . '" itemprop="url"';
		if ( $use_desc_for_title == 0 || empty( $category->description ) ) {
			$link .= 'title="' . esc_attr( sprintf( __( 'View all posts filed under %s', wpgrade::textdomain() ), $cat_name ) ) . '"';
		} else {
			$link .= 'title="' . esc_attr( strip_tags( apply_filters( 'category_description', $category->description, $category ) ) ) . '"';
		}
		$link .= '>';
		$link .= '<span itemprop="title">' . $cat_name . '</span></a>';


		if ( 'list' == $args['style'] ) {
			$class = 'cat-item cat-item-' . $category->term_id;
			if ( ! empty( $current_category ) ) {
				$_current_category = get_term( $current_category, $category->taxonomy );
				if ( $category->term_id == $current_category ) {
					$class .= ' current-cat';
				} elseif ( $category->term_id == $_current_category->parent ) {
					$class .= ' current-cat-parent';
				}
			}
			$output .= '<div itemprop="child" itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="' . $class . '"';
			$output .= ">$link</div>\n";
		} else {
			$output .= "\t$link<br />\n";
		}
	}

	/**
	 * Ends the element output, if needed.
	 * @see   Walker::end_el()
	 * @since 2.1.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param object $page   Not used.
	 * @param int    $depth  Depth of category. Not used.
	 * @param array  $args   An array of arguments. Only uses 'list' for whether should append to output. @see wp_list_categories()
	 */
	function end_el( &$output, $page, $depth = 0, $args = array() ) {
		if ( 'list' != $args['style'] ) {
			return;
		}

		if ( $depth == 0 ) {
			$output .= '<span class="cat-separator"></span>';
		}
	}

}