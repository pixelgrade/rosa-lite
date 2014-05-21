<?php
$social_links = wpgrade::option( 'social_icons' );

$target = '';
if ( wpgrade::option( 'social_icons_target_blank' ) ) {
	$target = 'target="_blank"';
}

if ( ! empty( $social_links ) ):
	foreach ( $social_links as $domain => $icon ):
		if ( isset( $icon['value'] ) && isset( $icon['checkboxes']['header'] ) ): $value = $icon['value']; ?>
			<li>
				<a class="social-icon" href="<?php echo $value ?>" <?php echo $target ?>>
					<i class="icon-e-<?php echo $domain; ?>"></i>
				</a>
			</li>
		<?php endif;
	endforeach;
endif;

