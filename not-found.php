<? ob_start(); ?>

<div class="colL">
    <h2>Page Not Found</h2>
    <p>
    	The page you requested does not exist, or is unavailable at this time.
    </p>
</div>
<div class="colR">
    <img src="img/unhappy.png" alt="Unhappy face" class="unhappyImg" title="Taken from Wikipedia Commons" />
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Jon Wiedmann - Page Not Found';
	  $pageDescription = 'The page you requested does not exist, or is unavailable at this time.';
	  $pageRoot = '';
	  
	  include_once($pageRoot . 'master.php');
?>