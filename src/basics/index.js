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