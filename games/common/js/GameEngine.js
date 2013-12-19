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
