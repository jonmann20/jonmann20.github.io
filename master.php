<?

$pageHeader = isset($pageHeader) ? $pageHeader : '';
$pageFullWidth = isset($pageFullWidth) ? $pageFullWidth : '';
$pageJs = isset($pageJs) ? $pageJs : '';
$pageBodyClass = isset($pageBodyClass) ? $pageBodyClass : '';
$pageGameInstructions = isset($pageGameInstructions) ? $pageGameInstructions : '';
$pageKeywords = isset($pageKeywords) ? $pageKeywords : '';
$pageDescription = isset($pageDescription) ? $pageDescription : '';

$pagePrd = defined('STDIN');

?>

<!DOCTYPE html>
<!--[if IE 8]>      
	<html class='ie8 oldIE'> 
	<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>		
<![endif]-->
<!--[if IE 9]>     <html class='ie9 oldIE'> <![endif]-->
<!--[if gte IE 10 | !(IE)]><!--> 	 <html> <!--<![endif]-->  
<head>
	<meta charset='utf-8'>
    <title><?= $pageTitle; ?></title>
    <meta name='description' content='<?= $pageDescription; ?>' />
    <meta name='keywords' content='<?= $pageKeywords; ?>' />
    <meta name='viewport' content='width=device-width' />

	<link href='http://fonts.googleapis.com/css?family=Press+Start+2P|Open+Sans|Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
    
    <?
    	if($pagePrd){
    		echo "<link rel='stylesheet' type='text/css' href='/css/the.min.css' />";
		}
		else {
		    echo "<link rel='stylesheet' type='text/css' href='/css/normalize.css' />";
    		echo "<link rel='stylesheet' type='text/css' href='/css/the.css' />";	
		}
    ?>
    
	<!--[if lte IE 9]>
		    <link rel='stylesheet' type='text/css' href='<?= $pageRoot; ?>css/oldIE.css' />
    <![endif]-->
    
    <link rel='icon' type='image/ico' href='<?= $pageRoot; ?>img/favicon.ico'>
    
    <?= $pageHeader; ?>
</head>
<body class='<?= $pageBodyClass; ?>'>
    <div class='page'>
	    <div class='inner clr'>
	    	<? if(!$pageFullWidth){ ?>
			<header>
				<nav>
	            	<a href='<?= $pageRoot; ?>index'>
	            		<span aria-hidden='true' class='icon-home'></span> Jon Wiedmann<br />.com
            		</a>
	            </nav>
	            <nav class='hdrNav2'>
            		<a href='<?= $pageRoot; ?>blog/'>
            			<span aria-hidden='true' class='icon-folder-open'></span> Blog
        			</a>
	            	<a href='<?= $pageRoot; ?>games/'>
	            		<span aria-hidden='true' class='icon-controllernes'></span> Games
            		</a>
	            	<a href='<?= $pageRoot; ?>music/'>
	            		<span aria-hidden='true' class='icon-music'></span> Music
            		</a>
	            	<a href='<?= $pageRoot; ?>playground/'>
	            		<span aria-hidden='true' class='icon-beaker'></span> Playground
            		</a>
            		
		            	<? 
		            		if(strpos($pageBodyClass, 'playInner') !== false){ 
								require_once(dirname(__FILE__) . '/playground/playgroundNav.php');
		                	} 
	                    ?>
	                  
	            	<a href='<?= $pageRoot; ?>portfolio/'>
	            		<span aria-hidden='true' class='icon-briefcase'></span> Portfolio
            		</a>
	            </nav>
	        </header>
	        <? } else { ?>
	        	<header>
					<nav class="backNav">
	            		<a href='<? echo $pageRoot . $pageBack ?>/'>
	            			<span aria-hidden='true' class='icon-arrow-left'></span> Back
            			</a>
	            	</nav>
	            	
	            	<div class='gameInstructions'>
	           			<?= $pageGameInstructions; ?>
	           		</div>
	            </header>
	        <? } ?>
			
			<section class='main'>
				<?= $pageMainContent; ?>
			</section>
	    </div><?// end inner ?>
	    <div class='push clr'></div>
    </div><?// end page ?>
    
    
    <? if(!$pageFullWidth){ ?>
        <footer>
            <div>
            	<span class='footL'>
            		<a href='<?= $pageRoot; ?>about'>About</a> 
            		<a class='footContact' href='<?= $pageRoot; ?>contact'>Contact</a>
            		<a class='imgLinks' href='//facebook.com/jon.wiedmann' target='_blank'>
            			<span aria-hidden='true' class='icon-facebook' title='Facebook'></span> <span class='name'>Facebook</span>
            		</a>
            		<a class='imgLinks' href='//youtube.com/user/jonmann19/videos' target='_blank'>
            			<span aria-hidden='true' class='icon-youtube-sign' title='YouTube'></span> <span class='name'>YouTube</span>
            		</a>
            		<a class='imgLinks' href='//twitter.com/jonmann20' target='_blank'>
            			<span aria-hidden='true' class='icon-twitter' title='Twitter'></span> <span class='name'>Twitter</span>
            		</a>
            		<a class='imgLinks' href='//plus.google.com/u/2/113437309528838781826/posts' target='_blank'>
            			<span aria-hidden='true' class='icon-google-plus' title='Google+'></span> <span class='name'>Google+</span>
            		</a>
            		<a class='imgLinks' href='//github.com/jonmann20' target='_blank'>
            		    <span aria-hidden='true' class='icon-github-2' title='Github'></span> <span class='name'>GitHub</span>
            		</a>
        		    <a class='imgLinks' href='//www.linkedin.com/pub/jon-wiedmann/67/42b/b64' target='_blank'>
            		    <span aria-hidden='true' class='icon-linkedin' title='LinkedIn'></span> <span class='name'>LinkedIn</span>
            		</a>
            	</span>
            	<span class='footR'>
            		<a href='<?= $pageRoot; ?>index'>Jon Wiedmann</a> &mdash; <?= date("Y") ?>
            	</span>
            </div>
        </footer>
        <? } ?>
    
    <!--[if lt IE 9]>
	    <script src='//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
	<![endif]-->
	<!--[if gte IE 9]><!-->
	    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<!--[endif]-->
	
	<?
    	if($pagePrd){
    		echo "<script src='/js/the.min.js'></script>";
			include_once("analytics.php");
		}
		else {
		    echo "<script src='/js/master.js'></script>";	
		}
    ?>
	
	
	
    <?= $pageJs; ?>
</body>
</html>
