(window.webpackJsonp=window.webpackJsonp||[]).push([[12,4,6,7],{11:function(t,e,o){"use strict";o.r(e),o.d(e,"BLACK",function(){return r}),o.d(e,"BLUE",function(){return i}),o.d(e,"GREEN",function(){return d}),o.d(e,"WHITE",function(){return a}),o.d(e,"PURPLE",function(){return c}),o.d(e,"YELLOW",function(){return s}),o.d(e,"GRAY",function(){return l}),o.d(e,"RED",function(){return u});var n=o(23);const r=Object(n.d)("#2d2a2e"),i=Object(n.d)("#66d9ef"),d=Object(n.d)("#a6e22e"),a=Object(n.d)("#fcfcfa"),c=Object(n.d)("#ab9df2"),s=Object(n.d)("#ffd866"),l=Object(n.d)("#919091"),u=Object(n.d)("#ff6188")},12:function(t,e,o){"use strict";o.r(e);var n=o(23),r=o(11);e.default=n.b`
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
		color: ${r.WHITE};
		text-shadow: 0 2px 3px #212121;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	a {
		color: ${r.BLUE};
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
		color: ${r.RED} !important;
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
		background: ${r.BLACK};
		box-shadow: var(--box-shadow-2);
		border-radius: 2px;
		padding: 3px 25px 5px;
	}

	.card-light {
		border-radius: 2px;
		box-shadow: var(--box-shadow-2);
	}
`},13:function(t,e,o){"use strict";o.r(e);var n=o(23);e.default=n.b`
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
`},19:function(t,e,o){"use strict";o.r(e);var n=o(23),r=o(12),i=o(13),d=o(24);customElements.define("page-playground",class extends n.a{static get styles(){return[r.default,i.default,n.b`
				h2 {
					font-size: 1.15em;
					margin: 0.5em 0 0.3em;
				}
			`]}constructor(){super(),document.title="Playground",d.a.addMeta("description","An playground area for web tech demos."),d.a.addMeta("keywords","canvas, html5")}render(){return n.c`
			<div class="col-left card">
				<h1>Playground</h1>
				<p>This area contains small tech demos.  Including some web technology prototypes, various snippets, and extractions from other projects I have worked on.</p>
			</div>

			<div class="col-right">
				<img class="card-light" src="/img/megaman-cross-stitch.jpg" alt="Megaman cross stitch">
			</div>
        `}})},24:function(t,e,o){"use strict";class n{static require(t){return new Promise((e,o)=>{if(n.constructor._jsSrc.includes(t))e();else{let r=document.createElement("script");r.src=t,r.async=1,document.head.appendChild(r),r.onload=(()=>{n.constructor._jsSrc.push(t),e()}),r.onerror=(()=>o())}})}static addMeta(t,e){let o=document.createElement("meta");o.setAttribute("name",t),o.setAttribute("content",e),document.head.appendChild(o)}static addLink(t,e,o=!0){let n=document.createElement("link");n.setAttribute("rel",t),n.setAttribute("href",e),o&&n.setAttribute("crossorigin",""),document.head.appendChild(n)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),o=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-o}}n.constructor._jsSrc=[],e.a=n}}]);