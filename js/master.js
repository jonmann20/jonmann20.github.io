var Master = function(){
    var main = "";

    return {
        init: function(){
            $('main').append(main);
        }
    };
}();

$(function(){
    Master.init();
});
