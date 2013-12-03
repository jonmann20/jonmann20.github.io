var lvl2 = (function () {


    return {
        init: function () {

        },

        update: function(){

        },

        render: function () {
            ctx.font = "18px 'Press Start 2P'";
            
            var lvlTxt = "LEVEL 1 -- coming soon";
            var lvlTxtW = ctx.measureText(lvlTxt).width;
            ctx.fillStyle = "#e1e1e1";
            ctx.fillText(lvlTxt, HALFW - lvlTxtW / 2, 150);
        }
    };
})();