/*
    Enemy extends GameObj

    @param {GameObj=} gObj A game object (super class).
    @param {?number=} health The hp of the enemy, 0 by default.
    @constructor
*/
var Enemy = function (gObj, health) {
    utils.extend(this, gObj);

    this.active = false;
    this.health = 0;
    this.deadOffScreen = false;

    if (typeof (health) !== "undefined") {
        this.health = initHealth = health;
    }

    // TODO: make private
    this.alive = true;
    this.deadOnScreen = false;
    this.clearDir = true;		// true = right; false = left;

    var parentDraw = null,
        initHealth = 0
    ;

    function drawHealth(that) {
        var healthLen = (that.w / initHealth) * that.health;

        ctx.fillStyle = "red";
        ctx.fillRect(that.x, that.y - 12, healthLen, 4);
    }

    var parentDraw = this.draw;
    this.draw = function () {
        if (this.alive || this.deadOnScreen) {
            if (initHealth > 1) {
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
        else if (!this.alive)
            return;
        else if (this.active && game.totalTicks % 3 === 0) {
            if (this.pos.x < hero.pos.x)
                ++this.pos.x;
            else if (this.pos.x > hero.pos.x)
                --this.pos.x;
        }

    },

    death: function () {
        this.clearDir = (hero.dir == Dir.RIGHT);

        audio.enemyDeath.play();
        hero.xp += 2;
        this.alive = false;
        this.deadOnScreen = true;
    }
};