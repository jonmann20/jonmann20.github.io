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

function GameSaveView() {
    this.init();
}

GameSaveView.prototype = (function () {
    var title = "Select a save slot";
    var cta = "Press Delete to erase a save";

    var storage = new GameSave();
    var list = storage.getList();
    var arrow;

    return {
        init: function () {
            console.log("h");
            arrow = {
                img: ">>",
                slot: 0,
                x: canvas.width / 2 - ctx.measureText(list[0]).width/2 - 60,    // TODO: make instance var??
                y: 200
            };
        },

        then: function(callback){
            this.then = callback;
        },

        update: function () {
            if (lastKeyUp === KeyCode.ESC) {
                this.then(lastKeyUp);
            }
            else if (lastKeyUp === KeyCode.ENTER) {
                lastKeyUp = KeyCode.EMPTY;

                var date = new Date();
                var m = date.getMonth();
                var d = date.getDay();
                var y = date.getYear();
                var t = date.toLocaleTimeString();

                storage.save(arrow.slot, m + '/' + d + '/' + y + ' ' + t);
                this.then(KeyCode.ENTER);
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

    @param(string) title The name of the game.
*/
function TitleView(title) {
    this.title = title;
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
                this.then();
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
var Graphics = (function () {
    return {
        /*
            @param(number) timeStep The wait time between running the action (in ms).
            @param(number) numTimes The number to times to run the action.
            @param(function) callback The callback function.
        */
        repeatAction: function (timeStep, numTimes, callback) {
            var num = 0;
            var theAnimation = setInterval(function () {
                if (num++ > numTimes) {
                    clearInterval(theAnimation);
                }
                else {
                    callback();
                }
            }, timeStep);
        }
    };
})();
/// <reference path="../linker.js" />

/*
    @param(string) bgColor The view background color.
    @param(Dormant) dormantL The player's dormant.
    @param(Dormant) dormantR The opponent's dormant.
*/
function BattleView(bgColor, dormantL, dormantR) {
    this.bgColor = bgColor;
    this.dormantL = dormantL;
    this.dormantR = dormantR;
}

BattleView.prototype = (function () {

    var arrow = {
        x: 43,
        y: 350,
        curSlot: 0
    };

    var Dir = Object.freeze({
        RIGHT: 0,
        LEFT: 1
    });

    var left = {
        x: 30,
        dir: Dir.RIGHT
    };

    function drawDormantHUD(dormant, x, y) {
        ctx.fillStyle = "#000";
        ctx.fillText(dormant.name + "  L" + dormant.lvl, x + 40, y);
        ctx.fillText("HP", x, y + 20);

        ctx.strokeStyle = "#000";
        ctx.strokeRect(x + 20, y + 12, 100, 10);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 21, y + 13, dormant.hp * (100/dormant.initHP) - 1, 8);
    }

    function drawHUD(dormant) {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(20, 300, 500, 250);

        ctx.font = "12px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("ATK: " + dormant.atk, 460, 320);
        ctx.fillText("DEF: " + dormant.def, 460, 340);
    }

    function drawActions(dormant) {
        ctx.fillStyle = "#000";

        for (var i = 0; i < 4; ++i) {
            if (dormant.actions[i] === null) {
                ctx.fillText("--", 80, 350 + i * 30);
            }
            else {
                ctx.fillText(dormant.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    function drawActionArrow() {
        ctx.fillStyle = "#000";
        ctx.fillText(">>", arrow.x, arrow.y);
    }


    return {
        then: function(callback){
            this.then = callback;
        },

        update: function () {
            switch(lastKeyUp){
                case KeyCode.ENTER:
                    left.dir = Dir.RIGHT;

                    Graphics.repeatAction(6, 60, function () {
                        if (left.dir === Dir.RIGHT && left.x > 60)
                            left.dir = Dir.LEFT;

                        if (left.dir === Dir.RIGHT)
                            ++left.x;
                        else
                            --left.x;
                    });

                    this.dormantR.hp -= (this.dormantL.atk * this.dormantL.actions[arrow.curSlot].multiplier) / this.dormantR.def;
                    lastKeyUp = KeyCode.EMPTY;
                    break;
                case KeyCode.UP:
                    if (arrow.curSlot !== 0 && this.dormantL.actions[arrow.curSlot - 1] !== null) {
                        --arrow.curSlot;
                        arrow.y -= 30;
                    }
                    break;
                case KeyCode.DOWN:
                    if (arrow.curSlot !== 3 && this.dormantL.actions[arrow.curSlot + 1] !== null) {
                        ++arrow.curSlot;
                        arrow.y += 30;
                    }
                    break;
            }

            if (this.dormantR.hp <= 0) {
                alert("You Win");
                location.reload();
            }
        },

        render: function () {
            // background
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // left
            drawDormantHUD(this.dormantL, 10, 15);
            this.dormantL.draw(left.x, 90);
            drawHUD(this.dormantL);
            drawActions(this.dormantL);
            drawActionArrow();

            // right
            drawDormantHUD(this.dormantR, canvas.width - 130, 15);
            this.dormantR.draw(770, 90);
        }
    };
})();
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

var FightAction = Object.freeze({
    TACKLE: {
        name: "TACKLE",
        multiplier: 1
    },
    HEAL: {
        name: "HEAL",
        multiplier: 1
    },
    DRAGONS_BREATH: {
        name: "DRAGONS_BREATH",
        multiplier: 5
    }
});
/// <reference path="linker.js" />

var game = new GameEngine();
game.start();


var actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

var malaise = new Dormant("malaise.png", "MALAISE", 12, 8, 27, actions);
var erabor = new Dormant("erabor.png", "ERABOR", 8, 12, 23, actions);

var titleView = new TitleView("Dormanticide");
titleView.then(function () {
    view = battleView;
});

var battleView = new BattleView("#ddd", malaise, erabor);

view = titleView;
//# sourceMappingURL=pageDormanticide.js.map