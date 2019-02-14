(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{16:function(t,i,e){"use strict";e.r(i);var s,n,a,r=e(26);class o extends r.a{firstUpdated(){this._id=Array.prototype.indexOf.call(this.parentElement.children,this);const t=window.getComputedStyle(this).getPropertyValue("--gel-item-margin");this._margin=parseInt(t.substr(1,2)),this.addEventListener("click",()=>this._onClick()),this._numProps=9,this.offsetTop===this._margin&&--this._numProps,this.offsetLeft===this._margin&&--this._numProps,this._expandingPropsCount=0,this._shrinkingPropsCount=0,this.addEventListener("transitionend",t=>this._onTransitionEnd(t))}render(){return r.c`<slot></slot>`}_onClick(){if(!this.classList.contains("expanding")&&!this.classList.contains("shrinking"))if(this.classList.contains("expanded"))this.classList.remove("expanded"),this.style=`\n\t\t\t\ttop: ${this.dataset.top}px;\n\t\t\t\tleft: ${this.dataset.left}px;\n\t\t\t`,this.classList.add("shrinking"),this.parentElement.removeAttribute("expanded");else{let t=this.cloneNode(!0);t.dataset.top=this.offsetTop-this._margin,t.dataset.left=this.offsetLeft-this._margin,t.style=`\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: ${t.dataset.top}px;\n\t\t\t\tleft: ${t.dataset.left}px;\n\t\t\t`,this.parentElement.appendChild(t),requestAnimationFrame(()=>{t.style=`\n\t\t\t\t\ttop: ${this.parentElement.scrollTop}px;\n\t\t\t\t\tleft: ${this.offsetLeft-this._margin}px;\n\t\t\t\t\tbackground: ${this.dataset.background};\n\t\t\t\t`,t.classList.add("expanding"),this.parentElement.setAttribute("expanded","")})}}_onTransitionEnd(t){this.classList.contains("expanding")&&++this._expandingPropsCount===this._numProps?(this.classList.remove("expanding"),this.classList.add("expanded"),this._expandingPropsCount=0):this.classList.contains("shrinking")&&++this._shrinkingPropsCount===this._numProps&&this.parentElement.removeChild(this)}}s=o,n="styles",a=r.b`
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
	`,n in s?Object.defineProperty(s,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):s[n]=a,customElements.define("gel-item",o)}}]);