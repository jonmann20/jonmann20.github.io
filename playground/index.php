<? ob_start(); ?>

<div class='colL'>
	<h1>Playground</h1>
	<p>Check out some tech demos.</p>
	
    <? include_once('playgroundNav.php'); ?>
</div>
<div class='colR'>
	<div id='divDefault'>
		<h2>Explore</h2>
		<p>Hover over the links to learn about the demos.</p>
		
		<pre class='duffsDevice'>

<a href="//en.wikipedia.org/wiki/Duff's_device" target='_blank'>Duff&rsquo;s Device:</a>

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
	<div id='divBCube'>
		<h2>Breakdancing Cube</h2>
		<p>A pure CSS<sub>3</sub> animation demo.</p>
	</div>
	<div id='divStars'>
		<h3>Starry Background</h3>
		<p>A Javascript and HTML<sub>5</sub> canvas example showcasing a starry background.</p>
		
		<a class='opaque' href='stars'>
			<img src='/img/playground/starryBgPreview.jpg' alt='stars in the galaxy' />
		</a>
	</div>
	<div id='divBPit'>
		<h3>Ball Pit</h3>
		<p>A Javascript and HTML<sub>5</sub> canvas example with balls colliding into the edges of a box.</p>
		
		<a class='opaque' href='ballPit'>
			<img src='/img/playground/ballPitPreview.jpg' alt='ballpit' />
		</a>
	</div>
    <div id='divFloatingSun'>
        <h3>Floating Sun</h3>
        <p>A computer graphics simulation, involving a light source and water.</p>
    </div>
	<div id='divUStream'>
        <h3>USTREAM demo</h3>
        <p>A USTREAM api demo.</p>
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
		<script src="/js/plugins/jquery.hoverCarousel.js"></script>
		<script>
			$(function(){
				$(".colL ul").hoverCarousel();
			})
		</script>
	';
	 
	require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>