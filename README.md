[![Build Status](http://jenkins.pixelgrade.com:8080/job/rosa/badge/icon)](http://jenkins.pixelgrade.com:8080/job/rosa/)

## Coding guideline

 * Quick guide http://andrei-lupu.com/wordpress/wpgrade-coding-guideline/
 * First of all this is a wordPress theme so we need to respect some WordPress coding standards http://make.wordpress.org/core/handbook/coding-standards/
 * Every file / function / class should be documented by standards http://make.wordpress.org/core/handbook/inline-documentation-standards/php-documentation-standards/

## Folder Structure

 * In the __/assets__ folder we put static resources like css/scss/js/images and so on
     * The __/assets/css__ folder will contain all the css files used by the theme both in frontend and backend
         * The __/assets/css/admin__ folder contains all the css files that are used in the admin area
         * The __/assets/css/pages__ folder contains all the css files that are template specific
     * The __/assets/fonts__ folder will hold the fonts used by the theme, like fontawesome or entypo, each in it's own folder
     * The __/assets/images__ folder will contain all the images used throughout the theme, both in frontend and backend
         * The __/assets/images/admin__ folder contains all the images that are used in the admin area
     * The __/assets/js__ folder holds all the JavaScript files used throughout the theme, both in frontend and backend
         * The __/assets/js/admin__ folder contains all the javascript files used in the admin area
         * The __/assets/js/main__ folder contains all the partial javascript files that are used in the frontend - these will be merged via gulp in the __/assets/js/main.js__ file
         * The __/assets/js/plugins__ folder holds all the external plugins used in the frontend - these will be merged via gulp into __/assets/js/plugins.js__ file
         * The __/assets/js/vendor__ folder holds all the external plugins that are needed independent, in a single file
     * The __/assets/scss__ folder contains all the SASS/Compass files
 * The __/config__ folder should contain all the configuration files. If any library/feature requires a configuration, refactor it and move the config array into a file in this folder.
     * The __/config/admin-panel__ folder contains all the configurations related to the admin panel of the theme (the Theme Options)
 * The __/inc__ folder will hold all functions that are related to the theme's functionality, including the wpcom.php file that is used by WordPress.com (this is why it is good to have a inc folder)
     * The __/inc/assets__ folder will hold any static resources that are not regular ones - ie are php files that output css or js
     * The __/inc/classes__ folder will contain any classes that provide theme functionality
         * The __/inc/classes/widgets__ folder will contain, each in a separate file, the classes for the theme's custom widgets
     * The __/inc/functions__ folder will contain any functions that provide theme functionality
     * The __/inc/vendor__ folder will contain any external libraries used in providing the theme's functionality
     * Other folders that are present here should be added only if they represent a big, separated part of the theme's functionality, like demo data import
 * The __/languages__ folder will hold all the .po and .mo files required for translation
 * The __/licensing__ folder holds the GPL v2 license files
 * The __/page-templates__ folder holds the custom page templates files - the default page.php will not be here (WordPress will autoload the files in this folder)
 * The __/templates__ folder contains view parts / html blocks which should be used in WordPress's main files or in our functions/callbacks.
     * The __/templates/core__ folders will contain any partials that are related to wpgrade-core callbacks
     * The __/templates/shortcodes__ folder will contain any PixCodes partials that are overwritten by the theme
     * The __/templates/header__ folder will contain any partials related to the header section of the overall theme
     * The folders with the name of the post type (including post for the default one) will contain the partials related to the archives and the single view of that post type. Under each of these folders there will be 3 folders:
         * The __/templates/post-type/loop__ folder will contain the partials related to the main archives loop (not the actual content of each item)
         * The __/templates/post-type/loop-content__ folder will contain the partials that render each item from the archive loop
         * The __/templates/post-type/single-content__ folder will contain the partials that render the single item
 * The __/woocommerce__ folder holds the WooCommerce template files that are overwritten by the theme
 * The __/wpgrade-core__ folder is the framework core - not to be touched in any way



For any questions or support please visit http://help.pixelgrade.com