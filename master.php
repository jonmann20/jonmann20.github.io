<!DOCTYPE html>
<!--[if lte IE 8]>      
	<html class="ie8 oldIE"> 
	<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>		
<![endif]-->
<!--[if IE 9]> <html class="ie9 oldIE"> <![endif]-->
<!--[if gt IE 9 | !(IE)]><!--> 	 <html> <!--<![endif]-->  
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
    <title><?= $pageTitle; ?></title>
    <meta name='description' content='<?= $pageDescription; ?>' />
    <meta name='keywords' content='<?= $pageKeywords; ?>' />
    <meta name='viewport' content='width=device-width' />
    
    <link href='//fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' type='text/css' href='<?= $pageRoot; ?>css/master.css' />
    <link rel='icon' type='image/ico' href='<?= $pageRoot; ?>img/favicon.ico'>
    <?= $pageHeader; ?>
</head>
<body class='<?= $pageBodyClass; ?>'>
    <div class='page'>
	    <div class='inner clr'>
			<header>
				<nav>
	            	<a href='<?= $pageRoot; ?>index'>Jon Wiedmann<br />.com</a>
	           </nav>
	            <nav>
	            	<a href='<?= $pageRoot; ?>games/'>Games</a>
	            	<a href='<?= $pageRoot; ?>music/'>Music</a>
	            	<a href='<?= $pageRoot; ?>playground/'>Playground</a>
	            	<a href='<?= $pageRoot; ?>portfolio/'>Portfolio</a>
	            </nav>
	        </header>
			
			<section class='main'>
				<?= $pageMainContent; ?>
			</section>
	    </div><!-- end inner -->

        <footer>
            <div>
            	<span class='footL'>
            		<a href='<?= $pageRoot; ?>about'>About</a> 
            		<a href='<?= $pageRoot; ?>contact'>Contact</a>
            		<a class='imgLinks' href='//facebook.com/jon.wiedmann' target='_blank'>
            			<img src='<?= $pageRoot; ?>img/fb.gif' alt='Facebook' />
            		</a>
            		<a class='imgLinks' href='//youtube.com/user/jonmann19/videos' target='_blank'>
            			<img src="<?= $pageRoot; ?>img/yt.png" alt="Youtube" />
            		</a>
            		<a class='imgLinks' href='//twitter.com/#!/jonmann20' target='_blank'>
            			<img src='<?= $pageRoot; ?>img/twitter.jpg' alt='Twitter' />
            		</a>
            		<a class='imgLinks' href='//plus.google.com/u/2/113437309528838781826/posts' target='_blank'>
            			<img src='<?= $pageRoot; ?>img/googlePlus.png' alt='Google Plus' />
            		</a>
            	</span>
            	<span class='footR'>
            		<a href='<?= $pageRoot; ?>index'>Jon Wiedmann</a> &mdash; 2012
            	</span>
            </div>
        </footer>
    </div><!-- end page -->
    
    <script src='//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'></script>
    <?= $pageJs; ?>
    
    <!-- Google Analytics -->
    <script defer async>
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-32866104-1']);
		_gaq.push(['_trackPageview']);
			
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
</body>
</html>
