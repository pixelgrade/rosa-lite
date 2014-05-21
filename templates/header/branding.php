<div class="site-header__branding">
	<?php if (wpgrade::image_src('main_logo')):
	$retina_logo = wpgrade::image_src('retina_main_logo');
	?>
	<h1 class="site-title site-title--image">
		<a class="site-logo  site-logo--image   <?php if (wpgrade::option('use_retina_logo') && !empty($retina_logo)) echo "  site-logo--image-2x"; ?>" href="<?php echo home_url(); ?>" title="<?php bloginfo('name') ?>" rel="home">
			<?php $data_retina_logo = (wpgrade::option('use_retina_logo') && !empty($retina_logo)) ? 'data-logo2x="'.$retina_logo.'"' : ''; ?>
			<img src="<?php echo wpgrade::image_src('main_logo'); ?>" <?php echo $data_retina_logo; ?> rel="logo" alt="<?php echo get_bloginfo('name') ?>"/>
		</a>
	</h1>
	<?php else: ?>
	<h1 class="site-title site-title--text">
		<a class="site-logo  site-logo--text" href="<?php echo home_url() ?>" rel="home">
			<?php bloginfo('name') ?>
		</a>
	</h1>
	<?php endif; ?>
	<p class="site-header__description"><?php bloginfo( 'description' ); ?></p>
</div>

<?php if (wpgrade::image_src('main_logo')): ?>
<h1 class="site-title  site-title--small"><a href="<?php echo home_url() ?>"><?php bloginfo('name') ?></a></h1>
<?php endif; ?>