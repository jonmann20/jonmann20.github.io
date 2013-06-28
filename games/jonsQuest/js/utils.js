utils = {
	playSound : function(sound) {
		if (sound.ended)
			sound.play()
		else {
			sound.pause()
			sound.currentTime = 0
			sound.play()
		}
	},

	debugLoop : function() {
		//print_r('hero')
		//print_r('lvlCollisionPts')
		//print_r('bullet')
		//print_r('monster')
		//print_r('lvl')
		//print_r('lvlBg')
		//print_r('lvlBgImg')
	},

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
	},
	
	drawEllipse : function(x, y, w, h) {
		var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w, // x-end
			ye = y + h, // y-end
			xm = x + w / 2, // x-middle
			ym = y + h / 2 // y-middle

		ctx.beginPath()
		ctx.moveTo(x, ym)
		ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
		ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
		ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
		ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
		ctx.closePath()
		ctx.fill()
	},

	muteHelper : function() {
		if ($('.audioState').hasClass('off')) {
			$('.audioState').html('On')
			$('.audioState').removeClass('off')
			$('.audioState').addClass('on')

			this.muteSound(false)
		} else {
			$('.audioState').html('Off')
			$('.audioState').removeClass('on')
			$('.audioState').addClass('off')

			this.muteSound(true)
		}
	},

	muteSound : function(mute) {
		// not working???
		// for(var i in game.sound){
		// i.muted = val
		// }

		var volumeReduction = mute ? 0 : 0.25

		game.sound.bgMusic.lvl0.muted = mute
		if (mute)
			game.sound.bgMusic.lvl0.pause()
		else
			game.sound.bgMusic.lvl0.play()
		//game.sound.bgMusic.lvl0.volume = volumeReduction

		game.sound.gun.muted = mute
		game.sound.gun.volume = volumeReduction

		game.sound.thud.muted = mute
		game.sound.thud.volume = volumeReduction

		game.sound.jump.muted = mute
		game.sound.jump.volume = volumeReduction

		game.sound.step.muted = mute
		game.sound.step.volume = volumeReduction
	},

	reset : function() {
		hero.x = 23
		hero.y = canvas.height - hero.h
		hero.isJumping = false

		if (game.lvl == 3) {// TODO: getting reset somewhere???
			hero.y = 0
		}

		monster.x = (Math.random() * (canvas.width - monster.w - monster.offset))
		monster.y = (Math.random() * (canvas.height - monster.h - monster.offset))
		monster.initX = monster.x
		monster.initY = monster.y

		bulletArr.length = 0
		++monster.numCaught
		upgrade.points += 2

		$('#upgradePoints').val(upgrade.points)
		$('#curLvl').val(game.lvl)
		$('#numCaught').val(monster.numCaught)
	},

	loadImages : function(imgArr, callback) {
		var count = 0
		for (var key in imgArr) {
			if (imgArr[key] != 'none') {
				lvlBgImg[key] = new Image()
				lvlBgImg[key].onload = function() {
					callback(this.num)
				}

				lvlBgImg[key].src = imgArr[key]
				lvlBgImg[key].num = count
			}
			
			++count
		}
	},

	// 8 versions over original each with 1/8 of full opacity (square filter)
	blur : function(numPasses, callback) {
		ctx.globalAlpha = 0.125;
		for (var i = 1; i <= numPasses; i++) {
			for (var y = -1; y < 2; y++) {
				for (var x = -1; x < 2; x++) {
					callback(x, y)
				}
			}
		}
		ctx.globalAlpha = 1.0
	}
}

// globals
bulletArr = [];

bullet = {
	color : "rgba(192, 192, 192, .75)",
	cost : 8,
	w : 19.5,
	h : 9,
	speed : 8
}

// Enums
Dir = Object.freeze({
	NONE : 0,
	TOP : 1,
	BOT : 2,
	LEFT : 3,
	RIGHT : 4
})

upgrade = {
	points : -2,
	msg : ' '
}

// global functions
requestAnimFrame = function() {
	return requestAnimationFrame || 
		   webkitRequestAnimationFrame || 
		   mozRequestAnimationFrame || 
		   oRequestAnimationFrame ||
		   
		   function(callback) {
		       setTimeout(callback, 1000 / game.fps)
	}
}()

print_r = function(name) {// can handle 3 lvls of nested arrays or objects
	var obj = window[name]
	
	var tmp;
	for (var i in obj) {
		if ( typeof obj[i] === 'object') {
			tmp += name + "." + i + ' = {<br />'

			for (var j in obj[i]) {
				tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + j + ' = '

				if ( typeof obj[i][j] === 'object') {
					tmp += ' {<br />'

					for (var k in obj[i][j]) {
						tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + k + ' = ' + obj[i][j][k] + '<br />'
					}

					tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />'
				} else
					tmp += obj[i][j] + '<br />'
			}

			tmp += '}<br />'
		} else
			tmp += name + "." + i + " = " + obj[i] + "<br />"

		tmp = tmp.replace("undefined", "")
		
		// remove unwanted opening undefined
		$(".debug").html(tmp)
	}
}