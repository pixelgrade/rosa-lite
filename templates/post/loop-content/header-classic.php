<?php
//post format specific
$post_format = get_post_format();
if ( empty( $post_format ) || $post_format == 'standard' ) {
	$post_format = '';
}

$date = get_the_time( get_option( 'date_format' ) );

if ( wpgrade::option( 'blog_custom_date_separator' ) ) {
	//we need to replace separators with our custom markup
	$date = str_replace( ', ', ' ', $date );
	$date = str_replace( '/ ', ' ', $date );
	$date = str_replace( '  ', ' ', $date );

	$date = str_replace( ' ', '<span class="date__dot"></span>', $date );
} ?>

<header>
	<?php if (wpgrade::option('blog_show_date')) : ?>
	<div class="article__date">
		<time class="published" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo $date ?></time>
	</div>
	<?php endif; ?>
	<h2 class="article__title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
    <div class="separator separator--flower">&#10043;</div>

</header>