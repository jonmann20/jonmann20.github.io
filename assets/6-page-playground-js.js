(window.webpackJsonp=window.webpackJsonp||[]).push([[9,4,12],{37:function(t,e,o){"use strict";o.r(e),o.d(e,"baseStyles",function(){return n});var i=o(47);const n=i["b"]`
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
`},38:function(t,e,o){"use strict";o.r(e),o.d(e,"pageStyles",function(){return n});var i=o(47);const n=i["b"]`
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
`},43:function(t,e,o){"use strict";o.r(e);var i=o(47),n=o(37),a=o(38),r=o(48),d=o(28);customElements.define("page-playground",class extends i.a{constructor(){super(),document.title="Playground",r.a.addMeta("description","An playground area for web tech demos."),r.a.addMeta("keywords","canvas, html5")}firstUpdated(){d.a.openNav()}render(){return i["b"]`
			<style>
				${n.baseStyles}
				${a.pageStyles}

				h2 {
					font-size: 1.15em;
					margin: 0.5em 0 0.3em;
				}
			</style>

			<div class="col-left card">
				<h1>Playground</h1>
				<p>This area contains small tech demos.  Including some web technology prototypes, various snippets, and extractions from other projects I have worked on.</p>
			</div>

			<div class="col-right">
				<img class="card-light" src="/img/megaman-cross-stitch.jpg" alt="Megaman cross stitch">
			</div>
        `}})},48:function(t,e,o){"use strict";class i{static require(t){return new Promise((e,o)=>{if(i.constructor._jsSrc.includes(t))e();else{let n=document.createElement("script");n.src=t,n.async=1,document.head.appendChild(n),n.onload=(()=>{i.constructor._jsSrc.push(t),e()}),n.onerror=(()=>o())}})}static addMeta(t,e){let o=document.createElement("meta");o.setAttribute("name",t),o.setAttribute("content",e),document.head.appendChild(o)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),o=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-o}}i.constructor._jsSrc=[],e.a=i}}]);