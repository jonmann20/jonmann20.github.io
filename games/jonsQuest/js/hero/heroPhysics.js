/// <reference path="../linker.js" />

/*
    The physics component of hero.
*/
var HeroPhysicsComponent = function () {

    function bulletHandler() {
        for (var i = 0; i < hero.bulletArr.length; ++i) {
            hero.bulletArr[i].x += hero.bulletArr[i].dirR ? bullet.speed : -bullet.speed;   // update position

            if (hero.bulletArr[i].x > canvas.width || hero.bulletArr[i].x < 0) {		    // bullet and screen
                hero.bulletArr.splice(i, 1); // remove ith item
            }
        }
    }

    function screenCollision() {
        hero.onGround = false;

        if (hero.y < -hero.h) {                     // feet above top of screen
            hero.y = -hero.h;
            hero.vY = 0;
        }
        else if (hero.y >= (canvas.height - game.padBot - hero.h)) { // bottom
            hero.y = canvas.height - game.padBot - hero.h;
            hero.isJumping = false;
            hero.onGround = true;

            hero.vY = 0;
        }

        if (hero.x < 0) { 								// left
            hero.x = 0;
            hero.vX = 0;
        }
        else if (hero.x > (canvas.width - hero.w)) { 	// right 
            hero.x = canvas.width - hero.w;
            hero.vX = 0;
        }
    }

    function levelCollision() {
        hero.isOnObj = false;   // prevents jumping after walking off platform

        Physics.lvlObjCollision(hero, function (r) {
            if (r.overlapN.y === 1) {                       // on top
                hero.isOnObj = true;
                hero.isJumping = false;
                hero.vY = 0;    // (wrong location??)
            }
            else if (r.overlapN.y === -1) {                 // on bot
                hero.vY = 0;    // (wrong location??)
            }
        });

        Physics.lvlItemCollision(function (r, idx) {
            if (r.overlapN.y === 1) {
                hero.y -= r.overlapV.y;
                hero.isOnObj = true;
                hero.isJumping = false;
                hero.vY = 0;    // (wrong location??)
            }
            else {
                r.b.holding = true;
                r.b.vY = 6.5;
                hero.curItem = r.b;
                hero.isCarrying = true;

                level.items.splice(idx, 1);
            }
        });
    }

    return {
        updatePosition: function (){	
            if (hero.x !== (hero.x + hero.vX)) {
                audio.step.play();
            }

            if(((hero.dir == Dir.RIGHT && hero.x >= ((canvas.width/2) + 35)) ||
               (hero.dir == Dir.LEFT && hero.x <= ((canvas.width/2) - 45))) &&
               (hero.lvlX + hero.vX >= 0) &&
               (hero.lvlX + hero.vX <= level.width - canvas.width)
            ){
                hero.lvlX += hero.vX;
                level.updateView();
            }
            else {
                hero.x += hero.vX;
            }

            hero.y += hero.vY;
        },

        checkCollision: function () {
	        bulletHandler();		// bullet's and screen
            screenCollision();	    // hero and screen
            levelCollision();
        }
    };
};
