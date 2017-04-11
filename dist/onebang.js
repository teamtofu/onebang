/*!
Copyright (c) 2017 Russell Steadman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function () {

    var onebangbind = 'onebang';

    var type = {
        o: 'object',
        s: 'string',
        f: 'function',
        b: 'boolean',
        n: 'number',
        r: 'regex'
    };

    var has = {
        angular: (typeof angular === type.o) && !!angular,
        console: (typeof console === type.o) && !!console && !!console.log && !!console.error && !!console.info,
        alert: (typeof alert === type.f) && !!alert,
        document: (typeof document === type.o) && !!document,
        body: (typeof document.body === type.o) && !!document.body,
        mutation: (typeof MutationObserver === type.f) && !!MutationObserver,
        interval: (typeof setInterval === type.f) && (typeof clearInterval === type.f) && !!setInterval && !!clearInterval,
    };

    var errorurl = function (code,varone,vartwo,varthree) {
        return 'http://teamtofu.github.io/onebang/errors/?error=' + code 
        + '&one=' + encodeURIComponent(varone) + '&two=' + encodeURIComponent(vartwo) + '&three=' + encodeURIComponent(varthree);
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
        var current = node.getAttribute(isoattr)?node.getAttribute(isoattr).split(' '):[];
        var attr = typeof node.getAttribute(uprefix + val) === type.s?uprefix+val:null;
        if (!attr) {
            for (var i in builtin) {
                attr = typeof node.getAttribute(builtin[i].id+val)  === type.s?builtin[i].id+val:null;
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
            if (has.console) console.log(m[i]);
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
            addclass(['fa', 'fa-' + m[1], (m[2] ? 'fa-' + m[2] + 'x' : ''), (m[3] ? 'fa-spin' : '')], this);
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
    'exclaim': function (m, options, version, error, log) {
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

        this.version = '/*v*/';


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
            userBangRegex: type.o+'&'+type.r,
            userConnector: type.s,
            userConnectorRegex: type.o+'&'+type.r,
            functions: type.o,
            angular: type.b,
            removeBangPrefixes: type.o
        };

        has.settings = (typeof settings === type.o) && !!settings;

        if (has.settings) {
            for (var i in settings) this.options[i] = settings[i];
        }

        for (var i in verifyopt) {
            if (verifyopt[i].split('&').indexOf(typeof this.options[i]) === -1) {
                throw new Error(errorurl('ah',i,typeof this.options[i],verifyopt[i]));
            }
        }

        for (var o in this.options.removeBangPrefixes) {
            for (var i in builtin) {
                if (this.options.removeBangPrefixes === builtin[i].id) {
                    builtin = builtin.splice(i, 1);
                    break;
                }
            }
        }

        this.events = [];

        var error = function (error) {
            if (has.console) {
                console.error('(OneBang) ' + error);
            } else if (typeof alert === type.f && this.options.developerMode) {
                alert(error);
            }
            this.events.push(error);
        }.bind(this);

        var log = function (log) {
            if (has.console && this.options.debugMode) {
                console.info('(OneBang) ' + log);
            }
            this.events.push(log);
        }.bind(this);

        if (!has.document) {
            error(errorurl('aa'));
            return this.q = [], this.interpret = function () {}, this.addplugin = function () {}, this.addplugins = function () {};
        } else if (!has.body) {
            error(errorurl('ab'));
        }

        if (!has.mutation) {
            error(errorurl('ac'));
        } else {
            var observer = new MutationObserver(function (mut) {
                for (var i in mut) {
                    this.interpret(document.body);
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
                    error(errorurl('ad',attrs[i],v));
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
            branch(html);
            return html;
        };

        this.interpret(document.body);

        var mutopts = {
            attributes: true,
            childList: true,
            subtree: true
        };
        if (typeof observer === type.o) observer.observe(document.body, mutopts);

        var interval = undefined;

        this.interval = function (msdelay) {
            if (typeof msdelay !== type.n) var cancel = true;
            if (has.interval) {
                if (cancel && typeof interval !== 'undefined') {
                    clearInterval(interval);
                    interval = undefined;
                    log('Interval-based updates were stopped.');
                } else if (typeof msdelay === type.n && msdelay > 0) {
                    interval = setInterval(function () {
                        this.interpret(document.body)
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

    if (has.angular) {
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
        }
    });
    var linking = function ($scope, dom, attrs) {
        if (typeof dom[0] === type.o) dom = dom[0];
        window.onebang.interpret(dom);
    };
    var dirs = ['!','bang','::'];
    for (var i in dirs) {
        app.directive(dirs[i], function () {return {link: linking};});
    }
}

    var ini = function (settings) {
        window[onebangbind] = new onebang(settings);
    };

    if (typeof window === type.o) {
        window[onebangbind] = ini.bind(this);
    } else {
        throw new Error(errorurl('ag'));
    }

})();