var Master = function(){
    var main = "";

    return {
        init: function(){
            
            console.log(main);
            console.log(globalX);
            
            $('main').html(main);
        }
    };
}();

var globalX;
