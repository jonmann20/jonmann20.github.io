!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-43015655-1","jonmann20.github.io"),ga("send","pageview"),function(a){"function"==typeof define&&define.amd?define(["jquery"],a):jQuery.sammy=window.Sammy=a(jQuery)}(function(a){var b,c="([^/]+)",d=/:([\w\d]+)/g,e=/\?([^#]*)?$/,f=function(a){return Array.prototype.slice.call(a)},g=function(a){return"[object Function]"===Object.prototype.toString.call(a)},h=function(a){return"[object Array]"===Object.prototype.toString.call(a)},i=function(a){return"[object RegExp]"===Object.prototype.toString.call(a)},j=function(a){return decodeURIComponent((a||"").replace(/\+/g," "))},k=encodeURIComponent,l=function(a){return String(a).replace(/&(?!\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},m=function(a){return function(){return this.route.apply(this,[a].concat(Array.prototype.slice.call(arguments)))}},n={},o=!(!window.history||!history.pushState),p=[];return b=function(){var c,d,e=f(arguments);return b.apps=b.apps||{},0===e.length||e[0]&&g(e[0])?b.apply(b,["body"].concat(e)):"string"==typeof(d=e.shift())?(c=b.apps[d]||new b.Application,c.element_selector=d,e.length>0&&a.each(e,function(a,b){c.use(b)}),c.element_selector!=d&&delete b.apps[d],b.apps[c.element_selector]=c,c):void 0},b.VERSION="0.7.6",b.addLogger=function(a){p.push(a)},b.log=function(){var c=f(arguments);c.unshift("["+Date()+"]"),a.each(p,function(a,d){d.apply(b,c)})},"undefined"!=typeof window.console?b.addLogger("function"==typeof window.console.log&&g(window.console.log.apply)?function(){window.console.log.apply(window.console,arguments)}:function(){window.console.log(arguments)}):"undefined"!=typeof console&&b.addLogger(function(){console.log.apply(console,arguments)}),a.extend(b,{makeArray:f,isFunction:g,isArray:h}),b.Object=function(b){return a.extend(this,b||{})},a.extend(b.Object.prototype,{escapeHTML:l,h:l,toHash:function(){var b={};return a.each(this,function(a,c){g(c)||(b[a]=c)}),b},toHTML:function(){var b="";return a.each(this,function(a,c){g(c)||(b+="<strong>"+a+"</strong> "+c+"<br />")}),b},keys:function(a){var b=[];for(var c in this)g(this[c])&&a||b.push(c);return b},has:function(b){return this[b]&&""!==a.trim(this[b].toString())},join:function(){var a=f(arguments),b=a.shift();return a.join(b)},log:function(){b.log.apply(b,arguments)},toString:function(b){var c=[];return a.each(this,function(a,d){(!g(d)||b)&&c.push('"'+a+'": '+d.toString())}),"Sammy.Object: {"+c.join(",")+"}"}}),b.targetIsThisWindow=function(b,c){var d=a(b.target).closest(c);if(0===d.length)return!0;var e=d.attr("target");return e&&e!==window.name&&"_self"!==e?"_blank"===e?!1:"top"===e&&window===window.top?!0:!1:!0},b.DefaultLocationProxy=function(a,b){this.app=a,this.is_native=!1,this.has_history=o,this._startPolling(b)},b.DefaultLocationProxy.fullPath=function(a){var b=a.toString().match(/^[^#]*(#.+)$/),c=b?b[1]:"";return[a.pathname,a.search,c].join("")},a.extend(b.DefaultLocationProxy.prototype,{bind:function(){var c=this,d=this.app,e=b.DefaultLocationProxy;a(window).bind("hashchange."+this.app.eventNamespace(),function(a,b){c.is_native!==!1||b||(c.is_native=!0,window.clearInterval(e._interval),e._interval=null),d.trigger("location-changed")}),o&&!d.disable_push_state&&(a(window).bind("popstate."+this.app.eventNamespace(),function(){d.trigger("location-changed")}),a(document).delegate("a","click.history-"+this.app.eventNamespace(),function(a){if(!(a.isDefaultPrevented()||a.metaKey||a.ctrlKey)){var f=e.fullPath(this),g=this.hostname?this.hostname:function(a){var b=document.createElement("a");return b.href=a.href,b.hostname}(this);return g==window.location.hostname&&d.lookupRoute("get",f)&&b.targetIsThisWindow(a,"a")?(a.preventDefault(),c.setLocation(f),!1):void 0}})),e._bindings||(e._bindings=0),e._bindings++},unbind:function(){a(window).unbind("hashchange."+this.app.eventNamespace()),a(window).unbind("popstate."+this.app.eventNamespace()),a(document).undelegate("a","click.history-"+this.app.eventNamespace()),b.DefaultLocationProxy._bindings--,b.DefaultLocationProxy._bindings<=0&&(window.clearInterval(b.DefaultLocationProxy._interval),b.DefaultLocationProxy._interval=null)},getLocation:function(){return b.DefaultLocationProxy.fullPath(window.location)},setLocation:function(a){if(/^([^#\/]|$)/.test(a)&&(a=o&&!this.app.disable_push_state?"/"+a:"#!/"+a),a!=this.getLocation()){if(!o||this.app.disable_push_state||!/^\//.test(a))return window.location=a;history.pushState({path:a},window.title,a),this.app.trigger("location-changed")}},_startPolling:function(c){var d=this;if(!b.DefaultLocationProxy._interval){c||(c=10);var e=function(){var c=d.getLocation();("undefined"==typeof b.DefaultLocationProxy._last_location||c!=b.DefaultLocationProxy._last_location)&&window.setTimeout(function(){a(window).trigger("hashchange",[!0])},0),b.DefaultLocationProxy._last_location=c};e(),b.DefaultLocationProxy._interval=window.setInterval(e,c)}}}),b.Application=function(a){var c=this;this.routes={},this.listeners=new b.Object({}),this.arounds=[],this.befores=[],this.namespace=(new Date).getTime()+"-"+parseInt(1e3*Math.random(),10),this.context_prototype=function(){b.EventContext.apply(this,arguments)},this.context_prototype.prototype=new b.EventContext,g(a)&&a.apply(this,[this]),this._location_proxy||this.setLocationProxy(new b.DefaultLocationProxy(this,this.run_interval_every)),this.debug&&this.bindToAllEvents(function(a,b){c.log(c.toString(),a.cleaned_type,b||{})})},b.Application.prototype=a.extend({},b.Object.prototype,{ROUTE_VERBS:["get","post","put","delete"],APP_EVENTS:["run","unload","lookup-route","run-route","route-found","event-context-before","event-context-after","changed","error","check-form-submission","redirect","location-changed"],_last_route:null,_location_proxy:null,_running:!1,element_selector:"body",debug:!1,raise_errors:!1,run_interval_every:50,disable_push_state:!1,template_engine:null,toString:function(){return"Sammy.Application:"+this.element_selector},$element:function(b){return b?a(this.element_selector).find(b):a(this.element_selector)},use:function(){var a=f(arguments),c=a.shift(),d=c||"";try{a.unshift(this),"string"==typeof c&&(d="Sammy."+c,c=b[c]),c.apply(this,a)}catch(e){"undefined"==typeof c?this.error("Plugin Error: called use() but plugin ("+d.toString()+") is not defined",e):g(c)?this.error("Plugin Error",e):this.error("Plugin Error: called use() but '"+d.toString()+"' is not a function",e)}return this},setLocationProxy:function(a){var b=this._location_proxy;this._location_proxy=a,this.isRunning()&&(b&&b.unbind(),this._location_proxy.bind())},log:function(){b.log.apply(b,Array.prototype.concat.apply([this.element_selector],arguments))},route:function(b,e){var f,h,i=this,j=[],k=Array.prototype.slice.call(arguments,2);if(0===k.length&&g(e)&&(k=[e],e=b,b="any"),b=b.toLowerCase(),e.constructor==String){for(d.lastIndex=0;null!==(h=d.exec(e));)j.push(h[1]);e=new RegExp(e.replace(d,c)+"$")}return a.each(k,function(a,b){"string"==typeof b&&(k[a]=i[b])}),f=function(a){var b={verb:a,path:e,callback:k,param_names:j};i.routes[a]=i.routes[a]||[],i.routes[a].push(b)},"any"===b?a.each(this.ROUTE_VERBS,function(a,b){f(b)}):f(b),this},get:m("get"),post:m("post"),put:m("put"),del:m("delete"),any:m("any"),mapRoutes:function(b){var c=this;return a.each(b,function(a,b){c.route.apply(c,b)}),this},eventNamespace:function(){return["sammy-app",this.namespace].join("-")},bind:function(a,b,c){var d=this;"undefined"==typeof c&&(c=b);var e=function(){var a,b,e;a=arguments[0],e=arguments[1],e&&e.context?(b=e.context,delete e.context):b=new d.context_prototype(d,"bind",a.type,e,a.target),a.cleaned_type=a.type.replace(d.eventNamespace(),""),c.apply(b,[a,e])};return this.listeners[a]||(this.listeners[a]=[]),this.listeners[a].push(e),this.isRunning()&&this._listen(a,e),this},trigger:function(a,b){return this.$element().trigger([a,this.eventNamespace()].join("."),[b]),this},refresh:function(){return this.last_location=null,this.trigger("location-changed"),this},before:function(a,b){return g(a)&&(b=a,a={}),this.befores.push([a,b]),this},after:function(a){return this.bind("event-context-after",a)},around:function(a){return this.arounds.push(a),this},onComplete:function(a){return this._onComplete=a,this},isRunning:function(){return this._running},helpers:function(b){return a.extend(this.context_prototype.prototype,b),this},helper:function(a,b){return this.context_prototype.prototype[a]=b,this},run:function(c){if(this.isRunning())return!1;var d=this;return a.each(this.listeners.toHash(),function(b,c){a.each(c,function(a,c){d._listen(b,c)})}),this.trigger("run",{start_url:c}),this._running=!0,this.last_location=null,/\#(.+)/.test(this.getLocation())||"undefined"==typeof c||this.setLocation(c),this._checkLocation(),this._location_proxy.bind(),this.bind("location-changed",function(){d._checkLocation()}),this.bind("submit",function(c){if(!b.targetIsThisWindow(c,"form"))return!0;var e=d._checkFormSubmission(a(c.target).closest("form"));return e===!1?c.preventDefault():!1}),a(window).bind("unload",function(){d.unload()}),this.trigger("changed")},unload:function(){if(!this.isRunning())return!1;var b=this;return this.trigger("unload"),this._location_proxy.unbind(),this.$element().unbind("submit").removeClass(b.eventNamespace()),a.each(this.listeners.toHash(),function(c,d){a.each(d,function(a,d){b._unlisten(c,d)})}),this._running=!1,this},destroy:function(){return this.unload(),delete b.apps[this.element_selector],this},bindToAllEvents:function(b){var c=this;return a.each(this.APP_EVENTS,function(a,d){c.bind(d,b)}),a.each(this.listeners.keys(!0),function(d,e){-1==a.inArray(e,c.APP_EVENTS)&&c.bind(e,b)}),this},routablePath:function(a){return a.replace(e,"")},lookupRoute:function(a,b){var c,d,e=this,f=!1,g=0;if("undefined"!=typeof this.routes[a])for(c=this.routes[a].length;c>g;g++)if(d=this.routes[a][g],e.routablePath(b).match(d.path)){f=d;break}return f},runRoute:function(b,c,d,e){var f,g,h,i,k,l,m,n,o=this,p=this.lookupRoute(b,c);if(this.debug&&this.log("runRoute",[b,c].join(" ")),this.trigger("run-route",{verb:b,path:c,params:d}),"undefined"==typeof d&&(d={}),a.extend(d,this._parseQueryString(c)),p){this.trigger("route-found",{route:p}),null!==(m=p.path.exec(this.routablePath(c)))&&(m.shift(),a.each(m,function(a,b){p.param_names[a]?d[p.param_names[a]]=j(b):(d.splat||(d.splat=[]),d.splat.push(j(b)))})),f=new this.context_prototype(this,b,c,d,e),h=this.arounds.slice(0),i=this.befores.slice(0),l=[f],d.splat&&(l=l.concat(d.splat)),g=function(){for(var a,b,c;i.length>0;)if(k=i.shift(),o.contextMatchesOptions(f,k[0])&&(a=k[1].apply(f,[f]),a===!1))return!1;return o.last_route=p,f.trigger("event-context-before",{context:f}),"function"==typeof p.callback&&(p.callback=[p.callback]),p.callback&&p.callback.length&&(b=-1,c=function(){b++,p.callback[b]?a=p.callback[b].apply(f,l):o._onComplete&&o._onComplete(f)},l.push(c),c()),f.trigger("event-context-after",{context:f}),a},a.each(h.reverse(),function(a,b){var c=g;g=function(){return b.apply(f,[c])}});try{n=g()}catch(q){this.error(["500 Error",b,c].join(" "),q)}return n}return this.notFound(b,c)},contextMatchesOptions:function(b,c,d){var e=c;if(("string"==typeof e||i(e))&&(e={path:e}),"undefined"==typeof d&&(d=!0),a.isEmptyObject(e))return!0;if(h(e.path)){var f,g,j,k;for(f=[],g=0,k=e.path.length;k>g;g+=1)j=a.extend({},e,{path:e.path[g]}),f.push(this.contextMatchesOptions(b,j));var l=a.inArray(!0,f)>-1?!0:!1;return d?l:!l}if(e.only)return this.contextMatchesOptions(b,e.only,!0);if(e.except)return this.contextMatchesOptions(b,e.except,!1);var m=!0,n=!0;return e.path&&(i(e.path)||(e.path=new RegExp(e.path.toString()+"$")),m=e.path.test(b.path)),e.verb&&(n="string"==typeof e.verb?e.verb===b.verb:e.verb.indexOf(b.verb)>-1),d?n&&m:!(n&&m)},getLocation:function(){return this._location_proxy.getLocation()},setLocation:function(a){return this._location_proxy.setLocation(a)},swap:function(a,b){var c=this.$element().html(a);return g(b)&&b(a),c},templateCache:function(a,b){return"undefined"!=typeof b?n[a]=b:n[a]},clearTemplateCache:function(){return n={}},notFound:function(a,b){var c=this.error(["404 Not Found",a,b].join(" "));return"get"===a?c:!0},error:function(a,b){if(b||(b=new Error),b.message=[a,b.message].join(" "),this.trigger("error",{message:b.message,error:b}),this.raise_errors)throw b;this.log(b.message,b)},_checkLocation:function(){var a,b;return a=this.getLocation(),this.last_location&&"get"==this.last_location[0]&&this.last_location[1]==a||(this.last_location=["get",a],b=this.runRoute("get",a)),b},_getFormVerb:function(b){var c,d,e=a(b);return d=e.find('input[name="_method"]'),d.length>0&&(c=d.val()),c||(c=e[0].getAttribute("method")),c&&""!==c||(c="get"),a.trim(c.toString().toLowerCase())},_checkFormSubmission:function(b){var c,d,e,f,g;return this.trigger("check-form-submission",{form:b}),c=a(b),d=c.attr("action")||"",e=this._getFormVerb(c),this.debug&&this.log("_checkFormSubmission",c,d,e),"get"===e?(f=this._serializeFormParams(c),""!==f&&(d+="?"+f),this.setLocation(d),g=!1):(f=a.extend({},this._parseFormParams(c)),g=this.runRoute(e,d,f,b.get(0))),"undefined"==typeof g?!1:g},_serializeFormParams:function(a){var b,c="",d=a.serializeArray();if(d.length>0)for(c=this._encodeFormPair(d[0].name,d[0].value),b=1;b<d.length;b++)c=c+"&"+this._encodeFormPair(d[b].name,d[b].value);return c},_encodeFormPair:function(a,b){return k(a)+"="+k(b)},_parseFormParams:function(a){var b,c={},d=a.serializeArray();for(b=0;b<d.length;b++)c=this._parseParamPair(c,d[b].name,d[b].value);return c},_parseQueryString:function(a){var b,c,d,f,g={};if(b=a.match(e),b&&b[1])for(c=b[1].split("&"),f=0;f<c.length;f++)d=c[f].split("="),g=this._parseParamPair(g,j(d[0]),j(d[1]||""));return g},_parseParamPair:function(a,b,c){return"undefined"!=typeof a[b]?h(a[b])?a[b].push(c):a[b]=[a[b],c]:a[b]=c,a},_listen:function(a,b){return this.$element().bind([a,this.eventNamespace()].join("."),b)},_unlisten:function(a,b){return this.$element().unbind([a,this.eventNamespace()].join("."),b)}}),b.RenderContext=function(a){this.event_context=a,this.callbacks=[],this.previous_content=null,this.content=null,this.next_engine=!1,this.waiting=!1},b.RenderContext.prototype=a.extend({},b.Object.prototype,{then:function(a){if(!g(a)){if(!("string"==typeof a&&a in this.event_context))return this;var b=this.event_context[a];a=function(a){return b.apply(this.event_context,[a])}}var c=this;return this.waiting?this.callbacks.push(a):(this.wait(),window.setTimeout(function(){var b=a.apply(c,[c.content,c.previous_content]);b!==!1&&c.next(b)},0)),this},wait:function(){this.waiting=!0},next:function(a){this.waiting=!1,"undefined"!=typeof a&&(this.previous_content=this.content,this.content=a),this.callbacks.length>0&&this.then(this.callbacks.shift())},load:function(b,c,d){var e=this;return this.then(function(){var f,h,i;return g(c)?(d=c,c={}):c=a.extend({},c),d&&this.then(d),"string"==typeof b?(i=b.match(/\.json(\?|$)/)||c.json,f=i?c.cache===!0:c.cache!==!1,e.next_engine=e.event_context.engineFor(b),delete c.cache,delete c.json,c.engine&&(e.next_engine=c.engine,delete c.engine),f&&(h=this.event_context.app.templateCache(b))?h:(this.wait(),a.ajax(a.extend({url:b,data:{},dataType:i?"json":"text",type:"get",success:function(a){f&&e.event_context.app.templateCache(b,a),e.next(a)}},c)),!1)):b.nodeType?b.innerHTML:b.selector?(e.next_engine=b.attr("data-engine"),c.clone===!1?b.remove()[0].innerHTML.toString():b[0].innerHTML.toString()):void 0})},loadPartials:function(a){var b;if(a){this.partials=this.partials||{};for(b in a)!function(b,c){b.load(a[c]).then(function(a){this.partials[c]=a})}(this,b)}return this},render:function(a,b,c,d){return g(a)&&!b?this.then(a):(g(b)?(d=c,c=b,b=null):c&&!g(c)&&(d=c,c=null),this.loadPartials(d).load(a).interpolate(b,a).then(c))},partial:function(a,b,c,d){return g(c)?this.render(a,b,d).swap(c):g(b)?this.render(a,{},c).swap(b):this.render(a,b,c).swap()},send:function(){var a=this,b=f(arguments),c=b.shift();return h(b[0])&&(b=b[0]),this.then(function(){return b.push(function(b){a.next(b)}),a.wait(),c.apply(c,b),!1})},collect:function(b,c,d){var e=this,f=function(){g(b)&&(c=b,b=this.content);var d=[],f=!1;return a.each(b,function(a,b){var g=c.apply(e,[a,b]);return g.jquery&&1==g.length&&(g=g[0],f=!0),d.push(g),g}),f?d:d.join("")};return d?f():this.then(f)},renderEach:function(b,c,d,e){return h(c)&&(e=d,d=c,c=null),this.load(b).then(function(f){var g=this;return d||(d=h(this.previous_content)?this.previous_content:[]),e?void a.each(d,function(a,d){var h={},i=this.next_engine||b;c?h[c]=d:h=d,e(d,g.event_context.interpolate(f,h,i))}):this.collect(d,function(a,d){var e={},g=this.next_engine||b;return c?e[c]=d:e=d,this.event_context.interpolate(f,e,g)},!0)})},interpolate:function(a,b,c){var d=this;return this.then(function(e,f){!a&&f&&(a=f),this.next_engine&&(b=this.next_engine,this.next_engine=!1);var g=d.event_context.interpolate(e,a,b,this.partials);return c?f+g:g})},swap:function(a){return this.then(function(b){return this.event_context.swap(b,a),b}).trigger("changed",{})},appendTo:function(b){return this.then(function(c){a(b).append(c)}).trigger("changed",{})},prependTo:function(b){return this.then(function(c){a(b).prepend(c)}).trigger("changed",{})},replace:function(b){return this.then(function(c){a(b).html(c)}).trigger("changed",{})},trigger:function(a,b){return this.then(function(c){return"undefined"==typeof b&&(b={content:c}),this.event_context.trigger(a,b),c})}}),b.EventContext=function(a,c,d,e,f){this.app=a,this.verb=c,this.path=d,this.params=new b.Object(e),this.target=f},b.EventContext.prototype=a.extend({},b.Object.prototype,{$element:function(){return this.app.$element(f(arguments).shift())},engineFor:function(a){var b,c=this;return g(a)?a:(a=(a||c.app.template_engine).toString(),(b=a.match(/\.([^\.\?\#]+)(\?|$)/))&&(a=b[1]),a&&g(c[a])?c[a]:c.app.template_engine?this.engineFor(c.app.template_engine):function(a){return a})},interpolate:function(a,b,c,d){return this.engineFor(c).apply(this,[a,b,d])},render:function(a,c,d,e){return new b.RenderContext(this).render(a,c,d,e)},renderEach:function(a,c,d,e){return new b.RenderContext(this).renderEach(a,c,d,e)},load:function(a,c,d){return new b.RenderContext(this).load(a,c,d)},loadPartials:function(a){return new b.RenderContext(this).loadPartials(a)},partial:function(a,c,d,e){return new b.RenderContext(this).partial(a,c,d,e)},send:function(){var a=new b.RenderContext(this);return a.send.apply(a,arguments)},redirect:function(){var b,c=f(arguments),d=this.app.getLocation(),e=c.length;if(e>1){for(var g=0,h=[],i=[],j={},k=!1;e>g;g++)"string"==typeof c[g]?h.push(c[g]):(a.extend(j,c[g]),k=!0);if(b=h.join("/"),k){for(var l in j)i.push(this.app._encodeFormPair(l,j[l]));b+="?"+i.join("&")}}else b=c[0];this.trigger("redirect",{to:b}),this.app.last_location=[this.verb,this.path],this.app.setLocation(b),new RegExp(b).test(d)&&this.app.trigger("location-changed")},trigger:function(a,b){return"undefined"==typeof b&&(b={}),b.context||(b.context=this),this.app.trigger(a,b)},eventNamespace:function(){return this.app.eventNamespace()},swap:function(a,b){return this.app.swap(a,b)},notFound:function(){return this.app.notFound(this.verb,this.path)},json:function(b){return a.parseJSON(b)},toString:function(){return"Sammy.EventContext: "+[this.verb,this.path,this.params].join(" ")}}),b}),jw.Utils=function(a){var b=a(".main"),c={"//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js":!1,"//platform.twitter.com/widgets.js":!1,"/js/plugins/jquery.cycle.lite.js":!1,"/js/plugins/jquery.hoverIntent.js":!1,"/js/plugins/jquery.listCarousel.js":!1,"/js/plugins/jquery.star_bg.js":!1,"/js/stars.js":!1,"/js/ballPit.js":!1,"/js/bouncingObj.js":!1,"/js/computerGraphics/web/computergraphics.dart.js":!1,"/js/ustream.js":!1};return{require:function(b,d){c[b]?d(!0):a.ajax({url:b,dataType:"script",success:function(){c[b]=!0,d(!1)}})},getYear:function(){return(new Date).getFullYear()},resetModel:function(){b.empty();for(var c=0;c<jw.listeners.length;++c)jw.listeners[c].off();jw.listeners=[],"ballPit"===jw.Routing.lastPg?jw.BallPit.deInit():"stars"===jw.Routing.lastPg?jw.StarryBg.deInit():"bObj"===jw.Routing.lastPg&&jw.Bounce.deInit(),jw.body.removeClass(),document.title="",a("meta[name=description], meta[name=keywords]").remove(),a("meta[name=robots]").remove();var d=window.location.hash;if("undefined"==typeof d||0!==d.indexOf("#playground")){var e=a(".dPlaygroundNav");e.is(":visible")&&e.slideUp()}}}}(jQuery),window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}(),jw.AboutModel=function(){return{render:function(a){jw.Utils.resetModel(),a.load("/about.html").swap(),document.title="About",jw.body.addClass("about")}}}(jQuery),jw.ContactModel=function(){return{render:function(a){jw.Utils.resetModel(),a.load("/contact.html").swap(),document.title="Contact Me",jw.body.addClass("contact")}}}(jQuery),jw.GamesModel=function(a){return{render:function(b,c){jw.Utils.resetModel(),"index"===c&&(b.load("/games/index.html",function(){jw.Utils.require("/js/plugins/jquery.hoverIntent.js",function(){}),jw.Utils.require("/js/plugins/jquery.listCarousel.js",function(){a("ul").listCarousel()})}).swap(),document.title="Games",jw.body.addClass("absHover games"))}}}(jQuery),jw.HomeModel=function(){return{render:function(a){jw.Utils.resetModel(),a.load("/home.html",function(){jw.Utils.require("//platform.twitter.com/widgets.js",function(){twttr.widgets.load()})}).swap(),document.title="Jon Wiedmann",jw.head.append("<meta name='description' content='Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability. This site has information regarding my work experience and hobbies.' /><meta name='keywords' content='Jon Wiedmann, Web Developer, PHP, HTML5, CSS, jQuery, Javascript, sammy.js' />"),jw.body.addClass("home")}}}(jQuery),jw.MusicModel=function(a){var b=jw.Utils.getYear();return{render:function(c,d){jw.Utils.resetModel(),"index"===d?(c.load("/music/index.html",function(){a(".teaching").text(b-2008),a(".playing").text(b-1994)}).swap(),document.title="Music",jw.body.addClass("music musicHome")):"bass"===d?(c.load("/music/bass.html",function(){a(".playing").text(b-2009)}).swap(),document.title="Bass | Music",jw.body.addClass("music bass")):"chiptunes"===d?(c.load("/music/chiptunes.html",function(){}).swap(),document.title="Chiptunes | Music",jw.body.addClass("music")):"guitar"===d?(c.load("/music/guitar.html",function(){a(".playing").text(b-2002)}).swap(),document.title="Guitar | Music",jw.body.addClass("music")):"mandolin"===d?(c.load("/music/mandolin.html",function(){a(".playing").text(b-2008)}).swap(),document.title="Mandolin | Music",jw.body.addClass("music mandolin")):"piano"===d?(c.load("/music/piano.html",function(){a(".playing").text(b-1994)}).swap(),document.title="Piano | Music",jw.body.addClass("music")):"trumpet"===d?(c.load("/music/trumpet.html",function(){a(".playing").text(b-1998)}).swap(),document.title="Trumpet | Music",jw.body.addClass("music trumpet")):"rates"===d?(c.load("/music/rates.html",function(){}).swap(),document.title="Rates | Music",jw.head.append("<meta name='description' content='Music Lesson Rates'><meta name='robots' rel='none' />"),jw.body.addClass("music rates")):"voice"===d&&(c.load("/music/voice.html",function(){a(".playing").text(b-2009)}).swap(),document.title="Voice | Music",jw.body.addClass("music"))}}}(jQuery),jw.PlaygroundModel=function(a){return{render:function(b,c){jw.Utils.resetModel(),"index"===c?(b.load("/playground/index.html",function(){}).swap(),document.title="Playground",jw.head.append("<meta name='description' content='An playground area for web tech demos.' /><meta name='keywords' content='canvas, html5' />"),jw.body.addClass("playground playInner")):"ballPit"===c?(b.load("/playground/ballPit.html",function(){jw.Utils.require("/js/ballPit.js",function(){jw.BallPit.init()})}).swap(),document.title="Ball Pit | Playground",jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' /><meta name='keywords' content='canvas, html5' />"),jw.body.addClass("playground playInner nav3")):"stars"===c?(b.load("/playground/stars.html",function(){jw.Utils.require("/js/plugins/jquery.star_bg.js",function(){jw.Utils.require("/js/stars.js",function(){jw.StarryBg.init()})})}).swap(),document.title="Starry Background | Playground",jw.head.append("<meta name='description' content='A canvas example showcasing a starry background.' /><meta name='keywords' content='canvas, html5' />"),jw.body.addClass("playground playInner nav2")):"bObj"===c?(b.load("/playground/bouncing-object.html",function(){jw.Utils.require("/js/bouncingObj.js",function(){jw.Bounce.init()})}).swap(),document.title="Bouncing Object | Playground",jw.head.append("<meta name='description' content='A canvas example showcasing a bouncing object.' /><meta name='keywords' content='canvas, html5' />"),jw.body.addClass("playground playInner nav5")):"ustream"===c?(b.load("/playground/USTREAM-demo.html",function(){jw.Utils.require("/js/ustream.js",function(){jw.Ustream.init()})}).swap(),document.title="USTREAM demo | Playground",jw.head.append("<meta name='description' content='A USTREAM api demo.' /><meta name='keywords' content='USTREAM' />"),jw.body.addClass("playground playInner uStreamPage nav5")):"bCube"===c&&(b.load("/playground/breakdancing-cube.html",function(){a("#cube").on("click",function(a){a.preventDefault()})}).swap(),document.title="Breakdancing Cube | Playground",jw.head.append("<meta name='description' content='Pure CSS3 animation demo.' /><meta name='keywords' content='CSS3, HTML5' />"),jw.body.addClass("playground playInner bDancingCube nav1"));var d=a(".dPlaygroundNav");d.is(":visible")||d.slideDown()}}}(jQuery),jw.PortfolioModel=function(a){return{render:function(b,c){jw.Utils.resetModel(),"index"===c&&(b.load("/portfolio/index.html",function(){jw.Utils.require("/js/plugins/jquery.hoverIntent.js",function(){}),jw.Utils.require("/js/plugins/jquery.listCarousel.js",function(){a("ul").listCarousel()})}).swap(),document.title="Portfolio",jw.body.addClass("portfolio absHover"))}}}(jQuery),jw.Routing=function(){var a=$.sammy(".main",function(){this.route("get","/",function(){jw.HomeModel.render(this),jw.Routing.lastPg="home"}),this.route("get","#home",function(){jw.HomeModel.render(this),jw.Routing.lastPg="home"}),this.route("get","#about",function(){jw.AboutModel.render(this),jw.Routing.lastPg="about"}),this.route("get","#contact",function(){jw.ContactModel.render(this),jw.Routing.lastPg="contact"}),this.route("get","#games",function(){jw.GamesModel.render(this,"index"),jw.Routing.lastPg="games/index"}),this.route("get","#music",function(){jw.MusicModel.render(this,"index"),jw.Routing.lastPg="music/index"}),this.route("get","#music/bass",function(){jw.MusicModel.render(this,"bass"),jw.Routing.lastPg="music/bass"}),this.route("get","#music/chiptunes",function(){jw.MusicModel.render(this,"chiptunes"),jw.Routing.lastPg="music/chiptunes"}),this.route("get","#music/guitar",function(){jw.MusicModel.render(this,"guitar"),jw.Routing.lastPg="music/guitar"}),this.route("get","#music/mandolin",function(){jw.MusicModel.render(this,"mandolin"),jw.Routing.lastPg="music/mandolin"}),this.route("get","#music/piano",function(){jw.MusicModel.render(this,"piano"),jw.Routing.lastPg="music/piano"}),this.route("get","#music/trumpet",function(){jw.MusicModel.render(this,"trumpet"),jw.Routing.lastPg="music/trumpet"}),this.route("get","#music/rates",function(){jw.MusicModel.render(this,"rates"),jw.Routing.lastPg="music/rates"}),this.route("get","#music/voice",function(){jw.MusicModel.render(this,"voice"),jw.Routing.lastPg="music/voice"}),this.route("get","#playground",function(){jw.PlaygroundModel.render(this,"index"),jw.Routing.lastPg="playground/index"}),this.route("get","#playground/ballPit",function(){jw.PlaygroundModel.render(this,"ballPit"),jw.Routing.lastPg="ballPit"}),this.route("get","#playground/breakdancing-cube",function(){jw.PlaygroundModel.render(this,"bCube"),jw.Routing.lastPg="bCube"}),this.route("get","#playground/bouncing-object",function(){jw.PlaygroundModel.render(this,"bObj"),jw.Routing.lastPg="bObj"}),this.route("get","#playground/starry-background",function(){jw.PlaygroundModel.render(this,"stars"),jw.Routing.lastPg="stars"}),this.route("get","#playground/USTREAM-demo",function(){jw.PlaygroundModel.render(this,"ustream"),jw.Routing.lastPg="ustream"}),this.route("get","#portfolio",function(){jw.PortfolioModel.render(this,"index"),jw.Routing.lastPg="portfolio/index"})});return{lastPg:null,init:function(){a.run()}}}(),jw.Main=function(){function a(){jw.head=$("head"),jw.body=$("body"),jw.listeners=[]}return{init:function(){a(),jw.Routing.init(),$(".dateYear").text(jw.Utils.getYear()),$(window).on("resize",function(){var a=$(".colR > div:visible").height();jw.Main.fixColRHeight(a)}),$("header a").on("click",function(){$(".main").height("auto")})},fixColRHeight:function(a){var b=a+120;$(window).width()<=800?b=0:$(window).width()<=1265&&(b+=$(".colL").height()+38),$(".main").height(0==b?"auto":b)}}}(),$(function(){jw.Main.init()});