startScreen = function(){
	
	var _time = 0
	
	function update(){
		if(13 in keysDown){
			game.loop()		// start game
		}
		else {
			requestAnimFrame(startScreen.loop)
		}
	}
	
	function render(){
		ctx.fillStyle = "#000"
		ctx.fillRect(0,0,FULLW, FULLH+game.padHUD)
		
		ctx.font = "36px 'Press Start 2P'"
		ctx.fillStyle = "#ff6a00"
		ctx.fillText("JON'S QUEST", HALFW - 190, HALFH - 80)
		
		
		utils.blinkText(28, HALFW, HALFH + 80)
	}
	
	return {
		loop: function(){
			update()
			render()
			
			var now = new Date().getTime()    
            game.dt = now - (_time || now)		// using game.dt avoids modifying utils method
	    	_time = now
			
		}
	}
}()
