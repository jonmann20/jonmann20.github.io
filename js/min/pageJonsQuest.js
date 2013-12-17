/*!
	Colorbox v1.4.33 - 2013-10-31
	jQuery lightbox and modal window plugin
	(c) 2013 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=Z+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=k.length,i=(z+e)%t;return 0>i?t+i:i}function h(e,t){return Math.round((/%/.test(e)?("x"===t?E.width():n())/100:1)*parseInt(e,10))}function l(e,t){return e.photo||e.photoRegex.test(t)}function s(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function a(e){"contains"in g[0]&&!g[0].contains(e.target)&&(e.stopPropagation(),g.focus())}function d(){var t,i=e.data(N,Y);null==i?(B=e.extend({},X),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},i);for(t in B)e.isFunction(B[t])&&"on"!==t.slice(0,2)&&(B[t]=B[t].call(N));B.rel=B.rel||N.rel||e(N).data("rel")||"nofollow",B.href=B.href||e(N).attr("href"),B.title=B.title||N.title,"string"==typeof B.href&&(B.href=e.trim(B.href))}function c(i,o){e(t).trigger(i),lt.triggerHandler(i),e.isFunction(o)&&o.call(N)}function u(i){q||(N=i,d(),k=e(N),z=0,"nofollow"!==B.rel&&(k=e("."+et).filter(function(){var t,i=e.data(this,Y);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===B.rel}),z=k.index(N),-1===z&&(k=k.add(N),z=k.length-1)),w.css({opacity:parseFloat(B.opacity),cursor:B.overlayClose?"pointer":"auto",visibility:"visible"}).show(),J&&g.add(w).removeClass(J),B.className&&g.add(w).addClass(B.className),J=B.className,B.closeButton?K.html(B.close).appendTo(y):K.appendTo("<div/>"),U||(U=$=!0,g.css({visibility:"hidden",display:"block"}),H=o(st,"LoadedContent","width:0; height:0; overflow:hidden"),y.css({width:"",height:""}).append(H),O=x.height()+C.height()+y.outerHeight(!0)-y.height(),_=b.width()+T.width()+y.outerWidth(!0)-y.width(),D=H.outerHeight(!0),A=H.outerWidth(!0),B.w=h(B.initialWidth,"x"),B.h=h(B.initialHeight,"y"),H.css({width:"",height:B.h}),Q.position(),c(tt,B.onOpen),P.add(L).hide(),g.focus(),B.trapFocus&&t.addEventListener&&(t.addEventListener("focus",a,!0),lt.one(rt,function(){t.removeEventListener("focus",a,!0)})),B.returnFocus&&lt.one(rt,function(){e(N).focus()})),m())}function f(){!g&&t.body&&(V=!1,E=e(i),g=o(st).attr({id:Y,"class":e.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),w=o(st,"Overlay").hide(),F=e([o(st,"LoadingOverlay")[0],o(st,"LoadingGraphic")[0]]),v=o(st,"Wrapper"),y=o(st,"Content").append(L=o(st,"Title"),S=o(st,"Current"),I=e('<button type="button"/>').attr({id:Z+"Previous"}),R=e('<button type="button"/>').attr({id:Z+"Next"}),M=o("button","Slideshow"),F),K=e('<button type="button"/>').attr({id:Z+"Close"}),v.append(o(st).append(o(st,"TopLeft"),x=o(st,"TopCenter"),o(st,"TopRight")),o(st,!1,"clear:left").append(b=o(st,"MiddleLeft"),y,T=o(st,"MiddleRight")),o(st,!1,"clear:left").append(o(st,"BottomLeft"),C=o(st,"BottomCenter"),o(st,"BottomRight"))).find("div div").css({"float":"left"}),W=o(st,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),P=R.add(I).add(S).add(M),e(t.body).append(w,g.append(v,W)))}function p(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),u(this))}return g?(V||(V=!0,R.click(function(){Q.next()}),I.click(function(){Q.prev()}),K.click(function(){Q.close()}),w.click(function(){B.overlayClose&&Q.close()}),e(t).bind("keydown."+Z,function(e){var t=e.keyCode;U&&B.escKey&&27===t&&(e.preventDefault(),Q.close()),U&&B.arrowKey&&k[1]&&!e.altKey&&(37===t?(e.preventDefault(),I.click()):39===t&&(e.preventDefault(),R.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+Z,"."+et,i):e("."+et).live("click."+Z,i)),!0):!1}function m(){var n,r,a,u=Q.prep,f=++at;$=!0,j=!1,N=k[z],d(),c(ht),c(it,B.onLoad),B.h=B.height?h(B.height,"y")-D-O:B.innerHeight&&h(B.innerHeight,"y"),B.w=B.width?h(B.width,"x")-A-_:B.innerWidth&&h(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=h(B.maxWidth,"x")-A-_,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=h(B.maxHeight,"y")-D-O,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,G=setTimeout(function(){F.show()},100),B.inline?(a=o(st).hide().insertBefore(e(n)[0]),lt.one(ht,function(){a.replaceWith(H.children())}),u(e(n))):B.iframe?u(" "):B.html?u(B.html):l(B,n)?(n=s(B,n),j=t.createElement("img"),e(j).addClass(Z+"Photo").bind("error",function(){B.title=!1,u(o(st,"Error").html(B.imgError))}).one("load",function(){var t;f===at&&(e.each(["alt","longdesc","aria-describedby"],function(t,i){var o=e(N).attr(i)||e(N).attr("data-"+i);o&&j.setAttribute(i,o)}),B.retinaImage&&i.devicePixelRatio>1&&(j.height=j.height/i.devicePixelRatio,j.width=j.width/i.devicePixelRatio),B.scalePhotos&&(r=function(){j.height-=j.height*t,j.width-=j.width*t},B.mw&&j.width>B.mw&&(t=(j.width-B.mw)/j.width,r()),B.mh&&j.height>B.mh&&(t=(j.height-B.mh)/j.height,r())),B.h&&(j.style.marginTop=Math.max(B.mh-j.height,0)/2+"px"),k[1]&&(B.loop||k[z+1])&&(j.style.cursor="pointer",j.onclick=function(){Q.next()}),j.style.width=j.width+"px",j.style.height=j.height+"px",setTimeout(function(){u(j)},1))}),setTimeout(function(){j.src=n},1)):n&&W.load(n,B.data,function(t,i){f===at&&u("error"===i?o(st,"Error").html(B.xhrError):e(this).contents())})}var w,g,v,y,x,b,T,C,k,E,H,W,F,L,S,M,R,I,K,P,B,O,_,D,A,N,z,j,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1},Y="colorbox",Z="cbox",et=Z+"Element",tt=Z+"_open",it=Z+"_load",ot=Z+"_complete",nt=Z+"_cleanup",rt=Z+"_closed",ht=Z+"_purge",lt=e("<a/>"),st="div",at=0,dt={},ct=function(){function e(){clearTimeout(h)}function t(){(B.loop||k[z+1])&&(e(),h=setTimeout(Q.next,B.slideshowSpeed))}function i(){M.html(B.slideshowStop).unbind(s).one(s,o),lt.bind(ot,t).bind(it,e),g.removeClass(l+"off").addClass(l+"on")}function o(){e(),lt.unbind(ot,t).unbind(it,e),M.html(B.slideshowStart).unbind(s).one(s,function(){Q.next(),i()}),g.removeClass(l+"on").addClass(l+"off")}function n(){r=!1,M.hide(),e(),lt.unbind(ot,t).unbind(it,e),g.removeClass(l+"off "+l+"on")}var r,h,l=Z+"Slideshow_",s="click."+Z;return function(){r?B.slideshow||(lt.unbind(nt,n),n()):B.slideshow&&k[1]&&(r=!0,lt.one(nt,n),B.slideshowAuto?i():o(),M.show())}}();e.colorbox||(e(f),Q=e.fn[Y]=e[Y]=function(t,i){var o=this;if(t=t||{},f(),p()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Y,e.extend({},e.data(this,Y)||X,t))}).addClass(et),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&u(o[0])}return o},Q.position=function(t,i){function o(){x[0].style.width=C[0].style.width=y[0].style.width=parseInt(g[0].style.width,10)-_+"px",y[0].style.height=b[0].style.height=T[0].style.height=parseInt(g[0].style.height,10)-O+"px"}var r,l,s,a=0,d=0,c=g.offset();if(E.unbind("resize."+Z),g.css({top:-9e4,left:-9e4}),l=E.scrollTop(),s=E.scrollLeft(),B.fixed?(c.top-=l,c.left-=s,g.css({position:"fixed"})):(a=l,d=s,g.css({position:"absolute"})),d+=B.right!==!1?Math.max(E.width()-B.w-A-_-h(B.right,"x"),0):B.left!==!1?h(B.left,"x"):Math.round(Math.max(E.width()-B.w-A-_,0)/2),a+=B.bottom!==!1?Math.max(n()-B.h-D-O-h(B.bottom,"y"),0):B.top!==!1?h(B.top,"y"):Math.round(Math.max(n()-B.h-D-O,0)/2),g.css({top:c.top,left:c.left,visibility:"visible"}),v[0].style.width=v[0].style.height="9999px",r={width:B.w+A+_,height:B.h+D+O,top:a,left:d},t){var u=0;e.each(r,function(e){return r[e]!==dt[e]?(u=t,void 0):void 0}),t=u}dt=r,t||g.css(r),g.dequeue().animate(r,{duration:t||0,complete:function(){o(),$=!1,v[0].style.width=B.w+A+_+"px",v[0].style.height=B.h+D+O+"px",B.reposition&&setTimeout(function(){E.bind("resize."+Z,Q.position)},1),i&&i()},step:o})},Q.resize=function(e){var t;U&&(e=e||{},e.width&&(B.w=h(e.width,"x")-A-_),e.innerWidth&&(B.w=h(e.innerWidth,"x")),H.css({width:B.w}),e.height&&(B.h=h(e.height,"y")-D-O),e.innerHeight&&(B.h=h(e.innerHeight,"y")),e.innerHeight||e.height||(t=H.scrollTop(),H.css({height:"auto"}),B.h=H.height()),H.css({height:B.h}),t&&H.scrollTop(t),Q.position("none"===B.transition?0:B.speed))},Q.prep=function(i){function n(){return B.w=B.w||H.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function h(){return B.h=B.h||H.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(U){var a,d="none"===B.transition?0:B.speed;H.empty().remove(),H=o(st,"LoadedContent").append(i),H.hide().appendTo(W.show()).css({width:n(),overflow:B.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(y),W.hide(),e(j).css({"float":"none"}),a=function(){function i(){e.support.opacity===!1&&g[0].style.removeAttribute("filter")}var n,h,a=k.length,u="frameBorder",f="allowTransparency";U&&(h=function(){clearTimeout(G),F.hide(),c(ot,B.onComplete)},L.html(B.title).add(H).show(),a>1?("string"==typeof B.current&&S.html(B.current.replace("{current}",z+1).replace("{total}",a)).show(),R[B.loop||a-1>z?"show":"hide"]().html(B.next),I[B.loop||z?"show":"hide"]().html(B.previous),ct(),B.preloading&&e.each([r(-1),r(1)],function(){var i,o,n=k[this],r=e.data(n,Y);r&&r.href?(i=r.href,e.isFunction(i)&&(i=i.call(n))):i=e(n).attr("href"),i&&l(r,i)&&(i=s(r,i),o=t.createElement("img"),o.src=i)})):P.hide(),B.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),f in n&&(n[f]="true"),B.scrolling||(n.scrolling="no"),e(n).attr({src:B.href,name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",h).appendTo(H),lt.one(ht,function(){n.src="//about:blank"}),B.fastIframe&&e(n).trigger("load")):h(),"fade"===B.transition?g.fadeTo(d,1,i):i())},"fade"===B.transition?g.fadeTo(d,0,function(){Q.position(0,a)}):Q.position(d,a)}},Q.next=function(){!$&&k[1]&&(B.loop||k[z+1])&&(z=r(1),u(k[z]))},Q.prev=function(){!$&&k[1]&&(B.loop||z)&&(z=r(-1),u(k[z]))},Q.close=function(){U&&!q&&(q=!0,U=!1,c(nt,B.onCleanup),E.unbind("."+Z),w.fadeTo(B.fadeOut||0,0),g.stop().fadeTo(B.fadeOut||0,0,function(){g.add(w).css({opacity:1,cursor:"auto"}).hide(),c(ht),H.empty().remove(),setTimeout(function(){q=!1,c(rt,B.onClosed)},1)}))},Q.remove=function(){g&&(g.stop(),e.colorbox.close(),g.stop().remove(),w.remove(),q=!1,g=null,e("."+et).removeData(Y).removeClass(et),e(t).unbind("click."+Z))},Q.element=function(){return e(N)},Q.settings=X)})(jQuery,document,window);
/*! 
    Authored by Jim Riecken - released under the MIT License. 
    Modified by Jon Wiedmann
*/

/*
    A simple library for determining intersections of circles and
    polygons using the Separating Axis Theorem.

    jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true, 
    eqeqeq:true, bitwise:true, strict:true, undef:true, 
    curly:true, browser:true 
*/

