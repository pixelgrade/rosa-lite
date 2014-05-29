<?php
global $wp, $pagename, $post;
$current_url = wpgrade_get_current_canonical_url();

if ( ( is_home() ) || ( is_front_page() ) ) {
	?>
	<meta name="description" content="<?php bloginfo( 'description' ); ?>"/>
<?php } elseif ( is_single() || is_page() ) { ?>
	<meta name="description" content="<?php echo trim( strip_tags( get_the_excerpt() ) ); ?>"/>
<?php } elseif ( is_category() ) { ?>
	<meta name="description" content="<?php echo trim( strip_tags( category_description() ) ); ?>"/>
<?php } ?>
<link rel="canonical" href="<?php echo $current_url; ?>"/>
