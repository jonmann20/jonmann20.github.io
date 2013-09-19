(function(d,e,j,h,f,c,b){d.GoogleAnalyticsObject=f;d[f]=d[f]||function(){(d[f].q=d[f].q||[]).push(arguments)},d[f].l=1*new Date();c=e.createElement(j),b=e.getElementsByTagName(j)[0];c.async=1;c.src=h;b.parentNode.insertBefore(c,b)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create","UA-43015655-1","jonmann20.github.io");ga("send","pageview");(function(b,a){(function(c){if(typeof define==="function"&&define.amd){define(["jquery"],c)}else{b.sammy=a.Sammy=c(b)}})(function(k){var s,i="([^/]+)",n=/:([\w\d]+)/g,o=/\?([^#]*)?$/,e=function(t){return Array.prototype.slice.call(t)},f=function(t){return Object.prototype.toString.call(t)==="[object Function]"},p=function(t){return Object.prototype.toString.call(t)==="[object Array]"},j=function(t){return Object.prototype.toString.call(t)==="[object RegExp]"},l=function(t){return decodeURIComponent((t||"").replace(/\+/g," "))},d=encodeURIComponent,h=function(t){return String(t).replace(/&(?!\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},q=function(t){return function(){return this.route.apply(this,[t].concat(Array.prototype.slice.call(arguments)))}},c={},r=!!(a.history&&history.pushState),g=[];s=function(){var u=e(arguments),v,t;s.apps=s.apps||{};if(u.length===0||u[0]&&f(u[0])){return s.apply(s,["body"].concat(u))}else{if(typeof(t=u.shift())=="string"){v=s.apps[t]||new s.Application();v.element_selector=t;if(u.length>0){k.each(u,function(w,x){v.use(x)})}if(v.element_selector!=t){delete s.apps[t]}s.apps[v.element_selector]=v;return v}}};s.VERSION="0.7.4";s.addLogger=function(t){g.push(t)};s.log=function(){var t=e(arguments);t.unshift("["+Date()+"]");k.each(g,function(v,u){u.apply(s,t)})};if(typeof a.console!="undefined"){if(f(a.console.log.apply)){s.addLogger(function(){a.console.log.apply(a.console,arguments)})}else{s.addLogger(function(){a.console.log(arguments)})}}else{if(typeof console!="undefined"){s.addLogger(function(){console.log.apply(console,arguments)})}}k.extend(s,{makeArray:e,isFunction:f,isArray:p});s.Object=function(t){return k.extend(this,t||{})};k.extend(s.Object.prototype,{escapeHTML:h,h:h,toHash:function(){var t={};k.each(this,function(w,u){if(!f(u)){t[w]=u}});return t},toHTML:function(){var t="";k.each(this,function(w,u){if(!f(u)){t+="<strong>"+w+"</strong> "+u+"<br />"}});return t},keys:function(t){var u=[];for(var v in this){if(!f(this[v])||!t){u.push(v)}}return u},has:function(t){return this[t]&&k.trim(this[t].toString())!==""},join:function(){var u=e(arguments);var t=u.shift();return u.join(t)},log:function(){s.log.apply(s,arguments)},toString:function(t){var u=[];k.each(this,function(x,w){if(!f(w)||t){u.push('"'+x+'": '+w.toString())}});return"Sammy.Object: {"+u.join(",")+"}"}});s.targetIsThisWindow=function m(u){var t=k(u.target).attr("target");if(!t||t===a.name||t==="_self"){return true}if(t==="_blank"){return false}if(t==="top"&&a===a.top){return true}return false};s.DefaultLocationProxy=function(u,t){this.app=u;this.is_native=false;this.has_history=r;this._startPolling(t)};s.DefaultLocationProxy.fullPath=function(t){var u=t.toString().match(/^[^#]*(#.+)$/);var v=u?u[1]:"";return[t.pathname,t.search,v].join("")};k.extend(s.DefaultLocationProxy.prototype,{bind:function(){var u=this,v=this.app,t=s.DefaultLocationProxy;k(a).bind("hashchange."+this.app.eventNamespace(),function(x,w){if(u.is_native===false&&!w){u.is_native=true;a.clearInterval(t._interval);t._interval=null}v.trigger("location-changed")});if(r&&!v.disable_push_state){k(a).bind("popstate."+this.app.eventNamespace(),function(w){v.trigger("location-changed")});k(document).delegate("a","click.history-"+this.app.eventNamespace(),function(x){if(x.isDefaultPrevented()||x.metaKey||x.ctrlKey){return}var w=t.fullPath(this);if(this.hostname==a.location.hostname&&v.lookupRoute("get",w)&&s.targetIsThisWindow(x)){x.preventDefault();u.setLocation(w);return false}})}if(!t._bindings){t._bindings=0}t._bindings++},unbind:function(){k(a).unbind("hashchange."+this.app.eventNamespace());k(a).unbind("popstate."+this.app.eventNamespace());k(document).undelegate("a","click.history-"+this.app.eventNamespace());s.DefaultLocationProxy._bindings--;if(s.DefaultLocationProxy._bindings<=0){a.clearInterval(s.DefaultLocationProxy._interval);s.DefaultLocationProxy._interval=null}},getLocation:function(){return s.DefaultLocationProxy.fullPath(a.location)},setLocation:function(t){if(/^([^#\/]|$)/.test(t)){if(r&&!this.app.disable_push_state){t="/"+t}else{t="#!/"+t}}if(t!=this.getLocation()){if(r&&!this.app.disable_push_state&&/^\//.test(t)){history.pushState({path:t},a.title,t);this.app.trigger("location-changed")}else{return(a.location=t)}}},_startPolling:function(v){var u=this;if(!s.DefaultLocationProxy._interval){if(!v){v=10}var t=function(){var w=u.getLocation();if(typeof s.DefaultLocationProxy._last_location=="undefined"||w!=s.DefaultLocationProxy._last_location){a.setTimeout(function(){k(a).trigger("hashchange",[true])},0)}s.DefaultLocationProxy._last_location=w};t();s.DefaultLocationProxy._interval=a.setInterval(t,v)}}});s.Application=function(t){var u=this;this.routes={};this.listeners=new s.Object({});this.arounds=[];this.befores=[];this.namespace=(new Date()).getTime()+"-"+parseInt(Math.random()*1000,10);this.context_prototype=function(){s.EventContext.apply(this,arguments)};this.context_prototype.prototype=new s.EventContext();if(f(t)){t.apply(this,[this])}if(!this._location_proxy){this.setLocationProxy(new s.DefaultLocationProxy(this,this.run_interval_every))}if(this.debug){this.bindToAllEvents(function(w,v){u.log(u.toString(),w.cleaned_type,v||{})})}};s.Application.prototype=k.extend({},s.Object.prototype,{ROUTE_VERBS:["get","post","put","delete"],APP_EVENTS:["run","unload","lookup-route","run-route","route-found","event-context-before","event-context-after","changed","error","check-form-submission","redirect","location-changed"],_last_route:null,_location_proxy:null,_running:false,element_selector:"body",debug:false,raise_errors:false,run_interval_every:50,disable_push_state:false,template_engine:null,toString:function(){return"Sammy.Application:"+this.element_selector},$element:function(t){return t?k(this.element_selector).find(t):k(this.element_selector)},use:function(){var t=e(arguments),v=t.shift(),u=v||"";try{t.unshift(this);if(typeof v=="string"){u="Sammy."+v;v=s[v]}v.apply(this,t)}catch(w){if(typeof v==="undefined"){this.error("Plugin Error: called use() but plugin ("+u.toString()+") is not defined",w)}else{if(!f(v)){this.error("Plugin Error: called use() but '"+u.toString()+"' is not a function",w)}else{this.error("Plugin Error",w)}}}return this},setLocationProxy:function(t){var u=this._location_proxy;this._location_proxy=t;if(this.isRunning()){if(u){u.unbind()}this._location_proxy.bind()}},log:function(){s.log.apply(s,Array.prototype.concat.apply([this.element_selector],arguments))},route:function(x,u){var w=this,z=[],t,v,y=Array.prototype.slice.call(arguments,2);if(y.length===0&&f(u)){u=x;y=[u];x="any"}x=x.toLowerCase();if(u.constructor==String){n.lastIndex=0;while((v=n.exec(u))!==null){z.push(v[1])}u=new RegExp(u.replace(n,i)+"$")}k.each(y,function(B,A){if(typeof(A)==="string"){y[B]=w[A]}});t=function(A){var B={verb:A,path:u,callback:y,param_names:z};w.routes[A]=w.routes[A]||[];w.routes[A].push(B)};if(x==="any"){k.each(this.ROUTE_VERBS,function(B,A){t(A)})}else{t(x)}return this},get:q("get"),post:q("post"),put:q("put"),del:q("delete"),any:q("any"),mapRoutes:function(u){var t=this;k.each(u,function(v,w){t.route.apply(t,w)});return this},eventNamespace:function(){return["sammy-app",this.namespace].join("-")},bind:function(t,v,x){var w=this;if(typeof x=="undefined"){x=v}var u=function(){var A,y,z;A=arguments[0];z=arguments[1];if(z&&z.context){y=z.context;delete z.context}else{y=new w.context_prototype(w,"bind",A.type,z,A.target)}A.cleaned_type=A.type.replace(w.eventNamespace(),"");x.apply(y,[A,z])};if(!this.listeners[t]){this.listeners[t]=[]}this.listeners[t].push(u);if(this.isRunning()){this._listen(t,u)}return this},trigger:function(t,u){this.$element().trigger([t,this.eventNamespace()].join("."),[u]);return this},refresh:function(){this.last_location=null;this.trigger("location-changed");return this},before:function(t,u){if(f(t)){u=t;t={}}this.befores.push([t,u]);return this},after:function(t){return this.bind("event-context-after",t)},around:function(t){this.arounds.push(t);return this},onComplete:function(t){this._onComplete=t;return this},isRunning:function(){return this._running},helpers:function(t){k.extend(this.context_prototype.prototype,t);return this},helper:function(t,u){this.context_prototype.prototype[t]=u;return this},run:function(t){if(this.isRunning()){return false}var u=this;k.each(this.listeners.toHash(),function(v,w){k.each(w,function(y,x){u._listen(v,x)})});this.trigger("run",{start_url:t});this._running=true;this.last_location=null;if(!(/\#(.+)/.test(this.getLocation()))&&typeof t!="undefined"){this.setLocation(t)}this._checkLocation();this._location_proxy.bind();this.bind("location-changed",function(){u._checkLocation()});this.bind("submit",function(w){if(!s.targetIsThisWindow(w)){return true}var v=u._checkFormSubmission(k(w.target).closest("form"));return(v===false)?w.preventDefault():false});k(a).bind("unload",function(){u.unload()});return this.trigger("changed")},unload:function(){if(!this.isRunning()){return false}var t=this;this.trigger("unload");this._location_proxy.unbind();this.$element().unbind("submit").removeClass(t.eventNamespace());k.each(this.listeners.toHash(),function(u,v){k.each(v,function(x,w){t._unlisten(u,w)})});this._running=false;return this},destroy:function(){this.unload();delete s.apps[this.element_selector];return this},bindToAllEvents:function(u){var t=this;k.each(this.APP_EVENTS,function(v,w){t.bind(w,u)});k.each(this.listeners.keys(true),function(w,v){if(k.inArray(v,t.APP_EVENTS)==-1){t.bind(v,u)}});return this},routablePath:function(t){return t.replace(o,"")},lookupRoute:function(z,x){var y=this,w=false,v=0,t,u;if(typeof this.routes[z]!="undefined"){t=this.routes[z].length;for(;v<t;v++){u=this.routes[z][v];if(y.routablePath(x).match(u.path)){w=u;break}}}return w},runRoute:function(v,I,x,A){var w=this,G=this.lookupRoute(v,I),u,D,y,C,H,E,B,F,t;if(this.debug){this.log("runRoute",[v,I].join(" "))}this.trigger("run-route",{verb:v,path:I,params:x});if(typeof x=="undefined"){x={}}k.extend(x,this._parseQueryString(I));if(G){this.trigger("route-found",{route:G});if((F=G.path.exec(this.routablePath(I)))!==null){F.shift();k.each(F,function(J,K){if(G.param_names[J]){x[G.param_names[J]]=l(K)}else{if(!x.splat){x.splat=[]}x.splat.push(l(K))}})}u=new this.context_prototype(this,v,I,x,A);y=this.arounds.slice(0);H=this.befores.slice(0);B=[u];if(x.splat){B=B.concat(x.splat)}D=function(){var K,J,L;while(H.length>0){E=H.shift();if(w.contextMatchesOptions(u,E[0])){K=E[1].apply(u,[u]);if(K===false){return false}}}w.last_route=G;u.trigger("event-context-before",{context:u});if(typeof(G.callback)==="function"){G.callback=[G.callback]}if(G.callback&&G.callback.length){J=-1;L=function(){J++;if(G.callback[J]){K=G.callback[J].apply(u,B)}else{if(w._onComplete&&typeof(w._onComplete==="function")){w._onComplete(u)}}};B.push(L);L()}u.trigger("event-context-after",{context:u});return K};k.each(y.reverse(),function(J,K){var L=D;D=function(){return K.apply(u,[L])}});try{t=D()}catch(z){this.error(["500 Error",v,I].join(" "),z)}return t}else{return this.notFound(v,I)}},contextMatchesOptions:function(v,w,B){var D=w;if(typeof D==="string"||j(D)){D={path:D}}if(typeof B==="undefined"){B=true}if(k.isEmptyObject(D)){return true}if(p(D.path)){var A,x,t,C;A=[];for(x=0,C=D.path.length;x<C;x+=1){t=k.extend({},D,{path:D.path[x]});A.push(this.contextMatchesOptions(v,t))}var u=k.inArray(true,A)>-1?true:false;return B?u:!u}if(D.only){return this.contextMatchesOptions(v,D.only,true)}else{if(D.except){return this.contextMatchesOptions(v,D.except,false)}}var y=true,z=true;if(D.path){if(!j(D.path)){D.path=new RegExp(D.path.toString()+"$")}y=D.path.test(v.path)}if(D.verb){if(typeof D.verb==="string"){z=D.verb===v.verb}else{z=D.verb.indexOf(v.verb)>-1}}return B?(z&&y):!(z&&y)},getLocation:function(){return this._location_proxy.getLocation()},setLocation:function(t){return this._location_proxy.setLocation(t)},swap:function(u,v){var t=this.$element().html(u);if(f(v)){v(u)}return t},templateCache:function(t,u){if(typeof u!="undefined"){return c[t]=u}else{return c[t]}},clearTemplateCache:function(){return(c={})},notFound:function(v,u){var t=this.error(["404 Not Found",v,u].join(" "));return(v==="get")?t:true},error:function(u,t){if(!t){t=new Error()}t.message=[u,t.message].join(" ");this.trigger("error",{message:t.message,error:t});if(this.raise_errors){throw (t)}else{this.log(t.message,t)}},_checkLocation:function(){var t,u;t=this.getLocation();if(!this.last_location||this.last_location[0]!="get"||this.last_location[1]!=t){this.last_location=["get",t];u=this.runRoute("get",t)}return u},_getFormVerb:function(v){var u=k(v),w,t;t=u.find('input[name="_method"]');if(t.length>0){w=t.val()}if(!w){w=u[0].getAttribute("method")}if(!w||w===""){w="get"}return k.trim(w.toString().toLowerCase())},_checkFormSubmission:function(v){var t,w,y,x,u;this.trigger("check-form-submission",{form:v});t=k(v);w=t.attr("action")||"";y=this._getFormVerb(t);if(this.debug){this.log("_checkFormSubmission",t,w,y)}if(y==="get"){x=this._serializeFormParams(t);if(x!==""){w+="?"+x}this.setLocation(w);u=false}else{x=k.extend({},this._parseFormParams(t));u=this.runRoute(y,w,x,v.get(0))}return(typeof u=="undefined")?false:u},_serializeFormParams:function(u){var w="",t=u.serializeArray(),v;if(t.length>0){w=this._encodeFormPair(t[0].name,t[0].value);for(v=1;v<t.length;v++){w=w+"&"+this._encodeFormPair(t[v].name,t[v].value)}}return w},_encodeFormPair:function(t,u){return d(t)+"="+d(u)},_parseFormParams:function(t){var w={},v=t.serializeArray(),u;for(u=0;u<v.length;u++){w=this._parseParamPair(w,v[u].name,v[u].value)}return w},_parseQueryString:function(w){var y={},v,u,x,t;v=w.match(o);if(v&&v[1]){u=v[1].split("&");for(t=0;t<u.length;t++){x=u[t].split("=");y=this._parseParamPair(y,l(x[0]),l(x[1]||""))}}return y},_parseParamPair:function(v,t,u){if(typeof v[t]!=="undefined"){if(p(v[t])){v[t].push(u)}else{v[t]=[v[t],u]}}else{v[t]=u}return v},_listen:function(t,u){return this.$element().bind([t,this.eventNamespace()].join("."),u)},_unlisten:function(t,u){return this.$element().unbind([t,this.eventNamespace()].join("."),u)}});s.RenderContext=function(t){this.event_context=t;this.callbacks=[];this.previous_content=null;this.content=null;this.next_engine=false;this.waiting=false};s.RenderContext.prototype=k.extend({},s.Object.prototype,{then:function(v){if(!f(v)){if(typeof v==="string"&&v in this.event_context){var u=this.event_context[v];v=function(w){return u.apply(this.event_context,[w])}}else{return this}}var t=this;if(this.waiting){this.callbacks.push(v)}else{this.wait();a.setTimeout(function(){var w=v.apply(t,[t.content,t.previous_content]);if(w!==false){t.next(w)}},0)}return this},wait:function(){this.waiting=true},next:function(t){this.waiting=false;if(typeof t!=="undefined"){this.previous_content=this.content;this.content=t}if(this.callbacks.length>0){this.then(this.callbacks.shift())}},load:function(t,u,w){var v=this;return this.then(function(){var x,y,A,z;if(f(u)){w=u;u={}}else{u=k.extend({},u)}if(w){this.then(w)}if(typeof t==="string"){A=(t.match(/\.json$/)||u.json);x=A?u.cache===true:u.cache!==false;v.next_engine=v.event_context.engineFor(t);delete u.cache;delete u.json;if(u.engine){v.next_engine=u.engine;delete u.engine}if(x&&(y=this.event_context.app.templateCache(t))){return y}this.wait();k.ajax(k.extend({url:t,data:{},dataType:A?"json":"text",type:"get",success:function(B){if(x){v.event_context.app.templateCache(t,B)}v.next(B)}},u));return false}else{if(t.nodeType){return t.innerHTML}if(t.selector){v.next_engine=t.attr("data-engine");if(u.clone===false){return t.remove()[0].innerHTML.toString()}else{return t[0].innerHTML.toString()}}}})},loadPartials:function(u){var t;if(u){this.partials=this.partials||{};for(t in u){(function(w,v){w.load(u[v]).then(function(x){this.partials[v]=x})})(this,t)}}return this},render:function(t,v,w,u){if(f(t)&&!v){return this.then(t)}else{if(f(v)){u=w;w=v;v=null}else{if(w&&!f(w)){u=w;w=null}}return this.loadPartials(u).load(t).interpolate(v,t).then(w)}},partial:function(t,v,w,u){if(f(w)){return this.render(t,v,u).swap(w)}else{if(f(v)){return this.render(t,{},w).swap(v)}else{return this.render(t,v,w).swap()}}},send:function(){var v=this,u=e(arguments),t=u.shift();if(p(u[0])){u=u[0]}return this.then(function(w){u.push(function(x){v.next(x)});v.wait();t.apply(t,u);return false})},collect:function(x,w,t){var v=this;var u=function(){if(f(x)){w=x;x=this.content}var y=[],z=false;k.each(x,function(A,C){var B=w.apply(v,[A,C]);if(B.jquery&&B.length==1){B=B[0];z=true}y.push(B);return B});return z?y:y.join("")};return t?u():this.then(u)},renderEach:function(t,u,v,w){if(p(u)){w=v;v=u;u=null}return this.load(t).then(function(y){var x=this;if(!v){v=p(this.previous_content)?this.previous_content:[]}if(w){k.each(v,function(z,B){var C={},A=this.next_engine||t;if(u){C[u]=B}else{C=B}w(B,x.event_context.interpolate(y,C,A))})}else{return this.collect(v,function(z,B){var C={},A=this.next_engine||t;if(u){C[u]=B}else{C=B}return this.event_context.interpolate(y,C,A)},true)}})},interpolate:function(w,v,t){var u=this;return this.then(function(y,x){if(!w&&x){w=x}if(this.next_engine){v=this.next_engine;this.next_engine=false}var z=u.event_context.interpolate(y,w,v,this.partials);return t?x+z:z})},swap:function(t){return this.then(function(u){this.event_context.swap(u,t);return u}).trigger("changed",{})},appendTo:function(t){return this.then(function(u){k(t).append(u)}).trigger("changed",{})},prependTo:function(t){return this.then(function(u){k(t).prepend(u)}).trigger("changed",{})},replace:function(t){return this.then(function(u){k(t).html(u)}).trigger("changed",{})},trigger:function(t,u){return this.then(function(v){if(typeof u=="undefined"){u={content:v}}this.event_context.trigger(t,u);return v})}});s.EventContext=function(x,w,u,v,t){this.app=x;this.verb=w;this.path=u;this.params=new s.Object(v);this.target=t};s.EventContext.prototype=k.extend({},s.Object.prototype,{$element:function(){return this.app.$element(e(arguments).shift())},engineFor:function(v){var u=this,t;if(f(v)){return v}v=(v||u.app.template_engine).toString();if((t=v.match(/\.([^\.\?\#]+)$/))){v=t[1]}if(v&&f(u[v])){return u[v]}if(u.app.template_engine){return this.engineFor(u.app.template_engine)}return function(w,x){return w}},interpolate:function(v,w,u,t){return this.engineFor(u).apply(this,[v,w,t])},render:function(t,v,w,u){return new s.RenderContext(this).render(t,v,w,u)},renderEach:function(t,u,v,w){return new s.RenderContext(this).renderEach(t,u,v,w)},load:function(t,u,v){return new s.RenderContext(this).load(t,u,v)},loadPartials:function(t){return new s.RenderContext(this).loadPartials(t)},partial:function(t,v,w,u){return new s.RenderContext(this).partial(t,v,w,u)},send:function(){var t=new s.RenderContext(this);return t.send.apply(t,arguments)},redirect:function(){var B,z=e(arguments),y=this.app.getLocation(),u=z.length;if(u>1){var x=0,C=[],t=[],w={},A=false;for(;x<u;x++){if(typeof z[x]=="string"){C.push(z[x])}else{k.extend(w,z[x]);A=true}}B=C.join("/");if(A){for(var v in w){t.push(this.app._encodeFormPair(v,w[v]))}B+="?"+t.join("&")}}else{B=z[0]}this.trigger("redirect",{to:B});this.app.last_location=[this.verb,this.path];this.app.setLocation(B);if(new RegExp(B).test(y)){this.app.trigger("location-changed")}},trigger:function(t,u){if(typeof u=="undefined"){u={}}if(!u.context){u.context=this}return this.app.trigger(t,u)},eventNamespace:function(){return this.app.eventNamespace()},swap:function(t,u){return this.app.swap(t,u)},notFound:function(){return this.app.notFound(this.verb,this.path)},json:function(t){return k.parseJSON(t)},toString:function(){return"Sammy.EventContext: "+[this.verb,this.path,this.params].join(" ")}});return s})})(jQuery,window);jw.Utils=(function(b,c){var a={"//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js":false,"//platform.twitter.com/widgets.js":false,"/js/plugins/jquery.cycle.lite.js":false,"/js/plugins/jquery.hoverIntent.min.js":false,"/js/plugins/jquery.hoverCarousel.js":false,"/js/plugins/jquery.star_bg.js":false,"/js/stars.js":false,"/js/ballPit.js":false,"/js/bouncingObj.js":false,"/js/computerGraphics/web/computergraphics.dart.js":false,"/js/ustream.js":false};return{require:function(d,e){if(!a[d]){b.ajax({url:d,dataType:"script",success:function(f){a[d]=true;e(false)}})}else{e(true)}},getYear:function(){return new Date().getFullYear()},resetModel:function(){if(jw.Routing.lastPg==="ballPit"){jw.BallPit.deInit()}else{if(jw.Routing.lastPg==="stars"){jw.StarryBg.deInit()}else{if(jw.Routing.lastPg==="bObj"){jw.Bounce.deInit()}}}jw.main.empty();jw.body.removeClass();document.title="";b("meta[name=description], meta[name=keywords]").remove();b("meta[name=robots]").remove();b(".dPlaygroundNav").hide()}}})(jQuery);window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(a){window.setTimeout(a,1000/60)}})();jw.HomeModel=(function(a,b){return{render:function(c){jw.Utils.resetModel();c.load("/home.html",function(d){jw.main.html(d);jw.Utils.require("//platform.twitter.com/widgets.js",function(e){twttr.widgets.load()});jw.Utils.require("/js/plugins/jquery.cycle.lite.js",function(e){a("#slideshow").cycle()})});document.title="Jon Wiedmann";jw.head.append("<meta name='description' content='Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability. This site has information regarding my work experience and hobbies.' /><meta name='keywords' content='Jon Wiedmann, Web Developer, PHP, HTML5, CSS, jQuery, Javascript, sammy.js' />");jw.body.addClass("home")}}})(jQuery);jw.AboutModel=(function(a,b){return{render:function(c){jw.Utils.resetModel();c.load("/about.html",function(d){jw.main.html(d)});document.title="About";jw.body.addClass("about")}}})(jQuery);jw.ContactModel=(function(a,b){return{render:function(c){jw.Utils.resetModel();c.load("/contact.html",function(d){jw.main.html(d)});document.title="Contact Me";jw.body.addClass("contact")}}})(jQuery);jw.FavoritesModel=(function(a,b){return{render:function(c){jw.Utils.resetModel();c.load("/favorites.html",function(d){jw.main.html(d)});document.title="Favorites";jw.head.append("<meta name='description' content='Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability. This site has information regarding my work experience and hobbies.' /><meta name='keywords' content='Jon Wiedmann, Web Developer, PHP, HTML5, CSS, jQuery, Javascript, sammy.js' />");jw.body.addClass("favs nav0")}}})(jQuery);jw.BlogModel=(function(a,b){return{render:function(c){jw.Utils.resetModel();c.load("/blog/index.html",function(d){jw.main.html(d)});document.title="Blog";jw.body.addClass("blog")}}})(jQuery);jw.GamesModel=(function(a,b){return{render:function(c,d){jw.Utils.resetModel();if(d==="index"){c.load("/games/index.html",function(e){jw.main.html(e);jw.Utils.require("/js/plugins/jquery.hoverIntent.min.js",function(){});jw.Utils.require("/js/plugins/jquery.hoverCarousel.js",function(){a("ul").hoverCarousel()})});document.title="Games";jw.body.addClass("absHover games")}}}})(jQuery);jw.MusicModel=(function(c,d){var b=jw.Utils.getYear();function a(e){e.load("/music/musicNav.html",function(f){c(".musicNav").html(f)})}return{render:function(e,f){jw.Utils.resetModel();if(f==="index"){e.load("/music/index.html",function(g){jw.main.html(g);a(e);c(".teaching").text(b-2008);c(".playing").text(b-1994)});document.title="Music";jw.body.addClass("music musicHome")}else{if(f==="bass"){e.load("/music/bass.html",function(g){jw.main.html(g);a(e);c(".playing").text(b-2009)});document.title="Bass | Music";jw.body.addClass("music bass")}else{if(f==="chiptunes"){e.load("/music/chiptunes.html",function(g){jw.main.html(g);a(e)});document.title="Chiptunes | Music";jw.body.addClass("music")}else{if(f==="guitar"){e.load("/music/guitar.html",function(g){jw.main.html(g);a(e);c(".playing").text(b-2002)});document.title="Guitar | Music";jw.body.addClass("music")}else{if(f==="mandolin"){e.load("/music/mandolin.html",function(g){jw.main.html(g);a(e);c(".playing").text(b-2008)});document.title="Mandolin | Music";jw.body.addClass("music mandolin")}else{if(f==="piano"){e.load("/music/piano.html",function(g){jw.main.html(g);a(e);c(".playing").text(b-1994)});document.title="Piano | Music";jw.body.addClass("music")}else{if(f==="trumpet"){e.load("/music/trumpet.html",function(g){jw.main.html(g);a(e);c(".playing").text(b-1998)});document.title="Trumpet | Music";jw.body.addClass("music trumpet")}else{if(f==="rates"){e.load("/music/rates.html",function(g){jw.main.html(g);a(e)});document.title="Rates | Music";jw.head.append("<meta name='description' content='Music Lesson Rates'><meta name='robots' rel='none' />");jw.body.addClass("music rates")}else{if(f==="voice"){e.load("/music/voice.html",function(g){jw.main.html(g);a(e);c(".playing").text(b-2009)});document.title="Voice | Music";jw.body.addClass("music")}}}}}}}}}}}})(jQuery);jw.PlaygroundModel=(function(a,b){return{render:function(c,d){jw.Utils.resetModel();if(d==="index"){c.load("/playground/index.html",function(e){jw.main.html(e);c.load("/playground/playgroundNav.html",function(f){a(".playgroundNav").html(f);a(".colL ul").hoverCarousel()})});document.title="Playground";jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' /><meta name='keywords' content='canvas, html5' />");jw.body.addClass("absHover playground")}else{if(d==="ballPit"){c.load("/playground/ballPit.html",function(e){jw.main.html(e);jw.Utils.require("/js/ballPit.js",function(){jw.BallPit.init()})});document.title="Ball Pit | Playground";jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' /><meta name='keywords' content='canvas, html5' />");jw.body.addClass("playground playInner nav3")}else{if(d==="stars"){c.load("/playground/stars.html",function(e){jw.main.html(e);jw.Utils.require("/js/plugins/jquery.star_bg.js",function(){jw.Utils.require("/js/stars.js",function(f){jw.StarryBg.init()})})});document.title="Starry Background | Playground";jw.head.append("<meta name='description' content='A canvas example showcasing a starry background.' /><meta name='keywords' content='canvas, html5' />");jw.body.addClass("playground playInner nav2")}else{if(d==="bObj"){c.load("/playground/bouncing-object.html",function(e){jw.main.html(e);jw.Utils.require("/js/bouncingObj.js",function(){jw.Bounce.init()})});document.title="Bouncing Object | Playground";jw.head.append("<meta name='description' content='A canvas example showcasing a bouncing object.' /><meta name='keywords' content='canvas, html5' />");jw.body.addClass("playground playInner nav6")}else{if(d==="ustream"){c.load("/playground/USTREAM-demo.html",function(e){jw.main.html(e);jw.Utils.require("/js/ustream.js",function(){jw.Ustream.init()})});document.title="USTREAM demo | Playground";jw.head.append("<meta name='description' content='A USTREAM api demo.' /><meta name='keywords' content='USTREAM' />");jw.body.addClass("playground playInner uStreamPage nav5")}else{if(d==="bCube"){c.load("/playground/breakdancing-cube.html",function(e){jw.main.html(e);a("#cube").on("click",function(f){f.preventDefault()})});document.title="Breakdancing Cube | Playground";jw.head.append("<meta name='description' content='Pure CSS3 animation demo.' /><meta name='keywords' content='CSS3, HTML5' />");jw.body.addClass("playground playInner bDancingCube nav1")}else{if(d==="fSun"){c.load("/playground/floating-sun.html",function(e){jw.main.html(e);a.getScript("/js/computerGraphics/web/computergraphics.dart.js")});document.title="Floating Sun | Playground";jw.head.append("<meta name='description' content='A canvas example showcasing a computer graphics simulation.' /><meta name='keywords' content='canvas, html5, computer graphics' />");jw.body.addClass("playground playInner nav4")}}}}}}}if(d!=="index"){a(".dPlaygroundNav").show();c.load("/playground/playgroundNav.html",function(e){a(".dPlaygroundNav").html(e)})}}}})(jQuery);jw.PortfolioModel=(function(a,b){return{render:function(c,d){jw.Utils.resetModel();if(d==="index"){c.load("/portfolio/index.html",function(e){jw.main.html(e);jw.Utils.require("/js/plugins/jquery.hoverIntent.min.js",function(){});jw.Utils.require("/js/plugins/jquery.hoverCarousel.js",function(){a("ul").hoverCarousel()})});document.title="Portfolio";jw.body.addClass("portfolio absHover")}}}})(jQuery);jw.Routing=(function(a,c){var b=a.sammy(function(){this.route("get","/",function(){jw.HomeModel.render(this);jw.Routing.lastPg="home"});this.route("get","#home",function(){jw.HomeModel.render(this);jw.Routing.lastPg="home"});this.route("get","#about",function(){jw.AboutModel.render(this);jw.Routing.lastPg="about"});this.route("get","#contact",function(){jw.ContactModel.render(this);jw.Routing.lastPg="contact"});this.route("get","#favorites",function(){jw.FavoritesModel.render(this);jw.Routing.lastPg="favorites"});this.route("get","#blog",function(){jw.BlogModel.render(this);jw.Routing.lastPg="blog"});this.route("get","#games",function(){jw.GamesModel.render(this,"index");jw.Routing.lastPg="games/index"});this.route("get","#music",function(){jw.MusicModel.render(this,"index");jw.Routing.lastPg="music/index"});this.route("get","#music/bass",function(){jw.MusicModel.render(this,"bass");jw.Routing.lastPg="music/bass"});this.route("get","#music/chiptunes",function(){jw.MusicModel.render(this,"chiptunes");jw.Routing.lastPg="music/chiptunes"});this.route("get","#music/guitar",function(){jw.MusicModel.render(this,"guitar");jw.Routing.lastPg="music/guitar"});this.route("get","#music/mandolin",function(){jw.MusicModel.render(this,"mandolin");jw.Routing.lastPg="music/mandolin"});this.route("get","#music/piano",function(){jw.MusicModel.render(this,"piano");jw.Routing.lastPg="music/piano"});this.route("get","#music/trumpet",function(){jw.MusicModel.render(this,"trumpet");jw.Routing.lastPg="music/trumpet"});this.route("get","#music/rates",function(){jw.MusicModel.render(this,"rates");jw.Routing.lastPg="music/rates"});this.route("get","#music/voice",function(){jw.MusicModel.render(this,"voice");jw.Routing.lastPg="music/voice"});this.route("get","#playground",function(){jw.PlaygroundModel.render(this,"index");jw.Routing.lastPg="playground/index"});this.route("get","#playground/ballPit",function(){jw.PlaygroundModel.render(this,"ballPit");jw.Routing.lastPg="ballPit"});this.route("get","#playground/breakdancing-cube",function(){jw.PlaygroundModel.render(this,"bCube");jw.Routing.lastPg="bCube"});this.route("get","#playground/floating-sun",function(){jw.PlaygroundModel.render(this,"fSun");jw.Routing.lastPg="fSun"});this.route("get","#playground/bouncing-object",function(){jw.PlaygroundModel.render(this,"bObj");jw.Routing.lastPg="bObj"});this.route("get","#playground/starry-background",function(){jw.PlaygroundModel.render(this,"stars");jw.Routing.lastPg="stars"});this.route("get","#playground/USTREAM-demo",function(){jw.PlaygroundModel.render(this,"ustream");jw.Routing.lastPg="ustream"});this.route("get","#portfolio",function(){jw.PortfolioModel.render(this,"index");jw.Routing.lastPg="portfolio/index"})});return{lastPg:null,init:function(){b.run()}}})(jQuery);jw.Main=(function(){function a(){jw.head=$("head");jw.body=$("body");jw.main=$(".main")}return{init:function(){a();jw.Routing.init();$(".dateYear").text(jw.Utils.getYear())}}})();$(function(){var a=setInterval(function(){if(jw.scriptsLoaded===jw.numScripts){jw.Main.init();clearInterval(a)}},10)});
