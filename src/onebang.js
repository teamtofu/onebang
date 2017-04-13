// Version: una-version
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
        angular: (typeof angular === type.o) && !!angular,
        console: (typeof console === type.o) && !!console && !!console.log && !!console.error && !!console.info,
        alert: (typeof alert === type.f) && !!alert,
        document: (typeof document === type.o) && !!document,
        body: (typeof document === type.o) && !!document && (typeof document.body === type.o) && !!document.body,
        mutation: (typeof MutationObserver === type.f) && !!MutationObserver,
        interval: (typeof setInterval === type.f) && (typeof clearInterval === type.f) && !!setInterval && !!clearInterval,
        window: typeof window === type.o && !!window,
        module: typeof module !== 'undefined' && module.exports
    };
    for (var i in items) has[i] = items[i];
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
                for (var i = 0; i < readyList.length; i++) {
                    readyList[i].fn.call(this, readyList[i].ctx);
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
    for (var i in additions) {
        if (classes.indexOf(additions[i]) === -1) {
            classes.push(encodeURIComponent(additions[i]));
        }
    }
    node.setAttribute('class', classes.join(' ').trim());
};

var isolate = function (val, uprefix, node) {
    var isoattr = 'onebang_isolate';
    var current = node.getAttribute(isoattr) ? node.getAttribute(isoattr).split(' ') : [];
    var attr = typeof node.getAttribute(uprefix + val) === type.s ? uprefix + val : null;
    if (!attr) {
        for (var i in builtin) {
            attr = typeof node.getAttribute(builtin[i].id + val) === type.s ? builtin[i].id + val : null;
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

/*basics*/

var onebang = function (settings) {

    this.version = 'una-version';

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

    has.settings = (typeof settings === type.o) && !!settings;

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
        observer = new MutationObserver(function (mut) {
            for (var i in mut) {
                this.interpret();
            }
        }.bind(this));
    }

    var branch = function (node) {
        var children = node.childNodes;
        for (var i in children) branch(children[i]);
        process(node);
    }.bind(this);

    var process = function (node) {
        var attr = node.attributes;
        if (!attr) return;
        var foundattr = [];
        for (var i in attr) {
            var aname = attr[i].name;
            if (this.options.userBangRegex.test(aname)) {
                foundattr.push(aname.substr(this.options.userBang.length));
            } else {
                for (var o in builtin) {
                    if (builtin[o].regex.test(aname)) {
                        foundattr.push(aname.substr(builtin[o].len));
                        break;
                    }
                }
            }
        }
        bangforbuck(node, foundattr);
    }.bind(this);

    var bangforbuck = function (node, attrs) {
        for (var i in attrs) {
            var m = attrs[i].split(this.options.userConnector);
            var v = m[0];
            m.splice(0, 1);
            if (attrs[i] === '') return;
            while (typeof this.q[v] === type.s) v = this.q[v];
            if (typeof this.q[v] !== type.f) {
                isolate(attrs[i], this.options.userBang, node);
                error(errorurl('ad', attrs[i], v));
                continue;
            }
            var fnopts = this.options.functions[v];
            if (this.q[v]) this.q[v].bind(node)(m, fnopts ? fnopts : {}, this.version, error, log);
            node.removeAttribute(this.options.userBang + attrs[i]);
            for (var o in builtin) node.removeAttribute(builtin[o].id + attrs[i]);
        }
    }.bind(this);

    this.q = {};

    var bangqueries = [basics];

    var updatefn = function () {
        for (var i in bangqueries) {
            for (var o in bangqueries[i]) {
                this.q[o] = bangqueries[i][o];
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

    var interval;

    this.interval = function (msdelay) {
        if (check().interval) {
            if (typeof msdelay !== type.n && typeof interval !== 'undefined') {
                clearInterval(interval);
                interval = undefined;
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

/*angular*/

var ini = function (settings) {
    window[onebangbind] = new onebang(settings);
};

if (check().window) {
    window[onebangbind] = ini.bind(this);
} else if (check().module) {
    module.exports = ini.bind(this);
} else {
    console.error(new Error(errorurl('ag')));
}