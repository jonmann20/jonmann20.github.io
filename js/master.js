var Master = function(){
    var main = "";

    return {
        init: function(){
            
            console.log(main);
            
            $('main').html(main);
        }
    };
}();

var globalX;
