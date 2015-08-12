<?php

// ensure EXT is defined
if ( ! defined( 'EXT' ) ) {
	define( 'EXT', '.php' );
}

#
# See: wpgrade-config.php -> include-paths for additional theme specific
# function and class includes
#

// ensure REQUEST_PROTOCOL is defined
if ( ! defined('REQUEST_PROTOCOL')) {
	if (is_ssl()) {
		define( 'REQUEST_PROTOCOL', 'https:' );
	} else {
		define( 'REQUEST_PROTOCOL', 'http:' );
	}
}

// Loads the theme's translated strings
load_theme_textdomain( 'rosa_txtd', get_template_directory() . '/languages' );

// Theme specific settings
// -----------------------

// add theme support for post formats
// child themes note: use the after_setup_theme hook with a callback
// right now no post formats
//$formats = array( 'video', 'audio', 'gallery', 'image', 'quote', 'link', 'chat', 'aside', );
//add_theme_support( 'post-formats', $formats );

// Initialize system core
// ----------------------

require_once 'wpgrade-core/bootstrap' . EXT;

#
# Please perform any initialization via options in wpgrade-config and
# calls in wpgrade-core/bootstrap. Required for testing.
#
