var Master = function(){
    // private
    var internal = 1; // access by this.internal

    // public
    return {
        main: "",
        init: function(){
            console.log(main);
            console.log('th: ' + this.main);
            $('main').html(main);
        }
    };
}();
