<? ob_start(); ?>

<h2>Starry Background:</h2>

<div class="canvasWrap stars">
	<canvas id="html5_star">unsupported browser</canvas>
</div>
<div>
	<h3>Change Color:</h3>

	<form class="colorPicker" method="post" action="">
	    <label for="white">White</label>
        <input type="radio" id="white" value="#e1e1e1" name="colorGroup" checked/>
	    
		<label for="green">Green</label>
		<input type="radio" id="green" value="#8cb118" name="colorGroup" />
		
		<label for="blue">Blue</label>
		<input type="radio" id="blue" value="#61b0d7" name="colorGroup" />
		
		<label for="custom">Custom</label>
        <input type="color" id="custom" name="colorGroup" />
	</form>
</div>
<?	  $pageMainContent = ob_get_contents();	  ob_end_clean();	  	  $pageTitle = 'Starry Background | Playground';
      $pageDescription = 'A canvas example showcasing a starry background.';
      $pageKeywords = 'canvas, html5';	  $pageRoot = '../';
      $pageBodyClass = 'playground playInner nav2';	  $pageJs = '	  	<script type="text/javascript" src="../js/html5_star.js"></script>
		<script language="javascript" type="text/javascript">
		    
			var initStar = function(w, color){
				$("#html5_star").star_bg({
		        	window_width: w, 
		        	window_height:"400", 
		        	star_color: color, 
		        	window_background: "", 
		        	star_count: "1300", 
		        	star_depth: "330", 
		        	container: "html5_star" 
		    	});
			};
		    
		    $(function() {
				var w = $(".main").width();
				var color = $("input[type=radio]:checked").val();
				initStar(w, color);
				
                $("input[type=color]").change(function(){
                    color = $(this).val();
                    
                    $("canvas").remove();
                    $(".canvasWrap").append($("<canvas id=\'html5_star\'>unsupported browser</canvas>"));
                    
                    initStar(w, color);
                }); 
				
				$("input[type=radio]").click(function(){
					color =	$("input[type=radio]:checked").val();
                    
                    $("canvas").remove();
                    $(".canvasWrap").append($("<canvas id=\'html5_star\'>unsupported browser</canvas>"));
                    
					initStar(w, color);
				}); 
		    });
		</script>	  ';	  	  require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');?>