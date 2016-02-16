<?php global $wpgrade_private_post; ?>

<div class="container">
	<div class="form-password  form-container">
		<div class="lock-icon">
			<i class="icon-lock"></i>
		</div>
		<div class="protected-area-text">
			<?php
			_e( 'This is a protected area.', 'rosa' );

			if ( $wpgrade_private_post['error'] ) {
				echo $wpgrade_private_post['error']; ?>
				<span class="gray"><?php _e( 'Please enter your password again.', 'rosa' ); ?></span>
			<?php } else { ?>
				<span class="gray"><?php _e( 'Please enter your password to continue.', 'rosa' ); ?></span>
			<?php } ?>
		</div>
		<form class="auth-form" method="post" action="<?php echo wp_login_url() . '?action=postpass'; // just keep this action path ... wordpress will refear for us?>">
			<div class="protected-form-container">
				<div class="protected-password-field">
					<?php wp_nonce_field( 'password_protection', 'submit_password_nonce' ); ?>
					<input type="hidden" name="submit_password" value="1"/>
					<input type="password" name="post_password" id="auth_password" class="auth__pass" placeholder="<?php _e( "Password", 'rosa' ) ?>"/>
				</div>
				<div class="protected-submit-button">
					<input type="submit" name="Submit" id="auth_submit" class="auth__submit  btn" value="<?php _e( "Authenticate", 'rosa' ) ?>"/>
				</div>
			</div>
		</form>
	</div>
</div><!-- .content -->