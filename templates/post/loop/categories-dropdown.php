<?php
$categories = get_categories();
if ( !is_wp_error( $categories ) ) : ?>
	<div class="pix-dropdown  down  archive-filter">
		<a class="dropdown__trigger" href="#"><?php _e( 'Categories', 'rosa' ) ?></a>
		<ul class="dropdown__menu  nav  nav--banner">
			<?php foreach ($categories as $category): ?>
				<li>
					<a href="<?php echo get_category_link($category->term_id); ?>" title="<?php echo esc_attr(sprintf(__("View all posts in %s", 'rosa'), $category->name)) ?>">
						<?php echo $category->cat_name; ?>
					</a>
				</li>
			<?php endforeach;?>
		</ul>
	</div>
<?php endif;
