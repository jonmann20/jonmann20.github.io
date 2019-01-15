(window.webpackJsonp=window.webpackJsonp||[]).push([[6,4,12],{37:function(t,e,a){"use strict";a.r(e),a.d(e,"baseStyles",function(){return n});var i=a(47);const n=i["b"]`
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
		color: #fcfcfa;
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: #66d9ef;
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

	input {
		outline-color: #888;
	}

	input:focus {
		box-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);
	}

	iron-icon {
		display: inline-block;
		width: 24px;
	}

	/* utils */

	.card {
		display: inline-block;
		background: #2d2a2e;
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`},38:function(t,e,a){"use strict";a.r(e),a.d(e,"pageStyles",function(){return n});var i=a(47);const n=i["b"]`
	.col-left {
		min-width: 121px;
		width: 100%;
	}

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
`},40:function(t,e,a){"use strict";a.r(e);var i=a(47),n=a(37),r=a(38),o=a(48),d=a(28);customElements.define("page-breakdancing-cube",class extends i.a{constructor(){super(),document.title="Breakdancing Cube | Playground",o.a.addMeta("description","Pure CSS3 animation demo."),o.a.addMeta("keywords","CSS3, HTML5")}firstUpdated(){d.a.openNav()}render(){return i["b"]`
			<style>
				${n.baseStyles}
				${r.pageStyles}

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
        `}})},48:function(t,e,a){"use strict";class i{static require(t){return new Promise((e,a)=>{if(i.constructor._jsSrc.includes(t))e();else{let n=document.createElement("script");n.src=t,n.async=1,document.head.appendChild(n),n.onload=(()=>{i.constructor._jsSrc.push(t),e()}),n.onerror=(()=>a())}})}static addMeta(t,e){let a=document.createElement("meta");a.setAttribute("name",t),a.setAttribute("content",e),document.head.appendChild(a)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),a=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-a}}i.constructor._jsSrc=[],e.a=i}}]);