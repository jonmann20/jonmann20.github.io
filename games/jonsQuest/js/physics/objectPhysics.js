/// <reference path="../linker.js" />

var Crate = (function () {

    return {
        update: function () {
            // alias
            var crates = level.crates;

            // crates and level; hero and crates
            for (var i = 0; i < crates.length; ++i) {
                if (!crates[i].holding) {
                    Physics.lvlObjCollision(crates[i], function (r) {
                        if (r.b.type === JQObject.FLOOR) return;

                        if (r.overlapN.y === 1) {    // crate on top of platform
                            r.a.vY = 0;
                            level.items.push(r.a);
                            r.a.onPlatform = true;
                            r.a.grabbable = false;
                            r.b.holdingItem = JQObject.CRATE;

                            utils.repeatAction(70, 8, function () {
                                ++r.a.pos.y;
                                ++r.b.pos.y;
                            });

                            audio.thud.play();
                        }
                        //else {
                        //    r.b.holdingItem = "none";
                        //}
                    });

                    var idx = level.items.indexOf(crates[i]);
                    if (idx < 0 && crates[i].isOnObj) {
                        level.items.push(crates[i]);
                    }
                }
                else {
                    if (hero.vX === 0) {
                        crates[i].pos.x = hero.pos.x + 2;
                        crates[i].pos.y = hero.pos.y + 11;
                    }
                    else {
                        crates[i].pos.x = hero.pos.x + ((hero.dir === Dir.RIGHT) ? 22 : -22);
                        crates[i].pos.y = hero.pos.y + 5;
                    }
                }

                //crates[i].updatePos();
            }
        }
    };
})();