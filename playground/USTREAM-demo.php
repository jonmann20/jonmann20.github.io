<? ob_start();
    
    /****** Utils *****/
    function pprint($arr){
        echo '<pre>';
            print_r($arr);
        echo '</pre>';
    }
    
    function truncate($str){
        if(strlen($str) > 22) {
          $str = substr($str, 0, 22) . '...';
        }
        return $str;
    }
    
    
    /***** USTREAM helpers *****/
    function getVidList(){
        $request =  'http://api.ustream.tv';
        $format = 'php';                // this can be xml, json, html, or php
        $args = 'subject=channel';
        $args .= '&uid=sharewohl';
        $args .= '&command=listAllVideos';
        $args .= '&params=';
        $args .= '&page=1';
        $args .= '&limit=5';
        $args .= '&key=8EC9915C3CC87E5F5A6E2D84FAD520A7';
    
        // Get and config the curl session object
        $session = curl_init($request.'/'.$format.'?'.$args);
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    
        //execute the request and close
        $response = curl_exec($session);
        curl_close($session);
    
        // this line works because we requested $format='php' and not some other output format
        $resultsArray = unserialize($response);
    
    
        //pprint($resultsArray);
    
        return $resultsArray['results'];
    }
    
    function getRandom(){
        $request =  'http://api.ustream.tv';
        $format = 'php';                // this can be xml, json, html, or php
        $args = 'subject=stream';
        $args .= '&uid=all';
        $args .= '&command=getRandom';
        $args .= '&params=';
        $args .= '&page=1';
        $args .= '&limit=1';
        $args .= '&key=8EC9915C3CC87E5F5A6E2D84FAD520A7';
    
        // Get and config the curl session object
        $session = curl_init($request.'/'.$format.'?'.$args);
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    
        //execute the request and close
        $response = curl_exec($session);
        curl_close($session);
    
        // this line works because we requested $format='php' and not some other output format
        $resultsArray = unserialize($response);
    
    
        //pprint($resultsArray);
    
        $result1 = $resultsArray['results'];
        $result =  $result1[0];
        return $result['embedTag'];
    }

?>

<h2 class='titleHeader'>USTREAM demo:</h2>
<div class='uWrap'>
    <div class='list'>
        <?
            $list = getVidList();
            
            echo '<ul>';
            foreach($list as $i){
                echo '<li><div class="vid">' . $i['embedTag'] . '</div>' . truncate($i['title']) . '</li>';
            }
            echo '</ul>';
        ?>
    </div>
    
    <!--
    <div class='vid1'><?=getRandom()?></div>
    <div class='vid2'><?=getRandom()?></div>
    <div class='vid3'><?=getRandom()?></div>
    <div class='vid4'><?=getRandom()?></div>-->
</div>

<?
      $pageMainContent = ob_get_contents();
      ob_end_clean();
      
      $pageFullWidth = true;
      $pageBack = 'playground';
      $pageTitle = 'USTREAM demo | Playground';
      $pageDescription = 'A USTREAM api demo';
      $pageKeywords = 'USTREAM, flash';
      $pageRoot = '../';
      $pageBodyClass = 'playground playInner pageFullW uStreamPage nav4';
      $pageJs = '
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script>
        <script>
            $(function(){
                $(".list li").draggable({
                    stop: function(e, ui){
                        $(this).css({height: "21px"});
                        $(this).children(".vid").css({display: "block"});
                    },
                    cancel: "object"
                });
            }); 
        </script>
      ';
      
      include_once($pageRoot . 'master.php');
?>