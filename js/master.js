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
