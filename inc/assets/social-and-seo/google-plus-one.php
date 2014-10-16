<?php global $post; ?>
<!-- google+ tags -->
<?php if ( is_singular() ): ?>
	<meta itemprop="name" content="<?php echo get_the_title() ?>">
	<meta itemprop="description" content="<?php echo strip_tags( get_the_excerpt() ) ?>">
	<meta itemprop="image" content="<?php echo wpgrade_get_socialimage() ?>">
	<?php if ( get_the_author_meta( 'google_profile' ) ): ?>
		<link rel="author" href="<?php echo get_the_author_meta( 'google_profile' ) ?>"/>
	<?php endif; ?>
<?php endif; ?>

<?php # we only add the publisher link on the home page ?>
<?php if ( is_front_page() && wpgrade::option( 'google_page_url' ) ): ?>
	<link rel="publisher" href="http://plus.google.com/<?php echo wpgrade::option( 'google_page_url' ) ?>"/>
<?php endif; ?>
<!-- end google+ tags -->