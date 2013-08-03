<?

$pageHeader = isset($pageHeader) ? $pageHeader : '';

?>

<!DOCTYPE html>
<html class='gamesMaster'>  
<head>
	<meta charset='utf-8'>
    <title><?= $pageTitle; ?></title>
    <meta name='description' content='<?= $pageDescription; ?>' />
    <meta name='keywords' content='<?= $pageKeywords; ?>' />
    <meta name='viewport' content='width=device-width' />

	<link href='http://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' type='text/css' href='<?= $pageRoot; ?>css/the.css' />
    <link rel='icon' type='image/ico' href='<?= $pageRoot; ?>img/favicon.ico'>
    <?= $pageHeader; ?>
</head>
<body class='<?= $pageBodyClass; ?>'>

	<?= $pageMainContent; ?>
    <?= $pageJs; ?>
</body>
</html>
