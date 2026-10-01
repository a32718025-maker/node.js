var assert = require('assert');
var test = require('node:test');
var newSut = require('../newTrueOnceThenFalse');

(function(){
	var sut = newSut();

	(function() {
		var returned = sut();
		
		test('it should return true',function() {
			assert.equal(true,returned);
		});

		(function() {
			var returned = sut();
			test('it should return false',function() {
				assert.equal(false,returned);
			});
		})();
	})();
})();
