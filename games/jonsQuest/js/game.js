game = function(){
	var	avgFPS = 0,
		time,
		fpsHistory = [0]
	
	function update(){
		hero.update()
		monster.update()
			
		level.update()
	}
	
	function render(){
		level.render()
	    	
    	monster.render()
		hero.render()
	}
	
   	function drawFPS(num){
	    //ctx.fillStyle = "rgba(23,23,23, 0.7)"
	    //ctx.fillRect((FULLW - 37), FULLH + game.padHUD - 1, 35, 14)
	    
        ctx.fillStyle = "#ddd"
        ctx.font = "12px 'Press Start 2P'"
        
    	if(num != 'Infinity')
        	fpsHistory.push(num)
        	
        if(game.totalTime % 20 == 0){
        	var tot = 0
        	for(var i in fpsHistory){
        		tot += fpsHistory[i]
        	}
        	
        	avgFPS = Math.floor(tot / fpsHistory.length)
        	fpsHistory = []
        }
    	
	  	ctx.fillText(avgFPS + " FPS", (FULLW - 85), FULLH + 66);
	}
	
	return {
		gravity: 1,
		friction: 1,
		padBot: 119,	/* total padding */
		padHUD: 80,
		lvl: 0,
		fps: 60,
		totalTime: 0,
		actualTime: 0,
		sound: {
		    bgMusic: {
		         lvl0: new Audio('audio/sweetAcoustic.mp3')
		    },
		    gun: new Audio('audio/raygun.mp3'),
		    thud: new Audio('audio/thud.mp3'),
		    step: new Audio('audio/step.mp3'),
		    jump: new Audio('audio/jump.mp3')
		},
		
		loop: function(){
			setTimeout(function(){
				requestAnimFrame(game.loop)
			
				var now = new Date().getTime(),
		             dt = now - (time || now)
		 
		    	time = now
		
				update()
				render()
				
				drawFPS(Math.round(1000 / dt))
				
				++game.totalTime
				
			}, 1000 / game.fps)
		}
	}
}()
