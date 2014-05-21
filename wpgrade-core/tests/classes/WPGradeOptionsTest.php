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
class WPGradeOptionsTest extends PHPUnit_Framework_TestCase {

	/**
	 * @test
	 */
	function add_optiondriver() {
		$options = WPGradeOptions::instance(true);
		$options->add_optiondriver(new MockOptionsDriver());
		$this->assertEquals('expected', $options->get('check_option', 'test'));
		$options->clear_drivers();
	}

//// Contextual ////////////////////////////////////////////////////////////////

	/**
	 * @test
	 */
	function can_access_base_value() {
		$options = WPGradeOptions::instance(true);
		$options->add_optiondriver(new MockOptionsDriver());
		$this->assertEquals('success', $options->get('unittest_test_option', 'test'));
		$options->clear_drivers();
	}

	/**
	 * @test
	 */
	function can_set_custom_values() {
		$options = WPGradeOptions::instance(true);
		$options->add_optiondriver(new MockOptionsDriver());
		// set doesn't overwrite drivers
		$options->set('check_option', 'smart_value');
		$this->assertEquals('expected', $options->get('check_option', 'test'));
		// set overwrites core values
		$options->set('unittest_test_option', 'smart_value');
		$this->assertEquals('smart_value', $options->get('unittest_test_option', 'test'));
		$options->clear_drivers();
	}

} # class

class MockOptionsDriver {

	function get($name, $default = null) {
		if ($name == 'check_option') {
			return 'expected';
		}
		else { // other option
			return $default;
		}
	}

} # mock