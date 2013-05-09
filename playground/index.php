<? ob_start(); ?>

<div class="colL">
	<h1>Playground</h1>
	<p>Check out some tech demos.</p><br />
	
    <? include_once('playgroundNav.php'); ?>
</div>
<div class="colR">
	<div id="divDefault">
		<h2>Explore</h2>
		<p>Hover over the links to learn about the demos.</p>
		
		<pre class='duffsDevice'>

<a href="//en.wikipedia.org/wiki/Duff's_device" target="_blank">Duff&rsquo;s Device:</a>

int n = (len + 7) >> 3;
switch(len % 8){
    case 0: do{ *to = *from++;
    case 7:     *to = *from++;
    case 6:     *to = *from++;
    case 5:     *to = *from++;
    case 4:     *to = *from++;
    case 3:     *to = *from++;
    case 2:     *to = *from++;
    case 1:     *to = *from++;
            } while(--n > 0);
}
        </pre>
	</div>
	<div id="divBreakdancingCube">
		<h2>Breakdancing Cube</h2>
		<p>A pure CSS<sub>3</sub> animation demo.</p>
	</div>
	<div id="divStarryBackground">
		<h3>Starry Background</h3>
		<p>A Javascript and HTML<sub>5</sub> canvas example showcasing a starry background.</p>
		<a id="stars" class='opaque' href="stars"><img src='../img/playground/starryBgPreview.jpg' alt='stars in the galaxy' /></a>
	</div>
	<div id="divBallPit">
		<h3>Ball Pit</h3>
		<p>A Javascript and HTML<sub>5</sub> canvas example with balls colliding into the edges of a box.</p>
		<a id="bPit" class='opaque' href="ballPit"><img src='../img/playground/ballPitPreview.jpg' alt='ballpit' /></a>
	</div>
	<div id="divUstream">
        <h3>USTREAM demo</h3>
        <p>A USTREAM api demo.</p>
    </div>
    <div id="divFloatingSun">
        <h3>Floating Sun</h3>
        <p>A computer graphics simulation, involving a light source and water.</p>
    </div>

<?
	$pageMainContent = ob_get_contents();
	ob_end_clean();
	  
	$pageTitle = 'Playground';
	$pageDescription = 'A place to create tech demos and other random things.';
	$pageRoot = '../';
    $pageBodyClass = 'playground absHover';
	$pageJs = '
		<script src="../js/plugins/jquery.hoverIntent.min.js"></script>
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
				
				$("#bCube").hoverIntent({
					over: function(){
		         		hideOld("BreakdancingCube");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("BreakdancingCube");
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
				
				$("#bPit").hoverIntent({
					over: function(){
		         		hideOld("BallPit");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("BallPit");
		      		}
				});
				
                $("#uStream").hoverIntent({
                    over: function(){
                        hideOld("Ustream");
                    },
                    timeout: 0,
                    out: function(){
                        keepNew("Ustream");
                    }
                });
				
				$("#floatingSun").hoverIntent({
                    over: function(){
                        hideOld("FloatingSun");
                    },
                    timeout: 0,
                    out: function(){
                        keepNew("FloatingSun");
                    }
                });
			});
		
		</script> 
	';
	 
	include_once($pageRoot . 'master.php');
?>