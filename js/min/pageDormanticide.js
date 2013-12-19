/// <reference path="commonLinker.js" />

/*
    Declares two globals: canvas and ctx
*/
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

    // canvas
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", 16*63);
    canvas.setAttribute("height", 9*63);
    wrap.appendChild(canvas);
    document.body.appendChild(wrap);

    ctx = canvas.getContext("2d");

    this.input = new GameInput(this);
    this.graphics = new GameGraphics(this);
    this.utils = new GameUtils(this);
    this.view = new GameView(this);

    this.init();
}

GameEngine.prototype = (function() {
    var that,
        updateInterval,
        renderRAF,
        onUpdateSet = false,
        onRenderSet = false
    ;


    function update() {
        that.view.update();

        if(onUpdateSet)
            that.onUpdate();
    }

    function render() {
        renderRAF = requestAnimationFrame(render);
        that.view.render();

        if(onRenderSet)
            that.onRender();
    }


    return {
        init: function(){
            that = this;
        },

        onUpdate: function(callback) {
            onUpdateSet = true;
            this.onUpdate = callback;
        },

        onRender: function(callback) {
            onRenderSet = true;
            this.onRender = callback;
        },

        start: function() {
            updateInterval = setInterval(update, 1000 / 60);
            renderRAF = requestAnimationFrame(render);
        },

        stop: function() {
            clearInterval(updateInterval);
            cancelAnimationFrame(renderRAF);
        }
    };
})();

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

/*
    The input component of GameEngine.
*/
function GameInput() {
    this.keysDown = {};
    this.lastKeyUp = KeyCode.EMPTY;
    this.lastKeyDown = KeyCode.EMPTY;

    function fixKey(key) {
        if (key === KeyCode.W)
            key = KeyCode.UP;
        else if (key === KeyCode.S)
            key = KeyCode.DOWN;
        else if (key === KeyCode.D)
            key = KeyCode.RIGHT;
        else if (key === KeyCode.A)
            key = KeyCode.LEFT;

        return key;
    }

    var that = this;

    addEventListener("keydown", function (e) {
        var key = fixKey(e.keyCode);

        if (!that.keysDown[key]) {
            that.lastKeyDown = key;
            that.keysDown[key] = true;
        }
    });

    addEventListener("keyup", function (e) {
        that.lastKeyUp = fixKey(e.keyCode);
        delete that.keysDown[that.lastKeyUp];
    });
}

GameInput.prototype = (function () {

    return {
        update: function () {

        }
    };
})();


// global enums
var KeyCode = Object.freeze({
    EMPTY: -1,
    ENTER: 13,
    CTRL: 17,
    ESC: 27,
    SPACEBAR: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
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
KeyCodeNames[37] = "LEFT";
KeyCodeNames[38] = "UP";
KeyCodeNames[39] = "RIGHT";
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
/*
    The utils component of GameEngine.
*/
function GameUtils(gEngine) {
    return {
        /*
            Resets the newView's private variables.
            Changes the view.
        */
        switchView: function(newView) {
            newView.init();
            gEngine.view = newView;
        }
    };
}

// global enums
var Dir = Object.freeze({
    RIGHT: 0,
    LEFT: 1
});
/*
    The graphics component of GameEngine.
*/
var GameGraphics = function(gEngine) {
    return {
        isAnimating: false,

        /*
            @param(number) timeStep The wait time between running the action (in ms).
            @param(number) numTimes The number to times to run the action.
            @param(function) callback The callback function.
        */
        repeatAction: function(timeStep, numTimes, callback) {
            this.isAnimating = true;

            var num = 0,
                that = this
            ;

            var theAnimation = setInterval(function() {
                if(num++ > numTimes) {
                    clearInterval(theAnimation);
                    that.isAnimating = false;
                }
                else {
                    callback();
                }
            }, timeStep);
        }
    };
};

/// <reference path="../commonLinker.js" />

/*
    A generic view interface.
*/
function GameView(gEngine) {
    this.privates = {
        bgColor: "#ccc"
    };

    this.init();
}

GameView.prototype = (function () {

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function(){

        },

        update: function () {

        },

        render: function () {
            ctx.fillStyle = this.privates.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };
})();

/// <reference path="../commonLinker.js" />

/*
    Implements GameView.

    @param(string) title The name of the game.
*/
function TitleView(title) {
    this.privates = {
        title: title
    };

    this.init();
}

TitleView.prototype = (function () {
    var title,
        cta = "Press Enter"
    ;

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function(){
            title = this.privates.title;
        },

        update: function () {
            if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
        },

        render: function () {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial"
            ctx.fillStyle = "#fff";
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 100);

            ctx.font = "24px Arial";
            ctx.fillText(cta, canvas.width / 2 - ctx.measureText(cta).width / 2, canvas.height / 2);
        }
    };
})();
/// <reference path="../commonLinker.js" />

function GameSaveView() {
    this.privates = {};

    this.init();
}

