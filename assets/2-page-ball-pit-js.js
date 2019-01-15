(window.webpackJsonp=window.webpackJsonp||[]).push([[5,4,12],{37:function(t,e,i){"use strict";i.r(e),i.d(e,"baseStyles",function(){return s});var a=i(47);const s=a["b"]`
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
`},38:function(t,e,i){"use strict";i.r(e),i.d(e,"pageStyles",function(){return s});var a=i(47);const s=a["b"]`
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
`},45:function(t,e,i){"use strict";i.r(e);var a=i(47),s=i(37),l=i(38),o=i(48),n=i(28);var r=class{constructor(t){this.doc=t,this.boundOnRoute=(t=>this.destroy(t.detail)),addEventListener("route",this.boundOnRoute,{passive:!0}),this.canvas=t.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.radius=16.5,this.balls=[],this.canvas.width=o.a.getMainWidth/1.5,this.canvas.height=this.canvas.width/2,this.boundOnNumBalls=(t=>this.onNumBalls(t.target.value)),this.boundOnSizeBalls=(t=>this.onSizeBalls(t.target.value)),this.boundOnSpeedBalls=(t=>this.onSpeedBalls(t.target.value)),t.querySelector(".numBalls").addEventListener("input",this.boundOnNumBalls),t.querySelector(".sizeBalls").addEventListener("input",this.boundOnSizeBalls),t.querySelector(".speedBalls").addEventListener("input",this.boundOnSpeedBalls);for(let t=0;t<20;++t)this.balls.push({x:Math.floor(Math.random()*(this.canvas.width+1)),y:Math.floor(Math.random()*(this.canvas.height+1)),velocity:{x:Math.floor(-3*Math.random()),y:Math.floor(7*Math.random())-3},color:this.getRandomColor()});this.runSim()}destroy(t){if("playground/ball-pit"===t)return;removeEventListener("route",this.boundOnRoute,{passive:!0}),cancelAnimationFrame(this.animLoop);const e=this.doc.querySelector(".numBalls"),i=this.doc.querySelector(".sizeBalls"),a=this.doc.querySelector(".speedBalls");e&&e.removeEventListener("input",this.boundOnNumBalls),i&&i.removeEventListener("input",this.boundOnSizeBalls),a&&a.removeEventListener("input",this.boundOnSpeedBalls),delete window.ballPit}update(){for(let t of this.balls)t.x+=t.velocity.x,t.y+=t.velocity.y,t.x-this.radius<0&&t.velocity.x<0&&(t.velocity.x=-t.velocity.x),t.y>=this.canvas.height-this.radius&&t.velocity.y>0&&(t.velocity.y=-t.velocity.y),t.x>=this.canvas.width-this.radius&&t.velocity.x>0&&(t.velocity.x=-t.velocity.x),t.y-this.radius<0&&t.velocity.y<0&&(t.velocity.y=-t.velocity.y)}render(){this.ctx.fillStyle="#0098ff",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);for(const t of this.balls)this.ctx.fillStyle=t.color,this.ctx.beginPath(),this.ctx.arc(t.x,t.y,this.radius,0,2*Math.PI,!1),this.ctx.fill()}runSim(){this.update(),this.render(),this.animLoop=requestAnimationFrame(()=>this.runSim())}fixArr(t){let e=0,i=this.balls.length-t;if(i>0)for(;e<i;++e)this.balls.pop();else if(i<0)for(i=-i;e<i;++e){let t={x:Math.floor(Math.random()*(this.canvas.width-0+1))+0,y:Math.floor(Math.random()*(this.canvas.height+1)),velocity:{x:Math.floor(5*Math.random())+-2,y:Math.floor(7*Math.random())+-3},color:this.getRandomColor()};0===t.velocity.x&&(t.velocity.x=1),0===t.velocity.y&&(t.velocity.y=1),this.balls.push(t)}}updateUserSpeed(t,e){let i,a;for(let s of this.balls)i=s.velocity.x/t,a=s.velocity.y/t,s.velocity.x=i*e,s.velocity.y=a*e}onNumBalls(t){this.doc.querySelector(".litNumBalls").textContent=t,this.fixArr(t)}onSizeBalls(t){this.doc.querySelector(".litSizeBalls").textContent=t,this.radius=t}onSpeedBalls(t){this.updateUserSpeed(this.doc.querySelector(".litSpeedBalls").textContent,t),this.doc.querySelector(".litSpeedBalls").textContent=t}getRandomColor(){let t="#";for(let e=0;e<6;++e)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}};customElements.define("page-ball-pit",class extends a.a{constructor(){super(),document.title="Ball Pit | Playground",o.a.addMeta("description","A canvas example showcasing a ball pit."),o.a.addMeta("keywords","canvas, html5")}firstUpdated(){n.a.openNav(),window.ballPit=new r(this.shadowRoot)}render(){return a["b"]`
			<style>
				${s.baseStyles}
				${l.pageStyles}

				.range-inputs > div {
					margin: 0 0 30px;
				}

				.range-inputs label {
					display: block;
					margin-bottom: 5px;
				}

				.range-inputs input {
					cursor: ew-resize;
				}

				.range-inputs input:focus {
					box-shadow: none;
					outline-color: transparent;
				}

				canvas {
					margin: 20px 0;
				}
			</style>

			<div class="card">
				<h2>Ball Pit</h2>
				<p>A Javascript and HTML<sub>5</sub> canvas example with balls colliding into the edges of a box.</p>
			</div>

			<div class="ball-pit">
				<canvas class="card-light"></canvas>

				<div class="range-inputs">
					<div>
						<label>Number of Balls: <span class="litNumBalls">20</span></label>
						<input type="range" value="20" min="1" class="numBalls">
					</div>
					<div>
						<label>Size of Balls (radius): <span class="litSizeBalls">16.5</span></label>
						<input type="range" value="16.5" min="3" step="0.5" max="40" class="sizeBalls">
					</div>
					<div>
						<label>Speed of Balls: <span class="litSpeedBalls">1</span></label>
						<input type="range" value="1" min="0.05" step="0.05" max="2.5" class="speedBalls">
					</div>
				</div>
			</div>
        `}})},48:function(t,e,i){"use strict";class a{static require(t){return new Promise((e,i)=>{if(a.constructor._jsSrc.includes(t))e();else{let s=document.createElement("script");s.src=t,s.async=1,document.head.appendChild(s),s.onload=(()=>{a.constructor._jsSrc.push(t),e()}),s.onerror=(()=>i())}})}static addMeta(t,e){let i=document.createElement("meta");i.setAttribute("name",t),i.setAttribute("content",e),document.head.appendChild(i)}static get getMainWidth(){const t=document.querySelector("main"),e=window.getComputedStyle(t,null),i=parseFloat(e.getPropertyValue("padding-left"));return t.getBoundingClientRect().width-i}}a.constructor._jsSrc=[],e.a=a}}]);