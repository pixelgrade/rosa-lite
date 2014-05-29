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
class WPGradeOptionDriver_Config extends WPGradeOptionDriver {

	/**
	 * @var Redux_Options
	 */
	protected $config = null;

	/**
	 * ...
	 */
	function __construct( $config ) {
		$this->config = $config;
	}

	/**
	 * @return mixed
	 */
	function get( $key, $default = null ) {
		if ( isset( $this->config[ $key ] ) ) {
			return $this->config[ $key ];
		} else { // no value
			return $default;
		}
	}

	/**
	 * @return static $this
	 */
	function set( $key, $value ) {
		$this->config[ $key ] = $value;

		return $this;
	}

} # class
