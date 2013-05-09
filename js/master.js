var Master = function(){
    // private
    var headContent = "",
        mainContent = "";

    headContent += "<meta charset='utf-8' />";
    headContent += "<meta http-equiv='X-UA-Compatible' content='chrome=1' />";
    headContent += "<meta name='description' content='Jonmann20.github.com : ' />";
    
    headContent += "<link rel='stylesheet' type='text/css' media='screen' href='css/style.css'>";
    headContent += "<title>Jonmann20.github.com</title>";


    // public
    return {
        head: function(str){
            headContent += str;
        }
        main: function(str){    
            mainContent = str;
        },
        init: function(){
            $('head').html(headContent);
            $('main').html(mainContent);
        }
    };
}();
