/// <reference path="../linker.js" />

function OverworldView() {
    this.privates = {};
    this.init();
}

OverworldView.prototype = (function () {

    var arrow = {
        img: "^^"
    };

    return {
        then: function(callback){
            this.privates.callback = callback;
        },

        init: function() {
            arrow.x = 90;
            arrow.y = canvas.height / 2 + 70;
            arrow.slot = 0;
        },

        update: function () {
            if (game.input.lastKeyDown === KeyCode.ENTER) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                this.privates.callback();
            }
            else if (game.input.lastKeyDown === KeyCode.RIGHT) {
                game.input.lastKeyDown = KeyCode.EMPTY;
                
                if (arrow.slot < 7) {
                    arrow.x += 115;
                    ++arrow.slot;
                }
            }
            else if (game.input.lastKeyDown === KeyCode.LEFT) {
                game.input.lastKeyDown = KeyCode.EMPTY;

                if (arrow.slot > 0) {
                    arrow.x -= 115;
                    --arrow.slot;
                }
            }
        },

        render: function () {
            // background
            ctx.fillStyle = "#34282c";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // levels
            var size = 80, x, y;

            for (var i = 0; i < 8; ++i) {
                x = 60 + i * 115;
                y = canvas.height / 2 - size / 2;

                ctx.fillStyle = "#fff";
                ctx.font = "18px Arial";
                ctx.fillText("Level " + (i+1), x + 10, y - 13);

                ctx.fillStyle = "red";
                ctx.fillRect(x, y, size, size);
            }

            // arrow
            ctx.fillStyle = "#fff";
            ctx.fillText(arrow.img, arrow.x, arrow.y);
        }
    };
})();
/// <reference path="../linker.js" />

/*
    Implements GameView.

    @param(string) bgColor The view background color.
    @param(Dormant) dormantL The player's dormant.
    @param(Dormant) dormantR The opponent's dormant.
*/
function BattleView(bgColor, dormantL, dormantR) {
    this.privates = {
        bgColor: bgColor,
        dormantL: dormantL,
        dormantR: dormantR
    };

    this.init();
}

BattleView.prototype = (function () {

    var that,
        arrow = {
            img: ">>"
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
                break;
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

            if(left.dir === Dir.RIGHT)
                ++left.x;
            else
                --left.x;

            dormantR.hp -= theAttack.atk / 60;
        });
    }

    /****** Render *****/
    function drawDormantHUD(dormant, x, y, drawXP) {
        // name
        var str = dormant.name + "  L" + dormant.lvl;

        ctx.fillStyle = "#000";
        ctx.fillText(str, x + ctx.measureText(str).width / 2, y);

        // hp
        ctx.fillText("HP", x, y + 20);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(x + 21, y + 12, 100, 10);

        ctx.fillStyle = "red";
        ctx.fillRect(x + 22, y + 13, dormant.hp * (100 / dormant.initHP) - 1, 8);

        // xp
        if(drawXP) {
            ctx.fillStyle = "#000";
            ctx.fillText("XP", x, y + 40);
            ctx.strokeStyle = "#000";
            ctx.strokeRect(x + 21, y + 32, 100, 10);

            ctx.fillStyle = "#777";
            ctx.fillRect(x + 22, y + 33, dormant.xp * (100 / dormant.xpNeeded) - 1, 8);
        }
    }

    function drawHUD() {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(20, 300, 500, 250);

        ctx.font = "12px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("ATK: " + dormantL.atk, 460, 320);
        ctx.fillText("DEF: " + dormantL.def, 460, 340);

        drawActionList();
        drawActionArrow();
    }

    function drawActionList() {
        ctx.fillStyle = "#000";

        for (var i = 0; i < 4; ++i) {
            if (dormantL.actions[i] === null) {
                ctx.fillText("--", 80, 350 + i * 30);
            }
            else {
                ctx.fillText(dormantL.actions[i].name, 80, 350 + i * 30);
            }
        }
    }

    function drawActionArrow() {
        ctx.fillStyle = "#000";
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
                name: "EMPTY",
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
                var _wasAttack = checkInput(dormantL, dormantR);
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

                var t = (wasAttackTimer % 40);
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

                ctx.fillStyle = "red";
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
/// <reference path="../linker.js" />

/*
    @param(string) name The name of the dormant.
    @param(number) atk The attack strength of the dormant.
    @param(number) def The defense strength of the dormant.
    @param(number) hp The total available health points of the dormant.
    @param(array) actions The fight actions of the dormant.
    @param(?number) lvl The level of the dormant. (1 by default)
*/
function Dormant(src, name, atk, def, hp, actions, lvl) {
    var that = this;

    this.img = new Image();
    this.imgReady = false;
    this.img.onload = function () {
        that.imgReady = true;
    };
    this.img.src = "img/" + src;

    this.name = name;
    this.atk = atk;
    this.def = def;
    this.initHP = this.hp = hp;
    this.actions = actions;
    this.lvl = (typeof (lvl) !== "undefined") ? lvl : 1;
    this.xp = 0;
    this.xpNeeded = 50;
}

Dormant.prototype = (function () {

    return {
        draw: function (x, y) {
            if (this.imgReady) {
                ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
            }
        }
    };
})();

var FightAction = Object.freeze({
    TACKLE: {
        name: "TACKLE",
        multiplier: 1
    },
    HEAL: {
        name: "HEAL",
        multiplier: 1
    },
    DRAGONS_BREATH: {
        name: "DRAGONS BREATH",
        multiplier: 5
    }
});
/// <reference path="linker.js" />

/*
    The main class for dormanticide.
    Declares game as a global.
*/
(function Main() {

    game = new GameEngine();
    game.start();

    var curLvl = 1;

    var titleView = new TitleView("Dormanticide");
    titleView.then(function () {
        game.utils.switchView(overworldView);
    });

    var overworldView = new OverworldView();
    overworldView.then(function () {
        if (curLvl === 1)
            game.utils.switchView(lvl1);
        else
            game.utils.switchView(lvl2);
    });


    var actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

    var malaise = new Dormant("malaise.png", "MALAISE", 12, 8, 27, actions);
    var erabor = new Dormant("erabor.png", "ERABOR", 8, 12, 23, actions);
    var tildamesh = new Dormant("tildamesh.png", "TILDAMESH", 8, 12, 23, actions);


    var lvl1 = new BattleView("#ddd", malaise, erabor);
    lvl1.then(function () {
        ++curLvl;
        game.utils.switchView(overworldView);
    });

    var lvl2 = new BattleView("#ddd", malaise, tildamesh);
    lvl2.then(function () {
        game.utils.switchView(overworldView);
    });


    game.view = titleView;
})();
//# sourceMappingURL=pageDormanticide.js.map