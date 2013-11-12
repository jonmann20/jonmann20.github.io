/// <reference path="../hero/heroInput.js" />
/// <reference path="../hero/heroGraphics.js" />
/// <reference path="../hero/heroPhysics.js" />
/// <reference path="../hero/hero.js" />

/*
    A library of generic physics functions.
*/
var Physics = (function () {


    return {
        // could be sped up by checking if a does NOT intersect with b (e.g. using OR)
        isCollision: function (a, b, moe, isLvl) {
            var aX = (typeof (isLvl) !== "undefined") ? a.x + a.lvlX : a.x;

            if ((aX + moe <= (b.x + b.w)) && // a is to the left of the right side of b
				(b.x + moe <= (aX + a.w)) && // a is to the right of the left side of b
				(a.y + moe <= (b.y + b.h)) && // a is higher than the bot of b
				(b.y + moe <= (a.y + a.h)) 	  // a is lower than the top of b
			) {
                return true;
            }

            return false;
        },

        // uses speculative contacts
        solidRectCollision: function (collisionDir, obj) {
            if (collisionDir != Dir.NONE) {
                if (collisionDir == Dir.LEFT) {
                    hero.onObjX = obj.x - hero.lvlX - hero.w;
                    hero.onObjLvlX = hero.lvlX;
                }
                else if (collisionDir == Dir.RIGHT) {
                    hero.onObjX = obj.x - hero.lvlX + obj.w;
                    hero.onObjLvlX = hero.lvlX;
                }
                else if (collisionDir == Dir.TOP) {
                    hero.onObjY = hero.y = obj.y - hero.h;
                    hero.isJumping = false;
                    hero.isOnObj = true;
                }
                else if (collisionDir == Dir.BOT) {
                    if (hero.vY < -4) {
                        audio.play(audio.thud, true);
                    }

                    hero.onObjY = hero.y = obj.y + obj.h;
                    hero.jumpMod = 0;
                    hero.vY = 0;
                    console.log("bot");

                }

                if ((collisionDir == Dir.LEFT) || (collisionDir == Dir.RIGHT)) {
                    hero.x = hero.onObjX;
                    hero.lvlX = hero.onObjLvlX;
                }
            }
        }
    };
})();
