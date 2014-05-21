/*global jQuery, jQuery, document, tabid:true, redux_opts, confirm, relid:true*/

/*!           __
 ____ _    / /___ __  __
 / __ `/_  / / __ `/ |/_/
 / /_/ / /_/ / /_/ />  <
 \__, /\____/\__,_/_/|_|
 /_/  jQuery plugin v1.5.2 - https://github.com/PortableSheep/qJax
 Copyright 2011-2013, Michael Gunderson - Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($){
	$.qjax = function(o) {
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
		/*      ____      __                        __   ______                 __  _
		 /  _/___  / /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
		 / // __ \/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
		 _/ // / / / /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
		 /___/_/ /_/\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/
		 */
			TriggerStartEvent = function() {
				if (!_started) {
					_started = true;
					//If we have a timeout handler, a timeout interval, and we have at least one thing in the queue...
					if (opt.onTimeout && opt.timeout && $.isFunction(opt.onTimeout)) {
						//Kill the old timeout handle
						if (_timeoutRef) {
							clearTimeout(_timeoutRef);
						}
						//Create a new timeout, that calls the event when elapsed.
						_timeoutRef = setTimeout($.proxy(function() {
							opt.onTimeout.call(this, _currentReq.options);
						}, this), opt.timeout);
					}
					//If we have an onStart handler, call it.
					if (opt.onStart && $.isFunction(opt.onStart)) {
						opt.onStart(this, _currentReq.options);
					}
				}
			},
			TriggerStopEvent = function() {
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
			TriggerQueueChange = function() {
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
						for(var i in _currentReq.promise) {
							for(var x in _currentReq.promise[i]) {
								request[i].call(this, _currentReq.promise[i][x]);
							}
						}
					}
				}
			};

		/*     ____                           ____  __      _           __
		 / __ \__  _____  __  _____     / __ \/ /_    (_)__  _____/ /_
		 / / / / / / / _ \/ / / / _ \   / / / / __ \  / / _ \/ ___/ __/
		 / /_/ / /_/ /  __/ /_/ /  __/  / /_/ / /_/ / / /  __/ /__/ /_
		 \___\_\__,_/\___/\__,_/\___/   \____/_.___/_/ /\___/\___/\__/
		 /___/
		 */
		var QueueObject = function(options, complete, context) {
			this.options = options;
			this.complete = complete;
			this.context = context;
			this.promise = { done: [], then: [], always: [], fail: [] };
		};
		QueueObject.prototype._promise = function(n, h) {
			if (this.promise[n]) {
				this.promise[n].push(h);
			}
			return this;
		}
		QueueObject.prototype.done = function(handler) {
			return this._promise('done', handler);
		};
		QueueObject.prototype.then = function(handler) {
			return this._promise('then', handler);
		};
		QueueObject.prototype.always = function(handler) {
			return this._promise('always', handler);
		};
		QueueObject.prototype.fail = function(handler) {
			return this._promise('fail', handler);
		};

		/*      ____        __    ___         ______                 __  _
		 / __ \__  __/ /_  / (_)____   / ____/_  ______  _____/ /_(_)___  ____  _____
		 / /_/ / / / / __ \/ / / ___/  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
		 / ____/ /_/ / /_/ / / / /__   / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
		 /_/    \__,_/_.___/_/_/\___/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/
		 */
		this.Clear = function() {
			_queue = [];
		};
		this.Queue = function(obj, thisArg) {
			var _o = {}, origComplete = null;
			if (obj instanceof Function) {
				//If the obj var is a function, set the options to reflect that, and set the origComplete var to the passed function.
				_o = { isCallback: true };
				origComplete = obj;
			} else {
				//The obj is an object of ajax settings. Extend the options with the instance ones, and store the complete function.
				_o = $.extend({}, opt.ajaxSettings, obj||{});
				origComplete = _o.complete;
			}
			//Create our own custom complete handler...
			_o.complete = function(request, status) {
				if (status == 'error' && opt.onError && $.isFunction(opt.onError)) {
					opt.onError.call(_currentReq.context||this, request, status);
				}
				if (_currentReq) {
					if (_currentReq.complete) {
						_currentReq.complete.call(_currentReq.context||this, request, status);
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

jQuery(document).ready(function () {
	//General theme options logic----------------------------------------------
    if (jQuery('#last_tab').val() === '') {
        jQuery('.redux-opts-group-tab:first').slideDown('fast');
        jQuery('#redux-opts-group-menu li:first').addClass('active');
    } else {
        tabid = jQuery('#last_tab').val();
        jQuery('#' + tabid + '_section_group').slideDown('fast');
        jQuery('#' + tabid + '_section_group_li').addClass('active');
    }

    jQuery('input[name="' + redux_opts.opt_name + '[defaults]"]').click(function () {
        if (!confirm(redux_opts.reset_confirm)) {
            return false;
        }
    });

    jQuery('.redux-opts-group-tab-link-a').click(function () {
        relid = jQuery(this).attr('data-rel');

        jQuery('#last_tab').val(relid);

        jQuery('.redux-opts-group-tab').each(function () {
            if (jQuery(this).attr('id') === relid + '_section_group') {
                jQuery(this).delay(400).fadeIn(1200);
            } else {
                jQuery(this).fadeOut('fast');
            }
        });

        jQuery('.redux-opts-group-tab-link-li').each(function () {
            if (jQuery(this).attr('id') !== relid + '_section_group_li' && jQuery(this).hasClass('active')) {
                jQuery(this).removeClass('active');
            }
            if (jQuery(this).attr('id') === relid + '_section_group_li') {
                jQuery(this).addClass('active');
            }
        });
    });

    if (jQuery('#redux-opts-save').is(':visible')) {
        jQuery('#redux-opts-save').addClass('active');
        setTimeout(function() {
             jQuery('#redux-opts-save').removeClass('active');
        }, 3000)
    }

    if (jQuery('#redux-opts-imported').is(':visible')) {
        jQuery('#redux-opts-imported').delay(4000).slideUp('slow');
    }

    jQuery('#redux-opts-form-wrapper').on('change', ':input', function () {
        if(this.id === 'google_webfonts' && this.value === '') return;
	    trigger_save_warning();
    });

	jQuery('#redux-opts-form-wrapper').on('change', ' textarea', function () {
		trigger_save_warning();
	});

    jQuery('#redux-opts-import-code-button').click(function () {
        if (jQuery('#redux-opts-import-link-wrapper').is(':visible')) {
            jQuery('#redux-opts-import-link-wrapper').fadeOut('fast');
            jQuery('#import-link-value').val('');
        }
        jQuery('#redux-opts-import-code-wrapper').fadeIn('slow');
    });

    jQuery('#redux-opts-import-link-button').click(function () {
        if (jQuery('#redux-opts-import-code-wrapper').is(':visible')) {
            jQuery('#redux-opts-import-code-wrapper').fadeOut('fast');
            jQuery('#import-code-value').val('');
        }
        jQuery('#redux-opts-import-link-wrapper').fadeIn('slow');
    });

    jQuery('#redux-opts-export-code-copy').click(function () {
        if (jQuery('#redux-opts-export-link-value').is(':visible')) {jQuery('#redux-opts-export-link-value').fadeOut('slow'); }
        jQuery('#redux-opts-export-code').toggle('fade');
    });

    jQuery('#redux-opts-export-link').click(function () {
        if (jQuery('#redux-opts-export-code').is(':visible')) {jQuery('#redux-opts-export-code').fadeOut('slow'); }
        jQuery('#redux-opts-export-link-value').toggle('fade');
    });

	var lastScrollTop = 0, delta = 5;
	jQuery(window).scroll(function(event){
		var st = jQuery(this).scrollTop();

		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		if (st > 201){
			// downscroll code
			jQuery('#redux-opts-header').addClass('fixed');
			jQuery('#redux-opts-save-warn').addClass('fixed');
			jQuery('#redux-opts-form-wrapper').addClass('fill-empty-space');
		} else {
			// upscroll code
//			console.log('scroll up');
			jQuery('#redux-opts-header').removeClass('fixed');
			jQuery('#redux-opts-save-warn').removeClass('fixed');
			jQuery('#redux-opts-form-wrapper').removeClass('fill-empty-space');
		}
		lastScrollTop = st;
	});

	var trigger_save_warning =  function(){
		jQuery('#redux-opts-save').removeClass('active');
		jQuery('#redux-opts-save-warn').addClass('active');
		jQuery('#redux-opts-header').addClass('active');
		jQuery('#redux-opts-form-wrapper').addClass('active');
	};

	//End general theme options logic------------------------------------------
	
	//The demo data import-----------------------------------------------------
	var importButton = jQuery('#wpGrade_import_demodata_button'),
		container = jQuery('#redux-opts-form-wrapper');
	
	var saveData = {
			container: 		container,
			ajaxUrl :		jQuery('input[name=wpGrade_import_ajax_url]', container).val(),
			optionSlug :	jQuery('input[name=wpGrade_options_page_slug]', container).val(),
			nonceImportPostsPages  :	jQuery('input[name=wpGrade-nonce-import-posts-pages]', container).val(),
			nonceImportThemeOptions  :	jQuery('input[name=wpGrade-nonce-import-theme-options]', container).val(),
			nonceImportWidgets  :	jQuery('input[name=wpGrade-nonce-import-widgets]', container).val(),
			ref	   :		jQuery('input[name=_wp_http_referer]', container).val()
		 };
	
	//bind to click
	importButton.bind('click', {set: saveData}, function(receivedData) {
		var button = jQuery(this),
			me = receivedData.data.set,
			waitLabel = jQuery('.wpGrade_import_demodata_wait', me.container),
			answer = "",
			activate = true;
        var resultcontainer = jQuery('.wpGrade-import-results', me.container);

		if(button.is('.wpGrade_button_inactive')) return false;

		activate = confirm('Importing the demo data will overwrite your current Theme Options settings. Proceed anyway?');

		if(activate == false) return false;
		
		//these hold the ajax responses
		var responseRaw = null;
		var res = null;
		var stepNumber = 0;
		var numberOfSteps = 10;
		
		//this is the ajax queue
		var qInst = jQuery.qjax({
				timeout: 3000,
				ajaxSettings: {
					//Put any $.ajax options you want here, and they'll inherit to each Queue call, unless they're overridden.
					type: "POST",
					url: me.ajaxUrl
				},
				onQueueChange: function(length) {
					if (length == 0) {
						if (res.errors == false) {
							setTimeout(function() {
								//hide the loading
								jQuery('.wpGrade-loading-wrap',  me.container).slideUp(400);
							}, 1000);

							setTimeout(function() {
								resultcontainer.append('<i>All done!</i><br />');
							}, 1000);

							setTimeout(function() {
								jQuery('body').wpGrade_popup({
									title: 'Phew...that was a hard one!', 
									text: 'The demo data was imported without a glitch! Awesome! <br/><br/>Remember to update the passwords and roles of imported users. <br/>Also don\'t forget to change the email address in the Contact Form 7 form. <br/><br/><i>We will now reload the page so you can see the brand new data!</i>',
									time_to_show:12000
									}, function() {
										window.location.hash = "#wpwrap";
										window.location.reload(true);
									});
							}, 2000);
						} else {
							//we have errors
							//re-enable the import button
							button.removeClass('button-disabled');

							//hide the loading
							jQuery('.wpGrade-loading-wrap',  me.container).slideUp().addClass("hidden");

							//script was called but aborted before finishing import
							jQuery('body').wpGrade_popup({	
								popup_class:'error',
								title: 'Total Bummer...',
								text:'The import didn\'t work completely! <br/> Check out the errors given. You might want to try reloading the page and then try again.', 
								time_to_show:5000});
						}
					}
				},
				onError: function() {
					//stop everything on error
					if(res.errors != null && res.errors != false) {
						qInst.Clear();
					}
				},
//				onTimeout: function(current) {
//				},
//				onStart: function() {
//				},
				onStop: function() {
					//stop everything on error
					if(res.errors != null && res.errors != false) {
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
				.fail(function(response) {
					responseRaw = response;
					res = wpAjax.parseAjaxResponse(response, 'notifier');
					resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed...</i><br />');
				})
				.done( function(response) {
					responseRaw = response;
					res = wpAjax.parseAjaxResponse(response, 'notifier');
					if (res != null && res.errors != null) {
						if(res.errors == false) {
							if (res.responses[0] != null) {
								resultcontainer.append('<i>Importing posts | Step '+res.responses[0].supplemental.stepNumber+' of '+res.responses[0].supplemental.numberOfSteps+'</i><br />');
								//for debuging purposes
								resultcontainer.append('<div style="display:none;visibility:hidden;">Return data:<br />'+res.responses[0].data+'</div>');
							} else {
								resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed</i><br />Error: '+res.responses[0].data);
							}
						}
						else {
							if (res.responses[0] != null) {
								resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed</i><br />(The script returned the following message: '+res.responses[0].errors[0].message+' )<br/>');
							} else {
								resultcontainer.append('<i style="color:red">The importing of the demo posts, pages and custom posts has failed</i><br />');
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
			.fail(function(response) {
				responseRaw = response;
				res = wpAjax.parseAjaxResponse(response, 'notifier');
				resultcontainer.append('<i style="color:red">The importing of the theme options has failed...</i><br />');
			})
			.done( function(response) {
				responseRaw = response;
				res = wpAjax.parseAjaxResponse(response, 'notifier');
				if (res != null && res.errors != null) {
					if(res.errors == false) {
						resultcontainer.append('<i>Finished importing the demo theme options...</i><br />');

						//for debuging purposes
						resultcontainer.append('<div style="display:none;visibility:hidden;">Return data:<br />'+res.responses[0].data+'</div>');
					}
					else {
						resultcontainer.append('<i style="color:red">The importing of the theme options has failed</i><br />(The script returned the following message: '+res.responses[0].errors[0].message+' )<br/><br/>');
					}
				} else {
					resultcontainer.append('<i style="color:red">The importing of the theme options has failed</i><br />');
				}
			});
		};
		
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
			.fail(function() {
				responseRaw = response;
				res = wpAjax.parseAjaxResponse(response, 'notifier');
				resultcontainer.append('<i style="color:red">The setting up of the demo widgets failed...</i><br />');
			})
			.done( function(response) {
				responseRaw = response;
				res = wpAjax.parseAjaxResponse(response, 'notifier');
				if (res != null && res.errors != null) {
					if(res.errors == false) {
						resultcontainer.append('<i>Finished setting up the demo widgets...</i><br />');

						//for debuging purposes
						resultcontainer.append('<div style="display:none;visibility:hidden;">Return data:<br />'+res.responses[0].data+'</div>');
					}
					else {
						resultcontainer.append('<i style="color:red">The setting up of the demo widgets failed</i><br />(The script returned the following message: '+res.responses[0].errors[0].message+' )<br/><br/>');
					}
				} else {
					resultcontainer.append('<i style="color:red">The setting up of the demo widgets failed</i><br />');
				}
			});
		};
		
		//show the loader and some messages
		//show loader
		jQuery('.wpGrade-loading-wrap',  me.container).css({opacity:0, display:"block", visibility:'visible'}).removeClass("hidden").animate({opacity:1});
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
//End demo data import---------------------------------------------------------

//Helpers and beautiful things-------------------------------------------------
//
//Make a nice informational popup that self closes after a while
(function($)
{
	$.fn.wpGrade_popup = function(variables, callback) 
	{
		var defaults = {
			popup_class: 'success',		//success, alert
			title:  'Notification', //default title
			text:  'All things are good! Carry on...', //default message
			time_to_show: 3000 //the number of seconds to show the popup
		};
		
		var options = $.extend(defaults, variables);
		
		return this.each(function()
		{
			var container = $(this),
				notification = $('<div/>').addClass('wpGrade_popup wpGrade_popup_'+options.popup_class)
					.css('opacity',0)
					.html('<div class="wpGrade_popup_title"><span class="wpGrade_popup_icon"></span> '+options.title+'</div><div class="wpGrade_popup_content">'+options.text+'</div>')
					.appendTo(container);
										  
				notification.animate({opacity:1}, function() {
					notification.delay(options.time_to_show).fadeOut(function()	{
						notification.remove();
						if(typeof callback == 'function') callback();
					});
				});
		});
	};
	//End helpers and beautiful things-----------------------------------------
})(jQuery);	