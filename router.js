!function(e){function t(t){for(var r,o,a=t[0],s=t[1],i=0,u=[];i<a.length;i++)o=a[i],n[o]&&u.push(n[o][0]),n[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(l&&l(t);u.length;)u.shift()()}var r={},n={19:0};function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(e){var t=[],r=n[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise(function(t,o){r=n[e]=[t,o]});t.push(r[2]=a);var s,i=document.createElement("script");i.charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.src=function(e){return o.p+""+({0:"vendors~0-a-side-js~1-gel-grid-js~10-page-playground-js~11-page-portfolio-js~12-page-starry-backgrou~a0534652",1:"0-a-side-js",2:"3-head-er-js",3:"4-i-con-js",4:"1-gel-grid-js",5:"10-page-playground-js",6:"11-page-portfolio-js",7:"12-page-starry-background-js",8:"13-styles-base-js",9:"14-styles-carousel-js",10:"15-styles-page-js",11:"16-styles-vars-js",12:"2-gel-item-js",13:"5-page-ball-pit-js",14:"6-page-breakdancing-cube-js",15:"7-page-games-js",16:"8-page-grid-js",17:"9-page-home-js"}[e]||e)+".js"}(e),s=function(t){i.onerror=i.onload=null,clearTimeout(l);var r=n[e];if(0!==r){if(r){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,s=new Error("Loading chunk "+e+" failed.\n("+o+": "+a+")");s.type=o,s.request=a,r[1](s)}n[e]=void 0}};var l=setTimeout(function(){s({type:"timeout",target:i})},12e4);i.onerror=i.onload=s,document.head.appendChild(i)}return Promise.all(t)},o.m=e,o.c=r,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var a=window.webpackJsonp=window.webpackJsonp||[],s=a.push.bind(a);a.push=t,a=a.slice();for(var i=0;i<a.length;i++)t(a[i]);var l=s;o(o.s=7)}({7:function(e,t,r){const n={home:"page-home",games:"page-games",playground:"page-playground","playground/ball-pit":"page-ball-pit","playground/breakdancing-cube":"page-breakdancing-cube","playground/starry-background":"page-starry-background",portfolio:"page-portfolio",grid:"page-grid"};class o{static route(e){e=e.substring(1),o.resetController(e),window.page=e,document.querySelector("head-er").setAttribute("page",e),document.querySelector("a-side").setAttribute("page",e);const t=n[e]?n[e]:n.home;this.loadComponent(t)}static async loadComponent(e){await r(8)(`./${e}.js`)&&(document.querySelector("main").innerHTML=`<${e}></${e}>`)}static rmMeta(e){const t=document.head.querySelector(e);t&&document.head.removeChild(t)}static resetController(e){scrollTo(0,0),document.querySelector("main").innerHTML="",document.title="",o.rmMeta("meta[name=description]"),o.rmMeta("meta[name=keywords]"),window.dispatchEvent(new CustomEvent("route",{detail:e}))}}window.onhashchange=(()=>o.route(location.hash)),WebComponents.waitFor(()=>{Promise.all([r.e(0),r.e(3)]).then(r.bind(null,4)),Promise.all([r.e(0),r.e(2)]).then(r.bind(null,5)),Promise.all([r.e(0),r.e(1)]).then(r.bind(null,6)),o.route(location.hash)}),window.isDev||(navigator.serviceWorker.register("sw.js"),r.e(21).then(r.t.bind(null,17,7)))},8:function(e,t,r){var n={"./a-side.js":[6,0,1],"./gel-grid.js":[15,0,4],"./gel-item.js":[16,0,12],"./head-er.js":[5,0,2],"./i-con.js":[4,0,3],"./page-ball-pit.js":[24,0,13],"./page-breakdancing-cube.js":[18,0,14],"./page-games.js":[19,0,15],"./page-grid.js":[20,0,16],"./page-home.js":[21,0,17],"./page-playground.js":[22,0,5],"./page-portfolio.js":[23,0,6],"./page-starry-background.js":[25,0,7],"./styles/base.js":[11,0,8],"./styles/carousel.js":[14,0,9],"./styles/page.js":[12,0,10],"./styles/vars.js":[13,11]};function o(e){if(!r.o(n,e))return Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=n[e],o=t[0];return Promise.all(t.slice(1).map(r.e)).then(function(){return r(o)})}o.keys=function(){return Object.keys(n)},o.id=8,e.exports=o}});