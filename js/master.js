// plugins/libraries
document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"><\/script>')

var Master = function(){
    var main = "";

    return {
        init: function(){
            $(document.body).append(main);
        }
    };
}();

$(function(){
    Master.init();
});
