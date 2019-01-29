/* globals ctx, canvas */

class GameView {
	constructor() {
		this.privates = {
			bgColor: '#ccc'
		};

		this.init();
	}

	then(callback) {
		this.privates.callback = callback;
	}

	init() {

	}

	update() {

	}

	render() {
		ctx.fillStyle = this.privates.bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

export default GameView;