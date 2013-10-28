var GameObj = function (xx, yy, ww, hh, src) {
    var img = null,
		ready = false;

    if (typeof (src) !== "undefined") {
        img = new Image();
        img.onload = function () { ready = true; };
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

        getImg: function () {
            return img;
        }
    };
};
