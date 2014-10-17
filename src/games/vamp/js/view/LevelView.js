/// <reference path="../linker.js" />

function LevelView(player, curLvl) {
    this.privates = {};
    this.player = player;
    this.curLvl = curLvl;

    this.init();
}

LevelView.prototype = (function() {
    var that,
        onUpdateSet = false,
        onRenderSet = false
    ;


    function checkCollision() {
        if(that.player.invincible) {
            if(that.player.invincibleTimer-- === 0) {
                that.player.invincible = false;
                that.player.invincibleTimer = 120;
            }

            return;
        }

        for(var i = 0; i < that.curLvl.projectiles.length; ++i){
            var collided = SAT.testPolygonPolygon(that.player, that.curLvl.projectiles[i]);
            if(collided) {
                --that.player.hp;
                that.player.invincible = true;
                break;
            }
        }
    }


    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function(){
            that = this;
        },

        update: function() {
            this.curLvl.update();
            this.player.update();

            //if(onUpdateSet)
            //    this.onUpdate();

            checkCollision();
        },

        onUpdate: function(callback) {
            onUpdateSet = true;
            this.onUpdate = callback;
        },

        render: function () {
            this.curLvl.render();
            this.player.render();

            //if(onRenderSet)
            //    this.onRender();
        },

        onRender: function(callback) {
            onRenderSet = true;
            this.onRender = callback;
        }
    };
})();