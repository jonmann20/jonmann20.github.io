'use strict';

(function() {
	var orgDebug = console.debug,
		orgErr = console.error,
		orgLog = console.log,
		orgWarn = console.warn
	;

	console.debug = function(msg) {
		ga('send', 'event', 'JS console', 'debug', msg);		// univeral google analytics syntax
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
})();