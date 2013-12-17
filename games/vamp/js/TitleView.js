/// <reference path="linker.js" />

function TitleView(callback) {
    this.callback = callback;
}

TitleView.prototype = (function () {
    var title = "Vamp: The Great and Powerful";
    var cta = "Press Enter";

    return {
        update: function () {
            if (lastKeyUp === KeyCode.ENTER) {
                lastKeyUp = KeyCode.EMPTY;
                view = new GameSaveView(this, this.callback);
            }
        },

        render: function () {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial"
            ctx.fillStyle = "#fff";
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 100);

            ctx.font = "24px Arial"
            ctx.fillText(cta, canvas.width / 2 - ctx.measureText(cta).width / 2, canvas.height / 2);
        }
    };
})();