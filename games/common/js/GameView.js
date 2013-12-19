/// <reference path="commonLinker.js" />

/*
    A generic view interface.
*/
function GameView() {

}

GameView.prototype = (function () {

    return {
        update: function () {

        },

        render: function () {
            ctx.fillStyle = "#ccc";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //ctx.font = "36px Arial";
            //ctx.fillStyle = "#000";
            //ctx.fillText("hello", 10, 100);
        }
    };
})();