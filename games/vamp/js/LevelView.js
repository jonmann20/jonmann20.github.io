function LevelView() {

}

LevelView.prototype = (function () {
    return {
        update: function () {

        },

        render: function () {
            ctx.fillStyle = "brown";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };
})();