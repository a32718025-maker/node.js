var assert = require('assert');
var test = require('node:test');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var context = {};
var sut = require('../tryRemove');

(function(){

	(function() {
		var remove = newRequireMock('./remove');
		var didremove;
		var callback = {};
		remove.expect(context).expect(callback).whenCalled(onRemove).return(null);
		function onRemove() {
			didremove = true;
		}

		sut(context,callback);
		
		test('it should forward to remove',function() {
			assert.ok(didremove);
		});
	})();

	(function() {
		var remove = newRequireMock('./remove');		
		var didremove;
		var callback;
		remove.expect(context).expect(callback).whenCalled(onRemove).return(null);
		function onRemove() {
			throw 'not allowed to forward';
		}

		sut(context,callback);
		
		test('it should not forward to remove',function() {
			assert.ok(true);
		});
	})();
})();