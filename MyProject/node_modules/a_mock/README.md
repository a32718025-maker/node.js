_a_mock_
===
_Mocking framework_ 


The mocking framework can be used in any JavaScript testing framework.


__To install:__

```
npm install a_mock
```


_Mocking_
===================

Mocking a function
------------------

__Partial mock__

```js
var original = function() {
	return 'realValue';
}

var mock = require('a_mock').mock(original);
original = mock;
mock.expect().return('fake');

original(); //returns 'fake'
original(); //returns 'realValue'
```

Note: Consumers do not need to provide a `thisArg`. It is optional and only used to force a specific `this` when the original fallback is called (low-level partial mock usage).



__Strict mock__

```js
var mock = require('a_mock').mock();
mock.expect().return('fake');

mock(); //returns 'fake'
mock(); //throws unexpected arguments
```



__Expecting arguments__

```js
var mock = require('a_mock').mock();
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

mock('testValue1'); //returns 'fake1'
mock('testValue2'); //returns 'fake2'
mock(); //throws unexpected arguments
mock('foo'); //throws unexpected arguments
```



__Expecting multiple arguments__

```js
var mock = require('a_mock').mock();
mock.expect('firstArg1', 'secondArg1').return('fake1');
mock.expect('firstArg2', 'secondArg2').return('fake2');


mock('firstArg1', 'secondArg1'); //returns 'fake1'
mock('firstArg2', 'secondArg2'); //returns 'fake2'
mock('foo'); //throws unexpected arguments
mock('foo', 'bar'); //throws unexpected arguments
```

__Expecting array__

```js
var mock = require('a_mock').mock();
mock.expect(['a','b']).return('fake1');
mock.expect(['a','b']).return('fake2');
mock.expect(['c','d').return('fake3');

mock(['a','b']); //returns 'fake1'
mock(['a','b']); //returns 'fake2'
mock(['c','d']); //returns 'fake3'
mock(['a','b']); //throws unexpected arguments
mock(['foo', 'bar']); //throws unexpected arguments
```

__Expecting struct__

```js
var mock = require('a_mock').mock();
var obj = {};
mock.expect({a : 1}).return('fake1');
mock.expect({a : 2}).return('fake2');
mock.expect({a : 2, b : {c : 'foo', d : ['me', 'too']}}).return('fake3');
mock.expect(obj).return('fake4');
mock.expect({}).return('will never happen');

mock({a : 'x'}); //throws unexpected arguments
mock({a : 1}); //returns 'fake1'
mock({a : 2}); //returns 'fake2'
mock({a : 2, b : {c : 'foo', d : ['me', 'too']}}); //returns 'fake3'
mock(obj);  //returns 'fake4'
mock({});  //throws unexpected arguments cause leaf properties are not equal
```

Note: Struct matching is strict on leaf properties. All leaf property values must be equal to match, and an empty object does not match a non-empty expected struct.

__Repeats__

```js
var mock = require('a_mock').mock();
mock.expect().return('fake').repeat(2);

mock(); //returns 'fake'
mock(); //returns 'fake'
mock(); //throws unexpected arguments
```

__Infinite repeats__

```js
var mock = require('a_mock').mock();
mock.expect().return('fake').repeatAny();

mock(); //returns 'fake'
mock(); //returns 'fake'
mock(); //returns 'fake'...
```


__Ignoring a single argument__

```js
var mock = require('a_mock').mock();
mock.ignore().expect('foo').return('fake1');

mock('ignore me', 'foo'); //returns 'fake1'
mock(); //throws unexpected arguments
```

__Ignoring all arguments__

```js
var mock = require('a_mock').mock();
mock.ignoreAll().return('fake1'); //same as expectAnything

mock('someRandomValue', 'whatever'); //returns 'fake1'
mock(); //throws unexpected arguments
```


__Throwing exceptions__

```js
var mock = require('a_mock').mock();
var error = new Error('invalid operation');
mock.expect().throw(error);
mock.expect().return('fake');

mock(); //throws error
mock(); //returns 'fake'
```

__Intercepting__

```js
var mock = require('a_mock').mock();
mock.expect('testValue').whenCalled(onCalled).return('fake1');

function onCalled(arg) {
	//arg == 'testValue'
}

mock('testValue'); //returns 'fake1'
mock(); //throws unexpected arguments
```

__Verify (fail)__

```js
var mock = require('a_mock').mock();
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

mock('testValue1'); //returns 'fake1'
mock.verify(); //throws mock has 1 pending functions
```

