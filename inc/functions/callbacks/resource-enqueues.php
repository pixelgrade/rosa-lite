<?php

/**
 * Invoked in wpgrade-config.php
 */
function wpgrade_callback_contact_script() {
    if (is_page_template('template-contact.php')) {
        wp_enqueue_script('contact-scripts');
    }
}

/**
 * Invoked in wpgrade-config.php
 */
function wpgrade_callback_addthis() {
	//lets determine if we need the addthis script at all
	if ( is_single() && wpgrade::option('blog_single_show_share_links')):
		wp_enqueue_script('addthis-api');

    	//here we will configure the AddThis sharing globally
    	get_template_part('templates/core/addthis-js-config');
	endif;
}

/**
 * Invoked in wpgrade-config.php
 */
function wpgrade_callback_thread_comments_scripts() {
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}


/**
 * Load google fonts appropriate script block.
 *
 * This callback is invoked by wpgrade_callback_enqueue_dynamic_css
 */
function wpgrade_callback_load_google_fonts_heap() {

    $fonts_array = array
    (
        'google_titles_font',
        //'google_second_font',
        'google_nav_font',
        'google_body_font'
    );

    $families = array();
    foreach ($fonts_array as $font) {
        $clean_font = wpgrade::get_google_font_name($font);

        if ( ! empty($clean_font)) {
            $families[] = $clean_font;
        }
    }

    $families = apply_filters('wpgrade_google_fonts', $families );

    if ( ! empty($families)) {
        // any variables in scope will be available in the partial
        include wpgrade::themefilepath('templates/core/google-fonts-config'.EXT);
    }
}

/**
 * This callback is invoked by wpgrade_callback_themesetup.
 */
function wpgrade_callback_enqueue_dynamic_css_heap() {
    $style_query = array();

    if (wpgrade::option('main_color')) {
        $main_color = wpgrade::option('main_color');
        $main_color = str_replace('#', '', $main_color);
        $style_query['color'] = $main_color;
    }

//    if ( wpgrade::option('use_google_fonts')) {

        add_action('wp_footer', 'wpgrade_callback_load_google_fonts_heap',9999);
        $fonts_array = array
        (
            'google_titles_font',
            //'google_second_font',
            'google_nav_font',
            'google_body_font'
        );

        foreach ($fonts_array as $font) {
            $the_font = wpgrade::get_the_typo($font);
            if ( ! empty($the_font)) {
                $style_query['fonts'][$font] = $the_font;
            }
        }
//    }

    if ( wpgrade::option('inject_custom_css') == 'file' ){
        wp_enqueue_style('wpgrade-custom-style', get_template_directory_uri() . '/assets/css/custom.css' );
    }
}