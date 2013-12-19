/// <reference path="linker.js" />

/*
    Implements GameView.

    @param(string) title The name of the game.
*/
function TitleView(title) {
    this.title = title;
}

TitleView.prototype = (function () {
    var cta = "Press Enter";

    return {
        then: function(callback){
            this.then = callback;
        },

        update: function () {
            if (lastKeyUp === KeyCode.ENTER) {
                lastKeyUp = KeyCode.EMPTY;
                this.then();
            }
        },

        render: function () {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial"
            ctx.fillStyle = "#fff";
            ctx.fillText(this.title, canvas.width / 2 - ctx.measureText(this.title).width / 2, 100);

            ctx.font = "24px Arial";
            ctx.fillText(cta, canvas.width / 2 - ctx.measureText(cta).width / 2, canvas.height / 2);
        }
    };
})();