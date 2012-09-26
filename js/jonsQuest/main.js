/************ Utils **********************/

// can handle three levels deep of nested arrays or objects
var print_r = function(name) {
	var obj = window[name];
	
	var tmp;
	for(var i in obj){
		if(typeof obj[i] === 'object'){
			tmp += name + "." + i + ' = {<br />';
			
			for(var j in obj[i]){
				tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
						j + ' = ';
						
					
				if(typeof obj[i][j] === 'object'){
					tmp += ' {<br />';
					
					for(var k in obj[i][j]){
						tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
								k + ' = ' + obj[i][j][k] + '<br />';
					}
					
					tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />';
				}
				else {
					tmp += obj[i][j] + '<br />';
				}
			}
			
			tmp += '}<br />';
		}
		else {
			tmp += name + "." + i + " = " + obj[i] + "<br />";
		}
		
		tmp = tmp.replace("undefined",""); // remove unwanted opening undefined
		$(".debug").html(tmp);
	}
};

var slowLoop = function(){
    // upgrade store
    $("#upgradePoints").val(upgrade.points);
    $("#bulletSpeed").val(bullet.speed);        
    $("#bulletCost").val(bullet.cost);  
    $("#heroSpeed").val(hero.speed);    
    $("#heroSpeedCost").val(hero.speedCost);
    $("#heroJump").val(hero.jumpPower); 
    $("#heroJumpCost").val(hero.jumpCost);  
    $("#curLvl").val(game.lvl); 
    $("#numCaught").val(monster.numCaught); 
    $("#gameMsg").text(upgrade.msg); 
    
    // debug
	//print_r('hero');
	//print_r('lvlCollisionPts');
	//print_r('bullet');
	//print_r('monster');
	//print_r('lvl');
	//print_r('lvlBg');
	//print_r('lvlBgImg');
};

var loadImages = function(imgArr, callback) {
	var count = 0;
    for(var key in imgArr) {
    	lvlBgImg[key] = new Image();
        lvlBgImg[key].onload = function() {
        	callback(this.num);
        };
        
        lvlBgImg[key].src = imgArr[key];
        lvlBgImg[key].num = count;
        count++;
    }
};

var reset = function () {
	hero.x = game.padding;
	hero.y = canvas.height - hero.height - game.padding;
	hero.initX = hero.x;
	hero.initY = hero.y;

	monster.x = game.padding + (Math.random() * (canvas.width - monster.width - monster.offset));
	monster.y = game.padding + (Math.random() * (canvas.height - monster.height - monster.offset));
	monster.initX = monster.x;
	monster.initY = monster.y;
	
    bulletArr.length = 0;
};

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

/********************* Initial Load ******************/
// sprites
var heroReadyL = false;
var heroReadyR = false;
var heroImgL = new Image();
var heroImgR = new Image();

var monsterReady = false;
var monsterImage = new Image();

var hoverCraftReady = false;
var hoverCraftImage = new Image();

// keys
var keysDown = {};

// levels
var recentLvlUpdate = 0;
var NUM_LEVELS = 5;
var lvlBgImg = {};
var lvl = new Array(NUM_LEVELS);
var lvlBg = {
	lvl0: "../img/jonsQuest/platforms.png",
	lvl1: "none",
    lvl2: "../img/jonsQuest/lvl2.jpg",
    lvl3: "none",
    lvl4: "../img/jonsQuest/lvl4.png"
};
var lvlCollisionPts = {
	lvl0: {	
		obj0: {
			x1: 79,
			x2: 173,
			y1: 72,
			y2: 180,
			w: 93,
			h: 108
		},
		obj1: {
			x1: 318,
			x2: 566,
			y1: 50,
			y2: 71,
			w: 0,
			h: 21
		}
	},
	lvl1: {
		obj0: {
			x1: 0,
			x2: 0,
			y1: 0,
			y2: 0
		}
		
	}
};


// bullets
var bulletArr = [];

