<?php


class wpGrade_Redux {

	function __construct() {
		$db_key_name = wpgrade::confoption( 'shortname', 'redux' ) . '_options';
		//add_filter( 'redux/options/bucket_options/args', array( $this, 'wpgrade_make_redux_wpml_ready'), 1, 1 );
		add_action( 'redux/construct', array( $this, 'wpgrade_make_redux_wpml_ready') );
	}

	function wpgrade_make_redux_wpml_ready( $object ){

		// making admin options wpml ready
		if( defined( 'ICL_LANGUAGE_CODE' ) ) { // do this only on admin side when wpml is activated
			if ( ICL_LANGUAGE_CODE != 'en' ) { // not necessary for en
				$temp_opt_name  = $object->args['opt_name'] . '_' . ICL_LANGUAGE_CODE;

				if ( !get_option($temp_opt_name) ) { // if there are no options for this languages we take the en ones
					$tem_val = get_option($object->args['opt_name']);
					add_option( $temp_opt_name, $tem_val);
				}

				$object->args['base_opt_name'] = $object->args['opt_name'];
				$object->args['opt_name'] = $temp_opt_name;
				$object->args['is_wpml_version'] = true;
			}
		}

		return $this;
	}

	function wpgrade_redux_reset_opt_name($object) {

		if( defined( 'ICL_LANGUAGE_CODE' ) ) { // do this only on admin side when wpml is activated
			if ( ICL_LANGUAGE_CODE != 'en' && isset($object->args['base_opt_name']) ) { // not necessary for en

				$object->args['opt_name'] = $object->args['base_opt_name'];

			}
		}

		return $object;
	}

}