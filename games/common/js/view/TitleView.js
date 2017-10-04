'use strict';
/* globals game, canvas, ctx, KeyCode */

/*
 *  Implements GameView.
 */
function TitleView(title) {
    this.privates = {
        title: title
    };

    this.init();
}

TitleView.prototype = (function() {
    let title,
        cta = 'Press Enter'
    ;

    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            title = this.privates.title;
        },

        update: function() {
            if(game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
        },

        render: () => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '36px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(title, canvas.width / 2 - ctx.measureText(title).width / 2, 100);

            ctx.font = '24px Arial';
            ctx.fillText(cta, canvas.width / 2 - ctx.measureText(cta).width / 2, canvas.height / 2);
        }
    };
})();