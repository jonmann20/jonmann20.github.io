function tplView() {
    this.privates = {

    };

    this.init();
}

tplView.prototype = (function() {
    var that;

    return {
        then: function(callback) {
            this.privates.callback = callback;
        },

        init: function() {
            that = this;
        },

        update: function() {

        },

        render: function() {

        }
    };
})();


/*
    Usage:

    var inst = new tplView();
    inst.then(function(){
            
    });
*/