import {
  assert,
  isBoolean,
  isClient,
  isDefined,
  isFunction,
  isNumber,
  isObject,
  isString,
  isWindow,
} from '../is';

const log = vi.fn();
vi.spyOn(console, 'warn').mockImplementation(log);

describe('@soliduse/shared/is', () => {
  test('should be true correctly when the environment is client', () => {
    expect(isClient).toBeTruthy();
  });

  test('should return correctly when the value is defined or undefined', () => {
    expect(isDefined('defined')).toBeTruthy();
    expect(isDefined(undefined)).toBeFalsy();
  });

  test('should warn correctly when the condition is true or false', () => {
    assert(false, 'should warn');
    expect(log).toHaveBeenCalledWith('should warn');
    log.mockClear();
    assert(true, 'should not warn');
    expect(log).toHaveBeenCalledTimes(0);
  });

  test('should return correctly when the value is boolean', () => {
    expect(isBoolean('boolean')).toBeFalsy();
    expect(isBoolean(true)).toBeTruthy();
  });

  test('should return correctly when the value is function', () => {
    expect(isFunction('function')).toBeFalsy();
    expect(isFunction(() => {})).toBeTruthy();
  });

  test('should return correctly when the value is number', () => {
    expect(isNumber('number')).toBeFalsy();
    expect(isNumber(0)).toBeTruthy();
  });

  test('should return correctly when the value is string', () => {
    expect(isString(0)).toBeFalsy();
    expect(isString('string')).toBeTruthy();
  });

  test('should return correctly when the value is object', () => {
    expect(isObject('object')).toBeFalsy();
    expect(isObject({})).toBeTruthy();
  });

  test.todo('should return correctly when the value is window', () => {
    expect(isWindow('window')).toBeFalsy();
    expect(isWindow(window)).toBeTruthy();
  });
});
