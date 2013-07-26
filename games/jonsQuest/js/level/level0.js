lvl0 = function() {

	var cyborg = null,
		hiddenCash = null,
		sack = null,
		belt = null
		

	return {

		init: function() {
			var sack_g = GameObj()
			sack_g.init(680, 71, 20, 24, 'img/sack.png')
				sack = GameItem()
				sack.init(sack_g, 5)

			var cyborg_g = GameObj()
			cyborg_g.init(2100, FULLH - game.padFloor - 38 + 3, 28, 38, 'img/cyborgBnW.png')
				cyborg = Enemy()
				cyborg.init(cyborg_g)

			var hCash_g = GameObj()
			hCash_g.init(140, 50, 22, 24, 'img/cash.png')
				hiddenCash = GameItem()
				hiddenCash.init(hCash_g, 10, false)

			var crate_g = GameObj()
			crate_g.init(400, FULLH - game.padFloor - 27, 25, 27, 'img/crate.png')				lvl0.crate = GameItem()
				lvl0.crate.init(crate_g)
				
			belt = GameObj()
			belt.init(1300, 80, 340, 190, 'img/belt.png')
		},

		update: function() {

			hiddenCash.updatePos()
			cyborg.update()

			// sack
			if (!sack.collected) {
				if (utils.isCollision(hero, sack, 0)) {
					sack.collected = true

					hero.ammo += sack.val
					//util.drawValPopup(hero.ammo, 'ammo')
				}
			}

			// hidden cash
			if (!hiddenCash.visible) {
				for (var i = 0; i < hero.bulletArr.length; ++i) {
					if (utils.isCollision(hero.bulletArr[i], hiddenCash, -17)) {
						hiddenCash.visible = true
						hiddenCash.vY = 3
					}
				}
			} 
			else if (!hiddenCash.collected) {
				if (utils.isCollision(hero, hiddenCash, 0)) {
					hiddenCash.collected = true
					hero.cash += hiddenCash.val
				}
			}

			// crate
			if (!lvl0.crate.holding) {
				if (utils.isCollision(hero, lvl0.crate, 12)) {
					lvl0.crate.holding = true
					lvl0.crate.vY = 6.5
				}
			} 
			else {
				if(hero.dirR)				
					lvl0.crate.x = hero.x + 22
				else
					lvl0.crate.x = hero.x - 22
					
				lvl0.crate.y = hero.y
			}
			lvl0.crate.updatePos()
			

			// cyborg
			if (utils.isCollision(hero, cyborg, 0)) {
				cyborg.active = true
			}

		},

		updateObjs: function() {
			sack.x -= hero.vX
			cyborg.x -= hero.vX
			hiddenCash.x -= hero.vX
			belt.x -= hero.vX
			lvl0.crate.x -= hero.vX
		},

		render: function() {

			if (!sack.collected)
				sack.draw()

			hiddenCash.draw()
			cyborg.draw()
			belt.draw()
			
			if(!lvl0.crate.holding)
				lvl0.crate.draw()
		}
	}

}()