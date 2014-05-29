<?php
global $wp, $post;

if ( is_singular() ):

	$current_url = wpgrade_get_current_canonical_url(); ?>
	<!-- twitter card tags -->
	<meta name="twitter:card" content="summary">
	<meta name="twitter:url" content="<?php echo $current_url ?>">
	<?php if ( wpgrade::option( 'twitter_card_site' ) ): ?>
	<meta name="twitter:site" content="@<?php echo wpgrade::option( 'twitter_card_site' ) ?>"/>
<?php endif; ?>
	<?php if ( get_the_author_meta( 'user_tw' ) ): ?>
	<meta name="twitter:creator" content="@<?php echo get_the_author_meta( 'user_tw' ) ?>"/>
<?php endif; ?>
	<meta name="twitter:domain" content="<?php echo $_SERVER['HTTP_HOST'] ?>">
	<meta name="twitter:title" content="<?php echo get_the_title() ?>">
	<meta name="twitter:description" content="<?php echo trim( strip_tags( get_the_excerpt() ) ) ?>">
	<meta name="twitter:image:src" content="<?php echo wpgrade_get_socialimage() ?>">
	<!-- end twitter card tags -->
<?php endif;