var GameItem = function () {

    var parentDraw = null;

    function _draw() {
        return function () {
            if (this.visible && !this.collected) {
                parentDraw.apply(this);
            }

        };
    }


    return {
        collected: false,
        holding: false,
        visible: true,
        val: -1,

        /*
            Initializes a Game Item.
         
            @param {GameObj=} gObj A game object (super class).
            @param {?number=} val The value of the game item, -1 by default.
            @param {?bool=} visible A visibility flag, true by default.
            @param {?bool=} sat A flag to add the SAT functionality to the game item, not enabled by default.
            @constructor
        */
        init: function (gObj, val, visible, sat) {
            $.extend(this, gObj);

            if (typeof(val) !== "undefined") {
                this.val = val;
            }

            if (typeof (visible) !== "undefined") {
                this.visible = visible;
            }

            if (typeof (sat) !== "undefined" && sat === true) {
                $.extend(this, new SAT.Box(new SAT.Vector(this.x, this.y), this.w, this.h).toPolygon());
            }

            parentDraw = this.draw;
            this.draw = _draw();
        }

    };
};
