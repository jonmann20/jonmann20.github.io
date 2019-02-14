(window.webpackJsonp=window.webpackJsonp||[]).push([[14,8,10],{11:function(t,e,a){"use strict";a.r(e);var i=a(26);e.default=i.b`
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
`},12:function(t,e,a){"use strict";a.r(e);var i=a(26);e.default=i.b`
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
`},18:function(t,e,a){"use strict";a.r(e);var i,r,n,o=a(26),d=a(11),s=a(12),c=a(27);class p extends o.a{constructor(){super(),document.title="Breakdancing Cube | Playground",c.a.addMeta("description","Pure CSS3 animation demo."),c.a.addMeta("keywords","CSS3, HTML5")}render(){return o.c`
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
        `}}i=p,r="styles",n=[d.default,s.default,o.b`
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
		`],r in i?Object.defineProperty(i,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):i[r]=n,customElements.define("page-breakdancing-cube",p)},27:function(t,e,a){"use strict";class i{static require(t){return new Promise((e,a)=>{if(i.constructor._jsSrc.includes(t))e();else{let r=document.createElement("script");r.src=t,r.async=1,document.head.appendChild(r),r.onload=(()=>{i.constructor._jsSrc.push(t),e()}),r.onerror=(()=>a())}})}static addMeta(t,e){let a=document.createElement("meta");a.setAttribute("name",t),a.setAttribute("content",e),document.head.appendChild(a)}static addLink(t,e){let a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=document.createElement("link");i.setAttribute("rel",t),i.setAttribute("href",e),a&&i.setAttribute("crossorigin",""),document.head.appendChild(i)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),a=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-a}}i.constructor._jsSrc=[],e.a=i}}]);