__Verify (success)__

```js
var mock = require('a_mock').mock();
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

mock('testValue1'); //returns 'fake1'
mock('testValue2'); //returns 'fake2'
mock.verify(); //returns true
```

__returning void (compact syntax)__

```js
var mock = require('a_mock').mock();
mock.expect('testValue1');
mock.expect('testValue2').repeat(2);

mock('testValue1'); //returns undefined
mock('testValue2'); //returns undefined
mock('testValue2'); //returns undefined
mock.verify(); //returns true
```

__..is equivalent to ..__
```js
var mock = require('a_mock').mock();
mock.expect('testValue1').return();
mock.expect('testValue2').return().repeat(2);

mock('testValue1'); //returns undefined
mock('testValue2'); //returns undefined
mock('testValue2'); //returns undefined
mock.verify(); //returns true
```

__Reset mock__
```js
var original = function() {
	return 'realValue';
}

var mock = require('a_mock').mock(original);
original = mock;
mock.expect().return('fake');
mock.reset();

original(); //returns 'realValue'
```

__Returning resolved promise__
```js
var mock = require('a_mock').mock();
mock.expect('foo').resolve('fake');

mock('foo').then(function(returned){
	//returned == 'fake'
}); 
```

__Returning rejected promise__
```js
var mock = require('a_mock').mock();
mock.expect('foo').reject('fake');

mock('foo').then(null, function(returned){
	//returned == 'fake'
}); 
```

__Strict mock - advanced scenario__

```js
var mock = require('a_mock').mock();
mock.expect('testValue').ignore().whenCalled(onCalled).return('fake1');

function onCalled(arg,callback) {
	//arg == 'testValue'
	//callback == foo
}

function foo() {
}


mock('testValue', foo); //returns 'fake1'
mock.verify() //returns true
mock('testValue',foo); //throws unexpected arguments
```

Mocking require
----------------

__expectRequire__

```js
var fakeDep = {};

var expectRequire = require('a_mock').expectRequire;
expectRequire('./realDep').return(fakeDep);

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep (behaves like a partial mock)
```

__requireMock (compact syntax)__

```js
var requireMock = require('a_mock').requireMock;
var fakeDep = requireMock('./realDep'); //returns a strict mock

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep
```

__..is equivalent to ..__

```js
var mock = require('a_mock').mock();
var expectRequire = require('a_mock').expectRequire;

var fakeDep = mock;
expectRequire('./realDep').return(fakeDep);

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep
```

__Reset mocks for require__

```js
var fakeDep = {};

var expectRequire = require('a_mock').expectRequire;
expectRequire('./realDep').return(fakeDep);
expectRequire.reset();

require('./realDep'); //returns realDep
```

__..is equivalent to ..__

```js
var requireMock = require('a_mock').requireMock;
var fakeDep = requireMock('./realDep'); //returns a strict mock
requireMock.reset(); //is an alias for expectRequire.reset()

require('./realDep'); //returns realDep

```
Mocking an object
-----------------
__Partial object mock__

```js
function newCustomer(_name) {
	var c = {};

	c.getName = function ()
	{
		return _name;
	};

	return c;
}

var customer = newCustomer('Alfonzo The Real');
var customerMock = mock(customer);

customerMock.getName.expect().return('Johnny Fake');

customer.getName(); //returns Johnny Fake
customer.getName(); //returns Alfonzo The Real
customerMock.verify(); //returns true
```

Mocking promises
-----------------
__Mocking resolve__

```js
var a = require('a_mock');

var promise = a.promise(); //mocked promise

promise.then(success,error);
promise.resolve('success');

function success(arg) {
	console.log(arg);//success
}

function error(e) {
	//will not happen
}
```

__Mocking resolve (alternative syntax)__

```js
var a = require('a_mock');

var promise = a.promise(); //mocked promise

promise.then(success,error);
promise('success');

function success(arg) {
	console.log(arg);//success
}

function error(e) {
	//will not happen
}
```

__Mocking reject__

```js
var a = require('a_mock');

var promise = a.promise();

promise.then(success,error);
promise.reject(new Error('error'));

function success(arg) {
	//will not happen
}

function error(e) {
	console.log(e.stack);//will happen
}
```

__Mocking reject (alternative syntax)__

```js
var a = require('a_mock');

var promise = a.promise();

promise.then(success,error);
promise(null,new Error('error'));

function success(arg) {
	//will not happen
}

function error(e) {
	console.log(e.stack);//will happen
}
```
