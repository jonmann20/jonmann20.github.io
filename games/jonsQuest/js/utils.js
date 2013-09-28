/*
    A place for generic math, set/get methods, and other small functions.
    Also used for global data structures, enums, and functions.
*/
var utils = (function () {
    	


	return {
		degToRad: function(deg){
			return deg * 0.0174532925199432957;
		},

		printMouse: function () {
		    $("canvas").on("mousemove", function (e) {

		        console.log(e.offsetX, e.offsetY);
		    });
		}
	};
})();


// global enums
var Dir = Object.freeze({
    NONE: 0,
    TOP: 1,
    BOT: 2,
    LEFT: 3,
    RIGHT: 4,
    IN: 5
});

var Inv_e = Object.freeze({
    NOT_HIT: 0,
    HIT_WHITE: 1,
    HIT_RED: 2
});

var bullet = {
    color: "rgba(0, 182, 255, .85)",
    w: 19.5,
    h: 9,
    speed: 8
};

// global functions
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
		   window.webkitRequestAnimationFrame ||

		   function (callback) {
		       setTimeout(callback, 1000 / game.fps);
		   };
})();

//@ sourceURL=utils.js
