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
        renderRAF
    ;


    function update() {
        that.view.update();
    }

    function render() {
        renderRAF = requestAnimationFrame(render);
        that.view.render();
    }


    return {
        init: function(){
            that = this;
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
    this.init();
}

GameSaveView.prototype = (function() {
    var title = "Select a save slot";
    var cta = "Press Delete to erase a save";

    var storage = new GameSave();
    var list = storage.getList();
    var arrow;

    return {
        init: function() {
            arrow = {
                img: ">>",
                slot: 0,
                x: canvas.width / 2 - ctx.measureText(list[0]).width / 2 - 60,    // TODO: make instance var??
                y: 200
            };
        },

        then: function(callback) {
            this.then = callback;
        },

        update: function() {
            if(lastKeyUp === KeyCode.ESC) {
                lastKeyUp = KeyCode.EMPTY;
                this.then(KeyCode.ESC);
            }
            else if(lastKeyUp === KeyCode.ENTER) {
                lastKeyUp = KeyCode.EMPTY;

                var date = new Date();
                var m = date.getMonth();
                var d = date.getDay();
                var y = date.getYear();
                var t = date.toLocaleTimeString();

                storage.save(arrow.slot, m + '/' + d + '/' + y + ' ' + t);
                this.then(KeyCode.ENTER);
            }
            else if(lastKeyUp === KeyCode.DELETE) {
                lastKeyUp = KeyCode.EMPTY;

                list = storage.erase(arrow.slot);
            }
            else if(arrow.slot !== 2 && lastKeyUp === KeyCode.DOWN) {
                lastKeyUp = KeyCode.EMPTY;

                ++arrow.slot;
                arrow.x = canvas.width / 2 - ctx.measureText(list[arrow.slot]).width / 2 - 60;
                arrow.y += 80;
            }
            else if(arrow.slot !== 0 && lastKeyUp === KeyCode.UP) {
                lastKeyUp = KeyCode.EMPTY;

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
//# sourceMappingURL=gamesCommon.js.map