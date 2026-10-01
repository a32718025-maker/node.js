var newStrictMock = require('./strictMock');
var newObjectMock = require('./mock/objectMock');
var newPartialMock = require('./partialMock')
var mockFuncProperties = require('./mock/mockFuncProperties')

function create(subject) {
	if (subject == undefined)
		return newStrictMock();
	var mock = newObjectMock(subject);
	mockFuncProperties(subject,mock);
	return mock;

}

module.exports  = create;


