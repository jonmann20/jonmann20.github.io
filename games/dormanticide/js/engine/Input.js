var KeyCode = Object.freeze({
    ENTER: 13,
    CTRL: 17,
    UP: 38,
    DOWN: 40,
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
    W: 87,
    EMPTY: -1,
    SPACEBAR: 32
});

function Input() {
    keysDown = {};
    lastKeyUp = KeyCode.EMPTY;

    function fixKey(key) {
        if (key === KeyCode.UP)
            key = KeyCode.W;
        else if (key === KeyCode.DOWN)
            key = KeyCode.S;

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