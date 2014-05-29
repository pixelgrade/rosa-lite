<?php defined( 'ABSPATH' ) or die;
// get the latest remote XML file on our server
$xml = wpgrade_update_notifier_latest_theme_version( wpgrade::update_notifier_cacheinterval() );
// read theme current version from the style.css
$theme_data  = wpgrade::themedata();
$options_url = admin_url( 'index.php?page=' . wpgrade::update_notifier_pagename() . '&wpgrade_update=true' );

// compute envatoDetails
if ( wpgrade::option( 'marketplace_username' ) && wpgrade::option( 'marketplace_api_key' ) ) {
	$envatoDetails = 'true';
} else { // ! marketplace_username || ! marketplace_api_key
	$envatoDetails = 'false';
}
?>

<script type="text/javascript">
	var wpGradeUpdateData = {
		optionsLink: "<?php echo $options_url; ?>",
		envatoDetails: <?php echo $envatoDetails ?>
	};
</script>

<div class="wrap">

	<div id="icon-tools" class="icon32"></div>

	<h2><?php echo wpgrade::themename() ?> Theme Updates</h2>

	<?php if ( ! ( isset( $_GET['wpgrade_update'] ) && $_GET['wpgrade_update'] == 'true' )): ?>

	<div id="message" class="updated below-h2">
		<p>
			<strong><?php echo $xml->message; ?></strong> You have version <?php echo $theme_data->Version; ?>
			installed.
			Please update to version <?php echo $xml->latest; ?>.
		</p>
	</div>

	<div id="instructions">

		<div class="two-columns">
			<h3>Automatic Update Instructions</h3>

			<p>
				<i><b>Important</b>: With the automatic theme update <u>any code modifications</u> to the theme's code
					<u>will be lost</u>, so please
					make sure you have a <b>backup copy of the theme files</b> before you update the theme.</i>
			</p>

			<p>
				Before proceeding, please ensure the following requirements are met:<br/>
			<ol class="list-style-type: decimal">
				<li><b>Make sure your ThemeForest/Envato Marketplace credentials have been configured.</b>
					If you haven't done so already please go to <span class="syspath-help">Theme Options &raquo; <a
							href="<?php echo admin_url( 'admin.php?page=' . wpgrade::shortname() . '_options&tab=8' ) ?>">Utilities</a></span>
					section and add your <b>ThemeForest/Envato Marketplace username</b> and <b>ThemeForest/Envato Secret
						API Key</b> in the corresponding fields.
				</li>

				<li><b>Ensure the name of the folder that contains the theme files is called
						"<?php echo wpgrade::shortname(); ?>"</b>. This is the default directory name,
					if you haven't modified it manually, the name of the folder on your server should be called
					"<?php echo wpgrade::shortname(); ?>" otherwise please change it back.
				</li>
			</p>

			<div id="automatic-instructions">
				<div id="upgrade-instructions-style" class="automatic-update">
					<div class="auto-updater-app">
						<h3>Last chance to turn back</h3>

						<p><b>The automatic update process will replace all your theme files.</b>

						<p>

						<p>Are you sure you want to continue?</p>
						<button class="confirm-upgrade">Replace Theme With Updated Version</button>
						<button class="cancel-upgrade">Cancel Upgrade</button>
					</div>
				</div>
			</div>

			<div class="auto-updater-steps upgrade-app-template">

				<h3>Upgrade in progress...</h3>

				<ol class="upgrade-steps">
					<li class="done">Initializing Update System</li>
					<li class="current wpgrade-upgrade-step-verify-credentials">Verifying Marketplace Credentials</li>
					<li class="pending wpgrade-upgrade-step-searching-for-update">Searching for Update</li>
					<li class="pending wpgrade-upgrade-step-creating-backup">Creating Backup</li>
					<li class="pending wpgrade-upgrade-step-analysing-server-download-options">
						Analysing Server Download Options
					</li>
					<li class="pending wpgrade-upgrade-step-downloading-theme-updates">
						Downloading Theme Updates<br>
							<span class="wpg-download-progress">
								<span class="method-info"></span>
								<span class="downloaded">
									<br> Progress:
									<span class="done"></span> /
									<span class="total"></span>
									<span class="type"></span>
								</span>
							</span>
					</li>
					<li class="pending wpgrade-upgrade-step-installing-theme-updates">Installing Theme Updates</li>
				</ol>

			</div>

			<div class="auto-updater-steps-ajax-failure upgrade-app-template">
				<h3>Auto-Upgrade Failed!</h3>

				<p>The upgrade process has been stopped due to a critical error. <b>No data has been lost.</b></p>

				<p>It is possible this is a problem with your server configuration. If you believe this to be a fluke
					(ie. potential problems due to high site load) feel free to restart the process.</p>

				<p><i>For assistance in diagnosing the problem please refer to the included documentation or contact
						support.</i></p>
				<hr/>
				<p>If you have access to the server feel free to try the manual upgrade method.</p>
			</div>

			<div class="auto-updater-success upgrade-app-template">
				<h3>Upgrade <b>Succesful</b>!</h3>

				<p>Thank you for upgrading. Your theme is now at the latest version.</p>
			</div>

			<a href="" class="button-primary" id="update-btn"><!--
					-->Start Automatic Update<!--
				--></a>
		</div>

		<div class="two-columns no-margin">
			<h3>Manual Update Instructions</h3>

			<p><b>It is recommended to manually install the update if you have done some modifications to the theme's
					code.</b></p>

			<p>Before proceeding create a backup copy of the current theme you have installed (and modified).</p>

			<p>
				<a id="manual-instructions-btn" class="button-primary">View Update Instructions</a>
			</p>

			<div id="manual-instructions" title="Manual Update Instructions">
				<div id="upgrade-instructions-style">

					<h3>Manual Update Instructions</h3>

					<p>
						To download the latest update of the theme, login to <a href="http://www.themeforest.net/">ThemeForest</a>,
						head over to the <strong>Downloads</strong> section in your profile and download the theme again
						like you
						did when you bought it.
					</p>

					<p>There are two main ways to manually install the update:</p>
					<ol>
						<li>
							<b>Install Update by uploading the theme as a new theme (recommended)</b> This is the
							easiest and recommended way. You just have to upload
							the updated theme zip file via the built in WordPress theme uploader as a new theme from
							<span class="syspath-help">Appearance &raquo; Themes &raquo; Install Themes &raquo;
								Upload</span>
							<br>

							<div class="note_box">
								<i><b>Note</b>: When activating the new theme it is possible that your menu settings are
									not kept for the new theme.
									If experience this issue, please go to <span class="syspath-help">Appearance &raquo;
										Menus &raquo; Theme Locations</span>,
									select the menu (it is still there) and press the <b>Save</b> button</i>.
							</div>
						</li>
						<li>
							<i><b>Install Update via FTP</b></i> First unzip the zipped theme file, then you can use a
							FTP client
							(such as <a href="http://filezilla-project.org/download.php">FileZilla</a>) and replace all
							the theme files with the updated version.

							<div class="note_box">
								<i><b>Note</b>: By replacing the files all code changes you have made to the files
									(assuming you've made any) will be lost.
									We recommend making a backup copy of the files before you replacing them. Settings
									you have
									made from the Admin panel (ie. Theme Options and other places) won't be lost.</i>
							</div>

						</li>
					</ol>
				</div>
			</div>

			<div class="clear"></div>

			<p><i>For more information about manual updates, please refer to the "Updates" section of the included
					documentation.</i></p>

			<br/>

		</div>
		<?php endif; ?>

		<hr class="instructions-chagelog-seperator" style=""/>

		<div class="icon32 icon32-posts-page" id="icon-edit-pages">
			<br>
		</div>

		<h2 class="title" id="changes-title">Update Changes</h2>

		<div id="changelog">
			<?php echo $xml->changelog; ?>
		</div>

	</div>
