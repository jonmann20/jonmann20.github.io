/// <reference path="../linker.js" />

function OverworldView() {
    this.privates = {};
    this.init();
}

OverworldView.prototype = (function () {

    var arrow = {
        img: "^^"
    };

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function() {
            arrow.x = 90;
            arrow.y = canvas.height / 2 + 70;
            arrow.slot = 0;
        },

        update: function () {
            if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
            else if (game.input.lastKeyDown === KeyCode.RIGHT) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                
                if (arrow.slot < 7) {
                    arrow.x += 115;
                    ++arrow.slot;
                }
            }
            else if (game.input.lastKeyDown === KeyCode.LEFT) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                if (arrow.slot > 0) {
                    arrow.x -= 115;
                    --arrow.slot;
                }
            }
        },

        render: function () {
            // background
            ctx.fillStyle = "#34282c";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // levels
            var size = 80, x, y;

            for (var i = 0; i < 8; ++i) {
                x = 60 + i * 115;
                y = canvas.height / 2 - size / 2;

                ctx.fillStyle = "#fff";
                ctx.font = "18px Arial";
                ctx.fillText("Level " + (i+1), x + 10, y - 13);

                ctx.fillStyle = "red";
                ctx.fillRect(x, y, size, size);
            }

            // arrow
            ctx.fillStyle = "#fff";
            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();