GameSaveView.prototype = (function() {
    var that,
        title = "Select a save slot",
        cta = "Press Delete to erase a save",
        storage = new GameSave(),
        list = storage.getList(),
        arrow
    ;

    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            that = this;

            arrow = {
                img: ">>",
                slot: 0,
                x: canvas.width / 2 - ctx.measureText(list[0]).width / 2 - 60,    // TODO: make instance var??
                y: 200
            };
        },

        update: function() {
            if(game.input.lastKeyDown === KeyCode.ESC) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback(KeyCode.ESC);
            }
            else if(game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                var date = new Date();
                var m = date.getMonth();
                var d = date.getDay();
                var y = date.getYear();
                var t = date.toLocaleTimeString();

                storage.save(arrow.slot, m + '/' + d + '/' + y + ' ' + t);
                this.privates.callback(KeyCode.ENTER);
            }
            else if(game.input.lastKeyDown === KeyCode.DELETE) {
                game.input.lastKeyDownp = KeyCode.EMPTY;

                list = storage.erase(arrow.slot);
            }
            else if(arrow.slot !== 2 && game.input.lastKeyDown === KeyCode.DOWN) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                ++arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y += 80;
            }
            else if(arrow.slot !== 0 && game.input.lastKeyDown === KeyCode.UP) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                --arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y -= 80;
            }
        },

        render: function() {
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "36px Arial"
            ctx.fillStyle = "#fff";
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 80);

            ctx.font = "24px Arial"

            for(var i = 0; i < list.length; ++i) {
                ctx.fillText(list[i], canvas.width / 2 - ctx.measureText(list[i]).width / 2, 200 + i * 80);
            }

            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();
/// <reference path="../linker.js" />

function OverworldView() {
    this.privates = {};
    this.init();
}

