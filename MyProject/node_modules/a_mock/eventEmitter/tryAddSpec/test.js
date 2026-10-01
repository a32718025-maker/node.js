var assert = require('assert');
var test = require('node:test');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var context = {};
var sut = require('../tryAdd');

(function(){
	
	(function() {
		var add = newRequireMock('./add');
		var didAdd;
		var callback = {};
		add.expect(context).expect(callback).whenCalled(onAdd).return(null);
		function onAdd() {
			didAdd = true;
		}

		sut(context,callback);
		
		test('it should forward to add',function() {
			assert.ok(didAdd);
		});
	});

	(function() {
		var add = newRequireMock('./add');		
		var didAdd;
		var callback;
		add.expect(context).expect(callback).whenCalled(onAdd).return(null);
		function onAdd() {
			throw 'not allowed to forward';
		}

		sut(context,callback);
		
		test('it should not forward to add',function() {
			assert.ok(true);
		});
	})();
})();