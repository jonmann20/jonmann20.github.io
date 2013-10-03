var game = (function(){
	var	avgFPS = 0,
		timePrev = 0,
        lag = 0,
		fpsHistory = [0]
	;
	
	function update(){
		hero.update();
		level.update();
	}
	
	function render(){
		level.render();
		hero.render();
		
		level.drawAfterHero();
		drawFPS();
	}
	
   	function drawFPS(){
        ctx.fillStyle = "#ddd";
        ctx.font = "12px 'Press Start 2P'";
        
    	if(game.fps != "Infinity")
        	fpsHistory.push(game.fps);
    	
    	if (game.totalTicks % 40 === 0) {
    	    var tot = 0;
            
        	for(var i in fpsHistory){
        		tot += fpsHistory[i];
        	}
        	
        	avgFPS = Math.floor(tot / fpsHistory.length);
        	fpsHistory = [];
        }
    	
	  	ctx.fillText(avgFPS + " FPS", FULLW - 84, FULLH + 65);
	}

   	setInterval(function () {
   	    ++game.actualTime;

   	    //console.log(game.actualTime + 's', hero.x + "px");
   	    //console.log(game.actualTime + 's', hero.y + "px");

   	    //console.log(game.actualTime + 's', hero.vY / game.fps));

   	}, 1000);

   	
	return {
	    gravity: 60,
	    //friction: 35,
	    padBot: 119,	// total padding
	    padHUD: 80,
	    padFloor: 39,
	    lvl: -1,
	    fps: 60,            // fps and dt will be updated dynamically
	    dt: 1000 / 60,      // ms per loop
	    totalTicks: 0,      // TODO: use actualTime, totalTicks depends on loop fps 
	    actualTime: 0,

	    loop: function(){
	        requestAnimFrame(game.loop);

	        ++game.totalTicks;

	        var timeCur = new Date().getTime();

	        if ((timeCur - timePrev) > 0) {
	            game.dt = timeCur - timePrev;
	        }

	        timePrev = timeCur;
	        lag += game.dt;
	        game.fps = 1000 / game.dt;


	        while (lag >= game.dt) {
	            update();
	            lag -= game.dt;
	        }

	        render();
	    },


	    //loop: function (frameTime) {
	    //    //setTimeout(function () {
        //    //setInterval(function(){
	        
	    //    doTimers(frameTime);
	        
	    //    console.log(frameTime, physicsDt);

	    //    physicsDt += frameTime || 0;
	    //    if (physicsDt > 16) {
	    //        update();
	    //        physicsDt -= 16;
	    //    }

        //    render();


	    //    requestAnimFrame(game.loop);

	    //    //}, 1000 / game.fps);
	    //}
	};
})();