OverworldView.prototype = (function () {

    var arrow = {
        img: "^^"
    };

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function() {
            arrow.x = 90;
            arrow.y = canvas.height / 2 + 70;
            arrow.slot = 0;
        },

        update: function () {
            if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
            else if (game.input.lastKeyDown === KeyCode.RIGHT) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                
                if (arrow.slot < 7) {
                    arrow.x += 115;
                    ++arrow.slot;
                }
            }
            else if (game.input.lastKeyDown === KeyCode.LEFT) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                if (arrow.slot > 0) {
                    arrow.x -= 115;
                    --arrow.slot;
                }
            }
        },

        render: function () {
            // background
            ctx.fillStyle = "#34282c";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // levels
            var size = 80, x, y;

            for (var i = 0; i < 8; ++i) {
                x = 60 + i * 115;
                y = canvas.height / 2 - size / 2;

                ctx.fillStyle = "#fff";
                ctx.font = "18px Arial";
                ctx.fillText("Level " + (i+1), x + 10, y - 13);

                ctx.fillStyle = "red";
                ctx.fillRect(x, y, size, size);
            }

            // arrow
            ctx.fillStyle = "#fff";
            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();
/// <reference path="../linker.js" />

/*
    Implements GameView.

    @param(string) bgColor The view background color.
    @param(Dormant) dormantL The player's dormant.
    @param(Dormant) dormantR The opponent's dormant.
*/
function BattleView(bgColor, dormantL, dormantR) {
    this.privates = {
        bgColor: bgColor,
        dormantL: dormantL,
        dormantR: dormantR
    };

    this.init();
}

BattleView.prototype = (function () {

    var that,
        arrow = {
            img: ">>"
        },
        left,
        wasAttack,
        wasAttackTimer,
        fire,
        theAttack,
        dormantL,
        dormantR
    ;

    function checkInput(dormantL, dormantR) {
        switch(game.input.lastKeyDown) {
            case KeyCode.ENTER:
                game.input.lastKeyDown = KeyCode.EMPTY;

                theAttack.name = dormantL.actions[arrow.curSlot].name;
                theAttack.atk = (dormantL.atk * dormantL.actions[arrow.curSlot].multiplier) / dormantR.def;

                return true;
                break;
            case KeyCode.UP:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(arrow.curSlot !== 0 && dormantL.actions[arrow.curSlot - 1] !== null) {
                    --arrow.curSlot;
                    arrow.y -= 30;
                }
                break;
            case KeyCode.DOWN:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(arrow.curSlot !== 3 && dormantL.actions[arrow.curSlot + 1] !== null) {
                    ++arrow.curSlot;
                    arrow.y += 30;
                }
                break;
        }
    }

    function runTackleAnimation() {
        left.dir = Dir.RIGHT;

        game.graphics.repeatAction(6, 60, function() {
            if(left.dir === Dir.RIGHT && left.x > 60) {
                left.dir = Dir.LEFT;
            }

            if(left.dir === Dir.RIGHT)
                ++left.x;
            else
                --left.x;

            dormantR.hp -= theAttack.atk / 60;
        });
    }

    /****** Render *****/
    function drawDormantHUD(dormant, x, y, drawXP) {
        // name
        var str = dormant.name + "  L" + dormant.lvl;

        ctx.fillStyle = "#000";
        ctx.fillText(str, x + ctx.measureText(str).width / 2, y);

        // hp
        ctx.fillText("HP", x, y + 20);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x + 21, y + 12, 100, 10);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 22, y + 13, dormant.hp * (100 / dormant.initHP) - 1, 8);

        // xp
        if(drawXP) {
            ctx.fillStyle = "#000";
            ctx.fillText("XP", x, y + 40);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(x + 21, y + 32, 100, 10);

            ctx.fillStyle = "#777";
            ctx.fillRect(x + 22, y + 33, dormant.xp * (100 / dormant.xpNeeded) - 1, 8);
        }
    }

    function drawHUD() {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(20, 300, 500, 250);

        ctx.font = "12px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("ATK: " + dormantL.atk, 460, 320);
        ctx.fillText("DEF: " + dormantL.def, 460, 340);

        drawActionList();
        drawActionArrow();
    }

    function drawActionList() {
        ctx.fillStyle = "#000";

        for (var i = 0; i < 4; ++i) {
            if (dormantL.actions[i] === null) {
                ctx.fillText("--", 80, 350 + i * 30);
            }
            else {
                ctx.fillText(dormantL.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    function drawActionArrow() {
        ctx.fillStyle = "#000";
        ctx.fillText(arrow.img, arrow.x, arrow.y);
    }


    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            that = this;
            arrow.x = 43;
            arrow.y = 350;
            arrow.curSlot = 0;

            left = {
                x: 30,
                dir: Dir.RIGHT
            };

            fire = {
                x: 0,
                y: 0
            };

            wasAttack = false;
            wasAttackTimer = 60;
            theAttack = {
                name: "EMPTY",
                atk: 0
            };

            dormantL = this.privates.dormantL;
            dormantR = this.privates.dormantR;
        },

        update: function() {
            if(wasAttack) {
                dormantR.hp -= theAttack.atk / 60;
            }
            if(!game.graphics.isAnimating) {
                var _wasAttack = checkInput(dormantL, dormantR);
                if(_wasAttack) {
                    if(theAttack.name === FightAction.TACKLE.name) {
                        runTackleAnimation();
                    }
                    else if(theAttack.name === FightAction.DRAGONS_BREATH.name) {
                        wasAttack = true;
                    }
                }
            }

            if(dormantR.hp <= 0) {
                dormantL.xp += 25;
                this.privates.callback();
            }
        },

        render: function () {
            // background
            ctx.fillStyle = this.privates.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // left
            drawDormantHUD(dormantL, 10, 15, true);
            dormantL.draw(left.x, 90);
            drawHUD();

            // right
            drawDormantHUD(dormantR, canvas.width - 130, 15, false);
            dormantR.draw(770, 90);


            // attack animation
            if(wasAttack) {

                var t = (wasAttackTimer % 40);
                if(t >= 0 && t < 10) {
                    fire.x = 0;
                }
                else if(t >= 10 && t < 20) {
                    fire.x = 5;
                }
                else if(t >= 20 && t < 30) {
                    fire.x = 0;
                }
                else if(t >= 30 && t < 40) {
                    fire.x = -5;
                }

                ctx.fillStyle = "red";
                ctx.fillRect(870 + fire.x, 242, 40, 12);
                ctx.fillRect(880 + fire.x, 230, 30, 12);
                ctx.fillRect(880 + fire.x, 218, 20, 12);


                if(wasAttackTimer-- === 0) {
                    wasAttack = false;
                    wasAttackTimer = 60;
                }
            }

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
        name: "DRAGONS BREATH",
        multiplier: 5
    }
});
/// <reference path="linker.js" />

/*
    The main class for dormanticide.
    Declares game as a global.
*/
(function Main() {

    game = new GameEngine();
    game.start();

    var curLvl = 1;

    var titleView = new TitleView("Dormanticide");
    titleView.then(function () {
        game.utils.switchView(overworldView);
    });

    var overworldView = new OverworldView();
    overworldView.then(function () {
        if (curLvl === 1)
            game.utils.switchView(lvl1);
        else
            game.utils.switchView(lvl2);
    });


    var actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

    var malaise = new Dormant("malaise.png", "MALAISE", 12, 8, 27, actions);
    var erabor = new Dormant("erabor.png", "ERABOR", 8, 12, 23, actions);
    var tildamesh = new Dormant("tildamesh.png", "TILDAMESH", 8, 12, 23, actions);


    var lvl1 = new BattleView("#ddd", malaise, erabor);
    lvl1.then(function () {
        ++curLvl;
        game.utils.switchView(overworldView);
    });

    var lvl2 = new BattleView("#ddd", malaise, tildamesh);
    lvl2.then(function () {
        game.utils.switchView(overworldView);
    });


    game.view = titleView;
})();
//# sourceMappingURL=pageDormanticide.js.map