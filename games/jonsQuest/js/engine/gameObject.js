/// <reference path="../linker.js" />

/*
    GameObj is the base class from which all objects in the game inherit from.
    Every GameObj has a SAT.Vector (pos);       TODO: make Vector not Polygon

    @param(number) x The x position of the object.
    @param(number) y The y position of the object.
    @param(number) w The width of the object.
    @param(number) h The height of the object.
    @param(JQObject) type The type of the object.
    @param(Image?) src The filename of the object sprite.  unused by default
    
    @constructor
*/
var GameObj = function (x, y, w, h, type, src) {
    this.initX = x;
    this.initY = y;

    //this.pos = new SAT.Vector(x, y);
    if (type === JQObject.FLOOR) {
        $.extend(this, Graphics.getSkewedRect(x, y, w, h));
    }
    else {
        $.extend(this, new SAT.Box(new SAT.Vector(x, y), w, h).toPolygon());
    }

    this.w = w;
    this.h = h;
    this.type = type;

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
            that.w = this.width;
            that.h = this.height;
        };

        this.img.src = src;
    }
};

GameObj.prototype = {
    updatePos: function () {    // TODO: move to normal update location
        if (!this.isOnObj) {
            if (this.pos.y < FULLH - game.padFloor - this.h + 5) {      // +3 is projectY
                this.pos.y += this.vY;
                this.onGround = false;
            }
            else {
                this.pos.y = FULLH - game.padFloor - this.h + 5;
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
