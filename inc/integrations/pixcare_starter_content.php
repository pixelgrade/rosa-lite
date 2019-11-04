<?php
/**
 * Pixelgrade Assistant Starter Content Compatibility File.
 * Here we add all the actions and filters responsible for the import action.
 */

/**
 * Filter the import action while getting the `rosa_options` option
 *
 * @param $option
 *
 * @return mixed
 */
function rosa_lite_filter_post_option_rosa_options( $option ) {
	// get the imported data
	$pixcare_options = get_option( 'pixcare_options' );
	// this holds the ids of posts, pages, medias and everything was already imported
	$imported_options = $pixcare_options['imported_starter_content'];

	// We need to replace the both logos from the demo with the imported attachment id
	if ( isset( $imported_options['media']['ignored'][ $option['main_logo_light'] ] ) ) {
		$option['main_logo_light'] = $imported_options['media']['ignored'][ $option['main_logo_light'] ];
	}

	if ( isset( $imported_options['media']['ignored'][ $option['main_logo_dark'] ] ) ) {
		$option['main_logo_dark'] = $imported_options['media']['ignored'][ $option['main_logo_dark'] ];
	}

	// on demo this is an option, oldy stuff
	// but on the new installations will need this as a theme mod
	set_theme_mod('rosa_options', $option );

	return $option;
}
add_filter( 'pixassist_sce_import_post_option_rosa_options', 'rosa_lite_filter_post_option_rosa_options' );
