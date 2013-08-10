load = function(){
	function setupMeta(){
		canvas = $('canvas')[0]
		ctx = canvas.getContext('2d')
		FULLW = canvas.width = 720
		FULLH = canvas.height = 440
		FULLH -= game.padHUD
		
		HALFW = FULLW / 2
		HALFH = FULLH / 2
		
		game.sound.bgMusic.start.loop = true
		game.sound.bgMusic.start.pause()
		
        utils.muteSound(true)
        
        $('.audioState').on('click', function(){
			utils.muteHelper()
        })
        
        //----- for testing audio -----
        //utils.muteHelper()
        
		// loading screen
		ctx.fillStyle = "#e1e1e1"
		ctx.font = "25px Helvetica"
		ctx.fillText('Loading...', 150, canvas.height/2)
		
		setupInput()
	}
	
	function setupInput(){
		// global key input
		keysDown = {}
		
		addEventListener('keydown', function (e) {
		    if(e.keyCode == 32)
		    	e.preventDefault() 		// space bar scrolling to bottom of page
		    else if(e.keyCode == 77)	// 'm' => mute/unmute
		    	utils.muteHelper()
		    	
		    	
		    keysDown[e.keyCode] = true
		}, false)
		
		addEventListener('keyup', function (e) {delete keysDown[e.keyCode]}, false)
	}
	
	return {
		
		/*
			REQUIRES: game and hero singleton objects already instantiated
		*/
		init: function(){
			setupMeta()
			
			level.init()
			hero.init()
			
	    	startScreen.loop()
	    	//game.loop()
		}
	}
}()


$(function(){
	load.init()		// pre-load game
})