var load = {
	init:function(w){
		this.meta(w);
		this.imgs();
		this.loadingScreen();
		this.input();
		this.levels();
		this.gameObjs();
		this.pageElems();
		
		this.postLoad();
	},
	
	meta:function(w){
		canvas = $('canvas')[0];
		ctx = canvas.getContext("2d");
		canvas.width = w;
		canvas.height = 180;
	}, 
	
	loadingScreen:function(){
		ctx.fillStyle = "#e1e1e1";
		ctx.font = "25px Helvetica";
		ctx.fillText("Taking longer than normal ...", canvas.width/2, canvas.height/2);
	},
	
	imgs:function(){
		heroImgL.onload = function () {heroReadyL = true;};
		heroImgL.src = "../img/jonsQuest/heroL.gif";
		heroImgR.onload = function () {heroReadyR = true;};
		heroImgR.src = "../img/jonsQuest/heroR.gif";
		
		monsterImage.onload = function () {monsterReady = true;};
		monsterImage.src = "../img/jonsQuest/monster.gif";
		
		hoverCraftImage.onload = function () {hoverCraftReady = true;};
		hoverCraftImage.src = "../img/jonsQuest/hovercraft.png";
	},
	
	input:function(){
		addEventListener("keydown", function (e) {
		    
		    if(e.keyCode == 32)
		      e.preventDefault(); // space bar scrolling to bottom of page
		      
		    keysDown[e.keyCode] = true;
		}, false);
		addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);
	},
	
	levels:function(){
		for(var i=0; i < NUM_LEVELS; i++){
			lvl[i] = {
				monsters: i*2,
				status: false,
				bgColor: '#'+Math.floor(Math.random()*16777215).toString(16)
			}
		}
		
		loadImages(lvlBg, function(num) {
			lvl[num].status = true;		
		});
	},
	
	gameObjs:function(){
		game = {
			gravity: 10,
			lvl: 0,
			fps: 60,
			padding: 5,
			sound: {
			    bgMusic: {
			        lvl0: new Audio('../audio/sweetAcoustic.mp3')
			    },
			    gun: new Audio('../audio/raygun.mp3'),
			    thud: new Audio('../audio/thud.mp3'),
			    step: new Audio('../audio/step.mp3'),
			    jump: new Audio('../audio/bounce.mp3')
			}
		};
		
		monster = {
			numCaught: 0,
			width: 34,
			height: 49,
			x: 0,
			y: 0,
			initX: 0,
			initY: 0,
			offset: 25,
			movement: .5,
			down: true
		};
		
		hoverCraft = {
			x: 50,
			y: 50,
			dirL: false,
			dirR: true,
			fire: false
		};
	
		hero = {
			speedCost: 8,
			width: 34,
			height: 45,
			x: 0,
			y: 0,
			initX: 0,
			initY: 0,
			dirU: false,
			dirR: true, 
			dirD: true,
			dirL: false,
			speed: 5,
			health: 100,
			ground: true,
			collision: {
				x1: 0,
				x2: 0,
				y1: 0,
				y2: 0,
				status: 'none'
			},
			jump: false,
			jumpCost: 8,
			jumpPower: 22,
			jumpPowerMax: 27,
			jumpMod: 25
		};
        
        // general bullet properties
        // bullets are handled by bulletArr
		bullet = {
		    color: "rgba(192, 192, 192, .75)",
		    cost: 8,
		    width: 19.5,
		    height: 9,
		    speed: 8
		};
	
		upgrade = {
			points: 0,
			msg: " "
		};
	},
	
	pageElems:function(){
		var DEFAULT_UPGRADE_MSG = "Not Enough Upgrade Points!!";
		
		$(".bulletUpgrade").unbind('click').click(function(e){
			e.preventDefault();
			
			if(bullet.cost <= upgrade.points){
			    bullet.color = "red";
			    bullet.speed++;
				upgrade.points -= bullet.cost;
				
				upgrade.msg = "Bullet speed upgraded to " + bullet.speed;
			}
			else
				upgrade.msg = DEFAULT_UPGRADE_MSG;
		});
		
		$(".heroSpeedUpgrade").unbind('click').click(function(e){
			e.preventDefault();
		    
		    if(hero.speedCost <= upgrade.points){
			    hero.speed++;
				upgrade.points -= hero.speedCost;
				
			    upgrade.msg = "Hero's speed upgraded to " + hero.speed;
			}
			else
				upgrade.msg = DEFAULT_UPGRADE_MSG;
		});
		
		$(".heroJumpUpgrade").unbind('click').click(function(e){
			e.preventDefault();
		    
		    if(hero.jumpPower == hero.jumpPowerMax)
		    	upgrade.msg = "Already Maxed Out!!";
		    else if(hero.jumpCost <= upgrade.points){
			    hero.jumpPower++;
				upgrade.points -= hero.jumpCost;
				
			    upgrade.msg = "Hero's jump power upgraded to " + hero.speed;
			}
			else
				upgrade.msg = DEFAULT_UPGRADE_MSG;
		});
	},
	
	postLoad: function(){
        
        var loadThis = this;
        
        loadThis.muteHelper(true);
        
        game.sound.bgMusic.lvl0.loop = true;
        game.sound.bgMusic.lvl0.play();
        
        
        $('.audioState').toggle(function(){
            $(this).html('On'); 
            $(this).removeClass('off');
            $(this).addClass('on');
            loadThis.muteHelper(false);
        },function(){
            $(this).html('Off'); 
            $(this).removeClass('on');
            $(this).addClass('off');
            loadThis.muteHelper(true);
        });
	    
	    reset();
	},
	
	muteHelper: function(val){
	    
	    // not working???
	    // for(var i in game.sound){
	        // i.muted = val;
	    // }
	    
	    var volumeReduction = 0.25;
	    
	    game.sound.bgMusic.lvl0.muted = val;
	    
	    game.sound.gun.muted = val;
	    game.sound.gun.volume = volumeReduction;
	    
        game.sound.thud.muted = val;
        game.sound.thud.volume = volumeReduction;
        
        game.sound.jump.muted = val;
        game.sound.jump.volume = volumeReduction;
        
        game.sound.step.muted = val;
        game.sound.step.volume = volumeReduction;
	}
	
};

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
    		window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(callback){
              window.setTimeout(callback, 1000 / game.fps);
            };
})();

var gameLoop = function () {
	requestAnimFrame(gameLoop);
	
	update.init();
	render.init();
};

$(function(){
	load.init(720);
	gameLoop();
	
	/*
	var bulletWorker = new Worker('/js/jonsQuest/task.js');
	bulletWorker.onerror = function(e){
		console.log("e.msg: " + e.message);
		console.log("e.fn: " + e.filename);
		console.log("e.lineno: " + e.filename);
	};
	bulletWorker.onmessage = function(e){
		console.log("e: " + e.data);
	};
	bulletWorker.postMessage("working");
	*/
	
	setInterval(slowLoop, 333);
});
