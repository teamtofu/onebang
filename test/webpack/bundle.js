/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/test/webpack/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports=__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/*!
 * Copyright (c) 2017 Russell Steadman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
;(function() {
"use strict";

// Version: 1.0.2
var onebangbind = 'onebang';

var type = {
    o: 'object',
    s: 'string',
    f: 'function',
    b: 'boolean',
    n: 'number',
    r: 'regex'
};

var has = {};

var check = function () {
    var items = {
        angular: typeof angular === type.o && !!angular,
        console: typeof console === type.o && !!console && !!console.log && !!console.error && !!console.info,
        alert: typeof alert === type.f && !!alert,
        document: typeof document === type.o && !!document,
        body: typeof document === type.o && !!document && typeof document.body === type.o && !!document.body,
        mutation: typeof MutationObserver === type.f && !!MutationObserver,
        interval: typeof setInterval === type.f && typeof clearInterval === type.f && !!setInterval && !!clearInterval,
        window: typeof window === type.o && !!window,
        module: typeof module !== 'undefined' && module.exports
    };
    for (var ze in items) has[ze] = items[ze];
    return has;
};

var onready;

;(function () {
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    onready = function (callback, context) {
        var ready = function () {
            if (!readyFired) {
                readyFired = true;
                for (var zf = 0; zf < readyList.length; zf++) {
                    readyList[zf].fn.call(this, readyList[zf].ctx);
                }
                readyList = [];
            }
        }.bind(context);
        var readyStateChange = function () {
            if (document.readyState === "complete") {
                ready();
            }
        };
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        if (readyFired) {
            setTimeout(function () {
                callback.bind(context)();
            }, 1);
            return;
        } else {
            readyList.push({
                fn: callback,
                ctx: context
            });
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})();

var errorurl = function (code, varone, vartwo, varthree) {
    return 'http://teamtofu.github.io/onebang/errors/?error=' + code + '&one=' + encodeURIComponent(varone) + '&two=' + encodeURIComponent(vartwo) + '&three=' + encodeURIComponent(varthree);
};

var builtin = [{
        regex: /^\_\_.*$/,
        len: 2,
        id: '__'
    },
    {
        regex: /^b\_.*$/,
        len: 2,
        id: 'b_'
    },
    {
        regex: /^B\_.*$/,
        len: 2,
        id: 'B_'
    },
    {
        regex: /^!.*$/,
        len: 1,
        id: '!'
    },
    {
        regex: /^\:\:.*$/,
        len: 2,
        id: '::'
    },
    {
        regex: /^1.*$/,
        len: 1,
        id: '1'
    }
];

var addclass = function (additions, node) {
    var classes = node.getAttribute('class');
    classes = classes ? classes.split(' ') : [];
    for (var zg in additions) {
        if (classes.indexOf(additions[zg]) === -1) {
            classes.push(encodeURIComponent(additions[zg]));
        }
    }
    node.setAttribute('class', classes.join(' ').trim());
};

var isolate = function (val, uprefix, node) {
    var isoattr = 'onebang_isolate';
    var current = node.getAttribute(isoattr) ? node.getAttribute(isoattr).split(' ') : [];
    var attr = typeof node.getAttribute(uprefix + val) === type.s ? uprefix + val : null;
    if (!attr) {
        for (var zh in builtin) {
            attr = typeof node.getAttribute(builtin[zh].id + val) === type.s ? builtin[zh].id + val : null;
            if (attr) {
                current.push(attr);
                break;
            }
        }
    } else {
        current.push(attr);
    }
    node.removeAttribute(attr);
    node.setAttribute(isoattr, current.join(' '));
};

var basics = {
    'console': function (m) {
        for (var i in m) {
            if (check().console) console.log(m[i]);
        }
    },
    'class': function (m) {
        addclass(m, this);
    },
    'c': 'class',
    'hash': function (m) {
        var href = this.getAttribute('href');
        href = typeof href === type.s ? href.split('#') : ['', ''];
        href[1] = m[0] ? m[0] : '';
        this.setAttribute('href', href.join('#'));
    },
    '#': 'hash',
    'icon': function (m) {
        switch (m[0]) {
            case 'fa': case 'fontawesome':
            addclass(['fa', 'fa-' + m[1], m[2] ? 'fa-' + m[2] + 'x' : '', m[3] ? 'fa-spin' : ''], this);
            break;
            case 'ion': case 'ionicon':
            addclass(['ion', 'icon', 'ion-' + m[1]], this);
            break;
            case 'gly': case 'glyph': case 'glyphicon':
            addclass(['glyphicon', 'glyphicon-' + m[1]], this);
            break;
            case 'oi': case 'openicon':
            addclass(['oi', 'oi-' + m[1]], this);
            break;
        }
    },
    'i': 'icon',
    'id': function (m) {
        if (m[0]) {
            this.setAttribute('id', m[0]);
        } else {
            this.removeAttribute('id');
        }
    },
    'exclaim': function (m, options, version, error) {
        if (typeof options !== type.o || !options) return;
        var additions = [];
        if (!options.default) options.default = '';
        for (var i in m) {
            if (additions.indexOf(!m[i] ? options.default : options[m[i]]) !== -1) continue;
            if (!m[i]) {
                additions.push(options.default);
            } else if (!options[m[i]]) {
                error(errorurl('ai',m[i]));
            } else {
                additions.push(options[m[i]]);
            }
        }
        if (!m[0]) additions.push(options.default);
        addclass(additions, this);
    },
    '!': 'exclaim',
    'style': function (m, a, b, error) {
        if (!m[0] || !m[1]) return error(errorurl('aj'));
        this.style[m[0]] = m[1].replace(/\_/g, ' ');
    },
    's': 'style',
    'hide': function () {
        this.style.display = 'none';
    }
};

var onebang = function (settings) {

    this.version = '1.0.2';

    this.options = {
        developerMode: false,
        debugMode: false,
        userBang: '!',
        userBangRegex: /^\!.*$/,
        userConnector: ':',
        userConnectorRegex: /\:/g,
        functions: {},
        angular: false,
        removeBangPrefixes: []
    };

    var verifyopt = {
        developerMode: type.b,
        debugMode: type.b,
        userBang: type.s,
        userBangRegex: type.o + '&' + type.r,
        userConnector: type.s,
        userConnectorRegex: type.o + '&' + type.r,
        functions: type.o,
        angular: type.b,
        removeBangPrefixes: type.o
    };

    has.settings = typeof settings === type.o && !!settings;

    if (check().settings) {
        for (var za in settings) this.options[za] = settings[za];
    }

    for (var zb in verifyopt) {
        if (verifyopt[zb].split('&').indexOf(typeof this.options[zb]) === -1) {
            throw new Error(errorurl('ah', zb, typeof this.options[zb], verifyopt[zb]));
        }
    }

    for (var zc in this.options.removeBangPrefixes) {
        for (var zd in builtin) {
            if (this.options.removeBangPrefixes[zc] === builtin[zd].id) {
                builtin = builtin.splice(zd, 1);
                break;
            }
        }
    }

    this.events = [];

    var error = function (error) {
        if (check().console) {
            console.error('(OneBang) ' + error);
        } else if (typeof alert === type.f && this.options.developerMode) {
            alert(error);
        }
        this.events.push(error);
    }.bind(this);

    var log = function (log) {
        if (check().console && this.options.debugMode) {
            console.info('(OneBang) ' + log);
        }
        this.events.push(log);
    }.bind(this);

    onready(function () {
        if (!check().document) {
            error(errorurl('aa'));
        } else if (!check().body) {
            error(errorurl('ab'));
        }
    }, this);

    var observer;
    if (!check().mutation) {
        error(errorurl('ac'));
    } else {
        observer = new MutationObserver(function () {
            this.interpret();
        }.bind(this));
    }

    var branch = function (node) {
        var children = node.childNodes;
        for (var zi in children) branch(children[zi]);
        process(node);
    }.bind(this);

    var process = function (node) {
        var attr = node.attributes;
        if (!attr) return;
        var foundattr = [];
        for (var zj in attr) {
            var aname = attr[zj].name;
            if (this.options.userBangRegex.test(aname)) {
                foundattr.push(aname.substr(this.options.userBang.length));
            } else {
                for (var zm in builtin) {
                    if (builtin[zm].regex.test(aname)) {
                        foundattr.push(aname.substr(builtin[zm].len));
                        break;
                    }
                }
            }
        }
        bangforbuck(node, foundattr);
    }.bind(this);

    var bangforbuck = function (node, attrs) {
        for (var zk in attrs) {
            var m = attrs[zk].split(this.options.userConnector);
            var v = m[0];
            m.splice(0, 1);
            if (attrs[zk] === '') return;
            while (typeof this.q[v] === type.s) v = this.q[v];
            if (typeof this.q[v] !== type.f) {
                isolate(attrs[zk], this.options.userBang, node);
                error(errorurl('ad', attrs[zk], v));
                continue;
            }
            var fnopts = this.options.functions[v];
            if (this.q[v]) this.q[v].bind(node)(m, fnopts ? fnopts : {}, this.version, error, log);
            node.removeAttribute(this.options.userBang + attrs[zk]);
            for (var zn in builtin) node.removeAttribute(builtin[zn].id + attrs[zk]);
        }
    }.bind(this);

    this.q = {};

    var bangqueries = [basics];

    var updatefn = function () {
        for (var zl in bangqueries) {
            for (var zo in bangqueries[zl]) {
                this.q[zo] = bangqueries[zl][zo];
            }
        }
    }.bind(this);
    updatefn();

    this.addplugin = function (name, fn) {
        var add = {};
        add[name] = fn;
        bangqueries.push(add);
        updatefn();
    };

    this.addplugins = function (fns) {
        bangqueries.push(fns);
        updatefn();
    };

    this.interpret = function (html) {
        html = html || document.body;
        branch(html);
        return html;
    };

    onready(function () {
        this.interpret(document.body);
    }, this);

    if (typeof observer === type.o) {
        onready(function () {
            observer.observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true
            });
        }, this);
    }

    var interval = null;

    this.interval = function (msdelay) {
        if (check().interval) {
            if (typeof msdelay !== type.n && interval === null) {
                clearInterval(interval);
                interval = null;
                log('Interval-based updates were stopped.');
            } else if (typeof msdelay === type.n && msdelay > 0) {
                interval = setInterval(function () {
                    this.interpret(document.body);
                }.bind(this), msdelay);
                log('Interval-based updates were started.');
            } else {
                error(errorurl('ae'));
            }
        } else {
            error(errorurl('af'));
        }
    };

};

if (check().angular) {
    var app = angular.module('oneBang', []);
    app.factory('$oneBang', function () {
        var traversedom = function (opts) {
            opts = typeof opts === type.o && opts ? opts : {};
            opts.angular = true;
            if (typeof window.onebang === type.f) window.onebang(opts);
            return window.onebang;
        };
        return function (opts) {
            return traversedom(opts);
        };
    });
    var linking = function () {return {
        link: function ($scope, dom) {
            if (typeof dom[0] === type.o) dom = dom[0];
            window.onebang.interpret(dom);
        }
    };};
    var dirs = ['!','bang','::'];
    for (var i in dirs) {
        app.directive(dirs[i], linking);
    }
}

var ini = function (settings) {
    window[onebangbind] = new onebang(settings);
};

var modfunction = function (settings) {
    if (typeof window[onebangbind] === type.f) {
        ini.bind(this)(settings);
    }
    return null;
};

if (check().window) {
    window[onebangbind] = ini.bind(this);
    if (check().module) {
        module.exports = modfunction.bind(this);
    }
} else {
    throw new Error('(OneBang) ' + errorurl('ag'));
}
}());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var init = __webpack_require__(0);
//use var init = require('onebang'); instead
init(/* settings */);

/* This also works...
 * require('onebang');
 * window.onebang(); //settings
 */

/***/ })
/******/ ]);