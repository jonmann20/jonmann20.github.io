"use strict";function GameEngine(){let e=document.createElement("a");e.href="/#games",e.innerText="Back",e.className="btnBack",document.body.appendChild(e);let t=document.createElement("div");t.className="canvasWrap",window.canvas=document.createElement("canvas"),canvas.setAttribute("width",1008),canvas.setAttribute("height",567),t.appendChild(canvas),document.body.appendChild(t),window.ctx=canvas.getContext("2d"),this.input=new GameInput(this),this.graphics=new GameGraphics(this),this.utils=new GameUtils(this),this.view=new GameView(this),this.init()}function GameInput(){this.keysDown={},this.lastKeyUp=KeyCode.EMPTY,this.lastKeyDown=KeyCode.EMPTY,this.init()}function GameUtils(e){return{switchView:function(t){t.init(),e.view=t}}}function GameView(e){this.privates={bgColor:"#ccc"},this.init()}function TitleView(e){this.privates={title:e},this.init()}function GameSaveView(){this.privates={},this.init()}function LevelView(e,t){this.privates={},this.player=e,this.curLvl=t,this.init()}function Level1(){this.init()}function Vamp(){this.init()}GameEngine.prototype=function(){function e(){i.view.update(),s&&i.onUpdate()}function t(){o=requestAnimationFrame(t),i.view.render(),r&&i.onRender()}let i,n,o,s=!1,r=!1;return{init:function(){i=this},onUpdate:function(e){s=!0,this.onUpdate=e},onRender:function(e){r=!0,this.onRender=e},start:()=>{n=setInterval(e,1e3/60),o=requestAnimationFrame(t)},stop:()=>{clearInterval(n),cancelAnimationFrame(o)}}}();class GameSave{load(e){return localStorage[`slot ${e}`]}getList(){var e=this.load(0),t=this.load(1),i=this.load(2);return[void 0!==e?e:"---",void 0!==t?t:"---",void 0!==i?i:"---"]}save(e,t){localStorage[`slot ${e}`]=t}erase(e){return localStorage.removeItem(`slot ${e}`),this.getList()}}GameInput.prototype=function(){function e(e){return e===KeyCode.W?e=KeyCode.UP:e===KeyCode.S?e=KeyCode.DOWN:e===KeyCode.D?e=KeyCode.RIGHT:e===KeyCode.A&&(e=KeyCode.LEFT),e}let t;return addEventListener("keydown",function(i){let n=e(i.keyCode);t.keysDown[n]||(t.lastKeyDown=n,t.keysDown[n]=!0)}),addEventListener("keyup",function(i){t.lastKeyUp=e(i.keyCode),delete t.keysDown[t.lastKeyUp]}),{init:function(){t=this},update:function(){}}}();var KeyCode=Object.freeze({EMPTY:-1,ENTER:13,CTRL:17,ESC:27,SPACEBAR:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46,A:65,D:68,F:70,H:72,J:74,K:75,M:77,O:79,R:82,S:83,W:87});let KeyCodeNames={};KeyCodeNames[-1]="EMPTY",KeyCodeNames[13]="ENTER",KeyCodeNames[17]="CTRL",KeyCodeNames[27]="ESC",KeyCodeNames[32]="SPACEBAR",KeyCodeNames[37]="LEFT",KeyCodeNames[38]="UP",KeyCodeNames[39]="RIGHT",KeyCodeNames[40]="DOWN",KeyCodeNames[46]="DELETE",KeyCodeNames[65]="A",KeyCodeNames[68]="D",KeyCodeNames[70]="F",KeyCodeNames[72]="H",KeyCodeNames[74]="J",KeyCodeNames[75]="K",KeyCodeNames[77]="M",KeyCodeNames[79]="O",KeyCodeNames[82]="R",KeyCodeNames[83]="S",KeyCodeNames[87]="W";var Dir=Object.freeze({RIGHT:0,LEFT:1});!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.SAT=t()}(this,function(){function e(e,t){this.x=e||0,this.y=t||0}function t(t,i){this.pos=t||new e,this.points=i||[],this.recalc()}function i(t,i,n){this.pos=t||new e,this.w=i||0,this.h=n||0}function n(){this.a=null,this.b=null,this.overlapN=new e,this.overlapV=new e,this.clear()}function o(e,t,i){for(var n=Number.MAX_VALUE,o=-Number.MAX_VALUE,s=e.length,r=0;r<s;r++){var a=e[r].dot(t);a<n&&(n=a),a>o&&(o=a)}i[0]=n,i[1]=o}function s(e,t,i,n,s,r){var a=h.pop(),p=h.pop(),c=l.pop().copy(t).sub(e),u=c.dot(s);if(o(i,s,a),o(n,s,p),p[0]+=u,p[1]+=u,a[0]>p[1]||p[0]>a[1])return l.push(c),h.push(a),h.push(p),!0;if(r){var y=0;if(a[0]<p[0])r.aInB=!1,a[1]<p[1]?(y=a[1]-p[0],r.bInA=!1):y=(f=a[1]-p[0])<(d=p[1]-a[0])?f:-d;else if(r.bInA=!1,a[1]>p[1])y=a[0]-p[1],r.aInB=!1;else{var f=a[1]-p[0],d=p[1]-a[0];y=f<d?f:-d}var v=Math.abs(y);v<r.overlap&&(r.overlap=v,r.overlapN.copy(s),y<0&&r.overlapN.reverse())}return l.push(c),h.push(a),h.push(p),!1}function r(e,t){var i=e.len2(),n=t.dot(e);return n<0?u:n>i?f:y}function a(e,t,i){for(var n=l.pop().copy(t.pos).sub(e.pos),o=t.r,s=o*o,a=e.points,p=a.length,c=l.pop(),h=l.pop(),y=0;y<p;y++){var d=y===p-1?0:y+1,v=0===y?p-1:y-1,m=0,w=null;c.copy(e.edges[y]),h.copy(n).sub(a[y]),i&&h.len2()>s&&(i.aInB=!1);var x=r(c,h);if(x===u){c.copy(e.edges[v]);var g=l.pop().copy(n).sub(a[v]);if((x=r(c,g))===f){if((K=h.len())>o)return l.push(n),l.push(c),l.push(h),l.push(g),!1;i&&(i.bInA=!1,w=h.normalize(),m=o-K)}l.push(g)}else if(x===f){if(c.copy(e.edges[d]),h.copy(n).sub(a[d]),(x=r(c,h))===u){if((K=h.len())>o)return l.push(n),l.push(c),l.push(h),!1;i&&(i.bInA=!1,w=h.normalize(),m=o-K)}}else{var C=c.perp().normalize(),K=h.dot(C),T=Math.abs(K);if(K>0&&T>o)return l.push(n),l.push(C),l.push(h),!1;i&&(w=C,m=o-K,(K>=0||m<2*o)&&(i.bInA=!1))}w&&i&&Math.abs(m)<Math.abs(i.overlap)&&(i.overlap=m,i.overlapN.copy(w))}return i&&(i.a=e,i.b=t,i.overlapV.copy(i.overlapN).scale(i.overlap)),l.push(n),l.push(c),l.push(h),!0}var p={};p.Vector=e,p.V=e,e.prototype.copy=e.prototype.copy=function(e){return this.x=e.x,this.y=e.y,this},e.prototype.perp=e.prototype.perp=function(){var e=this.x;return this.x=this.y,this.y=-e,this},e.prototype.rotate=e.prototype.rotate=function(e){var t=this.x,i=this.y;return this.x=t*Math.cos(e)-i*Math.sin(e),this.y=t*Math.sin(e)+i*Math.cos(e),this},e.prototype.reverse=e.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},e.prototype.normalize=e.prototype.normalize=function(){var e=this.len();return e>0&&(this.x=this.x/e,this.y=this.y/e),this},e.prototype.add=e.prototype.add=function(e){return this.x+=e.x,this.y+=e.y,this},e.prototype.sub=e.prototype.sub=function(e){return this.x-=e.x,this.y-=e.y,this},e.prototype.scale=e.prototype.scale=function(e,t){return this.x*=e,this.y*=t||e,this},e.prototype.project=e.prototype.project=function(e){var t=this.dot(e)/e.len2();return this.x=t*e.x,this.y=t*e.y,this},e.prototype.projectN=e.prototype.projectN=function(e){var t=this.dot(e);return this.x=t*e.x,this.y=t*e.y,this},e.prototype.reflect=e.prototype.reflect=function(e){var t=this.x,i=this.y;return this.project(e).scale(2),this.x-=t,this.y-=i,this},e.prototype.reflectN=e.prototype.reflectN=function(e){var t=this.x,i=this.y;return this.projectN(e).scale(2),this.x-=t,this.y-=i,this},e.prototype.dot=e.prototype.dot=function(e){return this.x*e.x+this.y*e.y},e.prototype.len2=e.prototype.len2=function(){return this.dot(this)},e.prototype.len=e.prototype.len=function(){return Math.sqrt(this.len2())},p.Circle=function(t,i){this.pos=t||new e,this.r=i||0},p.Polygon=t,t.prototype.recalc=t.prototype.recalc=function(){this.edges=[],this.normals=[];for(var t=this.points,i=t.length,n=0;n<i;n++){var o=t[n],s=n<i-1?t[n+1]:t[0],r=(new e).copy(s).sub(o),a=(new e).copy(r).perp().normalize();this.edges.push(r),this.normals.push(a)}return this},t.prototype.rotate=t.prototype.rotate=function(e){var t,i=this.points,n=this.edges,o=this.normals,s=i.length;for(t=0;t<s;t++)i[t].rotate(e),n[t].rotate(e),o[t].rotate(e);return this},t.prototype.translate=t.prototype.translate=function(e,t){var i,n=this.points,o=n.length;for(i=0;i<o;i++)n[i].x+=e,n[i].y+=t;return this},p.Box=i,i.prototype.toPolygon=i.prototype.toPolygon=function(){var i=this.pos,n=this.w,o=this.h;return new t(new e(i.x,i.y),[new e,new e(n,0),new e(n,o),new e(0,o)])},p.Response=n,n.prototype.clear=n.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var l=[],c=0;c<10;c++)l.push(new e);for(var h=[],c=0;c<5;c++)h.push([]);var u=-1,y=0,f=1;return p.testCircleCircle=function(e,t,i){var n=l.pop().copy(t.pos).sub(e.pos),o=e.r+t.r,s=o*o,r=n.len2();if(r>s)return l.push(n),!1;if(i){var a=Math.sqrt(r);i.a=e,i.b=t,i.overlap=o-a,i.overlapN.copy(n.normalize()),i.overlapV.copy(n).scale(i.overlap),i.aInB=e.r<=t.r&&a<=t.r-e.r,i.bInA=t.r<=e.r&&a<=e.r-t.r}return l.push(n),!0},p.testPolygonCircle=a,p.testCirclePolygon=function(e,t,i){var n=a(t,e,i);if(n&&i){var o=i.a,s=i.aInB;i.overlapN.reverse(),i.overlapV.reverse(),i.a=i.b,i.b=o,i.aInB=i.bInA,i.bInA=s}return n},p.testPolygonPolygon=function(e,t,i){for(var n=e.points,o=n.length,r=t.points,a=r.length,p=0;p<o;p++)if(s(e.pos,t.pos,n,r,e.normals[p],i))return!1;for(p=0;p<a;p++)if(s(e.pos,t.pos,n,r,t.normals[p],i))return!1;return i&&(i.a=e,i.b=t,i.overlapV.copy(i.overlapN).scale(i.overlap)),!0},p});var GameGraphics=function(e){return{isAnimating:!1,repeatAction:function(e,t,i){this.isAnimating=!0;var n=0,o=this,s=setInterval(function(){n++>t?(clearInterval(s),o.isAnimating=!1):i()},e)}}};GameView.prototype={then:function(e){this.privates.callback=e},init:function(){},update:function(){},render:function(){ctx.fillStyle=this.privates.bgColor,ctx.fillRect(0,0,canvas.width,canvas.height)}},TitleView.prototype=function(){let e,t="Press Enter";return{then:function(e){this.privates.callback=e},init:function(){e=this.privates.title},update:function(){game.input.lastKeyDown===KeyCode.ENTER&&(game.input.lastKeyDown=KeyCode.EMPTY,this.privates.callback())},render:()=>{ctx.fillStyle="#000",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.font="36px Arial",ctx.fillStyle="#fff",ctx.fillText(e,canvas.width/2-ctx.measureText(e).width/2,100),ctx.font="24px Arial",ctx.fillText(t,canvas.width/2-ctx.measureText(t).width/2,canvas.height/2)}}}(),GameSaveView.prototype=function(){var e,t,i="Select a save slot",n=new GameSave,o=n.getList();return{then:function(e){this.privates.callback=e},init:function(){e=this,t={img:">>",slot:0,x:canvas.width/2-ctx.measureText(o[0]).width/2-60,y:200}},update:function(){if(game.input.lastKeyDown===KeyCode.ESC)game.input.lastKeyDown=KeyCode.EMPTY,this.privates.callback(KeyCode.ESC);else if(game.input.lastKeyDown===KeyCode.ENTER){game.input.lastKeyDown=KeyCode.EMPTY;var e=new Date,i=e.getMonth(),s=e.getDay(),r=e.getYear(),a=e.toLocaleTimeString();n.save(t.slot,i+"/"+s+"/"+r+" "+a),this.privates.callback(KeyCode.ENTER)}else game.input.lastKeyDown===KeyCode.DELETE?(game.input.lastKeyDownp=KeyCode.EMPTY,o=n.erase(t.slot)):2!==t.slot&&game.input.lastKeyDown===KeyCode.DOWN?(game.input.lastKeyDown=KeyCode.EMPTY,++t.slot,t.x=canvas.width/2-ctx.measureText(o[t.slot]).width/2-60,t.y+=80):0!==t.slot&&game.input.lastKeyDown===KeyCode.UP&&(game.input.lastKeyDown=KeyCode.EMPTY,--t.slot,t.x=canvas.width/2-ctx.measureText(o[t.slot]).width/2-60,t.y-=80)},render:function(){ctx.fillStyle="#111",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.font="36px Arial",ctx.fillStyle="#fff",ctx.fillText(i,canvas.width/2-ctx.measureText(i).width/2,80),ctx.font="24px Arial";for(var e=0;e<o.length;++e)ctx.fillText(o[e],canvas.width/2-ctx.measureText(o[e]).width/2,200+80*e);ctx.fillText(t.img,t.x,t.y)}}}(),LevelView.prototype=function(){function e(){if(t.player.invincible)0==t.player.invincibleTimer--&&(t.player.invincible=!1,t.player.invincibleTimer=120);else for(var e=0;e<t.curLvl.projectiles.length;++e)if(SAT.testPolygonPolygon(t.player,t.curLvl.projectiles[e])){--t.player.hp,t.player.invincible=!0;break}}var t,i=!1,n=!1;return{then:function(e){this.privates.callback=e},init:function(){t=this},update:function(){this.curLvl.update(),this.player.update(),e()},onUpdate:function(e){i=!0,this.onUpdate=e},render:function(){this.curLvl.render(),this.player.render()},onRender:function(e){n=!0,this.onRender=e}}}(),Level1.prototype={projectiles:[],init:function(){for(var e=0;e<10;++e){var t=new SAT.Box(new SAT.Vector(Math.floor(Math.random()*canvas.width+0),canvas.height),10,20).toPolygon();t.speed=.1*Math.floor(10*Math.random()+3),this.projectiles.push(t)}},update:function(){for(var e=0;e<this.projectiles.length;++e)this.projectiles[e].pos.y-=this.projectiles[e].speed},render:function(){ctx.fillStyle="#000",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.fillStyle="silver";for(var e=0;e<this.projectiles.length;++e)ctx.fillRect(this.projectiles[e].pos.x,this.projectiles[e].pos.y,10,20)}},Vamp.prototype=function(){var e=new Image,t=!1;e.onload=function(){t=!0},e.src="img/vamp.png";return{w:40,h:40,hp:3,invincible:!1,invincibleTimer:120,init:function(){$.extend(this,new SAT.Box(new SAT.Vector(0,0),this.w,this.h).toPolygon())},update:function(){game.input.keysDown[KeyCode.RIGHT]?this.pos.x+=4:game.input.keysDown[KeyCode.LEFT]&&(this.pos.x-=4),game.input.keysDown[KeyCode.UP]?this.pos.y-=4:game.input.keysDown[KeyCode.DOWN]&&(this.pos.y+=4),this.hp<=0&&(alert("You died"),location.reload())},render:function(){var e=!0;if(this.invincible){var t=this.invincibleTimer%30;t>=0&&t<15&&(e=!1)}e&&(ctx.fillStyle="yellow",ctx.fillRect(this.pos.x,this.pos.y,this.w,this.h)),ctx.fillStyle="red";for(var i=0;i<this.hp;++i)ctx.fillRect(this.pos.x-10+20*i,this.pos.y-20,20,10)}}}(),function(){window.game=new GameEngine,game.start();let e=new TitleView("Vamp: The Great and Powerful",!0);e.then(()=>{game.utils.switchView(t)});let t=new GameSaveView;t.then(t=>{t===KeyCode.ESC?game.utils.switchView(e):t===KeyCode.ENTER&&game.utils.switchView(i)});let i=new LevelView(new Vamp,new Level1);game.view=e}();