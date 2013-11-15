/*
    GameObj is the base class from which all objects in the game inherit from.
*/
var GameObj = function (xx, yy, ww, hh, src) {
    var img = null,
		imgReady = false
    ;

    if (typeof (src) !== "undefined") {
        img = new Image();
        img.onload = function () { imgReady = true; };
        img.src = src;
    }

    return {
        initX: xx,
        x: xx,
        initY: yy,
        y: yy,
        w: ww,
        h: hh,
        vY: 0,
        onGround: false,
        isOnObj: false,
        onObj: null,        // contains the object holding up the object (directly below)
        grabbable: true,

        updatePos: function () {
            if (!this.isOnObj) {
                if (this.y < FULLH - game.padFloor - this.h) {
                    this.y += this.vY;
                    this.onGround = false;
                }
                else {
                    this.y = FULLH - game.padFloor - this.h;
                    this.onGround = true;
                }
            }
        },

        draw: function () {
            if (imgReady) {
                ctx.drawImage(img, this.x, this.y);
            }
            else {
                ctx.fillStyle = "red";
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        }
    };
};
