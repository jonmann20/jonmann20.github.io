game = function(){
	return {
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
				
			}, 1000 / game.fps)
		}
	}
	
	var time
	
	function update(){
		hero.update()
		//Monster.update()
			
		level.update()
	}
	
	function render(){
		level.render()
	    	
    	//Monster.render()
		hero.render()
	}
	
   	function drawFPS(num){
	    ctx.fillStyle = "rgba(23,23,23, 0.6)"
	    ctx.fillRect((canvas.width - 37), 1, 35, 14)
        ctx.fillStyle = "#e1e1e1"
        ctx.font = "9px Helvetica"
        ctx.fillText(num + " fps", (canvas.width - 31), 10);  
	}
}()