var SAT = {};
(function(SAT) {
    "use strict";
  
    /*
        Represents a vector in two dimensions.
     
        @param {?number=} x The x position.
        @param {?number=} y The y position.
        @constructor
    */
    var Vector = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    SAT.Vector = Vector;

    /*
        Copy the values of another Vector into this one.
    
        @param {Vector} other The other Vector.
        @return {Vector} This for chaining.
    */
    Vector.prototype.copy = function(other) {
        this.x = other.x; 
        this.y = other.y;

        return this;
    };
    
    /*
        Rotate this vector by 90 degrees
    
        @return {Vector} This for chaining.
    */
    Vector.prototype.perp = function() {
        var x = this.x;
        this.x = this.y; 
        this.y = -x;

        return this;
    };
    
    /*
        Reverse this vector.
    
        @return {Vector} This for chaining.
    */
    Vector.prototype.reverse = function() {
        this.x = -this.x; 
        this.y = -this.y;

        return this;
    };
  
    /*
        Normalize (make unit length) this vector.
        
        @return {Vector} This for chaining.
    */
    Vector.prototype.normalize = function() {
        var d = this.len();

        if(d > 0) {
            this.x = this.x / d; 
            this.y = this.y / d;
        }

        return this;
    };
  
    /*
        Add another vector to this one.
    
        @param {Vector} other The other Vector.
        @return {Vector} This for chaining.
    */
    Vector.prototype.add = function(other) {
        this.x += other.x; 
        this.y += other.y;

        return this;
    };
  
    /*
        Subtract another vector from this one.
    
        @param {Vector} other The other Vector.
        @return {Vector} This for chaiing.
    */
    Vector.prototype.sub = function(other) {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    };
  
    /*
        Scale this vector.
    
        @param {number} x The scaling factor in the x direction.
        @param {?number=} y The scaling factor in the y direction.  If this
        is not specified, the x scaling factor will be used.
        @return {Vector} This for chaining.
    */
    Vector.prototype.scale = function(x,y) {
        this.x *= x; 
        this.y *= y || x;

        return this; 
    };
  
    /*
        Project this vector on to another vector.
    
        @param {Vector} other The vector to project onto.
        @return {Vector} This for chaining.
    */
    Vector.prototype.project = function(other) {
        var amt = this.dot(other) / other.len2();

        this.x = amt * other.x; 
        this.y = amt * other.y;

        return this;
    };
  
    /*
        Project this vector onto a vector of unit length.
    
        @param {Vector} other The unit vector to project onto.
        @return {Vector} This for chaining.
    */
    Vector.prototype.projectN = function(other) {
    var amt = this.dot(other);
    this.x = amt * other.x; 
    this.y = amt * other.y;
    return this;
    };
    Vector.prototype['projectN'] = Vector.prototype.projectN;
  
    /*
        Reflect this vector on an arbitrary axis.
    
        @param {Vector} axis The vector representing the axis.
        @return {Vector} This for chaining.
    */
    Vector.prototype.reflect = function(axis) {
        var x = this.x;
        var y = this.y;

        this.project(axis).scale(2);

        this.x -= x;
        this.y -= y;

        return this;
    };
  
    /*
        Reflect this vector on an arbitrary axis (represented by a unit vector)
    
        @param {Vector} axis The unit vector representing the axis.
        @return {Vector} This for chaining.
    */
    Vector.prototype.reflectN = function(axis) {
        var x = this.x;
        var y = this.y;

        this.projectN(axis).scale(2);

        this.x -= x;
        this.y -= y;

        return this;
    };
  
    /*
        Get the dot product of this vector against another.
     
        @param {Vector}  other The vector to dot this one against.
        @return {number} The dot product.
    */
    Vector.prototype.dot = function(other) {
        return this.x * other.x + this.y * other.y;
    };
  
    /*
        Get the length^2 of this vector.
    
        @return {number} The length^2 of this vector.
    */
    Vector.prototype.len2 = function() {
        return this.dot(this);
    };
  
    /*
        Get the length of this vector.
    
        @return {number} The length of this vector.
    */
    Vector.prototype.len = function() {
        return Math.sqrt(this.len2());
    };
  

    /*
        A circle.
    
        @param {Vector=} pos A vector representing the position of the center of the circle
        @param {?number=} r The radius of the circle
        @constructor
    */
    //var Circle = function(pos, r) {
    //    this.pos = pos || new Vector();
    //    this.r = r || 0;
    //};
    //SAT.Circle = Circle;
  

    /*
        A *convex* clockwise polygon.
    
        @param {Vector=} pos A vector representing the origin of the polygon. (all other
            points are relative to this one)
        @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
            in clockwise order.
        @constructor
    */
    var Polygon = function(pos, points) {
        this.pos = pos || new Vector();
        this.points = points || [];

        this.recalc();
    };
    SAT.Polygon = Polygon;
  
    /*
        Recalculate the edges and normals of the polygon.  This
        MUST be called if the points array is modified at all and
        the edges or normals are to be accessed.
    */
    Polygon.prototype.recalc = function() {
        var points = this.points;
        var len = points.length;

        this.edges = []; 
        this.normals = [];

        for (var i = 0; i < len; i++) {
            var p1 = points[i]; 
            var p2 = i < len - 1 ? points[i + 1] : points[0];

            var e = new Vector().copy(p2).sub(p1);
            var n = new Vector().copy(e).perp().normalize();

            this.edges.push(e);
            this.normals.push(n);
        }
    };
    
  
    /*
        An axis-aligned box, with width and height.
    
        @param {Vector=} pos A vector representing the top-left of the box.
        @param {?number=} w The width of the box.
        @param {?number=} h The height of the box.
        @constructor
    */
    var Box = function(pos, w, h) {
        this.pos = pos || new Vector();
        this.w = w || 0; 
        this.h = h || 0;
    };
    SAT.Box = Box;

    /*
        Create a polygon that is the same as this box.
    
        @return {Polygon} A new Polygon that represents this box.
    */
    Box.prototype.toPolygon = function() {
        var pos = this.pos;
        var w = this.w;
        var h = this.h;

        return new Polygon(new Vector(pos.x, pos.y), [
            new Vector(), new Vector(w, 0), 
            new Vector(w,h), new Vector(0,h)
        ]);
    };
  
    /*
        Pool of Vectors used in calculations.
    
        @type {Array.<Vector>}
    */
    var T_VECTORS = [];
    for (var i = 0; i < 10; ++i) { T_VECTORS.push(new Vector()); }

    /*
        Pool of Arrays used in calculations.
    
        @type {Array.<Array.<*>>}
    */
    var T_ARRAYS = [];
    for (var i = 0; i < 5; ++i) { T_ARRAYS.push([]); }

    /*
        An object representing the result of an intersection. Contain information about:
            - The two objects participating in the intersection
            - The vector representing the minimum change necessary to extract the first object
              from the second one.
            - Whether the first object is entirely inside the second, or vice versa.
    
        @constructor
    */  
    var Response = function() {
        this.a = null;
        this.b = null;

        this.overlapN = new Vector(); // Unit vector in the direction of overlap
        this.overlapV = new Vector(); // Subtract this from a's position to extract it from b

        this.clear();
    };
    SAT.Response = Response;

    /*
        Set some values of the response back to their defaults.  Call this between tests if 
        you are going to reuse a single Response object for multiple intersection tests (recommented)
    
        @return {Response} This for chaining
    */
    Response.prototype.clear = function() {
        this.aInB = true; // Is a fully inside b?
        this.bInA = true; // Is b fully inside a?
        this.overlap = Number.MAX_VALUE; // Amount of overlap (magnitude of overlapV). Can be 0 (if a and b are touching)

        return this;
    };
  
    /*
        Flattens the specified array of points onto a unit vector axis,
        resulting in a one dimensional range of the minimum and 
        maximum value on that axis.
    
        @param {Array.<Vector>} points The points to flatten.
        @param {Vector} normal The unit vector axis to flatten on.
        @param {Array.<number>} result An array.  After calling this function,
            result[0] will be the minimum value,
        result[1] will be the maximum value.
    */
    var flattenPointsOn = function(points, normal, result) {
        var min = Number.MAX_VALUE;
        var max = -Number.MAX_VALUE;
        var len = points.length;

        for (var i = 0; i < len; ++i ) {
            // Get the magnitude of the projection of the point onto the normal
            var dot = points[i].dot(normal);

            if (dot < min) { min = dot; }
            if (dot > max) { max = dot; }
        }

        result[0] = min;
        result[1] = max;
    };
  
    /*
        Check whether two convex clockwise polygons are separated by the specified
        axis (must be a unit vector).
    
        @param {Vector} aPos The position of the first polygon.
        @param {Vector} bPos The position of the second polygon.
        @param {Array.<Vector>} aPoints The points in the first polygon.
        @param {Array.<Vector>} bPoints The points in the second polygon.
        @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
            will be projected onto this axis.
        @param {Response=} response A Response object (optional) which will be populated
            if the axis is not a separating axis.
        @return {boolean} true if it is a separating axis, false otherwise.  If false,
            and a response is passed in, information about how much overlap and
            the direction of the overlap will be populated.
    */
    var isSeparatingAxis = function(aPos, bPos, aPoints, bPoints, axis, response) {
        var rangeA = T_ARRAYS.pop();
        var rangeB = T_ARRAYS.pop();

        // Get the magnitude of the offset between the two polygons
        var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
        var projectedOffset = offsetV.dot(axis);

        // Project the polygons onto the axis.
        flattenPointsOn(aPoints, axis, rangeA);
        flattenPointsOn(bPoints, axis, rangeB);

        // Move B's range to its position relative to A.
        rangeB[0] += projectedOffset;
        rangeB[1] += projectedOffset;

        // Check if there is a gap. If there is, this is a separating axis and we can stop
        if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
            T_VECTORS.push(offsetV); 
            T_ARRAYS.push(rangeA); 
            T_ARRAYS.push(rangeB);

            return true;
        }

        // If we're calculating a response, calculate the overlap.
        if (response) {
            var overlap = 0;

            // A starts further left than B
            if (rangeA[0] < rangeB[0]) {
                response.aInB = false;

                // A ends before B does. We have to pull A out of B
                if (rangeA[1] < rangeB[1]) { 
                    overlap = rangeA[1] - rangeB[0];
                    response.bInA = false;
                }
                else {  // B is fully inside A.  Pick the shortest way out.
                    var option1 = rangeA[1] - rangeB[0];
                    var option2 = rangeB[1] - rangeA[0];
                    overlap = option1 < option2 ? option1 : -option2;
                }
            
            }
            else {  // B starts further left than A
                response.bInA = false;

                // B ends before A ends. We have to push A out of B
                if (rangeA[1] > rangeB[1]) { 
                    overlap = rangeA[0] - rangeB[1];
                    response.aInB = false;
                }
                else {  // A is fully inside B.  Pick the shortest way out.
                    var option1 = rangeA[1] - rangeB[0];
                    var option2 = rangeB[1] - rangeA[0];

                    overlap = option1 < option2 ? option1 : -option2;
                }
            }

            // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
            var absOverlap = Math.abs(overlap);
            if (absOverlap < response.overlap) {
                response.overlap = absOverlap;
                response.overlapN.copy(axis);

                if (overlap < 0) {
                    response.overlapN.reverse();
                }
            }      
        }

        T_VECTORS.push(offsetV); 
        T_ARRAYS.push(rangeA); 
        T_ARRAYS.push(rangeB);

        return false;
    };
  
    /*
        Calculates which Vornoi region a point is on a line segment.
        It is assumed that both the line and the point are relative to (0, 0)
    
                 |       (0)      | 
          (-1)  [0]--------------[1]  (1)
                 |       (0)      | 
     
        @param {Vector} line The line segment.
        @param {Vector} point The point.
        @return {number} LEFT_VORNOI_REGION (-1) if it is the left region, 
               MIDDLE_VORNOI_REGION (0) if it is the middle region, 
               RIGHT_VORNOI_REGION (1) if it is the right region.
    */
    var vornoiRegion = function(line, point) {
        var len2 = line.len2();
        var dp = point.dot(line);

        if (dp < 0) { return LEFT_VORNOI_REGION; }
        else if (dp > len2) { return RIGHT_VORNOI_REGION; }
        else { return MIDDLE_VORNOI_REGION; }
    };

    // @const
    var LEFT_VORNOI_REGION = -1;

    // @const
    var MIDDLE_VORNOI_REGION = 0;
    
    // @const
    var RIGHT_VORNOI_REGION = 1;
  
    /*
        Check if two circles intersect.
    
        @param {Circle} a The first circle.
        @param {Circle} b The second circle.
        @param {Response=} response Response object (optional) that will be populated if
            the circles intersect.
        @return {boolean} true if the circles intersect, false if they don't. 
    */
    //SAT.testCircleCircle = function (a, b, response) {
    //    var differenceV = T_VECTORS.pop().copy(b.pos).sub(a.pos);
    //    var totalRadius = a.r + b.r;
    //    var totalRadiusSq = totalRadius * totalRadius;
    //    var distanceSq = differenceV.len2();

    //    if (distanceSq > totalRadiusSq) {
    //        // They do not intersect 
    //        T_VECTORS.push(differenceV);
    //        return false;
    //    }

    //    // They intersect.  If we're calculating a response, calculate the overlap.
    //    if (response) {
    //        var dist = Math.sqrt(distanceSq);
    //        response.a = a;
    //        response.b = b;
    //        response.overlap = totalRadius - dist;
    //        response.overlapN.copy(differenceV.normalize());
    //        response.overlapV.copy(differenceV).scale(response.overlap);
    //        response.aInB = a.r <= b.r && dist <= b.r - a.r;
    //        response.bInA = b.r <= a.r && dist <= a.r - b.r;
    //    }

    //    T_VECTORS.push(differenceV);

    //    return true;
    //};
  
    /*
        Check if a polygon and a circle intersect.
    
        @param {Polygon} polygon The polygon.
        @param {Circle} circle The circle.
        @param {Response=} response Response object (optional) that will be populated if
            they interset.
        @return {boolean} true if they intersect, false if they don't.
    */
    //var testPolygonCircle = function(polygon, circle, response) {
    //    var circlePos = T_VECTORS.pop().copy(circle.pos).sub(polygon.pos);
    //    var radius = circle.r;
    //    var radius2 = radius * radius;
    //    var points = polygon.points;
    //    var len = points.length;
    //    var edge = T_VECTORS.pop();
    //    var point = T_VECTORS.pop();
    
    //    // For each edge in the polygon
    //    for (var i = 0; i < len; ++i) {
    //        var next = i === len - 1 ? 0 : i + 1;
    //        var prev = i === 0 ? len - 1 : i - 1;
    //        var overlap = 0;
    //        var overlapN = null;
      
    //        // Get the edge
    //        edge.copy(polygon.edges[i]);

    //        // Calculate the center of the cirble relative to the starting point of the edge
    //        point.copy(circlePos).sub(points[i]);
      
    //        // If the distance between the center of the circle and the point
    //        // is bigger than the radius, the polygon is definitely not fully in
    //        // the circle.
    //        if (response && point.len2() > radius2) {
    //            response.aInB = false;
    //        }
      
    //        // Calculate which Vornoi region the center of the circle is in.
    //        var region = vornoiRegion(edge, point);
    //        if (region === LEFT_VORNOI_REGION) { 
    //            // Need to make sure we're in the RIGHT_VORNOI_REGION of the previous edge.
    //            edge.copy(polygon.edges[prev]);
    //            // Calculate the center of the circle relative the starting point of the previous edge
    //            var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
    //            region = vornoiRegion(edge, point2);
    //            if (region === RIGHT_VORNOI_REGION) {
    //                // It's in the region we want.  Check if the circle intersects the point.
    //                var dist = point.len();
    //                if (dist > radius) {
    //                    // No intersection
    //                    T_VECTORS.push(circlePos); 
    //                    T_VECTORS.push(edge);
    //                    T_VECTORS.push(point); 
    //                    T_VECTORS.push(point2);

    //                    return false;
    //                }
    //                else if (response) {
    //                    // It intersects, calculate the overlap
    //                    response.bInA = false;
    //                    overlapN = point.normalize();
    //                    overlap = radius - dist;
    //                }
    //            }

    //            T_VECTORS.push(point2);
    //        }
    //        else if (region === RIGHT_VORNOI_REGION) {
    //            // Need to make sure we're in the left region on the next edge
    //            edge.copy(polygon.edges[next]);

    //            // Calculate the center of the circle relative to the starting point of the next edge
    //            point.copy(circlePos).sub(points[next]);
    //            region = vornoiRegion(edge, point);

    //            if (region === LEFT_VORNOI_REGION) {
    //                // It's in the region we want.  Check if the circle intersects the point.
    //                var dist = point.len();
    //                if (dist > radius) {
    //                    // No intersection
    //                    T_VECTORS.push(circlePos); 
    //                    T_VECTORS.push(edge); 
    //                    T_VECTORS.push(point);

    //                    return false;              
    //                }
    //                else if (response) {
    //                    // It intersects, calculate the overlap
    //                    response.bInA = false;
    //                    overlapN = point.normalize();
    //                    overlap = radius - dist;
    //                }
    //            }
                
    //        }
    //        else {  // MIDDLE_VORNOI_REGION
    //            // Need to check if the circle is intersecting the edge,
    //            // Change the edge into its "edge normal".
    //            var normal = edge.perp().normalize();

    //            // Find the perpendicular distance between the center of the 
    //            // circle and the edge.
    //            var dist = point.dot(normal);
    //            var distAbs = Math.abs(dist);

    //            // If the circle is on the outside of the edge, there is no intersection
    //            if (dist > 0 && distAbs > radius) {
    //                T_VECTORS.push(circlePos); 
    //                T_VECTORS.push(normal); 
    //                T_VECTORS.push(point);

    //                return false;
    //            }
    //            else if (response) {
    //                // It intersects, calculate the overlap.
    //                overlapN = normal;
    //                overlap = radius - dist;

    //                // If the center of the circle is on the outside of the edge, or part of the
    //                // circle is on the outside, the circle is not fully inside the polygon.
    //                if (dist >= 0 || overlap < 2 * radius) {
    //                    response.bInA = false;
    //                }
    //            }
    //        }
      
    //        // If this is the smallest overlap we've seen, keep it. 
    //        // (overlapN may be null if the circle was in the wrong Vornoi region)
    //        if (overlapN && response && Math.abs(overlap) < Math.abs(response.overlap)) {
    //            response.overlap = overlap;
    //            response.overlapN.copy(overlapN);
    //        }
    //    }
    
    //    // Calculate the final overlap vector - based on the smallest overlap.
    //    if (response) {
    //        response.a = polygon;
    //        response.b = circle;
    //        response.overlapV.copy(response.overlapN).scale(response.overlap);
    //    }

    //    T_VECTORS.push(circlePos); 
    //    T_VECTORS.push(edge); 
    //    T_VECTORS.push(point);

    //    return true;
    //};
    //SAT.testPolygonCircle = testPolygonCircle;
  
    /*
        Check if a circle and a polygon intersect.
    
        NOTE: This runs slightly slower than polygonCircle as it just
            runs polygonCircle and reverses everything at the end.
    
        @param {Circle} circle The circle.
        @param {Polygon} polygon The polygon.
        @param {Response=} response Response object (optional) that will be populated if
            they interset.
        @return {boolean} true if they intersect, false if they don't.
    */
    //SAT.testCirclePolygon = function (circle, polygon, response) {
    //    var result = testPolygonCircle(polygon, circle, response);

    //    if (result && response) {
    //        // Swap A and B in the response.
    //        var a = response.a;
    //        var aInB = response.aInB;
    //        response.overlapN.reverse();
    //        response.overlapV.reverse();
    //        response.a = response.b;
    //        response.b = a;
    //        response.aInB = response.bInA;
    //        response.bInA = aInB;
    //    }

    //    return result;
    //};
  
    /*
        Checks whether two convex, clockwise polygons intersect.
    
        @param {Polygon} a The first polygon.
        @param {Polygon} b The second polygon.
        @param {Response=} response Response object (optional) that will be populated if
        they interset.
        @return {boolean} true if they intersect, false if they don't.
    */
    SAT.testPolygonPolygon = function (a, b, response) {
        var aPoints = a.points;
        var aLen = aPoints.length;
        var bPoints = b.points;
        var bLen = bPoints.length;

        // If any of the edge normals of A is a separating axis, no intersection.
        for (var i = 0; i < aLen; i++) {
            if (isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, a.normals[i], response)) {
                return false;
            }
        }

        // If any of the edge normals of B is a separating axis, no intersection.
        for (var i = 0; i < bLen; i++) {
            if (isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, b.normals[i], response)) {
                return false;
            }
        }

        // Since none of the edge normals of A or B are a separating axis, there is an intersection
        // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
        // final overlap vector.
        if (response) {
            response.a = a;
            response.b = b;
            response.overlapV.copy(response.overlapN).scale(response.overlap);
        }

        return true;
    };
}(SAT));
/// <reference path="linker.js" />

