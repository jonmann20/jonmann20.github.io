'use strict';

const KeyCode = {
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
};

let KeyCodeNames = {};
KeyCodeNames[-1] = 'EMPTY';
KeyCodeNames[13] = 'ENTER';
KeyCodeNames[17] = 'CTRL';
KeyCodeNames[27] = 'ESC';
KeyCodeNames[32] = 'SPACEBAR';
KeyCodeNames[37] = 'LEFT';
KeyCodeNames[38] = 'UP';
KeyCodeNames[39] = 'RIGHT';
KeyCodeNames[40] = 'DOWN';
KeyCodeNames[46] = 'DELETE';
KeyCodeNames[65] = 'A';
KeyCodeNames[68] = 'D';
KeyCodeNames[70] = 'F';
KeyCodeNames[72] = 'H';
KeyCodeNames[74] = 'J';
KeyCodeNames[75] = 'K';
KeyCodeNames[77] = 'M';
KeyCodeNames[79] = 'O';
KeyCodeNames[82] = 'R';
KeyCodeNames[83] = 'S';
KeyCodeNames[87] = 'W';

class GameInput {
	constructor() {
		this.keysDown = {};
		this.lastKeyDown = KeyCode.EMPTY;

		let lastKeyUp = KeyCode.EMPTY;

		addEventListener('keydown', e => {
			const key = this.fixKey(e.keyCode);

			if(!this.keysDown[key]) {
				this.lastKeyDown = key;
				this.keysDown[key] = true;
			}
		});

		addEventListener('keyup', e => {
			lastKeyUp = this.fixKey(e.keyCode);
			delete this.keysDown[lastKeyUp];
		});
	}

	fixKey(key) {
		if(key === KeyCode.W) {
			key = KeyCode.UP;
		}
		else if(key === KeyCode.S) {
			key = KeyCode.DOWN;
		}
		else if(key === KeyCode.D) {
			key = KeyCode.RIGHT;
		}
		else if(key === KeyCode.A) {
			key = KeyCode.LEFT;
		}

		return key;
	}
}