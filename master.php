<!DOCTYPE html>
<!--[if lte IE 8]>      
	<html class='ie8 oldIE'> 
	<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>		
<![endif]-->
<!--[if IE 9]>     <html class='ie9 oldIE'> <![endif]-->
<!--[if gte IE 10 | !(IE)]><!--> 	 <html> <!--<![endif]-->  
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
    <title><?= $pageTitle; ?></title>
    <meta name='description' content='<?= $pageDescription; ?>' />
    <meta name='keywords' content='<?= $pageKeywords; ?>' />
    <meta name='viewport' content='width=device-width' />

	<link href='//fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:300,700' rel='stylesheet' type='text/css'>	
    <link rel='stylesheet' type='text/css' href='<?= $pageRoot; ?>css/the.css' />
    <link rel='icon' type='image/ico' href='<?= $pageRoot; ?>img/favicon.ico'>
    <?= $pageHeader; ?>
</head>
<body class='<?= $pageBodyClass; ?>'>
    <div class='page'>
	    <div class='inner clr'>
	    	<? if(!$pageFullWidth){ ?>
			<header>
				<nav>
	            	<a href='<?= $pageRoot; ?>index'>Jon Wiedmann<br />.com</a>
	            </nav>
	            <nav class='hdrNav2'>
	            	<a href='<?= $pageRoot; ?>games/'>Games</a>
	            	<a href='<?= $pageRoot; ?>music/'>Music</a>
	            	<a href='<?= $pageRoot; ?>playground/'>Playground</a>
	            	  <? if(strpos($pageBodyClass, 'playInner') !== false){ 
                          include($pageRoot . 'playground/playgroundNav.php');
                      } ?>
	            	<a href='<?= $pageRoot; ?>portfolio/'>Portfolio</a>
	            </nav>
	        </header>
	        <? } else { ?>
	        	<header>
					<nav>
	            		<a href='<? echo $pageRoot . $pageBack ?>/'>&larr; Back</a>
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
        
        <? if(!$pageFullWidth){ ?>
        <footer>
            <div>
            	<span class='footL'>
            		<a href='<?= $pageRoot; ?>about'>About</a> 
            		<a href='<?= $pageRoot; ?>contact'>Contact</a>
            		<a class='imgLinks' href='//facebook.com/jon.wiedmann' target='_blank'>
            			<i class='spriteIcons facebook'>Facebook</i>
            		</a>
            		<a class='imgLinks' href='//youtube.com/user/jonmann19/videos' target='_blank'>
            			<i class='spriteIcons youtube'>YouTube</i>
            		</a>
            		<a class='imgLinks' href='//twitter.com/#!/jonmann20' target='_blank'>
            			<i class='spriteIcons twitter'>Twitter</i>
            		</a>
            		<a class='imgLinks' href='//plus.google.com/u/2/113437309528838781826/posts' target='_blank'>
            			<i class='spriteIcons googlePlus'>Google Plus</i>
            		</a>
            		<a class='imgLinks' href='//github.com/jonmann20' target='_blank'>
            		    <i class='spriteIcons github'>GitHub</i>
            		</a>
            	</span>
            	<span class='footR'>
            		<a href='<?= $pageRoot; ?>index'>Jon Wiedmann</a> &mdash; <?= date("Y") ?>
            	</span>
            </div>
        </footer>
        <? } ?>
    </div><?// end page ?>
    
    <!--[if lt IE 9]>
	    <script src='//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'></script>
	<![endif]-->
	<!--[if gte IE 9]><!-->
	    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<!--[endif]-->
    <?= $pageJs; ?>
</body>
</html>
