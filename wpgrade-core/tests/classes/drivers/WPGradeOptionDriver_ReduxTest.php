<?php

/* This file is property of Pixel Grade Media. You may NOT copy, or redistribute
 * it. Please see the license that came with your copy for more information.
 */

/**
 * @package    wpgrade
 * @category   functions
 * @author     Pixel Grade Team
 * @copyright  (c) 2014, Pixel Grade Media
 */
class WPGradeOptionDriver_ReduxTest extends PHPUnit_Framework_TestCase {

	/**
	 * @test
	 */
	function get() {
		$driver = new WPGradeOptionDriver_Redux(new MockReduxInstance);
		$this->assertEquals('success', $driver->get('test1', 'fail'));
		$this->assertEquals('fail', $driver->get('test2', 'fail'));
	}

	/**
	 * @test
	 */
	function set() {
		$driver = new WPGradeOptionDriver_Redux(new MockReduxInstance);
		$driver->set('test3', 'success');
		$this->assertEquals('success', $driver->get('test3', 'fail'));
	}

} # config

class MockReduxInstance {

	protected $test3 = null;

	function get($key, $default) {
		switch ($key) {
			case 'test1': return 'success';
			case 'test3': return $this->test3;
			default: return $default;
		}
	}

	function set($key, $value) {
		if ($key == 'test3') {
			$this->test3 = $value;
		}
	}

} # mock
