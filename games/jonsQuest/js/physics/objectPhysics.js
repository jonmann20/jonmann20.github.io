/// <reference path="../linker.js" />

// TODO: abstract to any item (not just crates)

var Crate = (function () {

    return {
        update: function () {
            // alias
            var crates = level.crates;

            // crates and crates
            var response = new SAT.Response();
            for (var i = 0; i < crates.length; ++i) {
                for (var j = 0; j < crates.length; ++j) {
                    if (i !== j && !crates[i].holding && !crates[j].holding) {
                        var collided = SAT.testPolygonPolygon(crates[i], crates[j], response);

                        if (collided) {
                            if (response.overlapN.y === 1) {   // a is on top of b
                                response.a.pos.x -= response.overlapV.x;
                                response.a.pos.y -= response.overlapV.y;

                                response.a.isOnObj = true;
                                response.a.onObj = response.b;
                                response.b.grabbable = false;

                                level.items.push(response.a);
                            }
                            else {
                                //response.a.isOnObj = false;
                            }
                        }

                        response.clear();
                    }
                }
            }

            // crates and level; hero and crates
            for (var i = 0; i < crates.length; ++i) {

                if (!crates[i].holding) {
                    Physics.lvlObjCollision(crates[i], function (r) {
                        if (r.type === JQObject.FLOOR) return;

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
                    if (hero.dir === Dir.RIGHT)
                        crates[i].pos.x = hero.pos.x + 22;
                    else
                        crates[i].pos.x = hero.pos.x - 22;

                    crates[i].pos.y = hero.pos.y;
                }

                crates[i].updatePos();
            }
        }
    };
})();