﻿function LevelView() {
    this.privates = {};

    this.init();
}

LevelView.prototype = (function() {
    var that;

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function(){
            that = this;
        },

        update: function () {

        },

        render: function () {
            ctx.fillStyle = "brown";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };
})();