monster = function(){
	var imgReady = false,
		img = null
	
	return {
		numCaught: -1,
		initX: 0,
		initY: 0,
		x: 0,
		y: 0,
		w: 34,
		h: 49,
		offset: 25,
		movement: .5,
		down: true,
		
		init: function(){
			img = new Image()
			
			img.onload = function() {imgReady = true}
			img.src = 'img/monster.gif'
		},
		
		update: function(){
			if(monster.down)
				monster.y += monster.movement;
			else	
				monster.y -= monster.movement;
	
			if(monster.y == (monster.initY + monster.offset))
				monster.down = false;
			else if(monster.y == (monster.initY - monster.offset))
				monster.down = true;
		},
	
		render: function(){
			if(imgReady){
	    	    ctx.drawImage(img, monster.x, monster.y);
	    	}
		}
	}
}()
