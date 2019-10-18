(function($, window, undefined) {
  /* --- DETECT VIEWPORT SIZE --- */

  function browserSize() {
    wh = $(window).height();
    ww = $(window).width();
    dh = $(document).height();
    ar = ww / wh;
  }

  /* --- DETECT PLATFORM --- */

  function platformDetect() {
    $.support.touch = "ontouchend" in document;
    var navUA = navigator.userAgent.toLowerCase(),
      navPlat = navigator.platform.toLowerCase();

    var isiPhone = navPlat.indexOf("iphone"),
      isiPod = navPlat.indexOf("ipod"),
      isAndroidPhone = navPlat.indexOf("android"),
      safari =
        navUA.indexOf("safari") != -1 && navUA.indexOf("chrome") == -1
          ? true
          : false,
      svgSupport = window.SVGAngle ? true : false,
      svgSupportAlt = document.implementation.hasFeature(
        "http://www.w3.org/TR/SVG11/feature#BasicStructure",
        "1.1"
      )
        ? true
        : false,
      ff3x = /gecko/i.test(navUA) && /rv:1.9/i.test(navUA) ? true : false;

    ieMobile = navigator.userAgent.match(/Windows Phone/i) ? true : false;
    phone = isiPhone > -1 || isiPod > -1 || isAndroidPhone > -1 ? true : false;
    touch = $.support.touch ? true : false;
    ltie9 = $.support.leadingWhitespace ? false : true;

    var $bod = $("body");

    if (touch) $("html").addClass("touch");
    if (ieMobile) $("html").addClass("is--winmob");
    if (is_android) $("html").addClass("is--ancient-android");
    if (safari) $bod.addClass("safari");
    if (phone) $bod.addClass("phone");
  }
  // /* ====== SHARED VARS ====== */

  var phone, touch, ltie9, dh, ar, fonts, ieMobile;

  var ua = navigator.userAgent;
  var winLoc = window.location.toString();

  var is_webkit = ua.match(/webkit/i);
  var is_firefox = ua.match(/gecko/i);
  var is_newer_ie = ua.match(/msie (9|([1-9][0-9]))/i);
  var is_older_ie = ua.match(/msie/i) && !is_newer_ie;
  var is_ancient_ie = ua.match(/msie 6/i);
  var is_ie = is_ancient_ie || is_older_ie || is_newer_ie;
  var is_mobile_ie = navigator.userAgent.indexOf("IEMobile") !== -1;
  var is_mobile = ua.match(/mobile/i);
  var is_OSX = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false;
  var iOS = getIOSVersion(ua);
  var is_EDGE = /Edge\/12./i.test(navigator.userAgent);

  var latestKnownScrollY = -1,
    newScrollY =
      (window.pageYOffset || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0),
    ticking = false;

  if (is_EDGE) {
    jQuery("body").addClass("is-edge");
  }

  var nua = navigator.userAgent;
  var is_android =
    nua.indexOf("Mozilla/5.0") !== -1 &&
    nua.indexOf("Android ") !== -1 &&
    nua.indexOf("AppleWebKit") !== -1 &&
    nua.indexOf("Chrome") === -1;
  var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

  var useTransform = true;
  var use2DTransform = ua.match(/msie 9/i) || winLoc.match(/transform\=2d/i);
  var transform;

  // setting up transform prefixes
  var prefixes = {
    webkit: "webkitTransform",
    firefox: "MozTransform",
    ie: "msTransform",
    w3c: "transform"
  };

  if (useTransform) {
    if (is_webkit) {
      transform = prefixes.webkit;
    } else if (is_firefox) {
      transform = prefixes.firefox;
    } else if (is_newer_ie) {
      transform = prefixes.ie;
    }
  }

  var windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

  /* --- To enable verbose debug add to Theme Options > Custom Code footer -> globalDebug=true; --- */
  var globalDebug = false,
    timestamp;

  // /* ====== HELPER FUNCTIONS ====== */

  //similar to PHP's empty function
  function empty(data) {
    if (typeof data == "number" || typeof data == "boolean") {
      return false;
    }
    if (typeof data == "undefined" || data === null) {
      return true;
    }
    if (typeof data.length != "undefined") {
      return data.length === 0;
    }
    var count = 0;
    for (var i in data) {
      // if(data.hasOwnProperty(i))
      //
      // This doesn't work in ie8/ie9 due the fact that hasOwnProperty works only on native objects.
      // http://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
      //
      // for hosts objects we do this
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        count++;
      }
    }
    return count === 0;
  }

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  // taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
  function hasParent(e, id) {
    if (!e) return false;
    var el = e.target || e.srcElement || e || false;
    while (el && el.id != id) {
      el = el.parentNode || false;
    }
    return el !== false;
  }

  function mobilecheck() {
    var check = false;
    (function(a) {
      if (
        /(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  /* --- Set Query Parameter--- */
  function setQueryParameter(uri, key, value) {
    var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
    separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  }

  function getIOSVersion(ua) {
    ua = ua || navigator.userAgent;
    return (
      parseFloat(
        (
          "" +
          (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(
            ua
          ) || [0, ""])[1]
        )
          .replace("undefined", "3_2")
          .replace("_", ".")
          .replace("_", "")
      ) || false
    );
  }

  function setProgress(timeline, start, end) {
    var progress = (latestKnownScrollY - start) / (end - start);

    if (0 > progress) {
      timeline.progress(0);
      return;
    }

    if (1 < progress) {
      timeline.progress(1);
      return;
    }

    timeline.progress(progress);
  }

  /* --- Magnific Popup Initialization --- */

  function magnificPopupInit() {
    if (globalDebug) {
      console.log("Magnific Popup - Init");
    }

    $(".js-post-gallery").each(function() {
      // the containers for all your galleries should have the class gallery
      $(this).magnificPopup({
        tPrev: rosaStrings.tPrev,
        tNext: rosaStrings.tNext,
        tCounter: rosaStrings.tCounter,
        delegate:
          'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]', // the container for each your gallery items
        type: "image",
        closeOnContentClick: false,
        closeBtnInside: false,
        closeOnBgClick: false,
        fixedContentPos: true,
        removalDelay: 500,
        mainClass: "mfp-fade",
        image: {
          markup:
            '<div class="mfp-figure">' +
            '<div class="mfp-close"></div>' +
            '<div class="mfp-img"></div>' +
            '<div class="mfp-bottom-bar">' +
            '<div class="mfp-title"></div>' +
            '<div class="mfp-counter"></div>' +
            "</div>" +
            "</div>",
          titleSrc: function(item) {
            var output = "";
            if (
              typeof item.el.attr("data-alt") !== "undefined" &&
              item.el.attr("data-alt") !== ""
            ) {
              output += "<small>" + item.el.attr("data-alt") + "</small>";
            }
            return output;
          }
        },
        gallery: {
          enabled: true,
          navigateByImgClick: true
          //arrowMarkup: '<a href="#" class="gallery-arrow gallery-arrow--%dir% control-item arrow-button arrow-button--%dir%">%dir%</a>'
        },
        callbacks: {
          elementParse: function(item) {
            if (this.currItem != undefined) {
              item = this.currItem;
            }

            var output = "";
            if (
              typeof item.el.attr("data-alt") !== "undefined" &&
              item.el.attr("data-alt") !== ""
            ) {
              output += "<small>" + item.el.attr("data-alt") + "</small>";
            }

            $(".mfp-title").html(output);
          },
          change: function(item) {
            var output = "";
            if (
              typeof item.el.attr("data-alt") !== "undefined" &&
              item.el.attr("data-alt") !== ""
            ) {
              output += "<small>" + item.el.attr("data-alt") + "</small>";
            }

            $(".mfp-title").html(output);
          },
          beforeClose: function() {
            $(".mfp-arrow, .mfp-close").hide();
          }
        }
      });
    });
  }

  var Parallax = function(selector, options) {
    this.disabled = false;
    this.selector = selector;
    this.options = options;
  };

  Parallax.prototype.init = function($container) {
    $container = $container || $("body");
    if (this.disabled === false) {
      $container.find(this.selector).rellax(this.options);
    }
  };

  Parallax.prototype.disable = function() {
    this.disabled = true;
    this.destroy();
  };

  Parallax.prototype.destroy = function() {
    $(this.selector).rellax("destroy");
  };

  Parallax.prototype.enable = function() {
    this.disabled = false;
    $(this.selector).rellax(this.options);
  };

  (function($) {
    function observe($container) {
      var MutationObserver = window.MutationObserver,
        observer,
        config;

      if (typeof MutationObserver === "undefined") {
        return;
      }

      observer = new MutationObserver(function() {
        $(window).trigger("rellax");
      });

      config = {
        childList: true,
        characterData: false,
        attributes: false,
        subtree: true
      };

      $container.each(function() {
        observer.observe(this, config);
      });
    }

    observe($(".article__content"));
  })(jQuery);
  /* --- Sticky Header Init --- */

  var StickyHeader = (function() {
    var headerSelector = ".site-header",
      $header = $(headerSelector),
      headerHeight,
      $headers;

    function init() {
      headerHeight = $header.outerHeight();
      $headers = $(".article__header").first();
    }

    function update() {
      var inversed = false,
        adminBarHeight = $("#wpadminbar").outerHeight(),
        headerHeight = $header.outerHeight();

      $headers.each(function(i, obj) {
        var $obj = $(obj),
          start = $obj.offset().top,
          end = start + $obj.outerHeight();

        if (
          latestKnownScrollY >= start - adminBarHeight &&
          latestKnownScrollY <= end - headerHeight - adminBarHeight
        ) {
          inversed = true;
        }
      });

      if (!inversed) {
        $header.removeClass("headroom--top").addClass("headroom--not-top");
      } else {
        $header.removeClass("headroom--not-top").addClass("headroom--top");
      }
    }

    return {
      init: init,
      update: update
    };
  })();

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

  // MIT license

  (function() {
    var lastTime = 0;
    var vendors = ["ms", "moz", "webkit", "o"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame =
        window[vendors[x] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[vendors[x] + "CancelAnimationFrame"] ||
        window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  })();

  var HandleSubmenusOnTouch = (function() {
    var isInitiated = false;

    function init() {
      if (isInitiated) return;

      // Make sure there are no open menu items
      $(".menu-item-has-children").removeClass("hover");

      // Add a class so we know the items to handle
      $(".menu-item-has-children > a").each(function() {
        $(this).addClass("prevent-one");
      });

      $("a.prevent-one").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this).hasClass("active")) {
          window.location.href = $(this).attr("href");
        }

        $("a.prevent-one").removeClass("active");
        $(this).addClass("active");

        // When a parent menu item is activated,
        // close other menu items on the same level
        $(this)
          .parent()
          .siblings()
          .removeClass("hover");

        // Open the sub menu of this parent item
        $(this)
          .parent()
          .addClass("hover");
      });

      isInitiated = true;
    }

    function release() {
      $("a.prevent-one").unbind();
      isInitiated = false;
    }

    return {
      init: init,
      release: release
    };
  })();

  function getIEversion() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    var edge = ua.indexOf("Edge/");
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    // other browser
    return false;
  }

  /* ====== INTERNAL FUNCTIONS ====== */

  /* --- NICESCROLL --- */

  var $body = $("body"),
    $html = $("html"),
    $window = $(window),
    $document = $(document),
    documentHeight = $document.height(),
    aspectRatio = windowWidth / windowHeight,
    orientation = getOrientation(),
    isTouch = !!(
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    );

  var $target = $(window.location.hash).filter(".article--page");

  if ($target.length) {
    requestAnimationFrame(function() {
      window.scrollTo(0, $target.offset().top - $(".site-header").height());
    });
  }

  function smoothScrollTo(y) {
    window.scroll({
      top: y,
      behavior: "smooth"
    });
  }

  function menuTrigger() {
    $(".js-nav-trigger").on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();

      var $html = $("html");

      if ($html.hasClass("navigation--is-visible")) {
        $html.removeClass("navigation--is-visible");
      } else {
        $html.addClass("navigation--is-visible");

        if ($html.is(".is--ancient-android, .is--winmob, .is--ie")) {
          $(".navigation--main").height(windowHeight);
        }
      }
    });
  }

  /* --- $VIDEOS --- */

  function initVideos() {
    var videos = $("iframe, video");

    // Figure out and save aspect ratio for each video
    videos.each(function() {
      $(this)
        .data("aspectRatio", this.width / this.height)
        // and remove the hard coded width/height
        .removeAttr("height")
        .removeAttr("width");
    });

    // Firefox Opacity Video Hack
    $("iframe").each(function() {
      var url = $(this).attr("src");
      if (!empty(url)) {
        $(this).attr("src", setQueryParameter(url, "wmode", "transparenartt"));
      }
    });
  }

  function resizeVideos() {
    var videos = $("iframe, video");

    videos.each(function() {
      var video = $(this),
        ratio = video.data("aspectRatio"),
        w = video.css("width", "100%").width(),
        h = w / ratio;
      video.height(h);
    });
  }

  /* ====== INTERNAL FUNCTIONS END ====== */

  function init() {
    if (globalDebug) {
      console.group("Init");
    }

    // /* GLOBAL VARS */
    touch = false;

    if (
      typeof isIe !== "undefined" ||
      (!window.ActiveXObject && "ActiveXObject" in window)
    ) {
      $("html").addClass("is--ie");
    }

    if (is_EDGE) {
      $("html").addClass("is--ie-edge");
    }

    //  GET BROWSER DIMENSIONS
    browserSize();

    // /* DETECT PLATFORM */
    platformDetect();

    if (is_android || window.opera) {
      $("html")
        .addClass("android-browser")
        .removeClass("no-android-browser");
    }

    /* ONE TIME EVENT HANDLERS */
    eventHandlersOnce();

    /* INSTANTIATE EVENT HANDLERS */
    eventHandlers();
    updateHeaderPadding();

    $(".navigation--main").on("DOMMouseScroll mousewheel", function(ev) {
      var $this = $(this),
        scrollTop = this.scrollTop,
        scrollHeight = this.scrollHeight,
        height = $this.height(),
        delta =
          ev.type == "DOMMouseScroll"
            ? ev.originalEvent.detail * -40
            : ev.originalEvent.wheelDelta,
        up = delta > 0;

      var prevent = function() {
        ev.stopPropagation();
        ev.preventDefault();
        ev.returnValue = false;
        return false;
      };

      if (!up && -delta > scrollHeight - height - scrollTop) {
        // Scrolling down, but this will take us past the bottom.
        $this.scrollTop(scrollHeight);
        return prevent();
      } else if (up && delta > scrollTop) {
        // Scrolling up, but this will take us past the top.
        $this.scrollTop(0);
        return prevent();
      }
    });

    if (globalDebug) {
      console.groupEnd();
    }
  }

  /* ====== EVENT HANDLERS ====== */
  function heroArrowInit() {
    var $arrow = $(".down-arrow"),
      $hero = $arrow.closest(".article--page");

    if (!$arrow.length || !$hero.length) {
      return;
    }

    $arrow.on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      smoothScrollTo($hero.offset().top);
    });
  }

  function scrollToTopInit() {
    var $button = $(".btn--top");

    $button.on("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      smoothScrollTo(0);
    });
  }

  function eventHandlersOnce() {
    if (globalDebug) {
      console.group("Event Handlers Once");
    }

    menuTrigger();
    heroArrowInit();
    scrollToTopInit();

    if (globalDebug) {
      console.groupEnd();
    }
  }

  function eventHandlers() {
    if (globalDebug) {
      console.group("Event Handlers");
    }

    //Magnific Popup arrows
    $("body")
      .off("click", ".js-arrow-popup-prev", magnificPrev)
      .on("click", ".js-arrow-popup-prev", magnificPrev);
    $("body")
      .off("click", ".js-arrow-popup-next", magnificNext)
      .on("click", ".js-arrow-popup-next", magnificNext);

    var filterHandler;

    if (touch) {
      filterHandler = "click";
    } else {
      filterHandler = "hover";
    }

    if (touch && windowWidth < 900) {
      HandleSubmenusOnTouch.init();
    }

    if (ieMobile) {
      filterHandler = "click";
    }

    $(".categories__menu").on(filterHandler, function(e) {
      e.stopPropagation();

      $(this).toggleClass("active");
    });

    if (globalDebug) {
      console.groupEnd();
    }
  }

  /* --- GLOBAL EVENT HANDLERS --- */

  function magnificPrev(e) {
    if (globalDebug) {
      console.log("Magnific Popup Prev");
    }

    e.preventDefault();
    var magnificPopup = $.magnificPopup.instance;
    magnificPopup.prev();
    return false;
  }

  function magnificNext(e) {
    if (globalDebug) {
      console.log("Magnific Popup Next");
    }

    e.preventDefault();
    var magnificPopup = $.magnificPopup.instance;
    magnificPopup.next();
    return false;
  }

  /* ====== ON DOCUMENT READY ====== */

  $(document).ready(function() {
    if (globalDebug) {
      console.group("OnDocumentReady");
    }

    /* --- INITIALIZE --- */
    init();

    if (globalDebug) {
      console.groupEnd();
    }
  });

  /* ====== ON WINDOW LOAD ====== */

  $(window).load(function() {
    if (globalDebug) {
      console.group("OnWindowLoad");
    }

    StickyHeader.init();

    if (is_mobile_ie) {
      $("html").addClass("mobile-ie");
    }

    // Set textarea from contact page to autoresize
    if ($("textarea").length) {
      $("textarea").autosize();
    }

    magnificPopupInit();
    initVideos();
    resizeVideos();

    updateHeaderPadding();

    loop();

    Rosa.Parallax.init();
    $html.addClass("is--loaded");
  });

  function getOrientation() {
    return windowWidth > windowHeight ? "landscape" : "portrait";
  }

  function updateHeaderPadding() {
    var $header = $(".site-header"),
      headerHeight = $header.outerHeight();

    if (!$header.next().is(".c-hero")) {
      $("#page").css("paddingTop", headerHeight);
    }
  }

  $window.on("resize", function() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  });

  $(window).on("debouncedresize", onResize);

  $(window).on("rellax:restart", function() {
    $(".js-pixslider").each(function(i, obj) {
      var rs = $(obj).data("royalSlider");

      if (typeof rs !== "undefined") {
        rs.updateSliderSize(true);
      }
    });
  });

  function onResize() {
    var neworientation = getOrientation();

    if (neworientation !== orientation) {
      orientation = neworientation;
      $(window).trigger("debouncedorientationchange");
    }

    resizeVideos();

    if (touch && windowWidth < 900) {
      HandleSubmenusOnTouch.init();
    } else {
      HandleSubmenusOnTouch.release();
    }

    requestAnimationFrame(refreshStuff);
  }

  function refreshStuff() {
    $window.trigger("rellax");
  }

  function updateStuff() {
    if (windowWidth >= 900) {
      StickyHeader.update();
    }
  }

  $window.scroll(function() {
    newScrollY =
      (window.pageYOffset || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0);
  });

  function loop() {
    // Avoid calculations if not needed
    if (latestKnownScrollY !== newScrollY) {
      latestKnownScrollY = newScrollY;
      updateStuff();
    }
    requestAnimationFrame(loop);
  }

  if (
    navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) &&
    window.innerHeight != document.documentElement.clientHeight
  ) {
    var fixViewportHeight = function() {
      $("html, body").outerHeight(window.innerHeight);
    };

    window.addEventListener("scroll", fixViewportHeight, false);
    window.addEventListener("orientationchange", fixViewportHeight, false);
    fixViewportHeight();
  }

  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }

    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }

    var edge = ua.indexOf("Edge/");
    if (edge > 0) {
      // IE 12 => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }

    // other browser
    return false;
  }

  // smooth scrolling to anchors
  $(function() {
    var $header = $(".site-header"),
      headerHeight = parseInt($header.outerHeight(), 10),
      $html = $("html");

    $('.site-header a[href*="#"]:not([href="#"])').click(function() {
      var timeout = 0;

      if ($html.hasClass("navigation--is-visible")) {
        $("body").css("overflow", "");
        $html.removeClass("navigation--is-visible");
        timeout = 600;
      }

      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          setTimeout(function() {
            $("html,body").animate(
              {
                scrollTop: target.offset().top - headerHeight
              },
              1000
            );
          }, timeout);
          return false;
        }
      }
    });
  });

  var ieVersion = getIEversion();
  var Rosa = {};

  Rosa.Parallax = new Parallax("[data-rellax]", {
    bleed: 60,
    container: "[data-rellax-container]"
  });

  Rosa.Parallax.disabled = ieVersion && ieVersion < 12;

  // returns the depth of the element "e" relative to element with id=id
  // for this calculation only parents with classname = waypoint are considered
  function getLevelDepth(e, id, waypoint, cnt) {
    cnt = cnt || 0;
    if (e.id.indexOf(id) >= 0) return cnt;
    if ($(e).hasClass(waypoint)) {
      ++cnt;
    }
    return e.parentNode && getLevelDepth(e.parentNode, id, waypoint, cnt);
  }

  // returns the closest element to 'e' that has class "classname"
  function closest(e, classname) {
    if ($(e).hasClass(classname)) {
      return e;
    }
    return e.parentNode && closest(e.parentNode, classname);
  }
})(jQuery, window);
