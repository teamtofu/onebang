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