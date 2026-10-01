var assert = require('assert');
var test = require('node:test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasNoMoreArguments');


(function() {
    var length = 1;
    var mockContext = {};


    (function() {
        mockContext.expectAnything = true;
        var sut = newSut(length, mockContext);
        var returned = sut('somearg', 'c', 'd');

        test('it should return true', function() {
            assert.equal(true, returned);
        });

    })();

    (function() {
        mockContext.expectAnything = false;
        var sut = newSut(length, mockContext);

        var returned = sut('somearg', 'c', 'd');

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        mockContext.expectAnything = false;
        var sut = newSut(length, mockContext);

        var returned = sut('somearg', 'c');

        test('it should return false', function() {
            assert.equal(false, returned);
        });

    })();

    (function() {
        mockContext.expectAnything = false;
        var sut = newSut(length, mockContext);

        var returned = sut('a');

        test('it should return true', function() {
            assert.equal(true, returned);
        });
    })();
})();