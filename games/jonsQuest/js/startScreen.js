startScreen = function(){
	
    var _time = 0,
		copyTitle1 = "JON'S",
		copyTitle2 = "QUEST",
		copyLine = "© 2013 JON WIEDMANN"
    ;
	
	function update(){
		if(13 in keysDown){
			
		    ++game.lvl;
			
			game.sound.bgMusic.start.pause();
			game.sound.bgMusic.lvl0.loop = true;
	        
			game.sound.isOn ?
	           	game.sound.bgMusic.lvl0.play() :
	           	game.sound.bgMusic.lvl0.pause();
			
			
			game.loop();		// start game
		}
		else {
		    requestAnimFrame(startScreen.loop);
		}
	}
	
	function render(){
	    ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, FULLW, FULLH + game.padHUD);
		
		//---- title
		
		// title 1
		ctx.font = "29px 'Press Start 2P'";
		var startX = HALFW - ctx.measureText(copyTitle1).width / 2 + 11,
			startY = 58;
		
		ctx.setTransform(1, 0, -0.4, 1.4, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText('J', startX+4, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('J', startX, startY);
		ctx.setTransform(1, 0, -0.2, 1.4, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText('O', startX+32, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('O', startX+28, startY);
		ctx.setTransform(1, 0, 0.05, 1.41, 0, -1);
			ctx.fillStyle = "#222";
			ctx.fillText('N', startX+58, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('N', startX+54, startY);
		ctx.setTransform(1, 0, 0.23, 1.4, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText("'", startX+78, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText("'", startX+74, startY);
		ctx.setTransform(1, 0, 0.42, 1.4, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText('S', startX+95, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('S', startX+91, startY);
	
		
		// title 2
		ctx.font = "36px 'Press Start 2P'";
		startX = HALFW - ctx.measureText(copyTitle2).width / 2 + 30;
		startY = 98;
		
		ctx.setTransform(1, 0, -0.5, 1.6, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText('Q', startX+4, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('Q', startX, startY);
		ctx.setTransform(1, 0, -0.25, 1.6, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText('U', startX+26, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('U', startX+22, startY);
		ctx.setTransform(1, 0, 0.03, 1.6, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText('E', startX+50, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('E', startX + 46, startY);
		ctx.setTransform(1, 0, 0.25, 1.6, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText('S', startX+74, startY+3);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('S', startX + 70, startY);
		ctx.setTransform(1, 0, 0.5, 1.6, 0, 0);
			ctx.fillStyle = "#222";
			ctx.fillText('T', startX+90, startY+4);
			ctx.fillStyle = "#ff6a00";
			ctx.fillText('T', startX + 86, startY);
		ctx.setTransform(1,0,0,1,0,0);	// reset
		
		//---- press enter
		utils.blinkText(22, HALFW, HALFH + 81)
		
		//---- copyright
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
