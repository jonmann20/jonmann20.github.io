!function(t){var e={};function i(s){if(e[s])return e[s].exports;var r=e[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(s,r,function(e){return t[e]}.bind(null,r));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=9)}([function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return r}));const s={EMPTY:-1,ENTER:13,CTRL:17,ESC:27,SPACEBAR:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46,A:65,D:68,F:70,H:72,J:74,K:75,M:77,O:79,R:82,S:83,W:87};class r{constructor(){this.keysDown={},this.lastKeyDown=s.EMPTY;let t=s.EMPTY;addEventListener("keydown",t=>{const e=this.fixKey(t.keyCode);this.keysDown[e]||(this.lastKeyDown=e,this.keysDown[e]=!0)}),addEventListener("keyup",e=>{t=this.fixKey(e.keyCode),delete this.keysDown[t]})}fixKey(t){return t===s.W?t=s.UP:t===s.S?t=s.DOWN:t===s.D?t=s.RIGHT:t===s.A&&(t=s.LEFT),t}}},function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return r}));class s{constructor(t){this.gEngine=t}switchView(t){t.init(),this.gEngine.view=t}}const r={RIGHT:0,LEFT:1}},function(t,e,i){"use strict";var s=i(0);e.a=class{constructor(t){this.cta="Press Enter",this.privates={title:t},this.init()}then(t){this.privates.callback=t}init(){this.title=this.privates.title}update(){game.input.lastKeyDown===s.b.ENTER&&(game.input.lastKeyDown=s.b.EMPTY,this.privates.callback())}render(){ctx.fillStyle="#000",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.font="36px Arial",ctx.fillStyle="#fff",ctx.fillText(this.title,canvas.width/2-ctx.measureText(this.title).width/2,100),ctx.font="24px Arial",ctx.fillText(this.cta,canvas.width/2-ctx.measureText(this.cta).width/2,canvas.height/2)}}},function(t,e,i){"use strict";var s=i(0);var r=class{constructor(){this.isAnimating=!1}repeatAction(t,e,i){this.isAnimating=!0;let s=0,r=setInterval(()=>{s++>e?(clearInterval(r),this.isAnimating=!1):i()},t)}};var n=class{constructor(){this.privates={bgColor:"#ccc"},this.init()}then(t){this.privates.callback=t}init(){}update(){}render(){ctx.fillStyle=this.privates.bgColor,ctx.fillRect(0,0,canvas.width,canvas.height)}},o=i(1);e.a=class{constructor(){this.update=this.update.bind(this),this.render=this.render.bind(this),this.updateInterval=setInterval(this.update,1e3/60),this.renderRAF=requestAnimationFrame(this.render),this.onUpdateSet=!1,this.onRenderSet=!1;let t=document.createElement("a");t.href="/#games",t.innerText="Back",t.className="btn-back",document.body.appendChild(t);let e=document.createElement("div");e.className="canvas-wrap",window.canvas=document.createElement("canvas"),canvas.setAttribute("width",1008),canvas.setAttribute("height",567),e.appendChild(canvas),document.body.appendChild(e),window.ctx=canvas.getContext("2d"),this.input=new s.a,this.graphics=new r,this.view=new n,this.utils=new o.b(this)}update(){this.view.update(),this.onUpdateSet&&this.onUpdate()}render(){this.renderRAF=requestAnimationFrame(this.render),this.view.render(),this.onRenderSet&&this.onRender()}onUpdate(t){this.onUpdateSet=!0,this.onUpdate=t}onRender(t){this.onRenderSet=!0,this.onRender=t}stop(){clearInterval(this.updateInterval),cancelAnimationFrame(this.renderRAF)}}},,,,,,function(t,e,i){"use strict";i.r(e);var s=i(3),r=i(0),n=i(2);var o=class{load(t){return localStorage[`slot ${t}`]}getList(){const t=this.load(0),e=this.load(1),i=this.load(2);return[void 0!==t?t:"---",void 0!==e?e:"---",void 0!==i?i:"---"]}save(t,e){localStorage[`slot ${t}`]=e}erase(t){return localStorage.removeItem(`slot ${t}`),this.getList()}};var a=class{constructor(){this.title="Select a save slot",this.storage=new o,this.list=this.storage.getList(),this.privates={},this.init()}then(t){this.privates.callback=t}init(){this.arrow={img:">>",slot:0,x:canvas.width/2-ctx.measureText(this.list[0]).width/2-60,y:200}}update(){if(game.input.lastKeyDown===r.b.ESC)game.input.lastKeyDown=r.b.EMPTY,this.privates.callback(r.b.ESC);else if(game.input.lastKeyDown===r.b.ENTER){game.input.lastKeyDown=r.b.EMPTY;const t=new Date,e=t.getMonth()+1,i=t.getDate(),s=t.getFullYear(),n=t.toLocaleTimeString();this.storage.save(this.arrow.slot,`${e}/${i}/${s} ${n}`),this.privates.callback(r.b.ENTER)}else game.input.lastKeyDown===r.b.DELETE?(game.input.lastKeyDown=r.b.EMPTY,this.list=this.storage.erase(this.arrow.slot)):2!==this.arrow.slot&&game.input.lastKeyDown===r.b.DOWN?(game.input.lastKeyDown=r.b.EMPTY,++this.arrow.slot,this.arrow.x=canvas.width/2-ctx.measureText(this.list[this.arrow.slot]).width/2-60,this.arrow.y+=80):0!==this.arrow.slot&&game.input.lastKeyDown===r.b.UP&&(game.input.lastKeyDown=r.b.EMPTY,--this.arrow.slot,this.arrow.x=canvas.width/2-ctx.measureText(this.list[this.arrow.slot]).width/2-60,this.arrow.y-=80)}render(){ctx.fillStyle="#111",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.font="36px Arial",ctx.fillStyle="#fff",ctx.fillText(this.title,canvas.width/2-ctx.measureText(this.title).width/2,80),ctx.font="24px Arial";for(let t=0;t<this.list.length;++t)ctx.fillText(this.list[t],canvas.width/2-ctx.measureText(this.list[t]).width/2,200+80*t);ctx.fillText(this.arrow.img,this.arrow.x,this.arrow.y)}},h={};
/** @preserve SAT.js - Version 0.6.0 - Copyright 2012 - 2016 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */function l(t,e){this.x=t||0,this.y=e||0}function p(t,e){this.pos=t||new l,this.r=e||0}function c(t,e){this.pos=t||new l,this.angle=0,this.offset=new l,this.setPoints(e||[])}function u(t,e,i){this.pos=t||new l,this.w=e||0,this.h=i||0}function y(){this.a=null,this.b=null,this.overlapN=new l,this.overlapV=new l,this.clear()}h.Vector=l,h.V=l,l.prototype.copy=l.prototype.copy=function(t){return this.x=t.x,this.y=t.y,this},l.prototype.clone=l.prototype.clone=function(){return new l(this.x,this.y)},l.prototype.perp=l.prototype.perp=function(){var t=this.x;return this.x=this.y,this.y=-t,this},l.prototype.rotate=l.prototype.rotate=function(t){var e=this.x,i=this.y;return this.x=e*Math.cos(t)-i*Math.sin(t),this.y=e*Math.sin(t)+i*Math.cos(t),this},l.prototype.reverse=l.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},l.prototype.normalize=l.prototype.normalize=function(){var t=this.len();return t>0&&(this.x=this.x/t,this.y=this.y/t),this},l.prototype.add=l.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},l.prototype.sub=l.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},l.prototype.scale=l.prototype.scale=function(t,e){return this.x*=t,this.y*=e||t,this},l.prototype.project=l.prototype.project=function(t){var e=this.dot(t)/t.len2();return this.x=e*t.x,this.y=e*t.y,this},l.prototype.projectN=l.prototype.projectN=function(t){var e=this.dot(t);return this.x=e*t.x,this.y=e*t.y,this},l.prototype.reflect=l.prototype.reflect=function(t){var e=this.x,i=this.y;return this.project(t).scale(2),this.x-=e,this.y-=i,this},l.prototype.reflectN=l.prototype.reflectN=function(t){var e=this.x,i=this.y;return this.projectN(t).scale(2),this.x-=e,this.y-=i,this},l.prototype.dot=l.prototype.dot=function(t){return this.x*t.x+this.y*t.y},l.prototype.len2=l.prototype.len2=function(){return this.dot(this)},l.prototype.len=l.prototype.len=function(){return Math.sqrt(this.len2())},h.Circle=p,p.prototype.getAABB=p.prototype.getAABB=function(){var t=this.r;return new u(this.pos.clone().sub(new l(t,t)),2*t,2*t).toPolygon()},h.Polygon=c,c.prototype.setPoints=c.prototype.setPoints=function(t){if(!this.points||this.points.length!==t.length){var e,i=this.calcPoints=[],s=this.edges=[],r=this.normals=[];for(e=0;e<t.length;e++)i.push(new l),s.push(new l),r.push(new l)}return this.points=t,this._recalc(),this},c.prototype.setAngle=c.prototype.setAngle=function(t){return this.angle=t,this._recalc(),this},c.prototype.setOffset=c.prototype.setOffset=function(t){return this.offset=t,this._recalc(),this},c.prototype.rotate=c.prototype.rotate=function(t){for(var e=this.points,i=e.length,s=0;s<i;s++)e[s].rotate(t);return this._recalc(),this},c.prototype.translate=c.prototype.translate=function(t,e){for(var i=this.points,s=i.length,r=0;r<s;r++)i[r].x+=t,i[r].y+=e;return this._recalc(),this},c.prototype._recalc=function(){var t,e=this.calcPoints,i=this.edges,s=this.normals,r=this.points,n=this.offset,o=this.angle,a=r.length;for(t=0;t<a;t++){var h=e[t].copy(r[t]);h.x+=n.x,h.y+=n.y,0!==o&&h.rotate(o)}for(t=0;t<a;t++){var l=e[t],p=t<a-1?e[t+1]:e[0],c=i[t].copy(p).sub(l);s[t].copy(c).perp().normalize()}return this},c.prototype.getAABB=c.prototype.getAABB=function(){for(var t=this.calcPoints,e=t.length,i=t[0].x,s=t[0].y,r=t[0].x,n=t[0].y,o=1;o<e;o++){var a=t[o];a.x<i?i=a.x:a.x>r&&(r=a.x),a.y<s?s=a.y:a.y>n&&(n=a.y)}return new u(this.pos.clone().add(new l(i,s)),r-i,n-s).toPolygon()},h.Box=u,u.prototype.toPolygon=u.prototype.toPolygon=function(){var t=this.pos,e=this.w,i=this.h;return new c(new l(t.x,t.y),[new l,new l(e,0),new l(e,i),new l(0,i)])},h.Response=y,y.prototype.clear=y.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var d=[],f=0;f<10;f++)d.push(new l);var v=[];for(f=0;f<5;f++)v.push([]);var w=new y,x=new u(new l,1e-6,1e-6).toPolygon();function g(t,e,i){for(var s=Number.MAX_VALUE,r=-Number.MAX_VALUE,n=t.length,o=0;o<n;o++){var a=t[o].dot(e);a<s&&(s=a),a>r&&(r=a)}i[0]=s,i[1]=r}function b(t,e,i,s,r,n){var o=v.pop(),a=v.pop(),h=d.pop().copy(e).sub(t),l=h.dot(r);if(g(i,r,o),g(s,r,a),a[0]+=l,a[1]+=l,o[0]>a[1]||a[0]>o[1])return d.push(h),v.push(o),v.push(a),!0;if(n){var p,c,u=0;if(o[0]<a[0])if(n.aInB=!1,o[1]<a[1])u=o[1]-a[0],n.bInA=!1;else u=(p=o[1]-a[0])<(c=a[1]-o[0])?p:-c;else if(n.bInA=!1,o[1]>a[1])u=o[0]-a[1],n.aInB=!1;else u=(p=o[1]-a[0])<(c=a[1]-o[0])?p:-c;var y=Math.abs(u);y<n.overlap&&(n.overlap=y,n.overlapN.copy(r),u<0&&n.overlapN.reverse())}return d.push(h),v.push(o),v.push(a),!1}function m(t,e){var i=t.len2(),s=e.dot(t);return s<0?A:s>i?E:T}h.isSeparatingAxis=b;var A=-1,T=0,E=1;function P(t,e,i){for(var s=d.pop().copy(e.pos).sub(t.pos),r=e.r,n=r*r,o=t.calcPoints,a=o.length,h=d.pop(),l=d.pop(),p=0;p<a;p++){var c=p===a-1?0:p+1,u=0===p?a-1:p-1,y=0,f=null;h.copy(t.edges[p]),l.copy(s).sub(o[p]),i&&l.len2()>n&&(i.aInB=!1);var v=m(h,l);if(v===A){h.copy(t.edges[u]);var w=d.pop().copy(s).sub(o[u]);if((v=m(h,w))===E){if((g=l.len())>r)return d.push(s),d.push(h),d.push(l),d.push(w),!1;i&&(i.bInA=!1,f=l.normalize(),y=r-g)}d.push(w)}else if(v===E){if(h.copy(t.edges[c]),l.copy(s).sub(o[c]),(v=m(h,l))===A){if((g=l.len())>r)return d.push(s),d.push(h),d.push(l),!1;i&&(i.bInA=!1,f=l.normalize(),y=r-g)}}else{var x=h.perp().normalize(),g=l.dot(x),b=Math.abs(g);if(g>0&&b>r)return d.push(s),d.push(x),d.push(l),!1;i&&(f=x,y=r-g,(g>=0||y<2*r)&&(i.bInA=!1))}f&&i&&Math.abs(y)<Math.abs(i.overlap)&&(i.overlap=y,i.overlapN.copy(f))}return i&&(i.a=t,i.b=e,i.overlapV.copy(i.overlapN).scale(i.overlap)),d.push(s),d.push(h),d.push(l),!0}function S(t,e,i){for(var s=t.calcPoints,r=s.length,n=e.calcPoints,o=n.length,a=0;a<r;a++)if(b(t.pos,e.pos,s,n,t.normals[a],i))return!1;for(a=0;a<o;a++)if(b(t.pos,e.pos,s,n,e.normals[a],i))return!1;return i&&(i.a=t,i.b=e,i.overlapV.copy(i.overlapN).scale(i.overlap)),!0}h.pointInCircle=function(t,e){var i=d.pop().copy(t).sub(e.pos),s=e.r*e.r,r=i.len2();return d.push(i),r<=s},h.pointInPolygon=function(t,e){x.pos.copy(t),w.clear();var i=S(x,e,w);return i&&(i=w.aInB),i},h.testCircleCircle=function(t,e,i){var s=d.pop().copy(e.pos).sub(t.pos),r=t.r+e.r,n=r*r,o=s.len2();if(o>n)return d.push(s),!1;if(i){var a=Math.sqrt(o);i.a=t,i.b=e,i.overlap=r-a,i.overlapN.copy(s.normalize()),i.overlapV.copy(s).scale(i.overlap),i.aInB=t.r<=e.r&&a<=e.r-t.r,i.bInA=e.r<=t.r&&a<=t.r-e.r}return d.push(s),!0},h.testPolygonCircle=P,h.testCirclePolygon=function(t,e,i){var s=P(e,t,i);if(s&&i){var r=i.a,n=i.aInB;i.overlapN.reverse(),i.overlapV.reverse(),i.a=i.b,i.b=r,i.aInB=i.bInA,i.bInA=n}return s},h.testPolygonPolygon=S;var R=h;var D=class{constructor(){this.speed=4,this.w=40,this.h=40,this.hp=3,this.invincible=!1,this.invincibleTimer=120,this.dead=!1,Object.assign(this,new R.Box(new R.Vector(0,0),this.w,this.h).toPolygon())}update(){game.input.keysDown[r.b.RIGHT]?this.pos.x+=this.speed:game.input.keysDown[r.b.LEFT]&&(this.pos.x-=this.speed),game.input.keysDown[r.b.UP]?this.pos.y-=this.speed:game.input.keysDown[r.b.DOWN]&&(this.pos.y+=this.speed),this.hp<=0&&!this.dead&&(this.dead=!0,alert("You died"),location.reload())}render(){if(this.dead)return;let t=!0;if(this.invincible){const e=this.invincibleTimer%30;e>=0&&e<15&&(t=!1)}t&&(ctx.fillStyle="yellow",ctx.fillRect(this.pos.x,this.pos.y,this.w,this.h)),ctx.fillStyle="red";for(let t=0;t<this.hp;++t)ctx.fillRect(this.pos.x-10+20*t,this.pos.y-20,20,10)}};var M=class{constructor(){this.projectiles=[];for(let t=0;t<10;++t){let t=new R.Box(new R.Vector(Math.floor(Math.random()*canvas.width+0),canvas.height),10,20).toPolygon();t.speed=.1*Math.floor(10*Math.random()+3),this.projectiles.push(t)}}update(){for(let t=0;t<this.projectiles.length;++t)this.projectiles[t].pos.y-=this.projectiles[t].speed}render(){ctx.fillStyle="#000",ctx.fillRect(0,0,canvas.width,canvas.height),ctx.fillStyle="silver";for(let t=0;t<this.projectiles.length;++t)ctx.fillRect(this.projectiles[t].pos.x,this.projectiles[t].pos.y,10,20)}};var I=class{constructor(t,e){this.onUpdateSet=!1,this.onRenderSet=!1,this.privates={},this.player=t,this.curLvl=e,this.init()}then(t){this.privates.callback=t}init(){}update(){this.curLvl.update(),this.player.update(),this._checkCollision()}onUpdate(t){this.onUpdateSet=!0,this.onUpdate=t}render(){this.curLvl.render(),this.player.render()}onRender(t){this.onRenderSet=!0,this.onRender=t}_checkCollision(){if(this.player.invincible)0==this.player.invincibleTimer--&&(this.player.invincible=!1,this.player.invincibleTimer=120);else for(let t=0;t<this.curLvl.projectiles.length;++t){if(R.testPolygonPolygon(this.player,this.curLvl.projectiles[t])){--this.player.hp,this.player.invincible=!0;break}}}};(()=>{window.game=new s.a;let t=new n.a("Vamp: The Great and Powerful",!0),e=new a;const i=new D,o=new M,h=new I(i,o);t.then(()=>{game.utils.switchView(e)}),e.then(e=>{e===r.b.ESC?game.utils.switchView(t):e===r.b.ENTER&&game.utils.switchView(h)}),game.view=t})()}]);