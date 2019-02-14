(window.webpackJsonp=window.webpackJsonp||[]).push([[16,4,8,10,12],{11:function(t,e,i){"use strict";i.r(e);var n=i(26);e.default=n.b`
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
`},12:function(t,e,i){"use strict";i.r(e);var n=i(26);e.default=n.b`
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
`},15:function(t,e,i){"use strict";i.r(e);var n=i(26);function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}class r extends n.a{constructor(){super(),this.expanded=!1}render(){return n.c`
			<style>
				:host {
					overflow-y: ${this.expanded?"hidden":"overlay"};
				}
			</style>
			<slot></slot>
		`}}a(r,"properties",{expanded:{type:Boolean}}),a(r,"styles",n.b`
		:host {
			--offset-top: var(--gel-offset-top, 0px);
			--offset-left: var(--gel-offset-left, 0px);

			--gel-item-margin: 25px;
			--gel-item-padding: 15px;
			--gel-item-width: 250px;
			--gel-item-height: 200px;

			--gel-width: calc(100% - var(--offset-left));
			--gel-height: calc(100% - var(--offset-top));

			width: var(--gel-width);
			height: var(--gel-height);

			position: fixed;

			display: flex;
			flex-direction: row;
			flex-flow: wrap;
			justify-content: center;
			align-content: baseline;
			background: #ccc;
		}
	`),customElements.define("gel-grid",r)},16:function(t,e,i){"use strict";i.r(e);var n,a,r,o=i(26);class s extends o.a{firstUpdated(){this._id=Array.prototype.indexOf.call(this.parentElement.children,this);const t=window.getComputedStyle(this).getPropertyValue("--gel-item-margin");this._margin=parseInt(t.substr(1,2)),this.addEventListener("click",()=>this._onClick()),this._numProps=9,this.offsetTop===this._margin&&--this._numProps,this.offsetLeft===this._margin&&--this._numProps,this._expandingPropsCount=0,this._shrinkingPropsCount=0,this.addEventListener("transitionend",t=>this._onTransitionEnd(t))}render(){return o.c`<slot></slot>`}_onClick(){if(!this.classList.contains("expanding")&&!this.classList.contains("shrinking"))if(this.classList.contains("expanded"))this.classList.remove("expanded"),this.style=`\n\t\t\t\ttop: ${this.dataset.top}px;\n\t\t\t\tleft: ${this.dataset.left}px;\n\t\t\t`,this.classList.add("shrinking"),this.parentElement.removeAttribute("expanded");else{let t=this.cloneNode(!0);t.dataset.top=this.offsetTop-this._margin,t.dataset.left=this.offsetLeft-this._margin,t.style=`\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: ${t.dataset.top}px;\n\t\t\t\tleft: ${t.dataset.left}px;\n\t\t\t`,this.parentElement.appendChild(t),requestAnimationFrame(()=>{t.style=`\n\t\t\t\t\ttop: ${this.parentElement.scrollTop}px;\n\t\t\t\t\tleft: ${this.offsetLeft-this._margin}px;\n\t\t\t\t\tbackground: ${this.dataset.background};\n\t\t\t\t`,t.classList.add("expanding"),this.parentElement.setAttribute("expanded","")})}}_onTransitionEnd(t){this.classList.contains("expanding")&&++this._expandingPropsCount===this._numProps?(this.classList.remove("expanding"),this.classList.add("expanded"),this._expandingPropsCount=0):this.classList.contains("shrinking")&&++this._shrinkingPropsCount===this._numProps&&this.parentElement.removeChild(this)}}n=s,a="styles",r=o.b`
		:host {
			--duration: 0.65s;
			--bezier: cubic-bezier(0, 0, 0.3, 1);
			--transition-props: var(--duration) var(--bezier);
			--header-height: 50px;

			margin: var(--gel-item-margin);
			width: var(--gel-item-width);
			height: var(--gel-item-height);

			transition:
				height var(--duration) var(--bezier),
				left var(--duration) var(--bezier),
				width var(--duration) var(--bezier),
				margin var(--duration) var(--bezier),
				top var(--duration) var(--bezier),
				background var(--duration) var(--bezier);

			position: relative;
			z-index: 0;
			white-space: nowrap;
			box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.3);
			cursor: pointer;
			background: #fefefe;
			color: #444;
			border-radius: 2px;
		}

		:host:active {
			-webkit-tap-highlight-color: transparent;
		}

		:host(.expanding),
		:host(.expanded),
		:host(.shrinking) {
			position: absolute;
			box-shadow: none;
			border-radius: 0;
		}

		:host(.expanding),
		:host(.expanded) {
			z-index: 2;
			width: 100%;
			height: 100%;
			left: 0 !important;
			margin: 0;
		}

		:host(.shrinking) {
			z-index: 1;
		}

		::slotted(img) {
			position: absolute;
			top: var(--header-height);
			left: 0;
			width: var(--gel-item-width);
			height: calc(var(--gel-item-height) - var(--header-height));
			transition:
				left  var(--transition-props),
				transform var(--transition-props);
		}

		:host(.expanding) ::slotted(img),
		:host(.expanded) ::slotted(img) {
			left: 50%;
			transform: translate(-50%, 10px);
		}

		::slotted(header) {
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			z-index: 1;
			margin-top: 15px;
			transition:
				transform 0.5s var(--bezier);
		}

		:host(.expanding) ::slotted(header),
		:host(.expanded) ::slotted(header) {
			transform: scale(2) translateY(5px);
			transform-origin: right;
		}

		::slotted(div) {
			opacity: 0;
			white-space: normal;
			margin-top: calc(var(--gel-item-height));
			padding-top: 25px;
			padding-left: 25px;
			transition: opacity var(--transition-props);
			width: var(--gel-item-width);
			margin-left: auto;
			margin-right: auto;
		}

		:host(.expanded) ::slotted(div) {
			opacity: 1;
		}

		:host(.shrinking) ::slotted(div) {
			opacity: 0;
			transition: none;
		}
	`,a in n?Object.defineProperty(n,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[a]=r,customElements.define("gel-item",s)},20:function(t,e,i){"use strict";i.r(e);var n,a,r,o=i(26),s=i(11),d=i(12);i(15),i(16);class l extends o.a{render(){return o.c`
			<gel-grid>
				<gel-item>
					<header>Header Item #1</header>
					<img src="img/jon-icon.png">
					<div>Div Item #1</div>
				</gel-item>
				<gel-item>
					<header>Header Item #2</header>
					<img src="img/player-down-large.png">
					<div>Div Item #2</div>
				</gel-item>
			</gel-grid>
        `}}n=l,a="styles",r=[s.default,d.default,o.b`
			:host {
				--gel-offset-top: 40px;
				--gel-offset-left: 284px;
			}
		`],a in n?Object.defineProperty(n,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[a]=r,customElements.define("page-grid",l)}}]);