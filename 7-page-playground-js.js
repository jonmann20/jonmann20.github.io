(window.webpackJsonp=window.webpackJsonp||[]).push([[11,4,6],{11:function(t,n,e){"use strict";e.r(n);n.default="\n\t:host {\n\t\tdisplay: block;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\th1,\n\th2,\n\th3 {\n\t\tmargin: 0.4em 0 0.6em;\n\t\tfont-size: 1.75em;\n\t\tfont-weight: 300;\n\t\tcolor: #fcfcfa;\n\t\ttext-shadow: 0 2px 3px #212121;\n\t}\n\n\tul {\n\t\tlist-style-type: none;\n\t\tpadding: 0;\n\t}\n\n\ta {\n\t\tcolor: #66d9ef;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t}\n\n\ta:hover {\n\t\tcolor: #7ddff1;\n\t\ttext-shadow: #7ddff1 0 0 6px;\n\t}\n\n\ta:active {\n\t\tcolor: #4fd3ed;\n\t}\n\n\ta:focus {\n\t\toutline: 0;\n\t}\n\n\tinput {\n\t\toutline-color: #888;\n\t}\n\n\tinput:focus {\n\t\tbox-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);\n\t}\n\n\t/* utils */\n\n\t.card {\n\t\tdisplay: inline-block;\n\t\tbackground: #2d2a2e;\n\t\tbox-shadow: var(--box-shadow-2);\n\t\tborder-radius: 2px;\n\t\tpadding: 3px 25px 5px;\n\t}\n\n\t.card-light {\n\t\tborder-radius: 2px;\n\t\tbox-shadow: var(--box-shadow-2);\n\t}\n"},12:function(t,n,e){"use strict";e.r(n);n.default="\n\t.col-left {\n\t\tmin-width: 121px;\n\t\twidth: 100%;\n\t}\n\n\t.col-left ul {\n\t\tfont-size: 1.15em;\n\t}\n\n\t.col-right {\n\t\tmargin-top: 25px;\n\t\tpadding-bottom: 13px;\n\t}\n\n\t.col-right img {\n\t\tmax-width: 100%;\n\t}\n\n\t.col-right > div {\n\t\tpadding-bottom: 13px !important;\n\t}\n\n\t/* > mobile */\n\t@media (min-width: 801px) {\n\t\t.col-left {\n\t\t\tfloat: left;\n\t\t\twidth: 46%;\n\t\t\tmargin-right: 2%;\n\t\t}\n\n\t\t.col-right {\n\t\t\tfloat: right;\n\t\t\twidth: 50%;\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n\n\t/* tablet */\n\t@media (min-width: 801px) and (max-width: 1265px) {\n\t\t.col-left {\n\t\t\twidth: 100%;\n\t\t\tmargin-bottom: 0;\n\t\t}\n\n\t\t.col-right {\n\t\t\twidth: 100%;\n\t\t\tmargin-top: 25px;\n\t\t}\n\t}\n"},18:function(t,n,e){"use strict";e.r(n);var o=e(23),i=e(11),a=e(12),r=e(22);customElements.define("page-playground",class extends o.a{constructor(){super(),document.title="Playground",r.a.addMeta("description","An playground area for web tech demos."),r.a.addMeta("keywords","canvas, html5")}render(){return o.b`
			<style>
				${i.default}
				${a.default}

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
        `}})},22:function(t,n,e){"use strict";class o{static require(t){return new Promise((n,e)=>{if(o.constructor._jsSrc.includes(t))n();else{let i=document.createElement("script");i.src=t,i.async=1,document.head.appendChild(i),i.onload=(()=>{o.constructor._jsSrc.push(t),n()}),i.onerror=(()=>e())}})}static addMeta(t,n){let e=document.createElement("meta");e.setAttribute("name",t),e.setAttribute("content",n),document.head.appendChild(e)}static addLink(t,n,e=!0){let o=document.createElement("link");o.setAttribute("rel",t),o.setAttribute("href",n),e&&o.setAttribute("crossorigin",""),document.head.appendChild(o)}static get getMainWidth(){const t=document.querySelector("main"),n=window.getComputedStyle(t,null),e=parseFloat(n.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-e}}o.constructor._jsSrc=[],n.a=o}}]);