/*
    A place for generic math, set/get methods, and other small functions.
    Also used for global data structures, enums, and functions.
*/
var utils = (function () {
    var cboxMenu;


    return {
        /*
            extends an oldObj into a newObj
            while keeping certain objects properties in sync
        */
        extend: function (newObj, oldObj) {
            // merge-copy current oldObj into newObj
            $.extend(newObj, oldObj);

            // force newObj to get oldObj's imgReady property
            var prop = "imgReady";
            Object.defineProperty(newObj, prop, {
                get: function () {
                    return oldObj[prop];
                },
                //set: function (arg) {
                //    oldObj[prop] = arg;
                //},
                //configurable: true
            });

        },

        repeatAction: function (timeStep, numTimes, callback) {
            var num = 0;
            var theAnimation = setInterval(function () {
                if (num++ > numTimes) {
                    clearInterval(theAnimation);
                }
                else {
                    callback();
                }
            }, timeStep);
        },

        deathSequence: function(){
            if (!game.over) {
                game.over = true;

                audio.heroDeath.play();
                audio.bgMusic.muted = true;

                setTimeout(function () {
                    Graphics.fadeCanvas(function () {
                        level.reset();
                        level.curLvl.deinit();
                        level.curLvl.init();

                        if (audio.isOn)
                            audio.bgMusic.muted = false;
                    });
                }, 2600);
            }
        },

        degToRad: function(deg){
            return deg * 0.0174532925199432957;
        },

        getTimeObj: function (t) {
            if (t === 0) {
                return { min: "00", sec: "00" };
            }
            
            var min = Math.floor(t / 60);
            var sec = t % 60;

            if (sec < 10) {
                sec = '0' + sec;
            }

            if (min < 10) {
                min = '0' + min;
            }

            return {
                min: min,
                sec: sec
            };
        },

        browser: function(){
            var ua = navigator.userAgent,
                     tem,
                     M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || []
            ;

            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
                    return 'IE '+(tem[1] || '');
            }

            M = M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];

            if ((tem = ua.match(/version\/([\.\d]+)/i)) != null)
                M[2] = tem[1];

            return M.join(' ');
        },

        /**** Debug Printers ****/
        // A method to print to the console less frequently then within the game loop.
        printSlow: function(msg){
            if (game.actualTime % 10 === 0) {
                console.log(msg);
            }
        },

		printMouse: function () {
		    $("canvas").on("mousemove", function (e) {
		        console.log(e.offsetX, e.offsetY);
		    });
		},

		printDir: function (dir) {
		    switch (dir) {
		        case 0:
		            console.log("Dir.NONE");
		            break;
		        case 1:
		            console.log("Dir.TOP");
		            break;
		        case 2:
		            console.log("Dir.BOT");
		            break;
		        case 3:
		            console.log("Dir.LEFT");
		            break;
		        case 4:
		            console.log("Dir.RIGHT");
		            break;
		        case 5:
		            console.log("Dir.IN");
		            break;
		        default:
		            console.log("Dir.unknown");
		    }
		},

		toggleMenu: function () {

		    if ($("#colorbox").css("display") === "block") {
		        cboxMenu.colorbox.close();
		    }
		    else {
		        cboxMenu = $.colorbox({
		            html: $(".gameInstructions").html(),
		            width: 320,
		            height: 530
		        });
		    }
		},

		toggleFullScreen: function () {


		    // fill browser window
		    if ($("body").hasClass("fullscreen")) {
		        $(".canvasWrap").css({
		            width: "",
		            marginLeft: ""
		        });

		        $("body").removeClass("fullscreen");
		    }
		    else {
		        $("body").addClass("fullscreen");

		        var scaledW = $(window).height() * 1.777778;

		        $(".canvasWrap").css({
		            width: scaledW,
		            marginLeft: -scaledW / 2
		        });
		    }



            // fullscreen API
            //if (!document.fullscreenElement &&    // alternative standard method
            //    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods

            //    if (canvas.requestFullscreen) {
            //        canvas.requestFullscreen();
            //    }
            //    else if (canvas.mozRequestFullScreen) {
            //        canvas.mozRequestFullScreen();
            //    }
            //    else if (canvas.webkitRequestFullscreen) {
            //        canvas.webkitRequestFullscreen(); //Element.ALLOW_KEYBOARD_INPUT
            //    }
            //}
            //else {
            //    if (document.cancelFullScreen) {
            //        document.cancelFullScreen();
            //    }
            //    else if (document.mozCancelFullScreen) {
            //        document.mozCancelFullScreen();
            //    }
            //    else if (document.webkitCancelFullScreen) {
            //        document.webkitCancelFullScreen();
            //    }
            //}
        }

	};
})();


// global enums
var Dir = Object.freeze({
    NONE: 0,
    TOP: 1,
    BOT: 2,
    LEFT: 3,
    RIGHT: 4,
    IN: 5
});

var Color = Object.freeze({
    LIGHT_BROWN: "#c44525",
    DARK_BROWN: "#672819",
    LIGHT_GREEN: "#166a38",
    SILVER: "#c0c0c0",
    BLACK: "#000",
    GOLD: "#ddaa13",
    ORANGE: "#ff6a00"
});

// global functions
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
		   window.webkitRequestAnimationFrame ||

		   function (callback) {
		       setTimeout(callback, 16.6666666667); // 60fps fallback
		   };
})();

