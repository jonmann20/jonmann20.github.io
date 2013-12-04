/*
    The graphics component of hero.
*/
var HeroGraphicsComponent = function () {

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
            	    hero.bulletArr[i].pos.x + dirOffset,
            	    hero.bulletArr[i].pos.y + 20,
        	 	    hero.bulletArr[i].deg
    	 	    );
		    }
        }
    };
};
