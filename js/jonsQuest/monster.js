var Monster = {
	init: function(){
		monsterReady = false;
		monsterImage = new Image();
		
		monsterImage.onload = function() {monsterReady = true;};
		monsterImage.src = '../img/jonsQuest/monster.gif';
		
		monster = {
			numCaught: -1,
			initX: 0,
			initY: 0,
			x: 0,
			y: 0,
			w: 34,
			h: 49,
			offset: 25,
			movement: .5,
			down: true
		};
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
		if(monsterReady){
    	    ctx.drawImage(monsterImage, monster.x, monster.y);
    	}
	}
};
