var newMockContext = require('./mockContext');
var newPartialMock = require('../partialMock');

function collectPropertyNames(subject) {
	var names = {};
	for (var name in subject) {
		names[name] = true;
	}
	var proto = Object.getPrototypeOf(subject);
	while (proto && proto !== Object.prototype && proto !== Function.prototype) {
		var props = Object.getOwnPropertyNames(proto);
		for (var i = 0; i < props.length; i++) {
			var prop = props[i];
			if (prop === 'constructor' || names[prop])
				continue;
			var desc = Object.getOwnPropertyDescriptor(proto, prop);
			if (desc && typeof desc.value === 'function')
				names[prop] = true;
		}
		proto = Object.getPrototypeOf(proto);
	}
	return Object.keys(names);
}

function _new(subject,mockContext,parent) {
	var newObjectMock = require('./objectMock');

	var mockContext = newMockContext(mockContext);
	var mock = {};
	if (subject && typeof subject === 'function' && typeof subject.expectAnything === 'function' && typeof subject.expect === 'function')
		return subject;
	var mockedMap = mockContext._mockedMap;
	if (!mockedMap) {
		mockedMap = new WeakMap();
		mockContext._mockedMap = mockedMap;
	}
	if (subject && (typeof subject === 'object' || typeof subject === 'function')) {
		var existingMock = mockedMap.get(subject);
		if (existingMock)
			return existingMock;
	}
	mock.verify = mockContext.verify;
	if (subject instanceof Function) {
		mock = newPartialMock(subject, parent);		
		mockContext.verify.add(mock.verify);
	}
	if (!(subject instanceof Object))
		return mock;
	mockedMap.set(subject, mock);
	var propertyNames = collectPropertyNames(subject);
	for(var i = 0; i < propertyNames.length; i++) {
		var propertyName = propertyNames[i];
		if (Object.prototype.hasOwnProperty.call(mock, propertyName))
			continue;
		var property = subject[propertyName];
		mock[propertyName] = newObjectMock(property,mockContext,subject);
	}
	return mock;
}

module.exports  = _new