var audio = (function () {

    return {
        bgMusic: new Audio("audio/firstChiptune/firstChiptune.mp3"),
        enterSound: new Audio("audio/synthetic_explosion_1.mp3"),
        exitSound: new Audio("audio/annulet.mp3"),
        itemPickedUp: new Audio("audio/life_pickup.mp3"),
        heartbeat: new Audio("audio/heartbeat.mp3"),
        jump: new Audio("audio/jump.mp3"),
        thud: new Audio("audio/thud.mp3"),
        step: new Audio("audio/step.mp3"),
        effort: new Audio("audio/woosh.mp3"),
        discovery: new Audio("audio/spell3.mp3"),
        enemyDeath: new Audio("audio/death.mp3"),
        heroDeath: new Audio("audio/DiscsOfTron_Cascade.mp3"),
        enchant: new Audio("audio/enchant.mp3"),
        isOn: false,


        init: function(){
            audio.bgMusic.loop = true;
            audio.bgMusic.volume = 0.7;
            audio.bgMusic.pause();

            audio.enemyDeath.volume = 0.6;
            audio.jump.volume = 0.4;
            audio.thud.volume = 0.78;
            audio.discovery.volume = 0.7;

            audio.mute(true);
            $(document).on("click", ".audioState", audio.handleMuteButton);

            $(".menu").on("click", function (e) {
                e.preventDefault();
                utils.toggleMenu();
            })

            //----- enable audio on start -----
            audio.handleMuteButton()
        },

        lvlComplete: function () {
            audio.bgMusic.pause();

            var newBgMusic;
            
            switch(game.lvl) {
                case 0:
                    audio.enterSound.play();
                    newBgMusic = "inspiredBySparkMan/sparkBoy.mp3";
                    break;
                default:
                    audio.exitSound.play();
                    newBgMusic = "sweetAcoustic.mp3";
                    break;
            }

            setTimeout(function () {
                audio.bgMusic = new Audio("audio/" + newBgMusic);
                audio.bgMusic.loop = true;
                audio.bgMusic.volume = 0.45;

                audio.isOn ?
                    audio.bgMusic.play() :
                    audio.bgMusic.pause();
            }, 1000);
        },

        play: function (sound, stopPrev) {
            stopPrev = (typeof (stopPrev) !== "undefined") ? stopPrev : true;

            if (sound.ended)
                sound.play();
            else {
                if (stopPrev || sound.currentTime === 0) {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.play();
                }
            }
        },

        handleMuteButton: function () {
            if ($('.audioState').hasClass('off')) {
                $('.audioState span').removeClass('icon-volume-mute').addClass('icon-volume-medium');
                $('.audioState').removeClass('off');
                $('.audioState').addClass('on');

                audio.mute(false);
            }
            else {
                $('.audioState span').removeClass('icon-volume-medium').addClass('icon-volume-mute');
                $('.audioState').removeClass('on');
                $('.audioState').addClass('off');

                audio.mute(true);
            }
        },

        mute: function (onOrOff) {
            audio.discovery.muted =
            audio.enterSound.muted =
            audio.bgMusic.muted =
            audio.itemPickedUp.muted =
            audio.heartbeat.muted =
            audio.effort.muted = 
            audio.thud.muted = 
            audio.jump.muted = 
            audio.step.muted = 
            audio.enemyDeath.muted =
            audio.heroDeath.muted =
            audio.enchant.muted =
            audio.exitSound.muted =
                onOrOff;

            onOrOff ?
                audio.bgMusic.pause() :
                audio.bgMusic.play();

            audio.isOn = !onOrOff;
        }
    };
})();

/// <reference path="../linker.js" />

/*
    A library of generic graphics functions.
*/
var Graphics = (function () {

    var alpha = 1,
        canvasTransition = null
    ;

    return {
        ticker: 1,              // 1.0 --> 0.0 --> 1.0 --> ...
        tickerStep: 0.01,
        fadeOut: false,
        projectX: 9,
        projectY: 12,


        fadeCanvas: function (callback) {
            if (utils.browser() === "MSIE 9.0") {
                callback();
            }
            else {
                $(canvas).removeClass("preTransition");
                $(canvas).addClass("duringTransition");

                canvasTransition = $(canvas).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    canvasTransition.off();

                    $(this).removeClass("duringTransition");
                    $(this).addClass("preTransition");

                    callback();
                });
            }
        },

        blinkText: function (fontSize, x, y, str) {
            str = (typeof (str) !== "undefined") ? str : "PRESS ENTER";

            if (Graphics.ticker >= 1.35 || Graphics.ticker <= Graphics.tickerStep) {
                Graphics.fadeOut = !Graphics.fadeOut;
            }

            if (Graphics.ticker >= 1) {
                alpha = 1;
            }
            else if (Graphics.ticker <= Graphics.tickerStep) {
                alpha = 0;
            }
            else {
                alpha = Graphics.ticker;
            }

            ctx.font = fontSize + "px 'Press Start 2P'";
            var tmpW = ctx.measureText(str).width;
            ctx.fillStyle = "rgba(233, 233, 233," + alpha + ')';
            ctx.fillText(str, x - tmpW / 2, y);
        },

        /*
            Converts a rectangle into a 'skewed rectangle' polygon

            @param(number) x
            @param(number) y
            @param(number) w
            @param(number) h
            @return (SAT.Polygon)
        */
        getSkewedRect: function (x, y, w, h) {
            y += Graphics.projectY / 2;

            var poly = new SAT.Polygon(new SAT.Vector(x, y), [
                new SAT.Vector(),
                new SAT.Vector(w - Graphics.projectX, 0),
                new SAT.Vector(w, Graphics.projectY),
                new SAT.Vector(w, h),
                new SAT.Vector(Graphics.projectX, h),
                new SAT.Vector(0, h - Graphics.projectY)
            ]);

            //poly = new SAT.Box(new SAT.Vector(x, y), w, h).toPolygon();
            poly.type = JQObject.PLATFORM;  // allows not to be GameObj?????

            return poly;
        },

        drawLadder: function (platform) {
            var x = platform.pos.x,
                y = platform.pos.y,
                w = platform.edges[0].x,
                h = platform.edges[1].y
            ;

            // sides
            ctx.fillStyle = Color.LIGHT_BROWN;
            ctx.fillRect(x, y, 5, h);
            ctx.fillRect(x + w-5, y, 5, h);

            // rungs
            for (var i = 13; i < h; i+=20) {
                ctx.fillRect(x, y+i, w, 8);
            }
        },

        drawScale: function (platform) {
            var x = platform.pos.x,
                y = platform.pos.y,
                w = platform.edges[0].x,
                h = platform.edges[1].y
            ;
            
            // draw top border 1px above bounding box
            ctx.fillStyle = Color.BLACK;
            ctx.fillRect(x, y - 1, w, 1);

            // draw platform
            ctx.fillStyle = Color.DARK_BROWN;
            ctx.fillRect(x, y, w, h);
        },

        drawPlatform: function (poly) {
            var y = poly.pos.y - Graphics.projectY / 2;

            // top
            ctx.fillStyle = Color.LIGHT_BROWN;
            ctx.beginPath();
            ctx.moveTo(poly.pos.x, y );
            ctx.lineTo(poly.pos.x + poly.points[1].x, y + poly.points[1].y);
            ctx.lineTo(poly.pos.x + poly.points[2].x, y + poly.points[2].y);
            ctx.lineTo(poly.pos.x + Graphics.projectX, y + Graphics.projectY);
            ctx.closePath();
            ctx.fill();

            // body
            ctx.fillStyle = Color.DARK_BROWN;
            ctx.beginPath();
            ctx.moveTo(poly.pos.x + poly.points[2].x, y + poly.points[2].y);
            ctx.lineTo(poly.pos.x + poly.points[3].x, y + poly.points[3].y);
            ctx.lineTo(poly.pos.x + poly.points[4].x, y + poly.points[4].y);
            ctx.lineTo(poly.pos.x + poly.points[5].x, y + poly.points[5].y);
            ctx.lineTo(poly.pos.x + poly.points[0].x, y + poly.points[0].y);
            ctx.lineTo(poly.pos.x + Graphics.projectX, y + Graphics.projectY);
            ctx.closePath();
            ctx.fill();
        },

        drawPlatformStatus: function (platform) {
            var x = platform.pos.x,
                y = platform.pos.y,
                w = platform.w,
                h = platform.h,
                theShape = 26,
                halfTheShape = theShape/2,
                midX = x + w/2 - halfTheShape,
                midY = y + h/2 - halfTheShape
            ;

            ctx.lineWidth = 3;

            if (platform.holdingItem === JQObject.CRATE) {
                // draw check mark
                ctx.strokeStyle = "green";

                --midY;
                ctx.beginPath();
                ctx.moveTo(midX, midY + halfTheShape);
                ctx.lineTo(midX + halfTheShape, midY + theShape);
                ctx.moveTo(midX + halfTheShape-1, midY + theShape);
                ctx.lineTo(midX + theShape+2, midY+2);
                ctx.stroke();
                ctx.closePath();

            }
            else {
                // draw 'X'
                ctx.strokeStyle = "red";

                ctx.beginPath();
                ctx.moveTo(midX, midY);
                ctx.lineTo(midX + theShape, midY + theShape);
                ctx.moveTo(midX, midY + theShape);
                ctx.lineTo(midX + theShape, midY);
                ctx.stroke();
                ctx.closePath();
            }
        },

        // @param(GameObj) gObj A game object.
        drawDoor: function (gObj) {
            // alias
            var x = gObj.pos.x;
            var y = gObj.pos.y;
            var w = gObj.w;
            var h = gObj.h;

            // door
            ctx.fillStyle = Color.LIGHT_BROWN;
            ctx.fillRect(x + 2, y + 2, w - 2, h - 2);

            ctx.fillStyle = Color.DARK_BROWN;

            ctx.fillRect(x, y, 2, h);   // left frame
            ctx.fillRect(x, y, w, 2);   // top frame
            ctx.fillRect(x + w, y, 2, h);   // right frame

            // door handle
            ctx.beginPath();
            ctx.arc(x + w - (w / 3.2), y + h - (h / 3.4), 3, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // label
            ctx.fillStyle = "#e1e1e1";
            ctx.font = "12px 'Press Start 2P'";
            ctx.fillText("EXIT", x - 8, y - 5);
        },

        drawEllipse: function (x, y, w, h) {
            var kappa = 0.5522848,
				ox = (w / 2) * kappa, // control point offset horizontal
				oy = (h / 2) * kappa, // control point offset vertical
				xe = x + w, // x-end
				ye = y + h, // y-end
				xm = x + w / 2, // x-middle
				ym = y + h / 2 // y-middle
            ;

            ctx.beginPath();
            ctx.moveTo(x, ym);
            ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            ctx.closePath();
            ctx.fill();
        },

        drawRotate: function (img, x, y, angle) {
            ctx.save();

            ctx.translate(x, y);								// move co-ord sys to img origin
            ctx.rotate(utils.degToRad(angle));
            ctx.translate(-img.width * 0.5, -img.height * 0.5); // move to top left of img

            //ctx.scale(0.75, 0.75);
            ctx.drawImage(img, 0, 0);

            ctx.restore();
        }
    };
})();


/* Images */
//lvl = new Array(NUM_LEVELS),
//lvlBgImg = {}
//function loadBgImages(imgArr, callback) {
//    var count = 0;

//    for (var key in imgArr) {
//        if (imgArr[key] !== "none") {
//            lvlBgImg[key] = new Image();
//            lvlBgImg[key].onload = function () {
//                callback(this.num);
//            };

//            lvlBgImg[key].src = imgArr[key];
//            lvlBgImg[key].num = count;
//        }

//        ++count;
//    }
//}

//for (var i = 0; i < NUM_LEVELS; ++i) {
//    lvl[i] = {
//        status: false,
//        bgColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
//    };
//}

//loadBgImages({
//    lvl0: "img/lvl0.jpg",
//    lvl1: "none"
//}, function (num) {
//    lvl[num].status = true;
//});




//var wasClicked = false;
//$(".resize").on("click", function(){
//    if (wasClicked) {
//        $(canvas).css({ width: "", height: "" });
//        $(this).attr("class", "resize off");
//        $(this).children("span").attr("class", "icon-expand");
//    }
//    else {
//        $(canvas).css({ width: "100%" });

//        // fix for IE
//        var width = $(canvas).width();
//        $(canvas).css({ height: 0.611 * width });


//        $(this).attr("class", "resize on");
//        $(this).children("span").attr("class", "icon-contract");
//    }

//    wasClicked = !wasClicked;
//});

/// <reference path="../linker.js" />

