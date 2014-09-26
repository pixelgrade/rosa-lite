(function ($) {

	$(document).ready(function () {
		//The demo data import-----------------------------------------------------
		var importButton = jQuery('#wpGrade_import_demodata_button'),
			container = jQuery('#redux-form-wrapper');

		var saveData = {
			container: container,
			ajaxUrl: $('input[name=wpGrade_import_ajax_url]', container).val(),
			optionSlug: $('input[name=wpGrade_options_page_slug]', container).val(),
			nonceImportPostsPages: $('input[name=wpGrade-nonce-import-posts-pages]', container).val(),
			nonceImportThemeOptions: $('input[name=wpGrade-nonce-import-theme-options]', container).val(),
			nonceImportWidgets: $('input[name=wpGrade-nonce-import-widgets]', container).val(),
			ref: $('input[name=_wp_http_referer]', container).val()
		};

		//bind to click
		importButton.bind('click', {set: saveData}, function (receivedData) {
			var button = $(this),
				me = receivedData.data.set,
				waitLabel = $('.wpGrade_import_demodata_wait', me.container),
				answer = "",
				activate = true;
			var resultcontainer = $('.wpGrade-import-results', me.container);

			if (button.is('.wpGrade_button_inactive')) return false;

			activate = confirm('Importing the demo data will overwrite your current Theme Options settings. Proceed anyway?');

			if (activate == false) return false;

			//these hold the ajax responses
			var responseRaw = null;
			var res = null;
			var stepNumber = 0;
			var numberOfSteps = 10;

			//this is the ajax queue
			var qInst = $.qjax({
				timeout: 3000,
				ajaxSettings: {
					//Put any $.ajax options you want here, and they'll inherit to each Queue call, unless they're overridden.
					type: "POST",
					url: ajaxurl
				},
				onQueueChange: function (length) {
					if (length == 0) {
						if (res.errors == false) {
							setTimeout(function () {
								//hide the loading
								$('.wpGrade-loading-wrap', me.container).slideUp(400);
							}, 1000);

							setTimeout(function () {
								resultcontainer.append('<i>All done!</i><br />');
							}, 1000);

							setTimeout(function () {
								$('body').wpGrade_popup({
									title: 'Phew...that was a hard one!',
									text: 'The demo data was imported without a glitch! Awesome! <br/><br/>Remember to update the passwords and roles of imported users. <br/><br/><i>We will now reload the page so you can see the brand new data!</i>',
									time_to_show: 9000
								}, function () {
									window.location.hash = "#wpwrap";
									window.location.reload(true);
								});
							}, 2000);
						} else {
							//we have errors
							//re-enable the import button
							button.removeClass('button-disabled');

							//hide the loading
							$('.wpGrade-loading-wrap', me.container).slideUp().addClass("hidden");

							//script was called but aborted before finishing import
							$('body').wpGrade_popup({
								popup_class: 'error',
								title: 'Total Bummer...',
								text: 'The import didn\'t work completely! <br/> Check out the errors given. You might want to try reloading the page and then try again.',
								time_to_show: 5000
							});
						}
					}
				},
				onError: function () {
					//stop everything on error
					if (res.errors != null && res.errors != false) {
						qInst.Clear();
					}
				},
				//				onTimeout: function(current) {
				//				},
				//				onStart: function() {
				//				},
				onStop: function () {
					//stop everything on error
					if (res.errors != null && res.errors != false) {
						qInst.Clear();
					}
				}
			});

			function ajax_import_posts_pages_stepped() {
				//add to queue the calls to import the posts, pages, custom posts, etc
				stepNumber = 0;
				while (stepNumber < numberOfSteps) {
					stepNumber++;
					qInst.Queue({
						type: "POST",
						url: me.ajaxUrl,
						data: {
							action: 'wpGrade_ajax_import_posts_pages',
							_wpnonce: me.nonceImportPostsPages,
							_wp_http_referer: me.ref,
							step_number: stepNumber,
							number_of_steps: numberOfSteps
						}
					})
						.fail(function (response) {
							responseRaw = response;
							res = wpAjax.parseAjaxResponse(response, 'notifier');
							resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed...</i><br />');
						})
						.done(function (response) {
							responseRaw = response;
							res = wpAjax.parseAjaxResponse(response, 'notifier');
							if (res != null && res.errors != null) {
								if (res.errors == false) {
									if (res.responses[0] != null) {
										resultcontainer.append('<i>Importing posts | Step ' + res.responses[0].supplemental.stepNumber + ' of ' + res.responses[0].supplemental.numberOfSteps + '</i><br />');
										//for debuging purposes
										resultcontainer.append('<div style="display:none;visibility:hidden;">Return data:<br />' + res.responses[0].data + '</div>');
									} else {
										resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed</i><br />Error: ' + res.responses[0].data);
									}
								}
								else {
									if (res.responses[0] != null) {
										resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed</i><br />(The script returned the following message: ' + res.responses[0].errors[0].message + ' )<br/>');
									} else {
										resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed</i><br />Error: ' + res.responses[0].data);
									}
								}
							} else {
								resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed. You can reload the page and try again.</i><br />');
							}
						});
				}
			}

			function ajax_import_theme_options() {
				//make the call for importing the theme options
				qInst.Queue({
					type: "POST",
					url: me.ajaxUrl,
					data: {
						action: 'wpGrade_ajax_import_theme_options',
						_wpnonce: me.nonceImportThemeOptions,
						_wp_http_referer: me.ref
					}
				})
					.fail(function (response) {
						responseRaw = response;
						res = wpAjax.parseAjaxResponse(response, 'notifier');
						resultcontainer.append('<i style="color:red">The importing of the theme options has failed...</i><br />');
					})
					.done(function (response) {
						responseRaw = response;
						res = wpAjax.parseAjaxResponse(response, 'notifier');
						if (res != null && res.errors != null) {
							if (res.errors == false) {
								resultcontainer.append('<i>Finished importing the demo theme options...</i><br />');

								//for debuging purposes
								resultcontainer.append('<div style="display:none;visibility:hidden;">Return data:<br />' + res.responses[0].data + '</div>');
							}
							else {
								resultcontainer.append('<i style="color:red">The importing of the theme options has failed</i><br />(The script returned the following message: ' + res.responses[0].errors[0].message + ' )<br/><br/>');
							}
						} else {
							resultcontainer.append('<i style="color:red">The importing of the theme options has failed</i><br />');
						}
					});
			}

			function ajax_import_widgets() {
				//make the call for importing the widgets and the menus
				qInst.Queue({
					type: "POST",
					url: me.ajaxUrl,
					data: {
						action: 'wpGrade_ajax_import_widgets',
						_wpnonce: me.nonceImportWidgets,
						_wp_http_referer: me.ref
					}
				})
					.fail(function () {
						responseRaw = response;
						res = wpAjax.parseAjaxResponse(response, 'notifier');
						resultcontainer.append('<i style="color:red">The setting up of the demo widgets failed...</i><br />');
					})
					.done(function (response) {
						responseRaw = response;
						res = wpAjax.parseAjaxResponse(response, 'notifier');
						if (res != null && res.errors != null) {
							if (res.errors == false) {
								resultcontainer.append('<i>Finished setting up the demo widgets...</i><br />');

								//for debuging purposes
								resultcontainer.append('<div style="display:none;visibility:hidden;">Return data:<br />' + res.responses[0].data + '</div>');
							}
							else {
								resultcontainer.append('<i style="color:red">The setting up of the demo widgets failed</i><br />(The script returned the following message: ' + res.responses[0].errors[0].message + ' )<br/><br/>');
							}
						} else {
							resultcontainer.append('<i style="color:red">The setting up of the demo widgets failed</i><br />');
						}
					});
			}

			//show the loader and some messages
			//show loader
			$('.wpGrade-loading-wrap', me.container).css({
				opacity: 0,
				display: "block",
				visibility: 'visible'
			}).removeClass("hidden").animate({opacity: 1});
			//disable the import button
			button.addClass('button-disabled');

			resultcontainer.removeClass('hidden');
			resultcontainer.append('<br /><i>Working...</i><br />');

			//queue the calls
			ajax_import_theme_options();
			ajax_import_widgets();
			ajax_import_posts_pages_stepped();

			return false;
		});
	});

	$.fn.wpGrade_popup = function (variables, callback) {
		var defaults = {
			popup_class: 'success',		//success, alert
			title: 'Notification', //default title
			text: 'All things are good! Carry on...', //default message
			time_to_show: 3000 //the number of seconds to show the popup
		};

		var options = $.extend(defaults, variables);

		return this.each(function () {
			var container = $(this),
				notification = $('<div/>').addClass('wpGrade_popup wpGrade_popup_' + options.popup_class)
					.css('opacity', 0)
					.html('<div class="wpGrade_popup_title"><span class="wpGrade_popup_icon"></span> ' + options.title + '</div><div class="wpGrade_popup_content">' + options.text + '</div>')
					.appendTo(container);

			notification.animate({opacity: 1}, function () {
				notification.delay(options.time_to_show).fadeOut(function () {
					notification.remove();
					if (typeof callback == 'function') callback();
				});
			});
		});
	};


	/*
	 * jQuery plugin v1.5.2 - https://github.com/PortableSheep/qJax
	 * Copyright 2011-2013, Michael Gunderson - Dual licensed under the MIT or GPL Version 2 licenses.
	 */
	(function ($) {
		$.qjax = function (o) {
			var opt = $.extend({
					timeout: null,
					onStart: null,
					onStop: null,
					onError: null,
					onTimeout: null,
					onQueueChange: null,
					queueChangeDelay: 0,
					ajaxSettings: {
						contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
						type: 'GET'
					}
				}, o), _queue = [], _currentReq = null, _timeoutRef = null, _this = this, _started = false,

				TriggerStartEvent = function () {
					if (!_started) {
						_started = true;
						//If we have a timeout handler, a timeout interval, and we have at least one thing in the queue...
						if (opt.onTimeout && opt.timeout && $.isFunction(opt.onTimeout)) {
							//Kill the old timeout handle
							if (_timeoutRef) {
								clearTimeout(_timeoutRef);
							}
							//Create a new timeout, that calls the event when elapsed.
							_timeoutRef = setTimeout($.proxy(function () {
								opt.onTimeout.call(this, _currentReq.options);
							}, this), opt.timeout);
						}
						//If we have an onStart handler, call it.
						if (opt.onStart && $.isFunction(opt.onStart)) {
							opt.onStart(this, _currentReq.options);
						}
					}
				},
				TriggerStopEvent = function () {
					//If we've started, and the queue is empty...
					if (_started && _queue.length <= 0) {
						_started = false;
						if (_timeoutRef) {
							clearTimeout(_timeoutRef);
						}
						//Mark as stopped, and fire the onStop handler if possible.
						if (opt.onStop && $.isFunction(opt.onStop)) {
							opt.onStop(this, _currentReq.options);
						}
					}
				},
				TriggerQueueChange = function () {
					if (opt.onQueueChange) {
						opt.onQueueChange.call(_this, _queue.length);
					}
					//Only start a new request if we have at least one, and another isn't in progress.
					if (_queue.length >= 1 && !_currentReq) {
						//Pull off the next request.
						_currentReq = _queue.shift();
						if (_currentReq.options.isCallback) {
							//It's a queued function... just call it.
							_currentReq.options.complete();
						} else {
							//Create the new ajax request, and assign any promise events.
							TriggerStartEvent();
							var request = $.ajax(_currentReq.options);
							for (var i in _currentReq.promise) {
								for (var x in _currentReq.promise[i]) {
									request[i].call(this, _currentReq.promise[i][x]);
								}
							}
						}
					}
				};

			var QueueObject = function (options, complete, context) {
				this.options = options;
				this.complete = complete;
				this.context = context;
				this.promise = {done: [], then: [], always: [], fail: []};
			};
			QueueObject.prototype._promise = function (n, h) {
				if (this.promise[n]) {
					this.promise[n].push(h);
				}
				return this;
			}
			QueueObject.prototype.done = function (handler) {
				return this._promise('done', handler);
			};
			QueueObject.prototype.then = function (handler) {
				return this._promise('then', handler);
			};
			QueueObject.prototype.always = function (handler) {
				return this._promise('always', handler);
			};
			QueueObject.prototype.fail = function (handler) {
				return this._promise('fail', handler);
			};

			this.Clear = function () {
				_queue = [];
			};
			this.Queue = function (obj, thisArg) {
				var _o = {}, origComplete = null;
				if (obj instanceof Function) {
					//If the obj var is a function, set the options to reflect that, and set the origComplete var to the passed function.
					_o = {isCallback: true};
					origComplete = obj;
				} else {
					//The obj is an object of ajax settings. Extend the options with the instance ones, and store the complete function.
					_o = $.extend({}, opt.ajaxSettings, obj || {});
					origComplete = _o.complete;
				}
				//Create our own custom complete handler...
				_o.complete = function (request, status) {
					if (status == 'error' && opt.onError && $.isFunction(opt.onError)) {
						opt.onError.call(_currentReq.context || this, request, status);
					}
					if (_currentReq) {
						if (_currentReq.complete) {
							_currentReq.complete.call(_currentReq.context || this, request, status);
						}
						TriggerStopEvent();
						_currentReq = null;
						TriggerQueueChange();
					}
				};
				//Push the queue object into the queue, and notify the user that the queue length changed.
				var obj = new QueueObject(_o, origComplete, thisArg);
				_queue.push(obj);
				setTimeout(TriggerQueueChange, opt.queueChangeDelay);
				return obj;
			};
			return this;
		};

	})(jQuery);

	$(document).ready(function () {
		// $('.redux-page .settings-error').parent().hide();
	});

	//End helpers and beautiful things-----------------------------------------
})(jQuery);


