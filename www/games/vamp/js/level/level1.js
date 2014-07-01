/// <reference path="../linker.js" />

function Level1() {
    
    this.init();
}

Level1.prototype = (function() {


    return {
        projectiles: [],


        init: function() {
            for(var i = 0; i < 10; ++i) {
                var projectile = new SAT.Box(new SAT.Vector(
                    Math.floor((Math.random() * canvas.width) + 0),      // random number between 0 and canvas.width
                    canvas.height
                ), 10, 20).toPolygon();

                projectile.speed = Math.floor((Math.random() * 10) + 3) * 0.1;

                this.projectiles.push(projectile);
            }
        },

        update: function(){
            for(var i = 0; i < this.projectiles.length; ++i) {
                this.projectiles[i].pos.y -= this.projectiles[i].speed;
            }
        },

        render: function() {
            // background
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // projectiles

            ctx.fillStyle = "silver";
            for(var i = 0; i < this.projectiles.length; ++i){
                ctx.fillRect(this.projectiles[i].pos.x, this.projectiles[i].pos.y, 10, 20);
            }
        }
    };
})();