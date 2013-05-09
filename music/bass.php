<? ob_start(); ?>

<div class="colL">
    <h2 class="musicHeader">Music - Bass</h2>
    <p>I have been playing bass for the past <?= (date("Y") - 2009) ?> years.</p>

    <? include_once('musicNav.php'); ?>
    
    <?// <h4>Listen to my students</h4> ?>
    <?// <audio></audio> ?>
    
</div>
<div class="colR noHeaderR">
    <p>I currently play bass with my worship team at church.</p>
    <img src='../img/bassGuitar.jpg' alt='Bass Guitar' />
</div>

<?
      $pageMainContent = ob_get_contents();
      ob_end_clean();
      
      $pageTitle = 'Bass | Music';
      $pageBodyClass = 'music bass';
      $pageRoot = '../';
      
      include_once($pageRoot . 'master.php');
?>