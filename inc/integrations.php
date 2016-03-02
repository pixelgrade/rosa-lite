<?php
/**
* Require files that deal with various plugin integrations.
*
* @package Rosa
*/

/**
 * Load WooCommerce compatibility file.
 * https://www.woothemes.com/woocommerce/
 */
if ( class_exists( 'WooCommerce' ) ) {
	require get_template_directory() . '/inc/integrations/woocommerce.php';
}

if ( class_exists( 'WpGradeShortcodes' ) ) {
	require get_template_directory() . '/inc/integrations/pixcodes.php';
}

if ( class_exists( 'Vc_Manager' ) ) {
	require get_template_directory() . '/inc/integrations/visual-composer.php';
}

if ( class_exists( 'FLBuilderModel' ) ) {
	require get_template_directory() . '/inc/integrations/beaver-builder.php';
}

if ( function_exists( 'siteorigin_panels_render' ) ) {
	require get_template_directory() . '/inc/integrations/page-builder-siteorigin.php';
}
