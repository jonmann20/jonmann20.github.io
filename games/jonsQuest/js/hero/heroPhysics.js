/// <reference path="hero.js" />
/// <reference path="heroInput.js" />
/// <reference path="heroGraphics.js" />
/// <reference path="SAT.js" />

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

    function heroAndLvlCollision() {
        hero.pos.x = hero.x;
        hero.pos.y = hero.y;        // TODO: convert interface to x and y NOT pos.x/y

        hero.isOnObj = false;   // prevents jumping after walking off platform

        var response = new SAT.Response();
        for (var i = 0; i < level.terrain.length; ++i) {
            // Check Level Object Collision
            var collided = SAT.testPolygonPolygon(hero, level.terrain[i], response);

            // Respond to Level Object Collision
            if (collided) {
                response.a.x = response.a.pos.x - response.overlapV.x;
                response.a.y = response.a.pos.y - response.overlapV.y;

                if (response.overlapN.y === 1) {    // on top
                    hero.isOnObj = true;
                    hero.isJumping = false;
                    hero.vY = 0;    // BAD!!!!!
                }
                else if (response.overlapN.y === -1) { // on bot
                    hero.vY = 0;    // BAD!!! (wrong location)
                }

                break;
            }

            response.clear();
        }

        // idea to fix "hooking" around edges of platform
        // http://stackoverflow.com/a/1355695/353166
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
                level.updateObjs();
            }
            else {
                hero.x += hero.vX;
            }

            hero.y += hero.vY;
        },

        checkCollision: function () {
	        bulletHandler();		// bullet's and screen
            screenCollision();	    // hero and screen
            heroAndLvlCollision();
        }
    };
};
