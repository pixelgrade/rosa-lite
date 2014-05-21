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
class WPGradeMetaTest extends PHPUnit_Framework_TestCase {

	/**
	 * @test
	 */
	function has() {
		$meta = WPGradeMeta::instance(array('preset1' => 'success'));
		$this->assertEquals(true, $meta->has('preset1'));
		$this->assertEquals(false, $meta->has('preset2'));
	}

	/**
	 * @test
	 */
	function get() {
		$meta = WPGradeMeta::instance(array('preset1' => 'success'));
		$this->assertEquals('success', $meta->get('preset1', 'fail'));
		$this->assertEquals('fail', $meta->get('preset2', 'fail'));
	}

	/**
	 * @test
	 */
	function set() {
		$meta = WPGradeMeta::instance(array('preset1' => 'success'));
		// altering existing entries
		$this->assertEquals('success', $meta->get('preset1', 'fail'));
		$meta->set('preset1', 'overwritten1');
		$this->assertEquals('overwritten1', $meta->get('preset1', 'fail'));
		// altering non-existent entries
		$this->assertEquals('fail', $meta->get('preset2', 'fail'));
		$meta->set('preset2', 'overwritten2');
		$this->assertEquals('overwritten2', $meta->get('preset2', 'fail'));
	}

	/**
	 * @test
	 */
	function ensure() {
		$meta = WPGradeMeta::instance(array('preset1' => 'success'));
		// altering existing entries
		$this->assertEquals('success', $meta->get('preset1', 'fail'));
		$meta->ensure('preset1', 'overwritten1');
		$this->assertEquals('success', $meta->get('preset1', 'fail'));
		// altering non-existent entries
		$this->assertEquals('fail', $meta->get('preset2', 'fail'));
		$meta->ensure('preset2', 'overwritten2');
		$this->assertEquals('overwritten2', $meta->get('preset2', 'fail'));
	}

	/**
	 * @test
	 */
	function add() {
		$meta = WPGradeMeta::instance(array('preset1' => 'success', 'preset2' => array('success')));
		// add on existing entry that's not an array
		$meta->add('preset1', 'extra');
		$this->assertEquals(array('success', 'extra'), $meta->get('preset1', 'fail'));
		// add on existing entry that's an array
		$meta->add('preset2', 'extra');
		$this->assertEquals(array('success', 'extra'), $meta->get('preset2', 'fail'));
		// add on an non-existing entry
		$meta->add('preset3', 'extra');
		$this->assertEquals(array('extra'), $meta->get('preset3', 'fail'));
	}

	/**
	 * @test
	 */
	function metadata_array() {
		$meta = WPGradeMeta::instance(array('preset1' => 'value1', 'preset2' => 'value2'));
		$meta->set('preset3', 'value3');
		$this->assertEquals(array('preset1' => 'value1', 'preset2' => 'value2', 'preset3' => 'value3'), $meta->metadata_array());
	}

	/**
	 * @test
	 */
	function overwritemeta() {
		$meta = WPGradeMeta::instance(array('preset1' => 'value1', 'preset2' => 'value2'));
		$meta->overwritemeta(array('preset2' => 'value3'));
		$this->assertEquals(array('preset1' => 'value1', 'preset2' => 'value3'), $meta->metadata_array());
	}

} # class
