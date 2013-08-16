<? ob_start(); ?>

<div class='colL'>
	<h2>Contact Me</h2>
	
	<a href='mailto:jonwiedmann@gmail.com' target="_blank">
		<span aria-hidden='true' class='icon-mail'></span> jonwiedmann@gmail.com
	</a>
</div>
<div class="colR noHeaderR">
	<img src="../img/jonPiano.jpg" alt="me playing piano" /> 
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Contact Me';
	  $pageDescription = 'A page enabling contact to Jon Wiedmann.';
      $pageKeywords = 'contact';
	  $pageBodyClass = 'contact';
	  $pageRoot = '';
	  $pageJs = "";
	  
	  include_once($pageRoot . 'master.php');
?>