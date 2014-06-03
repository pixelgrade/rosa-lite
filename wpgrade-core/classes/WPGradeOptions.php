<?php

/* This file is property of Pixel Grade Media. You may NOT copy, or redistribute
 * it. Please see the license that came with your copy for more information.
 */

/**
 * Note: in the system this class is uses via the single-instance pattern; not
 * to be confused with the singleton pattern.
 * @package        wpgrade
 * @category       core
 * @author         Pixel Grade Team
 * @copyright  (c) 2013, Pixel Grade Media
 */
class WPGradeOptions {

	/** @var WPGradeOptionDriver_Config */
	protected $coredriver = null;

	/**
	 * The constructor must remain accessible for testing purposes.
	 */
	function __construct( $default_options = array() ) {
		$this->drivers    = array();
		$this->coredriver = new WPGradeOptionDriver_Config( $default_options );
		$this->add_optiondriver( $this->coredriver );
	}

	/** @var WPGradeOptions */
	static $instance = null;

	/**
	 * @return WPGradeOptions working instance
	 */
	static function instance( $reinitialize = false ) {
		if ( self::$instance == null || $reinitialize ) {
			$config         = wpgrade::config();
			self::$instance = new WPGradeOptions( $config['theme-options'] );
		}

		return self::$instance;
	}

	/** @var array */
	protected $drivers = array();

	/**
	 * Adds option driver. The last driver added always has priority.
	 *
	 * @param WPGradeOptionDriver $driver
	 *
	 * @return static $this
	 */
	function add_optiondriver( $driver ) {
		$this->drivers[] = $driver;

		return $this;
	}

	/**
	 * Remove all registered WPGradeOptionDriver objects.
	 * @return static $this
	 */
	function clear_drivers() {
		$this->drivers = array();

		return $this;
	}

	/**
	 * Using drivers searches for value. Drivers are searched in reverse.
	 * The search stops when a non-null value is reached.
	 * @return mixed
	 */
	function get( $key, $default = null ) {
		$drivers = array_reverse( $this->drivers );
		foreach ( $drivers as $driver ) {
			$value = $driver->get( $key, null );
			if ( $value !== null ) {
				return $value;
			}
		}

		return $default;
	}

	function get_args() {
		$drivers = array_reverse( $this->drivers );
		foreach ( $drivers as $driver ) {
			$val = $driver->get_args();
			if ( ! empty( $val ) ) {
				return $val;
			}
		}

		return false;
	}

	function get_sections() {
		$drivers = array_reverse( $this->drivers );
		foreach ( $drivers as $driver ) {
			$val = $driver->get_sections();
			if ( ! empty( $val ) ) {
				return $val;
			}
		}

		return false;
	}

	function get_defaults() {
		$drivers = array_reverse( $this->drivers );
		foreach ( $drivers as $driver ) {
			$val = $driver->_default_values();
			if ( ! empty( $val ) ) {
				return $val;
			}
		}

		return false;
	}

	/**
	 * Adds a key to the options. The value is added to the core driver which
	 * is at the bottom of the stack.
	 * @return static $this
	 */
	function set( $key, $value ) {

		$drivers = array_reverse( $this->drivers );
		foreach ( $drivers as $driver ) {
			$driver->set( $key, $value );
		}
	}

} # class