// A library of generic physics functions.
var Physics = (function () {


    return {
        // TODO: speed up by checking if a does NOT intersect with b (i.e. using OR)
        // Uses simple Speculative Contacts
        isCollision: function (a, b, moe, isLvl) {
            var aX = (typeof (isLvl) !== "undefined") ? a.pos.x + a.lvlX : a.pos.x;

            if ((aX + moe <= (b.pos.x + b.w)) && // a is to the left of the right side of b
				(b.pos.x + moe <= (aX + a.w)) && // a is to the right of the left side of b
				(a.pos.y + moe <= (b.pos.y + b.h)) && // a is higher than the bot of b
				(b.pos.y + moe <= (a.pos.y + a.h)) 	  // a is lower than the top of b
			) {
                return true;
            }

            return false;
        },
        
        // Checks for a collision between two polygons (uses SAT and AABB).
        // @param(GameObj) a A game object.
        // @param(GameObj) b A game object.
        // @param(function) callback A function invoked with SAT.Response ONLY IF a collision occurred.
        isSATcollision: function (a, b, callback) {
            var r = new SAT.Response();
            if (SAT.testPolygonPolygon(a, b, r)) {
                callback(r);
            }
        },

        // Tests collision between gObj and level.objs[]
        // @param(GameObj) gObj A game object (or subclass).
        // @param(function) callback A callback function.  Called with a SAT.Response().
        testObjObjs: function (gObj, callback) {
            var response = new SAT.Response();
            for (var i = 0; i < level.objs.length; ++i) {
                if (typeof level.objs[i].collidable === "undefined"
                    //&& level.objs[i] !== gObj         // checks if object is in list (by reference)
                ) {

                    // Check Level Object Collision
                    var collided = SAT.testPolygonPolygon(gObj, level.objs[i], response);

                    // Respond to Level Object Collision
                    if (collided) {
                        response.a.pos.x -= response.overlapV.x;
                        response.a.pos.y -= response.overlapV.y;

                        callback(response);
                        break;
                    }

                    response.clear();
                }
            }

            // idea to fix "hooking" around edges of platform
            // http://stackoverflow.com/a/1355695/353166
        },

        // Tests collision between item and level.items[]
        // @param(GameItem) item A game item.
        // @param(function) callback A callback function.  Called with a SAT.Response().
        testItemItems: function (item, callback) {
            var response = new SAT.Response();

            for (var i = 0; i < level.items.length; ++i) {
                if (!level.items[i].isBeingHeld) {
                        
                    if (level.items[i].type !== JQObject.CRATE)       // TODO: allow non-crates
                        continue;

                    var collided = SAT.testPolygonPolygon(item, level.items[i], response);
                        
                    if (collided) {
                        if (response.overlapN.y === 1) {   // a is on top of b
                            response.a.pos.x -= response.overlapV.x;
                            response.a.pos.y -= response.overlapV.y;

                            callback(response);
                            break;
                        }
                    }

                    response.clear();
                }
            }
        },

        // Tests collision between hero and the level.items[]
        // @param(function) callback A callback function.  Called with a SAT.Response and the index of the item.
        testHeroItems: function (callback) {
            for (var i = 0; i < level.items.length; ++i) {
                if (level.items[i].visible) {
                    Physics.isSATcollision(hero, level.items[i], function (r) {
                            callback(r, i);
                    });
                }
            }
        },

        // Tests collision between items
        //testAllItems: function () {
        //    var response = new SAT.Response();

        //    for (var i = 0; i < level.items.length; ++i) {
        //        for (var j = 0; j < level.items.length; ++j) {
        //            if (i !== j && !level.items[i].isBeingHeld && !level.items[j].isBeingHeld) {
                        
        //                if (level.items[i].type !== JQObject.CRATE || level.items[j].type !== JQObject.CRATE)       // TODO: allow non-crates
        //                    continue;

        //                var collided = SAT.testPolygonPolygon(level.items[i], level.items[j], response);
                        
        //                if (collided) {
        //                    if (response.overlapN.y === 1) {   // a is on top of b
        //                        response.a.pos.x -= response.overlapV.x;
        //                        response.a.pos.y -= response.overlapV.y;

        //                        response.a.isOnObj = true;
        //                        response.a.onObj = response.b;
        //                        response.b.grabbable = false;

        //                        level.items.push(response.a);
        //                    }
        //                }

        //                response.clear();
        //            }
        //        }
        //    }
        //}
    };
})();

/// <reference path="../linker.js" />

var JQObject = Object.freeze({
    EMPTY: 0,
    CRATE: 1,
    LADDER: 2,
    SACK: 3,
    ENEMY: 4,
    CASH: 5,
    DOOR: 6,
    SCALE: 7,
    SMALL_CLOUD: 8,
    CLOUD: 9,
    PLATFORM: 10,
    FLOOR: 11
});

var JQObject_names = Object.freeze({
    0: "EMPTY",
    1: "CRATE",
    2: "LADDER",
    3: "SACK",
    4: "ENEMY",
    5: "CASH",
    6: "DOOR",
    7: "SCALE",
    8: "SMALL_CLOUD",
    9: "CLOUD",
    10: "PLATFORM",
    11: "FLOOR"
});

/*
    GameObj is the base class from which all objects in the game inherit from.
    Every GameObj has a SAT.Vector (pos);       TODO: make Vector not Polygon
    
    @param(JQObject) type The type of the object.
    @param(number) x The x position of the object.
    @param(number) y The y position of the object.
    @param(number?) w The width of the object.
    @param(number?) h The height of the object.
    @param(Image?) src The filename of the object sprite.  unused by default
    
    @constructor
*/
var GameObj = function (type, x, y, w, h, src) {
    this.type = type;

    // this.pos
    if (type === JQObject.FLOOR) {
        $.extend(this, Graphics.getSkewedRect(x, y, w, h));
        this.type = JQObject.FLOOR; // TODO: fix api
    }
    else {
        $.extend(this, new SAT.Box(new SAT.Vector(x, y), w, h).toPolygon());
    }

    this.imgReady = false;     // TODO: make private

    if (typeof (src) === "undefined") {
        this.w = w;
        this.h = h;
    }
    else {
        this.w = 0;
        this.h = 0;

        this.img = new Image();

        var that = this;
        this.img.onload = function () {
            that.imgReady = true;
            that.w = this.width;
            that.h = this.height;
        };

        this.img.src = "img/" + src;
    }
};

GameObj.prototype = {
    draw: function () {
        if (this.imgReady) {
            ctx.drawImage(this.img, this.pos.x, this.pos.y);
        }
        else {
            ctx.fillStyle = "red";
            ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        }
    }
};

/*
    GameItem extends GameObj
    GameItem may extend SAT.Vector to be SAT.Polygon

    @param(GameObj) gObj A game object.
    @param(?bool) grabbable Whether the game item can be pickup up or not. (false by default)
    @param(?number) val The value of the game item. (-1 by default)
    @param(?bool) visible Whether the game item is displayed or not.  (true by default)
*/
var GameItem = function (gObj, grabbable, val, visible) {
    utils.extend(this, gObj);
    
    this.grabbable = (typeof (grabbable) !== "undefined") ? grabbable : false;
    this.val = (typeof(val) !== "undefined") ? val : -1;
    this.visible = (typeof (visible) !== "undefined") ? visible : true;

    this.vY = 0;
    this.isOnObj = false;   // TODO: allow setting to true to avoid "thud" sound on level start
    this.onObj = null;      // contains the object holding up the object (directly below)

    this.isBeingHeld = false;

    // TODO: make private/prototype
    var parentDraw = this.draw;
    this.draw = function () {
        if (this.visible) {
            parentDraw.apply(this);
        }
    };
};

//GameItem.prototype = {
//};

/// <reference path="../linker.js" />

var HUD = (function () {

    var cash = null,
        medKit = null,
        shuriken = null,
        syringe = null
    ;


    function drawHealth(){
        for(var i=0; i < hero.health; ++i){
            ctx.fillStyle = "red";
            ctx.fillRect(80 + i*21, FULLH + 14, 19, 8);
        }
    }
	
    function drawMana(){
        for(var i=0; i < hero.mana; ++i){
            ctx.fillStyle = "#00b6ff";
            ctx.fillRect(80 + i*21, FULLH + 37, 19, 8);
        }
    }
	
    function drawXP() {
        ctx.fillStyle = "#ddd";
        ctx.font = "12px 'Press Start 2P'";
        	
        var zero = (hero.xp < 10) ? '0' : '';
        ctx.fillText(zero + hero.xp + '/' + hero.xpNeeded, 80, FULLH + 71);
    }


    return {
        init: function () {
            // HUD icons
            cash = new GameObj(JQObject.EMPTY, 548, FULLH + 33, 22, 24, "cash.png");
            medKit = new GameObj(JQObject.EMPTY, 238, FULLH + 31, 25, 24, "medKit.png");
            shuriken = new GameObj(JQObject.EMPTY, 447, FULLH + 32, 24, 24, "shuriken.png");
            syringe = new GameObj(JQObject.EMPTY, 342, FULLH + 31, 25, 25, "syringe.png");
        },

        draw: function () {// TODO: break out static parts
            // background
            ctx.fillStyle = "#070707";
            ctx.fillRect(0, FULLH, FULLW, game.padHUD);

            ctx.fillStyle = "#ddd";
            ctx.font = "12px 'Press Start 2P'";


            ctx.fillText("HP-" + hero.healthLvl, 15, FULLH + 24);
            ctx.fillText("MP-" + hero.manaLvl, 15, FULLH + 48);
            ctx.fillText("XP", 15, FULLH + 71);
            
            drawHealth();
            drawMana();
            drawXP();

            // hp kit
            ctx.fillText(hero.medKits, 210, FULLH + 50);
            medKit.draw();

            // mp kit
            ctx.fillText(hero.manaKits, 315, FULLH + 50);
            syringe.draw();

            // ammo
            ctx.fillText(hero.ammo, 410, FULLH + 50);
            shuriken.draw();

            // money
            ctx.fillText(hero.cash, 515, FULLH + 50);
            cash.draw();

            // time
            var time = utils.getTimeObj(game.actualTime);
            ctx.fillText(time.min + ':' + time.sec, FULLW - 84, FULLH + 34);
        }
    };
})();

/// <reference path="../linker.js" />

var JQEnemy = Object.freeze({
    STILL: 0,
    PATROL: 1,
    FOLLOW: 2
});


/*
    Enemy extends GameObj

    @param(GameObj) gObj A game object (super class).
    @param(EnemyType) enemy_t The type of the enemy.
    @param(number) health The hp of the enemy.
    @param(number) leftXBound The left x coordinate boundary.
    @param(number) rightXBound The right x coordinate boundary.
    @param(bool?) active Is the enemy allowed to move?
    @constructor
*/
var Enemy = function (gObj, enemy_t, health, leftXBound, rightXBound, active) {
    utils.extend(this, gObj);

    this.initHealth = this.health = health;
    this.enemy_t = enemy_t;
    this.leftXBound = leftXBound;
    this.rightXBound = rightXBound;
    this.active = (typeof (active) !== "undefined") ? active : false;
    this.deadOffScreen = false;

    // TODO: make private (and initHealth)
    this.dir = Dir.RIGHT;
    this.alive = true;
    this.deadOnScreen = false;
    this.clearDir = true;		// true = right; false = left;

    // draw
    function drawHealth(that) {
        var healthLen = (that.w / that.initHealth) * that.health;

        ctx.fillStyle = "red";
        ctx.fillRect(that.x, that.y - 12, healthLen, 4);
    }

    var parentDraw = this.draw;
    this.draw = function () {
        if (this.alive || this.deadOnScreen) {
            if (this.initHealth > 1) {
                drawHealth(this);
            }

            ctx.save();
            if (this.deadOnScreen) {
                ctx.globalAlpha = 0.3;
            }

            parentDraw.apply(this);
            ctx.restore();
        }
    }
};

Enemy.prototype = {

    update: function () {
        if (this.deadOnScreen) {
            this.pos.x += this.clearDir ? 2 : -2;
            this.pos.y -= 9;

            if (this.pos.x < 0 || this.pos.x > FULLW) {
                this.deadOnScreen = false;
                this.deadOffScreen = true;
            }
        }
        else if (this.active && game.totalTicks % 3 === 0) {
            this.movement();
        }
    },

    // TODO: make private
    movement: function() {
        if (this.enemy_t === JQEnemy.PATROL) {
            if (this.pos.x + hero.lvlX <= this.leftXBound)
                this.dir = Dir.RIGHT;
            else if (this.pos.x + hero.lvlX >= this.rightXBound)
                this.dir = Dir.LEFT;

            if (this.dir === Dir.RIGHT) {
                ++this.pos.x;
            }
            else {
                --this.pos.x;
            }
        }
        else if (this.enemy_t === JQEnemy.FOLLOW) {
            if (this.pos.x < hero.pos.x)
                ++this.pos.x;
            else if (this.pos.x > hero.pos.x)
                --this.pos.x;
        }
    },

    death: function () {
        this.clearDir = (hero.dir == Dir.RIGHT);

        audio.enemyDeath.play();
        hero.xp += 15;
        this.alive = false;
        this.deadOnScreen = true;
    }
};
/// <reference path="../linker.js" />

