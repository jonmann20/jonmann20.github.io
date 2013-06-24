/*var render = {
    init: function(){
    	// background
    	if(lvl[game.lvl].status){
    		ctx.drawImage(lvlBgImg['lvl' + game.lvl], 0, 0);
    	}
    	else{
    		if(lvl[game.lvl].bgColor)
    			ctx.fillStyle = lvl[game.lvl].bgColor;
    		else
    			ctx.fillStyle = '#222';
    			
    		ctx.fillRect(0, 0, canvas.width, canvas.height);
    	}
    	
    	if(heroReadyL && heroReadyR){
    		if(hero.dirR)
    			ctx.drawImage(heroImgR, hero.x, hero.y);
    		else
    			ctx.drawImage(heroImgL, hero.x, hero.y);
    	}
    
    	if(monsterReady){
    	    ctx.drawImage(monsterImage, monster.x, monster.y);
    	}
    	
        for(var i=0; i < bulletArr.length; i++){
        	if(bulletArr[i].fired) {        	    
        	    var dirOffset = 0; 
                if(bulletArr[i].dirR){
                    dirOffset = hero.w / 2;
                }
                
                ctx.fillStyle = bullet.color;
                this.drawEllipse(bulletArr[i].x + dirOffset, bulletArr[i].y + 4.5, bullet.w, bullet.h);
            }
        }
    
    	this.fpsHandler();
	},
	
	drawEllipse: function(x, y, w, h) {
      var kappa = .5522848;
          ox = (w / 2) * kappa, // control point offset horizontal
          oy = (h / 2) * kappa, // control point offset vertical
          xe = x + w,           // x-end
          ye = y + h,           // y-end
          xm = x + w / 2,       // x-middle
          ym = y + h / 2;       // y-middle
    
          ctx.beginPath();
          ctx.moveTo(x, ym);
          ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
          ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
          ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
          ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
          ctx.closePath();
          ctx.fill();
   },
   
   	fpsHandler: function(){
	    ctx.fillStyle = "rgba(23,23,23, 0.6)";
	    ctx.fillRect((canvas.width - 37), 1, 35, 14);
        ctx.fillStyle = "#e1e1e1";
        ctx.font = "9px Helvetica";
        ctx.fillText(hit() + " fps", (canvas.width - 31), 10);   
	},
};*/