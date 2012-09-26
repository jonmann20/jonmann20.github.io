<? ob_start(); ?>

<div class="colL">
	<h1>Playground</h1>
	<p>Check out some tech demos.</p><br />
	
	<ul>
		<li><a id="cube" href="#">Breakdancing Cube</a></li>
		<li><a id="stars" href="stars">Starry Background</a></li>
	</ul>
</div>
<div class="colR">
	<div id="divDefault">
		<h2>Discover More</h2>
		<p>Hover over the links to find out more.</p>
		
	    <section class="container">
              <div id="cube" class="animate">
                    <div><span>Code</span></div>
                    <div><span class='long'>Wiedmann</span></div>
                    <div><span>.com</span></div>
                    <div><span>Games</span></div>
                    <div><span>Music</span></div>
                    <div><span>Jon</span></div>
               </div>
        </section>
	</div>
	<div id="divStarryBackground">
		<h3>Starry Background</h3>
		<p>A simple canvas example</p>
	</div>

<?
	$pageMainContent = ob_get_contents();
	ob_end_clean();
	  
	$pageTitle = 'Playground';
	$pageDescription = 'A place to create tech demos and other random things.';
	$pageRoot = '../';
    $pageBodyClass = 'playground absHover';
	$pageJs = '
		<script src="../js/jquery.hoverIntent.min.js"></script>
		<script>
			
			$(function() {
				var active = "Default";
				
				function hideOld(name){
					if(active != name){
						$("#div" + active).fadeOut(250);
						$("#div" + name).fadeIn(250);
					}
				};
				
				function keepNew(name){
					active = name;
				};
				
				$("#cube").hoverIntent({
					over: function(){
		         		hideOld("Default");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("Default");
		      		}
				});
				
				$("#stars").hoverIntent({
					over: function(){
		         		hideOld("StarryBackground");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("StarryBackground");
		      		}
				});
				
			});
		
		</script> 
	';
	 
	include_once($pageRoot . 'master.php');
?>