startScreen = function(){
	
	var _time = 0,
		copyTitle = "JON'S QUEST",
		copyLine = "© 2013 JON WIEDMANN"
	
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
		
		// title
		ctx.fillStyle = "#222"
		ctx.fillText(copyTitle, HALFW - ctx.measureText(copyTitle).width / 2 + 4, 94)
		
		ctx.fillStyle = "#ff6a00"
		ctx.fillText(copyTitle, HALFW - ctx.measureText(copyTitle).width / 2, 90)
		
		// p enter
		utils.blinkText(25, HALFW, HALFH + 80)
		
		// copy
		ctx.font = "13px 'Press Start 2P'"
		ctx.fillStyle = "#ddd"
		
		ctx.fillText(copyLine, HALFW - ctx.measureText(copyLine).width / 2, FULLH + 44)		
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
