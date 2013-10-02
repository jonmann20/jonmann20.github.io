/*
    A library of generic graphics functions.
*/
var Graphics = (function () {

    var alpha = 1,
        fadeOut = true
    ;

    return {
        blinkText: function (fontSize, x, y, str) {
            str = (typeof (str) !== 'undefined') ? str : 'PRESS ENTER';

            if (alpha <= 0)
                fadeOut = false;
            else if (alpha > 1.55)
                fadeOut = true;

            var theDt = game.dt / 1000; // TODO: use acutal time

            alpha += fadeOut ? -theDt : theDt;

            // press enter
            ctx.font = fontSize + "px 'Press Start 2P'";
            var tmpW = ctx.measureText(str).width;
            ctx.fillStyle = 'rgba(233, 233, 233,' + alpha + ')';
            ctx.fillText(str, x - tmpW / 2, y);
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
