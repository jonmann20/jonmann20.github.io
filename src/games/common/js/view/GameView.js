/*
 * A generic view interface.
 */
function GameView(gEngine) {
    this.privates = {
        bgColor: "#ccc"
    };

    this.init();
}

GameView.prototype = (function () {

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function(){

        },

        update: function () {

        },

        render: function () {
            ctx.fillStyle = this.privates.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };
})();
