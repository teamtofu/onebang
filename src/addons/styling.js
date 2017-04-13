var validatesize = function (input, errfn) {
    if (typeof input === type.s) {
        input = input.replace(/\ /g,'');
        var sizeregex = /^([0-9]+)((?:%)|(?:[a-z]{2,4}))$/;
        if (sizeregex.test(input)) {
            return input;
        }
    }
    errfn('Size validation failed for ' + input + '.');
    return '0px';
};

var styling = {
    'height': function (m) {
        this.style.height = validatesize(m[0]);
    },
    'h': 'height',
    'width': function (m) {
        this.style.width = validatesize(m[0]);
    },
    'w': 'width',
    'min-height': function (m) {
        this.style['min-height'] = validatesize(m[0]);
    },
    'hmin': 'min-height',
    'min-width': function (m) {
        this.style['min-width'] = validatesize(m[0]);
    },
    'wmin': 'min-width',
    'max-height': function (m) {
        this.style['max-height'] = validatesize(m[0]);
    },
    'hmax': 'max-height',
    'max-width': function (m) {
        this.style['max-width'] = validatesize(m[0]);
    },
    'wmax': 'max-width',
    'center': function () {
        this.style['text-align'] = 'center';
        this.style.display = 'block';
        this.style['margin-left'] = 'auto';
        this.style['margin-right'] = 'auto';
    },
    'cen': 'center'
};