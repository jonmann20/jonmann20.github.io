var Master = function(){
    // public
    main = "";

    // private
    var internal = 1; // access by this.internal

    return {
        init: function(){
            $('main').html(main);
        }
    };
}();
