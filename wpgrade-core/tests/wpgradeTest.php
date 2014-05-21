<?php

/* This file is property of Pixel Grade Media. You may NOT copy, or redistribute
 * it. Please see the license that came with your copy for more information.
 */

/**
 * @package    wpgrade
 * @category   functions
 * @author     Pixel Grade Team
 * @copyright  (c) 2013, Pixel Grade Media
 */
class wpgradeTest extends PHPUnit_Framework_TestCase {

	/**
	 * @test
	 */
	function state() {
		$state = wpgrade::state();
		$this->assertTrue($state instanceof WPGradeMeta);
	}

	/**
	 * @test
	 */
	function confoption() {
		$config = wpgrade::config();
		$this->assertEquals($config['name'], wpgrade::confoption('name', null));
		$this->assertEquals('success', wpgrade::confoption('TEST__INVALID_KEY', 'success'));
	}

	/**
	 * @test
	 */
	function protocol() {
		$this->assertTrue(in_array(wpgrade::protocol(), array('https', 'http')));
	}

	/**
	 * @test
	 */
	function options_handler() {
		$oldhandler = wpgrade::options();
		wpgrade::options_handler('test');
		$check = wpgrade::options();
		$this->assertEquals($check, 'test');
		wpgrade::options_handler($oldhandler);
	}

	/**
	 * @test
	 */
	function option() {
		$this->assertEquals('mock_theme_options', wpgrade::option('name'));
		$_GET['name_2'] = 'mock_theme_options_2';
		$this->assertEquals('mock_theme_options_2', wpgrade::option('name_2'));
		$this->assertEquals(false, wpgrade::option('name_3'));
	}

	/**
	 * @test
	 */
	function image_src() {
		wpgrade::setoption('testimage', array('url' => 'test1.url'));
		$this->assertEquals('test1.url', wpgrade::image_src('testimage'));
		$_GET['testimage'] = 'test2.url';
		$this->assertEquals('test2.url', wpgrade::image_src('testimage'));
		$this->assertEquals(false, wpgrade::image_src('testimage2'));
	}

	/**
	 * @test
	 */
	function setoption() {
		wpgrade::setoption('test__x', 'success');
		$this->assertEquals('success', wpgrade::option('test__x'));
	}

	/**
	 * @test
	 */
	function childpath() {
		$this->assertEquals('stylesheet.dir'.DIRECTORY_SEPARATOR, wpgrade::childpath());
	}

	/**
	 * @test
	 */
	function corepath() {
		$this->assertEquals(realpath(dirname(__FILE__).'/../'), realpath(wpgrade::corepath()));
	}

	/**
	 * @test
	 */
	function coreuri() {
		$this->assertEquals('template/dir/uri/wpgrade-core/', wpgrade::coreuri());
	}

	/**
	 * @test
	 */
	function coreresourceuri() {
		$this->assertEquals(wpgrade::coreuri().'resources/assets/test.file', wpgrade::coreresourceuri('test.file'));
	}

	/**
	 * @test
	 */
	function corepartial() {
		$corepath = wpgrade::corepath();

		$themefile = wpgrade::corepartial('theme.template');
		$corefile = wpgrade::corepartial('update-notifier'.EXT);

		$themepath = wpgrade::themepath();
		$corepath = wpgrade::corepath();

		$this->assertEquals(
			realpath($themepath.'/templates/core/theme.template'),
			realpath($themefile)
		);

		$this->assertEquals(
			realpath($corepath.'resources/views/update-notifier'.EXT),
			realpath($corefile)
		);
	}

	/**
	 * @test
	 */
	function coreview() {
		$this->assertEquals('hello world', wpgrade::coreview('hello'.EXT, array('name' => 'world')));
	}

	/**
	 * @test
	 */
	function shortname() {
		$this->assertEquals('testtheme', wpgrade::shortname());
		$oldconfig = wpgrade::config();
		wpgrade::overwrite_configuration(array('name' => 'No conf Test', 'shortname' => null));
		$this->assertEquals('no_conf_test', wpgrade::shortname());
		wpgrade::overwrite_configuration($oldconfig);
	}

	/**
	 * @test
	 */
	function prefix() {
		$this->assertEquals('_testtheme_', wpgrade::prefix());
		$oldconfig = wpgrade::config();
		wpgrade::overwrite_configuration(array('shortname' => 'no_conf_test', 'prefix' => null));
		$this->assertEquals('_no_conf_test_', wpgrade::prefix());
		wpgrade::overwrite_configuration($oldconfig);
	}

	/**
	 * @test
	 */
	function themename() {
		$this->assertEquals('Testtheme', wpgrade::themename());
	}

	/**
	 * @test
	 */
	function themedata() {
		$data = wpgrade::themedata();
		$this->assertTrue($data instanceof WP_Theme);
	}

	/**
	 * @test
	 */
	function themeversion() {
		$this->assertEquals(wpgrade::themeversion(), '0.0');
	}

