'use strict';

function Dormant(src, name, atk, def, hp, actions, lvl) {
    let that = this;

    this.img = new Image();
    this.imgReady = false;
    this.img.onload = function() {
        that.imgReady = true;
    };
    this.img.src = `img/${src}`;

    this.name = name;
    this.atk = atk;
    this.def = def;
    this.initHP = this.hp = hp;
    this.actions = actions;
    this.lvl = (typeof(lvl) !== 'undefined') ? lvl : 1;
    this.xp = 0;
    this.xpNeeded = 50;
}

Dormant.prototype = (function() {

    return {
        draw: function(x, y) {
            if(this.imgReady) {
                ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
            }
        }
    };
})();
