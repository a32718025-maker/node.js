var assert = require('assert');
var test = require('node:test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newObject = newRequireMock('../newObject');
var reset = newRequireMock('./mockContext/reset');

var newSut = require('../newMockContext');

(function() {
	var originalFallback = {};
	var didReset;
	var object = {};
	var context = {};
	var resetResult = {};

	newObject.expect().return(object);
	// thisArg is optional and should not be required by callers.
	reset.expect(object).expect(originalFallback).expectAnything().return(context);
	var sut = newSut(originalFallback);


	test('it should return context',function() {
		assert.equal(sut, context);
	});

	// thisArg is optional and should not be required by callers.
	reset.expect(context).expect(originalFallback).expectAnything().return(resetResult);
	returned = sut.reset();

	test('forwards to reset',function() {
		assert.equal(returned, resetResult);
	});
	
})();