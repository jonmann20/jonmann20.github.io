function GameEngine() {
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