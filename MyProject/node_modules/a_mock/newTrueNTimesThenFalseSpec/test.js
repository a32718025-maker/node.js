var assert = require('assert');
var test = require('node:test');
var newSut = require('../newTrueNTimesThenFalse');

(function(){
	
	(function() {
		var times = 2;
		var sut = newSut(times);

		(function(){
			var returned = sut();
			var returned2 = sut();
			var returned3 = sut();

			test('it should return true first time',function() {
				assert.ok(returned);
			});

			test('it should return true second time',function() {
				assert.ok(returned2);
			});

			test('it should return false third time',function() {
				assert.equal(false,returned3);
			});

		})();

	})();

	(function() {
		var sut = newSut();		
		
		(function(){
			var returned = sut();
			var returned2 = sut();
			var returned3 = sut();

			test('it should return true first time',function() {
				assert.ok(returned);
			});

			test('it should return true second time',function() {
				assert.ok(returned2);
			});

			test('it should return true nth time',function() {
				assert.ok(returned3);
			});

		})();
	})();
})();
