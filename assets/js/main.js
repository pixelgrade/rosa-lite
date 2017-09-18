(function ($, window, undefined) {

	/* --- DETECT VIEWPORT SIZE --- */

	function browserSize() {
		wh = $(window).height();
		ww = $(window).width();
		dh = $(document).height();
		ar = ww / wh;
	}


	/* --- DETECT PLATFORM --- */

	function platformDetect() {
		$.support.touch = 'ontouchend' in document;
		var navUA = navigator.userAgent.toLowerCase(),
			navPlat = navigator.platform.toLowerCase();

		var isiPhone = navPlat.indexOf("iphone"),
			isiPod = navPlat.indexOf("ipod"),
			isAndroidPhone = navPlat.indexOf("android"),
			safari = (navUA.indexOf('safari') != -1 && navUA.indexOf('chrome') == -1) ? true : false,
			svgSupport = (window.SVGAngle) ? true : false,
			svgSupportAlt = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) ? true : false,
			ff3x = (/gecko/i.test(navUA) && /rv:1.9/i.test(navUA)) ? true : false;

        ieMobile = navigator.userAgent.match(/Windows Phone/i) ? true : false;
		phone = (isiPhone > -1 || isiPod > -1 || isAndroidPhone > -1) ? true : false;
		touch = $.support.touch ? true : false;
		ltie9 = $.support.leadingWhitespace ? false : true;

		var $bod = $('body');

		if (touch) $('html').addClass('touch');
		if (ieMobile) $('html').addClass('is--winmob');
		if (is_android) $('html').addClass('is--ancient-android');
		if (safari) $bod.addClass('safari');
		if (phone) $bod.addClass('phone');
	}
// /* ====== SHARED VARS ====== */

var phone, touch, ltie9, dh, ar, fonts, ieMobile;

var ua = navigator.userAgent;
var winLoc = window.location.toString();

var is_webkit       = ua.match(/webkit/i);
var is_firefox      = ua.match(/gecko/i);
var is_newer_ie     = ua.match(/msie (9|([1-9][0-9]))/i);
var is_older_ie     = ua.match(/msie/i) && !is_newer_ie;
var is_ancient_ie   = ua.match(/msie 6/i);
var is_ie           = is_ancient_ie || is_older_ie || is_newer_ie;
var is_mobile_ie    = navigator.userAgent.indexOf('IEMobile') !== -1;
var is_mobile       = ua.match(/mobile/i);
var is_OSX          = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false;
var iOS 			= getIOSVersion(ua);
var is_EDGE 		= /Edge\/12./i.test(navigator.userAgent);

var latestKnownScrollY = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0),
	newScrollY = - 1,
	ticking = false;

if (is_EDGE) {
	jQuery('body').addClass('is-edge');
}


var nua = navigator.userAgent;
var is_android = ((nua.indexOf('Mozilla/5.0') !== -1 && nua.indexOf('Android ') !== -1 && nua.indexOf('AppleWebKit') !== -1) && nua.indexOf('Chrome') === -1);
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

var useTransform = true;
var use2DTransform = (ua.match(/msie 9/i) || winLoc.match(/transform\=2d/i));
var transform;

