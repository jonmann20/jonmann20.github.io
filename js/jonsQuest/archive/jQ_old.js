
// game loop v1
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
    		window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      ||
			function(callback){
              window.setTimeout(callback, 1000 / 60);
            };
})();

var runSim = function () {
	requestAnimFrame(runSim);

	update.init();
	render.init();
};

// v2: fps can be set
var runSim = function () {
	setTimeout(function(){
		requestAnimFrame(runSim);
	
		update.init();
		render.init();
	}, 1000 / 10);
};

// v3: the real way to set fps (doesn't work .. see: https://gist.github.com/joelambert/1002116 )
var time;
var runSim = function () {
	requestAnimFrame(runSim);
	
	var now = new Date().getTime(),
		dt  = now - (time || now);
		
	time = now;
	
	update.init();
	render.init();
	
	this.x += 60 * dt;
};
	
/*	
if(hoverCraft.x >= 190){
	hoverCraft.dirR = false;
	hoverCraft.dirL = true;
	--hoverCraft.x;
}	
else if(hoverCraft.x <= 10){
	hoverCraft.dirR = true;
	hoverCraft.dirL = false;
	++hoverCraft.x;
}
else{
	if(hoverCraft.dirR)
		++hoverCraft.x;
	else
		--hoverCraft.x;
}

if(hoverCraft.x >= 70 && hoverCraft.x <= 100){
	hoverCraft.fire = true;
}
*/

		//hoverCraftImage.onload = function () {hoverCraftReady = true;};
//hoverCraftImage.src = '../img/jonsQuest/hovercraft.png';

	    
    //this.blur(9, function(blurX, blurY){
        //ctx.drawImage(monsterImage, monster.x + blurX, monster.y + blurY);
    //});
	
/*if(hoverCraftReady){
    //ctx.drawImage(hoverCraftImage, hoverCraft.x, hoverCraft.y);
    
    if(hoverCraft.fire){
    	//ctx.fillRect(hoverCraft.x, hoverCraft.y, 10, 10);
    }
    
}*/


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