(function ($, window, undefined) {

	/* ====== PLUGINS & EXTENSIONS ====== */


	/* --- $STICKY UP --- */


	/* ====== INTERNAL FUNCTIONS ====== */

	//Fixed Title + Save button
	var redux_container = $('.redux-container'),
		redux_container_position = redux_container.position();

	function fixDiv() {
		if ($(window).scrollTop() > redux_container_position.top)
			$('.redux-container').addClass('fixed-header');
		else
			$('.redux-container').removeClass('fixed-header');
	}

	//Min-height of the container
	var ensure_height_of_container = function () {
		var min_height = $(window).height() - 32;
		$('.redux-main').css({'min-height': min_height + 'px'});
	}

	// set top / bottom of fixed elements
	var top = $('.redux-main').offset().top + 'px';

	function sidebarPlace() {

		if ($('.redux-sidebar').outerHeight() < $(window).height() - 32) {
			$('.redux-sidebar').css('top', top);
			$('.redux-container').addClass('fixed-sidebar');
		} else {
			$('.redux-container').removeClass('fixed-sidebar');
		}
	}


	/* ====== ON DOCUMENT READY ====== */

	$(function () {
		//Admin Panel Styling
		if ($('.redux-container').length) {
			$('body').addClass('redux-page');
			fixDiv();
		}

		$('#redux-intro-text').css('top', top);

		sidebarPlace();
	});

	/* ====== ON WINDOW LOAD ====== */

	$(window).load(function () {
		ensure_height_of_container();
	});


	/* ====== ON SCROLL ======  */
	$(window).scroll(function (e) {
		fixDiv();
	});


	var $screenshot = $('.redux-main').find('.screenshot');

	$screenshot.each(function (i, obj) {

		var $this = $(obj),
			$newScreenshot = $("<div class='screenshot'></div>");


		$this.closest('tr').addClass('row--image');
		$newScreenshot.prependTo($this.closest('.row--image'));

		$this.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			$newScreenshot.parent().find('.media_upload_button').trigger('click');
		});

		$newScreenshot.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			$newScreenshot.parent().find('.media_upload_button').trigger('click');
		});
	});


	// Set the big icon in .redux-main
	var $bigIcon = null,
		iconClass = null;


	setTimeout(function () {
		iconClass = $('.redux-group-tab-link-li.active').find('i').attr('class');
		$bigIcon = $('<i>', {class: iconClass + ' big-icon', id: 'big-icon'});
		$('.redux-main').append($bigIcon);

		// move initial description to sidebar
		var $active = $('.redux-group-tab-link-li.active > a'),
			tabNo = $active.data('key'),
			$tab = $("#" + tabNo + "_section_group"),
			description = $tab.find('.redux-section-desc .description').text();

		$("#redux-intro-text").append("<p class='description'>" + description + "</p>");

		// let's get some classes where we want them
		$(".js-class-hook").each(function (i, obj) {
			var $obj = $(obj),
				classes = $obj.attr("class"),
				$row = $obj.closest("tr");

			if ($row.hasClass("hide")) {
				$row.addClass(classes).removeClass("js-class-hook select2-container select2-offscreen");
			} else {
				$row.addClass(classes).removeClass("js-class-hook select2-container select2-offscreen hide");
			}
		});

		$(".redux-container").on('change input select', function () {
				if (!jQuery(this).hasClass('noUpdate')) {
					$('#redux-sticky').addClass('is-visible');
				}
			}
		);

	}, 100);

	$('.redux-group-menu a').on('click', function () {

		var tabNo = $(this).data('key'),
			$tab = $("#" + tabNo + "_section_group"),
			description = $tab.find('.redux-section-desc .description').text(),
			sidebarHeight = $('.redux-sidebar').height();

		$("#redux-intro-text .description").text(description);


		setTimeout(function () {
			// change floating text
			var text = $('.redux-group-tab:visible > h3').html();
			$('#floating-title').html(text);


			// change the big icon accordingly
			iconClass = $('.redux-group-tab-link-li.active').find('i').attr('class');

			$bigIcon.removeClass();
			$bigIcon.attr('class', iconClass);

		}, 100);

		setTimeout(function(){
			$('.redux-main').css('height', '');

			if ($tab.outerHeight() < sidebarHeight) {
				$('.redux-main').height(sidebarHeight);
			}
		}, 500)
	});



	$(window).resize(function () {
		sidebarPlace();
		ensure_height_of_container();

		$('.redux-main').css('height', '');
	});


})(jQuery, window);