// setting up transform prefixes
var prefixes = {
	webkit: 'webkitTransform',
	firefox: 'MozTransform',
	ie: 'msTransform',
	w3c: 'transform'
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

var windowWidth 		= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    windowHeight 		= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

/* --- To enable verbose debug add to Theme Options > Custom Code footer -> globalDebug=true; --- */
var globalDebug = false,
	timestamp,
    gifImages;

/* --- 404 Page --- */
gifImages = [
	"http://i.imgur.com/ShiZM6m.gif",
    "http://i.imgur.com/8ZYNp.gif",
    "http://i.imgur.com/Xb4fq.gif",
    "http://i.imgur.com/UYPLKwN.gif",
    "http://media.tumblr.com/d9e792a91d5391b8a7aa22689d4e2555/tumblr_inline_mwq1hmelce1qmoozl.gif",
    "http://www.teen.com/wp-content/uploads/2013/10/world-without-jennifer-lawrence-gifs-food-uproxx-2.gif"
];

function getGif() {
	return gifImages[Math.floor(Math.random() * gifImages.length)];
}

function changeBackground() {
	$('.error404').css('background-image', 'url(' + getGif() + ')');
}

$(window).on('load', function() {
    if ($('.error404').length) {
        changeBackground();
    }
});

$(window).keydown(function (e) {
	if (e.keyCode == 32) {
		changeBackground();
	}
});

/* --- Cover Animations Init --- */

var CoverAnimation = {
    selector:       '.article__header',
    initialized:    false,
    animated:       false,

    initialize: function () {

        if (is_EDGE) {
            return;
        }

        var that = this;

        $(this.selector).each(function(i, header) {

            var $header         = $(header),
                $headline       = $header.find('.article__headline'),
                timeline        = new TimelineMax({ paused: true }),
                $title          = $headline.find('.headline__primary'),
                $subtitle       = $headline.find('.headline__secondary'),
                $description    = $headline.find('.headline__description'),
                $star           = $headline.find('.star'),
                $lines          = $headline.find('.line'),
                $arrows         = $description.find('.arrow'),
                $hr             = $description.find('hr'),
                headerTop       = $header.offset().top,
                headerHeight    = $header.outerHeight();

            $header.find('.pixcode--separator').width($title.width());

            $description.css({opacity: 1});
            $description = $description.children().not('.pixcode--separator');
            $description.css({opacity: 0});

            // ------ A

            timeline.fromTo($title, 0.72, {'letter-spacing': '1em', 'margin-right': '-0.9em'}, {'letter-spacing': '0.2em', 'margin-right': '-0.1em', ease: Expo.easeOut});
            timeline.fromTo($title, 0.89, {opacity: 0}, {opacity: 1, ease: Expo.easeOut}, '-=0.72');
            timeline.fromTo($title, 1, {'y': 30}, {'y': 0, ease: Expo.easeOut}, '-=0.89');
            timeline.fromTo($subtitle, 0.65, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.65');
            timeline.fromTo($subtitle, 0.9, {y: 30}, {y: 0, ease: Quint.easeOut}, '-=0.65');
            timeline.fromTo($star, 0.15, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.6');
            timeline.fromTo($star, 0.55, {rotation: -270}, {rotation: 0, ease: Back.easeOut}, '-=0.5');
            timeline.fromTo($lines, 0.6, {width: 0}, {width: '42%', opacity: 1, ease: Quint.easeOut}, '-=0.55');
            timeline.fromTo($hr, 0.6, {width: 0}, {width: '100%', opacity: 1, ease: Quint.easeOut}, '-=0.6');
            timeline.fromTo($arrows, 0.2, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.27');
            timeline.fromTo($description, 0.5, {opacity: 0}, {opacity: 1, ease: Quint.easeOut}, '-=0.28');
            timeline.fromTo($description, 0.75, {y: -20}, {y: 0}, '-=0.5');

            // ------ B
            timeline.addLabel("animatedIn");

            // if (i == 0) {
            //     timeline.fromTo($headline, 1.08, {y: 0}, {y: 150, ease: Linear.easeNone});
            //     timeline.fromTo($title, 1.08, {y: 0}, {opacity: 0, y: -60, ease: Quad.easeIn}, '-=1.08');
            // } else {
                timeline.fromTo($title, 1.08, {y: 0}, {opacity: 0, y: -60, ease: Quad.easeIn});
            // }

            timeline.to($description, 1.08, {y: 60, opacity: 0, ease: Quad.easeIn}, '-=1.08');
            timeline.to($subtitle, 1.08, {opacity: 0, y: -90, ease: Quad.easeIn}, '-=1.08');
            timeline.to($lines, 0.86, {width: 0, opacity: 0, ease: Quad.easeIn}, '-=0.94');
            timeline.to($hr, 0.86, {width: 0, opacity: 0, ease: Quad.easeIn}, '-=0.86');
            timeline.to($star, 1, {rotation: 180}, '-=1.08');
            timeline.to($star, 0.11, {opacity: 0}, '-=0.03');
            timeline.to($arrows, 0.14, {opacity: 0}, '-=1.08');

            timeline.addLabel("animatedOut");

            // ------ C

            var animatedInTime      = timeline.getLabelTime("animatedIn"),
                animatedOutTime     = timeline.getLabelTime("animatedOut"),
                start               = headerTop + headerHeight / 2 - wh / 2,
                end                 = start + headerHeight / 2,
                ab, bc;

            if (i == 0) {
                start = headerTop;
                end = start + windowHeight / 2;
            }

            ab = animatedInTime / animatedOutTime;
            bc = 1 - ab;

            if (!that.initialized) {

                timeline.tweenTo("animatedIn", {
                    onComplete: function () {
                        if (Modernizr.touchevents) {
                            $headline.data("animated", true);
                        }
                    }
                });

                if (!Modernizr.touchevents) {
                    timeline.tweenTo("animatedOut", {
                        onComplete: function () {
                            $headline.data("animated", true);
                        },
                        onUpdate: function () {
                            var progress        = (1 / (end - start)) * (latestKnownScrollY - start),
                                partialProgress = progress < 0 ? ab : ab + bc * progress,
                                currentProgress = timeline.progress();

                            if (Math.abs(partialProgress - currentProgress) < 0.01) {
                                $headline.data("animated", true);
                                this.kill();
                            }
                        }
                    });
                }
            }

            $headline.data('tween', {
                timeline:       timeline,
                ab:             ab,
                bc:             bc,
                start:          start,
                end:            end
            });

        });

        that.initialized = true;
        that.update();
    },

    update: function () {

        if (is_EDGE) {
            return;
        }

        var that = this;

        $(this.selector).each(function (i, element) {

            var $headline   = $(element).find('.article__headline'),
                options     = $headline.data('tween'),
                progress    = 0;

            // some sanity check
            // we wouldn't want to divide by 0 - the Universe might come to an end
            if (! empty(options) && (options.end - options.start) !== 0) {

                // progress on the total timeline (ac)
                progress = (1 / (options.end - options.start)) * (latestKnownScrollY - options.start);

                // progress on partial timeline (bc)
                // point B being labeled as "animated"
                var partialProgress = options.ab + options.bc * progress;

                $headline.data('progress', partialProgress);

                if (!$headline.data("animated")) {
                    return;
                }

                if (0 > progress) {
                    partialProgress = options.ab;
                }

                if (1 > partialProgress) {
                    options.timeline.progress(partialProgress);
                    return;
                }

                options.timeline.progress(1);
            }
        });
    }
}
var DownArrow = {
    selector:   '.down-arrow',
    $arrow:     null,
    timeline:   null,
    start:      0,
    end:        0,
    bubble:     false,

    initialize: function () {

        var that = this;

        this.$arrow = $(this.selector);

        if (empty(this.$arrow)) {
            return;
        }

        this.start      = 0;
        this.end        = this.start + 300;
        this.timeline   = new TimelineMax({ paused: true });
        this.$next      = this.$arrow.closest('.article--page');

        if (!empty(this.$next)) {
            this.nextTop    = this.$next.offset().top;
            this.nextHeight = this.$next.outerHeight();
        }


        if (this.$arrow.hasClass('down-arrow--bubble')) {
            this.timeline.to(this.$arrow, .2, {y: 10, opacity: 0, ease: Linear.easeNone, overwrite: "none"});
            this.timeline.to('.blurp--top', .3, {scaleY: 0, ease: Linear.easeNone, overwrite: "none"});
            this.bubble = true;
        } else {
            this.timeline.to(this.$arrow, 1, {y: 100, opacity: 0, ease: Linear.easeNone, overwrite: "none"});
        }

        this.$arrow.on('click', function (e) {
            e.preventDefault();

            if (empty(that.$next)) {
                return;
            }

            if (that.$next.is('.article__header')) {
                smoothScrollTo(that.nextTop - windowHeight/2 + that.nextHeight/2);
            } else {
                smoothScrollTo(that.nextTop - $('.site-header').height());
            }

        });
    },

    update: function () {

        if (empty(this.$arrow) || this.bubble) {
            return;
        }

        if (Modernizr.touchevents && is_OSX) {
            this.timeline.progress(0);
            return;
        }

        setProgress(this.timeline, this.start, this.end);
    }
}
// /* ====== HELPER FUNCTIONS ====== */

//similar to PHP's empty function
function empty(data) {
	if (typeof(data) == 'number' || typeof(data) == 'boolean') {
		return false;
	}
	if (typeof(data) == 'undefined' || data === null) {
		return true;
	}
	if (typeof(data.length) != 'undefined') {
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
	return (el !== false);
}

function mobilecheck() {
	var check = false;
	(function (a) {
		if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

/* --- Set Query Parameter--- */
function setQueryParameter(uri, key, value) {
	var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
	separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}

// http://stackoverflow.com/a/7557433
function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function getIOSVersion(ua) {
	ua = ua || navigator.userAgent;
	return parseFloat(
			('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(ua) || [0,''])[1])
				.replace('undefined', '3_2').replace('_', '.').replace('_', '')
		) || false;
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

/**
 * Generic tree implementation
 *
 * This class represents any node in the tree.
 */
var Node = function( val ) {

	this.val = val;
	this.children = [];
	this.parent = null;

	/**
	 * Sets the parent node of this node.
	 */
	this.setParentNode = function( node ) {
		this.parent = node;
		node.children[node.children.length] = this;
	}

	/**
	 * Gets the parent node of this node.
	 */
	this.getParentNode = function() {
		return this.parent;
	}

	/**
	 * Adds a child node of this node.
	 */
	this.addChild = function( node ) {
		node.parent = this;
		this.children[this.children.length] = node;
	}

	/**
	 * Gets the array of child nodes of this node.
	 */
	this.getChildren = function() {
		return this.children;
	}

	/**
	 * Removes all the children of this node.
	 */
	this.removeChildren = function() {
		var child;
		for ( var i = 0; i < this.children.length; i++ ) {
			child = this.children[i];
			child.parent = null;
		}
		this.children = [];
	}

	/**
	 * Recursively counts the number of all descendants, from children down, and
	 * returns the total number.
	 */
	this.getTotalDescendantCount = function() {
		var count = 0,
			child;
		for ( var i = 0; i < this.children.length; i++ ) {
			child = this.children[i];
			count += child.getTotalDescendantCount();
		}
		return count + this.children.length;
	}
}

/**
 * Protocol Buffer implementation, which extends the functionality of Node
 * while specifically typing the stored value
 */
var PrBufNode = function( id, type, value ) {
	this.val = {
		id: id,
		type: type,
		value: value
	};
	this.children = [];
	this.parent = null;
}

PrBufNode.prototype = new Node();
PrBufNode.prototype.constructor = PrBufNode;

PrBufNode.prototype.id = function() {
	return this.val.id;
}
PrBufNode.prototype.type = function() {
	return this.val.type;
}
PrBufNode.prototype.value = function() {
	return this.val.value;
}

/**
 * Compares the number of descendants with the value specified in the map element.
 * If all the children have not yet been added, we continue adding to this element.
 */
PrBufNode.prototype.findLatestIncompleteNode = function() {

	//if it's a branch (map) node ('m') and has room,
	//or if it's the root (identified by having a null parent), which has no element limit,
	//then return this node
	if ( (
		     (
			     this.val.type === 'm'
		     ) && (
			     this.val.value > this.getTotalDescendantCount()
		     )
	     )
	     || (
		     null === this.parent
	     ) ) {
		return this;
	}
	else {
		return this.parent.findLatestIncompleteNode();
	}
}

/**
 * Parses the input URL 'data' protocol buffer parameter into a tree
 */
PrBufNode.create = function( urlToParse ) {
	var rootNode = null;
	var re = /data=!([^?&]+)/;
	var dataArray = urlToParse.match( re );
	if ( dataArray && dataArray.length >= 1 ) {
		rootNode = new PrBufNode();
		var workingNode = rootNode;
		//we iterate through each of the elements, creating a node for it, and
		//deciding where to place it in the tree
		var elemArray = dataArray[1].split( "!" );
		for ( var i = 0; i < elemArray.length; i ++ ) {
			var elemRe = /^([0-9]+)([a-z])(.+)$/;
			var elemValsArray = elemArray[i].match( elemRe );
			if ( elemValsArray && elemValsArray.length > 3 ) {
				var elemNode = new PrBufNode( elemValsArray[1], elemValsArray[2], elemValsArray[3] );
				workingNode.addChild( elemNode );
				workingNode = elemNode.findLatestIncompleteNode();
			}
		}
	}
	return rootNode;
}


/**
 * Represents a basic waypoint, with latitude and longitude.
 *
 * If both are not specified, the waypoint is considered to be valid
 * but empty waypoint (these can exist in the data parameter, where
 * the coordinates have been specified in the URL path.
 */
var GmdpWaypoint = function( lat, lng, primary ) {
	this.lat = lat;
	this.lng = lng;
	this.primary = primary ? true : false;
}

/**
 * Represents a basic route, comprised of an ordered list of
 * GmdpWaypoint objects.
 */
var GmdpRoute = function() {
	this.route = new Array();
}

/**
 * Pushes a GmdpWaypoint on to the end of this GmdpRoute.
 */
GmdpRoute.prototype.pushWaypoint = function( wpt ) {
	if ( wpt instanceof GmdpWaypoint ) {
		this.route.push( wpt );
	}
}

/**
 * Sets the mode of transportation.
 * If the passed parameter represents one of the integers normally used by Google Maps,
 * it will be interpreted as the relevant transport mode, and set as a string:
 * "car", "bike", "foot", "transit", "flight"
 */
GmdpRoute.prototype.setTransportation = function( transportation ) {
	switch ( transportation ) {
		case '0':
			this.transportation = "car";
			break;
		case '1':
			this.transportation = "bike";
			break;
		case '2':
			this.transportation = "foot";
			break;
		case '3':
			this.transportation = "transit";
			break;
		case '4':
			this.transportation = "flight";
			break;
		default:
			this.transportation = transportation;
			break;
	}
}

/**
 * Returns the mode of transportation (if any) for the route.
 */
GmdpRoute.prototype.getTransportation = function() {
	return this.transportation;
}

GmdpRoute.prototype.setUnit = function( unit ) {
	switch ( unit ) {
		case '0':
			this.unit = "km";
			break;
		case '1':
			this.unit = "miles";
			break;
	}
}

GmdpRoute.prototype.getUnit = function() {
	return this.unit;
}

GmdpRoute.prototype.setRoutePref = function( routePref ) {
	switch ( routePref ) {
		case '0':
		case '1':
			this.routePref = "best route";
			break;
		case '2':
			this.routePref = "fewer transfers";
			break;
		case '3':
			this.routePref = "less walking";
			break;
	}
}

GmdpRoute.prototype.getRoutePref = function() {
	return this.routePref;
}

GmdpRoute.prototype.setArrDepTimeType = function( arrDepTimeType ) {
	switch ( arrDepTimeType ) {
		case '0':
			this.arrDepTimeType = "depart at";
			break;
		case '1':
			this.arrDepTimeType = "arrive by";
			break;
		case '2':
			this.arrDepTimeType = "last available";
			break;
	}
}

GmdpRoute.prototype.getArrDepTimeType = function() {
	return this.arrDepTimeType;
}

GmdpRoute.prototype.addTransitModePref = function( transitModePref ) {
	//there can be multiple preferred transit modes, so we store them in an array
	//we assume there will be no duplicate values, but it probably doesn't matter
	//even if there are
	switch ( transitModePref ) {
		case '0':
			this.transitModePref.push( "bus" );
			break;
		case '1':
			this.transitModePref.push( "subway" );
			break;
		case '2':
			this.transitModePref.push( "train" );
			break;
		case '3':
			this.transitModePref.push( "tram / light rail" );
			break;
	}
}

GmdpRoute.prototype.getTransitModePref = function() {
	return this.transitModePref;
}


/**
 * Returns the list of all waypoints belonging to this route.
 */
GmdpRoute.prototype.getAllWaypoints = function() {
	return this.route;
}


function GmdpException( message ) {
	this.message = message;
	// Use V8's native method if available, otherwise fallback
	if ( "captureStackTrace" in Error ) {
		Error.captureStackTrace( this, GmdpException );
	} else {
		this.stack = (
			new Error()
		).stack;
	}
}

GmdpException.prototype = Object.create( Error.prototype );
GmdpException.prototype.name = "GmdpException";

/**
 * Represents a google maps data parameter, constructed from the passed URL.
 *
 * Utility methods defined below allow the user to easily extract interesting
 * information from the data parameter.
 */
var Gmdp = function( url ) {
	this.prBufRoot = PrBufNode.create( url );
	this.mapType = "map";

	if ( this.prBufRoot == null ) {
		throw new GmdpException( "no parsable data parameter found" );
	}

	//the main top node for routes is 4m; other urls (eg. streetview) feature 3m etc.
	var routeTop = null;
	var streetviewTop = null;
	var rootChildren = this.prBufRoot.getChildren(),
		child;

	for ( var i = 0; i < rootChildren.length; i++ ) {
		child = rootChildren[i];
		if ( child.id() == 3 && child.type() == 'm' ) {
			var mapTypeChildren = child.getChildren();
			if ( mapTypeChildren && mapTypeChildren.length >= 1 ) {
				if ( mapTypeChildren[0].id() == 1 && mapTypeChildren[0].type() == 'e' ) {
					switch ( mapTypeChildren[0].value() ) {
						case '1':
							this.mapType = "streetview";
							streetviewTop = child;
							break;
						case '3':
							this.mapType = "earth";
							break;
					}
				}
			}
		} else if ( child.id() == 4 && child.type() == 'm' ) {
			routeTop = child;
		}
	}
	if ( routeTop ) {
		var directions = null,
			routeChildren = routeTop.getChildren();

		for ( var i = 0; i < routeChildren.length; i++ ) {
			child = routeChildren[i];
			if ( child.id() == 4 && child.type() == 'm' ) {
				directions = child;
			}
		}
		if ( directions ) {
			this.route = new GmdpRoute();
			this.route.arrDepTimeType = "leave now"; //default if no value is specified
			this.route.avoidHighways = false;
			this.route.avoidTolls = false;
			this.route.avoidFerries = false;
			this.route.transitModePref = [];

			var directionsChildren = directions.getChildren();

			for ( var i = 0; i < directionsChildren.length; i++ ) {
				child = directionsChildren[i];
				if ( primaryChild.id() == 1 && primaryChild.type() == 'm' ) {
					if ( primaryChild.value() == 0 ) {
						this.route.pushWaypoint( new GmdpWaypoint( undefined, undefined, true ) );
					}
					else {
						var addedPrimaryWpt = false;
						var wptNodes = primaryChild.getChildren(),
							wptNode;
						for ( var i = 0; i < wptNodes.length; i++ ) {
							wptNode = wptNodes[i];
							if ( wptNode.id() == 2 ) {
								//this is the primary wpt, add coords
								var coordNodes = wptNode.getChildren();
								if ( coordNodes &&
								     coordNodes.length >= 2 &&
								     coordNodes[0].id() == 1 &&
								     coordNodes[0].type() == 'd' &&
								     coordNodes[1].id() == 2 &&
								     coordNodes[1].type() == 'd' ) {
									this.route.pushWaypoint(
										new GmdpWaypoint( coordNodes[1].value(),
											coordNodes[0].value(),
											true ) );
								}
								addedPrimaryWpt = true;
							} else if ( wptNode.id() == 3 ) {
								//this is a secondary (unnamed) wpt
								//
								//but first, if we haven't yet added the primary wpt,
								//then the coordinates are apparently not specified,
								//so we should add an empty wpt
								if ( ! addedPrimaryWpt ) {
									this.route.pushWaypoint( new GmdpWaypoint( undefined, undefined, true ) );
									addedPrimaryWpt = true;
								}

								//now proceed with the secondary wpt itself
								var secondaryWpts = wptNode.getChildren();
								if ( secondaryWpts && secondaryWpts.length > 1 ) {
									var coordNodes = secondaryWpts[0].getChildren();
									if ( coordNodes &&
									     coordNodes.length >= 2 &&
									     coordNodes[0].id() == 1 &&
									     coordNodes[0].type() == 'd' &&
									     coordNodes[1].id() == 2 &&
									     coordNodes[1].type() == 'd' ) {
										this.route.pushWaypoint(
											new GmdpWaypoint( coordNodes[1].value(),
												coordNodes[0].value(),
												false ) );
									}
								}
							}
						}
					}
				} else if ( primaryChild.id() == 2 && primaryChild.type() == 'm' ) {
					var routeOptions = primaryChild.getChildren(),
						routeOption;
					for ( var i = 0; i < routeOptions.length; i++ ) {
						routeOption = routeOptions[i];

						if ( routeOption.id() == 1 && routeOption.type() == 'b' ) {
							this.route.avoidHighways = true;
						}
						else if ( routeOption.id() == 2 && routeOption.type() == 'b' ) {
							this.route.avoidTolls = true;
						}
						else if ( routeOption.id() == 3 && routeOption.type() == 'b' ) {
							this.route.avoidFerries = true;
						}
						else if ( routeOption.id() == 4 && routeOption.type() == 'e' ) {
							this.route.setRoutePref( routeOption.value() );
						}
						else if ( routeOption.id() == 5 && routeOption.type() == 'e' ) {
							this.route.addTransitModePref( routeOption.value() );
						}
						else if ( routeOption.id() == 6 && routeOption.type() == 'e' ) {
							this.route.setArrDepTimeType( routeOption.value() );
						}
						if ( routeOption.id() == 8 && routeOption.type() == 'j' ) {
							this.route.arrDepTime = routeOption.value(); //as a unix timestamp
						}
					}
				} else if ( primaryChild.id() == 3 && primaryChild.type() == 'e' ) {
					this.route.setTransportation( primaryChild.value() );
				} else if ( primaryChild.id() == 4 && primaryChild.type() == 'e' ) {
					this.route.setUnit( primaryChild.value() );
				}
			}
		}
	}
	if ( streetviewTop ) {
		var streetviewChildren = streetviewTop.getChildren(),
			streetviewChild;
		for ( var i = 0; i < streetviewChildren.length; i++ ) {
			streetviewChild = streetviewChildren[i];
			if ( streetviewChild.id() == 3 && streetviewChild.type() == 'm' ) {
				var svInfos = streetviewChild.getChildren(),
					svInfo;
				for ( var i = 0; i < svInfos.length; i++ ) {
					svInfo = svInfos[i];
					if ( svInfo.id() == 2 && svInfo.type() == 'e' ) {
						if ( svInfo.value() == 4 ) {
							//!2e4!3e11 indicates a photosphere, rather than standard streetview
							//but the 3e11 doesn't seem to matter too much (?)
							this.mapType = "photosphere";
						}
					}
					if ( svInfo.id() == 6 && svInfo.type() == 's' ) {
						this.svURL = decodeURIComponent( svInfo.value() );
					}
				}
			}
		}
	}
}

/**
 * Returns the route defined by this data parameter.
 */
Gmdp.prototype.getRoute = function() {
	return this.route;
}

/**
 * Returns the main map type ("map", "earth").
 */
Gmdp.prototype.getMapType = function() {
	return this.mapType;
}

/**
 * Returns the main map type ("map", "earth").
 */
Gmdp.prototype.getStreetviewURL = function() {
	return this.svURL;
}
/* --- Magnific Popup Initialization --- */

function magnificPopupInit() {
	if ( globalDebug ) {
		console.log( "Magnific Popup - Init" );
	}

	$( '.js-post-gallery' ).each( function () { // the containers for all your galleries should have the class gallery
		$( this ).magnificPopup( {
			tPrev: objectl10n.tPrev,
			tNext: objectl10n.tNext,
			tCounter: objectl10n.tCounter,
			delegate: 'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]', // the container for each your gallery items
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			closeOnBgClick: false,
			fixedContentPos: true,
			removalDelay: 500,
			mainClass: 'mfp-fade',
			image: {
				markup: '<div class="mfp-figure">' +
				        '<div class="mfp-close"></div>' +
				        '<div class="mfp-img"></div>' +
				        '<div class="mfp-bottom-bar">' +
				        '<div class="mfp-title"></div>' +
				        '<div class="mfp-counter"></div>' +
				        '</div>' +
				        '</div>',
				titleSrc: function ( item ) {
					var output = '';
					if ( typeof item.el.attr( 'data-alt' ) !== "undefined" && item.el.attr( 'data-alt' ) !== "" ) {
						output += '<small>' + item.el.attr( 'data-alt' ) + '</small>';
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
				elementParse: function ( item ) {

					if ( this.currItem != undefined ) {
						item = this.currItem;
					}

					var output = '';
					if ( typeof item.el.attr( 'data-alt' ) !== "undefined" && item.el.attr( 'data-alt' ) !== "" ) {
						output += '<small>' + item.el.attr( 'data-alt' ) + '</small>';
					}

					$( '.mfp-title' ).html( output );
				},
				change: function ( item ) {
					var output = '';
					if ( typeof item.el.attr( 'data-alt' ) !== "undefined" && item.el.attr( 'data-alt' ) !== "" ) {
						output += '<small>' + item.el.attr( 'data-alt' ) + '</small>';
					}

					$( '.mfp-title' ).html( output );
				},
				beforeClose: function () {
					$( '.mfp-arrow, .mfp-close' ).hide();
				}
			}
		} );
	} );
}

var GMap = function() {
	this.maps = [];
	this.pinIconMarkup = $( '.js-map-pin' ).html();
};

GMap.prototype.init = function( $container ) {
	var that = this;

	$container = typeof $container !== "undefined" ? $container : $( 'body' );

	$container.find( '.c-hero__map' ).each( function( i, obj ) {
		var $map = $( obj );
		that.maps.push( $map );
		that.initializeMap( $map );
	} );
};

GMap.prototype.initializeMap = function( $map ) {
	var that = this;

	if ( typeof google !== 'undefined' ) {

		var url = $map.data( 'url' ),
			style = typeof $map.data( 'customstyle' ) !== "undefined" ? "rosa" : google.maps.MapTypeId.ROADMAP,
			markerContent = $map.data( 'markercontent' ),
			coordinates,
			pins = [];

		if ( typeof url === "string" ) {

			coordinates = that.getCenterFrom( url );
			pins = that.getPinsFrom( url, markerContent );

			// if there are no markers encoded in the url
			// place a pin the center of the map
			if ( pins.length === 0 && typeof coordinates !== "undefined" ) {
				pins.push( {
					position: [coordinates.latitude, coordinates.longitude],
					content: that.getPinMarkup( markerContent ),
					x: 0,
					y: 4
				} );
			}
		} else {
			var pinsData = $map.data( 'pins' );

			$.each( pinsData, function( label, url ) {
				coordinates = that.getCenterFrom( url );

				pins.push( {
					position: [coordinates['latitude'], coordinates['longitude']],
					content: that.getPinMarkup( label, 'pin' ),
					x: 0,
					y: 4
				} );

			} );
		}

		$map
		.gmap3( {
			center: [coordinates.latitude, coordinates.longitude],
			zoom: parseInt( coordinates.zoom ),
			mapTypeId: style,
			scrollwheel: false,
			mapTypeControl: false,
			zoomControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			scaleControl: true,
			streetViewControl: true,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			fullscreenControl: true
		} )
		.styledmaptype( "rosa", that.customStyle, {name: "Rosa"} )
		.overlay( pins );

		if ( pins.length > 1 ) {
			$map.gmap3().fit();
		}

	}

};

GMap.prototype.getCenterFrom = function( url ) {
	var split = url.split( '@' )[1].split( '/' )[0].split( 'z' )[0].split( ',' ),
		coordinates = {};

	if ( 2 === split.length || 3 === split.length ) {
		coordinates.latitude = parseFloat( split[0] );
		coordinates.longitude = parseFloat( split[1] );

		if ( 3 === split.length ) {
			coordinates.zoom = parseFloat( split[2] );
		}
		return coordinates;
	}

	return false;
};

GMap.prototype.getPinsFrom = function( url, markerContent ) {
	var that = this,
		coordinates = [],
		pins = [];

	function parseChildren( obj ) {
		var coord = [];
		$.each( obj.getChildren(), function( i, child ) {
			if ( child.type() == "d" ) {
				coord.push( child.value() );
			}
			parseChildren( child );
		} );

		if ( coord.length === 2 ) {
			coordinates.push( coord );
		}
	}

	if ( url.indexOf( 'data=' ) > - 1 ) {
		parseChildren( new Gmdp( url ).prBufRoot );
	}

	$.each( coordinates, function( i, coord ) {
		pins.push( {
			position: [coord[0], coord[1]],
			content: that.getPinMarkup( markerContent, 'tooltip' ),
			x: 0,
			y: 4
		} );
	} );

	return pins;
};

GMap.prototype.getPinMarkup = function( content, type ) {
	type = type || 'tooltip';

	if ( type === 'tooltip' ) {
		return '<div class="map-tooltip"><div class="map-tooltip__content">' + content + '</div></div>';
	} else {
		return '<div class="map-pin"><div class="map-pin__text">' + content + '</div>' + this.pinIconMarkup + '</div>'
	}
};

GMap.prototype.customStyle = [
	{
		"stylers": [
			{"saturation": - 100},
			{"gamma": 3.00},
			{"visibility": "simplified"}
		]
	}, {
		"featureType": "road",
		"stylers": [
			{"hue": $( "body" ).data( "color" ) ? $( "body" ).data( "color" ) : "#ffaa00"},
			{"saturation": 48},
			{"gamma": 0.40},
			{"visibility": "on"}
		]
	}, {
		"featureType": "administrative",
		"stylers": [
			{"saturation": - 30},
			{"gamma": 0.6},
			{"visibility": "on"}
		]
	}, {
		"featureType": "administrative.neighborhood",
		"stylers": [
			{"visibility": "off"}
		]
	}
];

/* --- Royal Slider Init --- */

function royalSliderInit( $container ) {
	if ( globalDebug ) {
		console.log( "Royal Slider - Init" );
	}

	$container = typeof $container !== 'undefined' ? $container : $( 'body' );

	// Transform Wordpress Galleries to Sliders
	$container.find( '.wp-gallery' ).each( function () {
		sliderMarkupGallery( $( this ) );
	} );

	// Find and initialize each slider
	$container.find( '.js-pixslider' ).each( function () {
		var $slider = $( this );
		$slider.imagesLoaded( function () {
			sliderInit( $slider );
		} );
	} );

}

/*
 * Slider Initialization
 */
function sliderInit( $slider ) {

	$slider.find( 'img' ).removeClass( 'invisible' );

	var $children = $( this ).children(),
		rs_arrows = typeof $slider.data( 'arrows' ) !== "undefined",
		rs_bullets = typeof $slider.data( 'bullets' ) !== "undefined" ? "bullets" : "none",
		rs_autoheight = typeof $slider.data( 'autoheight' ) !== "undefined",
		rs_autoScaleSlider = false,
		rs_autoScaleSliderWidth = $slider.data( 'autoscalesliderwidth' ),
		rs_autoScaleSliderHeight = $slider.data( 'autoscalesliderheight' ),
		rs_customArrows = typeof $slider.data( 'customarrows' ) !== "undefined",
		rs_slidesSpacing = typeof $slider.data( 'slidesspacing' ) !== "undefined" ? parseInt( $slider.data( 'slidesspacing' ) ) : 0,
		rs_keyboardNav = typeof $slider.data( 'fullscreen' ) !== "undefined",
		rs_imageScale = $slider.data( 'imagescale' ),
		rs_visibleNearby = typeof $slider.data( 'visiblenearby' ) !== "undefined",
		rs_imageAlignCenter = typeof $slider.data( 'imagealigncenter' ) !== "undefined",
		rs_transition = typeof $slider.data( 'slidertransition' ) !== "undefined" && $slider.data( 'slidertransition' ) !== '' ? $slider.data( 'slidertransition' ) : 'move',
		rs_autoPlay = typeof $slider.data( 'sliderautoplay' ) !== "undefined",
		rs_delay = typeof $slider.data( 'sliderdelay' ) !== "undefined" && $slider.data( 'sliderdelay' ) !== '' ? $slider.data( 'sliderdelay' ) : '1000',
		rs_drag = true,
		rs_globalCaption = typeof $slider.data( 'showcaptions' ) !== "undefined",
		is_headerSlider = $slider.hasClass( 'header--slideshow' ),
		hoverArrows = typeof $slider.data( 'hoverarrows' ) !== "undefined";

	// Single slide case
	if ( $children.length === 1 ) {
		rs_arrows = false;
		rs_bullets = 'none';
		rs_customArrows = false;
		rs_keyboardNav = false;
		rs_drag = false;
		rs_transition = 'fade';
	}
	// make sure default arrows won't appear if customArrows is set
	if ( rs_customArrows ) {
		rs_arrows = false;
	}

	//the main params for Royal Slider
	var royalSliderParams = {
		autoHeight: rs_autoheight,
		autoScaleSlider: rs_autoScaleSlider,
		loop: true,
		autoScaleSliderWidth: rs_autoScaleSliderWidth,
		autoScaleSliderHeight: rs_autoScaleSliderHeight,
		imageScaleMode: rs_imageScale,
		imageAlignCenter: rs_imageAlignCenter,
		slidesSpacing: rs_slidesSpacing,
		arrowsNav: rs_arrows,
		controlNavigation: rs_bullets,
		keyboardNavEnabled: rs_keyboardNav,
		arrowsNavAutoHide: false,
		sliderDrag: rs_drag,
		transitionType: rs_transition,
		autoPlay: {
			enabled: rs_autoPlay,
			stopAtAction: true,
			pauseOnHover: true,
			delay: rs_delay
		},
		globalCaption: rs_globalCaption,
		numImagesToPreload: 4
	};

	if ( rs_visibleNearby ) {
		royalSliderParams['visibleNearby'] = {
			enabled: true,
			//centerArea: 0.8,
			center: true,
			breakpoint: 0,
			//breakpointCenterArea: 0.64,
			navigateByCenterClick: false
		}
	}


	// lets fire it up

	$slider.royalSlider( royalSliderParams );
	$slider.addClass( 'slider--loaded' );

	var royalSlider = $slider.data( 'royalSlider' );
	var slidesNumber = royalSlider.numSlides;

	royalSlider.ev.on( 'rsAfterSlideChange rsAfterContentSet', function ( event ) {
		$( window ).trigger( 'rellax' );
	});

	// create the markup for the customArrows
	if ( royalSlider && rs_customArrows ) {

		var classes = 'slider__custom-arrows';

		if ( is_headerSlider ) {
			classes = 'slider-arrows-header';
		}

		if ( hoverArrows && ! Modernizr.touchevents ) {
			classes += ' arrows--hover ';
		}

		$slider.find( '.slider__custom-arrows' ).off( 'click' ).remove();

		var $gallery_control = $(
			'<div class="' + classes + '">' +
			'<div class="rsArrow rsArrowLeft js-arrow-left" style="display: block;"><div class="rsArrowIcn"></div></div>' +
			'<div class="rsArrow rsArrowRight js-arrow-right" style="display: block;"><div class="rsArrowIcn"></div></div>' +
			'</div>'
		);

		if ( $slider.data( 'customarrows' ) === "left" ) {
			$gallery_control.addClass( 'gallery-control--left' );
		}

		$gallery_control.insertBefore( $slider );

		$gallery_control.on( 'click', '.js-arrow-left', function ( event ) {
			event.preventDefault();
			royalSlider.prev();
		} );

		$gallery_control.on( 'click', '.js-arrow-right', function ( event ) {
			event.preventDefault();
			royalSlider.next();
		} );
	}

	if ( hoverArrows && ! Modernizr.touchevents ) {
		hoverArrow( $gallery_control.find( '.rsArrow' ) );

	}

	if ( slidesNumber === 1 ) {
		$slider.addClass( 'single-slide' );
	}

	$slider.addClass( 'slider--loaded' );
}

/*
 * Wordpress Galleries to Sliders
 * Create the markup for the slider from the gallery shortcode
 * take all the images and insert them in the .gallery <div>
 */
function sliderMarkupGallery( $gallery ) {
	var $old_gallery = $gallery,
		gallery_data = $gallery.data(),
		$images = $old_gallery.find( 'img' ),
		$new_gallery = $( '<div class="pixslider js-pixslider">' );

	$images.prependTo( $new_gallery ).addClass( 'rsImg' );

	//add the data attributes
	$.each( gallery_data, function ( key, value ) {
		$new_gallery.attr( 'data-' + key, value );
	} )

	$old_gallery.replaceWith( $new_gallery );
}

/*
 Get slider arrows to hover, following the cursor
 */

function hoverArrow( $arrow ) {

	$arrow.each(function(i, obj) {

		var $arrow = $(obj),
			update = false,
			offset = $arrow.offset(),
			$icon = $arrow.find( '.rsArrowIcn' ),
			mouseX,
			mouseY;

		$arrow.mouseenter( function ( e ) {
			offset = $arrow.offset();
			$( this ).addClass( 'visible' );
			update = true;
		});

		$arrow.mousemove( function ( e ) {
			mouseX = e.pageX - offset.left;
			mouseY = e.pageY - offset.top;
		});

		$arrow.mouseleave( function ( e ) {
			$( this ).removeClass( 'visible' );
			update = false;
		});

		function loop() {
			if ( update ) {
				TweenMax.to( $icon, 0, {x: mouseX, y: mouseY, z: 0.01, force3D: true} );
			}
			requestAnimationFrame(loop);
		}

		loop();
	});
}
var ScrollToTop = (function() {

    var start = 0,
        end = 0,
        timeline = null,
        played = false,
        footerHeight;

    function initialize() {

        var $button         = $('.btn--top'),
            offsetTop       = 0,
            start           = offsetTop - windowHeight + footerHeight * 3 / 4;

        footerHeight = $('.copyright-area').outerHeight();

        if (empty($button)) {
            return;
        }

        offsetTop = $button.offset().top;
        $button.data('offsetTop', offsetTop);

        this.timeline   = new TimelineMax({ paused: true });

        this.timeline.fromTo('.blurp--bottom', .6, {
            y:          40,
            scale:      0.5
        }, {
            y:          0,
            scale:      1,
            ease:       Power3.easeOut,
            force3D:    true

        });

        this.timeline.fromTo($('.btn__arrow--top'), .4, {
            y: 15,
            opacity: 0
        }, {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: Back.easeOut
        }, '-=0.1');

        this.timeline.fromTo($('.btn__arrow--bottom'),.4, {
            y: 15,
            opacity: 0
        }, {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: Back.easeOut
        }, '-=0.25');

        $button.on('click', function (e) {
            e.preventDefault();
            smoothScrollTo(0);
        });

        this.update();
    }

    function update() {

        var $button         = $('.btn--top'),
            offsetTop       = $button.data('offsetTop'),
            start           = offsetTop - windowHeight + footerHeight * 3 / 4,
            end             = start + windowHeight;

        if (empty($button) || this.timeline == null) {
            return;
        }

        if (Modernizr.touchevents && is_OSX) {
            this.timeline.progress(1);
            return;
        }

        if (start < latestKnownScrollY) {
            if (!this.played) {
                this.timeline.play();
                this.played = true;
            }
        } else {
            if (this.played) {
                this.timeline.reverse();
                this.played = false;
            }
        }
    }

    return {
        initialize: initialize,
        update: update
    }

})();

/* --- Sticky Header Init --- */

var StickyHeader = (function() {

    var headerSelector      = '.site-header',
        $header             = $(headerSelector),
        headerHeight,
        $headers,
        offset;

    function init() {
        headerHeight = $header.outerHeight(),
        $headers = $('.article__header'),
        offset = $headers.length ? $headers.first().outerHeight() : 0;
    }

    function update() {
        if ( latestKnownScrollY > offset - headerHeight - 1) {
            $header.removeClass('headroom--top').addClass('headroom--not-top');
        } else {
            $header.removeClass('headroom--not-top').addClass('headroom--top');
        }
    }

    return {
        init: init,
        update: update
    }
})();

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

//here we change the link of the Edit button in the Admin Bar
//to make sure it reflects the current page
function adminBarEditFix(id) {
	//get the admin ajax url and clean it
	var baseURL = ajaxurl.replace('admin-ajax.php', 'post.php');

	$('#wp-admin-bar-edit a').attr('href', baseURL + '?post=' + id + '&action=edit');
}

/* --- Load AddThis Async --- */
function loadAddThisScript() {
	if (window.addthis) {
		if (globalDebug) {
			console.log("AddThis Load Script");
		}
		// Listen for the ready event
		addthis.addEventListener('addthis.ready', addthisReady);
		addthis.init();
	}
}

/* --- AddThis On Ready - The API is fully loaded --- */
//only fire this the first time we load the AddThis API - even when using ajax
function addthisReady() {
	if (globalDebug) {
		console.log("AddThis Ready");
	}
	addThisInit();
}

/* --- AddThis Init --- */
function addThisInit() {
	if (window.addthis) {
		if (globalDebug) {
			console.log("AddThis Toolbox INIT");
		}

		addthis.toolbox('.addthis_toolbox');
	}
}

var HandleSubmenusOnTouch = (function() {

	var isInitiated = false;

	function init() {
		if( isInitiated ) return;

		// Make sure there are no open menu items
		$('.menu-item-has-children').removeClass('hover');

		// Add a class so we know the items to handle
		$('.menu-item-has-children > a').each(function () {
			$(this).addClass('prevent-one');
		});

		$('a.prevent-one').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();

			if( $(this).hasClass('active') ) {
				window.location.href = $(this).attr('href');
			}

			$('a.prevent-one').removeClass('active');
			$(this).addClass('active');

			// When a parent menu item is activated,
			// close other menu items on the same level
			$(this).parent().siblings().removeClass('hover');

			// Open the sub menu of this parent item
			$(this).parent().addClass('hover');
		});

		isInitiated = true;
	}

	function release() {
		$('a.prevent-one').unbind();
		isInitiated = false;
	}

	return {
		init: init,
		release: release
	}
}());

/* ====== INTERNAL FUNCTIONS ====== */

/* --- NICESCROLL --- */

var $body = $( 'body' ),
	$html = $( 'html' ),
	$window = $( window ),
	$document = $( document ),
	documentHeight = $document.height(),
	aspectRatio = windowWidth / windowHeight,
	orientation = getOrientation(),
	isTouch = ! ! ( ( "ontouchstart" in window ) || window.DocumentTouch && document instanceof DocumentTouch );

var $target = $( window.location.hash ).filter( '.article--page' );

if ( $target.length ) {
	requestAnimationFrame( function() {
		window.scrollTo( 0, $target.offset().top - $( '.site-header' ).height() );
	} );
}

function niceScrollInit() {
	if ( globalDebug ) {
		console.log( "NiceScroll Init" );
	}

	var smoothScroll = $( 'body' ).data( 'smoothscrolling' ) !== undefined,
		root = document.documentElement;

	if ( smoothScroll && ! is_EDGE && ! Modernizr.touchevents && ! is_mobile_ie && ! is_OSX ) {

		var $window = $( window );		// Window object

		$window.on( "mousewheel DOMMouseScroll", function( event ) {

			var scrollTo,
				scrollDistance = 400,
				delta;

			if ( event.type == 'mousewheel' ) {
				delta = event.originalEvent.wheelDelta / 120;
			}
			else if ( event.type == 'DOMMouseScroll' ) {
				delta = - event.originalEvent.detail / 3;
			}

			scrollTo = latestKnownScrollY - delta * scrollDistance;

			if ( scrollTo ) {

				event.preventDefault();

				TweenMax.to( $window, .6, {
					scrollTo: {
						y: scrollTo,
						autoKill: true
					},
					ease: Power1.easeOut,	// For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
					autoKill: true,
					overwrite: 5
				} );

			}

		} );

	}

}


function smoothScrollTo( y, speed ) {

	speed = typeof speed === "undefined" ? 1 : speed;

	var distance = Math.abs( latestKnownScrollY - y ),
		time = speed * distance / 2000;

	TweenMax.to( $( window ), time, {scrollTo: {y: y, autoKill: false, ease: Quint.easeInOut}} );
}


function menuTrigger() {

	$( '.js-nav-trigger' ).on( 'click', function( e ) {

		e.preventDefault();
		e.stopPropagation();

		var $html = $( 'html' );

		if ( $html.hasClass( 'navigation--is-visible' ) ) {
			$html.removeClass( 'navigation--is-visible' );
		} else {
			$html.addClass( 'navigation--is-visible' );

			if ( $html.is( '.is--ancient-android, .is--winmob, .is--ie' ) ) {
				$( '.navigation--main' ).height( windowHeight );
			}
		}
	} );
}


/* --- $VIDEOS --- */

function initVideos() {

	var videos = $( 'iframe, video' );

	// Figure out and save aspect ratio for each video
	videos.each( function() {
		$( this ).data( 'aspectRatio', this.width / this.height )
		         // and remove the hard coded width/height
		         .removeAttr( 'height' )
		         .removeAttr( 'width' );
	} );

	// Firefox Opacity Video Hack
	$( 'iframe' ).each( function() {
		var url = $( this ).attr( "src" );
		if ( ! empty( url ) ) {
			$( this ).attr( "src", setQueryParameter( url, "wmode", "transparenartt" ) );
		}
	} );
}


function resizeVideos() {

	var videos = $( 'iframe, video' );

	videos.each( function() {
		var video = $( this ),
			ratio = video.data( 'aspectRatio' ),
			w = video.css( 'width', '100%' ).width(),
			h = w / ratio;
		video.height( h );
	} );
}


/* ====== INTERNAL FUNCTIONS END ====== */

function init() {
	if ( globalDebug ) {
		console.group( "Init" );
	}

	// /* GLOBAL VARS */
	touch = false;

	if ( typeof ( isIe ) !== 'undefined' || ( ! ( window.ActiveXObject ) && "ActiveXObject" in window ) ) {
		$( 'html' ).addClass( 'is--ie' );
	}

	if ( is_EDGE ) {
		$( 'html' ).addClass( 'is--ie-edge' );
	}

	//  GET BROWSER DIMENSIONS
	browserSize();

	// /* DETECT PLATFORM */
	platformDetect();

	loadAddThisScript();

	if ( is_android || window.opera ) {
		$( 'html' ).addClass( 'android-browser' ).removeClass( 'no-android-browser' );
	}

	/* ONE TIME EVENT HANDLERS */
	eventHandlersOnce();

	/* INSTANTIATE EVENT HANDLERS */
	eventHandlers();
	updateHeaderPadding();

//	move waves in siblings so they keep up with the parallax
//	var $waves = jQuery( '.border-waves' ).not( '.site-footer' );
//	$waves.removeClass( 'border-waves' );
//
//	$waves.each( function( i, obj ) {
//		var $wave = $( obj );
//		$wave.prevAll( '.article__header' ).first().find( '.article__parallax' ).addClass( 'border-waves-top' );
//		$wave.nextAll( '.article__header' ).first().find( '.article__parallax' ).addClass( 'border-waves-bottom' );
//		$wave.next( '.site-footer' ).addClass( 'border-waves-bottom' );
//	} );
//
//	$( '.site-footer.border-waves' ).prevAll( 'article__header' ).first().find( '.article__parallax' ).addClass( 'border-waves-top border-waves-top--dark' );


	$( '.navigation--main' ).on( 'DOMMouseScroll mousewheel', function( ev ) {
		var $this = $( this ),
			scrollTop = this.scrollTop,
			scrollHeight = this.scrollHeight,
			height = $this.height(),
			delta = (
				ev.type == 'DOMMouseScroll' ?
				ev.originalEvent.detail * - 40 :
					ev.originalEvent.wheelDelta
			),
			up = delta > 0;

		var prevent = function() {
			ev.stopPropagation();
			ev.preventDefault();
			ev.returnValue = false;
			return false;
		};

		if ( ! up && - delta > scrollHeight - height - scrollTop ) {
			// Scrolling down, but this will take us past the bottom.
			$this.scrollTop( scrollHeight );
			return prevent();
		} else if ( up && delta > scrollTop ) {
			// Scrolling up, but this will take us past the top.
			$this.scrollTop( 0 );
			return prevent();
		}
	} );

	if ( globalDebug ) {
		console.groupEnd();
	}
}

/* ====== EVENT HANDLERS ====== */

function eventHandlersOnce() {
	if ( globalDebug ) {
		console.group( "Event Handlers Once" );
	}

	menuTrigger();

	if ( globalDebug ) {
		console.groupEnd();
	}
}

function eventHandlers() {
	if ( globalDebug ) {
		console.group( "Event Handlers" );
	}


	//Magnific Popup arrows
	$( 'body' ).off( 'click', '.js-arrow-popup-prev', magnificPrev ).on( 'click', '.js-arrow-popup-prev', magnificPrev );
	$( 'body' ).off( 'click', '.js-arrow-popup-next', magnificNext ).on( 'click', '.js-arrow-popup-next', magnificNext );

	$( document ).on( 'spam.wpcf7 invalid.wpcf7 mailsent.wpcf7 mailfailed.wpcf7', function() {
		setTimeout( function() {
			CoverAnimation.initialize();
		}, 300 );
	} );

	var filterHandler;

	if ( touch ) {
		filterHandler = 'click';
	} else {
		filterHandler = 'hover';
	}

	if ( touch && windowWidth < 900 ) {
		HandleSubmenusOnTouch.init();
	}

	if ( ieMobile ) {
		filterHandler = 'click';
	}

	$( '.pix-dropdown' ).on( filterHandler, function( e ) {
		e.stopPropagation();

		$( this ).toggleClass( 'active' );
	} );

	if ( globalDebug ) {
		console.groupEnd();
	}
}


/* --- GLOBAL EVENT HANDLERS --- */

function magnificPrev( e ) {
	if ( globalDebug ) {
		console.log( "Magnific Popup Prev" );
	}

	e.preventDefault();
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.prev();
	return false;
}

function magnificNext( e ) {
	if ( globalDebug ) {
		console.log( "Magnific Popup Next" );
	}

	e.preventDefault();
	var magnificPopup = $.magnificPopup.instance;
	magnificPopup.next();
	return false;
}


// $(window).bind('beforeunload', function(event) {
// 	if (globalDebug) {console.log("ON BEFORE UNLOAD");}

// 	event.stopPropagation();

// 	animateBlog('out');
// });


/* ====== ON DOCUMENT READY ====== */

$( document ).ready( function() {

	if ( globalDebug ) {
		console.group( "OnDocumentReady" );
	}

	/* --- INITIALIZE --- */
	init();

	if ( globalDebug ) {
		console.groupEnd();
	}
} );


/* ====== ON WINDOW LOAD ====== */

$( window ).load( function() {

	if ( globalDebug ) {
		console.group( "OnWindowLoad" );
	}

	StickyHeader.init();

	if ( is_mobile_ie ) {
		$( "html" ).addClass( "mobile-ie" );
	}

	//Set textarea from contact page to autoresize
	if ( $( "textarea" ).length ) {
		$( "textarea" ).autosize();
	}

	if ( ! $( 'html' ).is( '.ie9, .lt-ie9' ) ) {
		setTimeout( function() {
			CoverAnimation.initialize();
		}, 600 );
	} else {
		setTimeout( function() {
			CoverAnimation.initialize();
		}, 400 );
	}

	niceScrollInit();

	magnificPopupInit();
	initVideos();
	resizeVideos();

	var Map = new GMap();
	Map.init();

	if ( ! empty( $( '#date-otreservations' ) ) ) {
		var dateFormat = $( '#date-otreservations' ).closest( '.otw-wrapper' ).children( '.txtDateFormat' ).attr( 'value' ).toUpperCase();

		// Pikaday
		var picker = new Pikaday( {
			field: document.getElementById( 'date-otreservations' ),
			format: dateFormat,
			minDate: moment().toDate(),
			defaultDate: moment().toDate(),
			setDefaultDate: true
		} );
	}

	$( '.pixcode--tabs' ).organicTabs();
	DownArrow.initialize();

	setTimeout( function() {
		ScrollToTop.initialize();
	}, 60 );

	royalSliderInit();
	updateHeaderPadding();

	loop();

	var $bulletedSections = $('[data-bully]');

	if ( $bulletedSections.length > 1 ) {

		$bulletedSections.bully();

		$('.c-bully__bullet').each(function (i, obj) {

			var stagger = i * 400,
				$obj    = $(obj);

			setTimeout(function () {
				$obj.addClass('c-bully__bullet--pop');
			}, stagger);
		});
	}

	$html.addClass( 'is--loaded' );
} );

function getOrientation() {
	return windowWidth > windowHeight ? "landscape" : "portrait";
}

function updateHeaderPadding() {
	var $header = $( '.site-header' ),
		headerHeight = $header.outerHeight();

	if ( ! $header.next().is( '.c-hero' ) ) {
		$('#page').css('paddingTop', headerHeight);
	}
}

$window.on( 'resize', function() {
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
} );

$( window ).on( "debouncedresize", onResize );

$( window ).on( "rellax:restart", function() {
	$( '.js-pixslider' ).each(function(i, obj) {
		var rs = $(obj).data('royalSlider');

		if (typeof rs !== "undefined") {
			rs.updateSliderSize(true);
		}
	});
});

function onResize() {
	var neworientation = getOrientation();

	if ( neworientation !== orientation ) {
		orientation = neworientation;
		$( window ).trigger( "debouncedorientationchange" );
	}

	resizeVideos();

	if ( touch && windowWidth < 900 ) {
		HandleSubmenusOnTouch.init();
	} else {
		HandleSubmenusOnTouch.release();
	}

	requestAnimationFrame( refreshStuff );
}

function refreshStuff() {
	CoverAnimation.initialize();
	ScrollToTop.initialize();
	$window.trigger( 'rellax' );
}


function updateStuff() {
	ScrollToTop.update();
	DownArrow.update();
	CoverAnimation.update();

	if ( windowWidth >= 900 ) {
		StickyHeader.update();
	}
}

$( window ).on( "organicTabsChange", function() {
	onResize();
	refreshStuff();
	$window.trigger( 'rellax' );
} );

$window.scroll( function() {
	newScrollY = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
} );

function loop() {
	// Avoid calculations if not needed
	if ( latestKnownScrollY !== newScrollY ) {
		latestKnownScrollY = newScrollY;
		updateStuff();
	}
	requestAnimationFrame( loop );
}

if ( navigator.userAgent.match( /iPad;.*CPU.*OS 7_\d/i ) && window.innerHeight != document.documentElement.clientHeight ) {

	var fixViewportHeight = function() {
		$( 'html, body' ).outerHeight( window.innerHeight );
	};

	window.addEventListener( "scroll", fixViewportHeight, false );
	window.addEventListener( "orientationchange", fixViewportHeight, false );
	fixViewportHeight();
}

function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf( 'MSIE ' );
	if ( msie > 0 ) {
		// IE 10 or older => return version number
		return parseInt( ua.substring( msie + 5, ua.indexOf( '.', msie ) ), 10 );
	}

	var trident = ua.indexOf( 'Trident/' );
	if ( trident > 0 ) {
		// IE 11 => return version number
		var rv = ua.indexOf( 'rv:' );
		return parseInt( ua.substring( rv + 3, ua.indexOf( '.', rv ) ), 10 );
	}

	var edge = ua.indexOf( 'Edge/' );
	if ( edge > 0 ) {
		// IE 12 => return version number
		return parseInt( ua.substring( edge + 5, ua.indexOf( '.', edge ) ), 10 );
	}

	// other browser
	return false;
}


// smooth scrolling to anchors
$( function() {

	var $header = $( '.site-header' ),
		headerHeight = parseInt( $header.outerHeight(), 10 ),
		$html = $( 'html' );

	$( '.site-header a[href*="#"]:not([href="#"])' ).click( function() {

		var timeout = 0;

		if ( $html.hasClass( 'navigation--is-visible' ) ) {
			$( 'body' ).css( 'overflow', '' );
			$html.removeClass( 'navigation--is-visible' );
			timeout = 600;
		}


		if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
			var target = $( this.hash );
			target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
			if ( target.length ) {
				setTimeout( function() {
					$( 'html,body' ).animate( {
						scrollTop: target.offset().top - headerHeight
					}, 1000 );
				}, timeout );
				return false;
			}
		}

	} );
} );

$( "[data-rellax]" ).rellax();
$.fn.rellax.defaults.bleed = 60;
$window.trigger( 'rellax' );
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

}) (jQuery, window);
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-applicationcache-audio-backgroundsize-borderimage-borderradius-boxshadow-canvas-canvastext-cssanimations-csscolumns-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-flexbox-fontface-generatedcontent-geolocation-hashchange-history-hsla-indexeddb-inlinesvg-input-inputtypes-localstorage-multiplebgs-opacity-postmessage-rgba-sessionstorage-smil-svg-svgclippaths-textshadow-touchevents-video-webgl-websockets-websqldatabase-webworkers-addtest-domprefixes-hasevent-mq-prefixed-prefixes-setclasses-shiv-testallprops-testprop-teststyles !*/
!function(e,t,n){function r(e,t){return typeof e===t}function a(){var e,t,n,a,o,i,s;for(var c in x)if(x.hasOwnProperty(c)){if(e=[],t=x[c],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(a=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)i=e[o],s=i.split("."),1===s.length?Modernizr[s[0]]=a:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=a),b.push((a?"":"no-")+s.join("-"))}}function o(e){var t=E.className,n=Modernizr._config.classPrefix||"";if(k&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),k?E.className.baseVal=t:E.className=t)}function i(e,t){if("object"==typeof e)for(var n in e)z(e,n)&&i(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),a=Modernizr[r[0]];if(2==r.length&&(a=a[r[1]]),"undefined"!=typeof a)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),o([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):k?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function c(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function l(e,t){return!!~(""+e).indexOf(t)}function d(){var e=t.body;return e||(e=s(k?"svg":"body"),e.fake=!0),e}function u(e,n,r,a){var o,i,c,l,u="modernizr",f=s("div"),p=d();if(parseInt(r,10))for(;r--;)c=s("div"),c.id=a?a[r]:u+(r+1),f.appendChild(c);return o=s("style"),o.type="text/css",o.id="s"+u,(p.fake?p:f).appendChild(o),p.appendChild(f),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),f.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",l=E.style.overflow,E.style.overflow="hidden",E.appendChild(p)),i=n(f,e),p.fake?(p.parentNode.removeChild(p),E.style.overflow=l,E.offsetHeight):f.parentNode.removeChild(f),!!i}function f(e,t){return function(){return e.apply(t,arguments)}}function p(e,t,n){var a;for(var o in e)if(e[o]in t)return n===!1?e[o]:(a=t[e[o]],r(a,"function")?f(a,n||t):a);return!1}function m(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function h(t,r){var a=t.length;if("CSS"in e&&"supports"in e.CSS){for(;a--;)if(e.CSS.supports(m(t[a]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];a--;)o.push("("+m(t[a])+":"+r+")");return o=o.join(" or "),u("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function g(e,t,a,o){function i(){u&&(delete H.style,delete H.modElem)}if(o=r(o,"undefined")?!1:o,!r(a,"undefined")){var d=h(e,a);if(!r(d,"undefined"))return d}for(var u,f,p,m,g,v=["modernizr","tspan","samp"];!H.style&&v.length;)u=!0,H.modElem=s(v.shift()),H.style=H.modElem.style;for(p=e.length,f=0;p>f;f++)if(m=e[f],g=H.style[m],l(m,"-")&&(m=c(m)),H.style[m]!==n){if(o||r(a,"undefined"))return i(),"pfx"==t?m:!0;try{H.style[m]=a}catch(y){}if(H.style[m]!=g)return i(),"pfx"==t?m:!0}return i(),!1}function v(e,t,n,a,o){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+W.join(i+" ")+i).split(" ");return r(t,"string")||r(t,"undefined")?g(s,t,a,o):(s=(e+" "+P.join(i+" ")+i).split(" "),p(s,t,n))}function y(e,t,r){return v(e,n,n,t,r)}var b=[],x=[],T={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){x.push({name:e,fn:t,options:n})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=T,Modernizr=new Modernizr,Modernizr.addTest("applicationcache","applicationCache"in e),Modernizr.addTest("geolocation","geolocation"in navigator),Modernizr.addTest("history",function(){var t=navigator.userAgent;return-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone")?e.history&&"pushState"in e.history:!1}),Modernizr.addTest("postmessage","postMessage"in e),Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var w=!1;try{w="WebSocket"in e&&2===e.WebSocket.CLOSING}catch(S){}Modernizr.addTest("websockets",w),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}),Modernizr.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}),Modernizr.addTest("websqldatabase","openDatabase"in e),Modernizr.addTest("webworkers","Worker"in e);var C=T._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];T._prefixes=C;var E=t.documentElement,k="svg"===E.nodeName.toLowerCase();k||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function a(e,t){var n=b.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),b.elements=n+" "+e,l(t)}function o(e){var t=y[e[g]];return t||(t={},v++,e[g]=v,y[v]=t),t}function i(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=o(n));var a;return a=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!a.canHaveChildren||m.test(e)||a.tagUrn?a:r.frag.appendChild(a)}function s(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||o(e);for(var a=n.frag.cloneNode(),i=0,s=r(),c=s.length;c>i;i++)a.createElement(s[i]);return a}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function l(e){e||(e=t);var r=o(e);return!b.shivCSS||d||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||c(e,r),e}var d,u,f="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){d=!0,u=!0}}();var b={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:f,shivCSS:p.shivCSS!==!1,supportsUnknownElements:u,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:l,createElement:i,createDocumentFragment:s,addElements:a};e.html5=b,l(t),"object"==typeof module&&module.exports&&(module.exports=b)}("undefined"!=typeof e?e:this,t);var _="Moz O ms Webkit",P=T._config.usePrefixes?_.toLowerCase().split(" "):[];T._domPrefixes=P;var z;!function(){var e={}.hasOwnProperty;z=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),T._l={},T.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},T._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){T.addTest=i});var N=function(){function e(e,t){var a;return e?(t&&"string"!=typeof t||(t=s(t||"div")),e="on"+e,a=e in t,!a&&r&&(t.setAttribute||(t=s("div")),t.setAttribute(e,""),a="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),a):!1}var r=!("onblur"in t.documentElement);return e}();T.hasEvent=N,Modernizr.addTest("hashchange",function(){return N("hashchange",e)===!1?!1:t.documentMode===n||t.documentMode>7}),Modernizr.addTest("audio",function(){var e=s("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("canvas",function(){var e=s("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("canvastext",function(){return Modernizr.canvas===!1?!1:"function"==typeof s("canvas").getContext("2d").fillText}),Modernizr.addTest("video",function(){var e=s("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("webgl",function(){var t=s("canvas"),n="probablySupportsContext"in t?"probablySupportsContext":"supportsContext";return n in t?t[n]("webgl")||t[n]("experimental-webgl"):"WebGLRenderingContext"in e}),Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",a=0,o=C.length-1;o>a;a++)e=0===a?"to ":"",r+=t+C[a]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=t+"-webkit-"+n);var i=s("a"),c=i.style;return c.cssText=r,(""+c.backgroundImage).indexOf("gradient")>-1}),Modernizr.addTest("multiplebgs",function(){var e=s("a").style;return e.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(e.background)}),Modernizr.addTest("opacity",function(){var e=s("a").style;return e.cssText=C.join("opacity:.55;"),/^0.55$/.test(e.opacity)}),Modernizr.addTest("rgba",function(){var e=s("a").style;return e.cssText="background-color:rgba(150,255,150,.5)",(""+e.backgroundColor).indexOf("rgba")>-1}),Modernizr.addTest("inlinesvg",function(){var e=s("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var R=s("input"),$="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),A={};Modernizr.input=function(t){for(var n=0,r=t.length;r>n;n++)A[t[n]]=!!(t[n]in R);return A.list&&(A.list=!(!s("datalist")||!e.HTMLDataListElement)),A}($);var O="search tel url email datetime date month week time datetime-local number range color".split(" "),j={};Modernizr.inputtypes=function(e){for(var r,a,o,i=e.length,s="1)",c=0;i>c;c++)R.setAttribute("type",r=e[c]),o="text"!==R.type&&"style"in R,o&&(R.value=s,R.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(r)&&R.style.WebkitAppearance!==n?(E.appendChild(R),a=t.defaultView,o=a.getComputedStyle&&"textfield"!==a.getComputedStyle(R,null).WebkitAppearance&&0!==R.offsetHeight,E.removeChild(R)):/^(search|tel)$/.test(r)||(o=/^(url|email)$/.test(r)?R.checkValidity&&R.checkValidity()===!1:R.value!=s)),j[e[c]]=!!o;return j}(O),Modernizr.addTest("hsla",function(){var e=s("a").style;return e.cssText="background-color:hsla(120,40%,100%,.5)",l(e.backgroundColor,"rgba")||l(e.backgroundColor,"hsla")});var L="CSS"in e&&"supports"in e.CSS,M="supportsCSS"in e;Modernizr.addTest("supports",L||M);var B={}.toString;Modernizr.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(B.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))}),Modernizr.addTest("smil",function(){return!!t.createElementNS&&/SVGAnimate/.test(B.call(t.createElementNS("http://www.w3.org/2000/svg","animate")))});var F=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return u("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();T.mq=F;var D=T.testStyles=u;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",C.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");D(r,function(e){n=9===e.offsetTop})}return n});var I=function(){var e=navigator.userAgent,t=e.match(/applewebkit\/([0-9]+)/gi)&&parseFloat(RegExp.$1),n=e.match(/w(eb)?osbrowser/gi),r=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9,a=533>t&&e.match(/android/gi);return n||a||r}();I?Modernizr.addTest("fontface",!1):D('@font-face {font-family:"font";src:url("https://")}',function(e,n){var r=t.getElementById("smodernizr"),a=r.sheet||r.styleSheet,o=a?a.cssRules&&a.cssRules[0]?a.cssRules[0].cssText:a.cssText||"":"",i=/src/i.test(o)&&0===o.indexOf(n.split(" ")[0]);Modernizr.addTest("fontface",i)}),D('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}',function(e){Modernizr.addTest("generatedcontent",e.offsetHeight>=7)});var W=T._config.usePrefixes?_.split(" "):[];T._cssomPrefixes=W;var q=function(t){var r,a=C.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var i=0;a>i;i++){var s=C[i],c=s.toUpperCase()+"_"+r;if(c in o)return"@-"+s.toLowerCase()+"-"+t}return!1};T.atRule=q;var V={elem:s("modernizr")};Modernizr._q.push(function(){delete V.elem});var H={style:V.elem.style};Modernizr._q.unshift(function(){delete H.style});var U=T.testProp=function(e,t,r){return g([e],n,t,r)};Modernizr.addTest("textshadow",U("textShadow","1px 1px")),T.testAllProps=v;var G,J=T.prefixed=function(e,t,n){return 0===e.indexOf("@")?q(e):(-1!=e.indexOf("-")&&(e=c(e)),t?v(e,t,n):v(e,"pfx"))};try{G=J("indexedDB",e)}catch(S){}Modernizr.addTest("indexeddb",!!G),G&&Modernizr.addTest("indexeddb.deletedatabase","deleteDatabase"in G),T.testAllProps=y,Modernizr.addTest("cssanimations",y("animationName","a",!0)),Modernizr.addTest("backgroundsize",y("backgroundSize","100%",!0)),Modernizr.addTest("borderimage",y("borderImage","url() 1",!0)),Modernizr.addTest("borderradius",y("borderRadius","0px",!0)),Modernizr.addTest("boxshadow",y("boxShadow","1px 1px",!0)),function(){Modernizr.addTest("csscolumns",function(){var e=!1,t=y("columnCount");try{(e=!!t)&&(e=new Boolean(e))}catch(n){}return e});for(var e,t,n=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<n.length;r++)e=n[r].toLowerCase(),t=y("column"+n[r]),("breakbefore"===e||"breakafter"===e||"breakinside"==e)&&(t=t||y(n[r])),Modernizr.addTest("csscolumns."+e,t)}(),Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),Modernizr.addTest("cssreflections",y("boxReflect","above",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)}),Modernizr.addTest("csstransforms3d",function(){var e=!!y("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in E.style)){var n,r="#modernizr{width:0;height:0}";Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",D(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),Modernizr.addTest("csstransitions",y("transition","all",!0)),a(),o(b),delete T.addTest,delete T.addAsyncTest;for(var Z=0;Z<Modernizr._q.length;Z++)Modernizr._q[Z]();e.Modernizr=Modernizr}(window,document);