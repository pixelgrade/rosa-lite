<?php

/**
 * This is a cleaned up version of the original class by Tim Debo.
 * Changes: readability, all html externalized into asset files
 * @package   WP_Help_Pointer
 * @version   0.1
 * @author    Tim Debo <tim@rawcreativestudios.com>
 * @copyright Copyright (c) 2012, Raw Creative Studios
 * @link      https://github.com/rawcreative/wp-help-pointers
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */
class WP_Help_Pointer {

	protected $screen_id;
	protected $valid;
	protected $pointers;

	/**
	 * ...
	 */
	function setup( $pntrs = array() ) {
		// don't run on WP < 3.3
		if ( get_bloginfo( 'version' ) < '3.3' ) {
			return;
		}

		$screen          = get_current_screen();
		$this->screen_id = $screen->id;

		$this->register_pointers( $pntrs );
		add_action( 'admin_enqueue_scripts', array( &$this, 'add_pointers' ), 1000 );
		add_action( 'admin_head', array( &$this, 'add_scripts' ) );
	}

	/**
	 * ...
	 */
	function register_pointers( $pntrs ) {
		$pointers = array();
		if ( ! $pntrs || ! is_array( $pntrs ) ) {
			return;
		}

		foreach ( $pntrs as $ptr ) {
			if ( $ptr['screen'] == $this->screen_id ) {
				$pointers[ $ptr['id'] ] = array(
					'screen'  => $ptr['screen'],
					'target'  => $ptr['target'],
					'options' => array(
						'content'  => sprintf( '<h3> %s </h3> <p> %s </p>', $ptr['title'], $ptr['content'] ),
						'position' => $ptr['position']
					)
				);

			}
		}

		$this->pointers = $pointers;
	}

	/**
	 * ...
	 */
	function add_pointers() {
		$pointers = $this->pointers;

		if ( ! $pointers || ! is_array( $pointers ) ) {
			return;
		}

		// get dismissed pointers
		$dismissed      = explode( ',', (string) get_user_meta( get_current_user_id(), 'dismissed_wp_pointers', true ) );
		$valid_pointers = array();

		// check pointers and remove dismissed ones.
		foreach ( $pointers as $pointer_id => $pointer ) {
			// make sure we have pointers & check if they have been dismissed
			if ( in_array( $pointer_id, $dismissed ) || empty( $pointer ) || empty( $pointer_id ) || empty( $pointer['target'] ) || empty( $pointer['options'] ) ) {
				continue;
			}

			$pointer['pointer_id'] = $pointer_id;

			// add the pointer to $valid_pointers array
			$valid_pointers['pointers'][] = $pointer;
		}

		// no valid pointers? Stop here
		if ( empty( $valid_pointers ) ) {
			return;
		}

		$this->valid = $valid_pointers;

		wp_enqueue_style( 'wp-pointer' );
		wp_enqueue_script( 'wp-pointer' );
	}

	/**
	 * ...
	 */
	function add_scripts() {
		$pointers = $this->valid;

		if ( empty( $pointers ) ) {
			return;
		}

		$pointers = json_encode( $pointers );

		include wpgrade::themefilepath( 'inc/assets/wp-help-pointer' . EXT );
	}

} # class
