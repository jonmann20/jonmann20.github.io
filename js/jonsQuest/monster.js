monster = function(){
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
		imgReady: false,
		img: null,
		
		init: function(){
			monster.img = new Image()
			
			monster.img.onload = function() {monster.imgReady = true}
			monster.img.src = '../img/jonsQuest/monster.gif'
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
			if(monster.imgReady){
	    	    ctx.drawImage(monster.img, monster.x, monster.y);
	    	}
		}
	}
}()
