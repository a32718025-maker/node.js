var assert = require('assert');
var test = require('node:test');
var newMock = require('../../simple/newMock');
var newRequireMock = require('../../simple/newRequireMock');

var sut = require('../isEqualArg');


(function() {
    var expectedArg = {};
    var index = 1;

    (function() {
        var arg = {};
        var returned = sut(expectedArg, arg);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        var arg = {};
        var returned = sut(null, arg);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();


    (function() {
        var returned = sut(expectedArg, expectedArg);

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

    (function() {
        var returned = sut([], [2]);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();


    (function() {
        var returned = sut([2], 2);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        var returned = sut([1], [2]);

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        var returned = sut([expectedArg, 1, 'foo', Buffer.from('abc'), new Date(2000)], [expectedArg, 1, 'foo', Buffer.from('abc'), new Date(2000)]);

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

    (function() {
        var returned = sut([expectedArg, [1, [2, 3]], 'foo'], [expectedArg, [1, [2, 3]], 'foo']);

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();

    (function() {
        var returned = sut([expectedArg, [1, [2, 3, 4]], 'foo'], [expectedArg, [1, [2, 3]], 'foo']);

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        var returned = sut({
            a: 1
        }, {
            b: 1
        });

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        var returned = sut({
            a: 1
        }, {
            a: 2
        });

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        var returned = sut({
            a: 1
        }, {
            a: 1
        });

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();

    (function() {
        var Foo = function() {
            this.arg = 'arg';
        };
        var foo = new Foo();
        var foo2 = new Foo();

        var returned = sut({
            a: 1,
            b: [{
                c: 2
            }, foo]
        }, {
            a: 1,
            b: [{
                c: 2
            }, foo2]
        });

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();

    (function() {
        var Foo = function() {
            this.arg = 'arg';
        };
        var foo = new Foo();
        var foo2 = new Foo();

        var returned = sut(foo, foo2);

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();

    (function() {
        var Foo = function(value) {
            this.arg = value;
        };
        var foo = new Foo(1);
        var foo2 = new Foo(2);

        var returned = sut(foo, foo2);

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        var Foo = function() {};
        var foo = new Foo();
        var foo2 = new Foo();

        var returned = sut(foo, foo2);

        test('it should return false', function() {
            assert.equal(false, returned);
        });
    })();

    (function() {
        var returned = sut(Buffer.from('abc'), Buffer.from('abc'));

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

    (function() {
        var returned = sut(Buffer.from('abc'), 'abc');

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        var returned = sut(Buffer.from('aba'), Buffer.from('abc'));

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        var returned = sut(Buffer.from('ab'), Buffer.from('abc'));

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        var returned = sut(new Date(2015,5,24), new Date(2015,5,24));

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

	(function() {
        var returned = sut(new Date(2015,5,22), new Date(2015,5,24));

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

	(function() {
        var returned = sut(undefined, new Date(2015,5,24));

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

})();