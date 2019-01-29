if(location.hostname === 'jonw.me') {
	// Analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-43015655-1', 'jonw.me');
	ga('send', 'pageview');

	// Clientside Logging
	let orgDebug = console.debug,
		orgErr = console.error,
		orgLog = console.log,
		orgWarn = console.warn
	;

	console.debug = function(msg) {
		ga('send', 'event', 'JS console', 'debug', msg);
		orgDebug.apply(console, arguments);
	};

	console.error = function(msg) {
		ga('send', 'event', 'JS console', 'error', msg);
		orgErr.apply(console, arguments);
	};

	console.log = function(msg) {
		ga('send', 'event', 'JS console', 'log', msg);
		orgLog.apply(console, arguments);
	};

	console.warn = function(msg) {
		ga('send', 'event', 'JS console', 'warn', msg);
		orgWarn.apply(console, arguments);
	};

	window.onerror = function(msg, url, line) {
		ga('send', 'event', 'JS console', 'error', msg + ' |---url--| ' + url + ' |---line--| ' + line);
		return false;
	};
}