<?php

/* This file is property of Pixel Grade Media. You may NOT copy, or redistribute
 * it. Please see the license that came with your copy for more information.
 */

/**
 * @package        wpgrade
 * @category       core
 * @author         Pixel Grade Team
 * @copyright  (c) 2013, Pixel Grade Media
 */
abstract class WPGradeOptionDriver {

	/**
	 * @return option value or default
	 */
	abstract function get( $option, $default = null );

	/**
	 * @return static $this
	 */
	function set( $key, $value ) {
		throw new Exception( 'Set operation not supported by ' . __CLASS__ );
	}

} # class
