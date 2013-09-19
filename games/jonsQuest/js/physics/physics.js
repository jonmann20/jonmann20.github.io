/*
    A library of generic physics functions.
*/
var Physics = (function () {


    return {
        isCollision: function (a, b, moe, isLvl) {
            var aX = (typeof (isLvl) !== 'undefined') ? a.x + a.lvlX : a.x;

            if ((aX + moe <= (b.x + b.w)) && // a is to the left of the right side of b
				(b.x + moe <= (aX + a.w)) && // a is to the right of the left side of b
				(a.y + moe <= (b.y + b.h)) && // a is higher than the bot of b
				(b.y + moe <= (a.y + a.h)) 	  // a is lower than the top of b
			) {
                return true;
            }

            return false;
        }
    };
})();
