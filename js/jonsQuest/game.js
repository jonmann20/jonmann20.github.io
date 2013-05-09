var Game = {
	init: function(){
		game = {
			gravity: 1,
			friction: 1,
			lvl: 0,
			fps: 60,
			sound: {
			    bgMusic: {
			         lvl0: new Audio('../audio/sweetAcoustic.mp3')
			    },
			    gun: new Audio('../audio/raygun.mp3'),
			    thud: new Audio('../audio/thud.mp3'),
			    step: new Audio('../audio/step.mp3'),
			    jump: new Audio('../audio/jump.mp3')
			}
		};
		
		this.load();
	},
	
	load: function(){
		level.setup();
		utils.setGlobals();
	},
	
	/******************** Update ********************/
	update: function(){
		Hero.update();
		Monster.update();
		
		level.update();
	},
	
	/******************** Render ********************/
	render: function(){
		level.render();
    	
    	Monster.render();
		Hero.render();
	},
   
   	drawFPS: function(num){
	    ctx.fillStyle = "rgba(23,23,23, 0.6)";
	    ctx.fillRect((canvas.width - 37), 1, 35, 14);
        ctx.fillStyle = "#e1e1e1";
        ctx.font = "9px Helvetica";
        ctx.fillText(num + " fps", (canvas.width - 31), 10);   
	}
};

// global functions
var time;
var gameLoop = function () {
	setTimeout(function(){
		requestAnimFrame(gameLoop);
	
		var now = new Date().getTime(),
             dt = now - (time || now);
 
    	time = now;

		Game.update();
		Game.render();
		Game.drawFPS(Math.round(1000 / dt));
		
	}, 1000 / game.fps);
};
