/// <reference path="../../vamp/js/linker.js" />

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

function GameSaveView(returnView, callback) {
    this.returnView = returnView;
    this.callback = callback;
    this.init();
}

GameSaveView.prototype = (function () {
    var title = "Select a save slot";
    var cta = "Press Delete to erase a save";

    var storage = new GameSave();
    var list = storage.getList();
    var arrow;

    return {
        init: function(){
            arrow = {
                img: ">>",
                slot: 0,
                x: canvas.width / 2 - ctx.measureText(list[0]).width/2 - 60,
                y: 200
            };
        },

        update: function () {
            
            if (lastKeyUp === KeyCode.ENTER) {
                lastKeyUp = KeyCode.EMPTY;

                var date = new Date();
                var m = date.getMonth();
                var d = date.getDay();
                var y = date.getYear();
                var t = date.toLocaleTimeString();

                storage.save(arrow.slot, m + '/' + d + '/' + y + ' ' + t);
                this.callback();
            }
            else if (lastKeyUp === KeyCode.DELETE) {
                lastKeyUp = KeyCode.EMPTY;

                list = storage.erase(arrow.slot);
            }
            else if (arrow.slot !== 2 && lastKeyUp === KeyCode.DOWN) {
                lastKeyUp = KeyCode.EMPTY;

                ++arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y += 80;
            }
            else if (arrow.slot !== 0 && lastKeyUp === KeyCode.UP) {
                lastKeyUp = KeyCode.EMPTY;

                --arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y -= 80;
            }
        },

        render: function () {
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial"
            ctx.fillStyle = "#fff";
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 80);

            ctx.font = "24px Arial"

            for (var i = 0; i < list.length; ++i) {
                ctx.fillText(list[i], canvas.width / 2 - ctx.measureText(list[i]).width/2, 200 + i * 80);
            }

            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();