var Master = function(){
    // private
    var headContent = "",
        mainContent = "";

    headContent += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'> ";
    headContent += "<meta http-equiv='X-UA-Compatible' content='chrome=1' />";
    headContent += "<meta name='description' content='Jonmann20.github.com : ' />";
    
    headContent += "<link rel='stylesheet' type='text/css' media='screen' href='css/style.css'>";
    headContent += "<title>Jonmann20.github.com</title>";


    //<meta name='keywords' content='<?= $pageKeywords; ?>' />
    //<meta name='viewport' content='width=device-width' />

	//<link href='//fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:300,700' rel='stylesheet' type='text/css'>	
    //<link rel='icon' type='image/ico' href='<?= $pageRoot; ?>img/favicon.ico'>


    // public
    return {
        head: function(str){
            headContent += str;
        },
        main: function(str){    
            mainContent = str;
        },
        init: function(){
            $('head').html(headContent);
            $('main').html(mainContent);
        }
    };
}();
