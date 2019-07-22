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
	require get_template_directory() . '/inc/integrations/pixcodes.php';
}

if ( class_exists( 'Gridable' ) ) {
	require get_template_directory() . '/inc/integrations/gridable.php';
}
