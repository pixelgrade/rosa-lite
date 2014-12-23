<?php

// register our redux estensions
if ( ! function_exists( 'wpgrade_register_custom_extension_loader' ) ) {
	function wpgrade_register_custom_extension_loader( $ReduxFramework ) {

		$path    = dirname( __FILE__ ) . '/extensions/';
		$folders = scandir( $path, 1 );
		foreach ( $folders as $folder ) {
			if ( $folder === '.' or $folder === '..' or ! is_dir( $path . $folder ) ) {
				continue;
			}
			$extension_class = 'ReduxFramework_Extension_' . $folder;
			if ( ! class_exists( $extension_class ) ) {
				// In case you wanted override your override, hah.
				$class_file = $path . $folder . '/extension_' . $folder . '.php';
				$class_file = apply_filters( 'redux/extension/' . $ReduxFramework->args['opt_name'] . '/' . $folder, $class_file );
				if ( file_exists( $class_file ) ) {
					require_once( $class_file );
					$extension = new $extension_class( $ReduxFramework );
				}
			}
		}
	}

	$redux_opt_name = wpgrade::confoption( 'shortname', 'redux' ) . '_options';

	add_action( "redux/extensions/{$redux_opt_name}/before", 'wpgrade_register_custom_extension_loader', 0 );
}

add_action( 'redux/page/' . wpgrade::$shortname . '_options/sections/after', 'wpgrade_hook_after_redux_sections' );
function wpgrade_hook_after_redux_sections() {
	echo '<h3 id="floating-title"></h3>';
}

add_action( 'redux/options/' . wpgrade::$shortname . '_options/settings/change', 'wpgrade_hook_after_redux_save_btn' );

function wpgrade_hook_after_redux_save_btn() {

	echo '<div class="reset-menu_wrapper"><label class="reset-menu_cog" for="reset-menu_trigger"><i class="icon-cog-1"></i></label><input type="checkbox" id="reset-menu_trigger" />';
	echo '<div class="reset-menu"><ul class="reset-menu_list"><li>';
	submit_button( __( 'Reset Section', 'redux-framework' ), 'secondary', wpgrade::$shortname . '_options' . '[defaults-section]', false );
	echo '</li><li>';
	submit_button( __( 'Reset All', 'redux-framework' ), 'secondary', wpgrade::$shortname . '_options' . '[defaults]', false );
	echo '</li></ul></div></div>';

}

add_action( 'customize_register', 'remove_customizer_controls' ); // remove controls

function remove_customizer_controls( $wp_customize ) {

	$sections = wpgrade::get_redux_arg( 'remove_customizer_sections' );

	if ( ! empty( $sections ) && is_array( $sections ) ) {
		foreach ( $sections as $key => $section ) {
			$wp_customize->remove_section( $section );
		}
	}
}