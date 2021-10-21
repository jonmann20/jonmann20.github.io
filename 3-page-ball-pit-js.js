/*! For license information please see 3-page-ball-pit-js.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[630,417,330],{962:(t,e,i)=>{i.r(e);var s=i(897),n=i(886),o=i(382),l=i(430);let r,a,h=t=>t;class d extends s.oi{constructor(){super(),document.title="Ball Pit | Playground",l.Z.addMeta("description","A canvas example showcasing a ball pit."),l.Z.addMeta("keywords","canvas, html5")}firstUpdated(){window.ballPit=new class{constructor(t){this.doc=t,this.boundOnRoute=t=>this.destroy(t.detail),addEventListener("route",this.boundOnRoute,{passive:!0}),this.canvas=t.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.radius=16.5,this.balls=[],this.canvas.width=l.Z.getMainWidth/1.5,this.canvas.height=this.canvas.width/2,this.boundOnNumBalls=t=>this.onNumBalls(t.target.value),this.boundOnSizeBalls=t=>this.onSizeBalls(t.target.value),this.boundOnSpeedBalls=t=>this.onSpeedBalls(t.target.value),t.querySelector(".numBalls").addEventListener("input",this.boundOnNumBalls),t.querySelector(".sizeBalls").addEventListener("input",this.boundOnSizeBalls),t.querySelector(".speedBalls").addEventListener("input",this.boundOnSpeedBalls);for(let t=0;t<20;++t)this.balls.push({x:Math.floor(Math.random()*(this.canvas.width+1)),y:Math.floor(Math.random()*(this.canvas.height+1)),velocity:{x:Math.floor(-3*Math.random()),y:Math.floor(7*Math.random())-3},color:this.getRandomColor()});this.runSim()}destroy(t){if("playground/ball-pit"===t)return;removeEventListener("route",this.boundOnRoute,{passive:!0}),cancelAnimationFrame(this.animLoop);const e=this.doc.querySelector(".numBalls"),i=this.doc.querySelector(".sizeBalls"),s=this.doc.querySelector(".speedBalls");e&&e.removeEventListener("input",this.boundOnNumBalls),i&&i.removeEventListener("input",this.boundOnSizeBalls),s&&s.removeEventListener("input",this.boundOnSpeedBalls),delete window.ballPit}update(){for(let t of this.balls)t.x+=t.velocity.x,t.y+=t.velocity.y,t.x-this.radius<0&&t.velocity.x<0&&(t.velocity.x=-t.velocity.x),t.y>=this.canvas.height-this.radius&&t.velocity.y>0&&(t.velocity.y=-t.velocity.y),t.x>=this.canvas.width-this.radius&&t.velocity.x>0&&(t.velocity.x=-t.velocity.x),t.y-this.radius<0&&t.velocity.y<0&&(t.velocity.y=-t.velocity.y)}render(){this.ctx.fillStyle="#0098ff",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);for(const t of this.balls)this.ctx.fillStyle=t.color,this.ctx.beginPath(),this.ctx.arc(t.x,t.y,this.radius,0,2*Math.PI,!1),this.ctx.fill()}runSim(){this.update(),this.render(),this.animLoop=requestAnimationFrame((()=>this.runSim()))}fixArr(t){let e=0,i=this.balls.length-t;if(i>0)for(;e<i;++e)this.balls.pop();else if(i<0)for(i=-i;e<i;++e){let t={x:Math.floor(Math.random()*(this.canvas.width-0+1))+0,y:Math.floor(Math.random()*(this.canvas.height+1)),velocity:{x:Math.floor(5*Math.random())+-2,y:Math.floor(7*Math.random())+-3},color:this.getRandomColor()};0===t.velocity.x&&(t.velocity.x=1),0===t.velocity.y&&(t.velocity.y=1),this.balls.push(t)}}updateUserSpeed(t,e){let i,s;for(let n of this.balls)i=n.velocity.x/t,s=n.velocity.y/t,n.velocity.x=i*e,n.velocity.y=s*e}onNumBalls(t){this.doc.querySelector(".litNumBalls").textContent=t,this.fixArr(t)}onSizeBalls(t){this.doc.querySelector(".litSizeBalls").textContent=t,this.radius=t}onSpeedBalls(t){this.updateUserSpeed(this.doc.querySelector(".litSpeedBalls").textContent,t),this.doc.querySelector(".litSpeedBalls").textContent=t}getRandomColor(){let t="#";for(let e=0;e<6;++e)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}}(this.shadowRoot)}render(){return(0,s.dy)(r||(r=h`
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
        `))}}var c,u,p;c=d,u="styles",p=[n.default,o.default,(0,s.iv)(a||(a=h`
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
		`))],u in c?Object.defineProperty(c,u,{value:p,enumerable:!0,configurable:!0,writable:!0}):c[u]=p,customElements.define("page-ball-pit",d)},886:(t,e,i)=>{let s;i.r(e),i.d(e,{default:()=>n});const n=(0,i(897).iv)(s||(s=(t=>t)`
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
`))},382:(t,e,i)=>{let s;i.r(e),i.d(e,{default:()=>n});const n=(0,i(897).iv)(s||(s=(t=>t)`
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
`))},430:(t,e,i)=>{i.d(e,{Z:()=>n});class s{static require(t){return new Promise(((e,i)=>{if(s.constructor._jsSrc.includes(t))e();else{let n=document.createElement("script");n.src=t,n.async=1,document.head.appendChild(n),n.onload=()=>{s.constructor._jsSrc.push(t),e()},n.onerror=()=>i()}}))}static addMeta(t,e){let i=document.createElement("meta");i.setAttribute("name",t),i.setAttribute("content",e),document.head.appendChild(i)}static addLink(t,e,i=!0){let s=document.createElement("link");s.setAttribute("rel",t),s.setAttribute("href",e),i&&s.setAttribute("crossorigin",""),document.head.appendChild(s)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),i=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-i}}s.constructor._jsSrc=[];const n=s},897:(t,e,i)=>{i.d(e,{oi:()=>X,iv:()=>a,dy:()=>H});const s=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new Map;class l{constructor(t,e){if(this._$cssResult$=!0,e!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=o.get(this.cssText);return s&&void 0===t&&(o.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const r=t=>new l("string"==typeof t?t:t+"",n),a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new l(i,n)},h=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t;var d;const c=window.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class m extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(h(t))}else void 0!==t&&e.push(h(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{s?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=v){var s,n;const o=this.constructor._$Eh(t,i);if(void 0!==o&&!0===i.reflect){const l=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:u.toAttribute)(e,i.type);this._$Ei=t,null==l?this.removeAttribute(o):this.setAttribute(o,l),this._$Ei=null}}_$AK(t,e){var i,s,n;const o=this.constructor,l=o._$Eu.get(t);if(void 0!==l&&this._$Ei!==l){const t=o.getPropertyOptions(l),r=t.converter,a=null!==(n=null!==(s=null===(i=r)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof r?r:null)&&void 0!==n?n:u.fromAttribute;this._$Ei=l,this[l]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$EU()}updated(t){}firstUpdated(t){}}var $;m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:m}),(null!==(d=globalThis.reactiveElementVersions)&&void 0!==d?d:globalThis.reactiveElementVersions=[]).push("1.0.1");const f=globalThis.trustedTypes,y=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,_="?"+g,b=`<${_}>`,A=document,S=(t="")=>A.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,w=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,C=/-->/g,M=/>/g,B=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,P=/'/g,U=/"/g,O=/^(?:script|style|textarea)$/i,N=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),H=N(1),T=(N(2),Symbol.for("lit-noChange")),R=Symbol.for("lit-nothing"),k=new WeakMap,z=A.createTreeWalker(A,129,null,!1),L=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",l=E;for(let e=0;e<i;e++){const i=t[e];let r,a,h=-1,d=0;for(;d<i.length&&(l.lastIndex=d,a=l.exec(i),null!==a);)d=l.lastIndex,l===E?"!--"===a[1]?l=C:void 0!==a[1]?l=M:void 0!==a[2]?(O.test(a[2])&&(n=RegExp("</"+a[2],"g")),l=B):void 0!==a[3]&&(l=B):l===B?">"===a[0]?(l=null!=n?n:E,h=-1):void 0===a[1]?h=-2:(h=l.lastIndex-a[2].length,r=a[1],l=void 0===a[3]?B:'"'===a[3]?U:P):l===U||l===P?l=B:l===C||l===M?l=E:(l=B,n=void 0);const c=l===B&&t[e+1].startsWith("/>")?" ":"";o+=l===E?i+b:h>=0?(s.push(r),i.slice(0,h)+"$lit$"+i.slice(h)+g+c):i+g+(-2===h?(s.push(void 0),e):c)}const r=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==y?y.createHTML(r):r,s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const l=t.length-1,r=this.parts,[a,h]=L(t,e);if(this.el=q.createElement(a,i),z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=z.nextNode())&&r.length<l;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(g)){const i=h[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(g),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?W:"?"===e[1]?Z:"@"===e[1]?F:V})}else r.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(g),e=t.length-1;if(e>0){s.textContent=f?f.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],S()),z.nextNode(),r.push({type:2,index:++n});s.append(t[e],S())}}}else if(8===s.nodeType)if(s.data===_)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(g,t+1));)r.push({type:7,index:n}),t+=g.length-1}n++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function D(t,e,i=t,s){var n,o,l,r;if(e===T)return e;let a=void 0!==s?null===(n=i._$Cl)||void 0===n?void 0:n[s]:i._$Cu;const h=x(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(o=null==a?void 0:a._$AO)||void 0===o||o.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,i,s)),void 0!==s?(null!==(l=(r=i)._$Cl)&&void 0!==l?l:r._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=D(t,a._$AS(t,e.values),a,s)),e}class I{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(i,!0);z.currentNode=n;let o=z.nextNode(),l=0,r=0,a=s[0];for(;void 0!==a;){if(l===a.index){let e;2===a.type?e=new j(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new J(o,this,t)),this.v.push(e),a=s[++r]}l!==(null==a?void 0:a.index)&&(o=z.nextNode(),l++)}return n}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class j{constructor(t,e,i,s){var n;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),x(t)?t===R||null==t||""===t?(this._$AH!==R&&this._$AR(),this._$AH=R):t!==this._$AH&&t!==T&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return w(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==R&&x(this._$AH)?this._$AA.nextSibling.data=t:this.S(A.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=q.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(i);else{const t=new I(n,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=k.get(t.strings);return void 0===e&&k.set(t.strings,e=new q(t)),e}M(t){w(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new j(this.A(S()),this.A(S()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class V{constructor(t,e,i,s,n){this.type=1,this._$AH=R,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=D(this,t,e,0),o=!x(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else{const s=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=D(this,s[i+l],e,l),r===T&&(r=this._$AH[l]),o||(o=!x(r)||r!==this._$AH[l]),r===R?t=R:t!==R&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}o&&!s&&this.k(t)}k(t){t===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class W extends V{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===R?void 0:t}}class Z extends V{constructor(){super(...arguments),this.type=4}k(t){t&&t!==R?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class F extends V{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=D(this,t,e,0))&&void 0!==i?i:R)===T)return;const s=this._$AH,n=t===R&&s!==R||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==R&&(s===R||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class J{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}const K=window.litHtmlPolyfillSupport;var G,Q;null==K||K(q,j),(null!==($=globalThis.litHtmlVersions)&&void 0!==$?$:globalThis.litHtmlVersions=[]).push("2.0.1");class X extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let l=o._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=l=new j(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return T}}X.finalized=!0,X._$litElement$=!0,null===(G=globalThis.litElementHydrateSupport)||void 0===G||G.call(globalThis,{LitElement:X});const Y=globalThis.litElementPolyfillSupport;null==Y||Y({LitElement:X}),(null!==(Q=globalThis.litElementVersions)&&void 0!==Q?Q:globalThis.litElementVersions=[]).push("3.0.1")}}]);