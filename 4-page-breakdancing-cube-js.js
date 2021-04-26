/*! For license information please see 4-page-breakdancing-cube-js.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[924,417,330],{471:(t,e,i)=>{"use strict";i.r(e);var s=i(558),n=i(886),o=i(382),r=i(430);let a,l,d=t=>t;class h extends s.oi{constructor(){super(),document.title="Breakdancing Cube | Playground",r.Z.addMeta("description","Pure CSS3 animation demo."),r.Z.addMeta("keywords","CSS3, HTML5")}render(){return(0,s.dy)(a||(a=d`
			<div class="card">
				<h2>Breakdancing Cube</h2>
				<p>A pure CSS<sub>3</sub> animation demo.</p>
			</div>

			<section class="container">
			<div id="cube" class="animate">
					<div><span>Code</span></div>
					<div><span class="long">Wiedmann</span></div>
					<div><span>.com</span></div>
					<div><span>Games</span></div>
					<div><span>Soccer</span></div>
					<div><span>Jon</span></div>
			</div>
			</section>

			<div class="iframe-wrap">
				<iframe class="card" width="300" height="410" src="https://bandcamp.com/EmbeddedPlayer/v=2/album=1886256771/size=grande3/bgcol=FFFFFF/linkcol=5dafd7/transparent=true/" allowtransparency="true" frameborder="0"></iframe>
			</div>
        `))}}var c,p,u;c=h,p="styles",u=[n.default,o.default,(0,s.iv)(l||(l=d`
			main {
				min-height: 38em;
			}

			.iframe-wrap {
				display: none;
				margin-top: -480px;
			}

			@media (min-width: 801px) {
				.iframe-wrap {
					display: block;
				}
			}

			.iframe-wrap iframe {
				padding: 15px;
			}

			.container {
				perspective: 1000px;
				perspective-origin: 50% 50%;
				font-size: 2.25em;
				margin: 110px 0 140px;
				display: block;
				-webkit-box-reflect: below 165px linear-gradient(to bottom, transparent, transparent 42%, rgba(255, 255, 255, 0.5));
			}

			@media (min-width: 801px) {
				.container {
					margin: 65px 0 290px 360px;
				}
			}

			.animate {
				animation: spinningH 5s infinite linear;
			}

			#cube {
				position: relative;
				margin: 0 auto;
				height: 160px;
				width: 160px;
				transform-style: preserve-3d;
			}

			#cube > div {
				position: absolute;
				height: 164px;
				width: 164px;
				padding: 10px;
				opacity: 0.87;
				background-position: center center;
				background-color: rgba(20, 20, 20, 0.7);
			}

			#cube > div span {
				padding-top: 52px;
				display: block;
				text-align: center;
			}

			#cube > div span.long {
				transform: rotate(41deg);
				font-size: 0.75em;
				padding: 49px 0 0 21px;
				display: block;
				letter-spacing: 3px;
			}

			#cube div:nth-child(1) {
				transform: translateZ(82px);
			}

			#cube div:nth-child(2) {
				transform: rotateY(90deg) translateZ(82px);
			}

			#cube div:nth-child(3) {
				transform: rotateY(180deg) translateZ(82px);
			}

			#cube div:nth-child(4) {
				transform: rotateY(-90deg) translateZ(82px);
			}

			#cube div:nth-child(5) {
				transform: rotateX(-90deg) translateZ(82px) rotate(180deg);
			}

			#cube div:nth-child(6) {
				transform: rotateX(90deg) translateZ(82px);
			}

			@keyframes spinningH {
				0% {
					transform: rotateX(0deg) rotateY(0deg);
				}

				25% {
					transform: rotateX(180deg) rotateY(180deg);
				}

				50% {
					transform: rotateX(90deg) rotateY(0deg);
				}

				75% {
					transform: rotateX(270deg) rotateY(270deg);
				}

				100% {
					transform: rotateX(360deg) rotateY(360deg);
				}
			}
		`))],p in c?Object.defineProperty(c,p,{value:u,enumerable:!0,configurable:!0,writable:!0}):c[p]=u,customElements.define("page-breakdancing-cube",h)},886:(t,e,i)=>{"use strict";let s;i.r(e),i.d(e,{default:()=>n});const n=(0,i(558).iv)(s||(s=(t=>t)`
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
`))},382:(t,e,i)=>{"use strict";let s;i.r(e),i.d(e,{default:()=>n});const n=(0,i(558).iv)(s||(s=(t=>t)`
	.col-left ul {
		font-size: 1.15em;
	}

	.col-right {
		margin-top: 25px;
		padding-bottom: 13px;
	}

	.col-right img {
		max-width: 100%;
	}

	.col-right > div {
		padding-bottom: 13px !important;
	}

	/* > mobile */
	@media (min-width: 801px) {
		.col-left {
			float: left;
			width: 46%;
			margin-right: 2%;
		}

		.col-right {
			float: right;
			width: 50%;
			margin-top: 0;
		}
	}

	/* tablet */
	@media (min-width: 801px) and (max-width: 1265px) {
		.col-left {
			width: 100%;
			margin-bottom: 0;
		}

		.col-right {
			width: 100%;
			margin-top: 25px;
		}
	}
