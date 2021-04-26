/*! For license information please see 1-head-er-js.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[476,417],{379:(t,e,i)=>{"use strict";i.r(e);var s=i(558),n=i(886);let o,r,a=t=>t;function l(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}class h extends s.oi{constructor(){super(),this.asideIsActive=!1,this.initX=0,this.x=0,this.boundHideAside=t=>this.hideAside(t),this.boundSetInitX=t=>this.hideSetInitX(t),this.boundSetX=t=>this.hideSetX(t),window.onresize=()=>{window.innerWidth>800&&this.boundHideAside()},this.navVisible=window.page.includes("playground")}firstUpdated(){this.pNav=this.shadowRoot.querySelector(".playground-nav-wrap"),addEventListener("route",(t=>{t.detail.includes("playground")?this.navVisible=!0:this.navVisible=!1}),{passive:!0})}render(){return(0,s.dy)(o||(o=a`
			<header>
				<nav>
					<a href="#home">
						<i-con name="home" class="icon-home" ?selected="${0}"></i-con>&nbsp;Jon Wiedmann
					</a>
					<a class="menu" @click="${0}">
						<i-con name="menu"></i-con>
					</a>
				</nav>
				<nav class="nav2">
					<a href="#portfolio">
						Portfolio <i-con name="work" ?selected="${0}"></i-con>
					</a>
					<a href="#games">
						Games <i-con name="videogameAsset" ?selected="${0}"></i-con>
					</a>
					<a href="#playground">
						Playground <i-con name="polymer" ?selected="${0}"></i-con>
					</a>

					<!-- TODO: convert sub nav to a component -->
					<div class="playground-nav-wrap${0}">
						<ul class="playground-nav">
							<li><a href="#playground/breakdancing-cube" ?selected="${0}">Breakdancing Cube</a></li>
							<li><a href="#playground/starry-background" ?selected="${0}">Starry Background</a></li>
							<li><a href="#playground/ball-pit" ?selected="${0}">Ball Pit</a></li>
						</ul>
					</div>
				</nav>
			</header>
		`),"home"===this.page,this.menuClick,"portfolio"===this.page,"games"===this.page,this.page.includes("playground"),this.navVisible?" visible":"","playground/breakdancing-cube"===this.page,"playground/starry-background"===this.page,"playground/ball-pit"===this.page)}menuClick(t){t.preventDefault(),this.asideIsActive?this.hideAside():(document.querySelector("a-side").setAttribute("active",!0),document.querySelector("main").classList.add("leftbar-active"),this.asideIsActive=!0,requestAnimationFrame((()=>{document.body.addEventListener("click",this.boundHideAside,{passive:!0}),document.body.addEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.addEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.addEventListener("touchend",this.boundHideAside,{passive:!0})})))}hideAside(t){t&&"touchend"===t.type&&this.initX===this.x||(document.querySelector("a-side").removeAttribute("active"),document.querySelector("main").classList.remove("leftbar-active"),this.asideIsActive=!1,document.body.removeEventListener("click",this.boundHideAside,{passive:!0}),document.body.removeEventListener("touchstart",this.boundSetInitX,{passive:!0}),document.body.removeEventListener("touchmove",this.boundSetX,{passive:!0}),document.body.removeEventListener("touchend",this.boundHideAside,{passive:!0}))}setInitX(t){this.initX=t.touches[0].pageX,this.x=this.initX}setX(t){this.x=t.touches[0].pageX}}l(h,"styles",[n.default,(0,s.iv)(r||(r=a`
			header {
				position: fixed;
				z-index: 99999;
				top: 0;
				width: 100%;
				background: var(--black);
			}

			.menu {
				position: absolute;
				display: flex;
				top: 0;
				right: 0;
				padding: 16px 20px 15px 16px;
				width: auto;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}

			nav {
				font-size: 1.57em;
				text-align: left;
				margin-top: 35px;
				padding: 15px 20px;
				min-width: 165px;
			}

			nav:first-child {
				margin-top: 0;
				height: 55px;
			}

			nav:first-child a {
				display: inline;
				text-align: center;
				line-height: 1.1 !important;
				margin-right: 0;
			}

			ul {
				list-style-type: none;
				font-size: 62%;
				width: 90%;
				margin: 0 auto;
				padding: 0;
				border-radius: 1px;
			}

			ul a {
				margin-right: 0 !important;
			}

			ul a:active {
				margin-bottom: 4px;
			}

			a {
				width: 100%;
				color: var(--yellow);
			}

			a:hover {
				color: var(--yellow);
				text-shadow: 0 0 6px var(--yellow);
			}

			a,
			a:visited {
				text-align: right;
				display: block;
				margin-right: 18px;
				line-height: 1.7;
				transition: none;
			}

			.icon-home {
				margin-right: 7px;
				vertical-align: -3px;
			}

			.nav2 {
				display: none;
				margin-top: 20px;
			}

			.nav2 ul a {
				margin-bottom: 4px;
				text-align: center;
			}

			.nav2 i-con {
				vertical-align: -6px;
				margin-left: 7px;
			}

			.playground-nav-wrap {
				height: 0;
				opacity: 0;
				visibility: hidden;
				will-change: height, padding, opacity;
				transition: 0.25s ease;
			}

			.playground-nav-wrap.visible {
				padding: 10px 0 10px 40px;
				height: 92px;
				visibility: visible;
				opacity: 1;
			}

			/* > mobile */
			@media (min-width: 801px) {
				header {
					top: auto;
					width: auto;
					background: none;
				}

				nav {
					text-align: center;
					padding: 15px 15px 0 0;
				}

				nav:first-child {
					text-indent: 9px;
					padding-bottom: 20px;
				}

				.menu {
					display: none !important;
				}

				.nav2 {
					display: block;
				}
			}
		`))]),l(h,"properties",{page:{type:String}}),customElements.define("head-er",h)},886:(t,e,i)=>{"use strict";let s;i.r(e),i.d(e,{default:()=>n});const n=(0,i(558).iv)(s||(s=(t=>t)`
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
`))},558:(t,e,i)=>{"use strict";var s,n,o,r;i.d(e,{oi:()=>ot,iv:()=>j,dy:()=>k});const a=globalThis.trustedTypes,l=a?a.createPolicy("lit-html",{createHTML:t=>t}):void 0,h=`lit$${(Math.random()+"").slice(9)}$`,d="?"+h,c=`<${d}>`,u=document,p=(t="")=>u.createComment(t),v=t=>null===t||"object"!=typeof t&&"function"!=typeof t,g=Array.isArray,m=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,f=/-->/g,y=/>/g,b=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,x=/'/g,w=/"/g,S=/^(?:script|style|textarea)$/i,A=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),k=A(1),C=(A(2),Symbol.for("lit-noChange")),$=Symbol.for("lit-nothing"),E=new WeakMap,P=u.createTreeWalker(u,129,null,!1),H=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=m;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,u=0;for(;u<i.length&&(r.lastIndex=u,l=r.exec(i),null!==l);)u=r.lastIndex,r===m?"!--"===l[1]?r=f:void 0!==l[1]?r=y:void 0!==l[2]?(S.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=b):void 0!==l[3]&&(r=b):r===b?">"===l[0]?(r=null!=n?n:m,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?b:'"'===l[3]?w:x):r===w||r===x?r=b:r===f||r===y?r=m:(r=b,n=void 0);const p=r===b&&t[e+1].startsWith("/>")?" ":"";o+=r===m?i+c:d>=0?(s.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+h+p):i+h+(-2===d?(s.push(void 0),e):p)}const a=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==l?l.createHTML(a):a,s]};class U{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[c,u]=H(t,e);if(this.el=U.createElement(c,i),P.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=P.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(h)){const i=u[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(h),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?R:"?"===e[1]?I:"@"===e[1]?z:L})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(S.test(s.tagName)){const t=s.textContent.split(h),e=t.length-1;if(e>0){s.textContent=a?a.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],p()),P.nextNode(),l.push({type:2,index:++n});s.append(t[e],p())}}}else if(8===s.nodeType)if(s.data===d)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(h,t+1));)l.push({type:7,index:n}),t+=h.length-1}n++}}static createElement(t,e){const i=u.createElement("template");return i.innerHTML=t,i}}function T(t,e,i=t,s){var n,o,r,a;if(e===C)return e;let l=void 0!==s?null===(n=i.Σi)||void 0===n?void 0:n[s]:i.Σo;const h=v(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(o=null==l?void 0:l.O)||void 0===o||o.call(l,!1),void 0===h?l=void 0:(l=new h(t),l.T(t,i,s)),void 0!==s?(null!==(r=(a=i).Σi)&&void 0!==r?r:a.Σi=[])[s]=l:i.Σo=l),void 0!==l&&(e=T(t,l.S(t,e.values),l,s)),e}class O{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:u).importNode(i,!0);P.currentNode=n;let o=P.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new N(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new B(o,this,t)),this.l.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(o=P.nextNode(),r++)}return n}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class N{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=T(this,t,e),v(t)?t===$||null==t||""===t?(this.H!==$&&this.R(),this.H=$):t!==this.H&&t!==C&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var e;return g(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(u.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=U.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===n)this.H.v(i);else{const t=new O(n,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=E.get(t.strings);return void 0===e&&E.set(t.strings,e=new U(t)),e}g(t){g(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const n of t)s===e.length?e.push(i=new N(this.k(p()),this.k(p()),this,this.options)):i=e[s],i.I(n),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class L{constructor(t,e,i,s,n){this.type=1,this.H=$,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill($),this.strings=i):this.H=$}get tagName(){return this.element.tagName}I(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=T(this,t,e,0),o=!v(t)||t!==this.H&&t!==C,o&&(this.H=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=T(this,s[i+r],e,r),a===C&&(a=this.H[r]),o||(o=!v(a)||a!==this.H[r]),a===$?t=$:t!==$&&(t+=(null!=a?a:"")+n[r+1]),this.H[r]=a}o&&!s&&this.W(t)}W(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class R extends L{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===$?void 0:t}}class I extends L{constructor(){super(...arguments),this.type=4}W(t){t&&t!==$?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class z extends L{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=T(this,t,e,0))&&void 0!==i?i:$)===C)return;const s=this.H,n=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==$&&(s===$||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class B{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){T(this,t)}}null===(n=(s=globalThis).litHtmlPlatformSupport)||void 0===n||n.call(s,U,N),(null!==(o=(r=globalThis).litHtmlVersions)&&void 0!==o?o:r.litHtmlVersions=[]).push("2.0.0-rc.2");const M=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class _{constructor(t,e){if(e!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return M&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const V=new Map,j=(t,...e)=>{const i=e.reduce(((e,i,s)=>e+(t=>{if(t instanceof _)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1]),t[0]);let s=V.get(i);return void 0===s&&V.set(i,s=new _(i,X)),s},q=M?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new _(t+"",X))(e)})(t):t;var W,D,J,K;const Z={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},F=(t,e)=>e!==t&&(e==e||t==t),G={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:F};class Q extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this.Πp(i,e);void 0!==s&&(this.Πm.set(s,i),t.push(s))})),t}static createProperty(t,e=G){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||G}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(q(t))}else void 0!==t&&e.push(q(t));return e}static Πp(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{M?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style");i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,i){this.K(t,i)}Πj(t,e,i=G){var s,n;const o=this.constructor.Πp(t,i);if(void 0!==o&&!0===i.reflect){const r=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:Z.toAttribute)(e,i.type);this.Πh=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this.Πh=null}}K(t,e){var i,s,n;const o=this.constructor,r=o.Πm.get(t);if(void 0!==r&&this.Πh!==r){const t=o.getPropertyOptions(r),a=t.converter,l=null!==(n=null!==(s=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof a?a:null)&&void 0!==n?n:Z.fromAttribute;this.Πh=r,this[r]=l(e,t.type),this.Πh=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||F)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===i.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(i)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}var Y,tt,et,it,st,nt;Q.finalized=!0,Q.shadowRootOptions={mode:"open"},null===(D=(W=globalThis).reactiveElementPlatformSupport)||void 0===D||D.call(W,{ReactiveElement:Q}),(null!==(J=(K=globalThis).reactiveElementVersions)&&void 0!==J?J:K.reactiveElementVersions=[]).push("1.0.0-rc.1"),(null!==(Y=(nt=globalThis).litElementVersions)&&void 0!==Y?Y:nt.litElementVersions=[]).push("3.0.0-rc.1");class ot extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();super.update(t),this.Φt=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new N(e.insertBefore(p(),t),t,void 0,i)}return r.I(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return C}}ot.finalized=!0,ot._$litElement$=!0,null===(et=(tt=globalThis).litElementHydrateSupport)||void 0===et||et.call(tt,{LitElement:ot}),null===(st=(it=globalThis).litElementPlatformSupport)||void 0===st||st.call(it,{LitElement:ot})}}]);