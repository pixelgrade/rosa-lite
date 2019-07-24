<?php
if ( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

global $rosa_private_post; ?>

<div class="container">
	<div class="form-password  form-container">
		<div class="lock-icon">
            <svg width="54px" height="54px"  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
		</div>
		<div class="protected-area-text">
			<?php
			esc_html_e( 'This is a protected area.', 'rosa-lite' );

			if ( $rosa_private_post['error'] ) {
				echo wp_kses_post( $rosa_private_post['error'] ); ?>
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
</div>
