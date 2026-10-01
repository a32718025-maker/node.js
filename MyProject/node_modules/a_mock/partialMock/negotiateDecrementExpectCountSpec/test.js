var assert = require('assert');
var test = require('node:test');
var sut = require('../negotiateDecrementExpectCount');

(function() {
	
	(function(){
		var mockContext = {};		
		mockContext.expectCount = 2;
		var times;
		sut(times,mockContext);

		test('it should not change expectCount',function() {
			assert.ok(mockContext.expectCount,2);
		});
	})();
	
	(function(){
		var mockContext = {};		
		mockContext.expectCount = 2;
		var times = 5;
		sut(times,mockContext);

		test('it should decrement expectCount',function() {
			assert.equal(mockContext.expectCount,1);
		});
	})();

})();