var level = (function () {

    var maxVy = 10; // applys to GameObj's and GameItem's

    /********** Update **********/
    function updateObjsView() {
        for (var i = 0; i < level.objs.length; ++i) {
            level.objs[i].pos.x -= hero.vX;
        }
    }

    function updateItemsView() {
        for (var i = 0; i < level.items.length; ++i) {
            level.items[i].pos.x -= hero.vX;
        }
    }

    function updateBgView() {
        // layer 1
        for (var i = 0; i < level.bg[1].length; ++i) {
            level.bg[1][i].pos.x -= hero.vX / 3;
        }

        // layer 0
        for (var i = 0; i < level.bg[0].length; ++i) {
            level.bg[0][i].pos.x -= hero.vX / 2;
        }
    }

    function updateEnemiesView() {
        for (var i = 0; i < level.enemies.length; ++i) {
            level.enemies[i].pos.x -= hero.vX;
        }
    }


    function updateItems() {
        for (var i = 0; i < level.items.length; ++i) {
            if (level.items[i].visible && !level.items[i].isOnObj) {
                // gravity/position
                if (level.items[i].vY < maxVy)
                    level.items[i].vY += game.gravity;
                else
                    level.items[i].vY = maxVy;

                level.items[i].pos.y += level.items[i].vY;

                // obj collision
                Physics.testObjObjs(level.items[i], function (r) {
                    if (r.overlapN.y === 1) {    // on top of platform
                        audio.thud.play();
                        r.a.vY = 0;
                        r.a.isOnObj = true;
                        r.a.recentlyHeld = false;

                        if (r.b.type === JQObject.SCALE) {
                            r.a.grabbable = false;
                            r.b.holdingItem = JQObject.CRATE;

                            utils.repeatAction(70, 8, function () {
                                ++r.a.pos.y;
                                ++r.b.pos.y;
                            });
                        }
                    }

                });

                // item collision
                Physics.testItemItems(level.items[i], function (r) {
                    r.a.isOnObj = true;
                    r.a.onObj = r.b;
                    r.b.grabbable = false;
                    r.a.recentlyHeld = false;
                });
            }
        }
    }

    function updateEnemies() {
        for (var i = 0; i < level.enemies.length; ++i) {
            level.enemies[i].update();

            if (level.enemies[i].health > 0) {
                // hero and enemy
                if (Physics.isCollision(hero, level.enemies[i], 0)) {
                    level.enemies[i].active = true;

                    if (!hero.invincible) {
                        audio.play(audio.heartbeat, true);

                        hero.invincible = true;
                        --hero.health;
                    }
                }

                // projectiles and enemy
                for (var j = 0; j < hero.bulletArr.length; ++j) {
                    var wasCollision = false;

                    if (Physics.isCollision(hero.bulletArr[j], level.enemies[i], 0)) {
                        wasCollision = true;
                        audio.play(audio.thud, true);
                    }

                    if (wasCollision) {
                        level.enemies[i].active = true;

                        hero.bulletArr.splice(j, 1); // remove jth item
                        --level.enemies[i].health;

                        if (level.enemies[i].health <= 0) {
                            level.enemies[i].death();
                        }
                    }
                }
            }
        }
    }

    /********** Render **********/
    // the parallax background
    function drawBg() {
        // color background
        ctx.fillStyle = Color.LIGHT_GREEN;
        ctx.fillRect(0, 0, FULLW, FULLH - game.padFloor - 1);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, FULLH - game.padFloor - 1, FULLW, game.padFloor + 1);

        // layer 1
        for (var i = 0; i < level.bg[1].length; ++i) {
            level.bg[1][i].draw();
        }

        // layer 0
        for (var i = 0; i < level.bg[0].length; ++i) {
            level.bg[0][i].draw();
        }
    }

    // all of the collision rectangles in the level
    function drawObjs() {
        for (var i = 0; i < level.objs.length; ++i) {
            // check if visible
            if (typeof (level.objs[i].visible) !== "undefined" &&   // TODO: all objs should have visible property (fix api)
                !level.objs[i].visible
            ) {
                continue;
            }
            
            if (level.objs[i].type === JQObject.LADDER) {           // ladder
                Graphics.drawLadder(level.objs[i]);
            }
            else if (level.objs[i].type === JQObject.SCALE) {       // scale
                Graphics.drawScale(level.objs[i]);
                Graphics.drawPlatformStatus(level.objs[i]);
            }
            else if(level.objs[i].type === JQObject.PLATFORM || level.objs[i].type === JQObject.FLOOR) {
                Graphics.drawPlatform(level.objs[i]);
            }
            else if (level.objs[i].type === JQObject.DOOR) {
                Graphics.drawDoor(level.objs[i]);
            }
            else {
                ctx.fillStyle = Color.DARK_BROWN;
                ctx.fillRect(level.objs[i].pos.x, level.objs[i].pos.y, level.objs[i].w, level.objs[i].h);
            }
        }
    }

    function drawItems() {
        for (var i = 0; i < level.items.length; ++i) {
            level.items[i].draw();
        }
    }

    function drawEnemies() {
        for (var i = 0; i < level.enemies.length; ++i) {
            if (!level.enemies[i].deadOffScreen) {
                level.enemies[i].draw();
            }
        }
    }


    return {
        bg: [   // parallax background; TODO: make one array with variable depth (z dimension) and variable scroll speed per entry
            [], // backgorund obj's 1
            []  // background obj's 2
        ],
        objs: [],           // dynamically holds all of the objects for the level
        items: [],          // dynamically holds all of the items for the level
        enemies: [],        // dynamically holds all of the enemies for the level
        curLvl: null,       // alias for the current level object e.g. lvl1
        isCutscene: false,
        time: 0,
        hiddenItemsFound: 0,
        hiddenItems: 0,
        isTransitioning: false,
        

        init: function () {
            level.curLvl = startScreen;     // startScreen == level '0'
            level.curLvl.init();
            level.reset();
        },

        // called before start of level
        reset: function () {
            // reset game stats
            game.over = false;
            game.actualTime = 0;

            // reset level
            level.hiddenItemsFound = 0;
            hero.lvlX = 0;
            level.bg = [[], []];
            level.objs = [];
            level.items = [];
            level.enemies = [];

            // reset hero
            hero.pos.x = 23;
            hero.pos.y = FULLH - game.padFloor - hero.h + 4;    // TODO: find out '4' offset??
            hero.vX = hero.vY = 0;
            hero.isJumping = false;
            hero.bulletArr.length = 0;		// prevents leftover thrown shurikens
            hero.invincible = false;
            hero.isHolding = false;
            hero.curItem = null;
            hero.dir = Dir.RIGHT;
            hero.health = hero.maxHealth;
        },

        // called at end of level
        complete: function () {
            level.isTransitioning = true;
            audio.lvlComplete();

            // reset graphics timers (to fix blink text)
            Graphics.ticker = 1;
            Graphics.fadeOut = true;

            Graphics.fadeCanvas(function () {
                level.isTransitioning = false;

                level.reset();
                level.curLvl = lvlComplete;
                level.isCutscene = true;
                level.time = game.actualTime;

                // TODO: audio.lvlCompleted.play()
            });
        },

        /******************** Update ********************/
        update: function () {
            if (!level.isTransitioning) {
                updateItems();
                updateEnemies();

                level.curLvl.update();
            }
        },

        // fix positions relative to the "camera" view
        updateView: function(){
            updateObjsView();
            updateItemsView();
            updateBgView();
            updateEnemiesView();
        },


        /******************** Render ********************/
        render: function () {
            drawBg();
            drawObjs();
            drawItems();
            drawEnemies();
            
            level.curLvl.render();
        }
    };
})();

/// <reference path="../linker.js" />

var lvlComplete = (function () {

    return {
        update: function () {
            if (keysDown[KeyCode.ENTER] || game.lvl === 0 || window.DEBUG) {
                lastKeyDown = KeyCode.EMPTY;

                switch (++game.lvl) {
                    case 1:
                        lvl1.init();
                        level.curLvl = lvl1;
                        break;
                    case 2:
                        lvl2.init();
                        level.curLvl = lvl2;
                        break;
                }

                level.isCutscene = false;
            }
        },

        render: function () {
            // background
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, FULLW, canvas.height);

            // title
            ctx.font = "24px 'Press Start 2P'";
            var title = "LEVEL " + game.lvl + " COMPLETE";
            var titleW = ctx.measureText(title).width;
            ctx.fillStyle = Color.ORANGE;
            ctx.fillText(title, HALFW - titleW/2, 70);
            
            // level time
            ctx.font = "18px 'Press Start 2P'";
            var time = utils.getTimeObj(level.time);
            var timeTxt = "LEVEL TIME......" + time.min + ':' + time.sec;
            var timeW = ctx.measureText(timeTxt).width;
            ctx.fillStyle = "#e1e1e1";
            ctx.fillText(timeTxt, HALFW - titleW / 2, 150);

            // hidden items
            ctx.font = "18px 'Press Start 2P'";
            var hdnItems = "HIDDEN ITEMS....." + level.hiddenItemsFound + '/' + level.hiddenItems;
            var hdnItemsW = ctx.measureText(hdnItems).width;
            ctx.fillStyle = "#e1e1e1";
            ctx.fillText(hdnItems, HALFW - hdnItemsW / 2, 190);

            // cta
            Graphics.blinkText(16, HALFW, HALFH + 120);
        }
    };
})();

/// <reference path="../linker.js" />

