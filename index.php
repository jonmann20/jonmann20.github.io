<? ob_start(); ?>

<div class='colL'>
	<h2>Some photos of me:</h2>
	
	<div id='slideshow'>
		<img src='img/jonLightBulb.jpg' alt='Jon' />
		<img src='img/jon2.jpg' alt='Jon' />
		<img src='img/jonBlacknWhite.jpg' alt='Jon in black and white' />  
	</div>
</div>
<div class='colR'>
    <h1>Welcome</h1>
    <p>Thanks for visiting my site.  This site was built with the intention of showcasing some of my technical ability.	This site has information regarding my work experience and hobbies.</p>
    <p>Please feel free to poke around or learn more <a href='about'>about me.</a></p>
    
    <a class='twitter-timeline' href='https://twitter.com/jonmann20' data-widget-id='243420536208752640'>Tweets by @jonmann20</a>
</div>
 
<?
	$pageMainContent = ob_get_contents();
	ob_end_clean();
	  
	$pageTitle = 'Jon Wiedmann';
	$pageDescription = "Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability.  
	  		This site has information regarding my work experience and hobbies.";
    $pageKeywords = 'Web Developer, Jon Wiedmann, PHP, HTML5, CSS, jQuery, Javascript';
	$pageRoot = '';
    $pageBodyClass = 'home';
	 
	$pageJs = "
	    <script defer async>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='//platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','twitter-wjs');</script>
	    
		<script src='/js/plugins/jquery.cycle.lite.js'></script>
	    <script>
		  	$(function(){
				$('#slideshow').cycle();
		  	});
	    </script>
	";
	  
	include_once($pageRoot . 'master.php');
?>