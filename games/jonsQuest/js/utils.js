utils = function(){
	var alpha = 1,
		fadeOut = true
		
	
	return {
		
		/**************** Audio ***************/
		playSound : function(sound, stopPrev) {
			
			stopPrev = (typeof(stopPrev) !== 'undefined') ? stopPrev : true 
			
			if (sound.ended)
				sound.play()
			else {
				
				if(stopPrev || sound.currentTime == 0){
				
					sound.pause()
					sound.currentTime = 0
					sound.play()
				}
			}
		},
		
		muteHelper : function() {
			if ($('.audioState').hasClass('off')) {
				$('.audioState span').removeClass('icon-volume-mute').addClass('icon-volume-medium')
				$('.audioState').removeClass('off')
				$('.audioState').addClass('on')
	
				utils.muteSound(false)
			} 
			else {
				$('.audioState span').removeClass('icon-volume-medium').addClass('icon-volume-mute')
				$('.audioState').removeClass('on')
				$('.audioState').addClass('off')
	
				utils.muteSound(true)
			}
		},
	
		muteSound : function(mute) {
			// not working???
			// for(var i in game.sound){
			// i.muted = val
			// }
	
			game.sound.isOn = !mute
	
			var volumeReduction = mute ? 0 : 0.25
			switch(game.lvl){
				case -1:
				
					game.sound.bgMusic.start.muted = mute
					mute ?
						game.sound.bgMusic.start.pause():
						game.sound.bgMusic.start.play()
					
					//game.sound.bgMusic.start.volume = volumeReduction
				
					break
				case 0:
					game.sound.bgMusic.lvl0.muted = mute
					mute ?
						game.sound.bgMusic.lvl0.pause():
						game.sound.bgMusic.lvl0.play()
					
					//game.sound.bgMusic.lvl0.volume = volumeReduction
				break
			}
	
			game.sound.gun.muted = mute
			game.sound.gun.volume = volumeReduction
	
			game.sound.thud.muted = mute
			game.sound.thud.volume = volumeReduction
	
			game.sound.jump.muted = mute
			game.sound.jump.volume = volumeReduction
	
			game.sound.step.muted = mute
			game.sound.step.volume = volumeReduction
			
			game.sound.death.muted = mute
			game.sound.death.volume = volumeReduction
		},
		
		
		/*************** Interface ***************/
		blinkText: function(fontSize, x, y, str){
			
			str = (typeof(str) !== 'undefined') ? str : 'PRESS ENTER'
			
		    if(alpha <= 0)
		      fadeOut = false
		    else if(alpha > 1.55)
		      fadeOut = true
		    
		    var theDt = game.dt / 1000
		    
		    alpha += fadeOut ? -theDt : theDt
		    
		    // press enter
		    ctx.font = fontSize + "px 'Press Start 2P'"
		    var tmpW = ctx.measureText(str).width
		    ctx.fillStyle = 'rgba(233, 233, 233,' + alpha + ')'
		    ctx.fillText(str, x - tmpW/2, y)
		},
	
		
		/*************** Game Engine ***************/
		isCollision : function(a, b, moe, isLvl) {
			var aX = (typeof(isLvl) !== 'undefined')  ? a.x + a.lvlX : a.x
			
			if ((aX + moe <= (b.x + b.w)) && // a is to the left of the right side of b
				(b.x + moe <= (aX + a.w)) && // a is to the right of the left side of b
				(a.y + moe <= (b.y + b.h)) && // a is higher than the bot of b
				(b.y + moe <= (a.y + a.h)) 	  // a is lower than the top of b
			){
				return true
			}
	
			return false
		}
	}
}()
