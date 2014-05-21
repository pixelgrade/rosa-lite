<?php

	/**
	 * Enqueues the JavaScript files needed depending on the current section.
	 */
	function wpgrade_callback_update_notifier_admin_initialization() {
		if (isset($_GET['page']) && ($_GET['page'] == 'theme-update-notifier')) {
			wp_enqueue_script('jquery');
			wp_enqueue_script('avgrund', wpgrade::coreuri().'resources/assets/update-notifier/jquery.avgrund.min.js');
			wp_enqueue_style('avgrund-style', wpgrade::coreuri().'resources/assets/update-notifier/avgrund.css');
			wp_enqueue_script('wpgrade-update', wpgrade::coreuri().'resources/assets/update-notifier/update-notifier.js');
			wp_enqueue_style('wpgrade-update-style', wpgrade::coreuri().'resources/assets/update-notifier/update-notifier.css');
		}
	}

	/**
	 * Adds an update notification to the WordPress Dashboard menu
	 */
	function wpgrade_callback_update_notifier_menu() {
		if (wpgrade::option('themeforest_upgrade')) {
			// stop if simplexml_load_string funtion isn't available
			if (function_exists('simplexml_load_string')) {
				$newversion = wpgrade_update_notifier_check_if_new_version();
				$count = (isset($_GET['wpgrade_update']) &&  $_GET['wpgrade_update'] == 'true') ? '' : '<span class="update-plugins count-1"><span class="update-count">1</span></span>';

				// compare current theme version with the remote XML version
				if ($newversion) {
					add_dashboard_page
						(
							wpgrade::themename().' Theme Updates',
							wpgrade::themename().' Update '.$count,
							'administrator',
							wpgrade::update_notifier_pagename(),
							'update_notifier'
						);
				}
			}
		}
	}

	/**
	 * Adds an update notification to the Admin Bar
	 */
	function wpgrade_callback_update_notifier_bar_menu() {
		if (wpgrade::option('themeforest_upgrade')) {
			// stop if simplexml_load_string funtion isn't available
			if (function_exists('simplexml_load_string')) {
				global $wp_admin_bar, $wpdb;

				// don't display notification in admin bar if it's disabled or
				// the current user isn't an administrator
				if ( ! is_super_admin() || ! is_admin_bar_showing()) {
					return;
				}

				$newversion = wpgrade_update_notifier_check_if_new_version();

				// compare current theme version with the remote XML version
				if ($newversion) {
					$wp_admin_bar->add_menu
						(
							array
							(
								'id' => 'update_notifier',
								'title' => '<span>'.wpgrade::themename().' <span id="ab-updates">New Updates</span></span>',
								'href' => get_admin_url().'index.php?page=theme-update-notifier'
							)
						);
				}
			}
		}
	}

	/**
	 * Let the user know what is happening and if everything went well
	 */
	function wpgrade_callback_update_notifier_update_notice(){
		if (wpgrade::option('themeforest_upgrade')) {
			$message_type = "updated";
			if (wpgrade::state()->has('theme_updated') && isset($_GET['wpgrade_update']) &&  $_GET['wpgrade_update'] == 'true') {
				if (wpgrade::state()->get('theme_updated')) {
					$message = 'The theme has been updated successfully';

					//in case we have backups activated
					//add a link to download the backup archive
					$backup_uri =  wpgrade::state()->get('backup_uri', null);

					if ( !empty( $backup_uri ) ) {
						$message .= '<br/><br/><i>'.__('If you want, you can download the automatic theme backup.', wpgrade::textdomain()).' <a href="' . $backup_uri . '" title="' . esc_attr( __( 'Download Backup', wpgrade::textdomain() ) ) . '">' . esc_attr( __( 'Download Backup', wpgrade::textdomain() ) ) . '</a></i>';
					}
				}
				else { // error while updating theme
					$message
						= '<b>'.__('Upgrade Process Failed', wpgrade::textdomain()).'</b><br>'
						. __('The process has encountered the following errors:', wpgrade::textdoamin());

					$upgrader = wpgrade::state()->get('theme_upgrader', null);

					$message .= '<ul style="list-style-type: square; margin: 0; padding: 0 25px;">';
					if ($upgrader !== null) {
						foreach ($upgrader->upgrade_errors() as $error) {
							$message .= "<li>$error</li>";
						}
					}
					else { // failed to retrieve upgrade handler
						$message .= '<li>'.__('Upgrade handler failed to initialize self-diagnostics. (please contact support)', wpgrade::textdomain()).'</li>';
					}
					$message .= '</ul>';

					/*
					$message = 'An error occurred, the theme has not been updated. Please try again later or install the update manually.';
					$theme_update_error = wpgrade::state()->get('theme_update_error', array());

					if (isset($theme_update_error[1])) {
						$message .= '<br/>(Error message: '.$theme_update_error[1].')';
					}
					*/

					$message_type = "error";
				}
			}
			elseif (wpgrade::state()->get('curl_disabled', false)) {
				$message = 'Error: The theme was not updated, because the cURL extension is not enabled on your server. In order to update the theme automatically, the Envato Toolkit Library requires cURL to be enabled on your server. You can contact your hosting provider to enable this extension for you.';
				$message_type = "error";
			}
			elseif (wpgrade::state()->has('backup_failed') && wpgrade::state()->get('backup_failed') === true ) {
				$message
					= '<b>'.__('Upgrade Backup Process Failed', wpgrade::textdomain()).'</b><br>'
					. __('The backup process has encountered the following errors:', wpgrade::textdomain());

				$upgrader = wpgrade::state()->get('theme_upgrader', null);

				$message .= '<ul style="list-style-type: square; margin: 0; padding: 0 25px;">';
				if ($upgrader !== null) {
					foreach ($upgrader->backup_errors() as $error) {
						$message .= "<li>$error</li>";
					}
				}
				else { // failed to retrieve upgrade handler
					$message .= '<li>'.__('Upgrade handler failed to initialize self-diagnostics. (please contact support)', wpgrade::textdomain()).'</li>';
				}
				$message .= '</ul>';

				// @todo in translation refactor :theme_options_url to use absolute url instead of relative
				// @todo update based on basecamp discussion
				$message
					.= '<i>'.strtr(__('You may bypass the backup system by turning off automatic backups in your <a href=":theme_options_url">utilities section of theme options</a>.', wpgrade::textdomain()), array(':theme_options_url' => admin_url('admin.php?page=bucket_options&amp;tab=6')))
					.'<br>'.__('Should you choose to disable automatic backups you are <b>strongly encouraged to perform a manual backup</b>.', wpgrade::textdomain())
					.'<br>'.__('Skipping the backup process entirely will result, upon a failed upgrade attempt, in the loss of any modifications you have made to the theme.', wpgrade::textdomain())
					.'</i>'
					.'<br><br><b>'.__('Tip', wpgrade::textdomain()).'</b>: '.__('Modifying a theme via a child theme is the best way to easily deal with theme upgrade issues.', wpgrade::textdomain());

				$message_type = "error";
			}

			if (isset($message)) {
				echo '<div class="'.$message_type.'"><p>'.$message.'</p></div>';
			}
		}
	}
