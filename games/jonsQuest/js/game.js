game = function(){
	var	avgFPS = 0,
		_time,
		fpsHistory = [0]
	
	function update(){
		hero.update()
		level.update()
	}
	
	function render(){
		level.render()
		hero.render()
		
		level.drawAfterHero()
	}
	
   	function drawFPS(num){
	    //ctx.fillStyle = "rgba(23,23,23, 0.7)"
	    //ctx.fillRect((FULLW - 37), FULLH + game.padHUD - 1, 35, 14)
	    
        ctx.fillStyle = "#ddd"
        ctx.font = "12px 'Press Start 2P'"
        
    	if(num != 'Infinity')
        	fpsHistory.push(num)
        	
        if(game.totalTicks % 20 == 0){
        	var tot = 0
        	for(var i in fpsHistory){
        		tot += fpsHistory[i]
        	}
        	
        	avgFPS = Math.floor(tot / fpsHistory.length)
        	fpsHistory = []
        }
    	
	  	ctx.fillText(avgFPS + " FPS", FULLW - 84, FULLH + 65);
	}
	
	
	return {
		gravity: 1,
		friction: 0.4,
		padBot: 119,	/* total padding */
		padHUD: 80,
		padFloor: 39,
		lvl: 0,
		dt: 0,
		fps: 60,
		totalTicks: 0,
		actualTime: 0,
		sound: {
		    bgMusic: {
		         lvl0: new Audio('audio/firstChiptune/firstChiptune.mp3')
		    },
		    gun: new Audio('audio/raygun.mp3'),
		    thud: new Audio('audio/thud.mp3'),
		    step: new Audio('audio/step.mp3'),
		    jump: new Audio('audio/jump.mp3'),
		    death: new Audio('audio/DiscsOfTron_Cascade.mp3')
		},
		
		loop: function(frameTime){
			//setTimeout(function(){
				requestAnimFrame(game.loop)
			
				var now = frameTime
	            game.dt = now - (_time || now)
		 
		    	_time = now
		
				update()
				render()
				
				
				drawFPS(Math.round(1000 / game.dt))
				
				++game.totalTicks
				
				if(game.totalTicks % 60 == 0)
					++game.actualTime
				
			//}, 1000 / game.fps)
		}
	}
}()


window.requestAnimFrame = function() {
	return window.requestAnimationFrame || 
		   window.webkitRequestAnimationFrame || 
		   window.mozRequestAnimationFrame || 
		   window.oRequestAnimationFrame ||
		   
		   function(callback) {
		       setTimeout(callback, 1000 / game.fps)
	}
}()
