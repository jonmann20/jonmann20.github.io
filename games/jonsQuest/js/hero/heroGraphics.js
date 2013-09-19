/*
    The graphics component of hero.
*/
var HeroGraphicsComponent = function () {
    //$.extend(this, hero.protectedInfo);

    var shuriken = null,
        shurikenReady = false
    ;


    return {
        init: function(){
            shuriken = new Image();
            shuriken.src = "img/shuriken.png";
            shuriken.onload = function () { shurikenReady = true; };
        },


        drawBullets: function(){
		    for(var i=0; i < hero.bulletArr.length; ++i){
		        var dirOffset = hero.bulletArr[i].dirR ?
    							    hero.w : 
    							    0;
	            
		        hero.bulletArr[i].deg += 5;
            
		        Graphics.drawRotate(
            	    shuriken, 
            	    hero.bulletArr[i].x + dirOffset,
            	    hero.bulletArr[i].y + 20,
        	 	    hero.bulletArr[i].deg
    	 	    );
            
		    }
        },

        drawHealth: function (){
		    for(var i=0; i < hero.health; ++i){
		        ctx.fillStyle = "red";
		        ctx.fillRect(80 + i*21, FULLH + 14, 19, 8);
		    }
        },
	
        drawMana: function(){
            for(var i=0; i < hero.mana; ++i){
                ctx.fillStyle = "#00b6ff";
                ctx.fillRect(80 + i*21, FULLH + 37, 19, 8);
            }
        },
	
        drawXP: function () {
            ctx.fillStyle = "#ddd";
            ctx.font = "12px 'Press Start 2P'";
        	
            var zero = (hero.xp < 10) ? '0' : '';
            ctx.fillText(zero + hero.xp + '/' + hero.xpNeeded, 80, FULLH + 71);
        }
    };
};
