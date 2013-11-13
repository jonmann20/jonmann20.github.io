var Enemy = function () {
    var parentDraw = null,
		initHealth = 0,
		alive = true,
		deadOnScreen = false,
		clearDir = true;		// true = right; false = left;

    function drawHealth(that) {
        var healthLen = (that.w / initHealth) * that.health;

        ctx.fillStyle = "red";
        ctx.fillRect(that.x, that.y - 12, healthLen, 4);
    }

    function _draw() {
        return function () {

            if (alive || deadOnScreen) {
                if (initHealth > 1)
                    drawHealth(this);


                ctx.save();
                if (deadOnScreen)
                    ctx.globalAlpha = 0.3;

                parentDraw.apply(this);
                ctx.restore();
            }
        }
    }

    return {
        active: false,
        health: 0,
        deadOffScreen: false,


        /*
            Initializes an Enemy.
         
            @param {GameObj=} gObj A game object (super class).
            @param {?number=} health The hp of the enemy, 0 by default.
            @constructor
        */
        init: function (gObj, health) {
            $.extend(this, gObj);

            if (typeof (health) !== "undefined") {
                this.health = initHealth = health;
            }

            parentDraw = this.draw;
            this.draw = _draw();
        },

        update: function () {
            if (deadOnScreen) {
                this.x += clearDir ? 2 : -2;
                this.y -= 9;

                if (this.x < 0 || this.x > FULLW) {
                    deadOnScreen = false;
                    this.deadOffScreen = true;
                }
            }
            else if (!alive)
                return;
            else if (this.active && game.totalTicks % 3 === 0) {
                if (this.x < hero.x)
                    ++this.x;
                else if (this.x > hero.x)
                    --this.x;
            }

        },

        death: function () {
            clearDir = (hero.dir == Dir.RIGHT);

            audio.enemyDeath.play();
            hero.xp += 2;
            alive = false;
            deadOnScreen = true;
        }

    };
};
