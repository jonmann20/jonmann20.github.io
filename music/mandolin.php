<? ob_start(); ?>

<div class="colL">
    <h2 class="musicHeader">Music - Mandolin</h2>

    <p>I have been playing mandolin for the past <?= (date("Y") - 2008) ?> years.</p>

    <? include_once('musicNav.php'); ?>
    
    <?// <h4>Listen to my students</h4> ?>
    <?// <audio></audio> ?>
    
</div>
<div class="colR">
    <h4>Come Thou Fount</h4>
    
    <p>In this track, I play mandolin and sing harmony with my bluegrass band from church.</p>
    <audio controls>
        <source src='../audio/comeThouFount.mp3' type='audio/mpeg'>
        Your browser does not support the HTML<sub>5</sub> audio element.
    </audio>
    
    <img src='../img/jonMandolin.jpg' alt='Jon playing the mandolin' />
</div>

<?
      $pageMainContent = ob_get_contents();
      ob_end_clean();
      
      $pageTitle = 'Mandolin | Music';
      $pageBodyClass = 'music mandolin';
      $pageRoot = '../';
      
      require_once(dirname(__FILE__) . '/' . $pageRoot . 'master.php');
?>