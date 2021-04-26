/*! For license information please see 3-page-ball-pit-js.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[630,417,330],{962:(t,e,i)=>{"use strict";i.r(e);var s=i(558),o=i(886),n=i(382),l=i(430);let r,a,h=t=>t;class d extends s.oi{constructor(){super(),document.title="Ball Pit | Playground",l.Z.addMeta("description","A canvas example showcasing a ball pit."),l.Z.addMeta("keywords","canvas, html5")}firstUpdated(){window.ballPit=new class{constructor(t){this.doc=t,this.boundOnRoute=t=>this.destroy(t.detail),addEventListener("route",this.boundOnRoute,{passive:!0}),this.canvas=t.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.radius=16.5,this.balls=[],this.canvas.width=l.Z.getMainWidth/1.5,this.canvas.height=this.canvas.width/2,this.boundOnNumBalls=t=>this.onNumBalls(t.target.value),this.boundOnSizeBalls=t=>this.onSizeBalls(t.target.value),this.boundOnSpeedBalls=t=>this.onSpeedBalls(t.target.value),t.querySelector(".numBalls").addEventListener("input",this.boundOnNumBalls),t.querySelector(".sizeBalls").addEventListener("input",this.boundOnSizeBalls),t.querySelector(".speedBalls").addEventListener("input",this.boundOnSpeedBalls);for(let t=0;t<20;++t)this.balls.push({x:Math.floor(Math.random()*(this.canvas.width+1)),y:Math.floor(Math.random()*(this.canvas.height+1)),velocity:{x:Math.floor(-3*Math.random()),y:Math.floor(7*Math.random())-3},color:this.getRandomColor()});this.runSim()}destroy(t){if("playground/ball-pit"===t)return;removeEventListener("route",this.boundOnRoute,{passive:!0}),cancelAnimationFrame(this.animLoop);const e=this.doc.querySelector(".numBalls"),i=this.doc.querySelector(".sizeBalls"),s=this.doc.querySelector(".speedBalls");e&&e.removeEventListener("input",this.boundOnNumBalls),i&&i.removeEventListener("input",this.boundOnSizeBalls),s&&s.removeEventListener("input",this.boundOnSpeedBalls),delete window.ballPit}update(){for(let t of this.balls)t.x+=t.velocity.x,t.y+=t.velocity.y,t.x-this.radius<0&&t.velocity.x<0&&(t.velocity.x=-t.velocity.x),t.y>=this.canvas.height-this.radius&&t.velocity.y>0&&(t.velocity.y=-t.velocity.y),t.x>=this.canvas.width-this.radius&&t.velocity.x>0&&(t.velocity.x=-t.velocity.x),t.y-this.radius<0&&t.velocity.y<0&&(t.velocity.y=-t.velocity.y)}render(){this.ctx.fillStyle="#0098ff",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);for(const t of this.balls)this.ctx.fillStyle=t.color,this.ctx.beginPath(),this.ctx.arc(t.x,t.y,this.radius,0,2*Math.PI,!1),this.ctx.fill()}runSim(){this.update(),this.render(),this.animLoop=requestAnimationFrame((()=>this.runSim()))}fixArr(t){let e=0,i=this.balls.length-t;if(i>0)for(;e<i;++e)this.balls.pop();else if(i<0)for(i=-i;e<i;++e){let t={x:Math.floor(Math.random()*(this.canvas.width-0+1))+0,y:Math.floor(Math.random()*(this.canvas.height+1)),velocity:{x:Math.floor(5*Math.random())+-2,y:Math.floor(7*Math.random())+-3},color:this.getRandomColor()};0===t.velocity.x&&(t.velocity.x=1),0===t.velocity.y&&(t.velocity.y=1),this.balls.push(t)}}updateUserSpeed(t,e){let i,s;for(let o of this.balls)i=o.velocity.x/t,s=o.velocity.y/t,o.velocity.x=i*e,o.velocity.y=s*e}onNumBalls(t){this.doc.querySelector(".litNumBalls").textContent=t,this.fixArr(t)}onSizeBalls(t){this.doc.querySelector(".litSizeBalls").textContent=t,this.radius=t}onSpeedBalls(t){this.updateUserSpeed(this.doc.querySelector(".litSpeedBalls").textContent,t),this.doc.querySelector(".litSpeedBalls").textContent=t}getRandomColor(){let t="#";for(let e=0;e<6;++e)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}}(this.shadowRoot)}render(){return(0,s.dy)(r||(r=h`
			<div class="card">
				<h2>Ball Pit</h2>
				<p>A Javascript and HTML<sub>5</sub> canvas example with balls colliding into the edges of a box.</p>
			</div>

			<div class="ball-pit">
				<canvas class="card-light"></canvas>

				<div class="range-inputs">
					<div>
						<label>Number of Balls: <span class="litNumBalls">20</span></label>
						<input type="range" value="20" min="1" class="numBalls">
					</div>
					<div>
						<label>Size of Balls (radius): <span class="litSizeBalls">16.5</span></label>
						<input type="range" value="16.5" min="3" step="0.5" max="40" class="sizeBalls">
					</div>
					<div>
						<label>Speed of Balls: <span class="litSpeedBalls">1</span></label>
						<input type="range" value="1" min="0.05" step="0.05" max="2.5" class="speedBalls">
					</div>
				</div>
			</div>
        `))}}var c,u,p;c=d,u="styles",p=[o.default,n.default,(0,s.iv)(a||(a=h`
			.range-inputs > div {
				margin: 0 0 30px;
			}

			.range-inputs label {
				display: block;
				margin-bottom: 5px;
			}

			.range-inputs input {
				cursor: ew-resize;
			}

			.range-inputs input:focus {
				box-shadow: none;
				outline-color: transparent;
			}

			canvas {
				margin: 20px 0;
			}
		`))],u in c?Object.defineProperty(c,u,{value:p,enumerable:!0,configurable:!0,writable:!0}):c[u]=p,customElements.define("page-ball-pit",d)},886:(t,e,i)=>{"use strict";let s;i.r(e),i.d(e,{default:()=>o});const o=(0,i(558).iv)(s||(s=(t=>t)`
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
`))},382:(t,e,i)=>{"use strict";let s;i.r(e),i.d(e,{default:()=>o});const o=(0,i(558).iv)(s||(s=(t=>t)`
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
`))},430:(t,e,i)=>{"use strict";i.d(e,{Z:()=>o});class s{static require(t){return new Promise(((e,i)=>{if(s.constructor._jsSrc.includes(t))e();else{let o=document.createElement("script");o.src=t,o.async=1,document.head.appendChild(o),o.onload=()=>{s.constructor._jsSrc.push(t),e()},o.onerror=()=>i()}}))}static addMeta(t,e){let i=document.createElement("meta");i.setAttribute("name",t),i.setAttribute("content",e),document.head.appendChild(i)}static addLink(t,e,i=!0){let s=document.createElement("link");s.setAttribute("rel",t),s.setAttribute("href",e),i&&s.setAttribute("crossorigin",""),document.head.appendChild(s)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),i=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-i}}s.constructor._jsSrc=[];const o=s},558:(t,e,i)=>{"use strict";var s,o,n,l;i.d(e,{oi:()=>nt,iv:()=>W,dy:()=>B});const r=globalThis.trustedTypes,a=r?r.createPolicy("lit-html",{createHTML:t=>t}):void 0,h=`lit$${(Math.random()+"").slice(9)}$`,d="?"+h,c=`<${d}>`,u=document,p=(t="")=>u.createComment(t),v=t=>null===t||"object"!=typeof t&&"function"!=typeof t,m=Array.isArray,f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,y=/-->/g,g=/>/g,b=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,x=/'/g,S=/"/g,w=/^(?:script|style|textarea)$/i,C=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=C(1),E=(C(2),Symbol.for("lit-noChange")),P=Symbol.for("lit-nothing"),A=new WeakMap,M=u.createTreeWalker(u,129,null,!1),U=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",l=f;for(let e=0;e<i;e++){const i=t[e];let r,a,d=-1,u=0;for(;u<i.length&&(l.lastIndex=u,a=l.exec(i),null!==a);)u=l.lastIndex,l===f?"!--"===a[1]?l=y:void 0!==a[1]?l=g:void 0!==a[2]?(w.test(a[2])&&(o=RegExp("</"+a[2],"g")),l=b):void 0!==a[3]&&(l=b):l===b?">"===a[0]?(l=null!=o?o:f,d=-1):void 0===a[1]?d=-2:(d=l.lastIndex-a[2].length,r=a[1],l=void 0===a[3]?b:'"'===a[3]?S:x):l===S||l===x?l=b:l===y||l===g?l=f:(l=b,o=void 0);const p=l===b&&t[e+1].startsWith("/>")?" ":"";n+=l===f?i+c:d>=0?(s.push(r),i.slice(0,d)+"$lit$"+i.slice(d)+h+p):i+h+(-2===d?(s.push(void 0),e):p)}const r=n+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==a?a.createHTML(r):r,s]};class O{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const l=t.length-1,a=this.parts,[c,u]=U(t,e);if(this.el=O.createElement(c,i),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=M.nextNode())&&a.length<l;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(h)){const i=u[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(h),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?R:"?"===e[1]?T:"@"===e[1]?z:H})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(w.test(s.tagName)){const t=s.textContent.split(h),e=t.length-1;if(e>0){s.textContent=r?r.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],p()),M.nextNode(),a.push({type:2,index:++o});s.append(t[e],p())}}}else if(8===s.nodeType)if(s.data===d)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(h,t+1));)a.push({type:7,index:o}),t+=h.length-1}o++}}static createElement(t,e){const i=u.createElement("template");return i.innerHTML=t,i}}function $(t,e,i=t,s){var o,n,l,r;if(e===E)return e;let a=void 0!==s?null===(o=i.Σi)||void 0===o?void 0:o[s]:i.Σo;const h=v(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(n=null==a?void 0:a.O)||void 0===n||n.call(a,!1),void 0===h?a=void 0:(a=new h(t),a.T(t,i,s)),void 0!==s?(null!==(l=(r=i).Σi)&&void 0!==l?l:r.Σi=[])[s]=a:i.Σo=a),void 0!==a&&(e=$(t,a.S(t,e.values),a,s)),e}class k{constructor(t,e){this.l=[],this.N=void 0,this.D=t,this.M=e}u(t){var e;const{el:{content:i},parts:s}=this.D,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:u).importNode(i,!0);M.currentNode=o;let n=M.nextNode(),l=0,r=0,a=s[0];for(;void 0!==a;){if(l===a.index){let e;2===a.type?e=new N(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new L(n,this,t)),this.l.push(e),a=s[++r]}l!==(null==a?void 0:a.index)&&(n=M.nextNode(),l++)}return o}v(t){let e=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(t,i,e),e+=i.strings.length-2):i.I(t[e])),e++}}class N{constructor(t,e,i,s){this.type=2,this.N=void 0,this.A=t,this.B=e,this.M=i,this.options=s}setConnected(t){var e;null===(e=this.P)||void 0===e||e.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,e=this){t=$(this,t,e),v(t)?t===P||null==t||""===t?(this.H!==P&&this.R(),this.H=P):t!==this.H&&t!==E&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var e;return m(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,e=this.B){return this.A.parentNode.insertBefore(t,e)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const e=this.A.nextSibling;null!==e&&3===e.nodeType&&(null===this.B?null===e.nextSibling:e===this.B.previousSibling)?e.data=t:this.$(u.createTextNode(t)),this.H=t}_(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this.C(t):(void 0===s.el&&(s.el=O.createElement(s.h,this.options)),s);if((null===(e=this.H)||void 0===e?void 0:e.D)===o)this.H.v(i);else{const t=new k(o,this),e=t.u(this.options);t.v(i),this.$(e),this.H=t}}C(t){let e=A.get(t.strings);return void 0===e&&A.set(t.strings,e=new O(t)),e}g(t){m(this.H)||(this.H=[],this.R());const e=this.H;let i,s=0;for(const o of t)s===e.length?e.push(i=new N(this.k(p()),this.k(p()),this,this.options)):i=e[s],i.I(o),s++;s<e.length&&(this.R(i&&i.B.nextSibling,s),e.length=s)}R(t=this.A.nextSibling,e){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,e);t&&t!==this.B;){const e=t.nextSibling;t.remove(),t=e}}}class H{constructor(t,e,i,s,o){this.type=1,this.H=P,this.N=void 0,this.V=void 0,this.element=t,this.name=e,this.M=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(P),this.strings=i):this.H=P}get tagName(){return this.element.tagName}I(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=$(this,t,e,0),n=!v(t)||t!==this.H&&t!==E,n&&(this.H=t);else{const s=t;let l,r;for(t=o[0],l=0;l<o.length-1;l++)r=$(this,s[i+l],e,l),r===E&&(r=this.H[l]),n||(n=!v(r)||r!==this.H[l]),r===P?t=P:t!==P&&(t+=(null!=r?r:"")+o[l+1]),this.H[l]=r}n&&!s&&this.W(t)}W(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class R extends H{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===P?void 0:t}}class T extends H{constructor(){super(...arguments),this.type=4}W(t){t&&t!==P?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class z extends H{constructor(){super(...arguments),this.type=5}I(t,e=this){var i;if((t=null!==(i=$(this,t,e,0))&&void 0!==i?i:P)===E)return;const s=this.H,o=t===P&&s!==P||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==P&&(s===P||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var e,i;"function"==typeof this.H?this.H.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this.H.handleEvent(t)}}class L{constructor(t,e,i){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=e,this.options=i}I(t){$(this,t)}}null===(o=(s=globalThis).litHtmlPlatformSupport)||void 0===o||o.call(s,O,N),(null!==(n=(l=globalThis).litHtmlVersions)&&void 0!==n?n:l.litHtmlVersions=[]).push("2.0.0-rc.2");const q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_=Symbol();class j{constructor(t,e){if(e!==_)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return q&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const I=new Map,W=(t,...e)=>{const i=e.reduce(((e,i,s)=>e+(t=>{if(t instanceof j)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1]),t[0]);let s=I.get(i);return void 0===s&&I.set(i,s=new j(i,_)),s},V=q?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new j(t+"",_))(e)})(t):t;var D,Z,F,J;const K={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},G=(t,e)=>e!==t&&(e==e||t==t),Q={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:G};class X extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var e;null!==(e=this.v)&&void 0!==e||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this.Πp(i,e);void 0!==s&&(this.Πm.set(s,i),t.push(s))})),t}static createProperty(t,e=Q){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Q}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(V(t))}else void 0!==t&&e.push(V(t));return e}static Πp(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this.ΠU)&&void 0!==e?e:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this.ΠU)||void 0===e||e.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this.Πi.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{q?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style");i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,e,i){this.K(t,i)}Πj(t,e,i=Q){var s,o;const n=this.constructor.Πp(t,i);if(void 0!==n&&!0===i.reflect){const l=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:K.toAttribute)(e,i.type);this.Πh=t,null==l?this.removeAttribute(n):this.setAttribute(n,l),this.Πh=null}}K(t,e){var i,s,o;const n=this.constructor,l=n.Πm.get(t);if(void 0!==l&&this.Πh!==l){const t=n.getPropertyOptions(l),r=t.converter,a=null!==(o=null!==(s=null===(i=r)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof r?r:null)&&void 0!==o?o:K.fromAttribute;this.Πh=l,this[l]=a(e,t.type),this.Πh=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||G)(this[t],e)?(this.L.has(t)||this.L.set(t,e),!0===i.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,e)=>this[e]=t)),this.Πi=void 0);let e=!1;const i=this.L;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this.Π$()}catch(t){throw e=!1,this.Π$(),t}e&&this.E(i)}willUpdate(t){}E(t){var e;null===(e=this.ΠU)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,e)=>this.Πj(e,this[e],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}var Y,tt,et,it,st,ot;X.finalized=!0,X.shadowRootOptions={mode:"open"},null===(Z=(D=globalThis).reactiveElementPlatformSupport)||void 0===Z||Z.call(D,{ReactiveElement:X}),(null!==(F=(J=globalThis).reactiveElementVersions)&&void 0!==F?F:J.reactiveElementVersions=[]).push("1.0.0-rc.1"),(null!==(Y=(ot=globalThis).litElementVersions)&&void 0!==Y?Y:ot.litElementVersions=[]).push("3.0.0-rc.1");class nt extends X{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();super.update(t),this.Φt=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(e.insertBefore(p(),t),t,void 0,i)}return l.I(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return E}}nt.finalized=!0,nt._$litElement$=!0,null===(et=(tt=globalThis).litElementHydrateSupport)||void 0===et||et.call(tt,{LitElement:nt}),null===(st=(it=globalThis).litElementPlatformSupport)||void 0===st||st.call(it,{LitElement:nt})}}]);