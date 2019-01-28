(window.webpackJsonp=window.webpackJsonp||[]).push([[6,4,12],{15:function(t,n,e){"use strict";class a{static require(t){return new Promise((n,e)=>{if(a.constructor._jsSrc.includes(t))n();else{let i=document.createElement("script");i.src=t,i.async=1,document.head.appendChild(i),i.onload=(()=>{a.constructor._jsSrc.push(t),n()}),i.onerror=(()=>e())}})}static addMeta(t,n){let e=document.createElement("meta");e.setAttribute("name",t),e.setAttribute("content",n),document.head.appendChild(e)}static addLink(t,n,e=!0){let a=document.createElement("link");a.setAttribute("rel",t),a.setAttribute("href",n),e&&a.setAttribute("crossorigin",""),document.head.appendChild(a)}static get getMainWidth(){const t=document.querySelector("main"),n=window.getComputedStyle(t,null),e=parseFloat(n.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-e}}a.constructor._jsSrc=[],n.a=a},4:function(t,n,e){"use strict";e.r(n);n.default="\n\t:host {\n\t\tdisplay: block;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\th1,\n\th2,\n\th3 {\n\t\tmargin: 0.4em 0 0.6em;\n\t\tfont-size: 1.75em;\n\t\tfont-weight: 300;\n\t\tcolor: #fcfcfa;\n\t\ttext-shadow: 0 2px 3px #212121;\n\t}\n\n\tul {\n\t\tlist-style-type: none;\n\t\tpadding: 0;\n\t}\n\n\ta {\n\t\tcolor: #66d9ef;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t}\n\n\ta:hover {\n\t\tcolor: #7ddff1;\n\t\ttext-shadow: #7ddff1 0 0 6px;\n\t}\n\n\ta:active {\n\t\tcolor: #4fd3ed;\n\t}\n\n\ta:focus {\n\t\toutline: 0;\n\t}\n\n\tinput {\n\t\toutline-color: #888;\n\t}\n\n\tinput:focus {\n\t\tbox-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);\n\t}\n\n\t/* avoid FOUC, could remove if bundled? */\n\tmwc-icon {\n\t\tdisplay: inline-block;\n\t\twidth: 24px;\n\t\t/* not working --- font-display: block; */\n\t}\n\n\t/* utils */\n\n\t.card {\n\t\tdisplay: inline-block;\n\t\tbackground: #2d2a2e;\n\t\tbox-shadow: var(--box-shadow-2);\n\t\tborder-radius: 2px;\n\t\tpadding: 3px 25px 5px;\n\t}\n\n\t.card-light {\n\t\tborder-radius: 2px;\n\t\tbox-shadow: var(--box-shadow-2);\n\t}\n"},5:function(t,n,e){"use strict";e.r(n);n.default="\n\t.col-left {\n\t\tmin-width: 121px;\n\t\twidth: 100%;\n\t}\n\n\t.col-left ul {\n\t\tfont-size: 1.15em;\n\t}\n\n\t.col-right {\n\t\tmargin-top: 25px;\n\t\tpadding-bottom: 13px;\n\t}\n\n\t.col-right img {\n\t\tmax-width: 100%;\n\t}\n\n\t.col-right > div {\n\t\tpadding-bottom: 13px !important;\n\t}\n\n\t/* > mobile */\n\t@media (min-width: 801px) {\n\t\t.col-left {\n\t\t\tfloat: left;\n\t\t\twidth: 46%;\n\t\t\tmargin-right: 2%;\n\t\t}\n\n\t\t.col-right {\n\t\t\tfloat: right;\n\t\t\twidth: 50%;\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n\n\t/* tablet */\n\t@media (min-width: 801px) and (max-width: 1265px) {\n\t\t.col-left {\n\t\t\twidth: 100%;\n\t\t\tmargin-bottom: 0;\n\t\t}\n\n\t\t.col-right {\n\t\t\twidth: 100%;\n\t\t\tmargin-top: 25px;\n\t\t}\n\t}\n"},7:function(t,n,e){"use strict";e.r(n);var a=e(16),i=e(4),r=e(5),o=e(15);customElements.define("page-breakdancing-cube",class extends a.a{constructor(){super(),document.title="Breakdancing Cube | Playground",o.a.addMeta("description","Pure CSS3 animation demo."),o.a.addMeta("keywords","CSS3, HTML5")}render(){return a.c`
			<style>
				${i.default}
				${r.default}

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
			</style>

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
        `}})}}]);