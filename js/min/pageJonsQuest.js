﻿(function(a,d,e,b,c,f,g){a.GoogleAnalyticsObject=c;a[c]=a[c]||function(){(a[c].q=a[c].q||[]).push(arguments)};a[c].l=1*new Date;f=d.createElement(e);g=d.getElementsByTagName(e)[0];f.async=1;f.src=b;g.parentNode.insertBefore(f,g)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create","UA-43015655-1","jonmann20.github.io");ga("send","pageview");
var utils=function(){return{degToRad:function(a){return 0.017453292519943295*a}}}(),Dir=Object.freeze({NONE:0,TOP:1,BOT:2,LEFT:3,RIGHT:4}),Inv_e=Object.freeze({NOT_HIT:0,HIT_WHITE:1,HIT_RED:2}),bullet={color:"rgba(0, 182, 255, .85)",w:19.5,h:9,speed:8};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(a){setTimeout(a,1E3/game.fps)}}();
var audio=function(){return{bgMusic:new Audio("audio/firstChiptune/firstChiptune.mp3"),enterSound:new Audio("audio/synthetic_explosion_1.mp3"),itemPickedUp:new Audio("audio/life_pickup.mp3"),heartbeat:new Audio("audio/heartbeat.mp3"),jump:new Audio("audio/jump.mp3"),thud:new Audio("audio/thud.mp3"),step:new Audio("audio/step.mp3"),effort:new Audio("audio/woosh.mp3"),discovery:new Audio("audio/spell3.mp3"),enemyDeath:new Audio("audio/death.mp3"),heroDeath:new Audio("audio/DiscsOfTron_Cascade.mp3"),
enchant:new Audio("audio/enchant.mp3"),isOn:!1,play:function(a,d){d="undefined"!==typeof d?d:!0;if(a.ended)a.play();else if(d||0===a.currentTime)a.pause(),a.currentTime=0,a.play()},handleMuteButton:function(){$(".audioState").hasClass("off")?($(".audioState span").removeClass("icon-volume-mute").addClass("icon-volume-medium"),$(".audioState").removeClass("off"),$(".audioState").addClass("on"),audio.mute(!1)):($(".audioState span").removeClass("icon-volume-medium").addClass("icon-volume-mute"),$(".audioState").removeClass("on"),
$(".audioState").addClass("off"),audio.mute(!0))},mute:function(a){(audio.discovery.muted=audio.enterSound.muted=audio.bgMusic.muted=audio.itemPickedUp.muted=audio.heartbeat.muted=audio.effort.muted=audio.thud.muted=audio.jump.muted=audio.step.muted=audio.enemyDeath.muted=audio.heroDeath.muted=audio.enchant.muted=a)?audio.bgMusic.pause():audio.bgMusic.play();audio.isOn=!a}}}(),Graphics=function(){var a=1,d=!0;return{blinkText:function(e,b,c,f){f="undefined"!==typeof f?f:"PRESS ENTER";0>=a?d=!1:1.55<
a&&(d=!0);var g=game.dt/1E3;a+=d?-g:g;ctx.font=e+"px 'Press Start 2P'";e=ctx.measureText(f).width;ctx.fillStyle="rgba(233, 233, 233,"+a+")";ctx.fillText(f,b-e/2,c)},drawEllipse:function(a,d,c,f){var g=0.5522848*(c/2),h=0.5522848*(f/2),k=a+c,l=d+f;c=a+c/2;f=d+f/2;ctx.beginPath();ctx.moveTo(a,f);ctx.bezierCurveTo(a,f-h,c-g,d,c,d);ctx.bezierCurveTo(c+g,d,k,f-h,k,f);ctx.bezierCurveTo(k,f+h,c+g,l,c,l);ctx.bezierCurveTo(c-g,l,a,f+h,a,f);ctx.closePath();ctx.fill()},drawRotate:function(a,d,c,f){ctx.save();
ctx.translate(d,c);ctx.rotate(utils.degToRad(f));ctx.translate(0.5*-a.width,0.5*-a.height);ctx.drawImage(a,0,0);ctx.restore()}}}(),Physics=function(){return{isCollision:function(a,d,e,b){b="undefined"!==typeof b?a.x+a.lvlX:a.x;return b+e<=d.x+d.w&&d.x+e<=b+a.w&&a.y+e<=d.y+d.h&&d.y+e<=a.y+a.h?!0:!1}}}(),GameObj=function(a,d,e,b,c){var f=null,g=!1;"undefined"!==typeof c&&(f=new Image,f.onload=function(){g=!0},f.src=c);return{initX:a,x:a,initY:d,y:d,w:e,h:b,vY:0,updatePos:function(){this.y=this.y<FULLH-
game.padFloor-this.h?this.y+this.vY:FULLH-game.padFloor-this.h},draw:function(){g?ctx.drawImage(f,this.x,this.y):(ctx.fillStyle="red",ctx.fillRect(this.x,this.y,this.w,this.h))},getImg:function(){return f}}},GameItem=function(){function a(){return function(){this.visible&&!this.collected&&d.apply(this)}}var d=null;return{collected:!1,holding:!1,visible:!0,val:-1,init:function(e,b,c){$.extend(this,e);this.val=b;"undefined"!==typeof c&&(this.visible=c);d=this.draw;this.draw=a()}}},Enemy=function(){function a(){return function(){if(b||
c){if(1<e){var a=this.w/e*this.health;ctx.fillStyle="red";ctx.fillRect(this.x,this.y-12,a,4)}ctx.save();c&&(ctx.globalAlpha=0.3);d.apply(this);ctx.restore()}}}var d=null,e=0,b=!0,c=!1,f=!0;return{active:!1,health:0,init:function(c,b){$.extend(this,c);this.health=e=b;d=this.draw;this.draw=a()},update:function(){if(c){if(this.x+=f?2:-2,this.y-=14,0>this.x||this.x>FULLW)c=!1}else b&&this.active&&0===game.totalTicks%3&&(this.x<hero.x?++this.x:this.x>hero.x&&--this.x)},death:function(){f=hero.dirR;audio.enemyDeath.play();
hero.xp+=2;b=!1;c=!0}}},startScreen=function(){function a(){13 in keysDown?(++game.lvl,audio.enterSound.play(),audio.bgMusic.pause(),setTimeout(function(){audio.bgMusic=new Audio("audio/inspiredBySparkMan/sparkBoy.mp3");audio.bgMusic.loop=!0;audio.bgMusic.volume=0.45;audio.isOn?audio.bgMusic.play():audio.bgMusic.pause()},1E3),game.loop()):requestAnimFrame(startScreen.loop)}var d=0,e=String.fromCharCode("169")+" 2013 JON WIEDMANN";return{loop:function(){a();ctx.fillStyle="#000";ctx.fillRect(0,0,FULLW,
FULLH+game.padHUD);ctx.font="29px 'Press Start 2P'";var b=HALFW-ctx.measureText("JON'S").width/2+11,c=58;ctx.setTransform(1,0,-0.4,1.4,0,0);ctx.fillStyle="#222";ctx.fillText("J",b+4,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("J",b,c);ctx.setTransform(1,0,-0.2,1.4,0,0);ctx.fillStyle="#222";ctx.fillText("O",b+32,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("O",b+28,c);ctx.setTransform(1,0,0.05,1.41,0,-1);ctx.fillStyle="#222";ctx.fillText("N",b+58,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("N",b+54,c);ctx.setTransform(1,
0,0.23,1.4,0,0);ctx.fillStyle="#222";ctx.fillText("'",b+78,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("'",b+74,c);ctx.setTransform(1,0,0.42,1.4,0,0);ctx.fillStyle="#222";ctx.fillText("S",b+95,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("S",b+91,c);ctx.font="36px 'Press Start 2P'";b=HALFW-ctx.measureText("QUEST").width/2+30;c=98;ctx.setTransform(1,0,-0.5,1.6,0,0);ctx.fillStyle="#222";ctx.fillText("Q",b+4,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("Q",b,c);ctx.setTransform(1,0,-0.25,1.6,0,0);ctx.fillStyle=
"#222";ctx.fillText("U",b+26,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("U",b+22,c);ctx.setTransform(1,0,0.03,1.6,0,0);ctx.fillStyle="#222";ctx.fillText("E",b+50,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("E",b+46,c);ctx.setTransform(1,0,0.25,1.6,0,0);ctx.fillStyle="#222";ctx.fillText("S",b+74,c+3);ctx.fillStyle="#ff6a00";ctx.fillText("S",b+70,c);ctx.setTransform(1,0,0.5,1.6,0,0);ctx.fillStyle="#222";ctx.fillText("T",b+90,c+4);ctx.fillStyle="#ff6a00";ctx.fillText("T",b+86,c);ctx.setTransform(1,0,0,
1,0,0);Graphics.blinkText(22,HALFW,HALFH+81);ctx.font="13px 'Press Start 2P'";ctx.fillStyle="#ddd";ctx.fillText(e,HALFW-ctx.measureText(e).width/2,FULLH+44);b=(new Date).getTime();game.dt=b-(d||b);d=b}}}(),level=function(){function a(a,d){var c=0,b;for(b in a)"none"!==a[b]&&(g[b]=new Image,g[b].onload=function(){d(this.num)},g[b].src=a[b],g[b].num=c),++c}var d=null,e=null,b=null,c=null,f=Array(5),g={};return{collisionPts:{},width:0,init:function(){c=GameObj(238,FULLH+31,25,24,"img/medKit.png");b=
GameObj(342,FULLH+31,25,25,"img/syringe.png");d=GameObj(447,FULLH+32,24,24,"img/shuriken.png");e=GameObj(548,FULLH+33,22,24,"img/cash.png");level.collisionPts={lvl0:{obj0:{x:310,y:161,w:200,h:30},obj1:{x:600,y:95,w:200,h:30},obj2:{x:562,y:230,w:300,h:30}}};for(var g=0;5>g;g++)f[g]={status:!1,bgColor:"#"+Math.floor(16777215*Math.random()).toString(16)};a({lvl0:"img/lvl0.jpg",lvl1:"none"},function(a){f[a].status=!0});level.reset();lvl0.init()},reset:function(){level.width=3198;hero.x=23;hero.y=canvas.height-
hero.h;hero.isJumping=!1;hero.bulletArr.length=0},update:function(){switch(game.lvl){case 0:lvl0.update()}},updateObjs:function(){switch(game.lvl){case 0:lvl0.updateObjs()}},render:function(){f[game.lvl].status?ctx.drawImage(g["lvl"+game.lvl],hero.lvlX,0,FULLW,FULLH,0,0,FULLW,FULLH):(ctx.fillStyle=f[game.lvl].bgColor?f[game.lvl].bgColor:"#222",ctx.fillRect(0,0,FULLW,FULLH));ctx.fillStyle="#070707";ctx.fillRect(0,FULLH,FULLW,game.padHUD);ctx.fillStyle="#ddd";ctx.font="12px 'Press Start 2P'";ctx.fillText("HP-"+
hero.healthLvl,15,FULLH+24);ctx.fillText("MP-"+hero.manaLvl,15,FULLH+48);ctx.fillText("XP",15,FULLH+71);ctx.fillText(hero.medKits,210,FULLH+50);c.draw();ctx.fillText(hero.manaKits,315,FULLH+50);b.draw();ctx.fillText(hero.ammo,410,FULLH+50);d.draw();ctx.fillText(hero.cash,515,FULLH+50);e.draw();var a=Math.floor(game.actualTime/60),k=game.actualTime%60;10>k&&(k="0"+k);10>a&&(a="0"+a);ctx.fillText(a+":"+k,FULLW-84,FULLH+34);switch(game.lvl){case 0:lvl0.render()}},drawAfterHero:function(){0===game.lvl&&
lvl0.crate.holding&&lvl0.crate.draw()}}}(),lvl0=function(){var a=null,d=null,e=null,b=null,c=null;return{init:function(){e=GameItem();e.init(GameObj(680,71,20,24,"img/sack.png"),5);a=Enemy();a.init(GameObj(2100,FULLH-game.padFloor-38+1,28,38,"img/cyborgBnW.png"),1);d=GameItem();d.init(GameObj(140,50,22,24,"img/cash.png"),10,!1);lvl0.crate=GameItem();lvl0.crate.init(GameObj(400,FULLH-game.padFloor-26,24,26,"img/crate.png"));b=GameObj(1300,80,340,190,"img/belt.png");c=GameObj(1300,80,340,190,"img/belt2.png")},
update:function(){d.updatePos();a.update();!e.collected&&Physics.isCollision(hero,e,0)&&(e.collected=!0,audio.itemPickedUp.play(),hero.ammo+=e.val);if(d.visible)!d.collected&&Physics.isCollision(hero,d,0)&&(d.collected=!0,audio.itemPickedUp.play(),hero.cash+=d.val);else for(var b=0;b<hero.bulletArr.length;++b)Physics.isCollision(hero.bulletArr[b],d,-17)&&(d.visible=!0,d.vY=4,audio.discovery.play());lvl0.crate.holding?(lvl0.crate.x=hero.dirR?hero.x+22:hero.x-22,lvl0.crate.y=hero.y):Physics.isCollision(hero,
lvl0.crate,12)&&(hero.isCarrying=!0,lvl0.crate.holding=!0,lvl0.crate.vY=6.5);lvl0.crate.updatePos();if(0<a.health)for(Physics.isCollision(hero,a,0)&&(a.active=!0,hero.invincible||(audio.play(audio.heartbeat,!0),hero.invincible=!0,--hero.health)),b=0;b<hero.bulletArr.length;++b){var c=!1;Physics.isCollision(hero.bulletArr[b],a,0)&&(c=!0,audio.play(audio.thud,!0));c&&(a.active=!0,hero.bulletArr.splice(b,1),--a.health,0>=a.health&&a.death())}},updateObjs:function(){e.x-=hero.vX;a.x-=hero.vX;d.x-=hero.vX;
b.x-=hero.vX;lvl0.crate.x-=hero.vX},render:function(){e.collected||e.draw();d.draw();a.draw();0===game.totalTicks%60?c.draw():b.draw();lvl0.crate.holding?0===hero.vX&&(lvl0.crate.x+=hero.dirR?-20:24,lvl0.crate.y+=6):lvl0.crate.draw()}}}(),game=function(){var a=0,d,e=[0];return{gravity:0.9,friction:0.45,padBot:119,padHUD:80,padFloor:39,lvl:-1,dt:0,fps:60,totalTicks:0,actualTime:0,loop:function(b){hero.update();level.update();level.render();hero.render();level.drawAfterHero();game.dt=b-(d||b);d=b;b=
Math.round(1E3/game.dt);ctx.fillStyle="#ddd";ctx.font="12px 'Press Start 2P'";"Infinity"!=b&&e.push(b);if(0===game.totalTicks%20){b=0;for(var c in e)b+=e[c];a=Math.floor(b/e.length);e=[]}ctx.fillText(a+" FPS",FULLW-84,FULLH+65);0===++game.totalTicks%60&&++game.actualTime;requestAnimFrame(game.loop)}}}(),hero=function(){var a=null,d=null,e=null,b=!1,c=null,f=!0,g=!1,h=[];return{protectedInfo:{},ammo:20,cash:0,x:0,y:0,sx:0,sy:0,lvlX:0,w:28,h:38,vX:0,vY:0,maxVx:8,maxVy:15,dir:Dir.NONE,dirR:!0,speed:0.7,
isJumping:!1,isCarrying:!1,onGround:!0,onObj:!0,onObjX:-1,onObjY:-1,jumpMod:5,jumpPower:5,jumpPowerMax:10,invincible:!1,invincibleTimer:120,initInvincibleTimer:120,health:4,maxHealth:5,medKits:1,healthLvl:1,mana:0,maxMana:4,manaKits:1,manaLvl:1,lvl:1,xp:0,xpNeeded:50,bulletArr:[],init:function(){c=new Image;c.onload=function(){b=!0};c.src="../dungeon/web/img/sprites/player/player.png";$.get("../dungeon/web/img/sprites/player/player.xml",function(a){a=$(a).find("sprite");$(a).each(function(){var a=
$(this).attr("n"),d=$(this).attr("x"),b=$(this).attr("y"),a=a.substring(0,a.length-4);h[a]={x:d,y:b}})});a=HeroInputComponent();a.init();d=HeroPhysicsComponent();e=HeroGraphicsComponent();e.init()},offObj:function(){hero.onObj=!1;hero.onObjX=-1;hero.onObjY=-1},update:function(){a.check();d.updatePosition();d.checkCollision();hero.invincible&&--hero.invincibleTimer;0>=hero.invincibleTimer&&(hero.invincible=!1,hero.invincibleTimer=hero.initInvincibleTimer);0>=hero.health&&!g&&(audio.heroDeath.play(),
audio.bgMusic.muted=!0,alert("You died"),location.reload(),g=!0);0===game.totalTicks%12&&(f=!f);var b={x:0,y:0},b=hero.isCarrying&&0===hero.vX&&hero.dir==Dir.NONE?h.playerDown:hero.dirR?hero.dir==Dir.RIGHT?Math.abs(hero.vX)<=3.5*hero.speed?h.playerRight_Step:f?h.playerRight_Run1:h.playerRight_Run2:h.playerRight:hero.dir==Dir.LEFT?Math.abs(hero.vX)<=3.5*hero.speed?h.playerLeft_Step:f?h.playerLeft_Run1:h.playerLeft_Run2:h.playerLeft,c=hero.invincibleTimer%20;!hero.invincible||0!==c&&1!==c&&2!==c&&3!==
c&&4!==c&&5!==c&&6!==c||(b={x:-1,y:-1});hero.sx=b.x;hero.sy=b.y},render:function(){b&&0<=hero.sx&&0<=hero.sy&&ctx.drawImage(c,hero.sx,hero.sy,hero.w,hero.h,hero.x,hero.y,hero.w,hero.h);e.drawBullets();e.drawHealth();e.drawMana();e.drawXP()}}}(),HeroGraphicsComponent=function(){var a=null;return{init:function(){a=new Image;a.src="img/shuriken.png";a.onload=function(){}},drawBullets:function(){for(var d=0;d<hero.bulletArr.length;++d){var e=hero.bulletArr[d].dirR?hero.w:0;hero.bulletArr[d].deg+=5;Graphics.drawRotate(a,
hero.bulletArr[d].x+e,hero.bulletArr[d].y+20,hero.bulletArr[d].deg)}},drawHealth:function(){for(var a=0;a<hero.health;++a)ctx.fillStyle="red",ctx.fillRect(80+21*a,FULLH+14,19,8)},drawMana:function(){for(var a=0;a<hero.mana;++a)ctx.fillStyle="#00b6ff",ctx.fillRect(80+21*a,FULLH+37,19,8)},drawXP:function(){ctx.fillStyle="#ddd";ctx.font="12px 'Press Start 2P'";ctx.fillText((10>hero.xp?"0":"")+hero.xp+"/"+hero.xpNeeded,80,FULLH+71)}}},HeroPhysicsComponent=function(){return{updatePosition:function(){hero.isJumping?
(0<hero.jumpMod&&(hero.vY-=hero.jumpMod,--hero.jumpMod),hero.dir=Dir.TOP):hero.jumpMod=hero.jumpPower;hero.x!=hero.x+hero.vX&&audio.step.play();hero.y+=hero.vY;(hero.dirR&&hero.x>=canvas.width/2+35||!hero.dirR&&hero.x<=canvas.width/2-45)&&0<=hero.lvlX+hero.vX&&hero.lvlX+hero.vX<=level.width-canvas.width?(hero.lvlX+=hero.vX,level.updateObjs()):hero.x+=hero.vX},checkCollision:function(){for(var a=0;a<hero.bulletArr.length;a++)hero.bulletArr[a].x+=hero.bulletArr[a].dirR?bullet.speed:-bullet.speed,(hero.bulletArr[a].x>
canvas.width||0>hero.bulletArr[a].x)&&hero.bulletArr.splice(a,1);hero.onGround=!1;hero.y<-hero.h&&(hero.y=-hero.h,hero.vY=0);hero.y>canvas.height-game.padBot-hero.h?(hero.y=canvas.height-game.padBot-hero.h,hero.isJumping=!1,hero.onGround=!0):hero.onObj&&(hero.y=hero.onObjY);0>hero.x?hero.x=0:hero.x>canvas.width-hero.w&&(hero.x=canvas.width-hero.w);var d="lvl"+game.lvl,e=Dir.NONE,b;for(b in level.collisionPts[d])if(a=level.collisionPts[d][b],Physics.isCollision(hero,a,0,!0)&&(hero.dirR?hero.lvlX-hero.x<
a.x&&(hero.onObjX=a.x-hero.lvlX-hero.w,hero.onObjLvlX=hero.lvlX,e=Dir.LEFT):hero.x+hero.lvlX+hero.w>a.x+a.w&&(hero.onObjX=a.x-hero.lvlX+a.w,hero.onObjLvlX=hero.lvlX,e=Dir.RIGHT),hero.x!=hero.onObjX&&hero.y+hero.h-17<a.y&&0<hero.vY?(hero.onObjY=hero.y=a.y-hero.h,hero.isJumping=!1,hero.onObj=!0,e=Dir.TOP):hero.y+hero.h>a.y+a.h&&(-4>hero.vY&&audio.play(audio.thud,!0),hero.onObjY=hero.y=a.y+a.h,hero.jumpMod=0,hero.vY=0,e=Dir.BOT)),e!=Dir.NONE){if(e==Dir.LEFT||e==Dir.RIGHT)hero.x=hero.onObjX,hero.lvlX=
hero.onObjLvlX;break}e==Dir.NONE&&hero.offObj()}}},HeroInputComponent=function(){return{init:function(){keysDown={};lastKeyDown=-1;addEventListener("keydown",function(a){32==a.keyCode?a.preventDefault():77==a.keyCode?audio.handleMuteButton():66==a.keyCode?$(".resize").trigger("click"):75!=a.keyCode||hero.isJumping||75==lastKeyDown&&75 in keysDown||!hero.onObj&&!hero.onGround?74!=a.keyCode||74==lastKeyDown&&74 in keysDown||!(0<hero.ammo)||hero.isCarrying||(audio.play(audio.effort),hero.bulletArr[hero.bulletArr.length]=
{x:hero.x,y:hero.y,w:bullet.w,h:bullet.h,dirR:hero.dirR,deg:0},--hero.ammo):(audio.jump.play(),hero.vY=0,hero.isJumping=!0,hero.offObj());lastKeyDown=a.keyCode;keysDown[a.keyCode]=!0},!1);addEventListener("keyup",function(a){delete keysDown[a.keyCode]},!1)},check:function(){hero.dir=Dir.NONE;hero.onObj||(hero.vY=hero.vY+game.gravity>hero.maxVy?hero.maxVy:hero.vY+game.gravity);0!==hero.vX&&(hero.vX+=0<hero.vX?-game.friction:game.friction);65 in keysDown&&(hero.vX=Math.abs(hero.vX-hero.speed)>hero.maxVx?
-hero.maxVx:hero.vX-hero.speed,hero.dirR=!1,hero.dir=Dir.LEFT);68 in keysDown&&(hero.vX=Math.abs(hero.vX+hero.speed)>hero.maxVx?hero.maxVx:hero.vX+hero.speed,hero.dirR=!0,hero.dir=Dir.RIGHT);Math.abs(hero.vX)<hero.speed?hero.vX=0:hero.dir!=Dir.LEFT&&hero.dir!=Dir.RIGHT&&(hero.vX/=1.2);32 in keysDown&&(lvl0.crate.holding=!1,hero.isCarrying=!1);72 in keysDown&&0<hero.medKits&&hero.health<hero.maxHealth&&(++hero.health,--hero.medKits,audio.play(audio.enchant,!0));82 in keysDown&&!(17 in keysDown)&&0<
hero.manaKits&&hero.mana<hero.maxMana&&(++hero.mana,--hero.manaKits,audio.play(audio.enchant,!0))}}};
jq.Main=function(){function a(){audio.bgMusic.loop=!0;audio.bgMusic.volume=0.7;audio.bgMusic.pause();audio.enemyDeath.volume=0.6;audio.jump.volume=0.4;audio.thud.volume=0.78;audio.discovery.volume=0.7;audio.mute(!0);$(".audioState").on("click",audio.handleMuteButton);var a=!1;$(".resize").on("click",function(){if(a)$(canvas).css({width:"",height:""}),$(this).attr("class","resize off"),$(this).children("span").attr("class","icon-expand");else{$(canvas).css({width:"100%"});var e=$(canvas).width();$(canvas).css({height:0.611*
e});$(this).attr("class","resize on");$(this).children("span").attr("class","icon-contract")}a=!a})}return{init:function(){canvas=$("canvas")[0];ctx=canvas.getContext("2d");FULLW=canvas.width;FULLH=canvas.height;FULLH-=game.padHUD;HALFW=FULLW/2;HALFH=FULLH/2;a();ctx.fillStyle="#e1e1e1";ctx.font="25px 'Press Start 2P'";ctx.fillText("LOADING...",HALFW-80,HALFH+20);level.init();hero.init();startScreen.loop()}}}();
$(function(){var a=setInterval(function(){jq.scriptsLoaded===jq.numScripts&&(jq.Main.init(),clearInterval(a))},10)});
