/*! For license information please see 0-a-side-js.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[516,417],{512:(t,e,i)=>{"use strict";i.r(e);var s=i(558),o=i(886);let n,r,l=t=>t;function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}class h extends s.oi{constructor(){super(),this.active=!1}render(){return(0,s.dy)(n||(n=l`
			<aside id="${0}">
			<a href="#portfolio">
				Portfolio <i-con name="work" ?selected="${0}"></i-con>
			</a>
			<a href="#games">
					Games <i-con name="videogameAsset" ?selected="${0}"></i-con>
				</a>
				<a href="#playground">
					Playground <i-con name="polymer" ?selected="${0}"></i-con>
				</a>
				<div class="playground-nav-wrap">
					<ul class="playground-nav">
						<li><a href="#playground/breakdancing-cube" ?selected="${0}">Breakdancing Cube</a></li>
						<li><a href="#playground/starry-background" ?selected="${0}">Starry Background</a></li>
						<li><a href="#playground/ball-pit" ?selected="${0}">Ball Pit</a></li>
					</ul>
				</div>
			</aside>
		`),this.active?"activated":"","portfolio"===this.page,"games"===this.page,this.page.includes("playground"),"playground/breakdancing-cube"===this.page,"playground/starry-background"===this.page,"playground/ball-pit"===this.page)}}a(h,"styles",[o.default,(0,s.iv)(r||(r=l`
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
				background: var(--black);
				z-index: 999;
				will-change: transform;
			}

			aside#activated {
				transform: translateX(0);
			}

			a {
				display: block;
				line-height: 1.7;
				font-size: 1.45em;
				padding: 10px 0 10px 20px;
				text-align: left !important;
				color: var(--yellow);
			}

			a:hover {
				color: var(--yellow);
				text-shadow: 0 0 6px var(--yellow);
			}

			i-con {
				float: left;
				margin-right: 13px;
				margin-top: 5px;
				cursor: pointer !important;
			}

			.playground-nav {
				margin-left: 25px;
			}

			.playground-nav a {
				font-size: 1.2em;
			}
		`))]),a(h,"properties",{active:{type:Boolean},page:{type:String}}),customElements.define("a-side",h)},886:(t,e,i)=>{"use strict";let s;i.r(e),i.d(e,{default:()=>o});const o=(0,i(558).iv)(s||(s=(t=>t)`
	:host {
		display: block;
	}

	* {
		box-sizing: border-box;
	}

	h1,
	h2,
	h3 {
		margin: 0.4em 0 0.6em;
		font-size: 1.75em;
		font-weight: 300;
		color: var(--white);
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: var(--blue);
		text-decoration: none;
		outline: none;
		cursor: pointer;
	}

	a:hover {
		color: #7ddff1;
		text-shadow: #7ddff1 0 0 6px;
	}

	a:active {
		color: #4fd3ed;
	}

	a:focus {
		outline: 0;
	}

	a[selected] {
		color: var(--red) !important;
	}

	input {
		outline-color: #888;
	}

	input:focus {
		box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);
	}

	/* utils */

	.card {
		display: inline-block;
		background: var(--black);
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`))},558:(t,e,i)=>{"use strict";var s,o,n,r;i.d(e,{oi:()=>nt,iv:()=>W,dy:()=>$});const l=globalThis.trustedTypes,a=l?l.createPolicy("lit-html",{createHTML:t=>t}):void 0,h=`lit$${(Math.random()+"").slice(9)}$`,d="?"+h,c=`<${d}>`,u=document,p=(t="")=>u.createComment(t),v=t=>null===t||"object"!=typeof t&&"function"!=typeof t,f=Array.isArray,g=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,m=/-->/g,y=/>/g,b=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,x=/'/g,w=/"/g,S=/^(?:script|style|textarea)$/i,C=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),$=C(1),P=(C(2),Symbol.for("lit-noChange")),k=Symbol.for("lit-nothing"),U=new WeakMap,E=u.createTreeWalker(u,129,null,!1),A=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=g;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,u=0;for(;u<i.length&&(r.lastIndex=u,a=r.exec(i),null!==a);)u=r.lastIndex,r===g?"!--"===a[1]?r=m:void 0!==a[1]?r=y:void 0!==a[2]?(S.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=b):void 0!==a[3]&&(r=b):r===b?">"===a[0]?(r=null!=o?o:g,d=-1):void 0===a[1]?d=-2:(d=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?b:'"'===a[3]?w:x):r===w||r===x?r=b:r===m||r===y?r=g:(r=b,o=void 0);const p=r===b&&t[e+1].startsWith("/>")?" ":"";n+=r===g?i+c:d>=0?(s.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+h+p):i+h+(-2===d?(s.push(void 0),e):p)}const l=n+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==a?a.createHTML(l):l,s]};class H{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,u]=A(t,e);if(this.el=H.createElement(c,i),E.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=E.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(h)){const i=u[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(h),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?z:"?"===e[1]?B:"@"===e[1]?M:R})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(S.test(s.tagName)){const t=s.textContent.split(h),e=t.length-1;if(e>0){s.textContent=l?l.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],p()),E.nextNode(),a.push({type:2,index:++o});s.append(t[e],p())}}}else if(8===s.nodeType)if(s.data===d)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(h,t+1));)a.push({type:7,index:o}),t+=h.length-1}o++}}static createElement(t,e){const i=u.createElement("template");return i.innerHTML=t,i}}function T(t,e,i=t,s){var o,n,r,l;if(e===P)return e;let a=void 0!==s?null===(o=i.Σi)||void 0===o?void 0:o[s]:i.Σo;const h=v(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(n=null==a?void 0:a.O)||void 0===n||n.call(a,!1),void 0===h?a=void 0:(a=new h(t),a.T(t,i,s)),void 0!==s?(null!==(r=(l=i).Σi)&&void 0!==r?r:l.Σi=[])[s]=a:i.Σo=a),void 0!==a&&(e=T(t,a.S(t,e.values),a,s)),e}class N{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:u).importNode(i,!0);E.currentNode=o;let n=E.nextNode(),r=0,l=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new O(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new L(n,this,t)),this.l.push(e),a=s[++l]}r!==(null==a?void 0:a.index)&&(n=E.nextNode(),r++)}return o}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class O{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=T(this,t,e),v(t)?t===k||null==t||""===t?(this.H!==k&&this.R(),this.H=k):t!==this.H&&t!==P&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var e;return f(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(u.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=H.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===o)this.H.v(i);else{const t=new N(o,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new H(t)),e}g(t){f(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const o of t)s===e.length?e.push(i=new O(this.k(p()),this.k(p()),this,this.options)):i=e[s],i.I(o),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class R{constructor(t,e,i,s,o){this.type=1,this.H=k,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(k),this.strings=i):this.H=k}get tagName(){return this.element.tagName}I(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=T(this,t,e,0),n=!v(t)||t!==this.H&&t!==P,n&&(this.H=t);else{const s=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=T(this,s[i+r],e,r),l===P&&(l=this.H[r]),n||(n=!v(l)||l!==this.H[r]),l===k?t=k:t!==k&&(t+=(null!=l?l:"")+o[r+1]),this.H[r]=l}n&&!s&&this.W(t)}W(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class z extends R{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===k?void 0:t}}class B extends R{constructor(){super(...arguments),this.type=4}W(t){t&&t!==k?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class M extends R{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=T(this,t,e,0))&&void 0!==i?i:k)===P)return;const s=this.H,o=t===k&&s!==k||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==k&&(s===k||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class L{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){T(this,t)}}null===(o=(s=globalThis).litHtmlPlatformSupport)||void 0===o||o.call(s,H,O),(null!==(n=(r=globalThis).litHtmlVersions)&&void 0!==n?n:r.litHtmlVersions=[]).push("2.0.0-rc.2");const _=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,I=Symbol();class j{constructor(t,e){if(e!==I)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return _&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const V=new Map,W=(t,...e)=>{const i=e.reduce(((e,i,s)=>e+(t=>{if(t instanceof j)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1]),t[0]);let s=V.get(i);return void 0===s&&V.set(i,s=new j(i,I)),s},D=_?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new j(t+"",I))(e)})(t):t;var q,J,K,X;const Z={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},G=(t,e)=>e!==t&&(e==e||t==t),F={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:G};class Q extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this.Πp(i,e);void 0!==s&&(this.Πm.set(s,i),t.push(s))})),t}static createProperty(t,e=F){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||F}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(D(t))}else void 0!==t&&e.push(D(t));return e}static Πp(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{_?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style");i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,i){this.K(t,i)}Πj(t,e,i=F){var s,o;const n=this.constructor.Πp(t,i);if(void 0!==n&&!0===i.reflect){const r=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:Z.toAttribute)(e,i.type);this.Πh=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this.Πh=null}}K(t,e){var i,s,o;const n=this.constructor,r=n.Πm.get(t);if(void 0!==r&&this.Πh!==r){const t=n.getPropertyOptions(r),l=t.converter,a=null!==(o=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==o?o:Z.fromAttribute;this.Πh=r,this[r]=a(e,t.type),this.Πh=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||G)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===i.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(i)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}var Y,tt,et,it,st,ot;Q.finalized=!0,Q.shadowRootOptions={mode:"open"},null===(J=(q=globalThis).reactiveElementPlatformSupport)||void 0===J||J.call(q,{ReactiveElement:Q}),(null!==(K=(X=globalThis).reactiveElementVersions)&&void 0!==K?K:X.reactiveElementVersions=[]).push("1.0.0-rc.1"),(null!==(Y=(ot=globalThis).litElementVersions)&&void 0!==Y?Y:ot.litElementVersions=[]).push("3.0.0-rc.1");class nt extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();super.update(t),this.Φt=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new O(e.insertBefore(p(),t),t,void 0,i)}return r.I(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return P}}nt.finalized=!0,nt._$litElement$=!0,null===(et=(tt=globalThis).litElementHydrateSupport)||void 0===et||et.call(tt,{LitElement:nt}),null===(st=(it=globalThis).litElementPlatformSupport)||void 0===st||st.call(it,{LitElement:nt})}}]);