	/**
	 * @test
	 */
	function uri() {
		$this->assertEquals('template/dir/uri/test.file', wpgrade::uri('test.file'));
	}

	/**
	 * @test
	 */
	function resourceuri() {
		$this->assertEquals(wpgrade::uri('/assets/test.file'), wpgrade::resourceuri('test.file'));
	}

	/**
	 * @test
	 */
	function merge() {
		$this->assertEquals(
			array
			(
				'orange',
				'pink',
				'test' => array
					(
						'x' => 2,
						'y' => 1,
						'z' => 3,
					)
			),
			wpgrade::merge
			(
				array('orange'),
				array('pink'),
				array('test' => 15),
				array('test' => array('x' => 1)),
				array('test' => array('x' => 2, 'y' => 3)),
				array('test' => array('y' => 1, 'z' => 3)),
				array('test' => array('x' => 2))
			)
		);
	}

	/**
	 * @test
	 */
	function find_files() {
		$this->assertEquals(7, count(wpgrade::find_files(wpgrade::corepath().'tests/assets/find_files')));
	}

	/**
	 * @test
	 */
	function require_all() {
		wpgrade::require_all(wpgrade::corepath().'tests/assets/require_all');
		$loaded = 0;
		foreach (array(1,2,3,4,5,6) as $i) {
			$loaded += function_exists("test_required_func$i") ? 1 : 0;
		}

		$this->assertEquals(6, $loaded);
	}

	/**
	 * @test
	 */
	function register_head_scripts() {
		global $registered_scripts;
		wpgrade::register_head_scripts
			(
				array
				(
					'header-test1' => array('path' => 'test-headscript1.js'),
					'header-test2' => array( 'path' => 'test-headscript2.js'),
					'header-test3' => array
						(
							'path' => 'test-headscript3.js',
							'require' => 'test',
							'cache_bust' => 'xxx',
						),
					'header-test4' => array
						(
							'path' => 'test-headscript4.js',
							'require' => array('test'),
							'cache_bust' => 'xxx',
						)
				)
			);
		$this->assertEquals(array('test-headscript1.js', array(), '', false), $registered_scripts['header-test1']);
		$this->assertEquals(array('test-headscript2.js', array(), '', false), $registered_scripts['header-test2']);
		$this->assertEquals(array('test-headscript3.js', array('test'), 'xxx', false), $registered_scripts['header-test3']);
		$this->assertEquals(array('test-headscript4.js', array('test'), 'xxx', false), $registered_scripts['header-test4']);
	}

	/**
	 * @test
	 */
	function register_footer_scripts() {
		global $registered_scripts;
		wpgrade::register_footer_scripts
			(
				array
				(
					'footer-test1' => 'test-footerscript1.js',
					'footer-test2' => array( 'path' => 'test-footerscript2.js'),
					'footer-test3' => array
						(
							'path' => 'test-footerscript3.js',
							'require' => 'test',
							'cache_bust' => 'xxx',
						),
					'footer-test4' => array
						(
							'path' => 'test-footerscript4.js',
							'require' => array('test'),
							'cache_bust' => 'xxx',
						)
				)
			);

		$this->assertEquals(array('test-footerscript1.js', array(), '', true), $registered_scripts['footer-test1']);
		$this->assertEquals(array('test-footerscript2.js', array(), '', true), $registered_scripts['footer-test2']);
		$this->assertEquals(array('test-footerscript3.js', array('test'), 'xxx', true), $registered_scripts['footer-test3']);
		$this->assertEquals(array('test-footerscript4.js', array('test'), 'xxx', true), $registered_scripts['footer-test4']);
	}

	/**
	 * @test
	 */
	function register_style_scripts() {
		global $registered_styles;
		wpgrade::register_styles
			(
				array
				(
					'style-test1' => 'test-style1.css',
					'style-test2' => array('path' => 'test-style2.css'),
					'style-test3' => array(
						'path' => 'test-style3.css',
						'require' => 'style-test1',
						'cache_bust' => 'xxx',
						'media' => 'yyy',
					),
					'style-test4' => array(
						'path' => 'test-style4.css',
						'require' => array('style-test1'),
						'cache_bust' => 'xxx',
						'media' => 'yyy',
					),
				)
			);

		$this->assertEquals(array('test-style1.css', array(), '', 'all'), $registered_styles['style-test1']);
		$this->assertEquals(array('test-style2.css', array(), '', 'all'), $registered_styles['style-test2']);
		$this->assertEquals(array('test-style3.css', array('style-test1'), 'xxx', 'yyy'), $registered_styles['style-test3']);
		$this->assertEquals(array('test-style4.css', array('style-test1'), 'xxx', 'yyy'), $registered_styles['style-test4']);

	}

	/**
	 * @test
	 */
	function hex2rgb_array() {
		$this->assertEquals(array(249, 11, 119), wpgrade::hex2rgb_array('#f90b77'));
		$this->assertEquals(array(0, 0, 0), wpgrade::hex2rgb_array('#000000'));
		$this->assertEquals(array(0, 0, 0), wpgrade::hex2rgb_array('#000'));
		$this->assertEquals(array(255, 255, 255), wpgrade::hex2rgb_array('#ffffff'));
	}

