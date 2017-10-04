/* globals GameSave, canvas, ctx, KeyCode, game */

function GameSaveView() {
    this.privates = {};
    this.init();
}

GameSaveView.prototype = (function() {
    let that,
        title = 'Select a save slot',
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
                img: '>>',
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

                const date = new Date();
                const m = date.getMonth() + 1;
                const d = date.getDate();
                const y = date.getFullYear();
                const t = date.toLocaleTimeString();

                storage.save(arrow.slot, `${m}/${d}/${y} ${t}`);
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
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '36px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 80);

            ctx.font = '24px Arial';

            for(let i = 0; i < list.length; ++i) {
                ctx.fillText(list[i], canvas.width / 2 - ctx.measureText(list[i]).width / 2, 200 + i * 80);
            }

            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();