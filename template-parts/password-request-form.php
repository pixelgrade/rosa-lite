<?php
if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

global $rosa_private_post; ?>

<div class="container">
	<div class="form-password  form-container">
		<div class="lock-icon">
			<i class="icon-lock"></i>
		</div>
		<div class="protected-area-text">
			<?php
			esc_html_e( 'This is a protected area.', 'rosa-lite' );

			if ( $rosa_private_post['error'] ) {
				echo $rosa_private_post['error']; ?>
				<span class="gray"><?php esc_html_e( 'Please enter your password again.', 'rosa-lite' ); ?></span>
			<?php } else { ?>
				<span class="gray"><?php esc_html_e( 'Please enter your password to continue.', 'rosa-lite' ); ?></span>
			<?php } ?>
		</div>
		<form class="auth-form" method="post" action="<?php echo esc_url( wp_login_url() . '?action=postpass' ); // just keep this action path ... WordPress will refer for us?>">
			<div class="protected-form-container">
				<div class="protected-password-field">
					<?php wp_nonce_field( 'password_protection', 'submit_password_nonce' ); ?>
					<input type="hidden" name="submit_password" value="1"/>
					<input type="password" name="post_password" id="auth_password" class="auth__pass" placeholder="<?php esc_attr_e( 'Password', 'rosa-lite' ) ?>"/>
				</div>
				<div class="protected-submit-button">
					<input type="submit" name="Submit" id="auth_submit" class="auth__submit  btn" value="<?php esc_attr_e( 'Authenticate', 'rosa-lite' ) ?>"/>
				</div>
			</div>
		</form>
	</div>
</div><!-- .content -->
