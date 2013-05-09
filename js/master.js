var Master = function(){
    // public
    main = "";

    // private
    var internal = 1; // access by this.internal

    return {
        init: function(){
            console.log(main);
            console.log('th: ' + this.main);
            $('main').html(main);
        }
    };
}();
