/*
    GameItem extends GameObj
    GameItem may extend SAT.Vector to be SAT.Polygon

    @param(GameObj) gObj A game object.
    @param(?number) val The value of the game item.
    @param(?bool) visible Whether the game item is displayed or not.
    @param(?bool) sat Whether to setup AABB.
*/
var GameItem = function (gObj, val, visible, sat) {
    utils.extend(this, gObj);
    

    this.val = typeof(val) !== "undefined" ? val : -1;
    this.visible = typeof(visible) !== "undefined" ? visible : true;
    
    //if (typeof (sat) !== "undefined" && sat === true) {
    //    $.extend(true, this, new SAT.Box(this.pos, this.w, this.h).toPolygon());
    //}

    //console.log(this);

    this.collected = false;
    this.holding = false;

    // TODO: make private
    var parentDraw = this.draw;
    this.draw = function () {
        //console.log(this.visible);
        if (this.visible && !this.collected) {
            parentDraw.apply(this);
        }
    };
};
