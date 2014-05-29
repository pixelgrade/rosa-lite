<?php
/**
 * The main template file.
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 * @package Rosa
 * @since   Rosa 1.0
 */

get_header();

$blog_style = wpgrade::option( 'blog_layout', 'classic' );

get_template_part( 'templates/post/loop/' . $blog_style );

get_footer();