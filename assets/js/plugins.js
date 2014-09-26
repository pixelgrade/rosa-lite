/*!
 * VERSION: beta 1.9.3
 * DATE: 2013-04-02
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";window._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=window.GreenSockGlobals||window,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,h=n._class,l=function(e,i){var s=h("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},c=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},p=function(e,i){var s=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},f=u("Back",p("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),p("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),p("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,h=e.taper||"none",l=[],_=0,u=0|(e.points||20),p=u,f=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--p>-1;)i=f?Math.random():1/u*p,s=d?d.getRatio(i):i,"none"===h?r=g:"out"===h?(n=1-i,r=n*n*g):"in"===h?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),f?s+=Math.random()*r-.5*r:p%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),l[_++]={x:i,y:s};for(l.sort(function(t,e){return t.x-e.x}),o=new c(1,1,null),p=u;--p>-1;)a=l[p],o=new c(a.x,a.y,o);this._prev=new c(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=h("easing."+e,function(t,e){this._p1=t||1,this._p2=e||s,this._p3=this._p2/a*(Math.asin(1/this._p1)||0)},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*a/this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*a/this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*a/this._p2)+1},.45)),u("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",l("SineOut",function(t){return Math.sin(t*o)}),l("SineIn",function(t){return-Math.cos(t*o)+1}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),f},!0)}),window._gsDefine&&window._gsQueue.pop()();
var pixGS = window.GreenSockGlobals = {};

/*!TweenMax
 * VERSION: 1.11.4
 * DATE: 2014-01-18
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
		var s = [].slice, r = function (t, e, s) {
			i.call(this, t, e, s), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
		}, n = 1e-10, a = i._internals.isSelector, o = i._internals.isArray, h = r.prototype = i.to({}, .1, {}), l = [];
		r.version = "1.11.4", h.constructor = r, h.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.ticker = i.ticker, h.invalidate = function () {
			return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
		}, h.updateTo = function (t, e) {
			var s, r = this.ratio;
			e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
			for (s in t)this.vars[s] = t[s];
			if (this._initted)if (e)this._initted = !1; else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
				var n = this._time;
				this.render(0, !0, !1), this._initted = !1, this.render(n, !0, !1)
			} else if (this._time > 0) {
				this._initted = !1, this._init();
				for (var a, o = 1 / (1 - r), h = this._firstPT; h;)a = h.s + h.c, h.c *= o, h.s = a - h.c, h = h._next
			}
			return this
		}, h.render = function (t, e, i) {
			this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
			var s, r, a, o, h, _, u, p, c = this._dirty ? this.totalDuration() : this._totalDuration, f = this._time, m = this._totalTime, d = this._cycle, g = this._duration;
			if (t >= c ? (this._totalTime = c, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = g, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete"), 0 === g && (p = this._rawPrevTime, (0 === t || 0 > p || p === n) && p !== t && (i = !0, p > n && (r = "onReverseComplete")), this._rawPrevTime = p = !e || t || 0 === p ? t : n)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === g && this._rawPrevTime > n) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === g && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = p = !e || t || 0 === this._rawPrevTime ? t : n)) : this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (o = g + this._repeatDelay, this._cycle = this._totalTime / o >> 0, 0 !== this._cycle && this._cycle === this._totalTime / o && this._cycle--, this._time = this._totalTime - this._cycle * o, this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time), this._time > g ? this._time = g : 0 > this._time && (this._time = 0)), this._easeType ? (h = this._time / g, _ = this._easeType, u = this._easePower, (1 === _ || 3 === _ && h >= .5) && (h = 1 - h), 3 === _ && (h *= 2), 1 === u ? h *= h : 2 === u ? h *= h * h : 3 === u ? h *= h * h * h : 4 === u && (h *= h * h * h * h), this.ratio = 1 === _ ? 1 - h : 2 === _ ? h : .5 > this._time / g ? h / 2 : 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / g)), f === this._time && !i && d === this._cycle)return m !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l)), void 0;
			if (!this._initted) {
				if (this._init(), !this._initted || this._gc)return;
				this._time && !s ? this.ratio = this._ease.getRatio(this._time / g) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
			}
			for (this._active || !this._paused && this._time !== f && t >= 0 && (this._active = !0), 0 === m && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === g) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || l))), a = this._firstPT; a;)a.f ? a.t[a.p](a.c * this.ratio + a.s) : a.t[a.p] = a.c * this.ratio + a.s, a = a._next;
			this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== m || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l)), this._cycle !== d && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || l)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || l), 0 === g && this._rawPrevTime === n && p !== n && (this._rawPrevTime = 0)))
		}, r.to = function (t, e, i) {
			return new r(t, e, i)
		}, r.from = function (t, e, i) {
			return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(t, e, i)
		}, r.fromTo = function (t, e, i, s) {
			return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new r(t, e, s)
		}, r.staggerTo = r.allTo = function (t, e, n, h, _, u, p) {
			h = h || 0;
			var c, f, m, d, g = n.delay || 0, v = [], y = function () {
				n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments), _.apply(p || this, u || l)
			};
			for (o(t) || ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = s.call(t, 0))), c = t.length, m = 0; c > m; m++) {
				f = {};
				for (d in n)f[d] = n[d];
				f.delay = g, m === c - 1 && _ && (f.onComplete = y), v[m] = new r(t[m], e, f), g += h
			}
			return v
		}, r.staggerFrom = r.allFrom = function (t, e, i, s, n, a, o) {
			return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(t, e, i, s, n, a, o)
		}, r.staggerFromTo = r.allFromTo = function (t, e, i, s, n, a, o, h) {
			return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, r.staggerTo(t, e, s, n, a, o, h)
		}, r.delayedCall = function (t, e, i, s, n) {
			return new r(e, 0, {
				delay: t,
				onComplete: e,
				onCompleteParams: i,
				onCompleteScope: s,
				onReverseComplete: e,
				onReverseCompleteParams: i,
				onReverseCompleteScope: s,
				immediateRender: !1,
				useFrames: n,
				overwrite: 0
			})
		}, r.set = function (t, e) {
			return new r(t, 0, e)
		}, r.isTweening = function (t) {
			return i.getTweensOf(t, !0).length > 0
		};
		var _ = function (t, e) {
			for (var s = [], r = 0, n = t._first; n;)n instanceof i ? s[r++] = n : (e && (s[r++] = n), s = s.concat(_(n, e)), r = s.length), n = n._next;
			return s
		}, u = r.getAllTweens = function (e) {
			return _(t._rootTimeline, e).concat(_(t._rootFramesTimeline, e))
		};
		r.killAll = function (t, i, s, r) {
			null == i && (i = !0), null == s && (s = !0);
			var n, a, o, h = u(0 != r), l = h.length, _ = i && s && r;
			for (o = 0; l > o; o++)a = h[o], (_ || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && (t ? a.totalTime(a.totalDuration()) : a._enabled(!1, !1))
		}, r.killChildTweensOf = function (t, e) {
			if (null != t) {
				var n, h, l, _, u, p = i._tweenLookup;
				if ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = s.call(t, 0)), o(t))for (_ = t.length; --_ > -1;)r.killChildTweensOf(t[_], e); else {
					n = [];
					for (l in p)for (h = p[l].target.parentNode; h;)h === t && (n = n.concat(p[l].tweens)), h = h.parentNode;
					for (u = n.length, _ = 0; u > _; _++)e && n[_].totalTime(n[_].totalDuration()), n[_]._enabled(!1, !1)
				}
			}
		};
		var p = function (t, i, s, r) {
			i = i !== !1, s = s !== !1, r = r !== !1;
			for (var n, a, o = u(r), h = i && s && r, l = o.length; --l > -1;)a = o[l], (h || a instanceof e || (n = a.target === a.vars.onComplete) && s || i && !n) && a.paused(t)
		};
		return r.pauseAll = function (t, e, i) {
			p(!0, t, e, i)
		}, r.resumeAll = function (t, e, i) {
			p(!1, t, e, i)
		}, r.globalTimeScale = function (e) {
			var s = t._rootTimeline, r = i.ticker.time;
			return arguments.length ? (e = e || n, s._startTime = r - (r - s._startTime) * s._timeScale / e, s = t._rootFramesTimeline, r = i.ticker.frame, s._startTime = r - (r - s._startTime) * s._timeScale / e, s._timeScale = t._rootTimeline._timeScale = e, e) : s._timeScale
		}, h.progress = function (t) {
			return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
		}, h.totalProgress = function (t) {
			return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
		}, h.time = function (t, e) {
			return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
		}, h.duration = function (e) {
			return arguments.length ? t.prototype.duration.call(this, e) : this._duration
		}, h.totalDuration = function (t) {
			return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
		}, h.repeat = function (t) {
			return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
		}, h.repeatDelay = function (t) {
			return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
		}, h.yoyo = function (t) {
			return arguments.length ? (this._yoyo = t, this) : this._yoyo
		}, r
	}, !0), window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
		var s = function (t) {
			e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
			var i, s, r = this.vars;
			for (s in r)i = r[s], a(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
			a(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
		}, r = 1e-10, n = i._internals.isSelector, a = i._internals.isArray, o = [], h = function (t) {
			var e, i = {};
			for (e in t)i[e] = t[e];
			return i
		}, l = function (t, e, i, s) {
			t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || o)
		}, _ = o.slice, u = s.prototype = new e;
		return s.version = "1.11.4", u.constructor = s, u.kill()._gc = !1, u.to = function (t, e, s, r) {
			return e ? this.add(new i(t, e, s), r) : this.set(t, s, r)
		}, u.from = function (t, e, s, r) {
			return this.add(i.from(t, e, s), r)
		}, u.fromTo = function (t, e, s, r, n) {
			return e ? this.add(i.fromTo(t, e, s, r), n) : this.set(t, r, n)
		}, u.staggerTo = function (t, e, r, a, o, l, u, p) {
			var c, f = new s({
				onComplete: l,
				onCompleteParams: u,
				onCompleteScope: p,
				smoothChildTiming: this.smoothChildTiming
			});
			for ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = _.call(t, 0)), a = a || 0, c = 0; t.length > c; c++)r.startAt && (r.startAt = h(r.startAt)), f.to(t[c], e, h(r), c * a);
			return this.add(f, o)
		}, u.staggerFrom = function (t, e, i, s, r, n, a, o) {
			return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
		}, u.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
			return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
		}, u.call = function (t, e, s, r) {
			return this.add(i.delayedCall(0, t, e, s), r)
		}, u.set = function (t, e, s) {
			return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
		}, s.exportRoot = function (t, e) {
			t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
			var r, n, a = new s(t), o = a._timeline;
			for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;)n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
			return o.add(a, 0), a
		}, u.add = function (r, n, o, h) {
			var l, _, u, p, c, f;
			if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
				if (r instanceof Array || r && r.push && a(r)) {
					for (o = o || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++)a(p = r[u]) && (p = new s({tweens: p})), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === o ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === o && (p._startTime -= p.delay())), l += h;
					return this._uncache(!0)
				}
				if ("string" == typeof r)return this.addLabel(r, n);
				if ("function" != typeof r)throw"Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
				r = i.delayedCall(0, r)
			}
			if (e.prototype.add.call(this, r, n), this._gc && !this._paused && this._duration < this.duration())for (c = this, f = c.rawTime() > r._startTime; c._gc && c._timeline;)c._timeline.smoothChildTiming && f ? c.totalTime(c._totalTime, !0) : c._enabled(!0, !1), c = c._timeline;
			return this
		}, u.remove = function (e) {
			if (e instanceof t)return this._remove(e, !1);
			if (e instanceof Array || e && e.push && a(e)) {
				for (var i = e.length; --i > -1;)this.remove(e[i]);
				return this
			}
			return"string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
		}, u._remove = function (t, i) {
			e.prototype._remove.call(this, t, i);
			var s = this._last;
			return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = 0, this
		}, u.append = function (t, e) {
			return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
		}, u.insert = u.insertMultiple = function (t, e, i, s) {
			return this.add(t, e || 0, i, s)
		}, u.appendMultiple = function (t, e, i, s) {
			return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
		}, u.addLabel = function (t, e) {
			return this._labels[t] = this._parseTimeOrLabel(e), this
		}, u.addPause = function (t, e, i, s) {
			return this.call(l, ["{self}", e, i, s], this, t)
		}, u.removeLabel = function (t) {
			return delete this._labels[t], this
		}, u.getLabelTime = function (t) {
			return null != this._labels[t] ? this._labels[t] : -1
		}, u._parseTimeOrLabel = function (e, i, s, r) {
			var n;
			if (r instanceof t && r.timeline === this)this.remove(r); else if (r && (r instanceof Array || r.push && a(r)))for (n = r.length; --n > -1;)r[n]instanceof t && r[n].timeline === this && this.remove(r[n]);
			if ("string" == typeof i)return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
			if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e])null == e && (e = this.duration()); else {
				if (n = e.indexOf("="), -1 === n)return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
				i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
			}
			return Number(e) + i
		}, u.seek = function (t, e) {
			return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
		}, u.stop = function () {
			return this.paused(!0)
		}, u.gotoAndPlay = function (t, e) {
			return this.play(t, e)
		}, u.gotoAndStop = function (t, e) {
			return this.pause(t, e)
		}, u.render = function (t, e, i) {
			this._gc && this._enabled(!0, !1);
			var s, n, a, h, l, _ = this._dirty ? this.totalDuration() : this._totalDuration, u = this._time, p = this._startTime, c = this._timeScale, f = this._paused;
			if (t >= _ ? (this._totalTime = this._time = _, this._reversed || this._hasPausedChild() || (n = !0, h = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || 0 === this._rawPrevTime ? t : r, t = _ + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && (this._rawPrevTime > r || 0 > t && this._rawPrevTime >= 0)) && (h = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || 0 === this._rawPrevTime ? t : r, t = 0, this._initted || (l = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== u && this._first || i || l) {
				if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && t > 0 && (this._active = !0), 0 === u && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o)), this._time >= u)for (s = this._first; s && (a = s._next, !this._paused || f);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a; else for (s = this._last; s && (a = s._prev, !this._paused || f);)(s._active || u >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
				this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), h && (this._gc || (p === this._startTime || c !== this._timeScale) && (0 === this._time || _ >= this.totalDuration()) && (n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || o)))
			}
		}, u._hasPausedChild = function () {
			for (var t = this._first; t;) {
				if (t._paused || t instanceof s && t._hasPausedChild())return!0;
				t = t._next
			}
			return!1
		}, u.getChildren = function (t, e, s, r) {
			r = r || -9999999999;
			for (var n = [], a = this._first, o = 0; a;)r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
			return n
		}, u.getTweensOf = function (t, e) {
			for (var s = i.getTweensOf(t), r = s.length, n = [], a = 0; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (n[a++] = s[r]);
			return n
		}, u._contains = function (t) {
			for (var e = t.timeline; e;) {
				if (e === this)return!0;
				e = e.timeline
			}
			return!1
		}, u.shiftChildren = function (t, e, i) {
			i = i || 0;
			for (var s, r = this._first, n = this._labels; r;)r._startTime >= i && (r._startTime += t), r = r._next;
			if (e)for (s in n)n[s] >= i && (n[s] += t);
			return this._uncache(!0)
		}, u._kill = function (t, e) {
			if (!t && !e)return this._enabled(!1, !1);
			for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;)i[s]._kill(t, e) && (r = !0);
			return r
		}, u.clear = function (t) {
			var e = this.getChildren(!1, !0, !0), i = e.length;
			for (this._time = this._totalTime = 0; --i > -1;)e[i]._enabled(!1, !1);
			return t !== !1 && (this._labels = {}), this._uncache(!0)
		}, u.invalidate = function () {
			for (var t = this._first; t;)t.invalidate(), t = t._next;
			return this
		}, u._enabled = function (t, i) {
			if (t === this._gc)for (var s = this._first; s;)s._enabled(t, !0), s = s._next;
			return e.prototype._enabled.call(this, t, i)
		}, u.duration = function (t) {
			return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
		}, u.totalDuration = function (t) {
			if (!arguments.length) {
				if (this._dirty) {
					for (var e, i, s = 0, r = this._last, n = 999999999999; r;)e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
					this._duration = this._totalDuration = s, this._dirty = !1
				}
				return this._totalDuration
			}
			return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
		}, u.usesFrames = function () {
			for (var e = this._timeline; e._timeline;)e = e._timeline;
			return e === t._rootFramesTimeline
		}, u.rawTime = function () {
			return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
		}, s
	}, !0), window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, i) {
		var s = function (e) {
			t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
		}, r = 1e-10, n = [], a = new i(null, null, 1, 0), o = s.prototype = new t;
		return o.constructor = s, o.kill()._gc = !1, s.version = "1.11.4", o.invalidate = function () {
			return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
		}, o.addCallback = function (t, i, s, r) {
			return this.add(e.delayedCall(0, t, s, r), i)
		}, o.removeCallback = function (t, e) {
			if (t)if (null == e)this._kill(null, t); else for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); --s > -1;)i[s]._startTime === r && i[s]._enabled(!1, !1);
			return this
		}, o.tweenTo = function (t, i) {
			i = i || {};
			var s, r, o, h = {ease: a, overwrite: 2, useFrames: this.usesFrames(), immediateRender: !1};
			for (r in i)h[r] = i[r];
			return h.time = this._parseTimeOrLabel(t), s = Math.abs(Number(h.time) - this._time) / this._timeScale || .001, o = new e(this, s, h), h.onStart = function () {
				o.target.paused(!0), o.vars.time !== o.target.time() && s === o.duration() && o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || o, i.onStartParams || n)
			}, o
		}, o.tweenFromTo = function (t, e, i) {
			i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
				onComplete: this.seek,
				onCompleteParams: [t],
				onCompleteScope: this
			}, i.immediateRender = i.immediateRender !== !1;
			var s = this.tweenTo(e, i);
			return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
		}, o.render = function (t, e, i) {
			this._gc && this._enabled(!0, !1);
			var s, a, o, h, l, _, u = this._dirty ? this.totalDuration() : this._totalDuration, p = this._duration, c = this._time, f = this._totalTime, m = this._startTime, d = this._timeScale, g = this._rawPrevTime, v = this._paused, y = this._cycle;
			if (t >= u ? (this._locked || (this._totalTime = u, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, h = "onComplete", 0 === this._duration && (0 === t || 0 > g || g === r) && g !== t && this._first && (l = !0, g > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || 0 === this._rawPrevTime ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = p, t = p + 1e-4)) : 1e-7 > t ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== c || 0 === p && (g > r || 0 > t && g >= 0) && !this._locked) && (h = "onReverseComplete", a = this._reversed), 0 > t ? (this._active = !1, 0 === p && g >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = p || !e || t || 0 === this._rawPrevTime ? t : r, t = 0, this._initted || (l = !0))) : (0 === p && 0 > g && (l = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (_ = p + this._repeatDelay, this._cycle = this._totalTime / _ >> 0, 0 !== this._cycle && this._cycle === this._totalTime / _ && this._cycle--, this._time = this._totalTime - this._cycle * _, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, t = p + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time))), this._cycle !== y && !this._locked) {
				var T = this._yoyo && 0 !== (1 & y), w = T === (this._yoyo && 0 !== (1 & this._cycle)), x = this._totalTime, b = this._cycle, P = this._rawPrevTime, S = this._time;
				if (this._totalTime = y * p, y > this._cycle ? T = !T : this._totalTime += p, this._time = c, this._rawPrevTime = 0 === p ? g - 1e-4 : g, this._cycle = y, this._locked = !0, c = T ? 0 : p, this.render(c, e, 0 === p), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || n), w && (c = T ? p + 1e-4 : -1e-4, this.render(c, !0, !1)), this._locked = !1, this._paused && !v)return;
				this._time = S, this._totalTime = x, this._cycle = b, this._rawPrevTime = P
			}
			if (!(this._time !== c && this._first || i || l))return f !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)), void 0;
			if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || n)), this._time >= c)for (s = this._first; s && (o = s._next, !this._paused || v);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = o; else for (s = this._last; s && (o = s._prev, !this._paused || v);)(s._active || c >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = o;
			this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || n)), h && (this._locked || this._gc || (m === this._startTime || d !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (a && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || n)))
		}, o.getActive = function (t, e, i) {
			null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
			var s, r, n = [], a = this.getChildren(t, e, i), o = 0, h = a.length;
			for (s = 0; h > s; s++)r = a[s], r.isActive() && (n[o++] = r);
			return n
		}, o.getLabelAfter = function (t) {
			t || 0 !== t && (t = this._time);
			var e, i = this.getLabelsArray(), s = i.length;
			for (e = 0; s > e; e++)if (i[e].time > t)return i[e].name;
			return null
		}, o.getLabelBefore = function (t) {
			null == t && (t = this._time);
			for (var e = this.getLabelsArray(), i = e.length; --i > -1;)if (t > e[i].time)return e[i].name;
			return null
		}, o.getLabelsArray = function () {
			var t, e = [], i = 0;
			for (t in this._labels)e[i++] = {time: this._labels[t], name: t};
			return e.sort(function (t, e) {
				return t.time - e.time
			}), e
		}, o.progress = function (t) {
			return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
		}, o.totalProgress = function (t) {
			return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
		}, o.totalDuration = function (e) {
			return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
		}, o.time = function (t, e) {
			return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
		}, o.repeat = function (t) {
			return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
		}, o.repeatDelay = function (t) {
			return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
		}, o.yoyo = function (t) {
			return arguments.length ? (this._yoyo = t, this) : this._yoyo
		}, o.currentLabel = function (t) {
			return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
		}, s
	}, !0), function () {
		var t = 180 / Math.PI, e = [], i = [], s = [], r = {}, n = function (t, e, i, s) {
			this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
		}, a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", o = function (t, e, i, s) {
			var r = {a: t}, n = {}, a = {}, o = {c: s}, h = (t + e) / 2, l = (e + i) / 2, _ = (i + s) / 2, u = (h + l) / 2, p = (l + _) / 2, c = (p - u) / 8;
			return r.b = h + (t - h) / 4, n.b = u + c, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (u + p) / 2, a.b = p - c, o.b = _ + (s - _) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
		}, h = function (t, r, n, a, h) {
			var l, _, u, p, c, f, m, d, g, v, y, T, w, x = t.length - 1, b = 0, P = t[0].a;
			for (l = 0; x > l; l++)c = t[b], _ = c.a, u = c.d, p = t[b + 1].d, h ? (y = e[l], T = i[l], w = .25 * (T + y) * r / (a ? .5 : s[l] || .5), f = u - (u - _) * (a ? .5 * r : 0 !== y ? w / y : 0), m = u + (p - u) * (a ? .5 * r : 0 !== T ? w / T : 0), d = u - (f + ((m - f) * (3 * y / (y + T) + .5) / 4 || 0))) : (f = u - .5 * (u - _) * r, m = u + .5 * (p - u) * r, d = u - (f + m) / 2), f += d, m += d, c.c = g = f, c.b = 0 !== l ? P : P = c.a + .6 * (c.c - c.a), c.da = u - _, c.ca = g - _, c.ba = P - _, n ? (v = o(_, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
			c = t[b], c.b = P, c.c = P + .4 * (c.d - P), c.da = c.d - c.a, c.ca = c.c - c.a, c.ba = P - c.a, n && (v = o(c.a, P, c.c, c.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
		}, l = function (t, s, r, a) {
			var o, h, l, _, u, p, c = [];
			if (a)for (t = [a].concat(t), h = t.length; --h > -1;)"string" == typeof(p = t[h][s]) && "=" === p.charAt(1) && (t[h][s] = a[s] + Number(p.charAt(0) + p.substr(2)));
			if (o = t.length - 2, 0 > o)return c[0] = new n(t[0][s], 0, 0, t[-1 > o ? 0 : 1][s]), c;
			for (h = 0; o > h; h++)l = t[h][s], _ = t[h + 1][s], c[h] = new n(l, 0, 0, _), r && (u = t[h + 2][s], e[h] = (e[h] || 0) + (_ - l) * (_ - l), i[h] = (i[h] || 0) + (u - _) * (u - _));
			return c[h] = new n(t[h][s], 0, 0, t[h + 1][s]), c
		}, _ = function (t, n, o, _, u, p) {
			var c, f, m, d, g, v, y, T, w = {}, x = [], b = p || t[0];
			u = "string" == typeof u ? "," + u + "," : a, null == n && (n = 1);
			for (f in t[0])x.push(f);
			if (t.length > 1) {
				for (T = t[t.length - 1], y = !0, c = x.length; --c > -1;)if (f = x[c], Math.abs(b[f] - T[f]) > .05) {
					y = !1;
					break
				}
				y && (t = t.concat(), p && t.unshift(p), t.push(t[1]), p = t[t.length - 3])
			}
			for (e.length = i.length = s.length = 0, c = x.length; --c > -1;)f = x[c], r[f] = -1 !== u.indexOf("," + f + ","), w[f] = l(t, f, r[f], p);
			for (c = e.length; --c > -1;)e[c] = Math.sqrt(e[c]), i[c] = Math.sqrt(i[c]);
			if (!_) {
				for (c = x.length; --c > -1;)if (r[f])for (m = w[x[c]], v = m.length - 1, d = 0; v > d; d++)g = m[d + 1].da / i[d] + m[d].da / e[d], s[d] = (s[d] || 0) + g * g;
				for (c = s.length; --c > -1;)s[c] = Math.sqrt(s[c])
			}
			for (c = x.length, d = o ? 4 : 1; --c > -1;)f = x[c], m = w[f], h(m, n, o, _, r[f]), y && (m.splice(0, d), m.splice(m.length - d, d));
			return w
		}, u = function (t, e, i) {
			e = e || "soft";
			var s, r, a, o, h, l, _, u, p, c, f, m = {}, d = "cubic" === e ? 3 : 2, g = "soft" === e, v = [];
			if (g && i && (t = [i].concat(t)), null == t || d + 1 > t.length)throw"invalid Bezier data";
			for (p in t[0])v.push(p);
			for (l = v.length; --l > -1;) {
				for (p = v[l], m[p] = h = [], c = 0, u = t.length, _ = 0; u > _; _++)s = null == i ? t[_][p] : "string" == typeof(f = t[_][p]) && "=" === f.charAt(1) ? i[p] + Number(f.charAt(0) + f.substr(2)) : Number(f), g && _ > 1 && u - 1 > _ && (h[c++] = (s + h[c - 2]) / 2), h[c++] = s;
				for (u = c - d + 1, c = 0, _ = 0; u > _; _ += d)s = h[_], r = h[_ + 1], a = h[_ + 2], o = 2 === d ? 0 : h[_ + 3], h[c++] = f = 3 === d ? new n(s, r, a, o) : new n(s, (2 * r + s) / 3, (2 * r + a) / 3, a);
				h.length = c
			}
			return m
		}, p = function (t, e, i) {
			for (var s, r, n, a, o, h, l, _, u, p, c, f = 1 / i, m = t.length; --m > -1;)for (p = t[m], n = p.a, a = p.d - n, o = p.c - n, h = p.b - n, s = r = 0, _ = 1; i >= _; _++)l = f * _, u = 1 - l, s = r - (r = (l * l * a + 3 * u * (l * o + u * h)) * l), c = m * i + _ - 1, e[c] = (e[c] || 0) + s * s
		}, c = function (t, e) {
			e = e >> 0 || 6;
			var i, s, r, n, a = [], o = [], h = 0, l = 0, _ = e - 1, u = [], c = [];
			for (i in t)p(t[i], a, e);
			for (r = a.length, s = 0; r > s; s++)h += Math.sqrt(a[s]), n = s % e, c[n] = h, n === _ && (l += h, n = s / e >> 0, u[n] = c, o[n] = l, h = 0, c = []);
			return{length: l, lengths: o, segments: u}
		}, f = window._gsDefine.plugin({
			propName: "bezier", priority: -1, API: 2, global: !0, init: function (t, e, i) {
				this._target = t, e instanceof Array && (e = {values: e}), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
				var s, r, n, a, o, h = e.values || [], l = {}, p = h[0], f = e.autoRotate || i.vars.orientToBezier;
				this._autoRotate = f ? f instanceof Array ? f : [
					["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]
				] : null;
				for (s in p)this._props.push(s);
				for (n = this._props.length; --n > -1;)s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], l[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || l[s] !== h[0][s] && (o = l);
				if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? _(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : u(h, e.type, l), this._segCount = this._beziers[s].length, this._timeRes) {
					var m = c(this._beziers, this._timeRes);
					this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
				}
				if (f = this._autoRotate)for (f[0]instanceof Array || (this._autoRotate = f = [f]), n = f.length; --n > -1;)for (a = 0; 3 > a; a++)s = f[n][a], this._func[s] = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)] : !1;
				return!0
			}, set: function (e) {
				var i, s, r, n, a, o, h, l, _, u, p = this._segCount, c = this._func, f = this._target;
				if (this._timeRes) {
					if (_ = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
						for (l = p - 1; l > r && e >= (this._l2 = _[++r]););
						this._l1 = _[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
					} else if (this._l1 > e && r > 0) {
						for (; r > 0 && (this._l1 = _[--r]) >= e;);
						0 === r && this._l1 > e ? this._l1 = 0 : r++, this._l2 = _[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
					}
					if (i = r, e -= this._l1, r = this._si, e > this._s2 && u.length - 1 > r) {
						for (l = u.length - 1; l > r && e >= (this._s2 = u[++r]););
						this._s1 = u[r - 1], this._si = r
					} else if (this._s1 > e && r > 0) {
						for (; r > 0 && (this._s1 = u[--r]) >= e;);
						0 === r && this._s1 > e ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
					}
					o = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
				} else i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, o = (e - i * (1 / p)) * p;
				for (s = 1 - o, r = this._props.length; --r > -1;)n = this._props[r], a = this._beziers[n][i], h = (o * o * a.da + 3 * s * (o * a.ca + s * a.ba)) * o + a.a, this._round[n] && (h = h + (h > 0 ? .5 : -.5) >> 0), c[n] ? f[n](h) : f[n] = h;
				if (this._autoRotate) {
					var m, d, g, v, y, T, w, x = this._autoRotate;
					for (r = x.length; --r > -1;)n = x[r][2], T = x[r][3] || 0, w = x[r][4] === !0 ? 1 : t, a = this._beziers[x[r][0]], m = this._beziers[x[r][1]], a && m && (a = a[i], m = m[i], d = a.a + (a.b - a.a) * o, v = a.b + (a.c - a.b) * o, d += (v - d) * o, v += (a.c + (a.d - a.c) * o - v) * o, g = m.a + (m.b - m.a) * o, y = m.b + (m.c - m.b) * o, g += (y - g) * o, y += (m.c + (m.d - m.c) * o - y) * o, h = Math.atan2(y - g, v - d) * w + T, c[n] ? f[n](h) : f[n] = h)
				}
			}
		}), m = f.prototype;
		f.bezierThrough = _, f.cubicToQuadratic = o, f._autoCSS = !0, f.quadraticToCubic = function (t, e, i) {
			return new n(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
		}, f._cssRegister = function () {
			var t = window._gsDefine.globals.CSSPlugin;
			if (t) {
				var e = t._internals, i = e._parseToProxy, s = e._setPluginRatio, r = e.CSSPropTween;
				e._registerComplexSpecialProp("bezier", {
					parser: function (t, e, n, a, o, h) {
						e instanceof Array && (e = {values: e}), h = new f;
						var l, _, u, p = e.values, c = p.length - 1, m = [], d = {};
						if (0 > c)return o;
						for (l = 0; c >= l; l++)u = i(t, p[l], a, o, h, c !== l), m[l] = u.end;
						for (_ in e)d[_] = e[_];
						return d.values = m, o = new r(t, "bezier", 0, 0, u.pt, 2), o.data = u, o.plugin = h, o.setRatio = s, 0 === d.autoRotate && (d.autoRotate = !0), !d.autoRotate || d.autoRotate instanceof Array || (l = d.autoRotate === !0 ? 0 : Number(d.autoRotate), d.autoRotate = null != u.end.left ? [
							["left", "top", "rotation", l, !1]
						] : null != u.end.x ? [
							["x", "y", "rotation", l, !1]
						] : !1), d.autoRotate && (a._transform || a._enableTransforms(!1), u.autoRotate = a._target._gsTransform), h._onInitTween(u.proxy, d, a._tween), o
					}
				})
			}
		}, m._roundProps = function (t, e) {
			for (var i = this._overwriteProps, s = i.length; --s > -1;)(t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
		}, m._kill = function (t) {
			var e, i, s = this._props;
			for (e in this._beziers)if (e in t)for (delete this._beziers[e], delete this._func[e], i = s.length; --i > -1;)s[i] === e && s.splice(i, 1);
			return this._super._kill.call(this, t)
		}
	}(), window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
		var i, s, r, n, a = function () {
			t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
		}, o = {}, h = a.prototype = new t("css");
		h.constructor = a, a.version = "1.11.4", a.API = 2, a.defaultTransformPerspective = 0, h = "px", a.suffixMap = {
			top: h,
			right: h,
			bottom: h,
			left: h,
			width: h,
			height: h,
			fontSize: h,
			padding: h,
			margin: h,
			perspective: h,
			lineHeight: ""
		};
		var l, _, u, p, c, f, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g, d = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, v = /[^\d\-\.]/g, y = /(?:\d|\-|\+|=|#|\.)*/g, T = /opacity *= *([^)]*)/, w = /opacity:([^;]*)/, x = /alpha\(opacity *=.+?\)/i, b = /^(rgb|hsl)/, P = /([A-Z])/g, S = /-([a-z])/gi, k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, R = function (t, e) {
			return e.toUpperCase()
		}, A = /(?:Left|Right|Width)/i, C = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, D = /,(?=[^\)]*(?:\(|$))/gi, M = Math.PI / 180, I = 180 / Math.PI, E = {}, N = document, F = N.createElement("div"), L = N.createElement("img"), X = a._internals = {_specialProps: o}, z = navigator.userAgent, U = function () {
			var t, e = z.indexOf("Android"), i = N.createElement("div");
			return u = -1 !== z.indexOf("Safari") && -1 === z.indexOf("Chrome") && (-1 === e || Number(z.substr(e + 8, 1)) > 3), c = u && 6 > Number(z.substr(z.indexOf("Version/") + 8, 1)), p = -1 !== z.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(z) && (f = parseFloat(RegExp.$1)), i.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", t = i.getElementsByTagName("a")[0], t ? /^0.55/.test(t.style.opacity) : !1
		}(), Y = function (t) {
			return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
		}, j = function (t) {
			window.console && console.log(t)
		}, B = "", q = "", V = function (t, e) {
			e = e || F;
			var i, s, r = e.style;
			if (void 0 !== r[t])return t;
			for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; --s > -1 && void 0 === r[i[s] + t];);
			return s >= 0 ? (q = 3 === s ? "ms" : i[s], B = "-" + q.toLowerCase() + "-", q + t) : null
		}, W = N.defaultView ? N.defaultView.getComputedStyle : function () {
		}, G = a.getStyle = function (t, e, i, s, r) {
			var n;
			return U || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || W(t, null)) ? (t = i.getPropertyValue(e.replace(P, "-$1").toLowerCase()), n = t || i.length ? t : i[e]) : t.currentStyle && (n = t.currentStyle[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : Y(t)
		}, $ = function (t, e, i, s, r) {
			if ("px" === s || !s)return i;
			if ("auto" === s || !i)return 0;
			var n, a = A.test(e), o = t, h = F.style, l = 0 > i;
			return l && (i = -i), "%" === s && -1 !== e.indexOf("border") ? n = i / 100 * (a ? t.clientWidth : t.clientHeight) : (h.cssText = "border:0 solid red;position:" + G(t, "position") + ";line-height:0;", "%" !== s && o.appendChild ? h[a ? "borderLeftWidth" : "borderTopWidth"] = i + s : (o = t.parentNode || N.body, h[a ? "width" : "height"] = i + s), o.appendChild(F), n = parseFloat(F[a ? "offsetWidth" : "offsetHeight"]), o.removeChild(F), 0 !== n || r || (n = $(t, e, i, s, !0))), l ? -n : n
		}, Z = function (t, e, i) {
			if ("absolute" !== G(t, "position", i))return 0;
			var s = "left" === e ? "Left" : "Top", r = G(t, "margin" + s, i);
			return t["offset" + s] - ($(t, e, parseFloat(r), r.replace(y, "")) || 0)
		}, Q = function (t, e) {
			var i, s, r = {};
			if (e = e || W(t, null))if (i = e.length)for (; --i > -1;)r[e[i].replace(S, R)] = e.getPropertyValue(e[i]); else for (i in e)r[i] = e[i]; else if (e = t.currentStyle || t.style)for (i in e)"string" == typeof i && void 0 !== r[i] && (r[i.replace(S, R)] = e[i]);
			return U || (r.opacity = Y(t)), s = be(t, e, !1), r.rotation = s.rotation, r.skewX = s.skewX, r.scaleX = s.scaleX, r.scaleY = s.scaleY, r.x = s.x, r.y = s.y, xe && (r.z = s.z, r.rotationX = s.rotationX, r.rotationY = s.rotationY, r.scaleZ = s.scaleZ), r.filters && delete r.filters, r
		}, H = function (t, e, i, s, r) {
			var n, a, o, h = {}, l = t.style;
			for (a in i)"cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (h[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(v, "") ? n : 0 : Z(t, a), void 0 !== l[a] && (o = new ue(l, a, l[a], o)));
			if (s)for (a in s)"className" !== a && (h[a] = s[a]);
			return{difs: h, firstMPT: o}
		}, K = {
			width: ["Left", "Right"],
			height: ["Top", "Bottom"]
		}, J = ["marginLeft", "marginRight", "marginTop", "marginBottom"], te = function (t, e, i) {
			var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight), r = K[e], n = r.length;
			for (i = i || W(t, null); --n > -1;)s -= parseFloat(G(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat(G(t, "border" + r[n] + "Width", i, !0)) || 0;
			return s
		}, ee = function (t, e) {
			(null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
			var i = t.split(" "), s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0], r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
			return null == r ? r = "0" : "center" === r && (r = "50%"), ("center" === s || isNaN(parseFloat(s)) && -1 === (s + "").indexOf("=")) && (s = "50%"), e && (e.oxp = -1 !== s.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === s.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(s.replace(v, "")), e.oy = parseFloat(r.replace(v, ""))), s + " " + r + (i.length > 2 ? " " + i[2] : "")
		}, ie = function (t, e) {
			return"string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
		}, se = function (t, e) {
			return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * Number(t.substr(2)) + e : parseFloat(t)
		}, re = function (t, e, i, s) {
			var r, n, a, o, h = 1e-6;
			return null == t ? o = e : "number" == typeof t ? o = t : (r = 360, n = t.split("_"), a = Number(n[0].replace(v, "")) * (-1 === t.indexOf("rad") ? 1 : I) - ("=" === t.charAt(1) ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)), o = e + a), h > o && o > -h && (o = 0), o
		}, ne = {
			aqua: [0, 255, 255],
			lime: [0, 255, 0],
			silver: [192, 192, 192],
			black: [0, 0, 0],
			maroon: [128, 0, 0],
			teal: [0, 128, 128],
			blue: [0, 0, 255],
			navy: [0, 0, 128],
			white: [255, 255, 255],
			fuchsia: [255, 0, 255],
			olive: [128, 128, 0],
			yellow: [255, 255, 0],
			orange: [255, 165, 0],
			gray: [128, 128, 128],
			purple: [128, 0, 128],
			green: [0, 128, 0],
			red: [255, 0, 0],
			pink: [255, 192, 203],
			cyan: [0, 255, 255],
			transparent: [255, 255, 255, 0]
		}, ae = function (t, e, i) {
			return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
		}, oe = function (t) {
			var e, i, s, r, n, a;
			return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ne[t] ? ne[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), s = t.charAt(3), t = "#" + e + e + i + i + s + s), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), r = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ae(r + 1 / 3, e, i), t[1] = ae(r, e, i), t[2] = ae(r - 1 / 3, e, i), t) : (t = t.match(m) || ne.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : ne.black
		}, he = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
		for (h in ne)he += "|" + h + "\\b";
		he = RegExp(he + ")", "gi");
		var le = function (t, e, i, s) {
			if (null == t)return function (t) {
				return t
			};
			var r, n = e ? (t.match(he) || [""])[0] : "", a = t.split(n).join("").match(g) || [], o = t.substr(0, t.indexOf(a[0])), h = ")" === t.charAt(t.length - 1) ? ")" : "", l = -1 !== t.indexOf(" ") ? " " : ",", _ = a.length, u = _ > 0 ? a[0].replace(m, "") : "";
			return _ ? r = e ? function (t) {
				var e, p, c, f;
				if ("number" == typeof t)t += u; else if (s && D.test(t)) {
					for (f = t.replace(D, "|").split("|"), c = 0; f.length > c; c++)f[c] = r(f[c]);
					return f.join(",")
				}
				if (e = (t.match(he) || [n])[0], p = t.split(e).join("").match(g) || [], c = p.length, _ > c--)for (; _ > ++c;)p[c] = i ? p[0 | (c - 1) / 2] : a[c];
				return o + p.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
			} : function (t) {
				var e, n, p;
				if ("number" == typeof t)t += u; else if (s && D.test(t)) {
					for (n = t.replace(D, "|").split("|"), p = 0; n.length > p; p++)n[p] = r(n[p]);
					return n.join(",")
				}
				if (e = t.match(g) || [], p = e.length, _ > p--)for (; _ > ++p;)e[p] = i ? e[0 | (p - 1) / 2] : a[p];
				return o + e.join(l) + h
			} : function (t) {
				return t
			}
		}, _e = function (t) {
			return t = t.split(","), function (e, i, s, r, n, a, o) {
				var h, l = (i + "").split(" ");
				for (o = {}, h = 0; 4 > h; h++)o[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
				return r.parse(e, o, n, a)
			}
		}, ue = (X._setPluginRatio = function (t) {
			this.plugin.setRatio(t);
			for (var e, i, s, r, n = this.data, a = n.proxy, o = n.firstMPT, h = 1e-6; o;)e = a[o.v], o.r ? e = e > 0 ? 0 | e + .5 : 0 | e - .5 : h > e && e > -h && (e = 0), o.t[o.p] = e, o = o._next;
			if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)for (o = n.firstMPT; o;) {
				if (i = o.t, i.type) {
					if (1 === i.type) {
						for (r = i.xs0 + i.s + i.xs1, s = 1; i.l > s; s++)r += i["xn" + s] + i["xs" + (s + 1)];
						i.e = r
					}
				} else i.e = i.s + i.xs0;
				o = o._next
			}
		}, function (t, e, i, s, r) {
			this.t = t, this.p = e, this.v = i, this.r = r, s && (s._prev = this, this._next = s)
		}), pe = (X._parseToProxy = function (t, e, i, s, r, n) {
			var a, o, h, l, _, u = s, p = {}, c = {}, f = i._transform, m = E;
			for (i._transform = null, E = e, s = _ = i.parse(t, e, s, r), E = m, n && (i._transform = f, u && (u._prev = null, u._prev && (u._prev._next = null))); s && s !== u;) {
				if (1 >= s.type && (o = s.p, c[o] = s.s + s.c, p[o] = s.s, n || (l = new ue(s, "s", o, l, s.r), s.c = 0), 1 === s.type))for (a = s.l; --a > 0;)h = "xn" + a, o = s.p + "_" + h, c[o] = s.data[h], p[o] = s[h], n || (l = new ue(s, h, o, l, s.rxp[h]));
				s = s._next
			}
			return{proxy: p, end: c, firstMPT: l, pt: _}
		}, X.CSSPropTween = function (t, e, s, r, a, o, h, l, _, u, p) {
			this.t = t, this.p = e, this.s = s, this.c = r, this.n = h || e, t instanceof pe || n.push(this.n), this.r = l, this.type = o || 0, _ && (this.pr = _, i = !0), this.b = void 0 === u ? s : u, this.e = void 0 === p ? s + r : p, a && (this._next = a, a._prev = this)
		}), ce = a.parseComplex = function (t, e, i, s, r, n, a, o, h, _) {
			i = i || n || "", a = new pe(t, e, 0, 0, a, _ ? 2 : 1, null, !1, o, i, s), s += "";
			var u, p, c, f, g, v, y, T, w, x, P, S, k = i.split(", ").join(",").split(" "), R = s.split(", ").join(",").split(" "), A = k.length, C = l !== !1;
			for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (k = k.join(" ").replace(D, ", ").split(" "), R = R.join(" ").replace(D, ", ").split(" "), A = k.length), A !== R.length && (k = (n || "").split(" "), A = k.length), a.plugin = h, a.setRatio = _, u = 0; A > u; u++)if (f = k[u], g = R[u], T = parseFloat(f), T || 0 === T)a.appendXtra("", T, ie(g, T), g.replace(d, ""), C && -1 !== g.indexOf("px"), !0); else if (r && ("#" === f.charAt(0) || ne[f] || b.test(f)))S = "," === g.charAt(g.length - 1) ? ")," : ")", f = oe(f), g = oe(g), w = f.length + g.length > 6, w && !U && 0 === g[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(R[u]).join("transparent")) : (U || (w = !1), a.appendXtra(w ? "rgba(" : "rgb(", f[0], g[0] - f[0], ",", !0, !0).appendXtra("", f[1], g[1] - f[1], ",", !0).appendXtra("", f[2], g[2] - f[2], w ? "," : S, !0), w && (f = 4 > f.length ? 1 : f[3], a.appendXtra("", f, (4 > g.length ? 1 : g[3]) - f, S, !1))); else if (v = f.match(m)) {
				if (y = g.match(d), !y || y.length !== v.length)return a;
				for (c = 0, p = 0; v.length > p; p++)P = v[p], x = f.indexOf(P, c), a.appendXtra(f.substr(c, x - c), Number(P), ie(y[p], P), "", C && "px" === f.substr(x + P.length, 2), 0 === p), c = x + P.length;
				a["xs" + a.l] += f.substr(c)
			} else a["xs" + a.l] += a.l ? " " + f : f;
			if (-1 !== s.indexOf("=") && a.data) {
				for (S = a.xs0 + a.data.s, u = 1; a.l > u; u++)S += a["xs" + u] + a.data["xn" + u];
				a.e = S + a["xs" + u]
			}
			return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
		}, fe = 9;
		for (h = pe.prototype, h.l = h.pr = 0; --fe > 0;)h["xn" + fe] = 0, h["xs" + fe] = "";
		h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function (t, e, i, s, r, n) {
			var a = this, o = a.l;
			return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new pe(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {s: e + i}, a.rxp = {}, a.s = e, a.c = i, a.r = r, a)) : (a["xs" + o] += e + (s || ""), a)
		};
		var me = function (t, e) {
			e = e || {}, this.p = e.prefix ? V(t) || t : t, o[t] = o[this.p] = this, this.format = e.formatter || le(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
		}, de = X._registerComplexSpecialProp = function (t, e, i) {
			"object" != typeof e && (e = {parser: i});
			var s, r, n = t.split(","), a = e.defaultValue;
			for (i = i || [a], s = 0; n.length > s; s++)e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || a, r = new me(n[s], e)
		}, ge = function (t) {
			if (!o[t]) {
				var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
				de(t, {
					parser: function (t, i, s, r, n, a, h) {
						var l = (window.GreenSockGlobals || window).com.greensock.plugins[e];
						return l ? (l._cssRegister(), o[s].parse(t, i, s, r, n, a, h)) : (j("Error: " + e + " js file not loaded."), n)
					}
				})
			}
		};
		h = me.prototype, h.parseComplex = function (t, e, i, s, r, n) {
			var a, o, h, l, _, u, p = this.keyword;
			if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), h = i.replace(D, "|").split("|")) : p && (o = [e], h = [i])), h) {
				for (l = h.length > o.length ? h.length : o.length, a = 0; l > a; a++)e = o[a] = o[a] || this.dflt, i = h[a] = h[a] || this.dflt, p && (_ = e.indexOf(p), u = i.indexOf(p), _ !== u && (i = -1 === u ? h : o, i[a] += " " + p));
				e = o.join(", "), i = h.join(", ")
			}
			return ce(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
		}, h.parse = function (t, e, i, s, n, a) {
			return this.parseComplex(t.style, this.format(G(t, this.p, r, !1, this.dflt)), this.format(e), n, a)
		}, a.registerSpecialProp = function (t, e, i) {
			de(t, {
				parser: function (t, s, r, n, a, o) {
					var h = new pe(t, r, 0, 0, a, 2, r, !1, i);
					return h.plugin = o, h.setRatio = e(t, s, n._tween, r), h
				}, priority: i
			})
		};
		var ve = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","), ye = V("transform"), Te = B + "transform", we = V("transformOrigin"), xe = null !== V("perspective"), be = function (t, e, i, s) {
			if (t._gsTransform && i && !s)return t._gsTransform;
			var r, n, o, h, l, _, u, p, c, f, m, d, g, v = i ? t._gsTransform || {skewY: 0} : {skewY: 0}, y = 0 > v.scaleX, T = 2e-5, w = 1e5, x = 179.99, b = x * M, P = xe ? parseFloat(G(t, we, e, !1, "0 0 0").split(" ")[2]) || v.zOrigin || 0 : 0;
			for (ye ? r = G(t, Te, e, !0) : t.currentStyle && (r = t.currentStyle.filter.match(C), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), v.x || 0, v.y || 0].join(",") : ""), n = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], o = n.length; --o > -1;)h = Number(n[o]), n[o] = (l = h - (h |= 0)) ? (0 | l * w + (0 > l ? -.5 : .5)) / w + h : h;
			if (16 === n.length) {
				var S = n[8], k = n[9], R = n[10], A = n[12], O = n[13], D = n[14];
				if (v.zOrigin && (D = -v.zOrigin, A = S * D - n[12], O = k * D - n[13], D = R * D + v.zOrigin - n[14]), !i || s || null == v.rotationX) {
					var E, N, F, L, X, z, U, Y = n[0], j = n[1], B = n[2], q = n[3], V = n[4], W = n[5], $ = n[6], Z = n[7], Q = n[11], H = Math.atan2($, R), K = -b > H || H > b;
					v.rotationX = H * I, H && (L = Math.cos(-H), X = Math.sin(-H), E = V * L + S * X, N = W * L + k * X, F = $ * L + R * X, S = V * -X + S * L, k = W * -X + k * L, R = $ * -X + R * L, Q = Z * -X + Q * L, V = E, W = N, $ = F), H = Math.atan2(S, Y), v.rotationY = H * I, H && (z = -b > H || H > b, L = Math.cos(-H), X = Math.sin(-H), E = Y * L - S * X, N = j * L - k * X, F = B * L - R * X, k = j * X + k * L, R = B * X + R * L, Q = q * X + Q * L, Y = E, j = N, B = F), H = Math.atan2(j, W), v.rotation = H * I, H && (U = -b > H || H > b, L = Math.cos(-H), X = Math.sin(-H), Y = Y * L + V * X, N = j * L + W * X, W = j * -X + W * L, $ = B * -X + $ * L, j = N), U && K ? v.rotation = v.rotationX = 0 : U && z ? v.rotation = v.rotationY = 0 : z && K && (v.rotationY = v.rotationX = 0), v.scaleX = (0 | Math.sqrt(Y * Y + j * j) * w + .5) / w, v.scaleY = (0 | Math.sqrt(W * W + k * k) * w + .5) / w, v.scaleZ = (0 | Math.sqrt($ * $ + R * R) * w + .5) / w, v.skewX = 0, v.perspective = Q ? 1 / (0 > Q ? -Q : Q) : 0, v.x = A, v.y = O, v.z = D
				}
			} else if (!(xe && !s && n.length && v.x === n[4] && v.y === n[5] && (v.rotationX || v.rotationY) || void 0 !== v.x && "none" === G(t, "display", e))) {
				var J = n.length >= 6, te = J ? n[0] : 1, ee = n[1] || 0, ie = n[2] || 0, se = J ? n[3] : 1;
				v.x = n[4] || 0, v.y = n[5] || 0, _ = Math.sqrt(te * te + ee * ee), u = Math.sqrt(se * se + ie * ie), p = te || ee ? Math.atan2(ee, te) * I : v.rotation || 0, c = ie || se ? Math.atan2(ie, se) * I + p : v.skewX || 0, f = _ - Math.abs(v.scaleX || 0), m = u - Math.abs(v.scaleY || 0), Math.abs(c) > 90 && 270 > Math.abs(c) && (y ? (_ *= -1, c += 0 >= p ? 180 : -180, p += 0 >= p ? 180 : -180) : (u *= -1, c += 0 >= c ? 180 : -180)), d = (p - v.rotation) % 180, g = (c - v.skewX) % 180, (void 0 === v.skewX || f > T || -T > f || m > T || -T > m || d > -x && x > d && false | d * w || g > -x && x > g && false | g * w) && (v.scaleX = _, v.scaleY = u, v.rotation = p, v.skewX = c), xe && (v.rotationX = v.rotationY = v.z = 0, v.perspective = parseFloat(a.defaultTransformPerspective) || 0, v.scaleZ = 1)
			}
			v.zOrigin = P;
			for (o in v)T > v[o] && v[o] > -T && (v[o] = 0);
			return i && (t._gsTransform = v), v
		}, Pe = function (t) {
			var e, i, s = this.data, r = -s.rotation * M, n = r + s.skewX * M, a = 1e5, o = (0 | Math.cos(r) * s.scaleX * a) / a, h = (0 | Math.sin(r) * s.scaleX * a) / a, l = (0 | Math.sin(n) * -s.scaleY * a) / a, _ = (0 | Math.cos(n) * s.scaleY * a) / a, u = this.t.style, p = this.t.currentStyle;
			if (p) {
				i = h, h = -l, l = -i, e = p.filter, u.filter = "";
				var c, m, d = this.t.offsetWidth, g = this.t.offsetHeight, v = "absolute" !== p.position, w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + h + ", M21=" + l + ", M22=" + _, x = s.x, b = s.y;
				if (null != s.ox && (c = (s.oxp ? .01 * d * s.ox : s.ox) - d / 2, m = (s.oyp ? .01 * g * s.oy : s.oy) - g / 2, x += c - (c * o + m * h), b += m - (c * l + m * _)), v ? (c = d / 2, m = g / 2, w += ", Dx=" + (c - (c * o + m * h) + x) + ", Dy=" + (m - (c * l + m * _) + b) + ")") : w += ", sizingMethod='auto expand')", u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, w) : w + " " + e, (0 === t || 1 === t) && 1 === o && 0 === h && 0 === l && 1 === _ && (v && -1 === w.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
					var P, S, k, R = 8 > f ? 1 : -1;
					for (c = s.ieOffsetX || 0, m = s.ieOffsetY || 0, s.ieOffsetX = Math.round((d - ((0 > o ? -o : o) * d + (0 > h ? -h : h) * g)) / 2 + x), s.ieOffsetY = Math.round((g - ((0 > _ ? -_ : _) * g + (0 > l ? -l : l) * d)) / 2 + b), fe = 0; 4 > fe; fe++)S = J[fe], P = p[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : $(this.t, S, parseFloat(P), P.replace(y, "")) || 0, k = i !== s[S] ? 2 > fe ? -s.ieOffsetX : -s.ieOffsetY : 2 > fe ? c - s.ieOffsetX : m - s.ieOffsetY, u[S] = (s[S] = Math.round(i - k * (0 === fe || 2 === fe ? 1 : R))) + "px"
				}
			}
		}, Se = function () {
			var t, e, i, s, r, n, a, o, h, l, _, u, c, f, m, d, g, v, y, T, w, x, b, P = this.data, S = this.t.style, k = P.rotation * M, R = P.scaleX, A = P.scaleY, C = P.scaleZ, O = P.perspective;
			if (p) {
				var D = 1e-4;
				D > R && R > -D && (R = C = 2e-5), D > A && A > -D && (A = C = 2e-5), !O || P.z || P.rotationX || P.rotationY || (O = 0)
			}
			if (k || P.skewX)v = Math.cos(k), y = Math.sin(k), t = v, r = y, P.skewX && (k -= P.skewX * M, v = Math.cos(k), y = Math.sin(k)), e = -y, n = v; else {
				if (!(P.rotationY || P.rotationX || 1 !== C || O))return S[ye] = "translate3d(" + P.x + "px," + P.y + "px," + P.z + "px)" + (1 !== R || 1 !== A ? " scale(" + R + "," + A + ")" : ""), void 0;
				t = n = 1, e = r = 0
			}
			_ = 1, i = s = a = o = h = l = u = c = f = 0, m = O ? -1 / O : 0, d = P.zOrigin, g = 1e5, k = P.rotationY * M, k && (v = Math.cos(k), y = Math.sin(k), h = _ * -y, c = m * -y, i = t * y, a = r * y, _ *= v, m *= v, t *= v, r *= v), k = P.rotationX * M, k && (v = Math.cos(k), y = Math.sin(k), T = e * v + i * y, w = n * v + a * y, x = l * v + _ * y, b = f * v + m * y, i = e * -y + i * v, a = n * -y + a * v, _ = l * -y + _ * v, m = f * -y + m * v, e = T, n = w, l = x, f = b), 1 !== C && (i *= C, a *= C, _ *= C, m *= C), 1 !== A && (e *= A, n *= A, l *= A, f *= A), 1 !== R && (t *= R, r *= R, h *= R, c *= R), d && (u -= d, s = i * u, o = a * u, u = _ * u + d), s = (T = (s += P.x) - (s |= 0)) ? (0 | T * g + (0 > T ? -.5 : .5)) / g + s : s, o = (T = (o += P.y) - (o |= 0)) ? (0 | T * g + (0 > T ? -.5 : .5)) / g + o : o, u = (T = (u += P.z) - (u |= 0)) ? (0 | T * g + (0 > T ? -.5 : .5)) / g + u : u, S[ye] = "matrix3d(" + [(0 | t * g) / g, (0 | r * g) / g, (0 | h * g) / g, (0 | c * g) / g, (0 | e * g) / g, (0 | n * g) / g, (0 | l * g) / g, (0 | f * g) / g, (0 | i * g) / g, (0 | a * g) / g, (0 | _ * g) / g, (0 | m * g) / g, s, o, u, O ? 1 + -u / O : 1].join(",") + ")"
		}, ke = function (t) {
			var e, i, s, r, n, a = this.data, o = this.t, h = o.style;
			return a.rotationX || a.rotationY || a.z || a.force3D ? (this.setRatio = Se, Se.call(this, t), void 0) : (a.rotation || a.skewX ? (e = a.rotation * M, i = e - a.skewX * M, s = 1e5, r = a.scaleX * s, n = a.scaleY * s, h[ye] = "matrix(" + (0 | Math.cos(e) * r) / s + "," + (0 | Math.sin(e) * r) / s + "," + (0 | Math.sin(i) * -n) / s + "," + (0 | Math.cos(i) * n) / s + "," + a.x + "," + a.y + ")") : h[ye] = "matrix(" + a.scaleX + ",0,0," + a.scaleY + "," + a.x + "," + a.y + ")", void 0)
		};
		de("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D", {
			parser: function (t, e, i, s, n, a, o) {
				if (s._transform)return n;
				var h, l, _, u, p, c, f, m = s._transform = be(t, r, !0, o.parseTransform), d = t.style, g = 1e-6, v = ve.length, y = o, T = {};
				if ("string" == typeof y.transform && ye)_ = d.cssText, d[ye] = y.transform, d.display = "block", h = be(t, null, !1), d.cssText = _; else if ("object" == typeof y) {
					if (h = {
							scaleX: se(null != y.scaleX ? y.scaleX : y.scale, m.scaleX),
							scaleY: se(null != y.scaleY ? y.scaleY : y.scale, m.scaleY),
							scaleZ: se(y.scaleZ, m.scaleZ),
							x: se(y.x, m.x),
							y: se(y.y, m.y),
							z: se(y.z, m.z),
							perspective: se(y.transformPerspective, m.perspective)
						}, f = y.directionalRotation, null != f)if ("object" == typeof f)for (_ in f)y[_] = f[_]; else y.rotation = f;
					h.rotation = re("rotation"in y ? y.rotation : "shortRotation"in y ? y.shortRotation + "_short" : "rotationZ"in y ? y.rotationZ : m.rotation, m.rotation, "rotation", T), xe && (h.rotationX = re("rotationX"in y ? y.rotationX : "shortRotationX"in y ? y.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", T), h.rotationY = re("rotationY"in y ? y.rotationY : "shortRotationY"in y ? y.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", T)), h.skewX = null == y.skewX ? m.skewX : re(y.skewX, m.skewX), h.skewY = null == y.skewY ? m.skewY : re(y.skewY, m.skewY), (l = h.skewY - m.skewY) && (h.skewX += l, h.rotation += l)
				}
				for (xe && null != y.force3D && (m.force3D = y.force3D, c = !0), p = m.force3D || m.z || m.rotationX || m.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, p || null == y.scale || (h.scaleZ = 1); --v > -1;)i = ve[v], u = h[i] - m[i], (u > g || -g > u || null != E[i]) && (c = !0, n = new pe(m, i, m[i], u, n), i in T && (n.e = T[i]), n.xs0 = 0, n.plugin = a, s._overwriteProps.push(n.n));
				return u = y.transformOrigin, (u || xe && p && m.zOrigin) && (ye ? (c = !0, i = we, u = (u || G(t, i, r, !1, "50% 50%")) + "", n = new pe(d, i, 0, 0, n, -1, "transformOrigin"), n.b = d[i], n.plugin = a, xe ? (_ = m.zOrigin, u = u.split(" "), m.zOrigin = (u.length > 2 && (0 === _ || "0px" !== u[2]) ? parseFloat(u[2]) : _) || 0, n.xs0 = n.e = d[i] = u[0] + " " + (u[1] || "50%") + " 0px", n = new pe(m, "zOrigin", 0, 0, n, -1, n.n), n.b = _, n.xs0 = n.e = m.zOrigin) : n.xs0 = n.e = d[i] = u) : ee(u + "", m)), c && (s._transformType = p || 3 === this._transformType ? 3 : 2), n
			}, prefix: !0
		}), de("boxShadow", {
			defaultValue: "0px 0px 0px 0px #999",
			prefix: !0,
			color: !0,
			multi: !0,
			keyword: "inset"
		}), de("borderRadius", {
			defaultValue: "0px", parser: function (t, e, i, n, a) {
				e = this.format(e);
				var o, h, l, _, u, p, c, f, m, d, g, v, y, T, w, x, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], P = t.style;
				for (m = parseFloat(t.offsetWidth), d = parseFloat(t.offsetHeight), o = e.split(" "), h = 0; b.length > h; h++)this.p.indexOf("border") && (b[h] = V(b[h])), u = _ = G(t, b[h], r, !1, "0px"), -1 !== u.indexOf(" ") && (_ = u.split(" "), u = _[0], _ = _[1]), p = l = o[h], c = parseFloat(u), v = u.substr((c + "").length), y = "=" === p.charAt(1), y ? (f = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), f *= parseFloat(p), g = p.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(p), g = p.substr((f + "").length)), "" === g && (g = s[i] || v), g !== v && (T = $(t, "borderLeft", c, v), w = $(t, "borderTop", c, v), "%" === g ? (u = 100 * (T / m) + "%", _ = 100 * (w / d) + "%") : "em" === g ? (x = $(t, "borderLeft", 1, "em"), u = T / x + "em", _ = w / x + "em") : (u = T + "px", _ = w + "px"), y && (p = parseFloat(u) + f + g, l = parseFloat(_) + f + g)), a = ce(P, b[h], u + " " + _, p + " " + l, !1, "0px", a);
				return a
			}, prefix: !0, formatter: le("0px 0px 0px 0px", !1, !0)
		}), de("backgroundPosition", {
			defaultValue: "0 0", parser: function (t, e, i, s, n, a) {
				var o, h, l, _, u, p, c = "background-position", m = r || W(t, null), d = this.format((m ? f ? m.getPropertyValue(c + "-x") + " " + m.getPropertyValue(c + "-y") : m.getPropertyValue(c) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), g = this.format(e);
				if (-1 !== d.indexOf("%") != (-1 !== g.indexOf("%")) && (p = G(t, "backgroundImage").replace(k, ""), p && "none" !== p)) {
					for (o = d.split(" "), h = g.split(" "), L.setAttribute("src", p), l = 2; --l > -1;)d = o[l], _ = -1 !== d.indexOf("%"), _ !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - L.width : t.offsetHeight - L.height, o[l] = _ ? parseFloat(d) / 100 * u + "px" : 100 * (parseFloat(d) / u) + "%");
					d = o.join(" ")
				}
				return this.parseComplex(t.style, d, g, n, a)
			}, formatter: ee
		}), de("backgroundSize", {defaultValue: "0 0", formatter: ee}), de("perspective", {
			defaultValue: "0px",
			prefix: !0
		}), de("perspectiveOrigin", {
			defaultValue: "50% 50%",
			prefix: !0
		}), de("transformStyle", {prefix: !0}), de("backfaceVisibility", {prefix: !0}), de("userSelect", {prefix: !0}), de("margin", {parser: _e("marginTop,marginRight,marginBottom,marginLeft")}), de("padding", {parser: _e("paddingTop,paddingRight,paddingBottom,paddingLeft")}), de("clip", {
			defaultValue: "rect(0px,0px,0px,0px)",
			parser: function (t, e, i, s, n, a) {
				var o, h, l;
				return 9 > f ? (h = t.currentStyle, l = 8 > f ? " " : ",", o = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (o = this.format(G(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
			}
		}), de("textShadow", {
			defaultValue: "0px 0px 0px #999",
			color: !0,
			multi: !0
		}), de("autoRound,strictUnits", {
			parser: function (t, e, i, s, r) {
				return r
			}
		}), de("border", {
			defaultValue: "0px solid #000", parser: function (t, e, i, s, n, a) {
				return this.parseComplex(t.style, this.format(G(t, "borderTopWidth", r, !1, "0px") + " " + G(t, "borderTopStyle", r, !1, "solid") + " " + G(t, "borderTopColor", r, !1, "#000")), this.format(e), n, a)
			}, color: !0, formatter: function (t) {
				var e = t.split(" ");
				return e[0] + " " + (e[1] || "solid") + " " + (t.match(he) || ["#000"])[0]
			}
		}), de("borderWidth", {parser: _e("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), de("float,cssFloat,styleFloat", {
			parser: function (t, e, i, s, r) {
				var n = t.style, a = "cssFloat"in n ? "cssFloat" : "styleFloat";
				return new pe(n, a, 0, 0, r, -1, i, !1, 0, n[a], e)
			}
		});
		var Re = function (t) {
			var e, i = this.t, s = i.filter || G(this.data, "filter"), r = 0 | this.s + this.c * t;
			100 === r && (-1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"), e = !G(this.data, "filter")) : (i.filter = s.replace(x, ""), e = !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"), -1 === s.indexOf("opacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(T, "opacity=" + r))
		};
		de("opacity,alpha,autoAlpha", {
			defaultValue: "1", parser: function (t, e, i, s, n, a) {
				var o = parseFloat(G(t, "opacity", r, !1, "1")), h = t.style, l = "autoAlpha" === i;
				return"string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), l && 1 === o && "hidden" === G(t, "visibility", r) && 0 !== e && (o = 0), U ? n = new pe(h, "opacity", o, e - o, n) : (n = new pe(h, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = l ? 1 : 0, h.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Re), l && (n = new pe(h, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", s._overwriteProps.push(n.n), s._overwriteProps.push(i)), n
			}
		});
		var Ae = function (t, e) {
			e && (t.removeProperty ? t.removeProperty(e.replace(P, "-$1").toLowerCase()) : t.removeAttribute(e))
		}, Ce = function (t) {
			if (this.t._gsClassPT = this, 1 === t || 0 === t) {
				this.t.className = 0 === t ? this.b : this.e;
				for (var e = this.data, i = this.t.style; e;)e.v ? i[e.p] = e.v : Ae(i, e.p), e = e._next;
				1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
			} else this.t.className !== this.e && (this.t.className = this.e)
		};
		de("className", {
			parser: function (t, e, s, n, a, o, h) {
				var l, _, u, p, c, f = t.className, m = t.style.cssText;
				if (a = n._classNamePT = new pe(t, s, 0, 0, a, 2), a.setRatio = Ce, a.pr = -11, i = !0, a.b = f, _ = Q(t, r), u = t._gsClassPT) {
					for (p = {}, c = u.data; c;)p[c.p] = 1, c = c._next;
					u.setRatio(1)
				}
				return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), n._tween._duration && (t.className = a.e, l = H(t, _, Q(t), h, p), t.className = f, a.data = l.firstMPT, t.style.cssText = m, a = a.xfirst = n.parse(t, l.difs, a, o)), a
			}
		});
		var Oe = function (t) {
			if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
				var e, i, s, r, n = this.t.style, a = o.transform.parse;
				if ("all" === this.e)n.cssText = "", r = !0; else for (e = this.e.split(","), s = e.length; --s > -1;)i = e[s], o[i] && (o[i].parse === a ? r = !0 : i = "transformOrigin" === i ? we : o[i].p), Ae(n, i);
				r && (Ae(n, ye), this.t._gsTransform && delete this.t._gsTransform)
			}
		};
		for (de("clearProps", {
			parser: function (t, e, s, r, n) {
				return n = new pe(t, s, 0, 0, n, 2), n.setRatio = Oe, n.e = e, n.pr = -10, n.data = r._tween, i = !0, n
			}
		}), h = "bezier,throwProps,physicsProps,physics2D".split(","), fe = h.length; fe--;)ge(h[fe]);
		h = a.prototype, h._firstPT = null, h._onInitTween = function (t, e, o) {
			if (!t.nodeType)return!1;
			this._target = t, this._tween = o, this._vars = e, l = e.autoRound, i = !1, s = e.suffixMap || a.suffixMap, r = W(t, ""), n = this._overwriteProps;
			var h, p, f, m, d, g, v, y, T, x = t.style;
			if (_ && "" === x.zIndex && (h = G(t, "zIndex", r), ("auto" === h || "" === h) && (x.zIndex = 0)), "string" == typeof e && (m = x.cssText, h = Q(t, r), x.cssText = m + ";" + e, h = H(t, h, Q(t)).difs, !U && w.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, x.cssText = m), this._firstPT = p = this.parse(t, e, null), this._transformType) {
				for (T = 3 === this._transformType, ye ? u && (_ = !0, "" === x.zIndex && (v = G(t, "zIndex", r), ("auto" === v || "" === v) && (x.zIndex = 0)), c && (x.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : x.zoom = 1, f = p; f && f._next;)f = f._next;
				y = new pe(t, "transform", 0, 0, null, 2), this._linkCSSP(y, null, f), y.setRatio = T && xe ? Se : ye ? ke : Pe, y.data = this._transform || be(t, r, !0), n.pop()
			}
			if (i) {
				for (; p;) {
					for (g = p._next, f = m; f && f.pr > p.pr;)f = f._next;
					(p._prev = f ? f._prev : d) ? p._prev._next = p : m = p, (p._next = f) ? f._prev = p : d = p, p = g
				}
				this._firstPT = m
			}
			return!0
		}, h.parse = function (t, e, i, n) {
			var a, h, _, u, p, c, f, m, d, g, v = t.style;
			for (a in e)c = e[a], h = o[a], h ? i = h.parse(t, c, a, this, i, n, e) : (p = G(t, a, r) + "", d = "string" == typeof c, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || d && b.test(c) ? (d || (c = oe(c), c = (c.length > 3 ? "rgba(" : "rgb(") + c.join(",") + ")"), i = ce(v, a, p, c, !0, "transparent", i, 0, n)) : !d || -1 === c.indexOf(" ") && -1 === c.indexOf(",") ? (_ = parseFloat(p), f = _ || 0 === _ ? p.substr((_ + "").length) : "", ("" === p || "auto" === p) && ("width" === a || "height" === a ? (_ = te(t, a, r), f = "px") : "left" === a || "top" === a ? (_ = Z(t, a, r), f = "px") : (_ = "opacity" !== a ? 0 : 1, f = "")), g = d && "=" === c.charAt(1), g ? (u = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), u *= parseFloat(c), m = c.replace(y, "")) : (u = parseFloat(c), m = d ? c.substr((u + "").length) || "" : ""), "" === m && (m = a in s ? s[a] : f), c = u || 0 === u ? (g ? u + _ : u) + m : e[a], f !== m && "" !== m && (u || 0 === u) && (_ || 0 === _) && (_ = $(t, a, _, f), "%" === m ? (_ /= $(t, a, 100, "%") / 100, e.strictUnits !== !0 && (p = _ + "%")) : "em" === m ? _ /= $(t, a, 1, "em") : (u = $(t, a, u, m), m = "px"), g && (u || 0 === u) && (c = u + _ + m)), g && (u += _), !_ && 0 !== _ || !u && 0 !== u ? void 0 !== v[a] && (c || "NaN" != c + "" && null != c) ? (i = new pe(v, a, u || _ || 0, 0, i, -1, a, !1, 0, p, c), i.xs0 = "none" !== c || "display" !== a && -1 === a.indexOf("Style") ? c : p) : j("invalid " + a + " tween value: " + e[a]) : (i = new pe(v, a, _, u - _, i, 0, a, l !== !1 && ("px" === m || "zIndex" === a), 0, p, c), i.xs0 = m)) : i = ce(v, a, p, c, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
			return i
		}, h.setRatio = function (t) {
			var e, i, s, r = this._firstPT, n = 1e-6;
			if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)for (; r;) {
				if (e = r.c * t + r.s, r.r ? e = e > 0 ? 0 | e + .5 : 0 | e - .5 : n > e && e > -n && (e = 0), r.type)if (1 === r.type)if (s = r.l, 2 === s)r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2; else if (3 === s)r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3; else if (4 === s)r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4; else if (5 === s)r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5; else {
					for (i = r.xs0 + e + r.xs1, s = 1; r.l > s; s++)i += r["xn" + s] + r["xs" + (s + 1)];
					r.t[r.p] = i
				} else-1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t); else r.t[r.p] = e + r.xs0;
				r = r._next
			} else for (; r;)2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next; else for (; r;)2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
		}, h._enableTransforms = function (t) {
			this._transformType = t || 3 === this._transformType ? 3 : 2, this._transform = this._transform || be(this._target, r, !0)
		}, h._linkCSSP = function (t, e, i, s) {
			return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, s = !0), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
		}, h._kill = function (e) {
			var i, s, r, n = e;
			if (e.autoAlpha || e.alpha) {
				n = {};
				for (s in e)n[s] = e[s];
				n.opacity = 1, n.autoAlpha && (n.visibility = 1)
			}
			return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
		};
		var De = function (t, e, i) {
			var s, r, n, a;
			if (t.slice)for (r = t.length; --r > -1;)De(t[r], e, i); else for (s = t.childNodes, r = s.length; --r > -1;)n = s[r], a = n.type, n.style && (e.push(Q(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || De(n, e, i)
		};
		return a.cascadeTo = function (t, i, s) {
			var r, n, a, o = e.to(t, i, s), h = [o], l = [], _ = [], u = [], p = e._internals.reservedProps;
			for (t = o._targets || o.target, De(t, l, u), o.render(i, !0), De(t, _), o.render(0, !0), o._enabled(!0), r = u.length; --r > -1;)if (n = H(u[r], l[r], _[r]), n.firstMPT) {
				n = n.difs;
				for (a in s)p[a] && (n[a] = s[a]);
				h.push(e.to(u[r], i, n))
			}
			return h
		}, t.activate([a]), a
	}, !0), function () {
		var t = window._gsDefine.plugin({
			propName: "roundProps", priority: -1, API: 2, init: function (t, e, i) {
				return this._tween = i, !0
			}
		}), e = t.prototype;
		e._onInitAllProps = function () {
			for (var t, e, i, s = this._tween, r = s.vars.roundProps instanceof Array ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; --n > -1;)a[r[n]] = 1;
			for (n = r.length; --n > -1;)for (t = r[n], e = s._firstPT; e;)i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i), e._next = e._prev = null, s._propLookup[t] = o), e = i;
			return!1
		}, e._add = function (t, e, i, s) {
			this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e)
		}
	}(), window._gsDefine.plugin({
		propName: "attr", API: 2, version: "0.2.0", init: function (t, e) {
			var i;
			if ("function" != typeof t.setAttribute)return!1;
			this._target = t, this._proxy = {};
			for (i in e)this._addTween(this._proxy, i, parseFloat(t.getAttribute(i)), e[i], i) && this._overwriteProps.push(i);
			return!0
		}, set: function (t) {
			this._super.setRatio.call(this, t);
			for (var e, i = this._overwriteProps, s = i.length; --s > -1;)e = i[s], this._target.setAttribute(e, this._proxy[e] + "")
		}
	}), window._gsDefine.plugin({
		propName: "directionalRotation", API: 2, version: "0.2.0", init: function (t, e) {
			"object" != typeof e && (e = {rotation: e}), this.finals = {};
			var i, s, r, n, a, o, h = e.useRadians === !0 ? 2 * Math.PI : 360, l = 1e-6;
			for (i in e)"useRadians" !== i && (o = (e[i] + "").split("_"), s = o[0], r = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), n = this.finals[i] = "string" == typeof s && "=" === s.charAt(1) ? r + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, a = n - r, o.length && (s = o.join("_"), -1 !== s.indexOf("short") && (a %= h, a !== a % (h / 2) && (a = 0 > a ? a + h : a - h)), -1 !== s.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * h) % h - (0 | a / h) * h : -1 !== s.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * h) % h - (0 | a / h) * h)), (a > l || -l > a) && (this._addTween(t, i, r, r + a, i), this._overwriteProps.push(i)));
			return!0
		}, set: function (t) {
			var e;
			if (1 !== t)this._super.setRatio.call(this, t); else for (e = this._firstPT; e;)e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
		}
	})._autoCSS = !0, window._gsDefine("easing.Back", ["easing.Ease"], function (t) {
		var e, i, s, r = window.GreenSockGlobals || window, n = r.com.greensock, a = 2 * Math.PI, o = Math.PI / 2, h = n._class, l = function (e, i) {
			var s = h("easing." + e, function () {
			}, !0), r = s.prototype = new t;
			return r.constructor = s, r.getRatio = i, s
		}, _ = t.register || function () {
			}, u = function (t, e, i, s) {
			var r = h("easing." + t, {easeOut: new e, easeIn: new i, easeInOut: new s}, !0);
			return _(r, t), r
		}, p = function (t, e, i) {
			this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
		}, c = function (e, i) {
			var s = h("easing." + e, function (t) {
				this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
			}, !0), r = s.prototype = new t;
			return r.constructor = s, r.getRatio = i, r.config = function (t) {
				return new s(t)
			}, s
		}, f = u("Back", c("BackOut", function (t) {
			return(t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
		}), c("BackIn", function (t) {
			return t * t * ((this._p1 + 1) * t - this._p1)
		}), c("BackInOut", function (t) {
			return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
		})), m = h("easing.SlowMo", function (t, e, i) {
			e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
		}, !0), d = m.prototype = new t;
		return d.constructor = m, d.getRatio = function (t) {
			var e = t + (.5 - t) * this._p;
			return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
		}, m.ease = new m(.7, .7), d.config = m.config = function (t, e, i) {
			return new m(t, e, i)
		}, e = h("easing.SteppedEase", function (t) {
			t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
		}, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function (t) {
			return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
		}, d.config = e.config = function (t) {
			return new e(t)
		}, i = h("easing.RoughEase", function (e) {
			e = e || {};
			for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), c = u, f = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --c > -1;)i = f ? Math.random() : 1 / u * c, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), f ? s += Math.random() * r - .5 * r : c % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
				x: i,
				y: s
			};
			for (l.sort(function (t, e) {
				return t.x - e.x
			}), o = new p(1, 1, null), c = u; --c > -1;)a = l[c], o = new p(a.x, a.y, o);
			this._prev = new p(0, 0, 0 !== o.t ? o : o.next)
		}, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function (t) {
			var e = this._prev;
			if (t > e.t) {
				for (; e.next && t >= e.t;)e = e.next;
				e = e.prev
			} else for (; e.prev && e.t >= t;)e = e.prev;
			return this._prev = e, e.v + (t - e.t) / e.gap * e.c
		}, d.config = function (t) {
			return new i(t)
		}, i.ease = new i, u("Bounce", l("BounceOut", function (t) {
			return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
		}), l("BounceIn", function (t) {
			return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
		}), l("BounceInOut", function (t) {
			var e = .5 > t;
			return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
		})), u("Circ", l("CircOut", function (t) {
			return Math.sqrt(1 - (t -= 1) * t)
		}), l("CircIn", function (t) {
			return-(Math.sqrt(1 - t * t) - 1)
		}), l("CircInOut", function (t) {
			return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
		})), s = function (e, i, s) {
			var r = h("easing." + e, function (t, e) {
				this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0)
			}, !0), n = r.prototype = new t;
			return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
				return new r(t, e)
			}, r
		}, u("Elastic", s("ElasticOut", function (t) {
			return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1
		}, .3), s("ElasticIn", function (t) {
			return-(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2))
		}, .3), s("ElasticInOut", function (t) {
			return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1
		}, .45)), u("Expo", l("ExpoOut", function (t) {
			return 1 - Math.pow(2, -10 * t)
		}), l("ExpoIn", function (t) {
			return Math.pow(2, 10 * (t - 1)) - .001
		}), l("ExpoInOut", function (t) {
			return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
		})), u("Sine", l("SineOut", function (t) {
			return Math.sin(t * o)
		}), l("SineIn", function (t) {
			return-Math.cos(t * o) + 1
		}), l("SineInOut", function (t) {
			return-.5 * (Math.cos(Math.PI * t) - 1)
		})), h("easing.EaseLookup", {
			find: function (e) {
				return t.map[e]
			}
		}, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), f
	}, !0)
}), function (t) {
	"use strict";
	var e = t.GreenSockGlobals || t;
	if (!e.TweenLite) {
		var i, s, r, n, a, o = function (t) {
			var i, s = t.split("."), r = e;
			for (i = 0; s.length > i; i++)r[s[i]] = r = r[s[i]] || {};
			return r
		}, h = o("com.greensock"), l = 1e-10, _ = [].slice, u = function () {
		}, p = function () {
			var t = Object.prototype.toString, e = t.call([]);
			return function (i) {
				return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
			}
		}(), c = {}, f = function (i, s, r, n) {
			this.sc = c[i] ? c[i].sc : [], c[i] = this, this.gsClass = null, this.func = r;
			var a = [];
			this.check = function (h) {
				for (var l, _, u, p, m = s.length, d = m; --m > -1;)(l = c[s[m]] || new f(s[m], [])).gsClass ? (a[m] = l.gsClass, d--) : h && l.sc.push(this);
				if (0 === d && r)for (_ = ("com.greensock." + i).split("."), u = _.pop(), p = o(_.join("."))[u] = this.gsClass = r.apply(r, a), n && (e[u] = p, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + i.split(".").join("/"), [], function () {
					return p
				}) : "undefined" != typeof module && module.exports && (module.exports = p)), m = 0; this.sc.length > m; m++)this.sc[m].check()
			}, this.check(!0)
		}, m = t._gsDefine = function (t, e, i, s) {
			return new f(t, e, i, s)
		}, d = h._class = function (t, e, i) {
			return e = e || function () {
			}, m(t, [], function () {
				return e
			}, i), e
		};
		m.globals = e;
		var g = [0, 0, 1, 1], v = [], y = d("easing.Ease", function (t, e, i, s) {
			this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? g.concat(e) : g
		}, !0), T = y.map = {}, w = y.register = function (t, e, i, s) {
			for (var r, n, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)for (n = l[_], r = s ? d("easing." + n, null, !0) : h.easing[n] || {}, a = u.length; --a > -1;)o = u[a], T[n + "." + o] = T[o + n] = r[o] = t.getRatio ? t : t[o] || new t
		};
		for (r = y.prototype, r._calcEnd = !1, r.getRatio = function (t) {
			if (this._func)return this._params[0] = t, this._func.apply(null, this._params);
			var e = this._type, i = this._power, s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
			return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
		}, i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], s = i.length; --s > -1;)r = i[s] + ",Power" + s, w(new y(null, null, 1, s), r, "easeOut", !0), w(new y(null, null, 2, s), r, "easeIn" + (0 === s ? ",easeNone" : "")), w(new y(null, null, 3, s), r, "easeInOut");
		T.linear = h.easing.Linear.easeIn, T.swing = h.easing.Quad.easeInOut;
		var x = d("events.EventDispatcher", function (t) {
			this._listeners = {}, this._eventTarget = t || this
		});
		r = x.prototype, r.addEventListener = function (t, e, i, s, r) {
			r = r || 0;
			var o, h, l = this._listeners[t], _ = 0;
			for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;)o = l[h], o.c === e && o.s === i ? l.splice(h, 1) : 0 === _ && r > o.pr && (_ = h + 1);
			l.splice(_, 0, {c: e, s: i, up: s, pr: r}), this !== n || a || n.wake()
		}, r.removeEventListener = function (t, e) {
			var i, s = this._listeners[t];
			if (s)for (i = s.length; --i > -1;)if (s[i].c === e)return s.splice(i, 1), void 0
		}, r.dispatchEvent = function (t) {
			var e, i, s, r = this._listeners[t];
			if (r)for (e = r.length, i = this._eventTarget; --e > -1;)s = r[e], s.up ? s.c.call(s.s || i, {
				type: t,
				target: i
			}) : s.c.call(s.s || i)
		};
		var b = t.requestAnimationFrame, P = t.cancelAnimationFrame, S = Date.now || function () {
				return(new Date).getTime()
			}, k = S();
		for (i = ["ms", "moz", "webkit", "o"], s = i.length; --s > -1 && !b;)b = t[i[s] + "RequestAnimationFrame"], P = t[i[s] + "CancelAnimationFrame"] || t[i[s] + "CancelRequestAnimationFrame"];
		d("Ticker", function (t, e) {
			var i, s, r, o, h, l = this, _ = S(), p = e !== !1 && b, c = function (t) {
				k = S(), l.time = (k - _) / 1e3;
				var e, n = l.time - h;
				(!i || n > 0 || t === !0) && (l.frame++, h += n + (n >= o ? .004 : o - n), e = !0), t !== !0 && (r = s(c)), e && l.dispatchEvent("tick")
			};
			x.call(l), l.time = l.frame = 0, l.tick = function () {
				c(!0)
			}, l.sleep = function () {
				null != r && (p && P ? P(r) : clearTimeout(r), s = u, r = null, l === n && (a = !1))
			}, l.wake = function () {
				null !== r && l.sleep(), s = 0 === i ? u : p && b ? b : function (t) {
					return setTimeout(t, 0 | 1e3 * (h - l.time) + 1)
				}, l === n && (a = !0), c(2)
			}, l.fps = function (t) {
				return arguments.length ? (i = t, o = 1 / (i || 60), h = this.time + o, l.wake(), void 0) : i
			}, l.useRAF = function (t) {
				return arguments.length ? (l.sleep(), p = t, l.fps(i), void 0) : p
			}, l.fps(t), setTimeout(function () {
				p && (!r || 5 > l.frame) && l.useRAF(!1)
			}, 1500)
		}), r = h.Ticker.prototype = new h.events.EventDispatcher, r.constructor = h.Ticker;
		var R = d("core.Animation", function (t, e) {
			if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, U) {
				a || n.wake();
				var i = this.vars.useFrames ? z : U;
				i.add(this, i._time), this.vars.paused && this.paused(!0)
			}
		});
		n = R.ticker = new h.Ticker, r = R.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
		var A = function () {
			a && S() - k > 2e3 && n.wake(), setTimeout(A, 2e3)
		};
		A(), r.play = function (t, e) {
			return arguments.length && this.seek(t, e), this.reversed(!1).paused(!1)
		}, r.pause = function (t, e) {
			return arguments.length && this.seek(t, e), this.paused(!0)
		}, r.resume = function (t, e) {
			return arguments.length && this.seek(t, e), this.paused(!1)
		}, r.seek = function (t, e) {
			return this.totalTime(Number(t), e !== !1)
		}, r.restart = function (t, e) {
			return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
		}, r.reverse = function (t, e) {
			return arguments.length && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
		}, r.render = function () {
		}, r.invalidate = function () {
			return this
		}, r.isActive = function () {
			var t, e = this._timeline, i = this._startTime;
			return!e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
		}, r._enabled = function (t, e) {
			return a || n.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
		}, r._kill = function () {
			return this._enabled(!1, !1)
		}, r.kill = function (t, e) {
			return this._kill(t, e), this
		}, r._uncache = function (t) {
			for (var e = t ? this : this.timeline; e;)e._dirty = !0, e = e.timeline;
			return this
		}, r._swapSelfInParams = function (t) {
			for (var e = t.length, i = t.concat(); --e > -1;)"{self}" === t[e] && (i[e] = this);
			return i
		}, r.eventCallback = function (t, e, i, s) {
			if ("on" === (t || "").substr(0, 2)) {
				var r = this.vars;
				if (1 === arguments.length)return r[t];
				null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = p(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
			}
			return this
		}, r.delay = function (t) {
			return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
		}, r.duration = function (t) {
			return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
		}, r.totalDuration = function (t) {
			return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
		}, r.time = function (t, e) {
			return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
		}, r.totalTime = function (t, e, i) {
			if (a || n.wake(), !arguments.length)return this._totalTime;
			if (this._timeline) {
				if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
					this._dirty && this.totalDuration();
					var s = this._totalDuration, r = this._timeline;
					if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)for (; r._timeline;)r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
				}
				this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && this.render(t, e, !1)
			}
			return this
		}, r.progress = r.totalProgress = function (t, e) {
			return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
		}, r.startTime = function (t) {
			return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
		}, r.timeScale = function (t) {
			if (!arguments.length)return this._timeScale;
			if (t = t || l, this._timeline && this._timeline.smoothChildTiming) {
				var e = this._pauseTime, i = e || 0 === e ? e : this._timeline.totalTime();
				this._startTime = i - (i - this._startTime) * this._timeScale / t
			}
			return this._timeScale = t, this._uncache(!1)
		}, r.reversed = function (t) {
			return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
		}, r.paused = function (t) {
			if (!arguments.length)return this._paused;
			if (t != this._paused && this._timeline) {
				a || t || n.wake();
				var e = this._timeline, i = e.rawTime(), s = i - this._pauseTime;
				!t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
			}
			return this._gc && !t && this._enabled(!0, !1), this
		};
		var C = d("core.SimpleTimeline", function (t) {
			R.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
		});
		r = C.prototype = new R, r.constructor = C, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function (t, e) {
			var i, s;
			if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)for (s = t._startTime; i && i._startTime > s;)i = i._prev;
			return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
		}, r._remove = function (t, e) {
			return t.timeline === this && (e || t._enabled(!1, !0), t.timeline = null, t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), this._timeline && this._uncache(!0)), this
		}, r.render = function (t, e, i) {
			var s, r = this._first;
			for (this._totalTime = this._time = this._rawPrevTime = t; r;)s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
		}, r.rawTime = function () {
			return a || n.wake(), this._totalTime
		};
		var O = d("TweenLite", function (e, i, s) {
			if (R.call(this, i, s), this.render = O.prototype.render, null == e)throw"Cannot tween a null target.";
			this.target = e = "string" != typeof e ? e : O.selector(e) || e;
			var r, n, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), h = this.vars.overwrite;
			if (this._overwrite = h = null == h ? X[O.defaultOverwrite] : "number" == typeof h ? h >> 0 : X[h], (o || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])for (this._targets = a = _.call(e, 0), this._propLookup = [], this._siblings = [], r = 0; a.length > r; r++)n = a[r], n ? "string" != typeof n ? n.length && n !== t && n[0] && (n[0] === t || n[0].nodeType && n[0].style && !n.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(_.call(n, 0))) : (this._siblings[r] = Y(n, this, !1), 1 === h && this._siblings[r].length > 1 && j(n, this, null, 1, this._siblings[r])) : (n = a[r--] = O.selector(n), "string" == typeof n && a.splice(r + 1, 1)) : a.splice(r--, 1); else this._propLookup = {}, this._siblings = Y(e, this, !1), 1 === h && this._siblings.length > 1 && j(e, this, null, 1, this._siblings);
			(this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
		}, !0), D = function (e) {
			return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
		}, M = function (t, e) {
			var i, s = {};
			for (i in t)L[i] || i in e && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!E[i] || E[i] && E[i]._autoCSS) || (s[i] = t[i], delete t[i]);
			t.css = s
		};
		r = O.prototype = new R, r.constructor = O, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = !1, O.version = "1.11.4", O.defaultEase = r._ease = new y(null, null, 1, 1), O.defaultOverwrite = "auto", O.ticker = n, O.autoSleep = !0, O.selector = t.$ || t.jQuery || function (e) {
			return t.$ ? (O.selector = t.$, t.$(e)) : t.document ? t.document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e
		};
		var I = O._internals = {
			isArray: p,
			isSelector: D
		}, E = O._plugins = {}, N = O._tweenLookup = {}, F = 0, L = I.reservedProps = {
			ease: 1,
			delay: 1,
			overwrite: 1,
			onComplete: 1,
			onCompleteParams: 1,
			onCompleteScope: 1,
			useFrames: 1,
			runBackwards: 1,
			startAt: 1,
			onUpdate: 1,
			onUpdateParams: 1,
			onUpdateScope: 1,
			onStart: 1,
			onStartParams: 1,
			onStartScope: 1,
			onReverseComplete: 1,
			onReverseCompleteParams: 1,
			onReverseCompleteScope: 1,
			onRepeat: 1,
			onRepeatParams: 1,
			onRepeatScope: 1,
			easeParams: 1,
			yoyo: 1,
			immediateRender: 1,
			repeat: 1,
			repeatDelay: 1,
			data: 1,
			paused: 1,
			reversed: 1,
			autoCSS: 1
		}, X = {
			none: 0,
			all: 1,
			auto: 2,
			concurrent: 3,
			allOnStart: 4,
			preexisting: 5,
			"true": 1,
			"false": 0
		}, z = R._rootFramesTimeline = new C, U = R._rootTimeline = new C;
		U._startTime = n.time, z._startTime = n.frame, U._active = z._active = !0, R._updateRoot = function () {
			if (U.render((n.time - U._startTime) * U._timeScale, !1, !1), z.render((n.frame - z._startTime) * z._timeScale, !1, !1), !(n.frame % 120)) {
				var t, e, i;
				for (i in N) {
					for (e = N[i].tweens, t = e.length; --t > -1;)e[t]._gc && e.splice(t, 1);
					0 === e.length && delete N[i]
				}
				if (i = U._first, (!i || i._paused) && O.autoSleep && !z._first && 1 === n._listeners.tick.length) {
					for (; i && i._paused;)i = i._next;
					i || n.sleep()
				}
			}
		}, n.addEventListener("tick", R._updateRoot);
		var Y = function (t, e, i) {
			var s, r, n = t._gsTweenID;
			if (N[n || (t._gsTweenID = n = "t" + F++)] || (N[n] = {
					target: t,
					tweens: []
				}), e && (s = N[n].tweens, s[r = s.length] = e, i))for (; --r > -1;)s[r] === e && s.splice(r, 1);
			return N[n].tweens
		}, j = function (t, e, i, s, r) {
			var n, a, o, h;
			if (1 === s || s >= 4) {
				for (h = r.length, n = 0; h > n; n++)if ((o = r[n]) !== e)o._gc || o._enabled(!1, !1) && (a = !0); else if (5 === s)break;
				return a
			}
			var _, u = e._startTime + l, p = [], c = 0, f = 0 === e._duration;
			for (n = r.length; --n > -1;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (_ = _ || B(e, 0, f), 0 === B(o, _, f) && (p[c++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((f || !o._initted) && 2e-10 >= u - o._startTime || (p[c++] = o)));
			for (n = c; --n > -1;)o = p[n], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
			return a
		}, B = function (t, e, i) {
			for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
				if (n += s._startTime, r *= s._timeScale, s._paused)return-100;
				s = s._timeline
			}
			return n /= r, n > e ? n - e : i && n === e || !t._initted && 2 * l > n - e ? l : (n += t.totalDuration() / t._timeScale / r) > e + l ? 0 : n - e - l
		};
		r._init = function () {
			var t, e, i, s, r = this.vars, n = this._overwrittenProps, a = this._duration, o = r.immediateRender, h = r.ease;
			if (r.startAt) {
				if (this._startAt && this._startAt.render(-1, !0), r.startAt.overwrite = 0, r.startAt.immediateRender = !0, this._startAt = O.to(this.target, 0, r.startAt), o)if (this._time > 0)this._startAt = null; else if (0 !== a)return
			} else if (r.runBackwards && 0 !== a)if (this._startAt)this._startAt.render(-1, !0), this._startAt = null; else {
				i = {};
				for (s in r)L[s] && "autoCSS" !== s || (i[s] = r[s]);
				if (i.overwrite = 0, i.data = "isFromStart", this._startAt = O.to(this.target, 0, i), r.immediateRender) {
					if (0 === this._time)return
				} else this._startAt.render(-1, !0)
			}
			if (this._ease = h ? h instanceof y ? r.easeParams instanceof Array ? h.config.apply(h, r.easeParams) : h : "function" == typeof h ? new y(h, r.easeParams) : T[h] || O.defaultEase : O.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)for (t = this._targets.length; --t > -1;)this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], n ? n[t] : null) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, n);
			if (e && O._onPluginEvent("_onInitAllProps", this), n && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)for (i = this._firstPT; i;)i.s += i.c, i.c = -i.c, i = i._next;
			this._onUpdate = r.onUpdate, this._initted = !0
		}, r._initProps = function (e, i, s, r) {
			var n, a, o, h, l, _;
			if (null == e)return!1;
			this.vars.css || e.style && e !== t && e.nodeType && E.css && this.vars.autoCSS !== !1 && M(this.vars, e);
			for (n in this.vars) {
				if (_ = this.vars[n], L[n])_ && (_ instanceof Array || _.push && p(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[n] = _ = this._swapSelfInParams(_, this)); else if (E[n] && (h = new E[n])._onInitTween(e, this.vars[n], this)) {
					for (this._firstPT = l = {
						_next: this._firstPT,
						t: h,
						p: "setRatio",
						s: 0,
						c: 1,
						f: !0,
						n: n,
						pg: !0,
						pr: h._priority
					}, a = h._overwriteProps.length; --a > -1;)i[h._overwriteProps[a]] = this._firstPT;
					(h._priority || h._onInitAllProps) && (o = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0)
				} else this._firstPT = i[n] = l = {
					_next: this._firstPT,
					t: e,
					p: n,
					f: "function" == typeof e[n],
					n: n,
					pg: !1,
					pr: 0
				}, l.s = l.f ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), l.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - l.s || 0;
				l && l._next && (l._next._prev = l)
			}
			return r && this._kill(r, e) ? this._initProps(e, i, s, r) : this._overwrite > 1 && this._firstPT && s.length > 1 && j(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, r)) : o
		}, r.render = function (t, e, i) {
			var s, r, n, a, o = this._time, h = this._duration;
			if (t >= h)this._totalTime = this._time = h, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete"), 0 === h && (a = this._rawPrevTime, (0 === t || 0 > a || a === l) && a !== t && (i = !0, a > l && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || 0 === a ? t : l); else if (1e-7 > t)this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === h && this._rawPrevTime > l) && (r = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === h && (this._rawPrevTime >= 0 && (i = !0), this._rawPrevTime = a = !e || t || 0 === this._rawPrevTime ? t : l)) : this._initted || (i = !0); else if (this._totalTime = this._time = t, this._easeType) {
				var _ = t / h, u = this._easeType, p = this._easePower;
				(1 === u || 3 === u && _ >= .5) && (_ = 1 - _), 3 === u && (_ *= 2), 1 === p ? _ *= _ : 2 === p ? _ *= _ * _ : 3 === p ? _ *= _ * _ * _ : 4 === p && (_ *= _ * _ * _ * _), this.ratio = 1 === u ? 1 - _ : 2 === u ? _ : .5 > t / h ? _ / 2 : 1 - _ / 2
			} else this.ratio = this._ease.getRatio(t / h);
			if (this._time !== o || i) {
				if (!this._initted) {
					if (this._init(), !this._initted || this._gc)return;
					this._time && !s ? this.ratio = this._ease.getRatio(this._time / h) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
				}
				for (this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === h) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || v))), n = this._firstPT; n;)n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
				this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || v)), r && (this._gc || (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || v), 0 === h && this._rawPrevTime === l && a !== l && (this._rawPrevTime = 0)))
			}
		}, r._kill = function (t, e) {
			if ("all" === t && (t = null), null == t && (null == e || e === this.target))return this._enabled(!1, !1);
			e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
			var i, s, r, n, a, o, h, l;
			if ((p(e) || D(e)) && "number" != typeof e[0])for (i = e.length; --i > -1;)this._kill(t, e[i]) && (o = !0); else {
				if (this._targets) {
					for (i = this._targets.length; --i > -1;)if (e === this._targets[i]) {
						a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
						break
					}
				} else {
					if (e !== this.target)return!1;
					a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
				}
				if (a) {
					h = t || a, l = t !== s && "all" !== s && t !== a && ("object" != typeof t || !t._tempKill);
					for (r in h)(n = a[r]) && (n.pg && n.t._kill(h) && (o = !0), n.pg && 0 !== n.t._overwriteProps.length || (n._prev ? n._prev._next = n._next : n === this._firstPT && (this._firstPT = n._next), n._next && (n._next._prev = n._prev), n._next = n._prev = null), delete a[r]), l && (s[r] = 1);
					!this._firstPT && this._initted && this._enabled(!1, !1)
				}
			}
			return o
		}, r.invalidate = function () {
			return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
		}, r._enabled = function (t, e) {
			if (a || n.wake(), t && this._gc) {
				var i, s = this._targets;
				if (s)for (i = s.length; --i > -1;)this._siblings[i] = Y(s[i], this, !0); else this._siblings = Y(this.target, this, !0)
			}
			return R.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? O._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
		}, O.to = function (t, e, i) {
			return new O(t, e, i)
		}, O.from = function (t, e, i) {
			return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new O(t, e, i)
		}, O.fromTo = function (t, e, i, s) {
			return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new O(t, e, s)
		}, O.delayedCall = function (t, e, i, s, r) {
			return new O(e, 0, {
				delay: t,
				onComplete: e,
				onCompleteParams: i,
				onCompleteScope: s,
				onReverseComplete: e,
				onReverseCompleteParams: i,
				onReverseCompleteScope: s,
				immediateRender: !1,
				useFrames: r,
				overwrite: 0
			})
		}, O.set = function (t, e) {
			return new O(t, 0, e)
		}, O.getTweensOf = function (t, e) {
			if (null == t)return[];
			t = "string" != typeof t ? t : O.selector(t) || t;
			var i, s, r, n;
			if ((p(t) || D(t)) && "number" != typeof t[0]) {
				for (i = t.length, s = []; --i > -1;)s = s.concat(O.getTweensOf(t[i], e));
				for (i = s.length; --i > -1;)for (n = s[i], r = i; --r > -1;)n === s[r] && s.splice(i, 1)
			} else for (s = Y(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
			return s
		}, O.killTweensOf = O.killDelayedCallsTo = function (t, e, i) {
			"object" == typeof e && (i = e, e = !1);
			for (var s = O.getTweensOf(t, e), r = s.length; --r > -1;)s[r]._kill(i, t)
		};
		var q = d("plugins.TweenPlugin", function (t, e) {
			this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = q.prototype
		}, !0);
		if (r = q.prototype, q.version = "1.10.1", q.API = 2, r._firstPT = null, r._addTween = function (t, e, i, s, r, n) {
				var a, o;
				return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
					_next: this._firstPT,
					t: t,
					p: e,
					s: i,
					c: a,
					f: "function" == typeof t[e],
					n: r || e,
					r: n
				}, o._next && (o._next._prev = o), o) : void 0
			}, r.setRatio = function (t) {
				for (var e, i = this._firstPT, s = 1e-6; i;)e = i.c * t + i.s, i.r ? e = 0 | e + (e > 0 ? .5 : -.5) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
			}, r._kill = function (t) {
				var e, i = this._overwriteProps, s = this._firstPT;
				if (null != t[this._propName])this._overwriteProps = []; else for (e = i.length; --e > -1;)null != t[i[e]] && i.splice(e, 1);
				for (; s;)null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
				return!1
			}, r._roundProps = function (t, e) {
				for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
			}, O._onPluginEvent = function (t, e) {
				var i, s, r, n, a, o = e._firstPT;
				if ("_onInitAllProps" === t) {
					for (; o;) {
						for (a = o._next, s = r; s && s.pr > o.pr;)s = s._next;
						(o._prev = s ? s._prev : n) ? o._prev._next = o : r = o, (o._next = s) ? s._prev = o : n = o, o = a
					}
					o = e._firstPT = r
				}
				for (; o;)o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
				return i
			}, q.activate = function (t) {
				for (var e = t.length; --e > -1;)t[e].API === q.API && (E[(new t[e])._propName] = t[e]);
				return!0
			}, m.plugin = function (t) {
				if (!(t && t.propName && t.init && t.API))throw"illegal plugin definition.";
				var e, i = t.propName, s = t.priority || 0, r = t.overwriteProps, n = {
					init: "_onInitTween",
					set: "setRatio",
					kill: "_kill",
					round: "_roundProps",
					initAll: "_onInitAllProps"
				}, a = d("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
					q.call(this, i, s), this._overwriteProps = r || []
				}, t.global === !0), o = a.prototype = new q(i);
				o.constructor = a, a.API = t.API;
				for (e in n)"function" == typeof t[e] && (o[n[e]] = t[e]);
				return a.version = t.version, q.activate([a]), a
			}, i = t._gsQueue) {
			for (s = 0; i.length > s; s++)i[s]();
			for (r in c)c[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r)
		}
		a = !1
	}
}(window);

/*!TimelineLite
 * VERSION: 1.11.4
 * DATE: 2014-01-18
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
(window._gsQueue || (window._gsQueue = [])).push(function () {
	"use strict";
	window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
		var s = function (t) {
			e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
			var i, s, r = this.vars;
			for (s in r)i = r[s], a(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
			a(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
		}, r = 1e-10, n = i._internals.isSelector, a = i._internals.isArray, o = [], h = function (t) {
			var e, i = {};
			for (e in t)i[e] = t[e];
			return i
		}, l = function (t, e, i, s) {
			t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || o)
		}, _ = o.slice, u = s.prototype = new e;
		return s.version = "1.11.4", u.constructor = s, u.kill()._gc = !1, u.to = function (t, e, s, r) {
			return e ? this.add(new i(t, e, s), r) : this.set(t, s, r)
		}, u.from = function (t, e, s, r) {
			return this.add(i.from(t, e, s), r)
		}, u.fromTo = function (t, e, s, r, n) {
			return e ? this.add(i.fromTo(t, e, s, r), n) : this.set(t, r, n)
		}, u.staggerTo = function (t, e, r, a, o, l, u, p) {
			var f, c = new s({
				onComplete: l,
				onCompleteParams: u,
				onCompleteScope: p,
				smoothChildTiming: this.smoothChildTiming
			});
			for ("string" == typeof t && (t = i.selector(t) || t), n(t) && (t = _.call(t, 0)), a = a || 0, f = 0; t.length > f; f++)r.startAt && (r.startAt = h(r.startAt)), c.to(t[f], e, h(r), f * a);
			return this.add(c, o)
		}, u.staggerFrom = function (t, e, i, s, r, n, a, o) {
			return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
		}, u.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
			return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
		}, u.call = function (t, e, s, r) {
			return this.add(i.delayedCall(0, t, e, s), r)
		}, u.set = function (t, e, s) {
			return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
		}, s.exportRoot = function (t, e) {
			t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
			var r, n, a = new s(t), o = a._timeline;
			for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;)n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
			return o.add(a, 0), a
		}, u.add = function (r, n, o, h) {
			var l, _, u, p, f, c;
			if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
				if (r instanceof Array || r && r.push && a(r)) {
					for (o = o || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++)a(p = r[u]) && (p = new s({tweens: p})), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === o ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === o && (p._startTime -= p.delay())), l += h;
					return this._uncache(!0)
				}
				if ("string" == typeof r)return this.addLabel(r, n);
				if ("function" != typeof r)throw"Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
				r = i.delayedCall(0, r)
			}
			if (e.prototype.add.call(this, r, n), this._gc && !this._paused && this._duration < this.duration())for (f = this, c = f.rawTime() > r._startTime; f._gc && f._timeline;)f._timeline.smoothChildTiming && c ? f.totalTime(f._totalTime, !0) : f._enabled(!0, !1), f = f._timeline;
			return this
		}, u.remove = function (e) {
			if (e instanceof t)return this._remove(e, !1);
			if (e instanceof Array || e && e.push && a(e)) {
				for (var i = e.length; --i > -1;)this.remove(e[i]);
				return this
			}
			return"string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
		}, u._remove = function (t, i) {
			e.prototype._remove.call(this, t, i);
			var s = this._last;
			return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = 0, this
		}, u.append = function (t, e) {
			return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
		}, u.insert = u.insertMultiple = function (t, e, i, s) {
			return this.add(t, e || 0, i, s)
		}, u.appendMultiple = function (t, e, i, s) {
			return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
		}, u.addLabel = function (t, e) {
			return this._labels[t] = this._parseTimeOrLabel(e), this
		}, u.addPause = function (t, e, i, s) {
			return this.call(l, ["{self}", e, i, s], this, t)
		}, u.removeLabel = function (t) {
			return delete this._labels[t], this
		}, u.getLabelTime = function (t) {
			return null != this._labels[t] ? this._labels[t] : -1
		}, u._parseTimeOrLabel = function (e, i, s, r) {
			var n;
			if (r instanceof t && r.timeline === this)this.remove(r); else if (r && (r instanceof Array || r.push && a(r)))for (n = r.length; --n > -1;)r[n]instanceof t && r[n].timeline === this && this.remove(r[n]);
			if ("string" == typeof i)return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
			if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e])null == e && (e = this.duration()); else {
				if (n = e.indexOf("="), -1 === n)return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
				i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
			}
			return Number(e) + i
		}, u.seek = function (t, e) {
			return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
		}, u.stop = function () {
			return this.paused(!0)
		}, u.gotoAndPlay = function (t, e) {
			return this.play(t, e)
		}, u.gotoAndStop = function (t, e) {
			return this.pause(t, e)
		}, u.render = function (t, e, i) {
			this._gc && this._enabled(!0, !1);
			var s, n, a, h, l, _ = this._dirty ? this.totalDuration() : this._totalDuration, u = this._time, p = this._startTime, f = this._timeScale, c = this._paused;
			if (t >= _ ? (this._totalTime = this._time = _, this._reversed || this._hasPausedChild() || (n = !0, h = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || 0 === this._rawPrevTime ? t : r, t = _ + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && (this._rawPrevTime > r || 0 > t && this._rawPrevTime >= 0)) && (h = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || 0 === this._rawPrevTime ? t : r, t = 0, this._initted || (l = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== u && this._first || i || l) {
				if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && t > 0 && (this._active = !0), 0 === u && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || o)), this._time >= u)for (s = this._first; s && (a = s._next, !this._paused || c);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a; else for (s = this._last; s && (a = s._prev, !this._paused || c);)(s._active || u >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
				this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || o)), h && (this._gc || (p === this._startTime || f !== this._timeScale) && (0 === this._time || _ >= this.totalDuration()) && (n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || o)))
			}
		}, u._hasPausedChild = function () {
			for (var t = this._first; t;) {
				if (t._paused || t instanceof s && t._hasPausedChild())return!0;
				t = t._next
			}
			return!1
		}, u.getChildren = function (t, e, s, r) {
			r = r || -9999999999;
			for (var n = [], a = this._first, o = 0; a;)r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
			return n
		}, u.getTweensOf = function (t, e) {
			for (var s = i.getTweensOf(t), r = s.length, n = [], a = 0; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (n[a++] = s[r]);
			return n
		}, u._contains = function (t) {
			for (var e = t.timeline; e;) {
				if (e === this)return!0;
				e = e.timeline
			}
			return!1
		}, u.shiftChildren = function (t, e, i) {
			i = i || 0;
			for (var s, r = this._first, n = this._labels; r;)r._startTime >= i && (r._startTime += t), r = r._next;
			if (e)for (s in n)n[s] >= i && (n[s] += t);
			return this._uncache(!0)
		}, u._kill = function (t, e) {
			if (!t && !e)return this._enabled(!1, !1);
			for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;)i[s]._kill(t, e) && (r = !0);
			return r
		}, u.clear = function (t) {
			var e = this.getChildren(!1, !0, !0), i = e.length;
			for (this._time = this._totalTime = 0; --i > -1;)e[i]._enabled(!1, !1);
			return t !== !1 && (this._labels = {}), this._uncache(!0)
		}, u.invalidate = function () {
			for (var t = this._first; t;)t.invalidate(), t = t._next;
			return this
		}, u._enabled = function (t, i) {
			if (t === this._gc)for (var s = this._first; s;)s._enabled(t, !0), s = s._next;
			return e.prototype._enabled.call(this, t, i)
		}, u.duration = function (t) {
			return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
		}, u.totalDuration = function (t) {
			if (!arguments.length) {
				if (this._dirty) {
					for (var e, i, s = 0, r = this._last, n = 999999999999; r;)e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
					this._duration = this._totalDuration = s, this._dirty = !1
				}
				return this._totalDuration
			}
			return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
		}, u.usesFrames = function () {
			for (var e = this._timeline; e._timeline;)e = e._timeline;
			return e === t._rootFramesTimeline
		}, u.rawTime = function () {
			return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
		}, s
	}, !0)
}), window._gsDefine && window._gsQueue.pop()();

window.GreenSockGlobals = window._gsQueue = null;
/* --- $DEBOUNCES RESIZE --- */

/* debouncedresize: special jQuery event that happens once after a window resize
 * https://github.com/louisremi/jquery-smartresize
 * Copyright 2012 @louis_remi
 */
(function ($) {
	var $event = $.event, $special, resizeTimeout;
	$special = $event.special.debouncedresize = {
		setup: function () {
			$(this).on("resize", $special.handler);
		}, teardown: function () {
			$(this).off("resize", $special.handler);
		}, handler: function (event, execAsap) {
			var context = this, args = arguments, dispatch = function () {
				event.type = "debouncedresize";
				$event.dispatch.apply(context, args);
			};
			if (resizeTimeout) {
				clearTimeout(resizeTimeout);
			}
			execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
		}, threshold: 150
	};
})(jQuery);

/*
 Firefox super responsive scroll (c) Keith Clark - MIT Licensed
 */
(function(doc) {

    var root        = doc.documentElement,
        ua          = navigator.userAgent,
        is_OSX      = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false,
        is_firefox  = ua.match(/gecko/i);

    // Not ideal, but better than UA sniffing.
    if ("MozAppearance" in root.style && !Modernizr.touch && is_OSX) {

        // determine the vertical scrollbar width
        var scrollbarWidth = root.clientWidth;
        root.style.overflow = "scroll";
        scrollbarWidth -= root.clientWidth;
        root.style.overflow = "";

        // create a synthetic scroll event
        var scrollEvent = doc.createEvent("UIEvent")
        scrollEvent.initEvent("scroll", true, true);

        // event dispatcher
        function scrollHandler() {
            doc.dispatchEvent(scrollEvent);
        }

        // detect mouse events in the document scrollbar track
        doc.addEventListener("mousedown", function(e) {
            if (e.clientX > root.clientWidth - scrollbarWidth) {
                doc.addEventListener("mousemove", scrollHandler, false);
                doc.addEventListener("mouseup", function() {
                    doc.removeEventListener("mouseup", arguments.callee, false);
                    doc.removeEventListener("mousemove", scrollHandler, false);
                }, false)
            }
        }, false)

        // override mouse wheel behaviour.
        doc.addEventListener("DOMMouseScroll", function(e) {
            // Don't disable hot key behaviours
            if (!e.ctrlKey && !e.shiftKey) {
                root.scrollTop += e.detail * 16;
                scrollHandler.call(this, e);
                e.preventDefault()
            }
        }, false)

    }
})(document);
/* --- $GMAP3 ---*/

// GMap 3 v5.1.1 by DEMONTE Jean-Baptiste
// http://gmap3.net
(function (y, t) {
	var z, i = 0;

	function J() {
		if (!z) {
			z = {
				verbose: false,
				queryLimit: {attempt: 5, delay: 250, random: 250},
				classes: {
					Map: google.maps.Map,
					Marker: google.maps.Marker,
					InfoWindow: google.maps.InfoWindow,
					Circle: google.maps.Circle,
					Rectangle: google.maps.Rectangle,
					OverlayView: google.maps.OverlayView,
					StreetViewPanorama: google.maps.StreetViewPanorama,
					KmlLayer: google.maps.KmlLayer,
					TrafficLayer: google.maps.TrafficLayer,
					BicyclingLayer: google.maps.BicyclingLayer,
					GroundOverlay: google.maps.GroundOverlay,
					StyledMapType: google.maps.StyledMapType,
					ImageMapType: google.maps.ImageMapType
				},
				map: {mapTypeId: google.maps.MapTypeId.ROADMAP, center: [46.578498, 2.457275], zoom: 2},
				overlay: {pane: "floatPane", content: "", offset: {x: 0, y: 0}},
				geoloc: {getCurrentPosition: {maximumAge: 60000, timeout: 5000}}
			}
		}
	}

	function k(M, L) {
		return M !== t ? M : "gmap3_" + (L ? i + 1 : ++i)
	}

	function d(L) {
		var O = function (P) {
			return parseInt(P, 10)
		}, N = google.maps.version.split(".").map(O), M;
		L = L.split(".").map(O);
		for (M = 0; M < L.length; M++) {
			if (N.hasOwnProperty(M)) {
				if (N[M] < L[M]) {
					return false
				}
			} else {
				return false
			}
		}
		return true
	}

	function n(P, L, N, Q, O) {
		if (L.todo.events || L.todo.onces) {
			var M = {id: Q, data: L.todo.data, tag: L.todo.tag};
			if (L.todo.events) {
				y.each(L.todo.events, function (R, U) {
					var T = P, S = U;
					if (y.isArray(U)) {
						T = U[0];
						S = U[1]
					}
					google.maps.event.addListener(N, R, function (V) {
						S.apply(T, [O ? O : N, V, M])
					})
				})
			}
			if (L.todo.onces) {
				y.each(L.todo.onces, function (R, U) {
					var T = P, S = U;
					if (y.isArray(U)) {
						T = U[0];
						S = U[1]
					}
					google.maps.event.addListenerOnce(N, R, function (V) {
						S.apply(T, [O ? O : N, V, M])
					})
				})
			}
		}
	}

	function l() {
		var L = [];
		this.empty = function () {
			return !L.length
		};
		this.add = function (M) {
			L.push(M)
		};
		this.get = function () {
			return L.length ? L[0] : false
		};
		this.ack = function () {
			L.shift()
		}
	}

	function w(T, L, N) {
		var R = {}, P = this, Q, S = {
			latLng: {
				map: false,
				marker: false,
				infowindow: false,
				circle: false,
				overlay: false,
				getlatlng: false,
				getmaxzoom: false,
				getelevation: false,
				streetviewpanorama: false,
				getaddress: true
			}, geoloc: {getgeoloc: true}
		};
		if (typeof N === "string") {
			N = M(N)
		}
		function M(V) {
			var U = {};
			U[V] = {};
			return U
		}

		function O() {
			var U;
			for (U in N) {
				if (U in R) {
					continue
				}
				return U
			}
		}

		this.run = function () {
			var U, V;
			while (U = O()) {
				if (typeof T[U] === "function") {
					Q = U;
					V = y.extend(true, {}, z[U] || {}, N[U].options || {});
					if (U in S.latLng) {
						if (N[U].values) {
							x(N[U].values, T, T[U], {todo: N[U], opts: V, session: R})
						} else {
							v(T, T[U], S.latLng[U], {todo: N[U], opts: V, session: R})
						}
					} else {
						if (U in S.geoloc) {
							o(T, T[U], {todo: N[U], opts: V, session: R})
						} else {
							T[U].apply(T, [
								{todo: N[U], opts: V, session: R}
							])
						}
					}
					return
				} else {
					R[U] = null
				}
			}
			L.apply(T, [N, R])
		};
		this.ack = function (U) {
			R[Q] = U;
			P.run.apply(P, [])
		}
	}

	function c(N) {
		var L, M = [];
		for (L in N) {
			M.push(L)
		}
		return M
	}

	function b(N, Q) {
		var L = {};
		if (N.todo) {
			for (var M in N.todo) {
				if ((M !== "options") && (M !== "values")) {
					L[M] = N.todo[M]
				}
			}
		}
		var O, P = ["data", "tag", "id", "events", "onces"];
		for (O = 0; O < P.length; O++) {
			A(L, P[O], Q, N.todo)
		}
		L.options = y.extend({}, N.opts || {}, Q.options || {});
		return L
	}

	function A(N, M) {
		for (var L = 2; L < arguments.length; L++) {
			if (M in arguments[L]) {
				N[M] = arguments[L][M];
				return
			}
		}
	}

	function r() {
		var L = [];
		this.get = function (S) {
			if (L.length) {
				var P, O, N, R, M, Q = c(S);
				for (P = 0; P < L.length; P++) {
					R = L[P];
					M = Q.length == R.keys.length;
					for (O = 0; (O < Q.length) && M; O++) {
						N = Q[O];
						M = N in R.request;
						if (M) {
							if ((typeof S[N] === "object") && ("equals" in S[N]) && (typeof S[N] === "function")) {
								M = S[N].equals(R.request[N])
							} else {
								M = S[N] === R.request[N]
							}
						}
					}
					if (M) {
						return R.results
					}
				}
			}
		};
		this.store = function (N, M) {
			L.push({request: N, keys: c(N), results: M})
		}
	}

	function e(Q, P, O, L) {
		var N = this, M = [];
		z.classes.OverlayView.call(this);
		this.setMap(Q);
		this.onAdd = function () {
			var R = this.getPanes();
			if (P.pane in R) {
				y(R[P.pane]).append(L)
			}
			y.each("dblclick click mouseover mousemove mouseout mouseup mousedown".split(" "), function (T, S) {
				M.push(google.maps.event.addDomListener(L[0], S, function (U) {
					y.Event(U).stopPropagation();
					google.maps.event.trigger(N, S, [U]);
					N.draw()
				}))
			});
			M.push(google.maps.event.addDomListener(L[0], "contextmenu", function (S) {
				y.Event(S).stopPropagation();
				google.maps.event.trigger(N, "rightclick", [S]);
				N.draw()
			}))
		};
		this.getPosition = function () {
			return O
		};
		this.draw = function () {
			var R = this.getProjection().fromLatLngToDivPixel(O);
			L.css("left", (R.x + P.offset.x) + "px").css("top", (R.y + P.offset.y) + "px")
		};
		this.onRemove = function () {
			for (var R = 0; R < M.length; R++) {
				google.maps.event.removeListener(M[R])
			}
			L.remove()
		};
		this.hide = function () {
			L.hide()
		};
		this.show = function () {
			L.show()
		};
		this.toggle = function () {
			if (L) {
				if (L.is(":visible")) {
					this.show()
				} else {
					this.hide()
				}
			}
		};
		this.toggleDOM = function () {
			if (this.getMap()) {
				this.setMap(null)
			} else {
				this.setMap(Q)
			}
		};
		this.getDOMElement = function () {
			return L[0]
		}
	}

	function f(O, L) {
		function M() {
			this.onAdd = function () {
			};
			this.onRemove = function () {
			};
			this.draw = function () {
			};
			return z.classes.OverlayView.apply(this, [])
		}

		M.prototype = z.classes.OverlayView.prototype;
		var N = new M();
		N.setMap(O);
		return N
	}

	function F(ae, ao, aa) {
		var an = false, ai = false, af = false, Z = false, W = true, V = this, N = [], T = {}, ad = {}, U = {}, aj = [], ah = [], O = [], ak = f(ao, aa.radius), Y, ap, am, P, Q;
		S();
		function L(aq) {
			if (!aj[aq]) {
				delete ah[aq].options.map;
				aj[aq] = new z.classes.Marker(ah[aq].options);
				n(ae, {todo: ah[aq]}, aj[aq], ah[aq].id)
			}
		}

		this.getById = function (aq) {
			if (aq in ad) {
				L(ad[aq]);
				return aj[ad[aq]]
			}
			return false
		};
		this.rm = function (ar) {
			var aq = ad[ar];
			if (aj[aq]) {
				aj[aq].setMap(null)
			}
			delete aj[aq];
			aj[aq] = false;
			delete ah[aq];
			ah[aq] = false;
			delete O[aq];
			O[aq] = false;
			delete ad[ar];
			delete U[aq];
			ai = true
		};
		this.clearById = function (aq) {
			if (aq in ad) {
				this.rm(aq);
				return true
			}
		};
		this.clear = function (az, av, aA) {
			var ar, ay, at, aw, au, ax = [], aq = C(aA);
			if (az) {
				ar = ah.length - 1;
				ay = -1;
				at = -1
			} else {
				ar = 0;
				ay = ah.length;
				at = 1
			}
			for (aw = ar; aw != ay; aw += at) {
				if (ah[aw]) {
					if (!aq || aq(ah[aw].tag)) {
						ax.push(U[aw]);
						if (av || az) {
							break
						}
					}
				}
			}
			for (au = 0; au < ax.length; au++) {
				this.rm(ax[au])
			}
		};
		this.add = function (aq, ar) {
			aq.id = k(aq.id);
			this.clearById(aq.id);
			ad[aq.id] = aj.length;
			U[aj.length] = aq.id;
			aj.push(null);
			ah.push(aq);
			O.push(ar);
			ai = true
		};
		this.addMarker = function (ar, aq) {
			aq = aq || {};
			aq.id = k(aq.id);
			this.clearById(aq.id);
			if (!aq.options) {
				aq.options = {}
			}
			aq.options.position = ar.getPosition();
			n(ae, {todo: aq}, ar, aq.id);
			ad[aq.id] = aj.length;
			U[aj.length] = aq.id;
			aj.push(ar);
			ah.push(aq);
			O.push(aq.data || {});
			ai = true
		};
		this.todo = function (aq) {
			return ah[aq]
		};
		this.value = function (aq) {
			return O[aq]
		};
		this.marker = function (aq) {
			if (aq in aj) {
				L(aq);
				return aj[aq]
			}
			return false
		};
		this.markerIsSet = function (aq) {
			return Boolean(aj[aq])
		};
		this.setMarker = function (ar, aq) {
			aj[ar] = aq
		};
		this.store = function (aq, ar, at) {
			T[aq.ref] = {obj: ar, shadow: at}
		};
		this.free = function () {
			for (var aq = 0; aq < N.length; aq++) {
				google.maps.event.removeListener(N[aq])
			}
			N = [];
			y.each(T, function (ar) {
				ac(ar)
			});
			T = {};
			y.each(ah, function (ar) {
				ah[ar] = null
			});
			ah = [];
			y.each(aj, function (ar) {
				if (aj[ar]) {
					aj[ar].setMap(null);
					delete aj[ar]
				}
			});
			aj = [];
			y.each(O, function (ar) {
				delete O[ar]
			});
			O = [];
			ad = {};
			U = {}
		};
		this.filter = function (aq) {
			am = aq;
			ag()
		};
		this.enable = function (aq) {
			if (W != aq) {
				W = aq;
				ag()
			}
		};
		this.display = function (aq) {
			P = aq
		};
		this.error = function (aq) {
			Q = aq
		};
		this.beginUpdate = function () {
			an = true
		};
		this.endUpdate = function () {
			an = false;
			if (ai) {
				ag()
			}
		};
		this.autofit = function (ar) {
			for (var aq = 0; aq < ah.length; aq++) {
				if (ah[aq]) {
					ar.extend(ah[aq].options.position)
				}
			}
		};
		function S() {
			ap = ak.getProjection();
			if (!ap) {
				setTimeout(function () {
					S.apply(V, [])
				}, 25);
				return
			}
			Z = true;
			N.push(google.maps.event.addListener(ao, "zoom_changed", function () {
				al()
			}));
			N.push(google.maps.event.addListener(ao, "bounds_changed", function () {
				al()
			}));
			ag()
		}

		function ac(aq) {
			if (typeof T[aq] === "object") {
				if (typeof(T[aq].obj.setMap) === "function") {
					T[aq].obj.setMap(null)
				}
				if (typeof(T[aq].obj.remove) === "function") {
					T[aq].obj.remove()
				}
				if (typeof(T[aq].shadow.remove) === "function") {
					T[aq].obj.remove()
				}
				if (typeof(T[aq].shadow.setMap) === "function") {
					T[aq].shadow.setMap(null)
				}
				delete T[aq].obj;
				delete T[aq].shadow
			} else {
				if (aj[aq]) {
					aj[aq].setMap(null)
				}
			}
			delete T[aq]
		}

		function M() {
			var ay, ax, aw, au, av, at, ar, aq;
			if (arguments[0] instanceof google.maps.LatLng) {
				ay = arguments[0].lat();
				aw = arguments[0].lng();
				if (arguments[1] instanceof google.maps.LatLng) {
					ax = arguments[1].lat();
					au = arguments[1].lng()
				} else {
					ax = arguments[1];
					au = arguments[2]
				}
			} else {
				ay = arguments[0];
				aw = arguments[1];
				if (arguments[2] instanceof google.maps.LatLng) {
					ax = arguments[2].lat();
					au = arguments[2].lng()
				} else {
					ax = arguments[2];
					au = arguments[3]
				}
			}
			av = Math.PI * ay / 180;
			at = Math.PI * aw / 180;
			ar = Math.PI * ax / 180;
			aq = Math.PI * au / 180;
			return 1000 * 6371 * Math.acos(Math.min(Math.cos(av) * Math.cos(ar) * Math.cos(at) * Math.cos(aq) + Math.cos(av) * Math.sin(at) * Math.cos(ar) * Math.sin(aq) + Math.sin(av) * Math.sin(ar), 1))
		}

		function R() {
			var aq = M(ao.getCenter(), ao.getBounds().getNorthEast()), ar = new google.maps.Circle({
				center: ao.getCenter(),
				radius: 1.25 * aq
			});
			return ar.getBounds()
		}

		function X() {
			var ar = {}, aq;
			for (aq in T) {
				ar[aq] = true
			}
			return ar
		}

		function al() {
			clearTimeout(Y);
			Y = setTimeout(function () {
				ag()
			}, 25)
		}

		function ab(ar) {
			var au = ap.fromLatLngToDivPixel(ar), at = ap.fromDivPixelToLatLng(new google.maps.Point(au.x + aa.radius, au.y - aa.radius)), aq = ap.fromDivPixelToLatLng(new google.maps.Point(au.x - aa.radius, au.y + aa.radius));
			return new google.maps.LatLngBounds(aq, at)
		}

		function ag() {
			if (an || af || !Z) {
				return
			}
			var aE = [], aG = {}, aF = ao.getZoom(), aH = ("maxZoom" in aa) && (aF > aa.maxZoom), aw = X(), av, au, at, aA, ar = false, aq, aD, ay, az, aB, aC, ax;
			ai = false;
			if (aF > 3) {
				aq = R();
				ar = aq.getSouthWest().lng() < aq.getNorthEast().lng()
			}
			for (av = 0; av < ah.length; av++) {
				if (ah[av] && (!ar || aq.contains(ah[av].options.position)) && (!am || am(O[av]))) {
					aE.push(av)
				}
			}
			while (1) {
				av = 0;
				while (aG[av] && (av < aE.length)) {
					av++
				}
				if (av == aE.length) {
					break
				}
				aA = [];
				if (W && !aH) {
					ax = 10;
					do {
						az = aA;
						aA = [];
						ax--;
						if (az.length) {
							ay = aq.getCenter()
						} else {
							ay = ah[aE[av]].options.position
						}
						aq = ab(ay);
						for (au = av; au < aE.length; au++) {
							if (aG[au]) {
								continue
							}
							if (aq.contains(ah[aE[au]].options.position)) {
								aA.push(au)
							}
						}
					} while ((az.length < aA.length) && (aA.length > 1) && ax)
				} else {
					for (au = av; au < aE.length; au++) {
						if (aG[au]) {
							continue
						}
						aA.push(au);
						break
					}
				}
				aD = {indexes: [], ref: []};
				aB = aC = 0;
				for (at = 0; at < aA.length; at++) {
					aG[aA[at]] = true;
					aD.indexes.push(aE[aA[at]]);
					aD.ref.push(aE[aA[at]]);
					aB += ah[aE[aA[at]]].options.position.lat();
					aC += ah[aE[aA[at]]].options.position.lng()
				}
				aB /= aA.length;
				aC /= aA.length;
				aD.latLng = new google.maps.LatLng(aB, aC);
				aD.ref = aD.ref.join("-");
				if (aD.ref in aw) {
					delete aw[aD.ref]
				} else {
					if (aA.length === 1) {
						T[aD.ref] = true
					}
					P(aD)
				}
			}
			y.each(aw, function (aI) {
				ac(aI)
			});
			af = false
		}
	}

	function a(M, L) {
		this.id = function () {
			return M
		};
		this.filter = function (N) {
			L.filter(N)
		};
		this.enable = function () {
			L.enable(true)
		};
		this.disable = function () {
			L.enable(false)
		};
		this.add = function (O, N, P) {
			if (!P) {
				L.beginUpdate()
			}
			L.addMarker(O, N);
			if (!P) {
				L.endUpdate()
			}
		};
		this.getById = function (N) {
			return L.getById(N)
		};
		this.clearById = function (P, O) {
			var N;
			if (!O) {
				L.beginUpdate()
			}
			N = L.clearById(P);
			if (!O) {
				L.endUpdate()
			}
			return N
		};
		this.clear = function (P, Q, N, O) {
			if (!O) {
				L.beginUpdate()
			}
			L.clear(P, Q, N);
			if (!O) {
				L.endUpdate()
			}
		}
	}

	function D() {
		var M = {}, N = {};

		function L(P) {
			return{id: P.id, name: P.name, object: P.obj, tag: P.tag, data: P.data}
		}

		this.add = function (R, Q, T, S) {
			var P = R.todo || {}, U = k(P.id);
			if (!M[Q]) {
				M[Q] = []
			}
			if (U in N) {
				this.clearById(U)
			}
			N[U] = {obj: T, sub: S, name: Q, id: U, tag: P.tag, data: P.data};
			M[Q].push(U);
			return U
		};
		this.getById = function (R, Q, P) {
			if (R in N) {
				if (Q) {
					return N[R].sub
				} else {
					if (P) {
						return L(N[R])
					}
				}
				return N[R].obj
			}
			return false
		};
		this.get = function (R, T, P, S) {
			var V, U, Q = C(P);
			if (!M[R] || !M[R].length) {
				return null
			}
			V = M[R].length;
			while (V) {
				V--;
				U = M[R][T ? V : M[R].length - V - 1];
				if (U && N[U]) {
					if (Q && !Q(N[U].tag)) {
						continue
					}
					return S ? L(N[U]) : N[U].obj
				}
			}
			return null
		};
		this.all = function (S, Q, T) {
			var P = [], R = C(Q), U = function (X) {
				var V, W;
				for (V = 0; V < M[X].length; V++) {
					W = M[X][V];
					if (W && N[W]) {
						if (R && !R(N[W].tag)) {
							continue
						}
						P.push(T ? L(N[W]) : N[W].obj)
					}
				}
			};
			if (S in M) {
				U(S)
			} else {
				if (S === t) {
					for (S in M) {
						U(S)
					}
				}
			}
			return P
		};
		function O(P) {
			if (typeof(P.setMap) === "function") {
				P.setMap(null)
			}
			if (typeof(P.remove) === "function") {
				P.remove()
			}
			if (typeof(P.free) === "function") {
				P.free()
			}
			P = null
		}

		this.rm = function (S, Q, R) {
			var P, T;
			if (!M[S]) {
				return false
			}
			if (Q) {
				if (R) {
					for (P = M[S].length - 1; P >= 0; P--) {
						T = M[S][P];
						if (Q(N[T].tag)) {
							break
						}
					}
				} else {
					for (P = 0; P < M[S].length; P++) {
						T = M[S][P];
						if (Q(N[T].tag)) {
							break
						}
					}
				}
			} else {
				P = R ? M[S].length - 1 : 0
			}
			if (!(P in M[S])) {
				return false
			}
			return this.clearById(M[S][P], P)
		};
		this.clearById = function (S, P) {
			if (S in N) {
				var R, Q = N[S].name;
				for (R = 0; P === t && R < M[Q].length; R++) {
					if (S === M[Q][R]) {
						P = R
					}
				}
				O(N[S].obj);
				if (N[S].sub) {
					O(N[S].sub)
				}
				delete N[S];
				M[Q].splice(P, 1);
				return true
			}
			return false
		};
		this.objGetById = function (R) {
			var Q;
			if (M.clusterer) {
				for (var P in M.clusterer) {
					if ((Q = N[M.clusterer[P]].obj.getById(R)) !== false) {
						return Q
					}
				}
			}
			return false
		};
		this.objClearById = function (Q) {
			if (M.clusterer) {
				for (var P in M.clusterer) {
					if (N[M.clusterer[P]].obj.clearById(Q)) {
						return true
					}
				}
			}
			return null
		};
		this.clear = function (V, U, W, P) {
			var R, T, S, Q = C(P);
			if (!V || !V.length) {
				V = [];
				for (R in M) {
					V.push(R)
				}
			} else {
				V = g(V)
			}
			for (T = 0; T < V.length; T++) {
				S = V[T];
				if (U) {
					this.rm(S, Q, true)
				} else {
					if (W) {
						this.rm(S, Q, false)
					} else {
						while (this.rm(S, Q, false)) {
						}
					}
				}
			}
		};
		this.objClear = function (S, R, T, Q) {
			if (M.clusterer && (y.inArray("marker", S) >= 0 || !S.length)) {
				for (var P in M.clusterer) {
					N[M.clusterer[P]].obj.clear(R, T, Q)
				}
			}
		}
	}

	var m = {}, H = new r();

	function p() {
		if (!m.geocoder) {
			m.geocoder = new google.maps.Geocoder()
		}
		return m.geocoder
	}

	function G() {
		if (!m.directionsService) {
			m.directionsService = new google.maps.DirectionsService()
		}
		return m.directionsService
	}

	function h() {
		if (!m.elevationService) {
			m.elevationService = new google.maps.ElevationService()
		}
		return m.elevationService
	}

	function q() {
		if (!m.maxZoomService) {
			m.maxZoomService = new google.maps.MaxZoomService()
		}
		return m.maxZoomService
	}

	function B() {
		if (!m.distanceMatrixService) {
			m.distanceMatrixService = new google.maps.DistanceMatrixService()
		}
		return m.distanceMatrixService
	}

	function u() {
		if (z.verbose) {
			var L, M = [];
			if (window.console && (typeof console.error === "function")) {
				for (L = 0; L < arguments.length; L++) {
					M.push(arguments[L])
				}
				console.error.apply(console, M)
			} else {
				M = "";
				for (L = 0; L < arguments.length; L++) {
					M += arguments[L].toString() + " "
				}
				alert(M)
			}
		}
	}

	function E(L) {
		return(typeof(L) === "number" || typeof(L) === "string") && L !== "" && !isNaN(L)
	}

	function g(N) {
		var M, L = [];
		if (N !== t) {
			if (typeof(N) === "object") {
				if (typeof(N.length) === "number") {
					L = N
				} else {
					for (M in N) {
						L.push(N[M])
					}
				}
			} else {
				L.push(N)
			}
		}
		return L
	}

	function C(L) {
		if (L) {
			if (typeof L === "function") {
				return L
			}
			L = g(L);
			return function (N) {
				if (N === t) {
					return false
				}
				if (typeof N === "object") {
					for (var M = 0; M < N.length; M++) {
						if (y.inArray(N[M], L) >= 0) {
							return true
						}
					}
					return false
				}
				return y.inArray(N, L) >= 0
			}
		}
	}

	function I(M, O, L) {
		var N = O ? M : null;
		if (!M || (typeof M === "string")) {
			return N
		}
		if (M.latLng) {
			return I(M.latLng)
		}
		if (M instanceof google.maps.LatLng) {
			return M
		} else {
			if (E(M.lat)) {
				return new google.maps.LatLng(M.lat, M.lng)
			} else {
				if (!L && y.isArray(M)) {
					if (!E(M[0]) || !E(M[1])) {
						return N
					}
					return new google.maps.LatLng(M[0], M[1])
				}
			}
		}
		return N
	}

	function j(M) {
		var N, L;
		if (!M || M instanceof google.maps.LatLngBounds) {
			return M || null
		}
		if (y.isArray(M)) {
			if (M.length == 2) {
				N = I(M[0]);
				L = I(M[1])
			} else {
				if (M.length == 4) {
					N = I([M[0], M[1]]);
					L = I([M[2], M[3]])
				}
			}
		} else {
			if (("ne" in M) && ("sw" in M)) {
				N = I(M.ne);
				L = I(M.sw)
			} else {
				if (("n" in M) && ("e" in M) && ("s" in M) && ("w" in M)) {
					N = I([M.n, M.e]);
					L = I([M.s, M.w])
				}
			}
		}
		if (N && L) {
			return new google.maps.LatLngBounds(L, N)
		}
		return null
	}

	function v(T, L, O, S, P) {
		var N = O ? I(S.todo, false, true) : false, R = N ? {latLng: N} : (S.todo.address ? (typeof(S.todo.address) === "string" ? {address: S.todo.address} : S.todo.address) : false), M = R ? H.get(R) : false, Q = this;
		if (R) {
			P = P || 0;
			if (M) {
				S.latLng = M.results[0].geometry.location;
				S.results = M.results;
				S.status = M.status;
				L.apply(T, [S])
			} else {
				if (R.location) {
					R.location = I(R.location)
				}
				if (R.bounds) {
					R.bounds = j(R.bounds)
				}
				p().geocode(R, function (V, U) {
					if (U === google.maps.GeocoderStatus.OK) {
						H.store(R, {results: V, status: U});
						S.latLng = V[0].geometry.location;
						S.results = V;
						S.status = U;
						L.apply(T, [S])
					} else {
						if ((U === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) && (P < z.queryLimit.attempt)) {
							setTimeout(function () {
								v.apply(Q, [T, L, O, S, P + 1])
							}, z.queryLimit.delay + Math.floor(Math.random() * z.queryLimit.random))
						} else {
							u("geocode failed", U, R);
							S.latLng = S.results = false;
							S.status = U;
							L.apply(T, [S])
						}
					}
				})
			}
		} else {
			S.latLng = I(S.todo, false, true);
			L.apply(T, [S])
		}
	}

	function x(Q, L, R, M) {
		var O = this, N = -1;

		function P() {
			do {
				N++
			} while ((N < Q.length) && !("address" in Q[N]));
			if (N >= Q.length) {
				R.apply(L, [M]);
				return
			}
			v(O, function (S) {
				delete S.todo;
				y.extend(Q[N], S);
				P.apply(O, [])
			}, true, {todo: Q[N]})
		}

		P()
	}

	function o(L, O, M) {
		var N = false;
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (P) {
				if (N) {
					return
				}
				N = true;
				M.latLng = new google.maps.LatLng(P.coords.latitude, P.coords.longitude);
				O.apply(L, [M])
			}, function () {
				if (N) {
					return
				}
				N = true;
				M.latLng = false;
				O.apply(L, [M])
			}, M.opts.getCurrentPosition)
		} else {
			M.latLng = false;
			O.apply(L, [M])
		}
	}

	function K(T) {
		var S = this, U = new l(), V = new D(), N = null, P;
		this._plan = function (Z) {
			for (var Y = 0; Y < Z.length; Y++) {
				U.add(new w(S, R, Z[Y]))
			}
			Q()
		};
		function Q() {
			if (!P && (P = U.get())) {
				P.run()
			}
		}

		function R() {
			P = null;
			U.ack();
			Q.call(S)
		}

		function X(Y) {
			if (Y.todo.callback) {
				var Z = Array.prototype.slice.call(arguments, 1);
				if (typeof Y.todo.callback === "function") {
					Y.todo.callback.apply(T, Z)
				} else {
					if (y.isArray(Y.todo.callback)) {
						if (typeof Y.todo.callback[1] === "function") {
							Y.todo.callback[1].apply(Y.todo.callback[0], Z)
						}
					}
				}
			}
		}

		function O(Y, Z, aa) {
			if (aa) {
				n(T, Y, Z, aa)
			}
			X(Y, Z);
			P.ack(Z)
		}

		function L(aa, Y) {
			Y = Y || {};
			if (N) {
				if (Y.todo && Y.todo.options) {
					if (Y.todo.options.center) {
						Y.todo.options.center = I(Y.todo.options.center)
					}
					N.setOptions(Y.todo.options)
				}
			} else {
				var Z = Y.opts || y.extend(true, {}, z.map, Y.todo && Y.todo.options ? Y.todo.options : {});
				Z.center = aa || I(Z.center);
				N = new z.classes.Map(T.get(0), Z)
			}
		}

		this.map = function (Y) {
			L(Y.latLng, Y);
			n(T, Y, N);
			O(Y, N)
		};
		this.destroy = function (Y) {
			V.clear();
			T.empty();
			if (N) {
				N = null
			}
			O(Y, true)
		};
		this.infowindow = function (Z) {
			var aa = [], Y = "values" in Z.todo;
			if (!Y) {
				if (Z.latLng) {
					Z.opts.position = Z.latLng
				}
				Z.todo.values = [
					{options: Z.opts}
				]
			}
			y.each(Z.todo.values, function (ac, ad) {
				var af, ae, ab = b(Z, ad);
				ab.options.position = ab.options.position ? I(ab.options.position) : I(ad.latLng);
				if (!N) {
					L(ab.options.position)
				}
				ae = new z.classes.InfoWindow(ab.options);
				if (ae && ((ab.open === t) || ab.open)) {
					if (Y) {
						ae.open(N, ab.anchor ? ab.anchor : t)
					} else {
						ae.open(N, ab.anchor ? ab.anchor : (Z.latLng ? t : (Z.session.marker ? Z.session.marker : t)))
					}
				}
				aa.push(ae);
				af = V.add({todo: ab}, "infowindow", ae);
				n(T, {todo: ab}, ae, af)
			});
			O(Z, Y ? aa : aa[0])
		};
		this.circle = function (Z) {
			var aa = [], Y = "values" in Z.todo;
			if (!Y) {
				Z.opts.center = Z.latLng || I(Z.opts.center);
				Z.todo.values = [
					{options: Z.opts}
				]
			}
			if (!Z.todo.values.length) {
				O(Z, false);
				return
			}
			y.each(Z.todo.values, function (ac, ad) {
				var af, ae, ab = b(Z, ad);
				ab.options.center = ab.options.center ? I(ab.options.center) : I(ad);
				if (!N) {
					L(ab.options.center)
				}
				ab.options.map = N;
				ae = new z.classes.Circle(ab.options);
				aa.push(ae);
				af = V.add({todo: ab}, "circle", ae);
				n(T, {todo: ab}, ae, af)
			});
			O(Z, Y ? aa : aa[0])
		};
		this.overlay = function (aa, Z) {
			var ab = [], Y = "values" in aa.todo;
			if (!Y) {
				aa.todo.values = [
					{latLng: aa.latLng, options: aa.opts}
				]
			}
			if (!aa.todo.values.length) {
				O(aa, false);
				return
			}
			if (!e.__initialised) {
				e.prototype = new z.classes.OverlayView();
				e.__initialised = true
			}
			y.each(aa.todo.values, function (ae, af) {
				var ah, ag, ac = b(aa, af), ad = y(document.createElement("div")).css({
					border: "none",
					borderWidth: "0px",
					position: "absolute"
				});
				ad.append(ac.options.content);
				ag = new e(N, ac.options, I(ac) || I(af), ad);
				ab.push(ag);
				ad = null;
				if (!Z) {
					ah = V.add(aa, "overlay", ag);
					n(T, {todo: ac}, ag, ah)
				}
			});
			if (Z) {
				return ab[0]
			}
			O(aa, Y ? ab : ab[0])
		};
		this.getaddress = function (Y) {
			X(Y, Y.results, Y.status);
			P.ack()
		};
		this.getlatlng = function (Y) {
			X(Y, Y.results, Y.status);
			P.ack()
		};
		this.getmaxzoom = function (Y) {
			q().getMaxZoomAtLatLng(Y.latLng, function (Z) {
				X(Y, Z.status === google.maps.MaxZoomStatus.OK ? Z.zoom : false, status);
				P.ack()
			})
		};
		this.getelevation = function (Z) {
			var aa, Y = [], ab = function (ad, ac) {
				X(Z, ac === google.maps.ElevationStatus.OK ? ad : false, ac);
				P.ack()
			};
			if (Z.latLng) {
				Y.push(Z.latLng)
			} else {
				Y = g(Z.todo.locations || []);
				for (aa = 0; aa < Y.length; aa++) {
					Y[aa] = I(Y[aa])
				}
			}
			if (Y.length) {
				h().getElevationForLocations({locations: Y}, ab)
			} else {
				if (Z.todo.path && Z.todo.path.length) {
					for (aa = 0; aa < Z.todo.path.length; aa++) {
						Y.push(I(Z.todo.path[aa]))
					}
				}
				if (Y.length) {
					h().getElevationAlongPath({path: Y, samples: Z.todo.samples}, ab)
				} else {
					P.ack()
				}
			}
		};
		this.defaults = function (Y) {
			y.each(Y.todo, function (Z, aa) {
				if (typeof z[Z] === "object") {
					z[Z] = y.extend({}, z[Z], aa)
				} else {
					z[Z] = aa
				}
			});
			P.ack(true)
		};
		this.rectangle = function (Z) {
			var aa = [], Y = "values" in Z.todo;
			if (!Y) {
				Z.todo.values = [
					{options: Z.opts}
				]
			}
			if (!Z.todo.values.length) {
				O(Z, false);
				return
			}
			y.each(Z.todo.values, function (ac, ad) {
				var af, ae, ab = b(Z, ad);
				ab.options.bounds = ab.options.bounds ? j(ab.options.bounds) : j(ad);
				if (!N) {
					L(ab.options.bounds.getCenter())
				}
				ab.options.map = N;
				ae = new z.classes.Rectangle(ab.options);
				aa.push(ae);
				af = V.add({todo: ab}, "rectangle", ae);
				n(T, {todo: ab}, ae, af)
			});
			O(Z, Y ? aa : aa[0])
		};
		function M(Z, aa, ab) {
			var ac = [], Y = "values" in Z.todo;
			if (!Y) {
				Z.todo.values = [
					{options: Z.opts}
				]
			}
			if (!Z.todo.values.length) {
				O(Z, false);
				return
			}
			L();
			y.each(Z.todo.values, function (af, ah) {
				var aj, ag, ae, ai, ad = b(Z, ah);
				if (ad.options[ab]) {
					if (ad.options[ab][0][0] && y.isArray(ad.options[ab][0][0])) {
						for (ag = 0; ag < ad.options[ab].length; ag++) {
							for (ae = 0; ae < ad.options[ab][ag].length; ae++) {
								ad.options[ab][ag][ae] = I(ad.options[ab][ag][ae])
							}
						}
					} else {
						for (ag = 0; ag < ad.options[ab].length; ag++) {
							ad.options[ab][ag] = I(ad.options[ab][ag])
						}
					}
				}
				ad.options.map = N;
				ai = new google.maps[aa](ad.options);
				ac.push(ai);
				aj = V.add({todo: ad}, aa.toLowerCase(), ai);
				n(T, {todo: ad}, ai, aj)
			});
			O(Z, Y ? ac : ac[0])
		}

		this.polyline = function (Y) {
			M(Y, "Polyline", "path")
		};
		this.polygon = function (Y) {
			M(Y, "Polygon", "paths")
		};
		this.trafficlayer = function (Y) {
			L();
			var Z = V.get("trafficlayer");
			if (!Z) {
				Z = new z.classes.TrafficLayer();
				Z.setMap(N);
				V.add(Y, "trafficlayer", Z)
			}
			O(Y, Z)
		};
		this.bicyclinglayer = function (Y) {
			L();
			var Z = V.get("bicyclinglayer");
			if (!Z) {
				Z = new z.classes.BicyclingLayer();
				Z.setMap(N);
				V.add(Y, "bicyclinglayer", Z)
			}
			O(Y, Z)
		};
		this.groundoverlay = function (Y) {
			Y.opts.bounds = j(Y.opts.bounds);
			if (Y.opts.bounds) {
				L(Y.opts.bounds.getCenter())
			}
			var aa, Z = new z.classes.GroundOverlay(Y.opts.url, Y.opts.bounds, Y.opts.opts);
			Z.setMap(N);
			aa = V.add(Y, "groundoverlay", Z);
			O(Y, Z, aa)
		};
		this.streetviewpanorama = function (Y) {
			if (!Y.opts.opts) {
				Y.opts.opts = {}
			}
			if (Y.latLng) {
				Y.opts.opts.position = Y.latLng
			} else {
				if (Y.opts.opts.position) {
					Y.opts.opts.position = I(Y.opts.opts.position)
				}
			}
			if (Y.todo.divId) {
				Y.opts.container = document.getElementById(Y.todo.divId)
			} else {
				if (Y.opts.container) {
					Y.opts.container = y(Y.opts.container).get(0)
				}
			}
			var aa, Z = new z.classes.StreetViewPanorama(Y.opts.container, Y.opts.opts);
			if (Z) {
				N.setStreetView(Z)
			}
			aa = V.add(Y, "streetviewpanorama", Z);
			O(Y, Z, aa)
		};
		this.kmllayer = function (Z) {
			var aa = [], Y = "values" in Z.todo;
			if (!Y) {
				Z.todo.values = [
					{options: Z.opts}
				]
			}
			if (!Z.todo.values.length) {
				O(Z, false);
				return
			}
			y.each(Z.todo.values, function (ad, ae) {
				var ag, af, ac, ab = b(Z, ae);
				if (!N) {
					L()
				}
				ac = ab.options;
				if (ab.options.opts) {
					ac = ab.options.opts;
					if (ab.options.url) {
						ac.url = ab.options.url
					}
				}
				ac.map = N;
				if (d("3.10")) {
					af = new z.classes.KmlLayer(ac)
				} else {
					af = new z.classes.KmlLayer(ac.url, ac)
				}
				aa.push(af);
				ag = V.add({todo: ab}, "kmllayer", af);
				n(T, {todo: ab}, af, ag)
			});
			O(Z, Y ? aa : aa[0])
		};
		this.panel = function (ab) {
			L();
			var ad, Y = 0, ac = 0, aa, Z = y(document.createElement("div"));
			Z.css({position: "absolute", zIndex: 1000, visibility: "hidden"});
			if (ab.opts.content) {
				aa = y(ab.opts.content);
				Z.append(aa);
				T.first().prepend(Z);
				if (ab.opts.left !== t) {
					Y = ab.opts.left
				} else {
					if (ab.opts.right !== t) {
						Y = T.width() - aa.width() - ab.opts.right
					} else {
						if (ab.opts.center) {
							Y = (T.width() - aa.width()) / 2
						}
					}
				}
				if (ab.opts.top !== t) {
					ac = ab.opts.top
				} else {
					if (ab.opts.bottom !== t) {
						ac = T.height() - aa.height() - ab.opts.bottom
					} else {
						if (ab.opts.middle) {
							ac = (T.height() - aa.height()) / 2
						}
					}
				}
				Z.css({top: ac, left: Y, visibility: "visible"})
			}
			ad = V.add(ab, "panel", Z);
			O(ab, Z, ad);
			Z = null
		};
		function W(aa) {
			var af = new F(T, N, aa), Y = {}, ab = {}, ae = [], ad = /^[0-9]+$/, ac, Z;
			for (Z in aa) {
				if (ad.test(Z)) {
					ae.push(1 * Z);
					ab[Z] = aa[Z];
					ab[Z].width = ab[Z].width || 0;
					ab[Z].height = ab[Z].height || 0
				} else {
					Y[Z] = aa[Z]
				}
			}
			ae.sort(function (ah, ag) {
				return ah > ag
			});
			if (Y.calculator) {
				ac = function (ag) {
					var ah = [];
					y.each(ag, function (aj, ai) {
						ah.push(af.value(ai))
					});
					return Y.calculator.apply(T, [ah])
				}
			} else {
				ac = function (ag) {
					return ag.length
				}
			}
			af.error(function () {
				u.apply(S, arguments)
			});
			af.display(function (ag) {
				var ai, aj, am, ak, al, ah = ac(ag.indexes);
				if (aa.force || ah > 1) {
					for (ai = 0; ai < ae.length; ai++) {
						if (ae[ai] <= ah) {
							aj = ab[ae[ai]]
						}
					}
				}
				if (aj) {
					al = aj.offset || [-aj.width / 2, -aj.height / 2];
					am = y.extend({}, Y);
					am.options = y.extend({
						pane: "overlayLayer",
						content: aj.content ? aj.content.replace("CLUSTER_COUNT", ah) : "",
						offset: {x: ("x" in al ? al.x : al[0]) || 0, y: ("y" in al ? al.y : al[1]) || 0}
					}, Y.options || {});
					ak = S.overlay({todo: am, opts: am.options, latLng: I(ag)}, true);
					am.options.pane = "floatShadow";
					am.options.content = y(document.createElement("div")).width(aj.width + "px").height(aj.height + "px").css({cursor: "pointer"});
					shadow = S.overlay({todo: am, opts: am.options, latLng: I(ag)}, true);
					Y.data = {latLng: I(ag), markers: []};
					y.each(ag.indexes, function (ao, an) {
						Y.data.markers.push(af.value(an));
						if (af.markerIsSet(an)) {
							af.marker(an).setMap(null)
						}
					});
					n(T, {todo: Y}, shadow, t, {main: ak, shadow: shadow});
					af.store(ag, ak, shadow)
				} else {
					y.each(ag.indexes, function (ao, an) {
						af.marker(an).setMap(N)
					})
				}
			});
			return af
		}

		this.marker = function (aa) {
			var Y = "values" in aa.todo, ad = !N;
			if (!Y) {
				aa.opts.position = aa.latLng || I(aa.opts.position);
				aa.todo.values = [
					{options: aa.opts}
				]
			}
			if (!aa.todo.values.length) {
				O(aa, false);
				return
			}
			if (ad) {
				L()
			}
			if (aa.todo.cluster && !N.getBounds()) {
				google.maps.event.addListenerOnce(N, "bounds_changed", function () {
					S.marker.apply(S, [aa])
				});
				return
			}
			if (aa.todo.cluster) {
				var Z, ab;
				if (aa.todo.cluster instanceof a) {
					Z = aa.todo.cluster;
					ab = V.getById(Z.id(), true)
				} else {
					ab = W(aa.todo.cluster);
					Z = new a(k(aa.todo.id, true), ab);
					V.add(aa, "clusterer", Z, ab)
				}
				ab.beginUpdate();
				y.each(aa.todo.values, function (af, ag) {
					var ae = b(aa, ag);
					ae.options.position = ae.options.position ? I(ae.options.position) : I(ag);
					ae.options.map = N;
					if (ad) {
						N.setCenter(ae.options.position);
						ad = false
					}
					ab.add(ae, ag)
				});
				ab.endUpdate();
				O(aa, Z)
			} else {
				var ac = [];
				y.each(aa.todo.values, function (af, ag) {
					var ai, ah, ae = b(aa, ag);
					ae.options.position = ae.options.position ? I(ae.options.position) : I(ag);
					ae.options.map = N;
					if (ad) {
						N.setCenter(ae.options.position);
						ad = false
					}
					ah = new z.classes.Marker(ae.options);
					ac.push(ah);
					ai = V.add({todo: ae}, "marker", ah);
					n(T, {todo: ae}, ah, ai)
				});
				O(aa, Y ? ac : ac[0])
			}
		};
		this.getroute = function (Y) {
			Y.opts.origin = I(Y.opts.origin, true);
			Y.opts.destination = I(Y.opts.destination, true);
			G().route(Y.opts, function (aa, Z) {
				X(Y, Z == google.maps.DirectionsStatus.OK ? aa : false, Z);
				P.ack()
			})
		};
		this.directionsrenderer = function (Y) {
			Y.opts.map = N;
			var aa, Z = new google.maps.DirectionsRenderer(Y.opts);
			if (Y.todo.divId) {
				Z.setPanel(document.getElementById(Y.todo.divId))
			} else {
				if (Y.todo.container) {
					Z.setPanel(y(Y.todo.container).get(0))
				}
			}
			aa = V.add(Y, "directionsrenderer", Z);
			O(Y, Z, aa)
		};
		this.getgeoloc = function (Y) {
			O(Y, Y.latLng)
		};
		this.styledmaptype = function (Y) {
			L();
			var Z = new z.classes.StyledMapType(Y.todo.styles, Y.opts);
			N.mapTypes.set(Y.todo.id, Z);
			O(Y, Z)
		};
		this.imagemaptype = function (Y) {
			L();
			var Z = new z.classes.ImageMapType(Y.opts);
			N.mapTypes.set(Y.todo.id, Z);
			O(Y, Z)
		};
		this.autofit = function (Y) {
			var Z = new google.maps.LatLngBounds();
			y.each(V.all(), function (aa, ab) {
				if (ab.getPosition) {
					Z.extend(ab.getPosition())
				} else {
					if (ab.getBounds) {
						Z.extend(ab.getBounds().getNorthEast());
						Z.extend(ab.getBounds().getSouthWest())
					} else {
						if (ab.getPaths) {
							ab.getPaths().forEach(function (ac) {
								ac.forEach(function (ad) {
									Z.extend(ad)
								})
							})
						} else {
							if (ab.getPath) {
								ab.getPath().forEach(function (ac) {
									Z.extend(ac);
									""
								})
							} else {
								if (ab.getCenter) {
									Z.extend(ab.getCenter())
								} else {
									if (ab instanceof a) {
										ab = V.getById(ab.id(), true);
										if (ab) {
											ab.autofit(Z)
										}
									}
								}
							}
						}
					}
				}
			});
			if (!Z.isEmpty() && (!N.getBounds() || !N.getBounds().equals(Z))) {
				if ("maxZoom" in Y.todo) {
					google.maps.event.addListenerOnce(N, "bounds_changed", function () {
						if (this.getZoom() > Y.todo.maxZoom) {
							this.setZoom(Y.todo.maxZoom)
						}
					})
				}
				N.fitBounds(Z)
			}
			O(Y, true)
		};
		this.clear = function (Y) {
			if (typeof Y.todo === "string") {
				if (V.clearById(Y.todo) || V.objClearById(Y.todo)) {
					O(Y, true);
					return
				}
				Y.todo = {name: Y.todo}
			}
			if (Y.todo.id) {
				y.each(g(Y.todo.id), function (Z, aa) {
					V.clearById(aa) || V.objClearById(aa)
				})
			} else {
				V.clear(g(Y.todo.name), Y.todo.last, Y.todo.first, Y.todo.tag);
				V.objClear(g(Y.todo.name), Y.todo.last, Y.todo.first, Y.todo.tag)
			}
			O(Y, true)
		};
		this.exec = function (Y) {
			var Z = this;
			y.each(g(Y.todo.func), function (aa, ab) {
				y.each(Z.get(Y.todo, true, Y.todo.hasOwnProperty("full") ? Y.todo.full : true), function (ac, ad) {
					ab.call(T, ad)
				})
			});
			O(Y, true)
		};
		this.get = function (aa, ad, ac) {
			var Z, ab, Y = ad ? aa : aa.todo;
			if (!ad) {
				ac = Y.full
			}
			if (typeof Y === "string") {
				ab = V.getById(Y, false, ac) || V.objGetById(Y);
				if (ab === false) {
					Z = Y;
					Y = {}
				}
			} else {
				Z = Y.name
			}
			if (Z === "map") {
				ab = N
			}
			if (!ab) {
				ab = [];
				if (Y.id) {
					y.each(g(Y.id), function (ae, af) {
						ab.push(V.getById(af, false, ac) || V.objGetById(af))
					});
					if (!y.isArray(Y.id)) {
						ab = ab[0]
					}
				} else {
					y.each(Z ? g(Z) : [t], function (af, ag) {
						var ae;
						if (Y.first) {
							ae = V.get(ag, false, Y.tag, ac);
							if (ae) {
								ab.push(ae)
							}
						} else {
							if (Y.all) {
								y.each(V.all(ag, Y.tag, ac), function (ai, ah) {
									ab.push(ah)
								})
							} else {
								ae = V.get(ag, true, Y.tag, ac);
								if (ae) {
									ab.push(ae)
								}
							}
						}
					});
					if (!Y.all && !y.isArray(Z)) {
						ab = ab[0]
					}
				}
			}
			ab = y.isArray(ab) || !Y.all ? ab : [ab];
			if (ad) {
				return ab
			} else {
				O(aa, ab)
			}
		};
		this.getdistance = function (Y) {
			var Z;
			Y.opts.origins = g(Y.opts.origins);
			for (Z = 0; Z < Y.opts.origins.length; Z++) {
				Y.opts.origins[Z] = I(Y.opts.origins[Z], true)
			}
			Y.opts.destinations = g(Y.opts.destinations);
			for (Z = 0; Z < Y.opts.destinations.length; Z++) {
				Y.opts.destinations[Z] = I(Y.opts.destinations[Z], true)
			}
			B().getDistanceMatrix(Y.opts, function (ab, aa) {
				X(Y, aa === google.maps.DistanceMatrixStatus.OK ? ab : false, aa);
				P.ack()
			})
		};
		this.trigger = function (Z) {
			if (typeof Z.todo === "string") {
				google.maps.event.trigger(N, Z.todo)
			} else {
				var Y = [N, Z.todo.eventName];
				if (Z.todo.var_args) {
					y.each(Z.todo.var_args, function (ab, aa) {
						Y.push(aa)
					})
				}
				google.maps.event.trigger.apply(google.maps.event, Y)
			}
			X(Z);
			P.ack()
		}
	}

	function s(M) {
		var L;
		if (!typeof M === "object" || !M.hasOwnProperty("get")) {
			return false
		}
		for (L in M) {
			if (L !== "get") {
				return false
			}
		}
		return !M.get.hasOwnProperty("callback")
	}

	y.fn.gmap3 = function () {
		var M, O = [], N = true, L = [];
		J();
		for (M = 0; M < arguments.length; M++) {
			if (arguments[M]) {
				O.push(arguments[M])
			}
		}
		if (!O.length) {
			O.push("map")
		}
		y.each(this, function () {
			var P = y(this), Q = P.data("gmap3");
			N = false;
			if (!Q) {
				Q = new K(P);
				P.data("gmap3", Q)
			}
			if (O.length === 1 && (O[0] === "get" || s(O[0]))) {
				if (O[0] === "get") {
					L.push(Q.get("map", true))
				} else {
					L.push(Q.get(O[0].get, true, O[0].get.full))
				}
			} else {
				Q._plan(O)
			}
		});
		if (L.length) {
			if (L.length === 1) {
				return L[0]
			} else {
				return L
			}
		}
		return this
	}
})(jQuery);

/*!
 * headroom.js v0.5.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function(window, document) {

    'use strict';

    /* exported features */

    var features = {
        bind : !!(function(){}.bind),
        classList : 'classList' in document.documentElement,
        rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
    };
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    /**
     * Handles debouncing of events via requestAnimationFrame
     * @see http://www.html5rocks.com/en/tutorials/speed/animations/
     * @param {Function} callback The callback to handle whichever event
     */
    function Debouncer (callback) {
        this.callback = callback;
        this.ticking = false;
    }
    Debouncer.prototype = {
        constructor : Debouncer,

        /**
         * dispatches the event to the supplied callback
         * @private
         */
        update : function() {
            this.callback && this.callback();
            this.ticking = false;
        },

        /**
         * ensures events don't get stacked
         * @private
         */
        requestTick : function() {
            if(!this.ticking) {
                requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
                this.ticking = true;
            }
        },

        /**
         * Attach this as the event listeners
         */
        handleEvent : function() {
            this.requestTick();
        }
    };
    /**
     * Helper function for extending objects
     */
    function extend (object /*, objectN ... */) {
        if(arguments.length <= 0) {
            throw new Error('Missing arguments in extend function');
        }

        var result = object || {},
            key,
            i;

        for (i = 1; i < arguments.length; i++) {
            var replacement = arguments[i] || {};

            for (key in replacement) {
                if(typeof result[key] === 'object') {
                    result[key] = extend(result[key], replacement[key]);
                }
                else {
                    result[key] = result[key] || replacement[key];
                }
            }
        }

        return result;
    }

    /**
     * Helper function for normalizing tolerance option to object format
     */
    function normalizeTolerance (t) {
        return t === Object(t) ? t : { down : t, up : t };
    }

    /**
     * UI enhancement for fixed headers.
     * Hides header when scrolling down
     * Shows header when scrolling up
     * @constructor
     * @param {DOMElement} elem the header element
     * @param {Object} options options for the widget
     */
    function Headroom (elem, options) {
        options = extend(options, Headroom.options);

        this.lastKnownScrollY = 0;
        this.elem             = elem;
        this.debouncer        = new Debouncer(this.update.bind(this));
        this.tolerance        = normalizeTolerance(options.tolerance);
        this.classes          = options.classes;
        this.offset           = options.offset;
        this.initialised      = false;
        this.onPin            = options.onPin;
        this.onUnpin          = options.onUnpin;
        this.onTop            = options.onTop;
        this.onNotTop         = options.onNotTop;
    }
    Headroom.prototype = {
        constructor : Headroom,

        /**
         * Initialises the widget
         */
        init : function() {
            if(!Headroom.cutsTheMustard) {
                return;
            }

            this.elem.classList.add(this.classes.initial);

            // defer event registration to handle browser
            // potentially restoring previous scroll position
            setTimeout(this.attachEvent.bind(this), 100);

            return this;
        },

        /**
         * Unattaches events and removes any classes that were added
         */
        destroy : function() {
            var classes = this.classes;

            this.initialised = false;
            window.removeEventListener('scroll', this.debouncer, false);
            this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.initial);
        },

        /**
         * Attaches the scroll event
         * @private
         */
        attachEvent : function() {
            if(!this.initialised){
                this.lastKnownScrollY = this.getScrollY();
                this.initialised = true;
                window.addEventListener('scroll', this.debouncer, false);

                this.debouncer.handleEvent();
            }
        },

        /**
         * Unpins the header if it's currently pinned
         */
        unpin : function() {
            var classList = this.elem.classList,
                classes = this.classes;

            if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
                classList.add(classes.unpinned);
                classList.remove(classes.pinned);
                this.onUnpin && this.onUnpin.call(this);
            }
        },

        /**
         * Pins the header if it's currently unpinned
         */
        pin : function() {
            var classList = this.elem.classList,
                classes = this.classes;

            if(classList.contains(classes.unpinned)) {
                classList.remove(classes.unpinned);
                classList.add(classes.pinned);
                this.onPin && this.onPin.call(this);
            }
        },

        /**
         * Handles the top states
         */
        top : function() {
            var classList = this.elem.classList,
                classes = this.classes;

            if(!classList.contains(classes.top)) {
                classList.add(classes.top);
                classList.remove(classes.notTop);
                this.onTop && this.onTop.call(this);
            }
        },

        /**
         * Handles the not top state
         */
        notTop : function() {
            var classList = this.elem.classList,
                classes = this.classes;

            if(!classList.contains(classes.notTop)) {
                classList.add(classes.notTop);
                classList.remove(classes.top);
                this.onNotTop && this.onNotTop.call(this);
            }
        },

        /**
         * Gets the Y scroll position
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
         * @return {Number} pixels the page has scrolled along the Y-axis
         */
        getScrollY : function() {
            return (window.pageYOffset !== undefined)
                ? window.pageYOffset
                : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        },

        /**
         * Gets the height of the viewport
         * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
         * @return {int} the height of the viewport in pixels
         */
        getViewportHeight : function () {
            return window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
        },

        /**
         * Gets the height of the document
         * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
         * @return {int} the height of the document in pixels
         */
        getDocumentHeight : function () {
            var body = document.body,
                documentElement = document.documentElement;

            return Math.max(
                body.scrollHeight, documentElement.scrollHeight,
                body.offsetHeight, documentElement.offsetHeight,
                body.clientHeight, documentElement.clientHeight
            );
        },

        /**
         * determines if the scroll position is outside of document boundaries
         * @param  {int}  currentScrollY the current y scroll position
         * @return {bool} true if out of bounds, false otherwise
         */
        isOutOfBounds : function (currentScrollY) {
            var pastTop  = currentScrollY < 0,
                pastBottom = currentScrollY + this.getViewportHeight() > this.getDocumentHeight();

            return pastTop || pastBottom;
        },

        /**
         * determines if the tolerance has been exceeded
         * @param  {int} currentScrollY the current scroll y position
         * @return {bool} true if tolerance exceeded, false otherwise
         */
        toleranceExceeded : function (currentScrollY, direction) {
            return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
        },

        /**
         * determine if it is appropriate to unpin
         * @param  {int} currentScrollY the current y scroll position
         * @param  {bool} toleranceExceeded has the tolerance been exceeded?
         * @return {bool} true if should unpin, false otherwise
         */
        shouldUnpin : function (currentScrollY, toleranceExceeded) {
            var scrollingDown = currentScrollY > this.lastKnownScrollY,
                pastOffset = currentScrollY >= this.offset;

            return scrollingDown && pastOffset && toleranceExceeded;
        },

        /**
         * determine if it is appropriate to pin
         * @param  {int} currentScrollY the current y scroll position
         * @param  {bool} toleranceExceeded has the tolerance been exceeded?
         * @return {bool} true if should pin, false otherwise
         */
        shouldPin : function (currentScrollY, toleranceExceeded) {
            var scrollingUp  = currentScrollY < this.lastKnownScrollY,
                pastOffset = currentScrollY <= this.offset;

            return (scrollingUp && toleranceExceeded) || pastOffset;
        },

        /**
         * Handles updating the state of the widget
         */
        update : function() {
            var currentScrollY  = this.getScrollY(),
                scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
                toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);

            if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
                return;
            }

            if (currentScrollY <= this.offset ) {
                this.top();
            } else {
                this.notTop();
            }

            if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
                this.unpin();
            }
            else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
                this.pin();
            }

            this.lastKnownScrollY = currentScrollY;
        }
    };
    /**
     * Default options
     * @type {Object}
     */
    Headroom.options = {
        tolerance : {
            up : 0,
            down : 0
        },
        offset : 0,
        classes : {
            pinned : 'headroom--pinned',
            unpinned : 'headroom--unpinned',
            top : 'headroom--top',
            notTop : 'headroom--not-top',
            initial : 'headroom'
        }
    };
    Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

    window.Headroom = Headroom;

}(window, document));

(function($) {

    if(!$) {
        return;
    }

    ////////////
    // Plugin //
    ////////////

    $.fn.headroom = function(option) {
        return this.each(function() {
            var $this   = $(this),
                data      = $this.data('headroom'),
                options   = typeof option === 'object' && option;

            options = $.extend(true, {}, Headroom.options, options);

            if (!data) {
                data = new Headroom(this, options);
                data.init();
                $this.data('headroom', data);
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    //////////////
    // Data API //
    //////////////

    $('[data-headroom]').each(function() {
        var $this = $(this);
        $this.headroom($this.data());
    });

}(window.Zepto || window.jQuery));
/* --- $HOVERINTENT --- */

/* hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function (e) {
	e.fn.hoverIntent = function (t, n, r) {
		var i = {interval: 100, sensitivity: 7, timeout: 0};
		if (typeof t === "object") {
			i = e.extend(i, t)
		} else if (e.isFunction(n)) {
			i = e.extend(i, {over: t, out: n, selector: r})
		} else {
			i = e.extend(i, {over: t, out: t, selector: n})
		}
		var s, o, u, a;
		var f = function (e) {
			s = e.pageX;
			o = e.pageY
		};
		var l = function (t, n) {
			n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
			if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
				e(n).off("mousemove.hoverIntent", f);
				n.hoverIntent_s = 1;
				return i.over.apply(n, [t])
			} else {
				u = s;
				a = o;
				n.hoverIntent_t = setTimeout(function () {
					l(t, n)
				}, i.interval)
			}
		};
		var c = function (e, t) {
			t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
			t.hoverIntent_s = 0;
			return i.out.apply(t, [e])
		};
		var h = function (t) {
			var n = jQuery.extend({}, t);
			var r = this;
			if (r.hoverIntent_t) {
				r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
			}
			if (t.type == "mouseenter") {
				u = n.pageX;
				a = n.pageY;
				e(r).on("mousemove.hoverIntent", f);
				if (r.hoverIntent_s != 1) {
					r.hoverIntent_t = setTimeout(function () {
						l(n, r)
					}, i.interval)
				}
			} else {
				e(r).off("mousemove.hoverIntent", f);
				if (r.hoverIntent_s == 1) {
					r.hoverIntent_t = setTimeout(function () {
						c(n, r)
					}, i.timeout)
				}
			}
		};
		return this.on({"mouseenter.hoverIntent": h, "mouseleave.hoverIntent": h}, i.selector)
	}
})(jQuery);

/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
	function e() {
	}

	function t(e, t) {
		for (var n = e.length; n--;)if (e[n].listener === t)return n;
		return-1
	}

	function n(e) {
		return function () {
			return this[e].apply(this, arguments)
		}
	}

	var i = e.prototype, r = this, o = r.EventEmitter;
	i.getListeners = function (e) {
		var t, n, i = this._getEvents();
		if ("object" == typeof e) {
			t = {};
			for (n in i)i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
		} else t = i[e] || (i[e] = []);
		return t
	}, i.flattenListeners = function (e) {
		var t, n = [];
		for (t = 0; e.length > t; t += 1)n.push(e[t].listener);
		return n
	}, i.getListenersAsObject = function (e) {
		var t, n = this.getListeners(e);
		return n instanceof Array && (t = {}, t[e] = n), t || n
	}, i.addListener = function (e, n) {
		var i, r = this.getListenersAsObject(e), o = "object" == typeof n;
		for (i in r)r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {listener: n, once: !1});
		return this
	}, i.on = n("addListener"), i.addOnceListener = function (e, t) {
		return this.addListener(e, {listener: t, once: !0})
	}, i.once = n("addOnceListener"), i.defineEvent = function (e) {
		return this.getListeners(e), this
	}, i.defineEvents = function (e) {
		for (var t = 0; e.length > t; t += 1)this.defineEvent(e[t]);
		return this
	}, i.removeListener = function (e, n) {
		var i, r, o = this.getListenersAsObject(e);
		for (r in o)o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
		return this
	}, i.off = n("removeListener"), i.addListeners = function (e, t) {
		return this.manipulateListeners(!1, e, t)
	}, i.removeListeners = function (e, t) {
		return this.manipulateListeners(!0, e, t)
	}, i.manipulateListeners = function (e, t, n) {
		var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners;
		if ("object" != typeof t || t instanceof RegExp)for (i = n.length; i--;)o.call(this, t, n[i]); else for (i in t)t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
		return this
	}, i.removeEvent = function (e) {
		var t, n = typeof e, i = this._getEvents();
		if ("string" === n)delete i[e]; else if ("object" === n)for (t in i)i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events;
		return this
	}, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
		var n, i, r, o, s = this.getListenersAsObject(e);
		for (r in s)if (s.hasOwnProperty(r))for (i = s[r].length; i--;)n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
		return this
	}, i.trigger = n("emitEvent"), i.emit = function (e) {
		var t = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(e, t)
	}, i.setOnceReturnValue = function (e) {
		return this._onceReturnValue = e, this
	}, i._getOnceReturnValue = function () {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, i._getEvents = function () {
		return this._events || (this._events = {})
	}, e.noConflict = function () {
		return r.EventEmitter = o, e
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
		return e
	}) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this), function (e) {
	function t(t) {
		var n = e.event;
		return n.target = n.target || n.srcElement || t, n
	}

	var n = document.documentElement, i = function () {
	};
	n.addEventListener ? i = function (e, t, n) {
		e.addEventListener(t, n, !1)
	} : n.attachEvent && (i = function (e, n, i) {
		e[n + i] = i.handleEvent ? function () {
			var n = t(e);
			i.handleEvent.call(i, n)
		} : function () {
			var n = t(e);
			i.call(e, n)
		}, e.attachEvent("on" + n, e[n + i])
	});
	var r = function () {
	};
	n.removeEventListener ? r = function (e, t, n) {
		e.removeEventListener(t, n, !1)
	} : n.detachEvent && (r = function (e, t, n) {
		e.detachEvent("on" + t, e[t + n]);
		try {
			delete e[t + n]
		} catch (i) {
			e[t + n] = void 0
		}
	});
	var o = {bind: i, unbind: r};
	"function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
}(this), function (e, t) {
	"function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
		return t(e, n, i)
	}) : "object" == typeof exports ? module.exports = t(e, require("eventEmitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(this, function (e, t, n) {
	function i(e, t) {
		for (var n in t)e[n] = t[n];
		return e
	}

	function r(e) {
		return"[object Array]" === d.call(e)
	}

	function o(e) {
		var t = [];
		if (r(e))t = e; else if ("number" == typeof e.length)for (var n = 0, i = e.length; i > n; n++)t.push(e[n]); else t.push(e);
		return t
	}

	function s(e, t, n) {
		if (!(this instanceof s))return new s(e, t);
		"string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
		var r = this;
		setTimeout(function () {
			r.check()
		})
	}

	function c(e) {
		this.img = e
	}

	function f(e) {
		this.src = e, v[e] = this
	}

	var a = e.jQuery, u = e.console, h = u !== void 0, d = Object.prototype.toString;
	s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
		this.images = [];
		for (var e = 0, t = this.elements.length; t > e; e++) {
			var n = this.elements[e];
			"IMG" === n.nodeName && this.addImage(n);
			for (var i = n.querySelectorAll("img"), r = 0, o = i.length; o > r; r++) {
				var s = i[r];
				this.addImage(s)
			}
		}
	}, s.prototype.addImage = function (e) {
		var t = new c(e);
		this.images.push(t)
	}, s.prototype.check = function () {
		function e(e, r) {
			return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
		}

		var t = this, n = 0, i = this.images.length;
		if (this.hasAnyBroken = !1, !i)return this.complete(), void 0;
		for (var r = 0; i > r; r++) {
			var o = this.images[r];
			o.on("confirm", e), o.check()
		}
	}, s.prototype.progress = function (e) {
		this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
		var t = this;
		setTimeout(function () {
			t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
		})
	}, s.prototype.complete = function () {
		var e = this.hasAnyBroken ? "fail" : "done";
		this.isComplete = !0;
		var t = this;
		setTimeout(function () {
			if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
				var n = t.hasAnyBroken ? "reject" : "resolve";
				t.jqDeferred[n](t)
			}
		})
	}, a && (a.fn.imagesLoaded = function (e, t) {
		var n = new s(this, e, t);
		return n.jqDeferred.promise(a(this))
	}), c.prototype = new t, c.prototype.check = function () {
		var e = v[this.img.src] || new f(this.img.src);
		if (e.isConfirmed)return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
		if (this.img.complete && void 0 !== this.img.naturalWidth)return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
		var t = this;
		e.on("confirm", function (e, n) {
			return t.confirm(e.isLoaded, n), !0
		}), e.check()
	}, c.prototype.confirm = function (e, t) {
		this.isLoaded = e, this.emit("confirm", this, t)
	};
	var v = {};
	return f.prototype = new t, f.prototype.check = function () {
		if (!this.isChecked) {
			var e = new Image;
			n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
		}
	}, f.prototype.handleEvent = function (e) {
		var t = "on" + e.type;
		this[t] && this[t](e)
	}, f.prototype.onload = function (e) {
		this.confirm(!0, "onload"), this.unbindProxyEvents(e)
	}, f.prototype.onerror = function (e) {
		this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
	}, f.prototype.confirm = function (e, t) {
		this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
	}, f.prototype.unbindProxyEvents = function (e) {
		n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
	}, s
});
// Magnific Popup v0.9.9 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=image+ajax+iframe+gallery+retina+fastclick
(function (a) {
	var b = "Close", c = "BeforeClose", d = "AfterClose", e = "BeforeAppend", f = "MarkupParse", g = "Open", h = "Change", i = "mfp", j = "." + i, k = "mfp-ready", l = "mfp-removing", m = "mfp-prevent-close", n, o = function () {
	}, p = !!window.jQuery, q, r = a(window), s, t, u, v, w, x = function (a, b) {
		n.ev.on(i + a + j, b)
	}, y = function (b, c, d, e) {
		var f = document.createElement("div");
		return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
	}, z = function (b, c) {
		n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]))
	}, A = function (b) {
		if (b !== w || !n.currTemplate.closeBtn)n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), w = b;
		return n.currTemplate.closeBtn
	}, B = function () {
		a.magnificPopup.instance || (n = new o, n.init(), a.magnificPopup.instance = n)
	}, C = function () {
		var a = document.createElement("p").style, b = ["ms", "O", "Moz", "Webkit"];
		if (a.transition !== undefined)return!0;
		while (b.length)if (b.pop() + "Transition"in a)return!0;
		return!1
	};
	o.prototype = {
		constructor: o, init: function () {
			var b = navigator.appVersion;
			n.isIE7 = b.indexOf("MSIE 7.") !== -1, n.isIE8 = b.indexOf("MSIE 8.") !== -1, n.isLowIE = n.isIE7 || n.isIE8, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = C(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), t = a(document), n.popupsCache = {}
		}, open: function (b) {
			s || (s = a(document.body));
			var c;
			if (b.isObj === !1) {
				n.items = b.items.toArray(), n.index = 0;
				var d = b.items, e;
				for (c = 0; c < d.length; c++) {
					e = d[c], e.parsed && (e = e.el[0]);
					if (e === b.el[0]) {
						n.index = c;
						break
					}
				}
			} else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
			if (n.isOpen) {
				n.updateItemHTML();
				return
			}
			n.types = [], v = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = t, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = y("bg").on("click" + j, function () {
				n.close()
			}), n.wrap = y("wrap").attr("tabindex", -1).on("click" + j, function (a) {
				n._checkIfClose(a.target) && n.close()
			}), n.container = y("container", n.wrap)), n.contentContainer = y("content"), n.st.preloader && (n.preloader = y("preloader", n.container, n.st.tLoading));
			var h = a.magnificPopup.modules;
			for (c = 0; c < h.length; c++) {
				var i = h[c];
				i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n)
			}
			z("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (x(f, function (a, b, c, d) {
				c.close_replaceWith = A(d.type)
			}), v += " mfp-close-btn-in") : n.wrap.append(A())), n.st.alignTop && (v += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
				overflow: n.st.overflowY,
				overflowX: "hidden",
				overflowY: n.st.overflowY
			}) : n.wrap.css({
				top: r.scrollTop(),
				position: "absolute"
			}), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
				height: t.height(),
				position: "absolute"
			}), n.st.enableEscapeKey && t.on("keyup" + j, function (a) {
				a.keyCode === 27 && n.close()
			}), r.on("resize" + j, function () {
				n.updateSize()
			}), n.st.closeOnContentClick || (v += " mfp-auto-cursor"), v && n.wrap.addClass(v);
			var l = n.wH = r.height(), m = {};
			if (n.fixedContentPos && n._hasScrollBar(l)) {
				var o = n._getScrollbarSize();
				o && (m.marginRight = o)
			}
			n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : m.overflow = "hidden");
			var p = n.st.mainClass;
			return n.isIE7 && (p += " mfp-ie7"), p && n._addClassToMFP(p), n.updateItemHTML(), z("BuildControls"), a("html").css(m), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || s), n._lastFocusedEl = document.activeElement, setTimeout(function () {
				n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), t.on("focusin" + j, n._onFocusIn)
			}, 16), n.isOpen = !0, n.updateSize(l), z(g), b
		}, close: function () {
			if (!n.isOpen)return;
			z(c), n.isOpen = !1, n.st.removalDelay && !n.isLowIE && n.supportsTransition ? (n._addClassToMFP(l), setTimeout(function () {
				n._close()
			}, n.st.removalDelay)) : n._close()
		}, _close: function () {
			z(b);
			var c = l + " " + k + " ";
			n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (c += n.st.mainClass + " "), n._removeClassFromMFP(c);
			if (n.fixedContentPos) {
				var e = {marginRight: ""};
				n.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
			}
			t.off("keyup" + j + " focusin" + j), n.ev.off(j), n.wrap.attr("class", "mfp-wrap").removeAttr("style"), n.bgOverlay.attr("class", "mfp-bg"), n.container.attr("class", "mfp-container"), n.st.showCloseBtn && (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) && n.currTemplate.closeBtn && n.currTemplate.closeBtn.detach(), n._lastFocusedEl && a(n._lastFocusedEl).focus(), n.currItem = null, n.content = null, n.currTemplate = null, n.prevHeight = 0, z(d)
		}, updateSize: function (a) {
			if (n.isIOS) {
				var b = document.documentElement.clientWidth / window.innerWidth, c = window.innerHeight * b;
				n.wrap.css("height", c), n.wH = c
			} else n.wH = a || r.height();
			n.fixedContentPos || n.wrap.css("height", n.wH), z("Resize")
		}, updateItemHTML: function () {
			var b = n.items[n.index];
			n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
			var c = b.type;
			z("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b;
			if (!n.currTemplate[c]) {
				var d = n.st[c] ? n.st[c].markup : !1;
				z("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0
			}
			u && u !== b.type && n.container.removeClass("mfp-" + u + "-holder");
			var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
			n.appendContent(e, c), b.preloaded = !0, z(h, b), u = b.type, n.container.prepend(n.contentContainer), z("AfterChange")
		}, appendContent: function (a, b) {
			n.content = a, a ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0 ? n.content.find(".mfp-close").length || n.content.append(A()) : n.content = a : n.content = "", z(e), n.container.addClass("mfp-" + b + "-holder"), n.contentContainer.append(n.content)
		}, parseEl: function (b) {
			var c = n.items[b], d;
			c.tagName ? c = {el: a(c)} : (d = c.type, c = {data: c, src: c.src});
			if (c.el) {
				var e = n.types;
				for (var f = 0; f < e.length; f++)if (c.el.hasClass("mfp-" + e[f])) {
					d = e[f];
					break
				}
				c.src = c.el.attr("data-mfp-src"), c.src || (c.src = c.el.attr("href"))
			}
			return c.type = d || n.st.type || "inline", c.index = b, c.parsed = !0, n.items[b] = c, z("ElementParse", c), n.items[b]
		}, addGroup: function (a, b) {
			var c = function (c) {
				c.mfpEl = this, n._openClick(c, a, b)
			};
			b || (b = {});
			var d = "click.magnificPopup";
			b.mainEl = a, b.items ? (b.isObj = !0, a.off(d).on(d, c)) : (b.isObj = !1, b.delegate ? a.off(d).on(d, b.delegate, c) : (b.items = a, a.off(d).on(d, c)))
		}, _openClick: function (b, c, d) {
			var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
			if (!e && (b.which === 2 || b.ctrlKey || b.metaKey))return;
			var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
			if (f)if (a.isFunction(f)) {
				if (!f.call(n))return!0
			} else if (r.width() < f)return!0;
			b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()), d.el = a(b.mfpEl), d.delegate && (d.items = c.find(d.delegate)), n.open(d)
		}, updateStatus: function (a, b) {
			if (n.preloader) {
				q !== a && n.container.removeClass("mfp-s-" + q), !b && a === "loading" && (b = n.st.tLoading);
				var c = {status: a, text: b};
				z("UpdateStatus", c), a = c.status, b = c.text, n.preloader.html(b), n.preloader.find("a").on("click", function (a) {
					a.stopImmediatePropagation()
				}), n.container.addClass("mfp-s-" + a), q = a
			}
		}, _checkIfClose: function (b) {
			if (a(b).hasClass(m))return;
			var c = n.st.closeOnContentClick, d = n.st.closeOnBgClick;
			if (c && d)return!0;
			if (!n.content || a(b).hasClass("mfp-close") || n.preloader && b === n.preloader[0])return!0;
			if (b !== n.content[0] && !a.contains(n.content[0], b)) {
				if (d && a.contains(document, b))return!0
			} else if (c)return!0;
			return!1
		}, _addClassToMFP: function (a) {
			n.bgOverlay.addClass(a), n.wrap.addClass(a)
		}, _removeClassFromMFP: function (a) {
			this.bgOverlay.removeClass(a), n.wrap.removeClass(a)
		}, _hasScrollBar: function (a) {
			return(n.isIE7 ? t.height() : document.body.scrollHeight) > (a || r.height())
		}, _setFocus: function () {
			(n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus()
		}, _onFocusIn: function (b) {
			if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target))return n._setFocus(), !1
		}, _parseMarkup: function (b, c, d) {
			var e;
			d.data && (c = a.extend(d.data, c)), z(f, [b, c, d]), a.each(c, function (a, c) {
				if (c === undefined || c === !1)return!0;
				e = a.split("_");
				if (e.length > 1) {
					var d = b.find(j + "-" + e[0]);
					if (d.length > 0) {
						var f = e[1];
						f === "replaceWith" ? d[0] !== c[0] && d.replaceWith(c) : f === "img" ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
					}
				} else b.find(j + "-" + a).html(c)
			})
		}, _getScrollbarSize: function () {
			if (n.scrollbarSize === undefined) {
				var a = document.createElement("div");
				a.id = "mfp-sbm", a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), n.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
			}
			return n.scrollbarSize
		}
	}, a.magnificPopup = {
		instance: null,
		proto: o.prototype,
		modules: [],
		open: function (b, c) {
			return B(), b ? b = a.extend(!0, {}, b) : b = {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
		},
		close: function () {
			return a.magnificPopup.instance && a.magnificPopup.instance.close()
		},
		registerModule: function (b, c) {
			c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
		},
		defaults: {
			disableOn: 0,
			key: null,
			midClick: !1,
			mainClass: "",
			preloader: !0,
			focus: "",
			closeOnContentClick: !1,
			closeOnBgClick: !0,
			closeBtnInside: !0,
			showCloseBtn: !0,
			enableEscapeKey: !0,
			modal: !1,
			alignTop: !1,
			removalDelay: 0,
			prependTo: null,
			fixedContentPos: "auto",
			fixedBgPos: "auto",
			overflowY: "auto",
			closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
			tClose: "Close (Esc)",
			tLoading: "Loading..."
		}
	}, a.fn.magnificPopup = function (b) {
		B();
		var c = a(this);
		if (typeof b == "string")if (b === "open") {
			var d, e = p ? c.data("magnificPopup") : c[0].magnificPopup, f = parseInt(arguments[1], 10) || 0;
			e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({mfpEl: d}, c, e)
		} else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1)); else b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, n.addGroup(c, b);
		return c
	};
	var D = "ajax", E, F = function () {
		E && s.removeClass(E)
	}, G = function () {
		F(), n.req && n.req.abort()
	};
	a.magnificPopup.registerModule(D, {
		options: {
			settings: null,
			cursor: "mfp-ajax-cur",
			tError: '<a href="%url%">The content</a> could not be loaded.'
		}, proto: {
			initAjax: function () {
				n.types.push(D), E = n.st.ajax.cursor, x(b + "." + D, G), x("BeforeChange." + D, G)
			}, getAjax: function (b) {
				E && s.addClass(E), n.updateStatus("loading");
				var c = a.extend({
					url: b.src, success: function (c, d, e) {
						var f = {data: c, xhr: e};
						z("ParseAjax", f), n.appendContent(a(f.data), D), b.finished = !0, F(), n._setFocus(), setTimeout(function () {
							n.wrap.addClass(k)
						}, 16), n.updateStatus("ready"), z("AjaxContentAdded")
					}, error: function () {
						F(), b.finished = b.loadError = !0, n.updateStatus("error", n.st.ajax.tError.replace("%url%", b.src))
					}
				}, n.st.ajax.settings);
				return n.req = a.ajax(c), ""
			}
		}
	});
	var H, I = function (b) {
		if (b.data && b.data.title !== undefined)return b.data.title;
		var c = n.st.image.titleSrc;
		if (c) {
			if (a.isFunction(c))return c.call(n, b);
			if (b.el)return b.el.attr(c) || ""
		}
		return""
	};
	a.magnificPopup.registerModule("image", {
		options: {
			markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
			cursor: "mfp-zoom-out-cur",
			titleSrc: "title",
			verticalFit: !0,
			tError: '<a href="%url%">The image</a> could not be loaded.'
		}, proto: {
			initImage: function () {
				var a = n.st.image, c = ".image";
				n.types.push("image"), x(g + c, function () {
					n.currItem.type === "image" && a.cursor && s.addClass(a.cursor)
				}), x(b + c, function () {
					a.cursor && s.removeClass(a.cursor), r.off("resize" + j)
				}), x("Resize" + c, n.resizeImage), n.isLowIE && x("AfterChange", n.resizeImage)
			}, resizeImage: function () {
				var a = n.currItem;
				if (!a || !a.img)return;
				if (n.st.image.verticalFit) {
					var b = 0;
					n.isLowIE && (b = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", n.wH - b)
				}
			}, _onImageHasSize: function (a) {
				a.img && (a.hasSize = !0, H && clearInterval(H), a.isCheckingImgSize = !1, z("ImageHasSize", a), a.imgHidden && (n.content && n.content.removeClass("mfp-loading"), a.imgHidden = !1))
			}, findImageSize: function (a) {
				var b = 0, c = a.img[0], d = function (e) {
					H && clearInterval(H), H = setInterval(function () {
						if (c.naturalWidth > 0) {
							n._onImageHasSize(a);
							return
						}
						b > 200 && clearInterval(H), b++, b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500)
					}, e)
				};
				d(1)
			}, getImage: function (b, c) {
				var d = 0, e = function () {
					b && (b.img[0].complete ? (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("ready")), b.hasSize = !0, b.loaded = !0, z("ImageLoadComplete")) : (d++, d < 200 ? setTimeout(e, 100) : f()))
				}, f = function () {
					b && (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("error", g.tError.replace("%url%", b.src))), b.hasSize = !0, b.loaded = !0, b.loadError = !0)
				}, g = n.st.image, h = c.find(".mfp-img");
				if (h.length) {
					var i = document.createElement("img");
					i.className = "mfp-img", b.img = a(i).on("load.mfploader", e).on("error.mfploader", f), i.src = b.src, h.is("img") && (b.img = b.img.clone()), i = b.img[0], i.naturalWidth > 0 ? b.hasSize = !0 : i.width || (b.hasSize = !1)
				}
				return n._parseMarkup(c, {
					title: I(b),
					img_replaceWith: b.img
				}, b), n.resizeImage(), b.hasSize ? (H && clearInterval(H), b.loadError ? (c.addClass("mfp-loading"), n.updateStatus("error", g.tError.replace("%url%", b.src))) : (c.removeClass("mfp-loading"), n.updateStatus("ready")), c) : (n.updateStatus("loading"), b.loading = !0, b.hasSize || (b.imgHidden = !0, c.addClass("mfp-loading"), n.findImageSize(b)), c)
			}
		}
	});
	var J, K = function () {
		return J === undefined && (J = document.createElement("p").style.MozTransform !== undefined), J
	};
	a.magnificPopup.registerModule("zoom", {
		options: {
			enabled: !1,
			easing: "ease-in-out",
			duration: 300,
			opener: function (a) {
				return a.is("img") ? a : a.find("img")
			}
		}, proto: {
			initZoom: function () {
				var a = n.st.zoom, d = ".zoom", e;
				if (!a.enabled || !n.supportsTransition)return;
				var f = a.duration, g = function (b) {
					var c = b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"), d = "all " + a.duration / 1e3 + "s " + a.easing, e = {
						position: "fixed",
						zIndex: 9999,
						left: 0,
						top: 0,
						"-webkit-backface-visibility": "hidden"
					}, f = "transition";
					return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, c.css(e), c
				}, h = function () {
					n.content.css("visibility", "visible")
				}, i, j;
				x("BuildControls" + d, function () {
					if (n._allowZoom()) {
						clearTimeout(i), n.content.css("visibility", "hidden"), e = n._getItemToZoom();
						if (!e) {
							h();
							return
						}
						j = g(e), j.css(n._getOffset()), n.wrap.append(j), i = setTimeout(function () {
							j.css(n._getOffset(!0)), i = setTimeout(function () {
								h(), setTimeout(function () {
									j.remove(), e = j = null, z("ZoomAnimationEnded")
								}, 16)
							}, f)
						}, 16)
					}
				}), x(c + d, function () {
					if (n._allowZoom()) {
						clearTimeout(i), n.st.removalDelay = f;
						if (!e) {
							e = n._getItemToZoom();
							if (!e)return;
							j = g(e)
						}
						j.css(n._getOffset(!0)), n.wrap.append(j), n.content.css("visibility", "hidden"), setTimeout(function () {
							j.css(n._getOffset())
						}, 16)
					}
				}), x(b + d, function () {
					n._allowZoom() && (h(), j && j.remove(), e = null)
				})
			}, _allowZoom: function () {
				return n.currItem.type === "image"
			}, _getItemToZoom: function () {
				return n.currItem.hasSize ? n.currItem.img : !1
			}, _getOffset: function (b) {
				var c;
				b ? c = n.currItem.img : c = n.st.zoom.opener(n.currItem.el || n.currItem);
				var d = c.offset(), e = parseInt(c.css("padding-top"), 10), f = parseInt(c.css("padding-bottom"), 10);
				d.top -= a(window).scrollTop() - e;
				var g = {width: c.width(), height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e};
				return K() ? g["-moz-transform"] = g.transform = "translate(" + d.left + "px," + d.top + "px)" : (g.left = d.left, g.top = d.top), g
			}
		}
	});
	var L = "iframe", M = "//about:blank", N = function (a) {
		if (n.currTemplate[L]) {
			var b = n.currTemplate[L].find("iframe");
			b.length && (a || (b[0].src = M), n.isIE8 && b.css("display", a ? "block" : "none"))
		}
	};
	a.magnificPopup.registerModule(L, {
		options: {
			markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
			srcAction: "iframe_src",
			patterns: {
				youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
				vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
				gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
			}
		}, proto: {
			initIframe: function () {
				n.types.push(L), x("BeforeChange", function (a, b, c) {
					b !== c && (b === L ? N() : c === L && N(!0))
				}), x(b + "." + L, function () {
					N()
				})
			}, getIframe: function (b, c) {
				var d = b.src, e = n.st.iframe;
				a.each(e.patterns, function () {
					if (d.indexOf(this.index) > -1)return this.id && (typeof this.id == "string" ? d = d.substr(d.lastIndexOf(this.id) + this.id.length, d.length) : d = this.id.call(this, d)), d = this.src.replace("%id%", d), !1
				});
				var f = {};
				return e.srcAction && (f[e.srcAction] = d), n._parseMarkup(c, f, b), n.updateStatus("ready"), c
			}
		}
	});
	var O = function (a) {
		var b = n.items.length;
		return a > b - 1 ? a - b : a < 0 ? b + a : a
	}, P = function (a, b, c) {
		return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
	};
	a.magnificPopup.registerModule("gallery", {
		options: {
			enabled: !1,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
			preload: [0, 2],
			navigateByImgClick: !0,
			arrows: !0,
			tPrev: "Previous (Left arrow key)",
			tNext: "Next (Right arrow key)",
			tCounter: "%curr% of %total%"
		}, proto: {
			initGallery: function () {
				var c = n.st.gallery, d = ".mfp-gallery", e = Boolean(a.fn.mfpFastClick);
				n.direction = !0;
				if (!c || !c.enabled)return!1;
				v += " mfp-gallery", x(g + d, function () {
					c.navigateByImgClick && n.wrap.on("click" + d, ".mfp-img", function () {
						if (n.items.length > 1)return n.next(), !1
					}), t.on("keydown" + d, function (a) {
						a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next()
					})
				}), x("UpdateStatus" + d, function (a, b) {
					b.text && (b.text = P(b.text, n.currItem.index, n.items.length))
				}), x(f + d, function (a, b, d, e) {
					var f = n.items.length;
					d.counter = f > 1 ? P(c.tCounter, e.index, f) : ""
				}), x("BuildControls" + d, function () {
					if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
						var b = c.arrowMarkup, d = n.arrowLeft = a(b.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(m), f = n.arrowRight = a(b.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(m), g = e ? "mfpFastClick" : "click";
						d[g](function () {
							n.prev()
						}), f[g](function () {
							n.next()
						}), n.isIE7 && (y("b", d[0], !1, !0), y("a", d[0], !1, !0), y("b", f[0], !1, !0), y("a", f[0], !1, !0)), n.container.append(d.add(f))
					}
				}), x(h + d, function () {
					n._preloadTimeout && clearTimeout(n._preloadTimeout), n._preloadTimeout = setTimeout(function () {
						n.preloadNearbyImages(), n._preloadTimeout = null
					}, 16)
				}), x(b + d, function () {
					t.off(d), n.wrap.off("click" + d), n.arrowLeft && e && n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(), n.arrowRight = n.arrowLeft = null
				})
			}, next: function () {
				n.direction = !0, n.index = O(n.index + 1), n.updateItemHTML()
			}, prev: function () {
				n.direction = !1, n.index = O(n.index - 1), n.updateItemHTML()
			}, goTo: function (a) {
				n.direction = a >= n.index, n.index = a, n.updateItemHTML()
			}, preloadNearbyImages: function () {
				var a = n.st.gallery.preload, b = Math.min(a[0], n.items.length), c = Math.min(a[1], n.items.length), d;
				for (d = 1; d <= (n.direction ? c : b); d++)n._preloadItem(n.index + d);
				for (d = 1; d <= (n.direction ? b : c); d++)n._preloadItem(n.index - d)
			}, _preloadItem: function (b) {
				b = O(b);
				if (n.items[b].preloaded)return;
				var c = n.items[b];
				c.parsed || (c = n.parseEl(b)), z("LazyLoad", c), c.type === "image" && (c.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
					c.hasSize = !0
				}).on("error.mfploader", function () {
					c.hasSize = !0, c.loadError = !0, z("LazyLoadError", c)
				}).attr("src", c.src)), c.preloaded = !0
			}
		}
	});
	var Q = "retina";
	a.magnificPopup.registerModule(Q, {
		options: {
			replaceSrc: function (a) {
				return a.src.replace(/\.\w+$/, function (a) {
					return"@2x" + a
				})
			}, ratio: 1
		}, proto: {
			initRetina: function () {
				if (window.devicePixelRatio > 1) {
					var a = n.st.retina, b = a.ratio;
					b = isNaN(b) ? b() : b, b > 1 && (x("ImageHasSize." + Q, function (a, c) {
						c.img.css({"max-width": c.img[0].naturalWidth / b, width: "100%"})
					}), x("ElementParse." + Q, function (c, d) {
						d.src = a.replaceSrc(d, b)
					}))
				}
			}
		}
	}), function () {
		var b = 1e3, c = "ontouchstart"in window, d = function () {
			r.off("touchmove" + f + " touchend" + f)
		}, e = "mfpFastClick", f = "." + e;
		a.fn.mfpFastClick = function (e) {
			return a(this).each(function () {
				var g = a(this), h;
				if (c) {
					var i, j, k, l, m, n;
					g.on("touchstart" + f, function (a) {
						l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], j = m.clientX, k = m.clientY, r.on("touchmove" + f, function (a) {
							m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0];
							if (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10)l = !0, d()
						}).on("touchend" + f, function (a) {
							d();
							if (l || n > 1)return;
							h = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function () {
								h = !1
							}, b), e()
						})
					})
				}
				g.on("click" + f, function () {
					h || e()
				})
			})
		}, a.fn.destroyMfpFastClick = function () {
			a(this).off("touchstart" + f + " click" + f), c && r.off("touchmove" + f + " touchend" + f)
		}
	}(), B()
})(window.jQuery || window.Zepto);

//! moment.js
//! version : 2.6.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function c(a,b){function c(){ib.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}var d=!0;return i(function(){return d&&(c(),d=!1),b.apply(this,arguments)},b)}function d(a,b){return function(c){return l(a.call(this,c),b)}}function e(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function f(){}function g(a){y(a),i(this,a)}function h(a){var b=r(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._bubble()}function i(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function j(a){var b,c={};for(b in a)a.hasOwnProperty(b)&&wb.hasOwnProperty(b)&&(c[b]=a[b]);return c}function k(a){return 0>a?Math.ceil(a):Math.floor(a)}function l(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function m(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&db(a,"Date",cb(a,"Date")+f*c),g&&bb(a,cb(a,"Month")+g*c),d&&ib.updateOffset(a,f||g)}function n(a){return"[object Array]"===Object.prototype.toString.call(a)}function o(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function p(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&t(a[d])!==t(b[d]))&&g++;return g+f}function q(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=Zb[a]||$b[b]||b}return a}function r(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=q(c),b&&(d[b]=a[c]));return d}function s(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}ib[b]=function(e,f){var g,h,i=ib.fn._lang[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=ib().utc().set(d,a);return i.call(ib.fn._lang,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function t(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function u(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function v(a,b,c){return $(ib([a,11,31+b-c]),b,c).week}function w(a){return x(a)?366:365}function x(a){return a%4===0&&a%100!==0||a%400===0}function y(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[pb]<0||a._a[pb]>11?pb:a._a[qb]<1||a._a[qb]>u(a._a[ob],a._a[pb])?qb:a._a[rb]<0||a._a[rb]>23?rb:a._a[sb]<0||a._a[sb]>59?sb:a._a[tb]<0||a._a[tb]>59?tb:a._a[ub]<0||a._a[ub]>999?ub:-1,a._pf._overflowDayOfYear&&(ob>b||b>qb)&&(b=qb),a._pf.overflow=b)}function z(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function A(a){return a?a.toLowerCase().replace("_","-"):a}function B(a,b){return b._isUTC?ib(a).zone(b._offset||0):ib(a).local()}function C(a,b){return b.abbr=a,vb[a]||(vb[a]=new f),vb[a].set(b),vb[a]}function D(a){delete vb[a]}function E(a){var b,c,d,e,f=0,g=function(a){if(!vb[a]&&xb)try{require("./lang/"+a)}catch(b){}return vb[a]};if(!a)return ib.fn._lang;if(!n(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=A(a[f]).split("-"),b=e.length,d=A(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&p(e,d,!0)>=b-1)break;b--}f++}return ib.fn._lang}function F(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function G(a){var b,c,d=a.match(Bb);for(b=0,c=d.length;c>b;b++)d[b]=cc[d[b]]?cc[d[b]]:F(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function H(a,b){return a.isValid()?(b=I(b,a.lang()),_b[b]||(_b[b]=G(b)),_b[b](a)):a.lang().invalidDate()}function I(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Cb.lastIndex=0;d>=0&&Cb.test(a);)a=a.replace(Cb,c),Cb.lastIndex=0,d-=1;return a}function J(a,b){var c,d=b._strict;switch(a){case"Q":return Nb;case"DDDD":return Pb;case"YYYY":case"GGGG":case"gggg":return d?Qb:Fb;case"Y":case"G":case"g":return Sb;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?Rb:Gb;case"S":if(d)return Nb;case"SS":if(d)return Ob;case"SSS":if(d)return Pb;case"DDD":return Eb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ib;case"a":case"A":return E(b._l)._meridiemParse;case"X":return Lb;case"Z":case"ZZ":return Jb;case"T":return Kb;case"SSSS":return Hb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?Ob:Db;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Db;case"Do":return Mb;default:return c=new RegExp(R(Q(a.replace("\\","")),"i"))}}function K(a){a=a||"";var b=a.match(Jb)||[],c=b[b.length-1]||[],d=(c+"").match(Xb)||["-",0,0],e=+(60*d[1])+t(d[2]);return"+"===d[0]?-e:e}function L(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[pb]=3*(t(b)-1));break;case"M":case"MM":null!=b&&(e[pb]=t(b)-1);break;case"MMM":case"MMMM":d=E(c._l).monthsParse(b),null!=d?e[pb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[qb]=t(b));break;case"Do":null!=b&&(e[qb]=t(parseInt(b,10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=t(b));break;case"YY":e[ob]=ib.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[ob]=t(b);break;case"a":case"A":c._isPm=E(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[rb]=t(b);break;case"m":case"mm":e[sb]=t(b);break;case"s":case"ss":e[tb]=t(b);break;case"S":case"SS":case"SSS":case"SSSS":e[ub]=t(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=K(b);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a=a.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=b)}}function M(a){var b,c,d,e,f,g,h,i,j,k,l=[];if(!a._d){for(d=O(a),a._w&&null==a._a[qb]&&null==a._a[pb]&&(f=function(b){var c=parseInt(b,10);return b?b.length<3?c>68?1900+c:2e3+c:c:null==a._a[ob]?ib().weekYear():a._a[ob]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?h=_(f(g.GG),g.W||1,g.E,4,1):(i=E(a._l),j=null!=g.d?X(g.d,i):null!=g.e?parseInt(g.e,10)+i._week.dow:0,k=parseInt(g.w,10)||1,null!=g.d&&j<i._week.dow&&k++,h=_(f(g.gg),k,j,i._week.doy,i._week.dow)),a._a[ob]=h.year,a._dayOfYear=h.dayOfYear),a._dayOfYear&&(e=null==a._a[ob]?d[ob]:a._a[ob],a._dayOfYear>w(e)&&(a._pf._overflowDayOfYear=!0),c=W(e,0,a._dayOfYear),a._a[pb]=c.getUTCMonth(),a._a[qb]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=l[b]=d[b];for(;7>b;b++)a._a[b]=l[b]=null==a._a[b]?2===b?1:0:a._a[b];l[rb]+=t((a._tzm||0)/60),l[sb]+=t((a._tzm||0)%60),a._d=(a._useUTC?W:V).apply(null,l)}}function N(a){var b;a._d||(b=r(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],M(a))}function O(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function P(a){a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=E(a._l),h=""+a._i,i=h.length,j=0;for(d=I(a._f,g).match(Bb)||[],b=0;b<d.length;b++)e=d[b],c=(h.match(J(e,a))||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),cc[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),L(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[rb]<12&&(a._a[rb]+=12),a._isPm===!1&&12===a._a[rb]&&(a._a[rb]=0),M(a),y(a)}function Q(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function R(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function S(a){var c,d,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,c=i({},a),c._pf=b(),c._f=a._f[f],P(c),z(c)&&(g+=c._pf.charsLeftOver,g+=10*c._pf.unusedTokens.length,c._pf.score=g,(null==e||e>g)&&(e=g,d=c));i(a,d||c)}function T(a){var b,c,d=a._i,e=Tb.exec(d);if(e){for(a._pf.iso=!0,b=0,c=Vb.length;c>b;b++)if(Vb[b][1].exec(d)){a._f=Vb[b][0]+(e[6]||" ");break}for(b=0,c=Wb.length;c>b;b++)if(Wb[b][1].exec(d)){a._f+=Wb[b][0];break}d.match(Jb)&&(a._f+="Z"),P(a)}else ib.createFromInputFallback(a)}function U(b){var c=b._i,d=yb.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?T(b):n(c)?(b._a=c.slice(0),M(b)):o(c)?b._d=new Date(+c):"object"==typeof c?N(b):"number"==typeof c?b._d=new Date(c):ib.createFromInputFallback(b)}function V(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function W(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function X(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function Y(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Z(a,b,c){var d=nb(Math.abs(a)/1e3),e=nb(d/60),f=nb(e/60),g=nb(f/24),h=nb(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",nb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,Y.apply({},i)}function $(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=ib(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function _(a,b,c,d,e){var f,g,h=W(a,0,1).getUTCDay();return c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:w(a-1)+g}}function ab(b){var c=b._i,d=b._f;return null===c||d===a&&""===c?ib.invalid({nullInput:!0}):("string"==typeof c&&(b._i=c=E().preparse(c)),ib.isMoment(c)?(b=j(c),b._d=new Date(+c._d)):d?n(d)?S(b):P(b):U(b),new g(b))}function bb(a,b){var c;return"string"==typeof b&&(b=a.lang().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),u(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function cb(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function db(a,b,c){return"Month"===b?bb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function eb(a,b){return function(c){return null!=c?(db(this,a,c),ib.updateOffset(this,b),this):cb(this,a)}}function fb(a){ib.duration.fn[a]=function(){return this._data[a]}}function gb(a,b){ib.duration.fn["as"+a]=function(){return+this/b}}function hb(a){"undefined"==typeof ender&&(jb=mb.moment,mb.moment=a?c("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",ib):ib)}for(var ib,jb,kb,lb="2.6.0",mb="undefined"!=typeof global?global:this,nb=Math.round,ob=0,pb=1,qb=2,rb=3,sb=4,tb=5,ub=6,vb={},wb={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},xb="undefined"!=typeof module&&module.exports,yb=/^\/?Date\((\-?\d+)/i,zb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ab=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Bb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,Cb=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,Db=/\d\d?/,Eb=/\d{1,3}/,Fb=/\d{1,4}/,Gb=/[+\-]?\d{1,6}/,Hb=/\d+/,Ib=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Jb=/Z|[\+\-]\d\d:?\d\d/gi,Kb=/T/i,Lb=/[\+\-]?\d+(\.\d{1,3})?/,Mb=/\d{1,2}/,Nb=/\d/,Ob=/\d\d/,Pb=/\d{3}/,Qb=/\d{4}/,Rb=/[+-]?\d{6}/,Sb=/[+-]?\d+/,Tb=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Ub="YYYY-MM-DDTHH:mm:ssZ",Vb=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Wb=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Xb=/([\+\-]|\d\d)/gi,Yb=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),Zb={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},$b={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},_b={},ac="DDD w W M D d".split(" "),bc="M D H h m s w W".split(" "),cc={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return l(this.year()%100,2)},YYYY:function(){return l(this.year(),4)},YYYYY:function(){return l(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+l(Math.abs(a),6)},gg:function(){return l(this.weekYear()%100,2)},gggg:function(){return l(this.weekYear(),4)},ggggg:function(){return l(this.weekYear(),5)},GG:function(){return l(this.isoWeekYear()%100,2)},GGGG:function(){return l(this.isoWeekYear(),4)},GGGGG:function(){return l(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return t(this.milliseconds()/100)},SS:function(){return l(t(this.milliseconds()/10),2)},SSS:function(){return l(this.milliseconds(),3)},SSSS:function(){return l(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+l(t(a/60),2)+":"+l(t(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+l(t(a/60),2)+l(t(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},dc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];ac.length;)kb=ac.pop(),cc[kb+"o"]=e(cc[kb],kb);for(;bc.length;)kb=bc.pop(),cc[kb+kb]=d(cc[kb],2);for(cc.DDDD=d(cc.DDD,3),i(f.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=ib.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=ib([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return $(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),ib=function(c,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=c,g._f=d,g._l=e,g._strict=f,g._isUTC=!1,g._pf=b(),ab(g)},ib.suppressDeprecationWarnings=!1,ib.createFromInputFallback=c("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i)}),ib.utc=function(c,d,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=c,g._f=d,g._strict=f,g._pf=b(),ab(g).utc()},ib.unix=function(a){return ib(1e3*a)},ib.duration=function(a,b){var c,d,e,f=a,g=null;return ib.isDuration(a)?f={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(f={},b?f[b]=a:f.milliseconds=a):(g=zb.exec(a))?(c="-"===g[1]?-1:1,f={y:0,d:t(g[qb])*c,h:t(g[rb])*c,m:t(g[sb])*c,s:t(g[tb])*c,ms:t(g[ub])*c}):(g=Ab.exec(a))&&(c="-"===g[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},f={y:e(g[2]),M:e(g[3]),d:e(g[4]),h:e(g[5]),m:e(g[6]),s:e(g[7]),w:e(g[8])}),d=new h(f),ib.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},ib.version=lb,ib.defaultFormat=Ub,ib.momentProperties=wb,ib.updateOffset=function(){},ib.lang=function(a,b){var c;return a?(b?C(A(a),b):null===b?(D(a),a="en"):vb[a]||E(a),c=ib.duration.fn._lang=ib.fn._lang=E(a),c._abbr):ib.fn._lang._abbr},ib.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),E(a)},ib.isMoment=function(a){return a instanceof g||null!=a&&a.hasOwnProperty("_isAMomentObject")},ib.isDuration=function(a){return a instanceof h},kb=dc.length-1;kb>=0;--kb)s(dc[kb]);ib.normalizeUnits=function(a){return q(a)},ib.invalid=function(a){var b=ib.utc(0/0);return null!=a?i(b._pf,a):b._pf.userInvalidated=!0,b},ib.parseZone=function(){return ib.apply(null,arguments).parseZone()},ib.parseTwoDigitYear=function(a){return t(a)+(t(a)>68?1900:2e3)},i(ib.fn=g.prototype,{clone:function(){return ib(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=ib(this).utc();return 0<a.year()&&a.year()<=9999?H(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):H(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return z(this)},isDSTShifted:function(){return this._a?this.isValid()&&p(this._a,(this._isUTC?ib.utc(this._a):ib(this._a)).toArray())>0:!1},parsingFlags:function(){return i({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=H(this,a||ib.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?ib.duration(+b,a):ib.duration(a,b),m(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?ib.duration(+b,a):ib.duration(a,b),m(this,c,-1),this},diff:function(a,b,c){var d,e,f=B(a,this),g=6e4*(this.zone()-f.zone());return b=q(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-ib(this).startOf("month")-(f-ib(f).startOf("month")))/d,e-=6e4*(this.zone()-ib(this).startOf("month").zone()-(f.zone()-ib(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:k(e)},from:function(a,b){return ib.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(ib(),a)},calendar:function(){var a=B(ib(),this).startOf("day"),b=this.diff(a,"days",!0),c=-6>b?"sameElse":-1>b?"lastWeek":0>b?"lastDay":1>b?"sameDay":2>b?"nextDay":7>b?"nextWeek":"sameElse";return this.format(this.lang().calendar(c,this))},isLeapYear:function(){return x(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=X(a,this.lang()),this.add({d:a-b})):b},month:eb("Month",!0),startOf:function(a){switch(a=q(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(a){return a=q(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+ib(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+ib(a).startOf(b)},isSame:function(a,b){return b=b||"ms",+this.clone().startOf(b)===+B(a,this).startOf(b)},min:function(a){return a=ib.apply(null,arguments),this>a?this:a},max:function(a){return a=ib.apply(null,arguments),a>this?this:a},zone:function(a,b){var c=this._offset||0;return null==a?this._isUTC?c:this._d.getTimezoneOffset():("string"==typeof a&&(a=K(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,c!==a&&(!b||this._changeInProgress?m(this,ib.duration(c-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,ib.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?ib(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return u(this.year(),this.month())},dayOfYear:function(a){var b=nb((ib(this).startOf("day")-ib(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=$(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=$(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=$(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return v(this.year(),1,4)},weeksInYear:function(){var a=this._lang._week;return v(this.year(),a.dow,a.doy)},get:function(a){return a=q(a),this[a]()},set:function(a,b){return a=q(a),"function"==typeof this[a]&&this[a](b),this},lang:function(b){return b===a?this._lang:(this._lang=E(b),this)}}),ib.fn.millisecond=ib.fn.milliseconds=eb("Milliseconds",!1),ib.fn.second=ib.fn.seconds=eb("Seconds",!1),ib.fn.minute=ib.fn.minutes=eb("Minutes",!1),ib.fn.hour=ib.fn.hours=eb("Hours",!0),ib.fn.date=eb("Date",!0),ib.fn.dates=c("dates accessor is deprecated. Use date instead.",eb("Date",!0)),ib.fn.year=eb("FullYear",!0),ib.fn.years=c("years accessor is deprecated. Use year instead.",eb("FullYear",!0)),ib.fn.days=ib.fn.day,ib.fn.months=ib.fn.month,ib.fn.weeks=ib.fn.week,ib.fn.isoWeeks=ib.fn.isoWeek,ib.fn.quarters=ib.fn.quarter,ib.fn.toJSON=ib.fn.toISOString,i(ib.duration.fn=h.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,h=this._data;h.milliseconds=e%1e3,a=k(e/1e3),h.seconds=a%60,b=k(a/60),h.minutes=b%60,c=k(b/60),h.hours=c%24,f+=k(c/24),h.days=f%30,g+=k(f/30),h.months=g%12,d=k(g/12),h.years=d},weeks:function(){return k(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*t(this._months/12)},humanize:function(a){var b=+this,c=Z(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=ib.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=ib.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=q(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=q(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:ib.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(kb in Yb)Yb.hasOwnProperty(kb)&&(gb(kb,Yb[kb]),fb(kb.toLowerCase()));gb("Weeks",6048e5),ib.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},ib.lang("en",{ordinal:function(a){var b=a%10,c=1===t(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),xb?module.exports=ib:"function"==typeof define&&define.amd?(define("moment",function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(mb.moment=jb),ib}),hb(!0)):hb()}).call(this);
/* --- ORGANIC TABS --- */

// --- MODIFIED
// https://github.com/CSS-Tricks/jQuery-Organic-Tabs
(function ($) {

	$.organicTabs = function (el, options) {
		var base = this;
		base.$el = $(el);
		base.$nav = base.$el.find(".tabs__nav");
		base.init = function () {
			base.options = $.extend({}, $.organicTabs.defaultOptions, options);
			var $allListWrap = base.$el.find(".tabs__content"),
				curList = base.$el.find("a.current").attr("href").substring(1);
			$allListWrap.height(base.$el.find("#" + curList).height());
			base.$nav.find("li > a").click(function (event) {

				var curList = base.$el.find("a.current").attr("href").substring(1),
					$newList = $(this),
					listID = $newList.attr("href").substring(1);
				if ((listID != curList) && (base.$el.find(":animated").length == 0)) {
					base.$el.find("#" + curList).css({
						opacity: 0,
						"z-index": 10
					});
					var newHeight = base.$el.find("#" + listID).height();
					$allListWrap.css({
						height: newHeight
					});
					setTimeout(function () {
						base.$el.find("#" + curList);
						base.$el.find("#" + listID).css({
							opacity: 1,
							"z-index": 13
						});
						base.$el.find(".tabs__nav li a").removeClass("current");
						$newList.addClass("current");
					}, 250);
				}
				event.preventDefault();
			});
		};
		base.init();
	};
	$.organicTabs.defaultOptions = {
		speed: 300
	};
	$.fn.organicTabs = function (options) {
		return this.each(function () {
			(new $.organicTabs(this, options));
		});
	};

})(jQuery);
/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory)
{
    'use strict';

    var moment;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load moment.js as an optional dependency
        try { moment = require('moment'); } catch (e) {}
        module.exports = factory(moment);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req)
        {
            // Load moment.js as an optional dependency
            var id = 'moment';
            moment = req.defined && req.defined(id) ? req(id) : undefined;
            return factory(moment);
        });
    } else {
        root.Pikaday = factory(root.moment);
    }
}(this, function (moment)
{
    'use strict';

    /**
     * feature detection and helper functions
     */
    var hasMoment = typeof moment === 'function',

    hasEventListeners = !!window.addEventListener,

    document = window.document,

    sto = window.setTimeout,

    addEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },

    removeEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },

    fireEvent = function(el, eventName, data)
    {
        var ev;

        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    },

    trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    },

    hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },

    addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    },

    removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    },

    isArray = function(obj)
    {
        return (/Array/).test(Object.prototype.toString.call(obj));
    },

    isDate = function(obj)
    {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    },

    isLeapYear = function(year)
    {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },

    getDaysInMonth = function(year, month)
    {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    setToStartOfDay = function(date)
    {
        if (isDate(date)) date.setHours(0,0,0,0);
    },

    compareDates = function(a,b)
    {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
    },

    extend = function(to, from, overwrite)
    {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },

    adjustCalendar = function(calendar) {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month)/12);
            calendar.month -= 12;
        }
        return calendar;
    },

    /**
     * defaults and localisation
     */
    defaults = {

        // bind the picker to a form field
        field: null,

        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,

        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',

        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',

        // the initial date to view when first opened
        defaultDate: null,

        // make the `defaultDate` the initial selected value
        setDefaultDate: false,

        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,

        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,

        // number of years either side, or array of upper/lower range
        yearRange: 10,

        // show week numbers at head of row
        showWeekNumber: false,

        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,

        isRTL: false,

        // Additional text to append to the year in the calendar title
        yearSuffix: '',

        // Render the month after year in the calendar title
        showMonthAfterYear: false,

        // how many months are visible
        numberOfMonths: 1,

        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
        // only used for the first display or when a selected date is not visible
        mainCalendar: 'left',

        // Specify a DOM element to render the calendar in
        container: undefined,

        // internationalization
        i18n: {
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        },

        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null
    },


    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function(opts, day, abbr)
    {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },

    renderDay = function(d, m, y, isSelected, isToday, isDisabled, isEmpty)
    {
        if (isEmpty) {
            return '<td class="is-empty"></td>';
        }
        var arr = [];
        if (isDisabled) {
            arr.push('is-disabled');
        }
        if (isToday) {
            arr.push('is-today');
        }
        if (isSelected) {
            arr.push('is-selected');
        }
        return '<td data-day="' + d + '" class="' + arr.join(' ') + '">' +
                 '<button class="pika-button pika-day" type="button" ' +
                    'data-pika-year="' + y + '" data-pika-month="' + m + '" data-pika-day="' + d + '">' +
                        d +
                 '</button>' +
               '</td>';
    },

    renderWeek = function (d, m, y) {
        // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
        var onejan = new Date(y, 0, 1),
            weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
        return '<td class="pika-week">' + weekNum + '</td>';
    },

    renderRow = function(days, isRTL)
    {
        return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    },

    renderBody = function(rows)
    {
        return '<tbody>' + rows.join('') + '</tbody>';
    },

    renderHead = function(opts)
    {
        var i, arr = [];
        if (opts.showWeekNumber) {
            arr.push('<th></th>');
        }
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</thead>';
    },

    renderTitle = function(instance, c, year, month, refYear)
    {
        var i, j, arr,
            opts = instance._o,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div class="pika-title">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                (i === month ? ' selected': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled' : '') + '>' +
                opts.i18n.months[i] + '</option>');
        }
        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month">' + arr.join('') + '</select></div>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected': '') + '>' + (i) + '</option>');
            }
        }
        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year">' + arr.join('') + '</select></div>';

        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        } else {
            html += monthHtml + yearHtml;
        }

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }

        if (c === 0) {
            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        }
        if (c === (instance._o.numberOfMonths - 1) ) {
            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
        }

        return html += '</div>';
    },

    renderTable = function(opts, data)
    {
        return '<table cellpadding="0" cellspacing="0" class="pika-table">' + renderHead(opts) + renderBody(data) + '</table>';
    },


    /**
     * Pikaday constructor
     */
    Pikaday = function(options)
    {
        var self = this,
            opts = self.config(options);

        self._onMouseDown = function(e)
        {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            if (!hasClass(target, 'is-disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty')) {
                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                    if (opts.bound) {
                        sto(function() {
                            self.hide();
                            if (opts.field) {
                                opts.field.blur();
                            }
                        }, 100);
                    }
                    return;
                }
                else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                }
                else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'pika-select')) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };

        self._onChange = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            }
            else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };

        self._onInputChange = function(e)
        {
            var date;

            if (e.firedBy === self) {
                return;
            }
            if (hasMoment) {
                date = moment(opts.field.value, opts.format);
                date = (date && date.isValid()) ? date.toDate() : null;
            }
            else {
                date = new Date(Date.parse(opts.field.value));
            }
            self.setDate(isDate(date) ? date : null);
            if (!self._v) {
                self.show();
            }
        };

        self._onInputFocus = function()
        {
            self.show();
        };

        self._onInputClick = function()
        {
            self.show();
        };

        self._onInputBlur = function()
        {
            if (!self._c) {
                self._b = sto(function() {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };

        self._onClick = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'pika-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, 'pika-single')) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));
            if (self._v && target !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '');

        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);

        if (opts.field) {
            if (opts.container) {
                opts.container.appendChild(self.el);
            } else if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                if (hasMoment && opts.field.value) {
                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                } else {
                    opts.defaultDate = new Date(Date.parse(opts.field.value));
                }
                opts.setDefaultDate = true;
            }
        }

        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }

        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }
    };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function(options)
        {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                setToStartOfDay(opts.minDate);
                opts.minYear  = opts.minDate.getFullYear();
                opts.minMonth = opts.minDate.getMonth();
            }
            if (opts.maxDate) {
                setToStartOfDay(opts.maxDate);
                opts.maxYear  = opts.maxDate.getFullYear();
                opts.maxMonth = opts.maxDate.getMonth();
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function(format)
        {
            return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function()
        {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function(date, preventOnSelect)
        {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function()
        {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect)
        {
            if (!date) {
                this._d = null;
                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date)
        {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                    visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
                lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function()
        {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month)
        {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function()
        {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function()
        {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year)
        {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value)
        {
            this._o.minDate = value;
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value)
        {
            this._o.maxDate = value;
        },

        /**
         * refresh the HTML
         */
        draw: function(force)
        {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '';

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year) + this.render(this.calendars[c].year, this.calendars[c].month) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                var self = this;
                sto(function() {
                    self._o.onDraw.call(self);
                }, 0);
            }
        },

        adjustPosition: function()
        {
            if (this._o.container) return;
            var field = this._o.trigger, pEl = field,
            width = this.el.offsetWidth, height = this.el.offsetHeight,
            viewportWidth = window.innerWidth || document.documentElement.clientWidth,
            viewportHeight = window.innerHeight || document.documentElement.clientHeight,
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
            left, top, clientRect;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if (left + width > viewportWidth ||
                (
                    this._o.position.indexOf('right') > -1 &&
                    left - width + field.offsetWidth > 0
                )
            ) {
                left = left - width + field.offsetWidth;
            }
            if (top + height > viewportHeight + scrollTop ||
                (
                    this._o.position.indexOf('top') > -1 &&
                    top - height - field.offsetHeight > 0
                )
            ) {
                top = top - height - field.offsetHeight;
            }
            this.el.style.cssText = [
                'position: absolute',
                'left: ' + left + 'px',
                'top: ' + top + 'px'
            ].join(';');
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month)
        {
            var opts   = this._o,
                now    = new Date(),
                days   = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data   = [],
                row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var cells = days + before,
                after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            for (var i = 0, r = 0; i < cells; i++)
            {
                var day = new Date(year, month, 1 + (i - before)),
                    isDisabled = (opts.minDate && day < opts.minDate) || (opts.maxDate && day > opts.maxDate),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    isEmpty = i < before || i >= (days + before);

                row.push(renderDay(1 + (i - before), month, year, isSelected, isToday, isDisabled, isEmpty));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL));
                    row = [];
                    r = 0;
                }
            }
            return renderTable(opts, data);
        },

        isVisible: function()
        {
            return this._v;
        },

        show: function()
        {
            if (!this._v) {
                removeClass(this.el, 'is-hidden');
                this._v = true;
                this.draw();
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function()
        {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.cssText = '';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function()
        {
            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (this._o.field) {
                removeEvent(this._o.field, 'change', this._onInputChange);
                if (this._o.bound) {
                    removeEvent(this._o.trigger, 'click', this._onInputClick);
                    removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                    removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;

}));

/* ==== RESPOND JS ==== */

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia = window.matchMedia || function (a) {
	"use strict";
	var c, d = a.documentElement, e = d.firstElementChild || d.firstChild, f = a.createElement("body"), g = a.createElement("div");
	return g.id = "mq-test-1", g.style.cssText = "position:absolute;top:-100em", f.style.background = "none", f.appendChild(g), function (a) {
		return g.innerHTML = '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>', d.insertBefore(f, e), c = 42 === g.offsetWidth, d.removeChild(f), {
			matches: c,
			media: a
		}
	}
}(document);

/*! Respond.js v1.3.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function (a) {
	"use strict";
	function x() {
		u(!0)
	}

	var b = {};
	if (a.respond = b, b.update = function () {
		}, b.mediaQueriesSupported = a.matchMedia && a.matchMedia("only all").matches, !b.mediaQueriesSupported) {
		var q, r, t, c = a.document, d = c.documentElement, e = [], f = [], g = [], h = {}, i = 30, j = c.getElementsByTagName("head")[0] || d, k = c.getElementsByTagName("base")[0], l = j.getElementsByTagName("link"), m = [], n = function () {
			for (var b = 0; l.length > b; b++) {
				var c = l[b], d = c.href, e = c.media, f = c.rel && "stylesheet" === c.rel.toLowerCase();
				d && f && !h[d] && (c.styleSheet && c.styleSheet.rawCssText ? (p(c.styleSheet.rawCssText, d, e), h[d] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(d) && !k || d.replace(RegExp.$1, "").split("/")[0] === a.location.host) && m.push({
					href: d,
					media: e
				}))
			}
			o()
		}, o = function () {
			if (m.length) {
				var b = m.shift();
				v(b.href, function (c) {
					p(c, b.href, b.media), h[b.href] = !0, a.setTimeout(function () {
						o()
					}, 0)
				})
			}
		}, p = function (a, b, c) {
			var d = a.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi), g = d && d.length || 0;
			b = b.substring(0, b.lastIndexOf("/"));
			var h = function (a) {
				return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + b + "$2$3")
			}, i = !g && c;
			b.length && (b += "/"), i && (g = 1);
			for (var j = 0; g > j; j++) {
				var k, l, m, n;
				i ? (k = c, f.push(h(a))) : (k = d[j].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1, f.push(RegExp.$2 && h(RegExp.$2))), m = k.split(","), n = m.length;
				for (var o = 0; n > o; o++)l = m[o], e.push({
					media: l.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
					rules: f.length - 1,
					hasquery: l.indexOf("(") > -1,
					minw: l.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
					maxw: l.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
				})
			}
			u()
		}, s = function () {
			var a, b = c.createElement("div"), e = c.body, f = !1;
			return b.style.cssText = "position:absolute;font-size:1em;width:1em", e || (e = f = c.createElement("body"), e.style.background = "none"), e.appendChild(b), d.insertBefore(e, d.firstChild), a = b.offsetWidth, f ? d.removeChild(e) : e.removeChild(b), a = t = parseFloat(a)
		}, u = function (b) {
			var h = "clientWidth", k = d[h], m = "CSS1Compat" === c.compatMode && k || c.body[h] || k, n = {}, o = l[l.length - 1], p = (new Date).getTime();
			if (b && q && i > p - q)return a.clearTimeout(r), r = a.setTimeout(u, i), void 0;
			q = p;
			for (var v in e)if (e.hasOwnProperty(v)) {
				var w = e[v], x = w.minw, y = w.maxw, z = null === x, A = null === y, B = "em";
				x && (x = parseFloat(x) * (x.indexOf(B) > -1 ? t || s() : 1)), y && (y = parseFloat(y) * (y.indexOf(B) > -1 ? t || s() : 1)), w.hasquery && (z && A || !(z || m >= x) || !(A || y >= m)) || (n[w.media] || (n[w.media] = []), n[w.media].push(f[w.rules]))
			}
			for (var C in g)g.hasOwnProperty(C) && g[C] && g[C].parentNode === j && j.removeChild(g[C]);
			for (var D in n)if (n.hasOwnProperty(D)) {
				var E = c.createElement("style"), F = n[D].join("\n");
				E.type = "text/css", E.media = D, j.insertBefore(E, o.nextSibling), E.styleSheet ? E.styleSheet.cssText = F : E.appendChild(c.createTextNode(F)), g.push(E)
			}
		}, v = function (a, b) {
			var c = w();
			c && (c.open("GET", a, !0), c.onreadystatechange = function () {
				4 !== c.readyState || 200 !== c.status && 304 !== c.status || b(c.responseText)
			}, 4 !== c.readyState && c.send(null))
		}, w = function () {
			var b = !1;
			try {
				b = new a.XMLHttpRequest
			} catch (c) {
				b = new a.ActiveXObject("Microsoft.XMLHTTP")
			}
			return function () {
				return b
			}
		}();
		n(), b.update = n, a.addEventListener ? a.addEventListener("resize", x, !1) : a.attachEvent && a.attachEvent("onresize", x)
	}
})(this);

/* --- ROYALSLIDER --- */

// jQuery RoyalSlider plugin. Custom build. Copyright 2011-2013 Dmitry Semenov http://dimsemenov.com
// http://dimsemenov.com/private/home.php?build=bullets_thumbnails_tabs_fullscreen_autoplay_video_animated-blocks_auto-height_global-caption_active-class_deeplinking_visible-nearby
// jquery.royalslider v9.5.1
(function (n) {
	function u(b, f) {
		var c, a = this, e = window.navigator, g = e.userAgent.toLowerCase();
		a.uid = n.rsModules.uid++;
		a.ns = ".rs" + a.uid;
		var d = document.createElement("div").style, h = ["webkit", "Moz", "ms", "O"], k = "", l = 0, r;
		for (c = 0; c < h.length; c++)r = h[c], !k && r + "Transform"in d && (k = r), r = r.toLowerCase(), window.requestAnimationFrame || (window.requestAnimationFrame = window[r + "RequestAnimationFrame"], window.cancelAnimationFrame = window[r + "CancelAnimationFrame"] || window[r + "CancelRequestAnimationFrame"]);
		window.requestAnimationFrame ||
		(window.requestAnimationFrame = function (a, b) {
			var c = (new Date).getTime(), d = Math.max(0, 16 - (c - l)), e = window.setTimeout(function () {
				a(c + d)
			}, d);
			l = c + d;
			return e
		});
		window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
			clearTimeout(a)
		});
		a.isIPAD = g.match(/(ipad)/);
		a.isIOS = a.isIPAD || g.match(/(iphone|ipod)/);
		c = function (a) {
			a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) ||
			[];
			return{browser: a[1] || "", version: a[2] || "0"}
		}(g);
		h = {};
		c.browser && (h[c.browser] = !0, h.version = c.version);
		h.chrome && (h.webkit = !0);
		a._a = h;
		a.isAndroid = -1 < g.indexOf("android");
		a.slider = n(b);
		a.ev = n(a);
		a._b = n(document);
		a.st = n.extend({}, n.fn.royalSlider.defaults, f);
		a._c = a.st.transitionSpeed;
		a._d = 0;
		!a.st.allowCSS3 || h.webkit && !a.st.allowCSS3OnWebkit || (c = k + (k ? "T" : "t"), a._e = c + "ransform"in d && c + "ransition"in d, a._e && (a._f = k + (k ? "P" : "p") + "erspective"in d));
		k = k.toLowerCase();
		a._g = "-" + k + "-";
		a._h = "vertical" === a.st.slidesOrientation ?
			!1 : !0;
		a._i = a._h ? "left" : "top";
		a._j = a._h ? "width" : "height";
		a._k = -1;
		a._l = "fade" === a.st.transitionType ? !1 : !0;
		a._l || (a.st.sliderDrag = !1, a._m = 10);
		a._n = "z-index:0; display:none; opacity:0;";
		a._o = 0;
		a._p = 0;
		a._q = 0;
		n.each(n.rsModules, function (b, c) {
			"uid" !== b && c.call(a)
		});
		a.slides = [];
		a._r = 0;
		(a.st.slides ? n(a.st.slides) : a.slider.children().detach()).each(function () {
			a._s(this, !0)
		});
		a.st.randomizeSlides && a.slides.sort(function () {
			return 0.5 - Math.random()
		});
		a.numSlides = a.slides.length;
		a._t();
		a.st.startSlideId ? a.st.startSlideId >
		a.numSlides - 1 && (a.st.startSlideId = a.numSlides - 1) : a.st.startSlideId = 0;
		a._o = a.staticSlideId = a.currSlideId = a._u = a.st.startSlideId;
		a.currSlide = a.slides[a.currSlideId];
		a._v = 0;
		a.pointerMultitouch = !1;
		a.slider.addClass((a._h ? "rsHor" : "rsVer") + (a._l ? "" : " rsFade"));
		d = '<div class="rsOverflow"><div class="rsContainer">';
		a.slidesSpacing = a.st.slidesSpacing;
		a._w = (a._h ? a.slider.width() : a.slider.height()) + a.st.slidesSpacing;
		a._x = Boolean(0 < a._y);
		1 >= a.numSlides && (a._z = !1);
		a._a1 = a._z && a._l ? 2 === a.numSlides ? 1 : 2 : 0;
		a._b1 =
			6 > a.numSlides ? a.numSlides : 6;
		a._c1 = 0;
		a._d1 = 0;
		a.slidesJQ = [];
		for (c = 0; c < a.numSlides; c++)a.slidesJQ.push(n('<div style="' + (a._l ? "" : c !== a.currSlideId ? a._n : "z-index:0;") + '" class="rsSlide "></div>'));
		a._e1 = d = n(d + "</div></div>");
		var m = a.ns, k = function (b, c, d, e, f) {
			a._j1 = b + c + m;
			a._k1 = b + d + m;
			a._l1 = b + e + m;
			f && (a._m1 = b + f + m)
		};
		c = e.pointerEnabled;
		a.pointerEnabled = c || e.msPointerEnabled;
		a.pointerEnabled ? (a.hasTouch = !1, a._n1 = 0.2, a.pointerMultitouch = Boolean(1 < e[(c ? "m" : "msM") + "axTouchPoints"]), c ? k("pointer", "down", "move", "up",
			"cancel") : k("MSPointer", "Down", "Move", "Up", "Cancel")) : (a.isIOS ? a._j1 = a._k1 = a._l1 = a._m1 = "" : k("mouse", "down", "move", "up"), "ontouchstart"in window || "createTouch"in document ? (a.hasTouch = !0, a._j1 += " touchstart" + m, a._k1 += " touchmove" + m, a._l1 += " touchend" + m, a._m1 += " touchcancel" + m, a._n1 = 0.5, a.st.sliderTouch && (a._f1 = !0)) : (a.hasTouch = !1, a._n1 = 0.2));
		a.st.sliderDrag && (a._f1 = !0, h.msie || h.opera ? a._g1 = a._h1 = "move" : h.mozilla ? (a._g1 = "-moz-grab", a._h1 = "-moz-grabbing") : h.webkit && -1 != e.platform.indexOf("Mac") && (a._g1 =
			"-webkit-grab", a._h1 = "-webkit-grabbing"), a._i1());
		a.slider.html(d);
		a._o1 = a.st.controlsInside ? a._e1 : a.slider;
		a._p1 = a._e1.children(".rsContainer");
		a.pointerEnabled && a._p1.css((c ? "" : "-ms-") + "touch-action", a._h ? "pan-y" : "pan-x");
		a._q1 = n('<div class="rsPreloader"></div>');
		e = a._p1.children(".rsSlide");
		a._r1 = a.slidesJQ[a.currSlideId];
		a._s1 = 0;
		a._e ? (a._t1 = "transition-property", a._u1 = "transition-duration", a._v1 = "transition-timing-function", a._w1 = a._x1 = a._g + "transform", a._f ? (h.webkit && !h.chrome && a.slider.addClass("rsWebkit3d"),
			a._y1 = "translate3d(", a._z1 = "px, ", a._a2 = "px, 0px)") : (a._y1 = "translate(", a._z1 = "px, ", a._a2 = "px)"), a._l ? a._p1[a._g + a._t1] = a._g + "transform" : (h = {}, h[a._g + a._t1] = "opacity", h[a._g + a._u1] = a.st.transitionSpeed + "ms", h[a._g + a._v1] = a.st.css3easeInOut, e.css(h))) : (a._x1 = "left", a._w1 = "top");
		var p;
		n(window).on("resize" + a.ns, function () {
			p && clearTimeout(p);
			p = setTimeout(function () {
				a.updateSliderSize()
			}, 50)
		});
		a.ev.trigger("rsAfterPropsSetup");
		a.updateSliderSize();
		a.st.keyboardNavEnabled && a._b2();
		a.st.arrowsNavHideOnTouch &&
		(a.hasTouch || a.pointerMultitouch) && (a.st.arrowsNav = !1);
		a.st.arrowsNav && (e = a._o1, n('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(e), a._c2 = e.children(".rsArrowLeft").click(function (b) {
			b.preventDefault();
			a.prev()
		}), a._d2 = e.children(".rsArrowRight").click(function (b) {
			b.preventDefault();
			a.next()
		}), a.st.arrowsNavAutoHide && !a.hasTouch && (a._c2.addClass("rsHidden"), a._d2.addClass("rsHidden"), e.one("mousemove.arrowshover",
			function () {
				a._c2.removeClass("rsHidden");
				a._d2.removeClass("rsHidden")
			}), e.hover(function () {
			a._e2 || (a._c2.removeClass("rsHidden"), a._d2.removeClass("rsHidden"))
		}, function () {
			a._e2 || (a._c2.addClass("rsHidden"), a._d2.addClass("rsHidden"))
		})), a.ev.on("rsOnUpdateNav", function () {
			a._f2()
		}), a._f2());
		if (a._f1)a._p1.on(a._j1, function (b) {
			a._g2(b)
		}); else a.dragSuccess = !1;
		var q = ["rsPlayBtnIcon", "rsPlayBtn", "rsCloseVideoBtn", "rsCloseVideoIcn"];
		a._p1.click(function (b) {
			if (!a.dragSuccess) {
				var c = n(b.target).attr("class");
				if (-1 !== n.inArray(c, q) && a.toggleVideo())return!1;
				if (a.st.navigateByClick && !a._h2) {
					if (n(b.target).closest(".rsNoDrag", a._r1).length)return!0;
					a._i2(b)
				}
				a.ev.trigger("rsSlideClick", b)
			}
		}).on("click.rs", "a", function (b) {
			if (a.dragSuccess)return!1;
			a._h2 = !0;
			setTimeout(function () {
				a._h2 = !1
			}, 3)
		});
		a.ev.trigger("rsAfterInit")
	}

	n.rsModules || (n.rsModules = {uid: 0});
	u.prototype = {
		constructor: u, _i2: function (b) {
			b = b[this._h ? "pageX" : "pageY"] - this._j2;
			b >= this._q ? this.next() : 0 > b && this.prev()
		}, _t: function () {
			var b;
			b = this.st.numImagesToPreload;
			if (this._z = this.st.loop)2 === this.numSlides ? (this._z = !1, this.st.loopRewind = !0) : 2 > this.numSlides && (this.st.loopRewind = this._z = !1);
			this._z && 0 < b && (4 >= this.numSlides ? b = 1 : this.st.numImagesToPreload > (this.numSlides - 1) / 2 && (b = Math.floor((this.numSlides - 1) / 2)));
			this._y = b
		}, _s: function (b, f) {
			function c(b, c) {
				c ? g.images.push(b.attr(c)) : g.images.push(b.text());
				if (h) {
					h = !1;
					g.caption = "src" === c ? b.attr("alt") : b.contents();
					g.image = g.images[0];
					g.videoURL = b.attr("data-rsVideo");
					var d = b.attr("data-rsw"), e = b.attr("data-rsh");
					"undefined" !== typeof d && !1 !== d && "undefined" !== typeof e && !1 !== e ? (g.iW = parseInt(d, 10), g.iH = parseInt(e, 10)) : a.st.imgWidth && a.st.imgHeight && (g.iW = a.st.imgWidth, g.iH = a.st.imgHeight)
				}
			}

			var a = this, e, g = {}, d, h = !0;
			b = n(b);
			a._k2 = b;
			a.ev.trigger("rsBeforeParseNode", [b, g]);
			if (!g.stopParsing)return b = a._k2, g.id = a._r, g.contentAdded = !1, a._r++, g.images = [], g.isBig = !1, g.hasCover || (b.hasClass("rsImg") ? (d = b, e = !0) : (d = b.find(".rsImg"), d.length && (e = !0)), e ? (g.bigImage = d.eq(0).attr("data-rsBigImg"), d.each(function () {
				var a = n(this);
				a.is("a") ? c(a, "href") : a.is("img") ? c(a, "src") : c(a)
			})) : b.is("img") && (b.addClass("rsImg rsMainSlideImage"), c(b, "src"))), d = b.find(".rsCaption"), d.length && (g.caption = d.remove()), g.content = b, a.ev.trigger("rsAfterParseNode", [b, g]), f && a.slides.push(g), 0 === g.images.length && (g.isLoaded = !0, g.isRendered = !1, g.isLoading = !1, g.images = null), g
		}, _b2: function () {
			var b = this, f, c, a = function (a) {
				37 === a ? b.prev() : 39 === a && b.next()
			};
			b._b.on("keydown" + b.ns, function (e) {
				b._l2 || (c = e.keyCode, 37 !== c && 39 !== c || f || (a(c), f = setInterval(function () {
						a(c)
					},
					700)))
			}).on("keyup" + b.ns, function (a) {
				f && (clearInterval(f), f = null)
			})
		}, goTo: function (b, f) {
			b !== this.currSlideId && this._m2(b, this.st.transitionSpeed, !0, !f)
		}, destroy: function (b) {
			this.ev.trigger("rsBeforeDestroy");
			this._b.off("keydown" + this.ns + " keyup" + this.ns + " " + this._k1 + " " + this._l1);
			this._p1.off(this._j1 + " click");
			this.slider.data("royalSlider", null);
			n.removeData(this.slider, "royalSlider");
			n(window).off("resize" + this.ns);
			this.loadingTimeout && clearTimeout(this.loadingTimeout);
			b && this.slider.remove();
			this.ev = this.slider = this.slides = null
		}, _n2: function (b, f) {
			function c(c, f, g) {
				c.isAdded ? (a(f, c), e(f, c)) : (g || (g = d.slidesJQ[f]), c.holder ? g = c.holder : (g = d.slidesJQ[f] = n(g), c.holder = g), c.appendOnLoaded = !1, e(f, c, g), a(f, c), d._p2(c, g, b), c.isAdded = !0)
			}

			function a(a, c) {
				c.contentAdded || (d.setItemHtml(c, b), b || (c.contentAdded = !0))
			}

			function e(a, b, c) {
				d._l && (c || (c = d.slidesJQ[a]), c.css(d._i, (a + d._d1 + p) * d._w))
			}

			function g(a) {
				if (l) {
					if (a > r - 1)return g(a - r);
					if (0 > a)return g(r + a)
				}
				return a
			}

			var d = this, h, k, l = d._z, r = d.numSlides;
			if (!isNaN(f))return g(f);
			var m = d.currSlideId, p, q = b ? Math.abs(d._o2 - d.currSlideId) >= d.numSlides - 1 ? 0 : 1 : d._y, s = Math.min(2, q), v = !1, u = !1, t;
			for (k = m; k < m + 1 + s; k++)if (t = g(k), (h = d.slides[t]) && (!h.isAdded || !h.positionSet)) {
				v = !0;
				break
			}
			for (k = m - 1; k > m - 1 - s; k--)if (t = g(k), (h = d.slides[t]) && (!h.isAdded || !h.positionSet)) {
				u = !0;
				break
			}
			if (v)for (k = m; k < m + q + 1; k++)t = g(k), p = Math.floor((d._u - (m - k)) / d.numSlides) * d.numSlides, (h = d.slides[t]) && c(h, t);
			if (u)for (k = m - 1; k > m - 1 - q; k--)t = g(k), p = Math.floor((d._u - (m - k)) / r) * r, (h = d.slides[t]) && c(h, t);
			if (!b)for (s = g(m - q),
				            m = g(m + q), q = s > m ? 0 : s, k = 0; k < r; k++)s > m && k > s - 1 || !(k < q || k > m) || (h = d.slides[k]) && h.holder && (h.holder.detach(), h.isAdded = !1)
		}, setItemHtml: function (b, f) {
			var c = this, a = function () {
				if (!b.images)b.isRendered = !0, b.isLoaded = !0, b.isLoading = !1, d(!0); else if (!b.isLoading) {
					var a, f;
					b.content.hasClass("rsImg") ? (a = b.content, f = !0) : a = b.content.find(".rsImg:not(img)");
					a && !a.is("img") && a.each(function () {
						var a = n(this), c = '<img class="rsImg" src="' + (a.is("a") ? a.attr("href") : a.text()) + '" />';
						f ? b.content = n(c) : a.replaceWith(c)
					});
					a = f ? b.content : b.content.find("img.rsImg");
					k();
					a.eq(0).addClass("rsMainSlideImage");
					b.iW && b.iH && (b.isLoaded || c._q2(b), d());
					b.isLoading = !0;
					if (b.isBig)n("<img />").on("load.rs error.rs", function (a) {
						n(this).off("load.rs error.rs");
						e([this], !0)
					}).attr("src", b.image); else {
						b.loaded = [];
						b.numStartedLoad = 0;
						a = function (a) {
							n(this).off("load.rs error.rs");
							b.loaded.push(this);
							b.loaded.length === b.numStartedLoad && e(b.loaded, !1)
						};
						for (var g = 0; g < b.images.length; g++) {
							var h = n("<img />");
							b.numStartedLoad++;
							h.on("load.rs error.rs",
								a).attr("src", b.images[g])
						}
					}
				}
			}, e = function (a, c) {
				if (a.length) {
					var d = a[0];
					if (c !== b.isBig)(d = b.holder.children()) && 1 < d.length && l(); else if (b.iW && b.iH)g(); else if (b.iW = d.width, b.iH = d.height, b.iW && b.iH)g(); else {
						var e = new Image;
						e.onload = function () {
							e.width ? (b.iW = e.width, b.iH = e.height, g()) : setTimeout(function () {
								e.width && (b.iW = e.width, b.iH = e.height);
								g()
							}, 1E3)
						};
						e.src = d.src
					}
				} else g()
			}, g = function () {
				b.isLoaded = !0;
				b.isLoading = !1;
				d();
				l();
				h()
			}, d = function () {
				if (!b.isAppended && c.ev) {
					var a = c.st.visibleNearby, d = b.id - c._o;
					f || b.appendOnLoaded || !c.st.fadeinLoadedSlide || 0 !== d && (!(a || c._r2 || c._l2) || -1 !== d && 1 !== d) || (a = {
						visibility: "visible",
						opacity: 0
					}, a[c._g + "transition"] = "opacity 400ms ease-in-out", b.content.css(a), setTimeout(function () {
						b.content.css("opacity", 1)
					}, 16));
					b.holder.find(".rsPreloader").length ? b.holder.append(b.content) : b.holder.html(b.content);
					b.isAppended = !0;
					b.isLoaded && (c._q2(b), h());
					b.sizeReady || (b.sizeReady = !0, setTimeout(function () {
						c.ev.trigger("rsMaybeSizeReady", b)
					}, 100))
				}
			}, h = function () {
				!b.loadedTriggered &&
				c.ev && (b.isLoaded = b.loadedTriggered = !0, b.holder.trigger("rsAfterContentSet"), c.ev.trigger("rsAfterContentSet", b))
			}, k = function () {
				c.st.usePreloader && b.holder.html(c._q1.clone())
			}, l = function (a) {
				c.st.usePreloader && (a = b.holder.find(".rsPreloader"), a.length && a.remove())
			};
			b.isLoaded ? d() : f ? !c._l && b.images && b.iW && b.iH ? a() : (b.holder.isWaiting = !0, k(), b.holder.slideId = -99) : a()
		}, _p2: function (b, f, c) {
			this._p1.append(b.holder);
			b.appendOnLoaded = !1
		}, _g2: function (b, f) {
			var c = this, a, e = "touchstart" === b.type;
			c._s2 = e;
			c.ev.trigger("rsDragStart");
			if (n(b.target).closest(".rsNoDrag", c._r1).length)return c.dragSuccess = !1, !0;
			!f && c._r2 && (c._t2 = !0, c._u2());
			c.dragSuccess = !1;
			if (c._l2)e && (c._v2 = !0); else {
				e && (c._v2 = !1);
				c._w2();
				if (e) {
					var g = b.originalEvent.touches;
					if (g && 0 < g.length)a = g[0], 1 < g.length && (c._v2 = !0); else return
				} else b.preventDefault(), a = b, c.pointerEnabled && (a = a.originalEvent);
				c._l2 = !0;
				c._b.on(c._k1, function (a) {
					c._x2(a, f)
				}).on(c._l1, function (a) {
					c._y2(a, f)
				});
				c._z2 = "";
				c._a3 = !1;
				c._b3 = a.pageX;
				c._c3 = a.pageY;
				c._d3 = c._v = (f ? c._e3 : c._h) ? a.pageX : a.pageY;
				c._f3 = 0;
				c._g3 = 0;
				c._h3 = f ? c._i3 : c._p;
				c._j3 = (new Date).getTime();
				if (e)c._e1.on(c._m1, function (a) {
					c._y2(a, f)
				})
			}
		}, _k3: function (b, f) {
			if (this._l3) {
				var c = this._m3, a = b.pageX - this._b3, e = b.pageY - this._c3, g = this._h3 + a, d = this._h3 + e, h = f ? this._e3 : this._h, g = h ? g : d, d = this._z2;
				this._a3 = !0;
				this._b3 = b.pageX;
				this._c3 = b.pageY;
				"x" === d && 0 !== a ? this._f3 = 0 < a ? 1 : -1 : "y" === d && 0 !== e && (this._g3 = 0 < e ? 1 : -1);
				d = h ? this._b3 : this._c3;
				a = h ? a : e;
				f ? g > this._n3 ? g = this._h3 + a * this._n1 : g < this._o3 && (g = this._h3 + a * this._n1) : this._z || (0 >= this.currSlideId &&
				0 < d - this._d3 && (g = this._h3 + a * this._n1), this.currSlideId >= this.numSlides - 1 && 0 > d - this._d3 && (g = this._h3 + a * this._n1));
				this._h3 = g;
				200 < c - this._j3 && (this._j3 = c, this._v = d);
				f ? this._q3(this._h3) : this._l && this._p3(this._h3)
			}
		}, _x2: function (b, f) {
			var c = this, a, e = "touchmove" === b.type;
			if (!c._s2 || e) {
				if (e) {
					if (c._r3)return;
					var g = b.originalEvent.touches;
					if (g) {
						if (1 < g.length)return;
						a = g[0]
					} else return
				} else a = b, c.pointerEnabled && (a = a.originalEvent);
				c._a3 || (c._e && (f ? c._s3 : c._p1).css(c._g + c._u1, "0s"), function h() {
					c._l2 && (c._t3 =
						requestAnimationFrame(h), c._u3 && c._k3(c._u3, f))
				}());
				if (c._l3)b.preventDefault(), c._m3 = (new Date).getTime(), c._u3 = a; else if (g = f ? c._e3 : c._h, a = Math.abs(a.pageX - c._b3) - Math.abs(a.pageY - c._c3) - (g ? -7 : 7), 7 < a) {
					if (g)b.preventDefault(), c._z2 = "x"; else if (e) {
						c._v3(b);
						return
					}
					c._l3 = !0
				} else if (-7 > a) {
					if (!g)b.preventDefault(), c._z2 = "y"; else if (e) {
						c._v3(b);
						return
					}
					c._l3 = !0
				}
			}
		}, _v3: function (b, f) {
			this._r3 = !0;
			this._a3 = this._l2 = !1;
			this._y2(b)
		}, _y2: function (b, f) {
			function c(a) {
				return 100 > a ? 100 : 500 < a ? 500 : a
			}

			function a(a, b) {
				if (e._l ||
					f)h = (-e._u - e._d1) * e._w, k = Math.abs(e._p - h), e._c = k / b, a && (e._c += 250), e._c = c(e._c), e._x3(h, !1)
			}

			var e = this, g, d, h, k;
			g = -1 < b.type.indexOf("touch");
			if (!e._s2 || g)if (e._s2 = !1, e.ev.trigger("rsDragRelease"), e._u3 = null, e._l2 = !1, e._r3 = !1, e._l3 = !1, e._m3 = 0, cancelAnimationFrame(e._t3), e._a3 && (f ? e._q3(e._h3) : e._l && e._p3(e._h3)), e._b.off(e._k1).off(e._l1), g && e._e1.off(e._m1), e._i1(), !e._a3 && !e._v2 && f && e._w3) {
				var l = n(b.target).closest(".rsNavItem");
				l.length && e.goTo(l.index())
			} else {
				d = f ? e._e3 : e._h;
				if (!e._a3 || "y" === e._z2 &&
					d || "x" === e._z2 && !d)if (!f && e._t2) {
					e._t2 = !1;
					if (e.st.navigateByClick) {
						e._i2(e.pointerEnabled ? b.originalEvent : b);
						e.dragSuccess = !0;
						return
					}
					e.dragSuccess = !0
				} else {
					e._t2 = !1;
					e.dragSuccess = !1;
					return
				} else e.dragSuccess = !0;
				e._t2 = !1;
				e._z2 = "";
				var r = e.st.minSlideOffset;
				g = g ? b.originalEvent.changedTouches[0] : e.pointerEnabled ? b.originalEvent : b;
				var m = d ? g.pageX : g.pageY, p = e._d3;
				g = e._v;
				var q = e.currSlideId, s = e.numSlides, v = d ? e._f3 : e._g3, u = e._z;
				Math.abs(m - p);
				g = m - g;
				d = (new Date).getTime() - e._j3;
				d = Math.abs(g) / d;
				if (0 === v || 1 >=
					s)a(!0, d); else {
					if (!u && !f)if (0 >= q) {
						if (0 < v) {
							a(!0, d);
							return
						}
					} else if (q >= s - 1 && 0 > v) {
						a(!0, d);
						return
					}
					if (f) {
						h = e._i3;
						if (h > e._n3)h = e._n3; else if (h < e._o3)h = e._o3; else {
							m = d * d / 0.006;
							l = -e._i3;
							p = e._y3 - e._z3 + e._i3;
							0 < g && m > l ? (l += e._z3 / (15 / (m / d * 0.003)), d = d * l / m, m = l) : 0 > g && m > p && (p += e._z3 / (15 / (m / d * 0.003)), d = d * p / m, m = p);
							l = Math.max(Math.round(d / 0.003), 50);
							h += m * (0 > g ? -1 : 1);
							if (h > e._n3) {
								e._a4(h, l, !0, e._n3, 200);
								return
							}
							if (h < e._o3) {
								e._a4(h, l, !0, e._o3, 200);
								return
							}
						}
						e._a4(h, l, !0)
					} else l = function (a) {
						var b = Math.floor(a / e._w);
						a - b * e._w >
						r && b++;
						return b
					}, p + r < m ? 0 > v ? a(!1, d) : (l = l(m - p), e._m2(e.currSlideId - l, c(Math.abs(e._p - (-e._u - e._d1 + l) * e._w) / d), !1, !0, !0)) : p - r > m ? 0 < v ? a(!1, d) : (l = l(p - m), e._m2(e.currSlideId + l, c(Math.abs(e._p - (-e._u - e._d1 - l) * e._w) / d), !1, !0, !0)) : a(!1, d)
				}
			}
		}, _p3: function (b) {
			b = this._p = b;
			this._e ? this._p1.css(this._x1, this._y1 + (this._h ? b + this._z1 + 0 : 0 + this._z1 + b) + this._a2) : this._p1.css(this._h ? this._x1 : this._w1, b)
		}, updateSliderSize: function (b) {
			var f, c;
			if (this.st.autoScaleSlider) {
				var a = this.st.autoScaleSliderWidth, e = this.st.autoScaleSliderHeight;
				this.st.autoScaleHeight ? (f = this.slider.width(), f != this.width && (this.slider.css("height", e / a * f), f = this.slider.width()), c = this.slider.height()) : (c = this.slider.height(), c != this.height && (this.slider.css("width", a / e * c), c = this.slider.height()), f = this.slider.width())
			} else f = this.slider.width(), c = this.slider.height();
			if (b || f != this.width || c != this.height) {
				this.width = f;
				this.height = c;
				this._b4 = f;
				this._c4 = c;
				this.ev.trigger("rsBeforeSizeSet");
				this.ev.trigger("rsAfterSizePropSet");
				this._e1.css({width: this._b4, height: this._c4});
				this._w = (this._h ? this._b4 : this._c4) + this.st.slidesSpacing;
				this._d4 = this.st.imageScalePadding;
				for (f = 0; f < this.slides.length; f++)b = this.slides[f], b.positionSet = !1, b && b.images && b.isLoaded && (b.isRendered = !1, this._q2(b));
				if (this._e4)for (f = 0; f < this._e4.length; f++)b = this._e4[f], b.holder.css(this._i, (b.id + this._d1) * this._w);
				this._n2();
				this._l && (this._e && this._p1.css(this._g + "transition-duration", "0s"), this._p3((-this._u - this._d1) * this._w));
				this.ev.trigger("rsOnUpdateNav")
			}
			this._j2 = this._e1.offset();
			this._j2 =
				this._j2[this._i]
		}, appendSlide: function (b, f) {
			var c = this._s(b);
			if (isNaN(f) || f > this.numSlides)f = this.numSlides;
			this.slides.splice(f, 0, c);
			this.slidesJQ.splice(f, 0, n('<div style="' + (this._l ? "position:absolute;" : this._n) + '" class="rsSlide"></div>'));
			f < this.currSlideId && this.currSlideId++;
			this.ev.trigger("rsOnAppendSlide", [c, f]);
			this._f4(f);
			f === this.currSlideId && this.ev.trigger("rsAfterSlideChange")
		}, removeSlide: function (b) {
			var f = this.slides[b];
			f && (f.holder && f.holder.remove(), b < this.currSlideId && this.currSlideId--,
				this.slides.splice(b, 1), this.slidesJQ.splice(b, 1), this.ev.trigger("rsOnRemoveSlide", [b]), this._f4(b), b === this.currSlideId && this.ev.trigger("rsAfterSlideChange"))
		}, _f4: function (b) {
			var f = this;
			b = f.numSlides;
			b = 0 >= f._u ? 0 : Math.floor(f._u / b);
			f.numSlides = f.slides.length;
			0 === f.numSlides ? (f.currSlideId = f._d1 = f._u = 0, f.currSlide = f._g4 = null) : f._u = b * f.numSlides + f.currSlideId;
			for (b = 0; b < f.numSlides; b++)f.slides[b].id = b;
			f.currSlide = f.slides[f.currSlideId];
			f._r1 = f.slidesJQ[f.currSlideId];
			f.currSlideId >= f.numSlides ?
				f.goTo(f.numSlides - 1) : 0 > f.currSlideId && f.goTo(0);
			f._t();
			f._l && f._z && f._p1.css(f._g + f._u1, "0ms");
			f._h4 && clearTimeout(f._h4);
			f._h4 = setTimeout(function () {
				f._l && f._p3((-f._u - f._d1) * f._w);
				f._n2();
				f._l || f._r1.css({display: "block", opacity: 1})
			}, 14);
			f.ev.trigger("rsOnUpdateNav")
		}, _i1: function () {
			this._f1 && this._l && (this._g1 ? this._e1.css("cursor", this._g1) : (this._e1.removeClass("grabbing-cursor"), this._e1.addClass("grab-cursor")))
		}, _w2: function () {
			this._f1 && this._l && (this._h1 ? this._e1.css("cursor", this._h1) :
				(this._e1.removeClass("grab-cursor"), this._e1.addClass("grabbing-cursor")))
		}, next: function (b) {
			this._m2("next", this.st.transitionSpeed, !0, !b)
		}, prev: function (b) {
			this._m2("prev", this.st.transitionSpeed, !0, !b)
		}, _m2: function (b, f, c, a, e) {
			var g = this, d, h, k;
			g.ev.trigger("rsBeforeMove", [b, a]);
			k = "next" === b ? g.currSlideId + 1 : "prev" === b ? g.currSlideId - 1 : b = parseInt(b, 10);
			if (!g._z) {
				if (0 > k) {
					g._i4("left", !a);
					return
				}
				if (k >= g.numSlides) {
					g._i4("right", !a);
					return
				}
			}
			g._r2 && (g._u2(!0), c = !1);
			h = k - g.currSlideId;
			k = g._o2 = g.currSlideId;
			var l = g.currSlideId + h;
			a = g._u;
			var n;
			g._z ? (l = g._n2(!1, l), a += h) : a = l;
			g._o = l;
			g._g4 = g.slidesJQ[g.currSlideId];
			g._u = a;
			g.currSlideId = g._o;
			g.currSlide = g.slides[g.currSlideId];
			g._r1 = g.slidesJQ[g.currSlideId];
			var l = g.st.slidesDiff, m = Boolean(0 < h);
			h = Math.abs(h);
			var p = Math.floor(k / g._y), q = Math.floor((k + (m ? l : -l)) / g._y), p = (m ? Math.max(p, q) : Math.min(p, q)) * g._y + (m ? g._y - 1 : 0);
			p > g.numSlides - 1 ? p = g.numSlides - 1 : 0 > p && (p = 0);
			k = m ? p - k : k - p;
			k > g._y && (k = g._y);
			if (h > k + l)for (g._d1 += (h - (k + l)) * (m ? -1 : 1), f *= 1.4, k = 0; k < g.numSlides; k++)g.slides[k].positionSet = !1;
			g._c = f;
			g._n2(!0);
			e || (n = !0);
			d = (-a - g._d1) * g._w;
			n ? setTimeout(function () {
				g._j4 = !1;
				g._x3(d, b, !1, c);
				g.ev.trigger("rsOnUpdateNav")
			}, 0) : (g._x3(d, b, !1, c), g.ev.trigger("rsOnUpdateNav"))
		}, _f2: function () {
			this.st.arrowsNav && (1 >= this.numSlides ? (this._c2.css("display", "none"), this._d2.css("display", "none")) : (this._c2.css("display", "block"), this._d2.css("display", "block"), this._z || this.st.loopRewind || (0 === this.currSlideId ? this._c2.addClass("rsArrowDisabled") : this._c2.removeClass("rsArrowDisabled"), this.currSlideId ===
			this.numSlides - 1 ? this._d2.addClass("rsArrowDisabled") : this._d2.removeClass("rsArrowDisabled"))))
		}, _x3: function (b, f, c, a, e) {
			function g() {
				var a;
				h && (a = h.data("rsTimeout")) && (h !== k && h.css({
					opacity: 0,
					display: "none",
					zIndex: 0
				}), clearTimeout(a), h.data("rsTimeout", ""));
				if (a = k.data("rsTimeout"))clearTimeout(a), k.data("rsTimeout", "")
			}

			var d = this, h, k, l = {};
			isNaN(d._c) && (d._c = 400);
			d._p = d._h3 = b;
			d.ev.trigger("rsBeforeAnimStart");
			d._e ? d._l ? (d._c = parseInt(d._c, 10), c = d._g + d._v1, l[d._g + d._u1] = d._c + "ms", l[c] = a ? n.rsCSS3Easing[d.st.easeInOut] :
				n.rsCSS3Easing[d.st.easeOut], d._p1.css(l), a || !d.hasTouch ? setTimeout(function () {
				d._p3(b)
			}, 5) : d._p3(b)) : (d._c = d.st.transitionSpeed, h = d._g4, k = d._r1, k.data("rsTimeout") && k.css("opacity", 0), g(), h && h.data("rsTimeout", setTimeout(function () {
				l[d._g + d._u1] = "0ms";
				l.zIndex = 0;
				l.display = "none";
				h.data("rsTimeout", "");
				h.css(l);
				setTimeout(function () {
					h.css("opacity", 0)
				}, 16)
			}, d._c + 60)), l.display = "block", l.zIndex = d._m, l.opacity = 0, l[d._g + d._u1] = "0ms", l[d._g + d._v1] = n.rsCSS3Easing[d.st.easeInOut], k.css(l), k.data("rsTimeout",
				setTimeout(function () {
					k.css(d._g + d._u1, d._c + "ms");
					k.data("rsTimeout", setTimeout(function () {
						k.css("opacity", 1);
						k.data("rsTimeout", "")
					}, 20))
				}, 20))) : d._l ? (l[d._h ? d._x1 : d._w1] = b + "px", d._p1.animate(l, d._c, a ? d.st.easeInOut : d.st.easeOut)) : (h = d._g4, k = d._r1, k.stop(!0, !0).css({
				opacity: 0,
				display: "block",
				zIndex: d._m
			}), d._c = d.st.transitionSpeed, k.animate({opacity: 1}, d._c, d.st.easeInOut), g(), h && h.data("rsTimeout", setTimeout(function () {
				h.stop(!0, !0).css({opacity: 0, display: "none", zIndex: 0})
			}, d._c + 60)));
			d._r2 = !0;
			d.loadingTimeout && clearTimeout(d.loadingTimeout);
			d.loadingTimeout = e ? setTimeout(function () {
				d.loadingTimeout = null;
				e.call()
			}, d._c + 60) : setTimeout(function () {
				d.loadingTimeout = null;
				d._k4(f)
			}, d._c + 60)
		}, _u2: function (b) {
			this._r2 = !1;
			clearTimeout(this.loadingTimeout);
			if (this._l)if (!this._e)this._p1.stop(!0), this._p = parseInt(this._p1.css(this._x1), 10); else {
				if (!b) {
					b = this._p;
					var f = this._h3 = this._l4();
					this._p1.css(this._g + this._u1, "0ms");
					b !== f && this._p3(f)
				}
			} else 20 < this._m ? this._m = 10 : this._m++
		}, _l4: function () {
			var b =
				window.getComputedStyle(this._p1.get(0), null).getPropertyValue(this._g + "transform").replace(/^matrix\(/i, "").split(/, |\)$/g), f = 0 === b[0].indexOf("matrix3d");
			return parseInt(b[this._h ? f ? 12 : 4 : f ? 13 : 5], 10)
		}, _m4: function (b, f) {
			return this._e ? this._y1 + (f ? b + this._z1 + 0 : 0 + this._z1 + b) + this._a2 : b
		}, _k4: function (b) {
			this._l || (this._r1.css("z-index", 0), this._m = 10);
			this._r2 = !1;
			this.staticSlideId = this.currSlideId;
			this._n2();
			this._n4 = !1;
			this.ev.trigger("rsAfterSlideChange")
		}, _i4: function (b, f) {
			var c = this, a = (-c._u - c._d1) *
				c._w;
			if (0 !== c.numSlides && !c._r2)if (c.st.loopRewind)c.goTo("left" === b ? c.numSlides - 1 : 0, f); else if (c._l) {
				c._c = 200;
				var e = function () {
					c._r2 = !1
				};
				c._x3(a + ("left" === b ? 30 : -30), "", !1, !0, function () {
					c._r2 = !1;
					c._x3(a, "", !1, !0, e)
				})
			}
		}, _q2: function (b, f) {
			if (!b.isRendered) {
				var c = b.content, a = "rsMainSlideImage", e, g = this.st.imageAlignCenter, d = this.st.imageScaleMode, h;
				b.videoURL && (a = "rsVideoContainer", "fill" !== d ? e = !0 : (h = c, h.hasClass(a) || (h = h.find("." + a)), h.css({
					width: "100%",
					height: "100%"
				}), a = "rsMainSlideImage"));
				c.hasClass(a) ||
				(c = c.find("." + a));
				if (c) {
					var k = b.iW, l = b.iH;
					b.isRendered = !0;
					if ("none" !== d || g) {
						a = "fill" !== d ? this._d4 : 0;
						h = this._b4 - 2 * a;
						var n = this._c4 - 2 * a, m, p, q = {};
						"fit-if-smaller" === d && (k > h || l > n) && (d = "fit");
						if ("fill" === d || "fit" === d)m = h / k, p = n / l, m = "fill" == d ? m > p ? m : p : "fit" == d ? m < p ? m : p : 1, k = Math.ceil(k * m, 10), l = Math.ceil(l * m, 10);
						"none" !== d && (q.width = k, q.height = l, e && c.find(".rsImg").css({
							width: "100%",
							height: "100%"
						}));
						g && (q.marginLeft = Math.floor((h - k) / 2) + a, q.marginTop = Math.floor((n - l) / 2) + a);
						c.css(q)
					}
				}
			}
		}
	};
	n.rsProto = u.prototype;
	n.fn.royalSlider = function (b) {
		var f = arguments;
		return this.each(function () {
			var c = n(this);
			if ("object" !== typeof b && b) {
				if ((c = c.data("royalSlider")) && c[b])return c[b].apply(c, Array.prototype.slice.call(f, 1))
			} else c.data("royalSlider") || c.data("royalSlider", new u(c, b))
		})
	};
	n.fn.royalSlider.defaults = {
		slidesSpacing: 8,
		startSlideId: 0,
		loop: !1,
		loopRewind: !1,
		numImagesToPreload: 4,
		fadeinLoadedSlide: !0,
		slidesOrientation: "horizontal",
		transitionType: "move",
		transitionSpeed: 600,
		controlNavigation: "bullets",
		controlsInside: !0,
		arrowsNav: !0,
		arrowsNavAutoHide: !0,
		navigateByClick: !0,
		randomizeSlides: !1,
		sliderDrag: !0,
		sliderTouch: !0,
		keyboardNavEnabled: !1,
		fadeInAfterLoaded: !0,
		allowCSS3: !0,
		allowCSS3OnWebkit: !0,
		addActiveClass: !1,
		autoHeight: !1,
		easeOut: "easeOutSine",
		easeInOut: "easeInOutSine",
		minSlideOffset: 10,
		imageScaleMode: "fit-if-smaller",
		imageAlignCenter: !0,
		imageScalePadding: 4,
		usePreloader: !0,
		autoScaleSlider: !1,
		autoScaleSliderWidth: 800,
		autoScaleSliderHeight: 400,
		autoScaleHeight: !0,
		arrowsNavHideOnTouch: !1,
		globalCaption: !1,
		slidesDiff: 2
	};
	n.rsCSS3Easing = {
		easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
		easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
	};
	n.extend(jQuery.easing, {
		easeInOutSine: function (b, f, c, a, e) {
			return-a / 2 * (Math.cos(Math.PI * f / e) - 1) + c
		}, easeOutSine: function (b, f, c, a, e) {
			return a * Math.sin(f / e * (Math.PI / 2)) + c
		}, easeOutCubic: function (b, f, c, a, e) {
			return a * ((f = f / e - 1) * f * f + 1) + c
		}
	})
})(jQuery, window);
// jquery.rs.bullets v1.0.1
(function (c) {
	c.extend(c.rsProto, {
		_i5: function () {
			var a = this;
			"bullets" === a.st.controlNavigation && (a.ev.one("rsAfterPropsSetup", function () {
				a._j5 = !0;
				a.slider.addClass("rsWithBullets");
				for (var b = '<div class="rsNav rsBullets">', e = 0; e < a.numSlides; e++)b += '<div class="rsNavItem rsBullet"><span></span></div>';
				a._k5 = b = c(b + "</div>");
				a._l5 = b.appendTo(a.slider).children();
				a._k5.on("click.rs", ".rsNavItem", function (b) {
					a._m5 || a.goTo(c(this).index())
				})
			}), a.ev.on("rsOnAppendSlide", function (b, c, d) {
				d >= a.numSlides ? a._k5.append('<div class="rsNavItem rsBullet"><span></span></div>') :
					a._l5.eq(d).before('<div class="rsNavItem rsBullet"><span></span></div>');
				a._l5 = a._k5.children()
			}), a.ev.on("rsOnRemoveSlide", function (b, c) {
				var d = a._l5.eq(c);
				d && d.length && (d.remove(), a._l5 = a._k5.children())
			}), a.ev.on("rsOnUpdateNav", function () {
				var b = a.currSlideId;
				a._n5 && a._n5.removeClass("rsNavSelected");
				b = a._l5.eq(b);
				b.addClass("rsNavSelected");
				a._n5 = b
			}))
		}
	});
	c.rsModules.bullets = c.rsProto._i5
})(jQuery);
// jquery.rs.thumbnails v1.0.6
(function (g) {
	g.extend(g.rsProto, {
		_h6: function () {
			var a = this;
			"thumbnails" === a.st.controlNavigation && (a._i6 = {
				drag: !0,
				touch: !0,
				orientation: "horizontal",
				navigation: !0,
				arrows: !0,
				arrowLeft: null,
				arrowRight: null,
				spacing: 4,
				arrowsAutoHide: !1,
				appendSpan: !1,
				transitionSpeed: 600,
				autoCenter: !0,
				fitInViewport: !0,
				firstMargin: !0,
				paddingTop: 0,
				paddingBottom: 0
			}, a.st.thumbs = g.extend({}, a._i6, a.st.thumbs), a._j6 = !0, !1 === a.st.thumbs.firstMargin ? a.st.thumbs.firstMargin = 0 : !0 === a.st.thumbs.firstMargin && (a.st.thumbs.firstMargin =
				a.st.thumbs.spacing), a.ev.on("rsBeforeParseNode", function (a, b, c) {
				b = g(b);
				c.thumbnail = b.find(".rsTmb").remove();
				c.thumbnail.length ? c.thumbnail = g(document.createElement("div")).append(c.thumbnail).html() : (c.thumbnail = b.attr("data-rsTmb"), c.thumbnail || (c.thumbnail = b.find(".rsImg").attr("data-rsTmb")), c.thumbnail = c.thumbnail ? '<img src="' + c.thumbnail + '"/>' : "")
			}), a.ev.one("rsAfterPropsSetup", function () {
				a._k6()
			}), a._n5 = null, a.ev.on("rsOnUpdateNav", function () {
				var e = g(a._l5[a.currSlideId]);
				e !== a._n5 && (a._n5 &&
				(a._n5.removeClass("rsNavSelected"), a._n5 = null), a._l6 && a._m6(a.currSlideId), a._n5 = e.addClass("rsNavSelected"))
			}), a.ev.on("rsOnAppendSlide", function (e, b, c) {
				e = "<div" + a._n6 + ' class="rsNavItem rsThumb">' + a._o6 + b.thumbnail + "</div>";
				c >= a.numSlides ? a._s3.append(e) : a._l5.eq(c).before(e);
				a._l5 = a._s3.children();
				a.updateThumbsSize()
			}), a.ev.on("rsOnRemoveSlide", function (e, b) {
				var c = a._l5.eq(b);
				c && (c.remove(), a._l5 = a._s3.children(), a.updateThumbsSize())
			}))
		}, _k6: function () {
			var a = this, e = "rsThumbs", b = a.st.thumbs,
				c = "", f, d, h = b.spacing;
			a._j5 = !0;
			a._e3 = "vertical" === b.orientation ? !1 : !0;
			a._n6 = f = h ? ' style="margin-' + (a._e3 ? "right" : "bottom") + ":" + h + 'px;"' : "";
			a._i3 = 0;
			a._p6 = !1;
			a._m5 = !1;
			a._l6 = !1;
			a._q6 = b.arrows && b.navigation;
			d = a._e3 ? "Hor" : "Ver";
			a.slider.addClass("rsWithThumbs rsWithThumbs" + d);
			c += '<div class="rsNav rsThumbs rsThumbs' + d + '"><div class="' + e + 'Container">';
			a._o6 = b.appendSpan ? '<span class="thumbIco"></span>' : "";
			for (var k = 0; k < a.numSlides; k++)d = a.slides[k], c += "<div" + f + ' class="rsNavItem rsThumb">' + d.thumbnail + a._o6 +
			"</div>";
			c = g(c + "</div></div>");
			f = {};
			b.paddingTop && (f[a._e3 ? "paddingTop" : "paddingLeft"] = b.paddingTop);
			b.paddingBottom && (f[a._e3 ? "paddingBottom" : "paddingRight"] = b.paddingBottom);
			c.css(f);
			a._s3 = g(c).find("." + e + "Container");
			a._q6 && (e += "Arrow", b.arrowLeft ? a._r6 = b.arrowLeft : (a._r6 = g('<div class="' + e + " " + e + 'Left"><div class="' + e + 'Icn"></div></div>'), c.append(a._r6)), b.arrowRight ? a._s6 = b.arrowRight : (a._s6 = g('<div class="' + e + " " + e + 'Right"><div class="' + e + 'Icn"></div></div>'), c.append(a._s6)), a._r6.click(function () {
				var b =
					(Math.floor(a._i3 / a._t6) + a._u6) * a._t6 + a._v6;
				a._a4(b > a._n3 ? a._n3 : b)
			}), a._s6.click(function () {
				var b = (Math.floor(a._i3 / a._t6) - a._u6) * a._t6 + a._v6;
				a._a4(b < a._o3 ? a._o3 : b)
			}), b.arrowsAutoHide && !a.hasTouch && (a._r6.css("opacity", 0), a._s6.css("opacity", 0), c.one("mousemove.rsarrowshover", function () {
				a._l6 && (a._r6.css("opacity", 1), a._s6.css("opacity", 1))
			}), c.hover(function () {
				a._l6 && (a._r6.css("opacity", 1), a._s6.css("opacity", 1))
			}, function () {
				a._l6 && (a._r6.css("opacity", 0), a._s6.css("opacity", 0))
			})));
			a._k5 = c;
			a._l5 =
				a._s3.children();
			a.msEnabled && a.st.thumbs.navigation && a._s3.css("-ms-touch-action", a._e3 ? "pan-y" : "pan-x");
			a.slider.append(c);
			a._w3 = !0;
			a._v6 = h;
			b.navigation && a._e && a._s3.css(a._g + "transition-property", a._g + "transform");
			a._k5.on("click.rs", ".rsNavItem", function (b) {
				a._m5 || a.goTo(g(this).index())
			});
			a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs", function () {
				a._w6 = a._e3 ? a._c4 : a._b4;
				a.updateThumbsSize(!0)
			});
			a.ev.off("rsAutoHeightChange.thumbs").on("rsAutoHeightChange.thumbs", function (b, c) {
				a.updateThumbsSize(!0,
					c)
			})
		}, updateThumbsSize: function (a, e) {
			var b = this, c = b._l5.first(), f = {}, d = b._l5.length;
			b._t6 = (b._e3 ? c.outerWidth() : c.outerHeight()) + b._v6;
			b._y3 = d * b._t6 - b._v6;
			f[b._e3 ? "width" : "height"] = b._y3 + b._v6;
			b._z3 = b._e3 ? b._k5.width() : void 0 !== e ? e : b._k5.height();
			b._w3 && (b.isFullscreen || b.st.thumbs.fitInViewport) && (b._e3 ? b._c4 = b._w6 - b._k5.outerHeight() : b._b4 = b._w6 - b._k5.outerWidth());
			b._z3 && (b._o3 = -(b._y3 - b._z3) - b.st.thumbs.firstMargin, b._n3 = b.st.thumbs.firstMargin, b._u6 = Math.floor(b._z3 / b._t6), b._y3 < b._z3 ? (b.st.thumbs.autoCenter &&
			b._q3((b._z3 - b._y3) / 2), b.st.thumbs.arrows && b._r6 && (b._r6.addClass("rsThumbsArrowDisabled"), b._s6.addClass("rsThumbsArrowDisabled")), b._l6 = !1, b._m5 = !1, b._k5.off(b._j1)) : b.st.thumbs.navigation && !b._l6 && (b._l6 = !0, !b.hasTouch && b.st.thumbs.drag || b.hasTouch && b.st.thumbs.touch) && (b._m5 = !0, b._k5.on(b._j1, function (a) {
				b._g2(a, !0)
			})), b._s3.css(f), a && e && b._m6(b.currSlideId), b._e && (f[b._g + "transition-duration"] = "0ms"))
		}, setThumbsOrientation: function (a, e) {
			this._w3 && (this.st.thumbs.orientation = a, this._k5.remove(),
				this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"), this._k6(), this._k5.off(this._j1), e || this.updateSliderSize(!0))
		}, _q3: function (a) {
			this._i3 = a;
			this._e ? this._s3.css(this._x1, this._y1 + (this._e3 ? a + this._z1 + 0 : 0 + this._z1 + a) + this._a2) : this._s3.css(this._e3 ? this._x1 : this._w1, a)
		}, _a4: function (a, e, b, c, f) {
			var d = this;
			if (d._l6) {
				e || (e = d.st.thumbs.transitionSpeed);
				d._i3 = a;
				d._x6 && clearTimeout(d._x6);
				d._p6 && (d._e || d._s3.stop(), b = !0);
				var h = {};
				d._p6 = !0;
				d._e ? (h[d._g + "transition-duration"] = e + "ms", h[d._g + "transition-timing-function"] =
					b ? g.rsCSS3Easing[d.st.easeOut] : g.rsCSS3Easing[d.st.easeInOut], d._s3.css(h), d._q3(a)) : (h[d._e3 ? d._x1 : d._w1] = a + "px", d._s3.animate(h, e, b ? "easeOutCubic" : d.st.easeInOut));
				c && (d._i3 = c);
				d._y6();
				d._x6 = setTimeout(function () {
					d._p6 = !1;
					f && (d._a4(c, f, !0), f = null)
				}, e)
			}
		}, _y6: function () {
			this._q6 && (this._i3 === this._n3 ? this._r6.addClass("rsThumbsArrowDisabled") : this._r6.removeClass("rsThumbsArrowDisabled"), this._i3 === this._o3 ? this._s6.addClass("rsThumbsArrowDisabled") : this._s6.removeClass("rsThumbsArrowDisabled"))
		},
		_m6: function (a, e) {
			var b = 0, c, f = a * this._t6 + 2 * this._t6 - this._v6 + this._n3, d = Math.floor(this._i3 / this._t6);
			this._l6 && (this._j6 && (e = !0, this._j6 = !1), f + this._i3 > this._z3 ? (a === this.numSlides - 1 && (b = 1), d = -a + this._u6 - 2 + b, c = d * this._t6 + this._z3 % this._t6 + this._v6 - this._n3) : 0 !== a ? (a - 1) * this._t6 <= -this._i3 + this._n3 && a - 1 <= this.numSlides - this._u6 && (c = (-a + 1) * this._t6 + this._n3) : c = this._n3, c !== this._i3 && (b = void 0 === c ? this._i3 : c, b > this._n3 ? this._q3(this._n3) : b < this._o3 ? this._q3(this._o3) : void 0 !== c && (e ? this._q3(c) : this._a4(c))),
				this._y6())
		}
	});
	g.rsModules.thumbnails = g.rsProto._h6
})(jQuery);
// jquery.rs.tabs v1.0.2
(function (e) {
	e.extend(e.rsProto, {
		_f6: function () {
			var a = this;
			"tabs" === a.st.controlNavigation && (a.ev.on("rsBeforeParseNode", function (a, d, b) {
				d = e(d);
				b.thumbnail = d.find(".rsTmb").remove();
				b.thumbnail.length ? b.thumbnail = e(document.createElement("div")).append(b.thumbnail).html() : (b.thumbnail = d.attr("data-rsTmb"), b.thumbnail || (b.thumbnail = d.find(".rsImg").attr("data-rsTmb")), b.thumbnail = b.thumbnail ? '<img src="' + b.thumbnail + '"/>' : "")
			}), a.ev.one("rsAfterPropsSetup", function () {
				a._g6()
			}), a.ev.on("rsOnAppendSlide",
				function (c, d, b) {
					b >= a.numSlides ? a._k5.append('<div class="rsNavItem rsTab">' + d.thumbnail + "</div>") : a._l5.eq(b).before('<div class="rsNavItem rsTab">' + item.thumbnail + "</div>");
					a._l5 = a._k5.children()
				}), a.ev.on("rsOnRemoveSlide", function (c, d) {
				var b = a._l5.eq(d);
				b && (b.remove(), a._l5 = a._k5.children())
			}), a.ev.on("rsOnUpdateNav", function () {
				var c = a.currSlideId;
				a._n5 && a._n5.removeClass("rsNavSelected");
				c = a._l5.eq(c);
				c.addClass("rsNavSelected");
				a._n5 = c
			}))
		}, _g6: function () {
			var a = this, c;
			a._j5 = !0;
			c = '<div class="rsNav rsTabs">';
			for (var d = 0; d < a.numSlides; d++)c += '<div class="rsNavItem rsTab">' + a.slides[d].thumbnail + "</div>";
			c = e(c + "</div>");
			a._k5 = c;
			a._l5 = c.children(".rsNavItem");
			a.slider.append(c);
			a._k5.click(function (b) {
				b = e(b.target).closest(".rsNavItem");
				b.length && a.goTo(b.index())
			})
		}
	});
	e.rsModules.tabs = e.rsProto._f6
})(jQuery);
// jquery.rs.fullscreen v1.0.5
(function (c) {
	c.extend(c.rsProto, {
		_q5: function () {
			var a = this;
			a._r5 = {enabled: !1, keyboardNav: !0, buttonFS: !0, nativeFS: !1, doubleTap: !0};
			a.st.fullscreen = c.extend({}, a._r5, a.st.fullscreen);
			if (a.st.fullscreen.enabled)a.ev.one("rsBeforeSizeSet", function () {
				a._s5()
			})
		}, _s5: function () {
			var a = this;
			a._t5 = !a.st.keyboardNavEnabled && a.st.fullscreen.keyboardNav;
			if (a.st.fullscreen.nativeFS) {
				a._u5 = {
					supportsFullScreen: !1, isFullScreen: function () {
						return!1
					}, requestFullScreen: function () {
					}, cancelFullScreen: function () {
					}, fullScreenEventName: "",
					prefix: ""
				};
				var b = ["webkit", "moz", "o", "ms", "khtml"];
				if (!a.isAndroid)if ("undefined" != typeof document.cancelFullScreen)a._u5.supportsFullScreen = !0; else for (var d = 0; d < b.length; d++)if (a._u5.prefix = b[d], "undefined" != typeof document[a._u5.prefix + "CancelFullScreen"]) {
					a._u5.supportsFullScreen = !0;
					break
				}
				a._u5.supportsFullScreen ? (a.nativeFS = !0, a._u5.fullScreenEventName = a._u5.prefix + "fullscreenchange" + a.ns, a._u5.isFullScreen = function () {
					switch (this.prefix) {
						case "":
							return document.fullScreen;
						case "webkit":
							return document.webkitIsFullScreen;
						default:
							return document[this.prefix + "FullScreen"]
					}
				}, a._u5.requestFullScreen = function (a) {
					return"" === this.prefix ? a.requestFullScreen() : a[this.prefix + "RequestFullScreen"]()
				}, a._u5.cancelFullScreen = function (a) {
					return"" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
				}) : a._u5 = !1
			}
			a.st.fullscreen.buttonFS && (a._v5 = c('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(a._o1).on("click.rs", function () {
				a.isFullscreen ? a.exitFullscreen() : a.enterFullscreen()
			}))
		},
		enterFullscreen: function (a) {
			var b = this;
			if (b._u5)if (a)b._u5.requestFullScreen(c("html")[0]); else {
				b._b.on(b._u5.fullScreenEventName, function (a) {
					b._u5.isFullScreen() ? b.enterFullscreen(!0) : b.exitFullscreen(!0)
				});
				b._u5.requestFullScreen(c("html")[0]);
				return
			}
			if (!b._w5) {
				b._w5 = !0;
				b._b.on("keyup" + b.ns + "fullscreen", function (a) {
					27 === a.keyCode && b.exitFullscreen()
				});
				b._t5 && b._b2();
				a = c(window);
				b._x5 = a.scrollTop();
				b._y5 = a.scrollLeft();
				b._z5 = c("html").attr("style");
				b._a6 = c("body").attr("style");
				b._b6 = b.slider.attr("style");
				c("body, html").css({overflow: "hidden", height: "100%", width: "100%", margin: "0", padding: "0"});
				b.slider.addClass("rsFullscreen");
				var d;
				for (d = 0; d < b.numSlides; d++)a = b.slides[d], a.isRendered = !1, a.bigImage && (a.isBig = !0, a.isMedLoaded = a.isLoaded, a.isMedLoading = a.isLoading, a.medImage = a.image, a.medIW = a.iW, a.medIH = a.iH, a.slideId = -99, a.bigImage !== a.medImage && (a.sizeType = "big"), a.isLoaded = a.isBigLoaded, a.isLoading = !1, a.image = a.bigImage, a.images[0] = a.bigImage, a.iW = a.bigIW, a.iH = a.bigIH, a.isAppended = a.contentAdded = !1, b._c6(a));
				b.isFullscreen = !0;
				b._w5 = !1;
				b.updateSliderSize();
				b.ev.trigger("rsEnterFullscreen")
			}
		}, exitFullscreen: function (a) {
			var b = this;
			if (b._u5) {
				if (!a) {
					b._u5.cancelFullScreen(c("html")[0]);
					return
				}
				b._b.off(b._u5.fullScreenEventName)
			}
			if (!b._w5) {
				b._w5 = !0;
				b._b.off("keyup" + b.ns + "fullscreen");
				b._t5 && b._b.off("keydown" + b.ns);
				c("html").attr("style", b._z5 || "");
				c("body").attr("style", b._a6 || "");
				var d;
				for (d = 0; d < b.numSlides; d++)a = b.slides[d], a.isRendered = !1, a.bigImage && (a.isBig = !1, a.slideId = -99, a.isBigLoaded =
					a.isLoaded, a.isBigLoading = a.isLoading, a.bigImage = a.image, a.bigIW = a.iW, a.bigIH = a.iH, a.isLoaded = a.isMedLoaded, a.isLoading = !1, a.image = a.medImage, a.images[0] = a.medImage, a.iW = a.medIW, a.iH = a.medIH, a.isAppended = a.contentAdded = !1, b._c6(a, !0), a.bigImage !== a.medImage && (a.sizeType = "med"));
				b.isFullscreen = !1;
				a = c(window);
				a.scrollTop(b._x5);
				a.scrollLeft(b._y5);
				b._w5 = !1;
				b.slider.removeClass("rsFullscreen");
				b.updateSliderSize();
				setTimeout(function () {
					b.updateSliderSize()
				}, 1);
				b.ev.trigger("rsExitFullscreen")
			}
		}, _c6: function (a,
		                  b) {
			var d = a.isLoaded || a.isLoading ? '<img class="rsImg rsMainSlideImage" src="' + a.image + '"/>' : '<a class="rsImg rsMainSlideImage" href="' + a.image + '"></a>';
			a.content.hasClass("rsImg") ? a.content = c(d) : a.content.find(".rsImg").eq(0).replaceWith(d);
			a.isLoaded || a.isLoading || !a.holder || a.holder.html(a.content)
		}
	});
	c.rsModules.fullscreen = c.rsProto._q5
})(jQuery);
// jquery.rs.autoplay v1.0.5
(function (b) {
	b.extend(b.rsProto, {
		_x4: function () {
			var a = this, d;
			a._y4 = {enabled: !1, stopAtAction: !0, pauseOnHover: !0, delay: 2E3};
			!a.st.autoPlay && a.st.autoplay && (a.st.autoPlay = a.st.autoplay);
			a.st.autoPlay = b.extend({}, a._y4, a.st.autoPlay);
			a.st.autoPlay.enabled && (a.ev.on("rsBeforeParseNode", function (a, c, f) {
				c = b(c);
				if (d = c.attr("data-rsDelay"))f.customDelay = parseInt(d, 10)
			}), a.ev.one("rsAfterInit", function () {
				a._z4()
			}), a.ev.on("rsBeforeDestroy", function () {
				a.stopAutoPlay();
				a.slider.off("mouseenter mouseleave");
				b(window).off("blur" +
				a.ns + " focus" + a.ns)
			}))
		}, _z4: function () {
			var a = this;
			a.startAutoPlay();
			a.ev.on("rsAfterContentSet", function (b, e) {
				a._l2 || a._r2 || !a._a5 || e !== a.currSlide || a._b5()
			});
			a.ev.on("rsDragRelease", function () {
				a._a5 && a._c5 && (a._c5 = !1, a._b5())
			});
			a.ev.on("rsAfterSlideChange", function () {
				a._a5 && a._c5 && (a._c5 = !1, a.currSlide.isLoaded && a._b5())
			});
			a.ev.on("rsDragStart", function () {
				a._a5 && (a.st.autoPlay.stopAtAction ? a.stopAutoPlay() : (a._c5 = !0, a._d5()))
			});
			a.ev.on("rsBeforeMove", function (b, e, c) {
				a._a5 && (c && a.st.autoPlay.stopAtAction ?
					a.stopAutoPlay() : (a._c5 = !0, a._d5()))
			});
			a._e5 = !1;
			a.ev.on("rsVideoStop", function () {
				a._a5 && (a._e5 = !1, a._b5())
			});
			a.ev.on("rsVideoPlay", function () {
				a._a5 && (a._c5 = !1, a._d5(), a._e5 = !0)
			});
			b(window).on("blur" + a.ns, function () {
				a._a5 && (a._c5 = !0, a._d5())
			}).on("focus" + a.ns, function () {
				a._a5 && a._c5 && (a._c5 = !1, a._b5())
			});
			a.st.autoPlay.pauseOnHover && (a._f5 = !1, a.slider.hover(function () {
				a._a5 && (a._c5 = !1, a._d5(), a._f5 = !0)
			}, function () {
				a._a5 && (a._f5 = !1, a._b5())
			}))
		}, toggleAutoPlay: function () {
			this._a5 ? this.stopAutoPlay() :
				this.startAutoPlay()
		}, startAutoPlay: function () {
			this._a5 = !0;
			this.currSlide.isLoaded && this._b5()
		}, stopAutoPlay: function () {
			this._e5 = this._f5 = this._c5 = this._a5 = !1;
			this._d5()
		}, _b5: function () {
			var a = this;
			a._f5 || a._e5 || (a._g5 = !0, a._h5 && clearTimeout(a._h5), a._h5 = setTimeout(function () {
				var b;
				a._z || a.st.loopRewind || (b = !0, a.st.loopRewind = !0);
				a.next(!0);
				b && (a.st.loopRewind = !1)
			}, a.currSlide.customDelay ? a.currSlide.customDelay : a.st.autoPlay.delay))
		}, _d5: function () {
			this._f5 || this._e5 || (this._g5 = !1, this._h5 && (clearTimeout(this._h5),
				this._h5 = null))
		}
	});
	b.rsModules.autoplay = b.rsProto._x4
})(jQuery);
// jquery.rs.video v1.1.3
(function (f) {
	f.extend(f.rsProto, {
		_z6: function () {
			var a = this;
			a._a7 = {
				autoHideArrows: !0,
				autoHideControlNav: !1,
				autoHideBlocks: !1,
				autoHideCaption: !1,
				disableCSS3inFF: !0,
				youTubeCode: '<iframe src="http://www.youtube.com/embed/%id%?rel=1&showinfo=0&autoplay=1&wmode=transparent" frameborder="no"></iframe>',
				vimeoCode: '<iframe src="http://player.vimeo.com/video/%id%?byline=0&portrait=0&autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
			};
			a.st.video = f.extend({}, a._a7,
				a.st.video);
			a.ev.on("rsBeforeSizeSet", function () {
				a._b7 && setTimeout(function () {
					var b = a._r1, b = b.hasClass("rsVideoContainer") ? b : b.find(".rsVideoContainer");
					a._c7 && a._c7.css({width: b.width(), height: b.height()})
				}, 32)
			});
			var d = a._a.mozilla;
			a.ev.on("rsAfterParseNode", function (b, c, e) {
				b = f(c);
				if (e.videoURL) {
					a.st.video.disableCSS3inFF && d && (a._e = a._f = !1);
					c = f('<div class="rsVideoContainer"></div>');
					var g = f('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');
					b.hasClass("rsImg") ?
						e.content = c.append(b).append(g) : e.content.find(".rsImg").wrap(c).after(g)
				}
			});
			a.ev.on("rsAfterSlideChange", function () {
				a.stopVideo()
			})
		}, toggleVideo: function () {
			return this._b7 ? this.stopVideo() : this.playVideo()
		}, playVideo: function () {
			var a = this;
			if (!a._b7) {
				var d = a.currSlide;
				if (!d.videoURL)return!1;
				a._d7 = d;
				var b = a._e7 = d.content, d = d.videoURL, c, e;
				d.match(/youtu\.be/i) || d.match(/youtube\.com/i) ? (e = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/, (e = d.match(e)) && 11 == e[7].length &&
				(c = e[7]), void 0 !== c && (a._c7 = a.st.video.youTubeCode.replace("%id%", c))) : d.match(/vimeo\.com/i) && (e = /(www\.)?vimeo.com\/(\d+)($|\/)/, (e = d.match(e)) && (c = e[2]), void 0 !== c && (a._c7 = a.st.video.vimeoCode.replace("%id%", c)));
				a.videoObj = f(a._c7);
				a.ev.trigger("rsOnCreateVideoElement", [d]);
				a.videoObj.length && (a._c7 = f('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'), a._c7.find(".rsPreloader").after(a.videoObj), b = b.hasClass("rsVideoContainer") ?
					b : b.find(".rsVideoContainer"), a._c7.css({
					width: b.width(),
					height: b.height()
				}).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv", function (b) {
					a.stopVideo();
					b.preventDefault();
					b.stopPropagation();
					return!1
				}), b.append(a._c7), a.isIPAD && b.addClass("rsIOSVideo"), a._f7(!1), setTimeout(function () {
					a._c7.addClass("rsVideoActive")
				}, 10), a.ev.trigger("rsVideoPlay"), a._b7 = !0);
				return!0
			}
			return!1
		}, stopVideo: function () {
			var a = this;
			return a._b7 ? (a.isIPAD && a.slider.find(".rsCloseVideoBtn").remove(), a._f7(!0), setTimeout(function () {
				a.ev.trigger("rsOnDestroyVideoElement",
					[a.videoObj]);
				var d = a._c7.find("iframe");
				if (d.length)try {
					d.attr("src", "")
				} catch (b) {
				}
				a._c7.remove();
				a._c7 = null
			}, 16), a.ev.trigger("rsVideoStop"), a._b7 = !1, !0) : !1
		}, _f7: function (a, d) {
			var b = [], c = this.st.video;
			c.autoHideArrows && (this._c2 && (b.push(this._c2, this._d2), this._e2 = !a), this._v5 && b.push(this._v5));
			c.autoHideControlNav && this._k5 && b.push(this._k5);
			c.autoHideBlocks && this._d7.animBlocks && b.push(this._d7.animBlocks);
			c.autoHideCaption && this.globalCaption && b.push(this.globalCaption);
			this.slider[a ? "removeClass" :
				"addClass"]("rsVideoPlaying");
			if (b.length)for (c = 0; c < b.length; c++)a ? b[c].removeClass("rsHidden") : b[c].addClass("rsHidden")
		}
	});
	f.rsModules.video = f.rsProto._z6
})(jQuery);
// jquery.rs.animated-blocks v1.0.7
(function (l) {
	l.extend(l.rsProto, {
		_p4: function () {
			function m() {
				var g = a.currSlide;
				if (a.currSlide && a.currSlide.isLoaded && a._t4 !== g) {
					if (0 < a._s4.length) {
						for (b = 0; b < a._s4.length; b++)clearTimeout(a._s4[b]);
						a._s4 = []
					}
					if (0 < a._r4.length) {
						var f;
						for (b = 0; b < a._r4.length; b++)if (f = a._r4[b])a._e ? (f.block.css(a._g + a._u1, "0s"), f.block.css(f.css)) : f.block.stop(!0).css(f.css), a._t4 = null, g.animBlocksDisplayed = !1;
						a._r4 = []
					}
					g.animBlocks && (g.animBlocksDisplayed = !0, a._t4 = g, a._u4(g.animBlocks))
				}
			}

			var a = this, b;
			a._q4 = {
				fadeEffect: !0,
				moveEffect: "top", moveOffset: 20, speed: 400, easing: "easeOutSine", delay: 200
			};
			a.st.block = l.extend({}, a._q4, a.st.block);
			a._r4 = [];
			a._s4 = [];
			a.ev.on("rsAfterInit", function () {
				m()
			});
			a.ev.on("rsBeforeParseNode", function (a, b, d) {
				b = l(b);
				d.animBlocks = b.find(".rsABlock").css("display", "none");
				d.animBlocks.length || (b.hasClass("rsABlock") ? d.animBlocks = b.css("display", "none") : d.animBlocks = !1)
			});
			a.ev.on("rsAfterContentSet", function (b, f) {
				f.id === a.slides[a.currSlideId].id && setTimeout(function () {
					m()
				}, a.st.fadeinLoadedSlide ?
					300 : 0)
			});
			a.ev.on("rsAfterSlideChange", function () {
				m()
			})
		}, _v4: function (l, a) {
			setTimeout(function () {
				l.css(a)
			}, 6)
		}, _u4: function (m) {
			var a = this, b, g, f, d, h, e, n;
			a._s4 = [];
			m.each(function (m) {
				b = l(this);
				g = {};
				f = {};
				d = null;
				var c = b.attr("data-move-offset"), c = c ? parseInt(c, 10) : a.st.block.moveOffset;
				if (0 < c && ((e = b.data("move-effect")) ? (e = e.toLowerCase(), "none" === e ? e = !1 : "left" !== e && "top" !== e && "bottom" !== e && "right" !== e && (e = a.st.block.moveEffect, "none" === e && (e = !1))) : e = a.st.block.moveEffect, e && "none" !== e)) {
					var p;
					p = "right" ===
					e || "left" === e ? !0 : !1;
					var k;
					n = !1;
					a._e ? (k = 0, h = a._x1) : (p ? isNaN(parseInt(b.css("right"), 10)) ? h = "left" : (h = "right", n = !0) : isNaN(parseInt(b.css("bottom"), 10)) ? h = "top" : (h = "bottom", n = !0), h = "margin-" + h, n && (c = -c), a._e ? k = parseInt(b.css(h), 10) : (k = b.data("rs-start-move-prop"), void 0 === k && (k = parseInt(b.css(h), 10), isNaN(k) && (k = 0), b.data("rs-start-move-prop", k))));
					f[h] = a._m4("top" === e || "left" === e ? k - c : k + c, p);
					g[h] = a._m4(k, p)
				}
				c = b.attr("data-fade-effect");
				if (!c)c = a.st.block.fadeEffect; else if ("none" === c.toLowerCase() ||
					"false" === c.toLowerCase())c = !1;
				c && (f.opacity = 0, g.opacity = 1);
				if (c || e)d = {}, d.hasFade = Boolean(c), Boolean(e) && (d.moveProp = h, d.hasMove = !0), d.speed = b.data("speed"), isNaN(d.speed) && (d.speed = a.st.block.speed), d.easing = b.data("easing"), d.easing || (d.easing = a.st.block.easing), d.css3Easing = l.rsCSS3Easing[d.easing], d.delay = b.data("delay"), isNaN(d.delay) && (d.delay = a.st.block.delay * m);
				c = {};
				a._e && (c[a._g + a._u1] = "0ms");
				c.moveProp = g.moveProp;
				c.opacity = g.opacity;
				c.display = "none";
				a._r4.push({block: b, css: c});
				a._v4(b,
					f);
				a._s4.push(setTimeout(function (b, d, c, e) {
					return function () {
						b.css("display", "block");
						if (c) {
							var g = {};
							if (a._e) {
								var f = "";
								c.hasMove && (f += c.moveProp);
								c.hasFade && (c.hasMove && (f += ", "), f += "opacity");
								g[a._g + a._t1] = f;
								g[a._g + a._u1] = c.speed + "ms";
								g[a._g + a._v1] = c.css3Easing;
								b.css(g);
								setTimeout(function () {
									b.css(d)
								}, 24)
							} else setTimeout(function () {
								b.animate(d, c.speed, c.easing)
							}, 16)
						}
						delete a._s4[e]
					}
				}(b, g, d, m), 6 >= d.delay ? 12 : d.delay))
			})
		}
	});
	l.rsModules.animatedBlocks = l.rsProto._p4
})(jQuery);
// jquery.rs.auto-height v1.0.3
(function (b) {
	b.extend(b.rsProto, {
		_w4: function () {
			var a = this;
			if (a.st.autoHeight) {
				var b, c, e, f = !0, d = function (d) {
					e = a.slides[a.currSlideId];
					(b = e.holder) && (c = b.height()) && void 0 !== c && c > (a.st.minAutoHeight || 30) && (a._c4 = c, a._e || !d ? a._e1.css("height", c) : a._e1.stop(!0, !0).animate({height: c}, a.st.transitionSpeed), a.ev.trigger("rsAutoHeightChange", c), f && (a._e && setTimeout(function () {
						a._e1.css(a._g + "transition", "height " + a.st.transitionSpeed + "ms ease-in-out")
					}, 16), f = !1))
				};
				a.ev.on("rsMaybeSizeReady.rsAutoHeight",
					function (a, b) {
						e === b && d()
					});
				a.ev.on("rsAfterContentSet.rsAutoHeight", function (a, b) {
					e === b && d()
				});
				a.slider.addClass("rsAutoHeight");
				a.ev.one("rsAfterInit", function () {
					setTimeout(function () {
						d(!1);
						setTimeout(function () {
							a.slider.append('<div style="clear:both; float: none;"></div>')
						}, 16)
					}, 16)
				});
				a.ev.on("rsBeforeAnimStart", function () {
					d(!0)
				});
				a.ev.on("rsBeforeSizeSet", function () {
					setTimeout(function () {
						d(!1)
					}, 16)
				})
			}
		}
	});
	b.rsModules.autoHeight = b.rsProto._w4
})(jQuery);
// jquery.rs.global-caption v1.0
(function (b) {
	b.extend(b.rsProto, {
		_d6: function () {
			var a = this;
			a.st.globalCaption && (a.ev.on("rsAfterInit", function () {
				a.globalCaption = b('<div class="rsGCaption"></div>').appendTo(a.st.globalCaptionInside ? a._e1 : a.slider);
				a.globalCaption.html(a.currSlide.caption)
			}), a.ev.on("rsBeforeAnimStart", function () {
				a.globalCaption.html(a.currSlide.caption)
			}))
		}
	});
	b.rsModules.globalCaption = b.rsProto._d6
})(jQuery);
// jquery.rs.active-class v1.0.1
(function (c) {
	c.rsProto._o4 = function () {
		var b, a = this;
		if (a.st.addActiveClass)a.ev.on("rsOnUpdateNav", function () {
			b && clearTimeout(b);
			b = setTimeout(function () {
				a._g4 && a._g4.removeClass("rsActiveSlide");
				a._r1 && a._r1.addClass("rsActiveSlide");
				b = null
			}, 50)
		})
	};
	c.rsModules.activeClass = c.rsProto._o4
})(jQuery);
// jquery.rs.deeplinking v1.0.6 + jQuery hashchange plugin v1.3 Copyright (c) 2010 Ben Alman
(function (d) {
	d.extend(d.rsProto, {
		_o5: function () {
			var a = this, l, g, f;
			a._p5 = {enabled: !1, change: !1, prefix: ""};
			a.st.deeplinking = d.extend({}, a._p5, a.st.deeplinking);
			if (a.st.deeplinking.enabled) {
				var k = a.st.deeplinking.change, c = a.st.deeplinking.prefix, e = "#" + c, h = function () {
					var b = window.location.hash;
					return b && 0 < b.indexOf(c) && (b = parseInt(b.substring(e.length), 10), 0 <= b) ? b - 1 : -1
				}, m = h();
				-1 !== m && (a.st.startSlideId = m);
				k && (d(window).on("hashchange" + a.ns, function (b) {
					l || (b = h(), 0 > b || (b > a.numSlides - 1 && (b = a.numSlides - 1),
						a.goTo(b)))
				}), a.ev.on("rsBeforeAnimStart", function () {
					g && clearTimeout(g);
					f && clearTimeout(f)
				}), a.ev.on("rsAfterSlideChange", function () {
					g && clearTimeout(g);
					f && clearTimeout(f);
					f = setTimeout(function () {
						l = !0;
						window.location.replace(("" + window.location).split("#")[0] + e + (a.currSlideId + 1));
						g = setTimeout(function () {
							l = !1;
							g = null
						}, 60)
					}, 400)
				}));
				a.ev.on("rsBeforeDestroy", function () {
					g = f = null;
					k && d(window).off("hashchange" + a.ns)
				})
			}
		}
	});
	d.rsModules.deeplinking = d.rsProto._o5
})(jQuery);
(function (d, a, l) {
	function g(b) {
		b = b || location.href;
		return"#" + b.replace(/^[^#]*#?(.*)$/, "$1")
	}

	"$:nomunge";
	var f = "hashchange", k = document, c, e = d.event.special, h = k.documentMode, m = "on" + f in a && (h === l || 7 < h);
	d.fn[f] = function (b) {
		return b ? this.bind(f, b) : this.trigger(f)
	};
	d.fn[f].delay = 50;
	e[f] = d.extend(e[f], {
		setup: function () {
			if (m)return!1;
			d(c.start)
		}, teardown: function () {
			if (m)return!1;
			d(c.stop)
		}
	});
	c = function () {
		function b() {
			var c = g(), n = r(h);
			c !== h ? (p(h = c, n), d(a).trigger(f)) : n !== h && (location.href = location.href.replace(/#.*/,
				"") + n);
			e = setTimeout(b, d.fn[f].delay)
		}

		var c = {}, e, h = g(), q = function (b) {
			return b
		}, p = q, r = q;
		c.start = function () {
			e || b()
		};
		c.stop = function () {
			e && clearTimeout(e);
			e = l
		};
		a.attachEvent && !a.addEventListener && !m && function () {
			var a, e;
			c.start = function () {
				a || (e = (e = d.fn[f].src) && e + g(), a = d('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
					e || p(g());
					b()
				}).attr("src", e || "javascript:0").insertAfter("body")[0].contentWindow, k.onpropertychange = function () {
					try {
						"title" === event.propertyName && (a.document.title =
							k.title)
					} catch (b) {
					}
				})
			};
			c.stop = q;
			r = function () {
				return g(a.location.href)
			};
			p = function (b, e) {
				var c = a.document, g = d.fn[f].domain;
				b !== e && (c.title = k.title, c.open(), g && c.write('<script>document.domain="' + g + '"\x3c/script>'), c.close(), a.location.hash = b)
			}
		}();
		return c
	}()
})(jQuery, this);
// jquery.rs.visible-nearby v1.0.2
(function (d) {
	d.rsProto._g7 = function () {
		var a = this;
		a.st.visibleNearby && a.st.visibleNearby.enabled && (a._h7 = {
			enabled: !0,
			centerArea: 0.6,
			center: !0,
			breakpoint: 0,
			breakpointCenterArea: 0.8,
			hiddenOverflow: !0,
			navigateByCenterClick: !1
		}, a.st.visibleNearby = d.extend({}, a._h7, a.st.visibleNearby), a.ev.one("rsAfterPropsSetup", function () {
			a._i7 = a._e1.css("overflow", "visible").wrap('<div class="rsVisibleNearbyWrap"></div>').parent();
			a.st.visibleNearby.hiddenOverflow || a._i7.css("overflow", "visible");
			a._o1 = a.st.controlsInside ?
				a._i7 : a.slider
		}), a.ev.on("rsAfterSizePropSet", function () {
			var b, c = a.st.visibleNearby;
			b = c.breakpoint && a.width < c.breakpoint ? c.breakpointCenterArea : c.centerArea;
			a._h ? (a._b4 *= b, a._i7.css({
				height: a._c4,
				width: a._b4 / b
			}), a._d = a._b4 * (1 - b) / 2 / b) : (a._c4 *= b, a._i7.css({
				height: a._c4 / b,
				width: a._b4
			}), a._d = a._c4 * (1 - b) / 2 / b);
			c.navigateByCenterClick || (a._q = a._h ? a._b4 : a._c4);
			c.center && a._e1.css("margin-" + (a._h ? "left" : "top"), a._d)
		}))
	};
	d.rsModules.visibleNearby = d.rsProto._g7
})(jQuery);
/* --- ROYALSLIDER end --- */

/*!
 * VERSION: 1.7.3
 * DATE: 2014-01-14
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";var t=document.documentElement,e=window,i=function(i,r){var s="x"===r?"Width":"Height",n="scroll"+s,a="client"+s,o=document.body;return i===e||i===t||i===o?Math.max(t[n],o[n])-(e["inner"+s]||Math.max(t[a],o[a])):i[n]-i["offset"+s]},r=window._gsDefine.plugin({propName:"scrollTo",API:2,version:"1.7.3",init:function(t,r,s){return this._wdw=t===e,this._target=t,this._tween=s,"object"!=typeof r&&(r={y:r}),this._autoKill=r.autoKill!==!1,this.x=this.xPrev=this.getX(),this.y=this.yPrev=this.getY(),null!=r.x?(this._addTween(this,"x",this.x,"max"===r.x?i(t,"x"):r.x,"scrollTo_x",!0),this._overwriteProps.push("scrollTo_x")):this.skipX=!0,null!=r.y?(this._addTween(this,"y",this.y,"max"===r.y?i(t,"y"):r.y,"scrollTo_y",!0),this._overwriteProps.push("scrollTo_y")):this.skipY=!0,!0},set:function(t){this._super.setRatio.call(this,t);var r=this._wdw||!this.skipX?this.getX():this.xPrev,s=this._wdw||!this.skipY?this.getY():this.yPrev,n=s-this.yPrev,a=r-this.xPrev;this._autoKill&&(!this.skipX&&(a>7||-7>a)&&i(this._target,"x")>r&&(this.skipX=!0),!this.skipY&&(n>7||-7>n)&&i(this._target,"y")>s&&(this.skipY=!0),this.skipX&&this.skipY&&this._tween.kill()),this._wdw?e.scrollTo(this.skipX?r:this.x,this.skipY?s:this.y):(this.skipY||(this._target.scrollTop=this.y),this.skipX||(this._target.scrollLeft=this.x)),this.xPrev=this.x,this.yPrev=this.y}}),s=r.prototype;r.max=i,s.getX=function(){return this._wdw?null!=e.pageXOffset?e.pageXOffset:null!=t.scrollLeft?t.scrollLeft:document.body.scrollLeft:this._target.scrollLeft},s.getY=function(){return this._wdw?null!=e.pageYOffset?e.pageYOffset:null!=t.scrollTop?t.scrollTop:document.body.scrollTop:this._target.scrollTop},s._kill=function(t){return t.scrollTo_x&&(this.skipX=!0),t.scrollTo_y&&(this.skipY=!0),this._super._kill.call(this,t)}}),window._gsDefine&&window._gsQueue.pop()();
// Avoid `console` errors in browsers that lack a console.
(function () {
	var method;
	var noop = function () {
	};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
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
}());

/*!
 Autosize v1.17.8 - 2013-09-07
 Automatically adjust textarea height based on user input.
 (c) 2013 Jack Moore - http://www.jacklmoore.com/autosize
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function (e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(window.jQuery || window.$)
})(function (e) {
	var t, o = {
		className: "autosizejs",
		append: "",
		callback: !1,
		resizeDelay: 10
	}, i = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>', n = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"], s = e(i).data("autosize", !0)[0];
	s.style.lineHeight = "99px", "99px" === e(s).css("lineHeight") && n.push("lineHeight"), s.style.lineHeight = "", e.fn.autosize = function (i) {
		return this.length ? (i = e.extend({}, o, i || {}), s.parentNode !== document.body && e(document.body).append(s), this.each(function () {
			function o() {
				var t, o;
				"getComputedStyle"in window ? (t = window.getComputedStyle(u), o = u.getBoundingClientRect().width, e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function (e, i) {
					o -= parseInt(t[i], 10)
				}), s.style.width = o + "px") : s.style.width = Math.max(p.width(), 0) + "px"
			}

			function a() {
				var a = {};
				if (t = u, s.className = i.className, d = parseInt(p.css("maxHeight"), 10), e.each(n, function (e, t) {
						a[t] = p.css(t)
					}), e(s).css(a), o(), window.chrome) {
					var r = u.style.width;
					u.style.width = "0px", u.offsetWidth, u.style.width = r
				}
			}

			function r() {
				var e, n;
				t !== u ? a() : o(), s.value = u.value + i.append, s.style.overflowY = u.style.overflowY, n = parseInt(u.style.height, 10), s.scrollTop = 0, s.scrollTop = 9e4, e = s.scrollTop, d && e > d ? (u.style.overflowY = "scroll", e = d) : (u.style.overflowY = "hidden", c > e && (e = c)), e += f, n !== e && (u.style.height = e + "px", w && i.callback.call(u, u))
			}

			function l() {
				clearTimeout(h), h = setTimeout(function () {
					var e = p.width();
					e !== g && (g = e, r())
				}, parseInt(i.resizeDelay, 10))
			}

			var d, c, h, u = this, p = e(u), f = 0, w = e.isFunction(i.callback), z = {
				height: u.style.height,
				overflow: u.style.overflow,
				overflowY: u.style.overflowY,
				wordWrap: u.style.wordWrap,
				resize: u.style.resize
			}, g = p.width();
			p.data("autosize") || (p.data("autosize", !0), ("border-box" === p.css("box-sizing") || "border-box" === p.css("-moz-box-sizing") || "border-box" === p.css("-webkit-box-sizing")) && (f = p.outerHeight() - p.height()), c = Math.max(parseInt(p.css("minHeight"), 10) - f || 0, p.height()), p.css({
				overflow: "hidden",
				overflowY: "hidden",
				wordWrap: "break-word",
				resize: "none" === p.css("resize") || "vertical" === p.css("resize") ? "none" : "horizontal"
			}), "onpropertychange"in u ? "oninput"in u ? p.on("input.autosize keyup.autosize", r) : p.on("propertychange.autosize", function () {
				"value" === event.propertyName && r()
			}) : p.on("input.autosize", r), i.resizeDelay !== !1 && e(window).on("resize.autosize", l), p.on("autosize.resize", r), p.on("autosize.resizeIncludeStyle", function () {
				t = null, r()
			}), p.on("autosize.destroy", function () {
				t = null, clearTimeout(h), e(window).off("resize", l), p.off("autosize").off(".autosize").css(z).removeData("autosize")
			}), r())
		})) : this
	}
});

// Place any jQuery/helper plugins in here.


