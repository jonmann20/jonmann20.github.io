var Master = function(){
    // private
    var headContent = "
        <meta charset='utf-8' />
        <meta http-equiv='X-UA-Compatible' content='chrome=1' />
        <meta name='description' content='Jonmann20.github.com : ' />
        
        <link rel='stylesheet' type='text/css' media='screen' href='css/style.css'>
        <title>Jonmann20.github.com</title>
    ",
        mainContent = "";

    // public
    return {
        head: function(str){
            headContent = str;
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
