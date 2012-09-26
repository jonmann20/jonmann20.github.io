<? ob_start(); ?>

<div class="colL">
	<h1>Porfolio</h1>
	<p>Check out some of my other sites and affiliations</p><br />
	
	<ul>
		<li><a id="enlighten" href="//www.enlighten.com" target="_blank">Enlighten Agency</a></li>
		<li><a id="pico" href="//www.picocal.com" target="_blank">PicoCal Inc.</a></li>
		<li><a id="nology" href="//www.nologydigital.com" target="_blank">Nology Digital</a></li>
	</ul>
</div>
<div class="colR">
	<div id="divDefault">
		<h2>Find Out More</h2>
		<p>Hover over the links to find out more.</p>
	</div>
	<div id="divEnlighten">
		<h5>Enlighten Agency</h5>
		<p>My current job in web deveopment.</p>
		<a href="//www.enlighten.com" class="opaque" target="_blank"><img src="../img/enlighten.jpg" alt="Enlighten Agency" /></a>
	</div>
	<div id="divPico">
		<h3>PicoCal Inc.</h3>
		<p>My first solo project.  <a href="//www.picocal.com" target="_blank">PicoCal Inc.</a> needed a informative website with a simple backend for admin purposes. 
			The site query&#39;s a mySQL database via PHP to dynamically bring in information.</p>
		<a href="//www.picocal.com" class="opaque" target="_blank"><img src="../img/pico.jpg" alt="PicoCal" /></a>
	</div>
	<div id="divNology">
		<h4>Nology Digital</h4>
		<p>My first job in web development was working with <a href="//www.nologydigital.com" target="_blank">Nology Digital</a>.  My last major work there was on 
			<a href="//www.bowersharbor.com" target="_blank">Bower&#39;s Harbor Vineyard</a>.  Bower&#39;s Harbor Vineyard is built around the
			open source framework <a href="//www.zen-cart.com" target="_blank">Zen Cart</a>.</p>
		<a href="//www.nologydigital.com" class="opaque" target="_blank"><img src="../img/nology.jpg" alt="Nology Digital" /></a>
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
				
				$("#enlighten").hoverIntent({
					over: function(){
		         		hideOld("Enlighten");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("Enlighten");
		      		}
				});
				
				$("#pico").hoverIntent({
					over: function(){
		         		hideOld("Pico");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("Pico");
		      		}
				});
				
				$("#nology").hoverIntent({
					over: function(){
		         		hideOld("Nology");
		      		},
		      		timeout: 0,
		      		out: function(){
		      			keepNew("Nology");
		      		}
				});
				
			});
		
		</script> 
	';
	 
	include_once($pageRoot . 'master.php');
?>