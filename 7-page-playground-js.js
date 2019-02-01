(window.webpackJsonp=window.webpackJsonp||[]).push([[12,4,6],{11:function(t,e,o){"use strict";o.r(e);var r=o(23);e.default=r.b`
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
`},12:function(t,e,o){"use strict";o.r(e);var r=o(23);e.default=r.b`
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
`},19:function(t,e,o){"use strict";o.r(e);var r=o(23),a=o(11),i=o(12),n=o(24);customElements.define("page-playground",class extends r.a{static get styles(){return[a.default,i.default,r.b`
				h2 {
					font-size: 1.15em;
					margin: 0.5em 0 0.3em;
				}
			`]}constructor(){super(),document.title="Playground",n.a.addMeta("description","An playground area for web tech demos."),n.a.addMeta("keywords","canvas, html5")}render(){return r.c`
			<div class="col-left card">
				<h1>Playground</h1>
				<p>This area contains small tech demos.  Including some web technology prototypes, various snippets, and extractions from other projects I have worked on.</p>
			</div>

			<div class="col-right">
				<img class="card-light" src="/img/megaman-cross-stitch.jpg" alt="Megaman cross stitch">
			</div>
        `}})},24:function(t,e,o){"use strict";class r{static require(t){return new Promise((e,o)=>{if(r.constructor._jsSrc.includes(t))e();else{let a=document.createElement("script");a.src=t,a.async=1,document.head.appendChild(a),a.onload=(()=>{r.constructor._jsSrc.push(t),e()}),a.onerror=(()=>o())}})}static addMeta(t,e){let o=document.createElement("meta");o.setAttribute("name",t),o.setAttribute("content",e),document.head.appendChild(o)}static addLink(t,e,o=!0){let r=document.createElement("link");r.setAttribute("rel",t),r.setAttribute("href",e),o&&r.setAttribute("crossorigin",""),document.head.appendChild(r)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),o=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-o}}r.constructor._jsSrc=[],e.a=r}}]);