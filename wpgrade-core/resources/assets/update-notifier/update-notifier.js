/*
 * Update notofier page setup.
 */
;
(function ($) {

	$(function () {

		"use strict";

		var program = {
			status: 'pending',
			download: {
				method: null,
				'accept-ranges': 'none',
				'content-length': -1
			}
		};

		// indexOf is not available on Array for IE8 and bellow
		// the following fix resolves the issue with out patching the prototype
		var indexOf = function (needle) {
			if (typeof Array.prototype.indexOf === 'function') {
				indexOf = Array.prototype.indexOf;
			}
			else {
				indexOf = function (needle) {
					var i = -1, index = -1;

					for (i = 0; i < this.length; i++) {
						if (this[i] === needle) {
							index = i;
							break;
						}
					}

					return index;
				};
			}

			return indexOf.call(this, needle);
		};

		// we use this constant to delay error messages so that the user can
		// recognize the last step the process failed, if we let thing run at
		// normal speed then it's not possible for anyone to tell if the
		// process borked at step one or step four, if the interval between
		// step one and four is less then 100ms
		var USER_RECOGNITION_DELAY = 1000; // 1 second

		// Automatic Upgrade Process
		// -------------------------

		var init_app = function () {
			// general targets
			var $upgrade_app = $('.auto-updater-app'),
				$upgrade_app_steps = $('.auto-updater-steps'),
				$ajax_failure_state = $('.auto-updater-steps-ajax-failure'),
				$upgrade_successful = $('.auto-updater-success');

			// steps
			var $step_verify_credentials = $('.wpgrade-upgrade-step-verify-credentials'),
				$step_searching_for_update = $('.wpgrade-upgrade-step-searching-for-update'),
				$step_creating_backup = $('.wpgrade-upgrade-step-creating-backup'),
				$step_analyzing_download_options = $('.wpgrade-upgrade-step-analysing-server-download-options'),
				$step_downloading_theme_updates = $('.wpgrade-upgrade-step-downloading-theme-updates'),
				$step_installing_theme_updates = $('.wpgrade-upgrade-step-installing-theme-updates');

			// state reset; required for proper display on multiple calls on the same page load
			$step_verify_credentials.removeClass('done').addClass('current');
			$step_searching_for_update.removeClass('done').removeClass('current').addClass('pending');
			$step_creating_backup.removeClass('done').removeClass('current').addClass('pending');
			$step_analyzing_download_options.removeClass('done').removeClass('current').addClass('pending');
			$step_downloading_theme_updates.removeClass('done').removeClass('current').addClass('pending');
			$step_installing_theme_updates.removeClass('done').removeClass('current').addClass('pending');
			$('.wpg-download-progress', $step_downloading_theme_updates).hide();

			var ajax_parsererror = function () {
				setTimeout(function () {
					$upgrade_app
						.fadeOut('fast', function () {
							$upgrade_app.html($ajax_failure_state.html())
								.fadeIn('slow');
						});
				}, USER_RECOGNITION_DELAY);
			};

			var parse_jsend = function (jsend, processor) {
				if (typeof jsend === 'object' && 'status' in jsend) {
					if (jsend['status'] == 'success') {
						processor(jsend['status'], jsend['data']);
					}
					else if (jsend['status'] == 'fail') {
						processor(jsend['status'], jsend['data']);
					}
					else if (jsend['status'] == 'error') {
						if ('message' in jsend) {
							if (typeof jsend['message'] == 'string') {
								setTimeout(function () {
									$upgrade_app
										.fadeOut('fast', function () {
											$upgrade_app
												.html(jsend['message'])
												.fadeIn('slow');
										});
								}, USER_RECOGNITION_DELAY);
							}
							else { // non-string message
								console.log('jsend: recieved error status, but a non-string message attribute');
								ajax_parsererror();
							}
						}
						else { // missing 'message'
							console.log('jsend: recieved error status, but no message attribute');
							ajax_parsererror();
						}
					}
					else { // unrecognized jsend status
						console.log('jsend: unrecognized status');
						ajax_parsererror();
					}
				}
				else { // missing 'status'
					console.log('jsend: missing required status parameter');
					ajax_parsererror();
				}
			};

			var parse_wpgrade_state = function (actionkey, valid_states, processor, params) {

				if (params == null) {
					params = {};
				}

				params['action'] = actionkey;

				setTimeout(function () {
					$.ajax({
						type: 'POST',
						url: ajaxurl,
						data: params,
						dataType: 'json',
						success: function (data, textStatus, XMLHttpRequest) {
							parse_jsend(data, function (status, data) {
								if (typeof data === 'object' && 'state' in data) {
									if (data['state'] === 'error') {
										if ('html' in data) {
											if (typeof data['html'] == 'string') {
												setTimeout(function () {
													$upgrade_app
														.fadeOut('fast', function () {
															$upgrade_app
																.html(data['html'])
																.fadeIn('slow');
														});
												}, USER_RECOGNITION_DELAY);
											}
											else { // non-string html message
												console.log('wpgrade: recieved error, but a non-string "html" attribute');
												ajax_parsererror();
											}
										}
										else { // missing html
											console.log('wpgrade: expected "html" in data of jsend response');
											ajax_parsererror();
										}
									}
									else if (indexOf.call(valid_states, data['state']) == -1) {
										console.log('wpgrade: encountered invalid state [' + data['state'] + '] for action [' + actionkey + ']');
										ajax_parsererror();
									}
									else { // valid states
										processor(data);
									}
								}
								else { // missing 'state'
									console.log('wpgrade: expected "state" in data of jsend response');
									ajax_parsererror();
								}
							});
						},
						error: function (MLHttpRequest, textStatus, errorThrown) {
							console.log('Ajax:STDERR', textStatus, errorThrown);
							ajax_parsererror();
						}
					});
				}, USER_RECOGNITION_DELAY);
			};

			var fin = function () {
				program['status'] = 'finished';
				setTimeout(function () {
					$('a.avgrund-close').trigger('click');
					var wp_body = $('#wpbody-content');
					wp_body.html($upgrade_successful.html());
				}, USER_RECOGNITION_DELAY);
			};

			var install_update = function () {
				$step_installing_theme_updates = $('.wpgrade-upgrade-step-installing-theme-updates');

				$step_installing_theme_updates
					.removeClass('pending')
					.addClass('current');

				parse_wpgrade_state
				(
					'wpgrade_upgradestep_install_package',
					['success'],
					function (data) {
						$step_installing_theme_updates
							.addClass('done')
							.removeClass('current');

						fin();
					}
				);
			};

			var download_part = function (part, partsize, processor) {
				var start = part * partsize,
					end = start + partsize - 1;

				if (end > program['download']['content-length'] - 1) {
					end = program['download']['content-length'] - 1;
				}

				parse_wpgrade_state
				(
					'wpgrade_upgradestep_download_package',
					['success'],
					function (data) {
						$step_downloading_theme_updates = $('.wpgrade-upgrade-step-downloading-theme-updates');
						var $download_progress = $('.wpg-download-progress', $step_downloading_theme_updates);
						$('.downloaded .done', $download_progress).html(Math.floor((end + 1) / 1024));
						processor(part, partsize, data);
					},
					{
						method: program['download']['method'],
						startbytes: start,
						endbytes: end,
						'content-length': program['download']['content-length']
					}
				);
			};

			var download_update = function () {
				$step_downloading_theme_updates = $('.wpgrade-upgrade-step-downloading-theme-updates');

				$step_downloading_theme_updates
					.removeClass('pending')
					.addClass('current');

				if (program['download']['method'] === 'ajax-bytes-range') {
					var partsize = 512000; // 500 kilobytes at a time
					var parts = Math.ceil(program['download']['content-length'] / partsize);
					var part = 0;

					var part_handler = function (part, partsize, data) {
						if ((part < parts) && ((part + 1) * partsize <= program['download']['content-length'])) {
							download_part(part + 1, partsize, part_handler);
						}
						else { // finished parts
							$step_downloading_theme_updates
								.addClass('done')
								.removeClass('current');

							install_update();
						}
					};

					download_part(part, partsize, part_handler);
				}
				// @todo implement direct download method
//				else if (program['download']['method'] == 'direct') {
				else { // unknown method
					console.log('wpgrade: download system does not know how to handle the method ' + program['download']['method']);
					ajax_parsererror();
					return;
				}
			};

			var analyze_download_options = function () {
				$step_analyzing_download_options = $('.wpgrade-upgrade-step-analysing-server-download-options');

				$step_analyzing_download_options
					.removeClass('pending')
					.addClass('current');

				parse_wpgrade_state
				(
					'wpgrade_upgradestep_analyze_download_options',
					['success'],
					function (data) {
						program['download']['content-length'] = parseInt(data['info']['content-length']);
						program['download']['accept-ranges'] = data['info']['accept-ranges'];
						$step_downloading_theme_updates = $('.wpgrade-upgrade-step-downloading-theme-updates');
						var $download_progress = $('.wpg-download-progress', $step_downloading_theme_updates);

						if (data['info']['accept-ranges'] == 'bytes') {
							program['download']['method'] = 'ajax-bytes-range';
							$('.method-info', $download_progress).html('Downloading using the Range method.');
							$('.downloaded').show();
							$('.downloaded .done', $download_progress).html('0');
							$('.downloaded .total', $download_progress).html(Math.floor(program['download']['content-length'] / 1024));
							$('.downloaded .type', $download_progress).html('kilobytes'); // intentionally not "kibibytes" to avoid people asking
						}
						else if (data['info']['accept-ranges'] == 'none') {
							program['download']['method'] = 'direct';
							$('.method-info', $download_progress).html('Downloading using the Direct method.');
							$('.downloaded').hide();
							$('.downloaded .done', $download_progress).html('');
							$('.downloaded .total', $download_progress).html('');
							$('.downloaded .type', $download_progress).html('');
						}
						else { // unknown
							console.log('wpgrade: expected none or bytes, but got ' + data['info']['accept-ranges']);
							ajax_parsererror();
							return;
						}

						$download_progress.show();

						$step_analyzing_download_options
							.addClass('done')
							.removeClass('current');

						download_update();
					}
				);
			};

			var create_backup = function () {
				$step_creating_backup = $('.wpgrade-upgrade-step-creating-backup');

				$step_creating_backup
					.removeClass('pending')
					.addClass('current');

				parse_wpgrade_state
				(
					'wpgrade_upgradestep_backup_theme',
					['available'],
					function (data) {
						$step_creating_backup
							.addClass('done')
							.removeClass('current');

						analyze_download_options();
					}
				);
			};

			var search_for_update = function () {
				$step_searching_for_update = $('.wpgrade-upgrade-step-searching-for-update');

				$step_searching_for_update
					.removeClass('pending')
					.addClass('current');

				parse_wpgrade_state
				(
					'wpgrade_upgradestep_search_for_update',
					['available'],
					function (data) {
						$step_searching_for_update
							.addClass('done')
							.removeClass('current');

						create_backup();
					}
				);
			};

			var confirm_credentials = function () {
				$step_verify_credentials = $('.wpgrade-upgrade-step-verify-credentials');

				parse_wpgrade_state
				(
					'wpgrade_upgradestep_check_marketplace_data',
					['available'],
					function (data) {
						$step_verify_credentials
							.addClass('done')
							.removeClass('current');

						search_for_update();
					}
				);
			};

			$('.cancel-upgrade', $upgrade_app).on('click', function (event) {
				event.preventDefault();
				$('.avgrund-close').trigger('click');
				$('.avgrund-close').trigger('click');
			});

			$('.confirm-upgrade', $upgrade_app).on('click', function (event) {
				event.preventDefault();
				$upgrade_app.html($upgrade_app_steps.html());
				confirm_credentials();
			});
		};

		// Setup the pupup instances
		// -------------------------

		$('#manual-instructions-btn').avgrund({
			template: $('#manual-instructions'),
			width: 640, // max is 640px
			height: 350, // max is 350px
			showClose: true, // switch to 'true' for enabling close button
			showCloseText: 'close',
			overlayClass: 'avgrund-overlay-hook'
		});

		$('#update-btn').avgrund({
			template: $('#automatic-instructions'),
			width: 640, // max is 640px
			height: 350, // max is 350px
			showClose: true, // switch to 'true' for enabling close button
			showCloseText: 'close',
			overlayClass: 'avgrund-overlay-hook',
			onLoad: function () {
				// initialize app; onLoad is before template is loaded so we
				// have to delay the even handler initialization slightly
				setTimeout(init_app, 300);
			},
			onUnload: function () {
				if (program['state'] === 'finished') {
					window.location.reload(true);
				}
			}
		});

	});

}(jQuery));
