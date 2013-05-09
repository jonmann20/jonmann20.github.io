var Master = function(){
    
    // private
    var pageContent = "";
    var internal = 1; // access by this.internal

    // public
    return {
        main: function(str){
            this.pageContent = str;
        },
        init: function(){
            console.log(pageContent);
            //console.log('th: ' + this.main);
            $('main').html(main);
        }
    };
}();
