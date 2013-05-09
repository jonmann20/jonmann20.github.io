var Master = function(){
    // private
    var headContent = "",
        mainContent = "",
        pageRoot = "";

    // public
    return {
        head: function(str){
            headContent += str;
        },
        main: function(str){    
            mainContent = str;
        },
        root: function(str){
            pageRoot = str;
        },
        init: function(){
            this.setHead();
            $('main').append(mainContent);
            
            $('.curYear').text(Date().getFullYear());
        },
        
        setHead: function(){
            headContent += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'> ";
            headContent += "<meta http-equiv='X-UA-Compatible' content='chrome=1' />";
            headContent += "<meta name='description' content='Jonmann20.github.com : ' />";
            headContent += "<meta name='keywords' content='' />";
            headContent += "<meta name='viewport' content='width=device-width' />";
            headContent += "<link href='//fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:300,700' rel='stylesheet' type='text/css'>";
            headContent += "<link rel='icon' type='image/ico' href='" + pageRoot + "/img/favicon.ico'>";
            
            headContent += "<link rel='stylesheet' type='text/css' media='screen' href='" + pageRoot + "css/style.css'>";
            headContent += "<title>Jonmann20.github.com</title>";
            
            $('head').html(headContent);
        },
        
        /* Utilities */
        hereDoc: function(f) {
          return f.toString().
              replace(/^[^\/]+\/\*!?/, '').
              replace(/\*\/[^\/]+$/, '');
        }
    };
}();
