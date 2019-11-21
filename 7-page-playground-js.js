(window.webpackJsonp=window.webpackJsonp||[]).push([[12,4,6],{11:function(t,e,o){"use strict";o.r(e);var a=o(23);let r;e.default=Object(a.b)(r||(r=(t=>t)`
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
`))},12:function(t,e,o){"use strict";o.r(e);var a=o(23);let r;e.default=Object(a.b)(r||(r=(t=>t)`
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
`))},19:function(t,e,o){"use strict";o.r(e);var a=o(23),r=o(11),i=o(12),n=o(24);let d,c,l=t=>t;class s extends a.a{constructor(){super(),document.title="Playground",n.a.addMeta("description","An playground area for web tech demos."),n.a.addMeta("keywords","canvas, html5")}render(){return Object(a.c)(d||(d=l`
			<div class="col-left card">
				<h1>Playground</h1>
				<p>This area contains small tech demos and web technology prototypes.</p>
			</div>

			<div class="col-right">
				<img class="card-light" src="/img/megaman-cross-stitch.jpg" alt="Megaman cross stitch">
			</div>
    `))}}var u,p,m;u=s,p="styles",m=[r.default,i.default,Object(a.b)(c||(c=l`
			h2 {
				font-size: 1.15em;
				margin: 0.5em 0 0.3em;
			}
		`))],p in u?Object.defineProperty(u,p,{value:m,enumerable:!0,configurable:!0,writable:!0}):u[p]=m,customElements.define("page-playground",s)},24:function(t,e,o){"use strict";class a{static require(t){return new Promise((e,o)=>{if(a.constructor._jsSrc.includes(t))e();else{let r=document.createElement("script");r.src=t,r.async=1,document.head.appendChild(r),r.onload=()=>{a.constructor._jsSrc.push(t),e()},r.onerror=()=>o()}})}static addMeta(t,e){let o=document.createElement("meta");o.setAttribute("name",t),o.setAttribute("content",e),document.head.appendChild(o)}static addLink(t,e,o=!0){let a=document.createElement("link");a.setAttribute("rel",t),a.setAttribute("href",e),o&&a.setAttribute("crossorigin",""),document.head.appendChild(a)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),o=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-o}}a.constructor._jsSrc=[],e.a=a}}]);