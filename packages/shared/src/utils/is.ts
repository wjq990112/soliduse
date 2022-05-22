export const isClient = typeof window !== 'undefined';
export const isDefined = <T = unknown>(value: T): value is T =>
  typeof value !== 'undefined';
export const assert = (condition: boolean, ...infos: unknown[]) => {
  if (!condition) {
    console.warn(...infos);
  }
};
const { toString } = Object.prototype;
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';
export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function';
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';
export const isString = (value: unknown): value is string =>
  typeof value === 'string';
export const isObject = (value: unknown): value is object =>
  toString.call(value) === '[object Object]';
export const isWindow = (value: unknown): value is Window =>
  typeof window !== 'undefined' && toString.call(value) === '[object Window]';
