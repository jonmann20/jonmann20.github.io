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


        init: function (g, v, vis) {
            $.extend(this, g);
            console.log(g);
            this.val = v;

            if (typeof (vis) !== "undefined")
                this.visible = vis;

            parentDraw = this.draw;
            this.draw = _draw();
        }

    };
};

