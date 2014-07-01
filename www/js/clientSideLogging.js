jw.ClientLogger = (function () {

    var browserVersion;

    function catchEvents() {
        if (browserVersion != 9.0 && browserVersion != 8.0) {           // extend the console for ie10+
            var orgDebug = console.debug,
                orgErr = console.error,
                orgLog = console.log,
                orgWarn = console.warn
            ;

            console.debug = function (msg) {
                ga("send", "event", "JS console", "debug", msg);        // univeral google analytics syntax
                orgDebug.apply(console, arguments);
            }

            console.error = function (msg) {
                ga("send", "event", "JS console", "error", msg);
                orgErr.apply(console, arguments);
            }

            console.log = function (msg) {
                ga("send", "event", "JS console", "log", msg);
                orgLog.apply(console, arguments);
            }

            console.warn = function (msg) {
                ga("send", "event", "JS console", "warn", msg);
                orgWarn.apply(console, arguments);
            }

            window.onerror = function (msg, url, line) {
                ga("send", "event", "JS console", "error", msg + " |---url--| " + url + " |---line--| " + line);
                return false;
            }
        }
        else {
            // fix ie8 not working without dev tools open
            window.console || (window.console = { debug: function () { }, error: function () { }, log: function () { }, warn: function () { } });

            // overwrite the console (.apply() breaks ie9-)
            window.console = (function (c) {
                return {
                    debug: function (v) {
                        ga("send", "event", "JS console", "debug", v);
                        c.debug(v);
                    },
                    error: function (v) {
                        ga("send", "event", "JS console", "error", v);
                        c.error(v);
                    },
                    log: function (v) {
                        ga("send", "event", "JS console", "log", v);
                        c.log(v);
                    },
                    warn: function (v) {
                        ga("send", "event", "JS console", "warn", v);
                        c.warn(v);
                    }
                };
            }(console));
        }
    }

    function browser() {
        navigator.sayswho = (function () {
            var N = navigator.appName, ua = navigator.userAgent, tem;
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
            M = M ? [M[1], M[2]] : [N, navigator.appVersion, "-?"];

            return M;
        })();

        return navigator.sayswho[1];
    }


    return {
        init: function () {
            browserVersion = browser();
            catchEvents();
        }
    };
})();

jw.ClientLogger.init();
