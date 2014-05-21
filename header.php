<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie9 lt-ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?>> <!--<![endif]-->
<head>
    <meta http-equiv="content-type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>">
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="HandheldFriendly" content="True">
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="MobileOptimized" content="320">
    <title><?php wp_title('|', true, 'right'); ?></title> 
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <?php
    /**
     * One does not simply remove this and walk away alive!
     */
    wp_head(); ?>
</head>
<?php

$class_name = 'header--sticky';

if(wpgrade::option('nav_always_show')) $class_name .= '  nav-scroll-show';
else $class_name .= '  nav-scroll-hide';

$data_ajaxloading = (wpgrade::option('use_ajax_loading') == 1) ? 'data-ajaxloading' : '';
$class_name .= (wpgrade::option('use_ajax_loading') == 1) ? ' animations' : '';
$data_smoothscrolling = (wpgrade::option('use_smooth_scroll') == 1) ? 'data-smoothscrolling' : '';

//we use this so we can generate links with post id
//right now we use it to change the Edit Post link in the admin bar
$data_currentid = '';
if ((wpgrade::option('use_ajax_loading') == 1)) {
	global $wp_the_query;
	$current_object = $wp_the_query->get_queried_object();

	if ( ! empty( $current_object->post_type )
		&& ( $post_type_object = get_post_type_object( $current_object->post_type ) )
		&& current_user_can( 'edit_post', $current_object->ID )
		&& $post_type_object->show_ui && $post_type_object->show_in_admin_bar )
	{
		$data_currentid = 'data-curpostid="'.$current_object->ID.'"';
	} elseif ( ! empty( $current_object->taxonomy )
		&& ( $tax = get_taxonomy( $current_object->taxonomy ) )
		&& current_user_can( $tax->cap->edit_terms )
		&& $tax->show_ui )
	{
		$data_currentid = 'data-curpostid="'.$current_object->term_id.'"';
	}
}

$schema_org = '';
if (is_single()) {
	$schema_org .= 'itemscope itemtype="http://schema.org/Article"';
} else {
	$schema_org .= 'itemscope itemtype="http://schema.org/WebPage"';
} ?>

<body <?php body_class($class_name); echo ' '. $schema_org. ' ' . $data_ajaxloading . ' ' .$data_currentid. ' ' . $data_smoothscrolling . ' ' ?> >
    <!--[if lt IE 7]>
    <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->
    <div class="wrapper  js-wrapper" id="page">
		<?php if (wpgrade::option('header_search')) get_template_part('templates/header/search'); ?>
		<header class="site-header">
			<div class="site-header__wrapper  js-sticky<?php if(wpgrade::option('nav_always_show')) echo '  header--active  visible';?>" >
				<div class="site-header__container">
					<div class="header flexbox">
						<div class="header-component  header-component--left">
							<ul class="nav  site-header__menu">
								<li class="menu-trigger"><a href="#" class="js-nav-trigger"><i class="icon-reorder"></i></a></li>
								<?php if (wpgrade::option('header_social_links')) get_template_part('templates/core/social-icons-list'); ?>
							</ul>
						</div>
						<div class="header-component  header-component--center header-transition--image-to-text">
							<?php get_template_part('templates/header/branding'); ?>
						</div>
						<div class="header-component  header-component--right">
							<ul class="nav  site-header__menu">
								<?php if (wpgrade::option('header_rss')): ?>
								<li><a href="<?php echo wpgrade::option('header_rss_link') ?>"><i class="icon-e-rss"></i></a></li>
								<?php endif; ?>
								<?php if (wpgrade::option('header_contact')): ?>
								<li><a href="mailto:<?php echo get_bloginfo('admin_email') ?>"><i class="icon-envelope-o"></i></a></li>
								<?php endif; ?>
								<?php if (wpgrade::option('header_search')): ?>
								<li class="search-trigger"><a href="#"  class="js-search-trigger"><i class="icon-e-search"></i></a></li>
								<?php endif; ?>
							</ul>
						</div>
					</div>
					<?php
				        $theme_locations = get_nav_menu_locations();
				        $has_main_menu = false;

				        if (isset($theme_locations["main_menu"]) && ($theme_locations["main_menu"] != 0))					
				        	$has_main_menu = true;


		        	?>
					<nav class="navigation  navigation--main<?php if(!$has_main_menu) echo "  no-menu"; ?>" id="js-navigation--main">
						<h2 class="accessibility"><?php _e('Primary Navigation', wpgrade::textdomain()) ?></h2>
						<?php
							wpgrade_main_nav();
						?>
					</nav><!-- .navigation  .navigation- -main -->
				</div><!-- .site-header__container -->
			</div><!-- .site-header__wrapper -->
		</header><!-- .site-header -->			
		<div class="container  js-container">
			<section class="content">
<?php
