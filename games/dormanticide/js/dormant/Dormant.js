/// <reference path="../linker.js" />

/*
    @param(string) name The name of the dormant.
    @param(number) atk The attack strength of the dormant.
    @param(number) def The defense strength of the dormant.
    @param(number) hp The total available health points of the dormant.
    @param(array) actions The fight actions of the dormant.
    @param(?number) lvl The level of the dormant. (1 by default)
*/
function Dormant(src, name, atk, def, hp, actions, lvl) {
    var that = this;

    this.img = new Image();
    this.imgReady = false;
    this.img.onload = function () {
        that.imgReady = true;
    };
    this.img.src = "img/" + src;

    this.name = name;
    this.atk = atk;
    this.def = def;
    this.initHP = this.hp = hp;
    this.actions = actions;
    this.lvl = (typeof (lvl) !== "undefined") ? lvl : 1;
    this.xp = 0;
    this.xpNeeded = 50;
}

Dormant.prototype = (function () {

    return {
        draw: function (x, y) {
            if (this.imgReady) {
                ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
            }
        }
    };
})();
