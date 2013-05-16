<?

$pageHeader = isset($pageHeader) ? $pageHeader : '';

?>

<!DOCTYPE html>
<html>  
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
    <title><?= $pageTitle; ?></title>
    <meta name='description' content='<?= $pageDescription; ?>' />
    <meta name='keywords' content='<?= $pageKeywords; ?>' />
    <meta name='viewport' content='width=device-width' />
    
    <link href='//fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' type='text/css' href='<?= $pageRoot; ?>css/the.css' />
    <link rel='icon' type='image/ico' href='<?= $pageRoot; ?>img/favicon.ico'>
    <?= $pageHeader; ?>
</head>
<body class='<?= $pageBodyClass; ?>'>

	<?= $pageMainContent; ?>
    <?= $pageJs; ?>
    
    <?// Google Analytics ?>
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
