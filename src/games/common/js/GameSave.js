/// <reference path="commonLinker.js" />

function GameSave() {

}

GameSave.prototype = (function () {
    return {
        load: function (slot) {
            return localStorage["slot" + slot];
        },

        getList: function () {
            var zero = this.load(0),
                one = this.load(1),
                two = this.load(2),
                def = "---"
            ;
            return list = [
                (typeof(zero) !== "undefined") ? zero : def,
                (typeof (one) !== "undefined") ? one : def,
                (typeof (two) !== "undefined") ? two : def
            ];
        },

        save: function (slot, data) {
            localStorage["slot" + slot] = data;
        },

        erase: function(slot){
            localStorage.removeItem("slot" + slot);
            return this.getList();
        }
    };
})();
