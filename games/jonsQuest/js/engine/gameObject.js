var GameObj = function () {
    var img = null,
		ready = false;

    return {
        initX: -1,
        x: -1,
        initY: -1,
        y: -1,
        w: -1,
        h: -1,
        vY: 0,

        init: function (xx, yy, ww, hh, src) {
            this.initX = this.x = xx;
            this.intiY = this.y = yy;
            this.w = ww;
            this.h = hh;

            if (typeof (src) !== "undefined") {
                img = new Image();
                img.onload = function () { ready = true; };
                img.src = src;
            }
        },

        updatePos: function () {
            if (this.y < FULLH - game.padFloor - this.h)
                this.y += this.vY;
            else
                this.y = FULLH - game.padFloor - this.h;
        },

        draw: function () {
            if (ready) {
                ctx.drawImage(img, this.x, this.y);
            }
            else {
                ctx.fillStyle = "red";
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        },

        getImg: function () { return img; }
    };
};
