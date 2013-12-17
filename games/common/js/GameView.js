/// <reference path="commonLinker.js" />

function GameView() {
    this.state = save.load();

    if (this.state === "yup") {
        this.str = "bar";
    }
    else {
        this.str = "foo";
    }
}

GameView.prototype = (function () {

    return {
        update: function () {
            console.log(KeyCodeNames[lastKeyUp]);
            if (lastKeyUp === KeyCode.ENTER) {
                save.store("yup");
                alert("saved game");
                lastKeyUp = KeyCode.EMPTY;
            }
        },

        render: function () {
            ctx.fillStyle = "#ccc";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(this.str, 10, 100);
        }
    };
})();