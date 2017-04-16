var external = {
    'youtube': function (m,opts,v,e) {
        var ytid = this.getAttribute('ytid');
        for (var i in opts) {
            if (m[0] && m[0] === i && m[0] !== 'none') ytid = opts[i];
        }
        if (!ytid || !(/[a-zA-Z0-9_-]{8,12}/).test(ytid)) return e(errorurl('al'));
        var ythtml = '<iframe type="text/html" width="' + (m[2] ? m[2] : '640') + '" height="' + (m[1] ? m[1] : '360') + '" ';
        ythtml += 'src="https://www.youtube.com/embed/' + ytid + '" allowfullscreen="" frameborder="0"></iframe>';
        this.innerHTML = ythtml;

        /* YouTube ID: jNZwZA06oNs */
    },
    'yt': 'youtube'
};