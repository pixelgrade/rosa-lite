<?php
?>

<footer class="article__meta">
		<?php if (wpgrade::option('blog_show_date')): ?>
			<span class="meta-box  article__date">
					<i class="icon-time"></i>
					<span class="meta-text"><abbr class="published" title="<?php the_time('c'); ?>"><?php the_time( get_option( 'date_format' ) ); ?></abbr></span>
			</span>
		<?php endif;
		if (wpgrade::option('blog_show_comments')): ?>
			<span class="meta-box  article__comments">
				<a href="<?php echo get_comments_link(); ?>">
					<i class="icon-comment"></i>
					<span class="meta-text"><?php comments_number(__('0', wpgrade::textdomain()), __('1', wpgrade::textdomain()), '% '.__('', wpgrade::textdomain())); ?></span>
				</a>
			</span>
		<?php endif; if ( wpgrade::option('blog_show_likes') && function_exists('get_pixlikes')) : ?>
			<span class="meta-box  article__likes">
				<i class="icon-heart"></i>
				<span class="meta-text"><?php echo get_pixlikes(wpgrade::lang_original_post_id(get_the_ID())); ?> <?php _e('', wpgrade::textdomain()) ?></span>
			</span>
		<?php endif; ?>
</footer>