/* --- $DEBOUNCES RESIZE --- */

/* debouncedresize: special jQuery event that happens once after a window resize
 * https://github.com/louisremi/jquery-smartresize
 * Copyright 2012 @louis_remi
 * MIT License
 */
(function($) {
  var $event = $.event,
    $special,
    resizeTimeout;
  $special = $event.special.debouncedresize = {
    setup: function() {
      $(this).on("resize", $special.handler);
    },
    teardown: function() {
      $(this).off("resize", $special.handler);
    },
    handler: function(event, execAsap) {
      var context = this,
        args = arguments,
        dispatch = function() {
          event.type = "debouncedresize";
          $event.dispatch.apply(context, args);
        };
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      execAsap
        ? dispatch()
        : (resizeTimeout = setTimeout(dispatch, $special.threshold));
    },
    threshold: 150
  };
})(jQuery);

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
(function(factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS
    factory(require("jquery"));
  } else {
    // Browser globals
    factory(window.jQuery || window.Zepto);
  }
})(function($) {
  /*>>core*/
  /**
   *
   * Magnific Popup Core JS file
   *
   */

  /**
   * Private static constants
   */
  var CLOSE_EVENT = "Close",
    BEFORE_CLOSE_EVENT = "BeforeClose",
    AFTER_CLOSE_EVENT = "AfterClose",
    BEFORE_APPEND_EVENT = "BeforeAppend",
    MARKUP_PARSE_EVENT = "MarkupParse",
    OPEN_EVENT = "Open",
    CHANGE_EVENT = "Change",
    NS = "mfp",
    EVENT_NS = "." + NS,
    READY_CLASS = "mfp-ready",
    REMOVING_CLASS = "mfp-removing",
    PREVENT_CLOSE_CLASS = "mfp-prevent-close";

  /**
   * Private vars
   */
  /*jshint -W079 */
  var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
    MagnificPopup = function() {},
    _isJQ = !!window.jQuery,
    _prevStatus,
    _window = $(window),
    _document,
    _prevContentType,
    _wrapClasses,
    _currPopupType;

  /**
   * Private functions
   */
  var _mfpOn = function(name, f) {
      mfp.ev.on(NS + name + EVENT_NS, f);
    },
    _getEl = function(className, appendTo, html, raw) {
      var el = document.createElement("div");
      el.className = "mfp-" + className;
      if (html) {
        el.innerHTML = html;
      }
      if (!raw) {
        el = $(el);
        if (appendTo) {
          el.appendTo(appendTo);
        }
      } else if (appendTo) {
        appendTo.appendChild(el);
      }
      return el;
    },
    _mfpTrigger = function(e, data) {
      mfp.ev.triggerHandler(NS + e, data);

      if (mfp.st.callbacks) {
        // converts "mfpEventName" to "eventName" callback and triggers it if it's present
        e = e.charAt(0).toLowerCase() + e.slice(1);
        if (mfp.st.callbacks[e]) {
          mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
        }
      }
    },
    _getCloseBtn = function(type) {
      if (type !== _currPopupType || !mfp.currTemplate.closeBtn) {
        mfp.currTemplate.closeBtn = $(
          mfp.st.closeMarkup.replace("%title%", mfp.st.tClose)
        );
        _currPopupType = type;
      }
      return mfp.currTemplate.closeBtn;
    },
    // Initialize Magnific Popup only when called at least once
    _checkInstance = function() {
      if (!$.magnificPopup.instance) {
        /*jshint -W020 */
        mfp = new MagnificPopup();
        mfp.init();
        $.magnificPopup.instance = mfp;
      }
    },
    // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
    supportsTransitions = function() {
      var s = document.createElement("p").style, // 's' for style. better to create an element if body yet to exist
        v = ["ms", "O", "Moz", "Webkit"]; // 'v' for vendor

      if (s["transition"] !== undefined) {
        return true;
      }

      while (v.length) {
        if (v.pop() + "Transition" in s) {
          return true;
        }
      }

      return false;
    };

  /**
   * Public functions
   */
  MagnificPopup.prototype = {
    constructor: MagnificPopup,

    /**
     * Initializes Magnific Popup plugin.
     * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
     */
    init: function() {
      var appVersion = navigator.appVersion;
      mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
      mfp.isAndroid = /android/gi.test(appVersion);
      mfp.isIOS = /iphone|ipad|ipod/gi.test(appVersion);
      mfp.supportsTransition = supportsTransitions();

      // We disable fixed positioned lightbox on devices that don't handle it nicely.
      // If you know a better way of detecting this - let me know.
      mfp.probablyMobile =
        mfp.isAndroid ||
        mfp.isIOS ||
        /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
          navigator.userAgent
        );
      _document = $(document);

      mfp.popupsCache = {};
    },

    /**
     * Opens popup
     * @param  data [description]
     */
    open: function(data) {
      var i;

      if (data.isObj === false) {
        // convert jQuery collection to array to avoid conflicts later
        mfp.items = data.items.toArray();

        mfp.index = 0;
        var items = data.items,
          item;
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (item.parsed) {
            item = item.el[0];
          }
          if (item === data.el[0]) {
            mfp.index = i;
            break;
          }
        }
      } else {
        mfp.items = $.isArray(data.items) ? data.items : [data.items];
        mfp.index = data.index || 0;
      }

      // if popup is already opened - we just update the content
      if (mfp.isOpen) {
        mfp.updateItemHTML();
        return;
      }

      mfp.types = [];
      _wrapClasses = "";
      if (data.mainEl && data.mainEl.length) {
        mfp.ev = data.mainEl.eq(0);
      } else {
        mfp.ev = _document;
      }

      if (data.key) {
        if (!mfp.popupsCache[data.key]) {
          mfp.popupsCache[data.key] = {};
        }
        mfp.currTemplate = mfp.popupsCache[data.key];
      } else {
        mfp.currTemplate = {};
      }

      mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data);
      mfp.fixedContentPos =
        mfp.st.fixedContentPos === "auto"
          ? !mfp.probablyMobile
          : mfp.st.fixedContentPos;

      if (mfp.st.modal) {
        mfp.st.closeOnContentClick = false;
        mfp.st.closeOnBgClick = false;
        mfp.st.showCloseBtn = false;
        mfp.st.enableEscapeKey = false;
      }

      // Building markup
      // main containers are created only once
      if (!mfp.bgOverlay) {
        // Dark overlay
        mfp.bgOverlay = _getEl("bg").on("click" + EVENT_NS, function() {
          mfp.close();
        });

        mfp.wrap = _getEl("wrap")
          .attr("tabindex", -1)
          .on("click" + EVENT_NS, function(e) {
            if (mfp._checkIfClose(e.target)) {
              mfp.close();
            }
          });

        mfp.container = _getEl("container", mfp.wrap);
      }

      mfp.contentContainer = _getEl("content");
      if (mfp.st.preloader) {
        mfp.preloader = _getEl("preloader", mfp.container, mfp.st.tLoading);
      }

      // Initializing modules
      var modules = $.magnificPopup.modules;
      for (i = 0; i < modules.length; i++) {
        var n = modules[i];
        n = n.charAt(0).toUpperCase() + n.slice(1);
        mfp["init" + n].call(mfp);
      }
      _mfpTrigger("BeforeOpen");

      if (mfp.st.showCloseBtn) {
        // Close button
        if (!mfp.st.closeBtnInside) {
          mfp.wrap.append(_getCloseBtn());
        } else {
          _mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
            values.close_replaceWith = _getCloseBtn(item.type);
          });
          _wrapClasses += " mfp-close-btn-in";
        }
      }

      if (mfp.st.alignTop) {
        _wrapClasses += " mfp-align-top";
      }

      if (mfp.fixedContentPos) {
        mfp.wrap.css({
          overflow: mfp.st.overflowY,
          overflowX: "hidden",
          overflowY: mfp.st.overflowY
        });
      } else {
        mfp.wrap.css({
          top: _window.scrollTop(),
          position: "absolute"
        });
      }
      if (
        mfp.st.fixedBgPos === false ||
        (mfp.st.fixedBgPos === "auto" && !mfp.fixedContentPos)
      ) {
        mfp.bgOverlay.css({
          height: _document.height(),
          position: "absolute"
        });
      }

      if (mfp.st.enableEscapeKey) {
        // Close on ESC key
        _document.on("keyup" + EVENT_NS, function(e) {
          if (e.keyCode === 27) {
            mfp.close();
          }
        });
      }

      _window.on("resize" + EVENT_NS, function() {
        mfp.updateSize();
      });

      if (!mfp.st.closeOnContentClick) {
        _wrapClasses += " mfp-auto-cursor";
      }

      if (_wrapClasses) mfp.wrap.addClass(_wrapClasses);

      // this triggers recalculation of layout, so we get it once to not to trigger twice
      var windowHeight = (mfp.wH = _window.height());

      var windowStyles = {};

      if (mfp.fixedContentPos) {
        if (mfp._hasScrollBar(windowHeight)) {
          var s = mfp._getScrollbarSize();
          if (s) {
            windowStyles.marginRight = s;
          }
        }
      }

      if (mfp.fixedContentPos) {
        if (!mfp.isIE7) {
          windowStyles.overflow = "hidden";
        } else {
          // ie7 double-scroll bug
          $("body, html").css("overflow", "hidden");
        }
      }

      var classesToadd = mfp.st.mainClass;
      if (mfp.isIE7) {
        classesToadd += " mfp-ie7";
      }
      if (classesToadd) {
        mfp._addClassToMFP(classesToadd);
      }

      // add content
      mfp.updateItemHTML();

      _mfpTrigger("BuildControls");

      // remove scrollbar, add margin e.t.c
      $("html").css(windowStyles);

      // add everything to DOM
      mfp.bgOverlay
        .add(mfp.wrap)
        .prependTo(mfp.st.prependTo || $(document.body));

      // Save last focused element
      mfp._lastFocusedEl = document.activeElement;

      // Wait for next cycle to allow CSS transition
      setTimeout(function() {
        if (mfp.content) {
          mfp._addClassToMFP(READY_CLASS);
          mfp._setFocus();
        } else {
          // if content is not defined (not loaded e.t.c) we add class only for BG
          mfp.bgOverlay.addClass(READY_CLASS);
        }

        // Trap the focus in popup
        _document.on("focusin" + EVENT_NS, mfp._onFocusIn);
      }, 16);

      mfp.isOpen = true;
      mfp.updateSize(windowHeight);
      _mfpTrigger(OPEN_EVENT);

      return data;
    },

    /**
     * Closes the popup
     */
    close: function() {
      if (!mfp.isOpen) return;
      _mfpTrigger(BEFORE_CLOSE_EVENT);

      mfp.isOpen = false;
      // for CSS3 animation
      if (mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition) {
        mfp._addClassToMFP(REMOVING_CLASS);
        setTimeout(function() {
          mfp._close();
        }, mfp.st.removalDelay);
      } else {
        mfp._close();
      }
    },

    /**
     * Helper for close() function
     */
    _close: function() {
      _mfpTrigger(CLOSE_EVENT);

      var classesToRemove = REMOVING_CLASS + " " + READY_CLASS + " ";

      mfp.bgOverlay.detach();
      mfp.wrap.detach();
      mfp.container.empty();

      if (mfp.st.mainClass) {
        classesToRemove += mfp.st.mainClass + " ";
      }

      mfp._removeClassFromMFP(classesToRemove);

      if (mfp.fixedContentPos) {
        var windowStyles = { marginRight: "" };
        if (mfp.isIE7) {
          $("body, html").css("overflow", "");
        } else {
          windowStyles.overflow = "";
        }
        $("html").css(windowStyles);
      }

      _document.off("keyup" + EVENT_NS + " focusin" + EVENT_NS);
      mfp.ev.off(EVENT_NS);

      // clean up DOM elements that aren't removed
      mfp.wrap.attr("class", "mfp-wrap").removeAttr("style");
      mfp.bgOverlay.attr("class", "mfp-bg");
      mfp.container.attr("class", "mfp-container");

      // remove close button from target element
      if (
        mfp.st.showCloseBtn &&
        (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)
      ) {
        if (mfp.currTemplate.closeBtn) mfp.currTemplate.closeBtn.detach();
      }

      if (mfp.st.autoFocusLast && mfp._lastFocusedEl) {
        $(mfp._lastFocusedEl).focus(); // put tab focus back
      }
      mfp.currItem = null;
      mfp.content = null;
      mfp.currTemplate = null;
      mfp.prevHeight = 0;

      _mfpTrigger(AFTER_CLOSE_EVENT);
    },

    updateSize: function(winHeight) {
      if (mfp.isIOS) {
        // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
        var zoomLevel =
          document.documentElement.clientWidth / window.innerWidth;
        var height = window.innerHeight * zoomLevel;
        mfp.wrap.css("height", height);
        mfp.wH = height;
      } else {
        mfp.wH = winHeight || _window.height();
      }
      // Fixes #84: popup incorrectly positioned with position:relative on body
      if (!mfp.fixedContentPos) {
        mfp.wrap.css("height", mfp.wH);
      }

      _mfpTrigger("Resize");
    },

    /**
     * Set content of popup based on current index
     */
    updateItemHTML: function() {
      var item = mfp.items[mfp.index];

      // Detach and perform modifications
      mfp.contentContainer.detach();

      if (mfp.content) mfp.content.detach();

      if (!item.parsed) {
        item = mfp.parseEl(mfp.index);
      }

      var type = item.type;

      _mfpTrigger("BeforeChange", [
        mfp.currItem ? mfp.currItem.type : "",
        type
      ]);
      // BeforeChange event works like so:
      // _mfpOn('BeforeChange', function(e, prevType, newType) { });

      mfp.currItem = item;

      if (!mfp.currTemplate[type]) {
        var markup = mfp.st[type] ? mfp.st[type].markup : false;

        // allows to modify markup
        _mfpTrigger("FirstMarkupParse", markup);

        if (markup) {
          mfp.currTemplate[type] = $(markup);
        } else {
          // if there is no markup found we just define that template is parsed
          mfp.currTemplate[type] = true;
        }
      }

      if (_prevContentType && _prevContentType !== item.type) {
        mfp.container.removeClass("mfp-" + _prevContentType + "-holder");
      }

      var newContent = mfp[
        "get" + type.charAt(0).toUpperCase() + type.slice(1)
      ](item, mfp.currTemplate[type]);
      mfp.appendContent(newContent, type);

      item.preloaded = true;

      _mfpTrigger(CHANGE_EVENT, item);
      _prevContentType = item.type;

      // Append container back after its content changed
      mfp.container.prepend(mfp.contentContainer);

      _mfpTrigger("AfterChange");
    },

    /**
     * Set HTML content of popup
     */
    appendContent: function(newContent, type) {
      mfp.content = newContent;

      if (newContent) {
        if (
          mfp.st.showCloseBtn &&
          mfp.st.closeBtnInside &&
          mfp.currTemplate[type] === true
        ) {
          // if there is no markup, we just append close button element inside
          if (!mfp.content.find(".mfp-close").length) {
            mfp.content.append(_getCloseBtn());
          }
        } else {
          mfp.content = newContent;
        }
      } else {
        mfp.content = "";
      }

      _mfpTrigger(BEFORE_APPEND_EVENT);
      mfp.container.addClass("mfp-" + type + "-holder");

      mfp.contentContainer.append(mfp.content);
    },

    /**
     * Creates Magnific Popup data object based on given data
     * @param  {int} index Index of item to parse
     */
    parseEl: function(index) {
      var item = mfp.items[index],
        type;

      if (item.tagName) {
        item = { el: $(item) };
      } else {
        type = item.type;
        item = { data: item, src: item.src };
      }

      if (item.el) {
        var types = mfp.types;

        // check for 'mfp-TYPE' class
        for (var i = 0; i < types.length; i++) {
          if (item.el.hasClass("mfp-" + types[i])) {
            type = types[i];
            break;
          }
        }

        item.src = item.el.attr("data-mfp-src");
        if (!item.src) {
          item.src = item.el.attr("href");
        }
      }

      item.type = type || mfp.st.type || "inline";
      item.index = index;
      item.parsed = true;
      mfp.items[index] = item;
      _mfpTrigger("ElementParse", item);

      return mfp.items[index];
    },

    /**
     * Initializes single popup or a group of popups
     */
    addGroup: function(el, options) {
      var eHandler = function(e) {
        e.mfpEl = this;
        mfp._openClick(e, el, options);
      };

      if (!options) {
        options = {};
      }

      var eName = "click.magnificPopup";
      options.mainEl = el;

      if (options.items) {
        options.isObj = true;
        el.off(eName).on(eName, eHandler);
      } else {
        options.isObj = false;
        if (options.delegate) {
          el.off(eName).on(eName, options.delegate, eHandler);
        } else {
          options.items = el;
          el.off(eName).on(eName, eHandler);
        }
      }
    },
    _openClick: function(e, el, options) {
      var midClick =
        options.midClick !== undefined
          ? options.midClick
          : $.magnificPopup.defaults.midClick;

      if (
        !midClick &&
        (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)
      ) {
        return;
      }

      var disableOn =
        options.disableOn !== undefined
          ? options.disableOn
          : $.magnificPopup.defaults.disableOn;

      if (disableOn) {
        if ($.isFunction(disableOn)) {
          if (!disableOn.call(mfp)) {
            return true;
          }
        } else {
          // else it's number
          if (_window.width() < disableOn) {
            return true;
          }
        }
      }

      if (e.type) {
        e.preventDefault();

        // This will prevent popup from closing if element is inside and popup is already opened
        if (mfp.isOpen) {
          e.stopPropagation();
        }
      }

      options.el = $(e.mfpEl);
      if (options.delegate) {
        options.items = el.find(options.delegate);
      }
      mfp.open(options);
    },

    /**
     * Updates text on preloader
     */
    updateStatus: function(status, text) {
      if (mfp.preloader) {
        if (_prevStatus !== status) {
          mfp.container.removeClass("mfp-s-" + _prevStatus);
        }

        if (!text && status === "loading") {
          text = mfp.st.tLoading;
        }

        var data = {
          status: status,
          text: text
        };
        // allows to modify status
        _mfpTrigger("UpdateStatus", data);

        status = data.status;
        text = data.text;

        mfp.preloader.html(text);

        mfp.preloader.find("a").on("click", function(e) {
          e.stopImmediatePropagation();
        });

        mfp.container.addClass("mfp-s-" + status);
        _prevStatus = status;
      }
    },

    /*
		 "Private" helpers that aren't private at all
		 */
    // Check to close popup or not
    // "target" is an element that was clicked
    _checkIfClose: function(target) {
      if ($(target).hasClass(PREVENT_CLOSE_CLASS)) {
        return;
      }

      var closeOnContent = mfp.st.closeOnContentClick;
      var closeOnBg = mfp.st.closeOnBgClick;

      if (closeOnContent && closeOnBg) {
        return true;
      } else {
        // We close the popup if click is on close button or on preloader. Or if there is no content.
        if (
          !mfp.content ||
          $(target).hasClass("mfp-close") ||
          (mfp.preloader && target === mfp.preloader[0])
        ) {
          return true;
        }

        // if click is outside the content
        if (target !== mfp.content[0] && !$.contains(mfp.content[0], target)) {
          if (closeOnBg) {
            // last check, if the clicked element is in DOM, (in case it's removed onclick)
            if ($.contains(document, target)) {
              return true;
            }
          }
        } else if (closeOnContent) {
          return true;
        }
      }
      return false;
    },
    _addClassToMFP: function(cName) {
      mfp.bgOverlay.addClass(cName);
      mfp.wrap.addClass(cName);
    },
    _removeClassFromMFP: function(cName) {
      this.bgOverlay.removeClass(cName);
      mfp.wrap.removeClass(cName);
    },
    _hasScrollBar: function(winHeight) {
      return (
        (mfp.isIE7 ? _document.height() : document.body.scrollHeight) >
        (winHeight || _window.height())
      );
    },
    _setFocus: function() {
      (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
    },
    _onFocusIn: function(e) {
      if (e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target)) {
        mfp._setFocus();
        return false;
      }
    },
    _parseMarkup: function(template, values, item) {
      var arr;
      if (item.data) {
        values = $.extend(item.data, values);
      }
      _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item]);

      $.each(values, function(key, value) {
        if (value === undefined || value === false) {
          return true;
        }
        arr = key.split("_");
        if (arr.length > 1) {
          var el = template.find(EVENT_NS + "-" + arr[0]);

          if (el.length > 0) {
            var attr = arr[1];
            if (attr === "replaceWith") {
              if (el[0] !== value[0]) {
                el.replaceWith(value);
              }
            } else if (attr === "img") {
              if (el.is("img")) {
                el.attr("src", value);
              } else {
                el.replaceWith(
                  $("<img>")
                    .attr("src", value)
                    .attr("class", el.attr("class"))
                );
              }
            } else {
              el.attr(arr[1], value);
            }
          }
        } else {
          template.find(EVENT_NS + "-" + key).html(value);
        }
      });
    },

    _getScrollbarSize: function() {
      // thx David
      if (mfp.scrollbarSize === undefined) {
        var scrollDiv = document.createElement("div");
        scrollDiv.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
        document.body.appendChild(scrollDiv);
        mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
      }
      return mfp.scrollbarSize;
    }
  }; /* MagnificPopup core prototype end */

  /**
   * Public static functions
   */
  $.magnificPopup = {
    instance: null,
    proto: MagnificPopup.prototype,
    modules: [],

    open: function(options, index) {
      _checkInstance();

      if (!options) {
        options = {};
      } else {
        options = $.extend(true, {}, options);
      }

      options.isObj = true;
      options.index = index || 0;
      return this.instance.open(options);
    },

    close: function() {
      return $.magnificPopup.instance && $.magnificPopup.instance.close();
    },

    registerModule: function(name, module) {
      if (module.options) {
        $.magnificPopup.defaults[name] = module.options;
      }
      $.extend(this.proto, module.proto);
      this.modules.push(name);
    },

    defaults: {
      // Info about options is in docs:
      // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

      disableOn: 0,

      key: null,

      midClick: false,

      mainClass: "",

      preloader: true,

      focus: "", // CSS selector of input to focus after popup is opened

      closeOnContentClick: false,

      closeOnBgClick: true,

      closeBtnInside: true,

      showCloseBtn: true,

      enableEscapeKey: true,

      modal: false,

      alignTop: false,

      removalDelay: 0,

      prependTo: null,

      fixedContentPos: "auto",

      fixedBgPos: "auto",

      overflowY: "auto",

      closeMarkup:
        '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

      tClose: "Close (Esc)",

      tLoading: "Loading...",

      autoFocusLast: true
    }
  };

  $.fn.magnificPopup = function(options) {
    _checkInstance();

    var jqEl = $(this);

    // We call some API method of first param is a string
    if (typeof options === "string") {
      if (options === "open") {
        var items,
          itemOpts = _isJQ ? jqEl.data("magnificPopup") : jqEl[0].magnificPopup,
          index = parseInt(arguments[1], 10) || 0;

        if (itemOpts.items) {
          items = itemOpts.items[index];
        } else {
          items = jqEl;
          if (itemOpts.delegate) {
            items = items.find(itemOpts.delegate);
          }
          items = items.eq(index);
        }
        mfp._openClick({ mfpEl: items }, jqEl, itemOpts);
      } else {
        if (mfp.isOpen)
          mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
      }
    } else {
      // clone options obj
      options = $.extend(true, {}, options);

      /*
       * As Zepto doesn't support .data() method for objects
       * and it works only in normal browsers
       * we assign "options" object directly to the DOM element. FTW!
       */
      if (_isJQ) {
        jqEl.data("magnificPopup", options);
      } else {
        jqEl[0].magnificPopup = options;
      }

      mfp.addGroup(jqEl, options);
    }
    return jqEl;
  };

  /*>>core*/

  /*>>inline*/

  var INLINE_NS = "inline",
    _hiddenClass,
    _inlinePlaceholder,
    _lastInlineElement,
    _putInlineElementsBack = function() {
      if (_lastInlineElement) {
        _inlinePlaceholder
          .after(_lastInlineElement.addClass(_hiddenClass))
          .detach();
        _lastInlineElement = null;
      }
    };

  $.magnificPopup.registerModule(INLINE_NS, {
    options: {
      hiddenClass: "hide", // will be appended with `mfp-` prefix
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function() {
        mfp.types.push(INLINE_NS);

        _mfpOn(CLOSE_EVENT + "." + INLINE_NS, function() {
          _putInlineElementsBack();
        });
      },

      getInline: function(item, template) {
        _putInlineElementsBack();

        if (item.src) {
          var inlineSt = mfp.st.inline,
            el = $(item.src);

          if (el.length) {
            // If target element has parent - we replace it with placeholder and put it back after popup is closed
            var parent = el[0].parentNode;
            if (parent && parent.tagName) {
              if (!_inlinePlaceholder) {
                _hiddenClass = inlineSt.hiddenClass;
                _inlinePlaceholder = _getEl(_hiddenClass);
                _hiddenClass = "mfp-" + _hiddenClass;
              }
              // replace target inline element with placeholder
              _lastInlineElement = el
                .after(_inlinePlaceholder)
                .detach()
                .removeClass(_hiddenClass);
            }

            mfp.updateStatus("ready");
          } else {
            mfp.updateStatus("error", inlineSt.tNotFound);
            el = $("<div>");
          }

          item.inlineElement = el;
          return el;
        }

        mfp.updateStatus("ready");
        mfp._parseMarkup(template, {}, item);
        return template;
      }
    }
  });

  /*>>inline*/

  /*>>ajax*/
  var AJAX_NS = "ajax",
    _ajaxCur,
    _removeAjaxCursor = function() {
      if (_ajaxCur) {
        $(document.body).removeClass(_ajaxCur);
      }
    },
    _destroyAjaxRequest = function() {
      _removeAjaxCursor();
      if (mfp.req) {
        mfp.req.abort();
      }
    };

  $.magnificPopup.registerModule(AJAX_NS, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },

    proto: {
      initAjax: function() {
        mfp.types.push(AJAX_NS);
        _ajaxCur = mfp.st.ajax.cursor;

        _mfpOn(CLOSE_EVENT + "." + AJAX_NS, _destroyAjaxRequest);
        _mfpOn("BeforeChange." + AJAX_NS, _destroyAjaxRequest);
      },
      getAjax: function(item) {
        if (_ajaxCur) {
          $(document.body).addClass(_ajaxCur);
        }

        mfp.updateStatus("loading");

        var opts = $.extend(
          {
            url: item.src,
            success: function(data, textStatus, jqXHR) {
              var temp = {
                data: data,
                xhr: jqXHR
              };

              _mfpTrigger("ParseAjax", temp);

              mfp.appendContent($(temp.data), AJAX_NS);

              item.finished = true;

              _removeAjaxCursor();

              mfp._setFocus();

              setTimeout(function() {
                mfp.wrap.addClass(READY_CLASS);
              }, 16);

              mfp.updateStatus("ready");

              _mfpTrigger("AjaxContentAdded");
            },
            error: function() {
              _removeAjaxCursor();
              item.finished = item.loadError = true;
              mfp.updateStatus(
                "error",
                mfp.st.ajax.tError.replace("%url%", item.src)
              );
            }
          },
          mfp.st.ajax.settings
        );

        mfp.req = $.ajax(opts);

        return "";
      }
    }
  });

  /*>>ajax*/

  /*>>image*/
  var _imgInterval,
    _getTitle = function(item) {
      if (item.data && item.data.title !== undefined) return item.data.title;

      var src = mfp.st.image.titleSrc;

      if (src) {
        if ($.isFunction(src)) {
          return src.call(mfp, item);
        } else if (item.el) {
          return item.el.attr(src) || "";
        }
      }
      return "";
    };

  $.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure">' +
        '<div class="mfp-close"></div>' +
        "<figure>" +
        '<div class="mfp-img"></div>' +
        "<figcaption>" +
        '<div class="mfp-bottom-bar">' +
        '<div class="mfp-title"></div>' +
        '<div class="mfp-counter"></div>' +
        "</div>" +
        "</figcaption>" +
        "</figure>" +
        "</div>",
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: true,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },

    proto: {
      initImage: function() {
        var imgSt = mfp.st.image,
          ns = ".image";

        mfp.types.push("image");

        _mfpOn(OPEN_EVENT + ns, function() {
          if (mfp.currItem.type === "image" && imgSt.cursor) {
            $(document.body).addClass(imgSt.cursor);
          }
        });

        _mfpOn(CLOSE_EVENT + ns, function() {
          if (imgSt.cursor) {
            $(document.body).removeClass(imgSt.cursor);
          }
          _window.off("resize" + EVENT_NS);
        });

        _mfpOn("Resize" + ns, mfp.resizeImage);
        if (mfp.isLowIE) {
          _mfpOn("AfterChange", mfp.resizeImage);
        }
      },
      resizeImage: function() {
        var item = mfp.currItem;
        if (!item || !item.img) return;

        if (mfp.st.image.verticalFit) {
          var decr = 0;
          // fix box-sizing in ie7/8
          if (mfp.isLowIE) {
            decr =
              parseInt(item.img.css("padding-top"), 10) +
              parseInt(item.img.css("padding-bottom"), 10);
          }
          item.img.css("max-height", mfp.wH - decr);
        }
      },
      _onImageHasSize: function(item) {
        if (item.img) {
          item.hasSize = true;

          if (_imgInterval) {
            clearInterval(_imgInterval);
          }

          item.isCheckingImgSize = false;

          _mfpTrigger("ImageHasSize", item);

          if (item.imgHidden) {
            if (mfp.content) mfp.content.removeClass("mfp-loading");

            item.imgHidden = false;
          }
        }
      },

      /**
       * Function that loops until the image has size to display elements that rely on it asap
       */
      findImageSize: function(item) {
        var counter = 0,
          img = item.img[0],
          mfpSetInterval = function(delay) {
            if (_imgInterval) {
              clearInterval(_imgInterval);
            }
            // decelerating interval that checks for size of an image
            _imgInterval = setInterval(function() {
              if (img.naturalWidth > 0) {
                mfp._onImageHasSize(item);
                return;
              }

              if (counter > 200) {
                clearInterval(_imgInterval);
              }

              counter++;
              if (counter === 3) {
                mfpSetInterval(10);
              } else if (counter === 40) {
                mfpSetInterval(50);
              } else if (counter === 100) {
                mfpSetInterval(500);
              }
            }, delay);
          };

        mfpSetInterval(1);
      },

      getImage: function(item, template) {
        var guard = 0,
          // image load complete handler
          onLoadComplete = function() {
            if (item) {
              if (item.img[0].complete) {
                item.img.off(".mfploader");

                if (item === mfp.currItem) {
                  mfp._onImageHasSize(item);

                  mfp.updateStatus("ready");
                }

                item.hasSize = true;
                item.loaded = true;

                _mfpTrigger("ImageLoadComplete");
              } else {
                // if image complete check fails 200 times (20 sec), we assume that there was an error.
                guard++;
                if (guard < 200) {
                  setTimeout(onLoadComplete, 100);
                } else {
                  onLoadError();
                }
              }
            }
          },
          // image error handler
          onLoadError = function() {
            if (item) {
              item.img.off(".mfploader");
              if (item === mfp.currItem) {
                mfp._onImageHasSize(item);
                mfp.updateStatus(
                  "error",
                  imgSt.tError.replace("%url%", item.src)
                );
              }

              item.hasSize = true;
              item.loaded = true;
              item.loadError = true;
            }
          },
          imgSt = mfp.st.image;

        var el = template.find(".mfp-img");
        if (el.length) {
          var img = document.createElement("img");
          img.className = "mfp-img";
          if (item.el && item.el.find("img").length) {
            img.alt = item.el.find("img").attr("alt");
          }
          item.img = $(img)
            .on("load.mfploader", onLoadComplete)
            .on("error.mfploader", onLoadError);
          img.src = item.src;

          // without clone() "error" event is not firing when IMG is replaced by new IMG
          // TODO: find a way to avoid such cloning
          if (el.is("img")) {
            item.img = item.img.clone();
          }

          img = item.img[0];
          if (img.naturalWidth > 0) {
            item.hasSize = true;
          } else if (!img.width) {
            item.hasSize = false;
          }
        }

        mfp._parseMarkup(
          template,
          {
            title: _getTitle(item),
            img_replaceWith: item.img
          },
          item
        );

        mfp.resizeImage();

        if (item.hasSize) {
          if (_imgInterval) clearInterval(_imgInterval);

          if (item.loadError) {
            template.addClass("mfp-loading");
            mfp.updateStatus("error", imgSt.tError.replace("%url%", item.src));
          } else {
            template.removeClass("mfp-loading");
            mfp.updateStatus("ready");
          }
          return template;
        }

        mfp.updateStatus("loading");
        item.loading = true;

        if (!item.hasSize) {
          item.imgHidden = true;
          template.addClass("mfp-loading");
          mfp.findImageSize(item);
        }

        return template;
      }
    }
  });

  /*>>image*/

  /*>>zoom*/
  var hasMozTransform,
    getHasMozTransform = function() {
      if (hasMozTransform === undefined) {
        hasMozTransform =
          document.createElement("p").style.MozTransform !== undefined;
      }
      return hasMozTransform;
    };

  $.magnificPopup.registerModule("zoom", {
    options: {
      enabled: false,
      easing: "ease-in-out",
      duration: 300,
      opener: function(element) {
        return element.is("img") ? element : element.find("img");
      }
    },

    proto: {
      initZoom: function() {
        var zoomSt = mfp.st.zoom,
          ns = ".zoom",
          image;

        if (!zoomSt.enabled || !mfp.supportsTransition) {
          return;
        }

        var duration = zoomSt.duration,
          getElToAnimate = function(image) {
            var newImg = image
                .clone()
                .removeAttr("style")
                .removeAttr("class")
                .addClass("mfp-animated-image"),
              transition =
                "all " + zoomSt.duration / 1000 + "s " + zoomSt.easing,
              cssObj = {
                position: "fixed",
                zIndex: 9999,
                left: 0,
                top: 0,
                "-webkit-backface-visibility": "hidden"
              },
              t = "transition";

            cssObj["-webkit-" + t] = cssObj["-moz-" + t] = cssObj[
              "-o-" + t
            ] = cssObj[t] = transition;

            newImg.css(cssObj);
            return newImg;
          },
          showMainContent = function() {
            mfp.content.css("visibility", "visible");
          },
          openTimeout,
          animatedImg;

        _mfpOn("BuildControls" + ns, function() {
          if (mfp._allowZoom()) {
            clearTimeout(openTimeout);
            mfp.content.css("visibility", "hidden");

            // Basically, all code below does is clones existing image, puts in on top of the current one and animated it

            image = mfp._getItemToZoom();

            if (!image) {
              showMainContent();
              return;
            }

            animatedImg = getElToAnimate(image);

            animatedImg.css(mfp._getOffset());

            mfp.wrap.append(animatedImg);

            openTimeout = setTimeout(function() {
              animatedImg.css(mfp._getOffset(true));
              openTimeout = setTimeout(function() {
                showMainContent();

                setTimeout(function() {
                  animatedImg.remove();
                  image = animatedImg = null;
                  _mfpTrigger("ZoomAnimationEnded");
                }, 16); // avoid blink when switching images
              }, duration); // this timeout equals animation duration
            }, 16); // by adding this timeout we avoid short glitch at the beginning of animation

            // Lots of timeouts...
          }
        });
        _mfpOn(BEFORE_CLOSE_EVENT + ns, function() {
          if (mfp._allowZoom()) {
            clearTimeout(openTimeout);

            mfp.st.removalDelay = duration;

            if (!image) {
              image = mfp._getItemToZoom();
              if (!image) {
                return;
              }
              animatedImg = getElToAnimate(image);
            }

            animatedImg.css(mfp._getOffset(true));
            mfp.wrap.append(animatedImg);
            mfp.content.css("visibility", "hidden");

            setTimeout(function() {
              animatedImg.css(mfp._getOffset());
            }, 16);
          }
        });

        _mfpOn(CLOSE_EVENT + ns, function() {
          if (mfp._allowZoom()) {
            showMainContent();
            if (animatedImg) {
              animatedImg.remove();
            }
            image = null;
          }
        });
      },

      _allowZoom: function() {
        return mfp.currItem.type === "image";
      },

      _getItemToZoom: function() {
        if (mfp.currItem.hasSize) {
          return mfp.currItem.img;
        } else {
          return false;
        }
      },

      // Get element postion relative to viewport
      _getOffset: function(isLarge) {
        var el;
        if (isLarge) {
          el = mfp.currItem.img;
        } else {
          el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
        }

        var offset = el.offset();
        var paddingTop = parseInt(el.css("padding-top"), 10);
        var paddingBottom = parseInt(el.css("padding-bottom"), 10);
        offset.top -= $(window).scrollTop() - paddingTop;

        /*

				 Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

				 */
        var obj = {
          width: el.width(),
          // fix Zepto height+padding issue
          height:
            (_isJQ ? el.innerHeight() : el[0].offsetHeight) -
            paddingBottom -
            paddingTop
        };

        // I hate to do this, but there is no another option
        if (getHasMozTransform()) {
          obj["-moz-transform"] = obj["transform"] =
            "translate(" + offset.left + "px," + offset.top + "px)";
        } else {
          obj.left = offset.left;
          obj.top = offset.top;
        }
        return obj;
      }
    }
  });

  /*>>zoom*/

  /*>>iframe*/

  var IFRAME_NS = "iframe",
    _emptyPage = "//about:blank",
    _fixIframeBugs = function(isShowing) {
      if (mfp.currTemplate[IFRAME_NS]) {
        var el = mfp.currTemplate[IFRAME_NS].find("iframe");
        if (el.length) {
          // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
          if (!isShowing) {
            el[0].src = _emptyPage;
          }

          // IE8 black screen bug fix
          if (mfp.isIE8) {
            el.css("display", isShowing ? "block" : "none");
          }
        }
      }
    };

  $.magnificPopup.registerModule(IFRAME_NS, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>' +
        "</div>",

      srcAction: "iframe_src",

      // we don't care and support only one default type of URL by default
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },

    proto: {
      initIframe: function() {
        mfp.types.push(IFRAME_NS);

        _mfpOn("BeforeChange", function(e, prevType, newType) {
          if (prevType !== newType) {
            if (prevType === IFRAME_NS) {
              _fixIframeBugs(); // iframe if removed
            } else if (newType === IFRAME_NS) {
              _fixIframeBugs(true); // iframe is showing
            }
          } // else {
          // iframe source is switched, don't do anything
          //}
        });

        _mfpOn(CLOSE_EVENT + "." + IFRAME_NS, function() {
          _fixIframeBugs();
        });
      },

      getIframe: function(item, template) {
        var embedSrc = item.src;
        var iframeSt = mfp.st.iframe;

        $.each(iframeSt.patterns, function() {
          if (embedSrc.indexOf(this.index) > -1) {
            if (this.id) {
              if (typeof this.id === "string") {
                embedSrc = embedSrc.substr(
                  embedSrc.lastIndexOf(this.id) + this.id.length,
                  embedSrc.length
                );
              } else {
                embedSrc = this.id.call(this, embedSrc);
              }
            }
            embedSrc = this.src.replace("%id%", embedSrc);
            return false; // break;
          }
        });

        var dataObj = {};
        if (iframeSt.srcAction) {
          dataObj[iframeSt.srcAction] = embedSrc;
        }
        mfp._parseMarkup(template, dataObj, item);

        mfp.updateStatus("ready");

        return template;
      }
    }
  });

  /*>>iframe*/

  /*>>gallery*/
  /**
   * Get looped index depending on number of slides
   */
  var _getLoopedId = function(index) {
      var numSlides = mfp.items.length;
      if (index > numSlides - 1) {
        return index - numSlides;
      } else if (index < 0) {
        return numSlides + index;
      }
      return index;
    },
    _replaceCurrTotal = function(text, curr, total) {
      return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
    };

  $.magnificPopup.registerModule("gallery", {
    options: {
      enabled: false,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: true,
      arrows: true,

      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },

    proto: {
      initGallery: function() {
        var gSt = mfp.st.gallery,
          ns = ".mfp-gallery";

        mfp.direction = true; // true - next, false - prev

        if (!gSt || !gSt.enabled) return false;

        _wrapClasses += " mfp-gallery";

        _mfpOn(OPEN_EVENT + ns, function() {
          if (gSt.navigateByImgClick) {
            mfp.wrap.on("click" + ns, ".mfp-img", function() {
              if (mfp.items.length > 1) {
                mfp.next();
                return false;
              }
            });
          }

          _document.on("keydown" + ns, function(e) {
            if (e.keyCode === 37) {
              mfp.prev();
            } else if (e.keyCode === 39) {
              mfp.next();
            }
          });
        });

        _mfpOn("UpdateStatus" + ns, function(e, data) {
          if (data.text) {
            data.text = _replaceCurrTotal(
              data.text,
              mfp.currItem.index,
              mfp.items.length
            );
          }
        });

        _mfpOn(MARKUP_PARSE_EVENT + ns, function(e, element, values, item) {
          var l = mfp.items.length;
          values.counter =
            l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : "";
        });

        _mfpOn("BuildControls" + ns, function() {
          if (mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
            var markup = gSt.arrowMarkup,
              arrowLeft = (mfp.arrowLeft = $(
                markup
                  .replace(/%title%/gi, gSt.tPrev)
                  .replace(/%dir%/gi, "left")
              ).addClass(PREVENT_CLOSE_CLASS)),
              arrowRight = (mfp.arrowRight = $(
                markup
                  .replace(/%title%/gi, gSt.tNext)
                  .replace(/%dir%/gi, "right")
              ).addClass(PREVENT_CLOSE_CLASS));

            arrowLeft.click(function() {
              mfp.prev();
            });
            arrowRight.click(function() {
              mfp.next();
            });

            mfp.container.append(arrowLeft.add(arrowRight));
          }
        });

        _mfpOn(CHANGE_EVENT + ns, function() {
          if (mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

          mfp._preloadTimeout = setTimeout(function() {
            mfp.preloadNearbyImages();
            mfp._preloadTimeout = null;
          }, 16);
        });

        _mfpOn(CLOSE_EVENT + ns, function() {
          _document.off(ns);
          mfp.wrap.off("click" + ns);
          mfp.arrowRight = mfp.arrowLeft = null;
        });
      },
      next: function() {
        mfp.direction = true;
        mfp.index = _getLoopedId(mfp.index + 1);
        mfp.updateItemHTML();
      },
      prev: function() {
        mfp.direction = false;
        mfp.index = _getLoopedId(mfp.index - 1);
        mfp.updateItemHTML();
      },
      goTo: function(newIndex) {
        mfp.direction = newIndex >= mfp.index;
        mfp.index = newIndex;
        mfp.updateItemHTML();
      },
      preloadNearbyImages: function() {
        var p = mfp.st.gallery.preload,
          preloadBefore = Math.min(p[0], mfp.items.length),
          preloadAfter = Math.min(p[1], mfp.items.length),
          i;

        for (i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
          mfp._preloadItem(mfp.index + i);
        }
        for (i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
          mfp._preloadItem(mfp.index - i);
        }
      },
      _preloadItem: function(index) {
        index = _getLoopedId(index);

        if (mfp.items[index].preloaded) {
          return;
        }

        var item = mfp.items[index];
        if (!item.parsed) {
          item = mfp.parseEl(index);
        }

        _mfpTrigger("LazyLoad", item);

        if (item.type === "image") {
          item.img = $('<img class="mfp-img" />')
            .on("load.mfploader", function() {
              item.hasSize = true;
            })
            .on("error.mfploader", function() {
              item.hasSize = true;
              item.loadError = true;
              _mfpTrigger("LazyLoadError", item);
            })
            .attr("src", item.src);
        }

        item.preloaded = true;
      }
    }
  });

  /*>>gallery*/

  /*>>retina*/

  var RETINA_NS = "retina";

  $.magnificPopup.registerModule(RETINA_NS, {
    options: {
      replaceSrc: function(item) {
        return item.src.replace(/\.\w+$/, function(m) {
          return "@2x" + m;
        });
      },
      ratio: 1 // Function or number.  Set to 1 to disable.
    },
    proto: {
      initRetina: function() {
        if (window.devicePixelRatio > 1) {
          var st = mfp.st.retina,
            ratio = st.ratio;

          ratio = !isNaN(ratio) ? ratio : ratio();

          if (ratio > 1) {
            _mfpOn("ImageHasSize" + "." + RETINA_NS, function(e, item) {
              item.img.css({
                "max-width": item.img[0].naturalWidth / ratio,
                width: "100%"
              });
            });
            _mfpOn("ElementParse" + "." + RETINA_NS, function(e, item) {
              item.src = st.replaceSrc(item, ratio);
            });
          }
        }
      }
    }
  });

  /*>>retina*/
  _checkInstance();
});
/*!
 * jQuery Rellax Plugin v0.3.7.1
 * Examples and documentation at http://pixelgrade.github.io/rellax/
 * Copyright (c) 2016 - 2019 PixelGrade http://www.pixelgrade.com
 * Licensed under MIT http://www.opensource.org/licenses/mit-license.php/
 */
