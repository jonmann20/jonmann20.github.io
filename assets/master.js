'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// name: sammy
// version: 0.7.6

// Sammy.js / http://sammyjs.org

(function (factory) {
    // Support module loading scenarios
    if (typeof define === 'function' && define.amd) {
        // AMD Anonymous Module
        define(['jquery'], factory);
    } else {
        // No module loader (plain <script> tag) - put directly in global namespace
        jQuery.sammy = window.Sammy = factory(jQuery);
    }
})(function ($) {

    var _Sammy,
        PATH_REPLACER = "([^\/]+)",
        PATH_NAME_MATCHER = /:([\w\d]+)/g,
        QUERY_STRING_MATCHER = /\?([^#]*)?$/,

    // mainly for making `arguments` an Array
    _makeArray = function _makeArray(nonarray) {
        return Array.prototype.slice.call(nonarray);
    },

    // borrowed from jQuery
    _isFunction = function _isFunction(obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    },
        _isArray = function _isArray(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    },
        _isRegExp = function _isRegExp(obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
    },
        _decode = function _decode(str) {
        return decodeURIComponent((str || '').replace(/\+/g, ' '));
    },
        _encode = encodeURIComponent,
        _escapeHTML = function _escapeHTML(s) {
        return String(s).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },
        _routeWrapper = function _routeWrapper(verb) {
        return function () {
            return this.route.apply(this, [verb].concat(Array.prototype.slice.call(arguments)));
        };
    },
        _template_cache = {},
        _has_history = !!(window.history && history.pushState),
        loggers = [];

    // `Sammy` (also aliased as $.sammy) is not only the namespace for a
    // number of prototypes, its also a top level method that allows for easy
    // creation/management of `Sammy.Application` instances. There are a
    // number of different forms for `Sammy()` but each returns an instance
    // of `Sammy.Application`. When a new instance is created using
    // `Sammy` it is added to an Object called `Sammy.apps`. This
    // provides for an easy way to get at existing Sammy applications. Only one
    // instance is allowed per `element_selector` so when calling
    // `Sammy('selector')` multiple times, the first time will create
    // the application and the following times will extend the application
    // already added to that selector.
    //
    // ### Example
    //
    //      // returns the app at #main or a new app
    //      Sammy('#main')
    //
    //      // equivalent to "new Sammy.Application", except appends to apps
    //      Sammy();
    //      Sammy(function() { ... });
    //
    //      // extends the app at '#main' with function.
    //      Sammy('#main', function() { ... });
    //
    _Sammy = function Sammy() {
        var args = _makeArray(arguments),
            app,
            selector;
        _Sammy.apps = _Sammy.apps || {};
        if (args.length === 0 || args[0] && _isFunction(args[0])) {
            // Sammy()
            return _Sammy.apply(_Sammy, ['body'].concat(args));
        } else if (typeof (selector = args.shift()) == 'string') {
            // Sammy('#main')
            app = _Sammy.apps[selector] || new _Sammy.Application();
            app.element_selector = selector;
            if (args.length > 0) {
                $.each(args, function (i, plugin) {
                    app.use(plugin);
                });
            }
            // if the selector changes make sure the reference in Sammy.apps changes
            if (app.element_selector != selector) {
                delete _Sammy.apps[selector];
            }
            _Sammy.apps[app.element_selector] = app;
            return app;
        }
    };

    _Sammy.VERSION = '0.7.6';

    // Add to the global logger pool. Takes a function that accepts an
    // unknown number of arguments and should print them or send them somewhere
    // The first argument is always a timestamp.
    _Sammy.addLogger = function (logger) {
        loggers.push(logger);
    };

    // Sends a log message to each logger listed in the global
    // loggers pool. Can take any number of arguments.
    // Also prefixes the arguments with a timestamp.
    _Sammy.log = function () {
        var args = _makeArray(arguments);
        args.unshift("[" + Date() + "]");
        $.each(loggers, function (i, logger) {
            logger.apply(_Sammy, args);
        });
    };

    if (typeof window.console != 'undefined') {
        if (typeof window.console.log === 'function' && _isFunction(window.console.log.apply)) {
            _Sammy.addLogger(function () {
                window.console.log.apply(window.console, arguments);
            });
        } else {
            _Sammy.addLogger(function () {
                window.console.log(arguments);
            });
        }
    } else if (typeof console != 'undefined') {
        _Sammy.addLogger(function () {
            console.log.apply(console, arguments);
        });
    }

    $.extend(_Sammy, {
        makeArray: _makeArray,
        isFunction: _isFunction,
        isArray: _isArray
    });

    // Sammy.Object is the base for all other Sammy classes. It provides some useful
    // functionality, including cloning, iterating, etc.
    _Sammy.Object = function (obj) {
        // constructor
        return $.extend(this, obj || {});
    };

    $.extend(_Sammy.Object.prototype, {

        // Escape HTML in string, use in templates to prevent script injection.
        // Also aliased as `h()`
        escapeHTML: _escapeHTML,
        h: _escapeHTML,

        // Returns a copy of the object with Functions removed.
        toHash: function toHash() {
            var json = {};
            $.each(this, function (k, v) {
                if (!_isFunction(v)) {
                    json[k] = v;
                }
            });
            return json;
        },

        // Renders a simple HTML version of this Objects attributes.
        // Does not render functions.
        // For example. Given this Sammy.Object:
        //
        //     var s = new Sammy.Object({first_name: 'Sammy', last_name: 'Davis Jr.'});
        //     s.toHTML()
        //     //=> '<strong>first_name</strong> Sammy<br /><strong>last_name</strong> Davis Jr.<br />'
        //
        toHTML: function toHTML() {
            var display = "";
            $.each(this, function (k, v) {
                if (!_isFunction(v)) {
                    display += "<strong>" + k + "</strong> " + v + "<br />";
                }
            });
            return display;
        },

        // Returns an array of keys for this object. If `attributes_only`
        // is true will not return keys that map to a `function()`
        keys: function keys(attributes_only) {
            var keys = [];
            for (var property in this) {
                if (!_isFunction(this[property]) || !attributes_only) {
                    keys.push(property);
                }
            }
            return keys;
        },

        // Checks if the object has a value at `key` and that the value is not empty
        has: function has(key) {
            return this[key] && $.trim(this[key].toString()) !== '';
        },

        // convenience method to join as many arguments as you want
        // by the first argument - useful for making paths
        join: function join() {
            var args = _makeArray(arguments);
            var delimiter = args.shift();
            return args.join(delimiter);
        },

        // Shortcut to Sammy.log
        log: function log() {
            _Sammy.log.apply(_Sammy, arguments);
        },

        // Returns a string representation of this object.
        // if `include_functions` is true, it will also toString() the
        // methods of this object. By default only prints the attributes.
        toString: function toString(include_functions) {
            var s = [];
            $.each(this, function (k, v) {
                if (!_isFunction(v) || include_functions) {
                    s.push('"' + k + '": ' + v.toString());
                }
            });
            return "Sammy.Object: {" + s.join(',') + "}";
        }
    });

    // Return whether the event targets this window.
    _Sammy.targetIsThisWindow = function targetIsThisWindow(event, tagName) {
        var targetElement = $(event.target).closest(tagName);
        if (targetElement.length === 0) {
            return true;
        }

        var targetWindow = targetElement.attr('target');
        if (!targetWindow || targetWindow === window.name || targetWindow === '_self') {
            return true;
        }
        if (targetWindow === '_blank') {
            return false;
        }
        if (targetWindow === 'top' && window === window.top) {
            return true;
        }
        return false;
    };

    // The DefaultLocationProxy is the default location proxy for all Sammy applications.
    // A location proxy is a prototype that conforms to a simple interface. The purpose
    // of a location proxy is to notify the Sammy.Application its bound to when the location
    // or 'external state' changes.
    //
    // The `DefaultLocationProxy` watches for changes to the path of the current window and
    // is also able to set the path based on changes in the application. It does this by
    // using different methods depending on what is available in the current browser. In
    // the latest and greatest browsers it used the HTML5 History API and the `pushState`
    // `popState` events/methods. This allows you to use Sammy to serve a site behind normal
    // URI paths as opposed to the older default of hash (#) based routing. Because the server
    // can interpret the changed path on a refresh or re-entry, though, it requires additional
    // support on the server side. If you'd like to force disable HTML5 history support, please
    // use the `disable_push_state` setting on `Sammy.Application`. If pushState support
    // is enabled, `DefaultLocationProxy` also binds to all links on the page. If a link is clicked
    // that matches the current set of routes, the URL is changed using pushState instead of
    // fully setting the location and the app is notified of the change.
    //
    // If the browser does not have support for HTML5 History, `DefaultLocationProxy` automatically
    // falls back to the older hash based routing. The newest browsers (IE, Safari > 4, FF >= 3.6)
    // support a 'onhashchange' DOM event, thats fired whenever the location.hash changes.
    // In this situation the DefaultLocationProxy just binds to this event and delegates it to
    // the application. In the case of older browsers a poller is set up to track changes to the
    // hash.
    _Sammy.DefaultLocationProxy = function (app, run_interval_every) {
        this.app = app;
        // set is native to false and start the poller immediately
        this.is_native = false;
        this.has_history = _has_history;
        this._startPolling(run_interval_every);
    };

    _Sammy.DefaultLocationProxy.fullPath = function (location_obj) {
        // Bypass the `window.location.hash` attribute.  If a question mark
        // appears in the hash IE6 will strip it and all of the following
        // characters from `window.location.hash`.
        var matches = location_obj.toString().match(/^[^#]*(#.+)$/);
        var hash = matches ? matches[1] : '';
        return [location_obj.pathname, location_obj.search, hash].join('');
    };
    $.extend(_Sammy.DefaultLocationProxy.prototype, {
        // bind the proxy events to the current app.
        bind: function bind() {
            var proxy = this,
                app = this.app,
                lp = _Sammy.DefaultLocationProxy;
            $(window).bind('hashchange.' + this.app.eventNamespace(), function (e, non_native) {
                // if we receive a native hash change event, set the proxy accordingly
                // and stop polling
                if (proxy.is_native === false && !non_native) {
                    proxy.is_native = true;
                    window.clearInterval(lp._interval);
                    lp._interval = null;
                }
                app.trigger('location-changed');
            });
            if (_has_history && !app.disable_push_state) {
                // bind to popstate
                $(window).bind('popstate.' + this.app.eventNamespace(), function (e) {
                    app.trigger('location-changed');
                });
                // bind to link clicks that have routes
                $(document).delegate('a', 'click.history-' + this.app.eventNamespace(), function (e) {
                    if (e.isDefaultPrevented() || e.metaKey || e.ctrlKey) {
                        return;
                    }
                    var full_path = lp.fullPath(this),

                    // Get anchor's host name in a cross browser compatible way.
                    // IE looses hostname property when setting href in JS
                    // with a relative URL, e.g. a.setAttribute('href',"/whatever").
                    // Circumvent this problem by creating a new link with given URL and
                    // querying that for a hostname.
                    hostname = this.hostname ? this.hostname : function (a) {
                        var l = document.createElement("a");
                        l.href = a.href;
                        return l.hostname;
                    }(this);

                    if (hostname == window.location.hostname && app.lookupRoute('get', full_path) && _Sammy.targetIsThisWindow(e, 'a')) {
                        e.preventDefault();
                        proxy.setLocation(full_path);
                        return false;
                    }
                });
            }
            if (!lp._bindings) {
                lp._bindings = 0;
            }
            lp._bindings++;
        },

        // unbind the proxy events from the current app
        unbind: function unbind() {
            $(window).unbind('hashchange.' + this.app.eventNamespace());
            $(window).unbind('popstate.' + this.app.eventNamespace());
            $(document).undelegate('a', 'click.history-' + this.app.eventNamespace());
            _Sammy.DefaultLocationProxy._bindings--;
            if (_Sammy.DefaultLocationProxy._bindings <= 0) {
                window.clearInterval(_Sammy.DefaultLocationProxy._interval);
                _Sammy.DefaultLocationProxy._interval = null;
            }
        },

        // get the current location from the hash.
        getLocation: function getLocation() {
            return _Sammy.DefaultLocationProxy.fullPath(window.location);
        },

        // set the current location to `new_location`
        setLocation: function setLocation(new_location) {
            if (/^([^#\/]|$)/.test(new_location)) {
                // non-prefixed url
                if (_has_history && !this.app.disable_push_state) {
                    new_location = '/' + new_location;
                } else {
                    new_location = '#!/' + new_location;
                }
            }
            if (new_location != this.getLocation()) {
                // HTML5 History exists and new_location is a full path
                if (_has_history && !this.app.disable_push_state && /^\//.test(new_location)) {
                    history.pushState({ path: new_location }, window.title, new_location);
                    this.app.trigger('location-changed');
                } else {
                    return window.location = new_location;
                }
            }
        },

        _startPolling: function _startPolling(every) {
            // set up interval
            var proxy = this;
            if (!_Sammy.DefaultLocationProxy._interval) {
                if (!every) {
                    every = 10;
                }
                var hashCheck = function hashCheck() {
                    var current_location = proxy.getLocation();
                    if (typeof _Sammy.DefaultLocationProxy._last_location == 'undefined' || current_location != _Sammy.DefaultLocationProxy._last_location) {
                        window.setTimeout(function () {
                            $(window).trigger('hashchange', [true]);
                        }, 0);
                    }
                    _Sammy.DefaultLocationProxy._last_location = current_location;
                };
                hashCheck();
                _Sammy.DefaultLocationProxy._interval = window.setInterval(hashCheck, every);
            }
        }
    });

    // Sammy.Application is the Base prototype for defining 'applications'.
    // An 'application' is a collection of 'routes' and bound events that is
    // attached to an element when `run()` is called.
    // The only argument an 'app_function' is evaluated within the context of the application.
    _Sammy.Application = function (app_function) {
        var app = this;
        this.routes = {};
        this.listeners = new _Sammy.Object({});
        this.arounds = [];
        this.befores = [];
        // generate a unique namespace
        this.namespace = new Date().getTime() + '-' + parseInt(Math.random() * 1000, 10);
        this.context_prototype = function () {
            _Sammy.EventContext.apply(this, arguments);
        };
        this.context_prototype.prototype = new _Sammy.EventContext();

        if (_isFunction(app_function)) {
            app_function.apply(this, [this]);
        }
        // set the location proxy if not defined to the default (DefaultLocationProxy)
        if (!this._location_proxy) {
            this.setLocationProxy(new _Sammy.DefaultLocationProxy(this, this.run_interval_every));
        }
        if (this.debug) {
            this.bindToAllEvents(function (e, data) {
                app.log(app.toString(), e.cleaned_type, data || {});
            });
        }
    };

    _Sammy.Application.prototype = $.extend({}, _Sammy.Object.prototype, {

        // the four route verbs
        ROUTE_VERBS: ['get', 'post', 'put', 'delete'],

        // An array of the default events triggered by the
        // application during its lifecycle
        APP_EVENTS: ['run', 'unload', 'lookup-route', 'run-route', 'route-found', 'event-context-before', 'event-context-after', 'changed', 'error', 'check-form-submission', 'redirect', 'location-changed'],

        _last_route: null,
        _location_proxy: null,
        _running: false,

        // Defines what element the application is bound to. Provide a selector
        // (parseable by `jQuery()`) and this will be used by `$element()`
        element_selector: 'body',

        // When set to true, logs all of the default events using `log()`
        debug: false,

        // When set to true, and the error() handler is not overridden, will actually
        // raise JS errors in routes (500) and when routes can't be found (404)
        raise_errors: false,

        // The time in milliseconds that the URL is queried for changes
        run_interval_every: 50,

        // if using the `DefaultLocationProxy` setting this to true will force the app to use
        // traditional hash based routing as opposed to the new HTML5 PushState support
        disable_push_state: false,

        // The default template engine to use when using `partial()` in an
        // `EventContext`. `template_engine` can either be a string that
        // corresponds to the name of a method/helper on EventContext or it can be a function
        // that takes two arguments, the content of the unrendered partial and an optional
        // JS object that contains interpolation data. Template engine is only called/referred
        // to if the extension of the partial is null or unknown. See `partial()`
        // for more information
        template_engine: null,

        // //=> Sammy.Application: body
        toString: function toString() {
            return 'Sammy.Application:' + this.element_selector;
        },

        // returns a jQuery object of the Applications bound element.
        $element: function $element(selector) {
            return selector ? $(this.element_selector).find(selector) : $(this.element_selector);
        },

        // `use()` is the entry point for including Sammy plugins.
        // The first argument to use should be a function() that is evaluated
        // in the context of the current application, just like the `app_function`
        // argument to the `Sammy.Application` constructor.
        //
        // Any additional arguments are passed to the app function sequentially.
        //
        // For much more detail about plugins, check out:
        // [http://sammyjs.org/docs/plugins](http://sammyjs.org/docs/plugins)
        //
        // ### Example
        //
        //      var MyPlugin = function(app, prepend) {
        //
        //        this.helpers({
        //          myhelper: function(text) {
        //            alert(prepend + " " + text);
        //          }
        //        });
        //
        //      };
        //
        //      var app = $.sammy(function() {
        //
        //        this.use(MyPlugin, 'This is my plugin');
        //
        //        this.get('#/', function() {
        //          this.myhelper('and dont you forget it!');
        //          //=> Alerts: This is my plugin and dont you forget it!
        //        });
        //
        //      });
        //
        // If plugin is passed as a string it assumes your are trying to load
        // Sammy."Plugin". This is the preferred way of loading core Sammy plugins
        // as it allows for better error-messaging.
        //
        // ### Example
        //
        //      $.sammy(function() {
        //        this.use('Mustache'); //=> Sammy.Mustache
        //        this.use('Storage'); //=> Sammy.Storage
        //      });
        //
        use: function use() {
            // flatten the arguments
            var args = _makeArray(arguments),
                plugin = args.shift(),
                plugin_name = plugin || '';
            try {
                args.unshift(this);
                if (typeof plugin == 'string') {
                    plugin_name = 'Sammy.' + plugin;
                    plugin = _Sammy[plugin];
                }
                plugin.apply(this, args);
            } catch (e) {
                if (typeof plugin === 'undefined') {
                    this.error("Plugin Error: called use() but plugin (" + plugin_name.toString() + ") is not defined", e);
                } else if (!_isFunction(plugin)) {
                    this.error("Plugin Error: called use() but '" + plugin_name.toString() + "' is not a function", e);
                } else {
                    this.error("Plugin Error", e);
                }
            }
            return this;
        },

        // Sets the location proxy for the current app. By default this is set to
        // a new `Sammy.DefaultLocationProxy` on initialization. However, you can set
        // the location_proxy inside you're app function to give your app a custom
        // location mechanism. See `Sammy.DefaultLocationProxy` and `Sammy.DataLocationProxy`
        // for examples.
        //
        // `setLocationProxy()` takes an initialized location proxy.
        //
        // ### Example
        //
        //        // to bind to data instead of the default hash;
        //        var app = $.sammy(function() {
        //          this.setLocationProxy(new Sammy.DataLocationProxy(this));
        //        });
        //
        setLocationProxy: function setLocationProxy(new_proxy) {
            var original_proxy = this._location_proxy;
            this._location_proxy = new_proxy;
            if (this.isRunning()) {
                if (original_proxy) {
                    // if there is already a location proxy, unbind it.
                    original_proxy.unbind();
                }
                this._location_proxy.bind();
            }
        },

        // provide log() override for inside an app that includes the relevant application element_selector
        log: function log() {
            _Sammy.log.apply(_Sammy, Array.prototype.concat.apply([this.element_selector], arguments));
        },

        // `route()` is the main method for defining routes within an application.
        // For great detail on routes, check out:
        // [http://sammyjs.org/docs/routes](http://sammyjs.org/docs/routes)
        //
        // This method also has aliases for each of the different verbs (eg. `get()`, `post()`, etc.)
        //
        // ### Arguments
        //
        // * `verb` A String in the set of ROUTE_VERBS or 'any'. 'any' will add routes for each
        //    of the ROUTE_VERBS. If only two arguments are passed,
        //    the first argument is the path, the second is the callback and the verb
        //    is assumed to be 'any'.
        // * `path` A Regexp or a String representing the path to match to invoke this verb.
        // * `callback` A Function that is called/evaluated when the route is run see: `runRoute()`.
        //    It is also possible to pass a string as the callback, which is looked up as the name
        //    of a method on the application.
        //
        route: function route(verb, path) {
            var app = this,
                param_names = [],
                add_route,
                path_match,
                callback = Array.prototype.slice.call(arguments, 2);

            // if the method signature is just (path, callback)
            // assume the verb is 'any'
            if (callback.length === 0 && _isFunction(path)) {
                callback = [path];
                path = verb;
                verb = 'any';
            }

            verb = verb.toLowerCase(); // ensure verb is lower case

            // if path is a string turn it into a regex
            if (path.constructor == String) {

                // Needs to be explicitly set because IE will maintain the index unless NULL is returned,
                // which means that with two consecutive routes that contain params, the second set of params will not be found and end up in splat instead of params
                // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/RegExp/lastIndex
                PATH_NAME_MATCHER.lastIndex = 0;

                // find the names
                while ((path_match = PATH_NAME_MATCHER.exec(path)) !== null) {
                    param_names.push(path_match[1]);
                }
                // replace with the path replacement
                path = new RegExp(path.replace(PATH_NAME_MATCHER, PATH_REPLACER) + "$");
            }
            // lookup callbacks
            $.each(callback, function (i, cb) {
                if (typeof cb === 'string') {
                    callback[i] = app[cb];
                }
            });

            add_route = function add_route(with_verb) {
                var r = { verb: with_verb, path: path, callback: callback, param_names: param_names };
                // add route to routes array
                app.routes[with_verb] = app.routes[with_verb] || [];
                // place routes in order of definition
                app.routes[with_verb].push(r);
            };

            if (verb === 'any') {
                $.each(this.ROUTE_VERBS, function (i, v) {
                    add_route(v);
                });
            } else {
                add_route(verb);
            }

            // return the app
            return this;
        },

        // Alias for route('get', ...)
        get: _routeWrapper('get'),

        // Alias for route('post', ...)
        post: _routeWrapper('post'),

        // Alias for route('put', ...)
        put: _routeWrapper('put'),

        // Alias for route('delete', ...)
        del: _routeWrapper('delete'),

        // Alias for route('any', ...)
        any: _routeWrapper('any'),

        // `mapRoutes` takes an array of arrays, each array being passed to route()
        // as arguments, this allows for mass definition of routes. Another benefit is
        // this makes it possible/easier to load routes via remote JSON.
        //
        // ### Example
        //
        //      var app = $.sammy(function() {
        //
        //        this.mapRoutes([
        //            ['get', '#/', function() { this.log('index'); }],
        //            // strings in callbacks are looked up as methods on the app
        //            ['post', '#/create', 'addUser'],
        //            // No verb assumes 'any' as the verb
        //            [/dowhatever/, function() { this.log(this.verb, this.path)}];
        //          ]);
        //      });
        //
        mapRoutes: function mapRoutes(route_array) {
            var app = this;
            $.each(route_array, function (i, route_args) {
                app.route.apply(app, route_args);
            });
            return this;
        },

        // A unique event namespace defined per application.
        // All events bound with `bind()` are automatically bound within this space.
        eventNamespace: function eventNamespace() {
            return ['sammy-app', this.namespace].join('-');
        },

        // Works just like `jQuery.fn.bind()` with a couple notable differences.
        //
        // * It binds all events to the application element
        // * All events are bound within the `eventNamespace()`
        // * Events are not actually bound until the application is started with `run()`
        // * callbacks are evaluated within the context of a Sammy.EventContext
        //
        bind: function bind(name, data, callback) {
            var app = this;
            // build the callback
            // if the arity is 2, callback is the second argument
            if (typeof callback == 'undefined') {
                callback = data;
            }
            var listener_callback = function listener_callback() {
                // pull off the context from the arguments to the callback
                var e, context, data;
                e = arguments[0];
                data = arguments[1];
                if (data && data.context) {
                    context = data.context;
                    delete data.context;
                } else {
                    context = new app.context_prototype(app, 'bind', e.type, data, e.target);
                }
                e.cleaned_type = e.type.replace(app.eventNamespace(), '');
                callback.apply(context, [e, data]);
            };

            // it could be that the app element doesnt exist yet
            // so attach to the listeners array and then run()
            // will actually bind the event.
            if (!this.listeners[name]) {
                this.listeners[name] = [];
            }
            this.listeners[name].push(listener_callback);
            if (this.isRunning()) {
                // if the app is running
                // *actually* bind the event to the app element
                this._listen(name, listener_callback);
            }
            return this;
        },

        // Triggers custom events defined with `bind()`
        //
        // ### Arguments
        //
        // * `name` The name of the event. Automatically prefixed with the `eventNamespace()`
        // * `data` An optional Object that can be passed to the bound callback.
        // * `context` An optional context/Object in which to execute the bound callback.
        //   If no context is supplied a the context is a new `Sammy.EventContext`
        //
        trigger: function trigger(name, data) {
            this.$element().trigger([name, this.eventNamespace()].join('.'), [data]);
            return this;
        },

        // Reruns the current route
        refresh: function refresh() {
            this.last_location = null;
            this.trigger('location-changed');
            return this;
        },

        // Takes a single callback that is pushed on to a stack.
        // Before any route is run, the callbacks are evaluated in order within
        // the current `Sammy.EventContext`
        //
        // If any of the callbacks explicitly return false, execution of any
        // further callbacks and the route itself is halted.
        //
        // You can also provide a set of options that will define when to run this
        // before based on the route it proceeds.
        //
        // ### Example
        //
        //      var app = $.sammy(function() {
        //
        //        // will run at #/route but not at #/
        //        this.before('#/route', function() {
        //          //...
        //        });
        //
        //        // will run at #/ but not at #/route
        //        this.before({except: {path: '#/route'}}, function() {
        //          this.log('not before #/route');
        //        });
        //
        //        this.get('#/', function() {});
        //
        //        this.get('#/route', function() {});
        //
        //      });
        //
        // See `contextMatchesOptions()` for a full list of supported options
        //
        before: function before(options, callback) {
            if (_isFunction(options)) {
                callback = options;
                options = {};
            }
            this.befores.push([options, callback]);
            return this;
        },

        // A shortcut for binding a callback to be run after a route is executed.
        // After callbacks have no guarunteed order.
        after: function after(callback) {
            return this.bind('event-context-after', callback);
        },

        // Adds an around filter to the application. around filters are functions
        // that take a single argument `callback` which is the entire route
        // execution path wrapped up in a closure. This means you can decide whether
        // or not to proceed with execution by not invoking `callback` or,
        // more usefully wrapping callback inside the result of an asynchronous execution.
        //
        // ### Example
        //
        // The most common use case for around() is calling a _possibly_ async function
        // and executing the route within the functions callback:
        //
        //      var app = $.sammy(function() {
        //
        //        var current_user = false;
        //
        //        function checkLoggedIn(callback) {
        //          // /session returns a JSON representation of the logged in user
        //          // or an empty object
        //          if (!current_user) {
        //            $.getJSON('/session', function(json) {
        //              if (json.login) {
        //                // show the user as logged in
        //                current_user = json;
        //                // execute the route path
        //                callback();
        //              } else {
        //                // show the user as not logged in
        //                current_user = false;
        //                // the context of aroundFilters is an EventContext
        //                this.redirect('#/login');
        //              }
        //            });
        //          } else {
        //            // execute the route path
        //            callback();
        //          }
        //        };
        //
        //        this.around(checkLoggedIn);
        //
        //      });
        //
        around: function around(callback) {
            this.arounds.push(callback);
            return this;
        },

        // Adds a onComplete function to the application. onComplete functions are executed
        // at the end of a chain of route callbacks, if they call next(). Unlike after,
        // which is called as soon as the route is complete, onComplete is like a final next()
        // for all routes, and is thus run asynchronously
        //
        // ### Example
        //
        //      app.get('/chain',function(context,next) {
        //          console.log('chain1');
        //          next();
        //      },function(context,next) {
        //          console.log('chain2');
        //          next();
        //      });
        //
        //      app.get('/link',function(context,next) {
        //          console.log('link1');
        //          next();
        //      },function(context,next) {
        //          console.log('link2');
        //          next();
        //      });
        //
        //      app.onComplete(function() {
        //          console.log("Running finally");
        //      });
        //
        // If you go to '/chain', you will get the following messages:
        //
        //      chain1
        //      chain2
        //      Running onComplete
        //
        //
        // If you go to /link, you will get the following messages:
        //
        //      link1
        //      link2
        //      Running onComplete
        //
        //
        // It really comes to play when doing asynchronous:
        //
        //      app.get('/chain',function(context,next) {
        //        $.get('/my/url',function() {
        //          console.log('chain1');
        //          next();
        //        });
        //      },function(context,next) {
        //        console.log('chain2');
        //        next();
        //      });
        //
        onComplete: function onComplete(callback) {
            this._onComplete = callback;
            return this;
        },

        // Returns `true` if the current application is running.
        isRunning: function isRunning() {
            return this._running;
        },

        // Helpers extends the EventContext prototype specific to this app.
        // This allows you to define app specific helper functions that can be used
        // whenever you're inside of an event context (templates, routes, bind).
        //
        // ### Example
        //
        //     var app = $.sammy(function() {
        //
        //       helpers({
        //         upcase: function(text) {
        //          return text.toString().toUpperCase();
        //         }
        //       });
        //
        //       get('#/', function() { with(this) {
        //         // inside of this context I can use the helpers
        //         $('#main').html(upcase($('#main').text());
        //       }});
        //
        //     });
        //
        //
        // ### Arguments
        //
        // * `extensions` An object collection of functions to extend the context.
        //
        helpers: function helpers(extensions) {
            $.extend(this.context_prototype.prototype, extensions);
            return this;
        },

        // Helper extends the event context just like `helpers()` but does it
        // a single method at a time. This is especially useful for dynamically named
        // helpers
        //
        // ### Example
        //
        //     // Trivial example that adds 3 helper methods to the context dynamically
        //     var app = $.sammy(function(app) {
        //
        //       $.each([1,2,3], function(i, num) {
        //         app.helper('helper' + num, function() {
        //           this.log("I'm helper number " + num);
        //         });
        //       });
        //
        //       this.get('#/', function() {
        //         this.helper2(); //=> I'm helper number 2
        //       });
        //     });
        //
        // ### Arguments
        //
        // * `name` The name of the method
        // * `method` The function to be added to the prototype at `name`
        //
        helper: function helper(name, method) {
            this.context_prototype.prototype[name] = method;
            return this;
        },

        // Actually starts the application's lifecycle. `run()` should be invoked
        // within a document.ready block to ensure the DOM exists before binding events, etc.
        //
        // ### Example
        //
        //     var app = $.sammy(function() { ... }); // your application
        //     $(function() { // document.ready
        //        app.run();
        //     });
        //
        // ### Arguments
        //
        // * `start_url` Optionally, a String can be passed which the App will redirect to
        //   after the events/routes have been bound.
        run: function run(start_url) {
            if (this.isRunning()) {
                return false;
            }
            var app = this;

            // actually bind all the listeners
            $.each(this.listeners.toHash(), function (name, callbacks) {
                $.each(callbacks, function (i, listener_callback) {
                    app._listen(name, listener_callback);
                });
            });

            this.trigger('run', { start_url: start_url });
            this._running = true;
            // set last location
            this.last_location = null;
            if (!/\#(.+)/.test(this.getLocation()) && typeof start_url != 'undefined') {
                this.setLocation(start_url);
            }
            // check url
            this._checkLocation();
            this._location_proxy.bind();
            this.bind('location-changed', function () {
                app._checkLocation();
            });

            // bind to submit to capture post/put/delete routes
            this.bind('submit', function (e) {
                if (!_Sammy.targetIsThisWindow(e, 'form')) {
                    return true;
                }
                var returned = app._checkFormSubmission($(e.target).closest('form'));
                return returned === false ? e.preventDefault() : false;
            });

            // bind unload to body unload
            $(window).bind('unload', function () {
                app.unload();
            });

            // trigger html changed
            return this.trigger('changed');
        },

        // The opposite of `run()`, un-binds all event listeners and intervals
        // `run()` Automatically binds a `onunload` event to run this when
        // the document is closed.
        unload: function unload() {
            if (!this.isRunning()) {
                return false;
            }
            var app = this;
            this.trigger('unload');
            // clear interval
            this._location_proxy.unbind();
            // unbind form submits
            this.$element().unbind('submit').removeClass(app.eventNamespace());
            // unbind all events
            $.each(this.listeners.toHash(), function (name, listeners) {
                $.each(listeners, function (i, listener_callback) {
                    app._unlisten(name, listener_callback);
                });
            });
            this._running = false;
            return this;
        },

        // Not only runs `unbind` but also destroys the app reference.
        destroy: function destroy() {
            this.unload();
            delete _Sammy.apps[this.element_selector];
            return this;
        },

        // Will bind a single callback function to every event that is already
        // being listened to in the app. This includes all the `APP_EVENTS`
        // as well as any custom events defined with `bind()`.
        //
        // Used internally for debug logging.
        bindToAllEvents: function bindToAllEvents(callback) {
            var app = this;
            // bind to the APP_EVENTS first
            $.each(this.APP_EVENTS, function (i, e) {
                app.bind(e, callback);
            });
            // next, bind to listener names (only if they dont exist in APP_EVENTS)
            $.each(this.listeners.keys(true), function (i, name) {
                if ($.inArray(name, app.APP_EVENTS) == -1) {
                    app.bind(name, callback);
                }
            });
            return this;
        },

        // Returns a copy of the given path with any query string after the hash
        // removed.
        routablePath: function routablePath(path) {
            return path.replace(QUERY_STRING_MATCHER, '');
        },

        // Given a verb and a String path, will return either a route object or false
        // if a matching route can be found within the current defined set.
        lookupRoute: function lookupRoute(verb, path) {
            var app = this,
                routed = false,
                i = 0,
                l,
                route;
            if (typeof this.routes[verb] != 'undefined') {
                l = this.routes[verb].length;
                for (; i < l; i++) {
                    route = this.routes[verb][i];
                    if (app.routablePath(path).match(route.path)) {
                        routed = route;
                        break;
                    }
                }
            }
            return routed;
        },

        // First, invokes `lookupRoute()` and if a route is found, parses the
        // possible URL params and then invokes the route's callback within a new
        // `Sammy.EventContext`. If the route can not be found, it calls
        // `notFound()`. If `raise_errors` is set to `true` and
        // the `error()` has not been overridden, it will throw an actual JS
        // error.
        //
        // You probably will never have to call this directly.
        //
        // ### Arguments
        //
        // * `verb` A String for the verb.
        // * `path` A String path to lookup.
        // * `params` An Object of Params pulled from the URI or passed directly.
        //
        // ### Returns
        //
        // Either returns the value returned by the route callback or raises a 404 Not Found error.
        //
        runRoute: function runRoute(verb, path, params, target) {
            var app = this,
                route = this.lookupRoute(verb, path),
                context,
                wrapped_route,
                arounds,
                around,
                befores,
                before,
                callback_args,
                path_params,
                final_returned;

            if (this.debug) {
                this.log('runRoute', [verb, path].join(' '));
            }

            this.trigger('run-route', { verb: verb, path: path, params: params });
            if (typeof params == 'undefined') {
                params = {};
            }

            $.extend(params, this._parseQueryString(path));

            if (route) {
                this.trigger('route-found', { route: route });
                // pull out the params from the path
                if ((path_params = route.path.exec(this.routablePath(path))) !== null) {
                    // first match is the full path
                    path_params.shift();
                    // for each of the matches
                    $.each(path_params, function (i, param) {
                        // if theres a matching param name
                        if (route.param_names[i]) {
                            // set the name to the match
                            params[route.param_names[i]] = _decode(param);
                        } else {
                            // initialize 'splat'
                            if (!params.splat) {
                                params.splat = [];
                            }
                            params.splat.push(_decode(param));
                        }
                    });
                }

                // set event context
                context = new this.context_prototype(this, verb, path, params, target);
                // ensure arrays
                arounds = this.arounds.slice(0);
                befores = this.befores.slice(0);
                // set the callback args to the context + contents of the splat
                callback_args = [context];
                if (params.splat) {
                    callback_args = callback_args.concat(params.splat);
                }
                // wrap the route up with the before filters
                wrapped_route = function wrapped_route() {
                    var returned, i, nextRoute;
                    while (befores.length > 0) {
                        before = befores.shift();
                        // check the options
                        if (app.contextMatchesOptions(context, before[0])) {
                            returned = before[1].apply(context, [context]);
                            if (returned === false) {
                                return false;
                            }
                        }
                    }
                    app.last_route = route;
                    context.trigger('event-context-before', { context: context });
                    // run multiple callbacks
                    if (typeof route.callback === "function") {
                        route.callback = [route.callback];
                    }
                    if (route.callback && route.callback.length) {
                        i = -1;
                        nextRoute = function nextRoute() {
                            i++;
                            if (route.callback[i]) {
                                returned = route.callback[i].apply(context, callback_args);
                            } else if (app._onComplete && _typeof(app._onComplete === "function")) {
                                app._onComplete(context);
                            }
                        };
                        callback_args.push(nextRoute);
                        nextRoute();
                    }
                    context.trigger('event-context-after', { context: context });
                    return returned;
                };
                $.each(arounds.reverse(), function (i, around) {
                    var last_wrapped_route = wrapped_route;
                    wrapped_route = function wrapped_route() {
                        return around.apply(context, [last_wrapped_route]);
                    };
                });
                try {
                    final_returned = wrapped_route();
                } catch (e) {
                    this.error(['500 Error', verb, path].join(' '), e);
                }
                return final_returned;
            } else {
                return this.notFound(verb, path);
            }
        },

        // Matches an object of options against an `EventContext` like object that
        // contains `path` and `verb` attributes. Internally Sammy uses this
        // for matching `before()` filters against specific options. You can set the
        // object to _only_ match certain paths or verbs, or match all paths or verbs _except_
        // those that match the options.
        //
        // ### Example
        //
        //     var app = $.sammy(),
        //         context = {verb: 'get', path: '#/mypath'};
        //
        //     // match against a path string
        //     app.contextMatchesOptions(context, '#/mypath'); //=> true
        //     app.contextMatchesOptions(context, '#/otherpath'); //=> false
        //     // equivalent to
        //     app.contextMatchesOptions(context, {only: {path:'#/mypath'}}); //=> true
        //     app.contextMatchesOptions(context, {only: {path:'#/otherpath'}}); //=> false
        //     // match against a path regexp
        //     app.contextMatchesOptions(context, /path/); //=> true
        //     app.contextMatchesOptions(context, /^path/); //=> false
        //     // match only a verb
        //     app.contextMatchesOptions(context, {only: {verb:'get'}}); //=> true
        //     app.contextMatchesOptions(context, {only: {verb:'post'}}); //=> false
        //     // match all except a verb
        //     app.contextMatchesOptions(context, {except: {verb:'post'}}); //=> true
        //     app.contextMatchesOptions(context, {except: {verb:'get'}}); //=> false
        //     // match all except a path
        //     app.contextMatchesOptions(context, {except: {path:'#/otherpath'}}); //=> true
        //     app.contextMatchesOptions(context, {except: {path:'#/mypath'}}); //=> false
        //     // match all except a verb and a path
        //     app.contextMatchesOptions(context, {except: {path:'#/otherpath', verb:'post'}}); //=> true
        //     app.contextMatchesOptions(context, {except: {path:'#/mypath', verb:'post'}}); //=> true
        //     app.contextMatchesOptions(context, {except: {path:'#/mypath', verb:'get'}}); //=> false
        //     // match multiple paths
        //     app.contextMatchesOptions(context, {path: ['#/mypath', '#/otherpath']}); //=> true
        //     app.contextMatchesOptions(context, {path: ['#/otherpath', '#/thirdpath']}); //=> false
        //     // equivalent to
        //     app.contextMatchesOptions(context, {only: {path: ['#/mypath', '#/otherpath']}}); //=> true
        //     app.contextMatchesOptions(context, {only: {path: ['#/otherpath', '#/thirdpath']}}); //=> false
        //     // match all except multiple paths
        //     app.contextMatchesOptions(context, {except: {path: ['#/mypath', '#/otherpath']}}); //=> false
        //     app.contextMatchesOptions(context, {except: {path: ['#/otherpath', '#/thirdpath']}}); //=> true
        //     // match all except multiple paths and verbs
        //     app.contextMatchesOptions(context, {except: {path: ['#/mypath', '#/otherpath'], verb: ['get', 'post']}}); //=> false
        //     app.contextMatchesOptions(context, {except: {path: ['#/otherpath', '#/thirdpath'], verb: ['get', 'post']}}); //=> true
        //
        contextMatchesOptions: function contextMatchesOptions(context, match_options, positive) {
            var options = match_options;
            // normalize options
            if (typeof options === 'string' || _isRegExp(options)) {
                options = { path: options };
            }
            if (typeof positive === 'undefined') {
                positive = true;
            }
            // empty options always match
            if ($.isEmptyObject(options)) {
                return true;
            }
            // Do we have to match against multiple paths?
            if (_isArray(options.path)) {
                var results, numopt, opts, len;
                results = [];
                for (numopt = 0, len = options.path.length; numopt < len; numopt += 1) {
                    opts = $.extend({}, options, { path: options.path[numopt] });
                    results.push(this.contextMatchesOptions(context, opts));
                }
                var matched = $.inArray(true, results) > -1 ? true : false;
                return positive ? matched : !matched;
            }
            if (options.only) {
                return this.contextMatchesOptions(context, options.only, true);
            } else if (options.except) {
                return this.contextMatchesOptions(context, options.except, false);
            }
            var path_matched = true,
                verb_matched = true;
            if (options.path) {
                if (!_isRegExp(options.path)) {
                    options.path = new RegExp(options.path.toString() + '$');
                }
                path_matched = options.path.test(context.path);
            }
            if (options.verb) {
                if (typeof options.verb === 'string') {
                    verb_matched = options.verb === context.verb;
                } else {
                    verb_matched = options.verb.indexOf(context.verb) > -1;
                }
            }
            return positive ? verb_matched && path_matched : !(verb_matched && path_matched);
        },

        // Delegates to the `location_proxy` to get the current location.
        // See `Sammy.DefaultLocationProxy` for more info on location proxies.
        getLocation: function getLocation() {
            return this._location_proxy.getLocation();
        },

        // Delegates to the `location_proxy` to set the current location.
        // See `Sammy.DefaultLocationProxy` for more info on location proxies.
        //
        // ### Arguments
        //
        // * `new_location` A new location string (e.g. '#/')
        //
        setLocation: function setLocation(new_location) {
            return this._location_proxy.setLocation(new_location);
        },

        // Swaps the content of `$element()` with `content`
        // You can override this method to provide an alternate swap behavior
        // for `EventContext.partial()`.
        //
        // ### Example
        //
        //      var app = $.sammy(function() {
        //
        //        // implements a 'fade out'/'fade in'
        //        this.swap = function(content, callback) {
        //          var context = this;
        //          context.$element().fadeOut('slow', function() {
        //            context.$element().html(content);
        //            context.$element().fadeIn('slow', function() {
        //              if (callback) {
        //                callback.apply();
        //              }
        //            });
        //          });
        //        };
        //
        //      });
        //
        swap: function swap(content, callback) {
            var $el = this.$element().html(content);
            if (_isFunction(callback)) {
                callback(content);
            }
            return $el;
        },

        // a simple global cache for templates. Uses the same semantics as
        // `Sammy.Cache` and `Sammy.Storage` so can easily be replaced with
        // a persistent storage that lasts beyond the current request.
        templateCache: function templateCache(key, value) {
            if (typeof value != 'undefined') {
                return _template_cache[key] = value;
            } else {
                return _template_cache[key];
            }
        },

        // clear the templateCache
        clearTemplateCache: function clearTemplateCache() {
            return _template_cache = {};
        },

        // This throws a '404 Not Found' error by invoking `error()`.
        // Override this method or `error()` to provide custom
        // 404 behavior (i.e redirecting to / or showing a warning)
        notFound: function notFound(verb, path) {
            var ret = this.error(['404 Not Found', verb, path].join(' '));
            return verb === 'get' ? ret : true;
        },

        // The base error handler takes a string `message` and an `Error`
        // object. If `raise_errors` is set to `true` on the app level,
        // this will re-throw the error to the browser. Otherwise it will send the error
        // to `log()`. Override this method to provide custom error handling
        // e.g logging to a server side component or displaying some feedback to the
        // user.
        error: function error(message, original_error) {
            if (!original_error) {
                original_error = new Error();
            }
            original_error.message = [message, original_error.message].join(' ');
            this.trigger('error', { message: original_error.message, error: original_error });
            if (this.raise_errors) {
                throw original_error;
            } else {
                this.log(original_error.message, original_error);
            }
        },

        _checkLocation: function _checkLocation() {
            var location, returned;
            // get current location
            location = this.getLocation();
            // compare to see if hash has changed
            if (!this.last_location || this.last_location[0] != 'get' || this.last_location[1] != location) {
                // reset last location
                this.last_location = ['get', location];
                // lookup route for current hash
                returned = this.runRoute('get', location);
            }
            return returned;
        },

        _getFormVerb: function _getFormVerb(form) {
            var $form = $(form),
                verb,
                $_method;
            $_method = $form.find('input[name="_method"]');
            if ($_method.length > 0) {
                verb = $_method.val();
            }
            if (!verb) {
                verb = $form[0].getAttribute('method');
            }
            if (!verb || verb === '') {
                verb = 'get';
            }
            return $.trim(verb.toString().toLowerCase());
        },

        _checkFormSubmission: function _checkFormSubmission(form) {
            var $form, path, verb, params, returned;
            this.trigger('check-form-submission', { form: form });
            $form = $(form);
            path = $form.attr('action') || '';
            verb = this._getFormVerb($form);

            if (this.debug) {
                this.log('_checkFormSubmission', $form, path, verb);
            }

            if (verb === 'get') {
                params = this._serializeFormParams($form);
                if (params !== '') {
                    path += '?' + params;
                }
                this.setLocation(path);
                returned = false;
            } else {
                params = $.extend({}, this._parseFormParams($form));
                returned = this.runRoute(verb, path, params, form.get(0));
            }
            return typeof returned == 'undefined' ? false : returned;
        },

        _serializeFormParams: function _serializeFormParams($form) {
            var queryString = "",
                fields = $form.serializeArray(),
                i;
            if (fields.length > 0) {
                queryString = this._encodeFormPair(fields[0].name, fields[0].value);
                for (i = 1; i < fields.length; i++) {
                    queryString = queryString + "&" + this._encodeFormPair(fields[i].name, fields[i].value);
                }
            }
            return queryString;
        },

        _encodeFormPair: function _encodeFormPair(name, value) {
            return _encode(name) + "=" + _encode(value);
        },

        _parseFormParams: function _parseFormParams($form) {
            var params = {},
                form_fields = $form.serializeArray(),
                i;
            for (i = 0; i < form_fields.length; i++) {
                params = this._parseParamPair(params, form_fields[i].name, form_fields[i].value);
            }
            return params;
        },

        _parseQueryString: function _parseQueryString(path) {
            var params = {},
                parts,
                pairs,
                pair,
                i;

            parts = path.match(QUERY_STRING_MATCHER);
            if (parts && parts[1]) {
                pairs = parts[1].split('&');
                for (i = 0; i < pairs.length; i++) {
                    pair = pairs[i].split('=');
                    params = this._parseParamPair(params, _decode(pair[0]), _decode(pair[1] || ""));
                }
            }
            return params;
        },

        _parseParamPair: function _parseParamPair(params, key, value) {
            if (typeof params[key] !== 'undefined') {
                if (_isArray(params[key])) {
                    params[key].push(value);
                } else {
                    params[key] = [params[key], value];
                }
            } else {
                params[key] = value;
            }
            return params;
        },

        _listen: function _listen(name, callback) {
            return this.$element().bind([name, this.eventNamespace()].join('.'), callback);
        },

        _unlisten: function _unlisten(name, callback) {
            return this.$element().unbind([name, this.eventNamespace()].join('.'), callback);
        }

    });

    // `Sammy.RenderContext` is an object that makes sequential template loading,
    // rendering and interpolation seamless even when dealing with asynchronous
    // operations.
    //
    // `RenderContext` objects are not usually created directly, rather they are
    // instantiated from an `Sammy.EventContext` by using `render()`, `load()` or
    // `partial()` which all return `RenderContext` objects.
    //
    // `RenderContext` methods always returns a modified `RenderContext`
    // for chaining (like jQuery itself).
    //
    // The core magic is in the `then()` method which puts the callback passed as
    // an argument into a queue to be executed once the previous callback is complete.
    // All the methods of `RenderContext` are wrapped in `then()` which allows you
    // to queue up methods by chaining, but maintaining a guaranteed execution order
    // even with remote calls to fetch templates.
    //
    _Sammy.RenderContext = function (event_context) {
        this.event_context = event_context;
        this.callbacks = [];
        this.previous_content = null;
        this.content = null;
        this.next_engine = false;
        this.waiting = false;
    };

    _Sammy.RenderContext.prototype = $.extend({}, _Sammy.Object.prototype, {

        // The "core" of the `RenderContext` object, adds the `callback` to the
        // queue. If the context is `waiting` (meaning an async operation is happening)
        // then the callback will be executed in order, once the other operations are
        // complete. If there is no currently executing operation, the `callback`
        // is executed immediately.
        //
        // The value returned from the callback is stored in `content` for the
        // subsequent operation. If you return `false`, the queue will pause, and
        // the next callback in the queue will not be executed until `next()` is
        // called. This allows for the guaranteed order of execution while working
        // with async operations.
        //
        // If then() is passed a string instead of a function, the string is looked
        // up as a helper method on the event context.
        //
        // ### Example
        //
        //      this.get('#/', function() {
        //        // initialize the RenderContext
        //        // Even though `load()` executes async, the next `then()`
        //        // wont execute until the load finishes
        //        this.load('myfile.txt')
        //            .then(function(content) {
        //              // the first argument to then is the content of the
        //              // prev operation
        //              $('#main').html(content);
        //            });
        //      });
        //
        then: function then(callback) {
            if (!_isFunction(callback)) {
                // if a string is passed to then, assume we want to call
                // a helper on the event context in its context
                if (typeof callback === 'string' && callback in this.event_context) {
                    var helper = this.event_context[callback];
                    callback = function callback(content) {
                        return helper.apply(this.event_context, [content]);
                    };
                } else {
                    return this;
                }
            }
            var context = this;
            if (this.waiting) {
                this.callbacks.push(callback);
            } else {
                this.wait();
                window.setTimeout(function () {
                    var returned = callback.apply(context, [context.content, context.previous_content]);
                    if (returned !== false) {
                        context.next(returned);
                    }
                }, 0);
            }
            return this;
        },

        // Pause the `RenderContext` queue. Combined with `next()` allows for async
        // operations.
        //
        // ### Example
        //
        //        this.get('#/', function() {
        //          this.load('mytext.json')
        //              .then(function(content) {
        //                var context = this,
        //                    data    = JSON.parse(content);
        //                // pause execution
        //                context.wait();
        //                // post to a url
        //                $.post(data.url, {}, function(response) {
        //                  context.next(JSON.parse(response));
        //                });
        //              })
        //              .then(function(data) {
        //                // data is json from the previous post
        //                $('#message').text(data.status);
        //              });
        //        });
        wait: function wait() {
            this.waiting = true;
        },

        // Resume the queue, setting `content` to be used in the next operation.
        // See `wait()` for an example.
        next: function next(content) {
            this.waiting = false;
            if (typeof content !== 'undefined') {
                this.previous_content = this.content;
                this.content = content;
            }
            if (this.callbacks.length > 0) {
                this.then(this.callbacks.shift());
            }
        },

        // Load a template into the context.
        // The `location` can either be a string specifying the remote path to the
        // file, a jQuery object, or a DOM element.
        //
        // No interpolation happens by default, the content is stored in
        // `content`.
        //
        // In the case of a path, unless the option `{cache: false}` is passed the
        // data is stored in the app's `templateCache()`.
        //
        // If a jQuery or DOM object is passed the `innerHTML` of the node is pulled in.
        // This is useful for nesting templates as part of the initial page load wrapped
        // in invisible elements or `<script>` tags. With template paths, the template
        // engine is looked up by the extension. For DOM/jQuery embedded templates,
        // this isnt possible, so there are a couple of options:
        //
        //  * pass an `{engine:}` option.
        //  * define the engine in the `data-engine` attribute of the passed node.
        //  * just store the raw template data and use `interpolate()` manually
        //
        // If a `callback` is passed it is executed after the template load.
        load: function load(location, options, callback) {
            var context = this;
            return this.then(function () {
                var should_cache, cached, is_json, location_array;
                if (_isFunction(options)) {
                    callback = options;
                    options = {};
                } else {
                    options = $.extend({}, options);
                }
                if (callback) {
                    this.then(callback);
                }
                if (typeof location === 'string') {
                    // it's a path
                    is_json = location.match(/\.json(\?|$)/) || options.json;
                    should_cache = is_json ? options.cache === true : options.cache !== false;
                    context.next_engine = context.event_context.engineFor(location);
                    delete options.cache;
                    delete options.json;
                    if (options.engine) {
                        context.next_engine = options.engine;
                        delete options.engine;
                    }
                    if (should_cache && (cached = this.event_context.app.templateCache(location))) {
                        return cached;
                    }
                    this.wait();
                    $.ajax($.extend({
                        url: location,
                        data: {},
                        dataType: is_json ? 'json' : 'text',
                        type: 'get',
                        success: function success(data) {
                            if (should_cache) {
                                context.event_context.app.templateCache(location, data);
                            }
                            context.next(data);
                        }
                    }, options));
                    return false;
                } else {
                    // it's a dom/jQuery
                    if (location.nodeType) {
                        return location.innerHTML;
                    }
                    if (location.selector) {
                        // it's a jQuery
                        context.next_engine = location.attr('data-engine');
                        if (options.clone === false) {
                            return location.remove()[0].innerHTML.toString();
                        } else {
                            return location[0].innerHTML.toString();
                        }
                    }
                }
            });
        },

        // Load partials
        //
        // ### Example
        //
        //      this.loadPartials({mypartial: '/path/to/partial'});
        //
        loadPartials: function loadPartials(partials) {
            var name;
            if (partials) {
                this.partials = this.partials || {};
                for (name in partials) {
                    (function (context, name) {
                        context.load(partials[name]).then(function (template) {
                            this.partials[name] = template;
                        });
                    })(this, name);
                }
            }
            return this;
        },

        // `load()` a template and then `interpolate()` it with data.
        //
        // can be called with multiple different signatures:
        //
        //      this.render(callback);
        //      this.render('/location');
        //      this.render('/location', {some: data});
        //      this.render('/location', callback);
        //      this.render('/location', {some: data}, callback);
        //      this.render('/location', {some: data}, {my: partials});
        //      this.render('/location', callback, {my: partials});
        //      this.render('/location', {some: data}, callback, {my: partials});
        //
        // ### Example
        //
        //      this.get('#/', function() {
        //        this.render('mytemplate.template', {name: 'test'});
        //      });
        //
        render: function render(location, data, callback, partials) {
            if (_isFunction(location) && !data) {
                // invoked as render(callback)
                return this.then(location);
            } else {
                if (_isFunction(data)) {
                    // invoked as render(location, callback, [partials])
                    partials = callback;
                    callback = data;
                    data = null;
                } else if (callback && !_isFunction(callback)) {
                    // invoked as render(location, data, partials)
                    partials = callback;
                    callback = null;
                }

                return this.loadPartials(partials).load(location).interpolate(data, location).then(callback);
            }
        },

        // `render()` the `location` with `data` and then `swap()` the
        // app's `$element` with the rendered content.
        partial: function partial(location, data, callback, partials) {
            if (_isFunction(callback)) {
                // invoked as partial(location, data, callback, [partials])
                return this.render(location, data, partials).swap(callback);
            } else if (_isFunction(data)) {
                // invoked as partial(location, callback, [partials])
                return this.render(location, {}, callback).swap(data);
            } else {
                // invoked as partial(location, data, [partials])
                return this.render(location, data, callback).swap();
            }
        },

        // defers the call of function to occur in order of the render queue.
        // The function can accept any number of arguments as long as the last
        // argument is a callback function. This is useful for putting arbitrary
        // asynchronous functions into the queue. The content passed to the
        // callback is passed as `content` to the next item in the queue.
        //
        // ### Example
        //
        //     this.send($.getJSON, '/app.json')
        //         .then(function(json) {
        //           $('#message).text(json['message']);
        //          });
        //
        //
        send: function send() {
            var context = this,
                args = _makeArray(arguments),
                fun = args.shift();

            if (_isArray(args[0])) {
                args = args[0];
            }

            return this.then(function (content) {
                args.push(function (response) {
                    context.next(response);
                });
                context.wait();
                fun.apply(fun, args);
                return false;
            });
        },

        // iterates over an array, applying the callback for each item item. the
        // callback takes the same style of arguments as `jQuery.each()` (index, item).
        // The return value of each callback is collected as a single string and stored
        // as `content` to be used in the next iteration of the `RenderContext`.
        collect: function collect(array, callback, now) {
            var context = this;
            var coll = function coll() {
                if (_isFunction(array)) {
                    callback = array;
                    array = this.content;
                }
                var contents = [],
                    doms = false;
                $.each(array, function (i, item) {
                    var returned = callback.apply(context, [i, item]);
                    if (returned.jquery && returned.length == 1) {
                        returned = returned[0];
                        doms = true;
                    }
                    contents.push(returned);
                    return returned;
                });
                return doms ? contents : contents.join('');
            };
            return now ? coll() : this.then(coll);
        },

        // loads a template, and then interpolates it for each item in the `data`
        // array. If a callback is passed, it will call the callback with each
        // item in the array _after_ interpolation
        renderEach: function renderEach(location, name, data, callback) {
            if (_isArray(name)) {
                callback = data;
                data = name;
                name = null;
            }
            return this.load(location).then(function (content) {
                var rctx = this;
                if (!data) {
                    data = _isArray(this.previous_content) ? this.previous_content : [];
                }
                if (callback) {
                    $.each(data, function (i, value) {
                        var idata = {},
                            engine = this.next_engine || location;
                        if (name) {
                            idata[name] = value;
                        } else {
                            idata = value;
                        }
                        callback(value, rctx.event_context.interpolate(content, idata, engine));
                    });
                } else {
                    return this.collect(data, function (i, value) {
                        var idata = {},
                            engine = this.next_engine || location;
                        if (name) {
                            idata[name] = value;
                        } else {
                            idata = value;
                        }
                        return this.event_context.interpolate(content, idata, engine);
                    }, true);
                }
            });
        },

        // uses the previous loaded `content` and the `data` object to interpolate
        // a template. `engine` defines the templating/interpolation method/engine
        // that should be used. If `engine` is not passed, the `next_engine` is
        // used. If `retain` is `true`, the final interpolated data is appended to
        // the `previous_content` instead of just replacing it.
        interpolate: function interpolate(data, engine, retain) {
            var context = this;
            return this.then(function (content, prev) {
                if (!data && prev) {
                    data = prev;
                }
                if (this.next_engine) {
                    engine = this.next_engine;
                    this.next_engine = false;
                }
                var rendered = context.event_context.interpolate(content, data, engine, this.partials);
                return retain ? prev + rendered : rendered;
            });
        },

        // Swap the return contents ensuring order. See `Application#swap`
        swap: function swap(callback) {
            return this.then(function (content) {
                this.event_context.swap(content, callback);
                return content;
            }).trigger('changed', {});
        },

        // Same usage as `jQuery.fn.appendTo()` but uses `then()` to ensure order
        appendTo: function appendTo(selector) {
            return this.then(function (content) {
                $(selector).append(content);
            }).trigger('changed', {});
        },

        // Same usage as `jQuery.fn.prependTo()` but uses `then()` to ensure order
        prependTo: function prependTo(selector) {
            return this.then(function (content) {
                $(selector).prepend(content);
            }).trigger('changed', {});
        },

        // Replaces the `$(selector)` using `html()` with the previously loaded
        // `content`
        replace: function replace(selector) {
            return this.then(function (content) {
                $(selector).html(content);
            }).trigger('changed', {});
        },

        // trigger the event in the order of the event context. Same semantics
        // as `Sammy.EventContext#trigger()`. If data is omitted, `content`
        // is sent as `{content: content}`
        trigger: function trigger(name, data) {
            return this.then(function (content) {
                if (typeof data == 'undefined') {
                    data = { content: content };
                }
                this.event_context.trigger(name, data);
                return content;
            });
        }

    });

    // `Sammy.EventContext` objects are created every time a route is run or a
    // bound event is triggered. The callbacks for these events are evaluated within a `Sammy.EventContext`
    // This within these callbacks the special methods of `EventContext` are available.
    //
    // ### Example
    //
    //       $.sammy(function() {
    //         // The context here is this Sammy.Application
    //         this.get('#/:name', function() {
    //           // The context here is a new Sammy.EventContext
    //           if (this.params['name'] == 'sammy') {
    //             this.partial('name.html.erb', {name: 'Sammy'});
    //           } else {
    //             this.redirect('#/somewhere-else')
    //           }
    //         });
    //       });
    //
    // Initialize a new EventContext
    //
    // ### Arguments
    //
    // * `app` The `Sammy.Application` this event is called within.
    // * `verb` The verb invoked to run this context/route.
    // * `path` The string path invoked to run this context/route.
    // * `params` An Object of optional params to pass to the context. Is converted
    //   to a `Sammy.Object`.
    // * `target` a DOM element that the event that holds this context originates
    //   from. For post, put and del routes, this is the form element that triggered
    //   the route.
    //
    _Sammy.EventContext = function (app, verb, path, params, target) {
        this.app = app;
        this.verb = verb;
        this.path = path;
        this.params = new _Sammy.Object(params);
        this.target = target;
    };

    _Sammy.EventContext.prototype = $.extend({}, _Sammy.Object.prototype, {

        // A shortcut to the app's `$element()`
        $element: function $element() {
            return this.app.$element(_makeArray(arguments).shift());
        },

        // Look up a templating engine within the current app and context.
        // `engine` can be one of the following:
        //
        // * a function: should conform to `function(content, data) { return interpolated; }`
        // * a template path: 'template.ejs', looks up the extension to match to
        //   the `ejs()` helper
        // * a string referring to the helper: "mustache" => `mustache()`
        //
        // If no engine is found, use the app's default `template_engine`
        //
        engineFor: function engineFor(engine) {
            var context = this,
                engine_match;
            // if path is actually an engine function just return it
            if (_isFunction(engine)) {
                return engine;
            }
            // lookup engine name by path extension
            engine = (engine || context.app.template_engine).toString();
            if (engine_match = engine.match(/\.([^\.\?\#]+)(\?|$)/)) {
                engine = engine_match[1];
            }
            // set the engine to the default template engine if no match is found
            if (engine && _isFunction(context[engine])) {
                return context[engine];
            }

            if (context.app.template_engine) {
                return this.engineFor(context.app.template_engine);
            }
            return function (content, data) {
                return content;
            };
        },

        // using the template `engine` found with `engineFor()`, interpolate the
        // `data` into `content`
        interpolate: function interpolate(content, data, engine, partials) {
            return this.engineFor(engine).apply(this, [content, data, partials]);
        },

        // Create and return a `Sammy.RenderContext` calling `render()` on it.
        // Loads the template and interpolate the data, however does not actual
        // place it in the DOM.
        //
        // ### Example
        //
        //      // mytemplate.mustache <div class="name">{{name}}</div>
        //      render('mytemplate.mustache', {name: 'quirkey'});
        //      // sets the `content` to <div class="name">quirkey</div>
        //      render('mytemplate.mustache', {name: 'quirkey'})
        //        .appendTo('ul');
        //      // appends the rendered content to $('ul')
        //
        render: function render(location, data, callback, partials) {
            return new _Sammy.RenderContext(this).render(location, data, callback, partials);
        },

        // Create and return a `Sammy.RenderContext` calling `renderEach()` on it.
        // Loads the template and interpolates the data for each item,
        // however does not actually place it in the DOM.
        //
        // `name` is an optional parameter (if it is an array, it is used as `data`,
        // and the third parameter used as `callback`, if set).
        //
        // If `data` is not provided, content from the previous step in the chain
        // (if it is an array) is used, and `name` is used as the key for each
        // element of the array (useful for referencing in template).
        //
        // ### Example
        //
        //      // mytemplate.mustache <div class="name">{{name}}</div>
        //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}])
        //      // sets the `content` to <div class="name">quirkey</div><div class="name">endor</div>
        //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}]).appendTo('ul');
        //      // appends the rendered content to $('ul')
        //
        //      // names.json: ["quirkey", "endor"]
        //      this.load('names.json').renderEach('mytemplate.mustache', 'name').appendTo('ul');
        //      // uses the template to render each item in the JSON array
        //
        renderEach: function renderEach(location, name, data, callback) {
            return new _Sammy.RenderContext(this).renderEach(location, name, data, callback);
        },

        // create a new `Sammy.RenderContext` calling `load()` with `location` and
        // `options`. Called without interpolation or placement, this allows for
        // preloading/caching the templates.
        load: function load(location, options, callback) {
            return new _Sammy.RenderContext(this).load(location, options, callback);
        },

        // create a new `Sammy.RenderContext` calling `loadPartials()` with `partials`.
        loadPartials: function loadPartials(partials) {
            return new _Sammy.RenderContext(this).loadPartials(partials);
        },

        // `render()` the `location` with `data` and then `swap()` the
        // app's `$element` with the rendered content.
        partial: function partial(location, data, callback, partials) {
            return new _Sammy.RenderContext(this).partial(location, data, callback, partials);
        },

        // create a new `Sammy.RenderContext` calling `send()` with an arbitrary
        // function
        send: function send() {
            var rctx = new _Sammy.RenderContext(this);
            return rctx.send.apply(rctx, arguments);
        },

        // Changes the location of the current window. If `to` begins with
        // '#' it only changes the document's hash. If passed more than 1 argument
        // redirect will join them together with forward slashes.
        //
        // ### Example
        //
        //      redirect('#/other/route');
        //      // equivalent to
        //      redirect('#', 'other', 'route');
        //
        redirect: function redirect() {
            var to,
                args = _makeArray(arguments),
                current_location = this.app.getLocation(),
                l = args.length;
            if (l > 1) {
                var i = 0,
                    paths = [],
                    pairs = [],
                    params = {},
                    has_params = false;
                for (; i < l; i++) {
                    if (typeof args[i] == 'string') {
                        paths.push(args[i]);
                    } else {
                        $.extend(params, args[i]);
                        has_params = true;
                    }
                }
                to = paths.join('/');
                if (has_params) {
                    for (var k in params) {
                        pairs.push(this.app._encodeFormPair(k, params[k]));
                    }
                    to += '?' + pairs.join('&');
                }
            } else {
                to = args[0];
            }
            this.trigger('redirect', { to: to });
            this.app.last_location = [this.verb, this.path];
            this.app.setLocation(to);
            if (new RegExp(to).test(current_location)) {
                this.app.trigger('location-changed');
            }
        },

        // Triggers events on `app` within the current context.
        trigger: function trigger(name, data) {
            if (typeof data == 'undefined') {
                data = {};
            }
            if (!data.context) {
                data.context = this;
            }
            return this.app.trigger(name, data);
        },

        // A shortcut to app's `eventNamespace()`
        eventNamespace: function eventNamespace() {
            return this.app.eventNamespace();
        },

        // A shortcut to app's `swap()`
        swap: function swap(contents, callback) {
            return this.app.swap(contents, callback);
        },

        // Raises a possible `notFound()` error for the current path.
        notFound: function notFound() {
            return this.app.notFound(this.verb, this.path);
        },

        // Default JSON parsing uses jQuery's `parseJSON()`. Include `Sammy.JSON`
        // plugin for the more conformant "crockford special".
        json: function json(string) {
            return $.parseJSON(string);
        },

        // //=> Sammy.EventContext: get #/ {}
        toString: function toString() {
            return "Sammy.EventContext: " + [this.verb, this.path, this.params].join(' ');
        }

    });

    return _Sammy;
});
'use strict';

jw.Utils = function () {
    var _main = $('.main');

    var jsSrcHash = {
        // src: id
        'https://platform.twitter.com/widgets.js': false,
        '/js/plugins/jquery.cycle.lite.js': false,
        '/js/plugins/jquery.listCarousel.js': false,
        '/js/plugins/jquery.star_bg.js': false,
        '/js/stars.js': false,
        '/js/ballPit.js': false,
        '/js/bouncingObj.js': false
    };

    return {
        require: function require(src, callback) {
            // callback(cached)
            if (!jsSrcHash[src]) {
                $.ajax({
                    url: src,
                    dataType: 'script',
                    success: function success(data) {
                        jsSrcHash[src] = true;
                        callback(false);
                    }
                });
            } else {
                callback(true);
            }
        },

        getYear: function getYear() {
            return new Date().getFullYear();
        },

        resetModel: function resetModel() {
            _main.empty();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = jw.listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var listener = _step.value;

                    listener.off();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            jw.listeners = [];

            if (jw.Routing.lastPg === "ballPit") {
                jw.BallPit.deInit();
            } else if (jw.Routing.lastPg === "stars") {
                jw.StarryBg.deInit();
            } else if (jw.Routing.lastPg === "bObj") {
                jw.Bounce.deInit();
            }

            jw.body.removeClass();
            document.title = '';
            $("meta[name=description], meta[name=keywords], meta[name=robots]").remove();

            // if page not playground inner
            var h = window.location.hash;
            if (typeof h === "undefined" || h.indexOf("#playground") !== 0) {
                // startsWith
                var pNav = $(".dPlaygroundNav");

                if (pNav.is(":visible")) {
                    pNav.slideUp();
                }
            }
        }
    };
}();
'use strict';

jw.AboutModel = function () {
    return {
        render: function render(that) {
            jw.Utils.resetModel();

            that.load('/about.html', function () {

                document.getElementById('dateYear').textContent = jw.Utils.getYear();
            }).swap();

            document.title = 'About';
            jw.body.addClass('about');
        }
    };
}();
'use strict';

jw.ContactModel = function () {
    return {
        render: function render(that) {
            jw.Utils.resetModel();

            that.load('/contact.html').swap();

            document.title = 'Contact Me';
            jw.body.addClass('contact');
        }
    };
}();
'use strict';

jw.GamesModel = function () {
	return {
		render: function render(that, page) {
			jw.Utils.resetModel();

			if (page === 'index') {
				that.load('/games/index.html', function (data) {
					jw.Utils.require('/js/plugins/jquery.listCarousel.js', function () {
						$('ul').listCarousel();
					});
				}).swap(function () {
					setTimeout(function () {
						jw.Main.fixColRHeight($('#divDefault').height());
					}, 10);
				});

				document.title = 'Games';
				jw.body.addClass('absHover games');
			}
		}
	};
}();
'use strict';

jw.HomeModel = function () {

    return {
        render: function render(that) {
            jw.Utils.resetModel();

            that.load('/home.html', function (data) {
                jw.Utils.require('https://platform.twitter.com/widgets.js', function (alreadyCreated) {
                    //if(!alreadyCreated){
                    twttr.widgets.load();
                    //}
                });
            }).swap();

            document.title = 'Jon Wiedmann';
            jw.head.append('<meta\n                                name="description"\n                                content="Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability.\n                                    This site has information regarding my work experience and hobbies."\n                            >\n                           <meta name="keywords" content="Jon Wiedmann, Web Developer, PHP, HTML5, CSS, jQuery, Javascript, sammy.js">');
            jw.body.addClass('home');
        }
    };
}();
'use strict';

jw.MusicModel = function () {
    var year = jw.Utils.getYear();

    return {
        render: function render(that, page) {
            jw.Utils.resetModel();

            switch (page) {
                case 'index':
                    that.load('/music/index.html', function (data) {
                        $('.teaching').text(year - 2008);
                        $('.playing').text(year - 1994);
                    }).swap();

                    document.title = 'Music';
                    jw.body.addClass('music musicHome');
                    break;
                case 'bass':
                    that.load('/music/bass.html', function (data) {
                        $('.playing').text(year - 2009);
                    }).swap();

                    document.title = 'Bass | Music';
                    jw.body.addClass('music bass');
                    break;
                case 'chiptunes':
                    that.load('/music/chiptunes.html', function (data) {}).swap();

                    document.title = 'Chiptunes | Music';
                    jw.body.addClass('music');
                    break;
                case 'guitar':
                    that.load('/music/guitar.html', function (data) {
                        $('.playing').text(year - 2002);
                    }).swap();

                    document.title = 'Guitar | Music';
                    jw.body.addClass('music');
                    break;
                case 'mandolin':
                    that.load('/music/mandolin.html', function (data) {
                        $('.playing').text(year - 2008);
                    }).swap();

                    document.title = 'Mandolin | Music';
                    jw.body.addClass('music mandolin');
                    break;
                case 'piano':
                    that.load('/music/piano.html', function (data) {
                        $('.playing').text(year - 1994);
                    }).swap();

                    document.title = 'Piano | Music';
                    jw.body.addClass('music');
                    break;
                case 'trumpet':
                    that.load('/music/trumpet.html', function (data) {
                        $('.playing').text(year - 1998);
                    }).swap();

                    document.title = 'Trumpet | Music';
                    jw.body.addClass('music trumpet');
                    break;
                case 'rates':
                    that.load('/music/rates.html', function (data) {}).swap();

                    document.title = 'Rates | Music';
                    jw.head.append('<meta name="description" content="Music Lesson Rates">\n                                   <meta name="robots" rel="none">');
                    jw.body.addClass('music rates');
                    break;
                case 'voice':
                    that.load('/music/voice.html', function (data) {
                        $('.playing').text(year - 2009);
                    }).swap();

                    document.title = 'Voice | Music';
                    jw.body.addClass('music');
                    break;
            }
        }
    };
}();
'use strict';

jw.PlaygroundModel = function () {

    return {
        render: function render(that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/playground/index.html", function (data) {}).swap();

                document.title = "Playground";
                jw.head.append("<meta name='description' content='An playground area for web tech demos.' />" + "<meta name='keywords' content='canvas, html5' />");
                jw.body.addClass("playground playInner");
            } else if (page === "ballPit") {
                that.load("/playground/ballPit.html", function (data) {
                    jw.Utils.require("/js/ballPit.js", function () {
                        jw.BallPit.init();
                    });
                }).swap();

                document.title = "Ball Pit | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' />" + "<meta name='keywords' content='canvas, html5' />");
                jw.body.addClass("playground playInner nav3");
            } else if (page === "stars") {
                that.load("/playground/stars.html", function (data) {
                    // TODO: load these async
                    jw.Utils.require("/js/plugins/jquery.star_bg.js", function () {
                        jw.Utils.require("/js/stars.js", function (cached) {
                            jw.StarryBg.init();
                        });
                    });
                }).swap();

                document.title = "Starry Background | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a starry background.' />" + "<meta name='keywords' content='canvas, html5' />");
                jw.body.addClass("playground playInner nav2");
            } else if (page === "bObj") {
                that.load("/playground/bouncing-object.html", function (data) {
                    jw.Utils.require("/js/bouncingObj.js", function () {
                        jw.Bounce.init();
                    });
                }).swap();

                document.title = "Bouncing Object | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a bouncing object.' />" + "<meta name='keywords' content='canvas, html5' />");
                jw.body.addClass("playground playInner nav5");
            } else if (page === "bCube") {
                that.load("/playground/breakdancing-cube.html", function (data) {
                    $("#cube").on("click", function (e) {
                        e.preventDefault();
                    });
                }).swap();

                document.title = "Breakdancing Cube | Playground";
                jw.head.append("<meta name='description' content='Pure CSS3 animation demo.' />" + "<meta name='keywords' content='CSS3, HTML5' />");
                jw.body.addClass("playground playInner bDancingCube nav1");
            }

            var pNav = $(".dPlaygroundNav");
            if (!pNav.is(":visible")) {
                pNav.slideDown();
            }
        }
    };
}();
'use strict';

jw.PortfolioModel = function () {
	return {
		render: function render(that, page) {
			jw.Utils.resetModel();

			if (page === 'index') {
				that.load('/portfolio/index.html', function (data) {
					jw.Utils.require('/js/plugins/jquery.listCarousel.js', function () {
						$('ul').listCarousel();
					});
				}).swap();

				document.title = 'Portfolio';
				jw.body.addClass('portfolio absHover');
			}
		}
	};
}();
'use strict';

jw.Routing = function () {
	var app = $.sammy('.main', function () {
		// Home
		this.route('get', '/', function () {
			jw.HomeModel.render(this);
			jw.Routing.lastPg = 'home';
		});

		this.route('get', '#home', function () {
			jw.HomeModel.render(this);
			jw.Routing.lastPg = 'home';
		});

		// About
		this.route('get', '#about', function () {
			jw.AboutModel.render(this);
			jw.Routing.lastPg = 'about';
		});

		// Contact
		this.route('get', '#contact', function () {
			jw.ContactModel.render(this);
			jw.Routing.lastPg = 'contact';
		});

		//// Favorites
		//this.route('get', '#favorites', function() {
		//    jw.FavoritesModel.render(this);
		//    jw.Routing.lastPg = 'favorites';
		//});

		//// Blog
		//this.route('get', '#blog', function() {
		//    jw.BlogModel.render(this);
		//    jw.Routing.lastPg = 'blog';
		//});

		// Games
		this.route('get', '#games', function () {
			jw.GamesModel.render(this, 'index');
			jw.Routing.lastPg = 'games/index';
		});

		// Music
		this.route('get', '#music', function () {
			jw.MusicModel.render(this, 'index');
			jw.Routing.lastPg = 'music/index';
		});

		this.route('get', '#music/bass', function () {
			jw.MusicModel.render(this, 'bass');
			jw.Routing.lastPg = 'music/bass';
		});

		this.route('get', '#music/chiptunes', function () {
			jw.MusicModel.render(this, 'chiptunes');
			jw.Routing.lastPg = 'music/chiptunes';
		});

		this.route('get', '#music/guitar', function () {
			jw.MusicModel.render(this, 'guitar');
			jw.Routing.lastPg = 'music/guitar';
		});

		this.route('get', '#music/mandolin', function () {
			jw.MusicModel.render(this, 'mandolin');
			jw.Routing.lastPg = 'music/mandolin';
		});

		this.route('get', '#music/piano', function () {
			jw.MusicModel.render(this, 'piano');
			jw.Routing.lastPg = 'music/piano';
		});

		this.route('get', '#music/trumpet', function () {
			jw.MusicModel.render(this, 'trumpet');
			jw.Routing.lastPg = 'music/trumpet';
		});

		this.route('get', '#music/rates', function () {
			jw.MusicModel.render(this, 'rates');
			jw.Routing.lastPg = 'music/rates';
		});

		this.route('get', '#music/voice', function () {
			jw.MusicModel.render(this, 'voice');
			jw.Routing.lastPg = 'music/voice';
		});

		// Playground
		this.route('get', '#playground', function () {
			jw.PlaygroundModel.render(this, 'index');
			jw.Routing.lastPg = 'playground/index';
		});

		this.route('get', '#playground/ballPit', function () {
			jw.PlaygroundModel.render(this, 'ballPit');
			jw.Routing.lastPg = 'ballPit';
		});

		this.route('get', '#playground/breakdancing-cube', function () {
			jw.PlaygroundModel.render(this, 'bCube');
			jw.Routing.lastPg = 'bCube';
		});

		this.route('get', '#playground/bouncing-object', function () {
			jw.PlaygroundModel.render(this, 'bObj');
			jw.Routing.lastPg = 'bObj';
		});

		this.route('get', '#playground/starry-background', function () {
			jw.PlaygroundModel.render(this, 'stars');
			jw.Routing.lastPg = 'stars';
		});

		// Portfolio
		this.route('get', '#portfolio', function () {
			jw.PortfolioModel.render(this, 'index');
			jw.Routing.lastPg = 'portfolio/index';
		});
	});

	return {
		lastPg: null,

		init: function init() {
			app.run();
		}
	};
}();
'use strict';
/*
 * Main
 */

jw.Main = function () {
	return {
		init: function init() {
			jw.head = $('head');
			jw.body = $('body');
			jw.listeners = [];

			jw.Routing.init();

			$(window).on('resize', function () {
				var h = $('.colR > div:visible').height();
				jw.Main.fixColRHeight(h);
			});

			$('header a').on('click', function () {
				return $('.main').height('auto');
			});

			var listener = void 0,
			    hasClass = false;
			function hide() {
				$('aside').removeClass('active');
				hasClass = false;
				listener.off();
			}

			$('.menu').on('click', function (e) {
				e.preventDefault();

				if (!hasClass) {
					$('aside').addClass('active');
					hasClass = true;

					setTimeout(function () {
						listener = $('body').on('click', hide);
					}, 0);
				} else {
					hide();
				}
			});
		},

		// 158: padding + footer height
		fixColRHeight: function fixColRHeight(h) {
			if (window.innerWidth <= 800) {
				$('.main').height('auto');
			} else if (window.innerWidth <= 1265) {
				$('.main').height($('.colL').height() + h + 158);
			} else {
				if ($('.colL').height() > h) {
					$('.main').height($('.colL').height());
				} else {
					$('.main').height(h + 158);
				}
			}
		}
	};
}();

$(function () {
	return jw.Main.init();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbW15LmpzIiwidXRpbHMuanMiLCJhYm91dC5qcyIsImNvbnRhY3QuanMiLCJnYW1lcy5qcyIsImhvbWUuanMiLCJtdXNpYy5qcyIsInBsYXlncm91bmQuanMiLCJwb3J0Zm9saW8uanMiLCJyb3V0aW5nLmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxDQUFDLFVBQVMsT0FBVCxFQUFrQjs7QUFFZixRQUFHLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQVAsRUFBWTs7QUFFM0MsZUFBTyxDQUFDLFFBQUQsQ0FBUCxFQUFtQixPQUFuQixFQUYyQztLQUEvQyxNQUdPOztBQUVILGVBQU8sS0FBUCxHQUFlLE9BQU8sS0FBUCxHQUFlLFFBQVEsTUFBUixDQUFmLENBRlo7S0FIUDtDQUZILENBQUQsQ0FTRyxVQUFTLENBQVQsRUFBWTs7QUFFWCxRQUFJLE1BQUo7UUFDSSxnQkFBZ0IsVUFBaEI7UUFDQSxvQkFBb0IsYUFBcEI7UUFDQSx1QkFBdUIsYUFBdkI7OztBQUVBLGlCQUFhLFNBQWIsVUFBYSxDQUFTLFFBQVQsRUFBbUI7QUFBRSxlQUFPLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixRQUEzQixDQUFQLENBQUY7S0FBbkI7OztBQUViLGtCQUFjLFNBQWQsV0FBYyxDQUFTLEdBQVQsRUFBYztBQUFFLGVBQU8sT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLEdBQS9CLE1BQXdDLG1CQUF4QyxDQUFUO0tBQWQ7UUFDZCxXQUFXLFNBQVgsUUFBVyxDQUFTLEdBQVQsRUFBYztBQUFFLGVBQU8sT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLEdBQS9CLE1BQXdDLGdCQUF4QyxDQUFUO0tBQWQ7UUFDWCxZQUFZLFNBQVosU0FBWSxDQUFTLEdBQVQsRUFBYztBQUFFLGVBQU8sT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBC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OlsiLy8gbmFtZTogc2FtbXlcbi8vIHZlcnNpb246IDAuNy42XG5cbi8vIFNhbW15LmpzIC8gaHR0cDovL3NhbW15anMub3JnXG5cbihmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgLy8gU3VwcG9ydCBtb2R1bGUgbG9hZGluZyBzY2VuYXJpb3NcbiAgICBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1EIEFub255bW91cyBNb2R1bGVcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vIG1vZHVsZSBsb2FkZXIgKHBsYWluIDxzY3JpcHQ+IHRhZykgLSBwdXQgZGlyZWN0bHkgaW4gZ2xvYmFsIG5hbWVzcGFjZVxuICAgICAgICBqUXVlcnkuc2FtbXkgPSB3aW5kb3cuU2FtbXkgPSBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufSkoZnVuY3Rpb24oJCkge1xuXG4gICAgdmFyIFNhbW15LFxuICAgICAgICBQQVRIX1JFUExBQ0VSID0gXCIoW15cXC9dKylcIixcbiAgICAgICAgUEFUSF9OQU1FX01BVENIRVIgPSAvOihbXFx3XFxkXSspL2csXG4gICAgICAgIFFVRVJZX1NUUklOR19NQVRDSEVSID0gL1xcPyhbXiNdKik/JC8sXG4gICAgICAgIC8vIG1haW5seSBmb3IgbWFraW5nIGBhcmd1bWVudHNgIGFuIEFycmF5XG4gICAgICAgIF9tYWtlQXJyYXkgPSBmdW5jdGlvbihub25hcnJheSkgeyByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9uYXJyYXkpOyB9LFxuICAgICAgICAvLyBib3Jyb3dlZCBmcm9tIGpRdWVyeVxuICAgICAgICBfaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIjsgfSxcbiAgICAgICAgX2lzQXJyYXkgPSBmdW5jdGlvbihvYmopIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCI7IH0sXG4gICAgICAgIF9pc1JlZ0V4cCA9IGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBSZWdFeHBdXCI7IH0sXG4gICAgICAgIF9kZWNvZGUgPSBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCgoc3RyIHx8ICcnKS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7IH0sXG4gICAgICAgIF9lbmNvZGUgPSBlbmNvZGVVUklDb21wb25lbnQsXG4gICAgICAgIF9lc2NhcGVIVE1MID0gZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhzKS5yZXBsYWNlKC8mKD8hXFx3KzspL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICAgICAgICB9LFxuICAgICAgICBfcm91dGVXcmFwcGVyID0gZnVuY3Rpb24odmVyYikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlLmFwcGx5KHRoaXMsIFt2ZXJiXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgX3RlbXBsYXRlX2NhY2hlID0ge30sXG4gICAgICAgIF9oYXNfaGlzdG9yeSA9ICEhKHdpbmRvdy5oaXN0b3J5ICYmIGhpc3RvcnkucHVzaFN0YXRlKSxcbiAgICAgICAgbG9nZ2VycyA9IFtdO1xuXG5cbiAgICAvLyBgU2FtbXlgIChhbHNvIGFsaWFzZWQgYXMgJC5zYW1teSkgaXMgbm90IG9ubHkgdGhlIG5hbWVzcGFjZSBmb3IgYVxuICAgIC8vIG51bWJlciBvZiBwcm90b3R5cGVzLCBpdHMgYWxzbyBhIHRvcCBsZXZlbCBtZXRob2QgdGhhdCBhbGxvd3MgZm9yIGVhc3lcbiAgICAvLyBjcmVhdGlvbi9tYW5hZ2VtZW50IG9mIGBTYW1teS5BcHBsaWNhdGlvbmAgaW5zdGFuY2VzLiBUaGVyZSBhcmUgYVxuICAgIC8vIG51bWJlciBvZiBkaWZmZXJlbnQgZm9ybXMgZm9yIGBTYW1teSgpYCBidXQgZWFjaCByZXR1cm5zIGFuIGluc3RhbmNlXG4gICAgLy8gb2YgYFNhbW15LkFwcGxpY2F0aW9uYC4gV2hlbiBhIG5ldyBpbnN0YW5jZSBpcyBjcmVhdGVkIHVzaW5nXG4gICAgLy8gYFNhbW15YCBpdCBpcyBhZGRlZCB0byBhbiBPYmplY3QgY2FsbGVkIGBTYW1teS5hcHBzYC4gVGhpc1xuICAgIC8vIHByb3ZpZGVzIGZvciBhbiBlYXN5IHdheSB0byBnZXQgYXQgZXhpc3RpbmcgU2FtbXkgYXBwbGljYXRpb25zLiBPbmx5IG9uZVxuICAgIC8vIGluc3RhbmNlIGlzIGFsbG93ZWQgcGVyIGBlbGVtZW50X3NlbGVjdG9yYCBzbyB3aGVuIGNhbGxpbmdcbiAgICAvLyBgU2FtbXkoJ3NlbGVjdG9yJylgIG11bHRpcGxlIHRpbWVzLCB0aGUgZmlyc3QgdGltZSB3aWxsIGNyZWF0ZVxuICAgIC8vIHRoZSBhcHBsaWNhdGlvbiBhbmQgdGhlIGZvbGxvd2luZyB0aW1lcyB3aWxsIGV4dGVuZCB0aGUgYXBwbGljYXRpb25cbiAgICAvLyBhbHJlYWR5IGFkZGVkIHRvIHRoYXQgc2VsZWN0b3IuXG4gICAgLy9cbiAgICAvLyAjIyMgRXhhbXBsZVxuICAgIC8vXG4gICAgLy8gICAgICAvLyByZXR1cm5zIHRoZSBhcHAgYXQgI21haW4gb3IgYSBuZXcgYXBwXG4gICAgLy8gICAgICBTYW1teSgnI21haW4nKVxuICAgIC8vXG4gICAgLy8gICAgICAvLyBlcXVpdmFsZW50IHRvIFwibmV3IFNhbW15LkFwcGxpY2F0aW9uXCIsIGV4Y2VwdCBhcHBlbmRzIHRvIGFwcHNcbiAgICAvLyAgICAgIFNhbW15KCk7XG4gICAgLy8gICAgICBTYW1teShmdW5jdGlvbigpIHsgLi4uIH0pO1xuICAgIC8vXG4gICAgLy8gICAgICAvLyBleHRlbmRzIHRoZSBhcHAgYXQgJyNtYWluJyB3aXRoIGZ1bmN0aW9uLlxuICAgIC8vICAgICAgU2FtbXkoJyNtYWluJywgZnVuY3Rpb24oKSB7IC4uLiB9KTtcbiAgICAvL1xuICAgIFNhbW15ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gX21ha2VBcnJheShhcmd1bWVudHMpLFxuICAgICAgICAgICAgYXBwLCBzZWxlY3RvcjtcbiAgICAgICAgU2FtbXkuYXBwcyA9IFNhbW15LmFwcHMgfHwge307XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09PSAwIHx8IGFyZ3NbMF0gJiYgX2lzRnVuY3Rpb24oYXJnc1swXSkpIHsgLy8gU2FtbXkoKVxuICAgICAgICAgICAgcmV0dXJuIFNhbW15LmFwcGx5KFNhbW15LCBbJ2JvZHknXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9IGVsc2UgaWYodHlwZW9mIChzZWxlY3RvciA9IGFyZ3Muc2hpZnQoKSkgPT0gJ3N0cmluZycpIHsgLy8gU2FtbXkoJyNtYWluJylcbiAgICAgICAgICAgIGFwcCA9IFNhbW15LmFwcHNbc2VsZWN0b3JdIHx8IG5ldyBTYW1teS5BcHBsaWNhdGlvbigpO1xuICAgICAgICAgICAgYXBwLmVsZW1lbnRfc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgIGlmKGFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQuZWFjaChhcmdzLCBmdW5jdGlvbihpLCBwbHVnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLnVzZShwbHVnaW4pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgdGhlIHNlbGVjdG9yIGNoYW5nZXMgbWFrZSBzdXJlIHRoZSByZWZlcmVuY2UgaW4gU2FtbXkuYXBwcyBjaGFuZ2VzXG4gICAgICAgICAgICBpZihhcHAuZWxlbWVudF9zZWxlY3RvciAhPSBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBTYW1teS5hcHBzW3NlbGVjdG9yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFNhbW15LmFwcHNbYXBwLmVsZW1lbnRfc2VsZWN0b3JdID0gYXBwO1xuICAgICAgICAgICAgcmV0dXJuIGFwcDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBTYW1teS5WRVJTSU9OID0gJzAuNy42JztcblxuICAgIC8vIEFkZCB0byB0aGUgZ2xvYmFsIGxvZ2dlciBwb29sLiBUYWtlcyBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBhblxuICAgIC8vIHVua25vd24gbnVtYmVyIG9mIGFyZ3VtZW50cyBhbmQgc2hvdWxkIHByaW50IHRoZW0gb3Igc2VuZCB0aGVtIHNvbWV3aGVyZVxuICAgIC8vIFRoZSBmaXJzdCBhcmd1bWVudCBpcyBhbHdheXMgYSB0aW1lc3RhbXAuXG4gICAgU2FtbXkuYWRkTG9nZ2VyID0gZnVuY3Rpb24obG9nZ2VyKSB7XG4gICAgICAgIGxvZ2dlcnMucHVzaChsb2dnZXIpO1xuICAgIH07XG5cbiAgICAvLyBTZW5kcyBhIGxvZyBtZXNzYWdlIHRvIGVhY2ggbG9nZ2VyIGxpc3RlZCBpbiB0aGUgZ2xvYmFsXG4gICAgLy8gbG9nZ2VycyBwb29sLiBDYW4gdGFrZSBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAvLyBBbHNvIHByZWZpeGVzIHRoZSBhcmd1bWVudHMgd2l0aCBhIHRpbWVzdGFtcC5cbiAgICBTYW1teS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBfbWFrZUFycmF5KGFyZ3VtZW50cyk7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIltcIiArIERhdGUoKSArIFwiXVwiKTtcbiAgICAgICAgJC5lYWNoKGxvZ2dlcnMsIGZ1bmN0aW9uKGksIGxvZ2dlcikge1xuICAgICAgICAgICAgbG9nZ2VyLmFwcGx5KFNhbW15LCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmKHR5cGVvZiB3aW5kb3cuY29uc29sZSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZih0eXBlb2Ygd2luZG93LmNvbnNvbGUubG9nID09PSAnZnVuY3Rpb24nICYmIF9pc0Z1bmN0aW9uKHdpbmRvdy5jb25zb2xlLmxvZy5hcHBseSkpIHtcbiAgICAgICAgICAgIFNhbW15LmFkZExvZ2dlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2cuYXBwbHkod2luZG93LmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFNhbW15LmFkZExvZ2dlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKHR5cGVvZiBjb25zb2xlICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFNhbW15LmFkZExvZ2dlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQuZXh0ZW5kKFNhbW15LCB7XG4gICAgICAgIG1ha2VBcnJheTogX21ha2VBcnJheSxcbiAgICAgICAgaXNGdW5jdGlvbjogX2lzRnVuY3Rpb24sXG4gICAgICAgIGlzQXJyYXk6IF9pc0FycmF5XG4gICAgfSk7XG5cbiAgICAvLyBTYW1teS5PYmplY3QgaXMgdGhlIGJhc2UgZm9yIGFsbCBvdGhlciBTYW1teSBjbGFzc2VzLiBJdCBwcm92aWRlcyBzb21lIHVzZWZ1bFxuICAgIC8vIGZ1bmN0aW9uYWxpdHksIGluY2x1ZGluZyBjbG9uaW5nLCBpdGVyYXRpbmcsIGV0Yy5cbiAgICBTYW1teS5PYmplY3QgPSBmdW5jdGlvbihvYmopIHsgLy8gY29uc3RydWN0b3JcbiAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRoaXMsIG9iaiB8fCB7fSk7XG4gICAgfTtcblxuICAgICQuZXh0ZW5kKFNhbW15Lk9iamVjdC5wcm90b3R5cGUsIHtcblxuICAgICAgICAvLyBFc2NhcGUgSFRNTCBpbiBzdHJpbmcsIHVzZSBpbiB0ZW1wbGF0ZXMgdG8gcHJldmVudCBzY3JpcHQgaW5qZWN0aW9uLlxuICAgICAgICAvLyBBbHNvIGFsaWFzZWQgYXMgYGgoKWBcbiAgICAgICAgZXNjYXBlSFRNTDogX2VzY2FwZUhUTUwsXG4gICAgICAgIGg6IF9lc2NhcGVIVE1MLFxuXG4gICAgICAgIC8vIFJldHVybnMgYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aCBGdW5jdGlvbnMgcmVtb3ZlZC5cbiAgICAgICAgdG9IYXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBqc29uID0ge307XG4gICAgICAgICAgICAkLmVhY2godGhpcywgZnVuY3Rpb24oaywgdikge1xuICAgICAgICAgICAgICAgIGlmKCFfaXNGdW5jdGlvbih2KSkge1xuICAgICAgICAgICAgICAgICAgICBqc29uW2tdID0gdjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJlbmRlcnMgYSBzaW1wbGUgSFRNTCB2ZXJzaW9uIG9mIHRoaXMgT2JqZWN0cyBhdHRyaWJ1dGVzLlxuICAgICAgICAvLyBEb2VzIG5vdCByZW5kZXIgZnVuY3Rpb25zLlxuICAgICAgICAvLyBGb3IgZXhhbXBsZS4gR2l2ZW4gdGhpcyBTYW1teS5PYmplY3Q6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB2YXIgcyA9IG5ldyBTYW1teS5PYmplY3Qoe2ZpcnN0X25hbWU6ICdTYW1teScsIGxhc3RfbmFtZTogJ0RhdmlzIEpyLid9KTtcbiAgICAgICAgLy8gICAgIHMudG9IVE1MKClcbiAgICAgICAgLy8gICAgIC8vPT4gJzxzdHJvbmc+Zmlyc3RfbmFtZTwvc3Ryb25nPiBTYW1teTxiciAvPjxzdHJvbmc+bGFzdF9uYW1lPC9zdHJvbmc+IERhdmlzIEpyLjxiciAvPidcbiAgICAgICAgLy9cbiAgICAgICAgdG9IVE1MOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLCBmdW5jdGlvbihrLCB2KSB7XG4gICAgICAgICAgICAgICAgaWYoIV9pc0Z1bmN0aW9uKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgKz0gXCI8c3Ryb25nPlwiICsgayArIFwiPC9zdHJvbmc+IFwiICsgdiArIFwiPGJyIC8+XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGlzcGxheTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIGtleXMgZm9yIHRoaXMgb2JqZWN0LiBJZiBgYXR0cmlidXRlc19vbmx5YFxuICAgICAgICAvLyBpcyB0cnVlIHdpbGwgbm90IHJldHVybiBrZXlzIHRoYXQgbWFwIHRvIGEgYGZ1bmN0aW9uKClgXG4gICAgICAgIGtleXM6IGZ1bmN0aW9uKGF0dHJpYnV0ZXNfb25seSkge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgICAgICAgIGZvcih2YXIgcHJvcGVydHkgaW4gdGhpcykge1xuICAgICAgICAgICAgICAgIGlmKCFfaXNGdW5jdGlvbih0aGlzW3Byb3BlcnR5XSkgfHwgIWF0dHJpYnV0ZXNfb25seSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2gocHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENoZWNrcyBpZiB0aGUgb2JqZWN0IGhhcyBhIHZhbHVlIGF0IGBrZXlgIGFuZCB0aGF0IHRoZSB2YWx1ZSBpcyBub3QgZW1wdHlcbiAgICAgICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW2tleV0gJiYgJC50cmltKHRoaXNba2V5XS50b1N0cmluZygpKSAhPT0gJyc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gY29udmVuaWVuY2UgbWV0aG9kIHRvIGpvaW4gYXMgbWFueSBhcmd1bWVudHMgYXMgeW91IHdhbnRcbiAgICAgICAgLy8gYnkgdGhlIGZpcnN0IGFyZ3VtZW50IC0gdXNlZnVsIGZvciBtYWtpbmcgcGF0aHNcbiAgICAgICAgam9pbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IF9tYWtlQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHZhciBkZWxpbWl0ZXIgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICByZXR1cm4gYXJncy5qb2luKGRlbGltaXRlcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU2hvcnRjdXQgdG8gU2FtbXkubG9nXG4gICAgICAgIGxvZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBTYW1teS5sb2cuYXBwbHkoU2FtbXksIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG9iamVjdC5cbiAgICAgICAgLy8gaWYgYGluY2x1ZGVfZnVuY3Rpb25zYCBpcyB0cnVlLCBpdCB3aWxsIGFsc28gdG9TdHJpbmcoKSB0aGVcbiAgICAgICAgLy8gbWV0aG9kcyBvZiB0aGlzIG9iamVjdC4gQnkgZGVmYXVsdCBvbmx5IHByaW50cyB0aGUgYXR0cmlidXRlcy5cbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKGluY2x1ZGVfZnVuY3Rpb25zKSB7XG4gICAgICAgICAgICB2YXIgcyA9IFtdO1xuICAgICAgICAgICAgJC5lYWNoKHRoaXMsIGZ1bmN0aW9uKGssIHYpIHtcbiAgICAgICAgICAgICAgICBpZighX2lzRnVuY3Rpb24odikgfHwgaW5jbHVkZV9mdW5jdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5wdXNoKCdcIicgKyBrICsgJ1wiOiAnICsgdi50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBcIlNhbW15Lk9iamVjdDoge1wiICsgcy5qb2luKCcsJykgKyBcIn1cIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyBSZXR1cm4gd2hldGhlciB0aGUgZXZlbnQgdGFyZ2V0cyB0aGlzIHdpbmRvdy5cbiAgICBTYW1teS50YXJnZXRJc1RoaXNXaW5kb3cgPSBmdW5jdGlvbiB0YXJnZXRJc1RoaXNXaW5kb3coZXZlbnQsIHRhZ05hbWUpIHtcbiAgICAgICAgdmFyIHRhcmdldEVsZW1lbnQgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCh0YWdOYW1lKTtcbiAgICAgICAgaWYodGFyZ2V0RWxlbWVudC5sZW5ndGggPT09IDApIHsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgICB2YXIgdGFyZ2V0V2luZG93ID0gdGFyZ2V0RWxlbWVudC5hdHRyKCd0YXJnZXQnKTtcbiAgICAgICAgaWYoIXRhcmdldFdpbmRvdyB8fCB0YXJnZXRXaW5kb3cgPT09IHdpbmRvdy5uYW1lIHx8IHRhcmdldFdpbmRvdyA9PT0gJ19zZWxmJykgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICBpZih0YXJnZXRXaW5kb3cgPT09ICdfYmxhbmsnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICBpZih0YXJnZXRXaW5kb3cgPT09ICd0b3AnICYmIHdpbmRvdyA9PT0gd2luZG93LnRvcCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuXG4gICAgLy8gVGhlIERlZmF1bHRMb2NhdGlvblByb3h5IGlzIHRoZSBkZWZhdWx0IGxvY2F0aW9uIHByb3h5IGZvciBhbGwgU2FtbXkgYXBwbGljYXRpb25zLlxuICAgIC8vIEEgbG9jYXRpb24gcHJveHkgaXMgYSBwcm90b3R5cGUgdGhhdCBjb25mb3JtcyB0byBhIHNpbXBsZSBpbnRlcmZhY2UuIFRoZSBwdXJwb3NlXG4gICAgLy8gb2YgYSBsb2NhdGlvbiBwcm94eSBpcyB0byBub3RpZnkgdGhlIFNhbW15LkFwcGxpY2F0aW9uIGl0cyBib3VuZCB0byB3aGVuIHRoZSBsb2NhdGlvblxuICAgIC8vIG9yICdleHRlcm5hbCBzdGF0ZScgY2hhbmdlcy5cbiAgICAvL1xuICAgIC8vIFRoZSBgRGVmYXVsdExvY2F0aW9uUHJveHlgIHdhdGNoZXMgZm9yIGNoYW5nZXMgdG8gdGhlIHBhdGggb2YgdGhlIGN1cnJlbnQgd2luZG93IGFuZFxuICAgIC8vIGlzIGFsc28gYWJsZSB0byBzZXQgdGhlIHBhdGggYmFzZWQgb24gY2hhbmdlcyBpbiB0aGUgYXBwbGljYXRpb24uIEl0IGRvZXMgdGhpcyBieVxuICAgIC8vIHVzaW5nIGRpZmZlcmVudCBtZXRob2RzIGRlcGVuZGluZyBvbiB3aGF0IGlzIGF2YWlsYWJsZSBpbiB0aGUgY3VycmVudCBicm93c2VyLiBJblxuICAgIC8vIHRoZSBsYXRlc3QgYW5kIGdyZWF0ZXN0IGJyb3dzZXJzIGl0IHVzZWQgdGhlIEhUTUw1IEhpc3RvcnkgQVBJIGFuZCB0aGUgYHB1c2hTdGF0ZWBcbiAgICAvLyBgcG9wU3RhdGVgIGV2ZW50cy9tZXRob2RzLiBUaGlzIGFsbG93cyB5b3UgdG8gdXNlIFNhbW15IHRvIHNlcnZlIGEgc2l0ZSBiZWhpbmQgbm9ybWFsXG4gICAgLy8gVVJJIHBhdGhzIGFzIG9wcG9zZWQgdG8gdGhlIG9sZGVyIGRlZmF1bHQgb2YgaGFzaCAoIykgYmFzZWQgcm91dGluZy4gQmVjYXVzZSB0aGUgc2VydmVyXG4gICAgLy8gY2FuIGludGVycHJldCB0aGUgY2hhbmdlZCBwYXRoIG9uIGEgcmVmcmVzaCBvciByZS1lbnRyeSwgdGhvdWdoLCBpdCByZXF1aXJlcyBhZGRpdGlvbmFsXG4gICAgLy8gc3VwcG9ydCBvbiB0aGUgc2VydmVyIHNpZGUuIElmIHlvdSdkIGxpa2UgdG8gZm9yY2UgZGlzYWJsZSBIVE1MNSBoaXN0b3J5IHN1cHBvcnQsIHBsZWFzZVxuICAgIC8vIHVzZSB0aGUgYGRpc2FibGVfcHVzaF9zdGF0ZWAgc2V0dGluZyBvbiBgU2FtbXkuQXBwbGljYXRpb25gLiBJZiBwdXNoU3RhdGUgc3VwcG9ydFxuICAgIC8vIGlzIGVuYWJsZWQsIGBEZWZhdWx0TG9jYXRpb25Qcm94eWAgYWxzbyBiaW5kcyB0byBhbGwgbGlua3Mgb24gdGhlIHBhZ2UuIElmIGEgbGluayBpcyBjbGlja2VkXG4gICAgLy8gdGhhdCBtYXRjaGVzIHRoZSBjdXJyZW50IHNldCBvZiByb3V0ZXMsIHRoZSBVUkwgaXMgY2hhbmdlZCB1c2luZyBwdXNoU3RhdGUgaW5zdGVhZCBvZlxuICAgIC8vIGZ1bGx5IHNldHRpbmcgdGhlIGxvY2F0aW9uIGFuZCB0aGUgYXBwIGlzIG5vdGlmaWVkIG9mIHRoZSBjaGFuZ2UuXG4gICAgLy9cbiAgICAvLyBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBoYXZlIHN1cHBvcnQgZm9yIEhUTUw1IEhpc3RvcnksIGBEZWZhdWx0TG9jYXRpb25Qcm94eWAgYXV0b21hdGljYWxseVxuICAgIC8vIGZhbGxzIGJhY2sgdG8gdGhlIG9sZGVyIGhhc2ggYmFzZWQgcm91dGluZy4gVGhlIG5ld2VzdCBicm93c2VycyAoSUUsIFNhZmFyaSA+IDQsIEZGID49IDMuNilcbiAgICAvLyBzdXBwb3J0IGEgJ29uaGFzaGNoYW5nZScgRE9NIGV2ZW50LCB0aGF0cyBmaXJlZCB3aGVuZXZlciB0aGUgbG9jYXRpb24uaGFzaCBjaGFuZ2VzLlxuICAgIC8vIEluIHRoaXMgc2l0dWF0aW9uIHRoZSBEZWZhdWx0TG9jYXRpb25Qcm94eSBqdXN0IGJpbmRzIHRvIHRoaXMgZXZlbnQgYW5kIGRlbGVnYXRlcyBpdCB0b1xuICAgIC8vIHRoZSBhcHBsaWNhdGlvbi4gSW4gdGhlIGNhc2Ugb2Ygb2xkZXIgYnJvd3NlcnMgYSBwb2xsZXIgaXMgc2V0IHVwIHRvIHRyYWNrIGNoYW5nZXMgdG8gdGhlXG4gICAgLy8gaGFzaC5cbiAgICBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eSA9IGZ1bmN0aW9uKGFwcCwgcnVuX2ludGVydmFsX2V2ZXJ5KSB7XG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgICAgICAvLyBzZXQgaXMgbmF0aXZlIHRvIGZhbHNlIGFuZCBzdGFydCB0aGUgcG9sbGVyIGltbWVkaWF0ZWx5XG4gICAgICAgIHRoaXMuaXNfbmF0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFzX2hpc3RvcnkgPSBfaGFzX2hpc3Rvcnk7XG4gICAgICAgIHRoaXMuX3N0YXJ0UG9sbGluZyhydW5faW50ZXJ2YWxfZXZlcnkpO1xuICAgIH07XG5cbiAgICBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5mdWxsUGF0aCA9IGZ1bmN0aW9uKGxvY2F0aW9uX29iaikge1xuICAgICAgICAvLyBCeXBhc3MgdGhlIGB3aW5kb3cubG9jYXRpb24uaGFzaGAgYXR0cmlidXRlLiAgSWYgYSBxdWVzdGlvbiBtYXJrXG4gICAgICAgIC8vIGFwcGVhcnMgaW4gdGhlIGhhc2ggSUU2IHdpbGwgc3RyaXAgaXQgYW5kIGFsbCBvZiB0aGUgZm9sbG93aW5nXG4gICAgICAgIC8vIGNoYXJhY3RlcnMgZnJvbSBgd2luZG93LmxvY2F0aW9uLmhhc2hgLlxuICAgICAgICB2YXIgbWF0Y2hlcyA9IGxvY2F0aW9uX29iai50b1N0cmluZygpLm1hdGNoKC9eW14jXSooIy4rKSQvKTtcbiAgICAgICAgdmFyIGhhc2ggPSBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6ICcnO1xuICAgICAgICByZXR1cm4gW2xvY2F0aW9uX29iai5wYXRobmFtZSwgbG9jYXRpb25fb2JqLnNlYXJjaCwgaGFzaF0uam9pbignJyk7XG4gICAgfTtcbiAgICAkLmV4dGVuZChTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5wcm90b3R5cGUsIHtcbiAgICAgICAgLy8gYmluZCB0aGUgcHJveHkgZXZlbnRzIHRvIHRoZSBjdXJyZW50IGFwcC5cbiAgICAgICAgYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJveHkgPSB0aGlzLCBhcHAgPSB0aGlzLmFwcCwgbHAgPSBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eTtcbiAgICAgICAgICAgICQod2luZG93KS5iaW5kKCdoYXNoY2hhbmdlLicgKyB0aGlzLmFwcC5ldmVudE5hbWVzcGFjZSgpLCBmdW5jdGlvbihlLCBub25fbmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgcmVjZWl2ZSBhIG5hdGl2ZSBoYXNoIGNoYW5nZSBldmVudCwgc2V0IHRoZSBwcm94eSBhY2NvcmRpbmdseVxuICAgICAgICAgICAgICAgIC8vIGFuZCBzdG9wIHBvbGxpbmdcbiAgICAgICAgICAgICAgICBpZihwcm94eS5pc19uYXRpdmUgPT09IGZhbHNlICYmICFub25fbmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3h5LmlzX25hdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGxwLl9pbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGxwLl9pbnRlcnZhbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFwcC50cmlnZ2VyKCdsb2NhdGlvbi1jaGFuZ2VkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmKF9oYXNfaGlzdG9yeSAmJiAhYXBwLmRpc2FibGVfcHVzaF9zdGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIGJpbmQgdG8gcG9wc3RhdGVcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykuYmluZCgncG9wc3RhdGUuJyArIHRoaXMuYXBwLmV2ZW50TmFtZXNwYWNlKCksIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLnRyaWdnZXIoJ2xvY2F0aW9uLWNoYW5nZWQnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRvIGxpbmsgY2xpY2tzIHRoYXQgaGF2ZSByb3V0ZXNcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5kZWxlZ2F0ZSgnYScsICdjbGljay5oaXN0b3J5LScgKyB0aGlzLmFwcC5ldmVudE5hbWVzcGFjZSgpLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGUuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBmdWxsX3BhdGggPSBscC5mdWxsUGF0aCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgYW5jaG9yJ3MgaG9zdCBuYW1lIGluIGEgY3Jvc3MgYnJvd3NlciBjb21wYXRpYmxlIHdheS5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBJRSBsb29zZXMgaG9zdG5hbWUgcHJvcGVydHkgd2hlbiBzZXR0aW5nIGhyZWYgaW4gSlNcbiAgICAgICAgICAgICAgICAgICAgICAvLyB3aXRoIGEgcmVsYXRpdmUgVVJMLCBlLmcuIGEuc2V0QXR0cmlidXRlKCdocmVmJyxcIi93aGF0ZXZlclwiKS5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBDaXJjdW12ZW50IHRoaXMgcHJvYmxlbSBieSBjcmVhdGluZyBhIG5ldyBsaW5rIHdpdGggZ2l2ZW4gVVJMIGFuZFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHF1ZXJ5aW5nIHRoYXQgZm9yIGEgaG9zdG5hbWUuXG4gICAgICAgICAgICAgICAgICAgICAgaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lID8gdGhpcy5ob3N0bmFtZSA6IGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbC5ocmVmID0gYS5ocmVmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbC5ob3N0bmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICB9KHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGhvc3RuYW1lID09IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwLmxvb2t1cFJvdXRlKCdnZXQnLCBmdWxsX3BhdGgpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBTYW1teS50YXJnZXRJc1RoaXNXaW5kb3coZSwgJ2EnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJveHkuc2V0TG9jYXRpb24oZnVsbF9wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIWxwLl9iaW5kaW5ncykge1xuICAgICAgICAgICAgICAgIGxwLl9iaW5kaW5ncyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBscC5fYmluZGluZ3MrKztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyB1bmJpbmQgdGhlIHByb3h5IGV2ZW50cyBmcm9tIHRoZSBjdXJyZW50IGFwcFxuICAgICAgICB1bmJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh3aW5kb3cpLnVuYmluZCgnaGFzaGNoYW5nZS4nICsgdGhpcy5hcHAuZXZlbnROYW1lc3BhY2UoKSk7XG4gICAgICAgICAgICAkKHdpbmRvdykudW5iaW5kKCdwb3BzdGF0ZS4nICsgdGhpcy5hcHAuZXZlbnROYW1lc3BhY2UoKSk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS51bmRlbGVnYXRlKCdhJywgJ2NsaWNrLmhpc3RvcnktJyArIHRoaXMuYXBwLmV2ZW50TmFtZXNwYWNlKCkpO1xuICAgICAgICAgICAgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkuX2JpbmRpbmdzLS07XG4gICAgICAgICAgICBpZihTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5fYmluZGluZ3MgPD0gMCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5Ll9pbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkuX2ludGVydmFsID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgbG9jYXRpb24gZnJvbSB0aGUgaGFzaC5cbiAgICAgICAgZ2V0TG9jYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5LmZ1bGxQYXRoKHdpbmRvdy5sb2NhdGlvbik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gc2V0IHRoZSBjdXJyZW50IGxvY2F0aW9uIHRvIGBuZXdfbG9jYXRpb25gXG4gICAgICAgIHNldExvY2F0aW9uOiBmdW5jdGlvbihuZXdfbG9jYXRpb24pIHtcbiAgICAgICAgICAgIGlmKC9eKFteI1xcL118JCkvLnRlc3QobmV3X2xvY2F0aW9uKSkgeyAvLyBub24tcHJlZml4ZWQgdXJsXG4gICAgICAgICAgICAgICAgaWYoX2hhc19oaXN0b3J5ICYmICF0aGlzLmFwcC5kaXNhYmxlX3B1c2hfc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2xvY2F0aW9uID0gJy8nICsgbmV3X2xvY2F0aW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld19sb2NhdGlvbiA9ICcjIS8nICsgbmV3X2xvY2F0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG5ld19sb2NhdGlvbiAhPSB0aGlzLmdldExvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBIVE1MNSBIaXN0b3J5IGV4aXN0cyBhbmQgbmV3X2xvY2F0aW9uIGlzIGEgZnVsbCBwYXRoXG4gICAgICAgICAgICAgICAgaWYoX2hhc19oaXN0b3J5ICYmICF0aGlzLmFwcC5kaXNhYmxlX3B1c2hfc3RhdGUgJiYgL15cXC8vLnRlc3QobmV3X2xvY2F0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IHBhdGg6IG5ld19sb2NhdGlvbiB9LCB3aW5kb3cudGl0bGUsIG5ld19sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwLnRyaWdnZXIoJ2xvY2F0aW9uLWNoYW5nZWQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5sb2NhdGlvbiA9IG5ld19sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9zdGFydFBvbGxpbmc6IGZ1bmN0aW9uKGV2ZXJ5KSB7XG4gICAgICAgICAgICAvLyBzZXQgdXAgaW50ZXJ2YWxcbiAgICAgICAgICAgIHZhciBwcm94eSA9IHRoaXM7XG4gICAgICAgICAgICBpZighU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkuX2ludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgaWYoIWV2ZXJ5KSB7IGV2ZXJ5ID0gMTA7IH1cbiAgICAgICAgICAgICAgICB2YXIgaGFzaENoZWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50X2xvY2F0aW9uID0gcHJveHkuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5Ll9sYXN0X2xvY2F0aW9uID09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9sb2NhdGlvbiAhPSBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5fbGFzdF9sb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ2hhc2hjaGFuZ2UnLCBbdHJ1ZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkuX2xhc3RfbG9jYXRpb24gPSBjdXJyZW50X2xvY2F0aW9uO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaGFzaENoZWNrKCk7XG4gICAgICAgICAgICAgICAgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkuX2ludGVydmFsID0gd2luZG93LnNldEludGVydmFsKGhhc2hDaGVjaywgZXZlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vIFNhbW15LkFwcGxpY2F0aW9uIGlzIHRoZSBCYXNlIHByb3RvdHlwZSBmb3IgZGVmaW5pbmcgJ2FwcGxpY2F0aW9ucycuXG4gICAgLy8gQW4gJ2FwcGxpY2F0aW9uJyBpcyBhIGNvbGxlY3Rpb24gb2YgJ3JvdXRlcycgYW5kIGJvdW5kIGV2ZW50cyB0aGF0IGlzXG4gICAgLy8gYXR0YWNoZWQgdG8gYW4gZWxlbWVudCB3aGVuIGBydW4oKWAgaXMgY2FsbGVkLlxuICAgIC8vIFRoZSBvbmx5IGFyZ3VtZW50IGFuICdhcHBfZnVuY3Rpb24nIGlzIGV2YWx1YXRlZCB3aXRoaW4gdGhlIGNvbnRleHQgb2YgdGhlIGFwcGxpY2F0aW9uLlxuICAgIFNhbW15LkFwcGxpY2F0aW9uID0gZnVuY3Rpb24oYXBwX2Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBhcHAgPSB0aGlzO1xuICAgICAgICB0aGlzLnJvdXRlcyA9IHt9O1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBTYW1teS5PYmplY3Qoe30pO1xuICAgICAgICB0aGlzLmFyb3VuZHMgPSBbXTtcbiAgICAgICAgdGhpcy5iZWZvcmVzID0gW107XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgdW5pcXVlIG5hbWVzcGFjZVxuICAgICAgICB0aGlzLm5hbWVzcGFjZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgKyAnLScgKyBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTAwMCwgMTApO1xuICAgICAgICB0aGlzLmNvbnRleHRfcHJvdG90eXBlID0gZnVuY3Rpb24oKSB7IFNhbW15LkV2ZW50Q29udGV4dC5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9O1xuICAgICAgICB0aGlzLmNvbnRleHRfcHJvdG90eXBlLnByb3RvdHlwZSA9IG5ldyBTYW1teS5FdmVudENvbnRleHQoKTtcblxuICAgICAgICBpZihfaXNGdW5jdGlvbihhcHBfZnVuY3Rpb24pKSB7XG4gICAgICAgICAgICBhcHBfZnVuY3Rpb24uYXBwbHkodGhpcywgW3RoaXNdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdGhlIGxvY2F0aW9uIHByb3h5IGlmIG5vdCBkZWZpbmVkIHRvIHRoZSBkZWZhdWx0IChEZWZhdWx0TG9jYXRpb25Qcm94eSlcbiAgICAgICAgaWYoIXRoaXMuX2xvY2F0aW9uX3Byb3h5KSB7XG4gICAgICAgICAgICB0aGlzLnNldExvY2F0aW9uUHJveHkobmV3IFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5KHRoaXMsIHRoaXMucnVuX2ludGVydmFsX2V2ZXJ5KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy5iaW5kVG9BbGxFdmVudHMoZnVuY3Rpb24oZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGFwcC5sb2coYXBwLnRvU3RyaW5nKCksIGUuY2xlYW5lZF90eXBlLCBkYXRhIHx8IHt9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNhbW15LkFwcGxpY2F0aW9uLnByb3RvdHlwZSA9ICQuZXh0ZW5kKHt9LCBTYW1teS5PYmplY3QucHJvdG90eXBlLCB7XG5cbiAgICAgICAgLy8gdGhlIGZvdXIgcm91dGUgdmVyYnNcbiAgICAgICAgUk9VVEVfVkVSQlM6IFsnZ2V0JywgJ3Bvc3QnLCAncHV0JywgJ2RlbGV0ZSddLFxuXG4gICAgICAgIC8vIEFuIGFycmF5IG9mIHRoZSBkZWZhdWx0IGV2ZW50cyB0cmlnZ2VyZWQgYnkgdGhlXG4gICAgICAgIC8vIGFwcGxpY2F0aW9uIGR1cmluZyBpdHMgbGlmZWN5Y2xlXG4gICAgICAgIEFQUF9FVkVOVFM6IFsncnVuJywgJ3VubG9hZCcsICdsb29rdXAtcm91dGUnLCAncnVuLXJvdXRlJywgJ3JvdXRlLWZvdW5kJywgJ2V2ZW50LWNvbnRleHQtYmVmb3JlJywgJ2V2ZW50LWNvbnRleHQtYWZ0ZXInLCAnY2hhbmdlZCcsICdlcnJvcicsICdjaGVjay1mb3JtLXN1Ym1pc3Npb24nLCAncmVkaXJlY3QnLCAnbG9jYXRpb24tY2hhbmdlZCddLFxuXG4gICAgICAgIF9sYXN0X3JvdXRlOiBudWxsLFxuICAgICAgICBfbG9jYXRpb25fcHJveHk6IG51bGwsXG4gICAgICAgIF9ydW5uaW5nOiBmYWxzZSxcblxuICAgICAgICAvLyBEZWZpbmVzIHdoYXQgZWxlbWVudCB0aGUgYXBwbGljYXRpb24gaXMgYm91bmQgdG8uIFByb3ZpZGUgYSBzZWxlY3RvclxuICAgICAgICAvLyAocGFyc2VhYmxlIGJ5IGBqUXVlcnkoKWApIGFuZCB0aGlzIHdpbGwgYmUgdXNlZCBieSBgJGVsZW1lbnQoKWBcbiAgICAgICAgZWxlbWVudF9zZWxlY3RvcjogJ2JvZHknLFxuXG4gICAgICAgIC8vIFdoZW4gc2V0IHRvIHRydWUsIGxvZ3MgYWxsIG9mIHRoZSBkZWZhdWx0IGV2ZW50cyB1c2luZyBgbG9nKClgXG4gICAgICAgIGRlYnVnOiBmYWxzZSxcblxuICAgICAgICAvLyBXaGVuIHNldCB0byB0cnVlLCBhbmQgdGhlIGVycm9yKCkgaGFuZGxlciBpcyBub3Qgb3ZlcnJpZGRlbiwgd2lsbCBhY3R1YWxseVxuICAgICAgICAvLyByYWlzZSBKUyBlcnJvcnMgaW4gcm91dGVzICg1MDApIGFuZCB3aGVuIHJvdXRlcyBjYW4ndCBiZSBmb3VuZCAoNDA0KVxuICAgICAgICByYWlzZV9lcnJvcnM6IGZhbHNlLFxuXG4gICAgICAgIC8vIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kcyB0aGF0IHRoZSBVUkwgaXMgcXVlcmllZCBmb3IgY2hhbmdlc1xuICAgICAgICBydW5faW50ZXJ2YWxfZXZlcnk6IDUwLFxuXG4gICAgICAgIC8vIGlmIHVzaW5nIHRoZSBgRGVmYXVsdExvY2F0aW9uUHJveHlgIHNldHRpbmcgdGhpcyB0byB0cnVlIHdpbGwgZm9yY2UgdGhlIGFwcCB0byB1c2VcbiAgICAgICAgLy8gdHJhZGl0aW9uYWwgaGFzaCBiYXNlZCByb3V0aW5nIGFzIG9wcG9zZWQgdG8gdGhlIG5ldyBIVE1MNSBQdXNoU3RhdGUgc3VwcG9ydFxuICAgICAgICBkaXNhYmxlX3B1c2hfc3RhdGU6IGZhbHNlLFxuXG4gICAgICAgIC8vIFRoZSBkZWZhdWx0IHRlbXBsYXRlIGVuZ2luZSB0byB1c2Ugd2hlbiB1c2luZyBgcGFydGlhbCgpYCBpbiBhblxuICAgICAgICAvLyBgRXZlbnRDb250ZXh0YC4gYHRlbXBsYXRlX2VuZ2luZWAgY2FuIGVpdGhlciBiZSBhIHN0cmluZyB0aGF0XG4gICAgICAgIC8vIGNvcnJlc3BvbmRzIHRvIHRoZSBuYW1lIG9mIGEgbWV0aG9kL2hlbHBlciBvbiBFdmVudENvbnRleHQgb3IgaXQgY2FuIGJlIGEgZnVuY3Rpb25cbiAgICAgICAgLy8gdGhhdCB0YWtlcyB0d28gYXJndW1lbnRzLCB0aGUgY29udGVudCBvZiB0aGUgdW5yZW5kZXJlZCBwYXJ0aWFsIGFuZCBhbiBvcHRpb25hbFxuICAgICAgICAvLyBKUyBvYmplY3QgdGhhdCBjb250YWlucyBpbnRlcnBvbGF0aW9uIGRhdGEuIFRlbXBsYXRlIGVuZ2luZSBpcyBvbmx5IGNhbGxlZC9yZWZlcnJlZFxuICAgICAgICAvLyB0byBpZiB0aGUgZXh0ZW5zaW9uIG9mIHRoZSBwYXJ0aWFsIGlzIG51bGwgb3IgdW5rbm93bi4gU2VlIGBwYXJ0aWFsKClgXG4gICAgICAgIC8vIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICAgIHRlbXBsYXRlX2VuZ2luZTogbnVsbCxcblxuICAgICAgICAvLyAvLz0+IFNhbW15LkFwcGxpY2F0aW9uOiBib2R5XG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAnU2FtbXkuQXBwbGljYXRpb246JyArIHRoaXMuZWxlbWVudF9zZWxlY3RvcjtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyByZXR1cm5zIGEgalF1ZXJ5IG9iamVjdCBvZiB0aGUgQXBwbGljYXRpb25zIGJvdW5kIGVsZW1lbnQuXG4gICAgICAgICRlbGVtZW50OiBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yID8gJCh0aGlzLmVsZW1lbnRfc2VsZWN0b3IpLmZpbmQoc2VsZWN0b3IpIDogJCh0aGlzLmVsZW1lbnRfc2VsZWN0b3IpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGB1c2UoKWAgaXMgdGhlIGVudHJ5IHBvaW50IGZvciBpbmNsdWRpbmcgU2FtbXkgcGx1Z2lucy5cbiAgICAgICAgLy8gVGhlIGZpcnN0IGFyZ3VtZW50IHRvIHVzZSBzaG91bGQgYmUgYSBmdW5jdGlvbigpIHRoYXQgaXMgZXZhbHVhdGVkXG4gICAgICAgIC8vIGluIHRoZSBjb250ZXh0IG9mIHRoZSBjdXJyZW50IGFwcGxpY2F0aW9uLCBqdXN0IGxpa2UgdGhlIGBhcHBfZnVuY3Rpb25gXG4gICAgICAgIC8vIGFyZ3VtZW50IHRvIHRoZSBgU2FtbXkuQXBwbGljYXRpb25gIGNvbnN0cnVjdG9yLlxuICAgICAgICAvL1xuICAgICAgICAvLyBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgYXBwIGZ1bmN0aW9uIHNlcXVlbnRpYWxseS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gRm9yIG11Y2ggbW9yZSBkZXRhaWwgYWJvdXQgcGx1Z2lucywgY2hlY2sgb3V0OlxuICAgICAgICAvLyBbaHR0cDovL3NhbW15anMub3JnL2RvY3MvcGx1Z2luc10oaHR0cDovL3NhbW15anMub3JnL2RvY3MvcGx1Z2lucylcbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB2YXIgTXlQbHVnaW4gPSBmdW5jdGlvbihhcHAsIHByZXBlbmQpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHRoaXMuaGVscGVycyh7XG4gICAgICAgIC8vICAgICAgICAgIG15aGVscGVyOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgYWxlcnQocHJlcGVuZCArIFwiIFwiICsgdGV4dCk7XG4gICAgICAgIC8vICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIH07XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgdmFyIGFwcCA9ICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICB0aGlzLnVzZShNeVBsdWdpbiwgJ1RoaXMgaXMgbXkgcGx1Z2luJyk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICB0aGlzLmdldCgnIy8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgICAgdGhpcy5teWhlbHBlcignYW5kIGRvbnQgeW91IGZvcmdldCBpdCEnKTtcbiAgICAgICAgLy8gICAgICAgICAgLy89PiBBbGVydHM6IFRoaXMgaXMgbXkgcGx1Z2luIGFuZCBkb250IHlvdSBmb3JnZXQgaXQhXG4gICAgICAgIC8vICAgICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgcGx1Z2luIGlzIHBhc3NlZCBhcyBhIHN0cmluZyBpdCBhc3N1bWVzIHlvdXIgYXJlIHRyeWluZyB0byBsb2FkXG4gICAgICAgIC8vIFNhbW15LlwiUGx1Z2luXCIuIFRoaXMgaXMgdGhlIHByZWZlcnJlZCB3YXkgb2YgbG9hZGluZyBjb3JlIFNhbW15IHBsdWdpbnNcbiAgICAgICAgLy8gYXMgaXQgYWxsb3dzIGZvciBiZXR0ZXIgZXJyb3ItbWVzc2FnaW5nLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICB0aGlzLnVzZSgnTXVzdGFjaGUnKTsgLy89PiBTYW1teS5NdXN0YWNoZVxuICAgICAgICAvLyAgICAgICAgdGhpcy51c2UoJ1N0b3JhZ2UnKTsgLy89PiBTYW1teS5TdG9yYWdlXG4gICAgICAgIC8vICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIHVzZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBmbGF0dGVuIHRoZSBhcmd1bWVudHNcbiAgICAgICAgICAgIHZhciBhcmdzID0gX21ha2VBcnJheShhcmd1bWVudHMpLFxuICAgICAgICAgICAgICAgIHBsdWdpbiA9IGFyZ3Muc2hpZnQoKSxcbiAgICAgICAgICAgICAgICBwbHVnaW5fbmFtZSA9IHBsdWdpbiB8fCAnJztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXJncy51bnNoaWZ0KHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBwbHVnaW4gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luX25hbWUgPSAnU2FtbXkuJyArIHBsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luID0gU2FtbXlbcGx1Z2luXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGx1Z2luLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHBsdWdpbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcihcIlBsdWdpbiBFcnJvcjogY2FsbGVkIHVzZSgpIGJ1dCBwbHVnaW4gKFwiICsgcGx1Z2luX25hbWUudG9TdHJpbmcoKSArIFwiKSBpcyBub3QgZGVmaW5lZFwiLCBlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIV9pc0Z1bmN0aW9uKHBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcihcIlBsdWdpbiBFcnJvcjogY2FsbGVkIHVzZSgpIGJ1dCAnXCIgKyBwbHVnaW5fbmFtZS50b1N0cmluZygpICsgXCInIGlzIG5vdCBhIGZ1bmN0aW9uXCIsIGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoXCJQbHVnaW4gRXJyb3JcIiwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU2V0cyB0aGUgbG9jYXRpb24gcHJveHkgZm9yIHRoZSBjdXJyZW50IGFwcC4gQnkgZGVmYXVsdCB0aGlzIGlzIHNldCB0b1xuICAgICAgICAvLyBhIG5ldyBgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHlgIG9uIGluaXRpYWxpemF0aW9uLiBIb3dldmVyLCB5b3UgY2FuIHNldFxuICAgICAgICAvLyB0aGUgbG9jYXRpb25fcHJveHkgaW5zaWRlIHlvdSdyZSBhcHAgZnVuY3Rpb24gdG8gZ2l2ZSB5b3VyIGFwcCBhIGN1c3RvbVxuICAgICAgICAvLyBsb2NhdGlvbiBtZWNoYW5pc20uIFNlZSBgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHlgIGFuZCBgU2FtbXkuRGF0YUxvY2F0aW9uUHJveHlgXG4gICAgICAgIC8vIGZvciBleGFtcGxlcy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gYHNldExvY2F0aW9uUHJveHkoKWAgdGFrZXMgYW4gaW5pdGlhbGl6ZWQgbG9jYXRpb24gcHJveHkuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAvLyB0byBiaW5kIHRvIGRhdGEgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBoYXNoO1xuICAgICAgICAvLyAgICAgICAgdmFyIGFwcCA9ICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgIHRoaXMuc2V0TG9jYXRpb25Qcm94eShuZXcgU2FtbXkuRGF0YUxvY2F0aW9uUHJveHkodGhpcykpO1xuICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIHNldExvY2F0aW9uUHJveHk6IGZ1bmN0aW9uKG5ld19wcm94eSkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsX3Byb3h5ID0gdGhpcy5fbG9jYXRpb25fcHJveHk7XG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbl9wcm94eSA9IG5ld19wcm94eTtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBpZihvcmlnaW5hbF9wcm94eSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgbG9jYXRpb24gcHJveHksIHVuYmluZCBpdC5cbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxfcHJveHkudW5iaW5kKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uX3Byb3h5LmJpbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBwcm92aWRlIGxvZygpIG92ZXJyaWRlIGZvciBpbnNpZGUgYW4gYXBwIHRoYXQgaW5jbHVkZXMgdGhlIHJlbGV2YW50IGFwcGxpY2F0aW9uIGVsZW1lbnRfc2VsZWN0b3JcbiAgICAgICAgbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFNhbW15LmxvZy5hcHBseShTYW1teSwgQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbdGhpcy5lbGVtZW50X3NlbGVjdG9yXSwgYXJndW1lbnRzKSk7XG4gICAgICAgIH0sXG5cblxuICAgICAgICAvLyBgcm91dGUoKWAgaXMgdGhlIG1haW4gbWV0aG9kIGZvciBkZWZpbmluZyByb3V0ZXMgd2l0aGluIGFuIGFwcGxpY2F0aW9uLlxuICAgICAgICAvLyBGb3IgZ3JlYXQgZGV0YWlsIG9uIHJvdXRlcywgY2hlY2sgb3V0OlxuICAgICAgICAvLyBbaHR0cDovL3NhbW15anMub3JnL2RvY3Mvcm91dGVzXShodHRwOi8vc2FtbXlqcy5vcmcvZG9jcy9yb3V0ZXMpXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGFsc28gaGFzIGFsaWFzZXMgZm9yIGVhY2ggb2YgdGhlIGRpZmZlcmVudCB2ZXJicyAoZWcuIGBnZXQoKWAsIGBwb3N0KClgLCBldGMuKVxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgQXJndW1lbnRzXG4gICAgICAgIC8vXG4gICAgICAgIC8vICogYHZlcmJgIEEgU3RyaW5nIGluIHRoZSBzZXQgb2YgUk9VVEVfVkVSQlMgb3IgJ2FueScuICdhbnknIHdpbGwgYWRkIHJvdXRlcyBmb3IgZWFjaFxuICAgICAgICAvLyAgICBvZiB0aGUgUk9VVEVfVkVSQlMuIElmIG9ubHkgdHdvIGFyZ3VtZW50cyBhcmUgcGFzc2VkLFxuICAgICAgICAvLyAgICB0aGUgZmlyc3QgYXJndW1lbnQgaXMgdGhlIHBhdGgsIHRoZSBzZWNvbmQgaXMgdGhlIGNhbGxiYWNrIGFuZCB0aGUgdmVyYlxuICAgICAgICAvLyAgICBpcyBhc3N1bWVkIHRvIGJlICdhbnknLlxuICAgICAgICAvLyAqIGBwYXRoYCBBIFJlZ2V4cCBvciBhIFN0cmluZyByZXByZXNlbnRpbmcgdGhlIHBhdGggdG8gbWF0Y2ggdG8gaW52b2tlIHRoaXMgdmVyYi5cbiAgICAgICAgLy8gKiBgY2FsbGJhY2tgIEEgRnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQvZXZhbHVhdGVkIHdoZW4gdGhlIHJvdXRlIGlzIHJ1biBzZWU6IGBydW5Sb3V0ZSgpYC5cbiAgICAgICAgLy8gICAgSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwYXNzIGEgc3RyaW5nIGFzIHRoZSBjYWxsYmFjaywgd2hpY2ggaXMgbG9va2VkIHVwIGFzIHRoZSBuYW1lXG4gICAgICAgIC8vICAgIG9mIGEgbWV0aG9kIG9uIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAgICAgLy9cbiAgICAgICAgcm91dGU6IGZ1bmN0aW9uKHZlcmIsIHBhdGgpIHtcbiAgICAgICAgICAgIHZhciBhcHAgPSB0aGlzLCBwYXJhbV9uYW1lcyA9IFtdLCBhZGRfcm91dGUsIHBhdGhfbWF0Y2gsIGNhbGxiYWNrID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlIG1ldGhvZCBzaWduYXR1cmUgaXMganVzdCAocGF0aCwgY2FsbGJhY2spXG4gICAgICAgICAgICAvLyBhc3N1bWUgdGhlIHZlcmIgaXMgJ2FueSdcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrLmxlbmd0aCA9PT0gMCAmJiBfaXNGdW5jdGlvbihwYXRoKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gW3BhdGhdO1xuICAgICAgICAgICAgICAgIHBhdGggPSB2ZXJiO1xuICAgICAgICAgICAgICAgIHZlcmIgPSAnYW55JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmVyYiA9IHZlcmIudG9Mb3dlckNhc2UoKTsgLy8gZW5zdXJlIHZlcmIgaXMgbG93ZXIgY2FzZVxuXG4gICAgICAgICAgICAvLyBpZiBwYXRoIGlzIGEgc3RyaW5nIHR1cm4gaXQgaW50byBhIHJlZ2V4XG4gICAgICAgICAgICBpZihwYXRoLmNvbnN0cnVjdG9yID09IFN0cmluZykge1xuXG4gICAgICAgICAgICAgICAgLy8gTmVlZHMgdG8gYmUgZXhwbGljaXRseSBzZXQgYmVjYXVzZSBJRSB3aWxsIG1haW50YWluIHRoZSBpbmRleCB1bmxlc3MgTlVMTCBpcyByZXR1cm5lZCxcbiAgICAgICAgICAgICAgICAvLyB3aGljaCBtZWFucyB0aGF0IHdpdGggdHdvIGNvbnNlY3V0aXZlIHJvdXRlcyB0aGF0IGNvbnRhaW4gcGFyYW1zLCB0aGUgc2Vjb25kIHNldCBvZiBwYXJhbXMgd2lsbCBub3QgYmUgZm91bmQgYW5kIGVuZCB1cCBpbiBzcGxhdCBpbnN0ZWFkIG9mIHBhcmFtc1xuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0NvcmVfSmF2YVNjcmlwdF8xLjVfUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1JlZ0V4cC9sYXN0SW5kZXhcbiAgICAgICAgICAgICAgICBQQVRIX05BTUVfTUFUQ0hFUi5sYXN0SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgLy8gZmluZCB0aGUgbmFtZXNcbiAgICAgICAgICAgICAgICB3aGlsZSgocGF0aF9tYXRjaCA9IFBBVEhfTkFNRV9NQVRDSEVSLmV4ZWMocGF0aCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtX25hbWVzLnB1c2gocGF0aF9tYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2Ugd2l0aCB0aGUgcGF0aCByZXBsYWNlbWVudFxuICAgICAgICAgICAgICAgIHBhdGggPSBuZXcgUmVnRXhwKHBhdGgucmVwbGFjZShQQVRIX05BTUVfTUFUQ0hFUiwgUEFUSF9SRVBMQUNFUikgKyBcIiRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBsb29rdXAgY2FsbGJhY2tzXG4gICAgICAgICAgICAkLmVhY2goY2FsbGJhY2ssIGZ1bmN0aW9uKGksIGNiKSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIChjYikgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrW2ldID0gYXBwW2NiXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYWRkX3JvdXRlID0gZnVuY3Rpb24od2l0aF92ZXJiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSB7IHZlcmI6IHdpdGhfdmVyYiwgcGF0aDogcGF0aCwgY2FsbGJhY2s6IGNhbGxiYWNrLCBwYXJhbV9uYW1lczogcGFyYW1fbmFtZXMgfTtcbiAgICAgICAgICAgICAgICAvLyBhZGQgcm91dGUgdG8gcm91dGVzIGFycmF5XG4gICAgICAgICAgICAgICAgYXBwLnJvdXRlc1t3aXRoX3ZlcmJdID0gYXBwLnJvdXRlc1t3aXRoX3ZlcmJdIHx8IFtdO1xuICAgICAgICAgICAgICAgIC8vIHBsYWNlIHJvdXRlcyBpbiBvcmRlciBvZiBkZWZpbml0aW9uXG4gICAgICAgICAgICAgICAgYXBwLnJvdXRlc1t3aXRoX3ZlcmJdLnB1c2gocik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZih2ZXJiID09PSAnYW55Jykge1xuICAgICAgICAgICAgICAgICQuZWFjaCh0aGlzLlJPVVRFX1ZFUkJTLCBmdW5jdGlvbihpLCB2KSB7IGFkZF9yb3V0ZSh2KTsgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZF9yb3V0ZSh2ZXJiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSBhcHBcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEFsaWFzIGZvciByb3V0ZSgnZ2V0JywgLi4uKVxuICAgICAgICBnZXQ6IF9yb3V0ZVdyYXBwZXIoJ2dldCcpLFxuXG4gICAgICAgIC8vIEFsaWFzIGZvciByb3V0ZSgncG9zdCcsIC4uLilcbiAgICAgICAgcG9zdDogX3JvdXRlV3JhcHBlcigncG9zdCcpLFxuXG4gICAgICAgIC8vIEFsaWFzIGZvciByb3V0ZSgncHV0JywgLi4uKVxuICAgICAgICBwdXQ6IF9yb3V0ZVdyYXBwZXIoJ3B1dCcpLFxuXG4gICAgICAgIC8vIEFsaWFzIGZvciByb3V0ZSgnZGVsZXRlJywgLi4uKVxuICAgICAgICBkZWw6IF9yb3V0ZVdyYXBwZXIoJ2RlbGV0ZScpLFxuXG4gICAgICAgIC8vIEFsaWFzIGZvciByb3V0ZSgnYW55JywgLi4uKVxuICAgICAgICBhbnk6IF9yb3V0ZVdyYXBwZXIoJ2FueScpLFxuXG4gICAgICAgIC8vIGBtYXBSb3V0ZXNgIHRha2VzIGFuIGFycmF5IG9mIGFycmF5cywgZWFjaCBhcnJheSBiZWluZyBwYXNzZWQgdG8gcm91dGUoKVxuICAgICAgICAvLyBhcyBhcmd1bWVudHMsIHRoaXMgYWxsb3dzIGZvciBtYXNzIGRlZmluaXRpb24gb2Ygcm91dGVzLiBBbm90aGVyIGJlbmVmaXQgaXNcbiAgICAgICAgLy8gdGhpcyBtYWtlcyBpdCBwb3NzaWJsZS9lYXNpZXIgdG8gbG9hZCByb3V0ZXMgdmlhIHJlbW90ZSBKU09OLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHZhciBhcHAgPSAkLnNhbW15KGZ1bmN0aW9uKCkge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgdGhpcy5tYXBSb3V0ZXMoW1xuICAgICAgICAvLyAgICAgICAgICAgIFsnZ2V0JywgJyMvJywgZnVuY3Rpb24oKSB7IHRoaXMubG9nKCdpbmRleCcpOyB9XSxcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBzdHJpbmdzIGluIGNhbGxiYWNrcyBhcmUgbG9va2VkIHVwIGFzIG1ldGhvZHMgb24gdGhlIGFwcFxuICAgICAgICAvLyAgICAgICAgICAgIFsncG9zdCcsICcjL2NyZWF0ZScsICdhZGRVc2VyJ10sXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gTm8gdmVyYiBhc3N1bWVzICdhbnknIGFzIHRoZSB2ZXJiXG4gICAgICAgIC8vICAgICAgICAgICAgWy9kb3doYXRldmVyLywgZnVuY3Rpb24oKSB7IHRoaXMubG9nKHRoaXMudmVyYiwgdGhpcy5wYXRoKX1dO1xuICAgICAgICAvLyAgICAgICAgICBdKTtcbiAgICAgICAgLy8gICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgbWFwUm91dGVzOiBmdW5jdGlvbihyb3V0ZV9hcnJheSkge1xuICAgICAgICAgICAgdmFyIGFwcCA9IHRoaXM7XG4gICAgICAgICAgICAkLmVhY2gocm91dGVfYXJyYXksIGZ1bmN0aW9uKGksIHJvdXRlX2FyZ3MpIHtcbiAgICAgICAgICAgICAgICBhcHAucm91dGUuYXBwbHkoYXBwLCByb3V0ZV9hcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQSB1bmlxdWUgZXZlbnQgbmFtZXNwYWNlIGRlZmluZWQgcGVyIGFwcGxpY2F0aW9uLlxuICAgICAgICAvLyBBbGwgZXZlbnRzIGJvdW5kIHdpdGggYGJpbmQoKWAgYXJlIGF1dG9tYXRpY2FsbHkgYm91bmQgd2l0aGluIHRoaXMgc3BhY2UuXG4gICAgICAgIGV2ZW50TmFtZXNwYWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBbJ3NhbW15LWFwcCcsIHRoaXMubmFtZXNwYWNlXS5qb2luKCctJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gV29ya3MganVzdCBsaWtlIGBqUXVlcnkuZm4uYmluZCgpYCB3aXRoIGEgY291cGxlIG5vdGFibGUgZGlmZmVyZW5jZXMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICogSXQgYmluZHMgYWxsIGV2ZW50cyB0byB0aGUgYXBwbGljYXRpb24gZWxlbWVudFxuICAgICAgICAvLyAqIEFsbCBldmVudHMgYXJlIGJvdW5kIHdpdGhpbiB0aGUgYGV2ZW50TmFtZXNwYWNlKClgXG4gICAgICAgIC8vICogRXZlbnRzIGFyZSBub3QgYWN0dWFsbHkgYm91bmQgdW50aWwgdGhlIGFwcGxpY2F0aW9uIGlzIHN0YXJ0ZWQgd2l0aCBgcnVuKClgXG4gICAgICAgIC8vICogY2FsbGJhY2tzIGFyZSBldmFsdWF0ZWQgd2l0aGluIHRoZSBjb250ZXh0IG9mIGEgU2FtbXkuRXZlbnRDb250ZXh0XG4gICAgICAgIC8vXG4gICAgICAgIGJpbmQ6IGZ1bmN0aW9uKG5hbWUsIGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgYXBwID0gdGhpcztcbiAgICAgICAgICAgIC8vIGJ1aWxkIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgLy8gaWYgdGhlIGFyaXR5IGlzIDIsIGNhbGxiYWNrIGlzIHRoZSBzZWNvbmQgYXJndW1lbnRcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjYWxsYmFjayA9PSAndW5kZWZpbmVkJykgeyBjYWxsYmFjayA9IGRhdGE7IH1cbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcl9jYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHB1bGwgb2ZmIHRoZSBjb250ZXh0IGZyb20gdGhlIGFyZ3VtZW50cyB0byB0aGUgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICB2YXIgZSwgY29udGV4dCwgZGF0YTtcbiAgICAgICAgICAgICAgICBlID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGRhdGEuY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEuY29udGV4dDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gbmV3IGFwcC5jb250ZXh0X3Byb3RvdHlwZShhcHAsICdiaW5kJywgZS50eXBlLCBkYXRhLCBlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGUuY2xlYW5lZF90eXBlID0gZS50eXBlLnJlcGxhY2UoYXBwLmV2ZW50TmFtZXNwYWNlKCksICcnKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseShjb250ZXh0LCBbZSwgZGF0YV0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gaXQgY291bGQgYmUgdGhhdCB0aGUgYXBwIGVsZW1lbnQgZG9lc250IGV4aXN0IHlldFxuICAgICAgICAgICAgLy8gc28gYXR0YWNoIHRvIHRoZSBsaXN0ZW5lcnMgYXJyYXkgYW5kIHRoZW4gcnVuKClcbiAgICAgICAgICAgIC8vIHdpbGwgYWN0dWFsbHkgYmluZCB0aGUgZXZlbnQuXG4gICAgICAgICAgICBpZighdGhpcy5saXN0ZW5lcnNbbmFtZV0pIHsgdGhpcy5saXN0ZW5lcnNbbmFtZV0gPSBbXTsgfVxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0ucHVzaChsaXN0ZW5lcl9jYWxsYmFjayk7XG4gICAgICAgICAgICBpZih0aGlzLmlzUnVubmluZygpKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIGFwcCBpcyBydW5uaW5nXG4gICAgICAgICAgICAgICAgLy8gKmFjdHVhbGx5KiBiaW5kIHRoZSBldmVudCB0byB0aGUgYXBwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW4obmFtZSwgbGlzdGVuZXJfY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVHJpZ2dlcnMgY3VzdG9tIGV2ZW50cyBkZWZpbmVkIHdpdGggYGJpbmQoKWBcbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEFyZ3VtZW50c1xuICAgICAgICAvL1xuICAgICAgICAvLyAqIGBuYW1lYCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuIEF1dG9tYXRpY2FsbHkgcHJlZml4ZWQgd2l0aCB0aGUgYGV2ZW50TmFtZXNwYWNlKClgXG4gICAgICAgIC8vICogYGRhdGFgIEFuIG9wdGlvbmFsIE9iamVjdCB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gdGhlIGJvdW5kIGNhbGxiYWNrLlxuICAgICAgICAvLyAqIGBjb250ZXh0YCBBbiBvcHRpb25hbCBjb250ZXh0L09iamVjdCBpbiB3aGljaCB0byBleGVjdXRlIHRoZSBib3VuZCBjYWxsYmFjay5cbiAgICAgICAgLy8gICBJZiBubyBjb250ZXh0IGlzIHN1cHBsaWVkIGEgdGhlIGNvbnRleHQgaXMgYSBuZXcgYFNhbW15LkV2ZW50Q29udGV4dGBcbiAgICAgICAgLy9cbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCgpLnRyaWdnZXIoW25hbWUsIHRoaXMuZXZlbnROYW1lc3BhY2UoKV0uam9pbignLicpLCBbZGF0YV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmVydW5zIHRoZSBjdXJyZW50IHJvdXRlXG4gICAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0X2xvY2F0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignbG9jYXRpb24tY2hhbmdlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVGFrZXMgYSBzaW5nbGUgY2FsbGJhY2sgdGhhdCBpcyBwdXNoZWQgb24gdG8gYSBzdGFjay5cbiAgICAgICAgLy8gQmVmb3JlIGFueSByb3V0ZSBpcyBydW4sIHRoZSBjYWxsYmFja3MgYXJlIGV2YWx1YXRlZCBpbiBvcmRlciB3aXRoaW5cbiAgICAgICAgLy8gdGhlIGN1cnJlbnQgYFNhbW15LkV2ZW50Q29udGV4dGBcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgYW55IG9mIHRoZSBjYWxsYmFja3MgZXhwbGljaXRseSByZXR1cm4gZmFsc2UsIGV4ZWN1dGlvbiBvZiBhbnlcbiAgICAgICAgLy8gZnVydGhlciBjYWxsYmFja3MgYW5kIHRoZSByb3V0ZSBpdHNlbGYgaXMgaGFsdGVkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIHNldCBvZiBvcHRpb25zIHRoYXQgd2lsbCBkZWZpbmUgd2hlbiB0byBydW4gdGhpc1xuICAgICAgICAvLyBiZWZvcmUgYmFzZWQgb24gdGhlIHJvdXRlIGl0IHByb2NlZWRzLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHZhciBhcHAgPSAkLnNhbW15KGZ1bmN0aW9uKCkge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgLy8gd2lsbCBydW4gYXQgIy9yb3V0ZSBidXQgbm90IGF0ICMvXG4gICAgICAgIC8vICAgICAgICB0aGlzLmJlZm9yZSgnIy9yb3V0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICAvLy4uLlxuICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAvLyB3aWxsIHJ1biBhdCAjLyBidXQgbm90IGF0ICMvcm91dGVcbiAgICAgICAgLy8gICAgICAgIHRoaXMuYmVmb3JlKHtleGNlcHQ6IHtwYXRoOiAnIy9yb3V0ZSd9fSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgIHRoaXMubG9nKCdub3QgYmVmb3JlICMvcm91dGUnKTtcbiAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgdGhpcy5nZXQoJyMvJywgZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICB0aGlzLmdldCgnIy9yb3V0ZScsIGZ1bmN0aW9uKCkge30pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyBTZWUgYGNvbnRleHRNYXRjaGVzT3B0aW9ucygpYCBmb3IgYSBmdWxsIGxpc3Qgb2Ygc3VwcG9ydGVkIG9wdGlvbnNcbiAgICAgICAgLy9cbiAgICAgICAgYmVmb3JlOiBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYoX2lzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iZWZvcmVzLnB1c2goW29wdGlvbnMsIGNhbGxiYWNrXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBIHNob3J0Y3V0IGZvciBiaW5kaW5nIGEgY2FsbGJhY2sgdG8gYmUgcnVuIGFmdGVyIGEgcm91dGUgaXMgZXhlY3V0ZWQuXG4gICAgICAgIC8vIEFmdGVyIGNhbGxiYWNrcyBoYXZlIG5vIGd1YXJ1bnRlZWQgb3JkZXIuXG4gICAgICAgIGFmdGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmluZCgnZXZlbnQtY29udGV4dC1hZnRlcicsIGNhbGxiYWNrKTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8vIEFkZHMgYW4gYXJvdW5kIGZpbHRlciB0byB0aGUgYXBwbGljYXRpb24uIGFyb3VuZCBmaWx0ZXJzIGFyZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gdGhhdCB0YWtlIGEgc2luZ2xlIGFyZ3VtZW50IGBjYWxsYmFja2Agd2hpY2ggaXMgdGhlIGVudGlyZSByb3V0ZVxuICAgICAgICAvLyBleGVjdXRpb24gcGF0aCB3cmFwcGVkIHVwIGluIGEgY2xvc3VyZS4gVGhpcyBtZWFucyB5b3UgY2FuIGRlY2lkZSB3aGV0aGVyXG4gICAgICAgIC8vIG9yIG5vdCB0byBwcm9jZWVkIHdpdGggZXhlY3V0aW9uIGJ5IG5vdCBpbnZva2luZyBgY2FsbGJhY2tgIG9yLFxuICAgICAgICAvLyBtb3JlIHVzZWZ1bGx5IHdyYXBwaW5nIGNhbGxiYWNrIGluc2lkZSB0aGUgcmVzdWx0IG9mIGFuIGFzeW5jaHJvbm91cyBleGVjdXRpb24uXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBtb3N0IGNvbW1vbiB1c2UgY2FzZSBmb3IgYXJvdW5kKCkgaXMgY2FsbGluZyBhIF9wb3NzaWJseV8gYXN5bmMgZnVuY3Rpb25cbiAgICAgICAgLy8gYW5kIGV4ZWN1dGluZyB0aGUgcm91dGUgd2l0aGluIHRoZSBmdW5jdGlvbnMgY2FsbGJhY2s6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgdmFyIGFwcCA9ICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICB2YXIgY3VycmVudF91c2VyID0gZmFsc2U7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICBmdW5jdGlvbiBjaGVja0xvZ2dlZEluKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vICAgICAgICAgIC8vIC9zZXNzaW9uIHJldHVybnMgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBsb2dnZWQgaW4gdXNlclxuICAgICAgICAvLyAgICAgICAgICAvLyBvciBhbiBlbXB0eSBvYmplY3RcbiAgICAgICAgLy8gICAgICAgICAgaWYgKCFjdXJyZW50X3VzZXIpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAkLmdldEpTT04oJy9zZXNzaW9uJywgZnVuY3Rpb24oanNvbikge1xuICAgICAgICAvLyAgICAgICAgICAgICAgaWYgKGpzb24ubG9naW4pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgdXNlciBhcyBsb2dnZWQgaW5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY3VycmVudF91c2VyID0ganNvbjtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgcm91dGUgcGF0aFxuICAgICAgICAvLyAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgdXNlciBhcyBub3QgbG9nZ2VkIGluXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGN1cnJlbnRfdXNlciA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyB0aGUgY29udGV4dCBvZiBhcm91bmRGaWx0ZXJzIGlzIGFuIEV2ZW50Q29udGV4dFxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGlzLnJlZGlyZWN0KCcjL2xvZ2luJyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgcm91dGUgcGF0aFxuICAgICAgICAvLyAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIC8vICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgIH07XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICB0aGlzLmFyb3VuZChjaGVja0xvZ2dlZEluKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgYXJvdW5kOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5hcm91bmRzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQWRkcyBhIG9uQ29tcGxldGUgZnVuY3Rpb24gdG8gdGhlIGFwcGxpY2F0aW9uLiBvbkNvbXBsZXRlIGZ1bmN0aW9ucyBhcmUgZXhlY3V0ZWRcbiAgICAgICAgLy8gYXQgdGhlIGVuZCBvZiBhIGNoYWluIG9mIHJvdXRlIGNhbGxiYWNrcywgaWYgdGhleSBjYWxsIG5leHQoKS4gVW5saWtlIGFmdGVyLFxuICAgICAgICAvLyB3aGljaCBpcyBjYWxsZWQgYXMgc29vbiBhcyB0aGUgcm91dGUgaXMgY29tcGxldGUsIG9uQ29tcGxldGUgaXMgbGlrZSBhIGZpbmFsIG5leHQoKVxuICAgICAgICAvLyBmb3IgYWxsIHJvdXRlcywgYW5kIGlzIHRodXMgcnVuIGFzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgYXBwLmdldCgnL2NoYWluJyxmdW5jdGlvbihjb250ZXh0LG5leHQpIHtcbiAgICAgICAgLy8gICAgICAgICAgY29uc29sZS5sb2coJ2NoYWluMScpO1xuICAgICAgICAvLyAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIC8vICAgICAgfSxmdW5jdGlvbihjb250ZXh0LG5leHQpIHtcbiAgICAgICAgLy8gICAgICAgICAgY29uc29sZS5sb2coJ2NoYWluMicpO1xuICAgICAgICAvLyAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIC8vICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgYXBwLmdldCgnL2xpbmsnLGZ1bmN0aW9uKGNvbnRleHQsbmV4dCkge1xuICAgICAgICAvLyAgICAgICAgICBjb25zb2xlLmxvZygnbGluazEnKTtcbiAgICAgICAgLy8gICAgICAgICAgbmV4dCgpO1xuICAgICAgICAvLyAgICAgIH0sZnVuY3Rpb24oY29udGV4dCxuZXh0KSB7XG4gICAgICAgIC8vICAgICAgICAgIGNvbnNvbGUubG9nKCdsaW5rMicpO1xuICAgICAgICAvLyAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIC8vICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgYXBwLm9uQ29tcGxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBmaW5hbGx5XCIpO1xuICAgICAgICAvLyAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyBJZiB5b3UgZ28gdG8gJy9jaGFpbicsIHlvdSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIG1lc3NhZ2VzOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIGNoYWluMVxuICAgICAgICAvLyAgICAgIGNoYWluMlxuICAgICAgICAvLyAgICAgIFJ1bm5pbmcgb25Db21wbGV0ZVxuICAgICAgICAvL1xuICAgICAgICAvL1xuICAgICAgICAvLyBJZiB5b3UgZ28gdG8gL2xpbmssIHlvdSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIG1lc3NhZ2VzOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIGxpbmsxXG4gICAgICAgIC8vICAgICAgbGluazJcbiAgICAgICAgLy8gICAgICBSdW5uaW5nIG9uQ29tcGxldGVcbiAgICAgICAgLy9cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSXQgcmVhbGx5IGNvbWVzIHRvIHBsYXkgd2hlbiBkb2luZyBhc3luY2hyb25vdXM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgYXBwLmdldCgnL2NoYWluJyxmdW5jdGlvbihjb250ZXh0LG5leHQpIHtcbiAgICAgICAgLy8gICAgICAgICQuZ2V0KCcvbXkvdXJsJyxmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgICAgY29uc29sZS5sb2coJ2NoYWluMScpO1xuICAgICAgICAvLyAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIC8vICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICB9LGZ1bmN0aW9uKGNvbnRleHQsbmV4dCkge1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coJ2NoYWluMicpO1xuICAgICAgICAvLyAgICAgICAgbmV4dCgpO1xuICAgICAgICAvLyAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fb25Db21wbGV0ZSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGN1cnJlbnQgYXBwbGljYXRpb24gaXMgcnVubmluZy5cbiAgICAgICAgaXNSdW5uaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ydW5uaW5nO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEhlbHBlcnMgZXh0ZW5kcyB0aGUgRXZlbnRDb250ZXh0IHByb3RvdHlwZSBzcGVjaWZpYyB0byB0aGlzIGFwcC5cbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgeW91IHRvIGRlZmluZSBhcHAgc3BlY2lmaWMgaGVscGVyIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkXG4gICAgICAgIC8vIHdoZW5ldmVyIHlvdSdyZSBpbnNpZGUgb2YgYW4gZXZlbnQgY29udGV4dCAodGVtcGxhdGVzLCByb3V0ZXMsIGJpbmQpLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgdmFyIGFwcCA9ICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgIGhlbHBlcnMoe1xuICAgICAgICAvLyAgICAgICAgIHVwY2FzZTogZnVuY3Rpb24odGV4dCkge1xuICAgICAgICAvLyAgICAgICAgICByZXR1cm4gdGV4dC50b1N0cmluZygpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgZ2V0KCcjLycsIGZ1bmN0aW9uKCkgeyB3aXRoKHRoaXMpIHtcbiAgICAgICAgLy8gICAgICAgICAvLyBpbnNpZGUgb2YgdGhpcyBjb250ZXh0IEkgY2FuIHVzZSB0aGUgaGVscGVyc1xuICAgICAgICAvLyAgICAgICAgICQoJyNtYWluJykuaHRtbCh1cGNhc2UoJCgnI21haW4nKS50ZXh0KCkpO1xuICAgICAgICAvLyAgICAgICB9fSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEFyZ3VtZW50c1xuICAgICAgICAvL1xuICAgICAgICAvLyAqIGBleHRlbnNpb25zYCBBbiBvYmplY3QgY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgdG8gZXh0ZW5kIHRoZSBjb250ZXh0LlxuICAgICAgICAvL1xuICAgICAgICBoZWxwZXJzOiBmdW5jdGlvbihleHRlbnNpb25zKSB7XG4gICAgICAgICAgICAkLmV4dGVuZCh0aGlzLmNvbnRleHRfcHJvdG90eXBlLnByb3RvdHlwZSwgZXh0ZW5zaW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBIZWxwZXIgZXh0ZW5kcyB0aGUgZXZlbnQgY29udGV4dCBqdXN0IGxpa2UgYGhlbHBlcnMoKWAgYnV0IGRvZXMgaXRcbiAgICAgICAgLy8gYSBzaW5nbGUgbWV0aG9kIGF0IGEgdGltZS4gVGhpcyBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBmb3IgZHluYW1pY2FsbHkgbmFtZWRcbiAgICAgICAgLy8gaGVscGVyc1xuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgLy8gVHJpdmlhbCBleGFtcGxlIHRoYXQgYWRkcyAzIGhlbHBlciBtZXRob2RzIHRvIHRoZSBjb250ZXh0IGR5bmFtaWNhbGx5XG4gICAgICAgIC8vICAgICB2YXIgYXBwID0gJC5zYW1teShmdW5jdGlvbihhcHApIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgJC5lYWNoKFsxLDIsM10sIGZ1bmN0aW9uKGksIG51bSkge1xuICAgICAgICAvLyAgICAgICAgIGFwcC5oZWxwZXIoJ2hlbHBlcicgKyBudW0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICAgdGhpcy5sb2coXCJJJ20gaGVscGVyIG51bWJlciBcIiArIG51bSk7XG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICB0aGlzLmdldCgnIy8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmhlbHBlcjIoKTsgLy89PiBJJ20gaGVscGVyIG51bWJlciAyXG4gICAgICAgIC8vICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBBcmd1bWVudHNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gKiBgbmFtZWAgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZFxuICAgICAgICAvLyAqIGBtZXRob2RgIFRoZSBmdW5jdGlvbiB0byBiZSBhZGRlZCB0byB0aGUgcHJvdG90eXBlIGF0IGBuYW1lYFxuICAgICAgICAvL1xuICAgICAgICBoZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIG1ldGhvZCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0X3Byb3RvdHlwZS5wcm90b3R5cGVbbmFtZV0gPSBtZXRob2Q7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBY3R1YWxseSBzdGFydHMgdGhlIGFwcGxpY2F0aW9uJ3MgbGlmZWN5Y2xlLiBgcnVuKClgIHNob3VsZCBiZSBpbnZva2VkXG4gICAgICAgIC8vIHdpdGhpbiBhIGRvY3VtZW50LnJlYWR5IGJsb2NrIHRvIGVuc3VyZSB0aGUgRE9NIGV4aXN0cyBiZWZvcmUgYmluZGluZyBldmVudHMsIGV0Yy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIHZhciBhcHAgPSAkLnNhbW15KGZ1bmN0aW9uKCkgeyAuLi4gfSk7IC8vIHlvdXIgYXBwbGljYXRpb25cbiAgICAgICAgLy8gICAgICQoZnVuY3Rpb24oKSB7IC8vIGRvY3VtZW50LnJlYWR5XG4gICAgICAgIC8vICAgICAgICBhcHAucnVuKCk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEFyZ3VtZW50c1xuICAgICAgICAvL1xuICAgICAgICAvLyAqIGBzdGFydF91cmxgIE9wdGlvbmFsbHksIGEgU3RyaW5nIGNhbiBiZSBwYXNzZWQgd2hpY2ggdGhlIEFwcCB3aWxsIHJlZGlyZWN0IHRvXG4gICAgICAgIC8vICAgYWZ0ZXIgdGhlIGV2ZW50cy9yb3V0ZXMgaGF2ZSBiZWVuIGJvdW5kLlxuICAgICAgICBydW46IGZ1bmN0aW9uKHN0YXJ0X3VybCkge1xuICAgICAgICAgICAgaWYodGhpcy5pc1J1bm5pbmcoKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgICAgIHZhciBhcHAgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyBhY3R1YWxseSBiaW5kIGFsbCB0aGUgbGlzdGVuZXJzXG4gICAgICAgICAgICAkLmVhY2godGhpcy5saXN0ZW5lcnMudG9IYXNoKCksIGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICQuZWFjaChjYWxsYmFja3MsIGZ1bmN0aW9uKGksIGxpc3RlbmVyX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5fbGlzdGVuKG5hbWUsIGxpc3RlbmVyX2NhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3J1bicsIHsgc3RhcnRfdXJsOiBzdGFydF91cmwgfSk7XG4gICAgICAgICAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIHNldCBsYXN0IGxvY2F0aW9uXG4gICAgICAgICAgICB0aGlzLmxhc3RfbG9jYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgaWYoISgvXFwjKC4rKS8udGVzdCh0aGlzLmdldExvY2F0aW9uKCkpKSAmJiB0eXBlb2Ygc3RhcnRfdXJsICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhdGlvbihzdGFydF91cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2hlY2sgdXJsXG4gICAgICAgICAgICB0aGlzLl9jaGVja0xvY2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbl9wcm94eS5iaW5kKCk7XG4gICAgICAgICAgICB0aGlzLmJpbmQoJ2xvY2F0aW9uLWNoYW5nZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhcHAuX2NoZWNrTG9jYXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBiaW5kIHRvIHN1Ym1pdCB0byBjYXB0dXJlIHBvc3QvcHV0L2RlbGV0ZSByb3V0ZXNcbiAgICAgICAgICAgIHRoaXMuYmluZCgnc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGlmKCFTYW1teS50YXJnZXRJc1RoaXNXaW5kb3coZSwgJ2Zvcm0nKSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgICAgICAgIHZhciByZXR1cm5lZCA9IGFwcC5fY2hlY2tGb3JtU3VibWlzc2lvbigkKGUudGFyZ2V0KS5jbG9zZXN0KCdmb3JtJykpO1xuICAgICAgICAgICAgICAgIHJldHVybiAocmV0dXJuZWQgPT09IGZhbHNlKSA/IGUucHJldmVudERlZmF1bHQoKSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGJpbmQgdW5sb2FkIHRvIGJvZHkgdW5sb2FkXG4gICAgICAgICAgICAkKHdpbmRvdykuYmluZCgndW5sb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYXBwLnVubG9hZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHRyaWdnZXIgaHRtbCBjaGFuZ2VkXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyKCdjaGFuZ2VkJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gVGhlIG9wcG9zaXRlIG9mIGBydW4oKWAsIHVuLWJpbmRzIGFsbCBldmVudCBsaXN0ZW5lcnMgYW5kIGludGVydmFsc1xuICAgICAgICAvLyBgcnVuKClgIEF1dG9tYXRpY2FsbHkgYmluZHMgYSBgb251bmxvYWRgIGV2ZW50IHRvIHJ1biB0aGlzIHdoZW5cbiAgICAgICAgLy8gdGhlIGRvY3VtZW50IGlzIGNsb3NlZC5cbiAgICAgICAgdW5sb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzUnVubmluZygpKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICAgICAgdmFyIGFwcCA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3VubG9hZCcpO1xuICAgICAgICAgICAgLy8gY2xlYXIgaW50ZXJ2YWxcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uX3Byb3h5LnVuYmluZCgpO1xuICAgICAgICAgICAgLy8gdW5iaW5kIGZvcm0gc3VibWl0c1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCgpLnVuYmluZCgnc3VibWl0JykucmVtb3ZlQ2xhc3MoYXBwLmV2ZW50TmFtZXNwYWNlKCkpO1xuICAgICAgICAgICAgLy8gdW5iaW5kIGFsbCBldmVudHNcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLmxpc3RlbmVycy50b0hhc2goKSwgZnVuY3Rpb24obmFtZSwgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGxpc3RlbmVycywgZnVuY3Rpb24oaSwgbGlzdGVuZXJfY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLl91bmxpc3RlbihuYW1lLCBsaXN0ZW5lcl9jYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE5vdCBvbmx5IHJ1bnMgYHVuYmluZGAgYnV0IGFsc28gZGVzdHJveXMgdGhlIGFwcCByZWZlcmVuY2UuXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgICAgICAgIGRlbGV0ZSBTYW1teS5hcHBzW3RoaXMuZWxlbWVudF9zZWxlY3Rvcl07XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBXaWxsIGJpbmQgYSBzaW5nbGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXZlcnkgZXZlbnQgdGhhdCBpcyBhbHJlYWR5XG4gICAgICAgIC8vIGJlaW5nIGxpc3RlbmVkIHRvIGluIHRoZSBhcHAuIFRoaXMgaW5jbHVkZXMgYWxsIHRoZSBgQVBQX0VWRU5UU2BcbiAgICAgICAgLy8gYXMgd2VsbCBhcyBhbnkgY3VzdG9tIGV2ZW50cyBkZWZpbmVkIHdpdGggYGJpbmQoKWAuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFVzZWQgaW50ZXJuYWxseSBmb3IgZGVidWcgbG9nZ2luZy5cbiAgICAgICAgYmluZFRvQWxsRXZlbnRzOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGFwcCA9IHRoaXM7XG4gICAgICAgICAgICAvLyBiaW5kIHRvIHRoZSBBUFBfRVZFTlRTIGZpcnN0XG4gICAgICAgICAgICAkLmVhY2godGhpcy5BUFBfRVZFTlRTLCBmdW5jdGlvbihpLCBlKSB7XG4gICAgICAgICAgICAgICAgYXBwLmJpbmQoZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBuZXh0LCBiaW5kIHRvIGxpc3RlbmVyIG5hbWVzIChvbmx5IGlmIHRoZXkgZG9udCBleGlzdCBpbiBBUFBfRVZFTlRTKVxuICAgICAgICAgICAgJC5lYWNoKHRoaXMubGlzdGVuZXJzLmtleXModHJ1ZSksIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZigkLmluQXJyYXkobmFtZSwgYXBwLkFQUF9FVkVOVFMpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5iaW5kKG5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJldHVybnMgYSBjb3B5IG9mIHRoZSBnaXZlbiBwYXRoIHdpdGggYW55IHF1ZXJ5IHN0cmluZyBhZnRlciB0aGUgaGFzaFxuICAgICAgICAvLyByZW1vdmVkLlxuICAgICAgICByb3V0YWJsZVBhdGg6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoUVVFUllfU1RSSU5HX01BVENIRVIsICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBHaXZlbiBhIHZlcmIgYW5kIGEgU3RyaW5nIHBhdGgsIHdpbGwgcmV0dXJuIGVpdGhlciBhIHJvdXRlIG9iamVjdCBvciBmYWxzZVxuICAgICAgICAvLyBpZiBhIG1hdGNoaW5nIHJvdXRlIGNhbiBiZSBmb3VuZCB3aXRoaW4gdGhlIGN1cnJlbnQgZGVmaW5lZCBzZXQuXG4gICAgICAgIGxvb2t1cFJvdXRlOiBmdW5jdGlvbih2ZXJiLCBwYXRoKSB7XG4gICAgICAgICAgICB2YXIgYXBwID0gdGhpcywgcm91dGVkID0gZmFsc2UsIGkgPSAwLCBsLCByb3V0ZTtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLnJvdXRlc1t2ZXJiXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGwgPSB0aGlzLnJvdXRlc1t2ZXJiXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yKDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZSA9IHRoaXMucm91dGVzW3ZlcmJdW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZihhcHAucm91dGFibGVQYXRoKHBhdGgpLm1hdGNoKHJvdXRlLnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZWQgPSByb3V0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvdXRlZDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBGaXJzdCwgaW52b2tlcyBgbG9va3VwUm91dGUoKWAgYW5kIGlmIGEgcm91dGUgaXMgZm91bmQsIHBhcnNlcyB0aGVcbiAgICAgICAgLy8gcG9zc2libGUgVVJMIHBhcmFtcyBhbmQgdGhlbiBpbnZva2VzIHRoZSByb3V0ZSdzIGNhbGxiYWNrIHdpdGhpbiBhIG5ld1xuICAgICAgICAvLyBgU2FtbXkuRXZlbnRDb250ZXh0YC4gSWYgdGhlIHJvdXRlIGNhbiBub3QgYmUgZm91bmQsIGl0IGNhbGxzXG4gICAgICAgIC8vIGBub3RGb3VuZCgpYC4gSWYgYHJhaXNlX2Vycm9yc2AgaXMgc2V0IHRvIGB0cnVlYCBhbmRcbiAgICAgICAgLy8gdGhlIGBlcnJvcigpYCBoYXMgbm90IGJlZW4gb3ZlcnJpZGRlbiwgaXQgd2lsbCB0aHJvdyBhbiBhY3R1YWwgSlNcbiAgICAgICAgLy8gZXJyb3IuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFlvdSBwcm9iYWJseSB3aWxsIG5ldmVyIGhhdmUgdG8gY2FsbCB0aGlzIGRpcmVjdGx5LlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgQXJndW1lbnRzXG4gICAgICAgIC8vXG4gICAgICAgIC8vICogYHZlcmJgIEEgU3RyaW5nIGZvciB0aGUgdmVyYi5cbiAgICAgICAgLy8gKiBgcGF0aGAgQSBTdHJpbmcgcGF0aCB0byBsb29rdXAuXG4gICAgICAgIC8vICogYHBhcmFtc2AgQW4gT2JqZWN0IG9mIFBhcmFtcyBwdWxsZWQgZnJvbSB0aGUgVVJJIG9yIHBhc3NlZCBkaXJlY3RseS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIFJldHVybnNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gRWl0aGVyIHJldHVybnMgdGhlIHZhbHVlIHJldHVybmVkIGJ5IHRoZSByb3V0ZSBjYWxsYmFjayBvciByYWlzZXMgYSA0MDQgTm90IEZvdW5kIGVycm9yLlxuICAgICAgICAvL1xuICAgICAgICBydW5Sb3V0ZTogZnVuY3Rpb24odmVyYiwgcGF0aCwgcGFyYW1zLCB0YXJnZXQpIHtcbiAgICAgICAgICAgIHZhciBhcHAgPSB0aGlzLFxuICAgICAgICAgICAgICAgIHJvdXRlID0gdGhpcy5sb29rdXBSb3V0ZSh2ZXJiLCBwYXRoKSxcbiAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgIHdyYXBwZWRfcm91dGUsXG4gICAgICAgICAgICAgICAgYXJvdW5kcyxcbiAgICAgICAgICAgICAgICBhcm91bmQsXG4gICAgICAgICAgICAgICAgYmVmb3JlcyxcbiAgICAgICAgICAgICAgICBiZWZvcmUsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tfYXJncyxcbiAgICAgICAgICAgICAgICBwYXRoX3BhcmFtcyxcbiAgICAgICAgICAgICAgICBmaW5hbF9yZXR1cm5lZDtcblxuICAgICAgICAgICAgaWYodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdydW5Sb3V0ZScsIFt2ZXJiLCBwYXRoXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3J1bi1yb3V0ZScsIHsgdmVyYjogdmVyYiwgcGF0aDogcGF0aCwgcGFyYW1zOiBwYXJhbXMgfSk7XG4gICAgICAgICAgICBpZih0eXBlb2YgcGFyYW1zID09ICd1bmRlZmluZWQnKSB7IHBhcmFtcyA9IHt9OyB9XG5cbiAgICAgICAgICAgICQuZXh0ZW5kKHBhcmFtcywgdGhpcy5fcGFyc2VRdWVyeVN0cmluZyhwYXRoKSk7XG5cbiAgICAgICAgICAgIGlmKHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdyb3V0ZS1mb3VuZCcsIHsgcm91dGU6IHJvdXRlIH0pO1xuICAgICAgICAgICAgICAgIC8vIHB1bGwgb3V0IHRoZSBwYXJhbXMgZnJvbSB0aGUgcGF0aFxuICAgICAgICAgICAgICAgIGlmKChwYXRoX3BhcmFtcyA9IHJvdXRlLnBhdGguZXhlYyh0aGlzLnJvdXRhYmxlUGF0aChwYXRoKSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpcnN0IG1hdGNoIGlzIHRoZSBmdWxsIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgcGF0aF9wYXJhbXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlIG1hdGNoZXNcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHBhdGhfcGFyYW1zLCBmdW5jdGlvbihpLCBwYXJhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmVzIGEgbWF0Y2hpbmcgcGFyYW0gbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocm91dGUucGFyYW1fbmFtZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIG5hbWUgdG8gdGhlIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zW3JvdXRlLnBhcmFtX25hbWVzW2ldXSA9IF9kZWNvZGUocGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplICdzcGxhdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighcGFyYW1zLnNwbGF0KSB7IHBhcmFtcy5zcGxhdCA9IFtdOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNwbGF0LnB1c2goX2RlY29kZShwYXJhbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgZXZlbnQgY29udGV4dFxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb250ZXh0X3Byb3RvdHlwZSh0aGlzLCB2ZXJiLCBwYXRoLCBwYXJhbXMsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIGFycmF5c1xuICAgICAgICAgICAgICAgIGFyb3VuZHMgPSB0aGlzLmFyb3VuZHMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgYmVmb3JlcyA9IHRoaXMuYmVmb3Jlcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIGNhbGxiYWNrIGFyZ3MgdG8gdGhlIGNvbnRleHQgKyBjb250ZW50cyBvZiB0aGUgc3BsYXRcbiAgICAgICAgICAgICAgICBjYWxsYmFja19hcmdzID0gW2NvbnRleHRdO1xuICAgICAgICAgICAgICAgIGlmKHBhcmFtcy5zcGxhdCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja19hcmdzID0gY2FsbGJhY2tfYXJncy5jb25jYXQocGFyYW1zLnNwbGF0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gd3JhcCB0aGUgcm91dGUgdXAgd2l0aCB0aGUgYmVmb3JlIGZpbHRlcnNcbiAgICAgICAgICAgICAgICB3cmFwcGVkX3JvdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5lZCwgaSwgbmV4dFJvdXRlO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShiZWZvcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZSA9IGJlZm9yZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIGJlZm9yZVswXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5lZCA9IGJlZm9yZVsxXS5hcHBseShjb250ZXh0LCBbY29udGV4dF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJldHVybmVkID09PSBmYWxzZSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcHAubGFzdF9yb3V0ZSA9IHJvdXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnRyaWdnZXIoJ2V2ZW50LWNvbnRleHQtYmVmb3JlJywgeyBjb250ZXh0OiBjb250ZXh0IH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBydW4gbXVsdGlwbGUgY2FsbGJhY2tzXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiAocm91dGUuY2FsbGJhY2spID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlLmNhbGxiYWNrID0gW3JvdXRlLmNhbGxiYWNrXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihyb3V0ZS5jYWxsYmFjayAmJiByb3V0ZS5jYWxsYmFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3V0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyb3V0ZS5jYWxsYmFja1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5lZCA9IHJvdXRlLmNhbGxiYWNrW2ldLmFwcGx5KGNvbnRleHQsIGNhbGxiYWNrX2FyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihhcHAuX29uQ29tcGxldGUgJiYgdHlwZW9mIChhcHAuX29uQ29tcGxldGUgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwLl9vbkNvbXBsZXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja19hcmdzLnB1c2gobmV4dFJvdXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3V0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudHJpZ2dlcignZXZlbnQtY29udGV4dC1hZnRlcicsIHsgY29udGV4dDogY29udGV4dCB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgJC5lYWNoKGFyb3VuZHMucmV2ZXJzZSgpLCBmdW5jdGlvbihpLCBhcm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3Rfd3JhcHBlZF9yb3V0ZSA9IHdyYXBwZWRfcm91dGU7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZWRfcm91dGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFyb3VuZC5hcHBseShjb250ZXh0LCBbbGFzdF93cmFwcGVkX3JvdXRlXSk7IH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxfcmV0dXJuZWQgPSB3cmFwcGVkX3JvdXRlKCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3IoWyc1MDAgRXJyb3InLCB2ZXJiLCBwYXRoXS5qb2luKCcgJyksIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmluYWxfcmV0dXJuZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vdEZvdW5kKHZlcmIsIHBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIE1hdGNoZXMgYW4gb2JqZWN0IG9mIG9wdGlvbnMgYWdhaW5zdCBhbiBgRXZlbnRDb250ZXh0YCBsaWtlIG9iamVjdCB0aGF0XG4gICAgICAgIC8vIGNvbnRhaW5zIGBwYXRoYCBhbmQgYHZlcmJgIGF0dHJpYnV0ZXMuIEludGVybmFsbHkgU2FtbXkgdXNlcyB0aGlzXG4gICAgICAgIC8vIGZvciBtYXRjaGluZyBgYmVmb3JlKClgIGZpbHRlcnMgYWdhaW5zdCBzcGVjaWZpYyBvcHRpb25zLiBZb3UgY2FuIHNldCB0aGVcbiAgICAgICAgLy8gb2JqZWN0IHRvIF9vbmx5XyBtYXRjaCBjZXJ0YWluIHBhdGhzIG9yIHZlcmJzLCBvciBtYXRjaCBhbGwgcGF0aHMgb3IgdmVyYnMgX2V4Y2VwdF9cbiAgICAgICAgLy8gdGhvc2UgdGhhdCBtYXRjaCB0aGUgb3B0aW9ucy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIHZhciBhcHAgPSAkLnNhbW15KCksXG4gICAgICAgIC8vICAgICAgICAgY29udGV4dCA9IHt2ZXJiOiAnZ2V0JywgcGF0aDogJyMvbXlwYXRoJ307XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBtYXRjaCBhZ2FpbnN0IGEgcGF0aCBzdHJpbmdcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwgJyMvbXlwYXRoJyk7IC8vPT4gdHJ1ZVxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCAnIy9vdGhlcnBhdGgnKTsgLy89PiBmYWxzZVxuICAgICAgICAvLyAgICAgLy8gZXF1aXZhbGVudCB0b1xuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7b25seToge3BhdGg6JyMvbXlwYXRoJ319KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtvbmx5OiB7cGF0aDonIy9vdGhlcnBhdGgnfX0pOyAvLz0+IGZhbHNlXG4gICAgICAgIC8vICAgICAvLyBtYXRjaCBhZ2FpbnN0IGEgcGF0aCByZWdleHBcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwgL3BhdGgvKTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIC9ecGF0aC8pOyAvLz0+IGZhbHNlXG4gICAgICAgIC8vICAgICAvLyBtYXRjaCBvbmx5IGEgdmVyYlxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7b25seToge3ZlcmI6J2dldCd9fSk7IC8vPT4gdHJ1ZVxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7b25seToge3ZlcmI6J3Bvc3QnfX0pOyAvLz0+IGZhbHNlXG4gICAgICAgIC8vICAgICAvLyBtYXRjaCBhbGwgZXhjZXB0IGEgdmVyYlxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7ZXhjZXB0OiB7dmVyYjoncG9zdCd9fSk7IC8vPT4gdHJ1ZVxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7ZXhjZXB0OiB7dmVyYjonZ2V0J319KTsgLy89PiBmYWxzZVxuICAgICAgICAvLyAgICAgLy8gbWF0Y2ggYWxsIGV4Y2VwdCBhIHBhdGhcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge2V4Y2VwdDoge3BhdGg6JyMvb3RoZXJwYXRoJ319KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtleGNlcHQ6IHtwYXRoOicjL215cGF0aCd9fSk7IC8vPT4gZmFsc2VcbiAgICAgICAgLy8gICAgIC8vIG1hdGNoIGFsbCBleGNlcHQgYSB2ZXJiIGFuZCBhIHBhdGhcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge2V4Y2VwdDoge3BhdGg6JyMvb3RoZXJwYXRoJywgdmVyYjoncG9zdCd9fSk7IC8vPT4gdHJ1ZVxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7ZXhjZXB0OiB7cGF0aDonIy9teXBhdGgnLCB2ZXJiOidwb3N0J319KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtleGNlcHQ6IHtwYXRoOicjL215cGF0aCcsIHZlcmI6J2dldCd9fSk7IC8vPT4gZmFsc2VcbiAgICAgICAgLy8gICAgIC8vIG1hdGNoIG11bHRpcGxlIHBhdGhzXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtwYXRoOiBbJyMvbXlwYXRoJywgJyMvb3RoZXJwYXRoJ119KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtwYXRoOiBbJyMvb3RoZXJwYXRoJywgJyMvdGhpcmRwYXRoJ119KTsgLy89PiBmYWxzZVxuICAgICAgICAvLyAgICAgLy8gZXF1aXZhbGVudCB0b1xuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7b25seToge3BhdGg6IFsnIy9teXBhdGgnLCAnIy9vdGhlcnBhdGgnXX19KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtvbmx5OiB7cGF0aDogWycjL290aGVycGF0aCcsICcjL3RoaXJkcGF0aCddfX0pOyAvLz0+IGZhbHNlXG4gICAgICAgIC8vICAgICAvLyBtYXRjaCBhbGwgZXhjZXB0IG11bHRpcGxlIHBhdGhzXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtleGNlcHQ6IHtwYXRoOiBbJyMvbXlwYXRoJywgJyMvb3RoZXJwYXRoJ119fSk7IC8vPT4gZmFsc2VcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge2V4Y2VwdDoge3BhdGg6IFsnIy9vdGhlcnBhdGgnLCAnIy90aGlyZHBhdGgnXX19KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICAvLyBtYXRjaCBhbGwgZXhjZXB0IG11bHRpcGxlIHBhdGhzIGFuZCB2ZXJic1xuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7ZXhjZXB0OiB7cGF0aDogWycjL215cGF0aCcsICcjL290aGVycGF0aCddLCB2ZXJiOiBbJ2dldCcsICdwb3N0J119fSk7IC8vPT4gZmFsc2VcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge2V4Y2VwdDoge3BhdGg6IFsnIy9vdGhlcnBhdGgnLCAnIy90aGlyZHBhdGgnXSwgdmVyYjogWydnZXQnLCAncG9zdCddfX0pOyAvLz0+IHRydWVcbiAgICAgICAgLy9cbiAgICAgICAgY29udGV4dE1hdGNoZXNPcHRpb25zOiBmdW5jdGlvbihjb250ZXh0LCBtYXRjaF9vcHRpb25zLCBwb3NpdGl2ZSkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBtYXRjaF9vcHRpb25zO1xuICAgICAgICAgICAgLy8gbm9ybWFsaXplIG9wdGlvbnNcbiAgICAgICAgICAgIGlmKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyB8fCBfaXNSZWdFeHAob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0geyBwYXRoOiBvcHRpb25zIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0eXBlb2YgcG9zaXRpdmUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZW1wdHkgb3B0aW9ucyBhbHdheXMgbWF0Y2hcbiAgICAgICAgICAgIGlmKCQuaXNFbXB0eU9iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG8gd2UgaGF2ZSB0byBtYXRjaCBhZ2FpbnN0IG11bHRpcGxlIHBhdGhzP1xuICAgICAgICAgICAgaWYoX2lzQXJyYXkob3B0aW9ucy5wYXRoKSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzLCBudW1vcHQsIG9wdHMsIGxlbjtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgZm9yKG51bW9wdCA9IDAsIGxlbiA9IG9wdGlvbnMucGF0aC5sZW5ndGg7IG51bW9wdCA8IGxlbjsgbnVtb3B0ICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IHBhdGg6IG9wdGlvbnMucGF0aFtudW1vcHRdIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwgb3B0cykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlZCA9ICQuaW5BcnJheSh0cnVlLCByZXN1bHRzKSA+IC0xID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGl2ZSA/IG1hdGNoZWQgOiAhbWF0Y2hlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG9wdGlvbnMub25seSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCBvcHRpb25zLm9ubHksIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKG9wdGlvbnMuZXhjZXB0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIG9wdGlvbnMuZXhjZXB0LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcGF0aF9tYXRjaGVkID0gdHJ1ZSwgdmVyYl9tYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKG9wdGlvbnMucGF0aCkge1xuICAgICAgICAgICAgICAgIGlmKCFfaXNSZWdFeHAob3B0aW9ucy5wYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBhdGggPSBuZXcgUmVnRXhwKG9wdGlvbnMucGF0aC50b1N0cmluZygpICsgJyQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGF0aF9tYXRjaGVkID0gb3B0aW9ucy5wYXRoLnRlc3QoY29udGV4dC5wYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG9wdGlvbnMudmVyYikge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBvcHRpb25zLnZlcmIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZlcmJfbWF0Y2hlZCA9IG9wdGlvbnMudmVyYiA9PT0gY29udGV4dC52ZXJiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZlcmJfbWF0Y2hlZCA9IG9wdGlvbnMudmVyYi5pbmRleE9mKGNvbnRleHQudmVyYikgPiAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpdmUgPyAodmVyYl9tYXRjaGVkICYmIHBhdGhfbWF0Y2hlZCkgOiAhKHZlcmJfbWF0Y2hlZCAmJiBwYXRoX21hdGNoZWQpO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgLy8gRGVsZWdhdGVzIHRvIHRoZSBgbG9jYXRpb25fcHJveHlgIHRvIGdldCB0aGUgY3VycmVudCBsb2NhdGlvbi5cbiAgICAgICAgLy8gU2VlIGBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eWAgZm9yIG1vcmUgaW5mbyBvbiBsb2NhdGlvbiBwcm94aWVzLlxuICAgICAgICBnZXRMb2NhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYXRpb25fcHJveHkuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBEZWxlZ2F0ZXMgdG8gdGhlIGBsb2NhdGlvbl9wcm94eWAgdG8gc2V0IHRoZSBjdXJyZW50IGxvY2F0aW9uLlxuICAgICAgICAvLyBTZWUgYFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5YCBmb3IgbW9yZSBpbmZvIG9uIGxvY2F0aW9uIHByb3hpZXMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBBcmd1bWVudHNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gKiBgbmV3X2xvY2F0aW9uYCBBIG5ldyBsb2NhdGlvbiBzdHJpbmcgKGUuZy4gJyMvJylcbiAgICAgICAgLy9cbiAgICAgICAgc2V0TG9jYXRpb246IGZ1bmN0aW9uKG5ld19sb2NhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uX3Byb3h5LnNldExvY2F0aW9uKG5ld19sb2NhdGlvbik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU3dhcHMgdGhlIGNvbnRlbnQgb2YgYCRlbGVtZW50KClgIHdpdGggYGNvbnRlbnRgXG4gICAgICAgIC8vIFlvdSBjYW4gb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcHJvdmlkZSBhbiBhbHRlcm5hdGUgc3dhcCBiZWhhdmlvclxuICAgICAgICAvLyBmb3IgYEV2ZW50Q29udGV4dC5wYXJ0aWFsKClgLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHZhciBhcHAgPSAkLnNhbW15KGZ1bmN0aW9uKCkge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgLy8gaW1wbGVtZW50cyBhICdmYWRlIG91dCcvJ2ZhZGUgaW4nXG4gICAgICAgIC8vICAgICAgICB0aGlzLnN3YXAgPSBmdW5jdGlvbihjb250ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAvLyAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIC8vICAgICAgICAgIGNvbnRleHQuJGVsZW1lbnQoKS5mYWRlT3V0KCdzbG93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgY29udGV4dC4kZWxlbWVudCgpLmh0bWwoY29udGVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgY29udGV4dC4kZWxlbWVudCgpLmZhZGVJbignc2xvdycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgfTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgc3dhcDogZnVuY3Rpb24oY29udGVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciAkZWwgPSB0aGlzLiRlbGVtZW50KCkuaHRtbChjb250ZW50KTtcbiAgICAgICAgICAgIGlmKF9pc0Z1bmN0aW9uKGNhbGxiYWNrKSkgeyBjYWxsYmFjayhjb250ZW50KTsgfVxuICAgICAgICAgICAgcmV0dXJuICRlbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBhIHNpbXBsZSBnbG9iYWwgY2FjaGUgZm9yIHRlbXBsYXRlcy4gVXNlcyB0aGUgc2FtZSBzZW1hbnRpY3MgYXNcbiAgICAgICAgLy8gYFNhbW15LkNhY2hlYCBhbmQgYFNhbW15LlN0b3JhZ2VgIHNvIGNhbiBlYXNpbHkgYmUgcmVwbGFjZWQgd2l0aFxuICAgICAgICAvLyBhIHBlcnNpc3RlbnQgc3RvcmFnZSB0aGF0IGxhc3RzIGJleW9uZCB0aGUgY3VycmVudCByZXF1ZXN0LlxuICAgICAgICB0ZW1wbGF0ZUNhY2hlOiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RlbXBsYXRlX2NhY2hlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90ZW1wbGF0ZV9jYWNoZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGNsZWFyIHRoZSB0ZW1wbGF0ZUNhY2hlXG4gICAgICAgIGNsZWFyVGVtcGxhdGVDYWNoZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKF90ZW1wbGF0ZV9jYWNoZSA9IHt9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGlzIHRocm93cyBhICc0MDQgTm90IEZvdW5kJyBlcnJvciBieSBpbnZva2luZyBgZXJyb3IoKWAuXG4gICAgICAgIC8vIE92ZXJyaWRlIHRoaXMgbWV0aG9kIG9yIGBlcnJvcigpYCB0byBwcm92aWRlIGN1c3RvbVxuICAgICAgICAvLyA0MDQgYmVoYXZpb3IgKGkuZSByZWRpcmVjdGluZyB0byAvIG9yIHNob3dpbmcgYSB3YXJuaW5nKVxuICAgICAgICBub3RGb3VuZDogZnVuY3Rpb24odmVyYiwgcGF0aCkge1xuICAgICAgICAgICAgdmFyIHJldCA9IHRoaXMuZXJyb3IoWyc0MDQgTm90IEZvdW5kJywgdmVyYiwgcGF0aF0uam9pbignICcpKTtcbiAgICAgICAgICAgIHJldHVybiAodmVyYiA9PT0gJ2dldCcpID8gcmV0IDogdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGUgYmFzZSBlcnJvciBoYW5kbGVyIHRha2VzIGEgc3RyaW5nIGBtZXNzYWdlYCBhbmQgYW4gYEVycm9yYFxuICAgICAgICAvLyBvYmplY3QuIElmIGByYWlzZV9lcnJvcnNgIGlzIHNldCB0byBgdHJ1ZWAgb24gdGhlIGFwcCBsZXZlbCxcbiAgICAgICAgLy8gdGhpcyB3aWxsIHJlLXRocm93IHRoZSBlcnJvciB0byB0aGUgYnJvd3Nlci4gT3RoZXJ3aXNlIGl0IHdpbGwgc2VuZCB0aGUgZXJyb3JcbiAgICAgICAgLy8gdG8gYGxvZygpYC4gT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcHJvdmlkZSBjdXN0b20gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgLy8gZS5nIGxvZ2dpbmcgdG8gYSBzZXJ2ZXIgc2lkZSBjb21wb25lbnQgb3IgZGlzcGxheWluZyBzb21lIGZlZWRiYWNrIHRvIHRoZVxuICAgICAgICAvLyB1c2VyLlxuICAgICAgICBlcnJvcjogZnVuY3Rpb24obWVzc2FnZSwgb3JpZ2luYWxfZXJyb3IpIHtcbiAgICAgICAgICAgIGlmKCFvcmlnaW5hbF9lcnJvcikgeyBvcmlnaW5hbF9lcnJvciA9IG5ldyBFcnJvcigpOyB9XG4gICAgICAgICAgICBvcmlnaW5hbF9lcnJvci5tZXNzYWdlID0gW21lc3NhZ2UsIG9yaWdpbmFsX2Vycm9yLm1lc3NhZ2VdLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZXJyb3InLCB7IG1lc3NhZ2U6IG9yaWdpbmFsX2Vycm9yLm1lc3NhZ2UsIGVycm9yOiBvcmlnaW5hbF9lcnJvciB9KTtcbiAgICAgICAgICAgIGlmKHRoaXMucmFpc2VfZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgKG9yaWdpbmFsX2Vycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cob3JpZ2luYWxfZXJyb3IubWVzc2FnZSwgb3JpZ2luYWxfZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9jaGVja0xvY2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiwgcmV0dXJuZWQ7XG4gICAgICAgICAgICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICAgICAgICAgICAgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICAvLyBjb21wYXJlIHRvIHNlZSBpZiBoYXNoIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICBpZighdGhpcy5sYXN0X2xvY2F0aW9uIHx8IHRoaXMubGFzdF9sb2NhdGlvblswXSAhPSAnZ2V0JyB8fCB0aGlzLmxhc3RfbG9jYXRpb25bMV0gIT0gbG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAvLyByZXNldCBsYXN0IGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0X2xvY2F0aW9uID0gWydnZXQnLCBsb2NhdGlvbl07XG4gICAgICAgICAgICAgICAgLy8gbG9va3VwIHJvdXRlIGZvciBjdXJyZW50IGhhc2hcbiAgICAgICAgICAgICAgICByZXR1cm5lZCA9IHRoaXMucnVuUm91dGUoJ2dldCcsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICAgICAgfSxcblxuICAgICAgICBfZ2V0Rm9ybVZlcmI6IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICAgICAgICAgIHZhciAkZm9ybSA9ICQoZm9ybSksIHZlcmIsICRfbWV0aG9kO1xuICAgICAgICAgICAgJF9tZXRob2QgPSAkZm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiX21ldGhvZFwiXScpO1xuICAgICAgICAgICAgaWYoJF9tZXRob2QubGVuZ3RoID4gMCkgeyB2ZXJiID0gJF9tZXRob2QudmFsKCk7IH1cbiAgICAgICAgICAgIGlmKCF2ZXJiKSB7IHZlcmIgPSAkZm9ybVswXS5nZXRBdHRyaWJ1dGUoJ21ldGhvZCcpOyB9XG4gICAgICAgICAgICBpZighdmVyYiB8fCB2ZXJiID09PSAnJykgeyB2ZXJiID0gJ2dldCc7IH1cbiAgICAgICAgICAgIHJldHVybiAkLnRyaW0odmVyYi50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9jaGVja0Zvcm1TdWJtaXNzaW9uOiBmdW5jdGlvbihmb3JtKSB7XG4gICAgICAgICAgICB2YXIgJGZvcm0sIHBhdGgsIHZlcmIsIHBhcmFtcywgcmV0dXJuZWQ7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2NoZWNrLWZvcm0tc3VibWlzc2lvbicsIHsgZm9ybTogZm9ybSB9KTtcbiAgICAgICAgICAgICRmb3JtID0gJChmb3JtKTtcbiAgICAgICAgICAgIHBhdGggPSAkZm9ybS5hdHRyKCdhY3Rpb24nKSB8fCAnJztcbiAgICAgICAgICAgIHZlcmIgPSB0aGlzLl9nZXRGb3JtVmVyYigkZm9ybSk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnX2NoZWNrRm9ybVN1Ym1pc3Npb24nLCAkZm9ybSwgcGF0aCwgdmVyYik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZlcmIgPT09ICdnZXQnKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gdGhpcy5fc2VyaWFsaXplRm9ybVBhcmFtcygkZm9ybSk7XG4gICAgICAgICAgICAgICAgaWYocGFyYW1zICE9PSAnJykgeyBwYXRoICs9ICc/JyArIHBhcmFtczsgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYXRpb24ocGF0aCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gJC5leHRlbmQoe30sIHRoaXMuX3BhcnNlRm9ybVBhcmFtcygkZm9ybSkpO1xuICAgICAgICAgICAgICAgIHJldHVybmVkID0gdGhpcy5ydW5Sb3V0ZSh2ZXJiLCBwYXRoLCBwYXJhbXMsIGZvcm0uZ2V0KDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIHJldHVybmVkID09ICd1bmRlZmluZWQnKSA/IGZhbHNlIDogcmV0dXJuZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3NlcmlhbGl6ZUZvcm1QYXJhbXM6IGZ1bmN0aW9uKCRmb3JtKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlTdHJpbmcgPSBcIlwiLFxuICAgICAgICAgICAgICBmaWVsZHMgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpLFxuICAgICAgICAgICAgICBpO1xuICAgICAgICAgICAgaWYoZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHRoaXMuX2VuY29kZUZvcm1QYWlyKGZpZWxkc1swXS5uYW1lLCBmaWVsZHNbMF0udmFsdWUpO1xuICAgICAgICAgICAgICAgIGZvcihpID0gMTsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nICsgXCImXCIgKyB0aGlzLl9lbmNvZGVGb3JtUGFpcihmaWVsZHNbaV0ubmFtZSwgZmllbGRzW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcXVlcnlTdHJpbmc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2VuY29kZUZvcm1QYWlyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9lbmNvZGUobmFtZSkgKyBcIj1cIiArIF9lbmNvZGUodmFsdWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9wYXJzZUZvcm1QYXJhbXM6IGZ1bmN0aW9uKCRmb3JtKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge30sXG4gICAgICAgICAgICAgICAgZm9ybV9maWVsZHMgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpLFxuICAgICAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBmb3JtX2ZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHRoaXMuX3BhcnNlUGFyYW1QYWlyKHBhcmFtcywgZm9ybV9maWVsZHNbaV0ubmFtZSwgZm9ybV9maWVsZHNbaV0udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgfSxcblxuICAgICAgICBfcGFyc2VRdWVyeVN0cmluZzogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9LCBwYXJ0cywgcGFpcnMsIHBhaXIsIGk7XG5cbiAgICAgICAgICAgIHBhcnRzID0gcGF0aC5tYXRjaChRVUVSWV9TVFJJTkdfTUFUQ0hFUik7XG4gICAgICAgICAgICBpZihwYXJ0cyAmJiBwYXJ0c1sxXSkge1xuICAgICAgICAgICAgICAgIHBhaXJzID0gcGFydHNbMV0uc3BsaXQoJyYnKTtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gdGhpcy5fcGFyc2VQYXJhbVBhaXIocGFyYW1zLCBfZGVjb2RlKHBhaXJbMF0pLCBfZGVjb2RlKHBhaXJbMV0gfHwgXCJcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3BhcnNlUGFyYW1QYWlyOiBmdW5jdGlvbihwYXJhbXMsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBwYXJhbXNba2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZihfaXNBcnJheShwYXJhbXNba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gPSBbcGFyYW1zW2tleV0sIHZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9saXN0ZW46IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudCgpLmJpbmQoW25hbWUsIHRoaXMuZXZlbnROYW1lc3BhY2UoKV0uam9pbignLicpLCBjYWxsYmFjayk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3VubGlzdGVuOiBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQoKS51bmJpbmQoW25hbWUsIHRoaXMuZXZlbnROYW1lc3BhY2UoKV0uam9pbignLicpLCBjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gYFNhbW15LlJlbmRlckNvbnRleHRgIGlzIGFuIG9iamVjdCB0aGF0IG1ha2VzIHNlcXVlbnRpYWwgdGVtcGxhdGUgbG9hZGluZyxcbiAgICAvLyByZW5kZXJpbmcgYW5kIGludGVycG9sYXRpb24gc2VhbWxlc3MgZXZlbiB3aGVuIGRlYWxpbmcgd2l0aCBhc3luY2hyb25vdXNcbiAgICAvLyBvcGVyYXRpb25zLlxuICAgIC8vXG4gICAgLy8gYFJlbmRlckNvbnRleHRgIG9iamVjdHMgYXJlIG5vdCB1c3VhbGx5IGNyZWF0ZWQgZGlyZWN0bHksIHJhdGhlciB0aGV5IGFyZVxuICAgIC8vIGluc3RhbnRpYXRlZCBmcm9tIGFuIGBTYW1teS5FdmVudENvbnRleHRgIGJ5IHVzaW5nIGByZW5kZXIoKWAsIGBsb2FkKClgIG9yXG4gICAgLy8gYHBhcnRpYWwoKWAgd2hpY2ggYWxsIHJldHVybiBgUmVuZGVyQ29udGV4dGAgb2JqZWN0cy5cbiAgICAvL1xuICAgIC8vIGBSZW5kZXJDb250ZXh0YCBtZXRob2RzIGFsd2F5cyByZXR1cm5zIGEgbW9kaWZpZWQgYFJlbmRlckNvbnRleHRgXG4gICAgLy8gZm9yIGNoYWluaW5nIChsaWtlIGpRdWVyeSBpdHNlbGYpLlxuICAgIC8vXG4gICAgLy8gVGhlIGNvcmUgbWFnaWMgaXMgaW4gdGhlIGB0aGVuKClgIG1ldGhvZCB3aGljaCBwdXRzIHRoZSBjYWxsYmFjayBwYXNzZWQgYXNcbiAgICAvLyBhbiBhcmd1bWVudCBpbnRvIGEgcXVldWUgdG8gYmUgZXhlY3V0ZWQgb25jZSB0aGUgcHJldmlvdXMgY2FsbGJhY2sgaXMgY29tcGxldGUuXG4gICAgLy8gQWxsIHRoZSBtZXRob2RzIG9mIGBSZW5kZXJDb250ZXh0YCBhcmUgd3JhcHBlZCBpbiBgdGhlbigpYCB3aGljaCBhbGxvd3MgeW91XG4gICAgLy8gdG8gcXVldWUgdXAgbWV0aG9kcyBieSBjaGFpbmluZywgYnV0IG1haW50YWluaW5nIGEgZ3VhcmFudGVlZCBleGVjdXRpb24gb3JkZXJcbiAgICAvLyBldmVuIHdpdGggcmVtb3RlIGNhbGxzIHRvIGZldGNoIHRlbXBsYXRlcy5cbiAgICAvL1xuICAgIFNhbW15LlJlbmRlckNvbnRleHQgPSBmdW5jdGlvbihldmVudF9jb250ZXh0KSB7XG4gICAgICAgIHRoaXMuZXZlbnRfY29udGV4dCA9IGV2ZW50X2NvbnRleHQ7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIHRoaXMucHJldmlvdXNfY29udGVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dF9lbmdpbmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53YWl0aW5nID0gZmFsc2U7XG4gICAgfTtcblxuICAgIFNhbW15LlJlbmRlckNvbnRleHQucHJvdG90eXBlID0gJC5leHRlbmQoe30sIFNhbW15Lk9iamVjdC5wcm90b3R5cGUsIHtcblxuICAgICAgICAvLyBUaGUgXCJjb3JlXCIgb2YgdGhlIGBSZW5kZXJDb250ZXh0YCBvYmplY3QsIGFkZHMgdGhlIGBjYWxsYmFja2AgdG8gdGhlXG4gICAgICAgIC8vIHF1ZXVlLiBJZiB0aGUgY29udGV4dCBpcyBgd2FpdGluZ2AgKG1lYW5pbmcgYW4gYXN5bmMgb3BlcmF0aW9uIGlzIGhhcHBlbmluZylcbiAgICAgICAgLy8gdGhlbiB0aGUgY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZCBpbiBvcmRlciwgb25jZSB0aGUgb3RoZXIgb3BlcmF0aW9ucyBhcmVcbiAgICAgICAgLy8gY29tcGxldGUuIElmIHRoZXJlIGlzIG5vIGN1cnJlbnRseSBleGVjdXRpbmcgb3BlcmF0aW9uLCB0aGUgYGNhbGxiYWNrYFxuICAgICAgICAvLyBpcyBleGVjdXRlZCBpbW1lZGlhdGVseS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIHZhbHVlIHJldHVybmVkIGZyb20gdGhlIGNhbGxiYWNrIGlzIHN0b3JlZCBpbiBgY29udGVudGAgZm9yIHRoZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IG9wZXJhdGlvbi4gSWYgeW91IHJldHVybiBgZmFsc2VgLCB0aGUgcXVldWUgd2lsbCBwYXVzZSwgYW5kXG4gICAgICAgIC8vIHRoZSBuZXh0IGNhbGxiYWNrIGluIHRoZSBxdWV1ZSB3aWxsIG5vdCBiZSBleGVjdXRlZCB1bnRpbCBgbmV4dCgpYCBpc1xuICAgICAgICAvLyBjYWxsZWQuIFRoaXMgYWxsb3dzIGZvciB0aGUgZ3VhcmFudGVlZCBvcmRlciBvZiBleGVjdXRpb24gd2hpbGUgd29ya2luZ1xuICAgICAgICAvLyB3aXRoIGFzeW5jIG9wZXJhdGlvbnMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIElmIHRoZW4oKSBpcyBwYXNzZWQgYSBzdHJpbmcgaW5zdGVhZCBvZiBhIGZ1bmN0aW9uLCB0aGUgc3RyaW5nIGlzIGxvb2tlZFxuICAgICAgICAvLyB1cCBhcyBhIGhlbHBlciBtZXRob2Qgb24gdGhlIGV2ZW50IGNvbnRleHQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgdGhpcy5nZXQoJyMvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBSZW5kZXJDb250ZXh0XG4gICAgICAgIC8vICAgICAgICAvLyBFdmVuIHRob3VnaCBgbG9hZCgpYCBleGVjdXRlcyBhc3luYywgdGhlIG5leHQgYHRoZW4oKWBcbiAgICAgICAgLy8gICAgICAgIC8vIHdvbnQgZXhlY3V0ZSB1bnRpbCB0aGUgbG9hZCBmaW5pc2hlc1xuICAgICAgICAvLyAgICAgICAgdGhpcy5sb2FkKCdteWZpbGUudHh0JylcbiAgICAgICAgLy8gICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlbiBpcyB0aGUgY29udGVudCBvZiB0aGVcbiAgICAgICAgLy8gICAgICAgICAgICAgIC8vIHByZXYgb3BlcmF0aW9uXG4gICAgICAgIC8vICAgICAgICAgICAgICAkKCcjbWFpbicpLmh0bWwoY29udGVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoZW46IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZighX2lzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgYSBzdHJpbmcgaXMgcGFzc2VkIHRvIHRoZW4sIGFzc3VtZSB3ZSB3YW50IHRvIGNhbGxcbiAgICAgICAgICAgICAgICAvLyBhIGhlbHBlciBvbiB0aGUgZXZlbnQgY29udGV4dCBpbiBpdHMgY29udGV4dFxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycgJiYgY2FsbGJhY2sgaW4gdGhpcy5ldmVudF9jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWxwZXIgPSB0aGlzLmV2ZW50X2NvbnRleHRbY2FsbGJhY2tdO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWxwZXIuYXBwbHkodGhpcy5ldmVudF9jb250ZXh0LCBbY29udGVudF0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIGlmKHRoaXMud2FpdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhaXQoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybmVkID0gY2FsbGJhY2suYXBwbHkoY29udGV4dCwgW2NvbnRleHQuY29udGVudCwgY29udGV4dC5wcmV2aW91c19jb250ZW50XSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHVybmVkICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5uZXh0KHJldHVybmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUGF1c2UgdGhlIGBSZW5kZXJDb250ZXh0YCBxdWV1ZS4gQ29tYmluZWQgd2l0aCBgbmV4dCgpYCBhbGxvd3MgZm9yIGFzeW5jXG4gICAgICAgIC8vIG9wZXJhdGlvbnMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICB0aGlzLmdldCgnIy8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgICAgdGhpcy5sb2FkKCdteXRleHQuanNvbicpXG4gICAgICAgIC8vICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcyxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRhdGEgICAgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBwYXVzZSBleGVjdXRpb25cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY29udGV4dC53YWl0KCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHBvc3QgdG8gYSB1cmxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgJC5wb3N0KGRhdGEudXJsLCB7fSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICBjb250ZXh0Lm5leHQoSlNPTi5wYXJzZShyZXNwb25zZSkpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgIH0pXG4gICAgICAgIC8vICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIGRhdGEgaXMganNvbiBmcm9tIHRoZSBwcmV2aW91cyBwb3N0XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICQoJyNtZXNzYWdlJykudGV4dChkYXRhLnN0YXR1cyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICB3YWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMud2FpdGluZyA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmVzdW1lIHRoZSBxdWV1ZSwgc2V0dGluZyBgY29udGVudGAgdG8gYmUgdXNlZCBpbiB0aGUgbmV4dCBvcGVyYXRpb24uXG4gICAgICAgIC8vIFNlZSBgd2FpdCgpYCBmb3IgYW4gZXhhbXBsZS5cbiAgICAgICAgbmV4dDogZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZih0eXBlb2YgY29udGVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzX2NvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuY2FsbGJhY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW4odGhpcy5jYWxsYmFja3Muc2hpZnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTG9hZCBhIHRlbXBsYXRlIGludG8gdGhlIGNvbnRleHQuXG4gICAgICAgIC8vIFRoZSBgbG9jYXRpb25gIGNhbiBlaXRoZXIgYmUgYSBzdHJpbmcgc3BlY2lmeWluZyB0aGUgcmVtb3RlIHBhdGggdG8gdGhlXG4gICAgICAgIC8vIGZpbGUsIGEgalF1ZXJ5IG9iamVjdCwgb3IgYSBET00gZWxlbWVudC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gTm8gaW50ZXJwb2xhdGlvbiBoYXBwZW5zIGJ5IGRlZmF1bHQsIHRoZSBjb250ZW50IGlzIHN0b3JlZCBpblxuICAgICAgICAvLyBgY29udGVudGAuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGEgcGF0aCwgdW5sZXNzIHRoZSBvcHRpb24gYHtjYWNoZTogZmFsc2V9YCBpcyBwYXNzZWQgdGhlXG4gICAgICAgIC8vIGRhdGEgaXMgc3RvcmVkIGluIHRoZSBhcHAncyBgdGVtcGxhdGVDYWNoZSgpYC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgYSBqUXVlcnkgb3IgRE9NIG9iamVjdCBpcyBwYXNzZWQgdGhlIGBpbm5lckhUTUxgIG9mIHRoZSBub2RlIGlzIHB1bGxlZCBpbi5cbiAgICAgICAgLy8gVGhpcyBpcyB1c2VmdWwgZm9yIG5lc3RpbmcgdGVtcGxhdGVzIGFzIHBhcnQgb2YgdGhlIGluaXRpYWwgcGFnZSBsb2FkIHdyYXBwZWRcbiAgICAgICAgLy8gaW4gaW52aXNpYmxlIGVsZW1lbnRzIG9yIGA8c2NyaXB0PmAgdGFncy4gV2l0aCB0ZW1wbGF0ZSBwYXRocywgdGhlIHRlbXBsYXRlXG4gICAgICAgIC8vIGVuZ2luZSBpcyBsb29rZWQgdXAgYnkgdGhlIGV4dGVuc2lvbi4gRm9yIERPTS9qUXVlcnkgZW1iZWRkZWQgdGVtcGxhdGVzLFxuICAgICAgICAvLyB0aGlzIGlzbnQgcG9zc2libGUsIHNvIHRoZXJlIGFyZSBhIGNvdXBsZSBvZiBvcHRpb25zOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgKiBwYXNzIGFuIGB7ZW5naW5lOn1gIG9wdGlvbi5cbiAgICAgICAgLy8gICogZGVmaW5lIHRoZSBlbmdpbmUgaW4gdGhlIGBkYXRhLWVuZ2luZWAgYXR0cmlidXRlIG9mIHRoZSBwYXNzZWQgbm9kZS5cbiAgICAgICAgLy8gICoganVzdCBzdG9yZSB0aGUgcmF3IHRlbXBsYXRlIGRhdGEgYW5kIHVzZSBgaW50ZXJwb2xhdGUoKWAgbWFudWFsbHlcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgYSBgY2FsbGJhY2tgIGlzIHBhc3NlZCBpdCBpcyBleGVjdXRlZCBhZnRlciB0aGUgdGVtcGxhdGUgbG9hZC5cbiAgICAgICAgbG9hZDogZnVuY3Rpb24obG9jYXRpb24sIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBzaG91bGRfY2FjaGUsIGNhY2hlZCwgaXNfanNvbiwgbG9jYXRpb25fYXJyYXk7XG4gICAgICAgICAgICAgICAgaWYoX2lzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spIHsgdGhpcy50aGVuKGNhbGxiYWNrKTsgfVxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBhIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgaXNfanNvbiA9IChsb2NhdGlvbi5tYXRjaCgvXFwuanNvbihcXD98JCkvKSB8fCBvcHRpb25zLmpzb24pO1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRfY2FjaGUgPSBpc19qc29uID8gb3B0aW9ucy5jYWNoZSA9PT0gdHJ1ZSA6IG9wdGlvbnMuY2FjaGUgIT09IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm5leHRfZW5naW5lID0gY29udGV4dC5ldmVudF9jb250ZXh0LmVuZ2luZUZvcihsb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmNhY2hlO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5qc29uO1xuICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25zLmVuZ2luZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5uZXh0X2VuZ2luZSA9IG9wdGlvbnMuZW5naW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuZW5naW5lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNob3VsZF9jYWNoZSAmJiAoY2FjaGVkID0gdGhpcy5ldmVudF9jb250ZXh0LmFwcC50ZW1wbGF0ZUNhY2hlKGxvY2F0aW9uKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCgkLmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogaXNfanNvbiA/ICdqc29uJyA6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdnZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNob3VsZF9jYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmV2ZW50X2NvbnRleHQuYXBwLnRlbXBsYXRlQ2FjaGUobG9jYXRpb24sIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm5leHQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGl0J3MgYSBkb20valF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIGlmKGxvY2F0aW9uLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRpb24uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKGxvY2F0aW9uLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpdCdzIGEgalF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm5leHRfZW5naW5lID0gbG9jYXRpb24uYXR0cignZGF0YS1lbmdpbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMuY2xvbmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLnJlbW92ZSgpWzBdLmlubmVySFRNTC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRpb25bMF0uaW5uZXJIVE1MLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBMb2FkIHBhcnRpYWxzXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgdGhpcy5sb2FkUGFydGlhbHMoe215cGFydGlhbDogJy9wYXRoL3RvL3BhcnRpYWwnfSk7XG4gICAgICAgIC8vXG4gICAgICAgIGxvYWRQYXJ0aWFsczogZnVuY3Rpb24ocGFydGlhbHMpIHtcbiAgICAgICAgICAgIHZhciBuYW1lO1xuICAgICAgICAgICAgaWYocGFydGlhbHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpYWxzID0gdGhpcy5wYXJ0aWFscyB8fCB7fTtcbiAgICAgICAgICAgICAgICBmb3IobmFtZSBpbiBwYXJ0aWFscykge1xuICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24oY29udGV4dCwgbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5sb2FkKHBhcnRpYWxzW25hbWVdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFydGlhbHNbbmFtZV0gPSB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkodGhpcywgbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gYGxvYWQoKWAgYSB0ZW1wbGF0ZSBhbmQgdGhlbiBgaW50ZXJwb2xhdGUoKWAgaXQgd2l0aCBkYXRhLlxuICAgICAgICAvL1xuICAgICAgICAvLyBjYW4gYmUgY2FsbGVkIHdpdGggbXVsdGlwbGUgZGlmZmVyZW50IHNpZ25hdHVyZXM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgdGhpcy5yZW5kZXIoY2FsbGJhY2spO1xuICAgICAgICAvLyAgICAgIHRoaXMucmVuZGVyKCcvbG9jYXRpb24nKTtcbiAgICAgICAgLy8gICAgICB0aGlzLnJlbmRlcignL2xvY2F0aW9uJywge3NvbWU6IGRhdGF9KTtcbiAgICAgICAgLy8gICAgICB0aGlzLnJlbmRlcignL2xvY2F0aW9uJywgY2FsbGJhY2spO1xuICAgICAgICAvLyAgICAgIHRoaXMucmVuZGVyKCcvbG9jYXRpb24nLCB7c29tZTogZGF0YX0sIGNhbGxiYWNrKTtcbiAgICAgICAgLy8gICAgICB0aGlzLnJlbmRlcignL2xvY2F0aW9uJywge3NvbWU6IGRhdGF9LCB7bXk6IHBhcnRpYWxzfSk7XG4gICAgICAgIC8vICAgICAgdGhpcy5yZW5kZXIoJy9sb2NhdGlvbicsIGNhbGxiYWNrLCB7bXk6IHBhcnRpYWxzfSk7XG4gICAgICAgIC8vICAgICAgdGhpcy5yZW5kZXIoJy9sb2NhdGlvbicsIHtzb21lOiBkYXRhfSwgY2FsbGJhY2ssIHtteTogcGFydGlhbHN9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB0aGlzLmdldCgnIy8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMucmVuZGVyKCdteXRlbXBsYXRlLnRlbXBsYXRlJywge25hbWU6ICd0ZXN0J30pO1xuICAgICAgICAvLyAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKGxvY2F0aW9uLCBkYXRhLCBjYWxsYmFjaywgcGFydGlhbHMpIHtcbiAgICAgICAgICAgIGlmKF9pc0Z1bmN0aW9uKGxvY2F0aW9uKSAmJiAhZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vIGludm9rZWQgYXMgcmVuZGVyKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4obG9jYXRpb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihfaXNGdW5jdGlvbihkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbnZva2VkIGFzIHJlbmRlcihsb2NhdGlvbiwgY2FsbGJhY2ssIFtwYXJ0aWFsc10pXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpYWxzID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNhbGxiYWNrICYmICFfaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW52b2tlZCBhcyByZW5kZXIobG9jYXRpb24sIGRhdGEsIHBhcnRpYWxzKVxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWFscyA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZFBhcnRpYWxzKHBhcnRpYWxzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLmxvYWQobG9jYXRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdGUoZGF0YSwgbG9jYXRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gYHJlbmRlcigpYCB0aGUgYGxvY2F0aW9uYCB3aXRoIGBkYXRhYCBhbmQgdGhlbiBgc3dhcCgpYCB0aGVcbiAgICAgICAgLy8gYXBwJ3MgYCRlbGVtZW50YCB3aXRoIHRoZSByZW5kZXJlZCBjb250ZW50LlxuICAgICAgICBwYXJ0aWFsOiBmdW5jdGlvbihsb2NhdGlvbiwgZGF0YSwgY2FsbGJhY2ssIHBhcnRpYWxzKSB7XG4gICAgICAgICAgICBpZihfaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyBpbnZva2VkIGFzIHBhcnRpYWwobG9jYXRpb24sIGRhdGEsIGNhbGxiYWNrLCBbcGFydGlhbHNdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihsb2NhdGlvbiwgZGF0YSwgcGFydGlhbHMpLnN3YXAoY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIGlmKF9pc0Z1bmN0aW9uKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgLy8gaW52b2tlZCBhcyBwYXJ0aWFsKGxvY2F0aW9uLCBjYWxsYmFjaywgW3BhcnRpYWxzXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIobG9jYXRpb24sIHt9LCBjYWxsYmFjaykuc3dhcChkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaW52b2tlZCBhcyBwYXJ0aWFsKGxvY2F0aW9uLCBkYXRhLCBbcGFydGlhbHNdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihsb2NhdGlvbiwgZGF0YSwgY2FsbGJhY2spLnN3YXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBkZWZlcnMgdGhlIGNhbGwgb2YgZnVuY3Rpb24gdG8gb2NjdXIgaW4gb3JkZXIgb2YgdGhlIHJlbmRlciBxdWV1ZS5cbiAgICAgICAgLy8gVGhlIGZ1bmN0aW9uIGNhbiBhY2NlcHQgYW55IG51bWJlciBvZiBhcmd1bWVudHMgYXMgbG9uZyBhcyB0aGUgbGFzdFxuICAgICAgICAvLyBhcmd1bWVudCBpcyBhIGNhbGxiYWNrIGZ1bmN0aW9uLiBUaGlzIGlzIHVzZWZ1bCBmb3IgcHV0dGluZyBhcmJpdHJhcnlcbiAgICAgICAgLy8gYXN5bmNocm9ub3VzIGZ1bmN0aW9ucyBpbnRvIHRoZSBxdWV1ZS4gVGhlIGNvbnRlbnQgcGFzc2VkIHRvIHRoZVxuICAgICAgICAvLyBjYWxsYmFjayBpcyBwYXNzZWQgYXMgYGNvbnRlbnRgIHRvIHRoZSBuZXh0IGl0ZW0gaW4gdGhlIHF1ZXVlLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgdGhpcy5zZW5kKCQuZ2V0SlNPTiwgJy9hcHAuanNvbicpXG4gICAgICAgIC8vICAgICAgICAgLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAvLyAgICAgICAgICAgJCgnI21lc3NhZ2UpLnRleHQoanNvblsnbWVzc2FnZSddKTtcbiAgICAgICAgLy8gICAgICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MgPSBfbWFrZUFycmF5KGFyZ3VtZW50cyksXG4gICAgICAgICAgICAgICAgZnVuID0gYXJncy5zaGlmdCgpO1xuXG4gICAgICAgICAgICBpZihfaXNBcnJheShhcmdzWzBdKSkgeyBhcmdzID0gYXJnc1swXTsgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZnVuY3Rpb24ocmVzcG9uc2UpIHsgY29udGV4dC5uZXh0KHJlc3BvbnNlKTsgfSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC53YWl0KCk7XG4gICAgICAgICAgICAgICAgZnVuLmFwcGx5KGZ1biwgYXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gaXRlcmF0ZXMgb3ZlciBhbiBhcnJheSwgYXBwbHlpbmcgdGhlIGNhbGxiYWNrIGZvciBlYWNoIGl0ZW0gaXRlbS4gdGhlXG4gICAgICAgIC8vIGNhbGxiYWNrIHRha2VzIHRoZSBzYW1lIHN0eWxlIG9mIGFyZ3VtZW50cyBhcyBgalF1ZXJ5LmVhY2goKWAgKGluZGV4LCBpdGVtKS5cbiAgICAgICAgLy8gVGhlIHJldHVybiB2YWx1ZSBvZiBlYWNoIGNhbGxiYWNrIGlzIGNvbGxlY3RlZCBhcyBhIHNpbmdsZSBzdHJpbmcgYW5kIHN0b3JlZFxuICAgICAgICAvLyBhcyBgY29udGVudGAgdG8gYmUgdXNlZCBpbiB0aGUgbmV4dCBpdGVyYXRpb24gb2YgdGhlIGBSZW5kZXJDb250ZXh0YC5cbiAgICAgICAgY29sbGVjdDogZnVuY3Rpb24oYXJyYXksIGNhbGxiYWNrLCBub3cpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjb2xsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYoX2lzRnVuY3Rpb24oYXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gYXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5ID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgY29udGVudHMgPSBbXSwgZG9tcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICQuZWFjaChhcnJheSwgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuZWQgPSBjYWxsYmFjay5hcHBseShjb250ZXh0LCBbaSwgaXRlbV0pO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXR1cm5lZC5qcXVlcnkgJiYgcmV0dXJuZWQubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkID0gcmV0dXJuZWRbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBkb21zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250ZW50cy5wdXNoKHJldHVybmVkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBkb21zID8gY29udGVudHMgOiBjb250ZW50cy5qb2luKCcnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gbm93ID8gY29sbCgpIDogdGhpcy50aGVuKGNvbGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGxvYWRzIGEgdGVtcGxhdGUsIGFuZCB0aGVuIGludGVycG9sYXRlcyBpdCBmb3IgZWFjaCBpdGVtIGluIHRoZSBgZGF0YWBcbiAgICAgICAgLy8gYXJyYXkuIElmIGEgY2FsbGJhY2sgaXMgcGFzc2VkLCBpdCB3aWxsIGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggZWFjaFxuICAgICAgICAvLyBpdGVtIGluIHRoZSBhcnJheSBfYWZ0ZXJfIGludGVycG9sYXRpb25cbiAgICAgICAgcmVuZGVyRWFjaDogZnVuY3Rpb24obG9jYXRpb24sIG5hbWUsIGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZihfaXNBcnJheShuYW1lKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICAgICAgICAgICAgICBkYXRhID0gbmFtZTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQobG9jYXRpb24pLnRoZW4oZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICAgIHZhciByY3R4ID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZighZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2lzQXJyYXkodGhpcy5wcmV2aW91c19jb250ZW50KSA/IHRoaXMucHJldmlvdXNfY29udGVudCA6IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24oaSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZGF0YSA9IHt9LCBlbmdpbmUgPSB0aGlzLm5leHRfZW5naW5lIHx8IGxvY2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkYXRhW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkYXRhID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh2YWx1ZSwgcmN0eC5ldmVudF9jb250ZXh0LmludGVycG9sYXRlKGNvbnRlbnQsIGlkYXRhLCBlbmdpbmUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdChkYXRhLCBmdW5jdGlvbihpLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkYXRhID0ge30sIGVuZ2luZSA9IHRoaXMubmV4dF9lbmdpbmUgfHwgbG9jYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRhdGFbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50X2NvbnRleHQuaW50ZXJwb2xhdGUoY29udGVudCwgaWRhdGEsIGVuZ2luZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHVzZXMgdGhlIHByZXZpb3VzIGxvYWRlZCBgY29udGVudGAgYW5kIHRoZSBgZGF0YWAgb2JqZWN0IHRvIGludGVycG9sYXRlXG4gICAgICAgIC8vIGEgdGVtcGxhdGUuIGBlbmdpbmVgIGRlZmluZXMgdGhlIHRlbXBsYXRpbmcvaW50ZXJwb2xhdGlvbiBtZXRob2QvZW5naW5lXG4gICAgICAgIC8vIHRoYXQgc2hvdWxkIGJlIHVzZWQuIElmIGBlbmdpbmVgIGlzIG5vdCBwYXNzZWQsIHRoZSBgbmV4dF9lbmdpbmVgIGlzXG4gICAgICAgIC8vIHVzZWQuIElmIGByZXRhaW5gIGlzIGB0cnVlYCwgdGhlIGZpbmFsIGludGVycG9sYXRlZCBkYXRhIGlzIGFwcGVuZGVkIHRvXG4gICAgICAgIC8vIHRoZSBgcHJldmlvdXNfY29udGVudGAgaW5zdGVhZCBvZiBqdXN0IHJlcGxhY2luZyBpdC5cbiAgICAgICAgaW50ZXJwb2xhdGU6IGZ1bmN0aW9uKGRhdGEsIGVuZ2luZSwgcmV0YWluKSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGNvbnRlbnQsIHByZXYpIHtcbiAgICAgICAgICAgICAgICBpZighZGF0YSAmJiBwcmV2KSB7IGRhdGEgPSBwcmV2OyB9XG4gICAgICAgICAgICAgICAgaWYodGhpcy5uZXh0X2VuZ2luZSkge1xuICAgICAgICAgICAgICAgICAgICBlbmdpbmUgPSB0aGlzLm5leHRfZW5naW5lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRfZW5naW5lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciByZW5kZXJlZCA9IGNvbnRleHQuZXZlbnRfY29udGV4dC5pbnRlcnBvbGF0ZShjb250ZW50LCBkYXRhLCBlbmdpbmUsIHRoaXMucGFydGlhbHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXRhaW4gPyBwcmV2ICsgcmVuZGVyZWQgOiByZW5kZXJlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFN3YXAgdGhlIHJldHVybiBjb250ZW50cyBlbnN1cmluZyBvcmRlci4gU2VlIGBBcHBsaWNhdGlvbiNzd2FwYFxuICAgICAgICBzd2FwOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudF9jb250ZXh0LnN3YXAoY29udGVudCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgfSkudHJpZ2dlcignY2hhbmdlZCcsIHt9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBTYW1lIHVzYWdlIGFzIGBqUXVlcnkuZm4uYXBwZW5kVG8oKWAgYnV0IHVzZXMgYHRoZW4oKWAgdG8gZW5zdXJlIG9yZGVyXG4gICAgICAgIGFwcGVuZFRvOiBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcikuYXBwZW5kKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSkudHJpZ2dlcignY2hhbmdlZCcsIHt9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBTYW1lIHVzYWdlIGFzIGBqUXVlcnkuZm4ucHJlcGVuZFRvKClgIGJ1dCB1c2VzIGB0aGVuKClgIHRvIGVuc3VyZSBvcmRlclxuICAgICAgICBwcmVwZW5kVG86IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5wcmVwZW5kKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSkudHJpZ2dlcignY2hhbmdlZCcsIHt9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXBsYWNlcyB0aGUgYCQoc2VsZWN0b3IpYCB1c2luZyBgaHRtbCgpYCB3aXRoIHRoZSBwcmV2aW91c2x5IGxvYWRlZFxuICAgICAgICAvLyBgY29udGVudGBcbiAgICAgICAgcmVwbGFjZTogZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpLmh0bWwoY29udGVudCk7XG4gICAgICAgICAgICB9KS50cmlnZ2VyKCdjaGFuZ2VkJywge30pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHRyaWdnZXIgdGhlIGV2ZW50IGluIHRoZSBvcmRlciBvZiB0aGUgZXZlbnQgY29udGV4dC4gU2FtZSBzZW1hbnRpY3NcbiAgICAgICAgLy8gYXMgYFNhbW15LkV2ZW50Q29udGV4dCN0cmlnZ2VyKClgLiBJZiBkYXRhIGlzIG9taXR0ZWQsIGBjb250ZW50YFxuICAgICAgICAvLyBpcyBzZW50IGFzIGB7Y29udGVudDogY29udGVudH1gXG4gICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBkYXRhID09ICd1bmRlZmluZWQnKSB7IGRhdGEgPSB7IGNvbnRlbnQ6IGNvbnRlbnQgfTsgfVxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRfY29udGV4dC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gYFNhbW15LkV2ZW50Q29udGV4dGAgb2JqZWN0cyBhcmUgY3JlYXRlZCBldmVyeSB0aW1lIGEgcm91dGUgaXMgcnVuIG9yIGFcbiAgICAvLyBib3VuZCBldmVudCBpcyB0cmlnZ2VyZWQuIFRoZSBjYWxsYmFja3MgZm9yIHRoZXNlIGV2ZW50cyBhcmUgZXZhbHVhdGVkIHdpdGhpbiBhIGBTYW1teS5FdmVudENvbnRleHRgXG4gICAgLy8gVGhpcyB3aXRoaW4gdGhlc2UgY2FsbGJhY2tzIHRoZSBzcGVjaWFsIG1ldGhvZHMgb2YgYEV2ZW50Q29udGV4dGAgYXJlIGF2YWlsYWJsZS5cbiAgICAvL1xuICAgIC8vICMjIyBFeGFtcGxlXG4gICAgLy9cbiAgICAvLyAgICAgICAkLnNhbW15KGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgLy8gVGhlIGNvbnRleHQgaGVyZSBpcyB0aGlzIFNhbW15LkFwcGxpY2F0aW9uXG4gICAgLy8gICAgICAgICB0aGlzLmdldCgnIy86bmFtZScsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgICAvLyBUaGUgY29udGV4dCBoZXJlIGlzIGEgbmV3IFNhbW15LkV2ZW50Q29udGV4dFxuICAgIC8vICAgICAgICAgICBpZiAodGhpcy5wYXJhbXNbJ25hbWUnXSA9PSAnc2FtbXknKSB7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5wYXJ0aWFsKCduYW1lLmh0bWwuZXJiJywge25hbWU6ICdTYW1teSd9KTtcbiAgICAvLyAgICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJlZGlyZWN0KCcjL3NvbWV3aGVyZS1lbHNlJylcbiAgICAvLyAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgfSk7XG4gICAgLy9cbiAgICAvLyBJbml0aWFsaXplIGEgbmV3IEV2ZW50Q29udGV4dFxuICAgIC8vXG4gICAgLy8gIyMjIEFyZ3VtZW50c1xuICAgIC8vXG4gICAgLy8gKiBgYXBwYCBUaGUgYFNhbW15LkFwcGxpY2F0aW9uYCB0aGlzIGV2ZW50IGlzIGNhbGxlZCB3aXRoaW4uXG4gICAgLy8gKiBgdmVyYmAgVGhlIHZlcmIgaW52b2tlZCB0byBydW4gdGhpcyBjb250ZXh0L3JvdXRlLlxuICAgIC8vICogYHBhdGhgIFRoZSBzdHJpbmcgcGF0aCBpbnZva2VkIHRvIHJ1biB0aGlzIGNvbnRleHQvcm91dGUuXG4gICAgLy8gKiBgcGFyYW1zYCBBbiBPYmplY3Qgb2Ygb3B0aW9uYWwgcGFyYW1zIHRvIHBhc3MgdG8gdGhlIGNvbnRleHQuIElzIGNvbnZlcnRlZFxuICAgIC8vICAgdG8gYSBgU2FtbXkuT2JqZWN0YC5cbiAgICAvLyAqIGB0YXJnZXRgIGEgRE9NIGVsZW1lbnQgdGhhdCB0aGUgZXZlbnQgdGhhdCBob2xkcyB0aGlzIGNvbnRleHQgb3JpZ2luYXRlc1xuICAgIC8vICAgZnJvbS4gRm9yIHBvc3QsIHB1dCBhbmQgZGVsIHJvdXRlcywgdGhpcyBpcyB0aGUgZm9ybSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkXG4gICAgLy8gICB0aGUgcm91dGUuXG4gICAgLy9cbiAgICBTYW1teS5FdmVudENvbnRleHQgPSBmdW5jdGlvbihhcHAsIHZlcmIsIHBhdGgsIHBhcmFtcywgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgICAgICB0aGlzLnZlcmIgPSB2ZXJiO1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IG5ldyBTYW1teS5PYmplY3QocGFyYW1zKTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfTtcblxuICAgIFNhbW15LkV2ZW50Q29udGV4dC5wcm90b3R5cGUgPSAkLmV4dGVuZCh7fSwgU2FtbXkuT2JqZWN0LnByb3RvdHlwZSwge1xuXG4gICAgICAgIC8vIEEgc2hvcnRjdXQgdG8gdGhlIGFwcCdzIGAkZWxlbWVudCgpYFxuICAgICAgICAkZWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuJGVsZW1lbnQoX21ha2VBcnJheShhcmd1bWVudHMpLnNoaWZ0KCkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIExvb2sgdXAgYSB0ZW1wbGF0aW5nIGVuZ2luZSB3aXRoaW4gdGhlIGN1cnJlbnQgYXBwIGFuZCBjb250ZXh0LlxuICAgICAgICAvLyBgZW5naW5lYCBjYW4gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICogYSBmdW5jdGlvbjogc2hvdWxkIGNvbmZvcm0gdG8gYGZ1bmN0aW9uKGNvbnRlbnQsIGRhdGEpIHsgcmV0dXJuIGludGVycG9sYXRlZDsgfWBcbiAgICAgICAgLy8gKiBhIHRlbXBsYXRlIHBhdGg6ICd0ZW1wbGF0ZS5lanMnLCBsb29rcyB1cCB0aGUgZXh0ZW5zaW9uIHRvIG1hdGNoIHRvXG4gICAgICAgIC8vICAgdGhlIGBlanMoKWAgaGVscGVyXG4gICAgICAgIC8vICogYSBzdHJpbmcgcmVmZXJyaW5nIHRvIHRoZSBoZWxwZXI6IFwibXVzdGFjaGVcIiA9PiBgbXVzdGFjaGUoKWBcbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgbm8gZW5naW5lIGlzIGZvdW5kLCB1c2UgdGhlIGFwcCdzIGRlZmF1bHQgYHRlbXBsYXRlX2VuZ2luZWBcbiAgICAgICAgLy9cbiAgICAgICAgZW5naW5lRm9yOiBmdW5jdGlvbihlbmdpbmUpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgZW5naW5lX21hdGNoO1xuICAgICAgICAgICAgLy8gaWYgcGF0aCBpcyBhY3R1YWxseSBhbiBlbmdpbmUgZnVuY3Rpb24ganVzdCByZXR1cm4gaXRcbiAgICAgICAgICAgIGlmKF9pc0Z1bmN0aW9uKGVuZ2luZSkpIHsgcmV0dXJuIGVuZ2luZTsgfVxuICAgICAgICAgICAgLy8gbG9va3VwIGVuZ2luZSBuYW1lIGJ5IHBhdGggZXh0ZW5zaW9uXG4gICAgICAgICAgICBlbmdpbmUgPSAoZW5naW5lIHx8IGNvbnRleHQuYXBwLnRlbXBsYXRlX2VuZ2luZSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmKChlbmdpbmVfbWF0Y2ggPSBlbmdpbmUubWF0Y2goL1xcLihbXlxcLlxcP1xcI10rKShcXD98JCkvKSkpIHtcbiAgICAgICAgICAgICAgICBlbmdpbmUgPSBlbmdpbmVfbWF0Y2hbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZXQgdGhlIGVuZ2luZSB0byB0aGUgZGVmYXVsdCB0ZW1wbGF0ZSBlbmdpbmUgaWYgbm8gbWF0Y2ggaXMgZm91bmRcbiAgICAgICAgICAgIGlmKGVuZ2luZSAmJiBfaXNGdW5jdGlvbihjb250ZXh0W2VuZ2luZV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHRbZW5naW5lXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoY29udGV4dC5hcHAudGVtcGxhdGVfZW5naW5lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5naW5lRm9yKGNvbnRleHQuYXBwLnRlbXBsYXRlX2VuZ2luZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oY29udGVudCwgZGF0YSkgeyByZXR1cm4gY29udGVudDsgfTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyB1c2luZyB0aGUgdGVtcGxhdGUgYGVuZ2luZWAgZm91bmQgd2l0aCBgZW5naW5lRm9yKClgLCBpbnRlcnBvbGF0ZSB0aGVcbiAgICAgICAgLy8gYGRhdGFgIGludG8gYGNvbnRlbnRgXG4gICAgICAgIGludGVycG9sYXRlOiBmdW5jdGlvbihjb250ZW50LCBkYXRhLCBlbmdpbmUsIHBhcnRpYWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmVGb3IoZW5naW5lKS5hcHBseSh0aGlzLCBbY29udGVudCwgZGF0YSwgcGFydGlhbHNdKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDcmVhdGUgYW5kIHJldHVybiBhIGBTYW1teS5SZW5kZXJDb250ZXh0YCBjYWxsaW5nIGByZW5kZXIoKWAgb24gaXQuXG4gICAgICAgIC8vIExvYWRzIHRoZSB0ZW1wbGF0ZSBhbmQgaW50ZXJwb2xhdGUgdGhlIGRhdGEsIGhvd2V2ZXIgZG9lcyBub3QgYWN0dWFsXG4gICAgICAgIC8vIHBsYWNlIGl0IGluIHRoZSBET00uXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgLy8gbXl0ZW1wbGF0ZS5tdXN0YWNoZSA8ZGl2IGNsYXNzPVwibmFtZVwiPnt7bmFtZX19PC9kaXY+XG4gICAgICAgIC8vICAgICAgcmVuZGVyKCdteXRlbXBsYXRlLm11c3RhY2hlJywge25hbWU6ICdxdWlya2V5J30pO1xuICAgICAgICAvLyAgICAgIC8vIHNldHMgdGhlIGBjb250ZW50YCB0byA8ZGl2IGNsYXNzPVwibmFtZVwiPnF1aXJrZXk8L2Rpdj5cbiAgICAgICAgLy8gICAgICByZW5kZXIoJ215dGVtcGxhdGUubXVzdGFjaGUnLCB7bmFtZTogJ3F1aXJrZXknfSlcbiAgICAgICAgLy8gICAgICAgIC5hcHBlbmRUbygndWwnKTtcbiAgICAgICAgLy8gICAgICAvLyBhcHBlbmRzIHRoZSByZW5kZXJlZCBjb250ZW50IHRvICQoJ3VsJylcbiAgICAgICAgLy9cbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbihsb2NhdGlvbiwgZGF0YSwgY2FsbGJhY2ssIHBhcnRpYWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNhbW15LlJlbmRlckNvbnRleHQodGhpcykucmVuZGVyKGxvY2F0aW9uLCBkYXRhLCBjYWxsYmFjaywgcGFydGlhbHMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIGEgYFNhbW15LlJlbmRlckNvbnRleHRgIGNhbGxpbmcgYHJlbmRlckVhY2goKWAgb24gaXQuXG4gICAgICAgIC8vIExvYWRzIHRoZSB0ZW1wbGF0ZSBhbmQgaW50ZXJwb2xhdGVzIHRoZSBkYXRhIGZvciBlYWNoIGl0ZW0sXG4gICAgICAgIC8vIGhvd2V2ZXIgZG9lcyBub3QgYWN0dWFsbHkgcGxhY2UgaXQgaW4gdGhlIERPTS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gYG5hbWVgIGlzIGFuIG9wdGlvbmFsIHBhcmFtZXRlciAoaWYgaXQgaXMgYW4gYXJyYXksIGl0IGlzIHVzZWQgYXMgYGRhdGFgLFxuICAgICAgICAvLyBhbmQgdGhlIHRoaXJkIHBhcmFtZXRlciB1c2VkIGFzIGBjYWxsYmFja2AsIGlmIHNldCkuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIElmIGBkYXRhYCBpcyBub3QgcHJvdmlkZWQsIGNvbnRlbnQgZnJvbSB0aGUgcHJldmlvdXMgc3RlcCBpbiB0aGUgY2hhaW5cbiAgICAgICAgLy8gKGlmIGl0IGlzIGFuIGFycmF5KSBpcyB1c2VkLCBhbmQgYG5hbWVgIGlzIHVzZWQgYXMgdGhlIGtleSBmb3IgZWFjaFxuICAgICAgICAvLyBlbGVtZW50IG9mIHRoZSBhcnJheSAodXNlZnVsIGZvciByZWZlcmVuY2luZyBpbiB0ZW1wbGF0ZSkuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgLy8gbXl0ZW1wbGF0ZS5tdXN0YWNoZSA8ZGl2IGNsYXNzPVwibmFtZVwiPnt7bmFtZX19PC9kaXY+XG4gICAgICAgIC8vICAgICAgcmVuZGVyRWFjaCgnbXl0ZW1wbGF0ZS5tdXN0YWNoZScsIFt7bmFtZTogJ3F1aXJrZXknfSwge25hbWU6ICdlbmRvcid9XSlcbiAgICAgICAgLy8gICAgICAvLyBzZXRzIHRoZSBgY29udGVudGAgdG8gPGRpdiBjbGFzcz1cIm5hbWVcIj5xdWlya2V5PC9kaXY+PGRpdiBjbGFzcz1cIm5hbWVcIj5lbmRvcjwvZGl2PlxuICAgICAgICAvLyAgICAgIHJlbmRlckVhY2goJ215dGVtcGxhdGUubXVzdGFjaGUnLCBbe25hbWU6ICdxdWlya2V5J30sIHtuYW1lOiAnZW5kb3InfV0pLmFwcGVuZFRvKCd1bCcpO1xuICAgICAgICAvLyAgICAgIC8vIGFwcGVuZHMgdGhlIHJlbmRlcmVkIGNvbnRlbnQgdG8gJCgndWwnKVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIC8vIG5hbWVzLmpzb246IFtcInF1aXJrZXlcIiwgXCJlbmRvclwiXVxuICAgICAgICAvLyAgICAgIHRoaXMubG9hZCgnbmFtZXMuanNvbicpLnJlbmRlckVhY2goJ215dGVtcGxhdGUubXVzdGFjaGUnLCAnbmFtZScpLmFwcGVuZFRvKCd1bCcpO1xuICAgICAgICAvLyAgICAgIC8vIHVzZXMgdGhlIHRlbXBsYXRlIHRvIHJlbmRlciBlYWNoIGl0ZW0gaW4gdGhlIEpTT04gYXJyYXlcbiAgICAgICAgLy9cbiAgICAgICAgcmVuZGVyRWFjaDogZnVuY3Rpb24obG9jYXRpb24sIG5hbWUsIGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNhbW15LlJlbmRlckNvbnRleHQodGhpcykucmVuZGVyRWFjaChsb2NhdGlvbiwgbmFtZSwgZGF0YSwgY2FsbGJhY2spO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBgU2FtbXkuUmVuZGVyQ29udGV4dGAgY2FsbGluZyBgbG9hZCgpYCB3aXRoIGBsb2NhdGlvbmAgYW5kXG4gICAgICAgIC8vIGBvcHRpb25zYC4gQ2FsbGVkIHdpdGhvdXQgaW50ZXJwb2xhdGlvbiBvciBwbGFjZW1lbnQsIHRoaXMgYWxsb3dzIGZvclxuICAgICAgICAvLyBwcmVsb2FkaW5nL2NhY2hpbmcgdGhlIHRlbXBsYXRlcy5cbiAgICAgICAgbG9hZDogZnVuY3Rpb24obG9jYXRpb24sIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNhbW15LlJlbmRlckNvbnRleHQodGhpcykubG9hZChsb2NhdGlvbiwgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBgU2FtbXkuUmVuZGVyQ29udGV4dGAgY2FsbGluZyBgbG9hZFBhcnRpYWxzKClgIHdpdGggYHBhcnRpYWxzYC5cbiAgICAgICAgbG9hZFBhcnRpYWxzOiBmdW5jdGlvbihwYXJ0aWFscykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTYW1teS5SZW5kZXJDb250ZXh0KHRoaXMpLmxvYWRQYXJ0aWFscyhwYXJ0aWFscyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gYHJlbmRlcigpYCB0aGUgYGxvY2F0aW9uYCB3aXRoIGBkYXRhYCBhbmQgdGhlbiBgc3dhcCgpYCB0aGVcbiAgICAgICAgLy8gYXBwJ3MgYCRlbGVtZW50YCB3aXRoIHRoZSByZW5kZXJlZCBjb250ZW50LlxuICAgICAgICBwYXJ0aWFsOiBmdW5jdGlvbihsb2NhdGlvbiwgZGF0YSwgY2FsbGJhY2ssIHBhcnRpYWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNhbW15LlJlbmRlckNvbnRleHQodGhpcykucGFydGlhbChsb2NhdGlvbiwgZGF0YSwgY2FsbGJhY2ssIHBhcnRpYWxzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBjcmVhdGUgYSBuZXcgYFNhbW15LlJlbmRlckNvbnRleHRgIGNhbGxpbmcgYHNlbmQoKWAgd2l0aCBhbiBhcmJpdHJhcnlcbiAgICAgICAgLy8gZnVuY3Rpb25cbiAgICAgICAgc2VuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmN0eCA9IG5ldyBTYW1teS5SZW5kZXJDb250ZXh0KHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJjdHguc2VuZC5hcHBseShyY3R4LCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENoYW5nZXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBjdXJyZW50IHdpbmRvdy4gSWYgYHRvYCBiZWdpbnMgd2l0aFxuICAgICAgICAvLyAnIycgaXQgb25seSBjaGFuZ2VzIHRoZSBkb2N1bWVudCdzIGhhc2guIElmIHBhc3NlZCBtb3JlIHRoYW4gMSBhcmd1bWVudFxuICAgICAgICAvLyByZWRpcmVjdCB3aWxsIGpvaW4gdGhlbSB0b2dldGhlciB3aXRoIGZvcndhcmQgc2xhc2hlcy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICByZWRpcmVjdCgnIy9vdGhlci9yb3V0ZScpO1xuICAgICAgICAvLyAgICAgIC8vIGVxdWl2YWxlbnQgdG9cbiAgICAgICAgLy8gICAgICByZWRpcmVjdCgnIycsICdvdGhlcicsICdyb3V0ZScpO1xuICAgICAgICAvL1xuICAgICAgICByZWRpcmVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdG8sIGFyZ3MgPSBfbWFrZUFycmF5KGFyZ3VtZW50cyksXG4gICAgICAgICAgICAgICAgY3VycmVudF9sb2NhdGlvbiA9IHRoaXMuYXBwLmdldExvY2F0aW9uKCksXG4gICAgICAgICAgICAgICAgbCA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICAgICAgaWYobCA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsIHBhdGhzID0gW10sIHBhaXJzID0gW10sIHBhcmFtcyA9IHt9LCBoYXNfcGFyYW1zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yKDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgYXJnc1tpXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHMucHVzaChhcmdzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHBhcmFtcywgYXJnc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNfcGFyYW1zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0byA9IHBhdGhzLmpvaW4oJy8nKTtcbiAgICAgICAgICAgICAgICBpZihoYXNfcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgayBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhaXJzLnB1c2godGhpcy5hcHAuX2VuY29kZUZvcm1QYWlyKGssIHBhcmFtc1trXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRvICs9ICc/JyArIHBhaXJzLmpvaW4oJyYnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvID0gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigncmVkaXJlY3QnLCB7IHRvOiB0byB9KTtcbiAgICAgICAgICAgIHRoaXMuYXBwLmxhc3RfbG9jYXRpb24gPSBbdGhpcy52ZXJiLCB0aGlzLnBhdGhdO1xuICAgICAgICAgICAgdGhpcy5hcHAuc2V0TG9jYXRpb24odG8pO1xuICAgICAgICAgICAgaWYobmV3IFJlZ0V4cCh0bykudGVzdChjdXJyZW50X2xvY2F0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLnRyaWdnZXIoJ2xvY2F0aW9uLWNoYW5nZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUcmlnZ2VycyBldmVudHMgb24gYGFwcGAgd2l0aGluIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKG5hbWUsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBkYXRhID09ICd1bmRlZmluZWQnKSB7IGRhdGEgPSB7fTsgfVxuICAgICAgICAgICAgaWYoIWRhdGEuY29udGV4dCkgeyBkYXRhLmNvbnRleHQgPSB0aGlzOyB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAudHJpZ2dlcihuYW1lLCBkYXRhKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBIHNob3J0Y3V0IHRvIGFwcCdzIGBldmVudE5hbWVzcGFjZSgpYFxuICAgICAgICBldmVudE5hbWVzcGFjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuZXZlbnROYW1lc3BhY2UoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBIHNob3J0Y3V0IHRvIGFwcCdzIGBzd2FwKClgXG4gICAgICAgIHN3YXA6IGZ1bmN0aW9uKGNvbnRlbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLnN3YXAoY29udGVudHMsIGNhbGxiYWNrKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSYWlzZXMgYSBwb3NzaWJsZSBgbm90Rm91bmQoKWAgZXJyb3IgZm9yIHRoZSBjdXJyZW50IHBhdGguXG4gICAgICAgIG5vdEZvdW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5ub3RGb3VuZCh0aGlzLnZlcmIsIHRoaXMucGF0aCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gRGVmYXVsdCBKU09OIHBhcnNpbmcgdXNlcyBqUXVlcnkncyBgcGFyc2VKU09OKClgLiBJbmNsdWRlIGBTYW1teS5KU09OYFxuICAgICAgICAvLyBwbHVnaW4gZm9yIHRoZSBtb3JlIGNvbmZvcm1hbnQgXCJjcm9ja2ZvcmQgc3BlY2lhbFwiLlxuICAgICAgICBqc29uOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAkLnBhcnNlSlNPTihzdHJpbmcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIC8vPT4gU2FtbXkuRXZlbnRDb250ZXh0OiBnZXQgIy8ge31cbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiU2FtbXkuRXZlbnRDb250ZXh0OiBcIiArIFt0aGlzLnZlcmIsIHRoaXMucGF0aCwgdGhpcy5wYXJhbXNdLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gU2FtbXk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuancuVXRpbHMgPSAoKCkgPT4ge1xuICAgIGxldCBfbWFpbiA9ICQoJy5tYWluJyk7XG5cbiAgICBsZXQganNTcmNIYXNoID0ge1xuICAgICAgICAvLyBzcmM6IGlkXG4gICAgICAgICdodHRwczovL3BsYXRmb3JtLnR3aXR0ZXIuY29tL3dpZGdldHMuanMnOiBmYWxzZSxcbiAgICAgICAgJy9qcy9wbHVnaW5zL2pxdWVyeS5jeWNsZS5saXRlLmpzJzogZmFsc2UsXG4gICAgICAgICcvanMvcGx1Z2lucy9qcXVlcnkubGlzdENhcm91c2VsLmpzJzogZmFsc2UsXG4gICAgICAgICcvanMvcGx1Z2lucy9qcXVlcnkuc3Rhcl9iZy5qcyc6IGZhbHNlLFxuICAgICAgICAnL2pzL3N0YXJzLmpzJzogZmFsc2UsXG4gICAgICAgICcvanMvYmFsbFBpdC5qcyc6IGZhbHNlLFxuICAgICAgICAnL2pzL2JvdW5jaW5nT2JqLmpzJzogZmFsc2VcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWlyZTogKHNyYywgY2FsbGJhY2spID0+IHsgLy8gY2FsbGJhY2soY2FjaGVkKVxuICAgICAgICAgICAgaWYoIWpzU3JjSGFzaFtzcmNdKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzcmMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnc2NyaXB0JyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzU3JjSGFzaFtzcmNdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0WWVhcjogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZXNldE1vZGVsOiAoKSA9PiB7XG4gICAgICAgICAgICBfbWFpbi5lbXB0eSgpO1xuXG4gICAgICAgICAgICBmb3IobGV0IGxpc3RlbmVyIG9mIGp3Lmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9mZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgancubGlzdGVuZXJzID0gW107XG5cblxuICAgICAgICAgICAgaWYoancuUm91dGluZy5sYXN0UGcgPT09IFwiYmFsbFBpdFwiKSB7XG4gICAgICAgICAgICAgICAgancuQmFsbFBpdC5kZUluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoancuUm91dGluZy5sYXN0UGcgPT09IFwic3RhcnNcIikge1xuICAgICAgICAgICAgICAgIGp3LlN0YXJyeUJnLmRlSW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihqdy5Sb3V0aW5nLmxhc3RQZyA9PT0gXCJiT2JqXCIpIHtcbiAgICAgICAgICAgICAgICBqdy5Cb3VuY2UuZGVJbml0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGp3LmJvZHkucmVtb3ZlQ2xhc3MoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gJyc7XG4gICAgICAgICAgICAkKFwibWV0YVtuYW1lPWRlc2NyaXB0aW9uXSwgbWV0YVtuYW1lPWtleXdvcmRzXSwgbWV0YVtuYW1lPXJvYm90c11cIikucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIGlmIHBhZ2Ugbm90IHBsYXlncm91bmQgaW5uZXJcbiAgICAgICAgICAgIGxldCBoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgICAgICBpZih0eXBlb2YoaCkgPT09IFwidW5kZWZpbmVkXCIgfHwgaC5pbmRleE9mKFwiI3BsYXlncm91bmRcIikgIT09IDApIHsgIC8vIHN0YXJ0c1dpdGhcbiAgICAgICAgICAgICAgICBsZXQgcE5hdiA9ICQoXCIuZFBsYXlncm91bmROYXZcIik7XG5cbiAgICAgICAgICAgICAgICBpZihwTmF2LmlzKFwiOnZpc2libGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcE5hdi5zbGlkZVVwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5qdy5BYm91dE1vZGVsID0gKCgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6IHRoYXQgPT4ge1xuICAgICAgICAgICAgancuVXRpbHMucmVzZXRNb2RlbCgpO1xuXG4gICAgICAgICAgICB0aGF0LmxvYWQoJy9hYm91dC5odG1sJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZVllYXInKS50ZXh0Q29udGVudCA9IGp3LlV0aWxzLmdldFllYXIoKTtcbiAgICAgICAgICAgIH0pLnN3YXAoKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnQWJvdXQnO1xuICAgICAgICAgICAgancuYm9keS5hZGRDbGFzcygnYWJvdXQnKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5qdy5Db250YWN0TW9kZWwgPSAoKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogdGhhdCA9PiB7XG4gICAgICAgICAgICBqdy5VdGlscy5yZXNldE1vZGVsKCk7XG5cbiAgICAgICAgICAgIHRoYXQubG9hZCgnL2NvbnRhY3QuaHRtbCcpLnN3YXAoKTtcblxuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnQ29udGFjdCBNZSc7XG4gICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKCdjb250YWN0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuancuR2FtZXNNb2RlbCA9ICgoKSA9PiB7XG5cdHJldHVybiB7XG5cdFx0cmVuZGVyOiAodGhhdCwgcGFnZSkgPT4ge1xuXHRcdFx0ancuVXRpbHMucmVzZXRNb2RlbCgpO1xuXG5cdFx0XHRpZihwYWdlID09PSAnaW5kZXgnKSB7XG5cdFx0XHRcdHRoYXQubG9hZCgnL2dhbWVzL2luZGV4Lmh0bWwnLCBkYXRhID0+IHtcblx0XHRcdFx0XHRqdy5VdGlscy5yZXF1aXJlKCcvanMvcGx1Z2lucy9qcXVlcnkubGlzdENhcm91c2VsLmpzJywgKCkgPT4ge1xuXHRcdFx0XHRcdFx0JCgndWwnKS5saXN0Q2Fyb3VzZWwoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSkuc3dhcCgoKSA9PiB7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRqdy5NYWluLmZpeENvbFJIZWlnaHQoJCgnI2RpdkRlZmF1bHQnKS5oZWlnaHQoKSk7XG5cdFx0XHRcdFx0fSwgMTApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRkb2N1bWVudC50aXRsZSA9ICdHYW1lcyc7XG5cdFx0XHRcdGp3LmJvZHkuYWRkQ2xhc3MoJ2Fic0hvdmVyIGdhbWVzJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuancuSG9tZU1vZGVsID0gKCgpID0+IHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogdGhhdCA9PiB7XG4gICAgICAgICAgICBqdy5VdGlscy5yZXNldE1vZGVsKCk7XG5cbiAgICAgICAgICAgIHRoYXQubG9hZCgnL2hvbWUuaHRtbCcsIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGp3LlV0aWxzLnJlcXVpcmUoJ2h0dHBzOi8vcGxhdGZvcm0udHdpdHRlci5jb20vd2lkZ2V0cy5qcycsIGFscmVhZHlDcmVhdGVkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9pZighYWxyZWFkeUNyZWF0ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHd0dHIud2lkZ2V0cy5sb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuc3dhcCgpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdKb24gV2llZG1hbm4nO1xuICAgICAgICAgICAgancuaGVhZC5hcHBlbmQoYDxtZXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJkZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9XCJKb24gV2llZG1hbm4mIzcwMDtzIHBlcnNvbmFsIHdlYnNpdGUuICBUaGlzIHNpdGUgaXMgc2V0IHVwIHRvIHNob3djYXNlIHNvbWUgb2YgbXkgdGVjaG5pY2FsIGFiaWxpdHkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIHNpdGUgaGFzIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBteSB3b3JrIGV4cGVyaWVuY2UgYW5kIGhvYmJpZXMuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwia2V5d29yZHNcIiBjb250ZW50PVwiSm9uIFdpZWRtYW5uLCBXZWIgRGV2ZWxvcGVyLCBQSFAsIEhUTUw1LCBDU1MsIGpRdWVyeSwgSmF2YXNjcmlwdCwgc2FtbXkuanNcIj5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgancuYm9keS5hZGRDbGFzcygnaG9tZScpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmp3Lk11c2ljTW9kZWwgPSAoKCkgPT4ge1xuICAgIGNvbnN0IHllYXIgPSBqdy5VdGlscy5nZXRZZWFyKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6ICh0aGF0LCBwYWdlKSA9PiB7XG4gICAgICAgICAgICBqdy5VdGlscy5yZXNldE1vZGVsKCk7XG5cbiAgICAgICAgICAgIHN3aXRjaChwYWdlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kZXgnOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWQoJy9tdXNpYy9pbmRleC5odG1sJywgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcudGVhY2hpbmcnKS50ZXh0KHllYXIgLSAyMDA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wbGF5aW5nJykudGV4dCh5ZWFyIC0gMTk5NCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnN3YXAoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdNdXNpYyc7XG4gICAgICAgICAgICAgICAgICAgIGp3LmJvZHkuYWRkQ2xhc3MoJ211c2ljIG11c2ljSG9tZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiYXNzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCcvbXVzaWMvYmFzcy5odG1sJywgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucGxheWluZycpLnRleHQoeWVhciAtIDIwMDkpO1xuICAgICAgICAgICAgICAgICAgICB9KS5zd2FwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnQmFzcyB8IE11c2ljJztcbiAgICAgICAgICAgICAgICAgICAgancuYm9keS5hZGRDbGFzcygnbXVzaWMgYmFzcycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjaGlwdHVuZXMnOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWQoJy9tdXNpYy9jaGlwdHVuZXMuaHRtbCcsIGRhdGEgPT4ge30pLnN3YXAoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdDaGlwdHVuZXMgfCBNdXNpYyc7XG4gICAgICAgICAgICAgICAgICAgIGp3LmJvZHkuYWRkQ2xhc3MoJ211c2ljJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2d1aXRhcic6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgnL211c2ljL2d1aXRhci5odG1sJywgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucGxheWluZycpLnRleHQoeWVhciAtIDIwMDIpO1xuICAgICAgICAgICAgICAgICAgICB9KS5zd2FwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnR3VpdGFyIHwgTXVzaWMnO1xuICAgICAgICAgICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKCdtdXNpYycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtYW5kb2xpbic6XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgnL211c2ljL21hbmRvbGluLmh0bWwnLCBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wbGF5aW5nJykudGV4dCh5ZWFyIC0gMjAwOCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnN3YXAoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdNYW5kb2xpbiB8IE11c2ljJztcbiAgICAgICAgICAgICAgICAgICAgancuYm9keS5hZGRDbGFzcygnbXVzaWMgbWFuZG9saW4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGlhbm8nOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWQoJy9tdXNpYy9waWFuby5odG1sJywgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucGxheWluZycpLnRleHQoeWVhciAtIDE5OTQpO1xuICAgICAgICAgICAgICAgICAgICB9KS5zd2FwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnUGlhbm8gfCBNdXNpYyc7XG4gICAgICAgICAgICAgICAgICAgIGp3LmJvZHkuYWRkQ2xhc3MoJ211c2ljJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RydW1wZXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWQoJy9tdXNpYy90cnVtcGV0Lmh0bWwnLCBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wbGF5aW5nJykudGV4dCh5ZWFyIC0gMTk5OCk7XG4gICAgICAgICAgICAgICAgICAgIH0pLnN3YXAoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdUcnVtcGV0IHwgTXVzaWMnO1xuICAgICAgICAgICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKCdtdXNpYyB0cnVtcGV0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JhdGVzJzpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCcvbXVzaWMvcmF0ZXMuaHRtbCcsIGRhdGEgPT4ge30pLnN3YXAoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdSYXRlcyB8IE11c2ljJztcbiAgICAgICAgICAgICAgICAgICAgancuaGVhZC5hcHBlbmQoYDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJNdXNpYyBMZXNzb24gUmF0ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInJvYm90c1wiIHJlbD1cIm5vbmVcIj5gXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGp3LmJvZHkuYWRkQ2xhc3MoJ211c2ljIHJhdGVzJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ZvaWNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCcvbXVzaWMvdm9pY2UuaHRtbCcsIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBsYXlpbmcnKS50ZXh0KHllYXIgLSAyMDA5KTtcbiAgICAgICAgICAgICAgICAgICAgfSkuc3dhcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ1ZvaWNlIHwgTXVzaWMnO1xuICAgICAgICAgICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKCdtdXNpYycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5qdy5QbGF5Z3JvdW5kTW9kZWwgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICh0aGF0LCBwYWdlKSB7XG4gICAgICAgICAgICBqdy5VdGlscy5yZXNldE1vZGVsKCk7XG5cbiAgICAgICAgICAgIGlmIChwYWdlID09PSBcImluZGV4XCIpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWQoXCIvcGxheWdyb3VuZC9pbmRleC5odG1sXCIsIGZ1bmN0aW9uKGRhdGEpIHt9KS5zd2FwKCk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiUGxheWdyb3VuZFwiO1xuICAgICAgICAgICAgICAgIGp3LmhlYWQuYXBwZW5kKFwiPG1ldGEgbmFtZT0nZGVzY3JpcHRpb24nIGNvbnRlbnQ9J0FuIHBsYXlncm91bmQgYXJlYSBmb3Igd2ViIHRlY2ggZGVtb3MuJyAvPlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxtZXRhIG5hbWU9J2tleXdvcmRzJyBjb250ZW50PSdjYW52YXMsIGh0bWw1JyAvPlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKFwicGxheWdyb3VuZCBwbGF5SW5uZXJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlID09PSBcImJhbGxQaXRcIikge1xuICAgICAgICAgICAgICAgIHRoYXQubG9hZChcIi9wbGF5Z3JvdW5kL2JhbGxQaXQuaHRtbFwiLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGp3LlV0aWxzLnJlcXVpcmUoXCIvanMvYmFsbFBpdC5qc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdy5CYWxsUGl0LmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkuc3dhcCgpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIkJhbGwgUGl0IHwgUGxheWdyb3VuZFwiO1xuICAgICAgICAgICAgICAgIGp3LmhlYWQuYXBwZW5kKFwiPG1ldGEgbmFtZT0nZGVzY3JpcHRpb24nIGNvbnRlbnQ9J0EgY2FudmFzIGV4YW1wbGUgc2hvd2Nhc2luZyBhIGJhbGwgcGl0LicgLz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8bWV0YSBuYW1lPSdrZXl3b3JkcycgY29udGVudD0nY2FudmFzLCBodG1sNScgLz5cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgancuYm9keS5hZGRDbGFzcyhcInBsYXlncm91bmQgcGxheUlubmVyIG5hdjNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlID09PSBcInN0YXJzXCIpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWQoXCIvcGxheWdyb3VuZC9zdGFycy5odG1sXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGxvYWQgdGhlc2UgYXN5bmNcbiAgICAgICAgICAgICAgICAgICAgancuVXRpbHMucmVxdWlyZShcIi9qcy9wbHVnaW5zL2pxdWVyeS5zdGFyX2JnLmpzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGp3LlV0aWxzLnJlcXVpcmUoXCIvanMvc3RhcnMuanNcIiwgZnVuY3Rpb24gKGNhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp3LlN0YXJyeUJnLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KS5zd2FwKCk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiU3RhcnJ5IEJhY2tncm91bmQgfCBQbGF5Z3JvdW5kXCI7XG4gICAgICAgICAgICAgICAgancuaGVhZC5hcHBlbmQoXCI8bWV0YSBuYW1lPSdkZXNjcmlwdGlvbicgY29udGVudD0nQSBjYW52YXMgZXhhbXBsZSBzaG93Y2FzaW5nIGEgc3RhcnJ5IGJhY2tncm91bmQuJyAvPlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxtZXRhIG5hbWU9J2tleXdvcmRzJyBjb250ZW50PSdjYW52YXMsIGh0bWw1JyAvPlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKFwicGxheWdyb3VuZCBwbGF5SW5uZXIgbmF2MlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhZ2UgPT09IFwiYk9ialwiKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkKFwiL3BsYXlncm91bmQvYm91bmNpbmctb2JqZWN0Lmh0bWxcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgancuVXRpbHMucmVxdWlyZShcIi9qcy9ib3VuY2luZ09iai5qc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdy5Cb3VuY2UuaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KS5zd2FwKCk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiQm91bmNpbmcgT2JqZWN0IHwgUGxheWdyb3VuZFwiO1xuICAgICAgICAgICAgICAgIGp3LmhlYWQuYXBwZW5kKFwiPG1ldGEgbmFtZT0nZGVzY3JpcHRpb24nIGNvbnRlbnQ9J0EgY2FudmFzIGV4YW1wbGUgc2hvd2Nhc2luZyBhIGJvdW5jaW5nIG9iamVjdC4nIC8+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPG1ldGEgbmFtZT0na2V5d29yZHMnIGNvbnRlbnQ9J2NhbnZhcywgaHRtbDUnIC8+XCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGp3LmJvZHkuYWRkQ2xhc3MoXCJwbGF5Z3JvdW5kIHBsYXlJbm5lciBuYXY1XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZSA9PT0gXCJiQ3ViZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkKFwiL3BsYXlncm91bmQvYnJlYWtkYW5jaW5nLWN1YmUuaHRtbFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2N1YmVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KS5zd2FwKCk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiQnJlYWtkYW5jaW5nIEN1YmUgfCBQbGF5Z3JvdW5kXCI7XG4gICAgICAgICAgICAgICAgancuaGVhZC5hcHBlbmQoXCI8bWV0YSBuYW1lPSdkZXNjcmlwdGlvbicgY29udGVudD0nUHVyZSBDU1MzIGFuaW1hdGlvbiBkZW1vLicgLz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8bWV0YSBuYW1lPSdrZXl3b3JkcycgY29udGVudD0nQ1NTMywgSFRNTDUnIC8+XCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGp3LmJvZHkuYWRkQ2xhc3MoXCJwbGF5Z3JvdW5kIHBsYXlJbm5lciBiRGFuY2luZ0N1YmUgbmF2MVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBOYXYgPSAkKFwiLmRQbGF5Z3JvdW5kTmF2XCIpO1xuICAgICAgICAgICAgaWYoIXBOYXYuaXMoXCI6dmlzaWJsZVwiKSkge1xuICAgICAgICAgICAgICAgIHBOYXYuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuancuUG9ydGZvbGlvTW9kZWwgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0cmVuZGVyOiBmdW5jdGlvbiAodGhhdCwgcGFnZSkge1xuXHRcdFx0ancuVXRpbHMucmVzZXRNb2RlbCgpO1xuXG5cdFx0XHRpZiAocGFnZSA9PT0gJ2luZGV4Jykge1xuXHRcdFx0XHR0aGF0LmxvYWQoJy9wb3J0Zm9saW8vaW5kZXguaHRtbCcsIGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0ancuVXRpbHMucmVxdWlyZSgnL2pzL3BsdWdpbnMvanF1ZXJ5Lmxpc3RDYXJvdXNlbC5qcycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQoJ3VsJykubGlzdENhcm91c2VsKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pLnN3YXAoKTtcblxuXHRcdFx0XHRkb2N1bWVudC50aXRsZSA9ICdQb3J0Zm9saW8nO1xuXHRcdFx0XHRqdy5ib2R5LmFkZENsYXNzKCdwb3J0Zm9saW8gYWJzSG92ZXInKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5qdy5Sb3V0aW5nID0gKCgpID0+IHtcblx0bGV0IGFwcCA9ICQuc2FtbXkoJy5tYWluJywgZnVuY3Rpb24oKSB7XG5cdFx0Ly8gSG9tZVxuXHRcdHRoaXMucm91dGUoJ2dldCcsJy8nLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3LkhvbWVNb2RlbC5yZW5kZXIodGhpcyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdob21lJztcblx0XHR9KTtcblxuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjaG9tZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ancuSG9tZU1vZGVsLnJlbmRlcih0aGlzKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ2hvbWUnO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWJvdXRcblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI2Fib3V0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5BYm91dE1vZGVsLnJlbmRlcih0aGlzKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ2Fib3V0Jztcblx0XHR9KTtcblxuXHRcdC8vIENvbnRhY3Rcblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI2NvbnRhY3QnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRqdy5Db250YWN0TW9kZWwucmVuZGVyKHRoaXMpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAnY29udGFjdCc7XG5cdFx0fSk7XG5cblx0XHQvLy8vIEZhdm9yaXRlc1xuXHRcdC8vdGhpcy5yb3V0ZSgnZ2V0JywgJyNmYXZvcml0ZXMnLCBmdW5jdGlvbigpIHtcblx0XHQvLyAgICBqdy5GYXZvcml0ZXNNb2RlbC5yZW5kZXIodGhpcyk7XG5cdFx0Ly8gICAgancuUm91dGluZy5sYXN0UGcgPSAnZmF2b3JpdGVzJztcblx0XHQvL30pO1xuXG5cdFx0Ly8vLyBCbG9nXG5cdFx0Ly90aGlzLnJvdXRlKCdnZXQnLCAnI2Jsb2cnLCBmdW5jdGlvbigpIHtcblx0XHQvLyAgICBqdy5CbG9nTW9kZWwucmVuZGVyKHRoaXMpO1xuXHRcdC8vICAgIGp3LlJvdXRpbmcubGFzdFBnID0gJ2Jsb2cnO1xuXHRcdC8vfSk7XG5cblx0XHQvLyBHYW1lc1xuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjZ2FtZXMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRqdy5HYW1lc01vZGVsLnJlbmRlcih0aGlzLCAnaW5kZXgnKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ2dhbWVzL2luZGV4Jztcblx0XHR9KTtcblxuXHRcdC8vIE11c2ljXG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNtdXNpYycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ancuTXVzaWNNb2RlbC5yZW5kZXIodGhpcywgJ2luZGV4Jyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdtdXNpYy9pbmRleCc7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI211c2ljL2Jhc3MnLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3Lk11c2ljTW9kZWwucmVuZGVyKHRoaXMsICdiYXNzJyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdtdXNpYy9iYXNzJztcblx0XHR9KTtcblxuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjbXVzaWMvY2hpcHR1bmVzJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5NdXNpY01vZGVsLnJlbmRlcih0aGlzLCAnY2hpcHR1bmVzJyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdtdXNpYy9jaGlwdHVuZXMnO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNtdXNpYy9ndWl0YXInLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3Lk11c2ljTW9kZWwucmVuZGVyKHRoaXMsICdndWl0YXInKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ211c2ljL2d1aXRhcic7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI211c2ljL21hbmRvbGluJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5NdXNpY01vZGVsLnJlbmRlcih0aGlzLCAnbWFuZG9saW4nKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ211c2ljL21hbmRvbGluJztcblx0XHR9KTtcblxuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjbXVzaWMvcGlhbm8nLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3Lk11c2ljTW9kZWwucmVuZGVyKHRoaXMsICdwaWFubycpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAnbXVzaWMvcGlhbm8nO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNtdXNpYy90cnVtcGV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5NdXNpY01vZGVsLnJlbmRlcih0aGlzLCAndHJ1bXBldCcpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAnbXVzaWMvdHJ1bXBldCc7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI211c2ljL3JhdGVzJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5NdXNpY01vZGVsLnJlbmRlcih0aGlzLCAncmF0ZXMnKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ211c2ljL3JhdGVzJztcblx0XHR9KTtcblxuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjbXVzaWMvdm9pY2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3Lk11c2ljTW9kZWwucmVuZGVyKHRoaXMsICd2b2ljZScpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAnbXVzaWMvdm9pY2UnO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUGxheWdyb3VuZFxuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjcGxheWdyb3VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ancuUGxheWdyb3VuZE1vZGVsLnJlbmRlcih0aGlzLCAnaW5kZXgnKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ3BsYXlncm91bmQvaW5kZXgnO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNwbGF5Z3JvdW5kL2JhbGxQaXQnLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3LlBsYXlncm91bmRNb2RlbC5yZW5kZXIodGhpcywgJ2JhbGxQaXQnKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ2JhbGxQaXQnO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNwbGF5Z3JvdW5kL2JyZWFrZGFuY2luZy1jdWJlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5QbGF5Z3JvdW5kTW9kZWwucmVuZGVyKHRoaXMsICdiQ3ViZScpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAnYkN1YmUnO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNwbGF5Z3JvdW5kL2JvdW5jaW5nLW9iamVjdCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ancuUGxheWdyb3VuZE1vZGVsLnJlbmRlcih0aGlzLCAnYk9iaicpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAnYk9iaic7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI3BsYXlncm91bmQvc3RhcnJ5LWJhY2tncm91bmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3LlBsYXlncm91bmRNb2RlbC5yZW5kZXIodGhpcywgJ3N0YXJzJyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdzdGFycyc7XG5cdFx0fSk7XG5cblx0XHQvLyBQb3J0Zm9saW9cblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI3BvcnRmb2xpbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ancuUG9ydGZvbGlvTW9kZWwucmVuZGVyKHRoaXMsICdpbmRleCcpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAncG9ydGZvbGlvL2luZGV4Jztcblx0XHR9KTtcblx0fSk7XG5cblx0cmV0dXJuIHtcblx0XHRsYXN0UGc6IG51bGwsXG5cblxuXHRcdGluaXQ6ICgpID0+IHtcblx0XHRcdGFwcC5ydW4oKTtcblx0XHR9XG5cdH07XG59KSgpOyIsIid1c2Ugc3RyaWN0Jztcbi8qXG4gKiBNYWluXG4gKi9cbmp3Lk1haW4gPSAoKCkgPT4ge1xuXHRyZXR1cm4ge1xuXHRcdGluaXQ6ICgpID0+IHtcblx0XHRcdGp3LmhlYWQgPSAkKCdoZWFkJyk7XG5cdFx0XHRqdy5ib2R5ID0gJCgnYm9keScpO1xuXHRcdFx0ancubGlzdGVuZXJzID0gW107XG5cblx0XHRcdGp3LlJvdXRpbmcuaW5pdCgpO1xuXG5cdFx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHtcblx0XHRcdFx0bGV0IGggPSAkKCcuY29sUiA+IGRpdjp2aXNpYmxlJykuaGVpZ2h0KCk7XG5cdFx0XHRcdGp3Lk1haW4uZml4Q29sUkhlaWdodChoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKCdoZWFkZXIgYScpLm9uKCdjbGljaycsICgpID0+ICQoJy5tYWluJykuaGVpZ2h0KCdhdXRvJykpO1xuXG5cdFx0XHRsZXQgbGlzdGVuZXIsIGhhc0NsYXNzID0gZmFsc2U7XG5cdFx0XHRmdW5jdGlvbiBoaWRlKCkge1xuXHRcdFx0XHQkKCdhc2lkZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0aGFzQ2xhc3MgPSBmYWxzZTtcblx0XHRcdFx0bGlzdGVuZXIub2ZmKCk7XG5cdFx0XHR9XG5cblx0XHRcdCQoJy5tZW51Jykub24oJ2NsaWNrJywgZSA9PiB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRpZighaGFzQ2xhc3MpIHtcblx0XHRcdFx0XHQkKCdhc2lkZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0XHRoYXNDbGFzcyA9IHRydWU7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdGxpc3RlbmVyID0gJCgnYm9keScpLm9uKCdjbGljaycsIGhpZGUpO1xuXHRcdFx0XHRcdH0sIDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIDE1ODogcGFkZGluZyArIGZvb3RlciBoZWlnaHRcblx0XHRmaXhDb2xSSGVpZ2h0OiBoID0+IHtcblx0XHRcdGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDgwMCl7XG5cdFx0XHRcdCQoJy5tYWluJykuaGVpZ2h0KCdhdXRvJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDEyNjUpIHtcblx0XHRcdFx0JCgnLm1haW4nKS5oZWlnaHQoJCgnLmNvbEwnKS5oZWlnaHQoKSArIGggKyAxNTgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmKCQoJy5jb2xMJykuaGVpZ2h0KCkgPiBoKSB7XG5cdFx0XHRcdFx0JCgnLm1haW4nKS5oZWlnaHQoJCgnLmNvbEwnKS5oZWlnaHQoKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0JCgnLm1haW4nKS5oZWlnaHQoaCArIDE1OCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59KSgpO1xuXG4kKCgpID0+IGp3Lk1haW4uaW5pdCgpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
