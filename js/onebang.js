/*!
Copyright 2017 Russell Steadman

Permission is hereby granted, free of charge, to any person 
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software 
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall 
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY 
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS 
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR 
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(){

    var onebangbind = 'onebang';

    var addclass = function (additions, node) {
        var classes = node.getAttribute('class');
        classes = classes?classes.split(' '):[];
        for (var i in additions) {
            if (classes.indexOf(additions[i])===-1) {
                classes.push(encodeURIComponent(additions[i]));
            }
        }
        node.setAttribute('class',classes.join(' ').trim());
    };

    var basics = {
        'console': function (m) {
            for (var i in m) {
                if (typeof console === 'object') console.log(m[i]);
            }
        },
        'class': function (m) {
            addclass(m, this);
        },
        '+': 'class',
        'hash': function (m) {
            var href = this.getAttribute('href');
            href = typeof href === 'string'?href.split('#'):['',''];
            href[1] = m[0]?m[0]:'';
            this.setAttribute('href',href.join('#'));
        },
        '#': 'hash',
        'icon': function (m) {
            if (m[0]=='fa'||m[0]=='fontawesome') {
                addclass(['fa','fa-'+m[1],(m[2]?'fa-'+m[2]+'x':''),(m[3]?'fa-spin':'')],this);
            } else if (m[0]=='ion'||m[0]=='ionicon') {
                addclass(['ion','ion-'+m[1]],this);
            } else if (m[0]=='gly'||m[0]=='glyph'||m[0]=='glyphicon') {
                addclass(['glyphicon','glyphicon-'+m[1]],this);
            } else if (m[0]=='oi'||m[0]=='openicon') {
                addclass(['oi','oi-'+m[1]],this);
            }
        },
        'i':'icon',
        'id': function (m) {
            if (m[0]) {
                this.setAttribute('id',m[0]);
            } else {
                this.removeAttribute('id');
            }
        },
        'exclaim': function (m,options,version,error,log) {
            if (typeof options !== 'object'||!options) return;
            var additions = [];
            if (!options.default) options.default = '';
            for (var i in m) {
                if (additions.indexOf(!m[i]?options.default:options[m[i]])!==-1) continue;
                if (!m[i]) {
                    additions.push(options.default);
                } else if (!options[m[i]]) {
                    error('The 1! !exclaim doesn\'t have the "'+m[i]+'" variable.');
                } else {
                    additions.push(options[m[i]]);
                }
            }
            if (!m[0]) additions.push(options.default);
            addclass(additions, this);
        },
        '!': 'exclaim',
        'style': function (m,a,b,error) {
            if (!m[0]||!m[1]) return error('The 1! !style doesn\'t have two variables.');
            this.style[m[0]] = m[1].replace(/\_/g,' ');
        },
        'hide': function () {
            this.style.display = 'none';
        }
    };

    var onebang = function (settings) {

        this.version = '1.0.0';

        this.options = {
            dev: false,
            debug: false,
            bang: '!',
            bangreg: /^\!.*$/,
            connector: ':',
            connectorreg: /\:/g,
            functions: {}
        };

        var verifyopt = {
            dev: 'boolean',
            debug: 'boolean',
            bang: 'string',
            bangreg: 'object&regex',
            connector: 'string',
            connectorreg: 'object&regex',
            functions: 'object'
        };

        if (typeof settings === 'object'&&settings) {
            for (var i in settings) this.options[i] = settings[i];
        }

        for (var i in verifyopt) {
            if (verifyopt[i].split('&').indexOf(typeof this.options[i]) === -1) {
                throw new Error('1! settings: ' + i + ' was ' + (typeof this.options[i]) +', expected '+verifyopt[i]);
            }
        }

        this.events = [];

        var error = function (error) {
            if (typeof console === 'object'&&console.error) {
                console.error('(1! onebang) '+error);
            } else if (typeof alert === 'function'&&this.options.dev) {
                alert(error);
            }
            this.events.push(error);
        }.bind(this);
        
        var log = function (log) {
            if (typeof console === 'object'&&console.info&&this.options.debug) {
                console.info(log);
            }
            this.events.push(log);
        }.bind(this);

        if (typeof document !== 'object') {
            error('1! requires the "document" object to be present.');
            return this.q = [], this.interpret = function (){}, this.addplugin = function (){}, this.addplugins = function (){};
        } else if (typeof document.body !== 'object') {
            error('1! requires <body> tags to be present.');
        }

        if (typeof MutationObserver !== 'function') {
            log('1! is unable to automatically update the DOM.');
        } else {
            var observer = new MutationObserver(function(mut) {
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
                if (this.options.bangreg.test(aname)) {
                    foundattr.push(aname.substr(this.options.bang.length));
                }
            }
            bangforbuck(node,foundattr);
        }.bind(this);

        var bangforbuck = function (node,attrs) {
            for (var i in attrs) {
                var m = attrs[i].split(this.options.connector);
                var v = m[0];
                m.splice(0,1);
                while (typeof this.q[v] === 'string') v = this.q[v];
                if (typeof this.q[v] !== 'function') return error('The 1! "'+attrs[i]+'" resolved to "'+v+'" which is not a function.');
                var fnopts = this.options.functions[v];
                if (this.q[v]) this.q[v].bind(node)(m,fnopts?fnopts:{},this.version,error,log);
                node.removeAttribute(this.options.bang+attrs[i]);
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

        this.addplugin = function (name,fn) {
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
        };

        this.interpret(document.body);

        var mutopts = {
            attributes: true,
            childList: true,
            subtree: true
        };
        if (typeof observer === 'object') observer.observe(document.body, mutopts);

    };
    
    var ini = function (settings) {
        window[onebangbind] = new onebang(settings);
    };

    if (typeof window === 'object') {
        window[onebangbind] = ini.bind(this);
    } else {
        throw new Error('There is no window object for 1! to attach.');
    }

})();