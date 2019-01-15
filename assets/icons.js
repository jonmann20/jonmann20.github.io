!function(t){var e={};function n(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/assets/",n(n.s=31)}([function(t,e,n){"use strict";n.d(e,"d",function(){return i}),n.d(e,"g",function(){return s}),n.d(e,"b",function(){return r}),n.d(e,"c",function(){return o}),n.d(e,"i",function(){return a}),n.d(e,"e",function(){return l}),n.d(e,"f",function(){return c}),n.d(e,"a",function(){return u}),n.d(e,"h",function(){return d});n(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function i(t){return t.indexOf(".")>=0}function s(t){let e=t.indexOf(".");return-1===e?t:t.slice(0,e)}function r(t,e){return 0===t.indexOf(e+".")}function o(t,e){return 0===e.indexOf(t+".")}function a(t,e,n){return e+n.slice(t.length)}function l(t,e){return t===e||r(t,e)||o(t,e)}function c(t){if(Array.isArray(t)){let e=[];for(let n=0;n<t.length;n++){let i=t[n].toString().split(".");for(let t=0;t<i.length;t++)e.push(i[t])}return e.join(".")}return t}function h(t){return Array.isArray(t)?c(t).split("."):t.toString().split(".")}function u(t,e,n){let i=t,s=h(e);for(let t=0;t<s.length;t++){if(!i)return;i=i[s[t]]}return n&&(n.path=s.join(".")),i}function d(t,e,n){let i=t,s=h(e),r=s[s.length-1];if(s.length>1){for(let t=0;t<s.length-1;t++){if(!(i=i[s[t]]))return}i[r]=n}else i[e]=n;return s.join(".")}},function(t,e,n){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/window.JSCompiler_renameProperty=function(t,e){return t}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});n(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i=0;function s(){}s.prototype.__mixinApplications,s.prototype.__mixinSet;const r=function(t){let e=t.__mixinApplications;e||(e=new WeakMap,t.__mixinApplications=e);let n=i++;return function(i){let s=i.__mixinSet;if(s&&s[n])return i;let r=e,o=r.get(i);o||(o=t(i),r.set(i,o));let a=Object.create(o.__mixinSet||s||null);return a[n]=!0,o.__mixinSet=a,o}}},function(t,e,n){"use strict";n.d(e,"b",function(){return l}),n.d(e,"a",function(){return c});n(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i=0,s=0,r=[],o=0,a=document.createTextNode("");new window.MutationObserver(function(){const t=r.length;for(let e=0;e<t;e++){let t=r[e];if(t)try{t()}catch(t){setTimeout(()=>{throw t})}}r.splice(0,t),s+=t}).observe(a,{characterData:!0});const l={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},c={run:t=>(a.textContent=o++,r.push(t),i++),cancel(t){const e=t-s;if(e>=0){if(!r[e])throw new Error("invalid async handle: "+t);r[e]=null}}}},function(t,e,n){"use strict";n.d(e,"c",function(){return s}),n.d(e,"d",function(){return r}),n.d(e,"b",function(){return o}),n.d(e,"e",function(){return a}),n.d(e,"a",function(){return l});n(1);var i=n(5);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.ShadyDOM,Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let s=Object(i.a)(document.baseURI||window.location.href);let r=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;let o=!1;let a=!1;let l=!1},function(t,e,n){"use strict";n.d(e,"c",function(){return a}),n.d(e,"b",function(){return l}),n.d(e,"a",function(){return c});n(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i,s,r=/(url\()([^)]*)(\))/g,o=/(^\/)|(^#)|(^[\w-\d]*:)/;function a(t,e){if(t&&o.test(t))return t;if(void 0===i){i=!1;try{const t=new URL("b","http://a");t.pathname="c%20d",i="http://a/c%20d"===t.href}catch(t){}}return e||(e=document.baseURI||window.location.href),i?new URL(t,e).href:(s||((s=document.implementation.createHTMLDocument("temp")).base=s.createElement("base"),s.head.appendChild(s.base),s.anchor=s.createElement("a"),s.body.appendChild(s.anchor)),s.base.href=e,s.anchor.href=t,s.anchor.href||t)}function l(t,e){return t.replace(r,function(t,n,i,s){return n+"'"+a(i.replace(/["']/g,""),e)+"'"+s})}function c(t){return t.substring(0,t.lastIndexOf("/")+1)}},function(t,e,n){"use strict";n(1),n(4);var i=n(25),s=n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function r(t){return"slot"===t.localName}class o{static getFlattenedNodes(t){return r(t)?(t=t).assignedNodes({flatten:!0}):Array.from(t.childNodes).map(t=>r(t)?(t=t).assignedNodes({flatten:!0}):[t]).reduce((t,e)=>t.concat(e),[])}constructor(t,e){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=t,this.callback=e,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=(()=>{this._schedule()}),this.connect(),this._schedule()}connect(){r(this._target)?this._listenSlots([this._target]):this._target.children&&(this._listenSlots(this._target.children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,t=>{this._processMutations(t)}):(this._nativeChildrenObserver=new MutationObserver(t=>{this._processMutations(t)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){r(this._target)?this._unlistenSlots([this._target]):this._target.children&&(this._unlistenSlots(this._target.children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,s.a.run(()=>this.flush()))}_processMutations(t){this._processSlotMutations(t),this.flush()}_processSlotMutations(t){if(t)for(let e=0;e<t.length;e++){let n=t[e];n.addedNodes&&this._listenSlots(n.addedNodes),n.removedNodes&&this._unlistenSlots(n.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let t={target:this._target,addedNodes:[],removedNodes:[]},e=this.constructor.getFlattenedNodes(this._target),n=Object(i.a)(e,this._effectiveNodes);for(let e,i=0;i<n.length&&(e=n[i]);i++)for(let n,i=0;i<e.removed.length&&(n=e.removed[i]);i++)t.removedNodes.push(n);for(let i,s=0;s<n.length&&(i=n[s]);s++)for(let n=i.index;n<i.index+i.addedCount;n++)t.addedNodes.push(e[n]);this._effectiveNodes=e;let s=!1;return(t.addedNodes.length||t.removedNodes.length)&&(s=!0,this.callback.call(this._target,t)),s}_listenSlots(t){for(let e=0;e<t.length;e++){let n=t[e];r(n)&&n.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(t){for(let e=0;e<t.length;e++){let n=t[e];r(n)&&n.removeEventListener("slotchange",this._boundSchedule)}}}n(10),n(9);n.d(e,"b",function(){return c}),n.d(e,"a",function(){return d});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a=Element.prototype,l=a.matches||a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector,c=function(t,e){return l.call(t,e)};class h{constructor(t){this.node=t}observeNodes(t){return new o(this.node,t)}unobserveNodes(t){t.disconnect()}notifyObserver(){}deepContains(t){if(this.node.contains(t))return!0;let e=t,n=t.ownerDocument;for(;e&&e!==n&&e!==this.node;)e=e.parentNode||e.host;return e===this.node}getOwnerRoot(){return this.node.getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?this.node.assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let t=[],e=this.node.assignedSlot;for(;e;)t.push(e),e=e.assignedSlot;return t}importNode(t,e){return(this.node instanceof Document?this.node:this.node.ownerDocument).importNode(t,e)}getEffectiveChildNodes(){return o.getFlattenedNodes(this.node)}queryDistributedElements(t){let e=this.getEffectiveChildNodes(),n=[];for(let i,s=0,r=e.length;s<r&&(i=e[s]);s++)i.nodeType===Node.ELEMENT_NODE&&c(i,t)&&n.push(i);return n}get activeElement(){let t=this.node;return void 0!==t._activeElement?t._activeElement:t.activeElement}}class u{constructor(t){this.event=t}get rootTarget(){return this.event.composedPath()[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}h.prototype.cloneNode,h.prototype.appendChild,h.prototype.insertBefore,h.prototype.removeChild,h.prototype.replaceChild,h.prototype.setAttribute,h.prototype.removeAttribute,h.prototype.querySelector,h.prototype.querySelectorAll,h.prototype.parentNode,h.prototype.firstChild,h.prototype.lastChild,h.prototype.nextSibling,h.prototype.previousSibling,h.prototype.firstElementChild,h.prototype.lastElementChild,h.prototype.nextElementSibling,h.prototype.previousElementSibling,h.prototype.childNodes,h.prototype.children,h.prototype.classList,h.prototype.textContent,h.prototype.innerHTML,function(t,e){for(let n=0;n<e.length;n++){let i=e[n];t[i]=function(){return this.node[i].apply(this.node,arguments)}}}(h.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),function(t,e){for(let n=0;n<e.length;n++){let i=e[n];Object.defineProperty(t,i,{get:function(){return this.node[i]},configurable:!0})}}(h.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(t,e){for(let n=0;n<e.length;n++){let i=e[n];Object.defineProperty(t,i,{get:function(){return this.node[i]},set:function(t){this.node[i]=t},configurable:!0})}}(h.prototype,["textContent","innerHTML"]);const d=function(t){if(!(t=t||document).__domApi){let e;e=t instanceof Event?new u(t):new h(t),t.__domApi=e}return t.__domApi}},function(t,e,n){"use strict";n.d(e,"b",function(){return i}),n.d(e,"a",function(){return o});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const i=!(window.ShadyDOM&&window.ShadyDOM.inUse);let s;function r(t){s=(!t||!t.shimcssproperties)&&(i||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?s=window.ShadyCSS.nativeCss:window.ShadyCSS?(r(window.ShadyCSS),window.ShadyCSS=void 0):r(window.WebComponents&&window.WebComponents.flags);const o=s},function(t,e,n){"use strict";n.d(e,"c",function(){return i}),n.d(e,"b",function(){return s}),n.d(e,"a",function(){return r});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const i=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,s=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,r=/@media\s(.*)/},function(t,e,n){"use strict";n.d(e,"a",function(){return i});n(1),n(2),n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class i{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,this._callback()})}cancel(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,n){return t instanceof i?t.cancel():t=new i,t.setConfig(e,n),t}}},function(t,e,n){"use strict";n.d(e,"a",function(){return s}),n.d(e,"b",function(){return o});n(1),n(9);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let i=[];const s=function(t){i.push(t)};function r(){const t=Boolean(i.length);for(;i.length;)try{i.shift().flush()}catch(t){setTimeout(()=>{throw t})}return t}const o=function(){let t,e;do{t=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),e=r()}while(t||e)}},function(t,e,n){"use strict";n.d(e,"c",function(){return s}),n.d(e,"b",function(){return r}),n.d(e,"a",function(){return o});var i=n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function s(t,e){for(let n in e)null===n?t.style.removeProperty(n):t.style.setProperty(n,e[n])}function r(t,e){const n=window.getComputedStyle(t).getPropertyValue(e);return n?n.trim():""}function o(t){const e=i.b.test(t)||i.c.test(t);return i.b.lastIndex=0,i.c.lastIndex=0,e}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});n(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class i{constructor(t){this.value=t.toString()}toString(){return this.value}}function s(t){if(t instanceof i)return t.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${t}`)}const r=function(t,...e){const n=document.createElement("template");return n.innerHTML=e.reduce((e,n,r)=>e+function(t){if(t instanceof HTMLTemplateElement)return t.innerHTML;if(t instanceof i)return s(t);throw new Error(`non-template value passed to Polymer's html function: ${t}`)}(n)+t[r+1],t[0]),n}},function(t,e,n){"use strict";var i=n(21);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let s={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0};function r(t,e){if(!t)return e=e;e=Object(i.a)(e),Array.isArray(t)||(t=[t]);let n=e.prototype.behaviors;return e=function t(e,n){for(let i=0;i<e.length;i++){let s=e[i];s&&(n=Array.isArray(s)?t(s,n):o(s,n))}return n}(t=function t(e,n,i){n=n||[];for(let s=e.length-1;s>=0;s--){let r=e[s];r?Array.isArray(r)?t(r,n):n.indexOf(r)<0&&(!i||i.indexOf(r)<0)&&n.unshift(r):console.warn("behavior is null, check for missing or 404 import")}return n}(t,null,n),e),n&&(t=n.concat(t)),e.prototype.behaviors=t,e}function o(t,e){class n extends e{static get properties(){return t.properties}static get observers(){return t.observers}created(){super.created(),t.created&&t.created.call(this)}_registered(){super._registered(),t.beforeRegister&&t.beforeRegister.call(Object.getPrototypeOf(this)),t.registered&&t.registered.call(Object.getPrototypeOf(this))}_applyListeners(){if(super._applyListeners(),t.listeners)for(let e in t.listeners)this._addMethodEventListenerToNode(this,e,t.listeners[e])}_ensureAttributes(){if(t.hostAttributes)for(let e in t.hostAttributes)this._ensureAttribute(e,t.hostAttributes[e]);super._ensureAttributes()}ready(){super.ready(),t.ready&&t.ready.call(this)}attached(){super.attached(),t.attached&&t.attached.call(this)}detached(){super.detached(),t.detached&&t.detached.call(this)}attributeChanged(e,n,i){super.attributeChanged(e,n,i),t.attributeChanged&&t.attributeChanged.call(this,e,n,i)}}n.generatedFrom=t;for(let e in t)if(!(e in s)){let i=Object.getOwnPropertyDescriptor(t,e);i&&Object.defineProperty(n.prototype,e,i)}return n}n(1);n.d(e,"a",function(){return a});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a=function(t){let e;return e="function"==typeof t?t:a.Class(t),customElements.define(e.is,e),e};a.Class=function(t,e){t||console.warn("Polymer's Class function requires `info` argument");const n=t.behaviors?r(t.behaviors,HTMLElement):Object(i.a)(HTMLElement),s=o(t,e?e(n):n);return s.is=t.is,s}},function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"a",function(){return a});n(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const i={},s=/-[a-z]/g,r=/([A-Z])/g;function o(t){return i[t]||(i[t]=t.indexOf("-")<0?t:t.replace(s,t=>t[1].toUpperCase()))}function a(t){return i[t]||(i[t]=t.replace(r,"-$1").toLowerCase())}},function(t,e,n){"use strict";n(1);var i=n(4),s=n(2),r=n(18),o=n(5),a=n(19),l=n(16),c=n(23);const h=Object(s.a)(t=>{const e=Object(c.a)(t);function n(t){const e=Object.getPrototypeOf(t);return e.prototype instanceof s?e:null}function i(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",t))){let e=null;if(t.hasOwnProperty(JSCompiler_renameProperty("properties",t))){const n=t.properties;n&&(e=
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function(t){const e={};for(let n in t){const i=t[n];e[n]="function"==typeof i?{type:i}:i}return e}(n))}t.__ownProperties=e}return t.__ownProperties}class s extends e{static get observedAttributes(){const t=this._properties;return t?Object.keys(t).map(t=>this.attributeNameForProperty(t)):[]}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const t=n(this);t&&t.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const t=i(this);t&&this.createProperties(t)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const t=n(this);this.__properties=Object.assign({},t&&t._properties,i(this))}return this.__properties}static typeForProperty(t){const e=this._properties[t];return e&&e.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return s});n.d(e,"a",function(){return d});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const u="3.0.5",d=Object(s.a)(t=>{const e=h(Object(l.a)(t));return class extends e{static get polymerElementVersion(){return u}static _finalizeClass(){var t;super._finalizeClass(),this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&this.is&&(t=this.prototype,p.push(t));const e=((n=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",n))||(n.__ownObservers=n.hasOwnProperty(JSCompiler_renameProperty("observers",n))?n.observers:null),n.__ownObservers);var n;e&&this.createObservers(e,this._properties);let i=this.template;i&&("string"==typeof i?(console.error("template getter must return HTMLTemplateElement"),i=null):i=i.cloneNode(!0)),this.prototype._template=i}static createProperties(t){for(let r in t)e=this.prototype,n=r,i=t[r],s=t,i.computed&&(i.readOnly=!0),i.computed&&!e._hasReadOnlyEffect(n)&&e._createComputedProperty(n,i.computed,s),i.readOnly&&!e._hasReadOnlyEffect(n)&&e._createReadOnlyProperty(n,!i.computed),i.reflectToAttribute&&!e._hasReflectEffect(n)&&e._createReflectedProperty(n),i.notify&&!e._hasNotifyEffect(n)&&e._createNotifyingProperty(n),i.observer&&e._createPropertyObserver(n,i.observer,s[i.observer]),e._addPropertyToAttributeMap(n);var e,n,i,s}static createObservers(t,e){const n=this.prototype;for(let i=0;i<t.length;i++)n._createMethodObserver(t[i],e)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(t){let e=null;if(t&&(!i.e||i.a)&&(e=a.a.import(t,"template"),i.e&&!e))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${t}`);return e}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(t){this._template=t}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const t=this.importMeta;if(t)this._importPath=Object(o.a)(t.url);else{const t=a.a.import(this.is);this._importPath=t&&t.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){0,this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=i.c,this.importPath=this.constructor.importPath;let t=function(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",t))){t.__propertyDefaults=null;let e=t._properties;for(let n in e){let i=e[n];"value"in i&&(t.__propertyDefaults=t.__propertyDefaults||{},t.__propertyDefaults[n]=i)}}return t.__propertyDefaults}(this.constructor);if(t)for(let e in t){let n=t[e];if(!this.hasOwnProperty(e)){let t="function"==typeof n.value?n.value.call(this):n.value;this._hasAccessor(e)?this._setPendingProperty(e,t,!0):this[e]=t}}}static _processStyleText(t,e){return Object(o.b)(t,e)}static _finalizeTemplate(t){const e=this.prototype._template;if(e&&!e.__polymerFinalized){e.__polymerFinalized=!0;const n=this.importPath;!function(t,e,n,i){const s=e.content.querySelectorAll("style"),o=Object(r.c)(e),a=Object(r.b)(n),l=e.content.firstElementChild;for(let n=0;n<a.length;n++){let s=a[n];s.textContent=t._processStyleText(s.textContent,i),e.content.insertBefore(s,l)}let c=0;for(let e=0;e<o.length;e++){let n=o[e],r=s[c];r!==n?(n=n.cloneNode(!0),r.parentNode.insertBefore(n,r)):c++,n.textContent=t._processStyleText(n.textContent,i)}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(e,n)}(this,e,t,n?Object(o.c)(n):""),this.prototype._bindTemplate(e)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(t){if(this.attachShadow)return t?(this.shadowRoot||this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t),this.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(t){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,t)}resolveUrl(t,e){return!e&&this.importPath&&(e=Object(o.c)(this.importPath)),Object(o.c)(t,e)}static _parseTemplateContent(t,e,n){return e.dynamicFns=e.dynamicFns||this._properties,super._parseTemplateContent(t,e,n)}}});const p=[]},function(t,e,n){"use strict";n(1);var i=n(2),s=n(0),r=n(14),o=n(22);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a={"dom-if":!0,"dom-repeat":!0};function l(t){let e=t.getAttribute("is");if(e&&a[e]){let n=t;for(n.removeAttribute("is"),t=n.ownerDocument.createElement(e),n.parentNode.replaceChild(t,n),t.appendChild(n);n.attributes.length;)t.setAttribute(n.attributes[0].name,n.attributes[0].value),n.removeAttribute(n.attributes[0].name)}return t}function c(t,e){let n=e.parentInfo&&c(t,e.parentInfo);if(!n)return t;for(let t=n.firstChild,i=0;t;t=t.nextSibling)if(e.parentIndex===i++)return t}function h(t,e,n,i){i.id&&(e[i.id]=n)}function u(t,e,n){if(n.events&&n.events.length)for(let i,s=0,r=n.events;s<r.length&&(i=r[s]);s++)t._addMethodEventListenerToNode(e,i.name,i.value,t)}function d(t,e,n){n.templateInfo&&(e._templateInfo=n.templateInfo)}const p=Object(i.a)(t=>{return class extends t{static _parseTemplate(t,e){if(!t._templateInfo){let n=t._templateInfo={};n.nodeInfoList=[],n.stripWhiteSpace=e&&e.stripWhiteSpace||t.hasAttribute("strip-whitespace"),this._parseTemplateContent(t,n,{parent:null})}return t._templateInfo}static _parseTemplateContent(t,e,n){return this._parseTemplateNode(t.content,e,n)}static _parseTemplateNode(t,e,n){let i,s=t;return"template"!=s.localName||s.hasAttribute("preserve-content")?"slot"===s.localName&&(e.hasInsertionPoint=!0):i=this._parseTemplateNestedTemplate(s,e,n)||i,s.firstChild&&(i=this._parseTemplateChildNodes(s,e,n)||i),s.hasAttributes&&s.hasAttributes()&&(i=this._parseTemplateNodeAttributes(s,e,n)||i),i}static _parseTemplateChildNodes(t,e,n){if("script"!==t.localName&&"style"!==t.localName)for(let i,s=t.firstChild,r=0;s;s=i){if("template"==s.localName&&(s=l(s)),i=s.nextSibling,s.nodeType===Node.TEXT_NODE){let n=i;for(;n&&n.nodeType===Node.TEXT_NODE;)s.textContent+=n.textContent,i=n.nextSibling,t.removeChild(n),n=i;if(e.stripWhiteSpace&&!s.textContent.trim()){t.removeChild(s);continue}}let o={parentIndex:r,parentInfo:n};this._parseTemplateNode(s,e,o)&&(o.infoIndex=e.nodeInfoList.push(o)-1),s.parentNode&&r++}}static _parseTemplateNestedTemplate(t,e,n){let i=this._parseTemplate(t,e);return(i.content=t.content.ownerDocument.createDocumentFragment()).appendChild(t.content),n.templateInfo=i,!0}static _parseTemplateNodeAttributes(t,e,n){let i=!1,s=Array.from(t.attributes);for(let r,o=s.length-1;r=s[o];o--)i=this._parseTemplateNodeAttribute(t,e,n,r.name,r.value)||i;return i}static _parseTemplateNodeAttribute(t,e,n,i,s){return"on-"===i.slice(0,3)?(t.removeAttribute(i),n.events=n.events||[],n.events.push({name:i.slice(3),value:s}),!0):"id"===i&&(n.id=s,!0)}static _contentForTemplate(t){let e=t._templateInfo;return e&&e.content||t.content}_stampTemplate(t){t&&!t.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(t);let e=this.constructor._parseTemplate(t),n=e.nodeInfoList,i=e.content||t.content,s=document.importNode(i,!0);s.__noInsertionPoint=!e.hasInsertionPoint;let r=s.nodeList=new Array(n.length);s.$={};for(let t,e=0,i=n.length;e<i&&(t=n[e]);e++){let n=r[e]=c(s,t);h(0,s.$,n,t),d(0,n,t),u(this,n,t)}return s=s}_addMethodEventListenerToNode(t,e,n,i){let s=function(t,e,n){return t=t._methodHost||t,function(e){t[n]?t[n](e,e.detail):console.warn("listener method `"+n+"` not defined")}}(i=i||t,0,n);return this._addEventListenerToNode(t,e,s),s}_addEventListenerToNode(t,e,n){t.addEventListener(e,n)}_removeEventListenerFromNode(t,e,n){t.removeEventListener(e,n)}}});var _=n(4);n.d(e,"a",function(){return Y});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let f=0;const m={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},y=/[A-Z]/;let g;function b(t,e){let n=t[e];if(n){if(!t.hasOwnProperty(e)){n=t[e]=Object.create(t[e]);for(let t in n){let e=n[t],i=n[t]=Array(e.length);for(let t=0;t<e.length;t++)i[t]=e[t]}}}else n=t[e]={};return n}function v(t,e,n,i,s,r){if(e){let o=!1,a=f++;for(let l in n)C(t,e,a,l,n,i,s,r)&&(o=!0);return o}return!1}function C(t,e,n,i,r,o,a,l){let c=!1,h=e[a?Object(s.g)(i):i];if(h)for(let e,s=0,u=h.length;s<u&&(e=h[s]);s++)e.info&&e.info.lastRun===n||a&&!P(i,e.trigger)||(e.info&&(e.info.lastRun=n),e.fn(t,i,r,o,e.info,a,l),c=!0);return c}function P(t,e){if(e){let n=e.name;return n==t||e.structured&&Object(s.b)(n,t)||e.wildcard&&Object(s.c)(n,t)}return!0}function w(t,e,n,i,s){let r="string"==typeof s.method?t[s.method]:s.method,o=s.property;r?r.call(t,t.__data[o],i[o]):s.dynamicFn||console.warn("observer method `"+s.method+"` not defined")}function O(t,e,n){let i=Object(s.g)(e);if(i!==e){return x(t,Object(r.a)(i)+"-changed",n[e],e),!0}return!1}function x(t,e,n,i){let s={value:n,queueProperty:!0};i&&(s.path=i),t.dispatchEvent(new CustomEvent(e,{detail:s}))}function S(t,e,n,i,r,o){let a=(o?Object(s.g)(e):e)!=e?e:null,l=a?Object(s.a)(t,a):t.__data[e];a&&void 0===l&&(l=n[e]),x(t,r.eventName,l,a)}function E(t,e,n,i,s){let r=t.__data[e];_.d&&(r=Object(_.d)(r,s.attrName,"attribute",t)),t._propertyToAttribute(e,s.attrName,r)}function T(t,e,n,i,s){let r=L(t,e,n,i,s),o=s.methodInfo;t.__dataHasAccessor&&t.__dataHasAccessor[o]?t._setPendingProperty(o,r,!0):t[o]=r}function N(t,e,n,i,s,o,a){n.bindings=n.bindings||[];let l={kind:i,target:s,parts:o,literal:a,isCompound:1!==o.length};if(n.bindings.push(l),function(t){return Boolean(t.target)&&"attribute"!=t.kind&&"text"!=t.kind&&!t.isCompound&&"{"===t.parts[0].mode}(l)){let{event:t,negate:e}=l.parts[0];l.listenerEvent=t||Object(r.a)(s)+"-changed",l.listenerNegate=e}let c=e.nodeInfoList.length;for(let n=0;n<l.parts.length;n++){let i=l.parts[n];i.compoundIndex=n,A(t,e,l,i,c)}}function A(t,e,n,i,s){if(!i.literal)if("attribute"===n.kind&&"-"===n.target[0])console.warn("Cannot set attribute "+n.target+' because "-" is not a valid attribute starting character');else{let r=i.dependencies,o={index:s,binding:n,part:i,evaluator:t};for(let n=0;n<r.length;n++){let i=r[n];"string"==typeof i&&((i=z(i)).wildcard=!0),t._addTemplatePropertyEffect(e,i.rootProperty,{fn:I,info:o,trigger:i})}}}function I(t,e,n,i,r,o,a){let l=a[r.index],c=r.binding,h=r.part;if(o&&h.source&&e.length>h.source.length&&"property"==c.kind&&!c.isCompound&&l.__isPropertyEffectsClient&&l.__dataHasAccessor&&l.__dataHasAccessor[c.target]){let i=n[e];e=Object(s.i)(h.source,c.target,e),l._setPendingPropertyOrPath(e,i,!1,!0)&&t._enqueueClient(l)}else{!function(t,e,n,i,s){s=function(t,e,n,i){if(n.isCompound){let s=t.__dataCompoundStorage[n.target];s[i.compoundIndex]=e,e=s.join("")}return"attribute"!==n.kind&&("textContent"!==n.target&&("value"!==n.target||"input"!==t.localName&&"textarea"!==t.localName)||(e=null==e?"":e)),e}(e,s,n,i),_.d&&(s=Object(_.d)(s,n.target,n.kind,e));if("attribute"==n.kind)t._valueToNodeAttribute(e,s,n.target);else{let i=n.target;e.__isPropertyEffectsClient&&e.__dataHasAccessor&&e.__dataHasAccessor[i]?e[m.READ_ONLY]&&e[m.READ_ONLY][i]||e._setPendingProperty(i,s)&&t._enqueueClient(e):t._setUnmanagedPropertyToNode(e,i,s)}}(t,l,c,h,r.evaluator._evaluateBinding(t,h,e,n,i,o))}}function k(t,e){if(e.isCompound){let n=t.__dataCompoundStorage||(t.__dataCompoundStorage={}),i=e.parts,s=new Array(i.length);for(let t=0;t<i.length;t++)s[t]=i[t].literal;let r=e.target;n[r]=s,e.literal&&"property"==e.kind&&(t[r]=e.literal)}}function j(t,e,n){if(n.listenerEvent){let i=n.parts[0];t.addEventListener(n.listenerEvent,function(t){!function(t,e,n,i,r){let o,a=t.detail,l=a&&a.path;l?(i=Object(s.i)(n,i,l),o=a&&a.value):o=t.currentTarget[n],o=r?!o:o,e[m.READ_ONLY]&&e[m.READ_ONLY][i]||!e._setPendingPropertyOrPath(i,o,!0,Boolean(l))||a&&a.queueProperty||e._invalidateProperties()}(t,e,n.target,i.source,i.negate)})}}function M(t,e,n,i,s,r){r=e.static||r&&("object"!=typeof r||r[e.methodName]);let o={methodName:e.methodName,args:e.args,methodInfo:s,dynamicFn:r};for(let s,r=0;r<e.args.length&&(s=e.args[r]);r++)s.literal||t._addPropertyEffect(s.rootProperty,n,{fn:i,info:o,trigger:s});r&&t._addPropertyEffect(e.methodName,n,{fn:i,info:o})}function L(t,e,n,i,s){let r=t._methodHost||t,o=r[s.methodName];if(o){let i=t._marshalArgs(s.args,e,n);return o.apply(r,i)}s.dynamicFn||console.warn("method `"+s.methodName+"` not defined")}const R=[],D=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function H(t){let e="";for(let n=0;n<t.length;n++){e+=t[n].literal||""}return e}function F(t){let e=t.match(/([^\s]+?)\(([\s\S]*)\)/);if(e){let t={methodName:e[1],static:!0,args:R};if(e[2].trim()){return function(t,e){return e.args=t.map(function(t){let n=z(t);return n.literal||(e.static=!1),n},this),e}(e[2].replace(/\\,/g,"&comma;").split(","),t)}return t}return null}function z(t){let e=t.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),n={name:e,value:"",literal:!1},i=e[0];switch("-"===i&&(i=e[1]),i>="0"&&i<="9"&&(i="#"),i){case"'":case'"':n.value=e.slice(1,-1),n.literal=!0;break;case"#":n.value=Number(e),n.literal=!0}return n.literal||(n.rootProperty=Object(s.g)(e),n.structured=Object(s.d)(e),n.structured&&(n.wildcard=".*"==e.slice(-2),n.wildcard&&(n.name=e.slice(0,-2)))),n}function B(t,e,n,i){let s=n+".splices";t.notifyPath(s,{indexSplices:i}),t.notifyPath(n+".length",e.length),t.__data[s]={indexSplices:null}}function q(t,e,n,i,s,r){B(t,e,n,[{index:i,addedCount:s,removed:r,object:e,type:"splice"}])}const Y=Object(i.a)(t=>{const e=p(Object(o.a)(t));class n extends e{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return m}_initializeProperties(){super._initializeProperties(),V.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(t){this.__data=Object.create(t),this.__dataPending=Object.create(t),this.__dataOld={}}_initializeInstanceProperties(t){let e=this[m.READ_ONLY];for(let n in t)e&&e[n]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[n]=this.__dataPending[n]=t[n])}_addPropertyEffect(t,e,n){this._createPropertyAccessor(t,e==m.READ_ONLY);let i=b(this,e)[t];i||(i=this[e][t]=[]),i.push(n)}_removePropertyEffect(t,e,n){let i=b(this,e)[t],s=i.indexOf(n);s>=0&&i.splice(s,1)}_hasPropertyEffect(t,e){let n=this[e];return Boolean(n&&n[t])}_hasReadOnlyEffect(t){return this._hasPropertyEffect(t,m.READ_ONLY)}_hasNotifyEffect(t){return this._hasPropertyEffect(t,m.NOTIFY)}_hasReflectEffect(t){return this._hasPropertyEffect(t,m.REFLECT)}_hasComputedEffect(t){return this._hasPropertyEffect(t,m.COMPUTE)}_setPendingPropertyOrPath(t,e,n,i){if(i||Object(s.g)(Array.isArray(t)?t[0]:t)!==t){if(!i){let n=Object(s.a)(this,t);if(!(t=Object(s.h)(this,t,e))||!super._shouldPropertyChange(t,e,n))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(t,e,n))return function(t,e,n){let i=t.__dataLinkedPaths;if(i){let r;for(let o in i){let a=i[o];Object(s.c)(o,e)?(r=Object(s.i)(o,a,e),t._setPendingPropertyOrPath(r,n,!0,!0)):Object(s.c)(a,e)&&(r=Object(s.i)(a,o,e),t._setPendingPropertyOrPath(r,n,!0,!0))}}}(this,t,e),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[t])return this._setPendingProperty(t,e,n);this[t]=e}return!1}_setUnmanagedPropertyToNode(t,e,n){n===t[e]&&"object"!=typeof n||(t[e]=n)}_setPendingProperty(t,e,n){let i=this.__dataHasPaths&&Object(s.d)(t),r=i?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(t,e,r[t])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),t in this.__dataOld||(this.__dataOld[t]=this.__data[t]),i?this.__dataTemp[t]=e:this.__data[t]=e,this.__dataPending[t]=e,(i||this[m.NOTIFY]&&this[m.NOTIFY][t])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[t]=n),!0)}_setProperty(t,e){this._setPendingProperty(t,e,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(t){this.__dataPendingClients=this.__dataPendingClients||[],t!==this&&this.__dataPendingClients.push(t)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let t=this.__dataPendingClients;if(t){this.__dataPendingClients=null;for(let e=0;e<t.length;e++){let n=t[e];n.__dataEnabled?n.__dataPending&&n._flushProperties():n._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(t,e){for(let n in t)!e&&this[m.READ_ONLY]&&this[m.READ_ONLY][n]||this._setPendingPropertyOrPath(n,t[n],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(t,e,n){let i=this.__dataHasPaths;this.__dataHasPaths=!1,function(t,e,n,i){let s=t[m.COMPUTE];if(s){let r=e;for(;v(t,s,r,n,i);)Object.assign(n,t.__dataOld),Object.assign(e,t.__dataPending),r=t.__dataPending,t.__dataPending=null}}(this,e,n,i);let s=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(e,n,i),this._flushClients(),v(this,this[m.REFLECT],e,n,i),v(this,this[m.OBSERVE],e,n,i),s&&function(t,e,n,i,s){let r,o,a=t[m.NOTIFY],l=f++;for(let o in e)e[o]&&(a&&C(t,a,l,o,n,i,s)?r=!0:s&&O(t,o,n)&&(r=!0));r&&(o=t.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,s,e,n,i),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(t,e,n){this[m.PROPAGATE]&&v(this,this[m.PROPAGATE],t,e,n);let i=this.__templateInfo;for(;i;)v(this,i.propertyEffects,t,e,n,i.nodeList),i=i.nextTemplateInfo}linkPaths(t,e){t=Object(s.f)(t),e=Object(s.f)(e),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[t]=e}unlinkPaths(t){t=Object(s.f)(t),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[t]}notifySplices(t,e){let n={path:""};B(this,Object(s.a)(this,t,n),n.path,e)}get(t,e){return Object(s.a)(e||this,t)}set(t,e,n){n?Object(s.h)(n,t,e):this[m.READ_ONLY]&&this[m.READ_ONLY][t]||this._setPendingPropertyOrPath(t,e,!0)&&this._invalidateProperties()}push(t,...e){let n={path:""},i=Object(s.a)(this,t,n),r=i.length,o=i.push(...e);return e.length&&q(this,i,n.path,r,e.length,[]),o}pop(t){let e={path:""},n=Object(s.a)(this,t,e),i=Boolean(n.length),r=n.pop();return i&&q(this,n,e.path,n.length,0,[r]),r}splice(t,e,n,...i){let r,o={path:""},a=Object(s.a)(this,t,o);return e<0?e=a.length-Math.floor(-e):e&&(e=Math.floor(e)),r=2===arguments.length?a.splice(e):a.splice(e,n,...i),(i.length||r.length)&&q(this,a,o.path,e,i.length,r),r}shift(t){let e={path:""},n=Object(s.a)(this,t,e),i=Boolean(n.length),r=n.shift();return i&&q(this,n,e.path,0,0,[r]),r}unshift(t,...e){let n={path:""},i=Object(s.a)(this,t,n),r=i.unshift(...e);return e.length&&q(this,i,n.path,0,e.length,[]),r}notifyPath(t,e){let n;if(1==arguments.length){let i={path:""};e=Object(s.a)(this,t,i),n=i.path}else n=Array.isArray(t)?Object(s.f)(t):t;this._setPendingPropertyOrPath(n,e,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(t,e){var n;this._addPropertyEffect(t,m.READ_ONLY),e&&(this["_set"+(n=t,n[0].toUpperCase()+n.substring(1))]=function(e){this._setProperty(t,e)})}_createPropertyObserver(t,e,n){let i={property:t,method:e,dynamicFn:Boolean(n)};this._addPropertyEffect(t,m.OBSERVE,{fn:w,info:i,trigger:{name:t}}),n&&this._addPropertyEffect(e,m.OBSERVE,{fn:w,info:i,trigger:{name:e}})}_createMethodObserver(t,e){let n=F(t);if(!n)throw new Error("Malformed observer expression '"+t+"'");M(this,n,m.OBSERVE,L,null,e)}_createNotifyingProperty(t){this._addPropertyEffect(t,m.NOTIFY,{fn:S,info:{eventName:Object(r.a)(t)+"-changed",property:t}})}_createReflectedProperty(t){let e=this.constructor.attributeNameForProperty(t);"-"===e[0]?console.warn("Property "+t+" cannot be reflected to attribute "+e+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(t,m.REFLECT,{fn:E,info:{attrName:e}})}_createComputedProperty(t,e,n){let i=F(e);if(!i)throw new Error("Malformed computed expression '"+e+"'");M(this,i,m.COMPUTE,T,t,n)}_marshalArgs(t,e,n){const i=this.__data;let r=[];for(let o=0,a=t.length;o<a;o++){let a,l=t[o],c=l.name;if(l.literal?a=l.value:l.structured?void 0===(a=Object(s.a)(i,c))&&(a=n[c]):a=i[c],l.wildcard){let t=0===c.indexOf(e+"."),i=0===e.indexOf(c)&&!t;r[o]={path:i?e:c,value:i?n[e]:a,base:a}}else r[o]=a}return r}static addPropertyEffect(t,e,n){this.prototype._addPropertyEffect(t,e,n)}static createPropertyObserver(t,e,n){this.prototype._createPropertyObserver(t,e,n)}static createMethodObserver(t,e){this.prototype._createMethodObserver(t,e)}static createNotifyingProperty(t){this.prototype._createNotifyingProperty(t)}static createReadOnlyProperty(t,e){this.prototype._createReadOnlyProperty(t,e)}static createReflectedProperty(t){this.prototype._createReflectedProperty(t)}static createComputedProperty(t,e,n){this.prototype._createComputedProperty(t,e,n)}static bindTemplate(t){return this.prototype._bindTemplate(t)}_bindTemplate(t,e){let n=this.constructor._parseTemplate(t),i=this.__templateInfo==n;if(!i)for(let t in n.propertyEffects)this._createPropertyAccessor(t);if(e&&((n=Object.create(n)).wasPreBound=i,!i&&this.__templateInfo)){let t=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=t.nextTemplateInfo=n,n.previousTemplateInfo=t,n}return this.__templateInfo=n}static _addTemplatePropertyEffect(t,e,n){(t.hostProps=t.hostProps||{})[e]=!0;let i=t.propertyEffects=t.propertyEffects||{};(i[e]=i[e]||[]).push(n)}_stampTemplate(t){V.beginHosting(this);let e=super._stampTemplate(t);V.endHosting(this);let n=this._bindTemplate(t,!0);if(n.nodeList=e.nodeList,!n.wasPreBound){let t=n.childNodes=[];for(let n=e.firstChild;n;n=n.nextSibling)t.push(n)}return e.templateInfo=n,function(t,e){let{nodeList:n,nodeInfoList:i}=e;if(i.length)for(let e=0;e<i.length;e++){let s=i[e],r=n[e],o=s.bindings;if(o)for(let e=0;e<o.length;e++){let n=o[e];k(r,n),j(r,t,n)}r.__dataHost=t}}(this,n),this.__dataReady&&v(this,n.propertyEffects,this.__data,null,!1,n.nodeList),e}_removeBoundDom(t){let e=t.templateInfo;e.previousTemplateInfo&&(e.previousTemplateInfo.nextTemplateInfo=e.nextTemplateInfo),e.nextTemplateInfo&&(e.nextTemplateInfo.previousTemplateInfo=e.previousTemplateInfo),this.__templateInfoLast==e&&(this.__templateInfoLast=e.previousTemplateInfo),e.previousTemplateInfo=e.nextTemplateInfo=null;let n=e.childNodes;for(let t=0;t<n.length;t++){let e=n[t];e.parentNode.removeChild(e)}}static _parseTemplateNode(t,e,n){let i=super._parseTemplateNode(t,e,n);if(t.nodeType===Node.TEXT_NODE){let s=this._parseBindings(t.textContent,e);s&&(t.textContent=H(s)||" ",N(this,e,n,"text","textContent",s),i=!0)}return i}static _parseTemplateNodeAttribute(t,e,n,i,s){let o=this._parseBindings(s,e);if(o){let s=i,a="property";y.test(i)?a="attribute":"$"==i[i.length-1]&&(i=i.slice(0,-1),a="attribute");let l=H(o);return l&&"attribute"==a&&t.setAttribute(i,l),"input"===t.localName&&"value"===s&&t.setAttribute(s,""),t.removeAttribute(s),"property"===a&&(i=Object(r.b)(i)),N(this,e,n,a,i,o,l),!0}return super._parseTemplateNodeAttribute(t,e,n,i,s)}static _parseTemplateNestedTemplate(t,e,n){let i=super._parseTemplateNestedTemplate(t,e,n),s=n.templateInfo.hostProps;for(let t in s){N(this,e,n,"property","_host_"+t,[{mode:"{",source:t,dependencies:[t]}])}return i}static _parseBindings(t,e){let n,i=[],s=0;for(;null!==(n=D.exec(t));){n.index>s&&i.push({literal:t.slice(s,n.index)});let r=n[1][0],o=Boolean(n[2]),a=n[3].trim(),l=!1,c="",h=-1;"{"==r&&(h=a.indexOf("::"))>0&&(c=a.substring(h+2),a=a.substring(0,h),l=!0);let u=F(a),d=[];if(u){let{args:t,methodName:n}=u;for(let e=0;e<t.length;e++){let n=t[e];n.literal||d.push(n)}let i=e.dynamicFns;(i&&i[n]||u.static)&&(d.push(n),u.dynamicFn=!0)}else d.push(a);i.push({source:a,mode:r,negate:o,customEvent:l,signature:u,dependencies:d,event:c}),s=D.lastIndex}if(s&&s<t.length){let e=t.substring(s);e&&i.push({literal:e})}return i.length?i:null}static _evaluateBinding(t,e,n,i,r,o){let a;return a=e.signature?L(t,n,i,0,e.signature):n!=e.source?Object(s.a)(t,e.source):o&&Object(s.d)(n)?Object(s.a)(t,n):t.__data[n],e.negate&&(a=!a),a}}return g=n,n});const V=new class{constructor(){this.stack=[]}registerHost(t){this.stack.length&&this.stack[this.stack.length-1]._enqueueClient(t)}beginHosting(t){this.stack.push(t)}endHosting(t){let e=this.stack.length;e&&this.stack[e-1]==t&&this.stack.pop()}}},function(t,e,n){"use strict";var i=n(21),s=(n(13),n(1),n(16)),r=n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function o(t,e,n,i,s){let r;s&&(r="object"==typeof n&&null!==n)&&(i=t.__dataTemp[e]);let o=i!==n&&(i==i||n==n);return r&&o&&(t.__dataTemp[e]=n),o}const a=Object(r.a)(t=>{return class extends t{_shouldPropertyChange(t,e,n){return o(this,t,e,n,!0)}}}),l=Object(r.a)(t=>{return class extends t{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(t,e,n){return o(this,t,e,n,this.mutableData)}}});a._mutablePropertyChange=o;var c=n(4);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let h=null;function u(){return h}u.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:u,writable:!0}});const d=Object(s.a)(u),p=a(d);const _=Object(s.a)(class{});class f extends _{constructor(t){super(),this._configureProperties(t),this.root=this._stampTemplate(this.__dataHost);let e=this.children=[];for(let t=this.root.firstChild;t;t=t.nextSibling)e.push(t),t.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let n=this.__templatizeOptions;(t&&n.instanceProps||!n.instanceProps)&&this._enableProperties()}_configureProperties(t){if(this.__templatizeOptions.forwardHostProp)for(let t in this.__hostProps)this._setPendingProperty(t,this.__dataHost["_host_"+t]);for(let e in t)this._setPendingProperty(e,t[e])}forwardHostProp(t,e){this._setPendingPropertyOrPath(t,e,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(t,e,n){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(t,e,t=>{t.model=this,n(t)});else{let i=this.__dataHost.__dataHost;i&&i._addEventListenerToNode(t,e,n)}}_showHideChildren(t){let e=this.children;for(let n=0;n<e.length;n++){let i=e[n];if(Boolean(t)!=Boolean(i.__hideTemplateChildren__))if(i.nodeType===Node.TEXT_NODE)t?(i.__polymerTextContent__=i.textContent,i.textContent=""):i.textContent=i.__polymerTextContent__;else if("slot"===i.localName)if(t)i.__polymerReplaced__=document.createComment("hidden-slot"),i.parentNode.replaceChild(i.__polymerReplaced__,i);else{const t=i.__polymerReplaced__;t&&t.parentNode.replaceChild(i,t)}else i.style&&(t?(i.__polymerDisplay__=i.style.display,i.style.display="none"):i.style.display=i.__polymerDisplay__);i.__hideTemplateChildren__=t,i._showHideChildren&&i._showHideChildren(t)}}_setUnmanagedPropertyToNode(t,e,n){t.__hideTemplateChildren__&&t.nodeType==Node.TEXT_NODE&&"textContent"==e?t.__polymerTextContent__=n:super._setUnmanagedPropertyToNode(t,e,n)}get parentModel(){let t=this.__parentModel;if(!t){let e;t=this;do{t=t.__dataHost.__dataHost}while((e=t.__templatizeOptions)&&!e.parentModel);this.__parentModel=t}return t}dispatchEvent(t){return!0}}f.prototype.__dataHost,f.prototype.__templatizeOptions,f.prototype._methodHost,f.prototype.__templatizeOwner,f.prototype.__hostProps;const m=a(f);function y(t){let e=t.__dataHost;return e&&e._methodHost||e}function g(t,e,n){let i=n.mutableData?m:f,s=class extends i{};return s.prototype.__templatizeOptions=n,s.prototype._bindTemplate(t),function(t,e,n,i){let s=n.hostProps||{};for(let e in i.instanceProps){delete s[e];let n=i.notifyInstanceProp;n&&t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:C(e,n)})}if(i.forwardHostProp&&e.__dataHost)for(let e in s)t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(t,e,n){t.__dataHost._setPendingPropertyOrPath("_host_"+e,n[e],!0,!0)}})}(s,t,e,n),s}function b(t,e,n){let i=n.forwardHostProp;if(i){let s=e.templatizeTemplateClass;if(!s){let t=n.mutableData?p:d;s=e.templatizeTemplateClass=class extends t{};let r=e.hostProps;for(let t in r)s.prototype._addPropertyEffect("_host_"+t,s.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:v(t,i)}),s.prototype._createNotifyingProperty("_host_"+t)}!function(t,e){h=t,Object.setPrototypeOf(t,e.prototype),new e,h=null}(t,s),t.__dataProto&&Object.assign(t.__data,t.__dataProto),t.__dataTemp={},t.__dataPending=null,t.__dataOld=null,t._enableProperties()}}function v(t,e){return function(t,n,i){e.call(t.__templatizeOwner,n.substring("_host_".length),i[n])}}function C(t,e){return function(t,n,i){e.call(t.__templatizeOwner,t,n,i[n])}}function P(t,e,n){if(c.e&&!y(t))throw new Error("strictTemplatePolicy: template owner not trusted");if(n=n||{},t.__templatizeOwner)throw new Error("A <template> can only be templatized once");t.__templatizeOwner=e;let i=(e?e.constructor:f)._parseTemplate(t),s=i.templatizeInstanceClass;s||(s=g(t,i,n),i.templatizeInstanceClass=s),b(t,i,n);let r=class extends s{};return r.prototype._methodHost=y(t),r.prototype.__dataHost=t,r.prototype.__templatizeOwner=e,r.prototype.__hostProps=i.hostProps,r=r}function w(t,e){let n;for(;e;)if(n=e.__templatizeInstance){if(n.__dataHost==t)return n;e=n.__dataHost}else e=e.parentNode;return null}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/var O=n(24);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const x=Object(O.a)(l(Object(s.a)(HTMLElement)));customElements.define("dom-bind",class extends x{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),c.e)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(){this.mutableData=!0}connectedCallback(){this.style.display="none",this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){this.parentNode.insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let t=0;t<this.__children.length;t++)this.root.appendChild(this.__children[t])}render(){let t;if(!this.__children){if(!(t=t||this.querySelector("template"))){let e=new MutationObserver(()=>{if(!(t=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");e.disconnect(),this.render()});return void e.observe(this,{childList:!0})}this.root=this._stampTemplate(t),this.$=this.root.$,this.__children=[];for(let t=this.root.firstChild;t;t=t.nextSibling)this.__children[this.__children.length]=t;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});var S=n(15);n(12);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const E=Object(S.a)(HTMLElement);var T=n(9),N=n(10),A=n(0),I=n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const k=l(E);class j extends k{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let t=0;t<this.__instances.length;t++)this.__detachInstance(t)}connectedCallback(){if(super.connectedCallback(),this.style.display="none",this.__isDetached){this.__isDetached=!1;let t=this.parentNode;for(let e=0;e<this.__instances.length;e++)this.__attachInstance(e,t)}}__ensureTemplatized(){if(!this.__ctor){let t=this.template=this.querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}let e={};e[this.as]=!0,e[this.indexAs]=!0,e[this.itemsIndexAs]=!0,this.__ctor=P(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:e,forwardHostProp:function(t,e){let n=this.__instances;for(let i,s=0;s<n.length&&(i=n[s]);s++)i.forwardHostProp(t,e)},notifyInstanceProp:function(t,e,n){if(Object(A.e)(this.as,e)){let i=t[this.itemsIndexAs];e==this.as&&(this.items[i]=n);let s=Object(A.i)(this.as,"items."+i,e);this.notifyPath(s,n)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(t){if("string"==typeof t){let e=t,n=this.__getMethodHost();return function(){return n[e].apply(n,arguments)}}return t}__sortChanged(t){this.__sortFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__filterChanged(t){this.__filterFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(t){return Math.ceil(1e3/t)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let t=performance.now(),e=this._targetFrameTime/(t-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*e)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=t,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(t){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(t.path,t.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(t){if(this.__sortFn||this.__filterFn)if(t){if(this.__observePaths){let e=this.__observePaths;for(let n=0;n<e.length;n++)0===t.indexOf(e[n])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(t,e=0){this.__renderDebouncer=T.a.debounce(this.__renderDebouncer,e>0?I.b.after(e):I.a,t.bind(this)),Object(N.a)(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),Object(N.b)()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let t=this.items||[],e=new Array(t.length);for(let n=0;n<t.length;n++)e[n]=n;this.__filterFn&&(e=e.filter((e,n,i)=>this.__filterFn(t[e],n,i))),this.__sortFn&&e.sort((e,n)=>this.__sortFn(t[e],t[n]));const n=this.__itemsIdxToInstIdx={};let i=0;const s=Math.min(e.length,this.__limit);for(;i<s;i++){let s=this.__instances[i],r=e[i],o=t[r];n[r]=i,s?(s._setPendingProperty(this.as,o),s._setPendingProperty(this.indexAs,i),s._setPendingProperty(this.itemsIndexAs,r),s._flushProperties()):this.__insertInstance(o,i,r)}for(let t=this.__instances.length-1;t>=i;t--)this.__detachAndRemoveInstance(t)}__detachInstance(t){let e=this.__instances[t];for(let t=0;t<e.children.length;t++){let n=e.children[t];e.root.appendChild(n)}return e}__attachInstance(t,e){let n=this.__instances[t];e.insertBefore(n.root,this)}__detachAndRemoveInstance(t){let e=this.__detachInstance(t);e&&this.__pool.push(e),this.__instances.splice(t,1)}__stampInstance(t,e,n){let i={};return i[this.as]=t,i[this.indexAs]=e,i[this.itemsIndexAs]=n,new this.__ctor(i)}__insertInstance(t,e,n){let i=this.__pool.pop();i?(i._setPendingProperty(this.as,t),i._setPendingProperty(this.indexAs,e),i._setPendingProperty(this.itemsIndexAs,n),i._flushProperties()):i=this.__stampInstance(t,e,n);let s=this.__instances[e+1],r=s?s.children[0]:this;return this.parentNode.insertBefore(i.root,r),this.__instances[e]=i,i}_showHideChildren(t){for(let e=0;e<this.__instances.length;e++)this.__instances[e]._showHideChildren(t)}__handleItemPath(t,e){let n=t.slice(6),i=n.indexOf("."),s=i<0?n:n.substring(0,i);if(s==parseInt(s,10)){let t=i<0?"":n.substring(i+1);this.__handleObservedPaths(t);let r=this.__itemsIdxToInstIdx[s],o=this.__instances[r];if(o){let n=this.as+(t?"."+t:"");o._setPendingPropertyOrPath(n,e,!1,!0),o._flushProperties()}return!0}}itemForElement(t){let e=this.modelForElement(t);return e&&e[this.as]}indexForElement(t){let e=this.modelForElement(t);return e&&e[this.indexAs]}modelForElement(t){return w(this.template,t)}}customElements.define(j.is,j);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class M extends E{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=T.a.debounce(this.__renderDebouncer,I.a,()=>this.__render()),Object(N.a)(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback(),this.parentNode&&(this.parentNode.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||this.parentNode.host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),this.style.display="none",this.if&&this.__debounceRender()}render(){Object(N.b)()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let t=this.parentNode;if(t){if(!this.__ctor){let t=this.querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-if requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}this.__ctor=P(t,this,{mutableData:!0,forwardHostProp:function(t,e){this.__instance&&(this.if?this.__instance.forwardHostProp(t,e):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Object(A.g)(t)]=!0))}})}if(this.__instance){this.__syncHostProperties();let e=this.__instance.children;if(e&&e.length){if(this.previousSibling!==e[e.length-1])for(let n,i=0;i<e.length&&(n=e[i]);i++)t.insertBefore(n,this)}}else this.__instance=new this.__ctor,t.insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let t=this.__invalidProps;if(t){for(let e in t)this.__instance._setPendingProperty(e,this.__dataHost[e]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let t=this.__instance.children;if(t&&t.length){let e=t[0].parentNode;if(e)for(let n,i=0;i<t.length&&(n=t[i]);i++)e.removeChild(n)}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let t=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(t)}}customElements.define(M.is,M);var L=n(25);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let R=Object(r.a)(t=>{let e=Object(S.a)(t);return class extends e{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(t,e){let n=e.path;if("items"==n){let n=e.base||[],i=this.__lastItems;if(t!==this.__lastMulti&&this.clearSelection(),i){let t=Object(L.a)(n,i);this.__applySplices(t)}this.__lastItems=n,this.__lastMulti=t}else if("items.splices"==e.path)this.__applySplices(e.value.indexSplices);else{let t=n.slice("items.".length),e=parseInt(t,10);t.indexOf(".")<0&&t==e&&this.__deselectChangedIdx(e)}}__applySplices(t){let e=this.__selectedMap;for(let n=0;n<t.length;n++){let i=t[n];e.forEach((t,n)=>{t<i.index||(t>=i.index+i.removed.length?e.set(n,t+i.addedCount-i.removed.length):e.set(n,-1))});for(let t=0;t<i.addedCount;t++){let n=i.index+t;e.has(this.items[n])&&e.set(this.items[n],n)}}this.__updateLinks();let n=0;e.forEach((t,i)=>{t<0?(this.multi?this.splice("selected",n,1):this.selected=this.selectedItem=null,e.delete(i)):n++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let t=0;this.__selectedMap.forEach(e=>{e>=0&&this.linkPaths("items."+e,"selected."+t++)})}else this.__selectedMap.forEach(t=>{this.linkPaths("selected","items."+t),this.linkPaths("selectedItem","items."+t)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(t){return this.__selectedMap.has(t)}isIndexSelected(t){return this.isSelected(this.items[t])}__deselectChangedIdx(t){let e=this.__selectedIndexForItemIndex(t);if(e>=0){let t=0;this.__selectedMap.forEach((n,i)=>{e==t++&&this.deselect(i)})}}__selectedIndexForItemIndex(t){let e=this.__dataLinkedPaths["items."+t];if(e)return parseInt(e.slice("selected.".length),10)}deselect(t){let e=this.__selectedMap.get(t);if(e>=0){let n;this.__selectedMap.delete(t),this.multi&&(n=this.__selectedIndexForItemIndex(e)),this.__updateLinks(),this.multi?this.splice("selected",n,1):this.selected=this.selectedItem=null}}deselectIndex(t){this.deselect(this.items[t])}select(t){this.selectIndex(this.items.indexOf(t))}selectIndex(t){let e=this.items[t];this.isSelected(e)?this.toggle&&this.deselectIndex(t):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(e,t),this.__updateLinks(),this.multi?this.push("selected",e):this.selected=this.selectedItem=e)}}})(E);class D extends R{static get is(){return"array-selector"}}customElements.define(D.is,D);var H=n(27),F=n(11),z=n(7);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const B=new H.a;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(t,e,n){},prepareTemplateDom(t,e){},prepareTemplateStyles(t,e,n){},styleSubtree(t,e){B.processStyles(),Object(F.c)(t,e)},styleElement(t){B.processStyles()},styleDocument(t){B.processStyles(),Object(F.c)(document.body,t)},getComputedStyleValue:(t,e)=>Object(F.b)(t,e),flushCustomStyles(){},nativeCss:z.a,nativeShadow:z.b}),window.ShadyCSS.CustomStyleInterface=B;var q=n(18);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const Y="include",V=window.ShadyCSS.CustomStyleInterface;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let $;window.customElements.define("custom-style",class extends HTMLElement{constructor(){super(),this._style=null,V.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const t=this.querySelector("style");if(!t)return null;this._style=t;const e=t.getAttribute(Y);return e&&(t.removeAttribute(Y),t.textContent=Object(q.a)(e)+t.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}),$=a._mutablePropertyChange;Boolean;n.d(e,"a",function(){return U});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const U=Object(i.a)(HTMLElement).prototype},function(t,e,n){"use strict";n.d(e,"c",function(){return d}),n.d(e,"b",function(){return p}),n.d(e,"a",function(){return f});var i=n(19),s=n(5);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r="link[rel=import][type~=css]",o="include",a="shady-unscoped";function l(t){return i.a.import(t)}function c(t){let e=t.body?t.body:t;const n=Object(s.b)(e.textContent,t.baseURI),i=document.createElement("style");return i.textContent=n,i}function h(t){const e=t.trim().split(/\s+/),n=[];for(let t=0;t<e.length;t++)n.push(...u(e[t]));return n}function u(t){const e=l(t);if(!e)return console.warn("Could not find style data in module named",t),[];if(void 0===e._styles){const t=[];t.push(..._(e));const n=e.querySelector("template");n&&t.push(...d(n,e.assetpath)),e._styles=t}return e._styles}function d(t,e){if(!t._styles){const n=[],i=t.content.querySelectorAll("style");for(let t=0;t<i.length;t++){let r=i[t],a=r.getAttribute(o);a&&n.push(...h(a).filter(function(t,e,n){return n.indexOf(t)===e})),e&&(r.textContent=Object(s.b)(r.textContent,e)),n.push(r)}t._styles=n}return t._styles}function p(t){let e=l(t);return e?_(e):[]}function _(t){const e=[],n=t.querySelectorAll(r);for(let t=0;t<n.length;t++){let i=n[t];if(i.import){const t=i.import,n=i.hasAttribute(a);if(n&&!t._unscopedStyle){const e=c(t);e.setAttribute(a,""),t._unscopedStyle=e}else t._style||(t._style=c(t));e.push(n?t._unscopedStyle:t._style)}}return e}function f(t){let e=t.trim().split(/\s+/),n="";for(let t=0;t<e.length;t++)n+=m(e[t]);return n}function m(t){let e=l(t);if(e&&void 0===e._cssText){let t=y(e),n=e.querySelector("template");n&&(t+=function(t,e){let n="";const i=d(t,e);for(let t=0;t<i.length;t++){let e=i[t];e.parentNode&&e.parentNode.removeChild(e),n+=e.textContent}return n}(n,e.assetpath)),e._cssText=t||null}return e||console.warn("Could not find style data in module named",t),e&&e._cssText||""}function y(t){let e="",n=_(t);for(let t=0;t<n.length;t++)e+=n[t].textContent;return e}},function(t,e,n){"use strict";n.d(e,"a",function(){return c});n(1);var i=n(5),s=n(4);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let r={},o={};function a(t,e){r[t]=o[t.toLowerCase()]=e}function l(t){return r[t]||o[t.toLowerCase()]}class c extends HTMLElement{static get observedAttributes(){return["id"]}static import(t,e){if(t){let n=l(t);return n&&e?n.querySelector(e):n}return null}attributeChangedCallback(t,e,n,i){e!==n&&this.register()}get assetpath(){if(!this.__assetpath){const t=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,e=Object(i.c)(this.getAttribute("assetpath")||"",t.baseURI);this.__assetpath=Object(i.a)(e)}return this.__assetpath}register(t){if(t=t||this.id){if(s.e&&void 0!==l(t))throw a(t,null),new Error(`strictTemplatePolicy: dom-module ${t} re-registered`);this.id=t,a(t,this),(e=this).querySelector("style")&&console.warn("dom-module %s has style outside template",e.id)}var e}}c.prototype.modules=r,customElements.define("dom-module",c)},function(t,e,n){"use strict";n.d(e,"a",function(){return M}),n.d(e,"b",function(){return L}),n.d(e,"c",function(){return D});n(1);var i=n(3),s=n(9),r=n(4);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let o="string"==typeof document.head.style.touchAction,a="__polymerGestures",l="__polymerGesturesHandled",c="__polymerGesturesTouchAction",h=25,u=5,d=2500,p=["mousedown","mousemove","mouseup","click"],_=[0,1,4,2],f=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function m(t){return p.indexOf(t)>-1}let y=!1;function g(t){if(!m(t)&&"touchend"!==t)return o&&y&&r.b?{passive:!0}:void 0}!function(){try{let t=Object.defineProperty({},"passive",{get(){y=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();let b=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const v=[],C={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},P={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function w(t){let e=Array.prototype.slice.call(t.labels||[]);if(!e.length){e=[];let n=t.getRootNode();if(t.id){let i=n.querySelectorAll(`label[for = ${t.id}]`);for(let t=0;t<i.length;t++)e.push(i[t])}}return e}let O=function(t){let e=t.sourceCapabilities;var n;if((!e||e.firesTouchEvents)&&(t[l]={skip:!0},"click"===t.type)){let e=!1,i=t.composedPath&&t.composedPath();if(i)for(let t=0;t<i.length;t++){if(i[t].nodeType===Node.ELEMENT_NODE)if("label"===i[t].localName)v.push(i[t]);else if(n=i[t],C[n.localName]){let n=w(i[t]);for(let t=0;t<n.length;t++)e=e||v.indexOf(n[t])>-1}if(i[t]===E.mouse.target)return}if(e)return;t.preventDefault(),t.stopPropagation()}};function x(t){let e=b?["click"]:p;for(let n,i=0;i<e.length;i++)n=e[i],t?(v.length=0,document.addEventListener(n,O,!0)):document.removeEventListener(n,O,!0)}function S(t){let e=t.type;if(!m(e))return!1;if("mousemove"===e){let e=void 0===t.buttons?1:t.buttons;return t instanceof window.MouseEvent&&!f&&(e=_[t.which]||0),Boolean(1&e)}return 0===(void 0===t.button?0:t.button)}let E={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function T(t,e,n){t.movefn=e,t.upfn=n,document.addEventListener("mousemove",e),document.addEventListener("mouseup",n)}function N(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}document.addEventListener("touchend",function(t){E.mouse.mouseIgnoreJob||x(!0),E.mouse.target=t.composedPath()[0],E.mouse.mouseIgnoreJob=s.a.debounce(E.mouse.mouseIgnoreJob,i.b.after(d),function(){x(),E.mouse.target=null,E.mouse.mouseIgnoreJob=null})},!!y&&{passive:!0});const A={},I=[];function k(t){if(t.composedPath){const e=t.composedPath();return e.length>0?e[0]:t.target}return t.target}function j(t){let e,n=t.type,i=t.currentTarget[a];if(!i)return;let s=i[n];if(s){if(!t[l]&&(t[l]={},"touch"===n.slice(0,5))){let e=(t=t).changedTouches[0];if("touchstart"===n&&1===t.touches.length&&(E.touch.id=e.identifier),E.touch.id!==e.identifier)return;o||"touchstart"!==n&&"touchmove"!==n||function(t){let e=t.changedTouches[0],n=t.type;if("touchstart"===n)E.touch.x=e.clientX,E.touch.y=e.clientY,E.touch.scrollDecided=!1;else if("touchmove"===n){if(E.touch.scrollDecided)return;E.touch.scrollDecided=!0;let n=function(t){let e="auto",n=t.composedPath&&t.composedPath();if(n)for(let t,i=0;i<n.length;i++)if((t=n[i])[c]){e=t[c];break}return e}(t),i=!1,s=Math.abs(E.touch.x-e.clientX),r=Math.abs(E.touch.y-e.clientY);t.cancelable&&("none"===n?i=!0:"pan-x"===n?i=r>s:"pan-y"===n&&(i=s>r)),i?t.preventDefault():F("track")}}(t)}if(!(e=t[l]).skip){for(let n,i=0;i<I.length;i++)s[(n=I[i]).name]&&!e[n.name]&&n.flow&&n.flow.start.indexOf(t.type)>-1&&n.reset&&n.reset();for(let i,r=0;r<I.length;r++)s[(i=I[r]).name]&&!e[i.name]&&(e[i.name]=!0,i[n](t))}}}function M(t,e,n){return!!A[e]&&(function(t,e,n){let i=A[e],s=i.deps,r=i.name,o=t[a];o||(t[a]=o={});for(let e,n,i=0;i<s.length;i++)e=s[i],b&&m(e)&&"click"!==e||((n=o[e])||(o[e]=n={_count:0}),0===n._count&&t.addEventListener(e,j,g(e)),n[r]=(n[r]||0)+1,n._count=(n._count||0)+1);t.addEventListener(e,n),i.touchAction&&D(t,i.touchAction)}(t,e,n),!0)}function L(t,e,n){return!!A[e]&&(function(t,e,n){let i=A[e],s=i.deps,r=i.name,o=t[a];if(o)for(let e,n,i=0;i<s.length;i++)e=s[i],(n=o[e])&&n[r]&&(n[r]=(n[r]||1)-1,n._count=(n._count||1)-1,0===n._count&&t.removeEventListener(e,j,g(e)));t.removeEventListener(e,n)}(t,e,n),!0)}function R(t){I.push(t);for(let e=0;e<t.emits.length;e++)A[t.emits[e]]=t}function D(t,e){o&&t instanceof HTMLElement&&i.a.run(()=>{t.style.touchAction=e}),t[c]=e}function H(t,e,n){let i=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(i.detail=n,t.dispatchEvent(i),i.defaultPrevented){let t=n.preventer||n.sourceEvent;t&&t.preventDefault&&t.preventDefault()}}function F(t){let e=function(t){for(let e,n=0;n<I.length;n++){e=I[n];for(let n,i=0;i<e.emits.length;i++)if((n=e.emits[i])===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function z(t,e,n,i){e&&H(e,t,{x:n.clientX,y:n.clientY,sourceEvent:n,preventer:i,prevent:function(t){return F(t)}})}function B(t,e,n){if(t.prevent)return!1;if(t.started)return!0;let i=Math.abs(t.x-e),s=Math.abs(t.y-n);return i>=u||s>=u}function q(t,e,n){if(!e)return;let i,s=t.moves[t.moves.length-2],r=t.moves[t.moves.length-1],o=r.x-t.x,a=r.y-t.y,l=0;s&&(i=r.x-s.x,l=r.y-s.y),H(e,"track",{state:t.state,x:n.clientX,y:n.clientY,dx:o,dy:a,ddx:i,ddy:l,sourceEvent:n,hover:function(){return function(t,e){let n=document.elementFromPoint(t,e),i=n;for(;i&&i.shadowRoot&&!window.ShadyDOM&&i!==(i=i.shadowRoot.elementFromPoint(t,e));)i&&(n=i);return n}(n.clientX,n.clientY)}})}function Y(t,e,n){let i=Math.abs(e.clientX-t.x),s=Math.abs(e.clientY-t.y),r=k(n||e);!r||P[r.localName]&&r.hasAttribute("disabled")||(isNaN(i)||isNaN(s)||i<=h&&s<=h||function(t){if("click"===t.type){if(0===t.detail)return!0;let e=k(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;let n=e.getBoundingClientRect(),i=t.pageX,s=t.pageY;return!(i>=n.left&&i<=n.right&&s>=n.top&&s<=n.bottom)}return!1}(e))&&(t.prevent||H(r,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:n}))}R({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){N(this.info)},mousedown:function(t){if(!S(t))return;let e=k(t),n=this;T(this.info,function(t){S(t)||(z("up",e,t),N(n.info))},function(t){S(t)&&z("up",e,t),N(n.info)}),z("down",e,t)},touchstart:function(t){z("down",k(t),t.changedTouches[0],t)},touchend:function(t){z("up",k(t),t.changedTouches[0],t)}}),R({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,N(this.info)},mousedown:function(t){if(!S(t))return;let e=k(t),n=this,i=function(t){let i=t.clientX,s=t.clientY;B(n.info,i,s)&&(n.info.state=n.info.started?"mouseup"===t.type?"end":"track":"start","start"===n.info.state&&F("tap"),n.info.addMove({x:i,y:s}),S(t)||(n.info.state="end",N(n.info)),e&&q(n.info,e,t),n.info.started=!0)};T(this.info,i,function(t){n.info.started&&i(t),N(n.info)}),this.info.x=t.clientX,this.info.y=t.clientY},touchstart:function(t){let e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove:function(t){let e=k(t),n=t.changedTouches[0],i=n.clientX,s=n.clientY;B(this.info,i,s)&&("start"===this.info.state&&F("tap"),this.info.addMove({x:i,y:s}),q(this.info,e,n),this.info.state="track",this.info.started=!0)},touchend:function(t){let e=k(t),n=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:n.clientX,y:n.clientY}),q(this.info,e,n))}}),R({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(t){S(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click:function(t){S(t)&&Y(this.info,t)},touchstart:function(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend:function(t){Y(this.info,t.changedTouches[0],t)}})},function(t,e,n){"use strict";var i=n(7);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class s{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function r(t){return function t(e,n){let i=n.substring(e.start,e.end-1);e.parsedCssText=e.cssText=i.trim();if(e.parent){let t=e.previous?e.previous.end:e.parent.start;i=(i=(i=function(t){return t.replace(/\\([0-9a-f]{1,6})\s/gi,function(){let t=arguments[1],e=6-t.length;for(;e--;)t="0"+t;return"\\"+t})}(i=n.substring(t,e.start-1))).replace(h.multipleSpaces," ")).substring(i.lastIndexOf(";")+1);let s=e.parsedSelector=e.selector=i.trim();e.atRule=0===s.indexOf(p),e.atRule?0===s.indexOf(d)?e.type=a.MEDIA_RULE:s.match(h.keyframesRule)&&(e.type=a.KEYFRAMES_RULE,e.keyframesName=e.selector.split(h.multipleSpaces).pop()):0===s.indexOf(u)?e.type=a.MIXIN_RULE:e.type=a.STYLE_RULE}let s=e.rules;if(s)for(let e,i=0,r=s.length;i<r&&(e=s[i]);i++)t(e,n);return e}(function(t){let e=new s;e.start=0,e.end=t.length;let n=e;for(let i=0,r=t.length;i<r;i++)if(t[i]===l){n.rules||(n.rules=[]);let t=n,e=t.rules[t.rules.length-1]||null;(n=new s).start=i+1,n.parent=t,n.previous=e,t.rules.push(n)}else t[i]===c&&(n.end=i+1,n=n.parent||e);return e}(t=t.replace(h.comments,"").replace(h.port,"")),t)}function o(t,e,n=""){let i="";if(t.cssText||t.rules){let n=t.rules;if(n&&!function(t){let e=t[0];return Boolean(e)&&Boolean(e.selector)&&0===e.selector.indexOf(u)}(n))for(let t,s=0,r=n.length;s<r&&(t=n[s]);s++)i=o(t,e,i);else(i=(i=e?t.cssText:function(t){return function(t){return t.replace(h.mixinApply,"").replace(h.varApply,"")}(t=function(t){return t.replace(h.customProp,"").replace(h.mixinProp,"")}(t))}(t.cssText)).trim())&&(i="  "+i+"\n")}return i&&(t.selector&&(n+=t.selector+" "+l+"\n"),n+=i,t.selector&&(n+=c+"\n\n")),n}const a={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},l="{",c="}",h={comments:/\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},u="--",d="@media",p="@";var _=n(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const f=new Set,m="shady-unscoped";function y(t){const e=t.textContent;if(!f.has(e)){f.add(e);const n=t.cloneNode(!0);document.head.appendChild(n)}}function g(t){return t.hasAttribute(m)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function b(t,e){return t?("string"==typeof t&&(t=r(t)),e&&C(t,e),o(t,i.a)):""}function v(t){return!t.__cssRules&&t.textContent&&(t.__cssRules=r(t.textContent)),t.__cssRules||null}function C(t,e,n,i){if(!t)return;let s=!1,r=t.type;if(i&&r===a.MEDIA_RULE){let e=t.selector.match(_.a);e&&(window.matchMedia(e[1]).matches||(s=!0))}r===a.STYLE_RULE?e(t):n&&r===a.KEYFRAMES_RULE?n(t):r===a.MIXIN_RULE&&(s=!0);let o=t.rules;if(o&&!s)for(let t,s=0,r=o.length;s<r&&(t=o[s]);s++)C(t,e,n,i)}function P(t,e){let n=0;for(let i=e,s=t.length;i<s;i++)if("("===t[i])n++;else if(")"===t[i]&&0==--n)return i;return-1}const w="css-build";function O(t){if(void 0===t.__cssBuild){const e=t.getAttribute(w);if(e)t.__cssBuild=e;else{const e=function(t){const e="template"===t.localName?t.content.firstChild:t.firstChild;if(e instanceof Comment){const t=e.textContent.trim().split(":");if(t[0]===w)return t[1]}return""}(t);""!==e&&function(t){const e="template"===t.localName?t.content.firstChild:t.firstChild;e.parentNode.removeChild(e)}(t),t.__cssBuild=e}}return t.__cssBuild||""}function x(t){return""!==O(t)}var S=n(11);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const E=/;\s*/m,T=/^\s*(initial)|(inherit)\s*$/,N=/\s*!important/,A="_-_";class I{constructor(){this._map={}}set(t,e){t=t.trim(),this._map[t]={properties:e,dependants:{}}}get(t){return t=t.trim(),this._map[t]||null}}let k=null;class j{constructor(){this._currentElement=null,this._measureElement=null,this._map=new I}detectMixin(t){return Object(S.a)(t)}gatherStyles(t){const e=function(t){const e=[],n=t.querySelectorAll("style");for(let t=0;t<n.length;t++){const s=n[t];g(s)?i.b||(y(s),s.parentNode.removeChild(s)):(e.push(s.textContent),s.parentNode.removeChild(s))}return e.join("").trim()}(t.content);if(e){const n=document.createElement("style");return n.textContent=e,t.content.insertBefore(n,t.content.firstChild),n}return null}transformTemplate(t,e){void 0===t._gatheredStyle&&(t._gatheredStyle=this.gatherStyles(t));const n=t._gatheredStyle;return n?this.transformStyle(n,e):null}transformStyle(t,e=""){let n=v(t);return this.transformRules(n,e),t.textContent=b(n),n}transformCustomStyle(t){let e=v(t);return C(e,t=>{":root"===t.selector&&(t.selector="html"),this.transformRule(t)}),t.textContent=b(e),e}transformRules(t,e){this._currentElement=e,C(t,t=>{this.transformRule(t)}),this._currentElement=null}transformRule(t){t.cssText=this.transformCssText(t.parsedCssText,t),":root"===t.selector&&(t.selector=":host > *")}transformCssText(t,e){return t=t.replace(_.c,(t,n,i,s)=>this._produceCssProperties(t,n,i,s,e)),this._consumeCssProperties(t,e)}_getInitialValueForProperty(t){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(t)}_fallbacksFromPreviousRules(t){let e=t;for(;e.parent;)e=e.parent;const n={};let i=!1;return C(e,e=>{(i=i||e===t)||e.selector===t.selector&&Object.assign(n,this._cssTextToMap(e.parsedCssText))}),n}_consumeCssProperties(t,e){let n=null;for(;n=_.b.exec(t);){let i=n[0],s=n[1],r=n.index,o=r+i.indexOf("@apply"),a=r+i.length,l=t.slice(0,o),c=t.slice(a),h=e?this._fallbacksFromPreviousRules(e):{};Object.assign(h,this._cssTextToMap(l));let u=this._atApplyToCssProperties(s,h);t=`${l}${u}${c}`,_.b.lastIndex=r+u.length}return t}_atApplyToCssProperties(t,e){t=t.replace(E,"");let n=[],i=this._map.get(t);if(i||(this._map.set(t,{}),i=this._map.get(t)),i){let s,r,o;this._currentElement&&(i.dependants[this._currentElement]=!0);const a=i.properties;for(s in a)o=e&&e[s],r=[s,": var(",t,A,s],o&&r.push(",",o.replace(N,"")),r.push(")"),N.test(a[s])&&r.push(" !important"),n.push(r.join(""))}return n.join("; ")}_replaceInitialOrInherit(t,e){let n=T.exec(e);return n&&(e=n[1]?this._getInitialValueForProperty(t):"apply-shim-inherit"),e}_cssTextToMap(t){let e,n,i=t.split(";"),s={};for(let t,r,o=0;o<i.length;o++)(t=i[o])&&(r=t.split(":")).length>1&&(e=r[0].trim(),n=this._replaceInitialOrInherit(e,r.slice(1).join(":")),s[e]=n);return s}_invalidateMixinEntry(t){if(k)for(let e in t.dependants)e!==this._currentElement&&k(e)}_produceCssProperties(t,e,n,i,s){if(n&&function t(e,n){let i=e.indexOf("var(");if(-1===i)return n(e,"","","");let s=P(e,i+3),r=e.substring(i+4,s),o=e.substring(0,i),a=t(e.substring(s+1),n),l=r.indexOf(",");return-1===l?n(o,r.trim(),"",a):n(o,r.substring(0,l).trim(),r.substring(l+1).trim(),a)}(n,(t,e)=>{e&&this._map.get(e)&&(i=`@apply ${e};`)}),!i)return t;let r=this._consumeCssProperties(""+i,s),o=t.slice(0,t.indexOf("--")),a=this._cssTextToMap(r),l=a,c=this._map.get(e),h=c&&c.properties;h?l=Object.assign(Object.create(h),a):this._map.set(e,l);let u,d,p=[],_=!1;for(u in l)void 0===(d=a[u])&&(d="initial"),!h||u in h||(_=!0),p.push(`${e}${A}${u}: ${d}`);return _&&this._invalidateMixinEntry(c),c&&(c.properties=l),n&&(o=`${t};${o}`),`${o}${p.join("; ")};`}}j.prototype.detectMixin=j.prototype.detectMixin,j.prototype.transformStyle=j.prototype.transformStyle,j.prototype.transformCustomStyle=j.prototype.transformCustomStyle,j.prototype.transformRules=j.prototype.transformRules,j.prototype.transformRule=j.prototype.transformRule,j.prototype.transformTemplate=j.prototype.transformTemplate,j.prototype._separator=A,Object.defineProperty(j.prototype,"invalidCallback",{get:()=>k,set(t){k=t}});var M=j;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/var L={};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const R="_applyShimCurrentVersion",D="_applyShimNextVersion",H="_applyShimValidatingVersion",F=Promise.resolve();function z(t){let e=L[t];e&&function(t){t[R]=t[R]||0,t[H]=t[H]||0,t[D]=(t[D]||0)+1}(e)}function B(t){return t[R]===t[D]}function q(t){return!B(t)&&t[H]===t[D]}function Y(t){t[H]=t[D],t._validating||(t._validating=!0,F.then(function(){t[R]=t[D],t._validating=!1}))}n(27);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const V=new M;class ${constructor(){this.customStyleInterface=null,V.invalidCallback=z}ensure(){this.customStyleInterface||(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface&&(this.customStyleInterface.transformCallback=(t=>{V.transformCustomStyle(t)}),this.customStyleInterface.validateCallback=(()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})})))}prepareTemplate(t,e){if(this.ensure(),x(t))return;L[e]=t;let n=V.transformTemplate(t,e);t._styleAst=n}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let t=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let e=0;e<t.length;e++){let n=t[e],i=this.customStyleInterface.getStyleForCustomStyle(n);i&&V.transformCustomStyle(i)}this.customStyleInterface.enqueued=!1}}styleSubtree(t,e){if(this.ensure(),e&&Object(S.c)(t,e),t.shadowRoot){this.styleElement(t);let e=t.shadowRoot.children||t.shadowRoot.childNodes;for(let t=0;t<e.length;t++)this.styleSubtree(e[t])}else{let e=t.children||t.childNodes;for(let t=0;t<e.length;t++)this.styleSubtree(e[t])}}styleElement(t){this.ensure();let{is:e}=function(t){let e=t.localName,n="",i="";return e?e.indexOf("-")>-1?n=e:(i=e,n=t.getAttribute&&t.getAttribute("is")||""):(n=t.is,i=t.extends),{is:n,typeExtension:i}}(t),n=L[e];if((!n||!x(n))&&n&&!B(n)){q(n)||(this.prepareTemplate(n,e),Y(n));let i=t.shadowRoot;if(i){let t=i.querySelector("style");t&&(t.__cssRules=n._styleAst,t.textContent=b(n._styleAst))}}}styleDocument(t){this.ensure(),this.styleSubtree(document.body,t)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const t=new $;let e=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(e,n,i){t.flushCustomStyles(),t.prepareTemplate(e,n)},prepareTemplateStyles(t,e,n){this.prepareTemplate(t,e,n)},prepareTemplateDom(t,e){},styleSubtree(e,n){t.flushCustomStyles(),t.styleSubtree(e,n)},styleElement(e){t.flushCustomStyles(),t.styleElement(e)},styleDocument(e){t.flushCustomStyles(),t.styleDocument(e)},getComputedStyleValue:(t,e)=>Object(S.b)(t,e),flushCustomStyles(){t.flushCustomStyles()},nativeCss:i.a,nativeShadow:i.b},e&&(window.ShadyCSS.CustomStyleInterface=e)}window.ShadyCSS.ApplyShim=V;var U=n(15),X=n(24),J=n(22),G=n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const W=/:host\(:dir\((ltr|rtl)\)\)/g,K=':host([dir="$1"])',Z=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,Q=':host([dir="$2"]) $1',tt=[];let et=null,nt="";function it(){nt=document.documentElement.getAttribute("dir")}function st(t){if(!t.__autoDirOptOut){t.setAttribute("dir",nt)}}function rt(){it(),nt=document.documentElement.getAttribute("dir");for(let t=0;t<tt.length;t++)st(tt[t])}const ot=Object(G.a)(t=>{et||(it(),(et=new MutationObserver(rt)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const e=Object(J.a)(t);class n extends e{static _processStyleText(t,e){return t=super._processStyleText(t,e),t=this._replaceDirInCssText(t)}static _replaceDirInCssText(t){let e=t;return t!==(e=(e=e.replace(W,K)).replace(Z,Q))&&(this.__activateDir=!0),e}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){e.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(et&&et.takeRecords().length&&rt(),tt.push(this),st(this))}disconnectedCallback(){if(e.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const t=tt.indexOf(this);t>-1&&tt.splice(t,1)}}}return n.__activateDir=!1,n});n(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function at(){document.body.removeAttribute("unresolved")}"interactive"===document.readyState||"complete"===document.readyState?at():window.addEventListener("DOMContentLoaded",at);var lt=n(6),ct=n(20),ht=n(9),ut=n(3),dt=n(0);n.d(e,"a",function(){return _t});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let pt=window.ShadyCSS;const _t=Object(G.a)(t=>{const e=ot(Object(X.a)(Object(U.a)(t))),n={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class i extends e{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers,this._applyListeners()}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(t,e,n,i){e!==n&&(super.attributeChangedCallback(t,e,n,i),this.attributeChanged(t,e,n))}attributeChanged(t,e,n){}_initializeProperties(){let t=Object.getPrototypeOf(this);t.hasOwnProperty("__hasRegisterFinished")||(t.__hasRegisterFinished=!0,this._registered()),super._initializeProperties(),this.root=this,this.created()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(t){return this._serializeValue(t)}deserialize(t,e){return this._deserializeValue(t,e)}reflectPropertyToAttribute(t,e,n){this._propertyToAttribute(t,e,n)}serializeValueToAttribute(t,e,n){this._valueToNodeAttribute(n||this,t,e)}extend(t,e){if(!t||!e)return t||e;let n=Object.getOwnPropertyNames(e);for(let i,s=0;s<n.length&&(i=n[s]);s++){let n=Object.getOwnPropertyDescriptor(e,i);n&&Object.defineProperty(t,i,n)}return t}mixin(t,e){for(let n in e)t[n]=e[n];return t}chainObject(t,e){return t&&e&&t!==e&&(t.__proto__=e),t}instanceTemplate(t){let e=this.constructor._contentForTemplate(t);return document.importNode(e,!0)}fire(t,e,n){n=n||{},e=null==e?{}:e;let i=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return i.detail=e,(n.node||this).dispatchEvent(i),i}listen(t,e,n){t=t||this;let i=this.__boundListeners||(this.__boundListeners=new WeakMap),s=i.get(t);s||(s={},i.set(t,s));let r=e+n;s[r]||(s[r]=this._addMethodEventListenerToNode(t,e,n,this))}unlisten(t,e,n){t=t||this;let i=this.__boundListeners&&this.__boundListeners.get(t),s=e+n,r=i&&i[s];r&&(this._removeEventListenerFromNode(t,e,r),i[s]=null)}setScrollDirection(t,e){Object(ct.c)(e||this,n[t]||"auto")}$$(t){return this.root.querySelector(t)}get domHost(){let t=this.getRootNode();return t instanceof DocumentFragment?t.host:t}distributeContent(){window.ShadyDOM&&this.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return Object(lt.a)(this).getEffectiveChildNodes()}queryDistributedElements(t){return Object(lt.a)(this).queryDistributedElements(t)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter(function(t){return t.nodeType===Node.ELEMENT_NODE})}getEffectiveTextContent(){let t=this.getEffectiveChildNodes(),e=[];for(let n,i=0;n=t[i];i++)n.nodeType!==Node.COMMENT_NODE&&e.push(n.textContent);return e.join("")}queryEffectiveChildren(t){let e=this.queryDistributedElements(t);return e&&e[0]}queryAllEffectiveChildren(t){return this.queryDistributedElements(t)}getContentChildNodes(t){let e=this.root.querySelector(t||"slot");return e?Object(lt.a)(e).getDistributedNodes():[]}getContentChildren(t){return this.getContentChildNodes(t).filter(function(t){return t.nodeType===Node.ELEMENT_NODE})}isLightDescendant(t){return this!==t&&this.contains(t)&&this.getRootNode()===t.getRootNode()}isLocalDescendant(t){return this.root===t.getRootNode()}scopeSubtree(t,e){}getComputedStyleValue(t){return pt.getComputedStyleValue(this,t)}debounce(t,e,n){return this._debouncers=this._debouncers||{},this._debouncers[t]=ht.a.debounce(this._debouncers[t],n>0?ut.b.after(n):ut.a,e.bind(this))}isDebouncerActive(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];return!(!e||!e.isActive())}flushDebouncer(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];e&&e.flush()}cancelDebouncer(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];e&&e.cancel()}async(t,e){return e>0?ut.b.run(t.bind(this),e):~ut.a.run(t.bind(this))}cancelAsync(t){t<0?ut.a.cancel(~t):ut.b.cancel(t)}create(t,e){let n=document.createElement(t);if(e)if(n.setProperties)n.setProperties(e);else for(let t in e)n[t]=e[t];return n}elementMatches(t,e){return Object(lt.b)(e||this,t)}toggleAttribute(t,e){let n=this;return 3===arguments.length&&(n=arguments[2]),1==arguments.length&&(e=!n.hasAttribute(t)),e?(n.setAttribute(t,""),!0):(n.removeAttribute(t),!1)}toggleClass(t,e,n){n=n||this,1==arguments.length&&(e=!n.classList.contains(t)),e?n.classList.add(t):n.classList.remove(t)}transform(t,e){(e=e||this).style.webkitTransform=t,e.style.transform=t}translate3d(t,e,n,i){i=i||this,this.transform("translate3d("+t+","+e+","+n+")",i)}arrayDelete(t,e){let n;if(Array.isArray(t)){if((n=t.indexOf(e))>=0)return t.splice(n,1)}else{if((n=Object(dt.a)(this,t).indexOf(e))>=0)return this.splice(t,n,1)}return null}_logger(t,e){switch(Array.isArray(e)&&1===e.length&&Array.isArray(e[0])&&(e=e[0]),t){case"log":case"warn":case"error":console[t](...e)}}_log(...t){this._logger("log",t)}_warn(...t){this._logger("warn",t)}_error(...t){this._logger("error",t)}_logf(t,...e){return["[%s::%s]",this.is,t,...e]}}return i.prototype.is="",i})},function(t,e,n){"use strict";n.d(e,"a",function(){return l});n(1);var i=n(2),s=n(14),r=n(23);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const o={};let a=HTMLElement.prototype;for(;a;){let t=Object.getOwnPropertyNames(a);for(let e=0;e<t.length;e++)o[t[e]]=!0;a=Object.getPrototypeOf(a)}const l=Object(i.a)(t=>{const e=Object(r.a)(t);return class extends e{static createPropertiesForAttributes(){let t=this.observedAttributes;for(let e=0;e<t.length;e++)this.prototype._createPropertyAccessor(Object(s.b)(t[e]))}static attributeNameForProperty(t){return Object(s.a)(t)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(t){for(let e in t)this._setProperty(e,t[e])}_ensureAttribute(t,e){const n=this;n.hasAttribute(t)||this._valueToNodeAttribute(n,e,t)}_serializeValue(t){switch(typeof t){case"object":if(t instanceof Date)return t.toString();if(t)try{return JSON.stringify(t)}catch(t){return""}default:return super._serializeValue(t)}}_deserializeValue(t,e){let n;switch(e){case Object:try{n=JSON.parse(t)}catch(e){n=t}break;case Array:try{n=JSON.parse(t)}catch(e){n=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${t}`)}break;case Date:n=isNaN(t)?String(t):Number(t),n=new Date(n);break;default:n=super._deserializeValue(t,e)}return n}_definePropertyAccessor(t,e){!function(t,e){if(!o[e]){let n=t[e];void 0!==n&&(t.__data?t._setPendingProperty(e,n):(t.__dataProto?t.hasOwnProperty(JSCompiler_renameProperty("__dataProto",t))||(t.__dataProto=Object.create(t.__dataProto)):t.__dataProto={},t.__dataProto[e]=n))}}(this,t),super._definePropertyAccessor(t,e)}_hasAccessor(t){return this.__dataHasAccessor&&this.__dataHasAccessor[t]}_isPropertyPending(t){return Boolean(this.__dataPending&&t in this.__dataPending)}}})},function(t,e,n){"use strict";n.d(e,"a",function(){return r});n(1);var i=n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const s=n(3).a,r=Object(i.a)(t=>{return class extends t{static createProperties(t){const e=this.prototype;for(let n in t)n in e||e._createPropertyAccessor(n)}static attributeNameForProperty(t){return t.toLowerCase()}static typeForProperty(t){}_createPropertyAccessor(t,e){this._addPropertyToAttributeMap(t),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[t]||(this.__dataHasAccessor[t]=!0,this._definePropertyAccessor(t,e))}_addPropertyToAttributeMap(t){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[t]){const e=this.constructor.attributeNameForProperty(t);this.__dataAttributes[e]=t}}_definePropertyAccessor(t,e){Object.defineProperty(this,t,{get(){return this._getProperty(t)},set:e?function(){}:function(e){this._setProperty(t,e)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let t in this.__dataHasAccessor)this.hasOwnProperty(t)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[t]=this[t],delete this[t])}_initializeInstanceProperties(t){Object.assign(this,t)}_setProperty(t,e){this._setPendingProperty(t,e)&&this._invalidateProperties()}_getProperty(t){return this.__data[t]}_setPendingProperty(t,e,n){let i=this.__data[t],s=this._shouldPropertyChange(t,e,i);return s&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||t in this.__dataOld||(this.__dataOld[t]=i),this.__data[t]=e,this.__dataPending[t]=e),s}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,s.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const t=this.__data,e=this.__dataPending,n=this.__dataOld;this._shouldPropertiesChange(t,e,n)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(t,e,n))}_shouldPropertiesChange(t,e,n){return Boolean(e)}_propertiesChanged(t,e,n){}_shouldPropertyChange(t,e,n){return n!==e&&(n==n||e==e)}attributeChangedCallback(t,e,n,i){e!==n&&this._attributeToProperty(t,n),super.attributeChangedCallback&&super.attributeChangedCallback(t,e,n,i)}_attributeToProperty(t,e,n){if(!this.__serializing){const i=this.__dataAttributes,s=i&&i[t]||t;this[s]=this._deserializeValue(e,n||this.constructor.typeForProperty(s))}}_propertyToAttribute(t,e,n){this.__serializing=!0,n=arguments.length<3?this[t]:n,this._valueToNodeAttribute(this,n,e||this.constructor.attributeNameForProperty(t)),this.__serializing=!1}_valueToNodeAttribute(t,e,n){const i=this._serializeValue(e);void 0===i?t.removeAttribute(n):t.setAttribute(n,i)}_serializeValue(t){switch(typeof t){case"boolean":return t?"":void 0;default:return null!=t?t.toString():void 0}}_deserializeValue(t,e){switch(e){case Boolean:return null!==t;case Number:return Number(t);default:return t}}}})},function(t,e,n){"use strict";n.d(e,"a",function(){return r});n(1);var i=n(2),s=n(20);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r=Object(i.a)(t=>{return class extends t{_addEventListenerToNode(t,e,n){Object(s.a)(t,e,n)||super._addEventListenerToNode(t,e,n)}_removeEventListenerFromNode(t,e,n){Object(s.b)(t,e,n)||super._removeEventListenerFromNode(t,e,n)}}})},function(t,e,n){"use strict";n.d(e,"a",function(){return c});n(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function i(t,e,n){return{index:t,removed:e,addedCount:n}}const s=0,r=1,o=2,a=3;function l(t,e,n,l,c,u){let d,p=0,_=0,f=Math.min(n-e,u-c);if(0==e&&0==c&&(p=function(t,e,n){for(let i=0;i<n;i++)if(!h(t[i],e[i]))return i;return n}(t,l,f)),n==t.length&&u==l.length&&(_=function(t,e,n){let i=t.length,s=e.length,r=0;for(;r<n&&h(t[--i],e[--s]);)r++;return r}(t,l,f-p)),c+=p,u-=_,(n-=_)-(e+=p)==0&&u-c==0)return[];if(e==n){for(d=i(e,[],0);c<u;)d.removed.push(l[c++]);return[d]}if(c==u)return[i(e,[],n-e)];let m=function(t){let e=t.length-1,n=t[0].length-1,i=t[e][n],l=[];for(;e>0||n>0;){if(0==e){l.push(o),n--;continue}if(0==n){l.push(a),e--;continue}let c,h=t[e-1][n-1],u=t[e-1][n],d=t[e][n-1];(c=u<d?u<h?u:h:d<h?d:h)==h?(h==i?l.push(s):(l.push(r),i=h),e--,n--):c==u?(l.push(a),e--,i=u):(l.push(o),n--,i=d)}return l.reverse(),l}(function(t,e,n,i,s,r){let o=r-s+1,a=n-e+1,l=new Array(o);for(let t=0;t<o;t++)l[t]=new Array(a),l[t][0]=t;for(let t=0;t<a;t++)l[0][t]=t;for(let n=1;n<o;n++)for(let r=1;r<a;r++)if(h(t[e+r-1],i[s+n-1]))l[n][r]=l[n-1][r-1];else{let t=l[n-1][r]+1,e=l[n][r-1]+1;l[n][r]=t<e?t:e}return l}(t,e,n,l,c,u));d=void 0;let y=[],g=e,b=c;for(let t=0;t<m.length;t++)switch(m[t]){case s:d&&(y.push(d),d=void 0),g++,b++;break;case r:d||(d=i(g,[],0)),d.addedCount++,g++,d.removed.push(l[b]),b++;break;case o:d||(d=i(g,[],0)),d.addedCount++,g++;break;case a:d||(d=i(g,[],0)),d.removed.push(l[b]),b++}return d&&y.push(d),y}function c(t,e){return l(t,0,t.length,e,0,e.length)}function h(t,e){return t===e}},function(t,e,n){"use strict";n.d(e,"a",function(){return s});n(17);var i=n(13);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class s{constructor(t){s[" "](t),this.type=t&&t.type||"default",this.key=t&&t.key,t&&"value"in t&&(this.value=t.value)}get value(){var t=this.type,e=this.key;if(t&&e)return s.types[t]&&s.types[t][e]}set value(t){var e=this.type,n=this.key;e&&n&&(e=s.types[e]=s.types[e]||{},null==t?delete e[n]:e[n]=t)}get list(){if(this.type){var t=s.types[this.type];return t?Object.keys(t).map(function(t){return r[this.type][t]},this):[]}}byKey(t){return this.key=t,this.value}}s[" "]=function(){},s.types={};var r=s.types;Object(i.a)({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:!0},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:!0},__computeMeta:function(t,e,n){var i=new s({type:t,key:e});return void 0!==n&&n!==i.value?i.value=n:this.value!==i.value&&(this.value=i.value),i},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(t){t&&(this.value=this)},byKey:function(t){return new s({type:this.type,key:t}).value}})},function(t,e,n){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i,s=null,r=window.HTMLImports&&window.HTMLImports.whenReady||null;function o(t){requestAnimationFrame(function(){r?r(t):(s||(s=new Promise(t=>{i=t}),"complete"===document.readyState?i():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&i()})),s.then(function(){t&&t()}))})}n.d(e,"a",function(){return u});const a="__seenByShadyCSS",l="__shadyCSSCachedStyle";let c=null,h=null;class u{constructor(){this.customStyles=[],this.enqueued=!1,o(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&h&&(this.enqueued=!0,o(h))}addCustomStyle(t){t[a]||(t[a]=!0,this.customStyles.push(t),this.enqueueDocumentValidation())}getStyleForCustomStyle(t){if(t[l])return t[l];let e;return e=t.getStyle?t.getStyle():t}processStyles(){const t=this.customStyles;for(let e=0;e<t.length;e++){const n=t[e];if(n[l])continue;const i=this.getStyleForCustomStyle(n);if(i){const t=i.__appliedElement||i;c&&c(t),n[l]=t}}return t}}u.prototype.addCustomStyle=u.prototype.addCustomStyle,u.prototype.getStyleForCustomStyle=u.prototype.getStyleForCustomStyle,u.prototype.processStyles=u.prototype.processStyles,Object.defineProperties(u.prototype,{transformCallback:{get:()=>c,set(t){c=t}},validateCallback:{get:()=>h,set(t){let e=!1;h||(e=!0),h=t,e&&this.enqueueDocumentValidation()}}})},,,,function(t,e,n){n(32).toBody('<iron-iconset-svg size=24 name=i> <svg><defs> <g id=videogame-asset><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g> <g id=assignment-ind><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g> <g id=code><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g> <g id=home><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g> <g id=mail><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g> <g id=menu><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g> <g id=polymer><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g> <g id=work><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g> <g id=open-in-new><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g> </defs></svg> </iron-iconset-svg>'),n(36),n(33)},function(t,e){t.exports=class{static register(t){let e;const n=document.createElement("template");if(n.innerHTML=t,n.content)e=n.content;else for(e=document.createDocumentFragment();n.firstChild;)e.appendChild(n.firstChild);document.importNode(e,!0)}static toBody(t){const e=t.trim();if(e){const t=document.createElement("div");t.innerHTML=e,t.firstChild&&(document.body?document.body.appendChild(t.firstChild):document.addEventListener("DOMContentLoaded",()=>{document.body.appendChild(t.firstChild)}))}}}},function(t,e,n){"use strict";n.r(e);n(17);var i=n(26),s=n(13),r=n(6);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(s.a)({is:"iron-iconset-svg",properties:{name:{type:String,observer:"_nameChanged"},size:{type:Number,value:24},rtlMirroring:{type:Boolean,value:!1},useGlobalRtlAttribute:{type:Boolean,value:!1}},created:function(){this._meta=new i.a({type:"iconset",key:null,value:null})},attached:function(){this.style.display="none"},getIconNames:function(){return this._icons=this._createIconMap(),Object.keys(this._icons).map(function(t){return this.name+":"+t},this)},applyIcon:function(t,e){this.removeIcon(t);var n=this._cloneIcon(e,this.rtlMirroring&&this._targetIsRTL(t));if(n){var i=Object(r.a)(t.root||t);return i.insertBefore(n,i.childNodes[0]),t._svgIcon=n}return null},removeIcon:function(t){t._svgIcon&&(Object(r.a)(t.root||t).removeChild(t._svgIcon),t._svgIcon=null)},_targetIsRTL:function(t){if(null==this.__targetIsRTL)if(this.useGlobalRtlAttribute){var e=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL="rtl"===e.getAttribute("dir")}else t&&t.nodeType!==Node.ELEMENT_NODE&&(t=t.host),this.__targetIsRTL=t&&"rtl"===window.getComputedStyle(t).direction;return this.__targetIsRTL},_nameChanged:function(){this._meta.value=null,this._meta.key=this.name,this._meta.value=this,this.async(function(){this.fire("iron-iconset-added",this,{node:window})})},_createIconMap:function(){var t=Object.create(null);return Object(r.a)(this).querySelectorAll("[id]").forEach(function(e){t[e.id]=e}),t},_cloneIcon:function(t,e){return this._icons=this._icons||this._createIconMap(),this._prepareSvgClone(this._icons[t],this.size,e)},_prepareSvgClone:function(t,e,n){if(t){var i=t.cloneNode(!0),s=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=i.getAttribute("viewBox")||"0 0 "+e+" "+e,o="pointer-events: none; display: block; width: 100%; height: 100%;";return n&&i.hasAttribute("mirror-in-rtl")&&(o+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"),s.setAttribute("viewBox",r),s.setAttribute("preserveAspectRatio","xMidYMid meet"),s.setAttribute("focusable","false"),s.style.cssText=o,s.appendChild(i).removeAttribute("id"),s}return null}})},,,function(t,e,n){"use strict";n.r(e);var i=n(17),s=n(12);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const r=s["a"]`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;r.setAttribute("style","display: none;"),document.head.appendChild(r.content);var o=document.createElement("style");o.textContent="[hidden] { display: none !important; }",document.head.appendChild(o);n(26);var a=n(13),l=n(6);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(a.a)({_template:s["a"]`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        @apply --iron-icon;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
`,is:"iron-icon",properties:{icon:{type:String},theme:{type:String},src:{type:String},_meta:{value:i.a.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function(t){var e=(t||"").split(":");this._iconName=e.pop(),this._iconsetName=e.pop()||this._DEFAULT_ICONSET,this._updateIcon()},_srcChanged:function(t){this._updateIcon()},_usesIconset:function(){return this.icon||!this.src},_updateIcon:function(){this._usesIconset()?(this._img&&this._img.parentNode&&Object(l.a)(this.root).removeChild(this._img),""===this._iconName?this._iconset&&this._iconset.removeIcon(this):this._iconsetName&&this._meta&&(this._iconset=this._meta.byKey(this._iconsetName),this._iconset?(this._iconset.applyIcon(this,this._iconName,this.theme),this.unlisten(window,"iron-iconset-added","_updateIcon")):this.listen(window,"iron-iconset-added","_updateIcon"))):(this._iconset&&this._iconset.removeIcon(this),this._img||(this._img=document.createElement("img"),this._img.style.width="100%",this._img.style.height="100%",this._img.draggable=!1),this._img.src=this.src,Object(l.a)(this.root).appendChild(this._img))}})}]);