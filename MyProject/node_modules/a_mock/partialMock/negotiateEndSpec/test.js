var test = require('node:test');
var assert = require('assert');
var requireMock = require('../simple/newRequireMock');
var expectRequire = require('../simple/expectRequire');

var _return = requireMock('./return');
var mockContext = {};
var sut = require('../negotiateEnd');


	(function() {
		var numberOfArgs = 2;
		var didCallReturn;
		mockContext.numberOfArgs = numberOfArgs;
		_return.expectAnything().expect(numberOfArgs).expect(mockContext).whenCalled(onReturn).return();

		function onReturn(arg) {
			if (arg !== undefined)
				throw new Error('expected undefined but was ' + arg);
			didCallReturn = true;
		}
		
		sut(mockContext);

		test('it should set void as returnValue', function() {
			assert.ok(didCallReturn);
		});
	})();


(function() {
		var numberOfArgs = 0;
		var didCallReturn;
		mockContext.numberOfArgs = numberOfArgs;
		_return.expectAnything().expect(numberOfArgs).expect(mockContext).whenCalled(onReturn).return();

		function onReturn(arg) {
			if (arg !== undefined)
				throw new Error('expected undefined but was ' + arg);
			didCallReturn = true;
		}
		
		sut(mockContext);

		test('it should set void as returnValue', function() {
			assert.ok(didCallReturn);
		});
	})();



	(function() {
		mockContext.numberOfArgs = undefined;
		sut(mockContext);

		test('it should not set void as returnValue', function() {
			assert.ok(1);
		});
	})();
