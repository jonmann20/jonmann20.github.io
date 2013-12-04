/*
    GameObj is the base class from which all objects in the game inherit from.
    Every GameObj has a SAT.Vector (pos);       TODO: make Vector not Polygon
*/
var GameObj = function (x, y, w, h, src) {
    this.initX = x;
    this.initY = y;

    //this.pos = new SAT.Vector(x, y);
    $.extend(this, new SAT.Box(new SAT.Vector(x, y), w, h).toPolygon());

    this.w = w;
    this.h = h;

    this.vY = 0;

    this.onGround = false;
    this.isOnObj = false;
    this.onObj = null;        // contains the object holding up the object (directly below)
    this.grabbable = true;

    // TODO: make private
    this.imgReady = false;

    if (typeof (src) !== "undefined") {
        this.img = new Image();

        var that = this;
        this.img.onload = function () {
            that.imgReady = true;
        };

        this.img.src = src;
    }
};

GameObj.prototype = {
    updatePos: function () {
        if (!this.isOnObj) {
            if (this.pos.y < FULLH - game.padFloor - this.h) {
                this.pos.y += this.vY;
                this.onGround = false;
            }
            else {
                this.pos.y = FULLH - game.padFloor - this.h;
                this.onGround = true;
            }
        }
    },

    draw: function () {
        if (this.imgReady) {
            ctx.drawImage(this.img, this.pos.x, this.pos.y);
        }
        else {
            ctx.fillStyle = "red";
            ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
        }
    }
};
