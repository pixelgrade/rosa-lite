<?php

	#
	# Mock callbacks
	#

	// @codeCoverageIgnoreStart

	global $wpgradetests_funcs;
	$wpgradetests_funcs = array();

	$functions = array
		(
			'resolver_test_func'
		);

	foreach ($functions as $function) {
		$wpgradetests_funcs[$function] = false;
		eval
		(
			'
				function '.$function.' ($a = null, $b = null, $c = null, $d = null) {
					global $wpgradetests_funcs;
					$wpgradetests_funcs["'.$function.'"] = true;
				}
			'
		);
	}

	function wpgrade_test_filter1($content) {
		return $content.' #filter1';
	}

	function wpgrade_test_filter2($content) {
		return $content.' #filter2';
	}

	function wpgrade_test_filter3($content) {
		return $content.' #filter3';
	}

	function wpgrade_test_bodyclass() {
		return true;
	}

	// @codeCoverageIgnoreEnd
