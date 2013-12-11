/// <reference path="../linker.js" />

/*
    Enemy extends GameObj

    @param(GameObj) gObj A game object (super class).
    @param(number?) health The hp of the enemy, 0 by default.
    @param(number) leftXBound The left x coordinate boundary.
    @param(number) rightXBound The right x coordinate boundary.
    @param(bool?) active Is the enemy allowed to move?
    @constructor
*/
var Enemy = function (gObj, health, leftXBound, rightXBound, active) {
    utils.extend(this, gObj);

    this.initHealth = this.health = health;
    this.leftXBound = leftXBound;
    this.rightXBound = rightXBound;
    this.active = (typeof (active) !== "undefined") ? active : false;
    this.deadOffScreen = false;

    // TODO: make private (and initHealth)
    this.dir = Dir.RIGHT;
    this.alive = true;
    this.deadOnScreen = false;
    this.clearDir = true;		// true = right; false = left;


    function drawHealth(that) {
        var healthLen = (that.w / that.initHealth) * that.health;

        ctx.fillStyle = "red";
        ctx.fillRect(that.x, that.y - 12, healthLen, 4);
    }

    var parentDraw = this.draw;
    this.draw = function () {
        if (this.alive || this.deadOnScreen) {
            if (this.initHealth > 1) {
                drawHealth(this);
            }

            ctx.save();
            if (this.deadOnScreen) {
                ctx.globalAlpha = 0.3;
            }

            parentDraw.apply(this);
            ctx.restore();
        }
    }
};

Enemy.prototype = {
    update: function () {
        if (this.deadOnScreen) {
            this.pos.x += this.clearDir ? 2 : -2;
            this.pos.y -= 9;

            if (this.pos.x < 0 || this.pos.x > FULLW) {
                this.deadOnScreen = false;
                this.deadOffScreen = true;
            }
        }
        else if (this.active && game.totalTicks % 3 === 0) {
            //if (this.pos.x < hero.pos.x)
            //    ++this.pos.x;
            //else if (this.pos.x > hero.pos.x)
            //    --this.pos.x;
            
            if (this.pos.x + hero.lvlX <= this.leftXBound)
                this.dir = Dir.RIGHT;
            else if (this.pos.x + hero.lvlX >= this.rightXBound)
                this.dir = Dir.LEFT;

            if (this.dir === Dir.RIGHT) {
                ++this.pos.x;
            }
            else {
                --this.pos.x;
            }
        }


    },

    death: function () {
        this.clearDir = (hero.dir == Dir.RIGHT);

        audio.enemyDeath.play();
        hero.xp += 15;
        this.alive = false;
        this.deadOnScreen = true;
    }
};