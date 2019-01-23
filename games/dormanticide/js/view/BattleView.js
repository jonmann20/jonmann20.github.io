'use strict';
/* globals game, canvas, ctx, KeyCode, Dir, FightAction */

class BattleView {
    constructor(bgColor, dormantL, dormantR) {
        this._arrow = {
            img: '>>'
        };

        this.privates = {
            bgColor: bgColor,
            dormantL: dormantL,
            dormantR: dormantR
        };

        this.init();
    }

    then(callback) {
        this.privates.callback = callback;
    }

    init() {
        this._arrow.x = 43;
        this._arrow.y = 350;
        this._arrow.curSlot = 0;

        this._left = {
            x: 30,
            dir: Dir.RIGHT
        };

        this._fire = {
            x: 0,
            y: 0
        };

        this._wasAttack = false;
        this._wasAttackTimer = 60;
        this._theAttack = {
            name: 'EMPTY',
            atk: 0
        };

        this._dormantL = this.privates.dormantL;
        this._dormantR = this.privates.dormantR;
    }

    _checkInput() {
        switch(game.input.lastKeyDown) {
            case KeyCode.ENTER:
                game.input.lastKeyDown = KeyCode.EMPTY;

                this._theAttack.name = this._dormantL.actions[this._arrow.curSlot].name;
                this._theAttack.atk = (this._dormantL.atk * this._dormantL.actions[this._arrow.curSlot].multiplier) / this._dormantR.def;

                return true;
            case KeyCode.UP:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(this._arrow.curSlot !== 0 && this._dormantL.actions[this._arrow.curSlot - 1] !== null) {
                    --this._arrow.curSlot;
                    this._arrow.y -= 30;
                }
                break;
            case KeyCode.DOWN:
                game.input.lastKeyDown = KeyCode.EMPTY;

                if(this._arrow.curSlot !== 3 && this._dormantL.actions[this._arrow.curSlot + 1] !== null) {
                    ++this._arrow.curSlot;
                    this._arrow.y += 30;
                }
                break;
        }
    }

    update() {
        if(this._wasAttack) {
            this._dormantR.hp -= this._theAttack.atk / 60;
        }

        if(!game.graphics.isAnimating) {
            const wasAttack = this._checkInput();

            if(wasAttack) {
                if(this._theAttack.name === FightAction.TACKLE.name) {
                    this._runTackleAnimation();
                }
                else if(this._theAttack.name === FightAction.DRAGONS_BREATH.name) {
                    this._wasAttack = true;
                }
            }
        }

        if(this._dormantR.hp <= 0) {
            this._dormantL.xp += 25;
            this.privates.callback();
        }
    }

    _runTackleAnimation() {
        this._left.dir = Dir.RIGHT;

        game.graphics.repeatAction(6, 60, () => {
            if(this._left.dir === Dir.RIGHT && this._left.x > 60) {
                this._left.dir = Dir.LEFT;
            }

            if(this._left.dir === Dir.RIGHT) {
                ++this._left.x;
            }
            else {
                --this._left.x;
            }

            this._dormantR.hp -= this._theAttack.atk / 60;
        });
    }

    render() {
        // background
        ctx.fillStyle = this.privates.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // left
        this._drawDormantHUD(this._dormantL, 10, 15, true);
        this._dormantL.draw(this._left.x, 90);
        this._drawHUD();

        // right
        this._drawDormantHUD(this._dormantR, canvas.width - 130, 15, false);
        this._dormantR.draw(770, 90);

        // attack animation
        if(this._wasAttack) {
            const t = (this._wasAttackTimer % 40);

            if(t >= 0 && t < 10) {
                this._fire.x = 0;
            }
            else if(t >= 10 && t < 20) {
                this._fire.x = 5;
            }
            else if(t >= 20 && t < 30) {
                this._fire.x = 0;
            }
            else if(t >= 30 && t < 40) {
                this._fire.x = -5;
            }

            ctx.fillStyle = 'red';
            ctx.fillRect(870 + this._fire.x, 242, 40, 12);
            ctx.fillRect(880 + this._fire.x, 230, 30, 12);
            ctx.fillRect(880 + this._fire.x, 218, 20, 12);

            if(this._wasAttackTimer-- === 0) {
                this._wasAttack = false;
                this._wasAttackTimer = 60;
            }
        }
    }

    _drawDormantHUD(dormant, x, y, drawXP) {
        // name
        const str = `${dormant.name} L${dormant.lvl}`;

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

    _drawHUD() {
        ctx.strokeStyle = '#000';
        ctx.strokeRect(20, 300, 500, 250);

        ctx.font = '12px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText('ATK: ' + this._dormantL.atk, 460, 320);
        ctx.fillText('DEF: ' + this._dormantL.def, 460, 340);

        this._drawActionList();
        this._drawActionArrow();
    }

    _drawActionList() {
        ctx.fillStyle = '#000';

        for(let i = 0; i < 4; ++i) {
            if(this._dormantL.actions[i] === null) {
                ctx.fillText('--', 80, 350 + i * 30);
            }
            else {
                ctx.fillText(this._dormantL.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    _drawActionArrow() {
        ctx.fillStyle = '#000';
        ctx.fillText(this._arrow.img, this._arrow.x, this._arrow.y);
    }
}