`))},430:(t,e,i)=>{"use strict";i.d(e,{Z:()=>n});class s{static require(t){return new Promise(((e,i)=>{if(s.constructor._jsSrc.includes(t))e();else{let n=document.createElement("script");n.src=t,n.async=1,document.head.appendChild(n),n.onload=()=>{s.constructor._jsSrc.push(t),e()},n.onerror=()=>i()}}))}static addMeta(t,e){let i=document.createElement("meta");i.setAttribute("name",t),i.setAttribute("content",e),document.head.appendChild(i)}static addLink(t,e,i=!0){let s=document.createElement("link");s.setAttribute("rel",t),s.setAttribute("href",e),i&&s.setAttribute("crossorigin",""),document.head.appendChild(s)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),i=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-i}}s.constructor._jsSrc=[];const n=s},558:(t,e,i)=>{"use strict";var s,n,o,r;i.d(e,{oi:()=>ot,iv:()=>Z,dy:()=>k});const a=globalThis.trustedTypes,l=a?a.createPolicy("lit-html",{createHTML:t=>t}):void 0,d=`lit$${(Math.random()+"").slice(9)}$`,h="?"+d,c=`<${h}>`,p=document,u=(t="")=>p.createComment(t),v=t=>null===t||"object"!=typeof t&&"function"!=typeof t,m=Array.isArray,g=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,f=/-->/g,b=/>/g,y=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,x=/'/g,w=/"/g,S=/^(?:script|style|textarea)$/i,C=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),k=C(1),P=(C(2),Symbol.for("lit-noChange")),E=Symbol.for("lit-nothing"),A=new WeakMap,U=p.createTreeWalker(p,129,null,!1),$=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=g;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,p=0;for(;p<i.length&&(r.lastIndex=p,l=r.exec(i),null!==l);)p=r.lastIndex,r===g?"!--"===l[1]?r=f:void 0!==l[1]?r=b:void 0!==l[2]?(S.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=y):void 0!==l[3]&&(r=y):r===y?">"===l[0]?(r=null!=n?n:g,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?y:'"'===l[3]?w:x):r===w||r===x?r=y:r===f||r===b?r=g:(r=y,n=void 0);const u=r===y&&t[e+1].startsWith("/>")?" ":"";o+=r===g?i+c:h>=0?(s.push(a),i.slice(0,h)+"$lit$"+i.slice(h)+d+u):i+d+(-2===h?(s.push(void 0),e):u)}const a=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==l?l.createHTML(a):a,s]};class H{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[c,p]=$(t,e);if(this.el=H.createElement(c,i),U.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=U.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(d)){const i=p[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(d),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?M:"?"===e[1]?z:"@"===e[1]?B:R})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(S.test(s.tagName)){const t=s.textContent.split(d),e=t.length-1;if(e>0){s.textContent=a?a.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],u()),U.nextNode(),l.push({type:2,index:++n});s.append(t[e],u())}}}else if(8===s.nodeType)if(s.data===h)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(d,t+1));)l.push({type:7,index:n}),t+=d.length-1}n++}}static createElement(t,e){const i=p.createElement("template");return i.innerHTML=t,i}}function T(t,e,i=t,s){var n,o,r,a;if(e===P)return e;let l=void 0!==s?null===(n=i.Σi)||void 0===n?void 0:n[s]:i.Σo;const d=v(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l.O)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(t),l.T(t,i,s)),void 0!==s?(null!==(r=(a=i).Σi)&&void 0!==r?r:a.Σi=[])[s]=l:i.Σo=l),void 0!==l&&(e=T(t,l.S(t,e.values),l,s)),e}class N{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:p).importNode(i,!0);U.currentNode=n;let o=U.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new O(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new L(o,this,t)),this.l.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(o=U.nextNode(),r++)}return n}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class O{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=T(this,t,e),v(t)?t===E||null==t||""===t?(this.H!==E&&this.R(),this.H=E):t!==this.H&&t!==P&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var e;return m(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(p.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=H.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===n)this.H.v(i);else{const t=new N(n,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=A.get(t.strings);return void 0===e&&A.set(t.strings,e=new H(t)),e}g(t){m(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const n of t)s===e.length?e.push(i=new O(this.k(u()),this.k(u()),this,this.options)):i=e[s],i.I(n),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class R{constructor(t,e,i,s,n){this.type=1,this.H=E,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(E),this.strings=i):this.H=E}get tagName(){return this.element.tagName}I(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=T(this,t,e,0),o=!v(t)||t!==this.H&&t!==P,o&&(this.H=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=T(this,s[i+r],e,r),a===P&&(a=this.H[r]),o||(o=!v(a)||a!==this.H[r]),a===E?t=E:t!==E&&(t+=(null!=a?a:"")+n[r+1]),this.H[r]=a}o&&!s&&this.W(t)}W(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class M extends R{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===E?void 0:t}}class z extends R{constructor(){super(...arguments),this.type=4}W(t){t&&t!==E?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class B extends R{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=T(this,t,e,0))&&void 0!==i?i:E)===P)return;const s=this.H,n=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==E&&(s===E||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class L{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){T(this,t)}}null===(n=(s=globalThis).litHtmlPlatformSupport)||void 0===n||n.call(s,H,O),(null!==(o=(r=globalThis).litHtmlVersions)&&void 0!==o?o:r.litHtmlVersions=[]).push("2.0.0-rc.2");const _=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol();class I{constructor(t,e){if(e!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return _&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const W=new Map,Z=(t,...e)=>{const i=e.reduce(((e,i,s)=>e+(t=>{if(t instanceof I)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1]),t[0]);let s=W.get(i);return void 0===s&&W.set(i,s=new I(i,j)),s},V=_?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new I(t+"",j))(e)})(t):t;var D,Y,q,F;const X={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},J=(t,e)=>e!==t&&(e==e||t==t),K={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:J};class G extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this.Πp(i,e);void 0!==s&&(this.Πm.set(s,i),t.push(s))})),t}static createProperty(t,e=K){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||K}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(V(t))}else void 0!==t&&e.push(V(t));return e}static Πp(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{_?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style");i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,i){this.K(t,i)}Πj(t,e,i=K){var s,n;const o=this.constructor.Πp(t,i);if(void 0!==o&&!0===i.reflect){const r=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:X.toAttribute)(e,i.type);this.Πh=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this.Πh=null}}K(t,e){var i,s,n;const o=this.constructor,r=o.Πm.get(t);if(void 0!==r&&this.Πh!==r){const t=o.getPropertyOptions(r),a=t.converter,l=null!==(n=null!==(s=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof a?a:null)&&void 0!==n?n:X.fromAttribute;this.Πh=r,this[r]=l(e,t.type),this.Πh=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||J)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===i.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(i)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}var Q,tt,et,it,st,nt;G.finalized=!0,G.shadowRootOptions={mode:"open"},null===(Y=(D=globalThis).reactiveElementPlatformSupport)||void 0===Y||Y.call(D,{ReactiveElement:G}),(null!==(q=(F=globalThis).reactiveElementVersions)&&void 0!==q?q:F.reactiveElementVersions=[]).push("1.0.0-rc.1"),(null!==(Q=(nt=globalThis).litElementVersions)&&void 0!==Q?Q:nt.litElementVersions=[]).push("3.0.0-rc.1");class ot extends G{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();super.update(t),this.Φt=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new O(e.insertBefore(u(),t),t,void 0,i)}return r.I(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return P}}ot.finalized=!0,ot._$litElement$=!0,null===(et=(tt=globalThis).litElementHydrateSupport)||void 0===et||et.call(tt,{LitElement:ot}),null===(st=(it=globalThis).litElementPlatformSupport)||void 0===st||st.call(it,{LitElement:ot})}}]);