	/**
	 * @test
	 */
	function filter_content() {
		$filtered = wpgrade::filter_content('the content', 'default');
		$this->assertEquals('the content #filter1 #filter2 #filter3', $filtered);
		$filtered = wpgrade::filter_content('the content', 'no-such-group');
		$this->assertEquals('the content', $filtered);
	}

	/**
	 * @test
	 */
	function display_content() {
		ob_start();
		wpgrade::display_content('the content');
		$filtered = ob_get_clean();
		$this->assertEquals('the content #filter1 #filter2 #filter3', $filtered);

		ob_start();
		wpgrade::display_content('the content', 'no-such-group');
		$filtered = ob_get_clean();
		$this->assertEquals('the content', $filtered);
	}

	/**
	 * @test
	 */
	function body_class() {
		$this->assertEquals(null, wpgrade::body_class());
		wpgrade::overwrite_configuration(array('body-classes' => array('test1' => false, 'test2' => true, 'test3' => 'wpgrade_test_bodyclass')));
		$this->assertEquals(array('test2', 'test3'), wpgrade::body_class());
	}

	/**
	 * @test
	 */
	function cachebust_string() {
		$cache_bust = wpgrade::cachebust_string(wpgrade::corepath().'tests/assets/wordpress-functions'.EXT);
		$this->assertEquals(true, strlen($cache_bust) > strlen(date('Ym')));
	}

//// Contextual ////////////////////////////////////////////////////////////////

	/**
	 * @test
	 */
	function can_use_resolver() {
		global $wpgradetests_funcs;
		wpgrade::register_resolver('test', 'resolver_test_func');
		$this->assertEquals(false, $wpgradetests_funcs['resolver_test_func']);
		wpgrade::resolve('test', array());
	}

	/**
	 * @test
	 */
	function can_load_configuration_file() {
		// save configuration
		$originalconfig = wpgrade::config();
		// delete configuration
		wpgrade::overwrite_configuration(null);

		// the test
		$config = wpgrade::config();
		$this->assertTrue(is_array($config) && isset($config['name']));

		// restore configuration
		wpgrade::overwrite_configuration(null);
		wpgrade::overwrite_configuration($originalconfig);
	}

	/**
	 * @test
	 */
	function can_load_textdomain() {
		wpgrade::overwrite_configuration(array('textdomain' => null));
		$this->assertEquals('Testtheme_txtd', wpgrade::textdomain());
	}

	/**
	 * @test
	 */
	function can_load_custom_textdomain() {
		// save a copy of the configuration
		$config = wpgrade::config();

		// the test
		wpgrade::overwrite_configuration(array('textdomain' => 'test_text_domain'));
		$this->assertEquals('test_text_domain', wpgrade::textdomain());

		// restore original textdomain
		wpgrade::overwrite_configuration(array('textdomain' => $config['textdomain']));
	}

	/**
	 * @test
	 */
	function can_retrieve_theme_option() {
		$this->assertEquals('success', wpgrade::option('unittest_test_option'));
	}

	/**
	 * @test
	 */
	function features_testurl() {
		$features_test_path = wpgrade::corepath().'features/.test.path';
		$theme_features_test_path = wpgrade::corepath().'../.test.path';

		$original_copy = null;
		if (file_exists($features_test_path)) {
			$original_copy = file_get_contents($features_test_path);
			unlink($features_test_path);
		}

		$theme_original_copy = null;
		if (file_exists($theme_features_test_path)) {
			$theme_original_copy = file_get_contents($theme_features_test_path);
			unlink($theme_features_test_path);
		}

		try {
			wpgrade::features_testurl();
			throw new Exception('Expected exception was not thrown.');
		}
		catch (Exception $e) {
			$this->assertEquals('Please create the file wpgrade-core/features/.test.path and place the url to your wordpress inside it.', $e->getMessage());
		}

		file_put_contents($features_test_path, 'example.url');
		$this->assertEquals('example.url/', wpgrade::features_testurl());
		file_put_contents($features_test_path, 'example.url/path/');
		$this->assertEquals('example.url/path/', wpgrade::features_testurl());
		unlink($features_test_path);

		file_put_contents($theme_features_test_path, 'example.url');
		$this->assertEquals('example.url/', wpgrade::features_testurl());
		file_put_contents($theme_features_test_path, 'example.url/path/');
		$this->assertEquals('example.url/path/', wpgrade::features_testurl());
		unlink($theme_features_test_path);

		// Restore original .test.path if one existed
		// ------------------------------------------

		if ($original_copy != null) {
			file_put_contents($features_test_path, $original_copy);
		}

		if ($theme_original_copy != null) {
			file_put_contents($theme_features_test_path, $original_copy);
		}
	}

} # class
