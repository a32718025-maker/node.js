const assert = require('assert');
const { describe, it } = require('node:test');
const aMock = require('..');

describe('README examples', () => {
  it('partial mock returns fake then real', () => {
    let original = function () {
      return 'realValue';
    };

    const mock = aMock.mock(original);
    original = mock;
    mock.expect().return('fake');

    assert.equal(original(), 'fake');
    assert.equal(original(), 'realValue');
  });

  it('strict mock throws on unexpected call', () => {
    const mock = aMock.mock();
    mock.expect().return('fake');

    assert.equal(mock(), 'fake');
    assert.throws(() => mock(), /Unexpected arguments/);
  });

  it('expecting arguments', () => {
    const mock = aMock.mock();
    mock.expect('testValue1').return('fake1');
    mock.expect('testValue2').return('fake2');

    assert.equal(mock('testValue1'), 'fake1');
    assert.equal(mock('testValue2'), 'fake2');
    assert.throws(() => mock(), /Unexpected arguments/);
    assert.throws(() => mock('foo'), /Unexpected arguments/);
  });

  it('expecting multiple arguments', () => {
    const mock = aMock.mock();
    mock.expect('firstArg1', 'secondArg1').return('fake1');
    mock.expect('firstArg2', 'secondArg2').return('fake2');

    assert.equal(mock('firstArg1', 'secondArg1'), 'fake1');
    assert.equal(mock('firstArg2', 'secondArg2'), 'fake2');
    assert.throws(() => mock('foo'), /Unexpected arguments/);
    assert.throws(() => mock('foo', 'bar'), /Unexpected arguments/);
  });

  it('expecting array', () => {
    const mock = aMock.mock();
    mock.expect(['a', 'b']).return('fake1');
    mock.expect(['a', 'b']).return('fake2');
    mock.expect(['c', 'd']).return('fake3');

    assert.equal(mock(['a', 'b']), 'fake1');
    assert.equal(mock(['a', 'b']), 'fake2');
    assert.equal(mock(['c', 'd']), 'fake3');
    assert.throws(() => mock(['a', 'b']), /Unexpected arguments/);
    assert.throws(() => mock(['foo', 'bar']), /Unexpected arguments/);
  });

  it('expecting struct', () => {
    const mock = aMock.mock();
    const obj = {};
    mock.expect({ a: 1 }).return('fake1');
    mock.expect({ a: 2 }).return('fake2');
    mock.expect({ a: 2, b: { c: 'foo', d: ['me', 'too'] } }).return('fake3');
    mock.expect(obj).return('fake4');
    mock.expect({}).return('will never happen');

    assert.equal(mock({ a: 1 }), 'fake1');
    assert.equal(mock({ a: 2 }), 'fake2');
    assert.equal(mock({ a: 2, b: { c: 'foo', d: ['me', 'too'] } }), 'fake3');
    assert.equal(mock(obj), 'fake4');
    assert.throws(() => mock({}), /Unexpected arguments/);
  });

  it('repeats', () => {
    const mock = aMock.mock();
    mock.expect().return('fake').repeat(2);

    assert.equal(mock(), 'fake');
    assert.equal(mock(), 'fake');
    assert.throws(() => mock(), /Unexpected arguments/);
  });

  it('repeatAny', () => {
    const mock = aMock.mock();
    mock.expect().return('fake').repeatAny();

    assert.equal(mock(), 'fake');
    assert.equal(mock(), 'fake');
    assert.equal(mock(), 'fake');
  });

  it('ignoring a single argument', () => {
    const mock = aMock.mock();
    mock.ignore().expect('foo').return('fake1');

    assert.equal(mock('ignore me', 'foo'), 'fake1');
    assert.throws(() => mock(), /Unexpected arguments/);
  });

  it('ignoring all arguments', () => {
    const mock = aMock.mock();
    mock.ignoreAll().return('fake1');

    assert.equal(mock('someRandomValue', 'whatever'), 'fake1');
    assert.throws(() => mock(), /Unexpected arguments/);
  });

  it('throwing exceptions', () => {
    const mock = aMock.mock();
    const error = new Error('invalid operation');
    mock.expect().throw(error);
    mock.expect().return('fake');

    assert.throws(() => mock(), /invalid operation/);
    assert.equal(mock(), 'fake');
  });

  it('intercepting whenCalled', () => {
    const mock = aMock.mock();
    let calledArg;
    mock.expect('testValue').whenCalled(function (arg) {
      calledArg = arg;
    }).return('fake1');

    assert.equal(mock('testValue'), 'fake1');
    assert.equal(calledArg, 'testValue');
    assert.throws(() => mock(), /Unexpected arguments/);
  });

  it('verify (fail)', () => {
    const mock = aMock.mock();
    mock.expect('testValue1').return('fake1');
    mock.expect('testValue2').return('fake2');

    assert.equal(mock('testValue1'), 'fake1');
    assert.throws(() => mock.verify(), /mock has 1 pending functions/);
  });

  it('verify (success)', () => {
    const mock = aMock.mock();
    mock.expect('testValue1').return('fake1');
    mock.expect('testValue2').return('fake2');

    assert.equal(mock('testValue1'), 'fake1');
    assert.equal(mock('testValue2'), 'fake2');
    assert.equal(mock.verify(), true);
  });

  it('returning void (compact syntax)', () => {
    const mock = aMock.mock();
    mock.expect('testValue1');
    mock.expect('testValue2').repeat(2);

    assert.equal(mock('testValue1'), undefined);
    assert.equal(mock('testValue2'), undefined);
    assert.equal(mock('testValue2'), undefined);
    assert.equal(mock.verify(), true);
  });

  it('reset mock', () => {
    let original = function () {
      return 'realValue';
    };

    const mock = aMock.mock(original);
    original = mock;
    mock.expect().return('fake');
    mock.reset();

    assert.equal(original(), 'realValue');
  });

  it('returning resolved promise', () => {
    const mock = aMock.mock();
    mock.expect('foo').resolve('fake');

    return mock('foo').then(function (returned) {
      assert.equal(returned, 'fake');
    });
  });

  it('returning rejected promise', () => {
    const mock = aMock.mock();
    mock.expect('foo').reject('fake');

    return mock('foo').then(
      function () {
        assert.fail('expected rejection');
      },
      function (returned) {
        assert.equal(returned, 'fake');
      }
    );
  });
});
