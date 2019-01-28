(window.webpackJsonp=window.webpackJsonp||[]).push([[11,4,12],{14:function(t,n,e){"use strict";e.r(n);var o=e(16),i=e(4),s=e(5),r=e(15);class a{constructor(t){this.windowBg="#000",this.starColor=t.star_color,this.fov=t.star_depth,this.SCREEN_WIDTH=t.window_width,this.SCREEN_HEIGHT=t.window_height,this.HALF_WIDTH=this.SCREEN_WIDTH/2,this.HALF_HEIGHT=this.SCREEN_HEIGHT/2,this.mouseX=0,this.mouseY=0,this.numPoints=t.star_count,this.points=[],this.elt=t.elt,this.ctx=this.elt.getContext("2d"),this.doc=t.doc,this.elt.setAttribute("width",this.SCREEN_WIDTH),this.elt.setAttribute("height",this.SCREEN_HEIGHT),this.boundOnMouseMove=(t=>this.onMouseMove(t)),this.doc.addEventListener("mousemove",this.boundOnMouseMove),this.initPoints(),this.loop()}destroy(){cancelAnimationFrame(this.animLoop),this.doc.removeEventListener("mousemove",this.boundOnMouseMove)}onMouseMove(t){this.mouseX=t.pageX-this.HALF_WIDTH,this.mouseY=t.pageY-this.HALF_HEIGHT}initPoints(){let t;for(let n=0;n<this.numPoints;++n)t=[400*Math.random()-200,400*Math.random()-200,400*Math.random()-200],this.points.push(t)}loop(){this.render(),this.animLoop=requestAnimationFrame(()=>this.loop())}render(){this.ctx.fillStyle=this.windowBg,this.ctx.fillRect(0,0,this.SCREEN_WIDTH,this.SCREEN_HEIGHT);for(let t=0;t<this.numPoints;++t){let n=this.points[t],e=n[2];(e-=1.08)<-this.fov&&(e+=400),n[2]=e,this.draw3Din2D(n)}}draw3Din2D(t){const n=t[0],e=t[1],o=t[2],i=this.fov/(this.fov+o),s=n*i+this.HALF_WIDTH-this.mouseX/3,r=e*i+this.HALF_HEIGHT-this.mouseY/3;this.ctx.lineWidth=i,this.ctx.strokeStyle=this.starColor,this.ctx.beginPath(),this.ctx.moveTo(s,r),this.ctx.lineTo(s+i,r),this.ctx.stroke()}}var d=class{constructor(t){this.doc=t,this.boundOnRoute=(t=>this.destroy(t.detail)),addEventListener("route",this.boundOnRoute,{passive:!0});const n=t.querySelector("input[type=radio]:checked").value;this.initStar(n);let e=Array.from(t.querySelectorAll("input[type=radio]"));for(let t of e)t.addEventListener("click",t=>this.onColorChange(t.target.value),{passive:!0})}destroy(t){if("playground/starry-background"===t)return;removeEventListener("route",this.boundOnRoute,{passive:!0}),cancelAnimationFrame(this.animLoop),this.starBg.destroy();let n=Array.from(this.doc.querySelectorAll("input[type=radio]"));for(let t of n)t.removeEventListener("click",t=>this.onColorChange(t.target.value),{passive:!0});delete window.starryBg}initStar(t){this.starBg=new a({elt:this.doc.getElementById("starry-canvas"),window_width:r.a.getMainWidth,window_height:400,star_color:t,star_count:1300,star_depth:330,container:"starry-canvas",doc:this.doc})}onColorChange(t){this.starBg.destroy(),delete this.starBg,this.initStar(t)}};customElements.define("page-starry-background",class extends o.a{constructor(){super(),document.title="Starry Background | Playground",r.a.addMeta("description","A canvas example showcasing a starry background."),r.a.addMeta("keywords","canvas, html5")}firstUpdated(){window.starryBg=new d(this.shadowRoot)}render(){return o.c`
			<style>
				${i.default}
				${s.default}

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
        `}})},15:function(t,n,e){"use strict";class o{static require(t){return new Promise((n,e)=>{if(o.constructor._jsSrc.includes(t))n();else{let i=document.createElement("script");i.src=t,i.async=1,document.head.appendChild(i),i.onload=(()=>{o.constructor._jsSrc.push(t),n()}),i.onerror=(()=>e())}})}static addMeta(t,n){let e=document.createElement("meta");e.setAttribute("name",t),e.setAttribute("content",n),document.head.appendChild(e)}static addLink(t,n,e=!0){let o=document.createElement("link");o.setAttribute("rel",t),o.setAttribute("href",n),e&&o.setAttribute("crossorigin",""),document.head.appendChild(o)}static get getMainWidth(){const t=document.querySelector("main"),n=window.getComputedStyle(t,null),e=parseFloat(n.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-e}}o.constructor._jsSrc=[],n.a=o},4:function(t,n,e){"use strict";e.r(n);n.default="\n\t:host {\n\t\tdisplay: block;\n\t}\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\th1,\n\th2,\n\th3 {\n\t\tmargin: 0.4em 0 0.6em;\n\t\tfont-size: 1.75em;\n\t\tfont-weight: 300;\n\t\tcolor: #fcfcfa;\n\t\ttext-shadow: 0 2px 3px #212121;\n\t}\n\n\tul {\n\t\tlist-style-type: none;\n\t\tpadding: 0;\n\t}\n\n\ta {\n\t\tcolor: #66d9ef;\n\t\ttext-decoration: none;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t}\n\n\ta:hover {\n\t\tcolor: #7ddff1;\n\t\ttext-shadow: #7ddff1 0 0 6px;\n\t}\n\n\ta:active {\n\t\tcolor: #4fd3ed;\n\t}\n\n\ta:focus {\n\t\toutline: 0;\n\t}\n\n\tinput {\n\t\toutline-color: #888;\n\t}\n\n\tinput:focus {\n\t\tbox-shadow: 2px 2px 16px 2px rgba(0, 0, 0, 0.45);\n\t}\n\n\t/* avoid FOUC, could remove if bundled? */\n\tmwc-icon {\n\t\tdisplay: inline-block;\n\t\twidth: 24px;\n\t\t/* not working --- font-display: block; */\n\t}\n\n\t/* utils */\n\n\t.card {\n\t\tdisplay: inline-block;\n\t\tbackground: #2d2a2e;\n\t\tbox-shadow: var(--box-shadow-2);\n\t\tborder-radius: 2px;\n\t\tpadding: 3px 25px 5px;\n\t}\n\n\t.card-light {\n\t\tborder-radius: 2px;\n\t\tbox-shadow: var(--box-shadow-2);\n\t}\n"},5:function(t,n,e){"use strict";e.r(n);n.default="\n\t.col-left {\n\t\tmin-width: 121px;\n\t\twidth: 100%;\n\t}\n\n\t.col-left ul {\n\t\tfont-size: 1.15em;\n\t}\n\n\t.col-right {\n\t\tmargin-top: 25px;\n\t\tpadding-bottom: 13px;\n\t}\n\n\t.col-right img {\n\t\tmax-width: 100%;\n\t}\n\n\t.col-right > div {\n\t\tpadding-bottom: 13px !important;\n\t}\n\n\t/* > mobile */\n\t@media (min-width: 801px) {\n\t\t.col-left {\n\t\t\tfloat: left;\n\t\t\twidth: 46%;\n\t\t\tmargin-right: 2%;\n\t\t}\n\n\t\t.col-right {\n\t\t\tfloat: right;\n\t\t\twidth: 50%;\n\t\t\tmargin-top: 0;\n\t\t}\n\t}\n\n\t/* tablet */\n\t@media (min-width: 801px) and (max-width: 1265px) {\n\t\t.col-left {\n\t\t\twidth: 100%;\n\t\t\tmargin-bottom: 0;\n\t\t}\n\n\t\t.col-right {\n\t\t\twidth: 100%;\n\t\t\tmargin-top: 25px;\n\t\t}\n\t}\n"}}]);