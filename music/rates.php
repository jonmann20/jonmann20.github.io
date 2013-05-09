<? ob_start(); ?>

<div class="colL">
    <h2>Rates</h2>
    <p>
    	This page contains information regarding my pricing for music lessons.<br /><br />
    	Once you start lessons with me, your rate will be fixed for the duration of your lessons with me.
    </p>
</div>
<div class="colR rates">
	<h3>Travel <span>(I come to you)</span></h3>
  	<ul>
  		<li>1 hour &mdash; $39</li>
  		<li>30 min  &mdash; $21</li>	
  	</ul>
  	<h3>Home <span>(You come to me)</span></h3>
  	<ul>
  		<li>1 hour &mdash; $35</li>
  		<li>30 min  &mdash; $18</li>		
  	</ul>
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Rates | Music';
	  $pageDescription = "Music Lesson Rates";
	  $pageRoot = '../';
	  $pageHeader = '<meta name="robots" rel="none" />';
	  
	  include_once($pageRoot . 'master.php');
?>