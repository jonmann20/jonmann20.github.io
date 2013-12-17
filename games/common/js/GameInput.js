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