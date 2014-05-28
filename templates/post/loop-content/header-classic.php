<?php
//post format specific
$post_format = get_post_format();
if (empty($post_format) || $post_format == 'standard') {
	$post_format = '';
}
?>

<header>
    <div class="article__date">
        <span class="date__box"><abbr class="published" title="<?php the_time('c'); ?>"><?php the_time( get_option( 'date_format' ) ); ?></abbr></span>
<!--        <span class="date__box">May</span>-->
<!--        <span class="date__box">16</span>-->
<!--        <span class="date__box">2014</span>-->
    </div>
    <h2 class="article__title"><a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
    <span class="separator-stylish  separator-stylish--2">✻</span>
</header>