!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=31)}({31:function(t,e,i){"use strict";i.r(e);
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
const n=new WeakMap,s=t=>"function"==typeof t&&n.has(t),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(t,e,i=null)=>{let n=e;for(;n!==i;){const e=n.nextSibling;t.removeChild(n),n=e}},a={},l={},d=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${d}--\x3e`,h=new RegExp(`${d}|${c}`),p="$lit$";class u{constructor(t,e){this.parts=[],this.element=e;let i=-1,n=0;const s=[],o=e=>{const r=e.content,a=document.createTreeWalker(r,133,null,!1);let l=0;for(;a.nextNode();){i++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const s=e.attributes;let o=0;for(let t=0;t<s.length;t++)s[t].value.indexOf(d)>=0&&o++;for(;o-- >0;){const s=t.strings[n],o=f.exec(s)[2],r=o.toLowerCase()+p,a=e.getAttribute(r).split(h);this.parts.push({type:"attribute",index:i,name:o,strings:a}),e.removeAttribute(r),n+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(d)>=0){const o=e.parentNode,r=t.split(h),a=r.length-1;for(let t=0;t<a;t++)o.insertBefore(""===r[t]?g():document.createTextNode(r[t]),e),this.parts.push({type:"node",index:++i});""===r[a]?(o.insertBefore(g(),e),s.push(e)):e.data=r[a],n+=a}}else if(8===e.nodeType)if(e.data===d){const t=e.parentNode;null!==e.previousSibling&&i!==l||(i++,t.insertBefore(g(),e)),l=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(s.push(e),i--),n++}else{let t=-1;for(;-1!==(t=e.data.indexOf(d,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of s)t.parentNode.removeChild(t)}}const m=t=>-1!==t.index,g=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class v{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,n=0;const s=t=>{const o=document.createTreeWalker(t,133,null,!1);let r=o.nextNode();for(;i<e.length&&null!==r;){const t=e[i];if(m(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(r.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(r,t.name,t.strings,this.options));i++}else n++,"TEMPLATE"===r.nodeName&&s(r.content),r=o.nextNode();else this._parts.push(void 0),i++}};return s(t),o&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */class y{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],n=f.exec(t);e+=n?t.substr(0,n.index)+n[1]+n[2]+p+n[3]+d:t+c}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
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
const x=t=>null===t||!("object"==typeof t||"function"==typeof t);class b{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new _(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let n=0;n<e;n++){i+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)i+="string"==typeof e?e:String(e);else i+="string"==typeof t?t:String(t)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class _{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===a||x(t)&&t===this.value||(this.value=t,s(t)||(this.committer.dirty=!0))}commit(){for(;s(this.value);){const t=this.value;this.value=a,t(this)}this.value!==a&&this.committer.commit()}}class w{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(g()),this.endNode=t.appendChild(g())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=g()),t._insert(this.endNode=g())}insertAfterPart(t){t._insert(this.startNode=g()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}const t=this._pendingValue;t!==a&&(x(t)?t!==this.value&&this._commitText(t):t instanceof y?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===l?(this.value=l,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value&&this.value.template===e)this.value.update(t.values);else{const i=new v(e,t.processor,this.options),n=i._clone();i.update(t.values),this._commitNode(n),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const s of t)void 0===(i=e[n])&&(i=new w(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(s),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){r(this.startNode.parentNode,t.nextSibling,this.endNode)}}class S{constructor(t,e,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}if(this._pendingValue===a)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=a}}class P extends b{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends _{}let k=!1;try{const t={get capture(){return k=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class C{constructor(t,e,i){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}if(this._pendingValue===a)return;const t=this._pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),n&&(this._options=A(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=a}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(k?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
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
 */const T=new class{handleAttributeExpressions(t,e,i,n){const s=e[0];return"."===s?new P(t,e.slice(1),i).parts:"@"===s?[new C(t,e.slice(1),n.eventContext)]:"?"===s?[new S(t,e.slice(1),i)]:new b(t,e,i).parts}handleTextExpression(t){return new w(t)}};
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
 */function E(t){let e=O.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},O.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(d);return void 0===(i=e.keyString.get(n))&&(i=new u(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const O=new Map,V=new WeakMap,j=(t,...e)=>new y(t,e,"html",T),z=133;
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
 */function M(t,e){const{element:{content:i},parts:n}=t,s=document.createTreeWalker(i,z,null,!1);let o=U(n),r=n[o],a=-1,l=0;const d=[];let c=null;for(;s.nextNode();){a++;const t=s.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(d.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==r&&r.index===a;)r.index=null!==c?-1:r.index-l,r=n[o=U(n,o)]}d.forEach(t=>t.parentNode.removeChild(t))}const R=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,z,null,!1);for(;i.nextNode();)e++;return e},U=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(m(e))return i}return-1};
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
const q=(t,e)=>`${t}--${e}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),F=!1);const L=["html","svg"],$=new Set,I=(t,e,i)=>{$.add(i);const n=t.querySelectorAll("style");if(0===n.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const s=document.createElement("style");for(let t=0;t<n.length;t++){const e=n[t];e.parentNode.removeChild(e),s.textContent+=e.textContent}if((t=>{L.forEach(e=>{const i=O.get(q(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),M(t,i)})})})(i),function(t,e,i=null){const{element:{content:n},parts:s}=t;if(null==i)return void n.appendChild(e);const o=document.createTreeWalker(n,z,null,!1);let r=U(s),a=0,l=-1;for(;o.nextNode();)for(l++,o.currentNode===i&&(a=R(e),i.parentNode.insertBefore(e,i));-1!==r&&s[r].index===l;){if(a>0){for(;-1!==r;)s[r].index+=a,r=U(s,r);return}r=U(s,r)}}(e,s,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i),window.ShadyCSS.nativeShadow){const i=e.element.content.querySelector("style");t.insertBefore(i.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(s,e.element.content.firstChild);const t=new Set;t.add(s),M(e,t)}},W=(t,e)=>t,B=(t,e)=>{if(t in e)for(;e!==Object.prototype;){if(e.hasOwnProperty(t))return Object.getOwnPropertyDescriptor(e,t);e=Object.getPrototypeOf(e)}},H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},D=(t,e)=>e!==t&&(e==e||t==t),J={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:D},X=Promise.resolve(!0),G=1,Y=4,K=8,Q=16,Z=32;class tt extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=X,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const t=[];for(const[e,i]of this._classProperties){const n=this._attributeNameForProperty(e,i);void 0!==n&&(this._attributeToPropertyMap.set(n,e),t.push(n))}return t}static _ensureClassProperties(){if(!this.hasOwnProperty(W("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=J){if(this._ensureClassProperties(),this._classProperties.set(t,e),!e.noAccessor){const e=B(t,this.prototype);let i;if(void 0!==e&&e.set&&e.get){const{set:n,get:s}=e;i={get(){return s.call(this)},set(e){const i=this[t];n.call(this,e),this.requestUpdate(t,i)},configurable:!0,enumerable:!0}}else{const e="symbol"==typeof t?Symbol():`__${t}`;i={get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n)},configurable:!0,enumerable:!0}}Object.defineProperty(this.prototype,t,i)}}static _finalize(){if(this.hasOwnProperty(W("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t._finalize&&t._finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(W("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=D){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||H,s="function"==typeof n?n:n.fromAttribute;return s?s(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||H.toAttribute)(t,i)}initialize(){this._saveInstanceProperties()}_saveInstanceProperties(){for(const[t]of this.constructor._classProperties)if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}_applyInstanceProperties(){for(const[t,e]of this._instanceProperties)this[t]=e;this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver?(this._hasConnectedResolver(),this._hasConnectedResolver=void 0):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=J){const n=this.constructor,s=n._attributeNameForProperty(t,i);if(void 0!==s){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|K,null==t?this.removeAttribute(s):this.setAttribute(s,t),this._updateState=this._updateState&~K}}_attributeToProperty(t,e){if(this._updateState&K)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i._classProperties.get(n)||J;this._updateState=this._updateState|Q,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Q}}requestUpdate(t,e){let i=!0;if(void 0!==t&&!this._changedProperties.has(t)){const n=this.constructor,s=n._classProperties.get(t)||J;n._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.set(t,e),!0!==s.reflect||this._updateState&Q||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}return!this._hasRequestedUpdate&&i&&this._enqueueUpdate(),this.updateComplete}async _enqueueUpdate(){let t;this._updateState=this._updateState|Y;const e=this._updatePromise;this._updatePromise=new Promise(e=>t=e),await e,this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);const i=this.performUpdate();null!=i&&"function"==typeof i.then&&await i,t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&Y}get hasUpdated(){return this._updateState&G}performUpdate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const t=this._changedProperties;this.update(t),this._markUpdated(),this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(t)),this.updated(t)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Y}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){for(const[t,e]of this._reflectingProperties)this._propertyToAttribute(t,this[t],e);this._reflectingProperties=void 0}}updated(t){}firstUpdated(t){}}tt.finalized=!0;
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
nt((t,e)=>t.querySelector(e)),nt((t,e)=>t.querySelectorAll(e));const et=(t,e,i)=>{Object.defineProperty(e,i,t)},it=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t});function nt(t){return e=>(i,n)=>{const s={get(){return t(this.renderRoot,e)},enumerable:!0,configurable:!0};return void 0!==n?et(s,i,n):it(s,i)}}const st="adoptedStyleSheets"in Document.prototype;
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
class ot extends tt{static get styles(){return[]}static get _uniqueStyles(){if(void 0===this._styles){const t=this.styles.reduceRight((t,e)=>(t.add(e),t),new Set);this._styles=[],t.forEach(t=>this._styles.unshift(t))}return this._styles}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._uniqueStyles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?st?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof y&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._uniqueStyles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ot.finalized=!0,ot.render=((t,e,i)=>{const n=i.scopeName,s=V.has(e),o=e instanceof ShadowRoot&&F&&t instanceof y,a=o&&!$.has(n),l=a?document.createDocumentFragment():e;if(((t,e,i)=>{let n=V.get(e);void 0===n&&(r(e,e.firstChild),V.set(e,n=new w(Object.assign({templateFactory:E},i))),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:(t=>e=>{const i=q(e.type,t);let n=O.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},O.set(i,n));let s=n.stringsArray.get(e.strings);if(void 0!==s)return s;const o=e.strings.join(d);if(void 0===(s=n.keyString.get(o))){const i=e.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(i,t),s=new u(e,i),n.keyString.set(o,s)}return n.stringsArray.set(e.strings,s),s})(n)},i)),a){const t=V.get(l);V.delete(l),t.value instanceof v&&I(l,t.value.template,n),r(e,e.firstChild),e.appendChild(l),V.set(e,t)}!s&&o&&window.ShadyCSS.styleElement(e.host)});const rt=j`
	* {
		box-sizing: border-box;
	}

html {
  min-width: 315px;
  background-color: #1d1b1e; }

body {
  min-height: 100vh;
  position: relative;
  margin: 0;
  padding-top: 40px;
  line-height: 1.25;
  font-size: 87.5%;
  font-family: Arial, sans-serif;
  color: #fcfcfa;
  --box-shadow-2: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  --mobile-nav-bg: $card-background; }

h1,
h2,
h3,
h4 {
  margin: 0.4em 0 0.6em;
  font-size: 1.75em;
  font-weight: 300;
  color: #fcfcfa;
  text-shadow: 0 2px 3px #212121; }

ul {
  list-style-type: none;
  padding: 0; }

a {
  color: #66d9ef;
  text-decoration: none;
  outline: none;
  cursor: pointer; }
  a:hover {
    color: #7ddff1;
    text-shadow: #7ddff1 0 0 6px; }
  a:active {
    color: #4fd3ed; }
  a:focus {
    outline: 0; }

button {
  transition: all 0.35s ease-out;
  cursor: pointer; }

input {
  outline-color: #888; }
  input:focus {
    box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45); }

iron-icon {
  display: inline-block;
  width: 24px; }

.card {
  display: inline-block;
  background: #2d2a2e;
  box-shadow: var(--box-shadow-2);
  border-radius: 2px;
  padding: 3px 25px 5px; }

.card-light {
  border-radius: 2px;
  box-shadow: var(--box-shadow-2); }

.caption {
  color: #919091; }

.big-btn {
  display: inline-block;
  margin: 10px auto;
  padding: 9px 14px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2em;
  background: rgba(107, 107, 107, 0.64);
  box-shadow: 0 3px 0 rgba(54, 54, 54, 0.94);
  opacity: 1;
  transition: all 0.19s;
  color: #ffd866; }
  .big-btn:hover, .big-btn:focus {
    color: #ffd866;
    box-shadow: 0 3px 0 #ffd866;
    text-shadow: none; }
  .big-btn:active {
    box-shadow: none !important;
    transform: translateY(3px); }
  .big-btn span {
    padding-right: 10px;
    vertical-align: -1px; }

.page {
  height: 100%;
  max-width: 1520px;
  margin: 0 auto;
  padding: 0; }

header {
  position: fixed;
  z-index: 99999;
  top: 0;
  width: 100%;
  background: #2d2a2e; }
  header .menu {
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    padding: 16px 20px 15px 16px;
    width: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; }
  header nav {
    font-size: 1.57em;
    text-align: left;
    margin-top: 35px;
    padding: 15px 20px;
    min-width: 165px; }
    header nav:first-child {
      margin-top: 0;
      height: 55px; }
      header nav:first-child a {
        display: inline;
        text-align: center;
        line-height: 1.1 !important;
        margin-bottom: 0;
        margin-right: 0; }
    header nav.hdr-nav2 iron-icon {
      font-size: 0.6em;
      margin-left: 15px; }
    header nav ul {
      list-style-type: none;
      font-size: 62%;
      width: 90%;
      margin: 0 auto;
      padding: 0;
      border-radius: 1px; }
      header nav ul a {
        margin-right: 0 !important; }
        header nav ul a:active {
          margin-bottom: 4px; }
    header nav a {
      width: 100%;
      color: #ffd866; }
      header nav a:hover {
        color: #ffd866;
        text-shadow: 0 0 6px #ffd866; }

aside {
  transform: translateX(-100%);
  transition: all 0.3s cubic-bezier(0, 0, 0.3, 1);
  padding-top: 60px;
  height: 100%;
  width: 75%;
  min-width: 200px;
  max-width: 260px;
  position: fixed;
  left: 0;
  top: 0;
  background: #2d2a2e;
  z-index: 999;
  will-change: transform; }
  aside.active {
    transform: translateX(0); }
  aside a {
    display: block;
    font-size: 1.45em;
    padding: 10px 0 10px 20px;
    text-align: left !important;
    color: #ffd866; }
    aside a:hover {
      color: #ffd866;
      text-shadow: 0 0 6px #ffd866; }
  aside iron-icon {
    float: left;
    margin-right: 20px;
    margin-top: 5px; }
  aside .playground-nav {
    margin-left: 25px; }
    aside .playground-nav a {
      font-size: 1.2em; }

header nav a,
aside a,
header nav a:visited,
aside a:visited {
  text-align: right;
  display: block;
  margin-right: 18px;
  line-height: 1.7;
  transition: none; }

header nav a:hover iron-icon,
aside a:hover iron-icon,
.home nav .icon-home,
.games nav .icon-controllernes,
.games aside .icon-controllernes,
.playground nav .icon-beaker,
.playground aside .icon-beaker,
.portfolio nav .icon-briefcase,
.portfolio aside .icon-briefcase,
.about nav .icon-user,
.about aside .icon-user {
  color: #ff6188; }

.hdr-nav2 {
  display: none;
  margin-top: 20px; }
  .hdr-nav2 ul a {
    margin-bottom: 4px;
    text-align: center; }
  .hdr-nav2 .icon-controllernes {
    font-size: 0.72em; }

.nav1 .playground-nav li:nth-child(1) a,
.nav2 .playground-nav li:nth-child(2) a,
.nav3 .playground-nav li:nth-child(3) a {
  color: #ff6188 !important;
  -webkit-text-stroke: 1px #ff6188;
  text-stroke: 1px #ff6188; }

.nav1 .playground-nav li:nth-child(1) a:hover,
.nav2 .playground-nav li:nth-child(2) a:hover,
.nav3 .playground-nav li:nth-child(3) a:hover {
  cursor: default;
  text-shadow: none; }

.hdr-nav2 .playground-nav-wrap {
  height: 0;
  opacity: 0;
  visibility: hidden;
  will-change: height, padding, opacity;
  transition: 0.25s ease; }
  .hdr-nav2 .playground-nav-wrap.visible {
    padding: 10px 0 10px 40px;
    height: 92px;
    visibility: visible;
    opacity: 1; }

main {
  text-align: center;
  padding-left: 0;
  width: 93%;
  height: 100%;
  margin: 40px auto 0;
  transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1); }
  main::before, main::after {
    content: ' ';
    display: table; }
  main::after {
    clear: both; }
  main.leftbar-active {
    opacity: 0.5; }

.col-left {
  min-width: 121px;
  width: 100%; }
  .col-left ul {
    font-size: 1.15em; }

.col-right {
  margin-top: 25px;
  padding-bottom: 13px; }
  .col-right img {
    max-width: 100%; }
  .col-right > div {
    padding-bottom: 13px !important; }

.carousel-list-page .col-left {
  display: none; }

.carousel-list-page .col-right {
  margin-top: 0; }
  .carousel-list-page .col-right > div {
    opacity: 1;
    visibility: visible;
    transition: 450ms opacity;
    position: static;
    width: 100%;
    margin-bottom: 20px; }
    .carousel-list-page .col-right > div:last-child {
      margin-bottom: 100px; }
    .carousel-list-page .col-right > div.fade-in {
      opacity: 1 !important;
      visibility: visible !important;
      transition: 300ms opacity; }

#div-default {
  display: none; }

  /*
@media (min-width: 801px) {
  ul {
    list-style-type: inherit;
    padding-left: 20px; }
  .page {
    padding: 0 6%; }
  header {
    top: auto;
    width: auto;
    background: none; }
    header nav {
      text-align: center;
      padding: 15px 15px 0 0; }
      header nav:first-child {
        text-indent: 9px;
        padding-bottom: 20px; }
    header .menu {
      display: none !important; }
  .hdr-nav2 {
    display: block; }
  main {
    text-align: left;
    padding-left: 230px;
    width: 100%;
    margin: 0; }
  .col-left {
    float: left;
    width: 37%; }
  .col-right {
    float: right;
    width: 58%;
    margin-top: 0; }
  .carousel-list-page .col-left {
    display: block; }
  .carousel-list-page .col-right > div {
    opacity: 0;
    visibility: hidden;
    width: 44%;
    position: absolute;
    max-width: 728px; }
    .carousel-list-page .col-right > div:last-child {
      margin-bottom: 20px; }
  #div-default {
    display: block; } }

@media (min-width: 801px) and (max-width: 1265px) {
  .col-left {
    width: 100%;
    margin-bottom: 0; }
  .col-right {
    width: 100%;
    margin-top: 25px; }
  .carousel-list-page .col-right {
    margin-top: 25px; }
    .carousel-list-page .col-right > div {
      width: 100%;
      max-width: 490px; } } */
`,at=j`
	.col-left {
		min-width: 337px;
		max-width: 520px;
	}
  
	img {
		float: left;
		padding-right: 15px;
		margin-bottom: -5px;
	}

	ul {
		margin-top: 55px;
		list-style-type: none;
		padding: 0;
		line-height: 2;
	}

	ul a:hover iron-icon {
		color: #ff6188;
	}
	
	iron-icon {
		margin-right: 7px;
		vertical-align: -6px;
	}

	/*.twitter-timeline {
		opacity: 0;
		transition: opacity 0.15s cubic-bezier(0, 0, 0.3, 1);
	}

	.twitter-timline-custom-styled {
		opacity: 1;
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
	}*/
`;customElements.define("page-home",class extends ot{firstUpdated(){}render(){return j`
			<style>
				${rt}
				${at}
			</style>
<!-- 
            <link rel="preconnect" href="https://platform.twitter.com" crossorigin>
            <link rel="preconnect" href="https://cdn.syndication.twimg.com" crossorigin>
            <link rel="preconnect" href="https://syndication.twitter.com" crossorigin>
            <link rel="dns-prefetch" href="https://abs.twimg.com" crossorigin>
            <link rel="dns-prefetch" href="https://pbs.twimg.com" crossorigin>
            <link rel="dns-prefetch" href="https://ton.twimg.com" crossorigin> -->

            <div class="col-left card">
                <h1>Fullstack Web Engineer</h1>
                <img src="/img/jon-icon.png" alt="Jon Wiedmann" class="jon-icon">

                <ul>
                    <li>
                        <a href="mailto:jonwiedmann@gmail.com" title="jonwiedmann@gmail.com" target="_blank" rel="noopener">
                            <iron-icon icon="i:mail"></iron-icon>
                            Email
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/jonmann20" target="_blank" rel="noopener">
                            <iron-icon icon="i:code"></iron-icon>
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/pub/jon-wiedmann/67/42b/b64" target="_blank" rel="noopener">
                            <iron-icon icon="i:assignment-ind"></iron-icon>
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-right">
				<!-- <a class="twitter-timeline" data-height="500" data-theme="dark" data-link-color="#66d9ef" href="https://twitter.com/jonwiedmann?ref_src=twsrc%5Etfw"></a> -->
				<!-- <a class="twitter-timeline" data-height="500" data-theme="dark" data-link-color="#66d9ef" href="https://twitter.com/jonwiedmann?ref_src=twsrc%5Etfw"></a> -->
            </div>
        `}})}});