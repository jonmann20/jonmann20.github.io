<? ob_start(); ?>

<div class='colL'>
	<h2 class='noHeaderR'>About Me</h2>
	<p>
	    I am a <a href='//www.eecs.umich.edu' target='_blank'>computer science</a> student at the University of Michigan &mdash; College of Engineering.
		My main interest in computer science is in video game design, development and software engineering.
	</p><br />
	<p>
		My other interests include coaching and playing sports (basketball, soccer, disc golf).
		I also enjoy teaching, creating, and performing <a href='music/'>music</a>.
	</p>
	
	<h3>About This Site</h3>
	<p>
	    This site was built in <a href='//www.php.net' target='_blank'>PHP</a>. 
	    It is built to use <a href='//www.w3.org/html/logo' target='_blank'>HTML<sub>5</sub></a>, <a href='//www.css3.info' target='_blank'>CSS<sub>3</sub></a>, and Javascript (<a href='//jquery.com' target='_blank'>jQuery</a>) on the front end.  
	    The CSS	is designed to be responsive (make the pages scale well).
    </p>
</div>	
<div class='colR noHeaderR'>
	<img src='img/jonHunt.jpg' alt='my sister and I with squirrels' title='My sister and I with squirrels.' />
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'About';
	  $pageDescription = 'A page about Jon Wiedmann, and jonwiedmann.com.';
      $pageKeywords = 'about';
	  $pageBodyClass = 'about';
	  $pageRoot = '';
	  
	  include_once($pageRoot . 'master.php');
?>