/*! For license information please see 6-page-home-js.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[401,417,330,579],{93:(t,e,i)=>{"use strict";i.r(e);var s=i(558),n=i(886),o=i(382),r=i(430),l=i(204);let a,h,d=t=>t;class c extends s.oi{constructor(){super(),document.title="Jon Wiedmann",r.Z.addMeta("description","Jon Wiedmann's personal website.  A site with information on Jon's work experience and hobbies."),r.Z.addMeta("keywords","Jon Wiedmann, Web Developer, HTML5, CSS, Javascript","Polymer"),r.Z.addLink("preconnect","https://platform.twitter.com"),r.Z.addLink("preconnect","https://cdn.syndication.twimg.com"),r.Z.addLink("preconnect","https://syndication.twitter.com"),r.Z.addLink("dns-prefetch","https://abs.twimg.com"),r.Z.addLink("dns-prefetch","https://pbs.twimg.com"),r.Z.addLink("dns-prefetch","https://ton.twimg.com")}firstUpdated(){r.Z.require("https://platform.twitter.com/widgets.js").then((()=>{let t=document.createElement("style");t.type="text/css",t.innerHTML=`\n\t\t\t\tbody {\n\t\t\t\t\tcolor: ${l.WHITE};\n\t\t\t\t}\n\n\t\t\t\t.timeline-Widget {\n\t\t\t\t\tbackground: ${l.BLACK};\n\t\t\t\t}\n\n\t\t\t\t.customisable-highlight {\n\t\t\t\t\tcolor: ${l.BLUE} !important;\n\t\t\t\t}\n\n\t\t\t\t.timeline-Body {\n\t\t\t\t\tborder-top: none;\n\t\t\t\t\tborder-bottom: 2px solid ${l.BLACK};\n\t\t\t\t\tborder-radius: 3px;\n\t\t\t\t}\n\t\t\t`,twttr.widgets.createTimeline({sourceType:"profile",screenName:"jonwiedmann"},this.shadowRoot.querySelector(".col-right"),{width:620,height:520,theme:"dark",linkColor:l.BLUE,chrome:"nofooter"}).then((e=>{let i=e.contentDocument;i&&(i.head.appendChild(t),e.classList.add("twitter-timline-custom-styled"))}))}))}render(){return(0,s.dy)(a||(a=d`
            <div class="col-left card">
                <h1>Fullstack Web Engineer</h1>
                <img src="/img/jon-icon.png" width="190" height="175" alt="Jon Wiedmann" class="jon-icon">

                <ul>
                    <li>
                        <a href="mailto:jonwiedmann@gmail.com" title="jonwiedmann@gmail.com" target="_blank" rel="noopener">
							<i-con name="mail" color="${0}"></i-con>
                            Email
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/jonmann20" target="_blank" rel="noopener">
							<i-con name="code" color="${0}"></i-con>
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/pub/jon-wiedmann/67/42b/b64" target="_blank" rel="noopener">
							<i-con name="assignmentInd" color="${0}"></i-con>
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-right"></div>
        `),l.BLUE,l.BLUE,l.BLUE)}}var u,p,m;u=c,p="styles",m=[n.default,o.default,(0,s.iv)(h||(h=d`
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

			ul a:hover i-con {
				color: var(--red);
			}

			i-con {
				margin-right: 7px;
				vertical-align: -6px;
			}

			.twitter-timeline {
				opacity: 0;
			}

			.twitter-timline-custom-styled {
				opacity: 1;
				box-shadow: var(--box-shadow-2);
				border-radius: 2px;
			}
		`))],p in u?Object.defineProperty(u,p,{value:m,enumerable:!0,configurable:!0,writable:!0}):u[p]=m,customElements.define("page-home",c)},886:(t,e,i)=>{"use strict";let s;i.r(e),i.d(e,{default:()=>n});const n=(0,i(558).iv)(s||(s=(t=>t)`
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
`))},204:(t,e,i)=>{"use strict";i.r(e),i.d(e,{BLACK:()=>n,BLUE:()=>o,RED:()=>r,WHITE:()=>l,YELLOW:()=>a});const s=getComputedStyle(document.body),n=s.getPropertyValue("--black"),o=s.getPropertyValue("--blue"),r=s.getPropertyValue("--red"),l=s.getPropertyValue("--white"),a=s.getPropertyValue("--yellow")},430:(t,e,i)=>{"use strict";i.d(e,{Z:()=>n});class s{static require(t){return new Promise(((e,i)=>{if(s.constructor._jsSrc.includes(t))e();else{let n=document.createElement("script");n.src=t,n.async=1,document.head.appendChild(n),n.onload=()=>{s.constructor._jsSrc.push(t),e()},n.onerror=()=>i()}}))}static addMeta(t,e){let i=document.createElement("meta");i.setAttribute("name",t),i.setAttribute("content",e),document.head.appendChild(i)}static addLink(t,e,i=!0){let s=document.createElement("link");s.setAttribute("rel",t),s.setAttribute("href",e),i&&s.setAttribute("crossorigin",""),document.head.appendChild(s)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),i=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-i}}s.constructor._jsSrc=[];const n=s},558:(t,e,i)=>{"use strict";var s,n,o,r;i.d(e,{oi:()=>ot,iv:()=>V,dy:()=>E});const l=globalThis.trustedTypes,a=l?l.createPolicy("lit-html",{createHTML:t=>t}):void 0,h=`lit$${(Math.random()+"").slice(9)}$`,d="?"+h,c=`<${d}>`,u=document,p=(t="")=>u.createComment(t),m=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,g=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,f=/-->/g,b=/>/g,y=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,w=/'/g,x=/"/g,S=/^(?:script|style|textarea)$/i,C=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),E=C(1),k=(C(2),Symbol.for("lit-noChange")),P=Symbol.for("lit-nothing"),U=new WeakMap,$=u.createTreeWalker(u,129,null,!1),A=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=g;for(let e=0;e<i;e++){const i=t[e];let l,a,d=-1,u=0;for(;u<i.length&&(r.lastIndex=u,a=r.exec(i),null!==a);)u=r.lastIndex,r===g?"!--"===a[1]?r=f:void 0!==a[1]?r=b:void 0!==a[2]?(S.test(a[2])&&(n=RegExp("</"+a[2],"g")),r=y):void 0!==a[3]&&(r=y):r===y?">"===a[0]?(r=null!=n?n:g,d=-1):void 0===a[1]?d=-2:(d=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?y:'"'===a[3]?x:w):r===x||r===w?r=y:r===f||r===b?r=g:(r=y,n=void 0);const p=r===y&&t[e+1].startsWith("/>")?" ":"";o+=r===g?i+c:d>=0?(s.push(l),i.slice(0,d)+"$lit$"+i.slice(d)+h+p):i+h+(-2===d?(s.push(void 0),e):p)}const l=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==a?a.createHTML(l):l,s]};class H{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,u]=A(t,e);if(this.el=H.createElement(c,i),$.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=$.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(h)){const i=u[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(h),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?R:"?"===e[1]?B:"@"===e[1]?M:O})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(S.test(s.tagName)){const t=s.textContent.split(h),e=t.length-1;if(e>0){s.textContent=l?l.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],p()),$.nextNode(),a.push({type:2,index:++n});s.append(t[e],p())}}}else if(8===s.nodeType)if(s.data===d)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(h,t+1));)a.push({type:7,index:n}),t+=h.length-1}n++}}static createElement(t,e){const i=u.createElement("template");return i.innerHTML=t,i}}function L(t,e,i=t,s){var n,o,r,l;if(e===k)return e;let a=void 0!==s?null===(n=i.Σi)||void 0===n?void 0:n[s]:i.Σo;const h=m(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(o=null==a?void 0:a.O)||void 0===o||o.call(a,!1),void 0===h?a=void 0:(a=new h(t),a.T(t,i,s)),void 0!==s?(null!==(r=(l=i).Σi)&&void 0!==r?r:l.Σi=[])[s]=a:i.Σo=a),void 0!==a&&(e=L(t,a.S(t,e.values),a,s)),e}class T{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:u).importNode(i,!0);$.currentNode=n;let o=$.nextNode(),r=0,l=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new N(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new j(o,this,t)),this.l.push(e),a=s[++l]}r!==(null==a?void 0:a.index)&&(o=$.nextNode(),r++)}return n}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class N{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=L(this,t,e),m(t)?t===P||null==t||""===t?(this.H!==P&&this.R(),this.H=P):t!==this.H&&t!==k&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var e;return v(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(u.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=H.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===n)this.H.v(i);else{const t=new T(n,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new H(t)),e}g(t){v(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const n of t)s===e.length?e.push(i=new N(this.k(p()),this.k(p()),this,this.options)):i=e[s],i.I(n),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class O{constructor(t,e,i,s,n){this.type=1,this.H=P,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(P),this.strings=i):this.H=P}get tagName(){return this.element.tagName}I(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=L(this,t,e,0),o=!m(t)||t!==this.H&&t!==k,o&&(this.H=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=L(this,s[i+r],e,r),l===k&&(l=this.H[r]),o||(o=!m(l)||l!==this.H[r]),l===P?t=P:t!==P&&(t+=(null!=l?l:"")+n[r+1]),this.H[r]=l}o&&!s&&this.W(t)}W(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class R extends O{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===P?void 0:t}}class B extends O{constructor(){super(...arguments),this.type=4}W(t){t&&t!==P?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class M extends O{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=L(this,t,e,0))&&void 0!==i?i:P)===k)return;const s=this.H,n=t===P&&s!==P||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==P&&(s===P||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class j{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){L(this,t)}}null===(n=(s=globalThis).litHtmlPlatformSupport)||void 0===n||n.call(s,H,N),(null!==(o=(r=globalThis).litHtmlVersions)&&void 0!==o?o:r.litHtmlVersions=[]).push("2.0.0-rc.2");const W=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_=Symbol();class z{constructor(t,e){if(e!==_)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return W&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const I=new Map,V=(t,...e)=>{const i=e.reduce(((e,i,s)=>e+(t=>{if(t instanceof z)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1]),t[0]);let s=I.get(i);return void 0===s&&I.set(i,s=new z(i,_)),s},Z=W?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new z(t+"",_))(e)})(t):t;var D,q,J,K;const F={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},G=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:G};class Q extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this.Πp(i,e);void 0!==s&&(this.Πm.set(s,i),t.push(s))})),t}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Y}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(Z(t))}else void 0!==t&&e.push(Z(t));return e}static Πp(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{W?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style");i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,i){this.K(t,i)}Πj(t,e,i=Y){var s,n;const o=this.constructor.Πp(t,i);if(void 0!==o&&!0===i.reflect){const r=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:F.toAttribute)(e,i.type);this.Πh=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this.Πh=null}}K(t,e){var i,s,n;const o=this.constructor,r=o.Πm.get(t);if(void 0!==r&&this.Πh!==r){const t=o.getPropertyOptions(r),l=t.converter,a=null!==(n=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==n?n:F.fromAttribute;this.Πh=r,this[r]=a(e,t.type),this.Πh=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||G)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===i.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(i)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}var X,tt,et,it,st,nt;Q.finalized=!0,Q.shadowRootOptions={mode:"open"},null===(q=(D=globalThis).reactiveElementPlatformSupport)||void 0===q||q.call(D,{ReactiveElement:Q}),(null!==(J=(K=globalThis).reactiveElementVersions)&&void 0!==J?J:K.reactiveElementVersions=[]).push("1.0.0-rc.1"),(null!==(X=(nt=globalThis).litElementVersions)&&void 0!==X?X:nt.litElementVersions=[]).push("3.0.0-rc.1");class ot extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();super.update(t),this.Φt=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new N(e.insertBefore(p(),t),t,void 0,i)}return r.I(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return k}}ot.finalized=!0,ot._$litElement$=!0,null===(et=(tt=globalThis).litElementHydrateSupport)||void 0===et||et.call(tt,{LitElement:ot}),null===(st=(it=globalThis).litElementPlatformSupport)||void 0===st||st.call(it,{LitElement:ot})}}]);