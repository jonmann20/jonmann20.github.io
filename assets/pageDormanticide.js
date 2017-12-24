"use strict";class GameEngine{constructor(){this.update=this.update.bind(this),this.render=this.render.bind(this),this.updateInterval=setInterval(this.update,1e3/60),this.renderRAF=requestAnimationFrame(this.render),this.onUpdateSet=!1,this.onRenderSet=!1;let t=document.createElement("a");t.href="/#games",t.innerText="Back",t.className="btn-back",document.body.appendChild(t);let e=document.createElement("div");e.className="canvas-wrap",window.canvas=document.createElement("canvas"),canvas.setAttribute("width",1008),canvas.setAttribute("height",567),e.appendChild(canvas),document.body.appendChild(e),window.ctx=canvas.getContext("2d"),this.input=new GameInput,this.graphics=new GameGraphics,this.view=new GameView,this.utils=new GameUtils(this)}update(){this.view.update(),this.onUpdateSet&&this.onUpdate()}render(){this.renderRAF=requestAnimationFrame(this.render),this.view.render(),this.onRenderSet&&this.onRender()}onUpdate(t){this.onUpdateSet=!0,this.onUpdate=t}onRender(t){this.onRenderSet=!0,this.onRender=t}stop(){clearInterval(this.updateInterval),cancelAnimationFrame(this.renderRAF)}}class GameSave{load(t){return localStorage[`slot ${t}`]}getList(){const t=this.load(0),e=this.load(1),i=this.load(2);return[void 0!==t?t:"---",void 0!==e?e:"---",void 0!==i?i:"---"]}save(t,e){localStorage[`slot ${t}`]=e}erase(t){return localStorage.removeItem(`slot ${t}`),this.getList()}}const KeyCode={EMPTY:-1,ENTER:13,CTRL:17,ESC:27,SPACEBAR:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46,A:65,D:68,F:70,H:72,J:74,K:75,M:77,O:79,R:82,S:83,W:87};let KeyCodeNames={};KeyCodeNames[-1]="EMPTY",KeyCodeNames[13]="ENTER",KeyCodeNames[17]="CTRL",KeyCodeNames[27]="ESC",KeyCodeNames[32]="SPACEBAR",KeyCodeNames[37]="LEFT",KeyCodeNames[38]="UP",KeyCodeNames[39]="RIGHT",KeyCodeNames[40]="DOWN",KeyCodeNames[46]="DELETE",KeyCodeNames[65]="A",KeyCodeNames[68]="D",KeyCodeNames[70]="F",KeyCodeNames[72]="H",KeyCodeNames[74]="J",KeyCodeNames[75]="K",KeyCodeNames[77]="M",KeyCodeNames[79]="O",KeyCodeNames[82]="R",KeyCodeNames[83]="S",KeyCodeNames[87]="W";class GameInput{constructor(){this.keysDown={},this.lastKeyDown=KeyCode.EMPTY;let t=KeyCode.EMPTY;addEventListener("keydown",t=>{const e=this.fixKey(t.keyCode);this.keysDown[e]||(this.lastKeyDown=e,this.keysDown[e]=!0)}),addEventListener("keyup",e=>{t=this.fixKey(e.keyCode),delete this.keysDown[t]})}fixKey(t){return t===KeyCode.W?t=KeyCode.UP:t===KeyCode.S?t=KeyCode.DOWN:t===KeyCode.D?t=KeyCode.RIGHT:t===KeyCode.A&&(t=KeyCode.LEFT),t}}class GameUtils{constructor(t){this.gEngine=t}switchView(t){t.init(),this.gEngine.view=t}}const Dir={RIGHT:0,LEFT:1};!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.SAT=e()}(this,function(){function t(t,e){this.x=t||0,this.y=e||0}function e(e,i){this.pos=e||new t,this.r=i||0}function i(e,i){this.pos=e||new t,this.angle=0,this.offset=new t,this.setPoints(i||[])}function s(e,i,s){this.pos=e||new t,this.w=i||0,this.h=s||0}function o(){this.a=null,this.b=null,this.overlapN=new t,this.overlapV=new t,this.clear()}function r(t,e,i){for(var s=Number.MAX_VALUE,o=-Number.MAX_VALUE,r=t.length,a=0;a<r;a++){var n=t[a].dot(e);n<s&&(s=n),n>o&&(o=n)}i[0]=s,i[1]=o}function a(t,e,i,s,o,a){var n=d.pop(),h=d.pop(),l=p.pop().copy(e).sub(t),c=l.dot(o);if(r(i,o,n),r(s,o,h),h[0]+=c,h[1]+=c,n[0]>h[1]||h[0]>n[1])return p.push(l),d.push(n),d.push(h),!0;if(a){var y=0;if(n[0]<h[0])if(a.aInB=!1,n[1]<h[1])y=n[1]-h[0],a.bInA=!1;else{y=(u=n[1]-h[0])<(w=h[1]-n[0])?u:-w}else if(a.bInA=!1,n[1]>h[1])y=n[0]-h[1],a.aInB=!1;else{var u,w;y=(u=n[1]-h[0])<(w=h[1]-n[0])?u:-w}var m=Math.abs(y);m<a.overlap&&(a.overlap=m,a.overlapN.copy(o),y<0&&a.overlapN.reverse())}return p.push(l),d.push(n),d.push(h),!1}function n(t,e){var i=t.len2(),s=e.dot(t);return s<0?m:s>i?x:f}function h(t,e,i){for(var s=p.pop().copy(e.pos).sub(t.pos),o=e.r,r=o*o,a=t.calcPoints,h=a.length,l=p.pop(),c=p.pop(),y=0;y<h;y++){var d=y===h-1?0:y+1,u=0===y?h-1:y-1,w=0,f=null;l.copy(t.edges[y]),c.copy(s).sub(a[y]),i&&c.len2()>r&&(i.aInB=!1);var v=n(l,c);if(v===m){l.copy(t.edges[u]);var g=p.pop().copy(s).sub(a[u]);if((v=n(l,g))===x){if((A=c.len())>o)return p.push(s),p.push(l),p.push(c),p.push(g),!1;i&&(i.bInA=!1,f=c.normalize(),w=o-A)}p.push(g)}else if(v===x){if(l.copy(t.edges[d]),c.copy(s).sub(a[d]),(v=n(l,c))===m){if((A=c.len())>o)return p.push(s),p.push(l),p.push(c),!1;i&&(i.bInA=!1,f=c.normalize(),w=o-A)}}else{var _=l.perp().normalize(),A=c.dot(_),K=Math.abs(A);if(A>0&&K>o)return p.push(s),p.push(_),p.push(c),!1;i&&(f=_,w=o-A,(A>=0||w<2*o)&&(i.bInA=!1))}f&&i&&Math.abs(w)<Math.abs(i.overlap)&&(i.overlap=w,i.overlapN.copy(f))}return i&&(i.a=t,i.b=e,i.overlapV.copy(i.overlapN).scale(i.overlap)),p.push(s),p.push(l),p.push(c),!0}function l(t,e,i){for(var s=t.calcPoints,o=s.length,r=e.calcPoints,n=r.length,h=0;h<o;h++)if(a(t.pos,e.pos,s,r,t.normals[h],i))return!1;for(h=0;h<n;h++)if(a(t.pos,e.pos,s,r,e.normals[h],i))return!1;return i&&(i.a=t,i.b=e,i.overlapV.copy(i.overlapN).scale(i.overlap)),!0}var c={};c.Vector=t,c.V=t,t.prototype.copy=t.prototype.copy=function(t){return this.x=t.x,this.y=t.y,this},t.prototype.clone=t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.perp=t.prototype.perp=function(){var t=this.x;return this.x=this.y,this.y=-t,this},t.prototype.rotate=t.prototype.rotate=function(t){var e=this.x,i=this.y;return this.x=e*Math.cos(t)-i*Math.sin(t),this.y=e*Math.sin(t)+i*Math.cos(t),this},t.prototype.reverse=t.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},t.prototype.normalize=t.prototype.normalize=function(){var t=this.len();return t>0&&(this.x=this.x/t,this.y=this.y/t),this},t.prototype.add=t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},t.prototype.sub=t.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},t.prototype.scale=t.prototype.scale=function(t,e){return this.x*=t,this.y*=e||t,this},t.prototype.project=t.prototype.project=function(t){var e=this.dot(t)/t.len2();return this.x=e*t.x,this.y=e*t.y,this},t.prototype.projectN=t.prototype.projectN=function(t){var e=this.dot(t);return this.x=e*t.x,this.y=e*t.y,this},t.prototype.reflect=t.prototype.reflect=function(t){var e=this.x,i=this.y;return this.project(t).scale(2),this.x-=e,this.y-=i,this},t.prototype.reflectN=t.prototype.reflectN=function(t){var e=this.x,i=this.y;return this.projectN(t).scale(2),this.x-=e,this.y-=i,this},t.prototype.dot=t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.len2=t.prototype.len2=function(){return this.dot(this)},t.prototype.len=t.prototype.len=function(){return Math.sqrt(this.len2())},c.Circle=e,e.prototype.getAABB=e.prototype.getAABB=function(){var e=this.r;return new s(this.pos.clone().sub(new t(e,e)),2*e,2*e).toPolygon()},c.Polygon=i,i.prototype.setPoints=i.prototype.setPoints=function(e){if(!this.points||this.points.length!==e.length){var i,s=this.calcPoints=[],o=this.edges=[],r=this.normals=[];for(i=0;i<e.length;i++)s.push(new t),o.push(new t),r.push(new t)}return this.points=e,this._recalc(),this},i.prototype.setAngle=i.prototype.setAngle=function(t){return this.angle=t,this._recalc(),this},i.prototype.setOffset=i.prototype.setOffset=function(t){return this.offset=t,this._recalc(),this},i.prototype.rotate=i.prototype.rotate=function(t){for(var e=this.points,i=e.length,s=0;s<i;s++)e[s].rotate(t);return this._recalc(),this},i.prototype.translate=i.prototype.translate=function(t,e){for(var i=this.points,s=i.length,o=0;o<s;o++)i[o].x+=t,i[o].y+=e;return this._recalc(),this},i.prototype._recalc=function(){var t,e=this.calcPoints,i=this.edges,s=this.normals,o=this.points,r=this.offset,a=this.angle,n=o.length;for(t=0;t<n;t++){var h=e[t].copy(o[t]);h.x+=r.x,h.y+=r.y,0!==a&&h.rotate(a)}for(t=0;t<n;t++){var l=e[t],c=t<n-1?e[t+1]:e[0],p=i[t].copy(c).sub(l);s[t].copy(p).perp().normalize()}return this},i.prototype.getAABB=i.prototype.getAABB=function(){for(var e=this.calcPoints,i=e.length,o=e[0].x,r=e[0].y,a=e[0].x,n=e[0].y,h=1;h<i;h++){var l=e[h];l.x<o?o=l.x:l.x>a&&(a=l.x),l.y<r?r=l.y:l.y>n&&(n=l.y)}return new s(this.pos.clone().add(new t(o,r)),a-o,n-r).toPolygon()},c.Box=s,s.prototype.toPolygon=s.prototype.toPolygon=function(){var e=this.pos,s=this.w,o=this.h;return new i(new t(e.x,e.y),[new t,new t(s,0),new t(s,o),new t(0,o)])},c.Response=o,o.prototype.clear=o.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var p=[],y=0;y<10;y++)p.push(new t);var d=[];for(y=0;y<5;y++)d.push([]);var u=new o,w=new s(new t,1e-6,1e-6).toPolygon();c.isSeparatingAxis=a;var m=-1,f=0,x=1;return c.pointInCircle=function(t,e){var i=p.pop().copy(t).sub(e.pos),s=e.r*e.r,o=i.len2();return p.push(i),o<=s},c.pointInPolygon=function(t,e){w.pos.copy(t),u.clear();var i=l(w,e,u);return i&&(i=u.aInB),i},c.testCircleCircle=function(t,e,i){var s=p.pop().copy(e.pos).sub(t.pos),o=t.r+e.r,r=o*o,a=s.len2();if(a>r)return p.push(s),!1;if(i){var n=Math.sqrt(a);i.a=t,i.b=e,i.overlap=o-n,i.overlapN.copy(s.normalize()),i.overlapV.copy(s).scale(i.overlap),i.aInB=t.r<=e.r&&n<=e.r-t.r,i.bInA=e.r<=t.r&&n<=t.r-e.r}return p.push(s),!0},c.testPolygonCircle=h,c.testCirclePolygon=function(t,e,i){var s=h(e,t,i);if(s&&i){var o=i.a,r=i.aInB;i.overlapN.reverse(),i.overlapV.reverse(),i.a=i.b,i.b=o,i.aInB=i.bInA,i.bInA=r}return s},c.testPolygonPolygon=l,c});class GameGraphics{constructor(){this.isAnimating=!1}repeatAction(t,e,i){this.isAnimating=!0;let s=0,o=setInterval(()=>{s++>e?(clearInterval(o),this.isAnimating=!1):i()},t)}}class GameView{constructor(){this.privates={bgColor:"#ccc"},this.init()}then(t){this.privates.callback=t}init(){}update(){}render(){ctx.fillStyle=this.privates.bgColor,ctx.fillRect(0,0,canvas.width,canvas.height)}}class TitleView{constructor(t){this.cta="Press Enter",this.privates={title:t},this.init()}then(t){this.privates.callback=t}init(){this.title=this.privates.title}update(){game.input.lastKeyDown===KeyCode.ENTER&&(game.input.lastKeyDown=KeyCode.EMPTY,this.privates.callback())}render(){ctx.fillStyle="#000",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.font="36px Arial",ctx.fillStyle="#fff",ctx.fillText(this.title,canvas.width/2-ctx.measureText(this.title).width/2,100),ctx.font="24px Arial",ctx.fillText(this.cta,canvas.width/2-ctx.measureText(this.cta).width/2,canvas.height/2)}}class GameSaveView{constructor(){this.title="Select a save slot",this.storage=new GameSave,this.list=this.storage.getList(),this.privates={},this.init()}then(t){this.privates.callback=t}init(){this.arrow={img:">>",slot:0,x:canvas.width/2-ctx.measureText(this.list[0]).width/2-60,y:200}}update(){if(game.input.lastKeyDown===KeyCode.ESC)game.input.lastKeyDown=KeyCode.EMPTY,this.privates.callback(KeyCode.ESC);else if(game.input.lastKeyDown===KeyCode.ENTER){game.input.lastKeyDown=KeyCode.EMPTY;const t=new Date,e=t.getMonth()+1,i=t.getDate(),s=t.getFullYear(),o=t.toLocaleTimeString();this.storage.save(this.arrow.slot,`${e}/${i}/${s} ${o}`),this.privates.callback(KeyCode.ENTER)}else game.input.lastKeyDown===KeyCode.DELETE?(game.input.lastKeyDown=KeyCode.EMPTY,this.list=this.storage.erase(this.arrow.slot)):2!==this.arrow.slot&&game.input.lastKeyDown===KeyCode.DOWN?(game.input.lastKeyDown=KeyCode.EMPTY,++this.arrow.slot,this.arrow.x=canvas.width/2-ctx.measureText(this.list[this.arrow.slot]).width/2-60,this.arrow.y+=80):0!==this.arrow.slot&&game.input.lastKeyDown===KeyCode.UP&&(game.input.lastKeyDown=KeyCode.EMPTY,--this.arrow.slot,this.arrow.x=canvas.width/2-ctx.measureText(this.list[this.arrow.slot]).width/2-60,this.arrow.y-=80)}render(){ctx.fillStyle="#111",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.font="36px Arial",ctx.fillStyle="#fff",ctx.fillText(this.title,canvas.width/2-ctx.measureText(this.title).width/2,80),ctx.font="24px Arial";for(let t=0;t<this.list.length;++t)ctx.fillText(this.list[t],canvas.width/2-ctx.measureText(this.list[t]).width/2,200+80*t);ctx.fillText(this.arrow.img,this.arrow.x,this.arrow.y)}}class OverworldView{constructor(){this._arrow={img:"^^"},this.privates={},this.init()}then(t){this.privates.callback=t}init(){this._arrow.x=90,this._arrow.y=canvas.height/2+70,this._arrow.slot=0}update(){game.input.lastKeyDown===KeyCode.ENTER?(game.input.lastKeyDown=KeyCode.EMPTY,this.privates.callback()):game.input.lastKeyDown===KeyCode.RIGHT?(game.input.lastKeyDown=KeyCode.EMPTY,this._arrow.slot<7&&(this._arrow.x+=115,++this._arrow.slot)):game.input.lastKeyDown===KeyCode.LEFT&&(game.input.lastKeyDown=KeyCode.EMPTY,this._arrow.slot>0&&(this._arrow.x-=115,--this._arrow.slot))}render(){ctx.fillStyle="#34282c",ctx.fillRect(0,0,canvas.width,canvas.height);let t,e;for(let i=0;i<8;++i)t=60+115*i,e=canvas.height/2-40,ctx.fillStyle="#fff",ctx.font="18px Arial",ctx.fillText("Level "+(i+1),t+10,e-13),ctx.fillStyle="red",ctx.fillRect(t,e,80,80);ctx.fillStyle="#fff",ctx.fillText(this._arrow.img,this._arrow.x,this._arrow.y)}}class BattleView{constructor(t,e,i){this._arrow={img:">>"},this.privates={bgColor:t,dormantL:e,dormantR:i},this.init()}then(t){this.privates.callback=t}init(){this._arrow.x=43,this._arrow.y=350,this._arrow.curSlot=0,this._left={x:30,dir:Dir.RIGHT},this._fire={x:0,y:0},this._wasAttack=!1,this._wasAttackTimer=60,this._theAttack={name:"EMPTY",atk:0},this._dormantL=this.privates.dormantL,this._dormantR=this.privates.dormantR}_checkInput(){switch(game.input.lastKeyDown){case KeyCode.ENTER:return game.input.lastKeyDown=KeyCode.EMPTY,this._theAttack.name=this._dormantL.actions[this._arrow.curSlot].name,this._theAttack.atk=this._dormantL.atk*this._dormantL.actions[this._arrow.curSlot].multiplier/this._dormantR.def,!0;case KeyCode.UP:game.input.lastKeyDown=KeyCode.EMPTY,0!==this._arrow.curSlot&&null!==this._dormantL.actions[this._arrow.curSlot-1]&&(--this._arrow.curSlot,this._arrow.y-=30);break;case KeyCode.DOWN:game.input.lastKeyDown=KeyCode.EMPTY,3!==this._arrow.curSlot&&null!==this._dormantL.actions[this._arrow.curSlot+1]&&(++this._arrow.curSlot,this._arrow.y+=30)}}update(){if(this._wasAttack&&(this._dormantR.hp-=this._theAttack.atk/60),!game.graphics.isAnimating){this._checkInput()&&(this._theAttack.name===FightAction.TACKLE.name?this._runTackleAnimation():this._theAttack.name===FightAction.DRAGONS_BREATH.name&&(this._wasAttack=!0))}this._dormantR.hp<=0&&(this._dormantL.xp+=25,this.privates.callback())}_runTackleAnimation(){this._left.dir=Dir.RIGHT,game.graphics.repeatAction(6,60,()=>{this._left.dir===Dir.RIGHT&&this._left.x>60&&(this._left.dir=Dir.LEFT),this._left.dir===Dir.RIGHT?++this._left.x:--this._left.x,this._dormantR.hp-=this._theAttack.atk/60})}render(){if(ctx.fillStyle=this.privates.bgColor,ctx.fillRect(0,0,canvas.width,canvas.height),this._drawDormantHUD(this._dormantL,10,15,!0),this._dormantL.draw(this._left.x,90),this._drawHUD(),this._drawDormantHUD(this._dormantR,canvas.width-130,15,!1),this._dormantR.draw(770,90),this._wasAttack){const t=this._wasAttackTimer%40;t>=0&&t<10?this._fire.x=0:t>=10&&t<20?this._fire.x=5:t>=20&&t<30?this._fire.x=0:t>=30&&t<40&&(this._fire.x=-5),ctx.fillStyle="red",ctx.fillRect(870+this._fire.x,242,40,12),ctx.fillRect(880+this._fire.x,230,30,12),ctx.fillRect(880+this._fire.x,218,20,12),0==this._wasAttackTimer--&&(this._wasAttack=!1,this._wasAttackTimer=60)}}_drawDormantHUD(t,e,i,s){const o=`${t.name} L${t.lvl}`;ctx.fillStyle="#000",ctx.fillText(o,e+ctx.measureText(o).width/2,i),ctx.fillText("HP",e,i+20),ctx.strokeStyle="#000",ctx.strokeRect(e+21,i+12,100,10),ctx.fillStyle="red",ctx.fillRect(e+22,i+13,t.hp*(100/t.initHP)-1,8),s&&(ctx.fillStyle="#000",ctx.fillText("XP",e,i+40),ctx.strokeStyle="#000",ctx.strokeRect(e+21,i+32,100,10),ctx.fillStyle="#777",ctx.fillRect(e+22,i+33,t.xp*(100/t.xpNeeded)-1,8))}_drawHUD(){ctx.strokeStyle="#000",ctx.strokeRect(20,300,500,250),ctx.font="12px Arial",ctx.fillStyle="#000",ctx.fillText("ATK: "+this._dormantL.atk,460,320),ctx.fillText("DEF: "+this._dormantL.def,460,340),this._drawActionList(),this._drawActionArrow()}_drawActionList(){ctx.fillStyle="#000";for(let t=0;t<4;++t)null===this._dormantL.actions[t]?ctx.fillText("--",80,350+30*t):ctx.fillText(this._dormantL.actions[t].name,80,350+30*t)}_drawActionArrow(){ctx.fillStyle="#000",ctx.fillText(this._arrow.img,this._arrow.x,this._arrow.y)}}class Dormant{constructor(t,e,i,s,o,r,a){this.img=new Image,this.imgReady=!1,this.img.onload=(()=>{this.imgReady=!0}),this.img.src=`img/${t}`,this.name=e,this.atk=i,this.def=s,this.initHP=this.hp=o,this.actions=r,this.lvl=void 0!==a?a:1,this.xp=0,this.xpNeeded=50}draw(t,e){this.imgReady&&ctx.drawImage(this.img,t,e,this.img.width,this.img.height)}}const FightAction={TACKLE:{name:"TACKLE",multiplier:1},HEAL:{name:"HEAL",multiplier:1},DRAGONS_BREATH:{name:"DRAGONS BREATH",multiplier:5}};(()=>{window.game=new GameEngine;let t=1,e=new TitleView("Dormanticide");e.then(()=>{game.utils.switchView(i)});let i=new OverworldView;i.then(()=>{1===t?game.utils.switchView(a):game.utils.switchView(n)});let s=[FightAction.TACKLE,FightAction.DRAGONS_BREATH,null,null],o=new Dormant("malaise.png","MALAISE",12,8,27,s),r=new Dormant("erabor.png","ERABOR",8,12,23,s),a=new BattleView("#ddd",o,r);a.then(()=>{++t,game.utils.switchView(i)});let n=new BattleView("#ddd",o,r);n.then(()=>{game.utils.switchView(i)}),game.view=e})();