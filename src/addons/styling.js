var validatecolor = function (input) {
    if (input[0] === 'hex') {
        return '#' + input[1];
    } else if (input[0] === 'rgb') {
        return 'rgb(' + input[1] + ',' + input[2] + ',' + input[3] + (input[4] ? ',' + input[4] : '') + ')';
    }
    return input[0] || '#000000';
};

var styling = {
    //
    'h': 'height',
    'w': 'width',
    'hmin': 'min-height',
    'wmin': 'min-width',
    'hmax': 'max-height',
    'wmax': 'max-width',
    'cen': 'center',
    'clr': 'color',
    'bgclr': 'background-color',
    'ma': 'margin',
    'mal': 'margin-left',
    'mar': 'margin-right',
    'mat': 'margin-top',
    'mab': 'margin-bottom',
    'pa': 'padding',
    'pal': 'padding-left',
    'par': 'padding-right',
    'pat': 'padding-top',
    'pab': 'padding-bottom',
    //
    'center': function () {
        this.style['text-align'] = 'center';
        this.style.display = 'block';
        this.style['margin-left'] = 'auto';
        this.style['margin-right'] = 'auto';
    },
    'color': function (m) {
        this.style.color = validatecolor(m);
    },
    'background-color': function (m) {
        this.style['background-color'] = validatecolor(m);
    }
};

var styadd = function (sty) {
    styling[sty] = function (m) {
        this.style[sty] = m.join(' ');
    };
};

var stylistadd = ['margin','margin-top','margin-bottom','margin-left','margin-right',
'padding','padding-top','padding-bottom','padding-left','padding-right',
'position','display','opacity', 'height','min-height','max-height',
'width','min-width','max-width'];

for (var zx in stylistadd) styadd(stylistadd[zx]);