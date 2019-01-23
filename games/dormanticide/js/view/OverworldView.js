'use strict';
/* globals game, canvas, ctx, KeyCode */

class OverworldView {
    constructor() {
        this._arrow = {
            img: '^^'
        };

        this.privates = {};
        this.init();
    }

    then(callback){
        this.privates.callback = callback;
    }

    init() {
        this._arrow.x = 90;
        this._arrow.y = canvas.height / 2 + 70;
        this._arrow.slot = 0;
    }

    update() {
        if(game.input.lastKeyDown === KeyCode.ENTER) {
            game.input.lastKeyDown = KeyCode.EMPTY;
            this.privates.callback();
        }
        else if(game.input.lastKeyDown === KeyCode.RIGHT) {
            game.input.lastKeyDown = KeyCode.EMPTY;

            if(this._arrow.slot < 7) {
                this._arrow.x += 115;
                ++this._arrow.slot;
            }
        }
        else if(game.input.lastKeyDown === KeyCode.LEFT) {
            game.input.lastKeyDown = KeyCode.EMPTY;

            if(this._arrow.slot > 0) {
                this._arrow.x -= 115;
                --this._arrow.slot;
            }
        }
    }

    render() {
        // background
        ctx.fillStyle = '#34282c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // levels
        let size = 80, x, y;

        for (let i = 0; i < 8; ++i) {
            x = 60 + i * 115;
            y = canvas.height / 2 - size / 2;

            ctx.fillStyle = '#fff';
            ctx.font = '18px Arial';
            ctx.fillText('Level ' + (i+1), x + 10, y - 13);

            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, size, size);
        }

        // arrow
        ctx.fillStyle = '#fff';
        ctx.fillText(this._arrow.img, this._arrow.x, this._arrow.y);
    }
}