// level '0'
var startScreen = (function () {

    var copyTitle1 = "JON'S",
		copyTitle2 = "QUEST",
		copyLine = String.fromCharCode("169") + " 2013 JON WIEDMANN"
    ;

    return {
        init: function(){
            level.isCutscene = true;
        },

        update: function(){
            if (lastKeyDown === KeyCode.ENTER) {
                level.complete();
            }
        },

        render: function(){
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, FULLW, FULLH + game.padHUD);

            //---- title

            // title 1
            ctx.font = "29px 'Press Start 2P'";
            var startX = HALFW - ctx.measureText(copyTitle1).width / 2 + 11,
                startY = 58;

            ctx.setTransform(1, 0, -0.4, 1.4, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText('J', startX + 4, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('J', startX, startY);
            ctx.setTransform(1, 0, -0.2, 1.4, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText('O', startX + 32, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('O', startX + 28, startY);
            ctx.setTransform(1, 0, 0.05, 1.41, 0, -1);
            ctx.fillStyle = "#222";
            ctx.fillText('N', startX + 58, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('N', startX + 54, startY);
            ctx.setTransform(1, 0, 0.23, 1.4, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText("'", startX + 78, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText("'", startX + 74, startY);
            ctx.setTransform(1, 0, 0.42, 1.4, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText('S', startX + 95, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('S', startX + 91, startY);


            // title 2
            ctx.font = "36px 'Press Start 2P'";
            startX = HALFW - ctx.measureText(copyTitle2).width / 2 + 30;
            startY = 98;

            ctx.setTransform(1, 0, -0.5, 1.6, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText('Q', startX + 4, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('Q', startX, startY);
            ctx.setTransform(1, 0, -0.25, 1.6, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText('U', startX + 26, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('U', startX + 22, startY);
            ctx.setTransform(1, 0, 0.03, 1.6, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText('E', startX + 50, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('E', startX + 46, startY);
            ctx.setTransform(1, 0, 0.25, 1.6, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText('S', startX + 74, startY + 3);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('S', startX + 70, startY);
            ctx.setTransform(1, 0, 0.5, 1.6, 0, 0);
            ctx.fillStyle = "#222";
            ctx.fillText('T', startX + 90, startY + 4);
            ctx.fillStyle = "#ff6a00";
            ctx.fillText('T', startX + 86, startY);
            ctx.setTransform(1, 0, 0, 1, 0, 0);	// reset

            //---- press enter
            Graphics.blinkText(22, HALFW, HALFH + 81);

            //---- copyright
            ctx.font = "13px 'Press Start 2P'";
            ctx.fillStyle = "#ddd";

            ctx.fillText(copyLine, HALFW - ctx.measureText(copyLine).width / 2, FULLH + 44);
        }
    };
})();

/// <reference path="../linker.js" />

var lvl1 = (function () {

    var hiddenCash,
		door,
        ladder,
        doLadder = false
    ;

    function handle_crates_scale_ladder() {
        // all crates on scale
        if (doLadder) {
            hero.onLadder = SAT.testPolygonPolygon(hero, ladder);
        }
        else {
            var numCratesOnScales = 0;
            for (var i = 0; i < level.objs.length; ++i) {
                if (level.objs[i].type === JQObject.SCALE &&
                    typeof (level.objs[i].holdingItem) !== "undefined" && level.objs[i].holdingItem === JQObject.CRATE
                ) {
                    ++numCratesOnScales;
                }
            }

            doLadder = (numCratesOnScales === 3);

            if (doLadder) {
                var result = $.grep(level.objs, function (e) {
                    return e.type === JQObject.LADDER;
                });
                result[0].visible = true;
            }
        }
    }


    function setBackground() {
        var i = 0,
            x1offset = HALFW / 1.2,
            x2offset = HALFW / 2.7,
            x = 60 - x1offset,
            fixY
        ;

        while (x < lvl1.width) {
            fixY = (++i % 2 == 0) ? 100 : 0;
            x += x1offset;
            level.bg[0].push(new GameObj(JQObject.CLOUD, x, 60 + fixY, 0, 0, "cloud.png"));        // TODO: fix api to get w/h
        }

        x = 0;
        while (x < lvl1.width) {
            if (++i % 2 == 0)
                fixY = 70;
            else if (i % 3 == 0)
                fixY = 140;
            else
                fixY = 10;

            x += x2offset;
            level.bg[1].push(new GameObj(JQObject.SMALL_CLOUD, x, 100 + fixY, 0, 0, "cloud_small.png"));        // TODO: fix api to get w/h
        }
    }

    function setObjs() {

        // floor + 3 initial platforms
        level.objs.push(
            new GameObj(JQObject.FLOOR, -Graphics.projectX, FULLH - game.padFloor - 1, lvl1.width + Graphics.projectX * 2, game.padFloor + 1),
            Graphics.getSkewedRect(200, 226, 267, 48),
            Graphics.getSkewedRect(562, 325, 300, 48),
            Graphics.getSkewedRect(585, 145, 220, 48)
        );

        // scales
        var scales = [];
        for (var i = 0; i < 3; ++i) {
            scales[i] = new GameObj(JQObject.SCALE, lvl1.width - 330 - i * 230, FULLH - game.padFloor - 107, 150, 36);
            scales[i].holdingItem = JQObject.EMPTY; // TODO: fix api
            level.objs.push(scales[i]);
        }


        // stairs
        var stairs = {
                x: 1160,
                y: 210,
                w: 0,
                h: 0
            },
            rise = 5,   // delta h between steps
            run = 17    // delta w between steps
        ;

        for (var i = 0; i < 15; ++i) {
            level.objs.push(Graphics.getSkewedRect(stairs.x + run * i, stairs.y - rise * i, run + 1, 50));
            stairs.w += run;
            stairs.h += rise;
        }

        // platform + door
        level.objs.push(Graphics.getSkewedRect(stairs.x + stairs.w, stairs.y - stairs.h, 200, 50));
        door = new GameObj(JQObject.DOOR, stairs.x + stairs.w + 155, stairs.y - stairs.h - 54 + Graphics.projectY / 2, 25, 53);
        level.objs.push(door);

        // TODO: move to setItems()
        ladder = new GameItem(new GameObj(JQObject.LADDER, stairs.x - 37, stairs.y - 1, 38, FULLH - stairs.y - game.padFloor), false, 0, false);
        ladder.collidable = false;      // allows ladder to not be in normal collision detection
        level.objs.push(ladder);

        return [scales[1].pos.x + scales[1].w / 2, scales[2].pos.x + scales[2].w / 2];
    }

    function setItems(scalePos) {        // crates        var crate = [];        for (var i = 0; i < 3; ++i) {
            crate.push(
                new GameItem(
                    new GameObj(JQObject.CRATE, 446, FULLH - game.padFloor - 26 + 5, 24, 26, "crate.png"),
                    true
                )
            );
        }
        crate[1].pos.x = scalePos[0] - crate[0].w / 2;
        crate[2].pos.x = scalePos[1] - crate[0].w / 2;        // sack
        var sack = new GameItem(new GameObj(JQObject.SACK, 680, 121 + Graphics.projectY / 2, 20, 24, "sack.png"), false, 5);

        // hidden cash; TODO: only add to level.items after visible???
        hiddenCash = new GameItem(new GameObj(JQObject.CASH, 113, 80, 22, 24, "cash.png"), false, 10, false);

        level.items.push(crate[0], crate[1], crate[2], sack, hiddenCash);
    }

    function setEnemies() {
        var cyborg = new Enemy(
            new GameObj(JQObject.ENEMY, 1600, FULLH - game.padFloor - 38 + 5, 28, 38, "cyborgBnW.png"),
            JQEnemy.FOLLOW,
            1,
            1087,
            1600,
            false
        );
        cyborg.collidable = false;  // TODO: fix api        level.enemies.push(cyborg);
    }


    return {
        width: 2700,


        init: function () {
            level.hiddenItems = 1;

            setBackground();            var scalePos = setObjs();            setItems(scalePos);
            setEnemies();
        },

        deinit: function(){
            hiddenCash = null;
            door = null;
            ladder = null;
            doLadder = false;
        },

        update: function () {
            // TODO: move to better location
            if (window.DEBUG) {
                level.complete();
            }

            handle_crates_scale_ladder();

            // hidden cash
            if (!hiddenCash.visible) {
                for (var i = 0; i < hero.bulletArr.length; ++i) {
                    if (Physics.isCollision(hero.bulletArr[i], hiddenCash, -17)) {
                        hiddenCash.visible = true;
                        audio.discovery.play();
                        ++level.hiddenItemsFound;
                    }
                }
            }

            // door
            if (!game.over && Physics.isCollision(hero, door, 0)) {     // TODO: why checking game.over???
                level.complete();
            }
        },

        render: function () {

        }
    };

})();

/// <reference path="../linker.js" />

var lvl2 = (function () {

    function setBackground() {

    }

    function setObjs() {
        // floor
        var floor1 = new GameObj(
            JQObject.EMPTY,
            -Graphics.projectX,
            FULLH - game.padFloor - 1,
            FULLW / 3 + 40,
            game.padFloor + 1
        );

        var floor2 = new GameObj(
            JQObject.EMPTY,
            HALFW,
            FULLH - game.padFloor - 1,
            120,
            game.padFloor + 1
        );

        var floorPlat = new GameObj(
            JQObject.EMPTY,
            floor2.pos.x + floor2.w,
            floor2.pos.y - floor2.h,
            300,
            150
        );

        var floorTp = new GameObj(
            JQObject.EMPTY,
            floorPlat.pos.x + floor2.w,
            floor2.pos.y - floor2.h*2.5,
            100,
            25
        );

        level.objs.push(floorPlat, floor1, floor2, floorTp);

        return [floor2.pos, floor2.w];
    }

    function setItems() {
        var crate = new GameItem(
            new GameObj(JQObject.CRATE, 206, FULLH - game.padFloor - 26 + 5, 24, 26, "crate.png"),
            true
        );

        //level.items.push(crate);
    }

    function setEnemies(f2) {
        // enemy
        var enemy = new Enemy(
            new GameObj(JQObject.ENEMY, f2[0].x, f2[0].y - 38, 28, 38, "cyborgBnW.png"),
            JQEnemy.PATROL,
            1,
            f2[0].x,
            f2[0].x + f2[1] - 28,
            true
        );
        enemy.collidable = true;        // TODO: fix api
        //level.enemies.push(enemy);
    }

    return {
        width: 2700,


        init: function () {
            level.hiddenItems = 0;

            setBackground();
            var _floor2 = setObjs();
            setItems();
            setEnemies(_floor2);
        },

        deinit: function(){
            
        },

        update: function(){
            
        },

        render: function () {
            ctx.font = "18px 'Press Start 2P'";
            var lvlTxt = "LEVEL 2 -- COMING SOON";
            var lvlTxtW = ctx.measureText(lvlTxt).width;
            ctx.fillStyle = "#e1e1e1";
            ctx.fillText(lvlTxt, HALFW - lvlTxtW / 2, 150);
        }
    };
})();
/// <reference path="../linker.js" />

var game = (function () {
	var	avgFPS = 0,
        renderTimePrev = 0,
        renderTimeBtw = 16,
		fpsHistory = [60],
        //updateTimePrev = 0,
        //lag = 0,
        renderLoop,         // used to turn off game
        updateLoop          // used to turn off game
	;
	
	function update() {
	    if (!level.isCutscene && !level.isTransitioning && !game.over) {
	        hero.update();
	    }

		level.update();
	}
	
	function render(renderTimeCur) {
        // timers
	    if ((renderTimeCur - renderTimePrev) > 0) {
	        renderTimeBtw = renderTimeCur - renderTimePrev;
	    }
	    renderTimePrev = renderTimeCur;


	    renderLoop = requestAnimFrame(render);

        
	    // drawing
	    level.render();

	    if (!level.isCutscene) {
            if(!game.over)
                hero.render();

	        HUD.draw();
	        drawFPS();
	    }
	}
	
	function drawFPS(fps) {
	    fpsHistory.push(1000 / renderTimeBtw);
	    
    	if (game.totalTicks % 120 === 0) {
    	    var tot = 0,
                i = fpsHistory.length
    	    ;
    	    
    	    while (--i) {
        		tot += fpsHistory[i];
        	}
    	    
    	    if (fpsHistory.length > 0) {
    	        avgFPS = Math.floor(tot / fpsHistory.length);
    	    }
    	    else {
    	        avgFPS = 0;
    	    }

    	    while (fpsHistory.length > 0) {
    	        fpsHistory.pop();
    	    }
        }
    	
    	ctx.fillStyle = "#ddd";
    	ctx.font = "12px 'Press Start 2P'";
	  	ctx.fillText(avgFPS + " FPS", FULLW - 84, FULLH + 65);
	}
   	

	return {
        over: false,        // indicates the game is finished
	    gravity: 0.07,
	    padHUD: 80,
	    padFloor: 32,
	    lvl: 0,
	    totalTicks: 0,      // ticks are update iterations
	    actualTime: 0,


	    start: function () {
            // update at fixed time interval
	        updateLoop = setInterval(function () {
	            ++game.totalTicks;
	            Graphics.ticker += Graphics.fadeOut ? -Graphics.tickerStep : Graphics.tickerStep;

	            //var updateTimeCur = new Date().getTime();

	            //if ((updateTimeCur - updateTimePrev) > 0) {
	            //game.updateTimeBtw = updateTimeCur - updateTimePrev;
	            //}

	            //updateTimePrev = updateTimeCur;
	            //lag += game.updateTimeBtw;

	            //while (lag >= game.updateTimeBtw) {      // TODO: interpolate if needed
	            update();
	            //lag -= game.updateTimeBtw;
	            //}
	        }, 8.3333); // 1000 / 120 ==> 2x target rate of 60fps
	        
            // render w/vsync (let browser decide)
	        render();
	    },

	    stop: function () {
	        window.cancelAnimationFrame(renderLoop);
	        clearInterval(updateLoop);
	    }
	};
})();

/// <reference path="../linker.js" />

var Shuriken = {
    w: 19.5,
    h: 9,
    speed: 4.4
};

// The hero object.  TODO: convert to be of GameObj type
var hero = (function () {
    var input = null,           // the hero input component
        graphics = null,        // the hero graphics component
        physics = null,         // the hero physics component
        imgReady = false,
		img = null,
        idleTime = 0,
		spriteArr = [],
		invincibleTimer = 170,
        invincibleTimer0 = 170
	;
	
		
	/*********************** Update ***********************/
    function checkHealth() {
        if (hero.invincible)
            --invincibleTimer;

        if (invincibleTimer <= 0) {
            hero.invincible = false;
            invincibleTimer = invincibleTimer0;
        }
        
        if (hero.health <= 0 && !game.over) {
            utils.deathSequence();
        }
    }

    function getSpritePos() {
		var pos = {x: 0, y: 0};
		
		if (hero.isHolding && hero.vX === 0) {
			pos = spriteArr["playerDown"];
		}
		else if (hero.onLadder) {               // TODO: check if holding crate (shouldn't be allowed on ladder)
		    pos = spriteArr["playerUp"];
		}
		else if (hero.dir === Dir.RIGHT || hero.dir === Dir.LEFT) {
		    var dirR = (hero.dir === Dir.RIGHT);
		    var theDir = "player" + (dirR ? "Right" : "Left");

		    if (dirR && hero.vX > 0 ||  // right
		        !dirR && hero.vX < 0    // left
            ) {
		        var runTimer = (game.totalTicks % 60);

		        if(!hero.isOnObj){
		            pos = spriteArr[theDir + "_Run1"];
		        }
                else if(Math.abs(hero.vX) <= hero.aX*10){
		            pos = spriteArr[theDir + "_Step"];
		        }
		        else if(runTimer >= 0 && runTimer < 20) {
		            pos = spriteArr[theDir + "_Run1"];

		            if (!hero.isJumping) {
		                audio.step.play();
		            }

		        }
		        else if (runTimer >= 20 && runTimer < 40) {
		            pos = spriteArr[theDir + "_Run2"];
		        }
		        else {
		            pos = spriteArr[theDir + "_Run3"];
		        }
			}
			else
				pos = spriteArr[theDir];
		}
		
        // idle animation
		if (!hero.onLadder && hero.vX === 0 && hero.vY === 0)
		    ++idleTime;
		else
		    idleTime = 0;

		if (idleTime > 210) {
		    var foo = idleTime % 200;
		    
		    if (foo >= 0 && foo <= 50 || foo > 100 && foo <= 150 || hero.isHolding)
		        pos = spriteArr["playerDown"];
		    else if (foo > 50  && foo <= 100)
		        pos = spriteArr["playerDown_breatheIn"];
		    else if (foo > 150 && foo <= 200)
		        pos = spriteArr["playerDown_breatheOut"];
		}

        // invincible
		var inv = invincibleTimer % 40;
		
		if(hero.invincible && (inv >= 0 && inv <= 16)){
			pos = {x: -1, y: -1};
		}

		
		hero.sx = pos.x;
		hero.sy = pos.y;
	}
	
	/*********************** Render ***********************/
	function drawHero(){
	    if (imgReady && hero.sx >= 0 && hero.sy >= 0) {
		    ctx.drawImage(img, hero.sx, hero.sy, hero.w, hero.h, Math.round(hero.pos.x), Math.round(hero.pos.y), hero.w, hero.h);
    	}
	}
		
    // used to draw things over the hero
	function drawAfterHero() {
	    if (hero.isHolding) {
	        hero.curItem.draw();
	    }
	}
		
	return {
		sx: 0,				// sprite position
		sy: 0,
		lvlX: 0,			
		w: 28,
		h: 38,
		vX: 0,              // maxVx/maxVy are in heroInput.js
		vY: 0,
		aX: 0.17,
		aY: 0.52,
		jumpMod: 4,
		jumpMod0: 4,
		dir: Dir.RIGHT,
		onLadder: false,
		invincible: false,
		isJumping: false,
		isHolding: false,
		isOnObj: true,
		curItem: null,      // the item in hand
		health: 3,
		maxHealth: 3,
		medKits: 1,
		healthLvl: 1,
		mana: 0,
		maxMana: 4,
		manaKits: 1,
		manaLvl: 1,
		ammo: 20,
		cash: 0,
		lvl: 1,
		xp: 0,
		xpNeeded: 50,
		bulletArr: [],
		

		init: function(){
			img = new Image();
			img.onload = function () { imgReady = true; };
			img.src = "../dungeon/web/img/sprites/player/player.png";
			
			// grab texturePacker's sprite coords
			$.get("../dungeon/web/img/sprites/player/player.xml", function(xml){
				var wrap = $(xml).find("sprite");
				
				$(wrap).each(function(){
					var name = $(this).attr('n'),
						x = $(this).attr('x'),
						y = $(this).attr('y');
					
					name = name.substring(0, name.length-4);
					spriteArr[name] = {x: x, y: y};
				});
				
			});
			
			input = HeroInputComponent();
			physics = HeroPhysicsComponent();
			graphics = HeroGraphicsComponent();

            // setup hero bounding box for collision detection
			$.extend(hero, new SAT.Box(new SAT.Vector(0, 0), hero.w, hero.h).toPolygon());
		},
		
		update: function () {
		    input.check();                      // updates velocities
			physics.updatePosition();          // updates positions
			physics.checkCollision();          // fix positions
			
			checkHealth();
			getSpritePos();
		},
	
		render: function () {
		    drawHero();
		    graphics.drawBullets();
		    drawAfterHero();
		}
	};
})();

/// <reference path="../linker.js" />

/*
    The graphics component of hero.
*/
var HeroGraphicsComponent = function () {

    var shurikenReady = false,
        shuriken = new Image()
    ;

    shuriken.src = "img/shuriken.png";
    shuriken.onload = function () {
        shurikenReady = true;
    };

    return {
        drawBullets: function(){
		    for(var i=0; i < hero.bulletArr.length; ++i){
		        var dirOffset = hero.bulletArr[i].dirR ?
    							    hero.w : 
    							    0;
	            
		        hero.bulletArr[i].deg += 5;
            
		        if (shurikenReady) {
		            Graphics.drawRotate(
                        shuriken,
                        hero.bulletArr[i].pos.x + dirOffset,
                        hero.bulletArr[i].pos.y + 20,
                        hero.bulletArr[i].deg
                    );
		        }
		    }
        }
    };
};

/// <reference path="../linker.js" />

// The physics component of hero.
var HeroPhysicsComponent = function () {

    function projectileHandler() {
        for (var i = 0; i < hero.bulletArr.length; ++i) {
            hero.bulletArr[i].pos.x += hero.bulletArr[i].dirR ? Shuriken.speed : -Shuriken.speed;   // update position

            if (hero.bulletArr[i].pos.x > FULLW || hero.bulletArr[i].pos.x < 0) {		    // projectile and screen
                hero.bulletArr.splice(i, 1); // remove ith item
            }
        }
    }

    function screenCollision() {
        if (hero.pos.y < -hero.h) {                 // feet above top of screen
            hero.pos.y = -hero.h;
            hero.vY = 0;
        }
        else if (hero.pos.y >= FULLH + hero.h*2) {  // 2x below bottom of screen
            if (!game.over) {
                utils.deathSequence();
            }
        }

        if (hero.pos.x < 0) { 						// left
            hero.pos.x = 0;
            hero.vX = 0;
        }
        else if (hero.pos.x > (FULLW - hero.w)) { 	// right 
            hero.pos.x = FULLW - hero.w;
            hero.vX = 0;
        }
    }

    function levelCollision() {
        hero.isOnObj = false;   // prevents jumping after walking off platform

        Physics.testObjObjs(hero, function (r) {
            if (r.overlapN.y === 1) {                       // on top
                hero.isOnObj = true;
                hero.isJumping = false;
                hero.vY = 0;
            }
            else if (r.overlapN.y === -1) {                 // on bot
                hero.vY = 0;
            }
        });
        
        if (hero.isHolding) {
            if (hero.vX === 0) {
                hero.curItem.pos.x = hero.pos.x + 2;
                hero.curItem.pos.y = hero.pos.y + 11;
            }
            else {
                hero.curItem.pos.x = hero.pos.x + ((hero.dir === Dir.RIGHT) ? 22 : -22);
                hero.curItem.pos.y = hero.pos.y + 5;
            }
        }

        Physics.testHeroItems(function (r, idx) {
            if (r.b.type === JQObject.CRATE) {      // TODO: make more generic
                if (r.overlapN.y === 1) {           // on top
                    hero.pos.y -= r.overlapV.y;
                    hero.isOnObj = true;
                    hero.isJumping = false;
                    hero.vY = 0;
                }
                else if (!hero.isHolding && r.b.grabbable && !r.b.recentlyHeld) {
                    if (r.b.isOnObj === true) {
                        r.b.isOnObj = false;

                        if (r.b.onObj !== null) {
                            r.b.onObj.grabbable = true;
                            r.b.onObj = null;
                        }
                    }

                    r.b.isBeingHeld = true;

                    hero.curItem = r.b;
                    hero.isHolding = true;

                    level.items.splice(idx, 1);
                }
            }
            else {
                audio.itemPickedUp.play();

                if (r.b.type === JQObject.SACK) {
                    hero.ammo += r.b.val;
                }
                else if (r.b.type === JQObject.CASH) {
                    hero.cash += r.b.val;
                }

                level.items.splice(idx, 1);
            }
        });
    }

    return {
        updatePosition: function (){	
            // TODO: buggy at edges, quickly changing direction incorrectly causes an updateView()
            
            if(((hero.dir === Dir.RIGHT && hero.pos.x >= (HALFW + 35)) ||
               (hero.dir === Dir.LEFT && hero.pos.x <= (HALFW - 45))) &&
               (hero.lvlX + hero.vX >= 0) &&
               (hero.lvlX + hero.vX <= level.curLvl.width - FULLW)
            ){
                hero.lvlX += hero.vX;
                level.updateView();
            }
            else {
                hero.pos.x += hero.vX;
            }

            if (!hero.onLadder) {
                hero.pos.y += hero.vY;
            }
        },

        checkCollision: function () {
	        projectileHandler();	// projectiles and screen
            screenCollision();	    // hero and screen
            levelCollision();
        }
    };
};

/// <reference path="../linker.js" />

var KeyCode = Object.freeze({
    ENTER: 13,
    CTRL: 17,
    A: 65,
    D: 68,
    F: 70,
    H: 72,
    J: 74,
    K: 75,
    M: 77,
    O: 79,
    R: 82,
    S: 83,
    W: 87,
    EMPTY: -1,
    SPACEBAR: 32
});

// The input component of hero.
var HeroInputComponent = function () {

    var maxVx = 2.6,
        maxVy = 10
    ;

    // global key vars
    keysDown = {};
    lastKeyDown = -1;

    $(document).on("click", ".resize", function () {
        if ($(this).hasClass("off")) {
            $(this).removeClass("off").addClass("on");
            $(this).children("span").removeClass("icon-expand").addClass("icon-contract");
        }
        else if ($(this).hasClass("on")) {
            $(this).removeClass("on").addClass("off");
            $(this).children("span").removeClass("icon-contract").addClass("icon-expand");
        }

        utils.toggleFullScreen();
    });

    addEventListener("keydown", function (e) {
        if (e.keyCode === KeyCode.SPACEBAR)
            e.preventDefault(); 			    // scrolling to bottom of page
        else if (e.keyCode === KeyCode.M)	    // mute/unmute
            audio.handleMuteButton();
        else if (e.keyCode === KeyCode.F)        // resize
            $(".resize").trigger("click");
        else if (e.keyCode === KeyCode.K &&		// jump; TODO: move to check() function
               (!hero.isJumping && ((lastKeyDown !== KeyCode.K) || !(keysDown[KeyCode.K]))) &&
               hero.isOnObj
        ) {
            audio.jump.play();
            hero.vY = 0;
            hero.isJumping = true;
            hero.isOnObj = false;
        }
        else if (e.keyCode === KeyCode.J &&		// shoot; TODO: move to check() function
                ((lastKeyDown != KeyCode.J) || !(keysDown[KeyCode.J]))
        ) {
            if (hero.ammo > 0 && !hero.isHolding) {
                audio.play(audio.effort);

                hero.bulletArr[hero.bulletArr.length] = {
                    pos: {
                        x: hero.pos.x,
                        y: hero.pos.y
                    },
                    w: Shuriken.w,
                    h: Shuriken.h,
                    dirR: (hero.dir === Dir.RIGHT),
                    deg: 0
                };

                --hero.ammo;
            }
        }
        else if (e.keyCode == KeyCode.O) {      // options
            utils.toggleMenu();
        }

        lastKeyDown = e.keyCode;
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);


    return {
        check: function () {
            var doGravity = false;

            if (hero.isJumping) {
                if (hero.jumpMod > 0) {
                    hero.vY -= hero.aY * hero.jumpMod--;
                }
                else {
                    doGravity = true;
                }
            }
            else {
                hero.jumpMod = hero.jumpMod0;
                doGravity = true;
            }

            if (doGravity && !hero.onLadder) {
                var fixVy = hero.vY + game.gravity*2;

                if (fixVy > maxVy) {
                    hero.vY = maxVy;
                }
                else {
                    hero.vY = fixVy;
                }
            }


            // --------- keys pressed --------
            var leftOrRight = false;
            // left
            if(keysDown[KeyCode.A]){
                hero.vX = (Math.abs(hero.vX - hero.aX) > maxVx) ? -maxVx : (hero.vX - hero.aX);
                hero.dir = Dir.LEFT;
                leftOrRight = true;
            }

            // right
            if (keysDown[KeyCode.D]) {
                hero.vX = (Math.abs(hero.vX + hero.aX) > maxVx) ? maxVx : (hero.vX + hero.aX);
                hero.dir = Dir.RIGHT;
                leftOrRight = true;
            }
	    
            if(Math.abs(hero.vX) < hero.aX){    
                hero.vX = 0;
            }
            else if(!leftOrRight){
                //hero.vX += (hero.vX > 0) ? -game.friction : game.friction;
                hero.vX /= 1.26;
            }
	    

            // up
            if (keysDown[KeyCode.W]) {
                if (hero.onLadder) {
                    --hero.pos.y;
                }
            }

            // down
            if (keysDown[KeyCode.S]) {
                if (hero.onLadder) {
                    ++hero.pos.y;
                }
            }

	    
            // drop 
            if (keysDown[KeyCode.SPACEBAR]) {
                if (hero.isHolding) {
                    hero.isHolding = false;
                    hero.curItem.isBeingHeld = false;
                    hero.curItem.recentlyHeld = true;       // TODO: fix api
                    level.items.push(hero.curItem);
                    hero.curItem = null;
                }
            }

		
            //----- heal (h)
            if(keysDown[KeyCode.H]){
                if(hero.medKits > 0 && hero.health < hero.maxHealth){
                    ++hero.health;
                    --hero.medKits;

                    audio.play(audio.enchant, true);
                }
            }
		
		
            // restore
            if(keysDown[KeyCode.R] && !(keysDown[KeyCode.CTRL])){
                if(hero.manaKits > 0 && hero.mana < hero.maxMana){
                    ++hero.mana;
                    --hero.manaKits;

                    audio.play(audio.enchant, true);
                }
            }
		
        }
    };
};

/// <reference path="linker.js" />

var Main = (function () {

    function setCanvasGlobals() {
        canvas = $("canvas")[0];
        ctx = canvas.getContext("2d");
        
        FULLW = canvas.width;
        FULLH = canvas.height - game.padHUD;
        HALFW = FULLW / 2;
        HALFH = FULLH / 2;
    }

    function loadingScreen() {
        ctx.fillStyle = "#e1e1e1";
        ctx.font = "25px 'Press Start 2P'";
        ctx.fillText("LOADING...", HALFW - 80, HALFH + 20);
    }

    function debug() {
        // dev enviroment
        if (location.host === "jon") {
            window.DEBUG = true;

            // speed up canvas transition
            $(canvas).css({"transition": "opacity 0.01s"});

            // skip start screen
            lastKeyDown = KeyCode.ENTER;

            // mute audio
            audio.handleMuteButton();
        }
    }


    return {
        init: function () {
            setCanvasGlobals();
            loadingScreen();

            hero.init();
            audio.init();
            level.init();
            HUD.init();

            // wait for google font
            $(document).on("fontLoaded", function () {
                // game timer
                setInterval(function () {
                    ++game.actualTime;
                }, 1000);

                // start the game
                game.start();


                //debug();
            });
        }
    }
})();

$(function () {
    // load font
    window.WebFontConfig = {
        google: {
            families: ['Press Start 2P']
        },
        active: function () {
            $(document).trigger("fontLoaded");
        },
        inactive: function () {
            alert("There was a problem loading a font from google, some text may not render correctly (refreshing the page may fix the issue).");
            $(document).trigger("fontLoaded");
        }
    };

    (function () {
        var wf = document.createElement("script");
        wf.src = "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
        wf.type = "text/javascript";
        wf.async = "true";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(wf, s);
    })();


    Main.init();
});

//# sourceMappingURL=pageJonsQuest.js.map