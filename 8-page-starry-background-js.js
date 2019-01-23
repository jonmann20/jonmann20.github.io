(window.webpackJsonp=window.webpackJsonp||[]).push([[10,3,11],{16:function(t,e,o){"use strict";o.r(e);var i=o(0),s=o(5),a=o(6),n=o(17),r=o(1);class d{constructor(t){this.windowBg="#000",this.starColor=t.star_color,this.fov=t.star_depth,this.SCREEN_WIDTH=t.window_width,this.SCREEN_HEIGHT=t.window_height,this.HALF_WIDTH=this.SCREEN_WIDTH/2,this.HALF_HEIGHT=this.SCREEN_HEIGHT/2,this.mouseX=0,this.mouseY=0,this.numPoints=t.star_count,this.points=[],this.elt=t.elt,this.ctx=this.elt.getContext("2d"),this.doc=t.doc,this.elt.setAttribute("width",this.SCREEN_WIDTH),this.elt.setAttribute("height",this.SCREEN_HEIGHT),this.boundOnMouseMove=(t=>this.onMouseMove(t)),this.doc.addEventListener("mousemove",this.boundOnMouseMove),this.initPoints(),this.loop()}destroy(){cancelAnimationFrame(this.animLoop),this.doc.removeEventListener("mousemove",this.boundOnMouseMove)}onMouseMove(t){this.mouseX=t.pageX-this.HALF_WIDTH,this.mouseY=t.pageY-this.HALF_HEIGHT}initPoints(){let t;for(let e=0;e<this.numPoints;++e)t=[400*Math.random()-200,400*Math.random()-200,400*Math.random()-200],this.points.push(t)}loop(){this.render(),this.animLoop=requestAnimationFrame(()=>this.loop())}render(){this.ctx.fillStyle=this.windowBg,this.ctx.fillRect(0,0,this.SCREEN_WIDTH,this.SCREEN_HEIGHT);for(let t=0;t<this.numPoints;++t){let e=this.points[t],o=e[2];(o-=1.08)<-this.fov&&(o+=400),e[2]=o,this.draw3Din2D(e)}}draw3Din2D(t){const e=t[0],o=t[1],i=t[2],s=this.fov/(this.fov+i),a=e*s+this.HALF_WIDTH-this.mouseX/3,n=o*s+this.HALF_HEIGHT-this.mouseY/3;this.ctx.lineWidth=s,this.ctx.strokeStyle=this.starColor,this.ctx.beginPath(),this.ctx.moveTo(a,n),this.ctx.lineTo(a+s,n),this.ctx.stroke()}}var c=class{constructor(t){this.doc=t,this.boundOnRoute=(t=>this.destroy(t.detail)),addEventListener("route",this.boundOnRoute,{passive:!0});const e=t.querySelector("input[type=radio]:checked").value;this.initStar(e);let o=Array.from(t.querySelectorAll("input[type=radio]"));for(let t of o)t.addEventListener("click",t=>this.onColorChange(t.target.value),{passive:!0})}destroy(t){if("playground/starry-background"===t)return;removeEventListener("route",this.boundOnRoute,{passive:!0}),cancelAnimationFrame(this.animLoop),this.starBg.destroy();let e=Array.from(this.doc.querySelectorAll("input[type=radio]"));for(let t of e)t.removeEventListener("click",t=>this.onColorChange(t.target.value),{passive:!0});delete window.starryBg}initStar(t){this.starBg=new d({elt:this.doc.getElementById("starry-canvas"),window_width:n.a.getMainWidth,window_height:400,star_color:t,star_count:1300,star_depth:330,container:"starry-canvas",doc:this.doc})}onColorChange(t){this.starBg.destroy(),delete this.starBg,this.initStar(t)}};customElements.define("page-starry-background",class extends i.a{constructor(){super(),document.title="Starry Background | Playground",n.a.addMeta("description","A canvas example showcasing a starry background."),n.a.addMeta("keywords","canvas, html5")}firstUpdated(){r.a.openNav(),window.starryBg=new c(this.shadowRoot)}render(){return i.c`
			<style>
				${s.baseStyles}
				${a.pageStyles}

				canvas {
					z-index: -1;
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 100%;
				}

				.color-wrap {
					margin-top: 25px;
				}

				label {
					cursor: pointer;
					margin-right: 15px;
				}

				input {
					cursor: pointer;
					vertical-align: -2px;
				}

				input:focus {
					box-shadow: none;
					outline-color: transparent;
				}

				input:last-child {
					margin-right: 0;
				}
			</style>

			<div class="card">
				<h2>Starry Background</h2>
				<p>A Javascript and HTML<sub>5</sub> canvas example showcasing an interactive starry background.</p>
			</div>
			<canvas id="starry-canvas"></canvas>
			<br>
			<div class="card color-wrap">
				<h3>Change Color</h3>

				<p class="color-picker">
					<label>
						White <input type="radio" value="#fcfcfa" name="colors" checked>
					</label>
					<label>
						Green <input type="radio" value="#a6e22e" name="colors">
					</label>
					<label>
						Yellow <input type="radio" value="#ffd866" name="colors">
					</label>
					<label>
						Purple <input type="radio" value="#ab9df2" name="colors">
					</label>
				</p>
			</div>
        `}})},17:function(t,e,o){"use strict";class i{static require(t){return new Promise((e,o)=>{if(i.constructor._jsSrc.includes(t))e();else{let s=document.createElement("script");s.src=t,s.async=1,document.head.appendChild(s),s.onload=(()=>{i.constructor._jsSrc.push(t),e()}),s.onerror=(()=>o())}})}static addMeta(t,e){let o=document.createElement("meta");o.setAttribute("name",t),o.setAttribute("content",e),document.head.appendChild(o)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),o=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-o}}i.constructor._jsSrc=[],e.a=i},5:function(t,e,o){"use strict";o.r(e),o.d(e,"baseStyles",function(){return i});const i=o(0).c`
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

	/* avoid FOUC, could remove if bundled? */
	mwc-icon {
		display: inline-block;
		width: 24px;
		opacity: var(--icon-opacity);
		/* not working --- font-display: block; */
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
`},6:function(t,e,o){"use strict";o.r(e),o.d(e,"pageStyles",function(){return i});const i=o(0).c`
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
`}}]);