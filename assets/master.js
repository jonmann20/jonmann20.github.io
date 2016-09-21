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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbW15LmpzIiwidXRpbHMuanMiLCJhYm91dC5qcyIsImNvbnRhY3QuanMiLCJnYW1lcy5qcyIsImhvbWUuanMiLCJwbGF5Z3JvdW5kLmpzIiwicG9ydGZvbGlvLmpzIiwicm91dGluZy5qcyIsIm1haW4uanMiXSwibmFtZXMiOlsiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImpRdWVyeSIsInNhbW15Iiwid2luZG93IiwiU2FtbXkiLCIkIiwiUEFUSF9SRVBMQUNFUiIsIlBBVEhfTkFNRV9NQVRDSEVSIiwiUVVFUllfU1RSSU5HX01BVENIRVIiLCJfbWFrZUFycmF5Iiwibm9uYXJyYXkiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsIl9pc0Z1bmN0aW9uIiwib2JqIiwiT2JqZWN0IiwidG9TdHJpbmciLCJfaXNBcnJheSIsIl9pc1JlZ0V4cCIsIl9kZWNvZGUiLCJzdHIiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZXBsYWNlIiwiX2VuY29kZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIl9lc2NhcGVIVE1MIiwicyIsIlN0cmluZyIsIl9yb3V0ZVdyYXBwZXIiLCJ2ZXJiIiwicm91dGUiLCJhcHBseSIsImNvbmNhdCIsImFyZ3VtZW50cyIsIl90ZW1wbGF0ZV9jYWNoZSIsIl9oYXNfaGlzdG9yeSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJsb2dnZXJzIiwiYXJncyIsImFwcCIsInNlbGVjdG9yIiwiYXBwcyIsImxlbmd0aCIsInNoaWZ0IiwiQXBwbGljYXRpb24iLCJlbGVtZW50X3NlbGVjdG9yIiwiZWFjaCIsImkiLCJwbHVnaW4iLCJ1c2UiLCJWRVJTSU9OIiwiYWRkTG9nZ2VyIiwibG9nZ2VyIiwicHVzaCIsImxvZyIsInVuc2hpZnQiLCJEYXRlIiwiY29uc29sZSIsImV4dGVuZCIsIm1ha2VBcnJheSIsImlzRnVuY3Rpb24iLCJpc0FycmF5IiwiZXNjYXBlSFRNTCIsImgiLCJ0b0hhc2giLCJqc29uIiwiayIsInYiLCJ0b0hUTUwiLCJkaXNwbGF5Iiwia2V5cyIsImF0dHJpYnV0ZXNfb25seSIsInByb3BlcnR5IiwiaGFzIiwia2V5IiwidHJpbSIsImpvaW4iLCJkZWxpbWl0ZXIiLCJpbmNsdWRlX2Z1bmN0aW9ucyIsInRhcmdldElzVGhpc1dpbmRvdyIsImV2ZW50IiwidGFnTmFtZSIsInRhcmdldEVsZW1lbnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGFyZ2V0V2luZG93IiwiYXR0ciIsIm5hbWUiLCJ0b3AiLCJEZWZhdWx0TG9jYXRpb25Qcm94eSIsInJ1bl9pbnRlcnZhbF9ldmVyeSIsImlzX25hdGl2ZSIsImhhc19oaXN0b3J5IiwiX3N0YXJ0UG9sbGluZyIsImZ1bGxQYXRoIiwibG9jYXRpb25fb2JqIiwibWF0Y2hlcyIsIm1hdGNoIiwiaGFzaCIsInBhdGhuYW1lIiwic2VhcmNoIiwiYmluZCIsInByb3h5IiwibHAiLCJldmVudE5hbWVzcGFjZSIsImUiLCJub25fbmF0aXZlIiwiY2xlYXJJbnRlcnZhbCIsIl9pbnRlcnZhbCIsInRyaWdnZXIiLCJkaXNhYmxlX3B1c2hfc3RhdGUiLCJkb2N1bWVudCIsImRlbGVnYXRlIiwiaXNEZWZhdWx0UHJldmVudGVkIiwibWV0YUtleSIsImN0cmxLZXkiLCJmdWxsX3BhdGgiLCJob3N0bmFtZSIsImEiLCJsIiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJsb2NhdGlvbiIsImxvb2t1cFJvdXRlIiwicHJldmVudERlZmF1bHQiLCJzZXRMb2NhdGlvbiIsIl9iaW5kaW5ncyIsInVuYmluZCIsInVuZGVsZWdhdGUiLCJnZXRMb2NhdGlvbiIsIm5ld19sb2NhdGlvbiIsInRlc3QiLCJwYXRoIiwidGl0bGUiLCJldmVyeSIsImhhc2hDaGVjayIsImN1cnJlbnRfbG9jYXRpb24iLCJfbGFzdF9sb2NhdGlvbiIsInNldFRpbWVvdXQiLCJzZXRJbnRlcnZhbCIsImFwcF9mdW5jdGlvbiIsInJvdXRlcyIsImxpc3RlbmVycyIsImFyb3VuZHMiLCJiZWZvcmVzIiwibmFtZXNwYWNlIiwiZ2V0VGltZSIsInBhcnNlSW50IiwiTWF0aCIsInJhbmRvbSIsImNvbnRleHRfcHJvdG90eXBlIiwiRXZlbnRDb250ZXh0IiwiX2xvY2F0aW9uX3Byb3h5Iiwic2V0TG9jYXRpb25Qcm94eSIsImRlYnVnIiwiYmluZFRvQWxsRXZlbnRzIiwiZGF0YSIsImNsZWFuZWRfdHlwZSIsIlJPVVRFX1ZFUkJTIiwiQVBQX0VWRU5UUyIsIl9sYXN0X3JvdXRlIiwiX3J1bm5pbmciLCJyYWlzZV9lcnJvcnMiLCJ0ZW1wbGF0ZV9lbmdpbmUiLCIkZWxlbWVudCIsImZpbmQiLCJwbHVnaW5fbmFtZSIsImVycm9yIiwibmV3X3Byb3h5Iiwib3JpZ2luYWxfcHJveHkiLCJpc1J1bm5pbmciLCJwYXJhbV9uYW1lcyIsImFkZF9yb3V0ZSIsInBhdGhfbWF0Y2giLCJjYWxsYmFjayIsInRvTG93ZXJDYXNlIiwiY29uc3RydWN0b3IiLCJsYXN0SW5kZXgiLCJleGVjIiwiUmVnRXhwIiwiY2IiLCJ3aXRoX3ZlcmIiLCJyIiwiZ2V0IiwicG9zdCIsInB1dCIsImRlbCIsImFueSIsIm1hcFJvdXRlcyIsInJvdXRlX2FycmF5Iiwicm91dGVfYXJncyIsImxpc3RlbmVyX2NhbGxiYWNrIiwiY29udGV4dCIsInR5cGUiLCJfbGlzdGVuIiwicmVmcmVzaCIsImxhc3RfbG9jYXRpb24iLCJiZWZvcmUiLCJvcHRpb25zIiwiYWZ0ZXIiLCJhcm91bmQiLCJvbkNvbXBsZXRlIiwiX29uQ29tcGxldGUiLCJoZWxwZXJzIiwiZXh0ZW5zaW9ucyIsImhlbHBlciIsIm1ldGhvZCIsInJ1biIsInN0YXJ0X3VybCIsImNhbGxiYWNrcyIsIl9jaGVja0xvY2F0aW9uIiwicmV0dXJuZWQiLCJfY2hlY2tGb3JtU3VibWlzc2lvbiIsInVubG9hZCIsInJlbW92ZUNsYXNzIiwiX3VubGlzdGVuIiwiZGVzdHJveSIsImluQXJyYXkiLCJyb3V0YWJsZVBhdGgiLCJyb3V0ZWQiLCJydW5Sb3V0ZSIsInBhcmFtcyIsIndyYXBwZWRfcm91dGUiLCJjYWxsYmFja19hcmdzIiwicGF0aF9wYXJhbXMiLCJmaW5hbF9yZXR1cm5lZCIsIl9wYXJzZVF1ZXJ5U3RyaW5nIiwicGFyYW0iLCJzcGxhdCIsIm5leHRSb3V0ZSIsImNvbnRleHRNYXRjaGVzT3B0aW9ucyIsImxhc3Rfcm91dGUiLCJyZXZlcnNlIiwibGFzdF93cmFwcGVkX3JvdXRlIiwibm90Rm91bmQiLCJtYXRjaF9vcHRpb25zIiwicG9zaXRpdmUiLCJpc0VtcHR5T2JqZWN0IiwicmVzdWx0cyIsIm51bW9wdCIsIm9wdHMiLCJsZW4iLCJtYXRjaGVkIiwib25seSIsImV4Y2VwdCIsInBhdGhfbWF0Y2hlZCIsInZlcmJfbWF0Y2hlZCIsImluZGV4T2YiLCJzd2FwIiwiY29udGVudCIsIiRlbCIsImh0bWwiLCJ0ZW1wbGF0ZUNhY2hlIiwidmFsdWUiLCJjbGVhclRlbXBsYXRlQ2FjaGUiLCJyZXQiLCJtZXNzYWdlIiwib3JpZ2luYWxfZXJyb3IiLCJFcnJvciIsIl9nZXRGb3JtVmVyYiIsImZvcm0iLCIkZm9ybSIsIiRfbWV0aG9kIiwidmFsIiwiZ2V0QXR0cmlidXRlIiwiX3NlcmlhbGl6ZUZvcm1QYXJhbXMiLCJfcGFyc2VGb3JtUGFyYW1zIiwicXVlcnlTdHJpbmciLCJmaWVsZHMiLCJzZXJpYWxpemVBcnJheSIsIl9lbmNvZGVGb3JtUGFpciIsImZvcm1fZmllbGRzIiwiX3BhcnNlUGFyYW1QYWlyIiwicGFydHMiLCJwYWlycyIsInBhaXIiLCJzcGxpdCIsIlJlbmRlckNvbnRleHQiLCJldmVudF9jb250ZXh0IiwicHJldmlvdXNfY29udGVudCIsIm5leHRfZW5naW5lIiwid2FpdGluZyIsInRoZW4iLCJ3YWl0IiwibmV4dCIsImxvYWQiLCJzaG91bGRfY2FjaGUiLCJjYWNoZWQiLCJpc19qc29uIiwibG9jYXRpb25fYXJyYXkiLCJjYWNoZSIsImVuZ2luZUZvciIsImVuZ2luZSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJub2RlVHlwZSIsImlubmVySFRNTCIsImNsb25lIiwicmVtb3ZlIiwibG9hZFBhcnRpYWxzIiwicGFydGlhbHMiLCJ0ZW1wbGF0ZSIsInJlbmRlciIsImludGVycG9sYXRlIiwicGFydGlhbCIsInNlbmQiLCJmdW4iLCJyZXNwb25zZSIsImNvbGxlY3QiLCJhcnJheSIsIm5vdyIsImNvbGwiLCJjb250ZW50cyIsImRvbXMiLCJpdGVtIiwianF1ZXJ5IiwicmVuZGVyRWFjaCIsInJjdHgiLCJpZGF0YSIsInJldGFpbiIsInByZXYiLCJyZW5kZXJlZCIsImFwcGVuZFRvIiwiYXBwZW5kIiwicHJlcGVuZFRvIiwicHJlcGVuZCIsImVuZ2luZV9tYXRjaCIsInJlZGlyZWN0IiwidG8iLCJwYXRocyIsImhhc19wYXJhbXMiLCJzdHJpbmciLCJwYXJzZUpTT04iLCJqdyIsIlV0aWxzIiwiX21haW4iLCJqc1NyY0hhc2giLCJyZXF1aXJlIiwic3JjIiwiZ2V0WWVhciIsImdldEZ1bGxZZWFyIiwicmVzZXRNb2RlbCIsImVtcHR5IiwibGlzdGVuZXIiLCJvZmYiLCJSb3V0aW5nIiwibGFzdFBnIiwiQmFsbFBpdCIsImRlSW5pdCIsIlN0YXJyeUJnIiwiQm91bmNlIiwiYm9keSIsInBOYXYiLCJpcyIsInNsaWRlVXAiLCJBYm91dE1vZGVsIiwidGhhdCIsImdldEVsZW1lbnRCeUlkIiwidGV4dENvbnRlbnQiLCJhZGRDbGFzcyIsIkNvbnRhY3RNb2RlbCIsIkdhbWVzTW9kZWwiLCJwYWdlIiwibGlzdENhcm91c2VsIiwiTWFpbiIsImZpeENvbFJIZWlnaHQiLCJoZWlnaHQiLCJIb21lTW9kZWwiLCJ0d3R0ciIsIndpZGdldHMiLCJoZWFkIiwiUGxheWdyb3VuZE1vZGVsIiwiaW5pdCIsIm9uIiwic2xpZGVEb3duIiwiUG9ydGZvbGlvTW9kZWwiLCJoYXNDbGFzcyIsImhpZGUiLCJpbm5lcldpZHRoIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTs7QUFFQTs7QUFFQSxDQUFDLFVBQVNBLE9BQVQsRUFBa0I7QUFDZjtBQUNBLFFBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFn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QUFFQWhQLGdCQUFXLFlBQU07QUFDaEIrTSxpQkFBV3ZWLEVBQUUsTUFBRixFQUFVcVgsRUFBVixDQUFhLE9BQWIsRUFBc0JJLElBQXRCLENBQVg7QUFDQSxNQUZELEVBRUcsQ0FGSDtBQUdBLEtBUEQsTUFRSztBQUNKQTtBQUNBO0FBQ0QsSUFkRDtBQWVBLEdBckNLOztBQXVDTjtBQUNBWixpQkFBZSwwQkFBSztBQUNuQixPQUFHL1csT0FBTzRYLFVBQVAsSUFBcUIsR0FBeEIsRUFBNEI7QUFDM0IxWCxNQUFFLE9BQUYsRUFBVzhXLE1BQVgsQ0FBa0IsTUFBbEI7QUFDQSxJQUZELE1BR0ssSUFBR2hYLE9BQU80WCxVQUFQLElBQXFCLElBQXhCLEVBQThCO0FBQ2xDMVgsTUFBRSxPQUFGLEVBQVc4VyxNQUFYLENBQWtCOVcsRUFBRSxPQUFGLEVBQVc4VyxNQUFYLEtBQXNCalQsQ0FBdEIsR0FBMEIsR0FBNUM7QUFDQSxJQUZJLE1BR0E7QUFDSixRQUFHN0QsRUFBRSxPQUFGLEVBQVc4VyxNQUFYLEtBQXNCalQsQ0FBekIsRUFBNEI7QUFDM0I3RCxPQUFFLE9BQUYsRUFBVzhXLE1BQVgsQ0FBa0I5VyxFQUFFLE9BQUYsRUFBVzhXLE1BQVgsRUFBbEI7QUFDQSxLQUZELE1BR0s7QUFDSjlXLE9BQUUsT0FBRixFQUFXOFcsTUFBWCxDQUFrQmpULElBQUksR0FBdEI7QUFDQTtBQUNEO0FBQ0Q7QUF2REssRUFBUDtBQXlEQSxDQTFEUyxFQUFWOztBQTREQTdELEVBQUU7QUFBQSxRQUFNNlUsR0FBRytCLElBQUgsQ0FBUVEsSUFBUixFQUFOO0FBQUEsQ0FBRiIsImZpbGUiOiJtYXN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBuYW1lOiBzYW1teVxuLy8gdmVyc2lvbjogMC43LjZcblxuLy8gU2FtbXkuanMgLyBodHRwOi8vc2FtbXlqcy5vcmdcblxuKGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICAvLyBTdXBwb3J0IG1vZHVsZSBsb2FkaW5nIHNjZW5hcmlvc1xuICAgIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQgQW5vbnltb3VzIE1vZHVsZVxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm8gbW9kdWxlIGxvYWRlciAocGxhaW4gPHNjcmlwdD4gdGFnKSAtIHB1dCBkaXJlY3RseSBpbiBnbG9iYWwgbmFtZXNwYWNlXG4gICAgICAgIGpRdWVyeS5zYW1teSA9IHdpbmRvdy5TYW1teSA9IGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KShmdW5jdGlvbigkKSB7XG5cbiAgICB2YXIgU2FtbXksXG4gICAgICAgIFBBVEhfUkVQTEFDRVIgPSBcIihbXlxcL10rKVwiLFxuICAgICAgICBQQVRIX05BTUVfTUFUQ0hFUiA9IC86KFtcXHdcXGRdKykvZyxcbiAgICAgICAgUVVFUllfU1RSSU5HX01BVENIRVIgPSAvXFw/KFteI10qKT8kLyxcbiAgICAgICAgLy8gbWFpbmx5IGZvciBtYWtpbmcgYGFyZ3VtZW50c2AgYW4gQXJyYXlcbiAgICAgICAgX21ha2VBcnJheSA9IGZ1bmN0aW9uKG5vbmFycmF5KSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub25hcnJheSk7IH0sXG4gICAgICAgIC8vIGJvcnJvd2VkIGZyb20galF1ZXJ5XG4gICAgICAgIF9pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiOyB9LFxuICAgICAgICBfaXNBcnJheSA9IGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBBcnJheV1cIjsgfSxcbiAgICAgICAgX2lzUmVnRXhwID0gZnVuY3Rpb24ob2JqKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IFJlZ0V4cF1cIjsgfSxcbiAgICAgICAgX2RlY29kZSA9IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KChzdHIgfHwgJycpLnJlcGxhY2UoL1xcKy9nLCAnICcpKTsgfSxcbiAgICAgICAgX2VuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudCxcbiAgICAgICAgX2VzY2FwZUhUTUwgPSBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHMpLnJlcGxhY2UoLyYoPyFcXHcrOykvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIF9yb3V0ZVdyYXBwZXIgPSBmdW5jdGlvbih2ZXJiKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm91dGUuYXBwbHkodGhpcywgW3ZlcmJdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBfdGVtcGxhdGVfY2FjaGUgPSB7fSxcbiAgICAgICAgX2hhc19oaXN0b3J5ID0gISEod2luZG93Lmhpc3RvcnkgJiYgaGlzdG9yeS5wdXNoU3RhdGUpLFxuICAgICAgICBsb2dnZXJzID0gW107XG5cblxuICAgIC8vIGBTYW1teWAgKGFsc28gYWxpYXNlZCBhcyAkLnNhbW15KSBpcyBub3Qgb25seSB0aGUgbmFtZXNwYWNlIGZvciBhXG4gICAgLy8gbnVtYmVyIG9mIHByb3RvdHlwZXMsIGl0cyBhbHNvIGEgdG9wIGxldmVsIG1ldGhvZCB0aGF0IGFsbG93cyBmb3IgZWFzeVxuICAgIC8vIGNyZWF0aW9uL21hbmFnZW1lbnQgb2YgYFNhbW15LkFwcGxpY2F0aW9uYCBpbnN0YW5jZXMuIFRoZXJlIGFyZSBhXG4gICAgLy8gbnVtYmVyIG9mIGRpZmZlcmVudCBmb3JtcyBmb3IgYFNhbW15KClgIGJ1dCBlYWNoIHJldHVybnMgYW4gaW5zdGFuY2VcbiAgICAvLyBvZiBgU2FtbXkuQXBwbGljYXRpb25gLiBXaGVuIGEgbmV3IGluc3RhbmNlIGlzIGNyZWF0ZWQgdXNpbmdcbiAgICAvLyBgU2FtbXlgIGl0IGlzIGFkZGVkIHRvIGFuIE9iamVjdCBjYWxsZWQgYFNhbW15LmFwcHNgLiBUaGlzXG4gICAgLy8gcHJvdmlkZXMgZm9yIGFuIGVhc3kgd2F5IHRvIGdldCBhdCBleGlzdGluZyBTYW1teSBhcHBsaWNhdGlvbnMuIE9ubHkgb25lXG4gICAgLy8gaW5zdGFuY2UgaXMgYWxsb3dlZCBwZXIgYGVsZW1lbnRfc2VsZWN0b3JgIHNvIHdoZW4gY2FsbGluZ1xuICAgIC8vIGBTYW1teSgnc2VsZWN0b3InKWAgbXVsdGlwbGUgdGltZXMsIHRoZSBmaXJzdCB0aW1lIHdpbGwgY3JlYXRlXG4gICAgLy8gdGhlIGFwcGxpY2F0aW9uIGFuZCB0aGUgZm9sbG93aW5nIHRpbWVzIHdpbGwgZXh0ZW5kIHRoZSBhcHBsaWNhdGlvblxuICAgIC8vIGFscmVhZHkgYWRkZWQgdG8gdGhhdCBzZWxlY3Rvci5cbiAgICAvL1xuICAgIC8vICMjIyBFeGFtcGxlXG4gICAgLy9cbiAgICAvLyAgICAgIC8vIHJldHVybnMgdGhlIGFwcCBhdCAjbWFpbiBvciBhIG5ldyBhcHBcbiAgICAvLyAgICAgIFNhbW15KCcjbWFpbicpXG4gICAgLy9cbiAgICAvLyAgICAgIC8vIGVxdWl2YWxlbnQgdG8gXCJuZXcgU2FtbXkuQXBwbGljYXRpb25cIiwgZXhjZXB0IGFwcGVuZHMgdG8gYXBwc1xuICAgIC8vICAgICAgU2FtbXkoKTtcbiAgICAvLyAgICAgIFNhbW15KGZ1bmN0aW9uKCkgeyAuLi4gfSk7XG4gICAgLy9cbiAgICAvLyAgICAgIC8vIGV4dGVuZHMgdGhlIGFwcCBhdCAnI21haW4nIHdpdGggZnVuY3Rpb24uXG4gICAgLy8gICAgICBTYW1teSgnI21haW4nLCBmdW5jdGlvbigpIHsgLi4uIH0pO1xuICAgIC8vXG4gICAgU2FtbXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBfbWFrZUFycmF5KGFyZ3VtZW50cyksXG4gICAgICAgICAgICBhcHAsIHNlbGVjdG9yO1xuICAgICAgICBTYW1teS5hcHBzID0gU2FtbXkuYXBwcyB8fCB7fTtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT09IDAgfHwgYXJnc1swXSAmJiBfaXNGdW5jdGlvbihhcmdzWzBdKSkgeyAvLyBTYW1teSgpXG4gICAgICAgICAgICByZXR1cm4gU2FtbXkuYXBwbHkoU2FtbXksIFsnYm9keSddLmNvbmNhdChhcmdzKSk7XG4gICAgICAgIH0gZWxzZSBpZih0eXBlb2YgKHNlbGVjdG9yID0gYXJncy5zaGlmdCgpKSA9PSAnc3RyaW5nJykgeyAvLyBTYW1teSgnI21haW4nKVxuICAgICAgICAgICAgYXBwID0gU2FtbXkuYXBwc1tzZWxlY3Rvcl0gfHwgbmV3IFNhbW15LkFwcGxpY2F0aW9uKCk7XG4gICAgICAgICAgICBhcHAuZWxlbWVudF9zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgaWYoYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGFyZ3MsIGZ1bmN0aW9uKGksIHBsdWdpbikge1xuICAgICAgICAgICAgICAgICAgICBhcHAudXNlKHBsdWdpbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiB0aGUgc2VsZWN0b3IgY2hhbmdlcyBtYWtlIHN1cmUgdGhlIHJlZmVyZW5jZSBpbiBTYW1teS5hcHBzIGNoYW5nZXNcbiAgICAgICAgICAgIGlmKGFwcC5lbGVtZW50X3NlbGVjdG9yICE9IHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIFNhbW15LmFwcHNbc2VsZWN0b3JdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU2FtbXkuYXBwc1thcHAuZWxlbWVudF9zZWxlY3Rvcl0gPSBhcHA7XG4gICAgICAgICAgICByZXR1cm4gYXBwO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNhbW15LlZFUlNJT04gPSAnMC43LjYnO1xuXG4gICAgLy8gQWRkIHRvIHRoZSBnbG9iYWwgbG9nZ2VyIHBvb2wuIFRha2VzIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGFuXG4gICAgLy8gdW5rbm93biBudW1iZXIgb2YgYXJndW1lbnRzIGFuZCBzaG91bGQgcHJpbnQgdGhlbSBvciBzZW5kIHRoZW0gc29tZXdoZXJlXG4gICAgLy8gVGhlIGZpcnN0IGFyZ3VtZW50IGlzIGFsd2F5cyBhIHRpbWVzdGFtcC5cbiAgICBTYW1teS5hZGRMb2dnZXIgPSBmdW5jdGlvbihsb2dnZXIpIHtcbiAgICAgICAgbG9nZ2Vycy5wdXNoKGxvZ2dlcik7XG4gICAgfTtcblxuICAgIC8vIFNlbmRzIGEgbG9nIG1lc3NhZ2UgdG8gZWFjaCBsb2dnZXIgbGlzdGVkIGluIHRoZSBnbG9iYWxcbiAgICAvLyBsb2dnZXJzIHBvb2wuIENhbiB0YWtlIGFueSBudW1iZXIgb2YgYXJndW1lbnRzLlxuICAgIC8vIEFsc28gcHJlZml4ZXMgdGhlIGFyZ3VtZW50cyB3aXRoIGEgdGltZXN0YW1wLlxuICAgIFNhbW15LmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IF9tYWtlQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgICAgYXJncy51bnNoaWZ0KFwiW1wiICsgRGF0ZSgpICsgXCJdXCIpO1xuICAgICAgICAkLmVhY2gobG9nZ2VycywgZnVuY3Rpb24oaSwgbG9nZ2VyKSB7XG4gICAgICAgICAgICBsb2dnZXIuYXBwbHkoU2FtbXksIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYodHlwZW9mIHdpbmRvdy5jb25zb2xlICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmKHR5cGVvZiB3aW5kb3cuY29uc29sZS5sb2cgPT09ICdmdW5jdGlvbicgJiYgX2lzRnVuY3Rpb24od2luZG93LmNvbnNvbGUubG9nLmFwcGx5KSkge1xuICAgICAgICAgICAgU2FtbXkuYWRkTG9nZ2VyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZy5hcHBseSh3aW5kb3cuY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgU2FtbXkuYWRkTG9nZ2VyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYodHlwZW9mIGNvbnNvbGUgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgU2FtbXkuYWRkTG9nZ2VyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJC5leHRlbmQoU2FtbXksIHtcbiAgICAgICAgbWFrZUFycmF5OiBfbWFrZUFycmF5LFxuICAgICAgICBpc0Z1bmN0aW9uOiBfaXNGdW5jdGlvbixcbiAgICAgICAgaXNBcnJheTogX2lzQXJyYXlcbiAgICB9KTtcblxuICAgIC8vIFNhbW15Lk9iamVjdCBpcyB0aGUgYmFzZSBmb3IgYWxsIG90aGVyIFNhbW15IGNsYXNzZXMuIEl0IHByb3ZpZGVzIHNvbWUgdXNlZnVsXG4gICAgLy8gZnVuY3Rpb25hbGl0eSwgaW5jbHVkaW5nIGNsb25pbmcsIGl0ZXJhdGluZywgZXRjLlxuICAgIFNhbW15Lk9iamVjdCA9IGZ1bmN0aW9uKG9iaikgeyAvLyBjb25zdHJ1Y3RvclxuICAgICAgICByZXR1cm4gJC5leHRlbmQodGhpcywgb2JqIHx8IHt9KTtcbiAgICB9O1xuXG4gICAgJC5leHRlbmQoU2FtbXkuT2JqZWN0LnByb3RvdHlwZSwge1xuXG4gICAgICAgIC8vIEVzY2FwZSBIVE1MIGluIHN0cmluZywgdXNlIGluIHRlbXBsYXRlcyB0byBwcmV2ZW50IHNjcmlwdCBpbmplY3Rpb24uXG4gICAgICAgIC8vIEFsc28gYWxpYXNlZCBhcyBgaCgpYFxuICAgICAgICBlc2NhcGVIVE1MOiBfZXNjYXBlSFRNTCxcbiAgICAgICAgaDogX2VzY2FwZUhUTUwsXG5cbiAgICAgICAgLy8gUmV0dXJucyBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRoIEZ1bmN0aW9ucyByZW1vdmVkLlxuICAgICAgICB0b0hhc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGpzb24gPSB7fTtcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLCBmdW5jdGlvbihrLCB2KSB7XG4gICAgICAgICAgICAgICAgaWYoIV9pc0Z1bmN0aW9uKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzb25ba10gPSB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmVuZGVycyBhIHNpbXBsZSBIVE1MIHZlcnNpb24gb2YgdGhpcyBPYmplY3RzIGF0dHJpYnV0ZXMuXG4gICAgICAgIC8vIERvZXMgbm90IHJlbmRlciBmdW5jdGlvbnMuXG4gICAgICAgIC8vIEZvciBleGFtcGxlLiBHaXZlbiB0aGlzIFNhbW15Lk9iamVjdDpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIHZhciBzID0gbmV3IFNhbW15Lk9iamVjdCh7Zmlyc3RfbmFtZTogJ1NhbW15JywgbGFzdF9uYW1lOiAnRGF2aXMgSnIuJ30pO1xuICAgICAgICAvLyAgICAgcy50b0hUTUwoKVxuICAgICAgICAvLyAgICAgLy89PiAnPHN0cm9uZz5maXJzdF9uYW1lPC9zdHJvbmc+IFNhbW15PGJyIC8+PHN0cm9uZz5sYXN0X25hbWU8L3N0cm9uZz4gRGF2aXMgSnIuPGJyIC8+J1xuICAgICAgICAvL1xuICAgICAgICB0b0hUTUw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgJC5lYWNoKHRoaXMsIGZ1bmN0aW9uKGssIHYpIHtcbiAgICAgICAgICAgICAgICBpZighX2lzRnVuY3Rpb24odikpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheSArPSBcIjxzdHJvbmc+XCIgKyBrICsgXCI8L3N0cm9uZz4gXCIgKyB2ICsgXCI8YnIgLz5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkaXNwbGF5O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJldHVybnMgYW4gYXJyYXkgb2Yga2V5cyBmb3IgdGhpcyBvYmplY3QuIElmIGBhdHRyaWJ1dGVzX29ubHlgXG4gICAgICAgIC8vIGlzIHRydWUgd2lsbCBub3QgcmV0dXJuIGtleXMgdGhhdCBtYXAgdG8gYSBgZnVuY3Rpb24oKWBcbiAgICAgICAga2V5czogZnVuY3Rpb24oYXR0cmlidXRlc19vbmx5KSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAgICAgZm9yKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaWYoIV9pc0Z1bmN0aW9uKHRoaXNbcHJvcGVydHldKSB8fCAhYXR0cmlidXRlc19vbmx5KSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2hlY2tzIGlmIHRoZSBvYmplY3QgaGFzIGEgdmFsdWUgYXQgYGtleWAgYW5kIHRoYXQgdGhlIHZhbHVlIGlzIG5vdCBlbXB0eVxuICAgICAgICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNba2V5XSAmJiAkLnRyaW0odGhpc1trZXldLnRvU3RyaW5nKCkpICE9PSAnJztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBjb252ZW5pZW5jZSBtZXRob2QgdG8gam9pbiBhcyBtYW55IGFyZ3VtZW50cyBhcyB5b3Ugd2FudFxuICAgICAgICAvLyBieSB0aGUgZmlyc3QgYXJndW1lbnQgLSB1c2VmdWwgZm9yIG1ha2luZyBwYXRoc1xuICAgICAgICBqb2luOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gX21ha2VBcnJheShhcmd1bWVudHMpO1xuICAgICAgICAgICAgdmFyIGRlbGltaXRlciA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgIHJldHVybiBhcmdzLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBTaG9ydGN1dCB0byBTYW1teS5sb2dcbiAgICAgICAgbG9nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFNhbW15LmxvZy5hcHBseShTYW1teSwgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgb2JqZWN0LlxuICAgICAgICAvLyBpZiBgaW5jbHVkZV9mdW5jdGlvbnNgIGlzIHRydWUsIGl0IHdpbGwgYWxzbyB0b1N0cmluZygpIHRoZVxuICAgICAgICAvLyBtZXRob2RzIG9mIHRoaXMgb2JqZWN0LiBCeSBkZWZhdWx0IG9ubHkgcHJpbnRzIHRoZSBhdHRyaWJ1dGVzLlxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24oaW5jbHVkZV9mdW5jdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzID0gW107XG4gICAgICAgICAgICAkLmVhY2godGhpcywgZnVuY3Rpb24oaywgdikge1xuICAgICAgICAgICAgICAgIGlmKCFfaXNGdW5jdGlvbih2KSB8fCBpbmNsdWRlX2Z1bmN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBzLnB1c2goJ1wiJyArIGsgKyAnXCI6ICcgKyB2LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFwiU2FtbXkuT2JqZWN0OiB7XCIgKyBzLmpvaW4oJywnKSArIFwifVwiO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vIFJldHVybiB3aGV0aGVyIHRoZSBldmVudCB0YXJnZXRzIHRoaXMgd2luZG93LlxuICAgIFNhbW15LnRhcmdldElzVGhpc1dpbmRvdyA9IGZ1bmN0aW9uIHRhcmdldElzVGhpc1dpbmRvdyhldmVudCwgdGFnTmFtZSkge1xuICAgICAgICB2YXIgdGFyZ2V0RWxlbWVudCA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KHRhZ05hbWUpO1xuICAgICAgICBpZih0YXJnZXRFbGVtZW50Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgIHZhciB0YXJnZXRXaW5kb3cgPSB0YXJnZXRFbGVtZW50LmF0dHIoJ3RhcmdldCcpO1xuICAgICAgICBpZighdGFyZ2V0V2luZG93IHx8IHRhcmdldFdpbmRvdyA9PT0gd2luZG93Lm5hbWUgfHwgdGFyZ2V0V2luZG93ID09PSAnX3NlbGYnKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgIGlmKHRhcmdldFdpbmRvdyA9PT0gJ19ibGFuaycpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIGlmKHRhcmdldFdpbmRvdyA9PT0gJ3RvcCcgJiYgd2luZG93ID09PSB3aW5kb3cudG9wKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG5cbiAgICAvLyBUaGUgRGVmYXVsdExvY2F0aW9uUHJveHkgaXMgdGhlIGRlZmF1bHQgbG9jYXRpb24gcHJveHkgZm9yIGFsbCBTYW1teSBhcHBsaWNhdGlvbnMuXG4gICAgLy8gQSBsb2NhdGlvbiBwcm94eSBpcyBhIHByb3RvdHlwZSB0aGF0IGNvbmZvcm1zIHRvIGEgc2ltcGxlIGludGVyZmFjZS4gVGhlIHB1cnBvc2VcbiAgICAvLyBvZiBhIGxvY2F0aW9uIHByb3h5IGlzIHRvIG5vdGlmeSB0aGUgU2FtbXkuQXBwbGljYXRpb24gaXRzIGJvdW5kIHRvIHdoZW4gdGhlIGxvY2F0aW9uXG4gICAgLy8gb3IgJ2V4dGVybmFsIHN0YXRlJyBjaGFuZ2VzLlxuICAgIC8vXG4gICAgLy8gVGhlIGBEZWZhdWx0TG9jYXRpb25Qcm94eWAgd2F0Y2hlcyBmb3IgY2hhbmdlcyB0byB0aGUgcGF0aCBvZiB0aGUgY3VycmVudCB3aW5kb3cgYW5kXG4gICAgLy8gaXMgYWxzbyBhYmxlIHRvIHNldCB0aGUgcGF0aCBiYXNlZCBvbiBjaGFuZ2VzIGluIHRoZSBhcHBsaWNhdGlvbi4gSXQgZG9lcyB0aGlzIGJ5XG4gICAgLy8gdXNpbmcgZGlmZmVyZW50IG1ldGhvZHMgZGVwZW5kaW5nIG9uIHdoYXQgaXMgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuIEluXG4gICAgLy8gdGhlIGxhdGVzdCBhbmQgZ3JlYXRlc3QgYnJvd3NlcnMgaXQgdXNlZCB0aGUgSFRNTDUgSGlzdG9yeSBBUEkgYW5kIHRoZSBgcHVzaFN0YXRlYFxuICAgIC8vIGBwb3BTdGF0ZWAgZXZlbnRzL21ldGhvZHMuIFRoaXMgYWxsb3dzIHlvdSB0byB1c2UgU2FtbXkgdG8gc2VydmUgYSBzaXRlIGJlaGluZCBub3JtYWxcbiAgICAvLyBVUkkgcGF0aHMgYXMgb3Bwb3NlZCB0byB0aGUgb2xkZXIgZGVmYXVsdCBvZiBoYXNoICgjKSBiYXNlZCByb3V0aW5nLiBCZWNhdXNlIHRoZSBzZXJ2ZXJcbiAgICAvLyBjYW4gaW50ZXJwcmV0IHRoZSBjaGFuZ2VkIHBhdGggb24gYSByZWZyZXNoIG9yIHJlLWVudHJ5LCB0aG91Z2gsIGl0IHJlcXVpcmVzIGFkZGl0aW9uYWxcbiAgICAvLyBzdXBwb3J0IG9uIHRoZSBzZXJ2ZXIgc2lkZS4gSWYgeW91J2QgbGlrZSB0byBmb3JjZSBkaXNhYmxlIEhUTUw1IGhpc3Rvcnkgc3VwcG9ydCwgcGxlYXNlXG4gICAgLy8gdXNlIHRoZSBgZGlzYWJsZV9wdXNoX3N0YXRlYCBzZXR0aW5nIG9uIGBTYW1teS5BcHBsaWNhdGlvbmAuIElmIHB1c2hTdGF0ZSBzdXBwb3J0XG4gICAgLy8gaXMgZW5hYmxlZCwgYERlZmF1bHRMb2NhdGlvblByb3h5YCBhbHNvIGJpbmRzIHRvIGFsbCBsaW5rcyBvbiB0aGUgcGFnZS4gSWYgYSBsaW5rIGlzIGNsaWNrZWRcbiAgICAvLyB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnQgc2V0IG9mIHJvdXRlcywgdGhlIFVSTCBpcyBjaGFuZ2VkIHVzaW5nIHB1c2hTdGF0ZSBpbnN0ZWFkIG9mXG4gICAgLy8gZnVsbHkgc2V0dGluZyB0aGUgbG9jYXRpb24gYW5kIHRoZSBhcHAgaXMgbm90aWZpZWQgb2YgdGhlIGNoYW5nZS5cbiAgICAvL1xuICAgIC8vIElmIHRoZSBicm93c2VyIGRvZXMgbm90IGhhdmUgc3VwcG9ydCBmb3IgSFRNTDUgSGlzdG9yeSwgYERlZmF1bHRMb2NhdGlvblByb3h5YCBhdXRvbWF0aWNhbGx5XG4gICAgLy8gZmFsbHMgYmFjayB0byB0aGUgb2xkZXIgaGFzaCBiYXNlZCByb3V0aW5nLiBUaGUgbmV3ZXN0IGJyb3dzZXJzIChJRSwgU2FmYXJpID4gNCwgRkYgPj0gMy42KVxuICAgIC8vIHN1cHBvcnQgYSAnb25oYXNoY2hhbmdlJyBET00gZXZlbnQsIHRoYXRzIGZpcmVkIHdoZW5ldmVyIHRoZSBsb2NhdGlvbi5oYXNoIGNoYW5nZXMuXG4gICAgLy8gSW4gdGhpcyBzaXR1YXRpb24gdGhlIERlZmF1bHRMb2NhdGlvblByb3h5IGp1c3QgYmluZHMgdG8gdGhpcyBldmVudCBhbmQgZGVsZWdhdGVzIGl0IHRvXG4gICAgLy8gdGhlIGFwcGxpY2F0aW9uLiBJbiB0aGUgY2FzZSBvZiBvbGRlciBicm93c2VycyBhIHBvbGxlciBpcyBzZXQgdXAgdG8gdHJhY2sgY2hhbmdlcyB0byB0aGVcbiAgICAvLyBoYXNoLlxuICAgIFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5ID0gZnVuY3Rpb24oYXBwLCBydW5faW50ZXJ2YWxfZXZlcnkpIHtcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgICAgIC8vIHNldCBpcyBuYXRpdmUgdG8gZmFsc2UgYW5kIHN0YXJ0IHRoZSBwb2xsZXIgaW1tZWRpYXRlbHlcbiAgICAgICAgdGhpcy5pc19uYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYXNfaGlzdG9yeSA9IF9oYXNfaGlzdG9yeTtcbiAgICAgICAgdGhpcy5fc3RhcnRQb2xsaW5nKHJ1bl9pbnRlcnZhbF9ldmVyeSk7XG4gICAgfTtcblxuICAgIFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5LmZ1bGxQYXRoID0gZnVuY3Rpb24obG9jYXRpb25fb2JqKSB7XG4gICAgICAgIC8vIEJ5cGFzcyB0aGUgYHdpbmRvdy5sb2NhdGlvbi5oYXNoYCBhdHRyaWJ1dGUuICBJZiBhIHF1ZXN0aW9uIG1hcmtcbiAgICAgICAgLy8gYXBwZWFycyBpbiB0aGUgaGFzaCBJRTYgd2lsbCBzdHJpcCBpdCBhbmQgYWxsIG9mIHRoZSBmb2xsb3dpbmdcbiAgICAgICAgLy8gY2hhcmFjdGVycyBmcm9tIGB3aW5kb3cubG9jYXRpb24uaGFzaGAuXG4gICAgICAgIHZhciBtYXRjaGVzID0gbG9jYXRpb25fb2JqLnRvU3RyaW5nKCkubWF0Y2goL15bXiNdKigjLispJC8pO1xuICAgICAgICB2YXIgaGFzaCA9IG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogJyc7XG4gICAgICAgIHJldHVybiBbbG9jYXRpb25fb2JqLnBhdGhuYW1lLCBsb2NhdGlvbl9vYmouc2VhcmNoLCBoYXNoXS5qb2luKCcnKTtcbiAgICB9O1xuICAgICQuZXh0ZW5kKFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5LnByb3RvdHlwZSwge1xuICAgICAgICAvLyBiaW5kIHRoZSBwcm94eSBldmVudHMgdG8gdGhlIGN1cnJlbnQgYXBwLlxuICAgICAgICBiaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm94eSA9IHRoaXMsIGFwcCA9IHRoaXMuYXBwLCBscCA9IFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5O1xuICAgICAgICAgICAgJCh3aW5kb3cpLmJpbmQoJ2hhc2hjaGFuZ2UuJyArIHRoaXMuYXBwLmV2ZW50TmFtZXNwYWNlKCksIGZ1bmN0aW9uKGUsIG5vbl9uYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSByZWNlaXZlIGEgbmF0aXZlIGhhc2ggY2hhbmdlIGV2ZW50LCBzZXQgdGhlIHByb3h5IGFjY29yZGluZ2x5XG4gICAgICAgICAgICAgICAgLy8gYW5kIHN0b3AgcG9sbGluZ1xuICAgICAgICAgICAgICAgIGlmKHByb3h5LmlzX25hdGl2ZSA9PT0gZmFsc2UgJiYgIW5vbl9uYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJveHkuaXNfbmF0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwobHAuX2ludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgbHAuX2ludGVydmFsID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXBwLnRyaWdnZXIoJ2xvY2F0aW9uLWNoYW5nZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoX2hhc19oaXN0b3J5ICYmICFhcHAuZGlzYWJsZV9wdXNoX3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gYmluZCB0byBwb3BzdGF0ZVxuICAgICAgICAgICAgICAgICQod2luZG93KS5iaW5kKCdwb3BzdGF0ZS4nICsgdGhpcy5hcHAuZXZlbnROYW1lc3BhY2UoKSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBhcHAudHJpZ2dlcignbG9jYXRpb24tY2hhbmdlZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIGJpbmQgdG8gbGluayBjbGlja3MgdGhhdCBoYXZlIHJvdXRlc1xuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLmRlbGVnYXRlKCdhJywgJ2NsaWNrLmhpc3RvcnktJyArIHRoaXMuYXBwLmV2ZW50TmFtZXNwYWNlKCksIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bGxfcGF0aCA9IGxwLmZ1bGxQYXRoKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCBhbmNob3IncyBob3N0IG5hbWUgaW4gYSBjcm9zcyBicm93c2VyIGNvbXBhdGlibGUgd2F5LlxuICAgICAgICAgICAgICAgICAgICAgIC8vIElFIGxvb3NlcyBob3N0bmFtZSBwcm9wZXJ0eSB3aGVuIHNldHRpbmcgaHJlZiBpbiBKU1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHdpdGggYSByZWxhdGl2ZSBVUkwsIGUuZy4gYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLFwiL3doYXRldmVyXCIpLlxuICAgICAgICAgICAgICAgICAgICAgIC8vIENpcmN1bXZlbnQgdGhpcyBwcm9ibGVtIGJ5IGNyZWF0aW5nIGEgbmV3IGxpbmsgd2l0aCBnaXZlbiBVUkwgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgLy8gcXVlcnlpbmcgdGhhdCBmb3IgYSBob3N0bmFtZS5cbiAgICAgICAgICAgICAgICAgICAgICBob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUgPyB0aGlzLmhvc3RuYW1lIDogZnVuY3Rpb24oYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsLmhyZWYgPSBhLmhyZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsLmhvc3RuYW1lO1xuICAgICAgICAgICAgICAgICAgICAgIH0odGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoaG9zdG5hbWUgPT0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHAubG9va3VwUm91dGUoJ2dldCcsIGZ1bGxfcGF0aCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIFNhbW15LnRhcmdldElzVGhpc1dpbmRvdyhlLCAnYScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm94eS5zZXRMb2NhdGlvbihmdWxsX3BhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighbHAuX2JpbmRpbmdzKSB7XG4gICAgICAgICAgICAgICAgbHAuX2JpbmRpbmdzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxwLl9iaW5kaW5ncysrO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHVuYmluZCB0aGUgcHJveHkgZXZlbnRzIGZyb20gdGhlIGN1cnJlbnQgYXBwXG4gICAgICAgIHVuYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHdpbmRvdykudW5iaW5kKCdoYXNoY2hhbmdlLicgKyB0aGlzLmFwcC5ldmVudE5hbWVzcGFjZSgpKTtcbiAgICAgICAgICAgICQod2luZG93KS51bmJpbmQoJ3BvcHN0YXRlLicgKyB0aGlzLmFwcC5ldmVudE5hbWVzcGFjZSgpKTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnVuZGVsZWdhdGUoJ2EnLCAnY2xpY2suaGlzdG9yeS0nICsgdGhpcy5hcHAuZXZlbnROYW1lc3BhY2UoKSk7XG4gICAgICAgICAgICBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5fYmluZGluZ3MtLTtcbiAgICAgICAgICAgIGlmKFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5Ll9iaW5kaW5ncyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkuX2ludGVydmFsKTtcbiAgICAgICAgICAgICAgICBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5faW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBsb2NhdGlvbiBmcm9tIHRoZSBoYXNoLlxuICAgICAgICBnZXRMb2NhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkuZnVsbFBhdGgod2luZG93LmxvY2F0aW9uKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBzZXQgdGhlIGN1cnJlbnQgbG9jYXRpb24gdG8gYG5ld19sb2NhdGlvbmBcbiAgICAgICAgc2V0TG9jYXRpb246IGZ1bmN0aW9uKG5ld19sb2NhdGlvbikge1xuICAgICAgICAgICAgaWYoL14oW14jXFwvXXwkKS8udGVzdChuZXdfbG9jYXRpb24pKSB7IC8vIG5vbi1wcmVmaXhlZCB1cmxcbiAgICAgICAgICAgICAgICBpZihfaGFzX2hpc3RvcnkgJiYgIXRoaXMuYXBwLmRpc2FibGVfcHVzaF9zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdfbG9jYXRpb24gPSAnLycgKyBuZXdfbG9jYXRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3X2xvY2F0aW9uID0gJyMhLycgKyBuZXdfbG9jYXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobmV3X2xvY2F0aW9uICE9IHRoaXMuZ2V0TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICAgIC8vIEhUTUw1IEhpc3RvcnkgZXhpc3RzIGFuZCBuZXdfbG9jYXRpb24gaXMgYSBmdWxsIHBhdGhcbiAgICAgICAgICAgICAgICBpZihfaGFzX2hpc3RvcnkgJiYgIXRoaXMuYXBwLmRpc2FibGVfcHVzaF9zdGF0ZSAmJiAvXlxcLy8udGVzdChuZXdfbG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgcGF0aDogbmV3X2xvY2F0aW9uIH0sIHdpbmRvdy50aXRsZSwgbmV3X2xvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAudHJpZ2dlcignbG9jYXRpb24tY2hhbmdlZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAod2luZG93LmxvY2F0aW9uID0gbmV3X2xvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3N0YXJ0UG9sbGluZzogZnVuY3Rpb24oZXZlcnkpIHtcbiAgICAgICAgICAgIC8vIHNldCB1cCBpbnRlcnZhbFxuICAgICAgICAgICAgdmFyIHByb3h5ID0gdGhpcztcbiAgICAgICAgICAgIGlmKCFTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5faW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICBpZighZXZlcnkpIHsgZXZlcnkgPSAxMDsgfVxuICAgICAgICAgICAgICAgIHZhciBoYXNoQ2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfbG9jYXRpb24gPSBwcm94eS5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkuX2xhc3RfbG9jYXRpb24gPT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50X2xvY2F0aW9uICE9IFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5Ll9sYXN0X2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignaGFzaGNoYW5nZScsIFt0cnVlXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5fbGFzdF9sb2NhdGlvbiA9IGN1cnJlbnRfbG9jYXRpb247XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBoYXNoQ2hlY2soKTtcbiAgICAgICAgICAgICAgICBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eS5faW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoaGFzaENoZWNrLCBldmVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gU2FtbXkuQXBwbGljYXRpb24gaXMgdGhlIEJhc2UgcHJvdG90eXBlIGZvciBkZWZpbmluZyAnYXBwbGljYXRpb25zJy5cbiAgICAvLyBBbiAnYXBwbGljYXRpb24nIGlzIGEgY29sbGVjdGlvbiBvZiAncm91dGVzJyBhbmQgYm91bmQgZXZlbnRzIHRoYXQgaXNcbiAgICAvLyBhdHRhY2hlZCB0byBhbiBlbGVtZW50IHdoZW4gYHJ1bigpYCBpcyBjYWxsZWQuXG4gICAgLy8gVGhlIG9ubHkgYXJndW1lbnQgYW4gJ2FwcF9mdW5jdGlvbicgaXMgZXZhbHVhdGVkIHdpdGhpbiB0aGUgY29udGV4dCBvZiB0aGUgYXBwbGljYXRpb24uXG4gICAgU2FtbXkuQXBwbGljYXRpb24gPSBmdW5jdGlvbihhcHBfZnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGFwcCA9IHRoaXM7XG4gICAgICAgIHRoaXMucm91dGVzID0ge307XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IFNhbW15Lk9iamVjdCh7fSk7XG4gICAgICAgIHRoaXMuYXJvdW5kcyA9IFtdO1xuICAgICAgICB0aGlzLmJlZm9yZXMgPSBbXTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgYSB1bmlxdWUgbmFtZXNwYWNlXG4gICAgICAgIHRoaXMubmFtZXNwYWNlID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSArICctJyArIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMDAwLCAxMCk7XG4gICAgICAgIHRoaXMuY29udGV4dF9wcm90b3R5cGUgPSBmdW5jdGlvbigpIHsgU2FtbXkuRXZlbnRDb250ZXh0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgICAgIHRoaXMuY29udGV4dF9wcm90b3R5cGUucHJvdG90eXBlID0gbmV3IFNhbW15LkV2ZW50Q29udGV4dCgpO1xuXG4gICAgICAgIGlmKF9pc0Z1bmN0aW9uKGFwcF9mdW5jdGlvbikpIHtcbiAgICAgICAgICAgIGFwcF9mdW5jdGlvbi5hcHBseSh0aGlzLCBbdGhpc10pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCB0aGUgbG9jYXRpb24gcHJveHkgaWYgbm90IGRlZmluZWQgdG8gdGhlIGRlZmF1bHQgKERlZmF1bHRMb2NhdGlvblByb3h5KVxuICAgICAgICBpZighdGhpcy5fbG9jYXRpb25fcHJveHkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYXRpb25Qcm94eShuZXcgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHkodGhpcywgdGhpcy5ydW5faW50ZXJ2YWxfZXZlcnkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRUb0FsbEV2ZW50cyhmdW5jdGlvbihlLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgYXBwLmxvZyhhcHAudG9TdHJpbmcoKSwgZS5jbGVhbmVkX3R5cGUsIGRhdGEgfHwge30pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2FtbXkuQXBwbGljYXRpb24ucHJvdG90eXBlID0gJC5leHRlbmQoe30sIFNhbW15Lk9iamVjdC5wcm90b3R5cGUsIHtcblxuICAgICAgICAvLyB0aGUgZm91ciByb3V0ZSB2ZXJic1xuICAgICAgICBST1VURV9WRVJCUzogWydnZXQnLCAncG9zdCcsICdwdXQnLCAnZGVsZXRlJ10sXG5cbiAgICAgICAgLy8gQW4gYXJyYXkgb2YgdGhlIGRlZmF1bHQgZXZlbnRzIHRyaWdnZXJlZCBieSB0aGVcbiAgICAgICAgLy8gYXBwbGljYXRpb24gZHVyaW5nIGl0cyBsaWZlY3ljbGVcbiAgICAgICAgQVBQX0VWRU5UUzogWydydW4nLCAndW5sb2FkJywgJ2xvb2t1cC1yb3V0ZScsICdydW4tcm91dGUnLCAncm91dGUtZm91bmQnLCAnZXZlbnQtY29udGV4dC1iZWZvcmUnLCAnZXZlbnQtY29udGV4dC1hZnRlcicsICdjaGFuZ2VkJywgJ2Vycm9yJywgJ2NoZWNrLWZvcm0tc3VibWlzc2lvbicsICdyZWRpcmVjdCcsICdsb2NhdGlvbi1jaGFuZ2VkJ10sXG5cbiAgICAgICAgX2xhc3Rfcm91dGU6IG51bGwsXG4gICAgICAgIF9sb2NhdGlvbl9wcm94eTogbnVsbCxcbiAgICAgICAgX3J1bm5pbmc6IGZhbHNlLFxuXG4gICAgICAgIC8vIERlZmluZXMgd2hhdCBlbGVtZW50IHRoZSBhcHBsaWNhdGlvbiBpcyBib3VuZCB0by4gUHJvdmlkZSBhIHNlbGVjdG9yXG4gICAgICAgIC8vIChwYXJzZWFibGUgYnkgYGpRdWVyeSgpYCkgYW5kIHRoaXMgd2lsbCBiZSB1c2VkIGJ5IGAkZWxlbWVudCgpYFxuICAgICAgICBlbGVtZW50X3NlbGVjdG9yOiAnYm9keScsXG5cbiAgICAgICAgLy8gV2hlbiBzZXQgdG8gdHJ1ZSwgbG9ncyBhbGwgb2YgdGhlIGRlZmF1bHQgZXZlbnRzIHVzaW5nIGBsb2coKWBcbiAgICAgICAgZGVidWc6IGZhbHNlLFxuXG4gICAgICAgIC8vIFdoZW4gc2V0IHRvIHRydWUsIGFuZCB0aGUgZXJyb3IoKSBoYW5kbGVyIGlzIG5vdCBvdmVycmlkZGVuLCB3aWxsIGFjdHVhbGx5XG4gICAgICAgIC8vIHJhaXNlIEpTIGVycm9ycyBpbiByb3V0ZXMgKDUwMCkgYW5kIHdoZW4gcm91dGVzIGNhbid0IGJlIGZvdW5kICg0MDQpXG4gICAgICAgIHJhaXNlX2Vycm9yczogZmFsc2UsXG5cbiAgICAgICAgLy8gVGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGhlIFVSTCBpcyBxdWVyaWVkIGZvciBjaGFuZ2VzXG4gICAgICAgIHJ1bl9pbnRlcnZhbF9ldmVyeTogNTAsXG5cbiAgICAgICAgLy8gaWYgdXNpbmcgdGhlIGBEZWZhdWx0TG9jYXRpb25Qcm94eWAgc2V0dGluZyB0aGlzIHRvIHRydWUgd2lsbCBmb3JjZSB0aGUgYXBwIHRvIHVzZVxuICAgICAgICAvLyB0cmFkaXRpb25hbCBoYXNoIGJhc2VkIHJvdXRpbmcgYXMgb3Bwb3NlZCB0byB0aGUgbmV3IEhUTUw1IFB1c2hTdGF0ZSBzdXBwb3J0XG4gICAgICAgIGRpc2FibGVfcHVzaF9zdGF0ZTogZmFsc2UsXG5cbiAgICAgICAgLy8gVGhlIGRlZmF1bHQgdGVtcGxhdGUgZW5naW5lIHRvIHVzZSB3aGVuIHVzaW5nIGBwYXJ0aWFsKClgIGluIGFuXG4gICAgICAgIC8vIGBFdmVudENvbnRleHRgLiBgdGVtcGxhdGVfZW5naW5lYCBjYW4gZWl0aGVyIGJlIGEgc3RyaW5nIHRoYXRcbiAgICAgICAgLy8gY29ycmVzcG9uZHMgdG8gdGhlIG5hbWUgb2YgYSBtZXRob2QvaGVscGVyIG9uIEV2ZW50Q29udGV4dCBvciBpdCBjYW4gYmUgYSBmdW5jdGlvblxuICAgICAgICAvLyB0aGF0IHRha2VzIHR3byBhcmd1bWVudHMsIHRoZSBjb250ZW50IG9mIHRoZSB1bnJlbmRlcmVkIHBhcnRpYWwgYW5kIGFuIG9wdGlvbmFsXG4gICAgICAgIC8vIEpTIG9iamVjdCB0aGF0IGNvbnRhaW5zIGludGVycG9sYXRpb24gZGF0YS4gVGVtcGxhdGUgZW5naW5lIGlzIG9ubHkgY2FsbGVkL3JlZmVycmVkXG4gICAgICAgIC8vIHRvIGlmIHRoZSBleHRlbnNpb24gb2YgdGhlIHBhcnRpYWwgaXMgbnVsbCBvciB1bmtub3duLiBTZWUgYHBhcnRpYWwoKWBcbiAgICAgICAgLy8gZm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICAgICAgdGVtcGxhdGVfZW5naW5lOiBudWxsLFxuXG4gICAgICAgIC8vIC8vPT4gU2FtbXkuQXBwbGljYXRpb246IGJvZHlcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICdTYW1teS5BcHBsaWNhdGlvbjonICsgdGhpcy5lbGVtZW50X3NlbGVjdG9yO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHJldHVybnMgYSBqUXVlcnkgb2JqZWN0IG9mIHRoZSBBcHBsaWNhdGlvbnMgYm91bmQgZWxlbWVudC5cbiAgICAgICAgJGVsZW1lbnQ6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IgPyAkKHRoaXMuZWxlbWVudF9zZWxlY3RvcikuZmluZChzZWxlY3RvcikgOiAkKHRoaXMuZWxlbWVudF9zZWxlY3Rvcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gYHVzZSgpYCBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIGluY2x1ZGluZyBTYW1teSBwbHVnaW5zLlxuICAgICAgICAvLyBUaGUgZmlyc3QgYXJndW1lbnQgdG8gdXNlIHNob3VsZCBiZSBhIGZ1bmN0aW9uKCkgdGhhdCBpcyBldmFsdWF0ZWRcbiAgICAgICAgLy8gaW4gdGhlIGNvbnRleHQgb2YgdGhlIGN1cnJlbnQgYXBwbGljYXRpb24sIGp1c3QgbGlrZSB0aGUgYGFwcF9mdW5jdGlvbmBcbiAgICAgICAgLy8gYXJndW1lbnQgdG8gdGhlIGBTYW1teS5BcHBsaWNhdGlvbmAgY29uc3RydWN0b3IuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBhcmUgcGFzc2VkIHRvIHRoZSBhcHAgZnVuY3Rpb24gc2VxdWVudGlhbGx5LlxuICAgICAgICAvL1xuICAgICAgICAvLyBGb3IgbXVjaCBtb3JlIGRldGFpbCBhYm91dCBwbHVnaW5zLCBjaGVjayBvdXQ6XG4gICAgICAgIC8vIFtodHRwOi8vc2FtbXlqcy5vcmcvZG9jcy9wbHVnaW5zXShodHRwOi8vc2FtbXlqcy5vcmcvZG9jcy9wbHVnaW5zKVxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHZhciBNeVBsdWdpbiA9IGZ1bmN0aW9uKGFwcCwgcHJlcGVuZCkge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgdGhpcy5oZWxwZXJzKHtcbiAgICAgICAgLy8gICAgICAgICAgbXloZWxwZXI6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICBhbGVydChwcmVwZW5kICsgXCIgXCIgKyB0ZXh0KTtcbiAgICAgICAgLy8gICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgfTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB2YXIgYXBwID0gJC5zYW1teShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHRoaXMudXNlKE15UGx1Z2luLCAnVGhpcyBpcyBteSBwbHVnaW4nKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHRoaXMuZ2V0KCcjLycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICB0aGlzLm15aGVscGVyKCdhbmQgZG9udCB5b3UgZm9yZ2V0IGl0IScpO1xuICAgICAgICAvLyAgICAgICAgICAvLz0+IEFsZXJ0czogVGhpcyBpcyBteSBwbHVnaW4gYW5kIGRvbnQgeW91IGZvcmdldCBpdCFcbiAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyBJZiBwbHVnaW4gaXMgcGFzc2VkIGFzIGEgc3RyaW5nIGl0IGFzc3VtZXMgeW91ciBhcmUgdHJ5aW5nIHRvIGxvYWRcbiAgICAgICAgLy8gU2FtbXkuXCJQbHVnaW5cIi4gVGhpcyBpcyB0aGUgcHJlZmVycmVkIHdheSBvZiBsb2FkaW5nIGNvcmUgU2FtbXkgcGx1Z2luc1xuICAgICAgICAvLyBhcyBpdCBhbGxvd3MgZm9yIGJldHRlciBlcnJvci1tZXNzYWdpbmcuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgJC5zYW1teShmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMudXNlKCdNdXN0YWNoZScpOyAvLz0+IFNhbW15Lk11c3RhY2hlXG4gICAgICAgIC8vICAgICAgICB0aGlzLnVzZSgnU3RvcmFnZScpOyAvLz0+IFNhbW15LlN0b3JhZ2VcbiAgICAgICAgLy8gICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgdXNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGZsYXR0ZW4gdGhlIGFyZ3VtZW50c1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBfbWFrZUFycmF5KGFyZ3VtZW50cyksXG4gICAgICAgICAgICAgICAgcGx1Z2luID0gYXJncy5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIHBsdWdpbl9uYW1lID0gcGx1Z2luIHx8ICcnO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHBsdWdpbiA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5fbmFtZSA9ICdTYW1teS4nICsgcGx1Z2luO1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW4gPSBTYW1teVtwbHVnaW5dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwbHVnaW4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgcGx1Z2luID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yKFwiUGx1Z2luIEVycm9yOiBjYWxsZWQgdXNlKCkgYnV0IHBsdWdpbiAoXCIgKyBwbHVnaW5fbmFtZS50b1N0cmluZygpICsgXCIpIGlzIG5vdCBkZWZpbmVkXCIsIGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZighX2lzRnVuY3Rpb24ocGx1Z2luKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yKFwiUGx1Z2luIEVycm9yOiBjYWxsZWQgdXNlKCkgYnV0ICdcIiArIHBsdWdpbl9uYW1lLnRvU3RyaW5nKCkgKyBcIicgaXMgbm90IGEgZnVuY3Rpb25cIiwgZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcihcIlBsdWdpbiBFcnJvclwiLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBTZXRzIHRoZSBsb2NhdGlvbiBwcm94eSBmb3IgdGhlIGN1cnJlbnQgYXBwLiBCeSBkZWZhdWx0IHRoaXMgaXMgc2V0IHRvXG4gICAgICAgIC8vIGEgbmV3IGBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eWAgb24gaW5pdGlhbGl6YXRpb24uIEhvd2V2ZXIsIHlvdSBjYW4gc2V0XG4gICAgICAgIC8vIHRoZSBsb2NhdGlvbl9wcm94eSBpbnNpZGUgeW91J3JlIGFwcCBmdW5jdGlvbiB0byBnaXZlIHlvdXIgYXBwIGEgY3VzdG9tXG4gICAgICAgIC8vIGxvY2F0aW9uIG1lY2hhbmlzbS4gU2VlIGBTYW1teS5EZWZhdWx0TG9jYXRpb25Qcm94eWAgYW5kIGBTYW1teS5EYXRhTG9jYXRpb25Qcm94eWBcbiAgICAgICAgLy8gZm9yIGV4YW1wbGVzLlxuICAgICAgICAvL1xuICAgICAgICAvLyBgc2V0TG9jYXRpb25Qcm94eSgpYCB0YWtlcyBhbiBpbml0aWFsaXplZCBsb2NhdGlvbiBwcm94eS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIC8vIHRvIGJpbmQgdG8gZGF0YSBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGhhc2g7XG4gICAgICAgIC8vICAgICAgICB2YXIgYXBwID0gJC5zYW1teShmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgICAgdGhpcy5zZXRMb2NhdGlvblByb3h5KG5ldyBTYW1teS5EYXRhTG9jYXRpb25Qcm94eSh0aGlzKSk7XG4gICAgICAgIC8vICAgICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgc2V0TG9jYXRpb25Qcm94eTogZnVuY3Rpb24obmV3X3Byb3h5KSB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxfcHJveHkgPSB0aGlzLl9sb2NhdGlvbl9wcm94eTtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uX3Byb3h5ID0gbmV3X3Byb3h5O1xuICAgICAgICAgICAgaWYodGhpcy5pc1J1bm5pbmcoKSkge1xuICAgICAgICAgICAgICAgIGlmKG9yaWdpbmFsX3Byb3h5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBsb2NhdGlvbiBwcm94eSwgdW5iaW5kIGl0LlxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9wcm94eS51bmJpbmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25fcHJveHkuYmluZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHByb3ZpZGUgbG9nKCkgb3ZlcnJpZGUgZm9yIGluc2lkZSBhbiBhcHAgdGhhdCBpbmNsdWRlcyB0aGUgcmVsZXZhbnQgYXBwbGljYXRpb24gZWxlbWVudF9zZWxlY3RvclxuICAgICAgICBsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgU2FtbXkubG9nLmFwcGx5KFNhbW15LCBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFt0aGlzLmVsZW1lbnRfc2VsZWN0b3JdLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8vIGByb3V0ZSgpYCBpcyB0aGUgbWFpbiBtZXRob2QgZm9yIGRlZmluaW5nIHJvdXRlcyB3aXRoaW4gYW4gYXBwbGljYXRpb24uXG4gICAgICAgIC8vIEZvciBncmVhdCBkZXRhaWwgb24gcm91dGVzLCBjaGVjayBvdXQ6XG4gICAgICAgIC8vIFtodHRwOi8vc2FtbXlqcy5vcmcvZG9jcy9yb3V0ZXNdKGh0dHA6Ly9zYW1teWpzLm9yZy9kb2NzL3JvdXRlcylcbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhpcyBtZXRob2QgYWxzbyBoYXMgYWxpYXNlcyBmb3IgZWFjaCBvZiB0aGUgZGlmZmVyZW50IHZlcmJzIChlZy4gYGdldCgpYCwgYHBvc3QoKWAsIGV0Yy4pXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBBcmd1bWVudHNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gKiBgdmVyYmAgQSBTdHJpbmcgaW4gdGhlIHNldCBvZiBST1VURV9WRVJCUyBvciAnYW55Jy4gJ2FueScgd2lsbCBhZGQgcm91dGVzIGZvciBlYWNoXG4gICAgICAgIC8vICAgIG9mIHRoZSBST1VURV9WRVJCUy4gSWYgb25seSB0d28gYXJndW1lbnRzIGFyZSBwYXNzZWQsXG4gICAgICAgIC8vICAgIHRoZSBmaXJzdCBhcmd1bWVudCBpcyB0aGUgcGF0aCwgdGhlIHNlY29uZCBpcyB0aGUgY2FsbGJhY2sgYW5kIHRoZSB2ZXJiXG4gICAgICAgIC8vICAgIGlzIGFzc3VtZWQgdG8gYmUgJ2FueScuXG4gICAgICAgIC8vICogYHBhdGhgIEEgUmVnZXhwIG9yIGEgU3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcGF0aCB0byBtYXRjaCB0byBpbnZva2UgdGhpcyB2ZXJiLlxuICAgICAgICAvLyAqIGBjYWxsYmFja2AgQSBGdW5jdGlvbiB0aGF0IGlzIGNhbGxlZC9ldmFsdWF0ZWQgd2hlbiB0aGUgcm91dGUgaXMgcnVuIHNlZTogYHJ1blJvdXRlKClgLlxuICAgICAgICAvLyAgICBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIHBhc3MgYSBzdHJpbmcgYXMgdGhlIGNhbGxiYWNrLCB3aGljaCBpcyBsb29rZWQgdXAgYXMgdGhlIG5hbWVcbiAgICAgICAgLy8gICAgb2YgYSBtZXRob2Qgb24gdGhlIGFwcGxpY2F0aW9uLlxuICAgICAgICAvL1xuICAgICAgICByb3V0ZTogZnVuY3Rpb24odmVyYiwgcGF0aCkge1xuICAgICAgICAgICAgdmFyIGFwcCA9IHRoaXMsIHBhcmFtX25hbWVzID0gW10sIGFkZF9yb3V0ZSwgcGF0aF9tYXRjaCwgY2FsbGJhY2sgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgbWV0aG9kIHNpZ25hdHVyZSBpcyBqdXN0IChwYXRoLCBjYWxsYmFjaylcbiAgICAgICAgICAgIC8vIGFzc3VtZSB0aGUgdmVyYiBpcyAnYW55J1xuICAgICAgICAgICAgaWYoY2FsbGJhY2subGVuZ3RoID09PSAwICYmIF9pc0Z1bmN0aW9uKHBhdGgpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBbcGF0aF07XG4gICAgICAgICAgICAgICAgcGF0aCA9IHZlcmI7XG4gICAgICAgICAgICAgICAgdmVyYiA9ICdhbnknO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2ZXJiID0gdmVyYi50b0xvd2VyQ2FzZSgpOyAvLyBlbnN1cmUgdmVyYiBpcyBsb3dlciBjYXNlXG5cbiAgICAgICAgICAgIC8vIGlmIHBhdGggaXMgYSBzdHJpbmcgdHVybiBpdCBpbnRvIGEgcmVnZXhcbiAgICAgICAgICAgIGlmKHBhdGguY29uc3RydWN0b3IgPT0gU3RyaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBOZWVkcyB0byBiZSBleHBsaWNpdGx5IHNldCBiZWNhdXNlIElFIHdpbGwgbWFpbnRhaW4gdGhlIGluZGV4IHVubGVzcyBOVUxMIGlzIHJldHVybmVkLFxuICAgICAgICAgICAgICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgd2l0aCB0d28gY29uc2VjdXRpdmUgcm91dGVzIHRoYXQgY29udGFpbiBwYXJhbXMsIHRoZSBzZWNvbmQgc2V0IG9mIHBhcmFtcyB3aWxsIG5vdCBiZSBmb3VuZCBhbmQgZW5kIHVwIGluIHNwbGF0IGluc3RlYWQgb2YgcGFyYW1zXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vQ29yZV9KYXZhU2NyaXB0XzEuNV9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvUmVnRXhwL2xhc3RJbmRleFxuICAgICAgICAgICAgICAgIFBBVEhfTkFNRV9NQVRDSEVSLmxhc3RJbmRleCA9IDA7XG5cbiAgICAgICAgICAgICAgICAvLyBmaW5kIHRoZSBuYW1lc1xuICAgICAgICAgICAgICAgIHdoaWxlKChwYXRoX21hdGNoID0gUEFUSF9OQU1FX01BVENIRVIuZXhlYyhwYXRoKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1fbmFtZXMucHVzaChwYXRoX21hdGNoWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB3aXRoIHRoZSBwYXRoIHJlcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgcGF0aCA9IG5ldyBSZWdFeHAocGF0aC5yZXBsYWNlKFBBVEhfTkFNRV9NQVRDSEVSLCBQQVRIX1JFUExBQ0VSKSArIFwiJFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGxvb2t1cCBjYWxsYmFja3NcbiAgICAgICAgICAgICQuZWFjaChjYWxsYmFjaywgZnVuY3Rpb24oaSwgY2IpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgKGNiKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tbaV0gPSBhcHBbY2JdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhZGRfcm91dGUgPSBmdW5jdGlvbih3aXRoX3ZlcmIpIHtcbiAgICAgICAgICAgICAgICB2YXIgciA9IHsgdmVyYjogd2l0aF92ZXJiLCBwYXRoOiBwYXRoLCBjYWxsYmFjazogY2FsbGJhY2ssIHBhcmFtX25hbWVzOiBwYXJhbV9uYW1lcyB9O1xuICAgICAgICAgICAgICAgIC8vIGFkZCByb3V0ZSB0byByb3V0ZXMgYXJyYXlcbiAgICAgICAgICAgICAgICBhcHAucm91dGVzW3dpdGhfdmVyYl0gPSBhcHAucm91dGVzW3dpdGhfdmVyYl0gfHwgW107XG4gICAgICAgICAgICAgICAgLy8gcGxhY2Ugcm91dGVzIGluIG9yZGVyIG9mIGRlZmluaXRpb25cbiAgICAgICAgICAgICAgICBhcHAucm91dGVzW3dpdGhfdmVyYl0ucHVzaChyKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmKHZlcmIgPT09ICdhbnknKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMuUk9VVEVfVkVSQlMsIGZ1bmN0aW9uKGksIHYpIHsgYWRkX3JvdXRlKHYpOyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkX3JvdXRlKHZlcmIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIGFwcFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQWxpYXMgZm9yIHJvdXRlKCdnZXQnLCAuLi4pXG4gICAgICAgIGdldDogX3JvdXRlV3JhcHBlcignZ2V0JyksXG5cbiAgICAgICAgLy8gQWxpYXMgZm9yIHJvdXRlKCdwb3N0JywgLi4uKVxuICAgICAgICBwb3N0OiBfcm91dGVXcmFwcGVyKCdwb3N0JyksXG5cbiAgICAgICAgLy8gQWxpYXMgZm9yIHJvdXRlKCdwdXQnLCAuLi4pXG4gICAgICAgIHB1dDogX3JvdXRlV3JhcHBlcigncHV0JyksXG5cbiAgICAgICAgLy8gQWxpYXMgZm9yIHJvdXRlKCdkZWxldGUnLCAuLi4pXG4gICAgICAgIGRlbDogX3JvdXRlV3JhcHBlcignZGVsZXRlJyksXG5cbiAgICAgICAgLy8gQWxpYXMgZm9yIHJvdXRlKCdhbnknLCAuLi4pXG4gICAgICAgIGFueTogX3JvdXRlV3JhcHBlcignYW55JyksXG5cbiAgICAgICAgLy8gYG1hcFJvdXRlc2AgdGFrZXMgYW4gYXJyYXkgb2YgYXJyYXlzLCBlYWNoIGFycmF5IGJlaW5nIHBhc3NlZCB0byByb3V0ZSgpXG4gICAgICAgIC8vIGFzIGFyZ3VtZW50cywgdGhpcyBhbGxvd3MgZm9yIG1hc3MgZGVmaW5pdGlvbiBvZiByb3V0ZXMuIEFub3RoZXIgYmVuZWZpdCBpc1xuICAgICAgICAvLyB0aGlzIG1ha2VzIGl0IHBvc3NpYmxlL2Vhc2llciB0byBsb2FkIHJvdXRlcyB2aWEgcmVtb3RlIEpTT04uXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgdmFyIGFwcCA9ICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICB0aGlzLm1hcFJvdXRlcyhbXG4gICAgICAgIC8vICAgICAgICAgICAgWydnZXQnLCAnIy8nLCBmdW5jdGlvbigpIHsgdGhpcy5sb2coJ2luZGV4Jyk7IH1dLFxuICAgICAgICAvLyAgICAgICAgICAgIC8vIHN0cmluZ3MgaW4gY2FsbGJhY2tzIGFyZSBsb29rZWQgdXAgYXMgbWV0aG9kcyBvbiB0aGUgYXBwXG4gICAgICAgIC8vICAgICAgICAgICAgWydwb3N0JywgJyMvY3JlYXRlJywgJ2FkZFVzZXInXSxcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBObyB2ZXJiIGFzc3VtZXMgJ2FueScgYXMgdGhlIHZlcmJcbiAgICAgICAgLy8gICAgICAgICAgICBbL2Rvd2hhdGV2ZXIvLCBmdW5jdGlvbigpIHsgdGhpcy5sb2codGhpcy52ZXJiLCB0aGlzLnBhdGgpfV07XG4gICAgICAgIC8vICAgICAgICAgIF0pO1xuICAgICAgICAvLyAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICBtYXBSb3V0ZXM6IGZ1bmN0aW9uKHJvdXRlX2FycmF5KSB7XG4gICAgICAgICAgICB2YXIgYXBwID0gdGhpcztcbiAgICAgICAgICAgICQuZWFjaChyb3V0ZV9hcnJheSwgZnVuY3Rpb24oaSwgcm91dGVfYXJncykge1xuICAgICAgICAgICAgICAgIGFwcC5yb3V0ZS5hcHBseShhcHAsIHJvdXRlX2FyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBIHVuaXF1ZSBldmVudCBuYW1lc3BhY2UgZGVmaW5lZCBwZXIgYXBwbGljYXRpb24uXG4gICAgICAgIC8vIEFsbCBldmVudHMgYm91bmQgd2l0aCBgYmluZCgpYCBhcmUgYXV0b21hdGljYWxseSBib3VuZCB3aXRoaW4gdGhpcyBzcGFjZS5cbiAgICAgICAgZXZlbnROYW1lc3BhY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFsnc2FtbXktYXBwJywgdGhpcy5uYW1lc3BhY2VdLmpvaW4oJy0nKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBXb3JrcyBqdXN0IGxpa2UgYGpRdWVyeS5mbi5iaW5kKClgIHdpdGggYSBjb3VwbGUgbm90YWJsZSBkaWZmZXJlbmNlcy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gKiBJdCBiaW5kcyBhbGwgZXZlbnRzIHRvIHRoZSBhcHBsaWNhdGlvbiBlbGVtZW50XG4gICAgICAgIC8vICogQWxsIGV2ZW50cyBhcmUgYm91bmQgd2l0aGluIHRoZSBgZXZlbnROYW1lc3BhY2UoKWBcbiAgICAgICAgLy8gKiBFdmVudHMgYXJlIG5vdCBhY3R1YWxseSBib3VuZCB1bnRpbCB0aGUgYXBwbGljYXRpb24gaXMgc3RhcnRlZCB3aXRoIGBydW4oKWBcbiAgICAgICAgLy8gKiBjYWxsYmFja3MgYXJlIGV2YWx1YXRlZCB3aXRoaW4gdGhlIGNvbnRleHQgb2YgYSBTYW1teS5FdmVudENvbnRleHRcbiAgICAgICAgLy9cbiAgICAgICAgYmluZDogZnVuY3Rpb24obmFtZSwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBhcHAgPSB0aGlzO1xuICAgICAgICAgICAgLy8gYnVpbGQgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICAvLyBpZiB0aGUgYXJpdHkgaXMgMiwgY2FsbGJhY2sgaXMgdGhlIHNlY29uZCBhcmd1bWVudFxuICAgICAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrID09ICd1bmRlZmluZWQnKSB7IGNhbGxiYWNrID0gZGF0YTsgfVxuICAgICAgICAgICAgdmFyIGxpc3RlbmVyX2NhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gcHVsbCBvZmYgdGhlIGNvbnRleHQgZnJvbSB0aGUgYXJndW1lbnRzIHRvIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgICAgIHZhciBlLCBjb250ZXh0LCBkYXRhO1xuICAgICAgICAgICAgICAgIGUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICAgICAgZGF0YSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICBpZihkYXRhICYmIGRhdGEuY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gZGF0YS5jb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZGF0YS5jb250ZXh0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBuZXcgYXBwLmNvbnRleHRfcHJvdG90eXBlKGFwcCwgJ2JpbmQnLCBlLnR5cGUsIGRhdGEsIGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZS5jbGVhbmVkX3R5cGUgPSBlLnR5cGUucmVwbGFjZShhcHAuZXZlbnROYW1lc3BhY2UoKSwgJycpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIFtlLCBkYXRhXSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBpdCBjb3VsZCBiZSB0aGF0IHRoZSBhcHAgZWxlbWVudCBkb2VzbnQgZXhpc3QgeWV0XG4gICAgICAgICAgICAvLyBzbyBhdHRhY2ggdG8gdGhlIGxpc3RlbmVycyBhcnJheSBhbmQgdGhlbiBydW4oKVxuICAgICAgICAgICAgLy8gd2lsbCBhY3R1YWxseSBiaW5kIHRoZSBldmVudC5cbiAgICAgICAgICAgIGlmKCF0aGlzLmxpc3RlbmVyc1tuYW1lXSkgeyB0aGlzLmxpc3RlbmVyc1tuYW1lXSA9IFtdOyB9XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXS5wdXNoKGxpc3RlbmVyX2NhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgYXBwIGlzIHJ1bm5pbmdcbiAgICAgICAgICAgICAgICAvLyAqYWN0dWFsbHkqIGJpbmQgdGhlIGV2ZW50IHRvIHRoZSBhcHAgZWxlbWVudFxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbihuYW1lLCBsaXN0ZW5lcl9jYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUcmlnZ2VycyBjdXN0b20gZXZlbnRzIGRlZmluZWQgd2l0aCBgYmluZCgpYFxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgQXJndW1lbnRzXG4gICAgICAgIC8vXG4gICAgICAgIC8vICogYG5hbWVgIFRoZSBuYW1lIG9mIHRoZSBldmVudC4gQXV0b21hdGljYWxseSBwcmVmaXhlZCB3aXRoIHRoZSBgZXZlbnROYW1lc3BhY2UoKWBcbiAgICAgICAgLy8gKiBgZGF0YWAgQW4gb3B0aW9uYWwgT2JqZWN0IHRoYXQgY2FuIGJlIHBhc3NlZCB0byB0aGUgYm91bmQgY2FsbGJhY2suXG4gICAgICAgIC8vICogYGNvbnRleHRgIEFuIG9wdGlvbmFsIGNvbnRleHQvT2JqZWN0IGluIHdoaWNoIHRvIGV4ZWN1dGUgdGhlIGJvdW5kIGNhbGxiYWNrLlxuICAgICAgICAvLyAgIElmIG5vIGNvbnRleHQgaXMgc3VwcGxpZWQgYSB0aGUgY29udGV4dCBpcyBhIG5ldyBgU2FtbXkuRXZlbnRDb250ZXh0YFxuICAgICAgICAvL1xuICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbihuYW1lLCBkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50KCkudHJpZ2dlcihbbmFtZSwgdGhpcy5ldmVudE5hbWVzcGFjZSgpXS5qb2luKCcuJyksIFtkYXRhXSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXJ1bnMgdGhlIGN1cnJlbnQgcm91dGVcbiAgICAgICAgcmVmcmVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RfbG9jYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdsb2NhdGlvbi1jaGFuZ2VkJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUYWtlcyBhIHNpbmdsZSBjYWxsYmFjayB0aGF0IGlzIHB1c2hlZCBvbiB0byBhIHN0YWNrLlxuICAgICAgICAvLyBCZWZvcmUgYW55IHJvdXRlIGlzIHJ1biwgdGhlIGNhbGxiYWNrcyBhcmUgZXZhbHVhdGVkIGluIG9yZGVyIHdpdGhpblxuICAgICAgICAvLyB0aGUgY3VycmVudCBgU2FtbXkuRXZlbnRDb250ZXh0YFxuICAgICAgICAvL1xuICAgICAgICAvLyBJZiBhbnkgb2YgdGhlIGNhbGxiYWNrcyBleHBsaWNpdGx5IHJldHVybiBmYWxzZSwgZXhlY3V0aW9uIG9mIGFueVxuICAgICAgICAvLyBmdXJ0aGVyIGNhbGxiYWNrcyBhbmQgdGhlIHJvdXRlIGl0c2VsZiBpcyBoYWx0ZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgc2V0IG9mIG9wdGlvbnMgdGhhdCB3aWxsIGRlZmluZSB3aGVuIHRvIHJ1biB0aGlzXG4gICAgICAgIC8vIGJlZm9yZSBiYXNlZCBvbiB0aGUgcm91dGUgaXQgcHJvY2VlZHMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgdmFyIGFwcCA9ICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAvLyB3aWxsIHJ1biBhdCAjL3JvdXRlIGJ1dCBub3QgYXQgIy9cbiAgICAgICAgLy8gICAgICAgIHRoaXMuYmVmb3JlKCcjL3JvdXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgIC8vLi4uXG4gICAgICAgIC8vICAgICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIC8vIHdpbGwgcnVuIGF0ICMvIGJ1dCBub3QgYXQgIy9yb3V0ZVxuICAgICAgICAvLyAgICAgICAgdGhpcy5iZWZvcmUoe2V4Y2VwdDoge3BhdGg6ICcjL3JvdXRlJ319LCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgICAgdGhpcy5sb2coJ25vdCBiZWZvcmUgIy9yb3V0ZScpO1xuICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICB0aGlzLmdldCgnIy8nLCBmdW5jdGlvbigpIHt9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHRoaXMuZ2V0KCcjL3JvdXRlJywgZnVuY3Rpb24oKSB7fSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNlZSBgY29udGV4dE1hdGNoZXNPcHRpb25zKClgIGZvciBhIGZ1bGwgbGlzdCBvZiBzdXBwb3J0ZWQgb3B0aW9uc1xuICAgICAgICAvL1xuICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZihfaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJlZm9yZXMucHVzaChbb3B0aW9ucywgY2FsbGJhY2tdKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEEgc2hvcnRjdXQgZm9yIGJpbmRpbmcgYSBjYWxsYmFjayB0byBiZSBydW4gYWZ0ZXIgYSByb3V0ZSBpcyBleGVjdXRlZC5cbiAgICAgICAgLy8gQWZ0ZXIgY2FsbGJhY2tzIGhhdmUgbm8gZ3VhcnVudGVlZCBvcmRlci5cbiAgICAgICAgYWZ0ZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5iaW5kKCdldmVudC1jb250ZXh0LWFmdGVyJywgY2FsbGJhY2spO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgLy8gQWRkcyBhbiBhcm91bmQgZmlsdGVyIHRvIHRoZSBhcHBsaWNhdGlvbi4gYXJvdW5kIGZpbHRlcnMgYXJlIGZ1bmN0aW9uc1xuICAgICAgICAvLyB0aGF0IHRha2UgYSBzaW5nbGUgYXJndW1lbnQgYGNhbGxiYWNrYCB3aGljaCBpcyB0aGUgZW50aXJlIHJvdXRlXG4gICAgICAgIC8vIGV4ZWN1dGlvbiBwYXRoIHdyYXBwZWQgdXAgaW4gYSBjbG9zdXJlLiBUaGlzIG1lYW5zIHlvdSBjYW4gZGVjaWRlIHdoZXRoZXJcbiAgICAgICAgLy8gb3Igbm90IHRvIHByb2NlZWQgd2l0aCBleGVjdXRpb24gYnkgbm90IGludm9raW5nIGBjYWxsYmFja2Agb3IsXG4gICAgICAgIC8vIG1vcmUgdXNlZnVsbHkgd3JhcHBpbmcgY2FsbGJhY2sgaW5zaWRlIHRoZSByZXN1bHQgb2YgYW4gYXN5bmNocm9ub3VzIGV4ZWN1dGlvbi5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciBhcm91bmQoKSBpcyBjYWxsaW5nIGEgX3Bvc3NpYmx5XyBhc3luYyBmdW5jdGlvblxuICAgICAgICAvLyBhbmQgZXhlY3V0aW5nIHRoZSByb3V0ZSB3aXRoaW4gdGhlIGZ1bmN0aW9ucyBjYWxsYmFjazpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB2YXIgYXBwID0gJC5zYW1teShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHZhciBjdXJyZW50X3VzZXIgPSBmYWxzZTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIGZ1bmN0aW9uIGNoZWNrTG9nZ2VkSW4oY2FsbGJhY2spIHtcbiAgICAgICAgLy8gICAgICAgICAgLy8gL3Nlc3Npb24gcmV0dXJucyBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGxvZ2dlZCBpbiB1c2VyXG4gICAgICAgIC8vICAgICAgICAgIC8vIG9yIGFuIGVtcHR5IG9iamVjdFxuICAgICAgICAvLyAgICAgICAgICBpZiAoIWN1cnJlbnRfdXNlcikge1xuICAgICAgICAvLyAgICAgICAgICAgICQuZ2V0SlNPTignL3Nlc3Npb24nLCBmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICBpZiAoanNvbi5sb2dpbikge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSB1c2VyIGFzIGxvZ2dlZCBpblxuICAgICAgICAvLyAgICAgICAgICAgICAgICBjdXJyZW50X3VzZXIgPSBqc29uO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBleGVjdXRlIHRoZSByb3V0ZSBwYXRoXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSB1c2VyIGFzIG5vdCBsb2dnZWQgaW5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY3VycmVudF91c2VyID0gZmFsc2U7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHRoZSBjb250ZXh0IG9mIGFyb3VuZEZpbHRlcnMgaXMgYW4gRXZlbnRDb250ZXh0XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoaXMucmVkaXJlY3QoJyMvbG9naW4nKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBleGVjdXRlIHRoZSByb3V0ZSBwYXRoXG4gICAgICAgIC8vICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgLy8gICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgfTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHRoaXMuYXJvdW5kKGNoZWNrTG9nZ2VkSW4pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICBhcm91bmQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmFyb3VuZHMucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBZGRzIGEgb25Db21wbGV0ZSBmdW5jdGlvbiB0byB0aGUgYXBwbGljYXRpb24uIG9uQ29tcGxldGUgZnVuY3Rpb25zIGFyZSBleGVjdXRlZFxuICAgICAgICAvLyBhdCB0aGUgZW5kIG9mIGEgY2hhaW4gb2Ygcm91dGUgY2FsbGJhY2tzLCBpZiB0aGV5IGNhbGwgbmV4dCgpLiBVbmxpa2UgYWZ0ZXIsXG4gICAgICAgIC8vIHdoaWNoIGlzIGNhbGxlZCBhcyBzb29uIGFzIHRoZSByb3V0ZSBpcyBjb21wbGV0ZSwgb25Db21wbGV0ZSBpcyBsaWtlIGEgZmluYWwgbmV4dCgpXG4gICAgICAgIC8vIGZvciBhbGwgcm91dGVzLCBhbmQgaXMgdGh1cyBydW4gYXN5bmNocm9ub3VzbHlcbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBhcHAuZ2V0KCcvY2hhaW4nLGZ1bmN0aW9uKGNvbnRleHQsbmV4dCkge1xuICAgICAgICAvLyAgICAgICAgICBjb25zb2xlLmxvZygnY2hhaW4xJyk7XG4gICAgICAgIC8vICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgLy8gICAgICB9LGZ1bmN0aW9uKGNvbnRleHQsbmV4dCkge1xuICAgICAgICAvLyAgICAgICAgICBjb25zb2xlLmxvZygnY2hhaW4yJyk7XG4gICAgICAgIC8vICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgLy8gICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBhcHAuZ2V0KCcvbGluaycsZnVuY3Rpb24oY29udGV4dCxuZXh0KSB7XG4gICAgICAgIC8vICAgICAgICAgIGNvbnNvbGUubG9nKCdsaW5rMScpO1xuICAgICAgICAvLyAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIC8vICAgICAgfSxmdW5jdGlvbihjb250ZXh0LG5leHQpIHtcbiAgICAgICAgLy8gICAgICAgICAgY29uc29sZS5sb2coJ2xpbmsyJyk7XG4gICAgICAgIC8vICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgLy8gICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBhcHAub25Db21wbGV0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgICAgY29uc29sZS5sb2coXCJSdW5uaW5nIGZpbmFsbHlcIik7XG4gICAgICAgIC8vICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIElmIHlvdSBnbyB0byAnL2NoYWluJywgeW91IHdpbGwgZ2V0IHRoZSBmb2xsb3dpbmcgbWVzc2FnZXM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgY2hhaW4xXG4gICAgICAgIC8vICAgICAgY2hhaW4yXG4gICAgICAgIC8vICAgICAgUnVubmluZyBvbkNvbXBsZXRlXG4gICAgICAgIC8vXG4gICAgICAgIC8vXG4gICAgICAgIC8vIElmIHlvdSBnbyB0byAvbGluaywgeW91IHdpbGwgZ2V0IHRoZSBmb2xsb3dpbmcgbWVzc2FnZXM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgbGluazFcbiAgICAgICAgLy8gICAgICBsaW5rMlxuICAgICAgICAvLyAgICAgIFJ1bm5pbmcgb25Db21wbGV0ZVxuICAgICAgICAvL1xuICAgICAgICAvL1xuICAgICAgICAvLyBJdCByZWFsbHkgY29tZXMgdG8gcGxheSB3aGVuIGRvaW5nIGFzeW5jaHJvbm91czpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBhcHAuZ2V0KCcvY2hhaW4nLGZ1bmN0aW9uKGNvbnRleHQsbmV4dCkge1xuICAgICAgICAvLyAgICAgICAgJC5nZXQoJy9teS91cmwnLGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICBjb25zb2xlLmxvZygnY2hhaW4xJyk7XG4gICAgICAgIC8vICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgLy8gICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgIH0sZnVuY3Rpb24oY29udGV4dCxuZXh0KSB7XG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZygnY2hhaW4yJyk7XG4gICAgICAgIC8vICAgICAgICBuZXh0KCk7XG4gICAgICAgIC8vICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9vbkNvbXBsZXRlID0gY2FsbGJhY2s7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgY3VycmVudCBhcHBsaWNhdGlvbiBpcyBydW5uaW5nLlxuICAgICAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3J1bm5pbmc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gSGVscGVycyBleHRlbmRzIHRoZSBFdmVudENvbnRleHQgcHJvdG90eXBlIHNwZWNpZmljIHRvIHRoaXMgYXBwLlxuICAgICAgICAvLyBUaGlzIGFsbG93cyB5b3UgdG8gZGVmaW5lIGFwcCBzcGVjaWZpYyBoZWxwZXIgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWRcbiAgICAgICAgLy8gd2hlbmV2ZXIgeW91J3JlIGluc2lkZSBvZiBhbiBldmVudCBjb250ZXh0ICh0ZW1wbGF0ZXMsIHJvdXRlcywgYmluZCkuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB2YXIgYXBwID0gJC5zYW1teShmdW5jdGlvbigpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgaGVscGVycyh7XG4gICAgICAgIC8vICAgICAgICAgdXBjYXNlOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIC8vICAgICAgICAgIHJldHVybiB0ZXh0LnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICBnZXQoJyMvJywgZnVuY3Rpb24oKSB7IHdpdGgodGhpcykge1xuICAgICAgICAvLyAgICAgICAgIC8vIGluc2lkZSBvZiB0aGlzIGNvbnRleHQgSSBjYW4gdXNlIHRoZSBoZWxwZXJzXG4gICAgICAgIC8vICAgICAgICAgJCgnI21haW4nKS5odG1sKHVwY2FzZSgkKCcjbWFpbicpLnRleHQoKSk7XG4gICAgICAgIC8vICAgICAgIH19KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgQXJndW1lbnRzXG4gICAgICAgIC8vXG4gICAgICAgIC8vICogYGV4dGVuc2lvbnNgIEFuIG9iamVjdCBjb2xsZWN0aW9uIG9mIGZ1bmN0aW9ucyB0byBleHRlbmQgdGhlIGNvbnRleHQuXG4gICAgICAgIC8vXG4gICAgICAgIGhlbHBlcnM6IGZ1bmN0aW9uKGV4dGVuc2lvbnMpIHtcbiAgICAgICAgICAgICQuZXh0ZW5kKHRoaXMuY29udGV4dF9wcm90b3R5cGUucHJvdG90eXBlLCBleHRlbnNpb25zKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEhlbHBlciBleHRlbmRzIHRoZSBldmVudCBjb250ZXh0IGp1c3QgbGlrZSBgaGVscGVycygpYCBidXQgZG9lcyBpdFxuICAgICAgICAvLyBhIHNpbmdsZSBtZXRob2QgYXQgYSB0aW1lLiBUaGlzIGlzIGVzcGVjaWFsbHkgdXNlZnVsIGZvciBkeW5hbWljYWxseSBuYW1lZFxuICAgICAgICAvLyBoZWxwZXJzXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAvLyBUcml2aWFsIGV4YW1wbGUgdGhhdCBhZGRzIDMgaGVscGVyIG1ldGhvZHMgdG8gdGhlIGNvbnRleHQgZHluYW1pY2FsbHlcbiAgICAgICAgLy8gICAgIHZhciBhcHAgPSAkLnNhbW15KGZ1bmN0aW9uKGFwcCkge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAkLmVhY2goWzEsMiwzXSwgZnVuY3Rpb24oaSwgbnVtKSB7XG4gICAgICAgIC8vICAgICAgICAgYXBwLmhlbHBlcignaGVscGVyJyArIG51bSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgICB0aGlzLmxvZyhcIkknbSBoZWxwZXIgbnVtYmVyIFwiICsgbnVtKTtcbiAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgIHRoaXMuZ2V0KCcjLycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuaGVscGVyMigpOyAvLz0+IEknbSBoZWxwZXIgbnVtYmVyIDJcbiAgICAgICAgLy8gICAgICAgfSk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEFyZ3VtZW50c1xuICAgICAgICAvL1xuICAgICAgICAvLyAqIGBuYW1lYCBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kXG4gICAgICAgIC8vICogYG1ldGhvZGAgVGhlIGZ1bmN0aW9uIHRvIGJlIGFkZGVkIHRvIHRoZSBwcm90b3R5cGUgYXQgYG5hbWVgXG4gICAgICAgIC8vXG4gICAgICAgIGhlbHBlcjogZnVuY3Rpb24obmFtZSwgbWV0aG9kKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRfcHJvdG90eXBlLnByb3RvdHlwZVtuYW1lXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEFjdHVhbGx5IHN0YXJ0cyB0aGUgYXBwbGljYXRpb24ncyBsaWZlY3ljbGUuIGBydW4oKWAgc2hvdWxkIGJlIGludm9rZWRcbiAgICAgICAgLy8gd2l0aGluIGEgZG9jdW1lbnQucmVhZHkgYmxvY2sgdG8gZW5zdXJlIHRoZSBET00gZXhpc3RzIGJlZm9yZSBiaW5kaW5nIGV2ZW50cywgZXRjLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgdmFyIGFwcCA9ICQuc2FtbXkoZnVuY3Rpb24oKSB7IC4uLiB9KTsgLy8geW91ciBhcHBsaWNhdGlvblxuICAgICAgICAvLyAgICAgJChmdW5jdGlvbigpIHsgLy8gZG9jdW1lbnQucmVhZHlcbiAgICAgICAgLy8gICAgICAgIGFwcC5ydW4oKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgQXJndW1lbnRzXG4gICAgICAgIC8vXG4gICAgICAgIC8vICogYHN0YXJ0X3VybGAgT3B0aW9uYWxseSwgYSBTdHJpbmcgY2FuIGJlIHBhc3NlZCB3aGljaCB0aGUgQXBwIHdpbGwgcmVkaXJlY3QgdG9cbiAgICAgICAgLy8gICBhZnRlciB0aGUgZXZlbnRzL3JvdXRlcyBoYXZlIGJlZW4gYm91bmQuXG4gICAgICAgIHJ1bjogZnVuY3Rpb24oc3RhcnRfdXJsKSB7XG4gICAgICAgICAgICBpZih0aGlzLmlzUnVubmluZygpKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICAgICAgdmFyIGFwcCA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIGFjdHVhbGx5IGJpbmQgYWxsIHRoZSBsaXN0ZW5lcnNcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLmxpc3RlbmVycy50b0hhc2goKSwgZnVuY3Rpb24obmFtZSwgY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhbGxiYWNrcywgZnVuY3Rpb24oaSwgbGlzdGVuZXJfY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLl9saXN0ZW4obmFtZSwgbGlzdGVuZXJfY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigncnVuJywgeyBzdGFydF91cmw6IHN0YXJ0X3VybCB9KTtcbiAgICAgICAgICAgIHRoaXMuX3J1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgLy8gc2V0IGxhc3QgbG9jYXRpb25cbiAgICAgICAgICAgIHRoaXMubGFzdF9sb2NhdGlvbiA9IG51bGw7XG4gICAgICAgICAgICBpZighKC9cXCMoLispLy50ZXN0KHRoaXMuZ2V0TG9jYXRpb24oKSkpICYmIHR5cGVvZiBzdGFydF91cmwgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvY2F0aW9uKHN0YXJ0X3VybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjaGVjayB1cmxcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrTG9jYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uX3Byb3h5LmJpbmQoKTtcbiAgICAgICAgICAgIHRoaXMuYmluZCgnbG9jYXRpb24tY2hhbmdlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFwcC5fY2hlY2tMb2NhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGJpbmQgdG8gc3VibWl0IHRvIGNhcHR1cmUgcG9zdC9wdXQvZGVsZXRlIHJvdXRlc1xuICAgICAgICAgICAgdGhpcy5iaW5kKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYoIVNhbW15LnRhcmdldElzVGhpc1dpbmRvdyhlLCAnZm9ybScpKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgICAgICAgICAgdmFyIHJldHVybmVkID0gYXBwLl9jaGVja0Zvcm1TdWJtaXNzaW9uKCQoZS50YXJnZXQpLmNsb3Nlc3QoJ2Zvcm0nKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChyZXR1cm5lZCA9PT0gZmFsc2UpID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gYmluZCB1bmxvYWQgdG8gYm9keSB1bmxvYWRcbiAgICAgICAgICAgICQod2luZG93KS5iaW5kKCd1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhcHAudW5sb2FkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdHJpZ2dlciBodG1sIGNoYW5nZWRcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBUaGUgb3Bwb3NpdGUgb2YgYHJ1bigpYCwgdW4tYmluZHMgYWxsIGV2ZW50IGxpc3RlbmVycyBhbmQgaW50ZXJ2YWxzXG4gICAgICAgIC8vIGBydW4oKWAgQXV0b21hdGljYWxseSBiaW5kcyBhIGBvbnVubG9hZGAgZXZlbnQgdG8gcnVuIHRoaXMgd2hlblxuICAgICAgICAvLyB0aGUgZG9jdW1lbnQgaXMgY2xvc2VkLlxuICAgICAgICB1bmxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoIXRoaXMuaXNSdW5uaW5nKCkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgICAgICB2YXIgYXBwID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigndW5sb2FkJyk7XG4gICAgICAgICAgICAvLyBjbGVhciBpbnRlcnZhbFxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25fcHJveHkudW5iaW5kKCk7XG4gICAgICAgICAgICAvLyB1bmJpbmQgZm9ybSBzdWJtaXRzXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50KCkudW5iaW5kKCdzdWJtaXQnKS5yZW1vdmVDbGFzcyhhcHAuZXZlbnROYW1lc3BhY2UoKSk7XG4gICAgICAgICAgICAvLyB1bmJpbmQgYWxsIGV2ZW50c1xuICAgICAgICAgICAgJC5lYWNoKHRoaXMubGlzdGVuZXJzLnRvSGFzaCgpLCBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2gobGlzdGVuZXJzLCBmdW5jdGlvbihpLCBsaXN0ZW5lcl9jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBhcHAuX3VubGlzdGVuKG5hbWUsIGxpc3RlbmVyX2NhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTm90IG9ubHkgcnVucyBgdW5iaW5kYCBidXQgYWxzbyBkZXN0cm95cyB0aGUgYXBwIHJlZmVyZW5jZS5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgICAgZGVsZXRlIFNhbW15LmFwcHNbdGhpcy5lbGVtZW50X3NlbGVjdG9yXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFdpbGwgYmluZCBhIHNpbmdsZSBjYWxsYmFjayBmdW5jdGlvbiB0byBldmVyeSBldmVudCB0aGF0IGlzIGFscmVhZHlcbiAgICAgICAgLy8gYmVpbmcgbGlzdGVuZWQgdG8gaW4gdGhlIGFwcC4gVGhpcyBpbmNsdWRlcyBhbGwgdGhlIGBBUFBfRVZFTlRTYFxuICAgICAgICAvLyBhcyB3ZWxsIGFzIGFueSBjdXN0b20gZXZlbnRzIGRlZmluZWQgd2l0aCBgYmluZCgpYC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVXNlZCBpbnRlcm5hbGx5IGZvciBkZWJ1ZyBsb2dnaW5nLlxuICAgICAgICBiaW5kVG9BbGxFdmVudHM6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgYXBwID0gdGhpcztcbiAgICAgICAgICAgIC8vIGJpbmQgdG8gdGhlIEFQUF9FVkVOVFMgZmlyc3RcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLkFQUF9FVkVOVFMsIGZ1bmN0aW9uKGksIGUpIHtcbiAgICAgICAgICAgICAgICBhcHAuYmluZChlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIG5leHQsIGJpbmQgdG8gbGlzdGVuZXIgbmFtZXMgKG9ubHkgaWYgdGhleSBkb250IGV4aXN0IGluIEFQUF9FVkVOVFMpXG4gICAgICAgICAgICAkLmVhY2godGhpcy5saXN0ZW5lcnMua2V5cyh0cnVlKSwgZnVuY3Rpb24oaSwgbmFtZSkge1xuICAgICAgICAgICAgICAgIGlmKCQuaW5BcnJheShuYW1lLCBhcHAuQVBQX0VWRU5UUykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLmJpbmQobmFtZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmV0dXJucyBhIGNvcHkgb2YgdGhlIGdpdmVuIHBhdGggd2l0aCBhbnkgcXVlcnkgc3RyaW5nIGFmdGVyIHRoZSBoYXNoXG4gICAgICAgIC8vIHJlbW92ZWQuXG4gICAgICAgIHJvdXRhYmxlUGF0aDogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZShRVUVSWV9TVFJJTkdfTUFUQ0hFUiwgJycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEdpdmVuIGEgdmVyYiBhbmQgYSBTdHJpbmcgcGF0aCwgd2lsbCByZXR1cm4gZWl0aGVyIGEgcm91dGUgb2JqZWN0IG9yIGZhbHNlXG4gICAgICAgIC8vIGlmIGEgbWF0Y2hpbmcgcm91dGUgY2FuIGJlIGZvdW5kIHdpdGhpbiB0aGUgY3VycmVudCBkZWZpbmVkIHNldC5cbiAgICAgICAgbG9va3VwUm91dGU6IGZ1bmN0aW9uKHZlcmIsIHBhdGgpIHtcbiAgICAgICAgICAgIHZhciBhcHAgPSB0aGlzLCByb3V0ZWQgPSBmYWxzZSwgaSA9IDAsIGwsIHJvdXRlO1xuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMucm91dGVzW3ZlcmJdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgbCA9IHRoaXMucm91dGVzW3ZlcmJdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlID0gdGhpcy5yb3V0ZXNbdmVyYl1baV07XG4gICAgICAgICAgICAgICAgICAgIGlmKGFwcC5yb3V0YWJsZVBhdGgocGF0aCkubWF0Y2gocm91dGUucGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlZCA9IHJvdXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcm91dGVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEZpcnN0LCBpbnZva2VzIGBsb29rdXBSb3V0ZSgpYCBhbmQgaWYgYSByb3V0ZSBpcyBmb3VuZCwgcGFyc2VzIHRoZVxuICAgICAgICAvLyBwb3NzaWJsZSBVUkwgcGFyYW1zIGFuZCB0aGVuIGludm9rZXMgdGhlIHJvdXRlJ3MgY2FsbGJhY2sgd2l0aGluIGEgbmV3XG4gICAgICAgIC8vIGBTYW1teS5FdmVudENvbnRleHRgLiBJZiB0aGUgcm91dGUgY2FuIG5vdCBiZSBmb3VuZCwgaXQgY2FsbHNcbiAgICAgICAgLy8gYG5vdEZvdW5kKClgLiBJZiBgcmFpc2VfZXJyb3JzYCBpcyBzZXQgdG8gYHRydWVgIGFuZFxuICAgICAgICAvLyB0aGUgYGVycm9yKClgIGhhcyBub3QgYmVlbiBvdmVycmlkZGVuLCBpdCB3aWxsIHRocm93IGFuIGFjdHVhbCBKU1xuICAgICAgICAvLyBlcnJvci5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gWW91IHByb2JhYmx5IHdpbGwgbmV2ZXIgaGF2ZSB0byBjYWxsIHRoaXMgZGlyZWN0bHkuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBBcmd1bWVudHNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gKiBgdmVyYmAgQSBTdHJpbmcgZm9yIHRoZSB2ZXJiLlxuICAgICAgICAvLyAqIGBwYXRoYCBBIFN0cmluZyBwYXRoIHRvIGxvb2t1cC5cbiAgICAgICAgLy8gKiBgcGFyYW1zYCBBbiBPYmplY3Qgb2YgUGFyYW1zIHB1bGxlZCBmcm9tIHRoZSBVUkkgb3IgcGFzc2VkIGRpcmVjdGx5LlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgUmV0dXJuc1xuICAgICAgICAvL1xuICAgICAgICAvLyBFaXRoZXIgcmV0dXJucyB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhlIHJvdXRlIGNhbGxiYWNrIG9yIHJhaXNlcyBhIDQwNCBOb3QgRm91bmQgZXJyb3IuXG4gICAgICAgIC8vXG4gICAgICAgIHJ1blJvdXRlOiBmdW5jdGlvbih2ZXJiLCBwYXRoLCBwYXJhbXMsIHRhcmdldCkge1xuICAgICAgICAgICAgdmFyIGFwcCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgcm91dGUgPSB0aGlzLmxvb2t1cFJvdXRlKHZlcmIsIHBhdGgpLFxuICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgd3JhcHBlZF9yb3V0ZSxcbiAgICAgICAgICAgICAgICBhcm91bmRzLFxuICAgICAgICAgICAgICAgIGFyb3VuZCxcbiAgICAgICAgICAgICAgICBiZWZvcmVzLFxuICAgICAgICAgICAgICAgIGJlZm9yZSxcbiAgICAgICAgICAgICAgICBjYWxsYmFja19hcmdzLFxuICAgICAgICAgICAgICAgIHBhdGhfcGFyYW1zLFxuICAgICAgICAgICAgICAgIGZpbmFsX3JldHVybmVkO1xuXG4gICAgICAgICAgICBpZih0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ3J1blJvdXRlJywgW3ZlcmIsIHBhdGhdLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigncnVuLXJvdXRlJywgeyB2ZXJiOiB2ZXJiLCBwYXRoOiBwYXRoLCBwYXJhbXM6IHBhcmFtcyB9KTtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBwYXJhbXMgPT0gJ3VuZGVmaW5lZCcpIHsgcGFyYW1zID0ge307IH1cblxuICAgICAgICAgICAgJC5leHRlbmQocGFyYW1zLCB0aGlzLl9wYXJzZVF1ZXJ5U3RyaW5nKHBhdGgpKTtcblxuICAgICAgICAgICAgaWYocm91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3JvdXRlLWZvdW5kJywgeyByb3V0ZTogcm91dGUgfSk7XG4gICAgICAgICAgICAgICAgLy8gcHVsbCBvdXQgdGhlIHBhcmFtcyBmcm9tIHRoZSBwYXRoXG4gICAgICAgICAgICAgICAgaWYoKHBhdGhfcGFyYW1zID0gcm91dGUucGF0aC5leGVjKHRoaXMucm91dGFibGVQYXRoKHBhdGgpKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlyc3QgbWF0Y2ggaXMgdGhlIGZ1bGwgcGF0aFxuICAgICAgICAgICAgICAgICAgICBwYXRoX3BhcmFtcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBvZiB0aGUgbWF0Y2hlc1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2gocGF0aF9wYXJhbXMsIGZ1bmN0aW9uKGksIHBhcmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZXMgYSBtYXRjaGluZyBwYXJhbSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyb3V0ZS5wYXJhbV9uYW1lc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgbmFtZSB0byB0aGUgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbcm91dGUucGFyYW1fbmFtZXNbaV1dID0gX2RlY29kZShwYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluaXRpYWxpemUgJ3NwbGF0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFwYXJhbXMuc3BsYXQpIHsgcGFyYW1zLnNwbGF0ID0gW107IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuc3BsYXQucHVzaChfZGVjb2RlKHBhcmFtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHNldCBldmVudCBjb250ZXh0XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IG5ldyB0aGlzLmNvbnRleHRfcHJvdG90eXBlKHRoaXMsIHZlcmIsIHBhdGgsIHBhcmFtcywgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgYXJyYXlzXG4gICAgICAgICAgICAgICAgYXJvdW5kcyA9IHRoaXMuYXJvdW5kcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICBiZWZvcmVzID0gdGhpcy5iZWZvcmVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgY2FsbGJhY2sgYXJncyB0byB0aGUgY29udGV4dCArIGNvbnRlbnRzIG9mIHRoZSBzcGxhdFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrX2FyZ3MgPSBbY29udGV4dF07XG4gICAgICAgICAgICAgICAgaWYocGFyYW1zLnNwbGF0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrX2FyZ3MgPSBjYWxsYmFja19hcmdzLmNvbmNhdChwYXJhbXMuc3BsYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB3cmFwIHRoZSByb3V0ZSB1cCB3aXRoIHRoZSBiZWZvcmUgZmlsdGVyc1xuICAgICAgICAgICAgICAgIHdyYXBwZWRfcm91dGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybmVkLCBpLCBuZXh0Um91dGU7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKGJlZm9yZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlID0gYmVmb3Jlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgdGhlIG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwgYmVmb3JlWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkID0gYmVmb3JlWzFdLmFwcGx5KGNvbnRleHQsIFtjb250ZXh0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0dXJuZWQgPT09IGZhbHNlKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFwcC5sYXN0X3JvdXRlID0gcm91dGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudHJpZ2dlcignZXZlbnQtY29udGV4dC1iZWZvcmUnLCB7IGNvbnRleHQ6IGNvbnRleHQgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJ1biBtdWx0aXBsZSBjYWxsYmFja3NcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIChyb3V0ZS5jYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUuY2FsbGJhY2sgPSBbcm91dGUuY2FsbGJhY2tdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHJvdXRlLmNhbGxiYWNrICYmIHJvdXRlLmNhbGxiYWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJvdXRlLmNhbGxiYWNrW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkID0gcm91dGUuY2FsbGJhY2tbaV0uYXBwbHkoY29udGV4dCwgY2FsbGJhY2tfYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGFwcC5fb25Db21wbGV0ZSAmJiB0eXBlb2YgKGFwcC5fb25Db21wbGV0ZSA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAuX29uQ29tcGxldGUoY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrX2FyZ3MucHVzaChuZXh0Um91dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC50cmlnZ2VyKCdldmVudC1jb250ZXh0LWFmdGVyJywgeyBjb250ZXh0OiBjb250ZXh0IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAkLmVhY2goYXJvdW5kcy5yZXZlcnNlKCksIGZ1bmN0aW9uKGksIGFyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdF93cmFwcGVkX3JvdXRlID0gd3JhcHBlZF9yb3V0ZTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZF9yb3V0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJvdW5kLmFwcGx5KGNvbnRleHQsIFtsYXN0X3dyYXBwZWRfcm91dGVdKTsgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbF9yZXR1cm5lZCA9IHdyYXBwZWRfcm91dGUoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcihbJzUwMCBFcnJvcicsIHZlcmIsIHBhdGhdLmpvaW4oJyAnKSwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5hbF9yZXR1cm5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm90Rm91bmQodmVyYiwgcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTWF0Y2hlcyBhbiBvYmplY3Qgb2Ygb3B0aW9ucyBhZ2FpbnN0IGFuIGBFdmVudENvbnRleHRgIGxpa2Ugb2JqZWN0IHRoYXRcbiAgICAgICAgLy8gY29udGFpbnMgYHBhdGhgIGFuZCBgdmVyYmAgYXR0cmlidXRlcy4gSW50ZXJuYWxseSBTYW1teSB1c2VzIHRoaXNcbiAgICAgICAgLy8gZm9yIG1hdGNoaW5nIGBiZWZvcmUoKWAgZmlsdGVycyBhZ2FpbnN0IHNwZWNpZmljIG9wdGlvbnMuIFlvdSBjYW4gc2V0IHRoZVxuICAgICAgICAvLyBvYmplY3QgdG8gX29ubHlfIG1hdGNoIGNlcnRhaW4gcGF0aHMgb3IgdmVyYnMsIG9yIG1hdGNoIGFsbCBwYXRocyBvciB2ZXJicyBfZXhjZXB0X1xuICAgICAgICAvLyB0aG9zZSB0aGF0IG1hdGNoIHRoZSBvcHRpb25zLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgdmFyIGFwcCA9ICQuc2FtbXkoKSxcbiAgICAgICAgLy8gICAgICAgICBjb250ZXh0ID0ge3ZlcmI6ICdnZXQnLCBwYXRoOiAnIy9teXBhdGgnfTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIC8vIG1hdGNoIGFnYWluc3QgYSBwYXRoIHN0cmluZ1xuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCAnIy9teXBhdGgnKTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsICcjL290aGVycGF0aCcpOyAvLz0+IGZhbHNlXG4gICAgICAgIC8vICAgICAvLyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtvbmx5OiB7cGF0aDonIy9teXBhdGgnfX0pOyAvLz0+IHRydWVcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge29ubHk6IHtwYXRoOicjL290aGVycGF0aCd9fSk7IC8vPT4gZmFsc2VcbiAgICAgICAgLy8gICAgIC8vIG1hdGNoIGFnYWluc3QgYSBwYXRoIHJlZ2V4cFxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCAvcGF0aC8pOyAvLz0+IHRydWVcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwgL15wYXRoLyk7IC8vPT4gZmFsc2VcbiAgICAgICAgLy8gICAgIC8vIG1hdGNoIG9ubHkgYSB2ZXJiXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtvbmx5OiB7dmVyYjonZ2V0J319KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtvbmx5OiB7dmVyYjoncG9zdCd9fSk7IC8vPT4gZmFsc2VcbiAgICAgICAgLy8gICAgIC8vIG1hdGNoIGFsbCBleGNlcHQgYSB2ZXJiXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtleGNlcHQ6IHt2ZXJiOidwb3N0J319KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtleGNlcHQ6IHt2ZXJiOidnZXQnfX0pOyAvLz0+IGZhbHNlXG4gICAgICAgIC8vICAgICAvLyBtYXRjaCBhbGwgZXhjZXB0IGEgcGF0aFxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7ZXhjZXB0OiB7cGF0aDonIy9vdGhlcnBhdGgnfX0pOyAvLz0+IHRydWVcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge2V4Y2VwdDoge3BhdGg6JyMvbXlwYXRoJ319KTsgLy89PiBmYWxzZVxuICAgICAgICAvLyAgICAgLy8gbWF0Y2ggYWxsIGV4Y2VwdCBhIHZlcmIgYW5kIGEgcGF0aFxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7ZXhjZXB0OiB7cGF0aDonIy9vdGhlcnBhdGgnLCB2ZXJiOidwb3N0J319KTsgLy89PiB0cnVlXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtleGNlcHQ6IHtwYXRoOicjL215cGF0aCcsIHZlcmI6J3Bvc3QnfX0pOyAvLz0+IHRydWVcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge2V4Y2VwdDoge3BhdGg6JyMvbXlwYXRoJywgdmVyYjonZ2V0J319KTsgLy89PiBmYWxzZVxuICAgICAgICAvLyAgICAgLy8gbWF0Y2ggbXVsdGlwbGUgcGF0aHNcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge3BhdGg6IFsnIy9teXBhdGgnLCAnIy9vdGhlcnBhdGgnXX0pOyAvLz0+IHRydWVcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge3BhdGg6IFsnIy9vdGhlcnBhdGgnLCAnIy90aGlyZHBhdGgnXX0pOyAvLz0+IGZhbHNlXG4gICAgICAgIC8vICAgICAvLyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtvbmx5OiB7cGF0aDogWycjL215cGF0aCcsICcjL290aGVycGF0aCddfX0pOyAvLz0+IHRydWVcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge29ubHk6IHtwYXRoOiBbJyMvb3RoZXJwYXRoJywgJyMvdGhpcmRwYXRoJ119fSk7IC8vPT4gZmFsc2VcbiAgICAgICAgLy8gICAgIC8vIG1hdGNoIGFsbCBleGNlcHQgbXVsdGlwbGUgcGF0aHNcbiAgICAgICAgLy8gICAgIGFwcC5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwge2V4Y2VwdDoge3BhdGg6IFsnIy9teXBhdGgnLCAnIy9vdGhlcnBhdGgnXX19KTsgLy89PiBmYWxzZVxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7ZXhjZXB0OiB7cGF0aDogWycjL290aGVycGF0aCcsICcjL3RoaXJkcGF0aCddfX0pOyAvLz0+IHRydWVcbiAgICAgICAgLy8gICAgIC8vIG1hdGNoIGFsbCBleGNlcHQgbXVsdGlwbGUgcGF0aHMgYW5kIHZlcmJzXG4gICAgICAgIC8vICAgICBhcHAuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIHtleGNlcHQ6IHtwYXRoOiBbJyMvbXlwYXRoJywgJyMvb3RoZXJwYXRoJ10sIHZlcmI6IFsnZ2V0JywgJ3Bvc3QnXX19KTsgLy89PiBmYWxzZVxuICAgICAgICAvLyAgICAgYXBwLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCB7ZXhjZXB0OiB7cGF0aDogWycjL290aGVycGF0aCcsICcjL3RoaXJkcGF0aCddLCB2ZXJiOiBbJ2dldCcsICdwb3N0J119fSk7IC8vPT4gdHJ1ZVxuICAgICAgICAvL1xuICAgICAgICBjb250ZXh0TWF0Y2hlc09wdGlvbnM6IGZ1bmN0aW9uKGNvbnRleHQsIG1hdGNoX29wdGlvbnMsIHBvc2l0aXZlKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IG1hdGNoX29wdGlvbnM7XG4gICAgICAgICAgICAvLyBub3JtYWxpemUgb3B0aW9uc1xuICAgICAgICAgICAgaWYodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnIHx8IF9pc1JlZ0V4cChvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7IHBhdGg6IG9wdGlvbnMgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHR5cGVvZiBwb3NpdGl2ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwb3NpdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlbXB0eSBvcHRpb25zIGFsd2F5cyBtYXRjaFxuICAgICAgICAgICAgaWYoJC5pc0VtcHR5T2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEbyB3ZSBoYXZlIHRvIG1hdGNoIGFnYWluc3QgbXVsdGlwbGUgcGF0aHM/XG4gICAgICAgICAgICBpZihfaXNBcnJheShvcHRpb25zLnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHMsIG51bW9wdCwgb3B0cywgbGVuO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IobnVtb3B0ID0gMCwgbGVuID0gb3B0aW9ucy5wYXRoLmxlbmd0aDsgbnVtb3B0IDwgbGVuOyBudW1vcHQgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzID0gJC5leHRlbmQoe30sIG9wdGlvbnMsIHsgcGF0aDogb3B0aW9ucy5wYXRoW251bW9wdF0gfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmNvbnRleHRNYXRjaGVzT3B0aW9ucyhjb250ZXh0LCBvcHRzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVkID0gJC5pbkFycmF5KHRydWUsIHJlc3VsdHMpID4gLTEgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aXZlID8gbWF0Y2hlZCA6ICFtYXRjaGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYob3B0aW9ucy5vbmx5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dE1hdGNoZXNPcHRpb25zKGNvbnRleHQsIG9wdGlvbnMub25seSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYob3B0aW9ucy5leGNlcHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0TWF0Y2hlc09wdGlvbnMoY29udGV4dCwgb3B0aW9ucy5leGNlcHQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwYXRoX21hdGNoZWQgPSB0cnVlLCB2ZXJiX21hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYob3B0aW9ucy5wYXRoKSB7XG4gICAgICAgICAgICAgICAgaWYoIV9pc1JlZ0V4cChvcHRpb25zLnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGF0aCA9IG5ldyBSZWdFeHAob3B0aW9ucy5wYXRoLnRvU3RyaW5nKCkgKyAnJCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXRoX21hdGNoZWQgPSBvcHRpb25zLnBhdGgudGVzdChjb250ZXh0LnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYob3B0aW9ucy52ZXJiKSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIG9wdGlvbnMudmVyYiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmVyYl9tYXRjaGVkID0gb3B0aW9ucy52ZXJiID09PSBjb250ZXh0LnZlcmI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmVyYl9tYXRjaGVkID0gb3B0aW9ucy52ZXJiLmluZGV4T2YoY29udGV4dC52ZXJiKSA+IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwb3NpdGl2ZSA/ICh2ZXJiX21hdGNoZWQgJiYgcGF0aF9tYXRjaGVkKSA6ICEodmVyYl9tYXRjaGVkICYmIHBhdGhfbWF0Y2hlZCk7XG4gICAgICAgIH0sXG5cblxuICAgICAgICAvLyBEZWxlZ2F0ZXMgdG8gdGhlIGBsb2NhdGlvbl9wcm94eWAgdG8gZ2V0IHRoZSBjdXJyZW50IGxvY2F0aW9uLlxuICAgICAgICAvLyBTZWUgYFNhbW15LkRlZmF1bHRMb2NhdGlvblByb3h5YCBmb3IgbW9yZSBpbmZvIG9uIGxvY2F0aW9uIHByb3hpZXMuXG4gICAgICAgIGdldExvY2F0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbl9wcm94eS5nZXRMb2NhdGlvbigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIERlbGVnYXRlcyB0byB0aGUgYGxvY2F0aW9uX3Byb3h5YCB0byBzZXQgdGhlIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgICAgIC8vIFNlZSBgU2FtbXkuRGVmYXVsdExvY2F0aW9uUHJveHlgIGZvciBtb3JlIGluZm8gb24gbG9jYXRpb24gcHJveGllcy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEFyZ3VtZW50c1xuICAgICAgICAvL1xuICAgICAgICAvLyAqIGBuZXdfbG9jYXRpb25gIEEgbmV3IGxvY2F0aW9uIHN0cmluZyAoZS5nLiAnIy8nKVxuICAgICAgICAvL1xuICAgICAgICBzZXRMb2NhdGlvbjogZnVuY3Rpb24obmV3X2xvY2F0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYXRpb25fcHJveHkuc2V0TG9jYXRpb24obmV3X2xvY2F0aW9uKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBTd2FwcyB0aGUgY29udGVudCBvZiBgJGVsZW1lbnQoKWAgd2l0aCBgY29udGVudGBcbiAgICAgICAgLy8gWW91IGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwcm92aWRlIGFuIGFsdGVybmF0ZSBzd2FwIGJlaGF2aW9yXG4gICAgICAgIC8vIGZvciBgRXZlbnRDb250ZXh0LnBhcnRpYWwoKWAuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgdmFyIGFwcCA9ICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAvLyBpbXBsZW1lbnRzIGEgJ2ZhZGUgb3V0Jy8nZmFkZSBpbidcbiAgICAgICAgLy8gICAgICAgIHRoaXMuc3dhcCA9IGZ1bmN0aW9uKGNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgLy8gICAgICAgICAgY29udGV4dC4kZWxlbWVudCgpLmZhZGVPdXQoJ3Nsb3cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgICAgICBjb250ZXh0LiRlbGVtZW50KCkuaHRtbChjb250ZW50KTtcbiAgICAgICAgLy8gICAgICAgICAgICBjb250ZXh0LiRlbGVtZW50KCkuZmFkZUluKCdzbG93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICB9O1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIH0pO1xuICAgICAgICAvL1xuICAgICAgICBzd2FwOiBmdW5jdGlvbihjb250ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyICRlbCA9IHRoaXMuJGVsZW1lbnQoKS5odG1sKGNvbnRlbnQpO1xuICAgICAgICAgICAgaWYoX2lzRnVuY3Rpb24oY2FsbGJhY2spKSB7IGNhbGxiYWNrKGNvbnRlbnQpOyB9XG4gICAgICAgICAgICByZXR1cm4gJGVsO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGEgc2ltcGxlIGdsb2JhbCBjYWNoZSBmb3IgdGVtcGxhdGVzLiBVc2VzIHRoZSBzYW1lIHNlbWFudGljcyBhc1xuICAgICAgICAvLyBgU2FtbXkuQ2FjaGVgIGFuZCBgU2FtbXkuU3RvcmFnZWAgc28gY2FuIGVhc2lseSBiZSByZXBsYWNlZCB3aXRoXG4gICAgICAgIC8vIGEgcGVyc2lzdGVudCBzdG9yYWdlIHRoYXQgbGFzdHMgYmV5b25kIHRoZSBjdXJyZW50IHJlcXVlc3QuXG4gICAgICAgIHRlbXBsYXRlQ2FjaGU6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGVtcGxhdGVfY2FjaGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RlbXBsYXRlX2NhY2hlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gY2xlYXIgdGhlIHRlbXBsYXRlQ2FjaGVcbiAgICAgICAgY2xlYXJUZW1wbGF0ZUNhY2hlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAoX3RlbXBsYXRlX2NhY2hlID0ge30pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoaXMgdGhyb3dzIGEgJzQwNCBOb3QgRm91bmQnIGVycm9yIGJ5IGludm9raW5nIGBlcnJvcigpYC5cbiAgICAgICAgLy8gT3ZlcnJpZGUgdGhpcyBtZXRob2Qgb3IgYGVycm9yKClgIHRvIHByb3ZpZGUgY3VzdG9tXG4gICAgICAgIC8vIDQwNCBiZWhhdmlvciAoaS5lIHJlZGlyZWN0aW5nIHRvIC8gb3Igc2hvd2luZyBhIHdhcm5pbmcpXG4gICAgICAgIG5vdEZvdW5kOiBmdW5jdGlvbih2ZXJiLCBwYXRoKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0gdGhpcy5lcnJvcihbJzQwNCBOb3QgRm91bmQnLCB2ZXJiLCBwYXRoXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgcmV0dXJuICh2ZXJiID09PSAnZ2V0JykgPyByZXQgOiB0cnVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoZSBiYXNlIGVycm9yIGhhbmRsZXIgdGFrZXMgYSBzdHJpbmcgYG1lc3NhZ2VgIGFuZCBhbiBgRXJyb3JgXG4gICAgICAgIC8vIG9iamVjdC4gSWYgYHJhaXNlX2Vycm9yc2AgaXMgc2V0IHRvIGB0cnVlYCBvbiB0aGUgYXBwIGxldmVsLFxuICAgICAgICAvLyB0aGlzIHdpbGwgcmUtdGhyb3cgdGhlIGVycm9yIHRvIHRoZSBicm93c2VyLiBPdGhlcndpc2UgaXQgd2lsbCBzZW5kIHRoZSBlcnJvclxuICAgICAgICAvLyB0byBgbG9nKClgLiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwcm92aWRlIGN1c3RvbSBlcnJvciBoYW5kbGluZ1xuICAgICAgICAvLyBlLmcgbG9nZ2luZyB0byBhIHNlcnZlciBzaWRlIGNvbXBvbmVudCBvciBkaXNwbGF5aW5nIHNvbWUgZmVlZGJhY2sgdG8gdGhlXG4gICAgICAgIC8vIHVzZXIuXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihtZXNzYWdlLCBvcmlnaW5hbF9lcnJvcikge1xuICAgICAgICAgICAgaWYoIW9yaWdpbmFsX2Vycm9yKSB7IG9yaWdpbmFsX2Vycm9yID0gbmV3IEVycm9yKCk7IH1cbiAgICAgICAgICAgIG9yaWdpbmFsX2Vycm9yLm1lc3NhZ2UgPSBbbWVzc2FnZSwgb3JpZ2luYWxfZXJyb3IubWVzc2FnZV0uam9pbignICcpO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicsIHsgbWVzc2FnZTogb3JpZ2luYWxfZXJyb3IubWVzc2FnZSwgZXJyb3I6IG9yaWdpbmFsX2Vycm9yIH0pO1xuICAgICAgICAgICAgaWYodGhpcy5yYWlzZV9lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAob3JpZ2luYWxfZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhvcmlnaW5hbF9lcnJvci5tZXNzYWdlLCBvcmlnaW5hbF9lcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NoZWNrTG9jYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGxvY2F0aW9uLCByZXR1cm5lZDtcbiAgICAgICAgICAgIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gICAgICAgICAgICBsb2NhdGlvbiA9IHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgICAgIC8vIGNvbXBhcmUgdG8gc2VlIGlmIGhhc2ggaGFzIGNoYW5nZWRcbiAgICAgICAgICAgIGlmKCF0aGlzLmxhc3RfbG9jYXRpb24gfHwgdGhpcy5sYXN0X2xvY2F0aW9uWzBdICE9ICdnZXQnIHx8IHRoaXMubGFzdF9sb2NhdGlvblsxXSAhPSBsb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIHJlc2V0IGxhc3QgbG9jYXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfbG9jYXRpb24gPSBbJ2dldCcsIGxvY2F0aW9uXTtcbiAgICAgICAgICAgICAgICAvLyBsb29rdXAgcm91dGUgZm9yIGN1cnJlbnQgaGFzaFxuICAgICAgICAgICAgICAgIHJldHVybmVkID0gdGhpcy5ydW5Sb3V0ZSgnZ2V0JywgbG9jYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9nZXRGb3JtVmVyYjogZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICAgICAgdmFyICRmb3JtID0gJChmb3JtKSwgdmVyYiwgJF9tZXRob2Q7XG4gICAgICAgICAgICAkX21ldGhvZCA9ICRmb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJfbWV0aG9kXCJdJyk7XG4gICAgICAgICAgICBpZigkX21ldGhvZC5sZW5ndGggPiAwKSB7IHZlcmIgPSAkX21ldGhvZC52YWwoKTsgfVxuICAgICAgICAgICAgaWYoIXZlcmIpIHsgdmVyYiA9ICRmb3JtWzBdLmdldEF0dHJpYnV0ZSgnbWV0aG9kJyk7IH1cbiAgICAgICAgICAgIGlmKCF2ZXJiIHx8IHZlcmIgPT09ICcnKSB7IHZlcmIgPSAnZ2V0JzsgfVxuICAgICAgICAgICAgcmV0dXJuICQudHJpbSh2ZXJiLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2NoZWNrRm9ybVN1Ym1pc3Npb246IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICAgICAgICAgIHZhciAkZm9ybSwgcGF0aCwgdmVyYiwgcGFyYW1zLCByZXR1cm5lZDtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignY2hlY2stZm9ybS1zdWJtaXNzaW9uJywgeyBmb3JtOiBmb3JtIH0pO1xuICAgICAgICAgICAgJGZvcm0gPSAkKGZvcm0pO1xuICAgICAgICAgICAgcGF0aCA9ICRmb3JtLmF0dHIoJ2FjdGlvbicpIHx8ICcnO1xuICAgICAgICAgICAgdmVyYiA9IHRoaXMuX2dldEZvcm1WZXJiKCRmb3JtKTtcblxuICAgICAgICAgICAgaWYodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdfY2hlY2tGb3JtU3VibWlzc2lvbicsICRmb3JtLCBwYXRoLCB2ZXJiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodmVyYiA9PT0gJ2dldCcpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSB0aGlzLl9zZXJpYWxpemVGb3JtUGFyYW1zKCRmb3JtKTtcbiAgICAgICAgICAgICAgICBpZihwYXJhbXMgIT09ICcnKSB7IHBhdGggKz0gJz8nICsgcGFyYW1zOyB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhdGlvbihwYXRoKTtcbiAgICAgICAgICAgICAgICByZXR1cm5lZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSAkLmV4dGVuZCh7fSwgdGhpcy5fcGFyc2VGb3JtUGFyYW1zKCRmb3JtKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuZWQgPSB0aGlzLnJ1blJvdXRlKHZlcmIsIHBhdGgsIHBhcmFtcywgZm9ybS5nZXQoMCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgcmV0dXJuZWQgPT0gJ3VuZGVmaW5lZCcpID8gZmFsc2UgOiByZXR1cm5lZDtcbiAgICAgICAgfSxcblxuICAgICAgICBfc2VyaWFsaXplRm9ybVBhcmFtczogZnVuY3Rpb24oJGZvcm0pIHtcbiAgICAgICAgICAgIHZhciBxdWVyeVN0cmluZyA9IFwiXCIsXG4gICAgICAgICAgICAgIGZpZWxkcyA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCksXG4gICAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBpZihmaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gdGhpcy5fZW5jb2RlRm9ybVBhaXIoZmllbGRzWzBdLm5hbWUsIGZpZWxkc1swXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAxOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcgKyBcIiZcIiArIHRoaXMuX2VuY29kZUZvcm1QYWlyKGZpZWxkc1tpXS5uYW1lLCBmaWVsZHNbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBxdWVyeVN0cmluZztcbiAgICAgICAgfSxcblxuICAgICAgICBfZW5jb2RlRm9ybVBhaXI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gX2VuY29kZShuYW1lKSArIFwiPVwiICsgX2VuY29kZSh2YWx1ZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3BhcnNlRm9ybVBhcmFtczogZnVuY3Rpb24oJGZvcm0pIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7fSxcbiAgICAgICAgICAgICAgICBmb3JtX2ZpZWxkcyA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCksXG4gICAgICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGZvcm1fZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gdGhpcy5fcGFyc2VQYXJhbVBhaXIocGFyYW1zLCBmb3JtX2ZpZWxkc1tpXS5uYW1lLCBmb3JtX2ZpZWxkc1tpXS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9wYXJzZVF1ZXJ5U3RyaW5nOiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge30sIHBhcnRzLCBwYWlycywgcGFpciwgaTtcblxuICAgICAgICAgICAgcGFydHMgPSBwYXRoLm1hdGNoKFFVRVJZX1NUUklOR19NQVRDSEVSKTtcbiAgICAgICAgICAgIGlmKHBhcnRzICYmIHBhcnRzWzFdKSB7XG4gICAgICAgICAgICAgICAgcGFpcnMgPSBwYXJ0c1sxXS5zcGxpdCgnJicpO1xuICAgICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSB0aGlzLl9wYXJzZVBhcmFtUGFpcihwYXJhbXMsIF9kZWNvZGUocGFpclswXSksIF9kZWNvZGUocGFpclsxXSB8fCBcIlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgfSxcblxuICAgICAgICBfcGFyc2VQYXJhbVBhaXI6IGZ1bmN0aW9uKHBhcmFtcywga2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgaWYodHlwZW9mIHBhcmFtc1trZXldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmKF9pc0FycmF5KHBhcmFtc1trZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXNba2V5XS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXNba2V5XSA9IFtwYXJhbXNba2V5XSwgdmFsdWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2xpc3RlbjogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50KCkuYmluZChbbmFtZSwgdGhpcy5ldmVudE5hbWVzcGFjZSgpXS5qb2luKCcuJyksIGNhbGxiYWNrKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfdW5saXN0ZW46IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudCgpLnVuYmluZChbbmFtZSwgdGhpcy5ldmVudE5hbWVzcGFjZSgpXS5qb2luKCcuJyksIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyBgU2FtbXkuUmVuZGVyQ29udGV4dGAgaXMgYW4gb2JqZWN0IHRoYXQgbWFrZXMgc2VxdWVudGlhbCB0ZW1wbGF0ZSBsb2FkaW5nLFxuICAgIC8vIHJlbmRlcmluZyBhbmQgaW50ZXJwb2xhdGlvbiBzZWFtbGVzcyBldmVuIHdoZW4gZGVhbGluZyB3aXRoIGFzeW5jaHJvbm91c1xuICAgIC8vIG9wZXJhdGlvbnMuXG4gICAgLy9cbiAgICAvLyBgUmVuZGVyQ29udGV4dGAgb2JqZWN0cyBhcmUgbm90IHVzdWFsbHkgY3JlYXRlZCBkaXJlY3RseSwgcmF0aGVyIHRoZXkgYXJlXG4gICAgLy8gaW5zdGFudGlhdGVkIGZyb20gYW4gYFNhbW15LkV2ZW50Q29udGV4dGAgYnkgdXNpbmcgYHJlbmRlcigpYCwgYGxvYWQoKWAgb3JcbiAgICAvLyBgcGFydGlhbCgpYCB3aGljaCBhbGwgcmV0dXJuIGBSZW5kZXJDb250ZXh0YCBvYmplY3RzLlxuICAgIC8vXG4gICAgLy8gYFJlbmRlckNvbnRleHRgIG1ldGhvZHMgYWx3YXlzIHJldHVybnMgYSBtb2RpZmllZCBgUmVuZGVyQ29udGV4dGBcbiAgICAvLyBmb3IgY2hhaW5pbmcgKGxpa2UgalF1ZXJ5IGl0c2VsZikuXG4gICAgLy9cbiAgICAvLyBUaGUgY29yZSBtYWdpYyBpcyBpbiB0aGUgYHRoZW4oKWAgbWV0aG9kIHdoaWNoIHB1dHMgdGhlIGNhbGxiYWNrIHBhc3NlZCBhc1xuICAgIC8vIGFuIGFyZ3VtZW50IGludG8gYSBxdWV1ZSB0byBiZSBleGVjdXRlZCBvbmNlIHRoZSBwcmV2aW91cyBjYWxsYmFjayBpcyBjb21wbGV0ZS5cbiAgICAvLyBBbGwgdGhlIG1ldGhvZHMgb2YgYFJlbmRlckNvbnRleHRgIGFyZSB3cmFwcGVkIGluIGB0aGVuKClgIHdoaWNoIGFsbG93cyB5b3VcbiAgICAvLyB0byBxdWV1ZSB1cCBtZXRob2RzIGJ5IGNoYWluaW5nLCBidXQgbWFpbnRhaW5pbmcgYSBndWFyYW50ZWVkIGV4ZWN1dGlvbiBvcmRlclxuICAgIC8vIGV2ZW4gd2l0aCByZW1vdGUgY2FsbHMgdG8gZmV0Y2ggdGVtcGxhdGVzLlxuICAgIC8vXG4gICAgU2FtbXkuUmVuZGVyQ29udGV4dCA9IGZ1bmN0aW9uKGV2ZW50X2NvbnRleHQpIHtcbiAgICAgICAgdGhpcy5ldmVudF9jb250ZXh0ID0gZXZlbnRfY29udGV4dDtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy5wcmV2aW91c19jb250ZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0X2VuZ2luZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLndhaXRpbmcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgU2FtbXkuUmVuZGVyQ29udGV4dC5wcm90b3R5cGUgPSAkLmV4dGVuZCh7fSwgU2FtbXkuT2JqZWN0LnByb3RvdHlwZSwge1xuXG4gICAgICAgIC8vIFRoZSBcImNvcmVcIiBvZiB0aGUgYFJlbmRlckNvbnRleHRgIG9iamVjdCwgYWRkcyB0aGUgYGNhbGxiYWNrYCB0byB0aGVcbiAgICAgICAgLy8gcXVldWUuIElmIHRoZSBjb250ZXh0IGlzIGB3YWl0aW5nYCAobWVhbmluZyBhbiBhc3luYyBvcGVyYXRpb24gaXMgaGFwcGVuaW5nKVxuICAgICAgICAvLyB0aGVuIHRoZSBjYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkIGluIG9yZGVyLCBvbmNlIHRoZSBvdGhlciBvcGVyYXRpb25zIGFyZVxuICAgICAgICAvLyBjb21wbGV0ZS4gSWYgdGhlcmUgaXMgbm8gY3VycmVudGx5IGV4ZWN1dGluZyBvcGVyYXRpb24sIHRoZSBgY2FsbGJhY2tgXG4gICAgICAgIC8vIGlzIGV4ZWN1dGVkIGltbWVkaWF0ZWx5LlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgdmFsdWUgcmV0dXJuZWQgZnJvbSB0aGUgY2FsbGJhY2sgaXMgc3RvcmVkIGluIGBjb250ZW50YCBmb3IgdGhlXG4gICAgICAgIC8vIHN1YnNlcXVlbnQgb3BlcmF0aW9uLiBJZiB5b3UgcmV0dXJuIGBmYWxzZWAsIHRoZSBxdWV1ZSB3aWxsIHBhdXNlLCBhbmRcbiAgICAgICAgLy8gdGhlIG5leHQgY2FsbGJhY2sgaW4gdGhlIHF1ZXVlIHdpbGwgbm90IGJlIGV4ZWN1dGVkIHVudGlsIGBuZXh0KClgIGlzXG4gICAgICAgIC8vIGNhbGxlZC4gVGhpcyBhbGxvd3MgZm9yIHRoZSBndWFyYW50ZWVkIG9yZGVyIG9mIGV4ZWN1dGlvbiB3aGlsZSB3b3JraW5nXG4gICAgICAgIC8vIHdpdGggYXN5bmMgb3BlcmF0aW9ucy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgdGhlbigpIGlzIHBhc3NlZCBhIHN0cmluZyBpbnN0ZWFkIG9mIGEgZnVuY3Rpb24sIHRoZSBzdHJpbmcgaXMgbG9va2VkXG4gICAgICAgIC8vIHVwIGFzIGEgaGVscGVyIG1ldGhvZCBvbiB0aGUgZXZlbnQgY29udGV4dC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB0aGlzLmdldCgnIy8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIFJlbmRlckNvbnRleHRcbiAgICAgICAgLy8gICAgICAgIC8vIEV2ZW4gdGhvdWdoIGBsb2FkKClgIGV4ZWN1dGVzIGFzeW5jLCB0aGUgbmV4dCBgdGhlbigpYFxuICAgICAgICAvLyAgICAgICAgLy8gd29udCBleGVjdXRlIHVudGlsIHRoZSBsb2FkIGZpbmlzaGVzXG4gICAgICAgIC8vICAgICAgICB0aGlzLmxvYWQoJ215ZmlsZS50eHQnKVxuICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgIC8vIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVuIGlzIHRoZSBjb250ZW50IG9mIHRoZVxuICAgICAgICAvLyAgICAgICAgICAgICAgLy8gcHJldiBvcGVyYXRpb25cbiAgICAgICAgLy8gICAgICAgICAgICAgICQoJyNtYWluJykuaHRtbChjb250ZW50KTtcbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhlbjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmKCFfaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBhIHN0cmluZyBpcyBwYXNzZWQgdG8gdGhlbiwgYXNzdW1lIHdlIHdhbnQgdG8gY2FsbFxuICAgICAgICAgICAgICAgIC8vIGEgaGVscGVyIG9uIHRoZSBldmVudCBjb250ZXh0IGluIGl0cyBjb250ZXh0XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJyAmJiBjYWxsYmFjayBpbiB0aGlzLmV2ZW50X2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlbHBlciA9IHRoaXMuZXZlbnRfY29udGV4dFtjYWxsYmFja107XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhlbHBlci5hcHBseSh0aGlzLmV2ZW50X2NvbnRleHQsIFtjb250ZW50XSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgaWYodGhpcy53YWl0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud2FpdCgpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuZWQgPSBjYWxsYmFjay5hcHBseShjb250ZXh0LCBbY29udGV4dC5jb250ZW50LCBjb250ZXh0LnByZXZpb3VzX2NvbnRlbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYocmV0dXJuZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm5leHQocmV0dXJuZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBQYXVzZSB0aGUgYFJlbmRlckNvbnRleHRgIHF1ZXVlLiBDb21iaW5lZCB3aXRoIGBuZXh0KClgIGFsbG93cyBmb3IgYXN5bmNcbiAgICAgICAgLy8gb3BlcmF0aW9ucy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHRoaXMuZ2V0KCcjLycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICB0aGlzLmxvYWQoJ215dGV4dC5qc29uJylcbiAgICAgICAgLy8gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGF0YSAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHBhdXNlIGV4ZWN1dGlvblxuICAgICAgICAvLyAgICAgICAgICAgICAgICBjb250ZXh0LndhaXQoKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gcG9zdCB0byBhIHVybFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAkLnBvc3QoZGF0YS51cmwsIHt9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIGNvbnRleHQubmV4dChKU09OLnBhcnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gZGF0YSBpcyBqc29uIGZyb20gdGhlIHByZXZpb3VzIHBvc3RcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgJCgnI21lc3NhZ2UnKS50ZXh0KGRhdGEuc3RhdHVzKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgfSk7XG4gICAgICAgIHdhaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy53YWl0aW5nID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZXN1bWUgdGhlIHF1ZXVlLCBzZXR0aW5nIGBjb250ZW50YCB0byBiZSB1c2VkIGluIHRoZSBuZXh0IG9wZXJhdGlvbi5cbiAgICAgICAgLy8gU2VlIGB3YWl0KClgIGZvciBhbiBleGFtcGxlLlxuICAgICAgICBuZXh0OiBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLndhaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjb250ZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNfY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5jYWxsYmFja3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGhlbih0aGlzLmNhbGxiYWNrcy5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBMb2FkIGEgdGVtcGxhdGUgaW50byB0aGUgY29udGV4dC5cbiAgICAgICAgLy8gVGhlIGBsb2NhdGlvbmAgY2FuIGVpdGhlciBiZSBhIHN0cmluZyBzcGVjaWZ5aW5nIHRoZSByZW1vdGUgcGF0aCB0byB0aGVcbiAgICAgICAgLy8gZmlsZSwgYSBqUXVlcnkgb2JqZWN0LCBvciBhIERPTSBlbGVtZW50LlxuICAgICAgICAvL1xuICAgICAgICAvLyBObyBpbnRlcnBvbGF0aW9uIGhhcHBlbnMgYnkgZGVmYXVsdCwgdGhlIGNvbnRlbnQgaXMgc3RvcmVkIGluXG4gICAgICAgIC8vIGBjb250ZW50YC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSW4gdGhlIGNhc2Ugb2YgYSBwYXRoLCB1bmxlc3MgdGhlIG9wdGlvbiBge2NhY2hlOiBmYWxzZX1gIGlzIHBhc3NlZCB0aGVcbiAgICAgICAgLy8gZGF0YSBpcyBzdG9yZWQgaW4gdGhlIGFwcCdzIGB0ZW1wbGF0ZUNhY2hlKClgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBJZiBhIGpRdWVyeSBvciBET00gb2JqZWN0IGlzIHBhc3NlZCB0aGUgYGlubmVySFRNTGAgb2YgdGhlIG5vZGUgaXMgcHVsbGVkIGluLlxuICAgICAgICAvLyBUaGlzIGlzIHVzZWZ1bCBmb3IgbmVzdGluZyB0ZW1wbGF0ZXMgYXMgcGFydCBvZiB0aGUgaW5pdGlhbCBwYWdlIGxvYWQgd3JhcHBlZFxuICAgICAgICAvLyBpbiBpbnZpc2libGUgZWxlbWVudHMgb3IgYDxzY3JpcHQ+YCB0YWdzLiBXaXRoIHRlbXBsYXRlIHBhdGhzLCB0aGUgdGVtcGxhdGVcbiAgICAgICAgLy8gZW5naW5lIGlzIGxvb2tlZCB1cCBieSB0aGUgZXh0ZW5zaW9uLiBGb3IgRE9NL2pRdWVyeSBlbWJlZGRlZCB0ZW1wbGF0ZXMsXG4gICAgICAgIC8vIHRoaXMgaXNudCBwb3NzaWJsZSwgc28gdGhlcmUgYXJlIGEgY291cGxlIG9mIG9wdGlvbnM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAqIHBhc3MgYW4gYHtlbmdpbmU6fWAgb3B0aW9uLlxuICAgICAgICAvLyAgKiBkZWZpbmUgdGhlIGVuZ2luZSBpbiB0aGUgYGRhdGEtZW5naW5lYCBhdHRyaWJ1dGUgb2YgdGhlIHBhc3NlZCBub2RlLlxuICAgICAgICAvLyAgKiBqdXN0IHN0b3JlIHRoZSByYXcgdGVtcGxhdGUgZGF0YSBhbmQgdXNlIGBpbnRlcnBvbGF0ZSgpYCBtYW51YWxseVxuICAgICAgICAvL1xuICAgICAgICAvLyBJZiBhIGBjYWxsYmFja2AgaXMgcGFzc2VkIGl0IGlzIGV4ZWN1dGVkIGFmdGVyIHRoZSB0ZW1wbGF0ZSBsb2FkLlxuICAgICAgICBsb2FkOiBmdW5jdGlvbihsb2NhdGlvbiwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNob3VsZF9jYWNoZSwgY2FjaGVkLCBpc19qc29uLCBsb2NhdGlvbl9hcnJheTtcbiAgICAgICAgICAgICAgICBpZihfaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjaykgeyB0aGlzLnRoZW4oY2FsbGJhY2spOyB9XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBpdCdzIGEgcGF0aFxuICAgICAgICAgICAgICAgICAgICBpc19qc29uID0gKGxvY2F0aW9uLm1hdGNoKC9cXC5qc29uKFxcP3wkKS8pIHx8IG9wdGlvbnMuanNvbik7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZF9jYWNoZSA9IGlzX2pzb24gPyBvcHRpb25zLmNhY2hlID09PSB0cnVlIDogb3B0aW9ucy5jYWNoZSAhPT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQubmV4dF9lbmdpbmUgPSBjb250ZXh0LmV2ZW50X2NvbnRleHQuZW5naW5lRm9yKGxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuY2FjaGU7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmpzb247XG4gICAgICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMuZW5naW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lm5leHRfZW5naW5lID0gb3B0aW9ucy5lbmdpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5lbmdpbmU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2hvdWxkX2NhY2hlICYmIChjYWNoZWQgPSB0aGlzLmV2ZW50X2NvbnRleHQuYXBwLnRlbXBsYXRlQ2FjaGUobG9jYXRpb24pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KCQuZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogbG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBpc19qc29uID8gJ2pzb24nIDogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2hvdWxkX2NhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZXZlbnRfY29udGV4dC5hcHAudGVtcGxhdGVDYWNoZShsb2NhdGlvbiwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQubmV4dChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgb3B0aW9ucykpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBhIGRvbS9qUXVlcnlcbiAgICAgICAgICAgICAgICAgICAgaWYobG9jYXRpb24ubm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbi5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYobG9jYXRpb24uc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0J3MgYSBqUXVlcnlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQubmV4dF9lbmdpbmUgPSBsb2NhdGlvbi5hdHRyKCdkYXRhLWVuZ2luZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5jbG9uZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRpb24ucmVtb3ZlKClbMF0uaW5uZXJIVE1MLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhdGlvblswXS5pbm5lckhUTUwudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIExvYWQgcGFydGlhbHNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB0aGlzLmxvYWRQYXJ0aWFscyh7bXlwYXJ0aWFsOiAnL3BhdGgvdG8vcGFydGlhbCd9KTtcbiAgICAgICAgLy9cbiAgICAgICAgbG9hZFBhcnRpYWxzOiBmdW5jdGlvbihwYXJ0aWFscykge1xuICAgICAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgICAgICBpZihwYXJ0aWFscykge1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGlhbHMgPSB0aGlzLnBhcnRpYWxzIHx8IHt9O1xuICAgICAgICAgICAgICAgIGZvcihuYW1lIGluIHBhcnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihjb250ZXh0LCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmxvYWQocGFydGlhbHNbbmFtZV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSh0aGlzLCBuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBgbG9hZCgpYCBhIHRlbXBsYXRlIGFuZCB0aGVuIGBpbnRlcnBvbGF0ZSgpYCBpdCB3aXRoIGRhdGEuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGNhbiBiZSBjYWxsZWQgd2l0aCBtdWx0aXBsZSBkaWZmZXJlbnQgc2lnbmF0dXJlczpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICB0aGlzLnJlbmRlcihjYWxsYmFjayk7XG4gICAgICAgIC8vICAgICAgdGhpcy5yZW5kZXIoJy9sb2NhdGlvbicpO1xuICAgICAgICAvLyAgICAgIHRoaXMucmVuZGVyKCcvbG9jYXRpb24nLCB7c29tZTogZGF0YX0pO1xuICAgICAgICAvLyAgICAgIHRoaXMucmVuZGVyKCcvbG9jYXRpb24nLCBjYWxsYmFjayk7XG4gICAgICAgIC8vICAgICAgdGhpcy5yZW5kZXIoJy9sb2NhdGlvbicsIHtzb21lOiBkYXRhfSwgY2FsbGJhY2spO1xuICAgICAgICAvLyAgICAgIHRoaXMucmVuZGVyKCcvbG9jYXRpb24nLCB7c29tZTogZGF0YX0sIHtteTogcGFydGlhbHN9KTtcbiAgICAgICAgLy8gICAgICB0aGlzLnJlbmRlcignL2xvY2F0aW9uJywgY2FsbGJhY2ssIHtteTogcGFydGlhbHN9KTtcbiAgICAgICAgLy8gICAgICB0aGlzLnJlbmRlcignL2xvY2F0aW9uJywge3NvbWU6IGRhdGF9LCBjYWxsYmFjaywge215OiBwYXJ0aWFsc30pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHRoaXMuZ2V0KCcjLycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgdGhpcy5yZW5kZXIoJ215dGVtcGxhdGUudGVtcGxhdGUnLCB7bmFtZTogJ3Rlc3QnfSk7XG4gICAgICAgIC8vICAgICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24obG9jYXRpb24sIGRhdGEsIGNhbGxiYWNrLCBwYXJ0aWFscykge1xuICAgICAgICAgICAgaWYoX2lzRnVuY3Rpb24obG9jYXRpb24pICYmICFkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gaW52b2tlZCBhcyByZW5kZXIoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihsb2NhdGlvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKF9pc0Z1bmN0aW9uKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGludm9rZWQgYXMgcmVuZGVyKGxvY2F0aW9uLCBjYWxsYmFjaywgW3BhcnRpYWxzXSlcbiAgICAgICAgICAgICAgICAgICAgcGFydGlhbHMgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2FsbGJhY2sgJiYgIV9pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbnZva2VkIGFzIHJlbmRlcihsb2NhdGlvbiwgZGF0YSwgcGFydGlhbHMpXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpYWxzID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkUGFydGlhbHMocGFydGlhbHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAubG9hZChsb2NhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbnRlcnBvbGF0ZShkYXRhLCBsb2NhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBgcmVuZGVyKClgIHRoZSBgbG9jYXRpb25gIHdpdGggYGRhdGFgIGFuZCB0aGVuIGBzd2FwKClgIHRoZVxuICAgICAgICAvLyBhcHAncyBgJGVsZW1lbnRgIHdpdGggdGhlIHJlbmRlcmVkIGNvbnRlbnQuXG4gICAgICAgIHBhcnRpYWw6IGZ1bmN0aW9uKGxvY2F0aW9uLCBkYXRhLCBjYWxsYmFjaywgcGFydGlhbHMpIHtcbiAgICAgICAgICAgIGlmKF9pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIC8vIGludm9rZWQgYXMgcGFydGlhbChsb2NhdGlvbiwgZGF0YSwgY2FsbGJhY2ssIFtwYXJ0aWFsc10pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKGxvY2F0aW9uLCBkYXRhLCBwYXJ0aWFscykuc3dhcChjYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoX2lzRnVuY3Rpb24oZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAvLyBpbnZva2VkIGFzIHBhcnRpYWwobG9jYXRpb24sIGNhbGxiYWNrLCBbcGFydGlhbHNdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihsb2NhdGlvbiwge30sIGNhbGxiYWNrKS5zd2FwKGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpbnZva2VkIGFzIHBhcnRpYWwobG9jYXRpb24sIGRhdGEsIFtwYXJ0aWFsc10pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKGxvY2F0aW9uLCBkYXRhLCBjYWxsYmFjaykuc3dhcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGRlZmVycyB0aGUgY2FsbCBvZiBmdW5jdGlvbiB0byBvY2N1ciBpbiBvcmRlciBvZiB0aGUgcmVuZGVyIHF1ZXVlLlxuICAgICAgICAvLyBUaGUgZnVuY3Rpb24gY2FuIGFjY2VwdCBhbnkgbnVtYmVyIG9mIGFyZ3VtZW50cyBhcyBsb25nIGFzIHRoZSBsYXN0XG4gICAgICAgIC8vIGFyZ3VtZW50IGlzIGEgY2FsbGJhY2sgZnVuY3Rpb24uIFRoaXMgaXMgdXNlZnVsIGZvciBwdXR0aW5nIGFyYml0cmFyeVxuICAgICAgICAvLyBhc3luY2hyb25vdXMgZnVuY3Rpb25zIGludG8gdGhlIHF1ZXVlLiBUaGUgY29udGVudCBwYXNzZWQgdG8gdGhlXG4gICAgICAgIC8vIGNhbGxiYWNrIGlzIHBhc3NlZCBhcyBgY29udGVudGAgdG8gdGhlIG5leHQgaXRlbSBpbiB0aGUgcXVldWUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICMjIyBFeGFtcGxlXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB0aGlzLnNlbmQoJC5nZXRKU09OLCAnL2FwcC5qc29uJylcbiAgICAgICAgLy8gICAgICAgICAudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIC8vICAgICAgICAgICAkKCcjbWVzc2FnZSkudGV4dChqc29uWydtZXNzYWdlJ10pO1xuICAgICAgICAvLyAgICAgICAgICB9KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy9cbiAgICAgICAgc2VuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgYXJncyA9IF9tYWtlQXJyYXkoYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICBmdW4gPSBhcmdzLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmKF9pc0FycmF5KGFyZ3NbMF0pKSB7IGFyZ3MgPSBhcmdzWzBdOyB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChmdW5jdGlvbihyZXNwb25zZSkgeyBjb250ZXh0Lm5leHQocmVzcG9uc2UpOyB9KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LndhaXQoKTtcbiAgICAgICAgICAgICAgICBmdW4uYXBwbHkoZnVuLCBhcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBpdGVyYXRlcyBvdmVyIGFuIGFycmF5LCBhcHBseWluZyB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggaXRlbSBpdGVtLiB0aGVcbiAgICAgICAgLy8gY2FsbGJhY2sgdGFrZXMgdGhlIHNhbWUgc3R5bGUgb2YgYXJndW1lbnRzIGFzIGBqUXVlcnkuZWFjaCgpYCAoaW5kZXgsIGl0ZW0pLlxuICAgICAgICAvLyBUaGUgcmV0dXJuIHZhbHVlIG9mIGVhY2ggY2FsbGJhY2sgaXMgY29sbGVjdGVkIGFzIGEgc2luZ2xlIHN0cmluZyBhbmQgc3RvcmVkXG4gICAgICAgIC8vIGFzIGBjb250ZW50YCB0byBiZSB1c2VkIGluIHRoZSBuZXh0IGl0ZXJhdGlvbiBvZiB0aGUgYFJlbmRlckNvbnRleHRgLlxuICAgICAgICBjb2xsZWN0OiBmdW5jdGlvbihhcnJheSwgY2FsbGJhY2ssIG5vdykge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGNvbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihfaXNGdW5jdGlvbihhcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBhcnJheTtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkgPSB0aGlzLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb250ZW50cyA9IFtdLCBkb21zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGFycmF5LCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5lZCA9IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIFtpLCBpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldHVybmVkLmpxdWVyeSAmJiByZXR1cm5lZC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuZWQgPSByZXR1cm5lZFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzLnB1c2gocmV0dXJuZWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbXMgPyBjb250ZW50cyA6IGNvbnRlbnRzLmpvaW4oJycpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBub3cgPyBjb2xsKCkgOiB0aGlzLnRoZW4oY29sbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gbG9hZHMgYSB0ZW1wbGF0ZSwgYW5kIHRoZW4gaW50ZXJwb2xhdGVzIGl0IGZvciBlYWNoIGl0ZW0gaW4gdGhlIGBkYXRhYFxuICAgICAgICAvLyBhcnJheS4gSWYgYSBjYWxsYmFjayBpcyBwYXNzZWQsIGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCBlYWNoXG4gICAgICAgIC8vIGl0ZW0gaW4gdGhlIGFycmF5IF9hZnRlcl8gaW50ZXJwb2xhdGlvblxuICAgICAgICByZW5kZXJFYWNoOiBmdW5jdGlvbihsb2NhdGlvbiwgbmFtZSwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmKF9pc0FycmF5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBuYW1lO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZChsb2NhdGlvbikudGhlbihmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJjdHggPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfaXNBcnJheSh0aGlzLnByZXZpb3VzX2NvbnRlbnQpID8gdGhpcy5wcmV2aW91c19jb250ZW50IDogW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbihpLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkYXRhID0ge30sIGVuZ2luZSA9IHRoaXMubmV4dF9lbmdpbmUgfHwgbG9jYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRhdGFbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlLCByY3R4LmV2ZW50X2NvbnRleHQuaW50ZXJwb2xhdGUoY29udGVudCwgaWRhdGEsIGVuZ2luZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0KGRhdGEsIGZ1bmN0aW9uKGksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWRhdGEgPSB7fSwgZW5naW5lID0gdGhpcy5uZXh0X2VuZ2luZSB8fCBsb2NhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGF0YVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGF0YSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRfY29udGV4dC5pbnRlcnBvbGF0ZShjb250ZW50LCBpZGF0YSwgZW5naW5lKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gdXNlcyB0aGUgcHJldmlvdXMgbG9hZGVkIGBjb250ZW50YCBhbmQgdGhlIGBkYXRhYCBvYmplY3QgdG8gaW50ZXJwb2xhdGVcbiAgICAgICAgLy8gYSB0ZW1wbGF0ZS4gYGVuZ2luZWAgZGVmaW5lcyB0aGUgdGVtcGxhdGluZy9pbnRlcnBvbGF0aW9uIG1ldGhvZC9lbmdpbmVcbiAgICAgICAgLy8gdGhhdCBzaG91bGQgYmUgdXNlZC4gSWYgYGVuZ2luZWAgaXMgbm90IHBhc3NlZCwgdGhlIGBuZXh0X2VuZ2luZWAgaXNcbiAgICAgICAgLy8gdXNlZC4gSWYgYHJldGFpbmAgaXMgYHRydWVgLCB0aGUgZmluYWwgaW50ZXJwb2xhdGVkIGRhdGEgaXMgYXBwZW5kZWQgdG9cbiAgICAgICAgLy8gdGhlIGBwcmV2aW91c19jb250ZW50YCBpbnN0ZWFkIG9mIGp1c3QgcmVwbGFjaW5nIGl0LlxuICAgICAgICBpbnRlcnBvbGF0ZTogZnVuY3Rpb24oZGF0YSwgZW5naW5lLCByZXRhaW4pIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oY29udGVudCwgcHJldikge1xuICAgICAgICAgICAgICAgIGlmKCFkYXRhICYmIHByZXYpIHsgZGF0YSA9IHByZXY7IH1cbiAgICAgICAgICAgICAgICBpZih0aGlzLm5leHRfZW5naW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZSA9IHRoaXMubmV4dF9lbmdpbmU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dF9lbmdpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHJlbmRlcmVkID0gY29udGV4dC5ldmVudF9jb250ZXh0LmludGVycG9sYXRlKGNvbnRlbnQsIGRhdGEsIGVuZ2luZSwgdGhpcy5wYXJ0aWFscyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldGFpbiA/IHByZXYgKyByZW5kZXJlZCA6IHJlbmRlcmVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gU3dhcCB0aGUgcmV0dXJuIGNvbnRlbnRzIGVuc3VyaW5nIG9yZGVyLiBTZWUgYEFwcGxpY2F0aW9uI3N3YXBgXG4gICAgICAgIHN3YXA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50X2NvbnRleHQuc3dhcChjb250ZW50LCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICB9KS50cmlnZ2VyKCdjaGFuZ2VkJywge30pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFNhbWUgdXNhZ2UgYXMgYGpRdWVyeS5mbi5hcHBlbmRUbygpYCBidXQgdXNlcyBgdGhlbigpYCB0byBlbnN1cmUgb3JkZXJcbiAgICAgICAgYXBwZW5kVG86IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKS5hcHBlbmQoY29udGVudCk7XG4gICAgICAgICAgICB9KS50cmlnZ2VyKCdjaGFuZ2VkJywge30pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFNhbWUgdXNhZ2UgYXMgYGpRdWVyeS5mbi5wcmVwZW5kVG8oKWAgYnV0IHVzZXMgYHRoZW4oKWAgdG8gZW5zdXJlIG9yZGVyXG4gICAgICAgIHByZXBlbmRUbzogZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpLnByZXBlbmQoY29udGVudCk7XG4gICAgICAgICAgICB9KS50cmlnZ2VyKCdjaGFuZ2VkJywge30pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJlcGxhY2VzIHRoZSBgJChzZWxlY3RvcilgIHVzaW5nIGBodG1sKClgIHdpdGggdGhlIHByZXZpb3VzbHkgbG9hZGVkXG4gICAgICAgIC8vIGBjb250ZW50YFxuICAgICAgICByZXBsYWNlOiBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcikuaHRtbChjb250ZW50KTtcbiAgICAgICAgICAgIH0pLnRyaWdnZXIoJ2NoYW5nZWQnLCB7fSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQgaW4gdGhlIG9yZGVyIG9mIHRoZSBldmVudCBjb250ZXh0LiBTYW1lIHNlbWFudGljc1xuICAgICAgICAvLyBhcyBgU2FtbXkuRXZlbnRDb250ZXh0I3RyaWdnZXIoKWAuIElmIGRhdGEgaXMgb21pdHRlZCwgYGNvbnRlbnRgXG4gICAgICAgIC8vIGlzIHNlbnQgYXMgYHtjb250ZW50OiBjb250ZW50fWBcbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGRhdGEgPT0gJ3VuZGVmaW5lZCcpIHsgZGF0YSA9IHsgY29udGVudDogY29udGVudCB9OyB9XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudF9jb250ZXh0LnRyaWdnZXIobmFtZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyBgU2FtbXkuRXZlbnRDb250ZXh0YCBvYmplY3RzIGFyZSBjcmVhdGVkIGV2ZXJ5IHRpbWUgYSByb3V0ZSBpcyBydW4gb3IgYVxuICAgIC8vIGJvdW5kIGV2ZW50IGlzIHRyaWdnZXJlZC4gVGhlIGNhbGxiYWNrcyBmb3IgdGhlc2UgZXZlbnRzIGFyZSBldmFsdWF0ZWQgd2l0aGluIGEgYFNhbW15LkV2ZW50Q29udGV4dGBcbiAgICAvLyBUaGlzIHdpdGhpbiB0aGVzZSBjYWxsYmFja3MgdGhlIHNwZWNpYWwgbWV0aG9kcyBvZiBgRXZlbnRDb250ZXh0YCBhcmUgYXZhaWxhYmxlLlxuICAgIC8vXG4gICAgLy8gIyMjIEV4YW1wbGVcbiAgICAvL1xuICAgIC8vICAgICAgICQuc2FtbXkoZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICAvLyBUaGUgY29udGV4dCBoZXJlIGlzIHRoaXMgU2FtbXkuQXBwbGljYXRpb25cbiAgICAvLyAgICAgICAgIHRoaXMuZ2V0KCcjLzpuYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICAgIC8vIFRoZSBjb250ZXh0IGhlcmUgaXMgYSBuZXcgU2FtbXkuRXZlbnRDb250ZXh0XG4gICAgLy8gICAgICAgICAgIGlmICh0aGlzLnBhcmFtc1snbmFtZSddID09ICdzYW1teScpIHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnBhcnRpYWwoJ25hbWUuaHRtbC5lcmInLCB7bmFtZTogJ1NhbW15J30pO1xuICAgIC8vICAgICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgIHRoaXMucmVkaXJlY3QoJyMvc29tZXdoZXJlLWVsc2UnKVxuICAgIC8vICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgICB9KTtcbiAgICAvL1xuICAgIC8vIEluaXRpYWxpemUgYSBuZXcgRXZlbnRDb250ZXh0XG4gICAgLy9cbiAgICAvLyAjIyMgQXJndW1lbnRzXG4gICAgLy9cbiAgICAvLyAqIGBhcHBgIFRoZSBgU2FtbXkuQXBwbGljYXRpb25gIHRoaXMgZXZlbnQgaXMgY2FsbGVkIHdpdGhpbi5cbiAgICAvLyAqIGB2ZXJiYCBUaGUgdmVyYiBpbnZva2VkIHRvIHJ1biB0aGlzIGNvbnRleHQvcm91dGUuXG4gICAgLy8gKiBgcGF0aGAgVGhlIHN0cmluZyBwYXRoIGludm9rZWQgdG8gcnVuIHRoaXMgY29udGV4dC9yb3V0ZS5cbiAgICAvLyAqIGBwYXJhbXNgIEFuIE9iamVjdCBvZiBvcHRpb25hbCBwYXJhbXMgdG8gcGFzcyB0byB0aGUgY29udGV4dC4gSXMgY29udmVydGVkXG4gICAgLy8gICB0byBhIGBTYW1teS5PYmplY3RgLlxuICAgIC8vICogYHRhcmdldGAgYSBET00gZWxlbWVudCB0aGF0IHRoZSBldmVudCB0aGF0IGhvbGRzIHRoaXMgY29udGV4dCBvcmlnaW5hdGVzXG4gICAgLy8gICBmcm9tLiBGb3IgcG9zdCwgcHV0IGFuZCBkZWwgcm91dGVzLCB0aGlzIGlzIHRoZSBmb3JtIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWRcbiAgICAvLyAgIHRoZSByb3V0ZS5cbiAgICAvL1xuICAgIFNhbW15LkV2ZW50Q29udGV4dCA9IGZ1bmN0aW9uKGFwcCwgdmVyYiwgcGF0aCwgcGFyYW1zLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgICAgIHRoaXMudmVyYiA9IHZlcmI7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMucGFyYW1zID0gbmV3IFNhbW15Lk9iamVjdChwYXJhbXMpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB9O1xuXG4gICAgU2FtbXkuRXZlbnRDb250ZXh0LnByb3RvdHlwZSA9ICQuZXh0ZW5kKHt9LCBTYW1teS5PYmplY3QucHJvdG90eXBlLCB7XG5cbiAgICAgICAgLy8gQSBzaG9ydGN1dCB0byB0aGUgYXBwJ3MgYCRlbGVtZW50KClgXG4gICAgICAgICRlbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC4kZWxlbWVudChfbWFrZUFycmF5KGFyZ3VtZW50cykuc2hpZnQoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTG9vayB1cCBhIHRlbXBsYXRpbmcgZW5naW5lIHdpdGhpbiB0aGUgY3VycmVudCBhcHAgYW5kIGNvbnRleHQuXG4gICAgICAgIC8vIGBlbmdpbmVgIGNhbiBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gKiBhIGZ1bmN0aW9uOiBzaG91bGQgY29uZm9ybSB0byBgZnVuY3Rpb24oY29udGVudCwgZGF0YSkgeyByZXR1cm4gaW50ZXJwb2xhdGVkOyB9YFxuICAgICAgICAvLyAqIGEgdGVtcGxhdGUgcGF0aDogJ3RlbXBsYXRlLmVqcycsIGxvb2tzIHVwIHRoZSBleHRlbnNpb24gdG8gbWF0Y2ggdG9cbiAgICAgICAgLy8gICB0aGUgYGVqcygpYCBoZWxwZXJcbiAgICAgICAgLy8gKiBhIHN0cmluZyByZWZlcnJpbmcgdG8gdGhlIGhlbHBlcjogXCJtdXN0YWNoZVwiID0+IGBtdXN0YWNoZSgpYFxuICAgICAgICAvL1xuICAgICAgICAvLyBJZiBubyBlbmdpbmUgaXMgZm91bmQsIHVzZSB0aGUgYXBwJ3MgZGVmYXVsdCBgdGVtcGxhdGVfZW5naW5lYFxuICAgICAgICAvL1xuICAgICAgICBlbmdpbmVGb3I6IGZ1bmN0aW9uKGVuZ2luZSkge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBlbmdpbmVfbWF0Y2g7XG4gICAgICAgICAgICAvLyBpZiBwYXRoIGlzIGFjdHVhbGx5IGFuIGVuZ2luZSBmdW5jdGlvbiBqdXN0IHJldHVybiBpdFxuICAgICAgICAgICAgaWYoX2lzRnVuY3Rpb24oZW5naW5lKSkgeyByZXR1cm4gZW5naW5lOyB9XG4gICAgICAgICAgICAvLyBsb29rdXAgZW5naW5lIG5hbWUgYnkgcGF0aCBleHRlbnNpb25cbiAgICAgICAgICAgIGVuZ2luZSA9IChlbmdpbmUgfHwgY29udGV4dC5hcHAudGVtcGxhdGVfZW5naW5lKS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYoKGVuZ2luZV9tYXRjaCA9IGVuZ2luZS5tYXRjaCgvXFwuKFteXFwuXFw/XFwjXSspKFxcP3wkKS8pKSkge1xuICAgICAgICAgICAgICAgIGVuZ2luZSA9IGVuZ2luZV9tYXRjaFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCB0aGUgZW5naW5lIHRvIHRoZSBkZWZhdWx0IHRlbXBsYXRlIGVuZ2luZSBpZiBubyBtYXRjaCBpcyBmb3VuZFxuICAgICAgICAgICAgaWYoZW5naW5lICYmIF9pc0Z1bmN0aW9uKGNvbnRleHRbZW5naW5lXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dFtlbmdpbmVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjb250ZXh0LmFwcC50ZW1wbGF0ZV9lbmdpbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmVGb3IoY29udGV4dC5hcHAudGVtcGxhdGVfZW5naW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihjb250ZW50LCBkYXRhKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHVzaW5nIHRoZSB0ZW1wbGF0ZSBgZW5naW5lYCBmb3VuZCB3aXRoIGBlbmdpbmVGb3IoKWAsIGludGVycG9sYXRlIHRoZVxuICAgICAgICAvLyBgZGF0YWAgaW50byBgY29udGVudGBcbiAgICAgICAgaW50ZXJwb2xhdGU6IGZ1bmN0aW9uKGNvbnRlbnQsIGRhdGEsIGVuZ2luZSwgcGFydGlhbHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZ2luZUZvcihlbmdpbmUpLmFwcGx5KHRoaXMsIFtjb250ZW50LCBkYXRhLCBwYXJ0aWFsc10pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIENyZWF0ZSBhbmQgcmV0dXJuIGEgYFNhbW15LlJlbmRlckNvbnRleHRgIGNhbGxpbmcgYHJlbmRlcigpYCBvbiBpdC5cbiAgICAgICAgLy8gTG9hZHMgdGhlIHRlbXBsYXRlIGFuZCBpbnRlcnBvbGF0ZSB0aGUgZGF0YSwgaG93ZXZlciBkb2VzIG5vdCBhY3R1YWxcbiAgICAgICAgLy8gcGxhY2UgaXQgaW4gdGhlIERPTS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAvLyBteXRlbXBsYXRlLm11c3RhY2hlIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3tuYW1lfX08L2Rpdj5cbiAgICAgICAgLy8gICAgICByZW5kZXIoJ215dGVtcGxhdGUubXVzdGFjaGUnLCB7bmFtZTogJ3F1aXJrZXknfSk7XG4gICAgICAgIC8vICAgICAgLy8gc2V0cyB0aGUgYGNvbnRlbnRgIHRvIDxkaXYgY2xhc3M9XCJuYW1lXCI+cXVpcmtleTwvZGl2PlxuICAgICAgICAvLyAgICAgIHJlbmRlcignbXl0ZW1wbGF0ZS5tdXN0YWNoZScsIHtuYW1lOiAncXVpcmtleSd9KVxuICAgICAgICAvLyAgICAgICAgLmFwcGVuZFRvKCd1bCcpO1xuICAgICAgICAvLyAgICAgIC8vIGFwcGVuZHMgdGhlIHJlbmRlcmVkIGNvbnRlbnQgdG8gJCgndWwnKVxuICAgICAgICAvL1xuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKGxvY2F0aW9uLCBkYXRhLCBjYWxsYmFjaywgcGFydGlhbHMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2FtbXkuUmVuZGVyQ29udGV4dCh0aGlzKS5yZW5kZXIobG9jYXRpb24sIGRhdGEsIGNhbGxiYWNrLCBwYXJ0aWFscyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ3JlYXRlIGFuZCByZXR1cm4gYSBgU2FtbXkuUmVuZGVyQ29udGV4dGAgY2FsbGluZyBgcmVuZGVyRWFjaCgpYCBvbiBpdC5cbiAgICAgICAgLy8gTG9hZHMgdGhlIHRlbXBsYXRlIGFuZCBpbnRlcnBvbGF0ZXMgdGhlIGRhdGEgZm9yIGVhY2ggaXRlbSxcbiAgICAgICAgLy8gaG93ZXZlciBkb2VzIG5vdCBhY3R1YWxseSBwbGFjZSBpdCBpbiB0aGUgRE9NLlxuICAgICAgICAvL1xuICAgICAgICAvLyBgbmFtZWAgaXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyIChpZiBpdCBpcyBhbiBhcnJheSwgaXQgaXMgdXNlZCBhcyBgZGF0YWAsXG4gICAgICAgIC8vIGFuZCB0aGUgdGhpcmQgcGFyYW1ldGVyIHVzZWQgYXMgYGNhbGxiYWNrYCwgaWYgc2V0KS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSWYgYGRhdGFgIGlzIG5vdCBwcm92aWRlZCwgY29udGVudCBmcm9tIHRoZSBwcmV2aW91cyBzdGVwIGluIHRoZSBjaGFpblxuICAgICAgICAvLyAoaWYgaXQgaXMgYW4gYXJyYXkpIGlzIHVzZWQsIGFuZCBgbmFtZWAgaXMgdXNlZCBhcyB0aGUga2V5IGZvciBlYWNoXG4gICAgICAgIC8vIGVsZW1lbnQgb2YgdGhlIGFycmF5ICh1c2VmdWwgZm9yIHJlZmVyZW5jaW5nIGluIHRlbXBsYXRlKS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gIyMjIEV4YW1wbGVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAvLyBteXRlbXBsYXRlLm11c3RhY2hlIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3tuYW1lfX08L2Rpdj5cbiAgICAgICAgLy8gICAgICByZW5kZXJFYWNoKCdteXRlbXBsYXRlLm11c3RhY2hlJywgW3tuYW1lOiAncXVpcmtleSd9LCB7bmFtZTogJ2VuZG9yJ31dKVxuICAgICAgICAvLyAgICAgIC8vIHNldHMgdGhlIGBjb250ZW50YCB0byA8ZGl2IGNsYXNzPVwibmFtZVwiPnF1aXJrZXk8L2Rpdj48ZGl2IGNsYXNzPVwibmFtZVwiPmVuZG9yPC9kaXY+XG4gICAgICAgIC8vICAgICAgcmVuZGVyRWFjaCgnbXl0ZW1wbGF0ZS5tdXN0YWNoZScsIFt7bmFtZTogJ3F1aXJrZXknfSwge25hbWU6ICdlbmRvcid9XSkuYXBwZW5kVG8oJ3VsJyk7XG4gICAgICAgIC8vICAgICAgLy8gYXBwZW5kcyB0aGUgcmVuZGVyZWQgY29udGVudCB0byAkKCd1bCcpXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgLy8gbmFtZXMuanNvbjogW1wicXVpcmtleVwiLCBcImVuZG9yXCJdXG4gICAgICAgIC8vICAgICAgdGhpcy5sb2FkKCduYW1lcy5qc29uJykucmVuZGVyRWFjaCgnbXl0ZW1wbGF0ZS5tdXN0YWNoZScsICduYW1lJykuYXBwZW5kVG8oJ3VsJyk7XG4gICAgICAgIC8vICAgICAgLy8gdXNlcyB0aGUgdGVtcGxhdGUgdG8gcmVuZGVyIGVhY2ggaXRlbSBpbiB0aGUgSlNPTiBhcnJheVxuICAgICAgICAvL1xuICAgICAgICByZW5kZXJFYWNoOiBmdW5jdGlvbihsb2NhdGlvbiwgbmFtZSwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2FtbXkuUmVuZGVyQ29udGV4dCh0aGlzKS5yZW5kZXJFYWNoKGxvY2F0aW9uLCBuYW1lLCBkYXRhLCBjYWxsYmFjayk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGBTYW1teS5SZW5kZXJDb250ZXh0YCBjYWxsaW5nIGBsb2FkKClgIHdpdGggYGxvY2F0aW9uYCBhbmRcbiAgICAgICAgLy8gYG9wdGlvbnNgLiBDYWxsZWQgd2l0aG91dCBpbnRlcnBvbGF0aW9uIG9yIHBsYWNlbWVudCwgdGhpcyBhbGxvd3MgZm9yXG4gICAgICAgIC8vIHByZWxvYWRpbmcvY2FjaGluZyB0aGUgdGVtcGxhdGVzLlxuICAgICAgICBsb2FkOiBmdW5jdGlvbihsb2NhdGlvbiwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2FtbXkuUmVuZGVyQ29udGV4dCh0aGlzKS5sb2FkKGxvY2F0aW9uLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGBTYW1teS5SZW5kZXJDb250ZXh0YCBjYWxsaW5nIGBsb2FkUGFydGlhbHMoKWAgd2l0aCBgcGFydGlhbHNgLlxuICAgICAgICBsb2FkUGFydGlhbHM6IGZ1bmN0aW9uKHBhcnRpYWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNhbW15LlJlbmRlckNvbnRleHQodGhpcykubG9hZFBhcnRpYWxzKHBhcnRpYWxzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBgcmVuZGVyKClgIHRoZSBgbG9jYXRpb25gIHdpdGggYGRhdGFgIGFuZCB0aGVuIGBzd2FwKClgIHRoZVxuICAgICAgICAvLyBhcHAncyBgJGVsZW1lbnRgIHdpdGggdGhlIHJlbmRlcmVkIGNvbnRlbnQuXG4gICAgICAgIHBhcnRpYWw6IGZ1bmN0aW9uKGxvY2F0aW9uLCBkYXRhLCBjYWxsYmFjaywgcGFydGlhbHMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2FtbXkuUmVuZGVyQ29udGV4dCh0aGlzKS5wYXJ0aWFsKGxvY2F0aW9uLCBkYXRhLCBjYWxsYmFjaywgcGFydGlhbHMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBgU2FtbXkuUmVuZGVyQ29udGV4dGAgY2FsbGluZyBgc2VuZCgpYCB3aXRoIGFuIGFyYml0cmFyeVxuICAgICAgICAvLyBmdW5jdGlvblxuICAgICAgICBzZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByY3R4ID0gbmV3IFNhbW15LlJlbmRlckNvbnRleHQodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gcmN0eC5zZW5kLmFwcGx5KHJjdHgsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQ2hhbmdlcyB0aGUgbG9jYXRpb24gb2YgdGhlIGN1cnJlbnQgd2luZG93LiBJZiBgdG9gIGJlZ2lucyB3aXRoXG4gICAgICAgIC8vICcjJyBpdCBvbmx5IGNoYW5nZXMgdGhlIGRvY3VtZW50J3MgaGFzaC4gSWYgcGFzc2VkIG1vcmUgdGhhbiAxIGFyZ3VtZW50XG4gICAgICAgIC8vIHJlZGlyZWN0IHdpbGwgam9pbiB0aGVtIHRvZ2V0aGVyIHdpdGggZm9yd2FyZCBzbGFzaGVzLlxuICAgICAgICAvL1xuICAgICAgICAvLyAjIyMgRXhhbXBsZVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIHJlZGlyZWN0KCcjL290aGVyL3JvdXRlJyk7XG4gICAgICAgIC8vICAgICAgLy8gZXF1aXZhbGVudCB0b1xuICAgICAgICAvLyAgICAgIHJlZGlyZWN0KCcjJywgJ290aGVyJywgJ3JvdXRlJyk7XG4gICAgICAgIC8vXG4gICAgICAgIHJlZGlyZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0bywgYXJncyA9IF9tYWtlQXJyYXkoYXJndW1lbnRzKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50X2xvY2F0aW9uID0gdGhpcy5hcHAuZ2V0TG9jYXRpb24oKSxcbiAgICAgICAgICAgICAgICBsID0gYXJncy5sZW5ndGg7XG4gICAgICAgICAgICBpZihsID4gMSkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gMCwgcGF0aHMgPSBbXSwgcGFpcnMgPSBbXSwgcGFyYW1zID0ge30sIGhhc19wYXJhbXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBhcmdzW2ldID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRocy5wdXNoKGFyZ3NbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQocGFyYW1zLCBhcmdzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc19wYXJhbXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvID0gcGF0aHMuam9pbignLycpO1xuICAgICAgICAgICAgICAgIGlmKGhhc19wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBrIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFpcnMucHVzaCh0aGlzLmFwcC5fZW5jb2RlRm9ybVBhaXIoaywgcGFyYW1zW2tdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG8gKz0gJz8nICsgcGFpcnMuam9pbignJicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG8gPSBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdyZWRpcmVjdCcsIHsgdG86IHRvIH0pO1xuICAgICAgICAgICAgdGhpcy5hcHAubGFzdF9sb2NhdGlvbiA9IFt0aGlzLnZlcmIsIHRoaXMucGF0aF07XG4gICAgICAgICAgICB0aGlzLmFwcC5zZXRMb2NhdGlvbih0byk7XG4gICAgICAgICAgICBpZihuZXcgUmVnRXhwKHRvKS50ZXN0KGN1cnJlbnRfbG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAudHJpZ2dlcignbG9jYXRpb24tY2hhbmdlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRyaWdnZXJzIGV2ZW50cyBvbiBgYXBwYCB3aXRoaW4gdGhlIGN1cnJlbnQgY29udGV4dC5cbiAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYodHlwZW9mIGRhdGEgPT0gJ3VuZGVmaW5lZCcpIHsgZGF0YSA9IHt9OyB9XG4gICAgICAgICAgICBpZighZGF0YS5jb250ZXh0KSB7IGRhdGEuY29udGV4dCA9IHRoaXM7IH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEEgc2hvcnRjdXQgdG8gYXBwJ3MgYGV2ZW50TmFtZXNwYWNlKClgXG4gICAgICAgIGV2ZW50TmFtZXNwYWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5ldmVudE5hbWVzcGFjZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEEgc2hvcnRjdXQgdG8gYXBwJ3MgYHN3YXAoKWBcbiAgICAgICAgc3dhcDogZnVuY3Rpb24oY29udGVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAuc3dhcChjb250ZW50cywgY2FsbGJhY2spO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJhaXNlcyBhIHBvc3NpYmxlIGBub3RGb3VuZCgpYCBlcnJvciBmb3IgdGhlIGN1cnJlbnQgcGF0aC5cbiAgICAgICAgbm90Rm91bmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwLm5vdEZvdW5kKHRoaXMudmVyYiwgdGhpcy5wYXRoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBEZWZhdWx0IEpTT04gcGFyc2luZyB1c2VzIGpRdWVyeSdzIGBwYXJzZUpTT04oKWAuIEluY2x1ZGUgYFNhbW15LkpTT05gXG4gICAgICAgIC8vIHBsdWdpbiBmb3IgdGhlIG1vcmUgY29uZm9ybWFudCBcImNyb2NrZm9yZCBzcGVjaWFsXCIuXG4gICAgICAgIGpzb246IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuICQucGFyc2VKU09OKHN0cmluZyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gLy89PiBTYW1teS5FdmVudENvbnRleHQ6IGdldCAjLyB7fVxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJTYW1teS5FdmVudENvbnRleHQ6IFwiICsgW3RoaXMudmVyYiwgdGhpcy5wYXRoLCB0aGlzLnBhcmFtc10uam9pbignICcpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBTYW1teTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5qdy5VdGlscyA9ICgoKSA9PiB7XG4gICAgbGV0IF9tYWluID0gJCgnLm1haW4nKTtcblxuICAgIGxldCBqc1NyY0hhc2ggPSB7XG4gICAgICAgIC8vIHNyYzogaWRcbiAgICAgICAgJ2h0dHBzOi8vcGxhdGZvcm0udHdpdHRlci5jb20vd2lkZ2V0cy5qcyc6IGZhbHNlLFxuICAgICAgICAnL2pzL3BsdWdpbnMvanF1ZXJ5LmN5Y2xlLmxpdGUuanMnOiBmYWxzZSxcbiAgICAgICAgJy9qcy9wbHVnaW5zL2pxdWVyeS5saXN0Q2Fyb3VzZWwuanMnOiBmYWxzZSxcbiAgICAgICAgJy9qcy9wbHVnaW5zL2pxdWVyeS5zdGFyX2JnLmpzJzogZmFsc2UsXG4gICAgICAgICcvanMvc3RhcnMuanMnOiBmYWxzZSxcbiAgICAgICAgJy9qcy9iYWxsUGl0LmpzJzogZmFsc2UsXG4gICAgICAgICcvanMvYm91bmNpbmdPYmouanMnOiBmYWxzZVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXF1aXJlOiAoc3JjLCBjYWxsYmFjaykgPT4geyAvLyBjYWxsYmFjayhjYWNoZWQpXG4gICAgICAgICAgICBpZighanNTcmNIYXNoW3NyY10pIHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHNyYyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdzY3JpcHQnLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAganNTcmNIYXNoW3NyY10gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnZXRZZWFyOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlc2V0TW9kZWw6ICgpID0+IHtcbiAgICAgICAgICAgIF9tYWluLmVtcHR5KCk7XG5cbiAgICAgICAgICAgIGZvcihsZXQgbGlzdGVuZXIgb2YgancubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIub2ZmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqdy5saXN0ZW5lcnMgPSBbXTtcblxuXG4gICAgICAgICAgICBpZihqdy5Sb3V0aW5nLmxhc3RQZyA9PT0gXCJiYWxsUGl0XCIpIHtcbiAgICAgICAgICAgICAgICBqdy5CYWxsUGl0LmRlSW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihqdy5Sb3V0aW5nLmxhc3RQZyA9PT0gXCJzdGFyc1wiKSB7XG4gICAgICAgICAgICAgICAgancuU3RhcnJ5QmcuZGVJbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGp3LlJvdXRpbmcubGFzdFBnID09PSBcImJPYmpcIikge1xuICAgICAgICAgICAgICAgIGp3LkJvdW5jZS5kZUluaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgancuYm9keS5yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnJztcbiAgICAgICAgICAgICQoXCJtZXRhW25hbWU9ZGVzY3JpcHRpb25dLCBtZXRhW25hbWU9a2V5d29yZHNdLCBtZXRhW25hbWU9cm9ib3RzXVwiKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgLy8gaWYgcGFnZSBub3QgcGxheWdyb3VuZCBpbm5lclxuICAgICAgICAgICAgbGV0IGggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgICAgIGlmKHR5cGVvZihoKSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBoLmluZGV4T2YoXCIjcGxheWdyb3VuZFwiKSAhPT0gMCkgeyAgLy8gc3RhcnRzV2l0aFxuICAgICAgICAgICAgICAgIGxldCBwTmF2ID0gJChcIi5kUGxheWdyb3VuZE5hdlwiKTtcblxuICAgICAgICAgICAgICAgIGlmKHBOYXYuaXMoXCI6dmlzaWJsZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICBwTmF2LnNsaWRlVXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTsiLCIndXNlIHN0cmljdCc7XG5cbmp3LkFib3V0TW9kZWwgPSAoKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogdGhhdCA9PiB7XG4gICAgICAgICAgICBqdy5VdGlscy5yZXNldE1vZGVsKCk7XG5cbiAgICAgICAgICAgIHRoYXQubG9hZCgnL2Fib3V0Lmh0bWwnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlWWVhcicpLnRleHRDb250ZW50ID0gancuVXRpbHMuZ2V0WWVhcigpO1xuICAgICAgICAgICAgfSkuc3dhcCgpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdBYm91dCc7XG4gICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKCdhYm91dCcpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmp3LkNvbnRhY3RNb2RlbCA9ICgoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyOiB0aGF0ID0+IHtcbiAgICAgICAgICAgIGp3LlV0aWxzLnJlc2V0TW9kZWwoKTtcblxuICAgICAgICAgICAgdGhhdC5sb2FkKCcvY29udGFjdC5odG1sJykuc3dhcCgpO1xuXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9ICdDb250YWN0IE1lJztcbiAgICAgICAgICAgIGp3LmJvZHkuYWRkQ2xhc3MoJ2NvbnRhY3QnKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5qdy5HYW1lc01vZGVsID0gKCgpID0+IHtcblx0cmV0dXJuIHtcblx0XHRyZW5kZXI6ICh0aGF0LCBwYWdlKSA9PiB7XG5cdFx0XHRqdy5VdGlscy5yZXNldE1vZGVsKCk7XG5cblx0XHRcdGlmKHBhZ2UgPT09ICdpbmRleCcpIHtcblx0XHRcdFx0dGhhdC5sb2FkKCcvZ2FtZXMvaW5kZXguaHRtbCcsIGRhdGEgPT4ge1xuXHRcdFx0XHRcdGp3LlV0aWxzLnJlcXVpcmUoJy9qcy9wbHVnaW5zL2pxdWVyeS5saXN0Q2Fyb3VzZWwuanMnLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHQkKCd1bCcpLmxpc3RDYXJvdXNlbCgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KS5zd2FwKCgpID0+IHtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdGp3Lk1haW4uZml4Q29sUkhlaWdodCgkKCcjZGl2RGVmYXVsdCcpLmhlaWdodCgpKTtcblx0XHRcdFx0XHR9LCAxMCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGRvY3VtZW50LnRpdGxlID0gJ0dhbWVzJztcblx0XHRcdFx0ancuYm9keS5hZGRDbGFzcygnYWJzSG92ZXIgZ2FtZXMnKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5qdy5Ib21lTW9kZWwgPSAoKCkgPT4ge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyOiB0aGF0ID0+IHtcbiAgICAgICAgICAgIGp3LlV0aWxzLnJlc2V0TW9kZWwoKTtcblxuICAgICAgICAgICAgdGhhdC5sb2FkKCcvaG9tZS5odG1sJywgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgancuVXRpbHMucmVxdWlyZSgnaHR0cHM6Ly9wbGF0Zm9ybS50d2l0dGVyLmNvbS93aWRnZXRzLmpzJywgYWxyZWFkeUNyZWF0ZWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2lmKCFhbHJlYWR5Q3JlYXRlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d3R0ci53aWRnZXRzLmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5zd2FwKCk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ0pvbiBXaWVkbWFubic7XG4gICAgICAgICAgICBqdy5oZWFkLmFwcGVuZChgPG1ldGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD1cIkpvbiBXaWVkbWFubiYjNzAwO3MgcGVyc29uYWwgd2Vic2l0ZS4gIFRoaXMgc2l0ZSBpcyBzZXQgdXAgdG8gc2hvd2Nhc2Ugc29tZSBvZiBteSB0ZWNobmljYWwgYWJpbGl0eS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoaXMgc2l0ZSBoYXMgaW5mb3JtYXRpb24gcmVnYXJkaW5nIG15IHdvcmsgZXhwZXJpZW5jZSBhbmQgaG9iYmllcy5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJrZXl3b3Jkc1wiIGNvbnRlbnQ9XCJKb24gV2llZG1hbm4sIFdlYiBEZXZlbG9wZXIsIFBIUCwgSFRNTDUsIENTUywgalF1ZXJ5LCBKYXZhc2NyaXB0LCBzYW1teS5qc1wiPmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKCdob21lJyk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuancuUGxheWdyb3VuZE1vZGVsID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAodGhhdCwgcGFnZSkge1xuICAgICAgICAgICAgancuVXRpbHMucmVzZXRNb2RlbCgpO1xuXG4gICAgICAgICAgICBpZiAocGFnZSA9PT0gXCJpbmRleFwiKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkKFwiL3BsYXlncm91bmQvaW5kZXguaHRtbFwiLCBmdW5jdGlvbihkYXRhKSB7fSkuc3dhcCgpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIlBsYXlncm91bmRcIjtcbiAgICAgICAgICAgICAgICBqdy5oZWFkLmFwcGVuZChcIjxtZXRhIG5hbWU9J2Rlc2NyaXB0aW9uJyBjb250ZW50PSdBbiBwbGF5Z3JvdW5kIGFyZWEgZm9yIHdlYiB0ZWNoIGRlbW9zLicgLz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8bWV0YSBuYW1lPSdrZXl3b3JkcycgY29udGVudD0nY2FudmFzLCBodG1sNScgLz5cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgancuYm9keS5hZGRDbGFzcyhcInBsYXlncm91bmQgcGxheUlubmVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZSA9PT0gXCJiYWxsUGl0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWQoXCIvcGxheWdyb3VuZC9iYWxsUGl0Lmh0bWxcIiwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBqdy5VdGlscy5yZXF1aXJlKFwiL2pzL2JhbGxQaXQuanNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgancuQmFsbFBpdC5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pLnN3YXAoKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJCYWxsIFBpdCB8IFBsYXlncm91bmRcIjtcbiAgICAgICAgICAgICAgICBqdy5oZWFkLmFwcGVuZChcIjxtZXRhIG5hbWU9J2Rlc2NyaXB0aW9uJyBjb250ZW50PSdBIGNhbnZhcyBleGFtcGxlIHNob3djYXNpbmcgYSBiYWxsIHBpdC4nIC8+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPG1ldGEgbmFtZT0na2V5d29yZHMnIGNvbnRlbnQ9J2NhbnZhcywgaHRtbDUnIC8+XCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGp3LmJvZHkuYWRkQ2xhc3MoXCJwbGF5Z3JvdW5kIHBsYXlJbm5lciBuYXYzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGFnZSA9PT0gXCJzdGFyc1wiKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkKFwiL3BsYXlncm91bmQvc3RhcnMuaHRtbFwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBsb2FkIHRoZXNlIGFzeW5jXG4gICAgICAgICAgICAgICAgICAgIGp3LlV0aWxzLnJlcXVpcmUoXCIvanMvcGx1Z2lucy9qcXVlcnkuc3Rhcl9iZy5qc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdy5VdGlscy5yZXF1aXJlKFwiL2pzL3N0YXJzLmpzXCIsIGZ1bmN0aW9uIChjYWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdy5TdGFycnlCZy5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkuc3dhcCgpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIlN0YXJyeSBCYWNrZ3JvdW5kIHwgUGxheWdyb3VuZFwiO1xuICAgICAgICAgICAgICAgIGp3LmhlYWQuYXBwZW5kKFwiPG1ldGEgbmFtZT0nZGVzY3JpcHRpb24nIGNvbnRlbnQ9J0EgY2FudmFzIGV4YW1wbGUgc2hvd2Nhc2luZyBhIHN0YXJyeSBiYWNrZ3JvdW5kLicgLz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8bWV0YSBuYW1lPSdrZXl3b3JkcycgY29udGVudD0nY2FudmFzLCBodG1sNScgLz5cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgancuYm9keS5hZGRDbGFzcyhcInBsYXlncm91bmQgcGxheUlubmVyIG5hdjJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlID09PSBcImJPYmpcIikge1xuICAgICAgICAgICAgICAgIHRoYXQubG9hZChcIi9wbGF5Z3JvdW5kL2JvdW5jaW5nLW9iamVjdC5odG1sXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGp3LlV0aWxzLnJlcXVpcmUoXCIvanMvYm91bmNpbmdPYmouanNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgancuQm91bmNlLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkuc3dhcCgpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIkJvdW5jaW5nIE9iamVjdCB8IFBsYXlncm91bmRcIjtcbiAgICAgICAgICAgICAgICBqdy5oZWFkLmFwcGVuZChcIjxtZXRhIG5hbWU9J2Rlc2NyaXB0aW9uJyBjb250ZW50PSdBIGNhbnZhcyBleGFtcGxlIHNob3djYXNpbmcgYSBib3VuY2luZyBvYmplY3QuJyAvPlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxtZXRhIG5hbWU9J2tleXdvcmRzJyBjb250ZW50PSdjYW52YXMsIGh0bWw1JyAvPlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKFwicGxheWdyb3VuZCBwbGF5SW5uZXIgbmF2NVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBhZ2UgPT09IFwiYkN1YmVcIikge1xuICAgICAgICAgICAgICAgIHRoYXQubG9hZChcIi9wbGF5Z3JvdW5kL2JyZWFrZGFuY2luZy1jdWJlLmh0bWxcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNjdWJlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkuc3dhcCgpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIkJyZWFrZGFuY2luZyBDdWJlIHwgUGxheWdyb3VuZFwiO1xuICAgICAgICAgICAgICAgIGp3LmhlYWQuYXBwZW5kKFwiPG1ldGEgbmFtZT0nZGVzY3JpcHRpb24nIGNvbnRlbnQ9J1B1cmUgQ1NTMyBhbmltYXRpb24gZGVtby4nIC8+XCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPG1ldGEgbmFtZT0na2V5d29yZHMnIGNvbnRlbnQ9J0NTUzMsIEhUTUw1JyAvPlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBqdy5ib2R5LmFkZENsYXNzKFwicGxheWdyb3VuZCBwbGF5SW5uZXIgYkRhbmNpbmdDdWJlIG5hdjFcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwTmF2ID0gJChcIi5kUGxheWdyb3VuZE5hdlwiKTtcbiAgICAgICAgICAgIGlmKCFwTmF2LmlzKFwiOnZpc2libGVcIikpIHtcbiAgICAgICAgICAgICAgICBwTmF2LnNsaWRlRG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmp3LlBvcnRmb2xpb01vZGVsID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdHJlbmRlcjogZnVuY3Rpb24gKHRoYXQsIHBhZ2UpIHtcblx0XHRcdGp3LlV0aWxzLnJlc2V0TW9kZWwoKTtcblxuXHRcdFx0aWYgKHBhZ2UgPT09ICdpbmRleCcpIHtcblx0XHRcdFx0dGhhdC5sb2FkKCcvcG9ydGZvbGlvL2luZGV4Lmh0bWwnLCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdGp3LlV0aWxzLnJlcXVpcmUoJy9qcy9wbHVnaW5zL2pxdWVyeS5saXN0Q2Fyb3VzZWwuanMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQkKCd1bCcpLmxpc3RDYXJvdXNlbCgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KS5zd2FwKCk7XG5cblx0XHRcdFx0ZG9jdW1lbnQudGl0bGUgPSAnUG9ydGZvbGlvJztcblx0XHRcdFx0ancuYm9keS5hZGRDbGFzcygncG9ydGZvbGlvIGFic0hvdmVyJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufSkoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuancuUm91dGluZyA9ICgoKSA9PiB7XG5cdGxldCBhcHAgPSAkLnNhbW15KCcubWFpbicsIGZ1bmN0aW9uKCkge1xuXHRcdC8vIEhvbWVcblx0XHR0aGlzLnJvdXRlKCdnZXQnLCcvJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5Ib21lTW9kZWwucmVuZGVyKHRoaXMpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAnaG9tZSc7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI2hvbWUnLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3LkhvbWVNb2RlbC5yZW5kZXIodGhpcyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdob21lJztcblx0XHR9KTtcblxuXHRcdC8vIEFib3V0XG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNhYm91dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ancuQWJvdXRNb2RlbC5yZW5kZXIodGhpcyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdhYm91dCc7XG5cdFx0fSk7XG5cblx0XHQvLyBDb250YWN0XG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNjb250YWN0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0ancuQ29udGFjdE1vZGVsLnJlbmRlcih0aGlzKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ2NvbnRhY3QnO1xuXHRcdH0pO1xuXG5cdFx0Ly8vLyBCbG9nXG5cdFx0Ly90aGlzLnJvdXRlKCdnZXQnLCAnI2Jsb2cnLCBmdW5jdGlvbigpIHtcblx0XHQvLyAgICBqdy5CbG9nTW9kZWwucmVuZGVyKHRoaXMpO1xuXHRcdC8vICAgIGp3LlJvdXRpbmcubGFzdFBnID0gJ2Jsb2cnO1xuXHRcdC8vfSk7XG5cblx0XHQvLyBHYW1lc1xuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjZ2FtZXMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRqdy5HYW1lc01vZGVsLnJlbmRlcih0aGlzLCAnaW5kZXgnKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ2dhbWVzL2luZGV4Jztcblx0XHR9KTtcblxuXHRcdC8vIFBsYXlncm91bmRcblx0XHR0aGlzLnJvdXRlKCdnZXQnLCAnI3BsYXlncm91bmQnLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3LlBsYXlncm91bmRNb2RlbC5yZW5kZXIodGhpcywgJ2luZGV4Jyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdwbGF5Z3JvdW5kL2luZGV4Jztcblx0XHR9KTtcblxuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjcGxheWdyb3VuZC9iYWxsUGl0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5QbGF5Z3JvdW5kTW9kZWwucmVuZGVyKHRoaXMsICdiYWxsUGl0Jyk7XG5cdFx0XHRqdy5Sb3V0aW5nLmxhc3RQZyA9ICdiYWxsUGl0Jztcblx0XHR9KTtcblxuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjcGxheWdyb3VuZC9icmVha2RhbmNpbmctY3ViZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ancuUGxheWdyb3VuZE1vZGVsLnJlbmRlcih0aGlzLCAnYkN1YmUnKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ2JDdWJlJztcblx0XHR9KTtcblxuXHRcdHRoaXMucm91dGUoJ2dldCcsICcjcGxheWdyb3VuZC9ib3VuY2luZy1vYmplY3QnLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3LlBsYXlncm91bmRNb2RlbC5yZW5kZXIodGhpcywgJ2JPYmonKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ2JPYmonO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNwbGF5Z3JvdW5kL3N0YXJyeS1iYWNrZ3JvdW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRqdy5QbGF5Z3JvdW5kTW9kZWwucmVuZGVyKHRoaXMsICdzdGFycycpO1xuXHRcdFx0ancuUm91dGluZy5sYXN0UGcgPSAnc3RhcnMnO1xuXHRcdH0pO1xuXG5cdFx0Ly8gUG9ydGZvbGlvXG5cdFx0dGhpcy5yb3V0ZSgnZ2V0JywgJyNwb3J0Zm9saW8nLCBmdW5jdGlvbigpIHtcblx0XHRcdGp3LlBvcnRmb2xpb01vZGVsLnJlbmRlcih0aGlzLCAnaW5kZXgnKTtcblx0XHRcdGp3LlJvdXRpbmcubGFzdFBnID0gJ3BvcnRmb2xpby9pbmRleCc7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdHJldHVybiB7XG5cdFx0bGFzdFBnOiBudWxsLFxuXG5cblx0XHRpbml0OiAoKSA9PiB7XG5cdFx0XHRhcHAucnVuKCk7XG5cdFx0fVxuXHR9O1xufSkoKTsiLCIndXNlIHN0cmljdCc7XG4vKlxuICogTWFpblxuICovXG5qdy5NYWluID0gKCgpID0+IHtcblx0cmV0dXJuIHtcblx0XHRpbml0OiAoKSA9PiB7XG5cdFx0XHRqdy5oZWFkID0gJCgnaGVhZCcpO1xuXHRcdFx0ancuYm9keSA9ICQoJ2JvZHknKTtcblx0XHRcdGp3Lmxpc3RlbmVycyA9IFtdO1xuXG5cdFx0XHRqdy5Sb3V0aW5nLmluaXQoKTtcblxuXHRcdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUnLCAoKSA9PiB7XG5cdFx0XHRcdGxldCBoID0gJCgnLmNvbFIgPiBkaXY6dmlzaWJsZScpLmhlaWdodCgpO1xuXHRcdFx0XHRqdy5NYWluLmZpeENvbFJIZWlnaHQoaCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JCgnaGVhZGVyIGEnKS5vbignY2xpY2snLCAoKSA9PiAkKCcubWFpbicpLmhlaWdodCgnYXV0bycpKTtcblxuXHRcdFx0bGV0IGxpc3RlbmVyLCBoYXNDbGFzcyA9IGZhbHNlO1xuXHRcdFx0ZnVuY3Rpb24gaGlkZSgpIHtcblx0XHRcdFx0JCgnYXNpZGUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdGhhc0NsYXNzID0gZmFsc2U7XG5cdFx0XHRcdGxpc3RlbmVyLm9mZigpO1xuXHRcdFx0fVxuXG5cdFx0XHQkKCcubWVudScpLm9uKCdjbGljaycsIGUgPT4ge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0aWYoIWhhc0NsYXNzKSB7XG5cdFx0XHRcdFx0JCgnYXNpZGUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdFx0aGFzQ2xhc3MgPSB0cnVlO1xuXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRsaXN0ZW5lciA9ICQoJ2JvZHknKS5vbignY2xpY2snLCBoaWRlKTtcblx0XHRcdFx0XHR9LCAwKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRoaWRlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyAxNTg6IHBhZGRpbmcgKyBmb290ZXIgaGVpZ2h0XG5cdFx0Zml4Q29sUkhlaWdodDogaCA9PiB7XG5cdFx0XHRpZih3aW5kb3cuaW5uZXJXaWR0aCA8PSA4MDApe1xuXHRcdFx0XHQkKCcubWFpbicpLmhlaWdodCgnYXV0bycpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZih3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMjY1KSB7XG5cdFx0XHRcdCQoJy5tYWluJykuaGVpZ2h0KCQoJy5jb2xMJykuaGVpZ2h0KCkgKyBoICsgMTU4KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZigkKCcuY29sTCcpLmhlaWdodCgpID4gaCkge1xuXHRcdFx0XHRcdCQoJy5tYWluJykuaGVpZ2h0KCQoJy5jb2xMJykuaGVpZ2h0KCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdCQoJy5tYWluJykuaGVpZ2h0KGggKyAxNTgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufSkoKTtcblxuJCgoKSA9PiBqdy5NYWluLmluaXQoKSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
