var Master = function(){
    var main = "";

    return {
        init: function(){
            
            console.log(this.main);
            console.log(globalX);
            
            $('main').html(main);
        }
    };
}();

var globalX;
