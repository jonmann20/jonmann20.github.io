!function(e){function t(t){for(var s,i,r=t[0],o=t[1],a=0,c=[];a<r.length;a++)i=r[a],n[i]&&c.push(n[i][0]),n[i]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);for(l&&l(t);c.length;)c.shift()()}var s={},n={12:0};function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],s=n[e];if(0!==s)if(s)t.push(s[2]);else{var r=new Promise(function(t,i){s=n[e]=[t,i]});t.push(s[2]=r);var o,a=document.createElement("script");a.charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.src=function(e){return i.p+""+({0:"0-a-side-js",1:"1-head-er-js",2:"10-styles-carousel-js",3:"11-styles-page-js",4:"2-page-ball-pit-js",5:"3-page-breakdancing-cube-js",6:"4-page-games-js",7:"5-page-home-js",8:"6-page-playground-js",9:"7-page-portfolio-js",10:"8-page-starry-background-js",11:"9-styles-base-js"}[e]||e)+".js"}(e),o=function(t){a.onerror=a.onload=null,clearTimeout(l);var s=n[e];if(0!==s){if(s){var i=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+i+": "+r+")");o.type=i,o.request=r,s[1](o)}n[e]=void 0}};var l=setTimeout(function(){o({type:"timeout",target:a})},12e4);a.onerror=a.onload=o,document.head.appendChild(a)}return Promise.all(t)},i.m=e,i.c=s,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var r=window.webpackJsonp=window.webpackJsonp||[],o=r.push.bind(r);r.push=t,r=r.slice();for(var a=0;a<r.length;a++)t(r[a]);var l=o;i(i.s=5)}([function(e,t,s){"use strict";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const n=new WeakMap,i=e=>"function"==typeof e&&n.has(e),r=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(e,t,s=null)=>{let n=t;for(;n!==s;){const t=n.nextSibling;e.removeChild(n),n=t}},a={},l={},c=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${c}--\x3e`,h=new RegExp(`${c}|${d}`),u="$lit$";class p{constructor(e,t){this.parts=[],this.element=t;let s=-1,n=0;const i=[],r=t=>{const o=t.content,a=document.createTreeWalker(o,133,null,!1);let l=0;for(;a.nextNode();){s++;const t=a.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const i=t.attributes;let r=0;for(let e=0;e<i.length;e++)i[e].value.indexOf(c)>=0&&r++;for(;r-- >0;){const i=e.strings[n],r=g.exec(i)[2],o=r.toLowerCase()+u,a=t.getAttribute(o).split(h);this.parts.push({type:"attribute",index:s,name:r,strings:a}),t.removeAttribute(o),n+=a.length-1}}"TEMPLATE"===t.tagName&&r(t)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(c)>=0){const r=t.parentNode,o=e.split(h),a=o.length-1;for(let e=0;e<a;e++)r.insertBefore(""===o[e]?f():document.createTextNode(o[e]),t),this.parts.push({type:"node",index:++s});""===o[a]?(r.insertBefore(f(),t),i.push(t)):t.data=o[a],n+=a}}else if(8===t.nodeType)if(t.data===c){const e=t.parentNode;null!==t.previousSibling&&s!==l||(s++,e.insertBefore(f(),t)),l=s,this.parts.push({type:"node",index:s}),null===t.nextSibling?t.data="":(i.push(t),s--),n++}else{let e=-1;for(;-1!==(e=t.data.indexOf(c,e+1));)this.parts.push({type:"node",index:-1})}}};r(t);for(const e of i)e.parentNode.removeChild(e)}}const m=e=>-1!==e.index,f=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y{constructor(e,t,s){this._parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this._parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let s=0,n=0;const i=e=>{const r=document.createTreeWalker(e,133,null,!1);let o=r.nextNode();for(;s<t.length&&null!==o;){const e=t[s];if(m(e))if(n===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(o.previousSibling),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(o,e.name,e.strings,this.options));s++}else n++,"TEMPLATE"===o.nodeName&&i(o.content),o=r.nextNode();else this._parts.push(void 0),s++}};return i(e),r&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class v{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){const e=this.strings.length-1;let t="";for(let s=0;s<e;s++){const e=this.strings[s],n=g.exec(e);t+=n?e.substr(0,n.index)+n[1]+n[2]+u+n[3]+c:e+d}return t+this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const _=e=>null===e||!("object"==typeof e||"function"==typeof e);class b{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1;let s="";for(let n=0;n<t;n++){s+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)s+="string"==typeof t?t:String(t);else s+="string"==typeof e?e:String(e)}}return s+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===a||_(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=a,e(this)}this.value!==a&&this.committer.commit()}}class w{constructor(e){this.value=void 0,this._pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(f()),this.endNode=e.appendChild(f())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=f()),e._insert(this.endNode=f())}insertAfterPart(e){e._insert(this.startNode=f()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=a,e(this)}const e=this._pendingValue;e!==a&&(_(e)?e!==this.value&&this._commitText(e):e instanceof v?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):e===l?(this.value=l,this.clear()):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&3===t.nodeType?t.data=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value&&this.value.template===t)this.value.update(e.values);else{const s=new y(t,e.processor,this.options),n=s._clone();s.update(e.values),this._commitNode(n),this.value=s}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,n=0;for(const i of e)void 0===(s=t[n])&&(s=new w(this.options),t.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(t[n-1])),s.setValue(i),s.commit(),n++;n<t.length&&(t.length=n,this.clear(s&&s.endNode))}clear(e=this.startNode){o(this.startNode.parentNode,e.nextSibling,this.endNode)}}class P{constructor(e,t,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=a,e(this)}if(this._pendingValue===a)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=a}}class x extends b{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends S{}let C=!1;try{const e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class A{constructor(e,t,s){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this._boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this._pendingValue=e}commit(){for(;i(this._pendingValue);){const e=this._pendingValue;this._pendingValue=a,e(this)}if(this._pendingValue===a)return;const e=this._pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=j(e),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=e,this._pendingValue=a}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const j=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=new class{handleAttributeExpressions(e,t,s,n){const i=t[0];return"."===i?new x(e,t.slice(1),s).parts:"@"===i?[new A(e,t.slice(1),n.eventContext)]:"?"===i?[new P(e,t.slice(1),s)]:new b(e,t,s).parts}handleTextExpression(e){return new w(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function T(e){let t=k.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},k.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(c);return void 0===(s=t.keyString.get(n))&&(s=new p(e,e.getTemplateElement()),t.keyString.set(n,s)),t.stringsArray.set(e.strings,s),s}const k=new Map,O=new WeakMap,V=(e,...t)=>new v(e,t,"html",E),M=133;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function R(e,t){const{element:{content:s},parts:n}=e,i=document.createTreeWalker(s,M,null,!1);let r=L(n),o=n[r],a=-1,l=0;const c=[];let d=null;for(;i.nextNode();){a++;const e=i.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,o=n[r=L(n,r)]}c.forEach(e=>e.parentNode.removeChild(e))}const q=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,M,null,!1);for(;s.nextNode();)t++;return t},L=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(m(t))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const U=(e,t)=>`${e}--${t}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),z=!1);const F=e=>t=>{const s=U(t.type,e);let n=k.get(s);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},k.set(s,n));let i=n.stringsArray.get(t.strings);if(void 0!==i)return i;const r=t.strings.join(c);if(void 0===(i=n.keyString.get(r))){const s=t.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(s,e),i=new p(t,s),n.keyString.set(r,i)}return n.stringsArray.set(t.strings,i),i},$=["html","svg"],I=new Set,B=(e,t,s)=>{I.add(s);const n=e.querySelectorAll("style");if(0===n.length)return void window.ShadyCSS.prepareTemplateStyles(t.element,s);const i=document.createElement("style");for(let e=0;e<n.length;e++){const t=n[e];t.parentNode.removeChild(t),i.textContent+=t.textContent}if((e=>{$.forEach(t=>{const s=k.get(U(t,e));void 0!==s&&s.keyString.forEach(e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{s.add(e)}),R(e,s)})})})(s),function(e,t,s=null){const{element:{content:n},parts:i}=e;if(null==s)return void n.appendChild(t);const r=document.createTreeWalker(n,M,null,!1);let o=L(i),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=q(t),s.parentNode.insertBefore(t,s));-1!==o&&i[o].index===l;){if(a>0){for(;-1!==o;)i[o].index+=a,o=L(i,o);return}o=L(i,o)}}(t,i,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,s),window.ShadyCSS.nativeShadow){const s=t.element.content.querySelector("style");e.insertBefore(s.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(i,t.element.content.firstChild);const e=new Set;e.add(i),R(t,e)}},H=(e,t)=>e,W={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},D=(e,t)=>t!==e&&(t==t||e==e),J={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:D},G=Promise.resolve(!0),K=1,Q=4,X=8,Y=16,Z=32;class ee extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=G,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const e=[];return this._classProperties.forEach((t,s)=>{const n=this._attributeNameForProperty(s,t);void 0!==n&&(this._attributeToPropertyMap.set(n,s),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(H("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=J){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[s]},set(t){const n=this[e];this[s]=t,this.requestUpdate(e,n)},configurable:!0,enumerable:!0})}static _finalize(){if(this.hasOwnProperty(H("finalized",this))&&this.finalized)return;const e=Object.getPrototypeOf(this);if("function"==typeof e._finalize&&e._finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(H("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=D){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,n=t.converter||W,i="function"==typeof n?n:n.fromAttribute;return i?i(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,n=t.converter;return(n&&n.toAttribute||W.toAttribute)(e,s)}initialize(){this._saveInstanceProperties()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver?(this._hasConnectedResolver(),this._hasConnectedResolver=void 0):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=J){const n=this.constructor,i=n._attributeNameForProperty(e,s);if(void 0!==i){const e=n._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=this._updateState|X,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=this._updateState&~X}}_attributeToProperty(e,t){if(this._updateState&X)return;const s=this.constructor,n=s._attributeToPropertyMap.get(e);if(void 0!==n){const e=s._classProperties.get(n)||J;this._updateState=this._updateState|Y,this[n]=s._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~Y}}requestUpdate(e,t){let s=!0;if(void 0!==e&&!this._changedProperties.has(e)){const n=this.constructor,i=n._classProperties.get(e)||J;n._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.set(e,t),!0!==i.reflect||this._updateState&Y||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}return!this._hasRequestedUpdate&&s&&this._enqueueUpdate(),this.updateComplete}async _enqueueUpdate(){let e;this._updateState=this._updateState|Q;const t=this._updatePromise;this._updatePromise=new Promise(t=>e=t),await t,this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);const s=this.performUpdate();null!=s&&"function"==typeof s.then&&await s,e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&K}performUpdate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const e=this._changedProperties;this.update(e),this._markUpdated(),this._updateState&K||(this._updateState=this._updateState|K,this.firstUpdated(e)),this.updated(e)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}ee.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const te=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:s,elements:n}=t;return{kind:s,elements:n,finisher(t){window.customElements.define(e,t)}}})(e,t);ie((e,t)=>e.querySelector(t)),ie((e,t)=>e.querySelectorAll(t));const se=(e,t,s)=>{Object.defineProperty(t,s,e)},ne=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e});function ie(e){return t=>(s,n)=>{const i={get(){return e(this.renderRoot,t)},enumerable:!0,configurable:!0};return void 0!==n?se(i,s,n):ne(i,s)}}const re="adoptedStyleSheets"in Document.prototype;s.d(t,"a",function(){return ae}),s.d(t,"b",function(){return te}),s.d(t,"c",function(){return V});const oe=e=>e.flat?e.flat(1/0):
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function e(t,s=[]){for(let n=0,i=t.length;n<i;n++){const i=t[n];Array.isArray(i)?e(i,s):s.push(i)}return s}(e);class ae extends ee{static get _uniqueStyles(){if(!this.hasOwnProperty(H("_styles",this)))if(this.hasOwnProperty(H("styles",this))){const e=this.styles;if(Array.isArray(e)){const t=oe(e).reduceRight((e,t)=>(e.add(t),e),new Set);this._styles=[],t.forEach(e=>this._styles.unshift(e))}else this._styles=e?[e]:[]}else this._styles=void 0!==this._styles?this._styles:[];return this._styles}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._uniqueStyles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?re?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof v&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._uniqueStyles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}ae.finalized=!0,ae.render=((e,t,s)=>{const n=s.scopeName,i=O.has(t),r=t instanceof ShadowRoot&&z&&e instanceof v,a=r&&!I.has(n),l=a?document.createDocumentFragment():t;if(((e,t,s)=>{let n=O.get(t);void 0===n&&(o(t,t.firstChild),O.set(t,n=new w(Object.assign({templateFactory:T},s))),n.appendInto(t)),n.setValue(e),n.commit()})(e,l,Object.assign({templateFactory:F(n)},s)),a){const e=O.get(l);O.delete(l),e.value instanceof y&&B(l,e.value.template,n),o(t,t.firstChild),t.appendChild(l),O.set(t,e)}!i&&r&&window.ShadyCSS.styleElement(t.host)})},function(e,t,s){"use strict";class n{static get pNav(){return document.querySelector("head-er").shadowRoot.querySelector(".nav2 .playground-nav-wrap")}static handleSubNav(){addEventListener("route",e=>{e.detail.includes("playground")||n.closeNav()},{passive:!0})}static openNav(){n.pNav.classList.contains("visible")||n.pNav.classList.add("visible")}static closeNav(){n.pNav.classList.contains("visible")&&n.pNav.classList.remove("visible")}}t.a=n},function(e,t,s){"use strict";class n{static require(e){return new Promise((t,s)=>{if(n.constructor._jsSrc.includes(e))t();else{let i=document.createElement("script");i.src=e,i.async=1,document.head.appendChild(i),i.onload=(()=>{n.constructor._jsSrc.push(e),t()}),i.onerror=(()=>s())}})}static addMeta(e,t){let s=document.createElement("meta");s.setAttribute("name",e),s.setAttribute("content",t),document.head.appendChild(s)}static addLink(e,t,s=!0){let n=document.createElement("link");n.setAttribute("rel",e),n.setAttribute("href",t),s&&n.setAttribute("crossorigin",""),document.head.appendChild(n)}static get getMainWidth(){const e=document.querySelector("main"),t=window.getComputedStyle(e,null),s=parseFloat(t.getPropertyValue("padding-left"));return e.getBoundingClientRect().width-s}}n.constructor._jsSrc=[],t.a=n},function(e,t,s){"use strict";
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/const n=document.createElement("link");n.rel="stylesheet",n.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(n)},function(e,t,s){var n={"./a-side.js":[10,0],"./head-er.js":[9,1],"./page-ball-pit.js":[16,4],"./page-breakdancing-cube.js":[11,5],"./page-games.js":[12,6],"./page-home.js":[13,7],"./page-playground.js":[14,8],"./page-portfolio.js":[15,9],"./page-starry-background.js":[17,10],"./styles/base.js":[6,11],"./styles/carousel.js":[8,2],"./styles/page.js":[7,3]};function i(e){var t=n[e];return t?s.e(t[1]).then(function(){var e=t[0];return s(e)}):Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}i.keys=function(){return Object.keys(n)},i.id=4,e.exports=i},function(e,t,s){"use strict";s.r(t);var n=s(0);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/const i=n.c`<style>:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}</style>`;s(3);
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
let r=class extends n.a{renderStyle(){return i}render(){return n.c`${this.renderStyle()}<slot></slot>`}};r=function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o);return r>3&&o&&Object.defineProperty(t,s,o),o}([Object(n.b)("mwc-icon")],r);var o=s(1);s(2);const a={home:"page-home",games:"page-games",playground:"page-playground","playground/ball-pit":"page-ball-pit","playground/breakdancing-cube":"page-breakdancing-cube","playground/starry-background":"page-starry-background",portfolio:"page-portfolio"};class l{static route(e){e=e.substring(1),l.resetController(e),document.querySelector("head-er").setAttribute("selectedPage",e),document.querySelector("a-side").setAttribute("selectedPage",e);const t=a[e]?a[e]:a.home;this.loadComponent(t)}static async loadComponent(e){await s(4)(`./${e}.js`)&&(document.querySelector("main").innerHTML=`<${e}></${e}>`)}static rmMeta(e){const t=document.head.querySelector(e);t&&document.head.removeChild(t)}static resetController(e){scrollTo(0,0),document.querySelector("main").innerHTML="",document.title="",l.rmMeta("meta[name=description]"),l.rmMeta("meta[name=keywords]"),window.dispatchEvent(new CustomEvent("route",{detail:e}))}}window.onhashchange=(()=>l.route(location.hash)),Promise.all([s.e(1).then(s.bind(null,9)),s.e(0).then(s.bind(null,10))]).then(()=>{o.a.handleSubNav()}),addEventListener("load",()=>{document.body.style.setProperty("--icon-opacity",1)}),l.route(location.hash)}]);