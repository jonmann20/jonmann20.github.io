"use strict";class StarryBg{constructor(){this.boundOnRoute=(t=>this.destroy(t.detail)),addEventListener("route",this.boundOnRoute,!!pListen&&{passive:!0});const t=document.querySelector("input[type=radio]:checked").value;this.initStar(t);let e=Array.from(document.querySelectorAll("input[type=radio]"));var i=!0,s=!1,o=void 0;try{for(var r,n=e[Symbol.iterator]();!(i=(r=n.next()).done);i=!0)r.value.addEventListener("click",t=>this.onColorChange(t.target.value))}catch(t){s=!0,o=t}finally{try{!i&&n.return&&n.return()}finally{if(s)throw o}}}destroy(t){if("#playground/starry-background"===t)return;removeEventListener("route",this.boundOnRoute,!!pListen&&{passive:!0}),cancelAnimationFrame(this.animLoop),this.starBg.destroy();let e=Array.from(document.querySelectorAll("input[type=radio]"));var i=!0,s=!1,o=void 0;try{for(var r,n=e[Symbol.iterator]();!(i=(r=n.next()).done);i=!0)r.value.removeEventListener("click",t=>this.onColorChange(t.target.value))}catch(t){s=!0,o=t}finally{try{!i&&n.return&&n.return()}finally{if(s)throw o}}delete window.starryBg}initStar(t){this.starBg=new StarBg({elt:document.getElementById("starry-canvas"),window_width:util.getMainWidth(),window_height:400,star_color:t,star_count:1300,star_depth:330,container:"starry-canvas"})}onColorChange(t){this.starBg.destroy(),delete this.starBg,this.initStar(t)}}class StarBg{constructor(t){this.windowBg="#000",this.starColor=t.star_color,this.fov=t.star_depth,this.SCREEN_WIDTH=t.window_width,this.SCREEN_HEIGHT=t.window_height,this.HALF_WIDTH=this.SCREEN_WIDTH/2,this.HALF_HEIGHT=this.SCREEN_HEIGHT/2,this.mouseX=0,this.mouseY=0,this.numPoints=t.star_count,this.points=[],this.elt=t.elt,this.ctx=this.elt.getContext("2d"),this.elt.setAttribute("width",this.SCREEN_WIDTH),this.elt.setAttribute("height",this.SCREEN_HEIGHT),this.boundOnMouseMove=(t=>this.onMouseMove(t)),document.addEventListener("mousemove",this.boundOnMouseMove),this.initPoints(),this.loop()}destroy(){cancelAnimationFrame(this.animLoop),document.removeEventListener("mousemove",this.boundOnMouseMove)}onMouseMove(t){this.mouseX=t.pageX-this.HALF_WIDTH,this.mouseY=t.pageY-this.HALF_HEIGHT}initPoints(){let t;for(let e=0;e<this.numPoints;++e)t=[400*Math.random()-200,400*Math.random()-200,400*Math.random()-200],this.points.push(t)}loop(){this.render(),this.animLoop=requestAnimationFrame(()=>this.loop())}render(){this.ctx.fillStyle=this.windowBg,this.ctx.fillRect(0,0,this.SCREEN_WIDTH,this.SCREEN_HEIGHT);for(let t=0;t<this.numPoints;++t){let e=this.points[t],i=e[2];(i-=1.08)<-this.fov&&(i+=400),e[2]=i,this.draw3Din2D(e)}}draw3Din2D(t){const e=t[0],i=t[1],s=t[2],o=this.fov/(this.fov+s),r=e*o+this.HALF_WIDTH-this.mouseX/3,n=i*o+this.HALF_HEIGHT-this.mouseY/3;this.ctx.lineWidth=o,this.ctx.strokeStyle=this.starColor,this.ctx.beginPath(),this.ctx.moveTo(r,n),this.ctx.lineTo(r+o,n),this.ctx.stroke()}}