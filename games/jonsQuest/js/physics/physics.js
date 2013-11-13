/*
    A library of generic physics functions.
*/
var Physics = (function () {


    return {
        // could be sped up by checking if a does NOT intersect with b (i.e. using OR)
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

        // uses SAT
        terrainObjCollision: function (a, callback) {
            a.pos.x = a.x;
            a.pos.y = a.y;        // TODO: convert interface to x and y NOT pos.x/y

            var response = new SAT.Response();
            for (var i = 0; i < level.terrain.length; ++i) {
                // Check Level Object Collision
                var collided = SAT.testPolygonPolygon(a, level.terrain[i], response);

                // Respond to Level Object Collision
                if (collided) {
                    response.a.x = response.a.pos.x - response.overlapV.x;
                    response.a.y = response.a.pos.y - response.overlapV.y;

                    callback(response);
                    break;
                }

                response.clear();
            }
        }
    };
})();
