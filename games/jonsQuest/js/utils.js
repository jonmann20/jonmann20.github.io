/*
    A place for generic math, set/get methods, and other small functions.
    Also used for global data structures, enums, and functions.
*/
var utils = (function () {
    var cboxMenu;


    return {
        /*
            extends an oldObj into a newObj
            while keeping certain objects properties in sync
        */
        extend: function (newObj, oldObj) {
            // merge-copy current oldObj into newObj
            $.extend(newObj, oldObj);

            // force newObj to get oldObj's imgReady property
            var prop = "imgReady";
            Object.defineProperty(newObj, prop, {
                get: function () {
                    return oldObj[prop];
                },
                //set: function (arg) {
                //    oldObj[prop] = arg;
                //},
                //configurable: true
            });

        },

        repeatAction: function (timeStep, numTimes, callback) {
            var num = 0;
            var theAnimation = setInterval(function () {
                if (num++ > numTimes) {
                    clearInterval(theAnimation);
                }
                else {
                    callback();
                }
            }, timeStep);
        },

        degToRad: function(deg){
            return deg * 0.0174532925199432957;
        },

        getTimeObj: function (t) {
            if (t === 0) {
                return { min: "00", sec: "00" };
            }
            
            var min = Math.floor(t / 60);
            var sec = t % 60;

            if (sec < 10) {
                sec = '0' + sec;
            }

            if (min < 10) {
                min = '0' + min;
            }

            return {
                min: min,
                sec: sec
            };
        },

        /**** Debug Printers ****/
        // A method to print to the console less frequently then within the game loop.
        printSlow: function(msg){
            if (game.actualTime % 10 === 0) {
                console.log(msg);
            }
        },

		printMouse: function () {
		    $("canvas").on("mousemove", function (e) {
		        console.log(e.offsetX, e.offsetY);
		    });
		},

		printDir: function (dir) {
		    switch (dir) {
		        case 0:
		            console.log("Dir.NONE");
		            break;
		        case 1:
		            console.log("Dir.TOP");
		            break;
		        case 2:
		            console.log("Dir.BOT");
		            break;
		        case 3:
		            console.log("Dir.LEFT");
		            break;
		        case 4:
		            console.log("Dir.RIGHT");
		            break;
		        case 5:
		            console.log("Dir.IN");
		            break;
		        default:
		            console.log("Dir.unknown");
		    }
		},

		toggleMenu: function () {

		    if ($("#colorbox").css("display") === "block") {
		        cboxMenu.colorbox.close();
		    }
		    else {
		        cboxMenu = $.colorbox({
		            html: $(".gameInstructions").html(),
		            width: 320,
		            height: 530
		        });
		    }
		},

		toggleFullScreen: function () {


		    // fill browser window
		    if ($("body").hasClass("fullscreen")) {
		        $(".canvasWrap").css({
		            width: "",
		            marginLeft: ""
		        });

		        $("body").removeClass("fullscreen");
		    }
		    else {
		        $("body").addClass("fullscreen");

		        var scaledW = $(window).height() * 1.777778;

		        $(".canvasWrap").css({
		            width: scaledW,
		            marginLeft: -scaledW / 2
		        });
		    }



            // fullscreen API
            //if (!document.fullscreenElement &&    // alternative standard method
            //    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods

            //    if (canvas.requestFullscreen) {
            //        canvas.requestFullscreen();
            //    }
            //    else if (canvas.mozRequestFullScreen) {
            //        canvas.mozRequestFullScreen();
            //    }
            //    else if (canvas.webkitRequestFullscreen) {
            //        canvas.webkitRequestFullscreen(); //Element.ALLOW_KEYBOARD_INPUT
            //    }
            //}
            //else {
            //    if (document.cancelFullScreen) {
            //        document.cancelFullScreen();
            //    }
            //    else if (document.mozCancelFullScreen) {
            //        document.mozCancelFullScreen();
            //    }
            //    else if (document.webkitCancelFullScreen) {
            //        document.webkitCancelFullScreen();
            //    }
            //}
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

var KeyCode = Object.freeze({
    ENTER: 13,
    J: 74,
    K: 75,
    O: 79,
    S: 83,
    W: 87,
    EMPTY: -1
});

var Color = Object.freeze({
    LIGHT_BROWN: "#c44525",
    DARK_BROWN: "#672819",
    LIGHT_GREEN: "#166a38",
    SILVER: "#c0c0c0",
    BLACK: "#000",
    GOLD: "#ddaa13",
    ORANGE: "#ff6a00"
});


var bullet = {
    w: 19.5,
    h: 9,
    speed: 3.4
};

// global functions
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
		   window.webkitRequestAnimationFrame ||

		   function (callback) {
		       setTimeout(callback, 16.6666666667); // 60fps fallback
		   };
})();
