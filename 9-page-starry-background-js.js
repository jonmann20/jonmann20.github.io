(window.webpackJsonp=window.webpackJsonp||[]).push([[14,4,6,7],{11:function(t,e,o){"use strict";o.r(e);var i=o(23);let r;e.default=Object(i.b)(r||(r=(t=>t)`
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
`))},12:function(t,e,o){"use strict";o.r(e);var i=o(23);let r;e.default=Object(i.b)(r||(r=(t=>t)`
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
`))},13:function(t,e,o){"use strict";o.r(e),o.d(e,"BLACK",(function(){return r})),o.d(e,"BLUE",(function(){return s})),o.d(e,"RED",(function(){return a})),o.d(e,"WHITE",(function(){return n})),o.d(e,"YELLOW",(function(){return l}));const i=getComputedStyle(document.body),r=i.getPropertyValue("--black"),s=i.getPropertyValue("--blue"),a=i.getPropertyValue("--red"),n=i.getPropertyValue("--white"),l=i.getPropertyValue("--yellow")},22:function(t,e,o){"use strict";o.r(e);var i=o(23),r=o(11),s=o(12),a=o(24);class n{constructor(t){this.windowBg="#000",this.starColor=t.star_color,this.fov=t.star_depth,this.SCREEN_WIDTH=t.window_width,this.SCREEN_HEIGHT=t.window_height,this.HALF_WIDTH=this.SCREEN_WIDTH/2,this.HALF_HEIGHT=this.SCREEN_HEIGHT/2,this.mouseX=0,this.mouseY=0,this.numPoints=t.star_count,this.points=[],this.elt=t.elt,this.ctx=this.elt.getContext("2d"),this.doc=t.doc,this.elt.setAttribute("width",this.SCREEN_WIDTH),this.elt.setAttribute("height",this.SCREEN_HEIGHT),this.boundOnMouseMove=t=>this.onMouseMove(t),this.doc.addEventListener("mousemove",this.boundOnMouseMove),this.initPoints(),this.loop()}destroy(){cancelAnimationFrame(this.animLoop),this.doc.removeEventListener("mousemove",this.boundOnMouseMove)}onMouseMove(t){this.mouseX=t.pageX-this.HALF_WIDTH,this.mouseY=t.pageY-this.HALF_HEIGHT}initPoints(){let t;for(let e=0;e<this.numPoints;++e)t=[400*Math.random()-200,400*Math.random()-200,400*Math.random()-200],this.points.push(t)}loop(){this.render(),this.animLoop=requestAnimationFrame(()=>this.loop())}render(){this.ctx.fillStyle=this.windowBg,this.ctx.fillRect(0,0,this.SCREEN_WIDTH,this.SCREEN_HEIGHT);for(let t=0;t<this.numPoints;++t){let e=this.points[t],o=e[2];o-=1.08,o<-this.fov&&(o+=400),e[2]=o,this.draw3Din2D(e)}}draw3Din2D(t){const e=t[0],o=t[1],i=t[2],r=this.fov/(this.fov+i),s=e*r+this.HALF_WIDTH-this.mouseX/3,a=o*r+this.HALF_HEIGHT-this.mouseY/3;this.ctx.lineWidth=r,this.ctx.strokeStyle=this.starColor,this.ctx.beginPath(),this.ctx.moveTo(s,a),this.ctx.lineTo(s+r,a),this.ctx.stroke()}}var l=class{constructor(t){this.doc=t,this.boundOnRoute=t=>this.destroy(t.detail),addEventListener("route",this.boundOnRoute,{passive:!0});const e=t.querySelector("input[type=radio]:checked").value;this.initStar(e);let o=Array.from(t.querySelectorAll("input[type=radio]"));for(let t of o)t.addEventListener("click",t=>this.onColorChange(t.target.value),{passive:!0})}destroy(t){if("playground/starry-background"===t)return;removeEventListener("route",this.boundOnRoute,{passive:!0}),cancelAnimationFrame(this.animLoop),this.starBg.destroy();let e=Array.from(this.doc.querySelectorAll("input[type=radio]"));for(let t of e)t.removeEventListener("click",t=>this.onColorChange(t.target.value),{passive:!0});delete window.starryBg}initStar(t){this.starBg=new n({elt:this.doc.getElementById("starry-canvas"),window_width:a.a.getMainWidth,window_height:400,star_color:t,star_count:1300,star_depth:330,container:"starry-canvas",doc:this.doc})}onColorChange(t){this.starBg.destroy(),delete this.starBg,this.initStar(t)}},d=o(13);let c,h,u=t=>t;class p extends i.a{constructor(){super(),document.title="Starry Background | Playground",a.a.addMeta("description","A canvas example showcasing a starry background."),a.a.addMeta("keywords","canvas, html5")}firstUpdated(){window.starryBg=new l(this.shadowRoot)}render(){return Object(i.c)(c||(c=u`
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
						White <input type="radio" value="${0}" name="colors" checked>
					</label>
					<label>
						Green <input type="radio" value="#a6e22e" name="colors">
					</label>
					<label>
						Yellow <input type="radio" value="${0}" name="colors">
					</label>
					<label>
						Purple <input type="radio" value="#ab9df2" name="colors">
					</label>
				</p>
			</div>
        `),d.WHITE,d.YELLOW)}}var m,g,b;m=p,g="styles",b=[r.default,s.default,Object(i.b)(h||(h=u`
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
		`))],g in m?Object.defineProperty(m,g,{value:b,enumerable:!0,configurable:!0,writable:!0}):m[g]=b,customElements.define("page-starry-background",p)},24:function(t,e,o){"use strict";class i{static require(t){return new Promise((e,o)=>{if(i.constructor._jsSrc.includes(t))e();else{let r=document.createElement("script");r.src=t,r.async=1,document.head.appendChild(r),r.onload=()=>{i.constructor._jsSrc.push(t),e()},r.onerror=()=>o()}})}static addMeta(t,e){let o=document.createElement("meta");o.setAttribute("name",t),o.setAttribute("content",e),document.head.appendChild(o)}static addLink(t,e,o=!0){let i=document.createElement("link");i.setAttribute("rel",t),i.setAttribute("href",e),o&&i.setAttribute("crossorigin",""),document.head.appendChild(i)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),o=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-o}}i.constructor._jsSrc=[],e.a=i}}]);