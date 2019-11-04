<?php
/**
* Require files that deal with various plugin integrations.
*
* @package Rosa Lite
*/

/**
 * Load PixCodes compatibility file
 * https://wordpress.org/plugins/pixcodes/
 */
if ( class_exists( 'WpGradeShortcodes' ) ) {
	require_once get_parent_theme_file_path( 'inc/integrations/pixcodes.php' ); // phpcs:ignore
}

/**
 * Load Gridable compatibility file
 * https://wordpress.org/plugins/gridable/
 */
if ( class_exists( 'Gridable' ) ) {
	require_once get_parent_theme_file_path( 'inc/integrations/gridable.php' ); // phpcs:ignore
}

/**
 * Load PixTypes compatibility file
 * https://wordpress.org/plugins/pixtypes/
 */
require_once get_parent_theme_file_path( 'inc/integrations/pixtypes.php' ); // phpcs:ignore

/**
 * Load Customify compatibility file
 * https://wordpress.org/plugins/customify/
 */
if ( function_exists( 'PixCustomifyPlugin' ) ) {
	require_once get_parent_theme_file_path( 'inc/integrations/customify.php' ); // phpcs:ignore
}

/**
 * Load Starter Content compatibility file.
 */
require_once get_parent_theme_file_path( 'inc/integrations/pixcare_starter_content.php' ); // phpcs:ignore
