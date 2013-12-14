/// <reference path="../linker.js" />

/*
    GameObj is the base class from which all objects in the game inherit from.
    Every GameObj has a SAT.Vector (pos);       TODO: make Vector not Polygon
    
    @param(JQObject) type The type of the object.
    @param(number) x The x position of the object.
    @param(number) y The y position of the object.
    @param(number?) w The width of the object.
    @param(number?) h The height of the object.
    @param(Image?) src The filename of the object sprite.  unused by default
    
    @constructor
*/
var GameObj = function (type, x, y, w, h, src) {
    this.type = type;
    this.initX = x;
    this.initY = y;

    // set this.pos
    if (type === JQObject.FLOOR) {
        $.extend(this, Graphics.getSkewedRect(x, y, w, h));
        this.type = JQObject.FLOOR; // TODO: fix api here
    }
    else {
        $.extend(this, new SAT.Box(new SAT.Vector(x, y), w, h).toPolygon());
    }

    this.imgReady = false;     // TODO: make private

    if (typeof (src) === "undefined") {
        this.w = w;
        this.h = h;
    }
    else {
        this.w = 0;
        this.h = 0;

        this.img = new Image();

        var that = this;
        this.img.onload = function () {
            that.imgReady = true;
            that.w = this.width;
            that.h = this.height;
        };

        this.img.src = "img/" + src;
    }
};

GameObj.prototype = {
    //updatePos: function () {    // TODO: move to normal update location
    //    if (!this.isOnObj) {
    //        if (this.pos.y < FULLH - game.padFloor - this.h) {      // +3 is projectY
    //            this.pos.y += this.vY;
    //            this.isOnObj = false;
    //        }
    //        else {
    //            this.pos.y = FULLH - game.padFloor - this.h;
    //            this.isOnObj = true;
    //            this.vY = 0;
    //        }
    //    }
    //},

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
