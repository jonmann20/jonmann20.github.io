function GameEngine() {
    // back button
    var backBtn = document.createElement("a");
    backBtn.href = "/#games";
    backBtn.innerText = "Back";
    backBtn.className = "btnBack";
    document.body.appendChild(backBtn);

    // canvasWrap
    var wrap = document.createElement("div");
    wrap.className = "canvasWrap";
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", 16*63);
    canvas.setAttribute("height", 9*63);
    wrap.appendChild(canvas);
    document.body.appendChild(wrap);

    ctx = canvas.getContext("2d");

    input = new GameInput();
    view = new GameView();

    function update() {
        view.update();
    }

    function render() {
        requestAnimationFrame(render);
        view.render();
    }

    return {
        start: function () {
            setInterval(update, 1000 / 60);
            requestAnimationFrame(render);
        }
    };
}
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
var KeyCode = Object.freeze({
    EMPTY: -1,
    ENTER: 13,
    CTRL: 17,
    ESC: 27,
    SPACEBAR: 32,
    UP: 38,
    DOWN: 40,
    DELETE: 46,
    A: 65,
    D: 68,
    F: 70,
    H: 72,
    J: 74,
    K: 75,
    M: 77,
    O: 79,
    R: 82,
    S: 83,
    W: 87
});

var KeyCodeNames = {};
KeyCodeNames[-1] = "EMPTY";
KeyCodeNames[13] = "ENTER";
KeyCodeNames[17] = "CTRL";
KeyCodeNames[27] = "ESC";
KeyCodeNames[32] = "SPACEBAR";
KeyCodeNames[38] = "UP";
KeyCodeNames[40] = "DOWN";
KeyCodeNames[46] = "DELETE";
KeyCodeNames[65] = "A";
KeyCodeNames[68] = "D";
KeyCodeNames[70] = "F";
KeyCodeNames[72] = "H";
KeyCodeNames[74] = "J";
KeyCodeNames[75] = "K";
KeyCodeNames[77] = "M";
KeyCodeNames[79] = "O";
KeyCodeNames[82] = "R";
KeyCodeNames[83] = "S";
KeyCodeNames[87] = "W";

function GameInput() {
    keysDown = {};
    lastKeyUp = KeyCode.EMPTY;

    function fixKey(key) {
        if (key === KeyCode.W)
            key = KeyCode.UP;
        else if (key === KeyCode.S)
            key = KeyCode.DOWN;

        return key;
    }

    addEventListener("keydown", function (e) {
        keysDown[fixKey(e.keyCode)] = true;
    }, true);

    addEventListener("keyup", function (e) {
        lastKeyUp = fixKey(e.keyCode);
        delete keysDown[lastKeyUp];
    }, false);
}

//Input.prototype = function () {

//    return {
//        update: function () {

//        }
//    };
//};
function GameGraphics() {
    return {

    };
}

/// <reference path="commonLinker.js" />

/*
    A generic view interface.
*/
function GameView() {

}

GameView.prototype = (function () {

    return {
        update: function () {

        },

        render: function () {
            ctx.fillStyle = "#ccc";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //ctx.font = "36px Arial";
            //ctx.fillStyle = "#000";
            //ctx.fillText("hello", 10, 100);
        }
    };
})();
/// <reference path="linker.js" />

/*
    Implements GameView.

    @param(function) callback
*/
function TitleView(title, allowSave) {
    this.title = title;
    this.allowSave = (typeof(allowSave) !== "undefined") ? allowSave : false;
}

TitleView.prototype = (function () {
    var cta = "Press Enter";

    return {
        then: function(callback){
            this.then = callback;
        },

        update: function () {
            if (lastKeyUp === KeyCode.ENTER) {
                lastKeyUp = KeyCode.EMPTY;

                if (this.allowSave) {
                    //view = new GameSaveView(this, this.callback);
                }
                else {
                    this.then();
                }
            }
        },

        render: function () {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial"
            ctx.fillStyle = "#fff";
            ctx.fillText(this.title, canvas.width / 2 - ctx.measureText(this.title).width / 2, 100);

            ctx.font = "24px Arial";
            ctx.fillText(cta, canvas.width / 2 - ctx.measureText(cta).width / 2, canvas.height / 2);
        }
    };
})();
//# sourceMappingURL=gamesCommon.js.map