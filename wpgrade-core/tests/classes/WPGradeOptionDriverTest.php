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
class WPGradeOptionDriverTest extends PHPUnit_Framework_TestCase {

	/**
	 * @test
	 */
	function set_throws_exception() {
		$driver = new WPGradeOptionDriverMock;
		$this->setExpectedException('Exception');
		$driver->set('test', 'test');
	}

} # config

class WPGradeOptionDriverMock extends WPGradeOptionDriver {
	function get($option, $default = NULL) { }
} # mock
