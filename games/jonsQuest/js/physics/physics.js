/// <reference path="../linker.js" />

/*
    A library of generic physics functions.
*/
var Physics = (function () {


    return {
        // could be sped up by checking if a does NOT intersect with b (i.e. using OR)
        // uses simple Speculative Contacts
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

        // uses SAT and AABB
        // checks collision between a and the level objects
        lvlObjCollision: function (a, callback) {
            if (typeof (a.pos) !== "undefined") {
                a.pos.x = a.x;
                a.pos.y = a.y;        // TODO: convert interface to x and y NOT pos.x/y
            }

            var response = new SAT.Response();
            for (var i = 0; i < level.objs.length; ++i) {

                if (typeof (level.objs[i].pos) !== "undefined"
                    //&& level.objs[i] !== a         // checks if object is in list (by reference)
                ) {

                    // Check Level Object Collision
                    var collided = SAT.testPolygonPolygon(a, level.objs[i], response);

                    // Respond to Level Object Collision
                    if (collided) {
                        response.a.x = response.a.pos.x - response.overlapV.x;
                        response.a.y = response.a.pos.y - response.overlapV.y;
                        
                        if (typeof (level.objs[i].item_t) !== "undefined") {
                            response.item_t = level.objs[i].item_t;
                        }

                        callback(response);
                        break;
                    }

                    response.clear();
                }
            }


            // idea to fix "hooking" around edges of platform
            // http://stackoverflow.com/a/1355695/353166
        },

        // checks collision between hero and the movable level items
        lvlItemCollision: function (callback) {
            if (!hero.isCarrying && !(32 in keysDown)) {// spacebar
                for (var i = 0; i < level.items.length; ++i) {
                    Physics.isSATcollision(hero, level.items[i], function (r) {
                        callback(r, i);
                    });
                }
            }
        },

        isSATcollision: function (a, b, callback) {
            a.pos.x = a.x;
            a.pos.y = a.y;

            b.pos.x = b.x;
            b.pos.y = b.y;

            var response = new SAT.Response();
            var collided = SAT.testPolygonPolygon(a, b, response);

            if (collided)
                callback(response);
        }
    };
})();
