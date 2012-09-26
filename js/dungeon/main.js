var setupFps = function(){
    var lastTime = new Date();
    var hits = 0;
    var fps = '00';
    var hit = function(){
        hits++;
        var nowTime = new Date();
        if (nowTime.getTime() - lastTime.getTime() > 1000){
            var dt = nowTime.getTime() - lastTime.getTime();
            fps = '' + Math.round(hits * 1000 / dt);
            hits = 0;
            lastTime = nowTime;
        }
        return fps;
    };
    return hit;
};
var hit = setupFps();

/********** Game Class **********/
function Game(name, keysDown, canvas, ctx, hero, monster) { 		// define a class and constructor
     this.name = name; 			// create and init an instance property
     this.keysDown = keysDown;
     this.canvas = canvas;
     this.ctx = ctx;
     this.hero = hero;
     this.monster = monster;
};
Game.prototype.constructor = Game;

Game.prototype = {
	init: function() {
		addEventListener("keydown", function (e) {this.keysDown[e.keyCode] = true;}, false);
        addEventListener("keyup", function (e) {delete this.keysDown[e.keyCode];}, false);
		
		this.hero.print();
		this.hero.draw();
		
		this.monster.print();
		this.monster.draw();
	},

	gameLoop: function() {
		Game.prototype.update();
		Game.prototype.render();
	},

	update: function() {
		if (87 in this.keysDown) { // Player holding up (w)
			this.hero.y -= 3;
		}
		if (83 in this.keysDown) { // Player holding down (s)
			this.hero.y += 3;
		}
		if (65 in this.keysDown) { // Player holding left (a)
		    this.hero.x -= 3;
		}
		if (68 in this.keysDown) { // Player holding right (d)
		    this.hero.x += 3;
		}
	 },

	render: function() {
        this.ctx.fillStyle = '#222';        
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.hero.draw();
		this.ctx.fillText(this.hit() + " fps", (this.canvas.width - 38), 10);
	}
};


/********** GameObj Class (extends Game) **********/
function GameObj(name, width, height, strength, x, y) { 
	Game.call(this, name); 	// call the superclass constructor
	
	this.width = width; 
	this.height = height;
	this.strength = strength;
	this.x = x;
	this.y = y;
};
GameObj.prototype = Object.create(Game.prototype); // inherit
GameObj.prototype.constructor = GameObj;

GameObj.prototype = {
	init: function() { 
     	// ...
    },

	print: function() {
		for(var x in this){
			
			if(x == 'name')
				var name = this[x];
			else if(typeof(this[x]) != "function")
	     		console.log(name + "." + x + ": " + this[x]);
	     }
	     
	     console.log(" ");
    },

	draw: function() {
		//ctx.fillStyle = 'yellow';		
		//ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};


/********** main **********/
$(function(){
	var canvas = $('canvas')[0];
	var ctx = canvas.getContext("2d");
	
	var keysDown = {};
	
	var hero = new GameObj('hero', 30, 30, 2, canvas.width/2, canvas.height/2);
	var monster = new GameObj('monster', 45, 80, 10, 100, 50);
	
	var g = new Game('dungeon', keysDown, canvas, ctx, hero, monster);
	//g.init();
	
	
	
	//setInterval(g.gameLoop, 1000/30);
});



