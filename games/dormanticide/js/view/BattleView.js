'use strict';
/* globals game, canvas, ctx, KeyCode, Dir, FightAction */

function BattleView(bgColor, dormantL, dormantR) {
    this.privates = {
        bgColor: bgColor,
        dormantL: dormantL,
        dormantR: dormantR
    };

    this.init();
}

BattleView.prototype = (function() {
    let that,
        arrow = {
            img: '>>'
        },
        left,
        wasAttack,
        wasAttackTimer,
        fire,
        theAttack,
        dormantL,
        dormantR
    ;

    function checkInput(dormantL, dormantR) {
        switch(game.input.lastKeyDown) {
            case KeyCode.ENTER:
                game.input.lastKeyDown = KeyCode.EMPTY;

                theAttack.name = dormantL.actions[arrow.curSlot].name;
                theAttack.atk = (dormantL.atk * dormantL.actions[arrow.curSlot].multiplier) / dormantR.def;

                return true;
            case KeyCode.UP:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(arrow.curSlot !== 0 && dormantL.actions[arrow.curSlot - 1] !== null) {
                    --arrow.curSlot;
                    arrow.y -= 30;
                }
                break;
            case KeyCode.DOWN:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(arrow.curSlot !== 3 && dormantL.actions[arrow.curSlot + 1] !== null) {
                    ++arrow.curSlot;
                    arrow.y += 30;
                }
                break;
        }
    }

    function runTackleAnimation() {
        left.dir = Dir.RIGHT;

        game.graphics.repeatAction(6, 60, function() {
            if(left.dir === Dir.RIGHT && left.x > 60) {
                left.dir = Dir.LEFT;
            }

            if(left.dir === Dir.RIGHT) {
                ++left.x;
            }
            else {
                --left.x;
            }

            dormantR.hp -= theAttack.atk / 60;
        });
    }

    /****** Render *****/
    function drawDormantHUD(dormant, x, y, drawXP) {
        // name
        let str = dormant.name + ' L' + dormant.lvl;

        ctx.fillStyle = '#000';
        ctx.fillText(str, x + ctx.measureText(str).width / 2, y);

        // hp
        ctx.fillText('HP', x, y + 20);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x + 21, y + 12, 100, 10);

        ctx.fillStyle = 'red';
        ctx.fillRect(x + 22, y + 13, dormant.hp * (100 / dormant.initHP) - 1, 8);

        // xp
        if(drawXP) {
            ctx.fillStyle = '#000';
            ctx.fillText('XP', x, y + 40);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(x + 21, y + 32, 100, 10);

            ctx.fillStyle = '#777';
            ctx.fillRect(x + 22, y + 33, dormant.xp * (100 / dormant.xpNeeded) - 1, 8);
        }
    }

    function drawHUD() {
        ctx.strokeStyle = '#000';
        ctx.strokeRect(20, 300, 500, 250);

        ctx.font = '12px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText('ATK: ' + dormantL.atk, 460, 320);
        ctx.fillText('DEF: ' + dormantL.def, 460, 340);

        drawActionList();
        drawActionArrow();
    }

    function drawActionList() {
        ctx.fillStyle = '#000';

        for(let i = 0; i < 4; ++i) {
            if(dormantL.actions[i] === null) {
                ctx.fillText('--', 80, 350 + i * 30);
            }
            else {
                ctx.fillText(dormantL.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    function drawActionArrow() {
        ctx.fillStyle = '#000';
        ctx.fillText(arrow.img, arrow.x, arrow.y);
    }


    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            that = this;
            arrow.x = 43;
            arrow.y = 350;
            arrow.curSlot = 0;

            left = {
                x: 30,
                dir: Dir.RIGHT
            };

            fire = {
                x: 0,
                y: 0
            };

            wasAttack = false;
            wasAttackTimer = 60;
            theAttack = {
                name: 'EMPTY',
                atk: 0
            };

            dormantL = this.privates.dormantL;
            dormantR = this.privates.dormantR;
        },

        update: function() {
            if(wasAttack) {
                dormantR.hp -= theAttack.atk / 60;
            }

            if(!game.graphics.isAnimating) {
                const _wasAttack = checkInput(dormantL, dormantR);

                if(_wasAttack) {
                    if(theAttack.name === FightAction.TACKLE.name) {
                        runTackleAnimation();
                    }
                    else if(theAttack.name === FightAction.DRAGONS_BREATH.name) {
                        wasAttack = true;
                    }
                }
            }

            if(dormantR.hp <= 0) {
                dormantL.xp += 25;
                this.privates.callback();
            }
        },

        render: function () {
            // background
            ctx.fillStyle = this.privates.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // left
            drawDormantHUD(dormantL, 10, 15, true);
            dormantL.draw(left.x, 90);
            drawHUD();

            // right
            drawDormantHUD(dormantR, canvas.width - 130, 15, false);
            dormantR.draw(770, 90);

            // attack animation
            if(wasAttack) {
                let t = (wasAttackTimer % 40);

                if(t >= 0 && t < 10) {
                    fire.x = 0;
                }
                else if(t >= 10 && t < 20) {
                    fire.x = 5;
                }
                else if(t >= 20 && t < 30) {
                    fire.x = 0;
                }
                else if(t >= 30 && t < 40) {
                    fire.x = -5;
                }

                ctx.fillStyle = 'red';
                ctx.fillRect(870 + fire.x, 242, 40, 12);
                ctx.fillRect(880 + fire.x, 230, 30, 12);
                ctx.fillRect(880 + fire.x, 218, 20, 12);


                if(wasAttackTimer-- === 0) {
                    wasAttack = false;
                    wasAttackTimer = 60;
                }
            }
        }
    };
})();