<? ob_start(); ?>

<div class='colL'>
	<h1>Porfolio</h1>
	<p>Check out some of my other sites and affiliations.</p>
	
	<ul>
        <li>
    		<a id='enlighten' href='//www.enlighten.com' target='_blank'>
    			Enlighten Agency
			</a>
		</li>
        <li><a id='pico' href='//www.picocal.com' target='_blank'>PicoCal Inc.</a></li>
        <li><a id='nology' href='//twitter.com/Nologydigital' target='_blank'>Nology Digital</a></li>
    </ul>
</div>
<div class='colR'>
	<div id='divDefault'>
		<h2>Find Out More</h2>
		<p>Hover over the links to find out more.</p>
        <img src='../img/portfolio/jon_wedding.jpg' alt='Jon at a wedding' />
	</div>
	<div id='divEnlighten'>
		<h5>Enlighten Agency</h5>
		<p>My current job as a front end web development engineer.</p>
		<a href='//www.enlighten.com' class='opaque' target='_blank'>
		    <img src='../img/portfolio/enlighten.jpg' alt='Enlighten Agency' />
		</a>
	</div>
	<div id='divPico'>
		<h3>PicoCal Inc.</h3>
		<p>My first solo project.  <a href='//www.picocal.com' target='_blank'>PicoCal Inc.</a> needed a informative website with a simple backend for admin purposes. 
			The site query&#39;s a mySQL database via PHP to dynamically bring in information.</p>
		<a href='//www.picocal.com' class='opaque' target='_blank'><img src='../img/portfolio/pico.jpg' alt='PicoCal' /></a>
	</div>
	<div id='divNology'>
		<h4>Nology Digital</h4>
		<p>My first job in web development was working with <a href='/twitter.com/Nologydigital' target='_blank'>Nology Digital</a>.  My last major work there was on 
			<a href='//www.bowersharbor.com' target='_blank'>Bower&#39;s Harbor Vineyard</a>.  Bower&#39;s Harbor Vineyard is built around the
			open source framework <a href='//www.zen-cart.com' target='_blank'>Zen Cart</a>.</p>
		<a href='//twitter.com/Nologydigital' class='opaque' target='_blank'>
		    <img src='../img/portfolio/nology.jpg' alt='Nology Digital' />
		</a>
	</div>
</div> 

<?
	$pageMainContent = ob_get_contents();
	ob_end_clean();
	  
	$pageTitle = 'Portfolio';
	$pageDescription = 'A listing of my past work experience portfolio.';
	$pageRoot = '../';
    $pageBodyClass = 'portfolio absHover';
	$pageJs = '
		<script src="../js/plugins/jquery.hoverIntent.min.js"></script>
		<script src="/js/plugins/jquery.hoverCarousel.js"></script>
		<script>
			$(function(){
				$("ul").hoverCarousel();
			})
		</script>
	';
	 
	require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>
