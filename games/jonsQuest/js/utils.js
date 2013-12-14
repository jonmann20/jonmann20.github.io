/// <reference path="linker.js" />

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

        deathSequence: function(){
            if (!game.over) {
                game.over = true;

                audio.heroDeath.play();
                audio.bgMusic.muted = true;

                setTimeout(function () {
                    Graphics.fadeCanvas(function () {
                        level.reset();
                        level.curLvl.deinit();
                        level.curLvl.init();

                        if (audio.isOn)
                            audio.bgMusic.muted = false;
                    });
                }, 2600);
            }
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

        browser: function(){
            var ua = navigator.userAgent,
                     tem,
                     M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || []
            ;

            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
                    return 'IE '+(tem[1] || '');
            }

            M = M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];

            if ((tem = ua.match(/version\/([\.\d]+)/i)) != null)
                M[2] = tem[1];

            return M.join(' ');
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
    F: 70,
    J: 74,
    K: 75,
    M: 77,
    O: 79,
    S: 83,
    W: 87,
    EMPTY: -1,
    SPACEBAR: 32
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

var JQObject = Object.freeze({
    EMPTY: 0,
    CRATE: 1,
    LADDER: 2,
    SACK: 3,
    ENEMY: 4,
    CASH: 5,
    DOOR: 6,
    SCALE: 7,
    SMALL_CLOUD: 8,
    CLOUD: 9,
    PLATFORM: 10,
    FLOOR: 11
});

var JQObject_names = Object.freeze({
    0: "EMPTY",
    1: "CRATE",
    2: "LADDER",
    3: "SACK",
    4: "ENEMY",
    5: "CASH",
    6: "DOOR",
    7: "SCALE",
    8: "SMALL_CLOUD",
    9: "CLOUD",
    10: "PLATFORM",
    11: "FLOOR"
});


var bullet = {
    w: 19.5,
    h: 9,
    speed: 4.4
};

// global functions
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
		   window.webkitRequestAnimationFrame ||

		   function (callback) {
		       setTimeout(callback, 16.6666666667); // 60fps fallback
		   };
})();
