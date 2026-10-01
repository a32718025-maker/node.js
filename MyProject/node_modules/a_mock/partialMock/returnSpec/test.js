var assert = require('assert');
var test = require('node:test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var setExecute = newRequireMock('./setExecute');
var newHasNoMoreArguments = newRequireMock('./newHasNoMoreArguments');

var sut = require('../return');

(function(){
	var mockContext = {};
	var hasNoMoreArguments = {};
	var returnValue = 'returnValue';
	var index = 'index';
	var expected = {};
	var didSetExecute;
	var compositeAreCorrectArguments  = 'compositeAreCorrectArguments';
	var oneTime = 1;

	stubHasNoMoreArguments();
	stubMockContext();
	stubSetExecute();

	function stubHasNoMoreArguments() {
		newHasNoMoreArguments.expect(index).expect(mockContext).return(hasNoMoreArguments);
	}

	function stubMockContext() {
		var compositeTemp = {};
		mockContext.compositeAreCorrectArguments = compositeTemp;
		mockContext.numberOfArgs = 2;
		var add = newMock();
		compositeTemp.add = add;
		add.expect(hasNoMoreArguments).return(compositeAreCorrectArguments);
	}

	function stubSetExecute() {
		setExecute.expect(returnValue).expect(compositeAreCorrectArguments).expect(mockContext).expect(oneTime).whenCalled(onSetExecute).return(null);
	}

	function onSetExecute() {
		didSetExecute = true;
	}

	var sut2 = sut(returnValue,index,mockContext);


	test('it should set mockContext.numberOfArgs to undefined',function() {
		assert.ok(mockContext.numberOfArgs === undefined);
	});
	
	test('it should set execute',function() {
		assert.ok(didSetExecute);
	});

	(function() {
		var didSetExecute;
		var expected = {};
		var times = 2;		
		setExecute.expect(returnValue).expect(compositeAreCorrectArguments).expect(mockContext).expect(times-1).whenCalled(onSetExecuteNTimes).return(null);

		function onSetExecuteNTimes() {
			didSetExecute = true;
		};

		var returned = sut2.repeat(times);

		test('it should set execute',function() {
			assert.ok(didSetExecute);
		});

		test('it should return self',function() {
			assert.equal(returned,sut2);
		});

	})();


	(function() {
		var didSetExecute;
		var expected = {};
		setExecute.expect(returnValue).expect(compositeAreCorrectArguments).expect(mockContext).whenCalled(onSetExecuteNTimes).return(null);

		function onSetExecuteNTimes() {
			didSetExecute = true;
		};

		var returned = sut2.repeatAny();

		test('it should set execute',function() {
			assert.ok(didSetExecute);
		});

		test('it should return self',function() {
			assert.equal(returned,sut2);
		});

	})();



})();