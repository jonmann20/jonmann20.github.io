"use strict";class BallPit{constructor(){this.boundOnRoute=(t=>this.destroy(t.detail)),addEventListener("route",this.boundOnRoute,!!pListen&&{passive:!0}),this.canvas=document.querySelector("canvas"),this.ctx=this.canvas.getContext("2d"),this.radius=16.5,this.balls=[],this.canvas.width=Util.getMainWidth/1.5,this.canvas.height=this.canvas.width/2,this.boundOnNumBalls=(t=>this.onNumBalls(t.target.value)),this.boundOnSizeBalls=(t=>this.onSizeBalls(t.target.value)),this.boundOnSpeedBalls=(t=>this.onSpeedBalls(t.target.value)),document.querySelector(".numBalls").addEventListener("input",this.boundOnNumBalls),document.querySelector(".sizeBalls").addEventListener("input",this.boundOnSizeBalls),document.querySelector(".speedBalls").addEventListener("input",this.boundOnSpeedBalls);for(let t=0;t<20;++t)this.balls.push({x:Math.floor(Math.random()*(this.canvas.width+1)),y:Math.floor(Math.random()*(this.canvas.height+1)),velocity:{x:Math.floor(-3*Math.random()),y:Math.floor(7*Math.random())-3},color:this.getRandomColor()});this.runSim()}destroy(t){if("#playground/ball-pit"===t)return;removeEventListener("route",this.boundOnRoute,!!pListen&&{passive:!0}),cancelAnimationFrame(this.animLoop);const e=document.querySelector(".numBalls"),i=document.querySelector(".sizeBalls"),l=document.querySelector(".speedBalls");e&&e.removeEventListener("input",this.boundOnNumBalls),i&&i.removeEventListener("input",this.boundOnSizeBalls),l&&l.removeEventListener("input",this.boundOnSpeedBalls),delete window.ballPit}update(){var t=!0,e=!1,i=void 0;try{for(var l,o=this.balls[Symbol.iterator]();!(t=(l=o.next()).done);t=!0){let t=l.value;t.x+=t.velocity.x,t.y+=t.velocity.y,t.x-this.radius<0&&t.velocity.x<0&&(t.velocity.x=-t.velocity.x),t.y>=this.canvas.height-this.radius&&t.velocity.y>0&&(t.velocity.y=-t.velocity.y),t.x>=this.canvas.width-this.radius&&t.velocity.x>0&&(t.velocity.x=-t.velocity.x),t.y-this.radius<0&&t.velocity.y<0&&(t.velocity.y=-t.velocity.y)}}catch(t){e=!0,i=t}finally{try{!t&&o.return&&o.return()}finally{if(e)throw i}}}render(){this.ctx.fillStyle="#0098ff",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);var t=!0,e=!1,i=void 0;try{for(var l,o=this.balls[Symbol.iterator]();!(t=(l=o.next()).done);t=!0){const t=l.value;this.ctx.fillStyle=t.color,this.ctx.beginPath(),this.ctx.arc(t.x,t.y,this.radius,0,2*Math.PI,!1),this.ctx.fill()}}catch(t){e=!0,i=t}finally{try{!t&&o.return&&o.return()}finally{if(e)throw i}}}runSim(){this.update(),this.render(),this.animLoop=requestAnimationFrame(()=>this.runSim())}fixArr(t){let e=0,i=this.balls.length-t;if(i>0)for(;e<i;++e)this.balls.pop();else if(i<0)for(i=-i;e<i;++e){let t={x:Math.floor(Math.random()*(this.canvas.width-0+1))+0,y:Math.floor(Math.random()*(this.canvas.height+1)),velocity:{x:Math.floor(5*Math.random())+-2,y:Math.floor(7*Math.random())+-3},color:this.getRandomColor()};0===t.velocity.x&&(t.velocity.x=1),0===t.velocity.y&&(t.velocity.y=1),this.balls.push(t)}}updateUserSpeed(t,e){let i,l;var o=!0,a=!1,s=void 0;try{for(var n,r=this.balls[Symbol.iterator]();!(o=(n=r.next()).done);o=!0){let o=n.value;i=o.velocity.x/t,l=o.velocity.y/t,o.velocity.x=i*e,o.velocity.y=l*e}}catch(t){a=!0,s=t}finally{try{!o&&r.return&&r.return()}finally{if(a)throw s}}}onNumBalls(t){document.querySelector(".litNumBalls").textContent=t,this.fixArr(t)}onSizeBalls(t){document.querySelector(".litSizeBalls").textContent=t,this.radius=t}onSpeedBalls(t){this.updateUserSpeed(document.querySelector(".litSpeedBalls").textContent,t),document.querySelector(".litSpeedBalls").textContent=t}getRandomColor(){let t="#";for(let e=0;e<6;++e)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}}