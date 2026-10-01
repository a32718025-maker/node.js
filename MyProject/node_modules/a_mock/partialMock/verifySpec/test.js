var assert = require('assert');
var test = require('node:test');

var sut = require('../verify');

(function() {

	(function(){
		var mockContext = {};
		mockContext.expectCount = 0;
		var returned = sut(mockContext);

		test('it should return true',function() {
			assert.ok(returned);
		});
	})();
	
	(function(){
		var mockContext = {};
		mockContext.expectCount = 2;
		var msg;
		try	{
			var returned = sut(mockContext);	
		}
		catch(err) {
			msg = err.message;
		}
		

		test('it should throw mock has 2 pending functions',function() {
			assert.equal(msg,'mock has 2 pending functions');
		});
	})();

})();