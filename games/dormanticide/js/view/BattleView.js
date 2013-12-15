/// <reference path="../linker.js" />

/*
    @param(string) bgColor The view background color.
    @param(Dormant) dormantL The player's dormant.
    @param(Dormant) dormantR The opponent's dormant.
*/
function BattleView(bgColor, dormantL, dormantR) {
    this.bgColor = bgColor;
    this.dormantL = dormantL;
    this.dormantR = dormantR;
}

BattleView.prototype = (function () {

    var arrow = {
        x: 43,
        y: 350,
        curSlot: 0
    };

    function drawDormantHUD(dormant, x, y) {
        ctx.fillStyle = "#000";
        ctx.fillText(dormant.name + "  L" + dormant.lvl, x + 40, y);
        ctx.fillText("HP", x, y + 20);

        ctx.strokeStyle = "#000";
        ctx.strokeRect(x + 20, y + 12, 100, 10);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 21, y + 13, dormant.hp * (100/dormant.initHP) - 1, 8);
    }
    
    function drawHUD(dormant) {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(20, 300, 500, 250);

        ctx.fillStyle = "#000";
        ctx.fillText("ATK: " + dormant.atk, 460, 320);
        ctx.fillText("DEF: " + dormant.def, 460, 340);
    }

    function drawActions(dormant) {
        ctx.fillStyle = "#000";

        for (var i = 0; i < 4; ++i) {
            if (dormant.actions[i] === null) {
                ctx.fillText("--", 80, 350 + i * 30);
            }
            else {
                ctx.fillText(dormant.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    function drawActionArrow() {
        ctx.fillStyle = "#000";
        ctx.fillText(">>", arrow.x, arrow.y);
    }


    return {
        update: function () {
            switch(lastKeyUp){
                case KeyCode.ENTER:
                    this.dormantR.hp -= (this.dormantL.atk * this.dormantL.actions[arrow.curSlot].multiplier) / this.dormantR.def;
                    lastKeyUp = KeyCode.EMPTY;
                    break;
                case KeyCode.W:
                    if (arrow.curSlot !== 0 && this.dormantL.actions[arrow.curSlot - 1] !== null) {
                        --arrow.curSlot;
                        arrow.y -= 30;
                    }
                    break;
                case KeyCode.S:
                    if (arrow.curSlot !== 3 && this.dormantL.actions[arrow.curSlot + 1] !== null) {
                        ++arrow.curSlot;
                        arrow.y += 30;
                    }
                    break;
            }
        },

        render: function () {
            // background
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // left
            drawDormantHUD(this.dormantL, 10, 15);
            drawHUD(this.dormantL);
            drawActions(this.dormantL);
            drawActionArrow();

            // right
            drawDormantHUD(this.dormantR, canvas.width - 130, 15);
        }
    };
})();