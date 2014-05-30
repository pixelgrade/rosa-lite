<?php
//post format specific
$post_format = get_post_format();
if ( empty( $post_format ) ) {
	$post_format = '';
}
?>

<header class="article__header">
	<h1 class="article__title"><?php the_title(); ?></h1>
	<hr class="separator"/>
	<?php get_template_part( 'templates/post/single-content/featured-classic/image', $post_format ); ?>
</header><!-- .article__header -->