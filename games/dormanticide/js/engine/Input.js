var KeyCode = Object.freeze({
    ENTER: 13,
    CTRL: 17,
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

    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, true);

    addEventListener("keyup", function (e) {
        lastKeyUp = e.keyCode;
        delete keysDown[e.keyCode];
    }, false);
}

//Input.prototype = function () {

//    return {
//        update: function () {

//        }
//    };
//};