window.redirect = function (rdr) {
    var url = window.location.origin + '/test/';
    if (rdr == 'webpack') {
        url += 'webpack/';
    } else if (rdr == 'angular') {
        url += 'live/angular/';
    } else {
        url += 'live/';
    }
    window.location.assign(url);
};
console.log('%c To see live tests, type in redirect() or redirect(\'angular\') or redirect(\'webpack\').','color:#8124a0;font-size:22px;');

describe('window.onebang before init', function () {
    it('is a function', function () {
        expect(typeof onebang).toEqual('function');
    });
});

describe('window.onebang after init', function () {
    it('is an object', function () {
        onebang({
            functions:{
                exclaim: {
                    default: 'a',
                    one: 'b',
                    two: 'c'
                }
            }
        });
        expect(typeof onebang).toEqual('object');
    });
    it('has correct attributes', function () {
        var attr = ['addplugin','addplugins','events','interpret','interval','options','q','version'];
        for (var i in onebang) {
            expect(attr.indexOf(i)).toBeGreaterThanOrEqual(0);
        }
    });
    it('can interpret !style:color:red', function () {
        var tests = ['!','__','::','b_','B_','1'];
        for (var i in tests) {
            var holder = document.createElement('div');
            holder.innerHTML = '<div '+tests[i]+'style:color:red></div>';
            var element = holder.childNodes[0];
            expect(onebang.interpret(element).getAttribute('style')).toBe('color: red;');
        }
    });
    var interpret = function (bang) {
        var holder = document.createElement('div');
        holder.innerHTML = '<div '+bang+'></div>';
        return holder.childNodes[0];
    };
    var errorurl = function (code, varone, vartwo, varthree) {
        return 'http://teamtofu.github.io/onebang/errors/?error=' + code + '&one=' + encodeURIComponent(varone) + '&two=' + encodeURIComponent(vartwo) + '&three=' + encodeURIComponent(varthree);
    };

    it('1! error !', function () {
        var element = interpret('!');
        var int = onebang.interpret(element);
        expect(int).toBe(element);
    });
    it('1! error !notrealfn B_fake', function () {
        var element = interpret('!notrealfn B_fake');
        var int = onebang.interpret(element);
        expect(onebang.events[0]).toBe(errorurl('ad','notrealfn','notrealfn'));
        expect(onebang.events[1]).toBe(errorurl('ad','fake','fake'));
    });

    it('1! console !console:log', function () {
        var element = interpret('!console:log');
        var int = onebang.interpret(element);
        expect(int).toBe(element);
    });

    it('1! class !class:test1', function () {
        var element = interpret('!class:test1');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('test1');
    });
    it('1! class !class:', function () {
        var element = interpret('!class:');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('');
    });
    it('1! class !class', function () {
        var element = interpret('!class');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('');
    });
    it('1! class !class:test1:test2', function () {
        var element = interpret('!class:test1:test2');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('test1 test2');
    });
    it('1! class !class:test1:test2 class="remain"', function () {
        var element = interpret('!class:test1:test2 class="remain"');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('remain test1 test2');
    });
    it('1! class !class:test1:test2 class="test1"', function () {
        var element = interpret('!class:test1:test2 class="test1"');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('test1 test2');
    });
    
    it('1! hash !#', function () {
        var element = interpret('!#');
        var int = onebang.interpret(element);
        expect(int.getAttribute('href')).toBe('#');
    });
    it('1! hash !#:test1', function () {
        var element = interpret('!#:test1');
        var int = onebang.interpret(element);
        expect(int.getAttribute('href')).toBe('#test1');
    });
    it('1! hash !#:test1 href="/"', function () {
        var element = interpret('!#:test1 href="/"');
        var int = onebang.interpret(element);
        expect(int.getAttribute('href')).toBe('/#test1');
    });
    it('1! hash !#:test1 href="#"', function () {
        var element = interpret('!#:test1 href="#"');
        var int = onebang.interpret(element);
        expect(int.getAttribute('href')).toBe('#test1');
    });
    it('1! hash !#:test1 href="#test"', function () {
        var element = interpret('!#:test1 href="#test"');
        var int = onebang.interpret(element);
        expect(int.getAttribute('href')).toBe('#test1');
    });

    it('1! icon !icon:fa:test', function () {
        var element = interpret('!icon:fa:test');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('fa fa-test');
    });
    it('1! icon !i:gly:test', function () {
        var element = interpret('!i:gly:test');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('glyphicon glyphicon-test');
    });
    it('1! icon !i:ion:test', function () {
        var element = interpret('!i:ion:test');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('ion icon ion-test');
    });
    it('1! icon !i:oi:test', function () {
        var element = interpret('!i:oi:test');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('oi oi-test');
    });
    it('1! icon !i:fa:test:5', function () {
        var element = interpret('!i:fa:test:5');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('fa fa-test fa-5x');
    });
    it('1! icon !i:fa:test:5:s', function () {
        var element = interpret('!i:fa:test:5:s');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('fa fa-test fa-5x fa-spin');
    });

    it('1! ID !id:test', function () {
        var element = interpret('!id:test');
        var int = onebang.interpret(element);
        expect(int.getAttribute('id')).toBe('test');
    });

    it('1! exclaim !!:default', function () {
        var element = interpret('!!:default');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('a');
    });
    it('1! exclaim !!:one', function () {
        var element = interpret('!!:one');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('b');
    });
    it('1! exclaim !!::one', function () {
        var element = interpret('!!::one');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('a b');
    });
    it('1! exclaim !! !!:one', function () {
        var element = interpret('!! !!:one');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('a b');
    });
    it('1! exclaim !!:one:two', function () {
        var element = interpret('!!:one:two');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('b c');
    });
    it('1! exclaim !!', function () {
        var element = interpret('!!');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('a');
    });
    it('1! exclaim !!:one:', function () {
        var element = interpret('!!:one:');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('b a');
    });
    it('1! exclaim !!:one:invalid', function () {
        var element = interpret('!!:one:invalid');
        var int = onebang.interpret(element);
        expect(int.getAttribute('class')).toBe('b');
    });
    
    it('1! style !style:color:blue !style:font-size:10px', function () {
        var element = interpret('!style:color:blue !style:font-size:10px');
        var int = onebang.interpret(element);
        expect(int.getAttribute('style')).toBe('color: blue; font-size: 10px;');
    });
    it('1! style !style:notreal:blue', function () {
        var element = interpret('!style:notreal:blue');
        var int = onebang.interpret(element);
        expect(int.getAttribute('style')).toBe(null);
    });
    it('1! style !style:notreal:blue !style:color:blue', function () {
        var element = interpret('!style:notreal:blue !style:color:blue');
        var int = onebang.interpret(element);
        expect(int.getAttribute('style')).toBe('color: blue;');
    });
    it('1! style !style', function () {
        var element = interpret('!style');
        var int = onebang.interpret(element);
        expect(int.getAttribute('style')).toBe(null);
    });
    it('1! style !style:fake', function () {
        var element = interpret('!style:fake');
        var int = onebang.interpret(element);
        expect(int.getAttribute('style')).toBe(null);
    });

    it('1! hide !hide', function () {
        var element = interpret('!hide');
        var int = onebang.interpret(element);
        expect(int.getAttribute('style')).toBe('display: none;');
    });
    
});