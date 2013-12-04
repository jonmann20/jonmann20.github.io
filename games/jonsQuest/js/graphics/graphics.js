/// <reference path="../linker.js" />

/*
    A library of generic graphics functions.
*/
var Graphics = (function () {

    var alpha = 1,
        canvasTransition = null
    ;

    return {
        ticker: 1,              // 1.0 --> 0.0 --> 1.0 --> ...
        tickerStep: 0.01,
        fadeOut: false,

        fadeCanvas: function(callback){
            $(canvas).removeClass("preTransition");
            $(canvas).addClass("duringTransition");

            canvasTransition = $(canvas).on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                canvasTransition.off();

                $(this).removeClass("duringTransition");
                $(this).addClass("preTransition");

                callback();
            });
        },

        blinkText: function (fontSize, x, y, str) {
            str = (typeof (str) !== "undefined") ? str : "PRESS ENTER";

            if (Graphics.ticker >= 1.35 || Graphics.ticker <= Graphics.tickerStep) {
                Graphics.fadeOut = !Graphics.fadeOut;
            }

            if (Graphics.ticker >= 1) {
                alpha = 1;
            }
            else if (Graphics.ticker <= Graphics.tickerStep) {
                alpha = 0;
            }
            else {
                alpha = Graphics.ticker;
            }

            ctx.font = fontSize + "px 'Press Start 2P'";
            var tmpW = ctx.measureText(str).width;
            ctx.fillStyle = "rgba(233, 233, 233," + alpha + ')';
            ctx.fillText(str, x - tmpW / 2, y);
        },

        drawLadder: function (platform) {
            var x = platform.pos.x,
                y = platform.pos.y,
                w = platform.edges[0].x,
                h = platform.edges[1].y
            ;

            // sides
            ctx.fillStyle = Color.LIGHT_BROWN;
            ctx.fillRect(x, y, 5, h);
            ctx.fillRect(x + w-5, y, 5, h);

            // rungs
            for (var i = 13; i < h; i+=20) {
                ctx.fillRect(x, y+i, w, 8);
            }
        },

        drawScale: function (platform) {
            var x = platform.pos.x,
                y = platform.pos.y,
                w = platform.edges[0].x,
                h = platform.edges[1].y
            ;
            
            // draw top border 1px above bounding box
            ctx.fillStyle = Color.BLACK;
            ctx.fillRect(x, y - 1, w, 1);

            // draw platform
            ctx.fillStyle = Color.DARK_BROWN;
            ctx.fillRect(x, y, w, h);
        },

        drawPlatform: function (x, y, w, h) {
            // draw top border 1px above bounding box
            ctx.fillStyle = Color.LIGHT_BROWN;
            ctx.fillRect(x, y-1, w, 1);

            // draw platform
            ctx.fillStyle = Color.DARK_BROWN;
            ctx.fillRect(x, y, w, h);
        },

        drawPlatformStatus: function (platform) {
            var x = platform.pos.x,
                y = platform.pos.y,
                w = platform.w,
                h = platform.h,
                theShape = 26,
                halfTheShape = theShape/2,
                midX = x + w/2 - halfTheShape,
                midY = y + h/2 - halfTheShape
            ;

            ctx.lineWidth = 3;

            if (platform.holdingItem === "crate") {
                // draw check mark
                ctx.strokeStyle = "green";

                --midY;
                ctx.beginPath();
                ctx.moveTo(midX, midY + halfTheShape);
                ctx.lineTo(midX + halfTheShape, midY + theShape);
                ctx.moveTo(midX + halfTheShape-1, midY + theShape);
                ctx.lineTo(midX + theShape+2, midY+2);
                ctx.stroke();
                ctx.closePath();

            }
            else {
                // draw 'X'
                ctx.strokeStyle = "red";

                ctx.beginPath();
                ctx.moveTo(midX, midY);
                ctx.lineTo(midX + theShape, midY + theShape);
                ctx.moveTo(midX, midY + theShape);
                ctx.lineTo(midX + theShape, midY);
                ctx.stroke();
                ctx.closePath();
            }
        },

        drawDoor: function (x, y, w, h) {
            // door
            ctx.fillStyle = Color.LIGHT_BROWN;
            ctx.fillRect(x+2, y+2, w-2, h-2);

            ctx.fillStyle = Color.DARK_BROWN;

            ctx.fillRect(x, y, 2, h);   // left frame
            ctx.fillRect(x, y, w, 2);   // top frame
            ctx.fillRect(x+w, y, 2, h);   // right frame

            // door handle
            ctx.beginPath();
            ctx.arc(x + w - w / 3.2, y + h - h/3.4, 3, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // door
            ctx.fillStyle = "#e1e1e1";
            ctx.font = "12px 'Press Start 2P'";
            ctx.fillText("EXIT", x - 8, y - 5);

        },

        drawEllipse: function (x, y, w, h) {
            var kappa = 0.5522848,
				ox = (w / 2) * kappa, // control point offset horizontal
				oy = (h / 2) * kappa, // control point offset vertical
				xe = x + w, // x-end
				ye = y + h, // y-end
				xm = x + w / 2, // x-middle
				ym = y + h / 2 // y-middle
            ;

            ctx.beginPath();
            ctx.moveTo(x, ym);
            ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            ctx.closePath();
            ctx.fill();
        },

        drawRotate: function (img, x, y, angle) {
            ctx.save();

            ctx.translate(x, y);								// move co-ord sys to img origin
            ctx.rotate(utils.degToRad(angle));
            ctx.translate(-img.width * 0.5, -img.height * 0.5); // move to top left of img

            //ctx.scale(0.75, 0.75);
            ctx.drawImage(img, 0, 0);

            ctx.restore();
        }
    };
})();


/* Images */
//lvl = new Array(NUM_LEVELS),
//lvlBgImg = {}
//function loadBgImages(imgArr, callback) {
//    var count = 0;

//    for (var key in imgArr) {
//        if (imgArr[key] !== "none") {
//            lvlBgImg[key] = new Image();
//            lvlBgImg[key].onload = function () {
//                callback(this.num);
//            };

//            lvlBgImg[key].src = imgArr[key];
//            lvlBgImg[key].num = count;
//        }

//        ++count;
//    }
//}

//for (var i = 0; i < NUM_LEVELS; ++i) {
//    lvl[i] = {
//        status: false,
//        bgColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
//    };
//}

//loadBgImages({
//    lvl0: "img/lvl0.jpg",
//    lvl1: "none"
//}, function (num) {
//    lvl[num].status = true;
//});




//var wasClicked = false;
//$(".resize").on("click", function(){
//    if (wasClicked) {
//        $(canvas).css({ width: "", height: "" });
//        $(this).attr("class", "resize off");
//        $(this).children("span").attr("class", "icon-expand");
//    }
//    else {
//        $(canvas).css({ width: "100%" });

//        // fix for IE
//        var width = $(canvas).width();
//        $(canvas).css({ height: 0.611 * width });


//        $(this).attr("class", "resize on");
//        $(this).children("span").attr("class", "icon-contract");
//    }

//    wasClicked = !wasClicked;
//});
