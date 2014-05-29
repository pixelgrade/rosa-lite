<?php
//post format specific
$post_format = get_post_format();
if ( empty( $post_format ) ) {
	$post_format = '';
}
?>

<!-- header class="article__header">
	<?php get_template_part( 'templates/post/single-content/featured-classic/image', $post_format ); ?>
	<?php if ( wpgrade::option( 'blog_single_show_breadcrumb' ) ) {
	rosa::the_breadcrumb();
} ?>

	<?php if ( get_the_title() ): ?>
	<h1 class="article__title entry-title" itemtype="name" ><?php the_title(); ?></h1>
	<?php else: ?>
	<h1 class="article__title entry-title" itemtype="name" ><?php _e( 'Untitled', wpgrade::textdomain() ); ?></h1>
	<?php endif; ?>

	<hr class="separator" />
	<?php if ( wpgrade::option( 'blog_single_show_title_meta_info' ) || wpgrade::option( 'blog_single_share_links_position' ) == 'top' || wpgrade::option( 'blog_single_share_links_position' ) == 'both' ):
	$both_metas = wpgrade::option( 'blog_single_show_title_meta_info' ) && ( wpgrade::option( 'blog_single_share_links_position' ) == 'top' || wpgrade::option( 'blog_single_share_links_position' ) == 'both' ) ? true : false;
	?>
	<div class="entry__meta--header">
		<div class="grid">
			<div class="grid__item <?php if ( $both_metas ) {
	echo 'lap-and-up-one-half'
} ?>">
				<?php if ( wpgrade::option( 'blog_single_show_title_meta_info' ) ):
	$author_display_name = get_the_author_meta( 'display_name' );
	printf( '<span class="article__author-name">By %s</span>', '<address class="vcard author"><a class="url fn" href="' . get_author_posts_url( get_the_author_meta( 'ID' ) ) . '" title="' . sprintf( __( 'Posts by %s', wpgrade::textdomain() ), $author_display_name ) . '" itemprop="author" >' . $author_display_name . '</a></address>.' );
	?>
				<time class="article__time" datetime="<?php the_time( 'c' ); ?>">
					<span> <?php printf( __( 'Published on', wpgrade::textdomain() ) ); ?> </span>
				<abbr class="published" title="<?php the_time( 'c' ); ?>"><?php printf( get_the_date() ); ?></abbr></time>
				<?php endif;

	if ( comments_open() ) {
		?>
					<a href="#comments" class="article__comments-number"><?php rosa::comments_number(); ?></a>
				<?php } ?>
			</div>
			<div class="grid__item <?php if ( $both_metas )
	echo 'lap-and-up-one-half' ?>">
				<?php if ( wpgrade::option( 'blog_single_show_share_links' ) && ( wpgrade::option( 'blog_single_share_links_position', 'bottom' ) == 'top' || wpgrade::option( 'blog_single_share_links_position', 'bottom' ) == 'both' ) ): ?>
					<div class="addthis_toolbox addthis_default_style addthis_32x32_style  add_this_list"
						 addthis:url="<?php echo wpgrade_get_current_canonical_url(); ?>"
						 addthis:title="<?php wp_title( '|', true, 'right' ); ?>"
						 addthis:description="<?php echo trim( strip_tags( get_the_excerpt() ) ) ?>">
						<?php get_template_part( 'templates/core/addthis-social-buttons' ); ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</div>
	<?php endif; ?>
</header --><!-- .article__header -->

<header class="article__header">
	<h1 class="article__title"><?php the_title(); ?></h1>
	<hr class="separator"/>
	<?php get_template_part( 'templates/post/single-content/featured-classic/image', $post_format ); ?>
</header><!-- .article__header -->