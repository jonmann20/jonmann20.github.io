function Vamp() {
    this.init();
}

Vamp.prototype = (function() {
    var img = new Image(),
        imgReady = false
    ;
    img.onload = function() {
        imgReady = true;
    };
    img.src = "img/vamp.png";

    var speed = 4;

    return {
        w: 40,
        h: 40,
        hp: 3,
        invincible: false,
        invincibleTimer: 120,

        init: function(){
            $.extend(this, new SAT.Box(new SAT.Vector(0, 0), this.w, this.h).toPolygon());
        },

        update: function() {
            // horizontal
            if(game.input.keysDown[KeyCode.RIGHT]){
                this.pos.x += speed;
            }
            else if(game.input.keysDown[KeyCode.LEFT]) {
                this.pos.x -= speed;
            }

            // vertical
            if(game.input.keysDown[KeyCode.UP]) {
                this.pos.y -= speed;
            }
            else if(game.input.keysDown[KeyCode.DOWN]) {
                this.pos.y += speed;
            }

            if(this.hp <= 0) {
                alert("You died");
                location.reload();
            }
        },

        render: function() {
            // body
            var doDraw = true;
            if(this.invincible) {
                var t = this.invincibleTimer % 30;
                if(t >= 0 && t < 15)
                    doDraw = false;
            }

            if(doDraw) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
            }

            // health
            ctx.fillStyle = "red";
            for(var i = 0; i < this.hp; ++i) {
                ctx.fillRect(this.pos.x - 10 + i*20, this.pos.y - 20, 20, 10);
            }
        }
    };
})();