(function($, window, document, undefined) {
  if (!window.requestAnimationFrame) {
    return;
  }

  function Rellax(element, options) {
    this.$el = $(element);
    this.ready = false;
    this.options = $.extend($.fn.rellax.defaults, options);
    this.$parent = this.$el.parent().closest(this.options.container);
    this.parent = this.$parent.data("plugin_" + Rellax);

    var $el = this.$el,
      amount = $el.data("rellax-amount"),
      bleed = $el.data("rellax-bleed"),
      fill = $el.data("rellax-fill"),
      scale = $el.data("rellax-scale");

    this.options.amount =
      amount !== undefined ? parseFloat(amount) : this.options.amount;
    this.options.bleed =
      bleed !== undefined ? parseFloat(bleed) : this.options.bleed;
    this.options.scale =
      scale !== undefined ? parseFloat(scale) : this.options.scale;
    this.options.fill = fill !== undefined;

    if (this.options.amount === 0) {
      return;
    }

    this._setParentHeight();
    this._resetElement();
    this._reloadElement();
    this._prepareElement();
    this._updatePosition();

    elements.push(this);
  }

  $.extend(Rellax.prototype, {
    constructor: Rellax,
    _resetElement: function() {
      this.$el.css({
        position: "",
        top: "",
        left: "",
        width: "",
        height: "",
        transform: ""
      });
    },
    _reloadElement: function() {
      this.$el.css({
        position: "",
        top: "",
        left: "",
        width: "",
        height: ""
      });
      this.offset = this.$el.offset();
      this.height = this.$el.outerHeight();
      this.width = this.$el.outerWidth();

      if (this.parent === undefined) {
        this.offset.top -= this.options.bleed;
        this.height += 2 * this.options.bleed;
      }

      this.ready = true;
    },
    _scaleElement: function() {
      var parentHeight = this.$parent.outerHeight(),
        parentWidth = this.$parent.outerWidth(),
        scaleY =
          (parentHeight +
            (windowHeight - parentHeight) * (1 - this.options.amount)) /
          this.height,
        scaleX = parentWidth / this.width,
        scale = Math.max(scaleX, scaleY);

      this.width = this.width * scale;
      this.height = this.height * scale;

      this.offset.top = (parentHeight - this.height) / 2;
      this.offset.left = (parentWidth - this.width) / 2;
    },
    _prepareElement: function() {
      if (this.parent === undefined) {
        this.$el.addClass("rellax-element");
        this.$el.css({
          position: "fixed",
          top: this.offset.top,
          left: this.offset.left,
          width: this.width,
          height: this.height
        });
      } else {
        this._scaleElement();
        this.$el.css({
          position: "absolute",
          top: this.offset.top,
          left: this.offset.left,
          width: this.width,
          height: this.height
        });
      }
    },
    _setParentHeight: function() {
      if (this.parent == undefined) {
        var $parent = this.$el.parent(),
          parentHeight = $parent.css("minHeight", "").outerHeight();

        parentHeight =
          windowHeight < parentHeight ? windowHeight : parentHeight;
        $parent.css("minHeight", parentHeight);
      }
    },
    _updatePosition: function(forced) {
      if (this.ready !== true) return;

      var progress = this._getProgress(),
        height = this.parent !== undefined ? this.parent.height : this.height,
        move = (windowHeight + height) * (progress - 0.5) * this.options.amount,
        scale = 1 + (this.options.scale - 1) * progress,
        scaleTransform = scale >= 1 ? "scale(" + scale + ")" : "";

      if (this.parent === undefined) {
        move *= -1;
      }

      if (forced !== true && (progress < 0 || progress > 1)) {
        this.$el.addClass("rellax-hidden");
        return;
      }

      this.$el.removeClass("rellax-hidden");

      this.$el.data("progress", progress);

      if (this.$el.is(this.options.container)) {
        this.$el.css("transform", "translate3d(0," + -lastScrollY + "px,0)");
      } else {
        this.$el.css(
          "transform",
          "translate3d(0," + move + "px,0) " + scaleTransform
        );
      }
    },
    _getProgress: function() {
      if (this.parent !== undefined) {
        return parseFloat(this.$parent.data("progress"));
      } else {
        return (
          (lastScrollY - this.offset.top + windowHeight) /
          (windowHeight + this.height)
        );
      }
    }
  });

  $.fn.rellax = function(options) {
    return this.each(function() {
      var element = $.data(this, "plugin_" + Rellax),
        idx;

      if (typeof options !== "string" && typeof element === "undefined") {
        $.data(this, "plugin_" + Rellax, new Rellax(this, options));
      } else {
        if (options === "destroy") {
          idx = elements.indexOf(element);
          if (idx > -1) {
            elements[idx]._resetElement();
            elements[idx].$el.removeClass("rellax-element rellax-hidden");
            $.removeData(this, "plugin_" + Rellax);
            elements.splice(idx, 1);
          }
        }
      }
    });
  };

  $.fn.rellax.defaults = {
    amount: 0.5,
    bleed: 0,
    scale: 1,
    container: "[data-rellax-container]"
  };

  var $window = $(window),
    windowWidth = window.screen.width || window.innerWidth,
    windowHeight = window.screen.height || window.innerHeight,
    lastScrollY =
      (window.pageYOffset || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0),
    frameRendered = true,
    elements = [];

  function render() {
    if (frameRendered !== true) {
      updateAll();
    }
    window.requestAnimationFrame(render);
    frameRendered = true;
  }

  function updateAll(forced) {
    $.each(elements, function(i, element) {
      element._updatePosition(forced);
    });
  }

  function resetAll() {
    $.each(elements, function(i, element) {
      element._resetElement();
    });
  }

  function reloadAll() {
    $.each(elements, function(i, element) {
      element._reloadElement();
    });
  }

  function prepareAll() {
    $.each(elements, function(i, element) {
      element._prepareElement();
    });
  }

  function setHeights() {
    $.each(elements, function(i, element) {
      element._setParentHeight();
    });
  }

  function badRestart() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    setHeights();
    resetAll();
    reloadAll();
    prepareAll();
    updateAll(true);
    $(window).trigger("rellax:restart");
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function bindEvents() {
    var restart = debounce(badRestart, 300);

    $(document).ready(render);

    $window.on("scroll", function() {
      if (frameRendered === true) {
        lastScrollY =
          (window.pageYOffset || document.documentElement.scrollTop) -
          (document.documentElement.clientTop || 0);
      }
      frameRendered = false;
    });

    $window.on("rellax", restart);
  }

  bindEvents();
})(jQuery, window, document);

