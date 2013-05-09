var Master = function(){
    
    // private
    var main = "";
    var internal = 1; // access by this.internal

    // public
    return {
        main: function(str){
            main = str;
        },
        init: function(){
            console.log(main);
            console.log('th: ' + this.main);
            $('main').html(main);
        }
    };
}();
