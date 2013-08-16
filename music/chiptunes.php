<? ob_start(); ?>

<div class="colL">
	<h1 class="musicHeader">Music - Chiptunes</h1>
	<p>
		Created with <a href='http://famitracker.com/' target='_blank'>FamiTracker</a> &mdash; 
		A NES/Famicom music creation app.
	</p>

	<? include_once('musicNav.php'); ?>
	

</div>
<div class="colR noHeaderR">
	
	<h4>First Chiptune</h4>
    
    <p>My first chiptune attempt.</p>
    <audio controls>
        <source src='/games/jonsQuest/audio/firstChiptune/firstChiptune.mp3' type='audio/mpeg'>
        Your browser does not support the HTML<sub>5</sub> audio element.
    </audio>
    
    <h4>Spark Boy</h4>
    <p>A chiptune song inspired by the MegaMan Spark Man Theme.</p>
    <audio controls>
        <source src='/games/jonsQuest/audio/inspiredBySparkMan/sparkBoy.mp3' type='audio/mpeg'>
        Your browser does not support the HTML<sub>5</sub> audio element.
    </audio>
    
	
</div>

<?
	  $pageMainContent = ob_get_contents();
	  ob_end_clean();
	  
	  $pageTitle = 'Chiptunes | Music';
      $pageBodyClass = 'music';
	  $pageRoot = '../';
	  
	  require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>