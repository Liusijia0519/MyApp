/*
 FusionCharts JavaScript Library jQuery Plugin
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @author FusionCharts Technologies LLP
 @version fusioncharts/3.3.0-release.18700
*/
(function() {
	var i = FusionCharts(["private", "extensions.jQueryPlugin"]);
	if (i !== void 0) {
		var c = window.jQuery,
			l, j, m, n = {
				stream: "feedData",
				feed: "feedData",
				set: "setData",
				setdata: "setData",
				setbyid: "setDataForId",
				setdatabyid: "setDataForId",
				get: "getData",
				getdata: "getData",
				getbyid: "getDataForId",
				getdatabyid: "getDataForId",
				clear: "clearChart",
				stop: "stopUpdate",
				pause: "stopUpdate",
				start: "restartUpdate",
				restart: "restartUpdate",
				resume: "restartUpdate"
			}, o = {
				feedData: function(a) {
					return typeof a === "string" ? [a] : typeof a ===
						"object" && a.stream ? [a.stream] : !1
				},
				getData: function(a) {
					return isNaN(a) ? typeof a === "object" && a.index ? [a.index] : [] : [a]
				},
				getDataForId: function(a) {
					return typeof a === "string" ? [a] : typeof a === "object" && a.id ? [a.id] : []
				},
				setData: function(a, d, b) {
					var e = [];
					typeof a !== "object" ? e = [a, d, b] : (a.value && e.push(a.value), a.label && e.push(a.label));
					return e
				},
				setDataForId: function(a, d, b) {
					var e = [];
					typeof a === "string" || typeof d === "string" || typeof b === "string" ? e = [a, d, b] : typeof a === "object" && (a.value && e.push(a.value), a.label &&
						e.push(a.label));
					return e
				},
				clearChart: function(a) {
					return [a]
				},
				stopUpdate: function(a) {
					return [a]
				},
				restartUpdate: function(a) {
					return [a]
				}
			};
		c.FusionCharts = i.core;
		l = function(a, d) {
			var b, e, h, f;
			e = d instanceof Array || d instanceof c ? Math.min(a.length, d.length) : a.length;
			for (b = 0; b < e; b += 1)
				if (h = d instanceof Array || d instanceof c ? d[b] : d, a[b].parentNode) i.core.render(c.extend({}, h, {
					renderAt: a[b]
				}));
				else {
					h = new FusionCharts(c.extend({}, h, {
						renderAt: a[b]
					}));
					if (!c.FusionCharts.delayedRender) c.FusionCharts.delayedRender = {};
					c.FusionCharts.delayedRender[h.id] = a[b];
					f = document.createElement("script");
					f.setAttribute("type", "text/javascript");
					/msie/i.test(navigator.userAgent) && !window.opera ? f.text = "FusionCharts.items['" + h.id + "'].render();" : f.appendChild(document.createTextNode("FusionCharts.items['" + h.id + "'].render();"));
					a[b].appendChild(f)
				}
			return a
		};
		i.addEventListener("*", function(a, d) {
			var b;
			c.extend(a, c.Event("fusioncharts" + a.eventType));
			a.sender && a.sender.options && a.sender.options.containerElementId ? (b = a.sender.options.containerElementId,
				typeof b === "object" ? c(b).trigger(a, d) : c("#" + b).length ? c("#" + b).trigger(a, d) : c(document).trigger(a, d)) : c(document).trigger(a, d)
		});
		j = function(a) {
			return a.filter(":FusionCharts").add(a.find(":FusionCharts"))
		};
		m = function(a, d, b) {
			typeof d === "object" && a.each(function() {
				this.configureLink(d, b)
			})
		};
		c.fn.insertFusionCharts = function(a) {
			return l(this, a)
		};
		c.fn.appendFusionCharts = function(a) {
			a.insertMode = "append";
			return l(this, a)
		};
		c.fn.prependFusionCharts = function(a) {
			a.insertMode = "prepend";
			return l(this, a)
		};
		c.fn.attrFusionCharts =
			function(a, d) {
				var b = [],
					e = j(this);
				if (d !== void 0) return e.each(function() {
					this.FusionCharts.setChartAttribute(a, d)
				}), this;
				if (typeof a === "object") return e.each(function() {
					this.FusionCharts.setChartAttribute(a)
				}), this;
				e.each(function() {
					b.push(this.FusionCharts.getChartAttribute(a))
				});
				return b
		};
		c.fn.updateFusionCharts = function(a) {
			var d, b, e, c, f, g = {}, i = j(this),
				k = [
					["swfUrl", !1],
					["height", !1],
					["width", !1],
					["bgColor", !0],
					["renderer", !0],
					["dataFormat", !1],
					["dataSource", !1],
					["detectFlashVersion", !0],
					["autoInstallRedirect", !0],
					["lang", !0],
					["scaleMode", !0],
					["debugMode", !0]
				];
			d = 0;
			for (b = k.length; d < b; d += 1) f = k[d][0], a[f] && (k[d][1] && (c = !0), g[f] = a[f]);
			i.each(function() {
				e = this.FusionCharts;
				if (c) e.clone(g).render();
				else {
					if (g.dataSource !== void 0 || g.dataFormat !== void 0) g.dataSource === void 0 ? e.setChartData(e.args.dataSource, g.dataFormat) : g.dataFormat === void 0 ? e.setChartData(g.dataSource, e.args.dataFormat) : e.setChartData(g.dataSource, g.dataFormat);
					(g.width !== void 0 || g.height !== void 0) && e.resizeTo(g.width, g.height);
					if (g.swfUrl) e.src =
						g.swfUrl, e.render()
				}
			});
			return this
		};
		c.fn.cloneFusionCharts = function(a, d) {
			var b, e;
			typeof a !== "function" && typeof d === "function" && (e = a, a = d, d = e);
			b = [];
			j(this).each(function() {
				b.push(this.FusionCharts.clone(d, {}, !0))
			});
			a.call(c(b), b);
			return this
		};
		c.fn.disposeFusionCharts = function() {
			j(this).each(function() {
				this.FusionCharts.dispose();
				delete this.FusionCharts;
				this._fcDrillDownLevel === 0 && delete this._fcDrillDownLevel
			});
			return this
		};
		c.fn.convertToFusionCharts = function(a, d) {
			var b = [];
			if (typeof a.dataConfiguration ===
				"undefined") a.dataConfiguration = {};
			c.extend(!0, a.dataConfiguration, d);
			this.each(function() {
				b.push(c("<div></div>").insertBefore(this).insertFusionCharts(a).get(0))
			});
			return c(b)
		};
		c.fn.drillDownFusionChartsTo = function() {
			var a, d, b, e, c, f = j(this);
			if (typeof this._fcDrillDownLevel === "undefined") this._fcDrillDownLevel = 0;
			a = 0;
			for (d = arguments.length; a < d; a += 1)
				if (c = arguments[a], c instanceof Array) {
					b = 0;
					for (e = c.length; b < e; b += 1) m(f, c[b], this._fcDrillDownLevel), this._fcDrillDownLevel += 1
				} else m(f, c, this._fcDrillDownLevel),
			this._fcDrillDownLevel += 1;
			return this
		};
		c.fn.streamFusionChartsData = function(a, d, b, c) {
			var h, f, g, i = [],
				k = j(this);
			f = n[a && a.toLowerCase()];
			if (f === void 0)
				if (arguments.length === 1) g = [a], f = n.feed;
				else return this;
				else g = arguments.length === 1 ? [] : o[f](d, b, c);
			return f === "getData" || f === "getDataForId" ? (k.each(function() {
				h = this.FusionCharts;
				typeof h[f] === "function" && i.push(h[f].apply(h, g))
			}), i) : (k.each(function() {
				h = this.FusionCharts;
				typeof h[f] === "function" && h[f].apply(h, g)
			}), this)
		};
		c.extend(c.expr[":"], {
			FusionCharts: function(a) {
				return a.FusionCharts instanceof
				i.core
			}
		})
	}
})();