function Level3() {
    this.init();
}

Level3.prototype = (function() {
    return {
        width: 3400,


        init: function() {
            level.hiddenItems = 0;

            //setObjs();
            //setItems();
            //setEnemies();

            //setBackground();
        },

        deinit: function() {

        },

        update: function() {

        },

        render: function() {
            ctx.fillStyle = "#fff";
            ctx.fillText("LEVEL 3 -- COMING SOON", 300, 300);
            
        }
    };
})();
