// name: sammy
// version: 0.7.5

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

    var Sammy,
        PATH_REPLACER = "([^\/]+)",
        PATH_NAME_MATCHER = /:([\w\d]+)/g,
        QUERY_STRING_MATCHER = /\?([^#]*)?$/,
        // mainly for making `arguments` an Array
        _makeArray = function (nonarray) { return Array.prototype.slice.call(nonarray); },
        // borrowed from jQuery
        _isFunction = function (obj) { return Object.prototype.toString.call(obj) === "[object Function]"; },
        _isArray = function (obj) { return Object.prototype.toString.call(obj) === "[object Array]"; },
        _isRegExp = function (obj) { return Object.prototype.toString.call(obj) === "[object RegExp]"; },
        _decode = function (str) { return decodeURIComponent((str || '').replace(/\+/g, ' ')); },
        _encode = encodeURIComponent,
        _escapeHTML = function (s) {
            return String(s).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        },
        _routeWrapper = function (verb) {
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
    Sammy = function () {
        var args = _makeArray(arguments),
            app, selector;
        Sammy.apps = Sammy.apps || {};
        if (args.length === 0 || args[0] && _isFunction(args[0])) { // Sammy()
            return Sammy.apply(Sammy, ['body'].concat(args));
        } else if (typeof (selector = args.shift()) == 'string') { // Sammy('#main')
            app = Sammy.apps[selector] || new Sammy.Application();
            app.element_selector = selector;
            if (args.length > 0) {
                $.each(args, function (i, plugin) {
                    app.use(plugin);
                });
            }
            // if the selector changes make sure the reference in Sammy.apps changes
            if (app.element_selector != selector) {
                delete Sammy.apps[selector];
            }
            Sammy.apps[app.element_selector] = app;
            return app;
        }
    };

    Sammy.VERSION = '0.7.5';

    // Add to the global logger pool. Takes a function that accepts an
    // unknown number of arguments and should print them or send them somewhere
    // The first argument is always a timestamp.
    Sammy.addLogger = function (logger) {
        loggers.push(logger);
    };

    // Sends a log message to each logger listed in the global
    // loggers pool. Can take any number of arguments.
    // Also prefixes the arguments with a timestamp.
    Sammy.log = function () {
        var args = _makeArray(arguments);
        args.unshift("[" + Date() + "]");
        $.each(loggers, function (i, logger) {
            logger.apply(Sammy, args);
        });
    };

    if (typeof window.console != 'undefined') {
        if (typeof window.console.log === 'function' && _isFunction(window.console.log.apply)) {
            Sammy.addLogger(function () {
                window.console.log.apply(window.console, arguments);
            });
        } else {
            Sammy.addLogger(function () {
                window.console.log(arguments);
            });
        }
    } else if (typeof console != 'undefined') {
        Sammy.addLogger(function () {
            console.log.apply(console, arguments);
        });
    }

    $.extend(Sammy, {
        makeArray: _makeArray,
        isFunction: _isFunction,
        isArray: _isArray
    });

    // Sammy.Object is the base for all other Sammy classes. It provides some useful
    // functionality, including cloning, iterating, etc.
    Sammy.Object = function (obj) { // constructor
        return $.extend(this, obj || {});
    };

    $.extend(Sammy.Object.prototype, {

        // Escape HTML in string, use in templates to prevent script injection.
        // Also aliased as `h()`
        escapeHTML: _escapeHTML,
        h: _escapeHTML,

        // Returns a copy of the object with Functions removed.
        toHash: function () {
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
        toHTML: function () {
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
        keys: function (attributes_only) {
            var keys = [];
            for (var property in this) {
                if (!_isFunction(this[property]) || !attributes_only) {
                    keys.push(property);
                }
            }
            return keys;
        },

        // Checks if the object has a value at `key` and that the value is not empty
        has: function (key) {
            return this[key] && $.trim(this[key].toString()) !== '';
        },

        // convenience method to join as many arguments as you want
        // by the first argument - useful for making paths
        join: function () {
            var args = _makeArray(arguments);
            var delimiter = args.shift();
            return args.join(delimiter);
        },

        // Shortcut to Sammy.log
        log: function () {
            Sammy.log.apply(Sammy, arguments);
        },

        // Returns a string representation of this object.
        // if `include_functions` is true, it will also toString() the
        // methods of this object. By default only prints the attributes.
        toString: function (include_functions) {
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
    Sammy.targetIsThisWindow = function targetIsThisWindow(event, tagName) {
        var targetElement = $(event.target).closest(tagName);
        if (targetElement.length === 0) { return true; }

        var targetWindow = targetElement.attr('target');
        if (!targetWindow || targetWindow === window.name || targetWindow === '_self') { return true; }
        if (targetWindow === '_blank') { return false; }
        if (targetWindow === 'top' && window === window.top) { return true; }
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
    Sammy.DefaultLocationProxy = function (app, run_interval_every) {
        this.app = app;
        // set is native to false and start the poller immediately
        this.is_native = false;
        this.has_history = _has_history;
        this._startPolling(run_interval_every);
    };

    Sammy.DefaultLocationProxy.fullPath = function (location_obj) {
        // Bypass the `window.location.hash` attribute.  If a question mark
        // appears in the hash IE6 will strip it and all of the following
        // characters from `window.location.hash`.
        var matches = location_obj.toString().match(/^[^#]*(#.+)$/);
        var hash = matches ? matches[1] : '';
        return [location_obj.pathname, location_obj.search, hash].join('');
    };
    $.extend(Sammy.DefaultLocationProxy.prototype, {
        // bind the proxy events to the current app.
        bind: function () {
            var proxy = this, app = this.app, lp = Sammy.DefaultLocationProxy;
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

                    if (hostname == window.location.hostname &&
                        app.lookupRoute('get', full_path) &&
                        Sammy.targetIsThisWindow(e, 'a')) {
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
        unbind: function () {
            $(window).unbind('hashchange.' + this.app.eventNamespace());
            $(window).unbind('popstate.' + this.app.eventNamespace());
            $(document).undelegate('a', 'click.history-' + this.app.eventNamespace());
            Sammy.DefaultLocationProxy._bindings--;
            if (Sammy.DefaultLocationProxy._bindings <= 0) {
                window.clearInterval(Sammy.DefaultLocationProxy._interval);
                Sammy.DefaultLocationProxy._interval = null;
            }
        },

        // get the current location from the hash.
        getLocation: function () {
            return Sammy.DefaultLocationProxy.fullPath(window.location);
        },

        // set the current location to `new_location`
        setLocation: function (new_location) {
            if (/^([^#\/]|$)/.test(new_location)) { // non-prefixed url
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
                    return (window.location = new_location);
                }
            }
        },

        _startPolling: function (every) {
            // set up interval
            var proxy = this;
            if (!Sammy.DefaultLocationProxy._interval) {
                if (!every) { every = 10; }
                var hashCheck = function () {
                    var current_location = proxy.getLocation();
                    if (typeof Sammy.DefaultLocationProxy._last_location == 'undefined' ||
                      current_location != Sammy.DefaultLocationProxy._last_location) {
                        window.setTimeout(function () {
                            $(window).trigger('hashchange', [true]);
                        }, 0);
                    }
                    Sammy.DefaultLocationProxy._last_location = current_location;
                };
                hashCheck();
                Sammy.DefaultLocationProxy._interval = window.setInterval(hashCheck, every);
            }
        }
    });


    // Sammy.Application is the Base prototype for defining 'applications'.
    // An 'application' is a collection of 'routes' and bound events that is
    // attached to an element when `run()` is called.
    // The only argument an 'app_function' is evaluated within the context of the application.
    Sammy.Application = function (app_function) {
        var app = this;
        this.routes = {};
        this.listeners = new Sammy.Object({});
        this.arounds = [];
        this.befores = [];
        // generate a unique namespace
        this.namespace = (new Date()).getTime() + '-' + parseInt(Math.random() * 1000, 10);
        this.context_prototype = function () { Sammy.EventContext.apply(this, arguments); };
        this.context_prototype.prototype = new Sammy.EventContext();

        if (_isFunction(app_function)) {
            app_function.apply(this, [this]);
        }
        // set the location proxy if not defined to the default (DefaultLocationProxy)
        if (!this._location_proxy) {
            this.setLocationProxy(new Sammy.DefaultLocationProxy(this, this.run_interval_every));
        }
        if (this.debug) {
            this.bindToAllEvents(function (e, data) {
                app.log(app.toString(), e.cleaned_type, data || {});
            });
        }
    };

    Sammy.Application.prototype = $.extend({}, Sammy.Object.prototype, {

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
        toString: function () {
            return 'Sammy.Application:' + this.element_selector;
        },

        // returns a jQuery object of the Applications bound element.
        $element: function (selector) {
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
        use: function () {
            // flatten the arguments
            var args = _makeArray(arguments),
                plugin = args.shift(),
                plugin_name = plugin || '';
            try {
                args.unshift(this);
                if (typeof plugin == 'string') {
                    plugin_name = 'Sammy.' + plugin;
                    plugin = Sammy[plugin];
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
        setLocationProxy: function (new_proxy) {
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
        log: function () {
            Sammy.log.apply(Sammy, Array.prototype.concat.apply([this.element_selector], arguments));
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
        route: function (verb, path) {
            var app = this, param_names = [], add_route, path_match, callback = Array.prototype.slice.call(arguments, 2);

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
                if (typeof (cb) === 'string') {
                    callback[i] = app[cb];
                }
            });

            add_route = function (with_verb) {
                var r = { verb: with_verb, path: path, callback: callback, param_names: param_names };
                // add route to routes array
                app.routes[with_verb] = app.routes[with_verb] || [];
                // place routes in order of definition
                app.routes[with_verb].push(r);
            };

            if (verb === 'any') {
                $.each(this.ROUTE_VERBS, function (i, v) { add_route(v); });
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
        mapRoutes: function (route_array) {
            var app = this;
            $.each(route_array, function (i, route_args) {
                app.route.apply(app, route_args);
            });
            return this;
        },

        // A unique event namespace defined per application.
        // All events bound with `bind()` are automatically bound within this space.
        eventNamespace: function () {
            return ['sammy-app', this.namespace].join('-');
        },

        // Works just like `jQuery.fn.bind()` with a couple notable differences.
        //
        // * It binds all events to the application element
        // * All events are bound within the `eventNamespace()`
        // * Events are not actually bound until the application is started with `run()`
        // * callbacks are evaluated within the context of a Sammy.EventContext
        //
        bind: function (name, data, callback) {
            var app = this;
            // build the callback
            // if the arity is 2, callback is the second argument
            if (typeof callback == 'undefined') { callback = data; }
            var listener_callback = function () {
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
            if (!this.listeners[name]) { this.listeners[name] = []; }
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
        trigger: function (name, data) {
            this.$element().trigger([name, this.eventNamespace()].join('.'), [data]);
            return this;
        },

        // Reruns the current route
        refresh: function () {
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
        before: function (options, callback) {
            if (_isFunction(options)) {
                callback = options;
                options = {};
            }
            this.befores.push([options, callback]);
            return this;
        },

        // A shortcut for binding a callback to be run after a route is executed.
        // After callbacks have no guarunteed order.
        after: function (callback) {
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
        around: function (callback) {
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
        onComplete: function (callback) {
            this._onComplete = callback;
            return this;
        },

        // Returns `true` if the current application is running.
        isRunning: function () {
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
        helpers: function (extensions) {
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
        helper: function (name, method) {
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
        run: function (start_url) {
            if (this.isRunning()) { return false; }
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
            if (!(/\#(.+)/.test(this.getLocation())) && typeof start_url != 'undefined') {
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
                if (!Sammy.targetIsThisWindow(e, 'form')) { return true; }
                var returned = app._checkFormSubmission($(e.target).closest('form'));
                return (returned === false) ? e.preventDefault() : false;
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
        unload: function () {
            if (!this.isRunning()) { return false; }
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
        destroy: function () {
            this.unload();
            delete Sammy.apps[this.element_selector];
            return this;
        },

        // Will bind a single callback function to every event that is already
        // being listened to in the app. This includes all the `APP_EVENTS`
        // as well as any custom events defined with `bind()`.
        //
        // Used internally for debug logging.
        bindToAllEvents: function (callback) {
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
        routablePath: function (path) {
            return path.replace(QUERY_STRING_MATCHER, '');
        },

        // Given a verb and a String path, will return either a route object or false
        // if a matching route can be found within the current defined set.
        lookupRoute: function (verb, path) {
            var app = this, routed = false, i = 0, l, route;
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
        runRoute: function (verb, path, params, target) {
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
            if (typeof params == 'undefined') { params = {}; }

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
                            if (!params.splat) { params.splat = []; }
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
                wrapped_route = function () {
                    var returned, i, nextRoute;
                    while (befores.length > 0) {
                        before = befores.shift();
                        // check the options
                        if (app.contextMatchesOptions(context, before[0])) {
                            returned = before[1].apply(context, [context]);
                            if (returned === false) { return false; }
                        }
                    }
                    app.last_route = route;
                    context.trigger('event-context-before', { context: context });
                    // run multiple callbacks
                    if (typeof (route.callback) === "function") {
                        route.callback = [route.callback];
                    }
                    if (route.callback && route.callback.length) {
                        i = -1;
                        nextRoute = function () {
                            i++;
                            if (route.callback[i]) {
                                returned = route.callback[i].apply(context, callback_args);
                            } else if (app._onComplete && typeof (app._onComplete === "function")) {
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
                    wrapped_route = function () { return around.apply(context, [last_wrapped_route]); };
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
        contextMatchesOptions: function (context, match_options, positive) {
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
            var path_matched = true, verb_matched = true;
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
            return positive ? (verb_matched && path_matched) : !(verb_matched && path_matched);
        },


        // Delegates to the `location_proxy` to get the current location.
        // See `Sammy.DefaultLocationProxy` for more info on location proxies.
        getLocation: function () {
            return this._location_proxy.getLocation();
        },

        // Delegates to the `location_proxy` to set the current location.
        // See `Sammy.DefaultLocationProxy` for more info on location proxies.
        //
        // ### Arguments
        //
        // * `new_location` A new location string (e.g. '#/')
        //
        setLocation: function (new_location) {
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
        swap: function (content, callback) {
            var $el = this.$element().html(content);
            if (_isFunction(callback)) { callback(content); }
            return $el;
        },

        // a simple global cache for templates. Uses the same semantics as
        // `Sammy.Cache` and `Sammy.Storage` so can easily be replaced with
        // a persistent storage that lasts beyond the current request.
        templateCache: function (key, value) {
            if (typeof value != 'undefined') {
                return _template_cache[key] = value;
            } else {
                return _template_cache[key];
            }
        },

        // clear the templateCache
        clearTemplateCache: function () {
            return (_template_cache = {});
        },

        // This throws a '404 Not Found' error by invoking `error()`.
        // Override this method or `error()` to provide custom
        // 404 behavior (i.e redirecting to / or showing a warning)
        notFound: function (verb, path) {
            var ret = this.error(['404 Not Found', verb, path].join(' '));
            return (verb === 'get') ? ret : true;
        },

        // The base error handler takes a string `message` and an `Error`
        // object. If `raise_errors` is set to `true` on the app level,
        // this will re-throw the error to the browser. Otherwise it will send the error
        // to `log()`. Override this method to provide custom error handling
        // e.g logging to a server side component or displaying some feedback to the
        // user.
        error: function (message, original_error) {
            if (!original_error) { original_error = new Error(); }
            original_error.message = [message, original_error.message].join(' ');
            this.trigger('error', { message: original_error.message, error: original_error });
            if (this.raise_errors) {
                throw (original_error);
            } else {
                this.log(original_error.message, original_error);
            }
        },

        _checkLocation: function () {
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

        _getFormVerb: function (form) {
            var $form = $(form), verb, $_method;
            $_method = $form.find('input[name="_method"]');
            if ($_method.length > 0) { verb = $_method.val(); }
            if (!verb) { verb = $form[0].getAttribute('method'); }
            if (!verb || verb === '') { verb = 'get'; }
            return $.trim(verb.toString().toLowerCase());
        },

        _checkFormSubmission: function (form) {
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
                if (params !== '') { path += '?' + params; }
                this.setLocation(path);
                returned = false;
            } else {
                params = $.extend({}, this._parseFormParams($form));
                returned = this.runRoute(verb, path, params, form.get(0));
            }
            return (typeof returned == 'undefined') ? false : returned;
        },

        _serializeFormParams: function ($form) {
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

        _encodeFormPair: function (name, value) {
            return _encode(name) + "=" + _encode(value);
        },

        _parseFormParams: function ($form) {
            var params = {},
                form_fields = $form.serializeArray(),
                i;
            for (i = 0; i < form_fields.length; i++) {
                params = this._parseParamPair(params, form_fields[i].name, form_fields[i].value);
            }
            return params;
        },

        _parseQueryString: function (path) {
            var params = {}, parts, pairs, pair, i;

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

        _parseParamPair: function (params, key, value) {
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

        _listen: function (name, callback) {
            return this.$element().bind([name, this.eventNamespace()].join('.'), callback);
        },

        _unlisten: function (name, callback) {
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
    Sammy.RenderContext = function (event_context) {
        this.event_context = event_context;
        this.callbacks = [];
        this.previous_content = null;
        this.content = null;
        this.next_engine = false;
        this.waiting = false;
    };

    Sammy.RenderContext.prototype = $.extend({}, Sammy.Object.prototype, {

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
        then: function (callback) {
            if (!_isFunction(callback)) {
                // if a string is passed to then, assume we want to call
                // a helper on the event context in its context
                if (typeof callback === 'string' && callback in this.event_context) {
                    var helper = this.event_context[callback];
                    callback = function (content) {
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
        wait: function () {
            this.waiting = true;
        },

        // Resume the queue, setting `content` to be used in the next operation.
        // See `wait()` for an example.
        next: function (content) {
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
        load: function (location, options, callback) {
            var context = this;
            return this.then(function () {
                var should_cache, cached, is_json, location_array;
                if (_isFunction(options)) {
                    callback = options;
                    options = {};
                } else {
                    options = $.extend({}, options);
                }
                if (callback) { this.then(callback); }
                if (typeof location === 'string') {
                    // it's a path
                    is_json = (location.match(/\.json(\?|$)/) || options.json);
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
                        success: function (data) {
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
        loadPartials: function (partials) {
            var name;
            if (partials) {
                this.partials = this.partials || {};
                for (name in partials) {
                    (function (context, name) {
                        context.load(partials[name])
                               .then(function (template) {
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
        render: function (location, data, callback, partials) {
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

                return this.loadPartials(partials)
                           .load(location)
                           .interpolate(data, location)
                           .then(callback);
            }
        },

        // `render()` the `location` with `data` and then `swap()` the
        // app's `$element` with the rendered content.
        partial: function (location, data, callback, partials) {
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
        send: function () {
            var context = this,
                args = _makeArray(arguments),
                fun = args.shift();

            if (_isArray(args[0])) { args = args[0]; }

            return this.then(function (content) {
                args.push(function (response) { context.next(response); });
                context.wait();
                fun.apply(fun, args);
                return false;
            });
        },

        // iterates over an array, applying the callback for each item item. the
        // callback takes the same style of arguments as `jQuery.each()` (index, item).
        // The return value of each callback is collected as a single string and stored
        // as `content` to be used in the next iteration of the `RenderContext`.
        collect: function (array, callback, now) {
            var context = this;
            var coll = function () {
                if (_isFunction(array)) {
                    callback = array;
                    array = this.content;
                }
                var contents = [], doms = false;
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
        renderEach: function (location, name, data, callback) {
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
                        var idata = {}, engine = this.next_engine || location;
                        if (name) {
                            idata[name] = value;
                        } else {
                            idata = value;
                        }
                        callback(value, rctx.event_context.interpolate(content, idata, engine));
                    });
                } else {
                    return this.collect(data, function (i, value) {
                        var idata = {}, engine = this.next_engine || location;
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
        interpolate: function (data, engine, retain) {
            var context = this;
            return this.then(function (content, prev) {
                if (!data && prev) { data = prev; }
                if (this.next_engine) {
                    engine = this.next_engine;
                    this.next_engine = false;
                }
                var rendered = context.event_context.interpolate(content, data, engine, this.partials);
                return retain ? prev + rendered : rendered;
            });
        },

        // Swap the return contents ensuring order. See `Application#swap`
        swap: function (callback) {
            return this.then(function (content) {
                this.event_context.swap(content, callback);
                return content;
            }).trigger('changed', {});
        },

        // Same usage as `jQuery.fn.appendTo()` but uses `then()` to ensure order
        appendTo: function (selector) {
            return this.then(function (content) {
                $(selector).append(content);
            }).trigger('changed', {});
        },

        // Same usage as `jQuery.fn.prependTo()` but uses `then()` to ensure order
        prependTo: function (selector) {
            return this.then(function (content) {
                $(selector).prepend(content);
            }).trigger('changed', {});
        },

        // Replaces the `$(selector)` using `html()` with the previously loaded
        // `content`
        replace: function (selector) {
            return this.then(function (content) {
                $(selector).html(content);
            }).trigger('changed', {});
        },

        // trigger the event in the order of the event context. Same semantics
        // as `Sammy.EventContext#trigger()`. If data is omitted, `content`
        // is sent as `{content: content}`
        trigger: function (name, data) {
            return this.then(function (content) {
                if (typeof data == 'undefined') { data = { content: content }; }
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
    Sammy.EventContext = function (app, verb, path, params, target) {
        this.app = app;
        this.verb = verb;
        this.path = path;
        this.params = new Sammy.Object(params);
        this.target = target;
    };

    Sammy.EventContext.prototype = $.extend({}, Sammy.Object.prototype, {

        // A shortcut to the app's `$element()`
        $element: function () {
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
        engineFor: function (engine) {
            var context = this, engine_match;
            // if path is actually an engine function just return it
            if (_isFunction(engine)) { return engine; }
            // lookup engine name by path extension
            engine = (engine || context.app.template_engine).toString();
            if ((engine_match = engine.match(/\.([^\.\?\#]+)(\?|$)/))) {
                engine = engine_match[1];
            }
            // set the engine to the default template engine if no match is found
            if (engine && _isFunction(context[engine])) {
                return context[engine];
            }

            if (context.app.template_engine) {
                return this.engineFor(context.app.template_engine);
            }
            return function (content, data) { return content; };
        },

        // using the template `engine` found with `engineFor()`, interpolate the
        // `data` into `content`
        interpolate: function (content, data, engine, partials) {
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
        render: function (location, data, callback, partials) {
            return new Sammy.RenderContext(this).render(location, data, callback, partials);
        },

        // Create and return a `Sammy.RenderContext` calling `renderEach()` on it.
        // Loads the template and interpolates the data for each item,
        // however does not actual place it in the DOM.
        //
        // ### Example
        //
        //      // mytemplate.mustache <div class="name">{{name}}</div>
        //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}])
        //      // sets the `content` to <div class="name">quirkey</div><div class="name">endor</div>
        //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}]).appendTo('ul');
        //      // appends the rendered content to $('ul')
        //
        renderEach: function (location, name, data, callback) {
            return new Sammy.RenderContext(this).renderEach(location, name, data, callback);
        },

        // create a new `Sammy.RenderContext` calling `load()` with `location` and
        // `options`. Called without interpolation or placement, this allows for
        // preloading/caching the templates.
        load: function (location, options, callback) {
            return new Sammy.RenderContext(this).load(location, options, callback);
        },

        // create a new `Sammy.RenderContext` calling `loadPartials()` with `partials`.
        loadPartials: function (partials) {
            return new Sammy.RenderContext(this).loadPartials(partials);
        },

        // `render()` the `location` with `data` and then `swap()` the
        // app's `$element` with the rendered content.
        partial: function (location, data, callback, partials) {
            return new Sammy.RenderContext(this).partial(location, data, callback, partials);
        },

        // create a new `Sammy.RenderContext` calling `send()` with an arbitrary
        // function
        send: function () {
            var rctx = new Sammy.RenderContext(this);
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
        redirect: function () {
            var to, args = _makeArray(arguments),
                current_location = this.app.getLocation(),
                l = args.length;
            if (l > 1) {
                var i = 0, paths = [], pairs = [], params = {}, has_params = false;
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
        trigger: function (name, data) {
            if (typeof data == 'undefined') { data = {}; }
            if (!data.context) { data.context = this; }
            return this.app.trigger(name, data);
        },

        // A shortcut to app's `eventNamespace()`
        eventNamespace: function () {
            return this.app.eventNamespace();
        },

        // A shortcut to app's `swap()`
        swap: function (contents, callback) {
            return this.app.swap(contents, callback);
        },

        // Raises a possible `notFound()` error for the current path.
        notFound: function () {
            return this.app.notFound(this.verb, this.path);
        },

        // Default JSON parsing uses jQuery's `parseJSON()`. Include `Sammy.JSON`
        // plugin for the more conformant "crockford special".
        json: function (string) {
            return $.parseJSON(string);
        },

        // //=> Sammy.EventContext: get #/ {}
        toString: function () {
            return "Sammy.EventContext: " + [this.verb, this.path, this.params].join(' ');
        }

    });

    return Sammy;
});

/*! Stellar.js v0.6.2 | Copyright 2013, Mark Dalgleish | http://markdalgleish.com/projects/stellar.js | http://markdalgleish.mit-license.org */
(function(e,t,n,r){function d(t,n){this.element=t,this.options=e.extend({},s,n),this._defaults=s,this._name=i,this.init()}var i="stellar",s={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(e){e.hide()},showElement:function(e){e.show()}},o={scroll:{getLeft:function(e){return e.scrollLeft()},setLeft:function(e,t){e.scrollLeft(t)},getTop:function(e){return e.scrollTop()},setTop:function(e,t){e.scrollTop(t)}},position:{getLeft:function(e){return parseInt(e.css("left"),10)*-1},getTop:function(e){return parseInt(e.css("top"),10)*-1}},margin:{getLeft:function(e){return parseInt(e.css("margin-left"),10)*-1},getTop:function(e){return parseInt(e.css("margin-top"),10)*-1}},transform:{getLeft:function(e){var t=getComputedStyle(e[0])[f];return t!=="none"?parseInt(t.match(/(-?[0-9]+)/g)[4],10)*-1:0},getTop:function(e){var t=getComputedStyle(e[0])[f];return t!=="none"?parseInt(t.match(/(-?[0-9]+)/g)[5],10)*-1:0}}},u={position:{setLeft:function(e,t){e.css("left",t)},setTop:function(e,t){e.css("top",t)}},transform:{setPosition:function(e,t,n,r,i){e[0].style[f]="translate3d("+(t-n)+"px, "+(r-i)+"px, 0)"}}},a=function(){var t=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,n=e("script")[0].style,r="",i;for(i in n)if(t.test(i)){r=i.match(t)[0];break}return"WebkitOpacity"in n&&(r="Webkit"),"KhtmlOpacity"in n&&(r="Khtml"),function(e){return r+(r.length>0?e.charAt(0).toUpperCase()+e.slice(1):e)}}(),f=a("transform"),l=e("<div />",{style:"background:#fff"}).css("background-position-x")!==r,c=l?function(e,t,n){e.css({"background-position-x":t,"background-position-y":n})}:function(e,t,n){e.css("background-position",t+" "+n)},h=l?function(e){return[e.css("background-position-x"),e.css("background-position-y")]}:function(e){return e.css("background-position").split(" ")},p=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)};d.prototype={init:function(){this.options.name=i+"_"+Math.floor(Math.random()*1e9),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),this.options.scrollProperty==="scroll"?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===n.body&&(this.element=t),this.$scrollElement=e(this.element),this.$element=this.element===t?e("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==r?e(this.options.viewportElement):this.$scrollElement[0]===t||this.options.scrollProperty==="scroll"?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var e=this,t=o[e.options.scrollProperty];this._getScrollLeft=function(){return t.getLeft(e.$scrollElement)},this._getScrollTop=function(){return t.getTop(e.$scrollElement)}},_defineSetters:function(){var t=this,n=o[t.options.scrollProperty],r=u[t.options.positionProperty],i=n.setLeft,s=n.setTop;this._setScrollLeft=typeof i=="function"?function(e){i(t.$scrollElement,e)}:e.noop,this._setScrollTop=typeof s=="function"?function(e){s(t.$scrollElement,e)}:e.noop,this._setPosition=r.setPosition||function(e,n,i,s,o){t.options.horizontalScrolling&&r.setLeft(e,n,i),t.options.verticalScrolling&&r.setTop(e,s,o)}},_handleWindowLoadAndResize:function(){var n=this,r=e(t);n.options.responsive&&r.bind("load."+this.name,function(){n.refresh()}),r.bind("resize."+this.name,function(){n._detectViewport(),n.options.responsive&&n.refresh()})},refresh:function(n){var r=this,i=r._getScrollLeft(),s=r._getScrollTop();(!n||!n.firstLoad)&&this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findParticles(),this._findBackgrounds(),n&&n.firstLoad&&/WebKit/.test(navigator.userAgent)&&e(t).load(function(){var e=r._getScrollLeft(),t=r._getScrollTop();r._setScrollLeft(e+1),r._setScrollTop(t+1),r._setScrollLeft(e),r._setScrollTop(t)}),this._setScrollLeft(i),this._setScrollTop(s)},_detectViewport:function(){var e=this.$viewportElement.offset(),t=e!==null&&e!==r;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=t?e.top:0,this.viewportOffsetLeft=t?e.left:0},_findParticles:function(){var t=this,n=this._getScrollLeft(),i=this._getScrollTop();if(this.particles!==r)for(var s=this.particles.length-1;s>=0;s--)this.particles[s].$element.data("stellar-elementIsActive",r);this.particles=[];if(!this.options.parallaxElements)return;this.$element.find("[data-stellar-ratio]").each(function(n){var i=e(this),s,o,u,a,f,l,c,h,p,d=0,v=0,m=0,g=0;if(!i.data("stellar-elementIsActive"))i.data("stellar-elementIsActive",this);else if(i.data("stellar-elementIsActive")!==this)return;t.options.showElement(i),i.data("stellar-startingLeft")?(i.css("left",i.data("stellar-startingLeft")),i.css("top",i.data("stellar-startingTop"))):(i.data("stellar-startingLeft",i.css("left")),i.data("stellar-startingTop",i.css("top"))),u=i.position().left,a=i.position().top,f=i.css("margin-left")==="auto"?0:parseInt(i.css("margin-left"),10),l=i.css("margin-top")==="auto"?0:parseInt(i.css("margin-top"),10),h=i.offset().left-f,p=i.offset().top-l,i.parents().each(function(){var t=e(this);if(t.data("stellar-offset-parent")===!0)return d=m,v=g,c=t,!1;m+=t.position().left,g+=t.position().top}),s=i.data("stellar-horizontal-offset")!==r?i.data("stellar-horizontal-offset"):c!==r&&c.data("stellar-horizontal-offset")!==r?c.data("stellar-horizontal-offset"):t.horizontalOffset,o=i.data("stellar-vertical-offset")!==r?i.data("stellar-vertical-offset"):c!==r&&c.data("stellar-vertical-offset")!==r?c.data("stellar-vertical-offset"):t.verticalOffset,t.particles.push({$element:i,$offsetParent:c,isFixed:i.css("position")==="fixed",horizontalOffset:s,verticalOffset:o,startingPositionLeft:u,startingPositionTop:a,startingOffsetLeft:h,startingOffsetTop:p,parentOffsetLeft:d,parentOffsetTop:v,stellarRatio:i.data("stellar-ratio")!==r?i.data("stellar-ratio"):1,width:i.outerWidth(!0),height:i.outerHeight(!0),isHidden:!1})})},_findBackgrounds:function(){var t=this,n=this._getScrollLeft(),i=this._getScrollTop(),s;this.backgrounds=[];if(!this.options.parallaxBackgrounds)return;s=this.$element.find("[data-stellar-background-ratio]"),this.$element.data("stellar-background-ratio")&&(s=s.add(this.$element)),s.each(function(){var s=e(this),o=h(s),u,a,f,l,p,d,v,m,g,y=0,b=0,w=0,E=0;if(!s.data("stellar-backgroundIsActive"))s.data("stellar-backgroundIsActive",this);else if(s.data("stellar-backgroundIsActive")!==this)return;s.data("stellar-backgroundStartingLeft")?c(s,s.data("stellar-backgroundStartingLeft"),s.data("stellar-backgroundStartingTop")):(s.data("stellar-backgroundStartingLeft",o[0]),s.data("stellar-backgroundStartingTop",o[1])),p=s.css("margin-left")==="auto"?0:parseInt(s.css("margin-left"),10),d=s.css("margin-top")==="auto"?0:parseInt(s.css("margin-top"),10),v=s.offset().left-p-n,m=s.offset().top-d-i,s.parents().each(function(){var t=e(this);if(t.data("stellar-offset-parent")===!0)return y=w,b=E,g=t,!1;w+=t.position().left,E+=t.position().top}),u=s.data("stellar-horizontal-offset")!==r?s.data("stellar-horizontal-offset"):g!==r&&g.data("stellar-horizontal-offset")!==r?g.data("stellar-horizontal-offset"):t.horizontalOffset,a=s.data("stellar-vertical-offset")!==r?s.data("stellar-vertical-offset"):g!==r&&g.data("stellar-vertical-offset")!==r?g.data("stellar-vertical-offset"):t.verticalOffset,t.backgrounds.push({$element:s,$offsetParent:g,isFixed:s.css("background-attachment")==="fixed",horizontalOffset:u,verticalOffset:a,startingValueLeft:o[0],startingValueTop:o[1],startingBackgroundPositionLeft:isNaN(parseInt(o[0],10))?0:parseInt(o[0],10),startingBackgroundPositionTop:isNaN(parseInt(o[1],10))?0:parseInt(o[1],10),startingPositionLeft:s.position().left,startingPositionTop:s.position().top,startingOffsetLeft:v,startingOffsetTop:m,parentOffsetLeft:y,parentOffsetTop:b,stellarRatio:s.data("stellar-background-ratio")===r?1:s.data("stellar-background-ratio")})})},_reset:function(){var e,t,n,r,i;for(i=this.particles.length-1;i>=0;i--)e=this.particles[i],t=e.$element.data("stellar-startingLeft"),n=e.$element.data("stellar-startingTop"),this._setPosition(e.$element,t,t,n,n),this.options.showElement(e.$element),e.$element.data("stellar-startingLeft",null).data("stellar-elementIsActive",null).data("stellar-backgroundIsActive",null);for(i=this.backgrounds.length-1;i>=0;i--)r=this.backgrounds[i],r.$element.data("stellar-backgroundStartingLeft",null).data("stellar-backgroundStartingTop",null),c(r.$element,r.startingValueLeft,r.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=e.noop,e(t).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var n=this,r=e(t);r.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),typeof this.options.horizontalOffset=="function"?(this.horizontalOffset=this.options.horizontalOffset(),r.bind("resize.horizontal-"+this.name,function(){n.horizontalOffset=n.options.horizontalOffset()})):this.horizontalOffset=this.options.horizontalOffset,typeof this.options.verticalOffset=="function"?(this.verticalOffset=this.options.verticalOffset(),r.bind("resize.vertical-"+this.name,function(){n.verticalOffset=n.options.verticalOffset()})):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var e=this._getScrollLeft(),t=this._getScrollTop(),n,r,i,s,o,u,a,f=!0,l=!0,h,p,d,v,m;if(this.currentScrollLeft===e&&this.currentScrollTop===t&&this.currentWidth===this.viewportWidth&&this.currentHeight===this.viewportHeight)return;this.currentScrollLeft=e,this.currentScrollTop=t,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight;for(m=this.particles.length-1;m>=0;m--)i=this.particles[m],s=i.isFixed?1:0,this.options.horizontalScrolling?(h=(e+i.horizontalOffset+this.viewportOffsetLeft+i.startingPositionLeft-i.startingOffsetLeft+i.parentOffsetLeft)*-(i.stellarRatio+s-1)+i.startingPositionLeft,d=h-i.startingPositionLeft+i.startingOffsetLeft):(h=i.startingPositionLeft,d=i.startingOffsetLeft),this.options.verticalScrolling?(p=(t+i.verticalOffset+this.viewportOffsetTop+i.startingPositionTop-i.startingOffsetTop+i.parentOffsetTop)*-(i.stellarRatio+s-1)+i.startingPositionTop,v=p-i.startingPositionTop+i.startingOffsetTop):(p=i.startingPositionTop,v=i.startingOffsetTop),this.options.hideDistantElements&&(l=!this.options.horizontalScrolling||d+i.width>(i.isFixed?0:e)&&d<(i.isFixed?0:e)+this.viewportWidth+this.viewportOffsetLeft,f=!this.options.verticalScrolling||v+i.height>(i.isFixed?0:t)&&v<(i.isFixed?0:t)+this.viewportHeight+this.viewportOffsetTop),l&&f?(i.isHidden&&(this.options.showElement(i.$element),i.isHidden=!1),this._setPosition(i.$element,h,i.startingPositionLeft,p,i.startingPositionTop)):i.isHidden||(this.options.hideElement(i.$element),i.isHidden=!0);for(m=this.backgrounds.length-1;m>=0;m--)o=this.backgrounds[m],s=o.isFixed?0:1,u=this.options.horizontalScrolling?(e+o.horizontalOffset-this.viewportOffsetLeft-o.startingOffsetLeft+o.parentOffsetLeft-o.startingBackgroundPositionLeft)*(s-o.stellarRatio)+"px":o.startingValueLeft,a=this.options.verticalScrolling?(t+o.verticalOffset-this.viewportOffsetTop-o.startingOffsetTop+o.parentOffsetTop-o.startingBackgroundPositionTop)*(s-o.stellarRatio)+"px":o.startingValueTop,c(o.$element,u,a)},_handleScrollEvent:function(){var e=this,t=!1,n=function(){e._repositionElements(),t=!1},r=function(){t||(p(n),t=!0)};this.$scrollElement.bind("scroll."+this.name,r),r()},_startAnimationLoop:function(){var e=this;this._animationLoop=function(){p(e._animationLoop),e._repositionElements()},this._animationLoop()}},e.fn[i]=function(t){var n=arguments;if(t===r||typeof t=="object")return this.each(function(){e.data(this,"plugin_"+i)||e.data(this,"plugin_"+i,new d(this,t))});if(typeof t=="string"&&t[0]!=="_"&&t!=="init")return this.each(function(){var r=e.data(this,"plugin_"+i);r instanceof d&&typeof r[t]=="function"&&r[t].apply(r,Array.prototype.slice.call(n,1)),t==="destroy"&&e.data(this,"plugin_"+i,null)})},e[i]=function(n){var r=e(t);return r.stellar.apply(r,Array.prototype.slice.call(arguments,0))},e[i].scrollProperty=o,e[i].positionProperty=u,t.Stellar=d})(jQuery,this,document);
jw.Utils = (function ($, undefined) {

    var _main = $(".main");

    var jsSrcHash = {
        // src: id
        "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js": false,
        "//platform.twitter.com/widgets.js": false,
        "/js/plugins/jquery.cycle.lite.js": false,
        "/js/plugins/jquery.hoverIntent.min.js": false,
        "/js/plugins/jquery.listCarousel.js": false,
        "/js/plugins/jquery.star_bg.js": false,
        "/js/stars.js": false,
        "/js/ballPit.js": false,
        "/js/bouncingObj.js": false,
        "/js/computerGraphics/web/computergraphics.dart.js": false,
        "/js/ustream.js": false
    };

    return {
        require: function (src, callback) { // callback(cached)
            if (!jsSrcHash[src]) {
                $.ajax({
                    url: src,
                    dataType: "script",
                    success: function (data) {
                        jsSrcHash[src] = true;
                        callback(false);
                    }
                });
            }
            else {
                callback(true);
            }
        },

        getYear: function () {
            return new Date().getFullYear();
        },

        resetModel: function () {
            _main.empty();

            for (var i = 0; i < jw.listeners.length; ++i) {
                jw.listeners[i].off();
            }
            jw.listeners = [];


            if (jw.Routing.lastPg === "ballPit") {
                jw.BallPit.deInit();
            }
            else if (jw.Routing.lastPg === "stars") {
                jw.StarryBg.deInit();
            }
            else if (jw.Routing.lastPg === "bObj") {
                jw.Bounce.deInit();
            }

            jw.body.removeClass();
            document.title = "";
            $("meta[name=description], meta[name=keywords]").remove();
            $("meta[name=robots]").remove();

            // if page not playground inner
            var h = window.location.hash;
            if (typeof (h) === "undefined" || h.indexOf("#playground/") !== 0) {  // startsWith
                var pNav = $(".dPlaygroundNav");

                if (pNav.is(":visible")) {
                    pNav.slideUp();
                }
            }
        }
    };
})(jQuery);


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
    		window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
			function (callback) {
			    window.setTimeout(callback, 1000 / 60);
			};
})();

jw.AboutModel = (function ($, undefined) {
    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/about.html").swap();

            document.title = "About";
            jw.body.addClass("about");
        }
    };
})(jQuery);
jw.ContactModel = (function ($, undefined) {
    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/contact.html").swap();

            document.title = "Contact Me";
            jw.body.addClass("contact");
        }
    };
})(jQuery);
jw.GamesModel = (function ($, undefined) {
    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/games/index.html", function (data) {
                    jw.Utils.require("/js/plugins/jquery.hoverIntent.min.js", function () { });

                    jw.Utils.require("/js/plugins/jquery.listCarousel.js", function () {
                        $("ul").listCarousel();
                    });
                }).swap();

                document.title = "Games";
                jw.body.addClass("absHover games");
            }
        }
    };
})(jQuery);
jw.HomeModel = (function ($, undefined) {

    return {
        render: function (that) {
            jw.Utils.resetModel();

            that.load("/home.html", function (data) {
                jw.Utils.require("//platform.twitter.com/widgets.js", function (alreadyCreated) {
                    //if(!alreadyCreated){
                        twttr.widgets.load();
                    //}
                });
            }).swap();

            document.title = "Jon Wiedmann";
            jw.head.append("<meta name='description' content='Jon Wiedmann&#700;s personal website.  This site is set up to showcase some of my technical ability. " +
                                    "This site has information regarding my work experience and hobbies.' />" +
                           "<meta name='keywords' content='Jon Wiedmann, Web Developer, PHP, HTML5, CSS, jQuery, Javascript, sammy.js' />"
            );
            jw.body.addClass("home");
        }
    };
})(jQuery);

jw.MusicModel = (function ($, undefined) {

    var year = jw.Utils.getYear();

    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/music/index.html", function (data) {
                    $(".teaching").text(year - 2008);
                    $(".playing").text(year - 1994);
                }).swap();

                document.title = "Music";
                jw.body.addClass("music musicHome");
            }
            else if (page === "bass") {
                that.load("/music/bass.html", function (data) {
                    $(".playing").text(year - 2009);
                }).swap();

                document.title = "Bass | Music";
                jw.body.addClass("music bass");
            }
            else if (page === "chiptunes") {
                that.load("/music/chiptunes.html", function (data) {}).swap();

                document.title = "Chiptunes | Music";
                jw.body.addClass("music");
            }
            else if (page === "guitar") {
                that.load("/music/guitar.html", function (data) {
                    $(".playing").text(year - 2002);
                }).swap();

                document.title = "Guitar | Music";
                jw.body.addClass("music");
            }
            else if (page === "mandolin") {
                that.load("/music/mandolin.html", function (data) {
                    $(".playing").text(year - 2008);
                }).swap();

                document.title = "Mandolin | Music";
                jw.body.addClass("music mandolin");
            }
            else if (page === "piano") {
                that.load("/music/piano.html", function (data) {
                    $(".playing").text(year - 1994);
                }).swap();

                document.title = "Piano | Music";
                jw.body.addClass("music");
            }
            else if (page === "trumpet") {
                that.load("/music/trumpet.html", function (data) {
                    $(".playing").text(year - 1998);
                }).swap();

                document.title = "Trumpet | Music";
                jw.body.addClass("music trumpet");
            }
            else if (page === "rates") {
                that.load("/music/rates.html", function (data) {}).swap();

                document.title = "Rates | Music";
                jw.head.append("<meta name='description' content='Music Lesson Rates'>" +
                               "<meta name='robots' rel='none' />"
                );
                jw.body.addClass("music rates");
            }
            else if (page === "voice") {
                that.load("/music/voice.html", function (data) {
                    $(".playing").text(year - 2009);
                }).swap();

                document.title = "Voice | Music";
                jw.body.addClass("music");
            }
        }
    };
})(jQuery);
jw.PlaygroundModel = (function ($, undefined) {

    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/playground/index.html", function (data) {
                    var clickListener = $(".colL ul").listCarousel();
                    jw.listeners.push(clickListener);
                }).swap();

                document.title = "Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("absHover playground");
            }
            else if (page === "ballPit") {
                that.load("/playground/ballPit.html", function (data) {
                    jw.Utils.require("/js/ballPit.js", function () {
                        jw.BallPit.init();
                    });
                }).swap();

                document.title = "Ball Pit | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav3");
            }
            else if (page === "stars") {
                that.load("/playground/stars.html", function (data) {
                    // TODO: load these async
                    jw.Utils.require("/js/plugins/jquery.star_bg.js", function () {
                        jw.Utils.require("/js/stars.js", function (cached) {
                            jw.StarryBg.init();
                        });
                    });
                }).swap();

                document.title = "Starry Background | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a starry background.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav2");
            }
            else if (page === "bObj") {
                that.load("/playground/bouncing-object.html", function (data) {
                    jw.Utils.require("/js/bouncingObj.js", function () {
                        jw.Bounce.init();
                    });
                }).swap();

                document.title = "Bouncing Object | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a bouncing object.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav5");
            }
            else if (page === "ustream") {
                that.load("/playground/USTREAM-demo.html", function (data) {
                    jw.Utils.require("/js/ustream.js", function () {
                        jw.Ustream.init();
                    });
                }).swap();

                document.title = "USTREAM demo | Playground";
                jw.head.append("<meta name='description' content='A USTREAM api demo.' />" +
                               "<meta name='keywords' content='USTREAM' />"
                );
                jw.body.addClass("playground playInner uStreamPage nav5");
            }
            else if (page === "bCube") {
                that.load("/playground/breakdancing-cube.html", function (data) {
                    $("#cube").on("click", function (e) {
                        e.preventDefault();
                    });
                }).swap();

                document.title = "Breakdancing Cube | Playground";
                jw.head.append("<meta name='description' content='Pure CSS3 animation demo.' />" +
                               "<meta name='keywords' content='CSS3, HTML5' />"
                );
                jw.body.addClass("playground playInner bDancingCube nav1");
            }


            if (page !== "index") {
                var pNav = $(".dPlaygroundNav");

                if (!pNav.is(":visible")) {
                    pNav.slideDown();
                }
            }
        }
    };
})(jQuery);
jw.PortfolioModel = (function ($, undefined) {
    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/portfolio/index.html", function (data) {
                    jw.Utils.require("/js/plugins/jquery.hoverIntent.min.js", function () { });

                    jw.Utils.require("/js/plugins/jquery.listCarousel.js", function () {
                        $("ul").listCarousel();
                    });
                }).swap();

                document.title = "Portfolio";
                jw.body.addClass("portfolio absHover");
            }
        }
    };
})(jQuery);
jw.Routing = (function ($, undefined) {
    var app = $.sammy(".main", function () {
        //----- Home
        this.route("get",'/', function () {
            jw.HomeModel.render(this);
            jw.Routing.lastPg = "home";
        });

        this.route("get", "#home", function () {
            jw.HomeModel.render(this);
            jw.Routing.lastPg = "home";
        });

        //----- About
        this.route("get", "#about", function () {
            jw.AboutModel.render(this);
            jw.Routing.lastPg = "about";
        });

        //----- Contact
        this.route("get", "#contact", function () {
            jw.ContactModel.render(this);
            jw.Routing.lastPg = "contact";
        });

        //----- Favorites
        this.route("get", "#favorites", function () {
            jw.FavoritesModel.render(this);
            jw.Routing.lastPg = "favorites";
        });

        //----- Blog
        this.route("get", "#blog", function () {
            jw.BlogModel.render(this);
            jw.Routing.lastPg = "blog";
        });

        //----- Games
        this.route("get", "#games", function () {
            jw.GamesModel.render(this, "index");
            jw.Routing.lastPg = "games/index";
        });

        //----- Music
        this.route("get", "#music", function () {
            jw.MusicModel.render(this, "index");
            jw.Routing.lastPg = "music/index";
        });

        this.route("get", "#music/bass", function () {
            jw.MusicModel.render(this, "bass");
            jw.Routing.lastPg = "music/bass";
        });

        this.route("get", "#music/chiptunes", function () {
            jw.MusicModel.render(this, "chiptunes");
            jw.Routing.lastPg = "music/chiptunes";
        });

        this.route("get", "#music/guitar", function () {
            jw.MusicModel.render(this, "guitar");
            jw.Routing.lastPg = "music/guitar";
        });

        this.route("get", "#music/mandolin", function () {
            jw.MusicModel.render(this, "mandolin");
            jw.Routing.lastPg = "music/mandolin";
        });

        this.route("get", "#music/piano", function () {
            jw.MusicModel.render(this, "piano");
            jw.Routing.lastPg = "music/piano";
        });

        this.route("get", "#music/trumpet", function () {
            jw.MusicModel.render(this, "trumpet");
            jw.Routing.lastPg = "music/trumpet";
        });

        this.route("get", "#music/rates", function () {
            jw.MusicModel.render(this, "rates");
            jw.Routing.lastPg = "music/rates";
        });

        this.route("get", "#music/voice", function () {
            jw.MusicModel.render(this, "voice");
            jw.Routing.lastPg = "music/voice";
        });
        
        //----- Playground
        this.route("get", "#playground", function () {
            jw.PlaygroundModel.render(this, "index");
            jw.Routing.lastPg = "playground/index";
        });

        this.route("get", "#playground/ballPit", function () {
            jw.PlaygroundModel.render(this, "ballPit");
            jw.Routing.lastPg = "ballPit";
        });

        this.route("get", "#playground/breakdancing-cube", function () {
            jw.PlaygroundModel.render(this, "bCube");
            jw.Routing.lastPg = "bCube";
        });

        this.route("get", "#playground/bouncing-object", function () {
            jw.PlaygroundModel.render(this, "bObj");
            jw.Routing.lastPg = "bObj";
        });

        this.route("get", "#playground/starry-background", function () {
            jw.PlaygroundModel.render(this, "stars");
            jw.Routing.lastPg = "stars";
        });

        this.route("get", "#playground/USTREAM-demo", function () {
            jw.PlaygroundModel.render(this, "ustream");
            jw.Routing.lastPg = "ustream";
        });

        //----- Portfolio
        this.route("get", "#portfolio", function () {
            jw.PortfolioModel.render(this, "index");
            jw.Routing.lastPg = "portfolio/index";
        });
    });

    return {
        lastPg: null,


        init: function () {
            app.run();
        }
    };
})(jQuery);

jw.Main = (function () {

    function declareGlobals() {
        jw.head = $("head");
        jw.body = $("body");
        jw.listeners = [];
    }


    return {
        init: function () {
            declareGlobals();

            jw.Routing.init();

            $(".dateYear").text(jw.Utils.getYear());

            $(window).on("resize", function () {
                var h = $(".colR > div:visible").height();
                jw.Main.fixColRHeight(h);
            });

            $("header a").on("click", function () {
                $(".main").height("auto");
            });
        },

        fixColRHeight: function (h) {
            var height = h + 120;

            if($(window).width() <= 800){
                height = 0;
                //jw.parallax.off();
            }
            else {
                if ($(window).width() <= 1265) {
                    height += $(".colL").height() + 38; // colR margin-top + height
                }


                //jw.parallax.off();
                //jw.parallax = $(window).stellar({
                //    responsive: true
                //});
            }

            if(height == 0) {
                $(".main").height("auto");
            }
            else {
                $(".main").height(height);
            }
        }
    }
})();

$(function () {
    jw.Main.init();

    jw.parallax = $(window).stellar({
        responsive: true
    });
});

//# sourceMappingURL=master.js.map