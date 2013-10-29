!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-43015655-1","jonmann20.github.io"),ga("send","pageview");var utils=function(){return{degToRad:function(a){return.017453292519943295*a},printMouse:function(){$("canvas").on("mousemove",function(a){console.log(a.offsetX,a.offsetY)})},printDir:function(a){switch(a){case 0:console.log("Dir.NONE");break;case 1:console.log("Dir.TOP");break;case 2:console.log("Dir.BOT");break;case 3:console.log("Dir.LEFT");break;case 4:console.log("Dir.RIGHT");break;case 5:console.log("Dir.IN");break;default:console.log("Dir.unknown")}}}}(),Dir=Object.freeze({NONE:0,TOP:1,BOT:2,LEFT:3,RIGHT:4,IN:5}),Inv_e=Object.freeze({NOT_HIT:0,HIT_WHITE:1,HIT_RED:2}),KeyCode=Object.freeze({ENTER:13,J:74,K:75}),bullet={color:"rgba(0, 182, 255, .85)",w:19.5,h:9,speed:3.3};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(a){setTimeout(a,16.6666666667)}}();var audio=function(){return{bgMusic:new Audio("audio/firstChiptune/firstChiptune.mp3"),enterSound:new Audio("audio/synthetic_explosion_1.mp3"),itemPickedUp:new Audio("audio/life_pickup.mp3"),heartbeat:new Audio("audio/heartbeat.mp3"),jump:new Audio("audio/jump.mp3"),thud:new Audio("audio/thud.mp3"),step:new Audio("audio/step.mp3"),effort:new Audio("audio/woosh.mp3"),discovery:new Audio("audio/spell3.mp3"),enemyDeath:new Audio("audio/death.mp3"),heroDeath:new Audio("audio/DiscsOfTron_Cascade.mp3"),enchant:new Audio("audio/enchant.mp3"),isOn:!1,play:function(a,b){b="undefined"!=typeof b?b:!0,a.ended?a.play():(b||0===a.currentTime)&&(a.pause(),a.currentTime=0,a.play())},handleMuteButton:function(){$(".audioState").hasClass("off")?($(".audioState span").removeClass("icon-volume-mute").addClass("icon-volume-medium"),$(".audioState").removeClass("off"),$(".audioState").addClass("on"),audio.mute(!1)):($(".audioState span").removeClass("icon-volume-medium").addClass("icon-volume-mute"),$(".audioState").removeClass("on"),$(".audioState").addClass("off"),audio.mute(!0))},mute:function(a){audio.discovery.muted=audio.enterSound.muted=audio.bgMusic.muted=audio.itemPickedUp.muted=audio.heartbeat.muted=audio.effort.muted=audio.thud.muted=audio.jump.muted=audio.step.muted=audio.enemyDeath.muted=audio.heroDeath.muted=audio.enchant.muted=a,a?audio.bgMusic.pause():audio.bgMusic.play(),audio.isOn=!a}}}(),Graphics=function(){var a=1;return{ticker:1,tickerStep:.01,fadeOut:!1,blinkText:function(b,c,d,e){e="undefined"!=typeof e?e:"PRESS ENTER",(Graphics.ticker>=1.35||Graphics.ticker<=Graphics.tickerStep)&&(Graphics.fadeOut=!Graphics.fadeOut),a=Graphics.ticker>=1?1:Graphics.ticker<=Graphics.tickerStep?0:Graphics.ticker,ctx.font=b+"px 'Press Start 2P'";var f=ctx.measureText(e).width;ctx.fillStyle="rgba(233, 233, 233,"+a+")",ctx.fillText(e,c-f/2,d)},drawEllipse:function(a,b,c,d){var e=.5522848,f=c/2*e,g=d/2*e,h=a+c,i=b+d,j=a+c/2,k=b+d/2;ctx.beginPath(),ctx.moveTo(a,k),ctx.bezierCurveTo(a,k-g,j-f,b,j,b),ctx.bezierCurveTo(j+f,b,h,k-g,h,k),ctx.bezierCurveTo(h,k+g,j+f,i,j,i),ctx.bezierCurveTo(j-f,i,a,k+g,a,k),ctx.closePath(),ctx.fill()},drawRotate:function(a,b,c,d){ctx.save(),ctx.translate(b,c),ctx.rotate(utils.degToRad(d)),ctx.translate(.5*-a.width,.5*-a.height),ctx.drawImage(a,0,0),ctx.restore()}}}(),Physics=function(){return{blah:12,isCollision:function(a,b,c,d){var e="undefined"!=typeof d?a.x+a.lvlX:a.x;return e+c<=b.x+b.w&&b.x+c<=e+a.w&&a.y+c<=b.y+b.h&&b.y+c<=a.y+a.h?!0:!1},solidRectCollision:function(a,b){a!=Dir.NONE&&(a==Dir.LEFT?(hero.onObjX=b.x-hero.lvlX-hero.w,hero.onObjLvlX=hero.lvlX):a==Dir.RIGHT?(hero.onObjX=b.x-hero.lvlX+b.w,hero.onObjLvlX=hero.lvlX):a==Dir.TOP?(hero.onObjY=hero.y=b.y-hero.h,hero.isJumping=!1,hero.isOnObj=!0):a==Dir.BOT&&(hero.vY<-4&&audio.play(audio.thud,!0),hero.onObjY=hero.y=b.y+b.h,hero.jumpMod=0,hero.vY=0),(a==Dir.LEFT||a==Dir.RIGHT)&&(hero.x=hero.onObjX,hero.lvlX=hero.onObjLvlX))}}}(),GameObj=function(a,b,c,d,e){var f=null,g=!1;return"undefined"!=typeof e&&(f=new Image,f.onload=function(){g=!0},f.src=e),{initX:a,x:a,initY:b,y:b,w:c,h:d,vY:0,updatePos:function(){this.y<FULLH-game.padFloor-this.h?this.y+=this.vY:this.y=FULLH-game.padFloor-this.h},draw:function(){g?ctx.drawImage(f,this.x,this.y):(ctx.fillStyle="red",ctx.fillRect(this.x,this.y,this.w,this.h))},getImg:function(){return f}}},GameItem=function(){function a(){return function(){this.visible&&!this.collected&&b.apply(this)}}var b=null;return{collected:!1,holding:!1,visible:!0,val:-1,init:function(c,d,e){$.extend(this,c),this.val=d,"undefined"!=typeof e&&(this.visible=e),b=this.draw,this.draw=a()}}},Enemy=function(){function a(a){var b=a.w/d*a.health;ctx.fillStyle="red",ctx.fillRect(a.x,a.y-12,b,4)}function b(){return function(){(e||f)&&(d>1&&a(this),ctx.save(),f&&(ctx.globalAlpha=.3),c.apply(this),ctx.restore())}}var c=null,d=0,e=!0,f=!1,g=!0;return{active:!1,health:0,init:function(a,e){$.extend(this,a),this.health=d=e,c=this.draw,this.draw=b()},update:function(){if(f)this.x+=g?2:-2,this.y-=14,(this.x<0||this.x>FULLW)&&(f=!1);else{if(!e)return;this.active&&0===game.totalTicks%3&&(this.x<hero.x?++this.x:this.x>hero.x&&--this.x)}},death:function(){g=hero.dir==Dir.RIGHT,audio.enemyDeath.play(),hero.xp+=2,e=!1,f=!0}}},startScreen=function(){function a(){lastKeyDown==KeyCode.ENTER&&(++game.lvl,audio.enterSound.play(),audio.bgMusic.pause(),setTimeout(function(){audio.bgMusic=new Audio("audio/inspiredBySparkMan/sparkBoy.mp3"),audio.bgMusic.loop=!0,audio.bgMusic.volume=.45,audio.isOn?audio.bgMusic.play():audio.bgMusic.pause()},1e3),clearInterval(f),cancelAnimationFrame(g),game.start())}function b(){g=requestAnimFrame(b),ctx.fillStyle="#000",ctx.fillRect(0,0,FULLW,FULLH+game.padHUD),ctx.font="29px 'Press Start 2P'";var a=HALFW-ctx.measureText(c).width/2+11,f=58;ctx.setTransform(1,0,-.4,1.4,0,0),ctx.fillStyle="#222",ctx.fillText("J",a+4,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("J",a,f),ctx.setTransform(1,0,-.2,1.4,0,0),ctx.fillStyle="#222",ctx.fillText("O",a+32,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("O",a+28,f),ctx.setTransform(1,0,.05,1.41,0,-1),ctx.fillStyle="#222",ctx.fillText("N",a+58,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("N",a+54,f),ctx.setTransform(1,0,.23,1.4,0,0),ctx.fillStyle="#222",ctx.fillText("'",a+78,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("'",a+74,f),ctx.setTransform(1,0,.42,1.4,0,0),ctx.fillStyle="#222",ctx.fillText("S",a+95,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("S",a+91,f),ctx.font="36px 'Press Start 2P'",a=HALFW-ctx.measureText(d).width/2+30,f=98,ctx.setTransform(1,0,-.5,1.6,0,0),ctx.fillStyle="#222",ctx.fillText("Q",a+4,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("Q",a,f),ctx.setTransform(1,0,-.25,1.6,0,0),ctx.fillStyle="#222",ctx.fillText("U",a+26,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("U",a+22,f),ctx.setTransform(1,0,.03,1.6,0,0),ctx.fillStyle="#222",ctx.fillText("E",a+50,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("E",a+46,f),ctx.setTransform(1,0,.25,1.6,0,0),ctx.fillStyle="#222",ctx.fillText("S",a+74,f+3),ctx.fillStyle="#ff6a00",ctx.fillText("S",a+70,f),ctx.setTransform(1,0,.5,1.6,0,0),ctx.fillStyle="#222",ctx.fillText("T",a+90,f+4),ctx.fillStyle="#ff6a00",ctx.fillText("T",a+86,f),ctx.setTransform(1,0,0,1,0,0),Graphics.blinkText(22,HALFW,HALFH+81),ctx.font="13px 'Press Start 2P'",ctx.fillStyle="#ddd",ctx.fillText(e,HALFW-ctx.measureText(e).width/2,FULLH+44)}var c="JON'S",d="QUEST",e=String.fromCharCode("169")+" 2013 JON WIEDMANN",f=null,g=null;return{start:function(){f=setInterval(function(){Graphics.ticker+=Graphics.fadeOut?-Graphics.tickerStep:Graphics.tickerStep,a()},game.updateFPS),b()}}}(),level=function(){function a(){ctx.fillStyle="#070707",ctx.fillRect(0,FULLH,FULLW,game.padHUD),ctx.fillStyle="#ddd",ctx.font="12px 'Press Start 2P'",ctx.fillText("HP-"+hero.healthLvl,15,FULLH+24),ctx.fillText("MP-"+hero.manaLvl,15,FULLH+48),ctx.fillText("XP",15,FULLH+71),ctx.fillText(hero.medKits,210,FULLH+50),f.draw(),ctx.fillText(hero.manaKits,315,FULLH+50),e.draw(),ctx.fillText(hero.ammo,410,FULLH+50),c.draw(),ctx.fillText(hero.cash,515,FULLH+50),d.draw();var a=Math.floor(game.actualTime/60),b=game.actualTime%60;10>b&&(b="0"+b),10>a&&(a="0"+a),ctx.fillText(a+":"+b,FULLW-84,FULLH+34)}function b(a,b){var c=0;for(var d in a)"none"!==a[d]&&(i[d]=new Image,i[d].onload=function(){b(this.num)},i[d].src=a[d],i[d].num=c),++c}var c=null,d=null,e=null,f=null,g=5,h=new Array(g),i={};return{collisionPts:[],width:0,init:function(){f=GameObj(238,FULLH+31,25,24,"img/medKit.png"),e=GameObj(342,FULLH+31,25,25,"img/syringe.png"),c=GameObj(447,FULLH+32,24,24,"img/shuriken.png"),d=GameObj(548,FULLH+33,22,24,"img/cash.png"),level.collisionPts=[{obj0:{x:310,y:161,w:200,h:30},obj1:{x:600,y:95,w:200,h:30},obj2:{x:562,y:230,w:300,h:30}}];for(var a=0;g>a;++a)h[a]={status:!1,bgColor:"#"+Math.floor(16777215*Math.random()).toString(16)};b({lvl0:"img/lvl0.jpg",lvl1:"none"},function(a){h[a].status=!0}),level.reset(),lvl0.init()},reset:function(){level.width=3198,hero.x=23,hero.y=canvas.height-hero.h,hero.isJumping=!1,hero.bulletArr.length=0},update:function(){switch(game.lvl){case 0:lvl0.update()}},updateObjs:function(){switch(game.lvl){case 0:lvl0.updateObjs()}},render:function(){switch(h[game.lvl].status?ctx.drawImage(i["lvl"+game.lvl],hero.lvlX,0,FULLW,FULLH,0,0,FULLW,FULLH):(ctx.fillStyle=h[game.lvl].bgColor?h[game.lvl].bgColor:"#222",ctx.fillRect(0,0,FULLW,FULLH)),a(),game.lvl){case 0:lvl0.render()}},drawAfterHero:function(){0===game.lvl&&lvl0.crate.holding&&lvl0.crate.draw()}}}(),lvl0=function(){function a(){if(Physics.isCollision(hero,e,0)){var a=e.initY+e.h-hero.h,b=Math.abs(hero.lvlX-680);hero.onObj(f*b+a)}}var b=null,c=null,d=null,e=null,f=-.52845528455;return{init:function(){d=GameItem(),d.init(GameObj(680,71,20,24,"img/sack.png"),5),b=Enemy(),b.init(GameObj(1700,FULLH-game.padFloor-38+1,28,38,"img/cyborgBnW.png"),1),c=GameItem(),c.init(GameObj(140,50,22,24,"img/cash.png"),10,!1),lvl0.crate=GameItem(),lvl0.crate.init(GameObj(500,FULLH-game.padFloor-26,24,26,"img/crate.png")),e=GameObj(1100,80,340,190,"img/belt.png")},update:function(){if(c.updatePos(),b.update(),d.collected||Physics.isCollision(hero,d,0)&&(d.collected=!0,audio.itemPickedUp.play(),hero.ammo+=d.val),c.visible)c.collected||(c.visible&&(c.vY+=game.gravity),Physics.isCollision(hero,c,0)&&(c.collected=!0,audio.itemPickedUp.play(),hero.cash+=c.val));else for(var e=0;e<hero.bulletArr.length;++e)Physics.isCollision(hero.bulletArr[e],c,-17)&&(c.visible=!0,audio.discovery.play());if(lvl0.crate.holding?(lvl0.crate.x=hero.dir==Dir.RIGHT?hero.x+22:hero.x-22,lvl0.crate.y=hero.y):Physics.isCollision(hero,lvl0.crate,12)&&(hero.isCarrying=!0,lvl0.crate.holding=!0,lvl0.crate.vY=6.5),lvl0.crate.updatePos(),b.health>0){Physics.isCollision(hero,b,0)&&(b.active=!0,hero.invincible||(audio.play(audio.heartbeat,!0),hero.invincible=!0,--hero.health));for(var e=0;e<hero.bulletArr.length;++e){var f=!1;Physics.isCollision(hero.bulletArr[e],b,0)&&(f=!0,audio.play(audio.thud,!0)),f&&(b.active=!0,hero.bulletArr.splice(e,1),--b.health,b.health<=0&&b.death())}a()}},updateObjs:function(){d.x-=hero.vX,b.x-=hero.vX,c.x-=hero.vX,e.x-=hero.vX,lvl0.crate.x-=hero.vX},render:function(){d.collected||d.draw(),c.draw(),b.draw(),e.draw(),lvl0.crate.holding?0===hero.vX&&(lvl0.crate.x+=hero.dir==Dir.RIGHT?-20:24,lvl0.crate.y+=6):lvl0.crate.draw()}}}(),game=function(){function a(){hero.update(),level.update()}function b(a){a-e>0&&(game.renderTimeBtw=a-e),e=a,requestAnimFrame(b),level.render(),hero.render(),level.drawAfterHero(),c()}function c(){var a=1e3/game.renderTimeBtw;if("Infinity"!=a&&f.push(a),0===game.totalTicks%120){var b=0;for(var c in f)b+=f[c];d=f.length>0?Math.floor(b/f.length):0,f=[]}ctx.fillStyle="#ddd",ctx.font="12px 'Press Start 2P'",ctx.fillText(d+" FPS",FULLW-84,FULLH+65)}var d=0,e=0,f=[0];return{gravity:.07,padBot:119,padHUD:80,padFloor:39,lvl:-1,updateFPS:1e3/120,renderTimeBtw:0,totalTicks:0,actualTime:0,start:function(){setInterval(function(){++game.totalTicks,Graphics.ticker+=Graphics.fadeOut?-Graphics.tickerStep:Graphics.tickerStep,a()},game.updateFPS),b()}}}(),hero=function(){function a(){hero.invincible&&--hero.invincibleTimer,hero.invincibleTimer<=0&&(hero.invincible=!1,hero.invincibleTimer=hero.invincibleTimer0),hero.health<=0&&!i&&(audio.heroDeath.play(),audio.bgMusic.muted=!0,alert("You died"),location.reload(),i=!0)}function b(){0===game.totalTicks%30&&(h=!h);var a={x:0,y:0};hero.isCarrying&&0===hero.vX?a=j.playerDown:hero.dir==Dir.RIGHT?a=hero.vX>0?Math.abs(hero.vX)<=3.5*hero.aX?j.playerRight_Step:h?j.playerRight_Run1:j.playerRight_Run2:j.playerRight:hero.dir==Dir.LEFT&&(a=hero.vX<0?Math.abs(hero.vX)<=3.5*hero.aX?j.playerLeft_Step:h?j.playerLeft_Run1:j.playerLeft_Run2:j.playerLeft);var b=hero.invincibleTimer%40;hero.invincible&&b>=0&&16>=b&&(a={x:-1,y:-1}),hero.sx=a.x,hero.sy=a.y}function c(){f&&hero.sx>=0&&hero.sy>=0&&ctx.drawImage(g,hero.sx,hero.sy,hero.w,hero.h,hero.x,hero.y,hero.w,hero.h)}var d=null,e=null,f=!1,g=null,h=!0,i=!1,j=[];return{x:0,y:0,sx:0,sy:0,lvlX:0,w:28,h:38,vX:0,vY:0,maxVx:3.6,maxVy:10,aX:.17,aY:.5,jumpMod:4,jumpMod0:4,dir:Dir.RIGHT,isJumping:!1,isCarrying:!1,onGround:!0,isOnObj:!0,onObjX:-1,onObjY:-1,invincible:!1,invincibleTimer:120,invincibleTimer0:120,health:4,maxHealth:5,medKits:1,healthLvl:1,mana:0,maxMana:4,manaKits:1,manaLvl:1,ammo:20,cash:0,lvl:1,xp:0,xpNeeded:50,bulletArr:[],physics:null,init:function(){g=new Image,g.onload=function(){f=!0},g.src="../dungeon/web/img/sprites/player/player.png",$.get("../dungeon/web/img/sprites/player/player.xml",function(a){var b=$(a).find("sprite");$(b).each(function(){var a=$(this).attr("n"),b=$(this).attr("x"),c=$(this).attr("y");a=a.substring(0,a.length-4),j[a]={x:b,y:c}})}),d=HeroInputComponent(),d.init(),hero.physics=HeroPhysicsComponent(),e=HeroGraphicsComponent(),e.init()},onObj:function(a){hero.isJumping=!1,hero.isOnObj=!0,hero.y=a,hero.onObjY=a},offObj:function(){hero.isOnObj=!1,hero.onObjX=-1,hero.onObjY=-1},update:function(){d.check(),hero.physics.updatePosition(),hero.physics.checkCollision(),a(),b()},render:function(){c(),e.drawBullets(),e.drawHealth(),e.drawMana(),e.drawXP()}}}(),HeroGraphicsComponent=function(){var a=null,b=!1;return{init:function(){a=new Image,a.src="img/shuriken.png",a.onload=function(){b=!0}},drawBullets:function(){for(var b=0;b<hero.bulletArr.length;++b){var c=hero.bulletArr[b].dirR?hero.w:0;hero.bulletArr[b].deg+=5,Graphics.drawRotate(a,hero.bulletArr[b].x+c,hero.bulletArr[b].y+20,hero.bulletArr[b].deg)}},drawHealth:function(){for(var a=0;a<hero.health;++a)ctx.fillStyle="red",ctx.fillRect(80+21*a,FULLH+14,19,8)},drawMana:function(){for(var a=0;a<hero.mana;++a)ctx.fillStyle="#00b6ff",ctx.fillRect(80+21*a,FULLH+37,19,8)},drawXP:function(){ctx.fillStyle="#ddd",ctx.font="12px 'Press Start 2P'";var a=hero.xp<10?"0":"";ctx.fillText(a+hero.xp+"/"+hero.xpNeeded,80,FULLH+71)}}},HeroPhysicsComponent=function(){function a(){hero.onGround=!1,hero.y<-hero.h?(hero.y=-hero.h,hero.vY=0):hero.y>=canvas.height-game.padBot-hero.h?(hero.y=canvas.height-game.padBot-hero.h,hero.isJumping=!1,hero.onGround=!0,hero.vY=0):hero.isOnObj&&(hero.y=hero.onObjY,hero.vY=0),hero.x<0?(hero.x=0,hero.vX=0):hero.x>canvas.width-hero.w&&(hero.x=canvas.width-hero.w,hero.vX=0)}function b(){for(var a=0;a<hero.bulletArr.length;++a)hero.bulletArr[a].x+=hero.bulletArr[a].dirR?bullet.speed:-bullet.speed,(hero.bulletArr[a].x>canvas.width||hero.bulletArr[a].x<0)&&hero.bulletArr.splice(a,1)}function c(){var a=game.lvl,b=Dir.NONE;for(var c in level.collisionPts[a]){var d=level.collisionPts[a][c];if(b=hero.physics.objCollision(d),Physics.solidRectCollision(b,d),b!=Dir.NONE)break}b==Dir.NONE&&hero.offObj()}return{updatePosition:function(){hero.x!=hero.x+hero.vX&&audio.step.play(),(hero.dir==Dir.RIGHT&&hero.x>=canvas.width/2+35||hero.dir==Dir.LEFT&&hero.x<=canvas.width/2-45)&&hero.lvlX+hero.vX>=0&&hero.lvlX+hero.vX<=level.width-canvas.width?(hero.lvlX+=hero.vX,level.updateObjs()):hero.x+=hero.vX,hero.y+=hero.vY},checkCollision:function(){b(),a(),c()},objCollision:function(a){var b=Dir.NONE;return Physics.isCollision(hero,a,0,!0)&&(b=Dir.IN,hero.dir==Dir.RIGHT&&hero.lvlX-hero.x<a.x?b=Dir.LEFT:hero.x+hero.lvlX+hero.w>a.x+a.w&&(b=Dir.RIGHT),hero.x!=hero.onObjX&&hero.y+hero.h-(a.h/2+1)<a.y&&hero.vY>0||hero.isOnObj?b=Dir.TOP:hero.y+hero.h>a.y+a.h&&(b=Dir.BOT)),b}}},HeroInputComponent=function(){return{init:function(){keysDown={},lastKeyDown=-1,addEventListener("keydown",function(a){32==a.keyCode?a.preventDefault():77==a.keyCode?audio.handleMuteButton():66==a.keyCode?$(".resize").trigger("click"):75!=a.keyCode||hero.isJumping||75==lastKeyDown&&75 in keysDown||!hero.isOnObj&&!hero.onGround?74!=a.keyCode||74==lastKeyDown&&74 in keysDown||hero.ammo>0&&!hero.isCarrying&&(audio.play(audio.effort),hero.bulletArr[hero.bulletArr.length]={x:hero.x,y:hero.y,w:bullet.w,h:bullet.h,dirR:hero.dir==Dir.RIGHT,deg:0},--hero.ammo):(audio.jump.play(),hero.vY=0,hero.isJumping=!0,hero.offObj()),lastKeyDown=a.keyCode,keysDown[a.keyCode]=!0},!1),addEventListener("keyup",function(a){delete keysDown[a.keyCode]},!1)},check:function(){var a=!1;if(hero.isJumping?hero.jumpMod>0?hero.vY-=hero.aY*hero.jumpMod--:a=!0:(hero.jumpMod=hero.jumpMod0,a=!0),a){var b=hero.vY+2*game.gravity;hero.vY=b>hero.maxVY?hero.maxVy:b}var c=!1;65 in keysDown&&(hero.vX=Math.abs(hero.vX-hero.aX)>hero.maxVx?-hero.maxVx:hero.vX-hero.aX,hero.dir=Dir.LEFT,c=!0),68 in keysDown&&(hero.vX=Math.abs(hero.vX+hero.aX)>hero.maxVx?hero.maxVx:hero.vX+hero.aX,hero.dir=Dir.RIGHT,c=!0),Math.abs(hero.vX)<hero.aX?hero.vX=0:c||(hero.vX/=1.26),32 in keysDown&&(lvl0.crate.holding=!1,hero.isCarrying=!1),72 in keysDown&&hero.medKits>0&&hero.health<hero.maxHealth&&(++hero.health,--hero.medKits,audio.play(audio.enchant,!0)),82 in keysDown&&!(17 in keysDown)&&hero.manaKits>0&&hero.mana<hero.maxMana&&(++hero.mana,--hero.manaKits,audio.play(audio.enchant,!0))}}},Main=function(){function a(){canvas=$("canvas")[0],ctx=canvas.getContext("2d"),FULLW=canvas.width,FULLH=canvas.height,FULLH-=game.padHUD,HALFW=FULLW/2,HALFH=FULLH/2}function b(){audio.bgMusic.loop=!0,audio.bgMusic.volume=.7,audio.bgMusic.pause(),audio.enemyDeath.volume=.6,audio.jump.volume=.4,audio.thud.volume=.78,audio.discovery.volume=.7,audio.mute(!0),$(".audioState").on("click",audio.handleMuteButton);var a=!1;$(".resize").on("click",function(){if(a)$(canvas).css({width:"",height:""}),$(this).attr("class","resize off"),$(this).children("span").attr("class","icon-expand");else{$(canvas).css({width:"100%"});var b=$(canvas).width();$(canvas).css({height:.611*b}),$(this).attr("class","resize on"),$(this).children("span").attr("class","icon-contract")}a=!a}),audio.handleMuteButton()}function c(){ctx.fillStyle="#e1e1e1",ctx.font="25px 'Press Start 2P'",ctx.fillText("LOADING...",HALFW-80,HALFH+20)}return{init:function(){a(),b(),c(),level.init(),hero.init(),setInterval(function(){++game.actualTime},1e3),console.log("which file2"),startScreen.start()}}}();$(function(){Main.init()});