/* ==== RESPOND JS ==== */

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia =
  window.matchMedia ||
  (function(a) {
    "use strict";
    var c,
      d = a.documentElement,
      e = d.firstElementChild || d.firstChild,
      f = a.createElement("body"),
      g = a.createElement("div");
    return (
      (g.id = "mq-test-1"),
      (g.style.cssText = "position:absolute;top:-100em"),
      (f.style.background = "none"),
      f.appendChild(g),
      function(a) {
        return (
          (g.innerHTML =
            '&shy;<style media="' +
            a +
            '"> #mq-test-1 { width: 42px; }</style>'),
          d.insertBefore(f, e),
          (c = 42 === g.offsetWidth),
          d.removeChild(f),
          {
            matches: c,
            media: a
          }
        );
      }
    );
  })(document);

/*! Respond.js v1.3.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(a) {
  "use strict";
  function x() {
    u(!0);
  }

  var b = {};
  if (
    ((a.respond = b),
    (b.update = function() {}),
    (b.mediaQueriesSupported =
      a.matchMedia && a.matchMedia("only all").matches),
    !b.mediaQueriesSupported)
  ) {
    var q,
      r,
      t,
      c = a.document,
      d = c.documentElement,
      e = [],
      f = [],
      g = [],
      h = {},
      i = 30,
      j = c.getElementsByTagName("head")[0] || d,
      k = c.getElementsByTagName("base")[0],
      l = j.getElementsByTagName("link"),
      m = [],
      n = function() {
        for (var b = 0; l.length > b; b++) {
          var c = l[b],
            d = c.href,
            e = c.media,
            f = c.rel && "stylesheet" === c.rel.toLowerCase();
          d &&
            f &&
            !h[d] &&
            (c.styleSheet && c.styleSheet.rawCssText
              ? (p(c.styleSheet.rawCssText, d, e), (h[d] = !0))
              : ((!/^([a-zA-Z:]*\/\/)/.test(d) && !k) ||
                  d.replace(RegExp.$1, "").split("/")[0] === a.location.host) &&
                m.push({
                  href: d,
                  media: e
                }));
        }
        o();
      },
      o = function() {
        if (m.length) {
          var b = m.shift();
          v(b.href, function(c) {
            p(c, b.href, b.media),
              (h[b.href] = !0),
              a.setTimeout(function() {
                o();
              }, 0);
          });
        }
      },
      p = function(a, b, c) {
        var d = a.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
          g = (d && d.length) || 0;
        b = b.substring(0, b.lastIndexOf("/"));
        var h = function(a) {
            return a.replace(
              /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
              "$1" + b + "$2$3"
            );
          },
          i = !g && c;
        b.length && (b += "/"), i && (g = 1);
        for (var j = 0; g > j; j++) {
          var k, l, m, n;
          i
            ? ((k = c), f.push(h(a)))
            : ((k = d[j].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1),
              f.push(RegExp.$2 && h(RegExp.$2))),
            (m = k.split(",")),
            (n = m.length);
          for (var o = 0; n > o; o++)
            (l = m[o]),
              e.push({
                media:
                  (l.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) &&
                    RegExp.$2) ||
                  "all",
                rules: f.length - 1,
                hasquery: l.indexOf("(") > -1,
                minw:
                  l.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) &&
                  parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                maxw:
                  l.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) &&
                  parseFloat(RegExp.$1) + (RegExp.$2 || "")
              });
        }
        u();
      },
      s = function() {
        var a,
          b = c.createElement("div"),
          e = c.body,
          f = !1;
        return (
          (b.style.cssText = "position:absolute;font-size:1em;width:1em"),
          e ||
            ((e = f = c.createElement("body")), (e.style.background = "none")),
          e.appendChild(b),
          d.insertBefore(e, d.firstChild),
          (a = b.offsetWidth),
          f ? d.removeChild(e) : e.removeChild(b),
          (a = t = parseFloat(a))
        );
      },
      u = function(b) {
        var h = "clientWidth",
          k = d[h],
          m = ("CSS1Compat" === c.compatMode && k) || c.body[h] || k,
          n = {},
          o = l[l.length - 1],
          p = new Date().getTime();
        if (b && q && i > p - q)
          return a.clearTimeout(r), (r = a.setTimeout(u, i)), void 0;
        q = p;
        for (var v in e)
          if (e.hasOwnProperty(v)) {
            var w = e[v],
              x = w.minw,
              y = w.maxw,
              z = null === x,
              A = null === y,
              B = "em";
            x && (x = parseFloat(x) * (x.indexOf(B) > -1 ? t || s() : 1)),
              y && (y = parseFloat(y) * (y.indexOf(B) > -1 ? t || s() : 1)),
              (w.hasquery && ((z && A) || !(z || m >= x) || !(A || y >= m))) ||
                (n[w.media] || (n[w.media] = []), n[w.media].push(f[w.rules]));
          }
        for (var C in g)
          g.hasOwnProperty(C) &&
            g[C] &&
            g[C].parentNode === j &&
            j.removeChild(g[C]);
        for (var D in n)
          if (n.hasOwnProperty(D)) {
            var E = c.createElement("style"),
              F = n[D].join("\n");
            (E.type = "text/css"),
              (E.media = D),
              j.insertBefore(E, o.nextSibling),
              E.styleSheet
                ? (E.styleSheet.cssText = F)
                : E.appendChild(c.createTextNode(F)),
              g.push(E);
          }
      },
      v = function(a, b) {
        var c = w();
        c &&
          (c.open("GET", a, !0),
          (c.onreadystatechange = function() {
            4 !== c.readyState ||
              (200 !== c.status && 304 !== c.status) ||
              b(c.responseText);
          }),
          4 !== c.readyState && c.send(null));
      },
      w = (function() {
        var b = !1;
        try {
          b = new a.XMLHttpRequest();
        } catch (c) {
          b = new a.ActiveXObject("Microsoft.XMLHTTP");
        }
        return function() {
          return b;
        };
      })();
    n(),
      (b.update = n),
      a.addEventListener
        ? a.addEventListener("resize", x, !1)
        : a.attachEvent && a.attachEvent("onresize", x);
  }
})(this);

// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function() {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeStamp",
    "trace",
    "warn"
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

/*!
 Autosize v1.17.8 - 2013-09-07
 Automatically adjust textarea height based on user input.
 (c) 2013 Jack Moore - http://www.jacklmoore.com/autosize
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function(e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : e(window.jQuery || window.$);
})(function(e) {
  var t,
    o = {
      className: "autosizejs",
      append: "",
      callback: !1,
      resizeDelay: 10
    },
    i =
      '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
    n = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "fontStyle",
      "letterSpacing",
      "textTransform",
      "wordSpacing",
      "textIndent"
    ],
    s = e(i).data("autosize", !0)[0];
  (s.style.lineHeight = "99px"),
    "99px" === e(s).css("lineHeight") && n.push("lineHeight"),
    (s.style.lineHeight = ""),
    (e.fn.autosize = function(i) {
      return this.length
        ? ((i = e.extend({}, o, i || {})),
          s.parentNode !== document.body && e(document.body).append(s),
          this.each(function() {
            function o() {
              var t, o;
              "getComputedStyle" in window
                ? ((t = window.getComputedStyle(u)),
                  (o = u.getBoundingClientRect().width),
                  e.each(
                    [
                      "paddingLeft",
                      "paddingRight",
                      "borderLeftWidth",
                      "borderRightWidth"
                    ],
                    function(e, i) {
                      o -= parseInt(t[i], 10);
                    }
                  ),
                  (s.style.width = o + "px"))
                : (s.style.width = Math.max(p.width(), 0) + "px");
            }

            function a() {
              var a = {};
              if (
                ((t = u),
                (s.className = i.className),
                (d = parseInt(p.css("maxHeight"), 10)),
                e.each(n, function(e, t) {
                  a[t] = p.css(t);
                }),
                e(s).css(a),
                o(),
                window.chrome)
              ) {
                var r = u.style.width;
                (u.style.width = "0px"), u.offsetWidth, (u.style.width = r);
              }
            }

            function r() {
              var e, n;
              t !== u ? a() : o(),
                (s.value = u.value + i.append),
                (s.style.overflowY = u.style.overflowY),
                (n = parseInt(u.style.height, 10)),
                (s.scrollTop = 0),
                (s.scrollTop = 9e4),
                (e = s.scrollTop),
                d && e > d
                  ? ((u.style.overflowY = "scroll"), (e = d))
                  : ((u.style.overflowY = "hidden"), c > e && (e = c)),
                (e += f),
                n !== e &&
                  ((u.style.height = e + "px"), w && i.callback.call(u, u));
            }

            function l() {
              clearTimeout(h),
                (h = setTimeout(function() {
                  var e = p.width();
                  e !== g && ((g = e), r());
                }, parseInt(i.resizeDelay, 10)));
            }

            var d,
              c,
              h,
              u = this,
              p = e(u),
              f = 0,
              w = e.isFunction(i.callback),
              z = {
                height: u.style.height,
                overflow: u.style.overflow,
                overflowY: u.style.overflowY,
                wordWrap: u.style.wordWrap,
                resize: u.style.resize
              },
              g = p.width();
            p.data("autosize") ||
              (p.data("autosize", !0),
              ("border-box" === p.css("box-sizing") ||
                "border-box" === p.css("-moz-box-sizing") ||
                "border-box" === p.css("-webkit-box-sizing")) &&
                (f = p.outerHeight() - p.height()),
              (c = Math.max(
                parseInt(p.css("minHeight"), 10) - f || 0,
                p.height()
              )),
              p.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word",
                resize:
                  "none" === p.css("resize") || "vertical" === p.css("resize")
                    ? "none"
                    : "horizontal"
              }),
              "onpropertychange" in u
                ? "oninput" in u
                  ? p.on("input.autosize keyup.autosize", r)
                  : p.on("propertychange.autosize", function() {
                      "value" === event.propertyName && r();
                    })
                : p.on("input.autosize", r),
              i.resizeDelay !== !1 && e(window).on("resize.autosize", l),
              p.on("autosize.resize", r),
              p.on("autosize.resizeIncludeStyle", function() {
                (t = null), r();
              }),
              p.on("autosize.destroy", function() {
                (t = null),
                  clearTimeout(h),
                  e(window).off("resize", l),
                  p
                    .off("autosize")
                    .off(".autosize")
                    .css(z)
                    .removeData("autosize");
              }),
              r());
          }))
        : this;
    });
});

// Place any jQuery/helper plugins in here.
