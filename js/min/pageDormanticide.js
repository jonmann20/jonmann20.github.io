function Input(){keysDown={},lastKeyUp=KeyCode.EMPTY,addEventListener("keydown",function(a){keysDown[a.keyCode]=!0},!0),addEventListener("keyup",function(a){lastKeyUp=a.keyCode,delete keysDown[a.keyCode]},!1)}function BattleView(a,b,c){this.bgColor=a,this.dormantL=b,this.dormantR=c}function Dormant(a,b,c,d,e,f){this.name=a,this.atk=b,this.def=c,this.initHP=this.hp=d,this.actions=e,this.lvl="undefined"!=typeof f?f:1}!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-43015655-1","jonmann20.github.io"),ga("send","pageview");var GameEngine=function(){function a(){view.update()}function b(){requestAnimationFrame(b),view.render()}canvas=document.getElementsByTagName("canvas")[0],ctx=canvas.getContext("2d"),input=new Input;var c=[FightAction.TACKLE,FightAction.DRAGONS_BREATH,null,null],d=new Dormant("MALAISE",12,8,27,c),e=new Dormant("ERABOR",8,12,23,c);return view=new BattleView("#ddd",d,e),{start:function(){setInterval(a,1e3/60),requestAnimationFrame(b)},stop:function(){}}},KeyCode=Object.freeze({ENTER:13,CTRL:17,A:65,D:68,F:70,H:72,J:74,K:75,M:77,O:79,R:82,S:83,W:87,EMPTY:-1,SPACEBAR:32});BattleView.prototype=function(){function a(a,b,c){ctx.fillStyle="#000",ctx.fillText(a.name+"  L"+a.lvl,b+40,c),ctx.fillText("HP",b,c+20),ctx.strokeStyle="#000",ctx.strokeRect(b+20,c+12,100,10),ctx.fillStyle="red",ctx.fillRect(b+21,c+13,a.hp*(100/a.initHP)-1,8)}function b(a){ctx.strokeStyle="#000",ctx.strokeRect(20,300,500,250),ctx.fillStyle="#000",ctx.fillText("ATK: "+a.atk,460,320),ctx.fillText("DEF: "+a.def,460,340)}function c(a){ctx.fillStyle="#000";for(var b=0;4>b;++b)null===a.actions[b]?ctx.fillText("--",80,350+30*b):ctx.fillText(a.actions[b].name,80,350+30*b)}function d(){ctx.fillStyle="#000",ctx.fillText(">>",e.x,e.y)}var e={x:43,y:350,curSlot:0};return{update:function(){switch(lastKeyUp){case KeyCode.ENTER:this.dormantR.hp-=this.dormantL.atk*this.dormantL.actions[e.curSlot].multiplier/this.dormantR.def,lastKeyUp=KeyCode.EMPTY;break;case KeyCode.W:0!==e.curSlot&&null!==this.dormantL.actions[e.curSlot-1]&&(--e.curSlot,e.y-=30);break;case KeyCode.S:3!==e.curSlot&&null!==this.dormantL.actions[e.curSlot+1]&&(++e.curSlot,e.y+=30)}},render:function(){ctx.fillStyle=this.bgColor,ctx.fillRect(0,0,canvas.width,canvas.height),a(this.dormantL,10,15),b(this.dormantL),c(this.dormantL),d(),a(this.dormantR,canvas.width-130,15)}}}();var FightAction=Object.freeze({TACKLE:{name:"TACKLE",multiplier:1},HEAL:{name:"HEAL",multiplier:1},DRAGONS_BREATH:{name:"DRAGONS_BREATH",multiplier:5}}),game=new GameEngine;game.start();